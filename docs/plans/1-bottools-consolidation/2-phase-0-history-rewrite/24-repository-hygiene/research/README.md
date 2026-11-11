# Phase 0 · 4 — KotlinBottools repository hygiene: research

This file holds the questions this unit's plan rests on that need evidence from outside this repository, and the earlier
findings that already answer the others. Each new question is answered by its own findings file in this folder. The
verification of the claims those findings rest on, and the summary of what they establish, follow below.

**What is already established and not asked again.** The unit commits files that the phase's earlier findings give in
full. The tools those findings were verified against are the ones on this machine today: gitleaks 8.30.1 in the workspace,
Python 3.14.7 and git 2.55.0.windows.5. The workspace copies of the configuration and the wrapper equal the findings'
text byte for byte. The following findings are therefore cited instead of researched again:

| What the plan needs | Answered by |
|---|---|
| What `gitleaks git` and `gitleaks dir` scan; the silent pass; redaction; path-only rules; the configuration schema; the default rules that bear on this repository; MagicBot's configuration compared | [`../../research/gitleaks-local-and-ci.md`](../../research/gitleaks-local-and-ci.md) §3.2–§3.10 |
| The configuration's rules (MagicBot's three rules, `legacy-key-file`, `legacy-state-directory`), the scan wrapper and its exit statuses, and the canary with its expected per-rule counts | the same file, §6.3, §6.4, §6.5 |
| The workflow: its triggers, permissions, pins, steps, names, and how it stays apart from Phase 1's `ci.yml` | the same file, §3.11, §6.9 |
| The root-anchored ignore list and why four directories are anchored | [`../../../research/bot-repository-history-purge.md`](../../../research/bot-repository-history-purge.md) §6.6 |
| What in the README is false once the data files have left the repository, and the files a clone must supply | [`../../research/purge-blast-radius.md`](../../research/purge-blast-radius.md) §3.E, §6.6 |
| The privacy gate, its lists and its allow-list | the same file, §3.B, §6.3, with the gate's copy in use recorded in [the rewrite and swap unit's plan, Appendix A](../../23-kotlinbottools-rewrite-and-swap/plan.md#appendix-a--the-tools-and-their-runner) |

**The unit's blast radius needs no research.** It is surveyed directly in the plan: the tracked files the new ignore list
could match, the README lines that change, the documents that describe the three CI files, and the workspace copy of the
configuration that the later units of the phase scan with.

**The current state the questions start from.** The configuration as the earlier findings give it reports one default
rule, `curl-auth-user`, on this repository: 2 findings in the history of `main` (the commit that added the document and the
merge that carried it, which `-m` reads once per parent) and 1 in the tree. All three are in one kept research document,
[`../../research/github-residual-exposure-and-visibility.md`](../../research/github-residual-exposure-and-visibility.md),
where a command example's basic-auth credential is a shell command substitution that reads the GitHub CLI's token at run
time. No literal credential is involved. The configuration therefore carries one allowlist table scoped to exactly that
match, and the workspace copy of the configuration takes the committed bytes once this unit lands.

---

## The questions

### 1. Does the secret-scan workflow still run as written on GitHub's hosted runner, and do its pins still resolve to what it checks?

The workflow is committed byte for byte as the earlier findings give it
([§6.9](../../research/gitleaks-local-and-ci.md#69-the-workflow-githubworkflowssecret-scanyml), 4532 bytes, sha256
`b518b52717073c5667302a113814cb1a76f5aa8c9188a7d7e41346278d772c2e`). Its first run is on this unit's pull request into
`main`, and the change merges only once that run has passed. The findings were verified on 2026-10-20 and 2026-10-21; the
hosted runner image and the actions it uses change on their own schedule.

- **Options worth comparing.**
  - The file exactly as the findings give it.
  - A change the platform now forces: a runner label, a runtime deprecation of the checkout action, or a moved or
    replaced release asset.
  - A newer `actions/checkout` or gitleaks release. The pins stay unless a defect or a deprecation affects this use,
    because a version change also changes the canary's and the scans' verified baseline.
- **Requirements an answer must meet.**
  - The job runs on `ubuntu-latest`, with `permissions: contents: read`, in a private repository of an organisation on
    GitHub Free. Actions are enabled there for all actions, and the default workflow permissions are read-only.
  - It checks out with `actions/checkout` pinned to commit `3d3c42e5aac5ba805825da76410c181273ba90b1` (tag v7.0.1),
    with `fetch-depth: 0` and `persist-credentials: false`.
  - It downloads `gitleaks_8.30.1_linux_x64.tar.gz` from the release's download URL with `curl` and checks it with
    `sha256sum --check --strict` against `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`. It
    extracts the binary with `tar` and compares `gitleaks version` with `8.30.1`.
  - It runs the wrapper with `python3 -I`. The wrapper needs Python 3.11 or newer (`tomllib`) and git on the `PATH`.
  - The wrapper counts the scannable commits with `git log --all` over the refs the checkout holds. The answer must say
    which refs a `fetch-depth: 0` checkout holds on a `pull_request` event and on a `push` event to `main`.
  - The answer must say what `ubuntu-latest` resolves to today, and whether a change of that label is announced for the
    weeks ahead. It must say whether that image has `python3` 3.11 or newer, git, `curl`, `tar` and GNU `sha256sum`.
  - It must say what runtime v7.0.1 of the checkout action declares, and whether that runtime is supported today
    without a deprecation that fails or warns the job.
  - It must say whether the commit still resolves to v7.0.1, and whether a later v7 release fixes anything that bears on
    this use.
  - It must say whether the gitleaks asset is still at its URL with the same sha256, and whether a later gitleaks
    release exists and what it changes. In particular, does it change the silent pass of `gitleaks git` that the
    wrapper guards against?
  - It must say what Actions minutes a private repository of a GitHub Free organisation has, and anything GitHub has
    changed since 2026-10-20 that bears on a workflow of this shape (pull requests from a branch of the same repository,
    `workflow_dispatch`, the default token's permissions).
- **Evidence that would settle it.** The runner-images repository (its README and the Ubuntu image's readme) and its
  announcements; GitHub's changelog; `actions/checkout`'s releases and its `action.yml` at the tag; gitleaks' releases
  and its checksums file; GitHub's documentation of Actions billing and of the checkout action's refs; GitHub's
  documentation of the `pull_request`, `push` and `workflow_dispatch` events.
- **Findings file:** [`workflow-on-the-hosted-runner.md`](workflow-on-the-hosted-runner.md).

### 2. How does gitleaks 8.30.1 apply an allowlist table that names one rule, one path and one secret, and which table suppresses exactly the one known match?

The configuration is the earlier findings' file
([§6.3](../../research/gitleaks-local-and-ci.md#63-the-configuration-gitleakstoml): `[extend] useDefault = true` and five
rules of its own) plus exactly one `[[allowlists]]` table. The table gives `targetRules = ["curl-auth-user"]` and
`condition = "AND"`. One `paths` entry names the research document above, one `regexes` entry is pinned to the exact
text the rule captures as the secret of that match, and `description` gives the reason. There is no global allowlist, and
the file's header comment describes the one table.

- **Options worth comparing.**
  - The regex against the default target (the secret) versus `regexTarget = "match"` or `"line"`.
  - The path as an anchored, escaped regex versus a looser form.
  - `condition = "AND"` versus the default `"OR"`, which would exempt the whole document from the rule, or any
    occurrence of the text anywhere.
- **Requirements an answer must meet.**
  - The table must suppress the one known match in every scan the unit and the workflow run, and nothing else:
    - `gitleaks git` with `--log-opts "--full-history --all --no-renames -m --diff-filter=tuxdb"`, and the same with
      `--branches --tags`;
    - `gitleaks dir .` from the repository root;
    - on Windows with the 8.30.1 Windows binary, and on Linux with the 8.30.1 Linux binary.
  - A literal credential in the same document, and the same text in another file, must still be reported.
  - The canary's per-rule file counts must stay as the findings give them.
  - The wrapper's `control` subcommand, which reads only the configuration's `rules`, must be unaffected.
  - The answer must say how 8.30.1 attaches a `[[allowlists]]` table with `targetRules` to a rule, and how it evaluates
    `condition`, `paths` and `regexes`.
  - For the path: what string is matched in each mode, with which separator on Windows, and whether it is anchored.
  - For the secret: what this rule's secret is for a quoted credential (which capture group, quotes included or not).
  - It must say whether `description` is a recognised key, and whether unknown keys are rejected or ignored.
  - It must say how the table combines with the rule's own allowlist and with the default global allowlist, and
    whether the check that forbids `[allowlist]` beside `[[allowlists]]` applies across an `[extend]`.
  - It must say whether a `targetRules` id is validated when the configuration loads, and how the literal-string regex
    must be escaped in TOML.
  - It must say what in a later gitleaks version could make the table stop applying without an error (a renamed rule,
    a changed secret group), and which check would show it.
- **Evidence that would settle it.** gitleaks' source at tag `v8.30.1` (the configuration's allowlist parsing and
  validation, the detector's allowlist checks for `git` and `dir` sources, the default configuration's
  `curl-auth-user` rule and its own allowlist), its README's configuration section, and runs of the 8.30.1 binary on
  scratch copies of this repository and on throwaway fixtures.
- **Findings file:** [`scoped-allowlist-semantics.md`](scoped-allowlist-semantics.md).

---

## Verification results

Every load-bearing claim of both findings files was re-opened at its source on 2026-11-11. That covers 19 claims of
[`workflow-on-the-hosted-runner.md`](workflow-on-the-hosted-runner.md#7-load-bearing-claims) and 23 of
[`scoped-allowlist-semantics.md`](scoped-allowlist-semantics.md#7-load-bearing-claims). Sources quoted at a tag were read
at that tag, and pages first read through a summary were read again as raw text. All 42 hold; none fails and none is
unclear.

| Claims | Result |
|---|---|
| Workflow, 1–19 | Hold. Each quote is verbatim at its source: the runner-image announcement and the two image manifests (Ubuntu 24.04 image 20261101.360.1, Ubuntu 26.04 image 20261101.186.1), Canonical's post on Rust coreutils (raw text), the uutils 0.8.0 source, `actions/checkout` at the pinned commit, GitHub's changelog of 2026-09-23, GitHub's documentation sources for the events, Actions billing and workflow lockfiles, the gitleaks release, checksums file, issues and source at `v8.30.1`, the `pull_request_target` announcement, the hardening guidance, and Scorecard's checks. |
| Allowlist, 1–23 | Hold. Each source quote is verbatim at `v8.30.1` (`config/`, `detect/`, `sources/`, `cmd/`, `regexp/`, `.goreleaser.yml`, the default configuration, the README), at viper `v1.19.0`, in TOML 1.0.0 and in Go 1.25.0's `path/filepath`. Claim 6's regular expression is a verbatim part of the rule's expression, and the rule has no `secretGroup`. |

These observations were repeated, with the 8.30.1 Windows binary and the scan wrapper, on scratch copies only:
- **The proposed configuration** ([§6.1 of the allowlist findings](scoped-allowlist-semantics.md#61-the-complete-file)) is
  3360 bytes, sha256 `9d0149e389991db6e893b4d198fe71bab6206b8e295517bca454877063a6f0b7`, and `tomllib` parses it.
- **With it**, a mirror of this repository scanned with `--refs all` and with `--refs branches`, and a `dir .` scan of a clean
  clone of `main`, print `RESULT: CLEAN`.
- **The canary** prints `CANARY OK` for both ref sets.
- **Two fixtures are still reported:** a literal credential generated at run time, at the document's path, and the document
  copied to another path.
- **With the earlier configuration**, the same three scans print `RESULT: FINDINGS`, with only `curl-auth-user`: 2 findings in
  history and 1 in the tree.

---

## Summary

### 1. The workflow on the hosted runner

- **What was found.** No platform change forces an edit to the workflow
  ([findings §2](workflow-on-the-hosted-runner.md#2-bottom-line)).
  - **The checkout pin:** tag v7.0.1 of `actions/checkout` still points at the pinned commit, and it is still the newest
    release. Its `node24` runtime is the runners' default since Node 20 was removed on 2026-09-23 (§3.3).
  - **The gitleaks pin:** the 8.30.1 Linux archive is still at its URL. Its sha256 equals the pin on three channels: the
    checksums file, the release's asset digest and a download. 8.30.1 is still the newest release, and the upstream
    issues behind the silent pass the wrapper guards against are still open (§3.5).
  - **Changes since 2026-10-20:** nothing GitHub changed bears on the workflow's events, permissions or concurrency (§3.6).
- **`ubuntu-latest` is moving from Ubuntu 24.04 to Ubuntu 26.04** between 2026-10-19 and 2026-11-19, so the first run can
  land on either image (§3.1).
  - Both images carry what the steps call: `python3` 3.12.3 or 3.14.4, which both meet the wrapper's 3.11 floor; git
    2.56.0; `curl`; and `tar` (§3.2).
  - The gitleaks binary is statically linked.
  - The one difference is `sha256sum`: Ubuntu 26.04 ships Rust coreutils (uutils 0.8.0) by default. The uutils source
    supports the step's `--check --strict -` with a two-space line. A failure there is loud: the step runs under
    `set -euo pipefail`, so the run goes red and cannot pass falsely.
- **What a run's checkout holds** (§3.4).
  - A `fetch-depth: 0` checkout holds every branch as `refs/remotes/origin/*` and every tag. On a pull request it also holds
    the merge commit, checked out detached; on a push to `main` it holds a local `main`. The wrapper's `--all` covers them all.
  - A pull request with a merge conflict starts no `pull_request` run at all, so a missing run is not a pass.
  - The "Run workflow" button exists only once the file is on the default branch, so the first run is the pull request's.
- **Minutes.** A private repository of an organisation on GitHub Free draws on $12 of included compute a month, about
  2,000 standard Linux minutes. The job's 15-minute timeout bounds one run (§3.6).
- **Recommended approach.** Commit the workflow byte for byte as the earlier findings give it, and keep `ubuntu-latest`
  and both pins (§6). A version change would also move the verified baseline of the canary and the scans. A fixed image
  label would be a change to the design, and the one point a run has not settled fails closed.
- **What only the first run shows.**
  - Which image the run gets.
  - That the steps behave on the hosted runner as they did on this machine.
  - Whether a red run at the install step on Ubuntu 26.04 names the checksum tool. That case is the one point that would
    call for a change: either the label `ubuntu-24.04`, or a check written without `--strict -`.

### 2. The scoped allowlist table

- **What was found** at gitleaks `v8.30.1` ([findings §3](scoped-allowlist-semantics.md#3-findings)):
  - **Attachment.** A `[[allowlists]]` table with `targetRules` attaches to the named rule after `[extend]` has merged the
    default rules. It is not a global allowlist. An id that names no rule is a load error, which the wrapper reports as
    `GATE FAILED` (§3.1, §3.7).
  - **Condition.** `condition = "AND"` requires every criterion the table defines to hold for the same finding (§3.2).
  - **Paths.** A `paths` entry is an unanchored search on the slash-separated path. That path comes from git's diff in a
    history scan, and from the normalised walk path in a `dir .` scan. So the entry is written anchored, in slash form
    (§3.3).
  - **Regexes.** A `regexes` entry is tested against the finding's secret by default. For this rule the secret is the whole
    quoted credential, quotes included: a 33-character text, not the 461-character match around it (§3.4).
  - **Keys.** `description` is a recognised key, and unknown keys are ignored (§3.5).
  - **Mixing table forms.** The check that forbids `[allowlist]` beside `[[allowlists]]` applies within one file, not
    across the default configuration that `[extend]` merges (§3.6).
- **Recommended approach:** the configuration of
  [§6.1 of the findings](scoped-allowlist-semantics.md#61-the-complete-file), 3360 bytes, sha256
  `9d0149e389991db6e893b4d198fe71bab6206b8e295517bca454877063a6f0b7`. It is the earlier configuration with:
  - the header's paragraph on allowlists rewritten;
  - one table appended: `targetRules = ["curl-auth-user"]`, `condition = "AND"`, one anchored path for the one research
    document, one anchored regex pinned to the quoted credential, and a `description`.

  Proven on this machine:
  - **Suppression:** the history scans with `--refs all` and `--refs branches` and the tree scan all print `RESULT: CLEAN`.
  - **The canary** keeps its expected counts and prints `CANARY OK`.
  - **The wrapper's `control` output** is unchanged.
  - **Negative controls, all still reported:** a literal credential at the same path; the same text at another path; the
    same text with one character changed; a path one character longer; and a path with a leading directory (§6.2).
  - **Elsewhere:** the table is inert wherever its path or its text is absent, which includes the five legacy repositories,
    whose history holds no such path.
- **Where the evidence calls for care.** A misspelled key widens the table silently, and so does a missing `condition`:
  - a misspelled `targetRules` makes the table global, and then a `dir` scan skips the whole document for every rule;
  - a misspelled `paths` lets the text through anywhere;
  - a misspelled `regexes` hides the whole document from the rule.

  Only the negative controls show these cases, so they are run whenever the table, the rule set or the gitleaks pin
  changes (§3.5, §3.9). A table whose rule later stops matching stays as dead text, and nothing reports it (§5, item 9).
- **Options that do not fit:**
  - A `.gitleaksignore` fingerprint: it is bound to a line and to each commit, carries no reason, and is looked up by
    directory, so a bare-mirror scan from the workspace would not see it. The workflow also refuses a `.gitleaksignore`.
  - An inline `gitleaks:allow` marker: it edits the kept document and does not reach the history.
  - A global path allowlist: it disables every rule for the document.
  - `condition = "OR"`: it hides the whole document for the rule, and the text everywhere.
  - `regexTarget = "match"` or `"line"`: the anchored pin then never matches, and an unanchored one ties the table to the
    prose around the example (§6).
- **Where the sources disagreed.** Nowhere. The earlier configuration's statement that there is no allowlist was true
  while this repository's own history held no false positive. The rewritten header now states the one scoped table, and
  the earlier findings' rule for any later suppression stands: one rule, one path, a stated reason (§6.4).
- **What only the first run shows.** The 8.30.1 Linux binary was not run. It is built from the same configuration with the
  same regular-expression engine, history paths come from git in slash form on every platform, and the Linux walk path is
  already in slash form (§6.3). The first run of the workflow is the proof.
