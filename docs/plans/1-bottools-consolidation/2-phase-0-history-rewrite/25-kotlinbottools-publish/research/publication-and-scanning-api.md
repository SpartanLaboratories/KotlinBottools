# The REST calls that make KotlinBottools public, enable secret scanning and push protection, and make it private again

Researched 2026-11-12 for [KotlinBottools#25](https://github.com/SpartanLaboratories/KotlinBottools/issues/25). Applies to GitHub.com
(GitHub Free organisation), REST API versions `2022-11-28` and `2026-03-10`, `gh` 2.100.0.

Sources: the REST description (`github/rest-api-description` at `main`, commit `5c36b6f685`, 2026-11-11, `info.version` 1.1.4;
both `api.github.com.json` and the `2026-03-10` file were read), GitHub's documentation from its source repository
(`github/docs` at `main`, commit `2b4f2c7398`, 2026-11-11) and the rendered pages on `docs.github.com`, `gh` source at
`v2.100.0`, GitHub's changelog, and read-only `gh api` GETs against `SpartanLaboratories/MagicBot` (public, same organisation)
and `SpartanLaboratories/KotlinBottools` (private) on 2026-11-12. Nothing was written to GitHub. Idiomatic Kotlin does not bear
on this question: no Kotlin is written.

## 1. Question

Which REST calls make an organisation-owned repository public, enable secret scanning and push protection on it, and make it
private again, on GitHub Free in November 2026; how is each call verified by a read; what do the first minutes after the change
look like (when the scan of the existing history runs, what the alerts list shows before it ends, whether any free-plan read
shows it finished); and what does the way back do and leave behind. An answer must fit these facts about the work: the
repository's `security_and_analysis` is `null` while it is private, so the scanning settings can only be set after the visibility
change; the account is an organisation administrator using a classic token with `repo`; generic patterns, validity checks and AI
detection stay off; every write is verified by a read before the next step; a failed scanning update is re-run at once.

## 2. Bottom line

- **The calls are unchanged since 2026-10-21 and need nothing else enabled first.** Visibility: `PATCH /repos/{owner}/{repo}`
  with `{"visibility":"public"}`. Scanning: a second `PATCH` on the same endpoint with
  `{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}`.
  `advanced_security` is not sent. The REST description for these operations is identical in API versions `2022-11-28` and
  `2026-03-10`; the pinned `2022-11-28` stays supported for at least 24 months after `2026-03-10`. Nothing in GitHub's changelog
  between 2026-10-21 and 2026-11-12 changes the calls, their permissions or their outcomes.
- **The `PATCH` response is the full repository representation, so it is a usable first read, and a separate `GET` is the
  verifying read.** `visibility`, `private` and `security_and_analysis` are all in it. Use `--jq` on the call so that only the
  few fields are printed. Never send `private` (its documented default is `false`) and never send `advanced_security`.
- **Verification reads:** `GET /repos/{owner}/{repo}` for `visibility` and `security_and_analysis`; `GET
  /repos/{owner}/{repo}/secret-scanning/alerts?hide_secret=true&per_page=100` (200 when scanning is enabled, 404 "Secret scanning
  is disabled on this repository." when not; classic `repo` is enough). `hide_secret=true` is needed because an alert object
  carries a `secret` field by default. No other read shows push protection in force; its only documented indicator is
  `security_and_analysis.secret_scanning_push_protection.status`.
- **No documented read says that the scan of the existing history has finished, and none is available on this plan.** The
  scan-history endpoint requires Advanced Security and answers 404 on MagicBot (observed again on 2026-11-12). Documentation
  gives no time for the scan; its own example shows a three-minute history scan of a small repository. An empty alerts list
  therefore proves "no alert yet", never "scan finished"; three reads at the planned points are the available evidence.
- **The way back is `PATCH {"visibility":"private"}`.** It erases stars and watchers (none exist), detaches any fork made in the
  window into a separate public network that keeps its copy, removes the repository from the GitHub Archive Program, and ends
  secret scanning and push protection, which a free organisation has only on public repositories. It recalls nothing from a fork,
  a clone, a third-party archive or a cached page. Whether the stored scanning settings survive is not documented: after any
  later change back to public, send the scanning `PATCH` again and read it back.
- **Correction to the earlier findings:** `gh repo edit` does not run the visibility change and the security settings as
  concurrent calls. All field flags of one invocation go into one `PATCH` body; only the topics call runs concurrently with
  it. The two writes are kept separate here for a different reason: the scanning object does not exist on the repository
  until it is public.

## 3. Findings

### 3.1 The visibility change (documented; observed where marked)

- **Call.** `PATCH /repos/{owner}/{repo}`, operation `repos/update`. Body field `visibility`: "The visibility of the repository."
  with enum `public`, `private` (REST description, commit `5c36b6f685`). The older boolean `private` is also accepted and
  documented with "Default: `false`"; a request that carries `private` by accident could therefore be read as a request for
  public. The plan sends `visibility` only. Documented, both API versions.
- **Permission.** The repository administrator changes visibility; the organisation owner may restrict this to owners only
  ("If you can't change a repository's visibility, the organization owner may have restricted the ability to change repository
  visibility to organization owners only"). The REST text: "You will get a `422` error if the organization restricts changing
  repository visibility to organization owners and a non-owner tries to change the value of private." Observed on 2026-11-12:
  the signed-in account holds `permissions.admin: true` on both repositories, its organisation role is `admin`, the organisation
  plan is `free`, and the organisation field `members_can_change_repo_visibility` reads `true`, so the restriction does not
  apply. The classic `repo` scope covers the call (`X-OAuth-Scopes` of the token: `gist, project, read:org, repo, workflow`).
- **Response.** 200 with the `full-repository` schema, which includes `visibility`, `private`, `security_and_analysis`,
  `allow_forking`, `forks_count`, `network_count`, `stargazers_count` and `subscribers_count` (REST description). Documented
  statuses: 200, 307, 403, 404, 422; the description says of 422 only "Validation failed, or the endpoint has been spammed", and
  gives no text for 403 or 307. Causes with a source: the owners-only restriction above (422, documented); a token without
  access to the repository (404 by GitHub's convention for hidden resources, inference); a rename or transfer (307, inference
  from the status; the plan addresses the repository by its current name). A change that is accepted but not yet reflected is
  not documented either way; treat the `PATCH` response as the first read and require an independent `GET` and an anonymous page
  read before the next step.
- **`gh repo edit` (2.100.0, `pkg/cmd/repo/edit/edit.go` at `v2.100.0`).** `--visibility` is refused without
  `--accept-visibility-change-consequences`. `editRun` encodes all edit fields into one JSON body and sends one `PATCH` to
  `repos/{owner}/{repo}`; the topics call is the only edit run in parallel through an `errgroup`. It prints `Edited repository
  <name>` only under `if opts.IO.IsStdoutTTY()`, so a non-interactive run prints nothing and exits 0 on success; nothing in the
  command reads the result back. The flags `--enable-secret-scanning` and `--enable-secret-scanning-push-protection` set
  `security_and_analysis.secret_scanning` and `.secret_scanning_push_protection` in that same body; the flag help says "Secret
  scanning must be enabled first" but the code sends the two objects together without ordering them. `gh api -X PATCH` with
  `--jq` has the same effect as the command and returns the response for a first read.

### 3.2 The `security_and_analysis` object (documented; observed)

- **Sub-objects accepted by the request** (REST description, both versions): `advanced_security`, `code_security`,
  `secret_scanning`, `secret_scanning_push_protection`, `secret_scanning_ai_detection`, `secret_scanning_non_provider_patterns`,
  `secret_scanning_delegated_alert_dismissal`, `secret_scanning_delegated_bypass`, `secret_scanning_delegated_bypass_options`;
  each takes `status` `enabled` or `disabled`. The response schema adds `dependabot_security_updates` and omits nothing else;
  `secret_scanning_validity_checks` appears in responses and is not in the request schema (as found earlier; MagicBot shows it).
  Permission: "you must have admin permissions for the repository or be an owner or security manager for the organization that
  owns the repository". Of `advanced_security`: "For standalone Code Scanning or Secret Protection products, this parameter
  cannot be used."
- **What a free public repository gets.** Documented: public repositories have secret scanning and push protection without
  buying anything (GitHub's availability table for GitHub Secret Protection: "Secret scanning: Yes" and "Push protection: Yes"
  for "Public repository without GitHub Secret Protection", "No" for a private repository without it) and "Secret scanning alerts
  for users can be enabled on any free public repository that you own." Paid and therefore not requested: generic patterns
  (`secret_scanning_non_provider_patterns`), validity checks, AI detection, custom patterns, delegated bypass. Sending only the
  two objects leaves every other object unchanged.
- **Same `PATCH` or two.** No source forbids enabling both in one request on a public repository. Evidence for one request: `gh
  repo edit` builds one body with both objects; a public-repository configuration reported in the Terraform provider's issue 1419
  carried `secret_scanning` and `secret_scanning_push_protection` in one block and the only rejected member was
  `advanced_security`. Evidence for caution: the `gh` flag help text above. This is common practice, not a documented guarantee.
  The fallback is two ordered `PATCH` requests (secret scanning, then push protection), which is also what the re-run of a failed
  update does.
- **Prerequisites.** None beyond the repository being public. The documentation of push protection says it "Requires GitHub
  Secret Protection to be enabled", which sits beside the availability table that lists push protection as available for a public
  repository without it. The working instance settles the reading: MagicBot is public, in this free organisation, has no code
  security configuration attached (`GET /repos/{o}/MagicBot/code-security-configuration` answers 204) and the organisation has no
  default configuration (`GET /orgs/{o}/code-security/configurations/defaults` answers `[]`), and shows both settings `enabled`
  (observed, 2026-11-12). So a repository-level enablement is possible without a configuration and without a purchase.
- **422 meanings with a source.** Reported by the Terraform provider's users (issue 1419, 2023): on a public repository,
  `422 Advanced security is always available for public repos`; on a private repository, `422 Advanced security has not been
  purchased`. Both were triggered by sending `advanced_security`, which is why it is left out. A 422 on a scanning field in this
  work means the field is not accepted for the repository or plan: report the message, do not retry with other fields. The
  enterprise-level code-security endpoints document 422 as "enablement in progress" or "policy prevents it"; that text is for
  other endpoints and is not evidence for this one.
- **Working instance.** `GET /repos/SpartanLaboratories/MagicBot` on 2026-11-12:
  `{"dependabot_security_updates":{"status":"disabled"},"secret_scanning":{"status":"enabled"},"secret_scanning_non_provider_patterns":{"status":"disabled"},"secret_scanning_push_protection":{"status":"enabled"},"secret_scanning_validity_checks":{"status":"disabled"}}`.
  No `advanced_security`, `code_security` or `secret_scanning_ai_detection` key is present. Private KotlinBottools: `null`.
- **Nothing is enabled by the change.** The documentation says of a repository made public only "The repository will
  automatically gain access to GitHub Advanced Security features." and, for public repositories, that secret scanning "runs
  automatically for free" (GitHub's partner-pattern scan). Repository-level user alerts and push protection are a setting. This
  agrees with the observed disabled state of the organisation's other public repositories (earlier findings).

### 3.3 Verification reads (documented; observed)

- `GET /repos/{owner}/{repo}`: `security_and_analysis` is shown only with admin permission ("In order to see the
  `security_and_analysis` block for a repository you must have admin permissions..."). The classic token has it.
- `GET /repos/{owner}/{repo}/secret-scanning/alerts`: "The authenticated user must be an administrator for the repository or for
  the organization that owns the repository"; "OAuth app tokens and personal access tokens (classic) need the `repo` or
  `security_events` scope... If this endpoint is only used with public repositories, the token can use the `public_repo` scope
  instead." Observed 2026-11-12: MagicBot 200 `[]`; public GKB2 (disabled) 404 "Secret scanning is disabled on this
  repository."; private KotlinBottools (disabled) 404 with the same message. The description text of the 404 reads "Repository
  is public or secret scanning is disabled for the repository"; the "public" half is contradicted by MagicBot's 200 and should
  be ignored.
- **Alert objects carry the literal secret by default.** The parameter `hide_secret` is "A boolean value representing whether
  or not to hide literal secrets in the results" with default `false`. A read that must never show a value sends
  `hide_secret=true` and projects only `secret_type` and `state` (`--jq '.[]|[.secret_type,.state]|@tsv'`); `--paginate` with
  `per_page=100` covers more than 100 alerts. Alerts are listed "from newest to oldest" and include open and resolved ones
  unless `state` is given. Generic-pattern alerts are kept in a separate list in the product; with generic patterns off, none
  are produced.
- **Anything else that shows push protection in force.** No other read. `GET .../rulesets` is a different feature (403 while
  private on Free, `[]` on MagicBot). The only behavioural proof is a push of a test secret, which is a protocol action and a
  write, and is not part of this work. Documentation also lists limits that make a read of the setting the correct claim:
  push protection skips a push larger than 50 MB in a public repository, may time out on large pushes, and covers a subset of
  patterns.
- **Alerts and the history.** "Secret scanning scans your entire Git history on all branches of your repository for hardcoded
  credentials"; it also scans issue, pull-request and discussion text and wikis. See 3.4 for timing.

### 3.4 After enabling: scan timing and completion (documented, observed; timing undocumented)

- **When it runs.** GitHub's changelog of 2024-12-20: "Backfill scans cover the entire repository and occur when secret scanning
  is enabled or patterns are updated." So the scan of the existing history is started by the enablement itself. GitHub documents
  no duration, no latency and no ordering between git history, issues and pull-request text. The REST example for scan history
  shows a git backfill that started at 02:47 and completed at 02:50, an illustration, not a guarantee. Alerts can therefore be
  empty for an unknown time while the scan is `pending` or `running`.
- **What the alerts list shows before the scan ends.** A 200 with `[]` (the same body as a scan that found nothing). The list
  cannot distinguish the two.
- **Completion read on Free.** `GET /repos/{owner}/{repo}/secret-scanning/scan-history`: "Lists the latest default incremental
  and backfill scans by type for a repository." with the note "This endpoint requires GitHub Advanced Security" and the 404
  description "Repository does not have GitHub Advanced Security or secret scanning enabled". Observed on MagicBot (public,
  scanning enabled, `advanced_security` absent) on 2026-10-21 and 2026-11-12: 404 "Advanced Security is disabled on this
  repository." The `secret_scanning_scan` webhook and audit-log events that report a finished backfill need "a GitHub Advanced
  Security license" and a webhook is itself a write. So no completion read exists in this work.
- **Rescans.** Secret scanning "periodically rescans repositories when new secret types are added", so an alert can appear on a
  later day with no change to the repository; the last of the three planned alert reads is a sample, not a proof of an empty
  history.
- **What the scan does not do.** The earlier findings' reading stands (3.9 there): it covers what a branch or tag reaches and
  issue and pull-request text; the documentation says nothing of unreferenced objects, so zero alerts says nothing about the old
  objects.
- **Actions logs.** Scanning of workflow logs is a public preview of 2026-11-09 that applies to GitHub Enterprise Cloud with
  Secret Protection or Advanced Security and is disabled by default; it does not apply to this repository.

### 3.5 The way back (documented; inference where marked)

- **Call.** `PATCH /repos/{owner}/{repo}` with `{"visibility":"private"}`; first read the response (`private` true), then a
  `GET`. Same permission as the change to public.
- **Documented effects of public to private** ("Changing from public to private", "Making a repository private", forks page):
  "Stars and watchers for this repository will be erased, which will affect repository rankings." "Current forks will remain
  public and will be detached from this repository." "GitHub will detach public forks of the public repository and put them
  into a new network. Public forks are not made private." "GitHub will no longer include the repository in the GitHub Archive
  Program." "If you're using GitHub Free for personal accounts or organizations, some features won't be available in the
  repository after you change the visibility to private" (Pages is unpublished; none exists here). GitHub Advanced Security
  features "will stop working unless the repository is owned by an organization that has access to the feature in private
  repositories".
- **Forks made meanwhile.** "Anyone can fork your repository" while it is public. A fork made in that window survives the
  revert as a public repository in a separate network and keeps its own copy of what it was given; "Commits pushed to any
  repository in a network can be accessible from other repositories in that network". The revert cannot reach it; its owner must
  delete it. The count to read first is `forks_count` and `GET .../forks`; read both before the revert (the plan's own reads
  have them at 0).
- **Stars and watchers.** KotlinBottools has `stargazers_count` 0, `watchers_count` 0, `subscribers_count` 0, and the signed-in
  account has no subscription (observed 2026-11-12). The erasure removes nothing.
- **Activity feed.** GitHub documents that the change to public publishes "your changes as activity"; it documents nothing about
  the feed on the change back. Inference: entries stay recorded on the repository and are read through the repository, so an
  anonymous reader loses them; anything a third party already copied stays. GH Archive "aim[s] to record the public GitHub
  timeline, archive it" and updates hourly, so a push event listed publicly in the window may be held there permanently. The
  repository events endpoint documents "event latency can be anywhere from 30s to 6h", so an anonymous events read made minutes
  after the change can miss an entry that appears later.
- **Actions logs.** "Actions history and logs will be visible to everyone" after the change to public; on the way back they are
  again gated by repository access (inference); copies already fetched stay with whoever fetched them.
- **Scanning settings.** For a private repository of a free organisation the availability table lists secret scanning and push
  protection as "No", and the baseline of this repository while private is `security_and_analysis: null` with the alerts
  endpoint answering 404. After the revert the expected reads are `security_and_analysis` `null` (or both settings not
  `enabled`) and alerts 404 (inference from the baseline). Sending `advanced_security` to a private free repository gives
  `422 Advanced security has not been purchased`, so no re-enable can be attempted while it is private.
- **A later change back to public.** Whether the stored `enabled` values return is not documented. The plan assumes they do not
  and sends the scanning `PATCH` again after any change to public, then reads it back; the call is idempotent. Alerts
  created during the public window: their retention after a revert is not documented (gap).

## 4. How comparable practice does it

- **`gh repo edit`** (cli/cli `v2.100.0`, `pkg/cmd/repo/edit/edit.go`): the visibility change and the three security flags
  (`EnableAdvancedSecurity`, `EnableSecretScanning`, `EnableSecretScanningPushProtection`, JSON `advanced_security`,
  `secret_scanning`, `secret_scanning_push_protection`) are fields of one `EditRepositoryInput` sent in one `PATCH`; success
  is silent without a terminal; it checks `viewerCanAdminister` via GraphQL only when a security flag is given.
- **Terraform GitHub provider** (`integrations/terraform-provider-github`, issue 1419, 2023): sends a `security_and_analysis`
  block with `secret_scanning` and `secret_scanning_push_protection` for public repositories and learned that `advanced_security`
  must be omitted for them (422), which is the same shape this plan uses.
- **GitHub's own guidance** for publishing: the visibility page lists the consequences (forks, stars, activity, Actions logs,
  push rulesets) and points to securing the repository after the change; the secret-scanning pages describe the repository
  setting as a switch an administrator flips after the repository is public.

## 5. Pitfalls

- **Sending `private` or `advanced_security`.** The first has a documented default `false`; the second is rejected with 422 on a
  public repository of a plan that has no purchase. Build the body from a file with the exact fields and nothing else.
- **Treating exit status 0 as success.** `gh api` and `gh repo edit` return 0 for any 2xx; the visibility change and the
  scanning change are both read back. `gh repo edit` prints nothing without a terminal.
- **Printing an alert as returned.** The default list carries the literal secret. Without `hide_secret=true` and a projection to
  `secret_type` and `state`, a secret would pass through the process and the log; the plan reads counts by type only.
- **Reading an empty alerts list as a finished scan.** The list is `[]` both before the scan ends and after a clean scan; no
  completion read exists on Free.
- **Reading an events or activity miss as absence.** Events carry 30 seconds to 6 hours of latency; a later read can show an
  entry the first read lacked. The activity and events checks are repeated across the measurement window.
- **Trusting the documented 404 text of the alerts endpoint.** It says "Repository is public"; MagicBot answers 200. Use the
  message body and the setting read.
- **Assuming the revert is a recall.** Forks, clones, archives, cached views and third-party copies are outside it. It stops new
  anonymous reads through the repository; it recalls nothing already taken.
- **`gh api --paginate --jq ... | sort | uniq -c`** returns the exit status of the last command of the pipe; capture the HTTP
  result in a variable or use `set -o pipefail`, and print the count of rows separately.

## 6. Recommendation for this repo

Use the REST `PATCH` through `gh api`, not `gh repo edit`: `gh repo edit` prints nothing and reads nothing back, and its single
`PATCH` body invites combining the two settings with the visibility change. Pin `X-GitHub-Api-Version: 2022-11-28`. Every call
below is sent as a request that carries the exact text, runs with the organisation administrator's classic token, and is
followed by the stated read before the next step. The variables are `O=SpartanLaboratories`, `R=KotlinBottools`.

**Before the change (reads only; any value other than expected stops the run with the repository private):**

```bash
gh api -i user | grep -i '^x-oauth-scopes'                                      # contains: repo
gh api "repos/$O/$R" --jq '[.visibility,(.private|tostring),(.security_and_analysis|tostring),.forks_count,.network_count,.stargazers_count,.subscribers_count]|@tsv'   # private  true  null  0  0  0  0
gh api "repos/$O/$R/secret-scanning/alerts" --silent; echo "rc=$?"            # rc=1 (404 "Secret scanning is disabled on this repository.")
```

**W1: visibility (body `visibility` only):**

```bash
gh api -X PATCH "repos/$O/$R" -H 'X-GitHub-Api-Version: 2022-11-28' -f visibility=public \
  --jq '[.visibility,(.private|tostring)]|join(" ")'                            # first read: public false
gh api "repos/$O/$R" --jq '[.visibility,(.private|tostring)]|join(" ")'        # verifying read: public false
```

Then the anonymous page read of the other unit (`200`, retried up to 6 times at 5 s). STOP on a non-zero exit or any other value;
403 or 422 means the account may not change visibility (report the message; no other method).

**W2: scanning and push protection (within the same minute; separate write; body from a file):**

```bash
printf '%s' '{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}' > "$OUT/security.json"
gh api -X PATCH "repos/$O/$R" -H 'X-GitHub-Api-Version: 2022-11-28' --input "$OUT/security.json" \
  --jq '[.security_and_analysis.secret_scanning.status,.security_and_analysis.secret_scanning_push_protection.status]|join(" ")'   # first read: enabled enabled
gh api "repos/$O/$R" --jq '.security_and_analysis|[.secret_scanning.status,.secret_scanning_push_protection.status,.secret_scanning_non_provider_patterns.status,.secret_scanning_validity_checks.status,(.secret_scanning_ai_detection.status // "absent"),(.advanced_security.status // "absent")]|join(" ")'
# expected: enabled enabled disabled disabled absent|disabled absent|disabled
```

If the `PATCH` fails, or the read shows either setting not `enabled` (retry the read up to 4 times at 5 s first): re-run at once,
as two ordered requests (`secret_scanning`, read, then `secret_scanning_push_protection`, read), report it, and never add other
fields. A 422 is reported with its message. `secret_scanning_non_provider_patterns`, validity checks, AI detection and
`advanced_security` must not read `enabled`; if one does, report it.

**Alert reads (right after W2; when the measurements end; once more before the documents land):**

```bash
gh api "repos/$O/$R/secret-scanning/alerts?hide_secret=true&per_page=100" --paginate --jq '.[]|[.secret_type,.state]|@tsv' | sort | uniq -c    # counts by type and state only; empty = none yet
```

200 is required; a 404 right after W2 is retried up to 4 times at 5 s, then treated as a failed scanning update (re-run W2 and
report). Record the count and the types with the time of each read. Say in the record that an empty list is not evidence that the
scan has finished.

**The way back (prepared request; sent at once when a pre-rewrite id answers anonymously or appears in the activity or events):**

```bash
gh api "repos/$O/$R" --jq '[.forks_count,.network_count]|@tsv'                  # record before
gh api "repos/$O/$R/forks" --jq length                                          # record before
gh api -X PATCH "repos/$O/$R" -H 'X-GitHub-Api-Version: 2022-11-28' -f visibility=private \
  --jq '[.visibility,(.private|tostring)]|join(" ")'                            # first read: private true
gh api "repos/$O/$R" --jq '[.visibility,(.private|tostring),(.security_and_analysis|tostring)]|@tsv'   # private true null (record the actual value)
```

Then the anonymous page answers 404; the alerts read answers 404; the hand-back reports each fork, the count of alerts seen, and
that the revert recalls nothing. A later change to public repeats W1 and W2.

**Rejected:** `gh repo edit --visibility ... --enable-secret-scanning ...` in one call (one body, not separate writes, silent
without a terminal); a test push to prove push protection (a protocol action); sending `advanced_security` (422); enabling
generic patterns, validity checks or AI detection (paid); a webhook to learn when the scan ends (a write, and needs Advanced
Security).

## 7. Load-bearing claims

1. **The visibility field and its values.** "The visibility of the repository." enum `public`, `private`. Source: REST description
   `descriptions/api.github.com/api.github.com.json` (operation `repos/update`, request body `visibility`),
   <https://github.com/github/rest-api-description/blob/5c36b6f685/descriptions/api.github.com/api.github.com.json>, commit
   `5c36b6f685` (2026-11-11), `info.version` 1.1.4; the file for `2026-03-10` has the same operation.
2. **`private` default and the 422 cause.** "Either `true` to make the repository private or `false` to make it public. Default:
   `false`." and "You will get a `422` error if the organization restricts [changing repository visibility] ... to organization
   owners and a non-owner tries to change the value of private." Same file and commit as claim 1 (`private` property).
3. **`security_and_analysis` permission and `advanced_security` limit.** "To use this parameter, you must have admin permissions
   for the repository or be an owner or security manager for the organization that owns the repository." and "For standalone Code
   Scanning or Secret Protection products, this parameter cannot be used." Same file and commit (`security_and_analysis`
   property and its `advanced_security` sub-object).
4. **The response of the update is the full repository.** Response `200` of `repos/update` is `{"$ref":"#/components/schemas/full-repository"}`,
   which has `visibility`, `private`, `security_and_analysis`, `forks_count`, `network_count`, `stargazers_count`; the 422 text is
   "Validation failed, or the endpoint has been spammed." Same file and commit; rendered at
   <https://docs.github.com/en/rest/repos/repos#update-a-repository>.
5. **The administrator-only view of `security_and_analysis`.** "In order to see the `security_and_analysis` block for a repository
   you must have admin permissions for the repository or be an owner or security manager for the organization that owns the
   repository." Same file and commit (`repos/get`).
6. **The alerts endpoint: permission, scope, 404, secret field.** "The authenticated user must be an administrator for the
   repository or for the organization that owns the repository to use this endpoint." and "OAuth app tokens and personal access
   tokens (classic) need the `repo` or `security_events` scope to use this endpoint."; 404 "Repository is public or secret
   scanning is disabled for the repository"; `hide_secret`: "A boolean value representing whether or not to hide literal secrets
   in the results." (default `false`); the alert schema has a `secret` property. Same file and commit
   (`secret-scanning/list-alerts-for-repo`, parameter `secret-scanning-alert-hide-secret`, schema `secret-scanning-alert`);
   rendered at <https://docs.github.com/en/rest/secret-scanning/secret-scanning#list-secret-scanning-alerts-for-a-repository>.
7. **The scan-history endpoint needs Advanced Security.** "Lists the latest default incremental and backfill scans by type for a
   repository." and "This endpoint requires [GitHub Advanced Security]"; 404 "Repository does not have GitHub Advanced Security
   or secret scanning enabled". Same file and commit (`secret-scanning/get-scan-history`). Observed on 2026-11-12: `gh api
   repos/SpartanLaboratories/MagicBot/secret-scanning/scan-history` returned `{"message":"Advanced Security is disabled on this
   repository.", ... "status":"404"}`.
8. **The two API versions are the same for these operations, and the old one stays supported.** `gh api versions` on 2026-11-12:
   `["2026-03-10","2022-11-28"]`; operations `repos/update`, `repos/get`, `secret-scanning/list-alerts-for-repo`,
   `secret-scanning/get-scan-history` and the `security-and-analysis` schema compare equal between
   `api.github.com.json` and `api.github.com.2026-03-10.json` at commit `5c36b6f685`. "When a new REST API version is released,
   the previous API version will be supported for at least 24 more months following the release of the new API version."
   Source: `data/reusables/rest-api/about-api-versions.md`,
   <https://github.com/github/docs/blob/2b4f2c7398/data/reusables/rest-api/about-api-versions.md>, `github/docs` commit
   `2b4f2c7398` (2026-11-11).
9. **`gh repo edit` sends one body and prints only on a terminal.** In `pkg/cmd/repo/edit/edit.go`: `if opts.IO.IsStdoutTTY() {`
   ... `"%s Edited repository %s\n"`; the type `SecurityAndAnalysisInput` has `EnableSecretScanning ... json:"secret_scanning,omitempty"`
   and `EnableSecretScanningPushProtection ... json:"secret_scanning_push_protection,omitempty"`; the flag help is "Enable secret
   scanning push protection in the repository. Secret scanning must be enabled first"; the topics call is the only edit started
   with `g.Go` besides the one `PATCH`. Source:
   <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/repo/edit/edit.go>, tag `v2.100.0` (the version on this machine, released
   2026-09-03).
10. **The consequences of a change to public.** "The code will be visible to everyone who can visit GitHub.com." "Anyone can fork
    your repository." "All push rulesets will be disabled." "Your changes will be published as activity." "Actions history and logs
    will be visible to everyone." "Stars and watchers for this repository will be erased." Also: "The repository will automatically
    gain access to GitHub Advanced Security features." Source:
    <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility>,
    read 2026-11-12 (source file in `github/docs` commit `2b4f2c7398`).
11. **The consequences of a change to private.** "Stars and watchers for this repository will be erased, which will affect
    repository rankings." "Current forks will remain public and will be detached from this repository." "GitHub will detach
    public forks of the public repository and put them into a new network." "Public forks are not made private." "GitHub will no
    longer include the repository in the GitHub Archive Program." Same page as claim 10.
12. **Forks across a visibility change and shared network data.** Table rows "A public repository is made private | Its public
    forks stay public in a separate network." and "A private repository is made public | Private forks stay private but
    disconnect into separate private networks."; "Commits pushed to any repository in a network can be accessible from other
    repositories in that network, including the upstream repository." Source:
    <https://docs.github.com/en/pull-requests/reference/forks>, read 2026-11-12 (source file in `github/docs` commit `2b4f2c7398`).
13. **Secret scanning and push protection are available on a public repository without a purchase.** "Some of these features, such
    as code scanning and secret scanning, are enabled for public repositories by default." and the Secret Protection table rows:
    Secret scanning Yes / No / Yes; Push protection Yes / No / Yes for (public without Secret Protection, private without, public
    or private with). "Public repositories: Secret scanning runs automatically for free." "Secret scanning alerts for users can be
    enabled on any free public repository that you own." Sources:
    <https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security>,
    <https://docs.github.com/en/code-security/concepts/secret-security/about-secret-scanning>,
    <https://docs.github.com/en/code-security/how-tos/secure-your-secrets/detect-secret-leaks/enable-secret-scanning>, read
    2026-11-12.
14. **Push protection for repositories is a setting, off by default.** "Requires GitHub Secret Protection to be enabled" and "Is
    disabled by default, and can be enabled by a repository administrator, organization owner, security manager". Source:
    <https://docs.github.com/en/code-security/concepts/secret-security/push-protection>, read 2026-11-12.
15. **Scope of the scan.** "Secret scanning scans your entire Git history on all branches of your repository for hardcoded
    credentials". Source: <https://docs.github.com/en/code-security/concepts/secret-security/about-secret-scanning>, read
    2026-11-12.
16. **A backfill scan starts when scanning is enabled, and its completion events need Advanced Security.** "Backfill scans cover
    the entire repository and occur when secret scanning is enabled or patterns are updated." and "A repository must have a GitHub
    Advanced Security license to access these events." Source:
    <https://github.blog/changelog/2024-12-20-audit-log-and-webhook-events-for-secret-scan-completions/>, 2024-12-20.
17. **Events latency.** "Depending on the time of day, event latency can be anywhere from 30s to 6h." Source: REST description,
    operation `activity/list-repo-events`, description text, same file and commit as claim 1 (rendered at
    <https://docs.github.com/en/rest/activity/events#list-repository-events>).
18. **The 422 messages that `advanced_security` causes.** "422 Advanced security is always available for public repos" and
    "Private repos: `422 Advanced security has not been purchased []`". Source: Terraform provider issue 1419,
    <https://github.com/integrations/terraform-provider-github/issues/1419>, 2023 (provider versions 5.9 to 5.12); the message text
    was not re-observed in 2026 (see Gaps).
19. **Working instance.** `GET /repos/SpartanLaboratories/MagicBot` on 2026-11-12 returned `visibility` `public` and
    `security_and_analysis` with `secret_scanning` `enabled`, `secret_scanning_push_protection` `enabled`,
    `secret_scanning_non_provider_patterns` `disabled`, `secret_scanning_validity_checks` `disabled`; `GET .../secret-scanning/alerts`
    returned 200 with no entries; `GET .../code-security-configuration` returned 204; the organisation's
    `.../code-security/configurations/defaults` returned `[]`. Observed with the organisation administrator's token, read only.
20. **Changelog since 2026-10-21 does not change the calls.** The entry of 2026-11-09 "Secret scanning detects secrets in GitHub
    Actions workflow logs" says "The preview is available to enterprises on GitHub Enterprise Cloud with GitHub Secret Protection
    or GitHub Advanced Security" and "The policy is disabled by default"; the entry of 2026-10-28 "Push protection beyond predefined
    secret patterns" is for organisations "with GitHub Secret Protection (GHSP) or GitHub Advanced Security (GHAS)" and "AI
    detection in push protection consumes AI credits". Sources:
    <https://github.blog/changelog/2026-11-09-secret-scanning-detects-secrets-in-github-actions-workflow-logs>,
    <https://github.blog/changelog/2026-10-28-push-protection-beyond-predefined-secret-patterns>. The 2026-10-20 entry
    (<https://github.blog/changelog/2026-10-20-updates-to-github-secret-scanning>) concerns audit-log fields, custom-pattern and
    delegated-bypass API fixes and private and internal repositories, not this endpoint set.
21. **Third-party recording of the public timeline.** GH Archive's purpose is to "record the public GitHub timeline, archive it,
    and make it easily accessible for further analysis"; its dataset is "automatically updated every hour". Source:
    <https://www.gharchive.org/>, read 2026-11-12.

## 8. Gaps

- **Not tested, because nothing may be written:** that one `PATCH` carrying both scanning objects is accepted on a freshly public
  repository of a free organisation; that the `PATCH` response already shows `visibility: public` and the new settings
  immediately; how long a read can lag a write. The recommendation reads back with retries and has a documented fallback of two
  ordered requests.
- **No duration** for the first scan of the history and no free-plan completion read were found. The alerts-list timing in the plan
  is a set of samples, not a bound.
- **Settings after a revert and a second change to public** (kept or cleared) and **the fate of alerts** created in the public
  window are not documented; the expectation `null` after the revert is an inference from the baseline of this repository. The
  recorded read after the revert is the evidence.
- **The effect of the revert on the activity feed, the Actions run list and the events endpoint** is not documented; stated as
  inference where used.
- **403 and 307 causes** of the update endpoint are not documented beyond the owners-only 422; the 422 wording for the
  owners-only restriction is the REST text, not a captured response body.
- **The 422 messages of claim 18** come from one 2023 issue about Terraform provider versions 5.x, a single source; they may have
  changed wording.
- **Changelog coverage:** the list of entries since 2026-10-21 came from GitHub's label page read through a summarising fetch; the
  entries of 2026-11-09, 2026-10-28 and 2026-10-20 were opened and read; the entries titled "Secret scanning upgrades detectors,
  adds SpaceX as partner" (2026-11-05), "Secret scanning blocks Anthropic keys by default, adds Salesforce" (2026-10-13) and the
  two earlier October entries were judged by title only.
- **The messages that the organisation's setting `members_can_change_repo_visibility` produces** were not exercised; the account
  is an administrator and the setting reads `true`.
