# The rename swap with the source made private: order and observable results

Read 2026-11-09. Tools here are operational scripts (`gh` 2.100.0, Python, Git Bash), not Kotlin, so
the Kotlin lens does not apply and nothing below is Kotlin-specific.

## 1. Question

In what order should a repository swap rename the public source to a `-legacy` name, make it private,
archive it, and rename a private target onto the source's old name, and how does a script prove every
step on repositories that are private or archived (by name and by id, through REST), including by
following a transferred issue's old URL? The answer must hold for `SpartanLaboratories` (free plan,
token without `delete_repo`), end with both repositories private and archived, and separate what
GitHub documents, what can be observed read-only today, and what only the rehearsal can show.

## 2. Bottom line

- **Order: rename source, make it private, archive it, rename the target, archive the target.** Two
  constraints are firm: an archive must come after every other change to that repository (GitHub says
  changes need an unarchive first, and a visibility `PATCH` on an archived repository was refused with
  `403 Repository was archived so is read-only` in 2021 and again in a report of 2026-09-18), and the
  target's rename must come after the source's rename frees the name. Nothing found forces an order
  between the source's rename and its privacy change; keeping the rename first matches the design and
  leaves every failure state reversible (rename back, visibility back, unarchive).
- **All three writes are one REST call shape**: `PATCH repos/{owner}/{repo}` with `name`, `visibility`
  (or `private`) and `archived`. Use `-F archived=true` (typed), never `-f`, which sends the string
  `"true"`. The calls are addressed to the repository's name *at that moment*, never to a name that a
  rename has since released.
