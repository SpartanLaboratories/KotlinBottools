# What stays reachable on GitHub after a force-push, and making KotlinBottools public

Researched 2026-10-20 and 2026-10-21 for [KotlinBottools#2](https://github.com/SpartanLaboratories/KotlinBottools/issues/2).
Sources: GitHub's documentation from its source repository (`github/docs` at `main`, commit `3a444c04d0`, 2026-10-20;
the rendered pages on `docs.github.com` were reachable and carry the same sentences for every quotation used below),
the REST description (`github/rest-api-description` at `main`, commit `755ee33b4a`, 2026-10-18, API version 1.1.4),
`gh` 2.100.0 (manual and `pkg/cmd/repo/edit/edit.go` at `v2.100.0`), git (`Documentation/git-push.adoc` at `master`;
`transport.c`, `builtin/push.c`, `builtin/receive-pack.c` at `v2.55.0`), GitHub's engineering blog, Neodyme's and
Truffle Security's published research, and read-only probes made with `curl`, `gh api` and `git ls-remote` from this
machine. Probes of the six bot repositories printed status codes, counts and ref names only. Every probe of an
*unreferenced* object was made against a public third-party demonstration repository
(`SharonBrizinov/test-oops-commit`, one branch, one commit force-pushed away on 2025-06-06), because no object of the
organisation's repositories was made unreferenced and nothing was pushed. Nothing was pushed, changed or fetched.

## 1. Question

After `git push --force --mirror` and no GitHub Support ticket, which of a repository's pre-rewrite commits, trees and
blobs does GitHub still serve, through which routes, to whom, and for how long; how is a mirror push verified ref by
ref; what can the phase measure without reading content; and what changes when KotlinBottools (private, no forks, no
pull requests, 19 open issues) is made public with secret scanning and push protection on, on GitHub Free for
organisations. An answer must give commands with expected output and stop conditions, and a plain statement of who can
reach which objects after the visibility change.

## 2. Bottom line

- **GitHub keeps serving every pre-rewrite object by id, on every route, and has no documented expiry.** On a
  repository whose only branch no longer contains a force-pushed-away commit, an anonymous request got HTTP 200 (or a
  redirect to 200) for the commit page, `.patch`, `/tree/`, `/blob/`, `raw.githubusercontent.com`, `/compare/`,
  `/archive/<sha>.zip`, `codeload`, and for the REST commit, git-commit, git-tree, git-blob, contents-with-`ref`,
  zipball and compare endpoints, and a protocol-v2 `fetch` of the unadvertised id returned a pack. GitHub's own
  engineering post says "Normally, we don't remove any unreachable data from repositories"; the documentation names
  Support as the only way to remove it. A prefix of 4 hex digits resolves where it is unambiguous; the Git Data API
  (`/git/commits/`) needs the full id. One old tip id yields the whole old history (fetch by id sends all ancestors).
- **`refs/pull/*` is advertised to fetches (anyone with read access) and not to pushes.** Observed: anonymous
  `git ls-remote` lists `refs/pull/6/head` on GKB2 and `refs/pull/2/head`, `refs/pull/3/head` on BotTools; the
  authenticated `git-receive-pack` advertisement of every repository lists no `refs/pull/*`. So: delete the local
  `refs/pull/*` in the rewritten mirror before pushing, push with `--porcelain`, and require exit status 0, no `!`
  line, and `Done`; a `--mirror` push neither tries to update nor to prune what the server does not advertise. Verify
  each ref by comparing `git ls-remote --refs` with `git for-each-ref`, and independently with the REST `branches`
  list.
- **Making KotlinBottools public does publish objects that were never public** (inference from the observed routes,
  corroborated by Truffle Security and Neodyme). Visibility is a property of the
  repository, not of its objects: the old commits, trees and blobs sit in the same object store, and the routes above
  are gated only by "can the caller read this repository". The old ids are not secret: the activity view and
  `GET /repos/{o}/{r}/activity` list every push and force-push with full `before` and `after` ids to anyone who can see
  the repository, GitHub documents that on a private-to-public change "Your changes will be published as activity", and
  Neodyme reports that the public events timeline also lists pushes made while private. Each of the 33 old commits is
  therefore a lookup key, and a prefix of four hex digits is enough to find one by trying (about 2,000 requests for a
  33-commit set, arithmetic below). No Support ticket removes this; the phase measures it and reports it.
- **What the exit tests can prove without Support:** the remote branch tips equal the rewritten tips; a fresh
  `git clone --mirror` (which downloads every ref GitHub advertises, `refs/pull/*` included) contains zero purged blobs
  reachable from any branch or tag, and for GKB2 and BotTools a counted number reachable only through `refs/pull/*`;
  the probes record, per repository, how many old commits, trees and blobs are still served (expected: all). They
  cannot prove that GitHub no longer stores or serves the old objects, cached views, or the state of clones and
  third-party copies.
- **Visibility and scanning, in this order:** `gh repo edit SpartanLaboratories/KotlinBottools --visibility public
  --accept-visibility-change-consequences`, then `PATCH /repos/{o}/{r}` with `security_and_analysis`
  `secret_scanning` and `secret_scanning_push_protection` set to `enabled` (the shape MagicBot already has). Nothing is
  enabled automatically: the 2024 default-on change excludes organisation-owned repositories, and `security_and_analysis`
  is `null` on a private Free repository, so the settings cannot be set before the flip. Generic patterns, validity
  checks and scan history need GitHub Secret Protection on GitHub Team and stay `disabled`. GitHub's partner-pattern
  scanning of public repositories runs whatever the repository setting. Secret scanning covers the whole history of all
  branches plus issue, pull-request and discussion text; for `refs/pull/*` and unreachable objects the documentation says
  nothing.
- **The only self-service way to avoid publishing the old objects is a repository with a different object store**
  (delete and recreate, or a new repository), and it must happen before the flip: after the flip anyone can fork, and
  "Git data from any repository in a network may be accessed from any repository in the same network ... even after a
  fork is deleted". It loses the issues unless they are transferred first; this is a Considerations item (section 9).

## 3. Findings

Evidence tiers: **documented** (GitHub's or git's own text), **observed** (run on 2026-10-20 or 2026-10-21 with the
tools named), **published research** (a named external write-up), **inference** (derived; labelled).

### 3.1 Routes to a pre-rewrite object (observed, plus documented)

Observed on the public demonstration repository, anonymous unless noted. The demonstration commit
(`9eedfa009833`) is not reachable from any ref: `git ls-remote` lists `HEAD` and `refs/heads/main` only, the activity
feed records the force-push that removed it, and the repository has no fork and no other branch.

| Route | Status | Note |
|---|---|---|
| `github.com/{o}/{r}/commit/<full>`, `/commit/<7>`, `/commit/<4>`, `/commit/<full>.patch` | 200 | 3 or fewer hex digits: 404 |
| `/tree/<commit>`, `/tree/<7>`, `/blob/<commit>/<path>`, `/blob/<7>/<path>` | 200 | `/tree/<tree id>` and `/commit/<tree id>`: 404 (the web needs a commit-ish) |
| `/commits/<commit>` (history walk from the id) | 200 | REST `GET /commits?sha=<id>` lists the commit and its ancestor |
| `/compare/<parent>...<commit>`, `/compare/<commit>` | 200 | |
| `/raw/<commit>/<path>` | 302, then 200 | `raw.githubusercontent.com/{o}/{r}/<commit or 7>/<path>`: 200 |
| `/archive/<commit>.zip`, `/archive/<7>.zip` | 302, then 200 | `codeload.github.com/{o}/{r}/zip/<commit>`: 200 |
| REST `GET /repos/{o}/{r}/commits/<full>`, `/commits/<7>`, `/commits/<4>` | 200 | `/commits/<3>`: 422 |
| REST `GET /git/commits/<full>` | 200 | `/git/commits/<7>`: 404 (full id only) |
| REST `GET /git/trees/<tree id>`, `/git/trees/<7-digit tree id>` | 200 | |
| REST `GET /git/blobs/<blob id>` | 200 | blob found only through the unreferenced commit's tree |
| REST `GET /contents/<path>?ref=<commit>`, `GET /zipball/<commit>`, `GET /compare/...` | 200, 302, 200 | |
| Git protocol v2 `fetch`, `want <commit>`, `done`, POST to `.../git-upload-pack` | HTTP 200, a `packfile` section | the same request with an id that does not exist: `ERR upload-pack: not our ref ...` |
| Nonexistent full id (control) | web 404; REST `/commits` 422, `/git/*` 404 | |

Access gate, observed on KotlinBottools (private) with a *current* commit: anonymous web, REST, `raw` and `codeload`
requests all returned 404 and the anonymous protocol request 401; an authenticated REST `HEAD` returned 200 and the
authenticated protocol request returned a pack. So, for any route above: public repository, anyone; private repository,
anyone with read access (signed in); a private repository made public, anyone. In a larger repository an abbreviation
fails while it is ambiguous (`github/gitignore`: 4 to 6 digits gave web 404 and REST 422, 7 gave 200; the cause is
inference: other objects share the prefix), so the shortest working prefix depends on how many objects the repository
holds. Published research agrees on the floor: "with an absolute minimum of 4" (Truffle Security, 2024-07-24) and "even
accessing using four hex digits is enough" (Brizinov, Truffle Security guest post).

