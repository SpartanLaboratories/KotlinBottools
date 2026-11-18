# GitHub workflows and repository settings for the build skeleton

Read on 2026-11-18. Everything below was read through GET calls, `github/docs` and `github/rest-api-description` at their default
branch, and each action's repository at the tag and commit named. Nothing was run against this repository's settings.

## 1. Question

How are `ci.yml`, `pages.yml` and `release.yml` written, and which exact GitHub settings (one ruleset on `main`, merge commits
only, the Pages source set to GitHub Actions) does the build need, given a public repository of an organisation on GitHub Free?

An answer must give: the check context names a ruleset can require and what happens when a required workflow does not run; the
rulesets, repository and Pages REST bodies and how each reads back; current action releases pinned by commit; the Pages artifact
and `.nojekyll` behaviour; a tag trigger that matches `vX.Y.Z` and bare `X.Y.Z` and nothing else; least-privilege `permissions:`
per job; and concurrency settings.

## 2. Bottom line

- **Check names are job names, nothing else.** A job with `name:` reports that string; a job without one reports its job id; a
  matrix job reports `<name or id> (<matrix values>)`. The workflow name never enters it. Require
  `Secret scan (gitleaks)` (already reported by GitHub Actions, app id 15368), plus two CI jobs with fixed names:
  `Build (gradlew build)` and `API docs (Dokka)`. Treat those names as the contract between `ci.yml` and the ruleset: a rename in
  a pull request leaves the old name "expected" forever and blocks the merge.
- **Give `ci.yml` no `paths:` filter and no `if:` on its required jobs.** A workflow skipped by a path, branch or commit-message
  filter leaves its required checks `Pending` and blocks the merge; a job skipped by `if:` reports Success. A `workflow_dispatch`
  run never satisfies a required check, so on-demand runs are for debugging only.
- **The ruleset** is one `POST /repos/{owner}/{repo}/rulesets` body: `target: branch`, `enforcement: active`,
  `bypass_actors: []`, `conditions.ref_name.include: ["~DEFAULT_BRANCH"]`, and four rules: `deletion`, `non_fast_forward`,
  `pull_request` (`required_approving_review_count: 0`, `allowed_merge_methods: ["merge"]`) and `required_status_checks`
  (`strict_required_status_checks_policy: true`, each context pinned with `integration_id: 15368`). Rulesets are available on
  public repositories on GitHub Free. A branch-target ruleset never touches tag pushes, and with the `pull_request` rule direct
  pushes to `main` are refused anyway.
- **Two single-purpose writes.** `PATCH /repos/{owner}/{repo}` with `allow_squash_merge=false`, `allow_rebase_merge=false`,
  `allow_merge_commit=true` (send booleans with `gh api -F`, not `-f`); `POST /repos/{owner}/{repo}/pages` with
  `build_type=workflow` alone (the schema accepts `build_type` without `source`). Read back with `GET /repos/{owner}/{repo}` and
  `GET /repos/{owner}/{repo}/pages`.
- **Pin every action by commit** (table in section 3, F9), each with its tag in a comment. `upload-pages-artifact` drops dot
  files since v4, so `pages.yml` must pass `include-hidden-files: true` or `.nojekyll` never reaches the site. Only the deploy job
  gets `pages: write` and `id-token: write`; the build job keeps the workflow default `contents: read`.
- **One open choice with a licence side.** `gradle/actions/setup-gradle` v6 bundles a proprietary caching component that is the
  default; WebTools stays on v5 for that reason. Use v5.0.2 (MIT, no terms to accept), the same as WebTools, or v6.4.1 with
  `cache-provider: basic`. Wrapper validation is on by default in `setup-gradle`; a separate `wrapper-validation` step is not
  needed.

## 3. Findings

Tiers: **consensus** = GitHub's documentation or schema (the platform's own statement); **practice** = what mature
repositories visibly do or what the platform returns when read; **opinion** = one source.

### F1. The context name of a check run (consensus, plus practice)

GitHub's ruleset troubleshooting page states the format: a workflow check is named `<job name>`; a reusable workflow's is
`<job name> / <reusable job name>`; and "Required status checks do not take workflow, matrix, or event trigger types into
account." Read on real repositories (practice): on `actions/checkout` commit `3d3c42e5`, a job without `name:` reports its job id
(`build`, `test-proxy`), and a matrix job without `name:` reports `test (ubuntu-latest)`. On this repository the existing check
run on `main` is `Secret scan (gitleaks)` from the app `github-actions`, id 15368, and the workflow name `Secret scan` is absent.
`square/okhttp`'s ruleset requires matrix contexts verbatim: `jvm (21)`, `android (29, x86, default)`.

GitHub also warns that "job names are unique across all workflows" is required for required checks: "Using the same job name in
multiple workflows can cause ambiguous status check results and block pull requests from being merged."

