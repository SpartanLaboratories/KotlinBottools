# Fresh repository: creation, settings and read-backs

Findings file for question 1 of [`README.md`](README.md). Observations marked **observed** were made on 2026-11-09 (local
time; the clock of the API's own timestamps was already 2026-11-10 UTC) with `gh` 2.100.0 on Windows Git Bash, using reads
only (GET requests and GraphQL queries); nothing was written to GitHub. The unit's tools are `gh api` in Git Bash and
Python 3 standard-library scripts, not Kotlin, so the Kotlin lens does not apply. Tiers: **documented** = GitHub's own
reference, docs or schema; **source** = what a mature tool's code visibly does; **observed** = measured here;
**opinion** = one source's statement.

## 1. Question

How is a new private, empty repository `KotlinBottools-next` created in the `SpartanLaboratories` organisation (GitHub Free,
token with scopes `gist, project, read:org, repo, workflow`) and given the settings of the old `KotlinBottools` except that
its wiki is off and its default workflow permissions are `read`, and how is each setting read back by repository id? The
answer must give, for every setting, the call, the field and its type, whether creation accepts it, what a new repository
has without it and which read shows it; must say what the default branch is after one mirror push creates several
branches and whether setting it on an empty repository is refused; must say what the Free plan and a private repository
change, what survives the later rename and the later change to public, and what `security_and_analysis` shows; and must
end in literal commands.

## 2. Bottom line

- **Create minimal, apply settings with one `PATCH` and two `PUT`s on the still-empty repository, set `default_branch`
  after the push.** `POST orgs/{org}/repos` accepts only part of what is needed: it has no `default_branch`,
  `allow_update_branch`, `web_commit_signoff_required`, `allow_forking` or `has_discussions` (REST has no discussions
  switch at all), and the Actions permissions are separate endpoints. Creation therefore sends only `name`, `private=true`
  and `auto_init=false`. This is also what the Terraform GitHub provider does (create, then an update call).
- **A new private repository in this organisation already has almost every required value** (observed on the repository
  created the same way on 2026-11-09): merge settings, `MERGE_MESSAGE`/`PR_TITLE`, `COMMIT_OR_PR_TITLE`/`COMMIT_MESSAGES`,
  issues on, projects on, discussions off, wiki off, auto-merge off, delete-branch-on-merge off, no description, homepage
  or topics, Actions enabled for all actions, one administrator, no team. The two values that are **not** the required
  ones are the default workflow permissions (`write`, because the organisation default is `write`) and, until the
  later publication, forking (`false`). The settings request still writes every value, so the result does not depend on
  today's defaults.
- **Read the wiki with GraphQL as well as REST.** On a private repository of a Free organisation REST `has_wiki` reports
  `false` whatever is stored; GraphQL `hasWikiEnabled` shows the stored value (observed on three private repositories where
  the two differ). For `KotlinBottools-next` both read `false`.
- **`default_branch` is a post-push `PATCH` that is read back, never relied on.** GitHub does not document which branch
  becomes the default when one push creates several branches in an empty repository. The repository already names `main`
  (observed on an empty one) and the push creates `main`, but the topic branch sorts before `main`. Setting
  `default_branch` before a branch exists is refused with a 422 whose text says to push the ref first (a 2019 report; not
  observed in 2026), so it is sent only after the push.
- **Nothing here needs more than the `repo` scope.** Repository-level workflow permissions `read` cannot be blocked by an
  organisation default: the documented conflict is only that a *more restrictive* organisation default disables the
  *permissive* choice (the organisation here is `write`). The organisation's own Actions settings cannot be read with this
  token (observed 403 asking for `admin:org`), so the organisation default is inferred from what new repositories receive.
- **Forking cannot be set while the repository is private** (the organisation disallows forking of private repositories,
  and the documentation makes that a precondition for the per-repository switch). It reads `false` now and is `true` as a
  public repository, which is how the old repository reads. The later publication unit re-reads it.
- **GraphQL is not an alternative.** `createRepository` and `updateRepository` have no merge settings, no default branch and
  no Actions; GraphQL is used only to read `hasWikiEnabled`, `forkingAllowed`, `isEmpty` and `defaultBranchRef`, and as the
  contingency write for discussions.

## 3. Findings

### 3.1 The old repository's values (observed, id 562658298, public, 2026-11-09)

`gh api repos/SpartanLaboratories/KotlinBottools`: `default_branch` `main`; `has_issues` true; `has_projects` true;
`has_wiki` **true**; `has_discussions` false; `has_pages` false; `allow_forking` true; `allow_merge_commit`,
`allow_squash_merge`, `allow_rebase_merge` true; `allow_auto_merge` false; `delete_branch_on_merge` false;
`allow_update_branch` false; `web_commit_signoff_required` false; `merge_commit_title` `MERGE_MESSAGE`,
`merge_commit_message` `PR_TITLE`; `squash_merge_commit_title` `COMMIT_OR_PR_TITLE`, `squash_merge_commit_message`
`COMMIT_MESSAGES`; `use_squash_pr_title_as_default` false; `description` and `homepage` null; `topics` `[]`;
`security_and_analysis`: `dependabot_security_updates`, `secret_scanning`, `secret_scanning_non_provider_patterns`,
`secret_scanning_push_protection`, `secret_scanning_validity_checks`, each `{"status":"disabled"}`.
`actions/permissions`: `{"enabled":true,"allowed_actions":"all","sha_pinning_required":false}`.
`actions/permissions/workflow`: `{"default_workflow_permissions":"write","can_approve_pull_request_reviews":false}`.
`collaborators` (default affiliation): the organisation's administrator, `role_name` `admin`; with `affiliation=direct`: `[]`;
`teams`: `[]`; `invitations`: 0.

Two things differ from the design's description of this repository. The REST `has_wiki` was `false` while the repository was
private (earlier research, [§3.10](../../research/github-residual-exposure-and-visibility.md): "`has_wiki` false") and is
`true` now that it is public; GraphQL `hasWikiEnabled` is `true` now (so the wiki was stored on and masked while private,
see 3.6). So the new repository's "wiki off" is a real change of the stored value, not a copy. And the administrator is
listed only under `affiliation=all`: the administrator's access is the organisation owner's, not a direct grant, so
"the only direct collaborator" reads as "the only collaborator listed, with no direct grant and no team".

### 3.2 What a new private repository of this organisation has (observed)

Source: the repository created on 2026-11-09 as `phase0-rehearsal-b` by `POST orgs/SpartanLaboratories/repos` with
`name`, `private=true`, `auto_init=false`, `has_issues=true` (see
[fixture-and-read-api-forms §3.1.1](../../22-transfer-rehearsal/research/fixture-and-read-api-forms.md)), later renamed
`phase0-rehearsal-a` and archived: id **1450918337**, node id `R_kgDOVntBwQ`. Read by id on 2026-11-09:

| Setting | Value read | Read from |
|---|---|---|
| default branch | `main`, with no branch: `size` 0, `branches` length 0, GraphQL `defaultBranchRef` null | `default_branch`; `branches`; `defaultBranchRef` |
| issues / projects / discussions | true / true / false | `has_issues`, `has_projects`, `has_discussions` |
| wiki | false (REST and GraphQL) | `has_wiki`; `hasWikiEnabled` |
| merge commit / squash / rebase | true / true / true | `allow_merge_commit`, `allow_squash_merge`, `allow_rebase_merge` |
| auto-merge / delete branch / update branch / web sign-off | false / false / false / false | `allow_auto_merge`, `delete_branch_on_merge`, `allow_update_branch`, `web_commit_signoff_required` |
| merge title and message | `MERGE_MESSAGE`, `PR_TITLE` | `merge_commit_title`, `merge_commit_message` |
| squash title and message | `COMMIT_OR_PR_TITLE`, `COMMIT_MESSAGES`; `use_squash_pr_title_as_default` false | `squash_merge_commit_title`, `squash_merge_commit_message`, `use_squash_pr_title_as_default` |
| forking | false | `allow_forking`; GraphQL `forkingAllowed` |
| description / homepage / topics | null / null / `[]` | `description`, `homepage`, `topics` |
| `security_and_analysis` | **null** | `security_and_analysis` |
| Actions | `enabled` true, `allowed_actions` `all`, `sha_pinning_required` false | `actions/permissions` |
| default workflow permissions | **`write`**; `can_approve_pull_request_reviews` false | `actions/permissions/workflow` |
| collaborators / teams / invitations | the administrator only, `admin` (none under `affiliation=direct`) / `[]` / 0 | `collaborators`, `teams`, `invitations` |

The second repository the organisation created that day (id **1450917603**, created public with `auto_init`, then made
private and archived) reads the same on every row except `has_wiki`, which is REST `false` and GraphQL `true`. The two
older private repositories read the same way on the rows checked (`Support`, `TrumpBot`: REST `has_wiki` false, GraphQL
`hasWikiEnabled` true, `allow_forking` false, `security_and_analysis` null, workflow permissions `write`).

**Caveats on these observations.** All were taken from repositories that have since been renamed and archived (and, for
1450917603, made private): "When a repository is archived, its issues, pull requests, code, labels, milestones, projects,
wiki, releases, commits, tags, branches, reactions, code scanning alerts, comments and permissions become read-only."
Archiving does not rewrite settings, and every endpoint answered 200, but the values are the state *after* rename and
archive, not the creation response. The rows describe what a repository created this way receives; they do not prove the
creation response had the same values, which is why the settings request writes each value and reads it back.

### 3.3 Which call sets which setting (documented)

REST description at `github/rest-api-description` commit `fa8d7bfb041cc9ef90ac51dcb8ed8cc8a0007166` (2026-11-10 UTC),
`api.github.com.2022-11-28.json`, operations `repos/create-in-org`, `repos/update`,
`actions/set-github-actions-permissions-repository`, `actions/set-github-actions-default-workflow-permissions-repository`.

| Setting | Setting call and field (type) | In `POST orgs/{org}/repos`? | Documented default | Read-back field |
|---|---|---|---|---|
| private, no commit | `private` (boolean), `auto_init` (boolean) | yes | `false`, `false` | `private`, `visibility`, `size`, `branches` |
| default branch | `PATCH repos/{o}/{r}` `default_branch` (string) | **no** | none | `default_branch`, GraphQL `defaultBranchRef.name` |
| issues | `has_issues` (boolean) | yes | `true` | `has_issues` |
| projects | `has_projects` (boolean); "If you're creating a repository in an organization that has disabled repository projects, the default is `false`, and if you pass `true`, the API returns an error" | yes | `true` | `has_projects` |
| wiki | `has_wiki` (boolean) | yes | `true` | `has_wiki` **and** GraphQL `hasWikiEnabled` |
| discussions | none in REST; GraphQL `updateRepository` `hasDiscussionsEnabled` (Boolean) | no | off (observed) | `has_discussions`; GraphQL `hasDiscussionsEnabled` |
| merge, squash, rebase allowed | `allow_merge_commit`, `allow_squash_merge`, `allow_rebase_merge` (boolean) | yes | `true` | same names |
| auto-merge | `allow_auto_merge` (boolean) | yes | `false` | same |
| delete branch on merge | `delete_branch_on_merge` (boolean; creation: "The authenticated user must be an organization owner to set this property to `true`") | yes | `false` | same |
| update branch | `allow_update_branch` (boolean) | **no** | `false` | same |
| web commit sign-off | `web_commit_signoff_required` (boolean) | **no** | `false` | same |
| forking | `allow_forking` (boolean; "Either `true` to allow private forks, or `false` to prevent private forks") | **no** | see 3.5 | `allow_forking`; GraphQL `forkingAllowed` |
| merge title, message | `merge_commit_title` (`PR_TITLE`/`MERGE_MESSAGE`), `merge_commit_message` (`PR_BODY`/`PR_TITLE`/`BLANK`) (strings) | yes | none stated | same |
| squash title, message | `squash_merge_commit_title` (`PR_TITLE`/`COMMIT_OR_PR_TITLE`), `squash_merge_commit_message` (`PR_BODY`/`COMMIT_MESSAGES`/`BLANK`) (strings) | yes | none stated | same |
| squash PR-title flag | `use_squash_pr_title_as_default` (boolean), "This property is closing down. Please use `squash_merge_commit_title` instead." | yes | `false` | same; read only |
| description, homepage | `description`, `homepage` (strings) | yes | none | `description`, `homepage` (null) |
| topics | `PUT repos/{o}/{r}/topics` (`names`, array) | no | none | `topics`; `GET repos/{o}/{r}/topics` |
| Actions on, allowed actions | `PUT repos/{o}/{r}/actions/permissions`: `enabled` (boolean, required), `allowed_actions` (`all`/`local_only`/`selected`), `sha_pinning_required` (boolean) | no | enabled, `all` (observed) | `GET .../actions/permissions` |
| default workflow permissions; Actions approving PRs | `PUT repos/{o}/{r}/actions/permissions/workflow`: `default_workflow_permissions` (`read`/`write`), `can_approve_pull_request_reviews` (boolean) | no | inherited from the organisation (`write` here); `false` | `GET .../actions/permissions/workflow` |
| collaborators, teams | no write needed | no | creator only | `GET .../collaborators`, `.../teams`, `.../invitations` |

`PUT` on both Actions endpoints answers `204` with no body (`409` on the workflow endpoint: "Conflict response when changing
a setting is prevented by the owning organization"). `PATCH repos/{o}/{r}` accepts a partial body (`gh repo edit` sends
`{"visibility":"public"}` alone: [earlier research §3.8](../../research/github-residual-exposure-and-visibility.md)); the
body also has `name`, and sending it renames the repository, so the settings request never sends `name`.

**Tokens (documented).** Creating a private organisation repository: "`repo` scope to create a private repository"; the
update: no scope is stated beyond the endpoint's own permission (administrator); both Actions `PUT`s and `GET`s: "need the
`repo` scope"; collaborators: "need the `read:org` and `repo` scopes". The token has all of these, so no call needs
`admin:org`, `workflow` or `delete_repo`. The organisation's own Actions endpoints (`orgs/{org}/actions/permissions` and
`.../workflow`) answered 403 "You must be an org admin or have the actions policies fine-grained permission" with
"needs the `admin:org` scope" (observed), so the organisation's default cannot be read with this token and nothing in the
procedure reads it. One consequence: the token cannot delete a repository created in error; recovery from a wrong name
is a rename, so the creation request first reads the name and finds it free (observed 404 on 2026-11-09).