- **A script proves a step by id, not by name.** `GET repositories/{id}` and `GET repos/{owner}/{name}`
  both return `id`, `full_name`, `private`, `visibility` and `archived`. After a rename the old name
  answers `301` to `https://api.github.com/repositories/{id}` (observed), which `gh api` follows
  silently, so a name-based `gh api` read cannot tell a redirect from a direct hit; compare the id.
  Once another repository takes the name the old name answers `200` with the new repository's id
  (documented by GitHub's own statements; not observable read-only).
- **A transferred issue's old URL is a `301` on REST** with `Location: https://api.github.com/repos/
  {owner}/{repo}/issues/{n}` (observed on two public repositories; on the web it is a `302`).
  `gh api` follows it and prints the target issue, so the hop is invisible unless `gh api --verbose` or
  a no-follow `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n'` is used.
- **`git ls-remote` of a renamed repository's old name is not a redirect either**: git's smart-HTTP
  endpoint answers `200` directly and lists the renamed repository's heads (observed). It therefore
  proves content, not identity; on an empty target it lists nothing and cannot discriminate at all.
- **Unknown until the rehearsal runs:** whether a rename onto a name freed moments earlier succeeds
  (documentation covers only *creating* a repository under the old name); whether a visibility change
  alters a transferred issue's redirect; what the redirect `Location` shows after the target's rename.

## 3. Findings

Tiers: **consensus** = documented by GitHub or by several independent sources; **practice** = what
GitHub or mature tools visibly do; **one source** = a single report; **observed** = read-only
observation on 2026-11-09 with the commands in section 3.8.

### 3.1 Renaming (documented basics are in the parent design §2.4; only additions here)

- **Consensus, docs.github.com "Renaming a repository" (source file at `github/docs` commit
  `2bbf57a648`, 2026-03-12):** existing information is redirected to the new name, including issues;
  `git clone`, `git fetch` and `git push` against the previous location keep working; reusing the
  old name for a new repository ends the redirect. The page says nothing about archived or private
  repositories and nothing about renaming a repository *onto* a released name.
- **Consensus, GitHub staff and Support (community discussion 22669, 2018-02-01 and 2024-12-09):**
  "We keep redirects for moved and renamed repos indefinitely, but new repos take priority over
  redirects." The 2024 Support reply adds that redirects end when "a repository with the same name is
  created" or when an owner asks Support to remove them. The transfer page says such a redirect is
  "permanently deleted", the staff reply says it lasts "for as long as that new repo exists", and a
  user reports it returning after the blocking repository was deleted. The sources disagree on
  permanence; it does not matter here because no repository is deleted.
- **Practice, REST reference (OpenAPI description at `github/rest-api-description` commit
  `2f8f80e47e`, 2026-11-07):** `GET /repos/{owner}/{repo}` lists a `301` response and
  `PATCH /repos/{owner}/{repo}` lists a `307`. A write sent to a released name is therefore redirected
  to the renamed repository, and a default HTTP client follows a `307` and replays the body. `gh repo
  delete` suppresses redirects on purpose (its test comment: "Without it Go declines to follow the 307
  regardless of the client's CheckRedirect policy"), which shows the hazard is real. After the swap,
  the old name belongs to a different repository, so any write addressed to it lands on that one.
- **Observed:** GraphQL `repository(owner,name)` also follows the redirect (`Homebrew/homebrew`
  returns `nameWithOwner: Homebrew/legacy-homebrew`). `gh repo archive` and `gh repo edit` resolve
  their repository argument through that query, so they also act on whatever the name resolves to now.
- **Observed redirect shapes for a renamed repository** (`Homebrew/homebrew` renamed to
  `Homebrew/legacy-homebrew`, id 206084; `joyent/node` to `nodejs/node-v0.x-archive`, id 211666):
  REST by name `301` with `Location: https://api.github.com/repositories/206084`; web `301` with
  `Location: https://github.com/Homebrew/legacy-homebrew`; git `info/refs` `200` directly. Both
  repositories are archived, so an archived repository's old name keeps redirecting.

### 3.2 Public to private

- **Consensus, docs.github.com "Setting repository visibility" (`github/docs` commit `0b183d589a`,
  2026-08-14):** for a public repository made private, stars and watchers are erased, public forks are
  detached and stay public, code scanning and custom Dependabot rules stop unless Code Security is
  enabled, a published Pages site is unpublished on the Free plan, and the repository leaves the GitHub
  Archive Program. The page names no consequence for issues, issue links, redirects or archived
  repositories. This repository has no forks, stars, watchers or Pages (parent design §3.D counts).
- **API (consensus, REST reference above):** `PATCH repos/{owner}/{repo}` with `visibility` (enum
  `public`, `private`) or `private` (boolean). A `422` means "the organization restricts changing
  repository visibility to organization owners and a non-owner tries to change the value of private."
  GraphQL `updateRepository` has no visibility field (schema introspection, 2026-11-09), so REST is the
  only path besides the UI. `gh repo edit --visibility private --accept-visibility-change-consequences`
  sends the same `PATCH` (`gh` v2.100.0, `pkg/cmd/repo/edit/edit.go`) and refuses to run without the
  acceptance flag.
- **Observed, this organisation:** the signed-in account's membership role is `admin` (an owner),
  `members_can_change_repo_visibility` is `true`, the plan is `free` with 10000 private repositories
  allowed and 2 used, and the token's `permissions.admin` is `true` on `KotlinBottools`. A public
  repository can be made private on the Free plan (docs.github.com "GitHub's plans": organisations on
  Free get "unlimited private repositories with a limited feature set"). Nothing found says an
  administrator of an organisation-owned repository on Free is blocked; the documented blocker is the
  owner-only policy, which is off.
- **Read-back:** `GET` returns both `private` (boolean) and `visibility` (string). Observed on the
  private `TrumpBot`: `private: true`, `visibility: "private"`. An unauthenticated request to a private
  repository answers `404` by name, by id and on the web (observed), which is the proof that it is no
  longer public.
- **Effect on transfers already made and on links: not documented.** The transfer page says people
  without read permission on the new repository "will see a banner letting them know that the issue has
  been transferred to a new repository that they can't access" and "A private repository issue cannot be
  transferred to a public repository." Both cover access, not the redirect's existence. Treat any effect
  on the redirect or on cross-repository links as unknown until measured.

### 3.3 Archiving

- **Consensus, docs.github.com "Archiving repositories" (`github/docs` commit `6c39b7b7de`,
  2026-07-08):** "its issues, pull requests, code, labels, milestones, projects, wiki, releases,
  commits, tags, branches, reactions, code scanning alerts, comments and permissions become read-only.
  To make changes in an archived repository, you must unarchive the repository first." Collaborators and
  teams cannot be added or removed. The page does not say that a rename or a visibility change is
  blocked.
- **Whether a renamed, private or archived repository can later change name or visibility:**
  - Renamed or private: no documented restriction on a later rename or visibility change. Each
    repository here is renamed once.
  - Archived, visibility: **one source plus a corroborating older thread.** The Terraform GitHub
    provider issue 3649 (opened 2026-09-18, provider 6.13.0, an enterprise-managed organisation)
    records `PATCH https://api.github.com/repos/ORG/REPO: 403 Repository was archived so is read-only`
    for a visibility change after the archive. A 2021 community thread reports the same `403` through
    REST while the web UI still allowed the change, the two disagreeing with each other.
  - Archived, rename: **unknown.** No source found either way. The order makes it moot.
- **API:** `PATCH repos/{owner}/{repo}` with `archived` (boolean; "`false` will unarchive a previously
  archived repository", REST reference above). GraphQL has `archiveRepository(input:
  {repositoryId})` and `unarchiveRepository`. `gh repo archive` uses the GraphQL mutation (`gh` v2.100.0,
  `pkg/cmd/repo/archive/http.go`), so it needs the node id; the REST form needs only the name.
- **Reversible:** yes, by REST `archived=false`, GraphQL `unarchiveRepository` or the settings page, and
  none needs `delete_repo`. The 2021 thread says REST could not unarchive then; the current reference
  documents it. For this work it matters only as the recovery for a mis-ordered step: unarchive, fix,
  archive again.
- **Reads on archived repositories work.** Observed: GraphQL on the archived `Homebrew/legacy-homebrew`
  returns `isArchived: true` and, per issue, `state`, `parent`, `subIssues`, `blockedBy` and `blocking`
  (all empty there, so it proves the fields resolve, not that links exist). REST issue reads on the
  archived `dotnet/cli` work (3.5). Reads on a *private and archived* repository were not observed.

### 3.4 Reading identity by name and by id

- **Practice, observed:** `GET repositories/{id}` returns the full repository object (id, `full_name`,
  `private`, `visibility`, `archived`) for a public repository (`562658298`, `206084`) and a private
  one (`540208924`). It is absent from the OpenAPI description (only `GET /repositories`, the list,
  is there), but the `301` for a renamed repository points to it, so it is a de facto stable route.
  GraphQL `node(id:)` on the repository's node id (`R_kgDOIYl7-g`) returns `databaseId`,
  `nameWithOwner`, `isPrivate`, `isArchived`.
- **Name after a rename while the redirect exists:** `301` with the `/repositories/{id}` `Location`
  (observed). `gh api` follows it and returns the renamed repository with a `200`.
- **Name after another repository has taken it:** the new repository answers directly with its own id
  and a `200`. Documented only through the statements in 3.1; no public example could be found
  read-only. The rehearsal observes it.
- **The `archived` flag versus `disabled`:** the object carries a separate `disabled` field; the proof
  reads `archived`.

### 3.5 Following a transferred issue's old URL

- **Consensus, REST reference for "Get an issue":** "The API returns a `301 Moved Permanently` status
  if the issue was transferred to another repository. If the issue was transferred to or deleted from a
  repository where the authenticated user lacks read access, the API returns a `404 Not Found` status."
  Deleted issues answer `410`.
- **Observed on two real transferred issues** (found through GraphQL `TransferredEvent` and the source
  number by probing the gap in the source's numbers):
  - `dotnet/command-line-api` #2794 moved to `dotnet/sdk` #53825 (transferred 2026-04-11):
    `curl -sI` with a token gives `HTTP/1.1 301 Moved Permanently`, `Location:
    https://api.github.com/repos/dotnet/sdk/issues/53825`; the body is `{"message": "Moved Permanently",
    "url": "https://api.github.com/repos/dotnet/sdk/issues/53825", "documentation_url": ...}`; the web
    URL answers `302` to `https://github.com/dotnet/sdk/issues/53825`.
  - `dotnet/cli` (archived) #6020 moved to `dotnet/installer` #6959: REST `301`, `Location:
    https://api.github.com/repos/dotnet/installer/issues/6959`; web `302`. So an archived source's
    redirect works.
  - The `Location` is a name-based issue URL (not an id URL, unlike repository renames). It is
    unknown whether it is stored or computed per request, so it is unknown what it shows after the
    target is renamed.
- **`gh api` follows the redirect.** `gh api repos/dotnet/cli/issues/6020` prints issue #6959 (`number`
  6959, `html_url` under `dotnet/installer`) and `-i` shows only the final `HTTP/2.0 200 OK`. `gh api
  --verbose` prints both hops (stdout, not stderr): `< HTTP/2.0 301 Moved Permanently`, `< Location:
  ...`, then `< HTTP/2.0 200 OK`; it redacts the token (`Authorization: token ████`). `gh api` has no
  no-follow flag (`gh api --help` at 2.100.0); the `api` package's no-follow option
  (`noFollowRedirects` in `api/client.go`) is internal. `--verbose` and `--silent` are mutually
  exclusive. A script that must assert the `301` uses `--verbose` or a no-follow `curl`.