Sources: [troubleshooting-rules.md](https://github.com/github/docs/blob/main/content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/troubleshooting-rules.md),
[about-protected-branches.md](https://github.com/github/docs/blob/main/content/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches.md),
`gh api repos/actions/checkout/commits/3d3c42e5aac5ba805825da76410c181273ba90b1/check-runs`,
`gh api repos/square/okhttp/rulesets/27361952`.

### F2. A required check whose workflow does not run (consensus)

From GitHub's troubleshooting table: a workflow skipped by path filtering, branch filtering or a commit message leaves its checks
in "Pending" and blocks merging ("Avoid requiring workflows that can be skipped"); a job skipped by a conditional "reports
Success"; a job whose `needs` failed is skipped and "may not block merging", so a gate job that depends on others must use
`always()`. Checks created by a workflow job are only evaluated for these events: `push`, `pull_request`, `pull_request_review`,
`pull_request_target`, `deployment`, `deployment_status` (and `merge_group` for a merge queue). A `workflow_dispatch` run on a
pull request's head branch "do[es] not satisfy a required status check in a branch ruleset." A required check must also have
succeeded in the repository within the past seven days, and on the latest commit SHA; a successful state is `success`, `skipped`
or `neutral`.

Source: [troubleshooting-required-status-checks.md](https://github.com/github/docs/blob/main/content/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks.md).

### F3. Required checks and direct pushes and tag pushes (consensus for the rule text; the push error text for a ruleset was not read)

The ruleset schema describes the rule as "Choose which status checks must pass before the ref is updated. When enabled, commits
must first be pushed to another ref where the checks pass." So the rule binds pushes to the matching refs as well as merges. The
`pull_request` rule is described as "Require all commits be made to a non-target branch and submitted via a pull request before
they can be merged", so with both rules a direct push to `main` is refused whatever the checks say. A ruleset's `target` is
`branch`, `tag` or `push` (default `branch`); a `branch` ruleset with `include: ["~DEFAULT_BRANCH"]` does not match a tag, so a
pushed version tag is untouched and `release.yml` runs on it. `GET /repos/{owner}/{repo}/rules/branches/main` lists the rules
that apply to the branch from every ruleset, which is the read-back for "what binds a push to `main`".

Sources: [api.github.com.json, `repository-rule-required-status-checks`, `repository-rule-pull-request`](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json).

### F4. The rulesets request body (consensus for the schema; practice for the shape)

Schema, from the REST description: top level `name` and `enforcement` required (`disabled`, `active`, `evaluate`; `evaluate` is
Enterprise only), `target` default `branch`, `bypass_actors` optional, `conditions.ref_name.include/exclude` where `include` "Also
accepts `~DEFAULT_BRANCH` to include the default branch or `~ALL`". Rules: `required_status_checks` takes `required_status_checks`
(array of `{context (required), integration_id (optional)}`) and `strict_required_status_checks_policy` (both required) and
optional `do_not_enforce_on_create`; `pull_request` requires `dismiss_stale_reviews_on_push`, `require_code_owner_review`,
`require_last_push_approval`, `required_approving_review_count` (minimum 0) and `required_review_thread_resolution`, with optional
`allowed_merge_methods` ("At least one option must be enabled"); `deletion` and `non_fast_forward` take no parameters.
`integration_id` is "The optional integration ID that this status check must originate from"; omitted, any source (a commit status
set by anyone with write access) can satisfy the context.

Shape as it reads on a real public repository (`square/okhttp`, a ruleset on `refs/heads/main`, read 2026-11-18): rules
`deletion`, `non_fast_forward`, `pull_request` with `required_approving_review_count: 0`, `allowed_merge_methods:
["merge","squash","rebase"]` and the other flags false, and `required_status_checks` with every entry carrying
`"integration_id":15368`. `GET /repos/{owner}/{repo}/rulesets/{id}` returns `bypass_actors: null` to a reader without admin rights.

The body this build needs:

```json
{
  "name": "main",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "allowed_merge_methods": ["merge"] } },
    { "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          { "context": "Secret scan (gitleaks)", "integration_id": 15368 },
          { "context": "Build (gradlew build)",  "integration_id": 15368 },
          { "context": "API docs (Dokka)",       "integration_id": 15368 } ] } }
  ]
}
```

Call: `gh api -X POST repos/SpartanLaboratories/KotlinBottools/rulesets --input <file>`; success is 201 with the stored ruleset
(`id`, `source_type: Repository`). Read back with `gh api repos/SpartanLaboratories/KotlinBottools/rulesets/<id>` and
`gh api repos/SpartanLaboratories/KotlinBottools/rules/branches/main`. Updating is `PUT .../rulesets/{id}` with the full body.

Plan availability: "Rulesets are available in public repositories with GitHub Free and GitHub Free for organizations" (the page's
template tokens `prodname_free_user` and `prodname_free_team`), so a public repository in an organisation on the free plan needs no
paid plan. Observed: `GET orgs/SpartanLaboratories` reports `plan.name: free`; a ruleset on a private free-plan repository is
refused with a 403 (observed in an earlier read of this repository while it was private).

Sources: [REST rulesets](https://docs.github.com/en/rest/repos/rules#create-a-repository-ruleset),
[api.github.com.json](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json),
[gated-features/repo-rules.md](https://github.com/github/docs/blob/main/data/reusables/gated-features/repo-rules.md).

### F5. Strict policy, force-push and the default branch (consensus)

"Strict" means the **Require branches to be up to date before merging** box: "The topic branch **must** be up to date with the
base branch before merging", and it is the default for required checks. It costs a re-run of CI after every other merge.
`allow_update_branch=true` on the repository adds the "Update branch" button (default `false` here; not required by the build).
Blocking force pushes has a side effect worth knowing: "If force pushes are blocked, organization owners or repository
administrators will be unable to change or rename the default branch unless they are authorized to bypass the ruleset." With an
empty bypass list, a default-branch rename needs the ruleset edited first.

Sources: [available-rules-for-rulesets.md](https://github.com/github/docs/blob/main/content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets.md).

### F6. Merge methods: the repository call (consensus; current state observed)

`PATCH /repos/{owner}/{repo}` takes `allow_squash_merge`, `allow_merge_commit` and `allow_rebase_merge`, each a boolean defaulting
to `true`. To leave merge commits only:

```
gh api -X PATCH repos/SpartanLaboratories/KotlinBottools \
  -F allow_squash_merge=false -F allow_rebase_merge=false -F allow_merge_commit=true
```

It returns 200 with the full repository object. `-F` is needed so `gh` sends JSON booleans; `-f` would send the strings
"false" and "true". Read back with
`gh api repos/SpartanLaboratories/KotlinBottools --jq '{allow_squash_merge,allow_rebase_merge,allow_merge_commit}'`. Observed
now: all three `true`, with `merge_commit_title: MERGE_MESSAGE` and `merge_commit_message: PR_TITLE` (the classic "Merge pull
request #N from ..." title; nothing to change). The `pull_request` rule's `allowed_merge_methods: ["merge"]` enforces the same
choice in the ruleset, so a later settings toggle cannot silently re-allow squash. The settings write needs repository admin
rights.

Sources: [api.github.com.json, `PATCH /repos/{owner}/{repo}`](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json),
`gh api repos/SpartanLaboratories/KotlinBottools`.

### F7. Creating the Pages site with GitHub Actions as its source (consensus; read-back observed on both sibling repositories)

`POST /repos/{owner}/{repo}/pages` has a body schema that requires `source` **or** `build_type`; `build_type` is "The process in
which the Page will be built. Possible values are `legacy` and `workflow`." So `-f build_type=workflow` alone is valid. Responses:
201 on success (same schema as the GET), 409 conflict (a site already exists), 422 validation failure; the caller needs repository
admin, maintainer or the "manage GitHub Pages settings" permission. WebTools' own `pages.yml` header records this exact call
(`gh api -X POST repos/SpartanLaboratories/WebTools/pages -f build_type=workflow`). Switching an existing site is
`PUT .../pages` (204) with `build_type`.

Read back with `gh api repos/SpartanLaboratories/KotlinBottools/pages`. Both sibling repositories return, for a workflow site:
`"build_type":"workflow"`, `"source":{"branch":"master","path":"/"}` (the legacy field is filled in and ignored), `"status":null`,
`"public":true`, `"https_enforced":true` and an `html_url` of the form `https://<owner>.github.io/<repo>/`. Today this repository
answers 404 to that GET and `{"total_count":0,"environments":[]}` to `GET .../environments`.

Sources: [REST Pages](https://docs.github.com/en/rest/pages/pages), [api.github.com.json](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json),
[WebTools pages.yml](https://github.com/SpartanLaboratories/WebTools/blob/master/.github/workflows/pages.yml).

### F8. The `github-pages` environment and its deployment rules (practice; creation timing not established)

Both sibling repositories carry a `github-pages` environment whose deployment branch policy is custom, with one entry, the
default branch (`"custom_branch_policies":true,"protected_branches":false`; policy `{"name":"master","type":"branch"}`). So a
run of `pages.yml` from any other ref, a manual dispatch on a feature branch included, is refused at the deploy job; a tag push
cannot deploy. `actions/deploy-pages` documents the same: it "should target the `github-pages` environment" and, for a site whose
source is GitHub Actions, "we highly recommend you also [protect your environment][environment-protection] (we will configure it by default for you)". Not
established: whether the environment appears at `POST .../pages` or at the first deployment (this repository has none yet).
The settings step should read `GET .../environments/github-pages` and its `deployment-branch-policies` afterwards, and add a
`main` branch policy if the environment exists without one.

Sources: `gh api repos/SpartanLaboratories/WebTools/environments`, `.../environments/github-pages/deployment-branch-policies`;
[deploy-pages README at v5.0.1](https://github.com/actions/deploy-pages/blob/368f82528645a54fb793d4d04e342629a3f51346/README.md).

### F9. Actions: current releases and commits (consensus; read from the APIs on 2026-11-18)

Each commit was resolved with `gh api repos/<repo>/commits/<tag>`; the major tag points at the same commit today.

| Action | Latest release (date) | Commit | Runtime |
|---|---|---|---|
| `actions/checkout` | v7.0.1 (2026-07-20) | `3d3c42e5aac5ba805825da76410c181273ba90b1` | node24 |
| `actions/setup-java` | v6.3.0 (2026-11-14) | `d1374f8ac74474200d16ef8ecee22c7ae7a51880` | node24 |
| `gradle/actions` (`setup-gradle`, `wrapper-validation`) | v6.4.1 (2026-10-28) | `8da46b539cd8fe6ab27ca75128919a18d757604c` | node24 |
| `gradle/actions`, the v5 line | v5.0.2 (2026-02-23) | `0723195856401067f7a2779048b490ace7a47d7c` | n/a |
| `actions/upload-pages-artifact` | v5.0.0 (2026-04-10) | `fc324d3547104276b827a68afc52ff2a11cc49c9` | composite |
| `actions/deploy-pages` | v5.0.1 (2026-09-01) | `368f82528645a54fb793d4d04e342629a3f51346` | node24 |
| `actions/upload-artifact` | v7.0.2 (2026-10-07) | `cf430e030ddbb5b0abf93d22962f4752f3646cd9` | n/a |

`checkout` v7.0.1 is the commit this repository's secret scan already pins. `gradle/actions` v6.4.1 is a security fix of the
`dependency-submission` action only (advisory GHSA-chpw-2mqm-95cc, vulnerable `<= 6.4.0`); the `setup-gradle` path used by CI is
not what the advisory names. Pin on a full-length commit and verify it belongs to the action's repository, not a fork; GitHub's
guidance: "Pin references to actions to a commit SHA in your workflow files... When selecting a SHA, you should verify it is from
the action's repository and not a repository fork." The repository also has a platform switch for this:
`GET .../actions/permissions` returns `{"enabled":true,"allowed_actions":"all","sha_pinning_required":false}`, and
`sha_pinning_required` is "Whether actions must be pinned to a full-length commit SHA." Setting it is optional and outside what
this build needs.

### F10. `setup-gradle` v6 licence and wrapper validation (consensus on the facts; the licence reading is an open choice)

From v6 the action's default caching is "Enhanced Caching" through a proprietary component: the v6.0.0 notes say "By upgrading to
v6, you accept the Terms of Use for the `gradle-actions-caching` component", and the blog calls it "a closed-source library
distributed under our Terms of Use". The later `DISTRIBUTION.md` softens this: the component "is used only when enhanced caching
is enabled and is not loaded or used with basic caching or when caching is disabled", and `cache-provider: basic` selects the
MIT-licensed provider. Both caching tiers are free for public repositories. WebTools records its own choice in `ci.yml`: "setup-gradle
stays on v5: v6 moved its caching into a separately licensed component whose Terms of Use must be accepted on upgrade; v5 is
MIT-licensed and needs no acceptance." `validate-wrappers` is "When 'true' (the default) the action will automatically validate
all wrapper jars found in the repository"; v5 fetches unknown checksums from `services.gradle.org/versions/all` at run time, so an
old action does not reject a new wrapper. `setup-gradle` defaults that matter for permissions: `dependency-graph: disabled` (so no
`contents: write`), `add-job-summary-as-pr-comment: never` (so no `pull-requests: write`), and `cache-read-only` true on every
branch but the default branch (pull-request runs cannot write the cache).

Sources: [v6.0.0 release](https://github.com/gradle/actions/releases/tag/v6.0.0), [DISTRIBUTION.md at v6.4.1](https://github.com/gradle/actions/blob/8da46b539cd8fe6ab27ca75128919a18d757604c/DISTRIBUTION.md),
[Gradle's blog](https://blog.gradle.org/github-actions-for-gradle-v6),
[setup-gradle/action.yml at v6.4.1](https://github.com/gradle/actions/blob/8da46b539cd8fe6ab27ca75128919a18d757604c/setup-gradle/action.yml).

### F11. The Pages artifact and dot files (consensus)

`upload-pages-artifact` v4.0.0 ("Potentially breaking change: hidden files (specifically dotfiles) will not be included in the
artifact") and v5.0.0 keep that default. The v5 `action.yml` has the input
`include-hidden-files` (default `"false"`): "Include hidden files and directories (those starting with a dot) in the artifact.
Excludes .git and .github regardless." The archive step is `tar ... --exclude=.git --exclude=.github` plus
`--exclude=.[^/]*` unless the input is `true`. So `.nojekyll` at the site root is dropped unless the step sets
`include-hidden-files: true`; WebTools' `pages.yml` does exactly this with the comment "since v4 the artifact drops dotfiles;
.nojekyll must ship". MyGameTools' `pages.yml` is still on `upload-pages-artifact@v3`, which kept dot files, so copying it
unchanged onto v5 would lose `.nojekyll` silently. WebTools' comment is the only source for "this deployment runs no Jekyll"
(opinion): the file is a safeguard the organisation's standard requires either way.

### F12. Permissions per job (consensus)

"If you specify the access for any of these permissions, all of those that are not specified are set to `none`." A job-level
`permissions:` block therefore replaces the workflow default rather than adding to it. `deploy-pages` documents its minimum:
"The job that executes the deployment must at minimum have the following permissions: `pages: write`, `id-token: write`" and its
reference example sets them on the deploy job. `checkout` needs `contents: read`; `setup-java`, `setup-gradle` (with the defaults
above), `upload-artifact` and `upload-pages-artifact` need no scope. So: workflow default `contents: read`; the Pages build job
inherits it; the deploy job lists exactly `pages: write` and `id-token: write` (its `contents` becomes `none`, which it does not
need because it checks nothing out). The organisation's own standard requires this split, and the two prior-art `pages.yml` files
hold both scopes at workflow level (MyGameTools#142, WebTools#101).

### F13. Tag trigger globs (consensus for the grammar; matching of a lettered version not tested)

Filter patterns are GitHub's glob grammar, not regular expressions: `*` any characters except `/`, `**` any characters, `?` "Matches
zero or one of the preceding character", `+` "Matches one or more of the preceding character", `[]` a character class, `.` literal.
The documentation's own example is `v[12].[0-9]+.[0-9]+`, which "Matches all semantic versioning branches and tags with major
version 1 or 2" (`v1.10.1`, `v2.0.0`), and the patterns "are evaluated against the Git ref's name". So

```yaml
on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'
      - '[0-9]+.[0-9]+.[0-9]+'
```

matches `v1.0.0` and `1.0.0` and not `v1.0`, `v1.0.0-rc1`, `release-1.0.0` or `1.0.0.1`. The quotes are required: a bare scalar that
begins with `[` is a YAML flow sequence. A `branches:` key is absent, so branch pushes never start the workflow. Because the
grammar is easy to misread, the first step re-checks the name with a shell regex and fails closed (section 6). Two
platform limits apply: no event is created for tags "when more than three tags are pushed at once", and a push that creates both
`vX.Y.Z` and bare `X.Y.Z` runs the workflow twice.

The organisation's version rule allows a trailing letter on a bug fix (`1.5.2a`). Neither pattern above matches `1.5.2a`; matching it
needs a further pair such as `'v[0-9]+.[0-9]+.[0-9]+[a-z]'` and `'[0-9]+.[0-9]+.[0-9]+[a-z]'` (a character class followed by no
quantifier, so exactly one letter). Whether lettered tags belong to "a version tag" for this workflow is not stated in what this
build has been given (section 8).

Sources: [workflow-syntax.md, "Filter pattern cheat sheet"](https://github.com/github/docs/blob/main/content/actions/reference/workflows-and-actions/workflow-syntax.md),
[events-that-trigger-workflows.md](https://github.com/github/docs/blob/main/content/actions/reference/workflows-and-actions/events-that-trigger-workflows.md).

### F14. Building the tagged commit from a clean checkout (consensus)

On a `push` event `GITHUB_SHA` is the "Tip commit pushed to the ref", so for a tag push `actions/checkout` with no `ref:` checks out
exactly the tagged commit, shallow (one commit by default), on a fresh runner. Nothing carries over from another run, so the
checkout is the clean tree; the job then runs `./gradlew build verifyReleasableMetadata`. `persist-credentials: false` leaves no
token in the workspace (checkout v7 stores it in a file under `$RUNNER_TEMP` rather than `.git/config`, but the job needs none).
The tag name is attacker-influenced text: pass it to `run:` through `env:` and not through an inline `${{ github.ref_name }}`.

### F15. Concurrency (consensus)

A concurrency group has at most one running run; a newly queued run replaces any `pending` one "by default", and
`cancel-in-progress: true` additionally cancels the running one; `cancel-in-progress` may be an expression. So
`cancel-in-progress: ${{ github.event_name == 'pull_request' }}` cancels the superseded run of a pull request only, while a run on
`main` finishes and a newer push replaces only a run still queued behind it. For Pages, `cancel-in-progress: false` with a fixed
group `pages` lets a deployment finish; a pending deployment replaced by a newer one is harmless because the newer run publishes
the newer `main`. On a pull request `github.ref` is `refs/pull/<n>/merge`, so each pull request has its own group.

## 4. How comparable projects do it

- **MyGameTools** (`SpartanLabsGaming/MyGameTools`, `.github/workflows/{ci,pages,release}.yml`): `ci.yml` has five parallel jobs with
  explicit `name:`s (`Fast tests (component + deterministic)`, `API docs (Dokka)`, `Assemble`, and so on), `permissions: contents: read`,
  `concurrency: ci-${{ github.ref }}` with `cancel-in-progress: ${{ github.event_name == 'pull_request' }}`, upload of test reports
  `if: failure()`. Actions float on `@v4`. `pages.yml` is a two-job build/deploy with `pages: write` and `id-token: write` at workflow
  level (MyGameTools#142), `upload-pages-artifact@v3`, group `pages` with `cancel-in-progress: false`, and a guard that fails when
  `build/dokka/html/index.html` is missing. `release.yml` triggers on `tags: ["v*"]`, holds `contents: write` and creates a GitHub
  release with `gh release create` (MyGameTools#145), which is what this build's `release.yml` must not do.
- **WebTools** (`SpartanLaboratories/WebTools`, `.github/workflows/{ci,pages}.yml`): the same shape, with floating major tags
  `checkout@v7`, `setup-java@v6`, `setup-gradle@v5`, `upload-pages-artifact@v5` (with `include-hidden-files: true`) and
  `deploy-pages@v5`; its `pages.yml` still holds the Pages scopes at workflow level (WebTools#101) and records the
  `gh api -X POST .../pages -f build_type=workflow` call in its header.
- **okhttp** (`square/okhttp`, ruleset `main`, id 27361952): `refs/heads/main`, `deletion`, `non_fast_forward`, a `pull_request` rule
  with zero required approvals, and a `required_status_checks` rule listing 16 job-level contexts, every one pinned
  `integration_id: 15368`, matrix jobs by their displayed name (`jvm (21)`). It leaves `strict_required_status_checks_policy` false.
  This is the closest public analogue to the ruleset this build needs, minus the strict policy.
- **This repository's secret scan** pins `actions/checkout@3d3c42e5...` by commit with the comment "the tag can move, the commit cannot",
  `permissions: contents: read`, a `secret-scan-${{ github.ref }}` group and the same `cancel-in-progress` expression. `ci.yml` follows
  that file's conventions with different names.

Limit of this survey: two repositories of the organisation plus one external ruleset and the actions' own repositories. No wider
survey of Kotlin libraries' CI was done.

## 5. Pitfalls and regrets

- **A renamed job is a blocked merge.** The required context is a string match on the job name (F1). A pull request that renames
  `Build (gradlew build)` reports only the new name, and the ruleset waits for the old one. With no bypass actor the repair is to edit
  the ruleset first. Keep the three names fixed, and comment them in `ci.yml`. The alternative, one aggregate job whose name never
  changes (`needs: [build, docs]`, `if: always()`, fail unless every need succeeded), removes the coupling at the price of a third job;
  with two CI jobs it is not worth it, and it is a trap if written without `always()` (a skipped aggregate may not block, F2).
- **Do not require what can be skipped.** No `paths:` or `branches-ignore:` on `ci.yml`, no commit-message skip guards in use, and no `if:`
  on the required jobs. Docs-only pull requests still run both jobs.
- **`workflow_dispatch` checks do not count** (F2). Keep the trigger for on-demand runs, never for merging.
- **Two workflows, one job name.** GitHub's own tip warns about duplicate job names across workflows; none of the three workflows may
  reuse `Secret scan (gitleaks)`, and `pages.yml` should not reuse `Build (gradlew build)`.
- **Moving to `upload-pages-artifact` v4 or v5 from v3 drops `.nojekyll`** unless `include-hidden-files: true` is set (F11). The
  deployment still succeeds, so nothing fails.
- **Workflow-level Pages scopes** put `pages: write` and `id-token: write` in the job that runs third-party Gradle plugins (F12).
- **The release workflow must create nothing.** `contents: read` makes a stray `gh release create` fail rather than collide with the release
  process (MyGameTools#145).
- **Tag glob misreads.** Patterns are not regular expressions (`+` and `?` apply to the preceding character); an unquoted pattern that begins
  with `[` is a YAML list. Re-check the tag in the job. Pushing four or more tags together creates no event (F13).
- **Required checks must exist before they can pass.** Create the ruleset after `ci.yml` and the secret scan have each reported once on
  `main`; the settings are applied after the landing for that reason. A ruleset created earlier would simply wait on checks that the
  pull request has not produced yet.
- **Force-push blocking and the default branch.** With `non_fast_forward` active and no bypass actor, the default branch cannot be renamed
  or rewritten until the ruleset is edited (F5).
- **`setup-gradle` v6's default cache provider is the proprietary one.** Choose v5 or v6 with `cache-provider: basic` on purpose (F10).
- **Pages before its first deployment.** `deploy-pages` needs the site to exist with the Actions source; the exact error text of a deploy
  against a missing site was not read (section 8). Create the site before the landing that adds `pages.yml` runs on `main`.

## 6. Recommendation for this repository

Use job-level required checks, a ruleset (not classic branch protection), and commit-pinned actions.

**Why a ruleset.** It is available on public free-plan repositories, takes an empty bypass list, targets `~DEFAULT_BRANCH`, can restrict
merge methods itself, and has a read-back that lists the effective rules (`rules/branches/main`). Classic branch protection has no
`target` choice of branch, tag or push and no merge-method rule that this research found, and neither sibling repository has a
ruleset today, so the organisation has no precedent for either form to follow.

**`ci.yml`.** Triggers `push` and `pull_request` on `main`, plus `workflow_dispatch`; group `ci-${{ github.ref }}` with the
`pull_request`-only cancel expression (no collision with `secret-scan-…`); `permissions: contents: read`. Two parallel jobs with
fixed names, so each required check reports one context: `build` named `Build (gradlew build)` and `docs` named
`API docs (Dokka)`. Both use the pinned `checkout` (with `persist-credentials: false`), `setup-java` (`temurin`, `21`) and
`setup-gradle`, a `timeout-minutes`, and `--stacktrace`. The build job runs `./gradlew build`, uploading
`*/build/reports/` with `actions/upload-artifact` `if: failure()`. No matrix, no path filter. Wrapper validation comes from
`setup-gradle`'s default. A third job for the `build-logic` TestKit tests belongs here only if those tests are excluded from
`./gradlew build`, which this research did not establish.

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}
permissions:
  contents: read
jobs:
  build:
    # The ruleset requires this exact name; rename it only together with the ruleset.
    name: Build (gradlew build)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      # actions/checkout v7.0.1
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
        with:
          persist-credentials: false
      # actions/setup-java v6.3.0
      - uses: actions/setup-java@d1374f8ac74474200d16ef8ecee22c7ae7a51880
        with:
          distribution: temurin
          java-version: "21"
      # gradle/actions v5.0.2 (MIT; v6 bundles a separately licensed caching component)
      - uses: gradle/actions/setup-gradle@0723195856401067f7a2779048b490ace7a47d7c
      - run: ./gradlew build --stacktrace
      # actions/upload-artifact v7.0.2
      - if: failure()
        uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9
        with:
          name: build-reports
          path: "*/build/reports/"
  docs:
    name: API docs (Dokka)
    # same steps, ending in: ./gradlew dokkaGeneratePublicationHtml --stacktrace
```

**`pages.yml`.** `push` to `main` and `workflow_dispatch`; workflow default `permissions: contents: read`; group `pages` with
`cancel-in-progress: false`. A `build` job (inherits `contents: read`) runs Gradle, assembles `_site` (`website/` at the root,
`build/dokka/html` at `/api/`, failing if `build/dokka/html/index.html` is absent, `touch _site/.nojekyll`) and uploads it with
`actions/upload-pages-artifact@fc324d35...` and `include-hidden-files: true`. A `deploy` job (`needs: build`) sets
`permissions: { pages: write, id-token: write }`, `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`
and runs `actions/deploy-pages@368f8252...`. Name its jobs `Build site` and `Deploy to GitHub Pages`.

**`release.yml`.** `on.push.tags` the two quoted patterns of F13 (add the lettered pair if lettered versions are tagged);
`permissions: contents: read`; one job `Verify tagged build`: checkout, then a first step with `env: TAG: ${{ github.ref_name }}`
that runs `[[ "$TAG" =~ ^v?[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "::error::not a version tag"; exit 1; }`, then `setup-java`,
`setup-gradle` and `./gradlew build verifyReleasableMetadata --stacktrace`. No release, no artifact, no write scope, no concurrency
group.

**Settings, in this order after the landing** (each read back as shown): (1) `POST .../pages` with `build_type=workflow`, before the
first `pages.yml` run on `main`, then `GET .../pages` and `GET .../environments/github-pages` with its branch policies; (2)
`PATCH` the repository for merge commits only; (3) `POST .../rulesets` with the F4 body once both workflows have reported on `main`,
then `GET .../rules/branches/main`.

**Rejected:** floating `@v7`-style tags (a moved tag runs new code unreviewed, and the organisation already pins `checkout` by
commit); an aggregate gate job (extra job, extra failure mode, no gain at two checks); omitting `integration_id` (lets a plain
commit status satisfy a required check); a workflow-level `pages: write` as the prior art does.

## 7. Load-bearing claims

1. **Check name = job name; the workflow name is not part of it.** "**Workflow**: The name format is `<job name>`." and "Required status
   checks do not take workflow, matrix, or event trigger types into account." —
   [troubleshooting-rules.md](https://github.com/github/docs/blob/main/content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/troubleshooting-rules.md),
   default branch, read 2026-11-18.
2. **A job without `name:` reports its id; a matrix job reports `<id> (<values>)`.** Verbatim API output, check-run names on
   `actions/checkout` commit `3d3c42e5aac5ba805825da76410c181273ba90b1`: `build | test (macos-latest) | test (ubuntu-latest) |
   test (windows-latest) | test-proxy` (workflow `test.yml` declares jobs `build` and `test` with a `runs-on` matrix and no `name:`).
   `gh api repos/actions/checkout/commits/3d3c42e5aac5ba805825da76410c181273ba90b1/check-runs`, read 2026-11-18.
3. **This repository's check is reported as `Secret scan (gitleaks)` by GitHub Actions, app id 15368.** Verbatim:
   `{"app":"github-actions","app_id":15368,"conclusion":"success","name":"Secret scan (gitleaks)"}` —
   `gh api repos/SpartanLaboratories/KotlinBottools/commits/0c7c9ca593098d60519831d6936fc8fb2c7bc51a/check-runs`, 2026-11-18.
4. **A workflow skipped by a filter leaves required checks Pending; a skipped job reports Success.** "A workflow is skipped by path
   filtering, branch filtering, or a commit message | Associated checks stay in a "Pending" state and block merging | Avoid requiring
   workflows that can be skipped." and "A job is skipped by a conditional | The job reports "Success"" —
   [troubleshooting-required-status-checks.md](https://github.com/github/docs/blob/main/content/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks.md), 2026-11-18.
5. **`workflow_dispatch` runs do not satisfy a required check.** "if a workflow is triggered by `workflow_dispatch` on a pull request's head
   branch, checks reported by its jobs do not appear in the pull request's checks section. Even if the checks pass for the head
   commit, they do not satisfy a required status check in a branch ruleset." — same file, 2026-11-18.
6. **Required checks bind pushes, and the pull request rule bars direct pushes.** "Choose which status checks must pass before the ref
   is updated. When enabled, commits must first be pushed to another ref where the checks pass." and "Require all commits be made to a
   non-target branch and submitted via a pull request before they can be merged." —
   [api.github.com.json](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json)
   (`repository-rule-required-status-checks`, `repository-rule-pull-request`), 2026-11-18.
7. **Ruleset body fields.** "Array of ref names or patterns to include. One of these patterns must match for the condition to pass. Also
   accepts `~DEFAULT_BRANCH` to include the default branch or `~ALL` to include all branches." and "The optional integration ID that this
   status check must originate from." and "Whether pull requests targeting a matching branch must be tested with the latest code." —
   same file (`repository-ruleset-conditions`, `repository-rule-params-status-check-configuration`,
   `repository-rule-required-status-checks`), 2026-11-18.
8. **A real public ruleset of this shape exists and reads back as such.** Verbatim excerpt, `square/okhttp` ruleset 27361952:
   `"conditions":{"ref_name":{"exclude":[],"include":["refs/heads/main"]}},"enforcement":"active"` ... `"required_approving_review_count":0`
   ... `{"context":"jvm (21)","integration_id":15368}` ... `"strict_required_status_checks_policy":false` — `gh api repos/square/okhttp/rulesets/27361952`,
   2026-11-18.
9. **Rulesets are available on public repositories of free organisations.** "Rulesets are available in public repositories with
   {% data variables.product.prodname_free_user %} and {% data variables.product.prodname_free_team %} for organizations" —
   [gated-features/repo-rules.md](https://github.com/github/docs/blob/main/data/reusables/gated-features/repo-rules.md), 2026-11-18.
   The organisation is on the free plan: `{"filled_seats":1,"name":"free",...}` from `gh api orgs/SpartanLaboratories --jq .plan`.
10. **Strict checks and force-push blocking.** "The topic branch **must** be up to date with the base branch before merging." and "If force
    pushes are blocked, organization owners or repository administrators will be unable to change or rename the default branch unless
    they are authorized to bypass the ruleset." —
    [available-rules-for-rulesets.md](https://github.com/github/docs/blob/main/content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets.md), 2026-11-18.
11. **Merge-method fields.** "Either `true` to allow squash-merging pull requests, or `false` to prevent squash-merging." and "Either
    `true` to allow rebase-merging pull requests, or `false` to prevent rebase-merging." and "Either `true` to allow merging pull
    requests with a merge commit, or `false` to prevent merging pull requests with merge commits." —
    [api.github.com.json](https://github.com/github/rest-api-description/blob/main/descriptions/api.github.com/api.github.com.json)
    (`PATCH /repos/{owner}/{repo}`), 2026-11-18.
12. **Pages create takes `build_type` alone.** "The process in which the Page will be built. Possible values are `"legacy"` and
    `"workflow"`." with the request schema `"anyOf":[{"required":["source"]},{"required":["build_type"]}]` — same file
    (`POST /repos/{owner}/{repo}/pages`), 2026-11-18. WebTools' header: "gh api -X POST repos/SpartanLaboratories/WebTools/pages -f
    build_type=workflow" —
    [pages.yml](https://github.com/SpartanLaboratories/WebTools/blob/master/.github/workflows/pages.yml), 2026-11-18. Read-back, verbatim:
    `"build_type":"workflow","source":{"branch":"master","path":"/"},"public":true,"https_enforced":true` — `gh api repos/SpartanLaboratories/WebTools/pages`.
13. **The `github-pages` environment is limited to the default branch on the sibling repositories.** Verbatim:
    `{"total_count":1,"branch_policies":[{"id":65995056,"node_id":"MDE2OkdhdGVCcmFuY2hQb2xpY3k2NTk5NTA1Ng==","name":"master","type":"branch"}]}` —
    `gh api repos/SpartanLaboratories/WebTools/environments/github-pages/deployment-branch-policies`, 2026-11-18. And deploy-pages: "The
    deployment should target the `github-pages` environment" and "If your Pages site is using GitHub Actions as the source, while not
    required we highly recommend you also [protect your environment][environment-protection] (we will configure it by default for you)." —
    [README at v5.0.1](https://github.com/actions/deploy-pages/blob/368f82528645a54fb793d4d04e342629a3f51346/README.md).
14. **deploy-pages permissions.** "The job that executes the deployment must at minimum have the following permissions: - `pages: write` -
    `id-token: write`" — same README, v5.0.1.
15. **A job `permissions:` block zeroes the unspecified scopes.** "If you specify the access for any of these permissions, all of those that
    are not specified are set to `none`." —
    [workflow syntax, `permissions`](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax), 2026-11-18.
16. **Pages artifact input and v4 change.** "Include hidden files and directories (those starting with a dot) in the artifact. Excludes .git and
    .github regardless." (default `"false"`) —
    [action.yml at v5.0.0](https://github.com/actions/upload-pages-artifact/blob/fc324d3547104276b827a68afc52ff2a11cc49c9/action.yml);
    "Potentially breaking change: hidden files (specifically dotfiles) will not be included in the artifact" —
    [v4.0.0 release](https://github.com/actions/upload-pages-artifact/releases/tag/v4.0.0).
17. **Releases and commits.** From the releases API and `gh api repos/<repo>/commits/<tag> --jq .sha`, 2026-11-18: `actions/checkout` v7.0.1
    `3d3c42e5aac5ba805825da76410c181273ba90b1`; `actions/setup-java` v6.3.0 `d1374f8ac74474200d16ef8ecee22c7ae7a51880`; `gradle/actions` v6.4.1
    `8da46b539cd8fe6ab27ca75128919a18d757604c`, v5.0.2 `0723195856401067f7a2779048b490ace7a47d7c`; `actions/upload-pages-artifact` v5.0.0
    `fc324d3547104276b827a68afc52ff2a11cc49c9`; `actions/deploy-pages` v5.0.1 `368f82528645a54fb793d4d04e342629a3f51346`;
    `actions/upload-artifact` v7.0.2 `cf430e030ddbb5b0abf93d22962f4752f3646cd9`.
18. **`gradle/actions` v6 licence.** "By upgrading to v6, you accept the [Terms of Use](https://gradle.com/legal/terms-of-use/) for the
    `gradle-actions-caching` component." —
    [v6.0.0 release](https://github.com/gradle/actions/releases/tag/v6.0.0). "The `gradle-actions-caching` component is used only when
    enhanced caching is enabled and is not loaded or used with basic caching or when caching is disabled." —
    [DISTRIBUTION.md at v6.4.1](https://github.com/gradle/actions/blob/8da46b539cd8fe6ab27ca75128919a18d757604c/DISTRIBUTION.md).
    "setup-gradle stays on v5: v6 moved its caching into a separately licensed component whose Terms of Use must be accepted on upgrade;
    v5 is MIT-licensed and needs no acceptance." —
    [WebTools ci.yml](https://github.com/SpartanLaboratories/WebTools/blob/master/.github/workflows/ci.yml).
19. **Wrapper validation is on by default in `setup-gradle`.** "When 'true' (the default) the action will automatically validate all wrapper jars
    found in the repository. If the wrapper checksums are not valid, the action will fail." —
    [setup-gradle/action.yml at v6.4.1](https://github.com/gradle/actions/blob/8da46b539cd8fe6ab27ca75128919a18d757604c/setup-gradle/action.yml).
    The same file defaults `dependency-graph` to `'disabled'` and `add-job-summary-as-pr-comment` to `'never'`.
20. **Filter pattern grammar.** "`?`: Matches zero or one of the preceding character." and "`+`: Matches one or more of the preceding character."
    and the example `v[12].[0-9]+.[0-9]+` — "Matches all semantic versioning branches and tags with major version 1 or 2." —
    [workflow-syntax.md](https://github.com/github/docs/blob/main/content/actions/reference/workflows-and-actions/workflow-syntax.md),
    "Filter pattern cheat sheet", 2026-11-18.
21. **Tag events and three-tag limit; `GITHUB_SHA` on push.** "Events will not be created for tags when more than three tags are pushed at
    once." and "Tip commit pushed to the ref." —
    [events-that-trigger-workflows.md](https://github.com/github/docs/blob/main/content/actions/reference/workflows-and-actions/events-that-trigger-workflows.md), 2026-11-18.
22. **Concurrency semantics.** "By default, any existing `pending` job or workflow in the same concurrency group will be canceled and the new
    queued job or workflow will take its place." and "To also cancel any currently running job or workflow in the same concurrency group,
    specify `cancel-in-progress: true`." —
    [actions-group-concurrency.md](https://github.com/github/docs/blob/main/data/reusables/actions/actions-group-concurrency.md), 2026-11-18.
23. **Pinning guidance and the platform switch.** "Pin references to actions to a commit SHA in your workflow files." and "When selecting a SHA,
    you should verify it is from the action's repository and not a repository fork." —
    [secure-use.md](https://github.com/github/docs/blob/main/content/actions/reference/security/secure-use.md) and
    [actions-pin-commit-sha.md](https://github.com/github/docs/blob/main/data/reusables/actions/actions-pin-commit-sha.md); "Whether actions must be
    pinned to a full-length commit SHA." (`sha_pinning_required`) —
    [REST Actions permissions](https://docs.github.com/en/rest/actions/permissions#set-github-actions-permissions-for-a-repository).

## 8. Gaps

- **Lettered tags.** The organisation's version rule allows a trailing letter on a bug-fix version (`1.5.2a`). The requirement given matches
  `vX.Y.Z` and bare `X.Y.Z` only, so a lettered tag would not start `release.yml`. Whether a lettered tag is a "version tag" for this workflow
  is a question the requirements leave open. The `[a-z]` pair in F13 is written from the documented grammar and was not run against GitHub's
  matcher.
- **Matcher semantics untested.** The patterns in F13 follow the documented cheat sheet, including the claim that they match the whole ref
  name; nothing here ran a tag through GitHub's matcher. The in-job regex guard exists because of that.
- **Ruleset behaviour on a direct push.** The schema text says required checks apply "before the ref is updated", and the `pull_request` rule bars
  direct pushes; the exact push-error text of a ruleset (as against branch protection's GH006) was not read, and no push was attempted.
- **When the `github-pages` environment is created** (at `POST .../pages` or at the first deployment) and whether it is created with a default-branch
  policy is not established; both sibling repositories already have it. The text of the failure when `deploy-pages` runs against a repository whose
  Pages site does not exist was not read.
- **`deploy-pages` with a job-level permissions block listing only `pages` and `id-token`.** The README's own example does this; it was not run
  here. A private repository would also need `contents: read` in that block; this repository is public.
- **Whether admins can still edit a ruleset with an empty bypass list**, and so how a job rename or a default-branch rename is repaired, is a
  reading of GitHub's model, not a sourced statement.
- **Licence reading for `setup-gradle` v6** (v5.0.2 against v6.4.1 with `cache-provider: basic`) is a choice that turns on how the organisation
  reads two Gradle statements that differ in strength (the release note's blanket sentence against `DISTRIBUTION.md`). Neither was legally
  assessed. v5.0.2 is the option with no ambiguity and matches WebTools.
- **Not read:** whether `./gradlew build` already includes `dokkaGeneratePublicationHtml`, the `build-logic` TestKit tests and
  `verifyReleasableMetadata` (the plan's other research settles those); whether `build` needs full git history or tags (the checkout is shallow);
  whether Dependabot for `github-actions` is configured or wanted to keep the commit pins current (a comment with the tag beside each pin is what
  a bump tool reads; this was not researched); and whether `sha_pinning_required` also applies to actions nested inside composite actions.
- **Survey breadth.** The comparison is MyGameTools, WebTools, this repository's secret scan and one external ruleset; no wider survey of Kotlin
  or JVM libraries' CI and release verification was made.