### 3.4 Default workflow permissions and the organisation default (documented, observed)

- Documented: "By default, when you create a new repository in your personal account, `GITHUB_TOKEN` only has read access for
  the `contents` and `packages` scopes. If you create a new repository in an organization, the setting is inherited from
  what is configured in the organization settings." and "If your repository belongs to an organization and a more
  restrictive default has been selected in the organization settings, the same option is selected in your repository
  settings and the permissive option is disabled." So the only blocked direction is repository `write` under an
  organisation default of `read`. `read` is the most restrictive value, so `PUT .../workflow` with `read` is accepted
  whatever the organisation chose; the documented refusal (`409`) is "prevented by the owning organization". This is
  inference from those two sentences plus the response list, not an observed `PUT` (none was sent).
- Documented: the 2023-02-02 change made new organisations' repositories inherit a `read` default but "will not impact
  any existing enterprises, organizations or repositories." The organisation was created 2022-09-22 (observed), and every
  repository read, new or old, has `write`, so the organisation default is `write`. That is why the new repository
  needs the explicit `PUT`.
- `can_approve_pull_request_reviews` is `false` on every repository read; the explicit `false` is written anyway.

### 3.5 Forking, the plan and a private repository (documented, observed)

- Documented: "An organization owner must allow forks of private repositories on the organization level before you can
  allow or disallow forks for a specific repository." and "By default, new organizations are configured to disallow the
  forking of private repositories." Observed: the organisation reads `members_can_fork_private_repositories` false, and
  every private repository in it reads `allow_forking` false.