- **Consequence for the proof:** the issue number in the answer is the target's. A transferred issue
  must be proven by comparing `number`, `repository_url` and the repository id of the answer with the
  expected target, not by status code alone.
- **`git ls-remote` of an old name (observed):** `git ls-remote https://github.com/Homebrew/homebrew.git`
  and the `legacy-homebrew` URL list the same `HEAD` (`c092d647…`); `curl` of
  `…/Homebrew/homebrew.git/info/refs?service=git-upload-pack` is `200` with no `Location`. A name that
  never existed answers `remote: Repository not found.` (observed for the unused
  `phase0-rehearsal-a`). A private repository needs credentials: anonymous `git ls-remote` of
  `TrumpBot` prompts (and fails without a terminal), while the configured credential manager and the
  one-off `-c "credential.helper=!gh auth git-credential"` both succeed. What it lists after another
  repository takes the name was not observable read-only; it lists that repository's heads (the staff
  statement above), and an empty repository lists nothing with exit status 0.

### 3.6 Order relative to the fixture's issue links and writes

- Every issue write belongs to a repository that is not archived: issue transfer, issue edit, comment,
  label and milestone changes, sub-issue and "blocked by" link changes. Archiving makes "issues, pull
  requests, … labels, milestones, … comments" read-only (3.3). So all transfers and all link
  re-creation finish before the archive of the repository they touch: the source before its archive,
  the target before the target's archive.
