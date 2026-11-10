# How a GitHub issue transfer treats numbers, closed issues and links, public source into private target

Sources read 2026-11-09. The tools of the unit are Bash and Python scripts, not Kotlin; no Kotlin idiom applies to this question.

## 1. Question

How does a GitHub issue transfer (`transferIssue`, `gh issue transfer`) treat the issue's number, a closed issue, labels and milestones, comments, and sub-issue and "blocked by" links when the source repository is public and the target is private and empty, and which routes must the rehearsal provide for? The answer has to separate, for each point, what GitHub documents, what the GraphQL or REST schema states, what public reports show, and what only a real transfer can show.

## 2. Bottom line

- **Almost nothing about the walk's three hard points is documented.** GitHub's transfer page documents only: write access to both repositories, same owner, no private-into-public, comments and assignees kept, labels and milestones kept when already present in the target (labels by name, milestones by name and due date), notification of mentioned people, and a redirect from the old URL. It says nothing on the new number, closed issues, sub-issues or "blocked by" links. The schema adds one fact: `createLabelsIfMissing`. Everything else below is public reports (one-source or few-source) and must be measured by the rehearsal.
- **Number.** A transfer creates a new issue in the target (the webhook payload carries `changes.new_issue`); public reports show it takes the next number of the target's sequence, in transfer order, from an empty private target (`#1` to `#25` in 25 transfers). Issues and pull requests share one number series. So the walk's assumption (next number, one placeholder for the pull request) fits every report, but no source documents it and no source says what a *failed* transfer does to the counter. A wrong number cannot be repaired by the walk, so the walk must check the target's last number before each step and the landed number after it.
- **Closed issues.** The transfer page speaks of "an open issue" only. The only report found says closed issues can be transferred ("all issues (open/closed) can be transferred", 2020); no source states the state the issue arrives in. Plan for three outcomes: it arrives closed with its reason; it arrives closed without its reason; it arrives open. The reopen-transfer-close route is the fallback for a refusal, and a "close again" step is the repair for an arrival as open.
- **Links.** Reports from late 2026 agree that a transferred *child* keeps its parent link, now cross-repository, and that the link settles asynchronously (read-back lags, a retried `addSubIssue` can be refused as "only one parent" or "duplicate sub-issues"). One report says the link did **not** survive "even parent-first". No report covers "blocked by" at all, nor a parent that moves while children stay. The walk must therefore be written for all of: kept, dropped, repointed, stale, and delayed; read links only after they settle; key the link table by `(repository, number)`, never by node id (a transferred issue's old node id is reported invalid).
- **Spanning repositories.** Both link kinds may span repositories of one owner: the REST schema says a sub-issue "must belong to the same repository owner as the parent issue", GitHub staff confirm cross-repository sub-issues, and "blocked by" links between `KotlinBottools` and `MagicBot` exist today (read 2026-11-09). Whether a link may span a public and a private repository, in either direction, is not documented and not found in any report; the rehearsal's fixture (a staying public issue linked both ways to moved private issues) is the real walk's pairing and measures it.
- **Public into private** is not forbidden by the documented rule (which names only private into public), and one report shows 25 issues moving from a public repository into a private one on 2026-11-08, with labels and milestones carried. That is a report, not documentation; the rehearsal measures it in the real direction.
- **Limits** (documented): 100 sub-issues per parent, eight levels of nesting, 50 links per "blocked by" and per "blocking" relationship. All are far above the real hierarchy (`#1` has 18 children; depth 3). No depth-specific transfer case was found.

## 3. Findings

Tiers: **D** documented by GitHub (docs, changelog or reference); **S** stated by the schema; **R** public report (the number of independent reports is given; a single report is one source's observation); **U** unknown until a real transfer runs.

### 3.1 The number a transferred issue receives

- **D.** GitHub's transfer page and reference describe no numbering rule. The REST reference states: "GitHub's REST API considers every pull request an issue, but not every issue is a pull request." (REST "Get an issue", `github/rest-api-description` main, API description 1.1.4, read 2026-11-09). A third-party statement of the shared series: "GitHub holds issues and pull requests in the same number series." (curl's maintainer, <https://daniel.haxx.se/blog/?p=28719>). Discussions also draw from this series per that post; the target has Discussions off, so it does not matter here.
- **S.** `TransferIssuePayload.issue` is "The issue that was transferred". The `issues` webhook's `transferred` payload carries `changes.new_issue` and `changes.new_repository` (OpenAPI `webhook-issues-transferred`). A transfer therefore produces a *new issue object* in the target, with its own number, not a re-labelled row.
- **R, three reports.**
  - 25 issues moved from public `zajca/pohunek` into a private empty repository on 2026-11-08 landed as `#1` to `#25`, in the ascending order they were transferred ([zajca/pohunek#2056](https://github.com/zajca/pohunek/issues/2056)).
  - 29 issues transferred in a batch on 2026-08-07 landed as `postguard-js#161` to `#189`, consecutive, `postguard-website#44` becoming `#162` ([encryption4all/postguard#288](https://github.com/encryption4all/postguard/issues/288)).
  - A 2021 transfer into a repository that already held `#1` landed as `#2` ([Simon Willison, TIL, 2021-12-22](https://til.simonwillison.net/github/transfer-issue-private-to-public)).
  - A plan from another project states the same rule as an expectation, not an observation: "**Numbers change** unless the new repo's issues are created in order, with placeholders for the gaps" ([en-gen/hackbench#1092](https://github.com/en-gen/hackbench/issues/1092), 2026-10-17).
- **U.** What a transfer that returns an error does to the target's counter (is a number consumed?). Whether any number is ever reused after a deletion. Whether a transfer into a repository that has no commit works at all.
- **Source side.** After a transfer the old number resolves in REST with `301` and a `location` to the new issue ("The API returns a `301 Moved Permanently` status if the issue was transferred to another repository", REST "Get an issue"), and `microsoft/vscode#250100` is a live example quoted in [openclaw/gitcrawl#422](https://github.com/openclaw/gitcrawl/issues/422) (2026-11-08). GraphQL does not follow it: "The GraphQL lookup does not follow moves. The REST lookup does" ([HiQS-Labs/XYZ-forge#926](https://github.com/HiQS-Labs/XYZ-forge/issues/926), 2026-10-02). The old issue disappears from the source's issue list, open or closed, so the source's number is not reused by anything the walk does.

### 3.2 Closed issues

- **D.** "To transfer an open issue to another repository, you must have write access..."; the page's CLI and web sections are titled "Transferring an open issue". The page never says a closed issue is refused, and never says what state the transferred issue has.
- **S.** `transferIssue(input: TransferIssueInput!)`, "Transfer an issue to a different repository": `issueId` (ID!), `repositoryId` (ID!), `createLabelsIfMissing` (Boolean). The schema has no state argument and no state-based error text.
- **R, one report, 2020.** "The test confirmed that 'all issues (open/closed) can be transferred'" ([pol-is/polis-issues#134](https://github.com/pol-is/polis-issues/issues/134), May 2020). A 2020-era shell loop says its bulk command "will bulk transfer both the active and in-active (archived, closed, whatever) issues" ([gist, devinschumacher](https://gist.github.com/devinschumacher/d5fdf0edf2719f000e6f52e807ec928f)); it does not say what state they arrived in. Other 2026 plans that transfer only open issues and leave closed ones behind (pohunek#2056) give no information either way.
- **U.** The state, `stateReason` and `closedAt` a closed issue has on arrival; whether a closed issue is refused, and with which error text.

### 3.3 Labels, milestones, comments, body, URLs

- **D.** "When you transfer an issue, comments and assignees are retained. Labels and milestones are also retained if they're present in the target repository, with labels matching by name and milestones matching by both name and due date." People "mentioned in the issue will receive a notification". "The original URL redirects to the new issue's URL." People without read access to the new repository "will see a banner letting them know that the issue has been transferred to a new repository that they can't access." REST: a transferred issue the caller cannot read in the target returns `404`.
- **S.** `createLabelsIfMissing`: "Whether to create labels if they don't exist in the target repository (matched by name)". `gh issue transfer` in 2.100.0 builds `githubv4.TransferIssueInput{IssueID, RepositoryID}` only, so it never sets it ([`pkg/cmd/issue/transfer/transfer.go`, `issueTransfer`, tag v2.100.0](https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/issue/transfer/transfer.go)); it prints only the new URL, and it refuses a pull request number ("is a pull request and cannot be transferred").
- **R.**
  - Labels and milestones pre-created in the target were "carried by the transfer; verified by listing the issues there" (pohunek#2056, 2026-11-08, public into private).
  - A label missing in the target was not created by `gh issue transfer` ("a label missing from the destination was not created", a commenter on the gist above), which is what the source above implies.
  - Body text is not rewritten: the 2020 thread says "shorthand plaintext remains" and the 2026 run rewrote its `#N` references by hand after the transfer. A bare `#N` in the moved body then points at the target's `#N`.

    > **Dated note, 2026-11-09.** This did not hold in the build: a transfer rewrites the moved issue's references to the full name of the repository holding the cited issue, the source's or the target's ([README, Did not hold in the build](README.md#did-not-hold-in-the-build)).
  - Old global node ids stop resolving: "`transferIssue` invalidates the issue's old global node ID" (postguard#288).
- **U.** Comment authors, order and timestamps as read back (the documentation says only "retained"); the reaction, pin, lock, project-item and issue-type state; the exact due-date matching rule for a milestone with no due date (the walk's `1.0.0` has none: matched by name and a null date, expected but not documented); the new node id and URL.

### 3.4 Sub-issue and "blocked by" links when an end moves

| Case | D | S | R | U |
|---|---|---|---|---|
| Child moves, parent stays | silent | `Issue.parent`, `addSubIssue(replaceParent)` | Kept as a cross-repository link: three reports, 2026-08 to 2026-11, with a delay | settle time; whether it is ever dropped |
| Parent moves, children stay | silent | `Issue.subIssues` | One report says the link "does not survive ... even parent-first" (2026-09-05); no other report | kept, dropped or repointed |
| Node with parent and children | silent | | none | all of the above, both directions |
| Both ends move (one then the other) | silent | | none | whether a link between two moved issues is kept |
| "Blocked by" partner stays | silent | `Issue.blockedBy`, `blocking` | none | kept, dropped, refused |
| "Blocked by" partner moves | silent | | none | same |

Evidence for the child-moves row:

- [vergil-project/vergil-tooling#3556](https://github.com/vergil-project/vergil-tooling/issues/3556) (2026-10-24): "In this case GitHub **did** keep the existing parent link across the transfer, and `addSubIssue` refuses a second parent."
- [vergil-project/vergil-tooling#3839](https://github.com/vergil-project/vergil-tooling/issues/3839) (2026-10-29): of about 45 transfers, about 15 did not end under the intended parent: a persistent "Issue may not contain duplicate sub-issues" refusal (three variants in all, including a silent one, where a link call succeeded and the old parent remained); "Items in the same run ... succeeded and failed side by side, so it looks like eventual consistency after `transferIssue`".
- [dzackgarza/itree#56](https://github.com/dzackgarza/itree/issues/56) (2026-11-04): "GitHub re-applies the pre-transfer parent asynchronously, so a successful `attach` immediately after a transfer is not a durable state." Their loop, "until the child's parent reads as the target twice, 6 seconds apart", settled "usually within two iterations".
- [encryption4all/postguard#288](https://github.com/encryption4all/postguard/issues/288) (2026-08-07): the parent link "repointed itself to `postguard-js#162` with no `removeSubIssue`/`addSubIssue` call needed".

Evidence for the parent-moves row: [loopsmithai/loopsmith#3](https://github.com/loopsmithai/loopsmith/issues/3) (2026-09-05): "The parent/sub-issue link **does not** survive `transferIssue`, even parent-first. The probe suggested otherwise — a false positive from linking the pair moments before transferring." The text gives no direction, settle time or repository layout, so it cannot be set against the other four reports; one possible reading is that it was read before the link had settled. A 2022 report of a lost parent on transfer ([community discussion 9703](https://github.com/orgs/community/discussions/9703)) is about the retired task-list feature and does not apply.

> **Dated note, 2026-11-09.** This did not hold in the build: the fixture's parent moved first and kept its sub-issue links ([README, Did not hold in the build](README.md#did-not-hold-in-the-build)).

Refusal texts seen when writing links (other tools' logs, [StephanMeijer/meneerhenk#632](https://github.com/StephanMeijer/meneerhenk/issues/632), 2026-10-16): "Issue may not contain duplicate sub-issues" (the link already exists) and, for blockers, "Validation failed: Target issue has already been taken" (the blocker already exists). From the transfer reports: "Sub issue may only have one parent" (the child still lists another parent).

**No report of a transfer being refused because of links was found.** The brief's third option (remove the links first) therefore rests on no observed refusal.

### 3.5 Spanning repositories, and public against private

- **D.**
  - Sub-issue: "To add issues from other repositories, click ... next to the repository name" (docs, "Adding sub-issues"); REST `sub_issue_id`: "The sub-issue must belong to the same repository owner as the parent issue".
  - Blocked by: the page states no restriction; REST `issue_id`: "The id of the issue that blocks the current issue".
  - Staff, 2024-10-02: "Yes, as you mentioned, sub-issues can be cross-repo." Staff, 2025-01-22: setting sub-issues across organisations is "something we're currently evaluating" ([discussion 139932](https://github.com/orgs/community/discussions/139932), [discussion 148714](https://github.com/orgs/community/discussions/148714)).
- **Observed here (read 2026-11-09, GraphQL):** `MagicBot#2` to `#8` are blocked by `KotlinBottools#2`, `#6` to `#10`, `#16` (public repositories of one organisation), and `MagicBot#2` blocks `#3` to `#5`. So "blocked by" spans two repositories of one organisation today.
- **Not documented, no report found:** any statement on links between a public and a private repository, in either direction, who can see such a link, or whether the mutation is refused. The one visibility fact is for ordinary text references: a person without permission cannot see a cross-repository reference to a private repository (docs, "Creating an issues-only repository").
- **Public into private for a transfer.** The documented refusal is "A private repository issue cannot be transferred to a public repository." (also [TIL, 2021](https://til.simonwillison.net/github/transfer-issue-private-to-public), whose workaround turns a temporary private repository public first). The direction of the walk is not named. One 2026-11-08 report moved 25 issues from public `zajca/pohunek` into a private empty repository without error (pohunek#2056). Mentions are notified, and a reader without access to the target sees a banner and, over REST, a `404`.

### 3.6 Limits

- **D.** "You can add up to 100 sub-issues per parent issue and create up to eight levels of nested sub-issues." (docs, "Adding sub-issues"). "You can now have up to 100 sub-issues per parent issue (up from 50)" (changelog 2024-12-12). "Parents are unique (an issue can only have one parent)" and "Sub-issue depth limit: 8" (community discussion 148714, 2025-01-08). "You can link up to 50 issues for each relationship type" for dependencies (changelog 2025-08-21; the page read gave this as its limit, which I take to cover "blocked by" and "blocking" each).
- **R.** A user reports hitting the 100 limit; GitHub staff say there are no plans to raise it (discussion 154148, 2025-06-19). One commenter says a cross-repository parent counts toward the depth ("sub-issues in one repository are susceptible to this limit if the parent issue is already linked deep in another repository"), unanswered.
- **U.** Whether the depth counts across repositories; the refusal text at depth nine. Irrelevant to the real hierarchy (depth 3, 18 children of `#1`, at most 5 blockers on an issue), so the rehearsal needs no test at the limit; the checks only must not assume a depth.
- **No transfer-specific limit or special case on depth or on the number of sub-issues was found.**

### 3.7 Rate

- **D.** Transfers are content writes. A secondary limit returns `403` or `429`; with no `retry-after`, "wait for at least one minute before retrying" (REST rate limits, docs main). **R:** a shell loop over `gh issue transfer` hit limits with 0, 1 and 2 second pauses and was left at 3 seconds (gist above, one source).

## 4. How comparable projects do it

- **`dzackgarza/itree`** (2026-11): after `gh issue transfer`, re-reads the child's `parent`, removes a stale link with `removeSubIssue`, calls `addSubIssue`, sleeps, re-reads, and accepts only after two equal reads.
- **`vergil-project/vergil-tooling`** `vrg-intake-route` (2026-10, [PR 4043](https://github.com/vergil-project/vergil-tooling/pull/4043)): after a transfer it reads the final parent back, fails loudly if it differs, and treats the "duplicate sub-issue" refusal as a stale-link state to repair by removing the stale link.
- **`encryption4all/postguard`** (2026-08): transfers by GraphQL `transferIssue` (REST has no transfer endpoint), in a batch, with the label already present in the target, and reads the sub-issue edge back afterwards.
- **`zajca/pohunek`** (2026-11-08): creates the labels and milestones in the private target first, transfers in ascending order, records `old -> new` for every issue, then rewrites `#N` in bodies and in its own comments.
- **A plan in `kade-agent/agent-config#130`** (2026-10): clone labels first (`gh label clone`), transfer tasks, then epics, then the queue, log old to new numbers, re-attach any dropped sub-issue link.
- **The `gh` CLI** (`transferRun`, v2.100.0): resolves the issue by number, refuses a pull request, resolves the destination repository id, runs the mutation, prints the URL only. It does not set `createLabelsIfMissing`.

## 5. Pitfalls and regrets

- **Believing the first read after a transfer.** Three tools reported success and left the issue under the old parent; others failed on a retry. Settle, then decide.
- **Keying anything by node id across a transfer.** The old id stops resolving; GraphQL lookup of the old number also fails ("Could not resolve to an issue or pull request"). Use `(repository, number)` for the link table and re-read node ids after each step.
- **Treating "duplicate" or "already taken" as a failure.** They mean the link is present; re-read instead of retrying.
- **Using `gh issue transfer` where the number must be checked.** It prints a URL only; parse the number from it, or call the mutation directly and select `issue { id number url state }`.
- **Assuming a closed issue stays closed.** Unmeasured; a reopen-and-close repair changes the history of the issue (two more events and a new `closedAt`).
- **A number that does not match cannot be repaired.** The walk cannot renumber; it can only stop.
- **Both-end links that cross visibility.** Unmeasured, but they are the real shape after the walk (public `MagicBot` and `WebTools` issues blocked by private `KotlinBottools` issues).

## 6. Recommendation for this repo

- **Call.** Transfer with the GraphQL `transferIssue` mutation, through `gh api graphql`, with `createLabelsIfMissing` left unset (labels and milestone are created in the target first, so a missing label shows as a failed comparison rather than a silently created one) and the payload selecting `issue { id number url state stateReason closedAt }`. `gh issue transfer` is equivalent for the move but returns less to check. Both need the source issue's node id, read immediately before the call.
- **Order.** Ascending source number, one at a time. Before each transfer, the target's highest number must be `n - 1`; a pull request's number is filled by the closed placeholder at that point; after each step the landed number must be `n`, otherwise stop (the reconciliation of links and the rename swap still run). Links never change the order.
- **Route A, direct.** Transfer every issue, open or closed, with its links in place. After each step read the moved issue's links and every link of its former partners repeatedly until two reads, a few seconds apart, are equal (itree's rule), and record which of "kept", "dropped", "repointed", "stale" and "delayed" each link showed. Re-create a missing link; for a child that still lists another parent, read it and use `removeSubIssue` on the stale parent or `replaceParent: true`, then read again.
- **Route B, closed issue.** Only if route A is refused (error text recorded) or the issue arrives open: reopen, transfer, close again with the source's `stateReason`. Record that `closedAt` and the issue's event list differ from the source, and compare them as expected differences.
- **Route C, links.** Only if a transfer is refused with a link-related error: record the issue's links in the link table, remove them, transfer, re-create them. The fixture contains the shapes that would trigger it (a parent with children, a node with a parent and children, a "blocked by" partner that stays), but no report suggests a refusal, so the route is a rehearsal-measured fallback, not an expected path.
- **Link re-creation.** Check before every write; read node ids fresh; `addSubIssue` takes the parent's `issueId` and the child's `subIssueId`; `addBlockedBy` is written from the blocked side with `issueId` and `blockingIssueId`. Treat "duplicate sub-issues" and "has already been taken" as present. Treat "may only have one parent" as stale. Keep a pause between writes (3 seconds is the one reported safe pace), and wait at least a minute after a `403` or `429` without `retry-after`.
- **Compare before and after, per issue.** Number (must equal); title; body hash (no `#N` rewriting expected); state, `stateReason`, `closedAt`; labels by name; milestone title and due date; assignees; comments in order (author login, `createdAt`, body hash, count); `issueType`, reactions, lock and pin state, project items; the old URL's REST status and `location`; the old and new node id; the full link set by `(repository, number)` in both directions. Exclude `updatedAt`.

  > **Dated note, 2026-11-09.** The body hash needs the rewriting described in the note under §3.3 taken into account ([README, Did not hold in the build](README.md#did-not-hold-in-the-build)).
- **What the real walk inherits.** Whatever the rehearsal shows for the six shapes of 3.4, including cross-visibility links, decides whether re-creating the 75 links of the plan is needed as a step or as a check.

## 7. Load-bearing claims

1. **Transfer rules.** "When you transfer an issue, comments and assignees are retained. Labels and milestones are also retained if they're present in the target repository, with labels matching by name and milestones matching by both name and due date." and "The original URL redirects to the new issue's URL." Source: GitHub Docs, "Transferring an issue to another repository", <https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository> (source file `content/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository.md`, `github/docs` main, read 2026-11-09).
2. **Private into public refused; the page names no other direction or state.** "To transfer an open issue to another repository, you must have write access to the repository the issue is in and the repository you're transferring the issue to." and "A private repository issue cannot be transferred to a public repository." Same source and date.
3. **Sub-issue limits.** "You can add up to 100 sub-issues per parent issue and create up to eight levels of nested sub-issues." Source: GitHub Docs, "Adding sub-issues", <https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues>, read 2026-11-09.
4. **Dependencies limit.** "You can link up to 50 issues for each relationship type." Source: GitHub changelog, "Dependencies on issues", <https://github.blog/changelog/2025-08-21-dependencies-on-issues/>, 2025-08-21 (wording as returned by a page fetch; the page confirms "up to 50 links per relationship type").
5. **Sub-issue owner rule.** "The id of the sub-issue to add. The sub-issue must belong to the same repository owner as the parent issue". Source: REST "Add sub-issue", OpenAPI `POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues`, `github/rest-api-description` main, API description 1.1.4, read 2026-11-09.
6. **Mutation inputs.** `TransferIssueInput.createLabelsIfMissing`: "Whether to create labels if they don't exist in the target repository (matched by name)"; `AddSubIssueInput.replaceParent`: "Option to replace parent issue if one already exists"; `AddBlockedByInput`: issueId "The ID of the issue to be blocked." blockingIssueId "The ID of the issue that blocks the given issue."; `TransferIssuePayload.issue`: "The issue that was transferred". Source: `__type` introspection through `gh api graphql`, github.com GraphQL schema, 2026-11-09.
7. **A transfer creates a new issue; the old number redirects.** Webhook `issues` `transferred` payload has `changes.new_issue` and `changes.new_repository`; and "The API returns a `301 Moved Permanently` status if the issue was transferred to another repository." Source: OpenAPI `webhook-issues-transferred` and "Get an issue" description, `github/rest-api-description` main, read 2026-11-09.
8. **`gh issue transfer` shape.** The code builds `githubv4.TransferIssueInput{IssueID: issueID, RepositoryID: destinationRepoID}` and returns `mutation.TransferIssue.Issue.URL`; for a pull request it returns `"issue %s#%d is a pull request and cannot be transferred"`. Source: <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/issue/transfer/transfer.go>, tag v2.100.0 (2026-09-03, the version in use).
9. **Next numbers in order from an empty private target, public source.** "(25 issues transferred; labels `relay`, `enhancement`, `architecture`, `security`, `post-relay-v1` and the milestones `0.41` and `E. Pohunek develops itself through accountable agents` were created in the new repository and carried by the transfer; verified by listing the issues there)" and the table `zajca/pohunek#56 | pohunekd/pohunek-relay#1` through `zajca/pohunek#1836 | pohunekd/pohunek-relay#25`. Source: <https://github.com/zajca/pohunek/issues/2056>, comment of 2026-11-08; `zajca/pohunek` is public (read 2026-11-09), the target was "(private, before the transfer to `pohunekd`)" in the same comment.
10. **Consecutive numbers and node-id invalidation.** "Transferred all 29 to `postguard-js` via GraphQL `transferIssue` (REST has no transfer endpoint) — they landed at `postguard-js#161`–`#189`" and "`transferIssue` invalidates the issue's old global node ID but **preserves its sub-issue parent link automatically**". Source: <https://github.com/encryption4all/postguard/issues/288>, comment 2026-08-07.
11. **Closed issues can be transferred (2020, state not stated).** "The test confirmed that all issues (open/closed) can be transferred." (as summarised from the thread by a page fetch; the thread's own wording: "all issues (open/closed) can be transferred"). Source: <https://github.com/pol-is/polis-issues/issues/134>, May 2020.
12. **Child keeps its parent across a transfer, asynchronously.** "In this case GitHub **did** keep the existing parent link across the transfer, and `addSubIssue` refuses a second parent." (<https://github.com/vergil-project/vergil-tooling/issues/3556>, 2026-10-24) and "GitHub re-applies the pre-transfer parent asynchronously, so a successful `attach` immediately after a transfer is not a durable state." (<https://github.com/dzackgarza/itree/issues/56>, 2026-11-04).
13. **Contrary report.** "The parent/sub-issue link **does not** survive `transferIssue`, even parent-first. The probe suggested otherwise — a false positive from linking the pair moments before transferring." Source: <https://github.com/loopsmithai/loopsmith/issues/3>, 2026-09-05.
14. **Old number lookups.** "The GraphQL lookup does not follow moves. The REST lookup does". Source: <https://github.com/HiQS-Labs/XYZ-forge/issues/926>, 2026-10-02.
15. **Cross-repository sub-issues within one owner.** "Yes, as you mentioned, sub-issues can be cross-repo." (GitHub staff, 2024-10-02) and, 2025-01-22 on cross-organisation links, "The ability to set sub-issues across organizations is something we're currently evaluating." Sources: <https://github.com/orgs/community/discussions/139932> and <https://github.com/orgs/community/discussions/148714>.
16. **Secondary limit retry.** "Otherwise, wait for at least one minute before retrying." Source: GitHub Docs, "Rate limits for the REST API", `github/docs` main, read 2026-11-09.
17. **Refusal texts.** "Issue may not contain duplicate sub-issues" and "Validation failed: Target issue has already been taken". Source: <https://github.com/StephanMeijer/meneerhenk/issues/632>, 2026-10-16; "Sub issue may only have one parent" in claim 12's reports.

## 8. Gaps

- **Closed issue on arrival**: refusal or not, state, `stateReason`, `closedAt` are unmeasured; the only source is a 2020 one-line report.
- **"Blocked by" under transfer**: no source at all, either way, for the end that moves, the partner that stays, or two ends that both move.
- **Parent that moves while its children stay**: one contrary report (claim 13) against none; the walk starts with exactly this case (`#1` moves first).
- **Public to private link legality and visibility, both directions**: nothing documented, no report; whether an `addSubIssue` or `addBlockedBy` call across the boundary is refused, and what a reader without access to the private side sees on the public side.
- **Numbering after an error**: whether a failed transfer burns a number, and whether a transfer into a commit-less repository works.
- **Settle time of link changes**: the reports give 6-second retries and "usually within two iterations"; no bound.
- **Whether depth is counted across repositories** and the refusal text at the limit.
- **Comments, authors and timestamps as read back; reactions, pins, locks, project items, issue types; the milestone match with no due date**: documented only as "retained" or silent.
- **The three single-project reports** (pohunek, postguard, loopsmith) are agent-written logs of private or since-changed repositories that I could not re-read independently beyond their text; treat each as one source's observation.
- **GitHub's transfer page** may change; the page read here is the `main` source of the documentation repository on 2026-11-09, not a dated release.