- Not established: whether `PATCH ... allow_forking=true` on the private repository is refused (a 4xx) or silently
  ignored; it was not sent. The organisation setting that would allow it needs `admin:org`, which the token lacks, and
  changing an organisation policy is outside this unit. Terraform's provider only sends `allow_forking` for non-public
  repositories and otherwise leaves it out ("only configure allow forking if repository is not public").
- Documented for the later publication: changing private to public means "Anyone can fork your repository." The old
  public repository reads `allow_forking` true, `forkingAllowed` true. "Forking as the old repository has it" therefore
  holds from publication on, with no write in this unit; the publication unit re-reads `allow_forking`.

### 3.6 The wiki on a private repository of a Free organisation (documented, observed)

- Documented: "Wikis are available in public repositories with GitHub Free and GitHub Free for organizations, and in public
  and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud and GitHub Enterprise Server" (the
  availability line of the wiki pages; the source file writes the plan names as template variables).
- Observed, four private repositories: where the stored value is on (1450917603, `Support`, `TrumpBot`), REST `has_wiki`
  reads `false` and GraphQL `hasWikiEnabled` reads `true`, in the same minute. Where it was never on (1450918337), both read
  `false`. And the old repository's REST `has_wiki` changed from false (private) to true (public) with GraphQL true now.
  Reading: REST reports the wiki as off for a private Free repository whatever is stored; GraphQL reports the stored value.
  This is an inference from the observations, not a documented behaviour.
- Consequences: (1) REST `has_wiki: false` is not proof of "wiki off" while the repository is private; the read-back also
  requires GraphQL `hasWikiEnabled: false`. (2) A repository created private here starts with the stored value off (observed on
  1450918337), and the request writes `has_wiki=false` as well. (3) Whether `PUT has_wiki=false` is stored or ignored on a
  private Free repository is not observable without a write; with GraphQL already `false` it does not matter, and the
  publication unit re-reads both fields. When a wiki is turned off "the content is hidden, but not erased", so there is
  nothing to lose.

### 3.7 `security_and_analysis` (observed, documented)

A private repository of this Free organisation reports `security_and_analysis: null` (1450918337, 1450917603, `Support`,
`TrumpBot`, and the old repository while it was private: earlier research §3.8). The same repository as a public one reports
the object of five `{"status":"disabled"}` entries (3.1). The read-back therefore expects `null` now; a `null` is correct, not
a missing field. The unit changes none of it; the publication unit expects the object to appear, with the five statuses
`disabled` unless something enables them (the 2024 default-on change excludes organisation repositories, as the earlier
research records).