- A transfer needs the *source* to accept an issue write, so no transfer can run after the source is
  archived. The target is not archived until after the swap, so link reconciliation on the target can
  run between the target's rename and its archive.
- The "private cannot go to public" transfer rule is irrelevant after the flip, since nothing moves
  after it, and was satisfied during the walk (public source to private target).
- Reads (REST and GraphQL, including the relationship fields) work on archived repositories (3.3).
- Order relative to the redirects: the old URL of a transferred issue resolves (a) while the source
  holds the old name, through the source's own redirect, (b) after the source is renamed, through the
  repository redirect and then the issue redirect, and (c) after the target takes the old name, as a
  direct hit on the target if the numbers match. The rehearsal can follow it at each of the three
  points.

### 3.7 Alternative orders considered

| Order | Verdict |
|---|---|
| rename S, private S, archive S, rename T, archive T | recommended; each step is verifiable alone; failure states are reversible |
| private S, rename S, archive S, rename T, archive T | equally valid mechanically; closes public exposure first, but a failed rename leaves the project's public name dead with no replacement; no evidence favours it |
| rename S, rename T, then private S, archive S, archive T | shortens the window in which the name resolves to the legacy repository, but leaves the legacy repository public after the fresh one holds the name; the id check already covers the window |
| archive S before private S | refused (`403` on the visibility `PATCH`) or needs unarchive first; reject |
| archive T before rename T | rename of an archived repository is unknown; reject |
| rename T before rename S | the name is still held by S; reject |

The window between the source's rename and the target's rename lasts as long as the read-backs between
them. It is not a correctness risk, and the rehearsal should record its length in seconds.

### 3.8 Read-only observations (2026-11-09) and how to repeat them

| Check | Command | Result |
|---|---|---|
| Rename redirect, REST | `curl -sI -H "Authorization: Bearer $(gh auth token)" https://api.github.com/repos/Homebrew/homebrew` | `301`, `Location: https://api.github.com/repositories/206084` |
| Rename redirect, web | `curl -sI https://github.com/Homebrew/homebrew` | `301`, `Location: https://github.com/Homebrew/legacy-homebrew` |
| Rename, `gh api` | `gh api -i repos/Homebrew/homebrew` | `200`, final response only; `full_name` `Homebrew/legacy-homebrew` |
| Rename, git | `curl -s -o /dev/null -w '%{http_code}' 'https://github.com/Homebrew/homebrew.git/info/refs?service=git-upload-pack'` | `200`, no redirect |
| By id, public and private | `gh api repositories/562658298`, `gh api repositories/540208924` | full objects, `private` false and true |
| GraphQL by old name | `gh api graphql -f query='query{repository(owner:"Homebrew",name:"homebrew"){databaseId nameWithOwner isArchived}}'` | `nameWithOwner` `Homebrew/legacy-homebrew`, `isArchived` true |
| Transferred issue, REST | `curl -sI -H "Authorization: Bearer $(gh auth token)" https://api.github.com/repos/dotnet/command-line-api/issues/2794` | `301`, `Location: …/repos/dotnet/sdk/issues/53825` |
| Transferred issue, web | `curl -sI https://github.com/dotnet/command-line-api/issues/2794` | `302`, `Location: https://github.com/dotnet/sdk/issues/53825` |
| Hops through `gh` | `gh api --verbose repos/dotnet/cli/issues/6020 \| grep -E '^< (HTTP\|Location)'` | `301`, `Location`, then `200` |
| Private, anonymous | `curl -s -o /dev/null -w '%{http_code}' https://api.github.com/repos/SpartanLaboratories/TrumpBot` | `404` (by id and on the web too) |
| Unused rehearsal names | `gh api repos/SpartanLaboratories/phase0-rehearsal-a`, `…-b` | `404` for both on 2026-11-09 |

