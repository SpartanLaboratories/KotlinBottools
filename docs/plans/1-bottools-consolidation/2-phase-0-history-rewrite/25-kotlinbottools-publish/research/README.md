# Phase 0 · 5 — Making KotlinBottools public: research

This file holds the questions this unit's plan rests on that need evidence from outside this repository, and the earlier
findings that already answer the others. Each new question is answered by its own findings file in this folder. The
verification of the claims those findings rest on, and the summary of what they establish, follow below.

**What is already established and not asked again.** The phase's earlier findings were verified at source between
2026-10-20 and 2026-11-11, against the tools on this machine today. They are cited instead of researched again:

| What the plan needs | Answered by |
|---|---|
| The routes by which GitHub serves an object by id, how long it keeps doing so, and how an old id is discovered (the activity view, the events timeline, a short prefix) | [`../../research/github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md) §3.1, §3.3, §3.4 |
| The documented consequences of a change from private to public, and what secret scanning covers | the same file, §3.5, §3.9 |
| The status-only probe helpers, the protocol-v2 `want`, the rules for reading a status, and the anonymous probes of a public repository | the same file, §3.7, §6.1, §6.3 |
| The privacy gate, its lists and its allow-list | [`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.B, §6.3, with the gate's copy in use recorded in [the rewrite and swap unit's plan, Appendix A](../../23-kotlinbottools-rewrite-and-swap/plan.md#appendix-a--the-tools-and-their-runner) |
| The id-reference check | the same file, §3.C, §6.4 |
| Repository writes made on request and read back by id, the visibility change among them | [the rehearsal unit's research on the rename sequence](../../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md) and [the rewrite and swap unit's plan](../../23-kotlinbottools-rewrite-and-swap/plan.md), its table of requests |
| The shape check of a hosted run's log | [the repository hygiene unit's plan](../../24-repository-hygiene/plan.md), S1 `helpers`, LR and P1 |

**The unit's blast radius needs no research.** It is surveyed directly in the plan: every text, document, board, ref and
workflow log that becomes public with the repository; the earlier revisions of edited issue bodies; the issue bodies this
unit edits; and the workspace tools it reuses.

**The current state the questions start from**, read on 2026-11-12:

- KotlinBottools (repository id 1453296798) is private, and its `security_and_analysis` is null. Branch protection and
  rulesets answer 403 while it is private on GitHub Free. The organisation is on the free plan, and the signed-in account
  is one of its administrators, with a classic token holding `repo`.
