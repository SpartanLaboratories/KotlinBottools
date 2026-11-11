# Phase 0 · 3 — KotlinBottools rewrite and swap: research

The question this unit's plan rests on that needs evidence from outside this repository, and the
earlier findings that already answer the others. The new question is answered by its own findings
file in this folder. The verification of the claims those findings rest on and the summary of what
they establish follow below.

**What is already established and not asked again.** The tools are the same versions as when the
earlier findings were verified (git 2.55.0.windows.5, Python 3.14.7, gh 2.100.0, git-filter-repo
2.47.0, gitleaks 8.30.1), and the GitHub behaviour below was measured on 2026-11-09, so each of
these findings is current and is cited instead of researched again:

| What the plan needs | Answered by |
|---|---|
| The rewrite: the invocation, the list's byte rules, the `regex:` semantics of `--replace-text` and `--replace-message` (binary blobs untouched), the outputs and the post-run checks | [`../../research/git-filter-repo-on-windows.md`](../../research/git-filter-repo-on-windows.md) §3.4–§3.6, §6.1–§6.7 |
| The mirror push from a filter-repo mirror: its flags, its porcelain lines, the hidden pull-request refs, the dry run and the per-ref verification | [`../../research/github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md) §3.6, §6.2 |
| The proof that no pre-rewrite id resolves in the fresh repository, and the residual probes | the same file, §3.1–§3.4, §6.3, §6.5 |
| The gitleaks scans of the backup and of the fresh mirror, through the wrapper | [`../../research/gitleaks-local-and-ci.md`](../../research/gitleaks-local-and-ci.md) §3.2–§3.5, §6.4, §6.7, §6.8 |
| The realignment of this checkout in place under an open IDE, its push-safety proof and its deferred step | [`../../research/clone-realignment-and-data-extraction.md`](../../research/clone-realignment-and-data-extraction.md) §3.1–§3.6, §3.10, §6.3, §6.8 |
| The privacy gate and the id-reference check | [`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.B, §6.3, §6.4 |
| What a transfer does to numbers, closed issues, links and the references in the moved text, and the content-creation limits | [`../../22-transfer-rehearsal/research/issue-transfer-behaviour.md`](../../22-transfer-rehearsal/research/issue-transfer-behaviour.md) §3, §6, as corrected by [`../../22-transfer-rehearsal/research/README.md`](../../22-transfer-rehearsal/research/README.md#did-not-hold-in-the-build) and measured in [the rehearsal's as-built record, §3](../../22-transfer-rehearsal/final-implementation.md#3-measurements) |
| The rename, privacy and archive order, and identity read by repository id | [`../../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md`](../../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md) §3, §6 |
| The REST and GraphQL forms for issues, comments, placeholders, transfers, links, the census and the flat read | [`../../22-transfer-rehearsal/research/fixture-and-read-api-forms.md`](../../22-transfer-rehearsal/research/fixture-and-read-api-forms.md) §3, §6 |

**The unit's blast radius needs no research.** It is surveyed directly in the plan: the tracked
files the rewrite removes from this checkout or changes, the issues, links and texts the walk moves,
and the relationships it writes in MagicBot and WebTools.

---

## The questions

### 1. How is the fresh repository created private and empty and given its settings, and how is each setting read back?

The rewritten history is pushed to a new repository of the `SpartanLaboratories` organisation,
`KotlinBottools-next`, created private with no README and no commit. The repository is renamed
`KotlinBottools` later in the same unit, and it is made public by a later unit. Its settings are the
old repository's, with two exceptions: the wiki is off and the default workflow permissions of
GitHub Actions are read-only.

- **Options worth comparing.**
  - Every setting given at creation, in `POST orgs/{org}/repos`.
  - Creation with the minimum, then the settings applied by `PATCH repos/{owner}/{repo}` and the
    Actions permission endpoints, before the mirror push or after it.
  - GraphQL `createRepository` and `updateRepository` in place of REST.
- **Requirements an answer must meet.**
  - The settings to apply: default branch `main`; issues on; projects on; wiki off; discussions off;
    merge commits, squash merges and rebase merges allowed; auto-merge off; delete-branch-on-merge
    off; branch updates from pull requests off; web commit sign-off not required; forking as the old
    repository has it; merge-commit title and message `MERGE_MESSAGE` and `PR_TITLE`; squash
    title and message `COMMIT_OR_PR_TITLE` and `COMMIT_MESSAGES`, with the pull-request title not
    the squash default; no description, homepage or topics; Actions enabled for all actions; default
    workflow permissions `read`, and Actions not allowed to approve pull requests; the
    organisation's administrator the only direct collaborator, and no team.
  - The answer must say, for each setting, which call sets it, whether it can be given at creation,
    what a new repository has without it, and which field of which read shows it.
  - The default branch is set explicitly after the push. The answer must say what GitHub makes the
    default branch when one mirror push creates several branches (here `main` and a topic branch)
    in an empty repository, and whether setting it before any branch exists is refused.
  - The organisation is on GitHub Free and the repository is private until the later unit. The
    answer must say which of these settings a private repository on that plan reports differently,
    refuses or silently ignores (the wiki in particular, and the Actions permissions), and which
    survive the later rename and the later change to public. It must say what a new private
    repository reports under `security_and_analysis`, so the read-back knows what to expect; this
    unit changes none of those.
  - The token is the organisation owner's, with the scopes `repo`, `workflow`, `read:org`,
    `project` and `gist`, and without `admin:org` and `delete_repo`. The answer must say whether
    each call needs more, and whether a repository-level workflow-permissions setting is accepted
    whatever the organisation's own default is.
  - Every write is a literal `gh api` command (booleans and integers typed with `-F`, strings with
    `-f`, no leading slash on a path), and every read-back addresses the repository by its id, not
    its name, since a renamed repository's old name can answer for it.
- **Evidence that would settle it.** GitHub's REST reference for creating an organisation
  repository, updating a repository, the repository's Actions permissions and its workflow
  permissions, and listing collaborators and teams; its documentation of which features each plan
  offers for private repositories; its changelog entries on default workflow permissions; reports
  and source code from tools that copy or enforce repository settings (for example the Terraform
  GitHub provider's repository resource, or the settings applications that mirror repository
  configuration); `gh` 2.100.0's typing rules for `-f` and `-F`.
- **Findings file:** [`fresh-repository-settings.md`](fresh-repository-settings.md).

---

## Verification results

Each of the 25 load-bearing claims of [`fresh-repository-settings.md`](fresh-repository-settings.md#7-load-bearing-claims)
was re-opened at its source on 2026-11-10: the documented and source claims at the cited page, file or tag, and the observed
claims by repeating the read (GET requests and GraphQL queries only). 23 hold, one fails and one is unclear.

| Claims | Result |
|---|---|
| 1–11, 14–25 | Hold. The quotes are verbatim at their sources: the REST description at the cited commit (still the latest on its `main`), GitHub's documentation pages, the 2023-02-02 changelog entry, the Terraform provider at `v6.13.0`, the settings application at `v5.0.16`, `gh api --help` of gh 2.100.0, and the live GraphQL schema. The absences claims 2 and 17 assert hold as well: `POST orgs/{org}/repos` has no `default_branch`, `allow_update_branch`, `web_commit_signoff_required`, `allow_forking` or discussions field, and the GraphQL repository inputs have no merge settings, default branch or Actions fields. The observed values read the same again: the new private repository's settings, the masked wiki on three private repositories, the organisation's plan and forking policy with its 403 on the organisation's Actions settings, the collaborator listings, and the free name. |
| 12 | **Fails.** The quoted error text is on the cited page, but the thread is not about a branch that does not exist: the branch existed, and the accepted answer traces the error to a field missing from the request. The claim is not evidence of what GitHub answers when `default_branch` names a branch that does not exist, and nothing in the design rests on it (summary, below). |
| 13 | **Unclear.** The quote is verbatim, but it is one project's untested statement that the first branch pushed to an empty repository becomes its default. It stays recorded as an opinion; the design does not depend on it. |

**In the build** ([as-built record](../final-implementation.md)):

- The differences expected between the read-backs before and after the push ([Request B2](fresh-repository-settings.md#request-b2-after-the-push-set-the-default-branch-and-read-back))
  did not hold alone: GitHub's repository representation also carries a clone token that changes on every read and the
  language it detects in the pushed content, which moved from none to `Kotlin`. Neither is a setting; the comparison now
  leaves them out, and the deviation this caused is in the as-built record's §4.
- One mirror push created both branches, and GitHub made `main` the default. That neither confirms nor refutes claim 13,
  since both branches arrived in the same push.

---

## Summary

### 1. The fresh repository: creation, settings and read-backs

- **What was found.** `POST orgs/{org}/repos` cannot carry every setting: it has no default branch, no
  `allow_update_branch`, no `web_commit_signoff_required`, no `allow_forking` and no discussions switch, and the Actions
  permissions are separate endpoints ([findings](fresh-repository-settings.md) §3.3, claims 2–5). GraphQL cannot take
  REST's place as the write path: its repository inputs have no merge settings, default branch or Actions (§3.10, claim
  17). A repository the organisation created private and empty on 2026-11-09 already reads almost every required value;
  the two that differ are the default workflow permissions (`write`, inherited from the organisation, which predates the
  2023 read-only default) and forking (off) (§3.2, §3.4, claims 6, 7, 21).
- **Recommended approach.** Three requests, each a literal list of `gh api` commands followed by read-backs by repository
  id ([findings §6](fresh-repository-settings.md#6-recommendation-for-this-repository)):
  - **Creation** with `name`, `private=true` and `auto_init=false` only, after reading that the name is free; read back
    private, empty, not archived, and unreachable anonymously. A repeated creation is not idempotent and the token cannot
    delete, so the name is read before any retry.
  - **Settings, before the push:** one `PATCH repos/{owner}/{repo}` with every repository field and never `name` (which
    renames), `PUT …/actions/permissions` (enabled, all actions) and `PUT …/actions/permissions/workflow` (`read`, no
    approvals); then the read-back table of the findings, REST and GraphQL, saved as a snapshot. Every value is written,
    so the result does not depend on today's defaults; the push then meets the final Actions permissions.
  - **The default branch, after the push:** read which branch GitHub made the default, set `main`, read back, and save a
    second snapshot, which the swap compares by id after the rename (only the name and URL fields may differ).
  - The approach is the one the Terraform GitHub provider takes: create, then update, with the default branch set only
    once the branch exists (§4, claim 14).
- **The wiki is read twice.** On a private repository of a Free organisation, REST `has_wiki` reads `false` whatever is
  stored, while GraphQL `hasWikiEnabled` shows the stored value (observed on four private repositories and on the old
  repository before and after it became public; no document states it) (§3.6, claims 8, 22). "Wiki off" is therefore
  read back on both. The old repository's wiki is stored on, so turning it off in the fresh repository is a real change;
  a wiki turned off is hidden, not erased.
- **Forking follows the visibility.** The organisation disallows forking of private repositories, and the per-repository
  switch exists only once the organisation allows it, so the fresh repository reads forking off while it is private and is
  not written (§3.5, claims 9, 23). A public repository can be forked by anyone, which is how the old repository reads, so
  the old repository's forking is matched from the change to public on; the later unit that makes the repository public
  reads it again (claim 10).
- **Access.** The organisation's administrator is listed only under `affiliation=all`; `affiliation=direct` is empty on
  the old and the new repositories alike, so "the only direct collaborator" reads as the only collaborator listed, with no
  direct grant and no team (§3.1, claims 18, 24).
- **Scopes.** Every call needs `repo` (the collaborator list also `read:org`), which the token has. The organisation's own
  Actions settings answer 403 without `admin:org`, so its default is inferred from what its repositories receive and
  nothing in the procedure reads it; a repository-level `read` cannot be blocked, since only a more restrictive
  organisation default disables the permissive choice (§3.3, §3.4, claims 4, 6, 23).
- **`security_and_analysis`** reads `null` on a private repository of this organisation; the read-back expects `null`, and
  the object appears only once the repository is public (§3.7, claim 21).
- **Where the sources disagreed, and what holds.**
  - Which branch becomes the default when one push creates several branches: one project's statement says the first
    branch pushed, the organisation's configured default name is `main`, and GitHub documents neither. The procedure
    reads the result and sets `main` explicitly, so it holds either way (claims 11, 13).
  - What GitHub answers when the default branch is set before the branch exists: the error text a 2019 thread quotes
    comes from a request with a missing field, not from a missing branch (claim 12 fails). The design does not rely on any
    such answer: before the push the repository has no branch, and the documented precondition for changing the default
    branch is more than one branch (claim 11), so the default branch is written only after the push.
- **Options that do not fit.** Every setting at creation: several fields are not accepted there, and a rejected field
  would fail the creation itself instead of a request that can be repeated. The settings after the push: no gain, and the
  push would meet the inherited `write` workflow permissions. GraphQL as the write path: it lacks the merge settings, the
  default branch and Actions; it is used for the reads REST masks, and its discussions switch is the fallback write if
  discussions ever read on.
- **What only the first real run shows** (findings §8): the answer to the default-branch write when `main` is already the
  default; whether `has_wiki=false` is stored or ignored on a private repository of a Free organisation (GraphQL reads
  `false` from creation either way); the `204` of the workflow-permissions `PUT` with `read`. Each request's read-back is
  its check, not its status.

### 2. The other inputs

The findings in the reuse table at the top of this file stand as written: the tools are at the versions those findings
were verified against, and the transfer, rename and identity behaviour they rest on was measured on 2026-11-09.