## 4. How comparable projects do it

- **GitHub CLI 2.100.0** (tag `v2.100.0`, commit `45437bc7`): `RenameRepo` in `api/queries_repo.go`
  sends `PATCH repos/{owner}/{repo}` with `{"name": newRepoName}`; `archiveRepo` in
  `pkg/cmd/repo/archive/http.go` runs the GraphQL mutation `archiveRepository(input: $input)` with
  `githubv4.ArchiveRepositoryInput{RepositoryID: repo.ID}` and first reports "is already archived";
  `gh repo edit` requires `--accept-visibility-change-consequences` with `--visibility` and sends a
  `PATCH` with `visibility`. `gh repo delete` is the only one that turns redirects off.
- **Terraform GitHub provider** (`integrations/terraform-provider-github` 6.13.0, issue 3649, open on
  2026-09-18): the maintainers' own account of the expected behaviour is "apply the visibility change
  first and archive the repository last. Archiving makes the repository read-only, so no visibility or
  other mutable repository update should be attempted afterward." Its bug is the order recommended
  against above.
- **Homebrew and Node.js** are public cases of the same swap-shape: `Homebrew/homebrew` renamed to
  `Homebrew/legacy-homebrew` and archived, `joyent/node` to `nodejs/node-v0.x-archive`, both still
  redirecting on 2026-11-09 because nobody took the old name. No public case of the second half (a
  different repository taking the freed name) could be found read-only.

## 5. Pitfalls and regrets

- **Typed fields.** `gh api -f archived=true` sends a string; `-F archived=true` sends the boolean.
  `gh api --help`: "literal values `true`, `false`, `null`, and integer numbers get converted to
  appropriate JSON types." Under Git Bash, `gh api /repos/...` is rewritten to a Windows path;
  omit the leading slash (gh's own error says so). Never write `repos/{owner}/{repo}` literally:
  `gh api` replaces the placeholders from the current directory's repository.
- **A redirect makes a read look like a hit.** `gh api repos/O/old-name` succeeds with the renamed
  repository's data. Always compare `id`.
- **Name-addressed commands act on the current holder of the name.** After the target takes
  `phase0-rehearsal-a`, `gh repo archive O/phase0-rehearsal-a` archives the target. Address each write
  by the name the repository holds right then, after reading its id.
- **A rename can fail with the repository half-swapped.** The design's hand-back state covers it; the
  script should print the ids at both names before and after each write, so a re-run can resume from
  the first step that did not take.
- **Read-after-write.** REST reads carry `Cache-Control: private, max-age=60`. `gh api` and `curl` keep
  no client cache, but nothing found documents read-your-writes consistency for a rename or visibility
  change. A bounded poll (a few seconds, a few attempts) per read-back guards against propagation
  lag; this is a precaution, not an observed need.
- **Pages, Actions and other redirect gaps.** Pages URLs and calls to an action in a renamed repository
  are not redirected (renaming page). Neither repository here has Pages or hosts an action; the real
  `KotlinBottools` has neither (parent design §3.D shows 0 webhooks and no Pages), but its pull-request
  and commit URLs under the old name will resolve to the fresh repository after the swap and not to
  the legacy one.
- **Reopening costs a state change.** A step done in the wrong order is recoverable by unarchive but
  the unarchive is itself a write that needs reading back before continuing.

## 6. Recommendation for this repo

Run the stage in this order, each write followed by its read-back before the next, and carry the
source id `S` and the target id `T` (read once at the start by name):

1. **Pre-checks (reads):** `GET repos/O/phase0-rehearsal-a` gives `id` = `S`, `private` false,
   `archived` false, `permissions.admin` true; `GET repos/O/phase0-rehearsal-b` gives `id` = `T`,
   `private` true; `GET repos/O/phase0-rehearsal-a-legacy` is `404`; the org's
   `members_can_change_repo_visibility` is read; `git ls-remote` of the source lists its head and the
   target's lists nothing.
2. **Rename source:** `gh api -X PATCH repos/O/phase0-rehearsal-a -f name=phase0-rehearsal-a-legacy`.
   Read back: `GET repositories/S` has `full_name` `O/phase0-rehearsal-a-legacy`; `GET
   repos/O/phase0-rehearsal-a-legacy` has `id` S; the old name answers `301` with `Location
   https://api.github.com/repositories/S` (no-follow `curl`), and `gh api` by the old name returns `id`
   S. Follow the transferred issue's old URL (point (b), 3.6). Record the time.
3. **Private:** `gh api -X PATCH repos/O/phase0-rehearsal-a-legacy -f visibility=private`. Read back:
   `GET repositories/S` has `private` true, `visibility` `private`, `archived` false; an
   unauthenticated `GET` by id, by name and on the web answers `404`.
4. **Archive:** `gh api -X PATCH repos/O/phase0-rehearsal-a-legacy -F archived=true`. Read back:
   `GET repositories/S` has `archived` true and `private` true, name unchanged. Follow the transferred
   issue's old URL again.
5. **Rename target:** `gh api -X PATCH repos/O/phase0-rehearsal-b -f name=phase0-rehearsal-a`. Expect
   `200` (U1 below). Read back: `GET repos/O/phase0-rehearsal-a` has `id` T (and not S) and `private`
   true; `GET repositories/T` has `full_name` `O/phase0-rehearsal-a`; `GET repositories/S` still has
   `full_name` `O/phase0-rehearsal-a-legacy`; `GET repos/O/phase0-rehearsal-a-legacy` has `id` S;
   `git ls-remote` of the old name no longer lists the source's head (it lists the target's, here none)
   and of the `-legacy` name still lists it; `GET repos/O/phase0-rehearsal-b` answers `301` to
   `/repositories/T`. Record the time; the difference from step 2 is the window.
