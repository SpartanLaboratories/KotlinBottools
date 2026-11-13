# Phase 0 · 6 — Rewriting GKB2 and GKB: research

This file holds the question this unit's plan rests on that needs evidence from outside this repository, and the earlier
findings that already answer the others. The new question is answered by its own findings file in this folder. The
verification of the claims those findings rest on, and the summary of what they establish, follow below.

**What is already established and not asked again.** The phase's earlier findings were verified at source between
2026-10-20 and 2026-11-12, and the earlier units have run the procedures they describe on this machine, whose tools are at
the same pins today. They are cited instead of researched again:

| What the plan needs | Answered by |
|---|---|
| The rewrite: the invocation, its pre-run and post-run checks, and its records | [`../../research/git-filter-repo-on-windows.md`](../../research/git-filter-repo-on-windows.md) §6.4 to §6.7, with the stage scripts of the rewrite and swap unit as they ran ([its plan, Appendix A](../../23-kotlinbottools-rewrite-and-swap/plan.md#appendix-a--the-tools-and-their-runner)) |
| The manifests of purged blob ids, the expectation rows, and the variant pinned to GKB2's pull-request ref | [`../../research/clone-realignment-and-data-extraction.md`](../../research/clone-realignment-and-data-extraction.md) §6.2 and §6.6; [`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.A and §6.1; [the preparation unit's as-built record, §3.5](../../21-preparation/final-implementation.md#35-manifests-and-expectation-rows) |
| The positive controls on the untouched backups and their expected results | [`../../research/gitleaks-local-and-ci.md`](../../research/gitleaks-local-and-ci.md) §6.7; [the preparation unit's as-built record, §3.6](../../21-preparation/final-implementation.md#36-positive-controls-on-the-untouched-backups) |
| The scan wrapper, the exit tests, and the reading of a default-rule finding in a kept file | `gitleaks-local-and-ci.md` §6.8; the rewrite and swap unit's exit-test script, and its self-test of the kept-findings count on a finding in a kept file ([its plan, Appendix A](../../23-kotlinbottools-rewrite-and-swap/plan.md#appendix-a--the-tools-and-their-runner)) |
| The one scoped allowlist table of the current scan configuration, which matches a single KotlinBottools document and nothing in the legacy repositories | [`../../24-repository-hygiene/research/scoped-allowlist-semantics.md`](../../24-repository-hygiene/research/scoped-allowlist-semantics.md) |
| The mirror push: the hidden `refs/pull/*`, the porcelain format and its tally, the push preparation, and the per-ref verification on two channels | [`../../research/github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md) §3.2, §3.6 and §6.2 |
| The residual probes: the routes and what each status means on each, the controls, the budgets, the activity feed and the events | the same file, §3.1, §3.3, §3.4, §3.7, §6.1 and §6.3, with the publication unit's corrected route rules ([its research summary, §2](../../25-kotlinbottools-publish/research/README.md#2-the-anonymous-measurements-and-the-access-check)) |

**The unit's blast radius needs no research.** It is surveyed directly in the plan: GKB2's and GKB's refs, pull request,
issues and activity on GitHub; the workspace mirrors, backups and records; and the workspace tools the unit reuses or
corrects.

**The current state the question starts from**, read on 2026-11-13:

- GKB2 and GKB are public and not archived, with default branch `master`, and with no fork, tag, release, branch protection,
  ruleset, workflow, webhook or deploy key. Secret scanning and push protection are disabled on both.
- GKB2 advertises `master` and `refs/pull/6/head`, the head of its one pull request, which is merged; GKB advertises `master`
  only. Each server's refs equal the listing recorded when the workspace mirrors were cloned, and each mirror and backup is
  byte for byte as recorded then.
- The rewrite changes `master` on each: GKB2's 32 commits become 30 and GKB's 11 become 9, and the files under a purged path
  leave the tip's tree, 14 of GKB2's 86 files and 54 of GKB's 114.
- The push goes from a bare mirror whose `origin` is the repository itself, with git 2.55.0.windows.5 and
  `gh auth git-credential` as the only credential helper, under an organisation administrator's classic token holding
  `repo`. It is carried out on request by the request service, whose own settings deny `git push --force`, `git push -f` and
  `git push --force-with-lease` unless the grant for a job lifts them.

---

## The questions

### 1. A force-push of a rewritten mirror to a public repository: what can GitHub refuse, how does a refusal read in the push's output, and which form of the push makes the update conditional on the old tip?

The earlier findings ([§3.6, §6.2](../../research/github-residual-exposure-and-visibility.md#62-the-mirror-push-and-its-per-ref-verification-per-repository-after-the-rewrite-checks-pass))
give the push as `git push --porcelain --force --mirror origin`, after a dry run of the same, with the local `refs/pull/*`
deleted first and the server's heads compared with the rewrite's old column just before. They establish how GitHub treats
the hidden pull-request refs, what each porcelain line and the tally mean, and that `Done` does not prove that no ref was
rejected. They do not establish what GitHub itself may refuse in a force-push to a public repository whose rewritten commits
are all new to it. GitHub's push protection for users is an account setting, on by default, that stops a user from pushing
secrets to public repositories ([§3.8](../../research/github-residual-exposure-and-visibility.md#38-visibility-change-settings-plan-documented-observed)),
whatever the repository's own setting. Nor do they establish whether the push itself can make the update conditional on the
old tip.

- **Options worth comparing.**
  - The form of the push: `git push --porcelain --force --mirror origin`; the same without `--force`, since `--mirror`
    documents that locally updated refs are force-updated on the remote; a lease,
    `--force-with-lease=refs/heads/master:<old tip>`, together with `--mirror`, or with an explicit refspec and `--atomic`
    instead of `--mirror`.
  - The guard against a branch that has moved: the comparison of the server's heads with the old column in the same shell,
    immediately before the push; the lease; or both.
  - A refusal by GitHub's push protection: the push stops with the remote unchanged and the run hands back. A bypass of the
    block is listed only so that the answer says what one is and who can make it; the procedure never makes one.
- **Requirements an answer must meet.**
  - The push updates each branch (one per repository, `master`) to its rewritten tip as a forced update, deletes nothing,
    creates nothing, and leaves `refs/pull/*` untouched.
  - It never overwrites a branch that has moved since the mirror was cloned.
  - Its outcome is read from the porcelain lines and the exit status, tallied by flag. A refusal leaves the remote unchanged
    and is told apart from other failures by fixed markers counted in the error stream, without printing that stream:
    GitHub's message for a blocked secret can carry a commit id, a path and a line, none of which may be printed or kept
    outside the data folder.
  - The answer says whether push protection for users applies to this push although the repository's own setting is
    disabled; which secret types it blocks, and whether the Discord bot token is among them; whether it examines every commit
    that is new to the repository, as every commit of a rewritten history is, or a bounded number or size of them; whether a
    block refuses the whole push or only the refs it concerns; and what the client prints in each case.
  - The push is a force-push whatever its flags, made only through a request carried out under a grant that names it; the
    procedure makes no bypass.
  - git 2.55.0.windows.5 on Windows, in Git Bash; a bare mirror whose `origin` is the repository; `gh auth git-credential`
    as the only credential helper; an organisation administrator's classic token with `repo`.
- **Evidence that would settle it.** git's documentation of `git push` (`--mirror`, `--force`, `--force-with-lease`,
  `--atomic`, `--porcelain`) at 2.55, and its source where the documentation is silent; a local experiment in a scratch folder
  outside every repository, with bare repositories standing in for the server (one whose branch has moved since the clone, one
  whose pre-receive hook refuses), showing the porcelain lines and the exit status of each form; GitHub's documentation of
  push protection for users and for repositories, its list of supported secrets with their push-protection flag, the
  documented limits of what a push scan examines, and what a blocked push prints; GitHub's changelog entries that made push
  protection for users the default; and GitHub's documentation of removing sensitive data, for the force-push it recommends.
- **Findings file:** [`force-push-and-push-protection.md`](force-push-and-push-protection.md).

---

## Verification results

Every load-bearing claim of the findings file was re-opened at its source on 2026-11-12: git's documentation and source at
`v2.55.0`, git-filter-repo's manual at `v2.47.0`, GitHub's documentation source on `main` and its live pages, GitHub's blog
and changelog, and two community discussions. The two experiment rows the design rests on were observed again with git
2.55.0.windows.5 on throwaway bare repositories.

| Findings | Claims | Holds | Unclear | Fails |
|---|---|---|---|---|
| [`force-push-and-push-protection.md`](force-push-and-push-protection.md) §7 | 27, and two experiment rows observed again | 29 | 0 | 0 |

- **Cited where they are, nothing resting on the difference.** The sentence that a push scan which times out is completed after
  the push (claim 18) is in the note on pushes of several branches on GitHub's concepts page about push protection from the
  command line, not on the how-to page first cited. The line `remote: error: GH013: …` (claim 23) is in the opening post of
  the discussion, of 2024-09-28, while the lines about a repository without secret scanning are in its comment of 2026-03-15.
  The findings file cites each where it is.
- **Single reports.** Claims 23 and 24 rest on one published log each. The design takes from them only the wording of the
  markers that attribute a refusal to push protection; every refusal takes the same stop whatever those markers count.
- **Observed again, as stated.** A mirror push with a lease naming a wrong expected value overwrote the branch and exited 0:
  the lease is inert under `--mirror`. A refspec push with an explicit lease, against a branch that had moved after the clone,
  printed one `!` line with `[rejected]` and `(stale info)`, exited 1 and left the branch unchanged.
- **Current versions.** git 2.56.1 exists. Its `git push` documentation is byte-identical to 2.55.0's, and the quoted lines
  of `builtin/push.c` and `remote.c` are still present. The machine stays at the phase's pin, 2.55.0.windows.5.
- **Not a claim, and true.** The note that push protection may not apply to legacy tokens is in GitHub's documentation source,
  in a reusable fragment of the push-protection pages.
- **Claims about this repository and this machine** were checked against the workspace and its records, read on 2026-11-13:
  each mirror is bare with `origin` the repository's URL and `remote.origin.mirror=true`, holds one branch, `master`, and GKB2's
  mirror also its pull-request ref; the author of each tip is also an author of KotlinBottools commits that the same account
  has already pushed.

---

## Summary

### 1. The force-push

- **The form.** Per repository, from its bare workspace mirror, after the rewrite's checks and the push preparation:
  `git push --porcelain --force-with-lease=refs/heads/master:<old tip> <url> refs/heads/master:refs/heads/master`, preceded by
  the same line with `--dry-run`, with `gh auth git-credential` as the only credential helper. The destination is the
  repository's URL, read from the mirror's `origin`, because a mirror-configured `origin` refuses a refspec (exit status 128,
  nothing sent). One ref is updated, as a forced update; nothing is deleted or created, and `refs/pull/*` is never named
  ([findings §2, §6](force-push-and-push-protection.md#6-recommendation-for-this-repository)).
- **Why not `--mirror`.** Under `--mirror`, as under `--force` or a refspec with a leading `+`, git ignores the lease: the
  documentation says so, the source makes force win over the stale check, and the experiment overwrote a branch that had moved
  and a branch given a wrong expected value, each with exit status 0. `--mirror` also deletes a server branch created after the
  clone and sends a local `refs/pull/*` as a new ref, which GitHub rejects. Dropping `--force` from the `--mirror` form changes
  nothing ([§3.1, §5](force-push-and-push-protection.md#31-what---mirror---force-and-a-lease-each-do-in-git-255-documented-source-observed)).
- **The guard stays beside the lease.** The comparison of the server's heads and tags with the rewrite's old column, made in
  the same shell just before the dry run, catches any ref created, moved or deleted since the clone. The lease binds `master` to
  its recorded tip at the push's own ref advertisement, and the push protocol carries that old value with the update, which
  git's receive side checks. The procedure also checks that its own argument list holds no `--force`, `-f`, `--mirror`,
  `+` refspec or deletion.
- **The expected outcome.** The dry run and the push each tally `forced=1 fastforward=0 new=0 deleted=0 uptodate=0 rejected=0
  done=1 pull_lines=0 other_refs=0 bad=0`, each exits 0, and both name the same ref with the same flag. `Done` is printed after a
  `!` line as well, so it proves nothing alone.
- **What GitHub can refuse.** Push protection for users is on by default for every account. It stops a push that carries a
  supported provider secret to a public repository whatever the repository's own setting, and the Discord bot token is one of
  those secrets. Branch protection, rulesets, the private-email block, the size limit and authentication are the other
  refusals; none is expected here, with no protection and no ruleset on either repository and a push that sends commits and trees
  only. A dry run never shows a refusal made on the server
  ([§3.2, §3.3](force-push-and-push-protection.md#33-push-protection-for-users-on-a-repository-whose-own-setting-is-disabled-documented-observed-in-published-logs)).
- **How a refusal reads, and the stop it takes.** Standard output carries one `!` line, with `[remote rejected]` for a refusal
  by the server, or `[rejected]` and `(stale info)` for a branch that moved, and the push exits 1. For push protection, the
  error stream carries `GH013` and a `GITHUB PUSH PROTECTION` block that names commit ids and paths. Both streams are kept in
  files under the data folder, and fixed markers are counted in them without printing them: `[remote rejected]`, `[rejected]`,
  `(stale info)`, `GH013`, `PUSH PROTECTION`, `- commit:` and `Scan incomplete`. After a non-zero exit status, one read of
  `master` and of the pull-request refs says what the remote holds. Every refusal leaves the remote unchanged and takes the
  same stop: the procedure never repeats the push, the repository hands back with the class and the counts, and the other
  repository waits.
- **After a refusal by push protection, the owner decides** from the kept error file: extend the purge list and redo the
  rewrite from the backup, or allow the secret through the block's URL as the pushing account and have the push requested
  again within three hours. The procedure itself makes no bypass.
- **The grant names the push in the form used.** The request service's settings deny `git push --force`, `git push -f` and
  `git push --force-with-lease` as text patterns, and a command with options before `push` matches none of them while still
  forcing the update.

### Where the sources disagreed

- **GitHub's removal guide and git-filter-repo's manual** give `git push --force --mirror origin`, and git's own documentation
  and source show that this form cannot carry a lease. The guides address a repository whose server state is taken to equal
  the clone. The push here keeps the guard of the earlier procedure and adds the lease, which costs nothing for a repository
  with one branch.
- **The documentation of push protection for users** does not name organisation-owned repositories or token types. The
  published logs and a staff statement show it applying across GitHub, and nothing exempts this push, so it is taken as
  applying.

### Options that do not fit

- **`--mirror` with a lease:** the lease is inert. **`--mirror` without `--force`:** the same push as with it.
- **`--atomic`:** one ref makes it redundant.
- **A test push to see whether push protection blocks:** a write to a public repository.
- **Turning off the pushing account's push protection beforehand:** it weakens the account's own guard on a forecast the
  evidence does not support, and an account setting is not the procedure's to change.