The git client was not run (a `git fetch` into any repository on this machine was out of bounds). The protocol request
above is what `git fetch origin <sha>` sends under protocol v2; the server's answer is the evidence.

### 3.2 Pull-request refs (observed, documented)

- Anonymous `git ls-remote` on 2026-10-20: GKB2 `HEAD`, `refs/heads/master`, `refs/pull/6/head`; GKB `HEAD`,
  `refs/heads/master`; BotTools `HEAD`, `refs/heads/Working-Branch`, `refs/heads/main`, `refs/pull/2/head`,
  `refs/pull/3/head`. `git ls-remote --exit-code ... 'refs/pull/*'` exits 0 on GKB2 and 2 on GKB. So on a public
  repository anyone can fetch the pull-request ref, and a `git clone --mirror` downloads everything behind it; for GKB2
  and BotTools the whole pre-rewrite history behind those refs stays cloneable, whatever the branches say.
- The authenticated `GET .../info/refs?service=git-receive-pack` advertisement (what `git push` compares against) lists
  `refs/heads/*` only, for GKB2 (1 branch), BotTools (2) and KotlinBottools (2), with zero `refs/pull/` strings, and the
  capabilities `report-status`, `report-status-v2`, `delete-refs`, `atomic`, `push-options`, `side-band-64k`,
  `ofs-delta`. This is the mechanism: a ref the server hides from receive-pack is never in git's list of remote refs,
  so `--mirror` can neither prune it nor see it as present.
- Documented: GitHub's page says the mirror push "will fail to push any refs starting with `refs/pull/`, since GitHub
  marks those as read-only". git's receive-pack sets the error text `deny updating a hidden ref` for a hidden ref
  (`builtin/receive-pack.c`, v2.55.0), and the BFG author's 2014 reply to a user pushing to GitHub shows the
  resulting lines, `! [remote rejected] refs/pull/1/head -> refs/pull/1/head (deny updating a hidden ref)`
  (published, GitHub, 2014; not re-observed today).

### 3.3 How long it lasts (documented, observed)

- GitHub: "Normally, we don't remove any unreachable data from repositories. But occasionally we do, usually to remove
  sensitive data" (GitHub engineering blog, 2022-09-13); its documentation names no automatic expiry and lists Support
  as the way to "Run a garbage collection on the server to expunge the sensitive data from storage" and "Remove cached
  views". The same post says objects are de-duplicated "within a fork network".
- Observed: the demonstration commit, force-pushed away about 16 months earlier, is served on every route in 3.1.
  Published: Brizinov (Truffle Security guest post) shows an old force-push "before" commit still served "10 years
  later" and calls the retention "forever" "from what we can tell". No source gives a duration; **no expiry is
  documented**.
- Deleting a repository is not an instant purge either: "Some deleted repositories can be restored within 90 days of
  deletion" (documented; so the data exists for at least that long, inference).

### 3.4 How an old commit id is discovered (documented, observed, published research)

- **Activity view and API.** Documented: the activity view "displays all pushes, merges, force pushes, and branch
  changes, and associates these changes with commits and authenticated users", filterable by "Force pushes". Observed:
  anonymous `GET https://api.github.com/repos/{o}/{r}/activity` returns, per entry, `before`, `after` (full 40-digit
  ids), `ref`, `timestamp`, `activity_type` (`push`, `force_push`, `branch_creation`, `branch_deletion`, ...), and the
  public web page `/activity` embeds the same data (`"before":"<id>","after":"<id>","ref":...,"pushType":"force_push"`).
  The demonstration repository's 2025-06-06 force-push is listed with the id of the removed commit; there was no 30-day
  cut-off (entries are from 2025). On a private repository the anonymous page and API return 404. KotlinBottools'
  own feed, read as its owner on 2026-10-21, holds 42 entries since 2023-03-22 (39 `push`, 2 `branch_creation`,
  1 `branch_deletion`); each push entry carries pre-rewrite ids. Documented consequence of a private-to-public change:
  "Your changes will be published as activity." Whether the pre-flip entries are listed to anonymous callers afterwards
  was not observable here (Gaps); the sentence is the documented reason to expect it.
- **Events API.** Documented: the timeline holds "up to 300 events" and "Only events created within the past 30 days";
  `PushEvent` carries `before`, `head` and (up to 20) commits with their ids. Observed: KotlinBottools' events, read as
  owner, are flagged `"public": false` (2 push events, 27 issue events, 1 comment event in the window); the anonymous
  request returns 404, while the public GKB2 returns 200 with an empty list. Published research (Neodyme, 2024-02-16,
  one observation): "This is also the case if you change your repository setting from private to public. The events
  endpoint still lists all PushEvents even from the time it was private." The 30-day window bounds that route; it does
  not bound the activity feed.
- **GH Archive.** Published (Brizinov): it stores the public event stream, including "zero-commit" push events whose
  `before` is the removed commit. Inference: events created while the repository was private are not public events and
  were never in it.
- **Guessing.** A hex prefix of 4 is the shortest accepted (3.1), a space of 16^4 = 65,536. With N old commits in the
  repository, trying prefixes at random finds the first after about 65,536 / N requests (33 commits: about 2,000);
  github.com pages have no documented rate limit (Brizinov: "their WAF may block requests at any time"). Inference
  from the observed behaviour; Truffle Security: "Brute forcing all possible values can be achieved relatively easily."
- **Documents.** Any pre-rewrite id printed in a published document, issue, pull-request text or commit message is a
  lookup key (by 3.1); the planning documents' handling of ids is outside this question.

### 3.5 Private to public (documented; inference where marked)

- Documented consequences of changing a repository from private to public: "The code will be visible to everyone who
  can visit GitHub.", "Anyone can fork your repository.", "All push rulesets will be disabled.", "Your changes will be
  published as activity.", "Actions history and logs will be visible to everyone.", "Stars and watchers for this
  repository will be erased." For a free organisation: "The repository will automatically gain access to GitHub
  Advanced Security features." Nothing is said about unreferenced objects, and no step of the change copies, filters or
  prunes the repository's storage.
- Inference, from 3.1 and the access gate there: the routes that return 200 to an authenticated reader of the private
  repository return 200 to anyone once the repository is public, because the only difference between the two requests
  is whether the caller may read the repository. The same holds for the old KotlinBottools history, with one
  consequence that the other five repositories do not share: **GKB2, GKB and BotTools were public before the rewrite, so
  their old objects were already readable by anyone; KotlinBottools' were not.** TrumpBot and Support stay private.
- Corroboration of "visibility does not gate objects": Truffle Security (2024-07-24) shows commits made in a private
  fork before the upstream was made public are reachable through the public upstream, and GitHub's reply was that
  "it's clear as day that GitHub designed repositories to work like this" with a link to its documentation.
- After the flip a fork is possible and permanent: documented, "Git data from any repository in a network may be
  accessed from any repository in the same network, including the upstream repository, even after a fork is deleted."
  and "A private repository is made public | Private forks stay private but disconnect into separate private networks."

### 3.6 The mirror push (documented, source, observed)

- `--mirror` (git docs): "all refs under `refs/` ... be mirrored to the remote repository. Newly created local refs will
  be pushed to the remote end, locally updated refs will be force updated on the remote end, and deleted refs will be
  removed from the remote end." So a remote branch absent locally is deleted; a ref the server does not advertise is
  not touched (3.2).
- `--porcelain` (git docs): "Produce machine-readable output. The output status line for each ref will be
  tab-separated and sent to stdout instead of stderr. The full symbolic names of the refs will be given."
  Line format (git docs and `print_ref_status`, v2.55.0): first a line `To <url>`, then per ref
  `<flag>\t<from>:<to>\t<summary> (<reason>)`, where `<from>` and `<to>` are full ref names (`:<to>` for a deletion).
  Flags: space = fast-forward; `+` = forced update; `-` = deleted; `*` = new ref; `!` = rejected or failed; `=` =
  up to date ("shown only if `--porcelain` or `--verbose`"). A failure's summary is `[rejected]`, `[remote rejected]` or
  `[remote failure]`. The last line is `Done`, printed by `transport_push` as `if (porcelain && !push_ret)
  puts("Done")`; `push_ret` is the transport result, not the per-ref outcome, so `Done` does not prove that no ref was
  rejected. `builtin/push.c` prints `failed to push some refs to '<url>'` and exits non-zero when any ref failed.
- Consequence for the mirror held by filter-repo: its `git clone --mirror` source contains `refs/pull/*`, filter-repo
  rewrites them, and `git push --mirror` tries to create them: GitHub rejects each with `[remote rejected] ... (deny
  updating a hidden ref)` and the command exits non-zero although every branch was updated (GitHub's page says the
  same). Deleting the local `refs/pull/*` first removes every expected rejection, so any remaining `!` is a real
  failure. GitLab-hosted write-ups use the same remedy for the same error on GitLab's hidden refs (delete the hidden
  refs locally, then `git push --mirror`).