6. **Follow the transferred issue's old URL** (point (c)): no-follow `curl` of
   `https://api.github.com/repos/O/phase0-rehearsal-a-legacy/issues/N` for the transferred issue's
   source number N, expecting `301` and a `Location` of the form `…/repos/O/<name>/issues/N` and
   record the exact `Location`; then `gh api repos/O/phase0-rehearsal-a/issues/N` must return the
   target's issue with `number` N and `repository_url` ending `/repos/O/phase0-rehearsal-a`.
7. **Archive target:** `gh api -X PATCH repos/O/phase0-rehearsal-a -F archived=true`, after all
   link and issue writes on the target are finished. Read back by id.
8. **Final read:** for `S` and `T`: `GET repositories/{id}` shows `private` true and `archived` true,
   and the names are `…-legacy` and `…-a`.

The exact way to follow a transferred issue's old URL from a script, preferred first:

```bash
# status and Location of the first hop (no follow); the token stays out of the log
gh api --verbose "repos/$O/$SRC/issues/$N" | grep -E '^< (HTTP|Location)'
# or, with no body and one status line
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  -H "Authorization: Bearer $(gh auth token)" "https://api.github.com/repos/$O/$SRC/issues/$N"
# the resolved issue (gh api follows the 301): assert number, repository_url and the repository id
gh api "repos/$O/$SRC/issues/$N" --jq '[.number,.repository_url,.state]|@tsv'
```

`gh api --verbose` prints the body as well; it is the choice that never puts the token on a command line.
The `curl` form exposes the token to the process list for a moment and suits an attended run only.

Reasons: archived repositories refuse every change, so each repository's archive goes last; the target
rename waits for the source rename, which frees the name; and an id comparison is the one read-back that
a redirect cannot fake. The real swap follows the same eight steps with `KotlinBottools`,
`KotlinBottools-legacy` and the fresh repository's recorded id; the extra checks there are `git ls-remote`
heads against the new `ref-map` column (which the empty rehearsal target cannot test) and the recorded
`562658298` as `S`.

**Unknowns the rehearsal measures:**

- U1. Does the rename of `phase0-rehearsal-b` onto `phase0-rehearsal-a` succeed? Expect `200`; a `422`
  ("name already exists") would mean the freed name is still reserved, and the only documented
  remedy is a request to GitHub Support to remove the redirect (the 2024-12-09 Support reply). Record
  the full response.
- U2. How long after each write do the read-backs show it; is a poll ever needed.
- U3. The exact `Location` of the old URL of a transferred issue after the target is renamed (name
  of the target at transfer time or its current name), and whether its status stays `301`.