### 3.8 The default branch of an empty repository and the first push (documented, opinion, observed)

- Observed: the empty repository (1450918337) names its default branch: REST `default_branch` is `main`, `size` 0,
  `branches` length 0, GraphQL `defaultBranchRef` null (no branch yet). The organisation's `default_repository_branch`
  reads `main`.
- Documented: "To change the default branch, your repository must have more than one branch." (docs, *Changing the default
  branch*). Reported (a GitHub Community thread, 2019): a `PATCH` naming a branch that does not exist returns 422 with "The
  branch new_branch was not found. Please push that ref first or create it via the Git Data API."; the same thread says
  `name` was not needed when naming the branch that is already the default. This 422 was not reproduced in 2026 (no write).
- **Which branch becomes the default when one mirror push creates `main` and a topic branch: not documented.** One
  source (**opinion**, the description of a pull request in a third-party repository, no live test) says "GitHub makes the first
  branch pushed to an empty repo its default." A push of several refs has no documented "first". The configured name is
  already `main` and `main` is among the pushed branches, so `main` is the expected result, but `git push --mirror` sends
  the refs in name order and the topic branch's name sorts before `main`, so the opinion above would give the other answer.
  The procedure treats the result as unknown: after the push it reads `default_branch`, sends `PATCH default_branch=main`
  (a no-op if it is already `main`), and reads again. With two branches present the documented precondition is met.
- Not established: whether `PATCH default_branch=main` with `main` already the default answers 200 (the 2019 thread suggests
  so) or an error; the first run shows it. The plan's check is the read-back, not the status.

### 3.9 What survives the rename and the change to public

- **Rename.** Documented: "When you rename a repository, all existing information, with the exception of project site URLs, is
  automatically redirected to the new name"; the repository keeps its id and node id (earlier research,
  [rename-visibility-archive-sequence](../../22-transfer-rehearsal/research/rename-visibility-archive-sequence.md) §3.4),
  and the rehearsal target 1450918337 was created as `phase0-rehearsal-b`, renamed, and reads the values of 3.2 by id.
  The settings are properties of the repository, not of its name, but no snapshot before the rename exists for that
  repository. The procedure takes one (3.10 B2) so the swap can diff it by id.
- **Change to public.** Documented consequences (private to public): "The code will be visible to everyone who can visit
  GitHub.", "Anyone can fork your repository.", "All push rulesets will be disabled.", "Actions history and logs will be
  visible to everyone." Expected to change at the flip: `visibility`/`private`, `allow_forking` (to true),
  `security_and_analysis` (null to the object), and REST `has_wiki` if the stored value is on (it is stored off). Expected to
  stay: merge settings, issues, projects, discussions, Actions permissions, default workflow permissions (unobserved;
  the publication unit re-reads them). Not established for this repository: whether any workflow permission default
  changes on the flip.
