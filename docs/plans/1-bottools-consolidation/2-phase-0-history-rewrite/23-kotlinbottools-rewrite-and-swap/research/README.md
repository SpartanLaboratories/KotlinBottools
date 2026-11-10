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
| What a transfer does to numbers, closed issues, links and the references in the moved text, and the content-creation limits | [`../22-transfer-rehearsal/research/issue-transfer-behaviour.md`](../22-transfer-rehearsal/research/issue-transfer-behaviour.md) §3, §6, as corrected by [`../22-transfer-rehearsal/research/README.md`](../22-transfer-rehearsal/research/README.md#did-not-hold-in-the-build) and measured in [the rehearsal's as-built record, §3](../22-transfer-rehearsal/final-implementation.md#3-measurements) |
| The rename, privacy and archive order, and identity read by repository id | [`../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md`](../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md) §3, §6 |
| The REST and GraphQL forms for issues, comments, placeholders, transfers, links, the census and the flat read | [`../22-transfer-rehearsal/research/fixture-and-read-api-forms.md`](../22-transfer-rehearsal/research/fixture-and-read-api-forms.md) §3, §6 |

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