### 3.7 Probe mechanics and rate limits (documented, observed)

- REST primary limit: "The primary rate limit for unauthenticated requests is 60 requests per hour." and "All of these
  requests count towards your personal rate limit of 5,000 requests per hour" (observed `core` limit 5000 for the
  signed-in token). Secondary: "No more than 100 concurrent requests are allowed", "No more than 900 points per minute
  are allowed for REST API endpoints", `GET`, `HEAD` and `OPTIONS` cost 1 point, and the limits "are subject to change
  without notice". Exceeding either gives `403` or `429`, which is **not** "object absent". Observed: `HEAD` works on the
  REST object endpoints, returns the same status as `GET` and transfers no body, so a blob probe never receives content.
- github.com pages (`/commit/<sha>`) have no documented limit; anonymous `HEAD` returned the same status as `GET`.
- Statuses seen: served = 200; absent = 404 (web, `/git/*`) or 422 (`/commits/<id>`); 401, 403, 429 and 5xx are not
  answers. A positive control (a current commit of the same repository: 200) and a negative control (a made-up id: 404
  or 422) belong to every run.
- `gh api <path> --silent; echo $?` returns 1 for every HTTP error, so it cannot tell 404 from a rate limit; `curl -I -w
  '%{http_code}'` can. `gh api` prints the status text to stderr only.

### 3.8 Visibility change, settings, plan (documented, observed)

- `gh repo edit --help` (2.100.0): "When the `--visibility` flag is used, `--accept-visibility-change-consequences` flag
  is required." The command issues `PATCH /repos/{o}/{r}` with `visibility`; it prints `Edited repository <name>` only
  when stdout is a terminal (`if opts.IO.IsStdoutTTY()` in `edit.go`, v2.100.0), so a non-interactive success prints
  nothing: success is exit status 0 plus the GET below. `gh repo edit` runs its edits concurrently; the visibility change
  and the security settings are therefore separate commands. The REST body is `{"visibility":"public"}` (enum `public`,
  `private`).
- Blockers: documented, "If you can't change a repository's visibility, the organization owner may have restricted the
  ability to change repository visibility to organization owners only", and the REST text "You will get a `422` error if
  the organization restricts changing repository visibility to organization owners and a non-owner tries to change the
  value of private". Observed: the signed-in account has `role: admin` in the organisation, the organisation plan is
  `free`, and `members_can_create_public_repositories` is `true`; the owner is not blocked by such a restriction.
- Scanning settings. REST `PATCH /repos/{o}/{r}` `security_and_analysis` (admin permission; for an organisation, an owner
  or security manager): objects `secret_scanning`, `secret_scanning_push_protection`, `secret_scanning_ai_detection`,
  `secret_scanning_non_provider_patterns`, `advanced_security`, `code_security`, the delegated-bypass objects, each with
  `status` `enabled` or `disabled`; the request-body schema in the REST description does not list
  `secret_scanning_validity_checks`, the response does (MagicBot's GET shows it). `gh repo edit` has
  `--enable-secret-scanning` and `--enable-secret-scanning-push-protection` ("Secret scanning must be enabled first").
- Availability on GitHub Free: "Secret scanning alerts for users can be enabled on any free public repository that you
  own." Generic patterns (`secret_scanning_non_provider_patterns`) and validity checks are available only for
  "Organization-owned repositories on GitHub Team with GitHub Secret Protection enabled"; the scan-history endpoint
  needs Advanced Security (observed on MagicBot: 404 "Advanced Security is disabled on this repository."). Push
  protection for repositories "Requires GitHub Secret Protection to be enabled" and "Is disabled by default"; observed:
  it is `enabled` on MagicBot, a public repository of this free organisation.
- **Nothing is enabled by the flip.** Observed: GKB2, GKB and BotTools, public, show every scanning field `disabled`;
  the organisation's own "enabled for new repositories" flags for advanced security, secret scanning and push protection
  are all `false`; GitHub's 2024-03-11 default-on change applies to "new public repositories owned by personal
  accounts" and states "Existing public repositories are not affected, nor are new public repositories that belong to an
  organization". The only automatic change is documented: "The repository will automatically gain access to GitHub
  Advanced Security features." Push protection for *users* ("Is enabled by default", "Stops you from pushing secrets to public repositories on
  GitHub"; "About push protection") is an account setting, not the repository's.
- Observed shapes. Private KotlinBottools: `security_and_analysis` is `null`. MagicBot (public, enabled):
  `{"dependabot_security_updates":{"status":"disabled"},"secret_scanning":{"status":"enabled"},
  "secret_scanning_non_provider_patterns":{"status":"disabled"},"secret_scanning_push_protection":{"status":"enabled"},
  "secret_scanning_validity_checks":{"status":"disabled"}}`. Alerts endpoint: 200 with `[]` on MagicBot; on GKB2
  (disabled) 404 "Secret scanning is disabled on this repository."; documented token needs: "OAuth app tokens and personal
  access tokens (classic) need the `repo` or `security_events` scope"; the signed-in token has `repo`.
- Partner scanning: "GitHub scans public repositories and public npm packages for secrets issued by specific service
  providers who joined our partnership program" and "You cannot change the configuration of secret scanning for partner
  patterns on public repositories." The Discord bot token pattern is listed as supported with push protection (parent
  research, claim 19).

### 3.9 What secret scanning covers (documented)

"Secret scanning scans your entire Git history on all branches of your repository for hardcoded credentials" and
"periodically rescans repositories when new secret types are added"; it also scans descriptions and comments in issues
(open and closed), titles, descriptions and comments in pull requests and discussions, wikis, and secret gists. The
documentation does not mention `refs/pull/*`, unreachable commits or cached views. Inference: it alerts on what a branch
or tag reaches and on issue and pull-request text, and will not alert for objects only a pull-request ref reaches or for
objects no ref reaches (Truffle Security, 2024: "As secret scanning evolves, and we can hopefully scan all commits in a
repository network" implies it does not). So an enabled setting with zero alerts proves nothing about the old objects.
KotlinBottools' issue text is scanned after the flip; 19 open issues exist.

### 3.10 Self-service alternatives to Support (documented)

- GitHub's only documented removal route is Support. The BFG author's reply on this exact situation (2014): "The only
  ways to recover from this are to a) delete the repo using the GitHub admin tools, and then recreate it, or b) contact
  GitHub support and ask them to delete the PRs for you." No other self-service step (closing or deleting a pull
  request, deleting a branch, changing the default branch, renaming, transferring) is documented to remove an
  unreferenced object.
- **Delete and recreate.** Documented: deleting removes the repository, "will permanently delete team permissions. This action cannot be undone.", and
  "Deleting a private repository will delete all forks of the repository"; "Some deleted repositories can be restored
  within 90 days", restoring "will not restore team permissions". Inference: a repository created under the old name is
  a new repository with an empty network, so old ids give 404 (verify by probe before the flip, 6.5 step F0).
  Lost: the 19 open issues with their comments, labels, milestones and sub-issue and "blocked by" links, project items
  linked to them, the activity feed and events (which also removes the old ids from them), webhooks, secrets, settings,
  watchers; the issue numbers that MagicBot and WebTools cite (`KotlinBottools#1` to `#19`) point nowhere until reissued.
  Observed today: no stars, 1 watcher, 0 forks, 0 pull requests, 0 Actions runs, `has_wiki` false, `has_projects` true,
  `has_discussions` false.
- **`gh issue transfer`** (documented): "To transfer an open issue", "You can only transfer issues between repositories
  owned by the same user or organization account. A private repository issue cannot be transferred to a public
  repository.", "comments and assignees are retained. Labels and milestones are also retained if they're present in the
  target repository", "The original URL redirects to the new issue's URL." Not documented: whether the number is kept
  (inference: a number is assigned by the target repository), and whether sub-issue and "blocked by" links survive.
  All 19 KotlinBottools issues are open, so a transfer into a *private* new repository is allowed; into a public one it
  is not.
- **A new repository under another name**, leaving KotlinBottools private with its issues, loses nothing and keeps the
  old objects private. **Keeping the repository private** keeps everything as it is.
- No Support ticket is part of this phase. GitHub's page also says Support "won't remove non-sensitive
  data" and helps where "the risk can't be mitigated by rotating affected credentials".

## 4. How comparable practice does it

