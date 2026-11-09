# Phase 0 · 2 — Transfer rehearsal: research

The questions this unit's plan rests on that need evidence from outside this repository. Each is
answered by its own findings file in this folder. The verification of the claims those findings
rest on, and the summary of what they establish, follow below once the findings exist.

**What is already established and not asked again.** The parent design's research covers what a
transfer is documented to keep (comments, assignees, matching labels and milestones, the old URL's
redirect), the documented refusal of a private repository's issue moving to a public one, and the
existence of the GraphQL mutations `transferIssue`, `addSubIssue` and `addBlockedBy`
([`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.D and its
load-bearing claims 6 and 7). What a rename does to the old name is covered there and in the
parent design's §2.4. The questions below take those as given and cover what they leave open.

**The unit's blast radius needs no research.** It changes only documents and generated boards in
this repository, and adds tools in the workspace outside every repository. It is surveyed directly
in the plan.

---

## The questions

### 1. How does a transfer treat numbers, closed issues and links, from a public source into a private target?

The walk moves issues one at a time, in numeric order, out of a public source repository into a
private target repository of the same organisation.

- **Options worth comparing.**
  - A direct transfer for every issue, open or closed, with links left in place.
  - For a closed issue that cannot be transferred closed: reopen, transfer, close again.
  - For an issue whose links block its transfer, or whose links a transfer drops: remove and record
    the links, transfer, re-create them.
- **Requirements an answer must meet.**
  - Every issue must land on its source number in the target; a transfer that assigns any other
    number is a failed step.
  - The answer must say, for each of the following, what the documentation states, what the API
    schema states, what public reports show, and what remains unknown until a transfer runs: the
    number a transferred issue receives; whether a closed issue can be transferred and in which
    state it arrives; what happens to sub-issue and "blocked by" links when the issue at either end
    moves, including a parent whose children have not moved yet, and a child whose parent has
    already moved; whether a link may span a public and a private repository; whether the source
    being public and the target private changes any of this.
  - Sub-issues in this work nest to more than one level, with branches of different depths, so
    any limit or special case on depth or on the number of sub-issues must be stated.
- **Evidence that would settle it.** GitHub's documentation of issue transfers, sub-issues and
  issue dependencies; its REST and GraphQL references (`transferIssue`, `addSubIssue`,
  `addBlockedBy`, the error messages they document); its changelog entries for sub-issues and issue
  dependencies; public reports from people who have transferred issues with these links.
- **Findings file:** [`issue-transfer-behaviour.md`](issue-transfer-behaviour.md).

### 2. What are the order and the observable results of the rename swap with the source made private?

The swap renames the source repository, makes it private, archives it, and renames the target onto
the source's old name. Every step must be proven by reading it back, by repository id.

- **Options worth comparing.**
  - Rename, then private, then archive, then rename the target (the order the design needs).
  - Any other order the evidence shows to be required or safer, in particular whether an archived
    repository's visibility can still be changed, and whether archiving or a visibility change
    affects a rename.
- **Requirements an answer must meet.**
  - State what is documented, and what can only be observed, about: renaming a repository, its old
    name's redirect, and that redirect ending when another repository takes the name; changing a
    repository's visibility from public to private, its consequences, and how the change is
    confirmed; archiving, what it makes read-only, and whether it can be undone by the settings
    this unit may use.
  - State how a script confirms each step on repositories that are private or archived: reading a
    repository's id and full name by name and by id through the REST API, and following a
    transferred issue's old URL (the REST redirect for a transferred issue, and how `gh api` and a
    plain authenticated `curl` each show it).
  - The rehearsal ends with both repositories private and archived.
- **Evidence that would settle it.** GitHub's documentation on renaming, changing visibility and
  archiving; its REST references for repositories and issues (the documented 301 for a transferred
  issue); read-only observation with `gh api` of redirects on public repositories that were renamed
  or transferred.
- **Findings file:** [`rename-visibility-archive-sequence.md`](rename-visibility-archive-sequence.md).

### 3. What are the exact API forms for building the fixture and reading every item at any depth?

The fixture is made of ordinary GitHub objects, and every read must work whatever the depth of the
sub-issue hierarchy.

- **Options worth comparing.** REST against GraphQL for each write and read; `gh` subcommands
  against `gh api`; a flat per-issue read of relationships against a recursive walk of the
  hierarchy.
- **Requirements an answer must meet.**
  - The literal request form, with fields and their types, for each of: creating a repository in an
    organisation with an initial commit and without one, public and private; creating a label; a
    milestone with no due date; an issue with labels and a milestone; a comment; closing an issue
    with a state reason; reopening one; creating a branch and a commit through the API; opening a
    pull request and merging it; creating a placeholder issue and closing it.
  - The read form that returns, for one issue, its number, title, body, state, state reason,
    labels, milestone, comments (body, author, order) and its parent, sub-issues, "blocked by" and
    "blocking" links with each other side's repository and number, paged, across repositories, on
    private and archived repositories.
  - The limits that apply: the depth and breadth limits of sub-issues; connection page sizes; the
    secondary rate limits on content creation and how a client should pace about a hundred writes.
- **Evidence that would settle it.** GitHub's REST and GraphQL references, the schema by
  introspection, its documentation of rate limits, and `gh`'s documentation and source at the
  version in use (2.100.0).
- **Findings file:** [`fixture-and-read-api-forms.md`](fixture-and-read-api-forms.md).

---

## Verification results

All 55 load-bearing claims of the three findings files were re-opened at their sources on
2026-11-09 and hold: 17 in [`issue-transfer-behaviour.md`](issue-transfer-behaviour.md), 13 in
[`rename-visibility-archive-sequence.md`](rename-visibility-archive-sequence.md) and 25 in
[`fixture-and-read-api-forms.md`](fixture-and-read-api-forms.md). Each documentation claim was read
at its pinned commit and on `main`; each `gh` claim at tag `v2.100.0`; each schema claim by
introspection; each community report at its thread; each of the repository observations was
repeated. None failed.

Caveats that travel with claims that hold, stated wherever the claim is used below:

- The "GitHub staff" label on the 2024 statement that sub-issues can be cross-repository could not
  be confirmed for that one author; the text is exact, and a second, confirmed staff statement and
  the REST schema say the same.
- The GitHub staff statement that new repositories take priority over redirects is relayed by
  community users, in the same thread as a 2024 Support reply that says the same.
- The transfer-throttling advice and the report of throttling after about twenty transfers are one
  maintainer's statement and one user's report.

Claims about this repository and this organisation were checked directly: the organisation allows
members to change repository visibility, the signed-in account is an organisation owner with
administrator permission on KotlinBottools, and `MagicBot#2` reads cross-repository "blocked by"
links to KotlinBottools issues today.

### Did not hold in the build

**"Body text is not rewritten"** ([`issue-transfer-behaviour.md`](issue-transfer-behaviour.md) §3.3,
and §6's "no `#N` rewriting expected"). The statement was not among the 55 claims above: it rested
on a 2020 thread and a 2026 project log, read accurately. The fixture's first transfer, on
2026-11-09, shows the opposite, and the plan's item check is corrected for it
([`../plan.md`](../plan.md), Design, "What a transfer does to references"):

- **In the moved issue,** each bare `#N` in the body and in the comments became the source
  repository's full name: `#4` became `SpartanLaboratories/phase0-rehearsal-a#4`. The body grew from
  134 to 248 bytes; five references changed, three in the body and two in the comments. Titles,
  labels, milestone and comment count are unchanged.
- **In the source issues that cite the moved issue,** the reference to it became the target's full
  name (`SpartanLaboratories/phase0-rehearsal-b#1`) and every other bare reference in the same text
  became the source's full name: #6's body grew from 9,072 to 13,366 bytes (13 references naming the
  target, 100 naming the source, none left bare) and #10's has one of each. The issues that do not
  cite the moved issue are byte-identical, and no source comment cited it, so comments in the source
  were not seen.
- **The same rule is reported from 2021:** "#B => bz-archive#B and #A => llvm-project#A", and, once
  the citing issue itself moves into the target, "llvm-project#A => #A"
  ([LLVM mailing list, 2021-12-03](https://lists.llvm.org/pipermail/cfe-dev/2021-December/069518.html)).
  The later steps of the rehearsal measure that second half here.

---

## Summary

### 1. What a transfer does to numbers, closed issues and links

- **Documented** ([findings](issue-transfer-behaviour.md) §3): write access to both repositories
  and the same owner are required; a private repository's issue cannot move to a public one;
  comments and assignees stay; labels and milestones stay if the target has them (labels by name,
  milestones by name and due date); the old URL redirects. Nothing is documented about the number a
  transferred issue receives, about closed issues, or about sub-issue or "blocked by" links, in
  either direction.
- **Numbers.** A transfer creates a new issue in the target, which takes the next number of the
  target's sequence: three public reports show it, including 25 transfers from a public repository
  into an empty private one landing on `#1` to `#25` on 2026-11-08. It is not documented. A wrong
  number cannot be repaired, so the walk checks the target's highest number before each step and the
  landed number after it.
- **Closed issues.** The transfer page speaks only of open issues, the one report found says closed
  issues transfer, and nothing states the state on arrival. The rehearsal measures three outcomes
  (closed with its reason, closed without it, open) and keeps the design's reopen, transfer and
  close route as the fallback for a refusal, with a close on the target for an arrival as open.
- **Links.** Reports from 2026 agree that a moved child keeps its parent as a cross-repository link,
  and that the link settles asynchronously, so a first read after a transfer is not to be believed.
  One report disagrees ("does not survive ... even parent-first"), and it gives no direction or
  settle time; the reports do not cover a parent that moves while its children stay, nor "blocked
  by" at all. The walk therefore records what each link did at each step, after two equal reads a
  few seconds apart, and the reconciliation re-creates whatever is missing and removes whatever is
  stale. No report describes a transfer refused because of its links, so the remove-links route is
  a fallback for a refusal that nothing suggests.
- **Spanning repositories.** Both link kinds may span repositories of one owner (REST schema,
  GitHub staff, and the cross-repository links KotlinBottools and MagicBot hold today). Whether a
  link may span a public and a private repository is not documented anywhere; the fixture's
  stay-behind public issue, linked both ways to moved private issues, measures it.
- **Public into private** is not refused by the documented rule, and one report shows it working
  on 2026-11-08. The rehearsal proves it in the real direction.
- **Limits** that bind nothing here: 100 sub-issues per parent, eight nesting levels, 50 links per
  dependency type. The walk's reads assume no depth.
- **References in the text** are rewritten by a transfer, which no source documents; the build
  measured it (see Did not hold in the build, above).

### 2. The rename swap with the source made private

- **Order** ([findings](rename-visibility-archive-sequence.md) §6): rename the source to its legacy
  name, make it private, archive it, rename the target onto the old name, archive the target.
  Archiving must come after every other change to a repository: GitHub says changes need an
  unarchive first, and a visibility change on an archived repository was refused with a 403 in
  2021 and again in 2026. Nothing forces an order between the source's rename and its privacy
  change; rename first keeps every failure state reversible and matches the design.
- **Writes** are one REST call shape, addressed to the repository's name at that moment:
  `PATCH repos/{owner}/{repo}` with `name`, `visibility` or `archived` (typed, `-F archived=true`).
- **Proof is by id, never by name.** `gh api` follows a renamed repository's `301` silently, and
  once another repository takes a name it answers directly, so a name-based read cannot tell the
  difference. Every read-back compares the repository id. An unauthenticated `404` by name, by id
  and on the web proves a repository is no longer public.
- **A transferred issue's old URL** answers `301` on REST to the issue's new home, a `302` on the
  web; `gh api` follows it silently and `gh api --verbose` shows the hop, with the token redacted,
  so that is the form used. The proof compares the answer's number and repository, not the status
  alone.
- **What only the rehearsal can show:** whether a rename onto a name freed moments earlier succeeds
  (documented only for creating a repository under the old name, which is one step short of what
  the design's §2.4 and §7.5 say; this is the swap's central unknown, and a refusal has no remedy
  but a request to GitHub Support); what a transferred issue's redirect shows once the target is
  renamed; whether a visibility change alters that redirect or the links; and how long a read-back
  takes to reflect a write.
- **Git** `ls-remote` of a renamed repository's old name is answered directly rather than
  redirected, so it proves content but not identity, and on an empty target proves nothing; the
  rehearsal does not use it.

### 3. The API forms

- **Writes** ([findings](fixture-and-read-api-forms.md) §6): REST through `gh api` for repositories,
  labels, milestones, issues, comments, closing and reopening, the branch, the commit, the pull
  request and its merge; GraphQL `transferIssue`, `addSubIssue` and `addBlockedBy` for the transfer
  and the links. REST takes label names and a milestone number and returns the new `number`, `id`
  and `node_id` in one response.
- **Reads** are one GraphQL query per page of a repository's issues, flat: each issue states its own
  `parent`, `subIssues`, `blockedBy` and `blocking` with the other side's repository and number.
  The hierarchy is the set of such edges, compared as sets, so no depth is assumed anywhere, and a
  nested page that would be truncated is a failure. It costs one point per page. The number census
  uses REST, because GraphQL `issues` omits pull requests.
- **Pacing:** one request at a time; a read-back after each write; at least 3 s after a write and
  10 s after a transfer; on a secondary rate limit, read back first, then wait as GitHub directs
  (else 60 s, then doubling) and stop after four attempts.
- **Windows and Python:** no leading slash on `gh api` paths; `-f` for strings and `-F` only for
  booleans, integers and `@file`; UTF-8 set explicitly on files, `subprocess` and the interpreter.
- **What does not fit:** `gh issue transfer` (three requests, a name-addressed target and a URL as
  its only output); `gh issue edit --add-sub-issue` and `--parent` (they silently re-parent a child,
  through `replaceParent: true`); `gh issue view --json` (it truncates "blocked by" and "blocking"
  at 50); a recursive read of the hierarchy (it assumes a traversal bound and costs many more
  calls).

### What the design takes from this

The walk is built for every outcome of a transfer, not for a forecast of it: the checks before and
after each step are fixed, the record of what each link did is the result, the routes for a closed
issue and for a link-related refusal are fallbacks, and reconciliation is a step of the design, so
that whatever GitHub does at a transfer, the final link set is what is compared. The rename stage
follows the order above, with every step read back by repository id.