- U4. Whether making the source private changes the transferred-issue redirect or the status seen by an
  unauthenticated caller.
- U5. A `PATCH` to a released name: `307` toward the renamed repository, or applied. The rehearsal should
  not test this with a write; the script's design (write by current name, id checked first) avoids
  it.
- U6. Reads of relationship fields and issues on a *private and archived* repository.
- Not worth measuring: a rename or visibility change of an archived repository (`403` expected; a
  success would change a repository's name while archived), since the order never needs it.

## 7. Load-bearing claims

1. **Rename redirects and old-name reuse.** "When you rename a repository, all existing information,
   with the exception of project site URLs, is automatically redirected to the new name, including:
   Issues, Wikis, Stars, Followers." and "If you create a new repository under your account in the
   future, do not reuse the original name of the renamed repository. If you do, redirects to the renamed
   repository will no longer work." Source: GitHub Docs, "Renaming a repository",
   https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
   (`github/docs` commit `2bbf57a648`, 2026-03-12).
2. **Git keeps working on the old name.** "In addition to redirecting web traffic, all `git clone`,
   `git fetch`, or `git push` operations targeting the previous location will continue to function as if
   made on the new location." Same page and version.
3. **New repositories take priority over redirects.** "We keep redirects for moved and renamed repos
   indefinitely, but new repos take priority over redirects. That means if a new repo is created at an
   old location, the redirects will break in favor of displaying the new repo, for as long as that new
   repo exists." Source: GitHub staff reply quoted in community discussion 22669, 2018-02-01,
   https://github.com/orgs/community/discussions/22669. Support reply, 2024-12-09, same thread: "The
   redirects will persist until either an owner of the repository asks GitHub support to remove them,
   or a repository with the same name is created."
4. **Visibility consequences, public to private.** "Stars and watchers for this repository will be
   erased, which will affect repository rankings." and "Current forks will remain public and will be
   detached from this repository." Source: GitHub Docs, "Setting repository visibility",
   https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility
   (`github/docs` commit `0b183d589a`, 2026-08-14). The page names no effect on issues or links.
5. **Owner-only visibility policy and the free plan.** "You can restrict the ability to change repository
   visibility to organization owners only, or you can allow anyone with admin access to a repository to
   change visibility." Source: GitHub Docs, "Restricting repository visibility changes in your
   organization" (`github/docs` commit `5819d9914e`, 2026-07-08),
   https://docs.github.com/en/organizations/managing-organization-settings/restricting-repository-visibility-changes-in-your-organization.
   "With GitHub Free for organizations, you can work with unlimited collaborators on unlimited public
   repositories with a full feature set, or unlimited private repositories with a limited feature set."
   Source: "GitHub's plans", https://docs.github.com/en/get-started/learning-about-github/githubs-plans
   (same docs repository, read 2026-11-09).
6. **REST update parameters and statuses.** For `PATCH /repos/{owner}/{repo}`: `visibility` "The
   visibility of the repository." (enum `public`, `private`); `archived` "Whether to archive this
   repository. `false` will unarchive a previously archived repository."; `private` "You will get a
   `422` error if the organization restricts changing repository visibility to organization owners and a
   non-owner tries to change the value of private."; responses `200`, `307`, `403`, `422`, `404`. `GET
   /repos/{owner}/{repo}` lists `301`. Source: GitHub REST OpenAPI description,
   `descriptions/api.github.com/api.github.com.json` at `github/rest-api-description` commit
   `2f8f80e47ea4d3292cf4e37ba9d9b25475e06140` (2026-11-07);
   https://docs.github.com/en/rest/repos/repos#update-a-repository.
7. **Archive makes issues, labels and comments read-only, and changes need an unarchive.** "When a
   repository is archived, its issues, pull requests, code, labels, milestones, projects, wiki, releases,
   commits, tags, branches, reactions, code scanning alerts, comments and permissions become read-only.
   To make changes in an archived repository, you must unarchive the repository first." Source: GitHub
   Docs, "Archiving repositories",
   https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories
   (`github/docs` commit `6c39b7b7de`, 2026-07-08).
8. **A visibility change after archiving is refused.** "The apply then fails with: Error: PATCH
   https://api.github.com/repos/ORG/REDACTED_REPOSITORY_1: 403 Repository was archived so is
   read-only." and "Terraform should apply the visibility change first and archive the repository last."
   Source: https://github.com/integrations/terraform-provider-github/issues/3649 (opened 2026-09-18,
   provider 6.13.0; open). Corroboration (older, one user): "I'm facing 403 forbidden error while updating
   visibility state of archived repos using GitHub API", https://github.com/orgs/community/discussions/24784
   (2021-03-29).
9. **A transferred issue answers 301 on REST.** "The API returns a `301 Moved Permanently` status if
   the issue was transferred to another repository. If the issue was transferred to or deleted from a
   repository where the authenticated user lacks read access, the API returns a `404 Not Found`
   status." Source: GitHub REST OpenAPI description (claim 6's commit), `GET
   /repos/{owner}/{repo}/issues/{issue_number}`; https://docs.github.com/en/rest/issues/issues#get-an-issue.
10. **Transfer redirect and the access rules.** "The original URL redirects to the new issue's URL.
    People who don't have read permissions in the new repository will see a banner letting them know
    that the issue has been transferred to a new repository that they can't access." and "A private
    repository issue cannot be transferred to a public repository." Source: GitHub Docs, "Transferring an
    issue to another repository",
    https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository
    (`github/docs` commit `0d71de94e6`, 2026-07-08).
11. **`gh` 2.100.0 forms.** `RenameRepo` builds `input := map[string]string{"name": newRepoName}` and
    calls `client.REST(repo.RepoHost(), http.MethodPatch, path.String(), body, &result)`; `archiveRepo`
    declares `ArchiveRepository struct {...} `graphql:"archiveRepository(input: $input)"``; `gh repo edit`
    errors with "use of --visibility flag requires --accept-visibility-change-consequences flag". Sources
    (tag `v2.100.0`, commit `45437bc7eeeb3359bbfddd1742f79de7652fd3e2`):
    https://github.com/cli/cli/blob/v2.100.0/api/queries_repo.go,
    https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/repo/archive/http.go,
    https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/repo/edit/edit.go.
12. **`gh api` typed fields and placeholders.** "The `-F/--field` flag has magic type conversion based
    on the format of the value: literal values `true`, `false`, `null`, and integer numbers get
    converted to appropriate JSON types"; and "Placeholder values `{owner}`, `{repo}`, and `{branch}` in
    the endpoint argument will get replaced with values from the repository of the current directory".
    Source: `gh api --help`, `gh` 2.100.0 (2026-09-03), https://cli.github.com/manual/gh_api.
13. **`gh repo delete` suppresses redirects on purpose.** "The Location header is what makes this a real
    redirect. Without it Go declines to follow the 307 regardless of the client's CheckRedirect policy, so
    the stub would pass even if deleteRepo stopped suppressing redirects." Source:
    https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/repo/delete/delete_test.go (tag `v2.100.0`).

## 8. Gaps

- **Rename onto a name freed moments earlier.** Documented text covers only *creating* a repository under
  the old name. The parent design's phrase "created or renamed under that old name" goes beyond the page.
  No public example found. This is U1 and the stage's central unknown; a refusal blocks the swap.
- **Rename of an archived repository, and visibility change of an archived repository on a Free-plan
  organisation.** The 403 on visibility comes from an enterprise-managed organisation (2026) and a 2021
  thread; a Free organisation was not seen. The recommended order avoids both.
- **Effects of a visibility change on transfer redirects and cross-repository links** are undocumented
  and unobserved.
- **What the `Location` of a transferred issue's redirect shows after the target is renamed**, and whether
  the old-name URL then resolves to the target directly. Unobserved.
- **Redirect behaviour on private repositories** (old name of a renamed private repository, the transfer
  redirect into a private target, `git ls-remote` of an old private name) was not observed; only a
  private repository by name and by id and anonymous `404`s were.
- **Redirect permanence.** Staff say redirects are kept "indefinitely"; the transfer page says they are
  "permanently deleted" when the name is reused; a user reports one returning after the blocking
  repository was deleted. Irrelevant here (nothing is deleted), recorded for completeness.
- **Relationship fields on archived repositories** (`parent`, `subIssues`, `blockedBy`, `blocking`) were
  observed to resolve on one archived public repository (`Homebrew/legacy-homebrew`, GraphQL
  `issues { parent subIssues blockedBy blocking }`) whose issues have no links; they were not
  observed returning actual links.
- **`GET /repositories/{id}` is not in the published REST description.** It is relied on because the
  `301` `Location` itself points there; GraphQL `node(id:)` is the documented alternative.
- **Read-after-write consistency** is not documented; the bounded poll is a precaution.
- The source number for the dotnet examples was found by probing the gap in the source's issue numbers
  and confirmed by the `301` target; no other public transferred issue was sampled, and only two
  organisations' transfers were seen.