- **GitHub's procedure** ("Removing sensitive data from a repository"): rewrite with `git-filter-repo
  --sensitive-data-removal`, `git push --force --mirror origin`, tolerate failures only for `refs/pull/` ("Repeat until
  the only failures to update are refs starting with `refs/pull/`"), then Support removes cached views and affected
  pull requests and runs garbage collection. Its first advice is to revoke: "Going through the extra steps to rewrite the
  history and remove the secret may not be warranted."
- **The BFG project** answers every report of the hidden-ref rejection with the same three facts: the `refs/pull/*`
  refs are synthetic and read-only, the real refs were pushed, and the old data stays reachable through them until
  Support deletes the pull requests or the repository is recreated (`rtyley/bfg-repo-cleaner` issues #36 and #484).
- **Security researchers** (Neodyme 2024, Truffle Security 2024 and 2025) treat a force-push as not removing anything:
  they scan the public activity and event stream for zero-commit pushes and fetch the `before` id; both conclude that
  rotation is the only reliable remedy and that Support is the only removal route.
- **Mirroring tools on GitLab** delete the hidden refs locally before `git push --mirror`
  (`git show-ref | grep ... | awk '{print "delete " $2}' | git update-ref --stdin`), which is the shape used in 6.2.

## 5. Pitfalls and regrets

1. **Counting `rc=1` as success because "only `refs/pull` failed".** A rejected branch is hidden among the expected
   rejections. Delete the local pull refs and require zero `!` lines.
2. **Trusting `Done`.** It is printed on the transport result (3.6). Require exit status 0, zero `!`, and the per-ref
   comparison.
3. **Reading a 403 or 429 as "not served".** A probe loop must stop on anything but 200, 404, 422 (3.7). A `gh api
   --silent` loop cannot tell them apart.
4. **Printing probe responses.** `GET /git/blobs/<id>` returns base64 content. Use `HEAD`, discard the body, print status
   tallies, never ids.
5. **Believing a quiet period helps.** The events timeline forgets after 30 days; the activity feed did not forget a
   2025 entry, and the objects have no documented expiry.
6. **Flipping, then discovering a fork.** From the moment the repository is public anyone can fork it, and a fork keeps
   the network's objects even if the original is deleted; delete-and-recreate is available only while no fork exists.
7. **Turning to the settings before the flip.** On a private Free repository `security_and_analysis` is `null`; the
   settings exist only after the flip, so there is a window of seconds in which the repository is public and unscanned.
8. **Reading "scanning enabled, zero alerts" as clean.** It covers branch history and issue text, not
   `refs/pull/*` or unreachable objects (3.9).
9. **Pre-rewrite ids in published text.** They are lookup keys (3.4).
10. **Combining visibility and scanning in one `gh repo edit`.** The edits run concurrently; push protection needs secret
    scanning first.
11. **Assuming the flip is reversible.** Making the repository private again does not recall forks, clones, the
    activity entries already read, or anything cached elsewhere.

## 6. Recommendation for this repo

Shell: Git Bash. `O` = `SpartanLaboratories`; `REPO` = repository name; `WS`, `OUT`, `BK` (untouched pre-rewrite
mirror), `LIST` as in the sibling findings; `MIRROR="$WS/$REPO.git"` is the rewritten mirror; `EX` is a fresh
`git clone --mirror` taken after the push. `$OUT/$REPO/` already holds `ref-map`, `commit-map`, `changed-refs`,
`first-changed-commits`. `MANIFEST` is the plan's list of purged blob ids, one 40-digit id per line, ids only (if it
carries paths, make a copy with `cut -d' ' -f1` first and never print the path column). A step's **STOP** means:
do not continue, report the step and the status, never the content.

Everything under `$OUT` holds pre-rewrite ids and stays on this machine. Nothing in this section prints an id.

### 6.1 Helper functions (save once as `$WS/tools/probe.sh`; tested against the demonstration repository)

```bash
# probe.sh -- sourced, never executed. Needs: O REPO OUT TOK   (export TOK="$(gh auth token)"; never echo it)
api_status() {   # $1 = path below /repos/$O/$REPO ; prints the HTTP status only (HEAD: no body is transferred)
  curl -s -I -o /dev/null -w '%{http_code}' \
    -H "Authorization: Bearer $TOK" -H 'Accept: application/vnd.github+json' -H 'X-GitHub-Api-Version: 2022-11-28' \
    "https://api.github.com/repos/$O/$REPO/$1"
}
web_status() {   # $1 = path below https://github.com/$O/$REPO/ ; anonymous HEAD
  curl -s -I -o /dev/null -w '%{http_code}' "https://github.com/$O/$REPO/$1"
}
probe_ids() {    # $1 file of ids, $2 api|web, $3 path template containing @ID@, $4 label ; prints status tallies only
  local f="$1" kind="$2" tpl="$3" label="$4" id c codes="$OUT/$REPO/probe-$4.codes"
  : > "$codes"
  while read -r id; do
    [ -n "$id" ] || continue
    if [ "$kind" = api ]; then c=$(api_status "${tpl//@ID@/$id}"); else c=$(web_status "${tpl//@ID@/$id}"); fi
    case "$c" in 200|404|422) echo "$c" >> "$codes" ;; *) echo "STOP status=$c label=$label"; return 1 ;; esac
    sleep 0.3
  done < "$f"
  echo "$label: $(sort "$codes" | uniq -c | awk '{printf "%s x%s  ", $2, $1}')"
}
want_probe() {   # $1 commit id, $2 auth|anon ; prints SERVED, NOT-SERVED or STOP (protocol-v2 fetch of one unadvertised id)
  local id="$1" mode="$2" req="$OUT/$REPO/.want.req" head="$OUT/$REPO/.want.head" url="https://github.com/$O/$REPO.git/git-upload-pack" a=""
  [ "$mode" = auth ] && a="x-access-token:$TOK"
  pkt() { printf '%04x%s' $(( ${#1} + 4 )) "$1"; }
  { pkt $'command=fetch\n'; pkt $'object-format=sha1\n'; printf '0001'; pkt "want $id"$'\n'; pkt $'done\n'; printf '0000'; } > "$req"
  curl -s -X POST ${a:+-u "$a"} -H 'Content-Type: application/x-git-upload-pack-request' -H 'Git-Protocol: version=2' \
       --data-binary @"$req" "$url" | head -c 120 > "$head"
  if   [ "$(grep -a -c packfile "$head")" -ge 1 ];      then echo SERVED
  elif [ "$(grep -a -c 'not our ref' "$head")" -ge 1 ]; then echo NOT-SERVED
  else echo "STOP (unexpected response, $(wc -c < "$head") bytes)"; fi
  rm -f "$req" "$head"
}
```

and the porcelain tally, saved as `$WS/tools/porcelain_tally.awk`:

```awk
# Reads `git push --porcelain` stdout. One line of counts out. bad = anything that is not a clean mirror push.
BEGIN { FS = "\t" }
NR == 1 { if ($0 !~ /^To https:\/\/github\.com\//) bad++; next }
$0 == "Done" { done++; next }
{
  c[$1]++
  if ($1 == "!") bad++
  else if ($1 != " " && $1 != "+" && $1 != "*" && $1 != "-" && $1 != "=") bad++
  if ($2 ~ /refs\/pull\//) pull++
  if ($2 !~ /(^|:)refs\/(heads|tags)\//) other++
}
END {
  printf "forced=%d fastforward=%d new=%d deleted=%d uptodate=%d rejected=%d done=%d pull_lines=%d other_refs=%d bad=%d\n",
         c["+"], c[" "], c["*"], c["-"], c["="], c["!"], done, pull, other, bad
}
```

Expected on a clean push, for example `forced=2 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0 done=1 pull_lines=0
other_refs=0 bad=0`. (Run against hand-made sample lines in the format of 3.6 on this machine: a clean file gives `bad=0`,
a file with a `refs/pull/` rejection gives `rejected=1 pull_lines=1 bad=1`, a rejected branch gives `bad=1 done=0`.)

### 6.2 The mirror push and its per-ref verification (per repository, after the rewrite checks pass)

```bash
cd "$MIRROR"
test "$(git rev-parse --is-bare-repository)" = true                                   || echo STOP
test "$(git remote get-url origin)" = "https://github.com/$O/$REPO.git"                || echo STOP
# P0  nothing was pushed to the remote since the clone: its branch and tag tips are the rewrite's "old" column
awk 'NR>1 && $3 ~ /^refs\/(heads|tags)\// {print $1" "$3}' "$OUT/$REPO/ref-map" | sort > "$OUT/$REPO/expect-remote-before.txt"
git ls-remote --refs origin 'refs/heads/*' 'refs/tags/*' | awk '{print $1" "$2}' | sort > "$OUT/$REPO/remote-before.txt"
diff -q "$OUT/$REPO/expect-remote-before.txt" "$OUT/$REPO/remote-before.txt" >/dev/null; echo "P0 rc=$?"      # 0   (else STOP: someone pushed, or ref-map lacks a ref)
git ls-remote origin 'refs/pull/*' | awk '{print $2}' | sort > "$OUT/$REPO/pull-before.txt"; wc -l < "$OUT/$REPO/pull-before.txt"
                                                                                       # GKB2 1, BotTools 2, others 0 (recorded; their targets stay old)
# P1  remove the local pull-request refs (GitHub hides them from receive-pack; nothing remote is deleted)
git for-each-ref --format='delete %(refname)' refs/pull | git update-ref --stdin
git for-each-ref --format='%(refname)' | grep -c -v -E '^refs/(heads|tags)/'           # 0   (grep prints the count; anything else: STOP)
git for-each-ref --format='%(objectname) %(refname)' refs/heads refs/tags | sort > "$OUT/$REPO/local-after.txt"
# P2  what the push must do, computed from ref-map (columns: old new ref; new = 40 zeros means the ref is deleted)
EXP_CHANGED=$(awk 'NR>1 && $3 ~ /^refs\/(heads|tags)\// && $1!=$2 && $2 !~ /^0+$/' "$OUT/$REPO/ref-map" | wc -l)
EXP_DELETED=$(awk 'NR>1 && $3 ~ /^refs\/(heads|tags)\// && $2 ~ /^0+$/'            "$OUT/$REPO/ref-map" | wc -l)
EXP_SAME=$(   awk 'NR>1 && $3 ~ /^refs\/(heads|tags)\// && $1==$2'                 "$OUT/$REPO/ref-map" | wc -l)
echo "expect: changed=$EXP_CHANGED deleted=$EXP_DELETED same=$EXP_SAME"
# P3  dry run (contacts the server, sends nothing)
git push --dry-run --porcelain --force --mirror origin > "$OUT/$REPO/push-dry.txt" 2> "$OUT/$REPO/push-dry.err"; echo "dry rc=$?"   # 0
LC_ALL=C awk -f "$WS/tools/porcelain_tally.awk" "$OUT/$REPO/push-dry.txt"
```

Expected from the tally: `forced+fastforward` equals `EXP_CHANGED`, `deleted` equals `EXP_DELETED` (a deleted ref is a
branch the rewrite pruned; the plan states how many to expect, normally 0), `uptodate` equals `EXP_SAME`, `new=0`,
`rejected=0`, `done=1`, `pull_lines=0`, `other_refs=0`, `bad=0`. Any other value: STOP and do not push.

```bash
# P4  the push
git push --porcelain --force --mirror origin > "$OUT/$REPO/push.txt" 2> "$OUT/$REPO/push.err"; PRC=$?; echo "push rc=$PRC"   # 0
LC_ALL=C awk -f "$WS/tools/porcelain_tally.awk" "$OUT/$REPO/push.txt"                                                      # same numbers as the dry run
diff <(awk -F'\t' 'NR>1 && $0!="Done"{print $1 $2}' "$OUT/$REPO/push-dry.txt" | sort) \
     <(awk -F'\t' 'NR>1 && $0!="Done"{print $1 $2}' "$OUT/$REPO/push.txt"     | sort) >/dev/null; echo "same refs and flags rc=$?"   # 0
# P5  per-ref verification, two channels
git ls-remote --refs origin 'refs/heads/*' 'refs/tags/*' | awk '{print $1" "$2}' | sort > "$OUT/$REPO/remote-after.txt"
diff -q "$OUT/$REPO/local-after.txt" "$OUT/$REPO/remote-after.txt" >/dev/null; echo "P5 ls-remote rc=$?"                    # 0
diff <(grep ' refs/heads/' "$OUT/$REPO/local-after.txt") \
     <(gh api "repos/$O/$REPO/branches?per_page=100" --paginate --jq '.[]|.commit.sha+" refs/heads/"+.name' | sort) >/dev/null
echo "P5 REST branches rc=$?"                                                                                                 # 0
awk 'NR>1 && $1!=$2 && $2 !~ /^0+$/ {print $1}' "$OUT/$REPO/ref-map" | sort -u > "$OUT/$REPO/old-tips-all.txt"
grep -c -F -f "$OUT/$REPO/old-tips-all.txt" "$OUT/$REPO/remote-after.txt"                                                    # 0   (no ref still points at an old tip)
git ls-remote origin 'refs/pull/*' | awk '{print $2}' | sort | diff -q - "$OUT/$REPO/pull-before.txt" >/dev/null; echo "pull refs unchanged rc=$?"   # 0
gh api "repos/$O/$REPO" --jq .default_branch                                                                                   # unchanged
```

STOP conditions: `PRC` not 0; `bad` not 0; any `!` line; a line for a ref outside `refs/heads` and `refs/tags`; either
`P5` comparison not 0; a non-zero count at the `grep -c -F -f` line. A STOP after `P4` means the remote may be partly
updated: do not repeat the push blindly; report the tally and `push.txt`'s flag column (`awk -F'\t' '{print $1 $2}'`).
If the first sub-step of P1 were skipped and the push run with the `refs/pull/*` present, the only tolerable outcome is
exit status 1 with `rejected == pull_lines == other_refs` and `bad == rejected` in the tally (every `!` is a
`refs/pull/` line, every `refs/pull/` line is a `!`), and `P5` must still be 0; this is a fallback, not the method.
Authentication: run `git ls-remote origin` first; if Git Credential Manager prompts, complete it before the push.

### 6.3 Residual-exposure probes (after the push; per repository)

Inputs, all from `$OUT/$REPO/` and the backup mirror `BK`; the files are local-only:

```bash
awk 'NR>1 && $1!=$2 {print $1}' "$OUT/$REPO/commit-map" | sort -u > "$OUT/$REPO/old-ids.txt"          # every changed or pruned commit
awk 'NR>1 && $3 ~ /^refs\/heads\// && $1!=$2 {print $1}' "$OUT/$REPO/ref-map" | sort -u > "$OUT/$REPO/old-tips.txt"
awk '{print $1}' "$OUT/$REPO/first-changed-commits" | sort -u > "$OUT/$REPO/old-firsts.txt"
cat "$OUT/$REPO/old-tips.txt" "$OUT/$REPO/old-firsts.txt" | sort -u | while read -r c; do git -C "$BK" rev-parse --verify -q "$c^{tree}"; done | sort -u > "$OUT/$REPO/old-trees.txt"
K=60; N=$(sort -u "$MANIFEST" | wc -l); S=$(( (N + K - 1) / K )); [ "$S" -ge 1 ] || S=1                  # at most 60 blobs, evenly spaced
sort -u "$MANIFEST" | awk -v s="$S" 'NR % s == 1' > "$OUT/$REPO/manifest-sample.txt"
wc -l "$OUT/$REPO"/old-tips.txt "$OUT/$REPO"/old-firsts.txt "$OUT/$REPO"/old-trees.txt "$OUT/$REPO"/manifest-sample.txt | awk '{print $1, $2}' | sed 's#.*/##'
```

Probe set (authenticated, every repository). Budget: tips + firsts + trees + at most 60 blobs, plus 2 controls, is
usually under 100 requests per repository; six repositories are well inside the 5,000-per-hour limit.

```bash
. "$WS/tools/probe.sh"; export O REPO OUT; TOK="$(gh auth token)"; export TOK
gh api rate_limit --jq .resources.core.remaining                         # >= 1000 before starting, else STOP and wait for the reset
DEF=$(git -C "$EX" rev-parse HEAD)                                       # current tip: positive control
echo "$DEF" > "$OUT/$REPO/ctl-pos.txt"; printf '%040d
' 0 > "$OUT/$REPO/ctl-neg.txt"
probe_ids "$OUT/$REPO/ctl-pos.txt"  api 'git/commits/@ID@' ctl-positive             # 200 x1     (else STOP: the probe is blind)
probe_ids "$OUT/$REPO/ctl-neg.txt"  api 'git/commits/@ID@' ctl-negative             # 404 x1     (else STOP)
probe_ids "$OUT/$REPO/old-tips.txt"   api 'git/commits/@ID@' old-tips               # expected: 200 x<number of tips>
probe_ids "$OUT/$REPO/old-firsts.txt" api 'git/commits/@ID@' old-first-commits      # expected: 200 x<n>
probe_ids "$OUT/$REPO/old-trees.txt"  api 'git/trees/@ID@'   old-trees              # expected: 200 x<n>
probe_ids "$OUT/$REPO/manifest-sample.txt" api 'git/blobs/@ID@' purged-blobs        # expected: 200 x<sample size>
for t in $(cat "$OUT/$REPO/old-tips.txt"); do want_probe "$t" auth; done | sort | uniq -c   # expected: SERVED x<number of tips>
```

Public repositories (GKB2, GKB, BotTools) and KotlinBottools after the flip, anonymous:

```bash
# (a private repository answers 401 to the protocol probe and 404 to the web probes: STOP is the expected output before the flip)
probe_ids "$OUT/$REPO/old-tips.txt"   web 'commit/@ID@' anon-web-old-tips      # expected: 200 x<n>
probe_ids "$OUT/$REPO/old-firsts.txt" web 'commit/@ID@' anon-web-old-firsts    # expected: 200 x<n>
for t in $(cat "$OUT/$REPO/old-tips.txt"); do want_probe "$t" anon; done | sort | uniq -c   # expected: SERVED x<n>
head -n 1 "$OUT/$REPO/old-tips.txt" | cut -c1-7 > "$OUT/$REPO/abbr7.txt"
probe_ids "$OUT/$REPO/abbr7.txt" web 'commit/@ID@' anon-web-abbrev7                # 200 (7 digits resolve unless ambiguous)
curl -s "https://api.github.com/repos/$O/$REPO/activity?per_page=100" | python -I -c '
import sys, json
old = set(open(sys.argv[1]).read().split())
a = json.load(sys.stdin)
print("activity entries=%d force_push=%d before_in_old=%d after_in_old=%d full_page=%s" % (len(a), sum(x["activity_type"]=="force_push" for x in a), sum(x["before"] in old for x in a), sum(x["after"] in old for x in a), len(a)==100))
' "$OUT/$REPO/old-ids.txt"                                                # public repo: before_in_old >= 1 for every rewritten branch; full_page=True: STOP, paginate
curl -s "https://api.github.com/repos/$O/$REPO/events?per_page=100" | python -I -c '
import sys, json
old = set(open(sys.argv[1]).read().split())
a = json.load(sys.stdin); n = b = c = 0
for e in a:
    p = e.get("payload", {})
    if e.get("type") == "PushEvent":
        n += 1; b += p.get("before") in old; c += sum(x.get("sha") in old for x in p.get("commits", []))
