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

Added once the findings exist.

---

## Summary

Added once the findings have been verified.