- On the Free plan a private repository refuses rulesets and branch protection reads (observed: 403 "Upgrade to GitHub Pro or
  make this repository public to enable this feature." on `rulesets`), so "no ruleset" cannot be read back while it is private; this
  unit does not try.

### 3.10 The options compared

| Option | Verdict |
|---|---|
| **A. Everything at creation** | Not possible. `create-in-org` has no `default_branch` (the branch does not exist yet anyway), `allow_update_branch`, `web_commit_signoff_required`, `allow_forking`, or discussions field, and the two Actions endpoints are separate. A creation that carries the merge settings gains nothing: they equal the defaults, and a rejected field would fail the creation instead of a retryable `PATCH`. |
| **B. Minimal creation, then `PATCH` and `PUT`s before the push, `default_branch` after** | **Chosen.** The creation request carries only what makes the repository private and empty. The settings request is idempotent and can be re-run. The push then meets the final Actions permissions, and the only write after the push is one field. |
| B′. Same, but all settings after the push | Works, but the push meets `write` workflow permissions and an unconfigured repository; there is no gain, because only `default_branch` needs the push. |
| **C. GraphQL** | Not usable alone: `CreateRepositoryInput` has `name, ownerId, description, visibility, template, homepageUrl, hasWikiEnabled, hasIssuesEnabled, teamId`; `UpdateRepositoryInput` has `repositoryId, name, description, template, homepageUrl, hasWikiEnabled, hasIssuesEnabled, hasProjectsEnabled, hasDiscussionsEnabled, hasSponsorshipsEnabled, hasPullRequestsEnabled, pullRequestCreationPolicy, issueCreationPolicy` (live schema, 2026-11-09). No merge settings, default branch, forking, update-branch, sign-off or Actions. It adds one capability REST lacks, `hasDiscussionsEnabled`, kept as the contingency write. Its reads are used because they are not masked (3.6). |

## 4. How comparable tools do it

- **Terraform GitHub provider v6.13.0** (2026-07-08; tag `v6.13.0`):
  - `resourceGithubRepositoryCreate` in [`github/resource_github_repository.go`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/github/resource_github_repository.go)
    calls `client.Repositories.Create` (the `orgs/{org}/repos` call for an organisation) with `resourceGithubRepositoryObject`, then
    ends with `return resourceGithubRepositoryUpdate(ctx, d, meta)`: create, then update with the same settings.
  - It refuses a creation-time `default_branch` other than `main`: "cannot set the default branch on a new repository to
    something other than 'main'"; the schema text for `default_branch` is "Can only be set after initial repository creation,
    and only if the target branch exists", deprecated in favour of the separate resource
    [`github_branch_default`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/docs/resources/branch_default.md),
    which "is incompatible with the `default_branch` option of the `github_repository` resource".
  - `resourceGithubRepositoryObject` sets `AllowForking` only "if repository is not public", and sets merge and squash
    commit title and message only when the matching `allow_*_merge` is true. It does not send
    `use_squash_pr_title_as_default`.
  - Actions are separate resources:
    [`github_actions_repository_permissions`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/docs/resources/actions_repository_permissions.md)
    (`enabled`, `allowed_actions`, `sha_pinning_required`) and
    [`github_workflow_repository_permissions`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/docs/resources/workflow_repository_permissions.md)
    (`default_workflow_permissions`, `can_approve_pull_request_reviews`), mirroring the two `PUT` endpoints.
  - `has_downloads` is deprecated ("This attribute is no longer in use"); the new repositories read `has_downloads` false
    regardless, so it is neither written nor checked.
- **repository-settings/app** (the settings application that succeeds probot/settings), v5.0.16 (2026-11-03):
  `Repository.sync` in [`lib/plugins/repository.js`](https://github.com/repository-settings/app/blob/v5.0.16/lib/plugins/repository.js)
  sends one `PATCH /repos/{owner}/{repo}` with the whole settings block, topics by a separate `PUT .../topics`, alerts by
  separate `PUT`/`DELETE`. It never creates repositories, and its documentation warns of `name`: "The name of the repository.
  Changing this will rename the repository" ([`docs/plugins/repository.md`](https://github.com/repository-settings/app/blob/v5.0.16/docs/plugins/repository.md)).
  It has no Actions-permission plugin.
- **`gh repo edit`** (2.100.0) issues the same `PATCH` with only the flags given, concurrently, and prints nothing when stdout
  is not a terminal (earlier research §3.8), so it gives no read-back; hence `gh api` with explicit reads.

## 5. Pitfalls and regrets

1. **`-F` and `-f`.** `gh api -F` converts `true`, `false`, `null` and integers to JSON types and reads `@file`; `-f` is always a
   string. Booleans use `-F`, every enum and name uses `-f`. Any field switches the method to POST, so `PATCH` and `PUT` need
   `--method`.
2. **No leading slash** on a path under Git Bash (path rewriting); `repositories/<id>/...` and `repos/<owner>/<name>/...`.
3. **`name` in the settings `PATCH` renames the repository.** The settings request never contains it.
4. **REST `has_wiki: false` on a private Free repository proves nothing** (3.6); read GraphQL `hasWikiEnabled`.
5. **`security_and_analysis` is `null`, not absent,** while private; a read-back that expects the object fails for the wrong reason.
6. **Squash/merge title needs the matching message** ("Required when using `squash_merge_commit_message`", and the same
   for the merge pair); the request sends the pairs together.
7. **`use_squash_pr_title_as_default` is closing down;** writing it next to `squash_merge_commit_title` risks two writers of one
   value. It is read, not written.
8. **A creation `POST` is not idempotent** (a repeated name is a 422), and the token cannot delete. After a timeout read
   `repos/<org>/<name>` before any retry.
9. **Reads by name after a rename can answer for the wrong repository** (the old name redirects). Every read-back uses
   `repositories/<id>`; every write before the rename uses the unique name `KotlinBottools-next`, preceded by a check that the name
   still answers the captured id. Writes by id were not tried (`PATCH repositories/<id>` is not documented), so they are not used.
10. **Organisation Actions settings are unreadable** with this token; do not build a check on them.
11. **`GET .../collaborators` lists the owner without a direct grant;** `affiliation=direct` is empty on every repository read
    here. Read both.
12. **Archived-repository observations** (3.2) are not creation responses; the first real run's read-back is the evidence.

## 6. Recommendation for this repository

Two requests, both a literal list; shell variables are set once and typed as shown. `ORG=SpartanLaboratories`,
`NEXT=KotlinBottools-next`.

### Request A: create the repository private and empty

```bash
ORG=SpartanLaboratories
NEXT=KotlinBottools-next

# A1. The name is free (expected: exit=1 and "Not Found (HTTP 404)")
gh api repos/$ORG/$NEXT --silent; echo "exit=$?"

# A2. Create (private, no README, no commit); keep the id and the node id
CREATED=$(gh api orgs/$ORG/repos -f name=$NEXT -F private=true -F auto_init=false \
  --jq '[.id,.node_id,.full_name,.visibility,.private,.default_branch,.size,.archived]|@tsv')
echo "$CREATED"
RID=$(echo "$CREATED" | cut -f1)
NID=$(echo "$CREATED" | cut -f2)
case "$RID" in ''|*[!0-9]*) echo "STOP: no repository id";; esac
# expected: <id>  R_...  SpartanLaboratories/KotlinBottools-next  private  true  main  0  false

# A3. Read back by id: private, empty, not archived
gh api repositories/$RID --jq '[.id,.full_name,.visibility,.private,.archived,.fork,.default_branch,.size]|@tsv'
gh api repositories/$RID/branches --jq length                      # 0
gh api graphql -f query='query($id:ID!){node(id:$id){... on Repository{databaseId isPrivate isEmpty defaultBranchRef{name}}}}' \
  -f id=$NID --jq .data.node                                       # databaseId=$RID, isPrivate true, isEmpty true, defaultBranchRef null
curl -s -o /dev/null -w '%{http_code}\n' https://api.github.com/repositories/$RID     # anonymous: 404
```

The scripted equivalent runs `["gh","api",...]` through `subprocess.run(args, capture_output=True, text=True,
encoding="utf-8")` with no shell, treats exit 1 as "inspect the body" (the error JSON is on stdout), and reads the id from the
parsed reply.

### Request B1: apply the settings (repository still empty, before the push)

```bash
# B1.0 The name still answers the same repository (expected: SAME)
test "$(gh api repos/$ORG/$NEXT --jq .id)" = "$RID" && echo SAME || echo STOP

# B1.1 Repository settings (no name, no private, no description, no homepage, no allow_forking)
gh api --method PATCH repos/$ORG/$NEXT \
  -F has_issues=true -F has_projects=true -F has_wiki=false \
  -F allow_merge_commit=true -F allow_squash_merge=true -F allow_rebase_merge=true \
  -F allow_auto_merge=false -F delete_branch_on_merge=false -F allow_update_branch=false \
  -F web_commit_signoff_required=false \
  -f merge_commit_title=MERGE_MESSAGE -f merge_commit_message=PR_TITLE \
  -f squash_merge_commit_title=COMMIT_OR_PR_TITLE -f squash_merge_commit_message=COMMIT_MESSAGES \
  --jq '[.id,.visibility,.has_wiki,.allow_merge_commit]|@tsv'

# B1.2 Actions on, all actions allowed (204, no output)
gh api --method PUT repos/$ORG/$NEXT/actions/permissions -F enabled=true -f allowed_actions=all; echo "exit=$?"

# B1.3 Default workflow permissions read; Actions may not approve pull requests (204, no output; a 409 is a stop)
gh api --method PUT repos/$ORG/$NEXT/actions/permissions/workflow \
  -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false; echo "exit=$?"
```

Read-back by id (run after B1.3 and again after B2; save each to a file and `diff` the two):

```bash
SNAP='del(.pushed_at,.updated_at,.size)'
gh api repositories/$RID --jq "$SNAP" > snap-B1-repo.json
gh api repositories/$RID/actions/permissions > snap-B1-actions.json
gh api repositories/$RID/actions/permissions/workflow > snap-B1-workflow.json
gh api graphql -f query='query($id:ID!){node(id:$id){... on Repository{hasWikiEnabled hasDiscussionsEnabled hasIssuesEnabled hasProjectsEnabled forkingAllowed isEmpty defaultBranchRef{name}}}}' \
  -f id=$NID --jq .data.node > snap-B1-graphql.json
gh api "repositories/$RID/collaborators" --jq '[.[]|[.login,.role_name]|join(":")]'        # the administrator only, admin
gh api "repositories/$RID/collaborators?affiliation=direct" --jq length                   # 0
gh api repositories/$RID/teams --jq length                                                # 0
gh api repositories/$RID/invitations --jq length                                          # 0
gh api repositories/$RID/topics --jq '.names|length'                                      # 0
```

Expected values after B1:

| Read | Field | Value |
|---|---|---|
| repo | `id`, `visibility`, `private`, `archived` | `$RID`, `private`, true, false |
| repo | `has_issues`, `has_projects`, `has_wiki`, `has_discussions` | true, true, false, false |
| repo | `allow_merge_commit`, `allow_squash_merge`, `allow_rebase_merge` | true, true, true |
| repo | `allow_auto_merge`, `delete_branch_on_merge`, `allow_update_branch`, `web_commit_signoff_required` | false, false, false, false |
| repo | `merge_commit_title`, `merge_commit_message` | `MERGE_MESSAGE`, `PR_TITLE` |
| repo | `squash_merge_commit_title`, `squash_merge_commit_message`, `use_squash_pr_title_as_default` | `COMMIT_OR_PR_TITLE`, `COMMIT_MESSAGES`, false |
| repo | `description`, `homepage`, `topics` | null, null, `[]` |
| repo | `allow_forking` | **false** (organisation policy; not written; see 3.5) |
| repo | `security_and_analysis` | **null** (private, Free) |
| GraphQL | `hasWikiEnabled`, `hasDiscussionsEnabled`, `hasIssuesEnabled`, `hasProjectsEnabled` | false, false, true, true |
| GraphQL | `forkingAllowed`, `isEmpty`, `defaultBranchRef` | false, true (until the push), null |
| `actions/permissions` | `enabled`, `allowed_actions`, `sha_pinning_required` | true, `all`, false |
| `actions/permissions/workflow` | `default_workflow_permissions`, `can_approve_pull_request_reviews` | **`read`**, false |

Any other value is a stop. Two differences from the old repository are expected and are not defects: wiki (the old one reads
true) and workflow permissions (the old one reads `write`). If `hasDiscussionsEnabled` reads true (not expected), the
contingency write is
`gh api graphql -f query='mutation($id:ID!){updateRepository(input:{repositoryId:$id,hasDiscussionsEnabled:false}){repository{hasDiscussionsEnabled}}}' -f id=$NID`.

### Request B2: after the push, set the default branch and read back

```bash
# B2.1 What GitHub made the default (record, do not rely on it)
gh api repositories/$RID --jq '[.default_branch,.size]|@tsv'
gh api repositories/$RID/branches --jq '[.[].name]|join(" ")'      # main and the topic branch

# B2.2 Set it (the only write after the push); a no-op if it is already main
gh api --method PATCH repos/$ORG/$NEXT -f default_branch=main --jq '[.id,.default_branch]|@tsv'   # RID, main

# B2.3 Read back: repeat the B1 read-back into snap-B2-*.json and compare
SNAP='del(.pushed_at,.updated_at,.size)'
gh api repositories/$RID --jq "$SNAP" > snap-B2-repo.json
gh api repositories/$RID/actions/permissions > snap-B2-actions.json
gh api repositories/$RID/actions/permissions/workflow > snap-B2-workflow.json
gh api graphql -f query='query($id:ID!){node(id:$id){... on Repository{hasWikiEnabled hasDiscussionsEnabled hasIssuesEnabled hasProjectsEnabled forkingAllowed isEmpty defaultBranchRef{name}}}}' \
  -f id=$NID --jq .data.node > snap-B2-graphql.json
diff snap-B1-repo.json snap-B2-repo.json; diff snap-B1-actions.json snap-B2-actions.json
diff snap-B1-workflow.json snap-B2-workflow.json; diff snap-B1-graphql.json snap-B2-graphql.json
```

The only differences expected are `default_branch` (possibly none), `isEmpty` true to false and `defaultBranchRef` null to
`{"name":"main"}`. `snap-B2-*.json` is also the snapshot the swap diffs by id after the rename; `name`, `full_name`, `html_url` and the
other URL fields are the only fields expected to change.

**Reasoning.** Creation carries only what makes the repository private and empty, because those are the properties whose
failure would matter and the token cannot delete a mistake; every other value goes into one idempotent `PATCH` and two `PUT`s
that can be re-run and whose result is read back from several angles. The settings are written before the push because
the Actions permissions then govern whatever the push triggers, and the only post-push write is the one field that needs a branch.
The obvious alternative, putting the merge settings into `POST orgs/{org}/repos`, is rejected because it adds failure
modes to the creation and still needs the `PATCH` for the five fields the creation lacks. GraphQL is rejected as the write path
because it cannot express the merge settings, the default branch or Actions.

## 7. Load-bearing claims

Sources are re-openable; "observed" claims name the read and the date and quote the returned fragment.

1. **Creating a private organisation repository needs `repo`.** "OAuth app tokens and personal access tokens (classic) need the
   `public_repo` or `repo` scope to create a public repository, and `repo` scope to create a private repository."
   [REST: create an organization repository](https://docs.github.com/en/rest/repos/repos#create-an-organization-repository),
   rest-api-description `api.github.com.2022-11-28.json` at commit `fa8d7bfb041cc9ef90ac51dcb8ed8cc8a0007166` (2026-11-10).
2. **`create-in-org` accepts `has_wiki`, `private`, `auto_init`, the merge fields; delete-branch needs an owner.**
   "Either `true` to enable the wiki for this repository or `false` to disable it."; "Pass `true` to create an initial commit
   with empty README."; "Either `true` to allow automatically deleting head branches when pull requests are merged, or `false`
   to prevent automatic deletion. **The authenticated user must be an organization owner to set this property to `true`.**"
   Same source and date. (That the body has no `default_branch`, `allow_update_branch`, `web_commit_signoff_required`,
   `allow_forking` or discussions field is read from the same operation's property list; an absence has no quote.)
3. **`repos/update` carries the fields creation lacks.** "Updates the default branch for this repository."; "Either `true` to
   allow private forks, or `false` to prevent private forks."; "Either `true` to always allow a pull request head branch that is
   behind its base branch to be updated even if it is not required to be up to date before merging, or false otherwise.";
   "Either `true` to require contributors to sign off on web-based commits, or `false` to not require contributors to sign off
   on web-based commits."; "**This property is closing down. Please use `squash_merge_commit_title` instead."; "Required when using
   `squash_merge_commit_message`." Source: [REST: update a repository](https://docs.github.com/en/rest/repos/repos#update-a-repository),
   same description and date.
4. **The workflow-permissions endpoint.** "Sets the default workflow permissions granted to the `GITHUB_TOKEN` when running
   workflows in a repository, and sets if GitHub Actions" (continuing "can submit approving pull request reviews."); responses
   `204` "Success response" and `409` "Conflict response when changing a setting is prevented by the owning organization";
   "OAuth app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint." Values
   `default_workflow_permissions`: `read`, `write`. Source: [REST: set default workflow permissions for a repository](https://docs.github.com/en/rest/actions/permissions#set-default-workflow-permissions-for-a-repository),
   same description and date.
5. **The Actions-permissions endpoint.** "Sets the GitHub Actions permissions policy for enabling GitHub Actions and allowed
   actions and reusable workflows in the repository."; body `enabled` required, `allowed_actions` `all`/`local_only`/`selected`,
   `sha_pinning_required`; "OAuth app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint."
   Source: [REST: set GitHub Actions permissions for a repository](https://docs.github.com/en/rest/actions/permissions#set-github-actions-permissions-for-a-repository),
   same description and date.
6. **A more restrictive organisation default disables the permissive repository choice; new organisation repositories inherit.**
   "If your repository belongs to an organization and a more restrictive default has been selected in the organization
   settings, the same option is selected in your repository settings and the permissive option is disabled."; "If you create a
   new repository in an organization, the setting is inherited from what is configured in the organization settings."
   [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository),
   docs `main`, read 2026-11-09.
7. **The read-only default did not reach existing organisations.** "This change will not impact any existing enterprises,
   organizations or repositories."; "New repositories will inherit permissions from parent organization."
   [GitHub changelog, 2023-02-02](https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/).
8. **Wikis are unavailable for private repositories on Free.** "Wikis are available in public repositories with {% data
   variables.product.prodname_free_user %} and {% data variables.product.prodname_free_team %} for organizations, and in public
   and private repositories with {% data variables.product.prodname_pro %}, {% data variables.product.prodname_team %},"
   [`data/reusables/gated-features/wikis.md`](https://github.com/github/docs/blob/main/data/reusables/gated-features/wikis.md),
   docs `main`, read 2026-11-09. And: "When you turn off a wiki, the content is hidden, but not erased."
   [Disabling wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/disabling-wikis).
9. **Private forking is an organisation precondition and off by default.** "An organization owner must allow forks of private
   repositories on the organization level" (the page continues "before you can allow or disallow forks for a specific
   repository"); "By default, new organizations are configured to disallow the forking of private repositories."
   [Managing the forking policy for your repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-the-forking-policy-for-your-repository),
   [Managing the forking policy for your organization](https://docs.github.com/en/organizations/managing-organization-settings/managing-the-forking-policy-for-your-organization),
   read 2026-11-09.
10. **Making a repository public allows forking.** "Anyone can fork your repository." (under "Changing from private to public"),
    "Actions history and logs will be visible to everyone."
    [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility),
    docs `main`, read 2026-11-09.
11. **Changing the default branch needs more than one branch.** "To change the default branch, your repository must have more
    than one branch."
    [Changing the default branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch),
    docs `main`, read 2026-11-09.
12. **The error for a default branch that does not exist** (report, 2019). "The branch new_branch was not found. Please push that
    ref first or create it via the Git Data API." [GitHub Community discussion 24523](https://github.com/orgs/community/discussions/24523).
13. **First pushed branch becomes the default** (opinion; no live test in the source). "GitHub makes the first branch pushed to
    an empty repo its default." [bsklaroff/yaac pull request 555](https://github.com/bsklaroff/yaac/pull/555).
14. **Terraform: `default_branch` after creation only; creation then update.** "Can only be set after initial repository
    creation, and only if the target branch exists"; "cannot set the default branch on a new repository to something other than
    'main'"; "// only configure allow forking if repository is not public";
    [`resource_github_repository.go`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/github/resource_github_repository.go),
    tag `v6.13.0` (2026-07-08). And "This resource is incompatible with the `default_branch` option of the
    [`github_repository`](repository) resource." [`docs/resources/branch_default.md`](https://github.com/integrations/terraform-provider-github/blob/v6.13.0/docs/resources/branch_default.md), same tag.
15. **Settings applications send one `PATCH`; `name` renames.** "# The name of the repository. Changing this will rename the
    repository" [`docs/plugins/repository.md`](https://github.com/repository-settings/app/blob/v5.0.16/docs/plugins/repository.md),
    tag `v5.0.16` (2026-11-03); the code is `github.request('PATCH /repos/{owner}/{repo}', this.settings)` in
    [`lib/plugins/repository.js`](https://github.com/repository-settings/app/blob/v5.0.16/lib/plugins/repository.js).
16. **`gh api` typing.** "The `-F/--field` flag has magic type conversion based on the format of the value:"; "literal values
    `true`, `false`, `null`, and integer numbers get converted to appropriate JSON types;"; "Pass one or more `-f/--raw-field`
    values in `key=value` format to add static string parameters to the request payload."; "Note that adding request
    parameters will automatically switch the request method to `POST`." `gh api --help`, gh 2.100.0 (2026-09-03);
    [manual](https://cli.github.com/manual/gh_api).
17. **GraphQL cannot replace REST here.** Field description in the live schema: `UpdateRepositoryInput.hasDiscussionsEnabled`
    "Indicates if the repository should have the discussions feature enabled."; `Repository.hasWikiEnabled` "Indicates if the
    repository has wiki feature enabled."; `Repository.forkingAllowed` "Whether this repository allows forks."; `Repository.isEmpty`
    "Returns whether or not this repository is empty." The input-field lists in 3.10 come from introspection of
    `CreateRepositoryInput` and `UpdateRepositoryInput` (no quote for an absence). `api.github.com/graphql`, introspection,
    2026-11-09; [reference](https://docs.github.com/en/graphql/reference/input-objects#updaterepositoryinput).
18. **Collaborator listing includes owners without a direct grant.** "For organization-owned repositories, the list of
    collaborators includes outside collaborators, organization members that are direct collaborators, organization members with
    access through team memberships, organization members with access through default organization permissions, and
    organization owners."; "`direct` means all collaborators with permissions to an organization-owned repository, regardless
    of organization membership status." "OAuth app tokens and personal access tokens (classic) need the `read:org` and `repo`
    scopes to use this endpoint." [REST: list repository collaborators](https://docs.github.com/en/rest/collaborators/collaborators#list-repository-collaborators),
    same description and date.
19. **A rename redirects and keeps the repository.** "When you rename a repository, all existing information, with the exception
    of project site URLs, is automatically redirected to the new name, including:"
    [Renaming a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository),
    docs `main`, read 2026-11-09.
20. **Archiving makes settings read-only, not changed.** "When a repository is archived, its issues, pull requests, code,
    labels, milestones, projects, wiki, releases, commits, tags, branches, reactions, code scanning alerts, comments and
    permissions become read-only." [Archiving repositories](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories).
21. **Observed: a new private repository here (id 1450918337).** `gh api repositories/1450918337` returned
    `"has_wiki":false,"allow_forking":false,"default_branch":"main","size":0,"security_and_analysis":null,"visibility":"private"`;
    `.../actions/permissions` returned `{"enabled":true,"allowed_actions":"all","sha_pinning_required":false}`;
    `.../actions/permissions/workflow` returned `{"default_workflow_permissions":"write","can_approve_pull_request_reviews":false}`;
    `.../teams` returned `[]`; GraphQL `node(id:"R_kgDOVntBwQ")` returned `"hasWikiEnabled":false,"forkingAllowed":false,"defaultBranchRef":null`.
    2026-11-09 (archived repository; see 3.2).
22. **Observed: REST masks the wiki on private Free repositories.** `gh api repositories/1450917603` returned `"has_wiki":false`
    while GraphQL `node(id:"R_kgDOVns-4w")` returned `"hasWikiEnabled":true,"isPrivate":true`; repositories 540146440 and
    540208924 returned the same pair. 2026-11-09. The old repository (562658298, public) returns `"has_wiki":true` and GraphQL
    `"hasWikiEnabled":true`.
23. **Observed: the organisation.** `gh api orgs/SpartanLaboratories` returned `"plan":{"name":"free",...}`,
    `"members_can_fork_private_repositories":false`, `"default_repository_branch":"main"`, `"created_at":"2022-09-22T18:26:14Z"`;
    `gh api orgs/SpartanLaboratories/actions/permissions/workflow` answered 403 "You must be an org admin or have the actions
    policies fine-grained permission." and "This API operation needs the "admin:org" scope." 2026-11-09.
24. **Observed: collaborators.** `gh api "repositories/562658298/collaborators?affiliation=direct"` and the same on 1450918337
    returned `[]`; with `affiliation=all` each returned one entry with `"role_name":"admin"`. 2026-11-09.
25. **Observed: the name is free.** `gh api repos/SpartanLaboratories/KotlinBottools-next` answered
    `{"message":"Not Found",...,"status":"404"}`. 2026-11-09.

## 8. Gaps

- **No write was made, so none of these is observed:** the 422 for `default_branch` on an empty repository in 2026; the
  status of `PATCH default_branch=main` when `main` is already the default; whether `has_wiki=false` is stored or ignored on a
  private Free repository; the outcome of `PATCH allow_forking=true` on the private repository; the outcome of the `PUT`
  with `read` (expected `204`); whether `PATCH` is accepted on an empty repository for every field in B1.1 (Terraform does
  it, but on its own set). The first run shows each; B1's read-back is the check.
- **Which branch GitHub makes the default after a multi-branch mirror push is not documented** and one source is an opinion.
  The procedure does not depend on it. Nothing here shows whether the push order can be controlled (a prior `main`-only push)
  and no such step is proposed.
- **The organisation's default workflow permissions are inferred** (`write`, from every repository read), not read; the token
  lacks `admin:org`.
- **Observations come from archived repositories** (and, for 1450917603 and the two older ones, repositories that changed
  visibility or age): they show what a repository created this way ends up with, not the creation response. The settings
  request writes every value for that reason.
- **The wiki reading (REST masks, GraphQL stores) is an inference** from four repositories and the old repository's history; no
  GitHub document states it. What the later change to public does to a stored-off wiki is unobserved.
- **Survival through the rename is unobserved for this repository** (no snapshot before the rename exists for the rehearsal
  target); B2.3's snapshot is the proof for the swap. Whether anything about Actions permissions changes at the flip to public
  is unknown.
- **Forking while private cannot be matched to the old repository.** The requirement is met only from publication on; the
  publication unit must read `allow_forking` true. If the owner wants forking allowed while private, that needs the
  organisation policy changed with `admin:org`, a decision for the owner and outside this unit.
- **No GitHub document states the pairings of merge title with message** that are valid; the pairs written are the observed
  defaults, which GitHub accepted at creation.