print("events=%d push_events=%d before_in_old=%d commits_in_old=%d" % (len(a), n, b, c))
' "$OUT/$REPO/old-ids.txt"                                                # within 30 days of the push: before_in_old >= 1
```

The anonymous REST calls spend the 60-per-hour budget of this machine's address (two calls per repository, run one
repository at a time); the anonymous web `HEAD` loops do not touch it.

Pull-request refs (GKB2, BotTools), on the fresh mirror `EX`:

```bash
PULL=$(git -C "$EX" for-each-ref refs/pull | wc -l); echo "pull_refs=$PULL"                                  # GKB2 1, BotTools 2, others 0
git -C "$EX" rev-list --objects --branches --tags --no-object-names | sort -u > "$OUT/$REPO/reach-heads.txt"
git -C "$EX" rev-list --objects --all             --no-object-names | sort -u > "$OUT/$REPO/reach-all.txt"
sort -u "$MANIFEST" > "$OUT/$REPO/manifest.sorted"
comm -12 "$OUT/$REPO/manifest.sorted" "$OUT/$REPO/reach-heads.txt" | wc -l     # purged blobs reachable from a branch or tag:   0 (else STOP)
comm -12 "$OUT/$REPO/manifest.sorted" "$OUT/$REPO/reach-all.txt"   | wc -l     # ... from any ref incl. refs/pull/*: 0 where PULL=0; the measured residual where PULL>0
git -C "$EX" cat-file --batch-check < "$OUT/$REPO/manifest.sorted" | grep -c ' missing$'   # equals N - the line above
```

Reading the results: "all 200 / SERVED" is the expected outcome and means "GitHub still serves the pre-rewrite objects
of this repository to its readers (to anyone, for a public repository)". A mix of 200 and 404 in the blob sample means a
partial clean-up exists somewhere; run the blob probe over the whole `manifest.sorted` (at most about 1,500 requests per
repository per hour at 0.3 s each) and report the counts. All 404 would be a new fact; report it and do not change the
statements in 6.4. No output of these probes contains an id, a path or a body.

### 6.4 The exit-test statements (what the phase may claim)

Proved by the exit tests, per repository, without Support:
1. Every branch and tag on GitHub equals the rewritten tip (`P5`, two channels), and no remote ref points at a
   pre-rewrite tip.
2. A fresh `git clone --mirror` contains no purged path in `git log --all` and no purged blob reachable from any branch
   or tag (sibling exit tests and the `comm` line above). For KotlinBottools, GKB, TrumpBot and Support, which have no
   pull-request ref, the same holds for every ref GitHub advertises.
3. For GKB2 and BotTools, the number of purged blobs reachable only through `refs/pull/6/head` (GKB2) and
   `refs/pull/2/head`, `refs/pull/3/head` (BotTools) is measured and reported as the residual.
4. The probes record how many old tips, first-changed commits, trees and sampled blobs GitHub still serves, anonymously
   where the repository is public.

Not proved, and stated as such in the report:
1. That GitHub no longer holds or serves the old objects. Expected and observed behaviour is the opposite (3.1, 3.3);
   the objects stay reachable to anyone who has an id, for as long as GitHub keeps them (no documented limit).
2. That cached commit and pull-request views are gone; they are not probed.
3. The absence of third-party copies, clones and forks (0 forks today; the check reads the fork count, which does not
   cover clones).
4. That secret scanning has examined the old objects (3.9).

Residual exposure to report, per repository: GKB2, GKB, BotTools (public): the old history stays as public as it was
before the rewrite, now reachable by id and, for GKB2 and BotTools, by `refs/pull/*`; the public activity feed lists the
old tips. TrumpBot and Support (private): the old objects stay readable by those with read access. KotlinBottools: see 6.6.

### 6.5 KotlinBottools: gates, visibility change, scanning settings

Gate (all must hold, run immediately before the flip; each STOP leaves the repository private):

```bash
O=SpartanLaboratories; REPO=KotlinBottools
gh api "repos/$O/$REPO" --jq '[.private,.forks_count,.network_count,.open_issues_count]|@tsv'        # true  0  0  19    (private; no fork; "19" is whatever is open)
gh api "repos/$O/$REPO/forks" --jq length                                                              # 0
gh api "repos/$O/$REPO/pulls?state=all" --jq length                                                    # 0
git -C "$MIRROR" ls-remote origin 'refs/pull/*' | wc -l                                               # 0
gh api "user/memberships/orgs/$O" --jq .role                                                           # admin
# F0  (only if the Considerations item in section 9 is taken: old ids give 404 on the recreated repository)
# the 6.2 verification and the 6.3 probes with the authenticated old-tip loop: expected  SERVED x0 / 404 x<n>
```

The 6.2 push verification, the sibling exit tests (gitleaks, `branches` and `all`) and the 6.3 authenticated probes have
passed and are recorded. The authenticated probe result for the old tips is the measurement of what the flip publishes:
`200` means it will be served to everyone.

The flip:

```bash
gh repo edit "$O/$REPO" --visibility public --accept-visibility-change-consequences; echo "rc=$?"    # prints nothing when not on a terminal; rc=0
# REST equivalent: gh api -X PATCH "repos/$O/$REPO" -f visibility=public --silent; echo "rc=$?"      # rc=0
gh api "repos/$O/$REPO" --jq '[.visibility,(.private|tostring)]|join(" ")'                            # public false
for i in 1 2 3 4 5 6; do c=$(curl -s -o /dev/null -w '%{http_code}' "https://github.com/$O/$REPO"); [ "$c" = 200 ] && break; sleep 5; done; echo "anon page $c"   # 200
```

STOP on `rc` not 0. `HTTP 403` or `422` means the signed-in account may not change visibility (organisation restriction or
missing admin right); do not retry with another method; report. If the repository is public but the following step
fails, the repository stays public and unscanned until it is repaired: run the next step immediately, and on failure
report at once.

Scanning and push protection (in the same minute; one request, both fields, nothing else changed):

```bash
cat > "$OUT/$REPO/security.json" <<'EOF'
{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}
EOF
gh api -X PATCH "repos/$O/$REPO" -H 'X-GitHub-Api-Version: 2022-11-28' --input "$OUT/$REPO/security.json" --silent; echo "rc=$?"     # 0
gh api "repos/$O/$REPO" --jq .security_and_analysis                                                   # as MagicBot, below
gh api "repos/$O/$REPO/secret-scanning/alerts" --jq length                                            # 0   (a 404 means scanning is not enabled: STOP)
```

Expected `security_and_analysis` (MagicBot's shape; field order may differ):
`{"dependabot_security_updates":{"status":"disabled"},"secret_scanning":{"status":"enabled"},
"secret_scanning_non_provider_patterns":{"status":"disabled"},"secret_scanning_push_protection":{"status":"enabled"},
"secret_scanning_validity_checks":{"status":"disabled"}}`. STOP if `secret_scanning` or
`secret_scanning_push_protection` is not `enabled`. `secret_scanning_non_provider_patterns`, validity checks, AI
detection and `advanced_security` are not requested (they need a paid plan). The signed-in token (`repo`) is
sufficient for the PATCH, the GET and the alerts list. A `422` from the PATCH means the field is not accepted on this
plan: report the message, do not retry with other fields. `gh repo edit "$O/$REPO" --enable-secret-scanning` followed
by `--enable-secret-scanning-push-protection` sends the same fields in two requests and is an acceptable alternative.

After the flip, anonymous measurements (re-run the anonymous block of 6.3 once): `web` loops, `SERVED` loops, the
`activity` and `events` counts. Record them with the date; they are the report's measure of what the flip published.

### 6.6 What becomes reachable, by whom, when KotlinBottools is made public

Stated as the report's text (facts are documented or observed; the starred items are inference):

- **By anyone, at once and as intended:** the rewritten history, issues, and the Actions history (none exists).
- **By anyone who obtains one pre-rewrite commit id of KotlinBottools, without further access:** *all* of the old
  history, which holds a bot token file (dead), a data file with a session cookie, per-guild data files with Discord
  member and guild names, and the build, IDE and cache files the rewrite purged. Every route in 3.1 serves it
  (commit, tree, blob, raw, compare, archive, REST, and a `fetch` by id, which sends all ancestors of the id).
  The tree listings alone (paths) carry the guild names.
- **Where the first id comes from, for anyone:** the public activity feed (web page and REST), which carries the
  `before` and `after` ids of every push and of the rewrite's force-push, and which GitHub documents as publishing "your
  changes" on the flip;* the public events timeline for 30 days, which may list pushes made while private (one 2024
  report);* a four-digit prefix tried against `/commit/<prefix>` (about 65,536 / N requests, N = number of old
  commits);* any old id printed in a published document, issue or commit message.
- **Not reachable:** nothing through `refs/pull/*` (none exists); no object of any other repository; nothing that was
  never pushed.
- **Not changed by the flip:** the objects are not copied, filtered or removed; making the repository private again does
  not recall them from anyone who saw an id, forked, or cloned meanwhile.
- **Secret scanning** will examine the rewritten history and issue text; it will not report on the old objects.

### 6.7 Why this shape

The probes use `HEAD` and status tallies because the only content the phase must never print is exactly what the object
endpoints return. The local `refs/pull/*` are deleted rather than tolerated because the server provably never advertises
them to a push (3.2), which turns "expected rejections" into "zero rejections" and makes every `!` meaningful. The
authenticated old-tip probe before the flip measures the publication it is about to cause with the same routes an
anonymous caller will use afterwards. The flip and the scanning request are separate because the settings do not exist
while the repository is private (3.8).

## 7. Load-bearing claims

Documentation quotations were checked on the rendered `docs.github.com` pages as well as in the `github/docs` source.

1. **A force-push alone leaves the data reachable.** Quote: "If you only rewrite your history and force push it, the
   commits with sensitive data may still be accessible elsewhere: ... Directly via their SHA-1 hashes in cached views on
   GitHub ... Through any pull requests that reference them". Source: GitHub docs, "Removing sensitive data from a
   repository", https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
   (source file in `github/docs` at `main`, `3a444c04d0`, 2026-10-20).
2. **Only Support removes the rest, on conditions.** Quote: "However, you can permanently remove cached views and
   references to the sensitive data in pull requests on GitHub by contacting GitHub Support." and "GitHub Support won't
   remove non-sensitive data, and will only assist in the removal of sensitive data in cases where we determine that the
   risk can't be mitigated by rotating affected credentials." Same page and date.
3. **`refs/pull/*` cannot be pushed.** Quote: "This command will fail to push any refs starting with `refs/pull/`, since
   GitHub marks those as read-only." and "Repeat until the only failures to update are refs starting with `refs/pull/`."
   Same page and date.
4. **GitHub does not normally delete unreachable data.** Quote: "Normally, we don't remove any unreachable data from
   repositories. But occasionally we do, usually to remove sensitive data, like passwords or SSH keys from your
   repository's history." Source: GitHub Engineering, "Scaling Git's garbage collection", 2022-09-13,
   https://github.blog/engineering/architecture-optimization/scaling-gits-garbage-collection/. Also: "data is
   de-duplicated within a fork network" (footnote).
5. **Private to public consequences.** Quote: "Your changes will be published as activity." and "Anyone can fork your
   repository." and "The repository will automatically gain access to GitHub Advanced Security features." Source:
   GitHub docs, "Setting repository visibility",
   https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility
   (`github/docs` `main`, `3a444c04d0`, 2026-10-20).
6. **Network-wide object access, after a fork is deleted.** Quote: "Git data from any repository in a network may be
   accessed from any repository in the same network, including the upstream repository, even after a fork is deleted."
   and, in the table, "A private repository is made public | Private forks stay private but disconnect into separate
   private networks." Source: GitHub docs, "Forks",
   https://docs.github.com/en/pull-requests/reference/forks (same commit and date).
7. **The activity view lists force-pushes.** Quote: "The activity view lets you see a detailed history of changes to a
   repository, such as pushes, merges, force pushes, and branch changes, and associates these changes with commits and
   authenticated users." Source: GitHub docs, "Using the activity view to see changes to a repository",
   https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/using-the-activity-view-to-see-changes-to-a-repository
   (same commit and date).
8. **The activity API returns before and after ids.** Quote (REST description, schema `activity`): `before`: "The SHA
   of the commit before the activity."; `after`: "The SHA of the commit after the activity."; operation summary "List
   repository activities". Source: https://github.com/github/rest-api-description,
   `descriptions/api.github.com/api.github.com.json`, `main` at `755ee33b4a` (2026-10-18), version 1.1.4.
9. **Events window and fields.** Quote: "The timeline will include up to 300 events. Only events created within the past
   30 days will be included." and PushEvent `before`: "The SHA of the most recent commit on `ref` before the push."
   Source: GitHub docs, "REST API endpoints for events" (https://docs.github.com/en/rest/activity/events) and "GitHub
   event types" (https://docs.github.com/en/rest/using-the-rest-api/github-event-types), same commit and date.
10. **Private-era pushes appear in the public events (one report).** Quote: "This is also the case if you change your
    repository setting from private to public. The events endpoint still lists all PushEvents even from the time it was
    private and the hash of our incorrect commit can still be seen here." Source: Neodyme, "Hidden GitHub Commits and
    How to Reveal Them", 2024-02-16, https://neodyme.io/en/blog/github_secrets/.
11. **Dangling commits are served; four digits suffice; GitHub's position.** Quote: "A short SHA-1 value is the minimum
    number of characters required to avoid a collision with another commit hash, with an absolute minimum of 4." and
    "This is known by GitHub, and intentionally designed that way." and GitHub's reply "After reviewing the
    documentation, it's clear as day that GitHub designed repositories to work like this." Source: Truffle Security, Joe
    Leon, "Anyone can Access Deleted and Private Repository Data on GitHub", 2024-07-24,
    https://trufflesecurity.com/blog/anyone-can-access-deleted-and-private-repo-data-github.
12. **Force-pushed commits persist and four digits are enough.** Quote: "GitHub keeps these dangling commits, from what we
    can tell, forever." and "(even accessing using four hex digits is enough 9eef)". Source: Sharon Brizinov, "Guest
    Post: How I Scanned all of GitHub's 'Oops Commits' for Leaked Secrets", Truffle Security (2025; InfoQ's coverage is dated September 2025),
    https://trufflesecurity.com/blog/guest-post-how-i-scanned-all-of-github-s-oops-commits-for-leaked-secrets.
13. **git mirror semantics.** Quote: "Newly created local refs will be pushed to the remote end, locally updated refs
    will be force updated on the remote end, and deleted refs will be removed from the remote end." Source:
    https://raw.githubusercontent.com/git/git/master/Documentation/git-push.adoc, `--mirror` (read 2026-10-20).
14. **Porcelain format and flags.** Quote: "If `--porcelain` is used, then each line of the output is of the form: <flag>
    \t <from>:<to> \t <summary> (<reason>)" and "(space);; for a successfully pushed fast-forward; `+`;; for a
    successful forced update; `-`;; for a successfully deleted ref; `*`;; for a successfully pushed new ref; `!`;; for a
    ref that was rejected or failed to push; and `=`;; for a ref that was up to date and did not need pushing." and "The
    status of up-to-date refs is shown only if `--porcelain` or `--verbose` option is used." Same file.
15. **`Done` is printed on the transport result; the hidden-ref error text.** Quote: `if (porcelain && !push_ret)
    puts("Done");` (`transport.c`, `transport_push`) and `cmd->error_string = "deny updating a hidden ref";`
    (`builtin/receive-pack.c`). Source: https://github.com/git/git, tag `v2.55.0`.
16. **GitHub's hidden-ref rejection text (2014 report).** Quote: "! [remote rejected] refs/pull/1/head ->
    refs/pull/1/head (deny updating a hidden ref)" and "The refs beginning 'refs/pull' are _synthetic_ read-only refs
    created by GitHub". Source: https://github.com/rtyley/bfg-repo-cleaner/issues/36 (2014-03-17).
17. **Rate limits.** Quote: "The primary rate limit for unauthenticated requests is 60 requests per hour." and "All of
    these requests count towards your personal rate limit of 5,000 requests per hour." and "No more than 100 concurrent
    requests are allowed." and "No more than 900 points per minute are allowed for REST API endpoints" and "Most REST API
    `GET`, `HEAD`, and `OPTIONS` requests | 1" and "If you exceed a secondary rate limit, you will receive a `403` or
    `429` response". Source: GitHub docs, "Rate limits for the REST API" and its reusables,
    https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api (same commit and date).
18. **`gh repo edit` requires the consequences flag.** Quote: "When the `--visibility` flag is used,
    `--accept-visibility-change-consequences` flag is required." and, in `edit.go`: `if opts.IO.IsStdoutTTY() {` before
    `"%s Edited repository %s\n"`. Source: `gh repo edit --help` (gh 2.100.0) and
    https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/repo/edit/edit.go.
19. **Visibility restriction by the organisation.** Quote: "If you can't change a repository's visibility, the
    organization owner may have restricted the ability to change repository visibility to organization owners only." and
    "You will get a `422` error if the organization restricts changing repository visibility to organization owners and
    a non-owner tries to change the value of private." Sources: the "Setting repository visibility" page (claim 5) and
    the REST description's `private` parameter (claim 8's file).
20. **`security_and_analysis` in the update request.** Quote: "Specify which security and analysis features to enable or
    disable for the repository. To use this parameter, you must have admin permissions for the repository or be an owner
    or security manager for the organization that owns the repository." and the property
    `secret_scanning_push_protection`: "Use the `status` property to enable or disable secret scanning push protection
    for this repository." and `visibility` enum `public`, `private`. Source: the REST description (claim 8), operation
    `PATCH /repos/{owner}/{repo}`.
21. **Free for public repositories; paid for generic patterns and validity checks.** Quote: "Secret scanning alerts for
    users can be enabled on any free public repository that you own." (source: "Enabling secret scanning for your
    repository", https://docs.github.com/en/code-security/how-tos/secure-your-secrets/detect-secret-leaks/enable-secret-scanning)
    and "Organization-owned repositories on GitHub Team with GitHub Secret Protection enabled" (reusables
    `gated-features/secret-scanning-non-provider-patterns.md` and `partner-pattern-validity-check-ghas.md`,
    `github/docs` `main`, 2026-10-20).
22. **Push protection for repositories is off by default.** Quote: "Is disabled by default, and can be enabled by a
    repository administrator, organization owner, security manager, or enterprise owner". Source: GitHub docs, "About push
    protection", https://docs.github.com/en/code-security/concepts/secret-security/push-protection (same date).
23. **Nothing is switched on for an existing or organisation-owned repository.** Quote: "All new public repositories
    owned by personal accounts will now have secret scanning and push protection enabled by default." and "Existing
    public repositories are not affected, nor are new public repositories that belong to an organization." Source: GitHub
    changelog, 2024-03-11,
    https://github.blog/changelog/2024-03-11-secret-scanning-and-push-protection-are-enabled-by-default-on-new-public-repositories/.
24. **Partner scanning is not configurable on public repositories.** Quote: "You cannot change the configuration of
    secret scanning for partner patterns on public repositories." Source: GitHub docs, "Secret scanning partner program",
    https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning-for-partners (same date).
25. **Scope of secret scanning.** Quote: "Secret scanning scans your entire Git history on all branches of your repository
    for hardcoded credentials" and the scanned-content list "Descriptions and comments in issues", "Titles, descriptions,
    and comments, in open and closed historical issues", "Titles, descriptions, and comments in pull requests". Source:
    GitHub docs, "About secret scanning", https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning
    (same date).
26. **Alerts endpoint requirements.** Quote: "The authenticated user must be an administrator for the repository or for
    the organization that owns the repository to use this endpoint." and "OAuth app tokens and personal access tokens
    (classic) need the `repo` or `security_events` scope to use this endpoint." Source: the REST description (claim 8),
    operation `GET /repos/{owner}/{repo}/secret-scanning/alerts`.
27. **Issue transfer limits.** Quote: "You can only transfer issues between repositories owned by the same user or
    organization account. A private repository issue cannot be transferred to a public repository." and "When you
    transfer an issue, comments and assignees are retained. Labels and milestones are also retained if they're present in
    the target repository". Source: GitHub docs, "Transferring an issue to another repository",
    https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository
    (same date).
28. **Deleting and restoring.** Quote: "Some deleted repositories can be restored within 90 days of deletion." and
    "Deleting a private repository will delete all forks of the repository." and "Deleting a repository will
    permanently delete team permissions. This action cannot be undone." Source: GitHub docs, "Deleting a repository",
    https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository (same date).
29. **The only self-service options named for a pull-request-pinned history (2014).** Quote: "The only ways to recover
    from this are to a) delete the repo using the GitHub admin tools, and then recreate it, or b) contact GitHub support
    and ask them to delete the PRs for you". Source: https://github.com/rtyley/bfg-repo-cleaner/issues/36.

Re-runnable observations (no quotation exists; each prints a status or a count):

- Demonstration repository routes (3.1): `curl -s -I -o /dev/null -w '%{http_code}' https://github.com/SharonBrizinov/test-oops-commit/commit/9eedfa009833`
  and the other URLs of the table with the same commit prefix: 200; `.../commit/9ee`: 404. The activity feed shows the
  force-push: `curl -s https://api.github.com/repos/SharonBrizinov/test-oops-commit/activity` (`activity_type` `force_push`).
- Receive-pack and upload-pack advertisements (3.2): `curl -s -u "x-access-token:$(gh auth token)"
  "https://github.com/SpartanLaboratories/GKB2.git/info/refs?service=git-receive-pack" | grep -a -c refs/pull/` prints
  0; `git -c credential.helper= ls-remote https://github.com/SpartanLaboratories/GKB2.git 'refs/pull/*'` lists one ref.
- Anonymous access to the private repository (3.1): the same `curl -I` calls against
  `https://github.com/SpartanLaboratories/KotlinBottools/commit/<current main commit>` print 404 and 200 with a token.
- Organisation and repository facts (3.8, 3.10): `gh api orgs/SpartanLaboratories --jq .plan.name` prints `free`;
  `gh api repos/SpartanLaboratories/MagicBot --jq .security_and_analysis` prints the shape in 3.8.

## 8. Known gaps

- **Whether KotlinBottools' private-era activity and events are listed anonymously after the flip.** The documentation
  says "Your changes will be published as activity"; Neodyme observed it for events once, in 2024. No private-to-public
  repository was available to observe read-only. The runbook measures it right after the flip (6.5, 6.3 anonymous
  block); the answer then goes into the report. If the entries are not listed, the old ids are still reachable by
  guessing and by any document that cites them.
- **A real `git fetch origin <sha>` was not run** (the boundary excluded any fetch into a repository). The protocol-v2
  request it sends was replayed with `curl`; a pack came back for an unadvertised commit.
- **No expiry is documented, and none was found;** GitHub's own statement is "Normally, we don't remove any unreachable
  data"; the observed unreferenced commit was 16 months old. Whether objects are ever collected without Support is
  unknown.
- **Secret scanning on `refs/pull/*` and on unreachable objects** is not documented; section 3.9's conclusion is an
  inference. It could not be observed without enabling the setting on a repository that has such objects.
- **Delete-and-recreate and `gh issue transfer` were not exercised** (no mutation allowed). That a recreated repository
  does not serve the old ids, that a transfer into an empty private repository yields issue numbers 1 to 19 in order,
  and whether sub-issue and "blocked by" links survive a transfer are inferences or undocumented; the section 9
  options would be rehearsed on two throwaway private repositories first.
- **Push protection was not exercised functionally** (it needs a push). The setting's `GET` is the check.
- **The rejection text for `refs/pull/*` on GitHub today** was not observed; only 2014 reports and git's own code. The
  method avoids depending on it.
- **The manifest's location and format** are not fixed in any document read for this question; 6.3 assumes a file of ids.
- **Secondary rate limits** are undisclosed ("subject to change without notice"); the 0.3 s pacing and stop-on-403/429
  rule are a precaution, not a measured safe rate.
- **Abbreviation behaviour in KotlinBottools itself** (the shortest unique prefix among its old and new commits) was not
  measured; the 65,536 / N estimate assumes a prefix matches only when unambiguous.
- Third-party copies of the three public repositories cannot be found or removed.

## 9. Considerations

**C1. Publishing the old KotlinBottools history, or giving the public repository a clean object store.**
The flip in place makes the whole pre-rewrite KotlinBottools history, including the purged data files with member and
guild names, retrievable by anyone who finds one old commit id, and the repository's own activity feed is a source of
ids. For the three repositories that are already public this exposure is not new; KotlinBottools is the only one where it
is. The options, each with its cost:

- **A. Flip in place** (the runbook in section 6). Cost: the exposure in 6.6, permanent once any fork, clone or reader
  has an id. Gain: nothing lost, issue numbers and URLs unchanged, no extra steps.
- **B. A fresh repository under the same name, before the flip.** Create a private repository with a temporary name, push
  the rewritten refs, transfer the 19 open issues into it (allowed private to private), delete the old repository,
  rename the new one to `KotlinBottools`, then flip and enable scanning. Gain: an empty object store, no activity feed
  or events from before, nothing to find. Costs: issue numbers, comments' authorship dates and sub-issue and "blocked by"
  links are kept only if the transfer keeps them (undocumented; rehearse on two throwaway private repositories first); the
  repository id, any project links, webhooks and settings are rebuilt; for a time the name resolves to nothing. Must be
  completed before the flip, because from then on a fork pins the objects. The deleted repository stays restorable for
  90 days (so GitHub retains its objects at least that long); that does not touch the new repository, whose store starts
  empty, which the F0 probe in 6.5 confirms.
- **C. A new public repository under another name; KotlinBottools stays private** with its issues and old objects.
  Gain: nothing lost, old objects stay private. Costs: the name and the URLs that MagicBot, WebTools and the documents use
  change, and the architecture's repository name no longer holds.

Recommendation: B, rehearsed first, if the owner treats the member and guild names in the old history as data that must
not be published; A if the exposure in 6.6 is accepted as the phase's stated residual. The choice changes which
repository the plan makes public, so it is the owner's; the section 6 commands are the same up to the gate in 6.5
(B adds the F0 probe before the flip).
