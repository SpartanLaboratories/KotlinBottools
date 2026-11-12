# Anonymous reads of KotlinBottools after it is made public: routes, limits, controls and the access check

Researched 2026-11-12 for [KotlinBottools#25](https://github.com/SpartanLaboratories/KotlinBottools/issues/25). Builds on
[the earlier findings](../../research/github-residual-exposure-and-visibility.md) (§3.1, §3.4, §3.7, §6.1, §6.3) and agrees with
[the publication and scanning findings](publication-and-scanning-api.md) (§3.5, the way back).
Sources: GitHub's documentation from its source repository (`github/docs` at `main`, commit `b02f1f6a63`, 2026-11-12) and the
rendered pages, the REST description (`github/rest-api-description` at `main`, commit `e4d3628fe9`, 2026-11-12), GitHub's
changelog and community forum, and read-only probes made on 2026-11-12 from this machine with `curl`, `git ls-remote` and `gh api`
GETs. The working instances are public repositories of the organisation (MagicBot, WebTools, GKB2), probed with their **current**
commits, trees and blobs only. Nothing was changed, pushed or fetched, and no repository was made public. No id of any
repository's history before the rewrite, and no object id at all, appears below: probes are given as statuses.

## 1. Question

After KotlinBottools changes from private to public, which anonymous reads show it, how soon and under which limits, and how are
status-only probes and a read-only access check built so that a delay, a cache or a rate limit is never read as an answer? An answer
must cover: 87 pre-rewrite commits, the trees of the old branch tips and first-changed commits, at most 60 purged blobs, the 10 cited
ids and the controls, inside 60 unauthenticated REST calls per hour or on routes outside that budget; the anonymous activity feed and
events; and an access check that changes nothing. No Kotlin is written for this question, so the Kotlin lens does not apply.

## 2. Bottom line

- **No documentation says how soon an anonymous reader sees a repository after the change, and the change could not be observed
  (nothing may be made public here).** What is known: GitHub's text on the change lists its consequences and says nothing of timing;
  anonymous 404s of a private repository carry `Cache-Control: no-cache` on the web and no cache header on REST; anonymous 200s of a
  public repository are cached for 60 s (REST repository, activity) and 300 s (events); events can lag "from 30s to 6h"; and this
  repository's own rehearsal saw the web page of a public repository answer 504 for at least 11 minutes while REST answered 200. So
  the measurement opens with a **readiness gate** (web page, `git ls-remote` and the REST representation all answering as public) and
  brackets every batch with controls instead of waiting a fixed time.
- **Probe commits with two independent routes and trees and blobs with one, none of which spends the REST budget.** A web `HEAD` of
  `/commit/<id>` (200 or 404) covers commits only: the web has no route that takes a bare tree or blob id (observed: current trees
  and blobs answer 404 there). A protocol-v2 `want` answers commits, trees and blobs alike (observed: a current commit, tree or blob
  gives HTTP 200 and a `packfile`; a made-up id gives HTTP 200 and `ERR upload-pack: not our ref`). Anonymous REST `HEAD` on the
  git-object endpoints is kept for the controls and a sample of at most 20, at most 45 of the 60 calls an hour.
- **A status means something only per route.** Web `/commit`: 404 absent. REST `git/commits`, `git/trees`, `git/blobs`: 404 absent,
  and `git/trees/<id>` answers **422** for an id that exists as a blob ("SHA must identify a commit or a tree"), so there 422 means
  present. REST `/commits/<id>` answers 422 for an absent commit but cannot tell absent from wrong type; it is not used. `want`: the
  body decides, not the status. A 302 from `/archive`, `/blob/<id>` or `/raw` is never an answer (observed: they redirect for real and
  made-up ids alike).
- **Controls: the same route, the same window, bracketed.** Positive: a current non-tip commit (the root of the rewritten history), its
  tree, a blob of that tree (observed on WebTools: unadvertised current commit, tree and blob all answer `packfile`, web `/commit` 200,
  REST 200). Negative: a made-up full id. Run both before and after each route's batch; a batch whose closing control fails is void. A
  `want` of a current tip proves less, because a tip is advertised.
- **The activity and events feeds are read with a positive control and read twice.** The web `/activity` page (no budget, `Cache-Control:
  max-age=0, private, must-revalidate`, about 30 entries per page, embedded `before`/`after`) is the primary read; REST `activity` (60 s
  cache, cursor `Link` paging, `per_page` up to 100) and `events` (300 s cache, 300 events at most, 30 days) are the cross-check. Absence
  of an old id counts only when the same response lists a known current id; a second read follows at least 6 minutes later.
- **The access check splits cleanly.** Anonymous, expected for a public repository: page 200; REST representation 200 with
  `visibility` public (and without `security_and_analysis` or `permissions`); `git ls-remote` rc 0 with credentials switched off; an
  issue page 200; the Actions run list 200 **and** run logs 403. Authenticated read-back: collaborators (one, admin), teams (none),
  `allow_forking` (a private-forks flag: recorded, not a gate), `has_wiki` false, workflow token default `read` with approving off, and
  the fork pull-request approval policy (422 today; 200 after the change, observed `first_time_contributors` on the organisation's other
  public repositories, which is also GitHub's documented default).

Differs from the earlier findings: (1) the earlier probe helpers treat 422 as "absent" on every route; on `git/trees` it means
"present, as a blob". (2) The earlier set probes commits, trees and blobs through REST; run anonymously, 87 commits, the trees and up to 60 blobs
exceed the 60 calls an hour several times over; the `want` route and the web route remove that need. (3) The earlier `want_probe` did not check the HTTP
status; a throttled reply would have read as "STOP (unexpected)" only by accident of its body. (4) A new limit: GitHub lowered the
limits of anonymous requests to REST, `raw` and HTTPS clones in May 2025, with undocumented thresholds.

## 3. Findings

Tiers: **documented** (GitHub's text), **observed** (run on 2026-11-12 with the tools named; a single reading unless stated),
**inference** (derived; labelled).

### 3.1 How soon, and what an anonymous request may see meanwhile

- **Documented: no timing.** The page that lists the consequences of private to public ("The code will be visible to everyone who can
  visit GitHub.com.", "Anyone can fork your repository.", "Your changes will be published as activity.", "Actions history and logs
  will be visible to everyone.") has no sentence about timing, delay, queues or caches
  ([`setting-repository-visibility.md`](https://github.com/github/docs/blob/b02f1f6a63/content/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility.md)).
  A search of GitHub's pages, its community forum and the web found no report of anonymous 404s persisting after a change to public.
  **The lag, if any, is unmeasured; this is a gap.**
- **Observed: what is cached.** Anonymous requests on 2026-11-12, headers read with `curl -I`:

  | Request | Status | `Cache-Control` |
  |---|---|---|
  | `github.com/{o}/{r}` and `/commit/<id>` of a **private** repository | 404 | `no-cache` |
  | `github.com/{o}/{r}` of a public repository | 200 | `max-age=0, private, must-revalidate` |
  | `github.com/{o}/{r}/commit/<made-up id>` of a public repository | 404 | `no-cache` |
  | `api.github.com/repos/{o}/{r}` of a **private** repository | 404 | none sent |
  | `api.github.com/repos/{o}/{r}` of a public repository | 200 | `public, max-age=60, s-maxage=60` |
  | REST `activity` of a public repository | 200 | `public, max-age=60, s-maxage=60` |
  | REST `events` of a public repository | 200 | `public, max-age=300, s-maxage=300`, `X-Poll-Interval: 60` |
  | web `/activity` of a public repository | 200 | `max-age=0, private, must-revalidate` |

  Reading: a 404 is not stored by a shared cache on the routes that matter (web page, web commit, REST repository). A cached **200**
  is possible on the REST representation and both feeds, for 60 s and 300 s. So after the change a stale 404 is not expected on the
  web; and after a **revert** an anonymous REST read can still answer 200 for up to 60 s (inference from `s-maxage=60`), while the web
  page and `info/refs` are not shared-cached.
- **Observed in this repository's own record: the web tier can answer 5xx for minutes.** During the transfer rehearsal on 2026-11-09 the
  unauthenticated web page of a public repository answered 504 at four reads between 05:31 and 05:42 UTC, while its REST answers were
  200 ([rehearsal as-built §3.9](../../22-transfer-rehearsal/final-implementation.md)). A 5xx is not an answer; the gate must tolerate
  one and the probes must stop on one.
- **Observed: the gate signals.** Private KotlinBottools, anonymous: web page 404, REST 404, `info/refs?service=git-upload-pack` 401
  (v2 and v0), `git ls-remote` with prompts off exits 128. Public MagicBot, same calls: 200, 200, 200, rc 0. So three reads move from
  not-public to public, and each is a sound "now public" signal; the first two are also the repository-level proof that an anonymous
  object read is possible.
- **Documented: events lag.** "Depending on the time of day, event latency can be anywhere from 30s to 6h." and the timeline "will
  include up to 300 events. Only events created within the past 30 days" ([events](https://docs.github.com/en/rest/activity/events)).
  So an events read minutes after the change can miss an entry that appears later; absence in events is weak evidence by itself.

### 3.2 Probe routes and what each status means

Observed on 2026-11-12, anonymous, MagicBot (one commit) and WebTools (many), current objects and a made-up 40-digit id. "C", "T", "B"
are a current commit, a tree and a blob; "Z" is made up.

| Route | C | T | B | Z | Present / absent | Budget |
|---|---|---|---|---|---|---|
| web `HEAD github.com/{o}/{r}/commit/<id>` | 200 | 404 | 404 | 404 | 200 / 404, **commits only** | none documented; throttled in practice |
| web `/tree/<id>`, `/blob/<id>` with a bare id | 200 for C | 404 | 404 (302 then 404) | 404 | not usable for trees and blobs | |
| web `/blob/<C>/<path>`, `/raw/<C>/<path>`, `raw.githubusercontent.com/.../<C>/<path>` | 200 (raw: 302 then 200) | | | 404 | need a commit and a path | `raw` has its own throttle |
| web `/archive/<id>.zip` | 302 | | | 302 (then 404 at `codeload`) | the redirect says nothing | |
| REST `HEAD /git/commits/<id>` | 200 | 404 | | 404 | 200 / 404 | 1 each |
| REST `HEAD /git/trees/<id>` | | 200 | **422** | 404 | 200 or 422 present; 404 absent | 1 each |
| REST `HEAD /git/blobs/<id>` | | 404 | 200 | 404 | 200 / 404 | 1 each |
| REST `HEAD /commits/<id>` | 200 | | | 422 | cannot separate absent from wrong type | not used |
| protocol v2 `POST .../git-upload-pack` with `want <id>` | `packfile` | `packfile` | `packfile` | `ERR upload-pack: not our ref` | body decides; both are HTTP 200 | none documented; throttled in practice |

- The `want` request is the helper of the earlier findings (`command=fetch`, `object-format=sha1`, `want <id>`, `done`). On WebTools it
  answered `packfile` for a current commit that is not a tip and is not listed by `git ls-remote`, for that commit's tree and for a
  blob of that tree: it does not depend on the id being advertised, and it treats the three object types alike. A served id streams
  progress lines first ("Enumerating objects"), then the pack; keeping only the first 120 bytes and the HTTP status reads the answer
  and never an object's content. A private repository answers `info/refs` 401, so a `want` has no meaning before the change.
- The REST `git/trees` text for the 422 is "Invalid object requested. SHA must identify a commit or a tree." (read once with a GET; the
  body held no object content). `git/commits/<tree id>` and `git/blobs/<tree id>` both answer 404, so each of those routes treats a
  wrong-type id as absent; every probe feeds a route only ids of its own type.
- The REST description lists `409` (empty repository) for `git/trees` and `git/commits` and `403` for `git/blobs`; the probe stops on
  any of them (they are not answers).
- **Trailing slash.** `GET /repos/{o}/{r}/` (an empty suffix) answers **404** while `/repos/{o}/{r}` answers 200 (observed on a public
  repository). A path built from a template with an empty tail would read as "private".

### 3.3 Limits and rate-limit hygiene

- **Documented.** "The primary rate limit for unauthenticated requests is 60 requests per hour." and "Unauthenticated requests are
  associated with the originating IP address, not with the user or application that made the request." Exceeding it gives "a `403` or
  `429` response, and the `x-ratelimit-remaining` header will be `0`". The headers are "the authoritative source" and the docs warn
  that "`x-ratelimit-remaining` may be higher on a later response than on an earlier one within the same rate limit window" because
  requests are processed in several regions ([rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)).
  **Observed** the same: anonymous reads within minutes of each other reported windows that reset at different times, and the free
  `GET /rate_limit` endpoint did not change `remaining`. So a local call counter is unreliable: read `x-ratelimit-remaining` on every
  response and stop below a guard.
- **Anonymity proof on every call.** Every anonymous REST response carries `x-ratelimit-limit: 60`; an authenticated one carries 5000.
  The helper prints it, so a call that quietly carried a token is visible.
- **Anonymous web, REST, `raw` and HTTPS clones are throttled beyond the documented REST number.** GitHub's changelog of 2025-05-08:
  "we're rolling out updates to rate limits for requests made without authentication", covering cloning over HTTPS, anonymous REST
  calls and `raw.githubusercontent.com`; a staff member on the community thread about HTTP 429 for anonymous browsing: "this was an
  unintended consequence of throttling limits we've had to put in". No threshold, status or `Retry-After` is documented for the web or
  for `git-upload-pack`. **Observed:** 25 anonymous web `HEAD`s and 25 anonymous `want`s at 0.3 s pace on 2026-11-12 drew no 429. Treat
  429 as a real possibility, pace at 0.4 s, and stop on it.
- **Conditional requests.** The events documentation says a "304 Not Modified" leaves "your current rate limit ... untouched". One
  anonymous conditional read on WebTools showed `remaining` fall by one (inference at most: the region caveat above applies). Do not
  plan on 304 being free.

### 3.4 The activity feed and events, anonymously

- **REST `GET /repos/{o}/{r}/activity`**: anonymous 200 on a public repository; each entry has `before`, `after`, `ref`, `timestamp`,
  `activity_type`, `actor`, `id`, `node_id`. Paging is by cursor: the response's `Link` header carries `rel="next"` with an `after`
  cursor; `per_page` is "max 100"; `before` and `after` are cursors "as given in the Link header". Filters `ref`, `actor`,
  `time_period`, `activity_type`. No 30-day window (the earlier findings saw 2025 entries). Cost: one call per 100 entries (21 entries
  today: one call).
- **REST `GET /repos/{o}/{r}/events`**: anonymous 200; `page` paging with `Link` `next` and `last` (`per_page=2` gave `last` at page
  150, the 300-event cap); entries have `type`, `public`, `payload`, `created_at`. Cost: up to 3 calls at `per_page=100` (54 events
  today: one call).
- **Web `/activity`** (anonymous 200 on a public repository): the page embeds the entries as JSON with `"before"`, `"after"`,
  `"pushType"`, plus `"hasNextPage"` and `"endCursor"`; 30 entries came on the first page of WebTools (which has more), so 21 fit on
  one. It costs no REST budget and carries no shared-cache header. The form of the next-page request was not established.
- **Are private-era entries listed anonymously?** Not established. Documented: the change "publishes" "your changes ... as activity".
  Published, one source: "The events endpoint still lists all PushEvents even from the time it was private" (Neodyme, 2024). For
  KotlinBottools the question has a narrow form: its history was pushed into an empty repository, so no pre-rewrite id was ever
  pushed to it and none can be listed (its feed and events, read as the owner today, hold none). The anonymous read therefore
  checks membership, and the control is that the response lists current ids.
- **Observed today for the repository itself, as the owner:** 21 activity entries, 54 events, 2 branches, 4 Actions runs (`Secret scan`).
  These drift as the planning branch is pushed; the run reads them again.

### 3.5 The access check

Anonymous reachability, observed on a public repository of the organisation (MagicBot, WebTools) on 2026-11-12:

| Read | Result | Note |
|---|---|---|
| `GET github.com/{o}/{r}` | 200 | private: 404 |
| `GET api.github.com/repos/{o}/{r}` | 200 | `visibility` `public`, `private` false, `allow_forking`, `has_wiki`, `forks_count` present; **no** `security_and_analysis`, **no** `permissions` |
| `git ls-remote https://github.com/{o}/{r}.git` with `GIT_TERMINAL_PROMPT=0` and `-c credential.helper=` | rc 0, refs listed | private: rc 128 ("could not read Username") |
| `GET github.com/{o}/{r}/issues/<n>` | 200 | REST `issues?per_page=1` also 200 |
| `GET api.github.com/repos/{o}/{r}/actions/runs` | 200, `total_count` | "Anyone with read access to the repository can use this endpoint." |
| `GET .../actions/runs/{id}/logs` | **403** `Must have admin rights to Repository.` | the job log download is not anonymous |
| web `actions/runs/{id}` and `.../job/{id}` | 200 | the page says "Sign in to view logs" |

The documentation agrees on the logs side: "You must be logged in to a GitHub account to view workflow run information, including for
public repositories." (the REST text for the run list says anyone with read access, and an anonymous caller does get the list). So an
anonymous reader sees that runs exist, their names, branches and conclusions, and not their logs.

Authenticated read-back (token with `repo`), today on private KotlinBottools and on the public instances:

| Read | KotlinBottools today (private) | Public instances (MagicBot, GKB2) |
|---|---|---|
| `GET /repos/{o}/{r}/collaborators` | 200, one entry, role `admin` | 200; anonymous: **401** "Requires authentication" |
| `GET /repos/{o}/{r}/teams` | 200, `[]` | 200, `[]`; anonymous 401 |
| `allow_forking` in `GET /repos/{o}/{r}` | `false` | `true` |
| `has_wiki` | `false` | `true` (older repositories) |
| `GET .../actions/permissions/workflow` | `{"default_workflow_permissions":"read","can_approve_pull_request_reviews":false}` | `write` / `false` (older defaults); anonymous 401 |
| `GET .../actions/permissions/fork-pr-contributor-approval` | **422** "Fork PR approval is not allowed for private repositories." | 200 `{"approval_policy":"first_time_contributors"}`; anonymous 401 |
| `GET .../actions/permissions/fork-pr-workflows-private-repos` | 200, four flags all `false` | **422** "Fork PR workflow settings is not allowed for public repositories." |
| organisation-level counterparts | 403 with this token (`admin:org` needed) | |

- **`allow_forking`.** The REST description: "Either `true` to allow private forks, or `false` to prevent private forks." The
  organisation's own policy `members_can_fork_private_repositories` is `false` (read today), which is why a private repository reads
  `false`. The repository-level and organisation-level forking pages speak only of private repositories. The documented consequence of
  the change is "Anyone can fork your repository." Both public instances read `true` although the organisation policy is `false`.
  So: forking is always possible while the repository is public, whatever the field reads; **whether the stored field of a repository
  converted from private flips to `true` is not established**, and a `false` after the change is a report-only deviation that does not
  mean forks are blocked.
- **Fork pull-request approval policy.** Values (REST description): `first_time_contributors_new_to_github`, `first_time_contributors`,
  `all_external_contributors`. Documented default: "By default, all first-time contributors require approval to run workflows." and
  "workflows from forks do not have access to sensitive data such as secrets". `pull_request_target` workflows ignore it. This
  repository's only workflow runs on `push`, `pull_request` and `workflow_dispatch` with `contents: read`. Both public instances read
  `first_time_contributors`. Whether a converted repository starts at that default is not established (it is unreadable while
  private); the run reads it and reports.
- **Which reads need authentication.** Collaborators ("The authenticated user must have write, maintain, or admin privileges on the
  repository to use this endpoint."), teams ("For a public repository, a team is listed only if that team added the public repository
  explicitly."), the Actions permission endpoints and `security_and_analysis` all do: anonymous gives 401 or omits the field
  (observed).

## 4. How comparable practice does it

- **GitHub's own account of fetch by id**: the earlier findings (§3.1) and Truffle Security (2024-07-24) show that an object id is
  served by every route once the repository is readable; this file only chooses routes that can say "no" truthfully. No comparable
  tool was found that measures non-reachability of old ids after a publication; security tooling goes the other way, from zero-commit
  push events to the id (Neodyme 2024; Truffle Security guest post 2025).
- **REST client practice**: honour `x-ratelimit-*`, back off on 403 and 429, never treat them as "not found" (GitHub's rate-limit
  page). Polling practice: events are "optimized for polling with the ETag header" and `X-Poll-Interval` is to be obeyed (the events
  page).
- **Git clients**: `GIT_TERMINAL_PROMPT=0` and an emptied credential helper are the standard way to make `git` fail rather than prompt
  or silently reuse a stored credential; the private-repository run of the same command is its negative control.

## 5. Pitfalls and regrets

1. **A web 404 for a tree or blob id.** Current trees and blobs 404 on `/commit/`, `/tree/` and `/blob/` with a bare id, so a loop over
   old blob ids on the web prints all 404 whether the objects exist or not, and its positive control can never be built. Use `want` or
   REST for trees and blobs.
2. **422 read as "absent" on `git/trees`.** It means the id exists as a blob.
3. **302 read as an answer.** `/archive/<id>.zip` redirects for a made-up id and `/blob/<id>` redirects for every id.
4. **A trailing slash or an empty path segment** turns a public repository's REST read into a 404 that looks like "private".
5. **A silent token.** `gh api` always sends the token; `git` may use a credential manager. Use `curl` without `-n` and `-u`, and run
   `git` with `-c credential.helper=` and `GIT_TERMINAL_PROMPT=0`. Check `x-ratelimit-limit` is 60.
6. **Counting the hour's budget locally.** The window starts per address at its first request, regions disagree, and the egress
   address can change between calls (anonymous reads in this session reported three different reset times). Read the header.
7. **HTTP 200 for "not found" in the protocol.** `want` of an absent id answers HTTP 200 with an `ERR` line; a classifier that reads only
   the status calls everything served. Read the body, and require status 200.
8. **Storing a served pack.** A served old tree or blob streams its content. Cut the body after 120 bytes; set a timeout.
9. **Reading an early feed as clean.** Activity is cached for 60 s and events for 300 s and lag up to 6 hours; read twice, with a control.
10. **Trusting a single quiet window.** A throttle or 5xx mid-batch makes the rest of the batch unreadable; the closing control is what
    shows it.
11. **Spending the budget on polling.** Gate on web and git (no REST budget), then read REST once.

## 6. Recommendation for this repo

Shell: Git Bash. `O` = `SpartanLaboratories`, `REPO` = `KotlinBottools`, `OUT` a scratch folder, `LIST` files of full 40-digit ids as
in the earlier findings §6.3 (`old-ids.txt` for the 87 commits, `cited-ids.txt` for the 10, `old-tips.txt`, `old-firsts.txt`,
`old-trees.txt`, `manifest-sample.txt` for at most 60 blobs). Nothing below prints an id or a body.

### 6.1 The route set

| Set | Ids | Route | Count | REST calls |
|---|---|---|---|---|
| S1 commits | all 87 (tips, firsts and the 10 cited are subsets, tallied again from their own files) | web `HEAD /commit/<id>` | 87 | 0 |
| S2 commits | all 87 | `want` | 87 | 0 |
| S3 trees | old trees of tips and first-changed commits | `want` | T | 0 |
| S4 blobs | evenly spaced sample, at most 60 | `want` | at most 60 | 0 |
| S5 REST sample | at most 20 spread over S2 to S4 (all old tips first), one route per type | REST `HEAD` `git/commits`, `git/trees`, `git/blobs` | at most 20 | at most 20 |
| S6 second pass | the 10 cited, tips and first-changed commits | web `HEAD /commit/<id>`, at least 6 minutes after S1 ends | at most about 30 | 0 |

Expected: every line `absent`, equal route by route to the authenticated tally taken before the change in this repository (all 404).
Any `served`, or an old id in a feed: make the repository private again at once and hand back (the way back is in the publication
findings §3.5; read `forks_count` first). Any other deviation is reported.

### 6.2 The gate, the controls and the window

1. **Pre-change anonymity snapshot (once, while private):** web page 404, REST representation 404 with `x-ratelimit-limit: 60`,
   `info/refs` 401, `git ls-remote` rc 128. This is the negative control of the harness itself.
2. **Gate, after the change and the scanning request (no REST budget):** poll every 10 s, at most 5 minutes: web page 200,
   `info/refs?service=git-upload-pack` 200 (v2), `git ls-remote` rc 0. Then one REST read of the representation: 200, `visibility`
   `public`. A 5xx or 429 during the gate means wait and poll again; a gate that stays closed after 5 minutes is reported (the
   repository is public by the `PATCH` read-back; nothing is concluded).
3. **Controls from the fresh mirror (local, no calls):** the root commit of `main` (`git rev-list --max-parents=0`), its tree
   (`git rev-parse <root>^{tree}`), a blob of that tree (`git ls-tree`). They are current and not tips. Negative: a made-up id that is
   not the all-zero id. The pre-change authenticated tally must have shown the old ids 404 for these routes, which also shows the
   control objects are disjoint from the old ones.
4. **Bracket per route:** positive control (200 or `SERVED`) and negative control (404 or `NOT-SERVED`), then the batch, then the same
   two again. The route's tally counts only if all four controls answered as expected; otherwise discard the tally, report, and stop
   (a rerun after a wait starts with fresh controls). Each route's own controls are repeated, because the meaning of a status is
   per route (3.2): web (commit control), `want` (commit, tree and blob controls), REST (one per type).
5. **Window:** each batch is one route and under about 3 minutes (87 requests at 0.4 s is about 35 s). Statuses outside the route's two
   answers (any of 401, 403, 429, 5xx, a 3xx, an unexpected `want` body, 409) stop the probe set.

### 6.3 Budget arithmetic

Anonymous REST, one address and one hour (60), worst case:

| Reads | Calls |
|---|---|
| representation after the gate | 1 |
| Actions runs list and one run's logs (403 expected) | 2 |
| activity feed, per_page 100, two reads (one extra page each if over 100 entries) | 2 to 4 |
| events, per_page 100, two reads (at most 3 pages each) | 2 to 6 |
| object controls: 3 routes, positive and negative, two brackets | 12 |
| S5 sample | at most 20 |
| total | at most 45 |

That leaves at least 15; the helper stops REST calls when the last `x-ratelimit-remaining` is below 8 and carries the remainder past
the window's reset with fresh controls. Web and `want` calls (about 125 and about 180) are outside it and are paced at 0.4 s, about
2 minutes each. A route that returns 429 stops the set; a resumed run waits `Retry-After` if present, else at least 10 minutes.

### 6.4 The feeds

```bash
# web page first (no REST budget, no shared cache); then REST as the cross-check. Membership only: counts out, never an id.
curl -s -m 30 -A probe/1 "https://github.com/$O/$REPO/activity" -o "$OUT/activity.html"
grep -o -F -f "$OUT/old-ids.txt" "$OUT/activity.html" | wc -l          # expected 0   (old ids anywhere on the page)
grep -o -F -f "$OUT/current-ids.txt" "$OUT/activity.html" | sort -u | wc -l   # expected >= 1  (control: the page lists current ids)
curl -s -m 30 -A probe/1 -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/$O/$REPO/activity?per_page=100" > "$OUT/activity.json"
# same two counts on activity.json; if the response has a Link rel="next", read that page (one more call) and repeat
curl -s -m 30 -A probe/1 -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/$O/$REPO/events?per_page=100" > "$OUT/events.json"
# old ids: 0 ; control: events non-empty and at least one current id or one event of the last 30 days
```

`current-ids.txt` holds the current tips and the root commit. A feed read counts as clean only if the control line holds. Repeat at
least 6 minutes later (past the 300 s cache). An old id found in either feed: make the repository private at once. Delete the saved
pages after counting.

### 6.5 Helpers (extend `probe.sh` of the earlier findings; tested against WebTools with current objects, all controls answered)

```bash
# anon.sh -- sourced, never executed. Needs: O REPO OUT (a scratch folder). Sends no credential on any call.
# Prints statuses only: no id, no body. Do not use `gh api` for anything anonymous: it always sends the token.
UA='probe/1'
anon_web() {   # $1 = URL ; anonymous HEAD ; prints the HTTP status
  curl -s -I -m 20 -A "$UA" -o /dev/null -w '%{http_code}' "$1"
}
anon_api() {   # $1 = path below /repos/$O/$REPO (never empty: a trailing slash answers 404) ; prints "<status> <remaining> <limit>"
  local h="$OUT/.hdr" c
  c=$(curl -s -I -m 20 -A "$UA" -D "$h" -o /dev/null -w '%{http_code}' -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/$O/$REPO/$1")
  echo "$c $(grep -i '^x-ratelimit-remaining' "$h" | tr -d '\r' | cut -d' ' -f2) $(grep -i '^x-ratelimit-limit' "$h" | tr -d '\r' | cut -d' ' -f2)"
  rm -f "$h"
}
anon_want() {  # $1 = full 40-digit id (commit, tree or blob) ; prints SERVED, NOT-SERVED or STOP:<http status>
  local id="$1" req="$OUT/.want.req" hdr="$OUT/.want.hdr" body="$OUT/.want.head" code
  pkt() { printf '%04x%s' $(( ${#1} + 4 )) "$1"; }
  { pkt $'command=fetch\n'; pkt $'object-format=sha1\n'; printf '0001'; pkt "want $id"$'\n'; pkt $'done\n'; printf '0000'; } > "$req"
  # only the first 120 bytes are kept: the pack's progress lines, never an object's content
  curl -s -m 20 -A "$UA" -X POST -D "$hdr" -H 'Content-Type: application/x-git-upload-pack-request' -H 'Git-Protocol: version=2' \
       --data-binary @"$req" "https://github.com/$O/$REPO.git/git-upload-pack" | head -c 120 > "$body"
  code=$(head -1 "$hdr" | awk '{print $2}')
  if   [ "$code" = 200 ] && grep -a -q packfile "$body";        then echo SERVED
  elif [ "$code" = 200 ] && grep -a -q 'not our ref' "$body";   then echo NOT-SERVED
  else echo "STOP:${code:-none}"; fi
  rm -f "$req" "$hdr" "$body"
}
classify() {   # <route> <status> -> served | absent | stop ; the meaning of a status is per route
  case "$1:$2" in
    web:200|api-commit:200|api-tree:200|api-blob:200|want:SERVED)        echo served ;;
    web:404|api-commit:404|api-tree:404|api-blob:404|want:NOT-SERVED)    echo absent ;;
    api-tree:422)                                                         echo served ;;   # exists, as a blob
    *)                                                                    echo stop ;;
  esac
}
probe_ids() {  # <file of ids> <web|api-commit|api-tree|api-blob|want> <label> ; one tally line; return 1 (STOP) outside the two answers
  local f="$1" route="$2" label="$3" id s k tally="$OUT/.tally.$3"; : > "$tally"
  while read -r id; do
    [ -n "$id" ] || continue
    case "$route" in
      web)        s=$(anon_web "https://github.com/$O/$REPO/commit/$id") ;;
      api-commit) s=$(anon_api "git/commits/$id" | cut -d' ' -f1) ;;
      api-tree)   s=$(anon_api "git/trees/$id"   | cut -d' ' -f1) ;;
      api-blob)   s=$(anon_api "git/blobs/$id"   | cut -d' ' -f1) ;;
      want)       s=$(anon_want "$id") ;;
    esac
    k=$(classify "$route" "$s")
    [ "$k" = stop ] && { echo "STOP route=$route label=$label status=$s"; return 1; }
    echo "$k" >> "$tally"; sleep 0.4
  done < "$f"
  echo "$label: $(sort "$tally" | uniq -c | awk '{printf "%s x%s  ", $2, $1}')"
}
```

Expected output of the controls on a public repository, as tested: `ctl-pos-web: served x1`, `ctl-neg-web: absent x1`, the same pair
for `want` (commit, tree and blob positives), for `api-commit`, `api-tree` and `api-blob`; `api-tree` over a blob id prints
`served x1` (the 422 rule). `anon_api` printed `404 <remaining> 60` for a made-up id, so the limit field shows 60.

### 6.6 The access check

Anonymous half (run with the same script, no credential), each expected value as in 3.5:

```bash
echo "page $(anon_web https://github.com/$O/$REPO)"                                   # 200
curl -s -o "$OUT/repo.json" -A probe/1 -w 'rest %{http_code}\n' -H 'Accept: application/vnd.github+json' "https://api.github.com/repos/$O/$REPO"   # 200
python -I -c 'import json,sys; d=json.load(open(sys.argv[1])); print({k:d.get(k) for k in ["visibility","private","archived","disabled","fork","forks_count","has_wiki","has_issues","allow_forking","default_branch"]}, "security_and_analysis" in d, "permissions" in d)' "$OUT/repo.json"
GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c core.askPass= ls-remote --refs "https://github.com/$O/$REPO.git" | wc -l   # rc 0; count = branches + pull heads, equal to the authenticated listing
echo "issue $(anon_web https://github.com/$O/$REPO/issues/1)"                          # 200
echo "runs  $(anon_api 'actions/runs?per_page=1')"                                     # 200
echo "logs  $(anon_api "actions/runs/$RUN_ID/logs")"                                   # 403   ($RUN_ID read with the token)
```

Expected from the representation:
`visibility` public, `private` false, `archived` false, `disabled` false, `fork` false, `forks_count` 0, `has_wiki` false, `has_issues`
true, `default_branch` main, and both `security_and_analysis` and `permissions` absent from the anonymous body. A different value is
reported; a 404 on the page or representation is the failed gate.

Read-back half, with the token (`gh api` is right here), every call a GET:

| Read | Expected after the change | Report if |
|---|---|---|
| `repos/{o}/{r}/collaborators` | one entry, role `admin`, the organisation administrator (`?affiliation=direct` the same) | another account or role |
| `repos/{o}/{r}/teams` | `[]` | any team |
| `allow_forking`, `has_wiki` | recorded; `has_wiki` false | `has_wiki` true; `allow_forking` is recorded without a verdict (3.5) |
| `actions/permissions/workflow` | `read`, `can_approve_pull_request_reviews` false | `write` or approving true |
| `actions/permissions/fork-pr-contributor-approval` | 200, `first_time_contributors` (documented default) | 422, or another value |
| `actions/permissions/fork-pr-workflows-private-repos` | 422 "not allowed for public repositories" | 200 |

The report prints values only; the approval policy is read, not changed.

### 6.7 What this recommends against

- **A fixed wait.** No duration is documented; a wait that was long enough once proves nothing. The gate and the brackets measure it.
- **REST object probes as the main route.** The 60-call budget cannot hold 87 commits, the trees and 60 blobs, and the controls.
- **Web routes for trees and blobs.** They cannot answer "present" for any id.
- **Trusting the feeds alone.** Cached and lagging; membership is a check on top of the object probes.

## 7. Load-bearing claims

Observed behaviour (cache headers, route statuses, 422 on `git/trees`, `want` answers, anonymous logs 403, current defaults) rests on
the repeatable commands in section 3 and is a reading of 2026-11-12, not a quotation. The documented claims:

1. **The unauthenticated REST limit is per address.** "You can make unauthenticated requests if you are only fetching public data.
   Unauthenticated requests are associated with the originating IP address, not with the user or application that made the request."
   and "The primary rate limit for unauthenticated requests is 60 requests per hour." Source: `github/docs`
   `data/reusables/rest-api/primary-rate-limit-unauthenticated-users.md` at `main`, `b02f1f6a63` (2026-11-12), rendered at
   https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api.
2. **Headers are authoritative; regions disagree; 403 and 429 are limit answers.** "`x-ratelimit-remaining` may be higher on a later
   response than on an earlier one within the same rate limit window. The `x-ratelimit-*` headers are the authoritative source for
   your current rate limit status and may differ from values reported by the `GET /rate_limit` endpoint." and "If you exceed your
   primary rate limit, you will receive a `403` or `429` response, and the `x-ratelimit-remaining` header will be `0`." Same page and
   commit.
3. **Anonymous access to clones, REST and `raw` was throttled more tightly in 2025.** "we're rolling out updates to rate limits for
   requests made without authentication". Source: GitHub changelog, 2025-05-08,
   https://github.blog/changelog/2025-05-08-updated-rate-limits-for-unauthenticated-requests/ (the entry names cloning over HTTPS,
   anonymous REST calls and `raw.githubusercontent.com`).
4. **GitHub throttles anonymous web access, with a staff acknowledgement.** "this was an unintended consequence of throttling limits
   we've had to put in" and "it's not our intention to limit legitimate human browsing of open source code on GitHub". Source: GitHub
   staff comment, https://github.com/orgs/community/discussions/159123 (read 2026-11-12).
5. **Events lag and the window.** "Depending on the time of day, event latency can be anywhere from 30s to 6h." Source: REST
   description, operation `List repository events` (`github/rest-api-description` `main`, `e4d3628fe9`, 2026-11-12), and
   https://docs.github.com/en/rest/activity/events. "The timeline will include up to 300 events. Only events created within the past 30
   days will be included." (same events page, introduction).
6. **Events are polling-optimised.** "Events are optimized for polling with the "ETag" header. If no new events have been triggered,
   you will see a "304 Not Modified" response, and your current rate limit will be untouched." Source: `github/docs`
   `content/rest/activity/events.md` at `main`, `b02f1f6a63`.
7. **The activity API.** "Lists a detailed history of changes to a repository, such as pushes, merges, force pushes, and branch changes,
   and associates these changes with commits and users." and `per_page`: "The number of results per page (max 100)." and `after`: "A
   cursor, as given in the [Link header]". Source: REST description, `List repository activities`, `e4d3628fe9`.
8. **What the change to public does.** "Anyone can fork your repository." "Your changes will be published as activity." "Actions
   history and logs will be visible to everyone." Source: `github/docs`
   `content/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility.md`
   at `main`, `b02f1f6a63`; rendered at
   https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility.
9. **`allow_forking` concerns private forks.** "Either `true` to allow private forks, or `false` to prevent private forks." Source: REST
   description, request body of `Update a repository`, `e4d3628fe9`. And "You can allow or prevent the forking of any private
   repositories owned by your organization." Source:
   https://docs.github.com/en/organizations/managing-organization-settings/managing-the-forking-policy-for-your-organization (read
   2026-11-12).
10. **The fork pull-request approval policy.** Values `first_time_contributors_new_to_github`, `first_time_contributors`,
    `all_external_contributors` (REST description, `Set fork PR contributor approval permissions for a repository`, `e4d3628fe9`); "OAuth
    app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint."; and the default, "By default, all
    first-time contributors require approval to run workflows." and "Although workflows from forks do not have access to sensitive data
    such as secrets, they can be an annoyance for maintainers if they are modified for abusive purposes." Source: `github/docs`
    `data/reusables/actions/workflow-run-approve-public-fork.md` at `main`, `b02f1f6a63`.
11. **Workflow run information and logs.** "You must be logged in to a GitHub account to view workflow run information, including for
    public repositories." Source: `github/docs` `content/actions/how-tos/monitor-workflows/use-workflow-run-logs.md` at `main`,
    `b02f1f6a63`. And, for the run list, "Anyone with read access to the repository can use this endpoint." (REST description,
    `List workflow runs for a repository`, `e4d3628fe9`).
12. **Collaborator and team reads.** "The authenticated user must have write, maintain, or admin privileges on the repository to use this
    endpoint." (`List repository collaborators`) and "For a public repository, a team is listed only if that team added the public
    repository explicitly." (`List repository teams`). Source: REST description, `e4d3628fe9`.
13. **Private-era pushes in the events (one source).** "This is also the case if you change your repository setting from private to
    public. The events endpoint still lists all PushEvents even from the time it was private". Source: Neodyme, "Hidden GitHub
    Commits and How to Reveal Them", 2024-02-16, https://neodyme.io/en/blog/github_secrets/.
14. **Defaults for the workflow token.** "Gets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in a
    repository, as well as if GitHub Actions can submit approving pull request reviews." Source: REST description, `Get default workflow
    permissions for a repository`, `e4d3628fe9`.

## 8. Gaps

- **The delay between the change and the first anonymous 200 on each route is not documented and was not observed.** Nothing could be
  made public to measure it. The gate (web page, `info/refs`, `git ls-remote`) and the brackets are the design's answer; its 5-minute
  limit is a choice, not a measured bound.
- **Whether private-era entries are listed anonymously** in the activity feed and events is documented only as "published as activity"
  and by one 2024 report. For this repository the question is narrow (no pre-rewrite id was ever pushed to it) and the plan does not
  depend on the answer.
- **Throttle thresholds** of the anonymous web, `git-upload-pack` and `raw` are undocumented. 25 plus 25 requests at 0.3 s drew none on
  one address on one day; about 180 `want` calls in one batch are untested.
- **Whether an anonymous 304 counts against the 60** is unclear (one reading showed a decrement; regions can confound it).
- **Whether `allow_forking` and the fork pull-request approval policy of a repository converted from private start at the values of
  repositories created public** is unreadable while private and unobserved; the run reads and reports them. The two public instances
  show older defaults for the workflow token (`write`), which do not predict this repository's `read`.
- **The next-page request of the web `/activity` page** was not established; it is not needed while the feed holds fewer than 30 entries,
  and the REST feed pages by cursor.
- **The `Retry-After` and status that a throttled `want` returns** were not observed; the helper stops on any status but 200.
- Quotations of GitHub pages come from the `github/docs` source at the commit named; the changelog and community-forum quotations were
  read through a page reader that limits quote length, so they should be re-read at the links.