- It holds the numbers 1 to 35: 32 issues and 3 merged pull requests (#32, #34 and #35). Its refs are `main`, one topic
  branch and the three pull requests' head refs.
- `Secret scan` has run four times, every run successful.
- The privacy gate reports 0 blocking hits over `main`'s tree and every issue, pull-request and comment text, and over
  the earlier revisions of the two issue bodies that have been edited (5 of #1, 2 of #22). None of those texts holds a
  machine-local path.
- The activity feed (20 entries) and the events (51) hold no pre-rewrite id. The committed boards cite 10 distinct
  pre-rewrite ids, among them the 3 that three resolution comments cite; none of the 10 resolves in this repository.

---

## The questions

### 1. Making the repository public, enabling secret scanning and push protection, and making it private again: which REST calls, and how is each verified, on an organisation-owned repository of GitHub Free in November 2026?

The earlier findings ([§3.8, §6.5](../../research/github-residual-exposure-and-visibility.md#65-kotlinbottools-gates-visibility-change-scanning-settings))
give the visibility change as `PATCH /repos/{owner}/{repo}` with `visibility`, followed by a separate `PATCH` of
`security_and_analysis` with `secret_scanning` and `secret_scanning_push_protection` set to `enabled`, verified by a `GET`
and by the alerts endpoint answering 200. They were verified on 2026-10-21, with MagicBot, a public repository of the same
organisation, as a working instance. Whether that still holds, what each call returns, and what the repository shows in
its first minutes after the change are not yet established.

- **Options worth comparing.**
  - The visibility change: `PATCH /repos/{owner}/{repo}` with `{"visibility":"public"}`, or
    `gh repo edit --visibility public --accept-visibility-change-consequences`.
  - The scanning settings: one `PATCH` carrying both objects, or two in order (secret scanning, then push protection).
    Whether either needs another object enabled first on a public repository of a free organisation (a secret-protection
    or advanced-security object).
  - The reads that verify them: `GET` of `security_and_analysis`; the repository's secret-scanning alerts list (200 with
    a list when enabled, 404 when disabled); anything else that shows push protection in force.
  - The way back: `PATCH` with `{"visibility":"private"}`, and what it does to forks, stars, watchers, the activity feed
    and the scanning settings of a repository that has been public for minutes.
- **Requirements an answer must meet.**
  - The repository is owned by an organisation on GitHub Free. The account that makes the changes is an organisation
    administrator using a classic token with `repo`, and the organisation lets members change a repository's
    visibility.
  - No paid feature is requested: generic patterns, validity checks and AI detection stay off.
  - Every write is verified by a read before the next one, and no exit status alone counts as success.
  - The scanning settings follow the visibility change within the same minute, so the repository is never public
    without an attempt to enable them. A failed scanning update is re-run at once and reported.
  - Nothing is printed but statuses, counts and setting values.
  - If a pre-rewrite id answers an anonymous request after the change, the repository is made private again at once.
    The answer must say what that change leaves behind, and what it changes for a later change back to public.
  - Secret-scanning alerts are read right after the settings are enabled, again when the measurements after the change
    end, and once more before the unit's documents land. The answer must say when alerts from the scan of the existing
    history can appear, and what the alerts list shows before that scan has finished.
- **Evidence that would settle it.** GitHub's REST reference for updating a repository and for listing a repository's
  secret-scanning alerts; GitHub's documentation of secret scanning and push protection for public repositories, of
  GitHub Secret Protection, and of setting a repository's visibility; GitHub's changelog since 2026-10-21; MagicBot's
  current repository representation, read only.
- **Findings file:** [`publication-and-scanning-api.md`](publication-and-scanning-api.md).

### 2. After the change to public, which anonymous reads show the repository, how soon and under which limits, and how are status-only probes and a read-only access check built so that a delay, a cache or a rate limit is never read as an answer?

The earlier findings ([§3.4, §3.7, §6.3](../../research/github-residual-exposure-and-visibility.md#63-residual-exposure-probes-after-the-push-per-repository))
give the probe helpers (status tallies of `HEAD` requests, and a protocol-v2 `want` of one id), the rule that only 200,
404 and 422 are answers while 401, 403, 429 and 5xx are not, the budget of 60 unauthenticated REST requests per hour per
address, and the anonymous probes for a repository that is already public. What changes in the minutes after a
repository has become public, and what an anonymous reader and the settings reads show then, are not yet established.

- **Options worth comparing.**
  - The probe routes: the web routes for a commit, a tree and a blob; anonymous REST `HEAD` requests on the git-object
    endpoints; the protocol-v2 `want`.
  - The controls: a current commit and a current blob answering 200 anonymously, in the same window, before any "not
    found" counts; or a fixed wait after the change.
  - The feeds: the anonymous REST activity and events endpoints, which spend the unauthenticated budget, or the web
    activity page.
  - The access check, read only, in two halves. Anonymous reachability: the repository's page, its REST representation,
    `git ls-remote` without credentials, an issue's page and the list of Actions runs. A read-back of who can do what:
    collaborators and teams, `allow_forking`, the wiki, the default permissions of the workflow token, and the approval
    policy for workflow runs on pull requests from forks, which can be read only once the repository is public, with its
    default.
- **Requirements an answer must meet.**
  - Every pre-rewrite commit of the repository (87), the trees of its old branch tips and first-changed commits, an
    evenly spaced sample of at most 60 purged blobs, and the 10 distinct pre-rewrite ids that the committed boards cite
    are each probed anonymously, and each is expected to be "not found".
  - A probe prints a status tally only, never an id or a body.
  - A "not found" counts only after a positive control has answered 200 anonymously in the same window. Any status but
    200, 404 or 422 stops the probe set.
  - The anonymous activity feed and events are read for membership of the pre-rewrite ids.
  - The access check changes nothing; a deviation is reported.
  - The anonymous set fits the unauthenticated budget, or uses routes outside it.
- **Evidence that would settle it.** GitHub's documentation of REST rate limits, of the activity view and the events
  API, of the visibility of Actions runs and logs in a public repository, of the approval policy for workflows on
  pull requests from forks, and of the consequences of a change to public; the earlier findings named above; anonymous
  reads of an existing public repository of the organisation as a working instance, read only.
- **Findings file:** [`anonymous-reads-after-publication.md`](anonymous-reads-after-publication.md).
