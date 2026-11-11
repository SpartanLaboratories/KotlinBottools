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
