# Fixture and read API forms: building the rehearsal fixture and reading every issue at any depth

Findings file for question 3 of [`README.md`](README.md). Observations marked **observed** were made
on 2026-11-09 with `gh` 2.100.0 on Windows Git Bash, using reads only (GET requests and GraphQL queries); nothing was
written to GitHub. The unit's tools are operational Bash and Python scripts, not Kotlin, so the Kotlin lens does not apply.

## 1. Question

What are the literal request forms for building the rehearsal fixture (repositories, labels, milestone, issues,
comments, closes and reopens, a branch, a commit, a pull request and its merge, closed placeholders, transfers,
sub-issue and "blocked by" links) with `gh api` on Windows Git Bash, and the read form that returns one issue's
fields, comments and relationship links at any depth of sub-issues, across repositories, on private and archived
repositories; and which limits (depth, breadth, page sizes, secondary rate limits, error shapes) bind them?

An answer must give copy-ready text for each write and read, say whether the read is a flat per-issue read that
composes into the hierarchy at any depth, and state a pacing rule for about one hundred writes.

## 2. Bottom line

- **Writes: REST for everything that creates or edits plain objects, GraphQL for transfers and links.** REST takes
  label names and a milestone number, returns `number`, `id` and `node_id` in one response, and needs no id lookup.
  GraphQL `transferIssue`, `addSubIssue` and `addBlockedBy` take node ids; `gh issue transfer` is the same mutation
  with three requests instead of one. `gh issue edit --add-sub-issue` passes `replaceParent: true` and would silently
  re-parent a child, so the procedure calls `addSubIssue` directly, without `replaceParent`.
- **Reads: one GraphQL query per page of a repository's issues** (`repository.issues(first: 25)`, with nested
  `first: 100` connections for labels, comments, sub-issues, "blocked by" and "blocking"). Observed cost: 1 point and
  about 2.3 s per page of 25 issues, 12,525 nodes. It is flat: each issue reports its own `parent`, `subIssues`,
  `blockedBy` and `blocking` as (repository, number) pairs, so the hierarchy at any depth is the set of those edges,
  compared as sets. It reads issues of other repositories, private repositories and archived repositories
  (all observed). REST would need at least six calls per issue.
- **Limits.** Sub-issues: up to 100 per parent and eight nesting levels (documented). GraphQL: `first` between 1 and
  100, at most 500,000 nodes per call, 10 s timeout. Secondary limits: at most 80 content-generating requests per
  minute and 500 per hour, requests serial, at least one second between writes. A GitHub maintainer reports that
  transfers are a content-creation limit on the destination repository and recommends no more than 100 per hour.
- **`gh api` and GraphQL errors.** Any entry in `errors[]` makes `gh api` exit 1, print the whole JSON body to stdout
  unfiltered (`--jq` is skipped) and `gh: <messages>` to stderr, even when `data` is partly filled (all observed).
  `gh api` never retries. A script captures stdout on every call and treats exit 1 as "inspect the body".
- **Pacing rule:** strictly serial; pause at least 3 s after each write, 10 s after each transfer; read the result back
  before the next write; on a secondary-limit error wait the `retry-after` seconds, else 60 s, then double, give up
  after four attempts, and read back before any retry because a refused-looking write may have landed.
- **Windows pitfalls that bite this unit:** no leading slash on `gh api` paths (Git Bash rewrites it); `-f` for every
  string (the `-F` flag converts integer-looking strings to numbers); Python 3.14 on this machine reads and writes
  cp1252 unless told UTF-8 (`encoding="utf-8"`, `-X utf8`).

## 3. Findings

Tiers: **consensus** = official documentation or schema, **practice** = what mature libraries visibly do,
**opinion** = one source.

### 3.1 Writes

#### 3.1.1 Create a repository in an organisation (consensus; REST description at commit `2f8f80e`, 2026-11-07)

`POST orgs/{org}/repos`. Body fields from the REST description (`repos/create-in-org`):

| Field | Type | Default | Note |
|---|---|---|---|
| `name` | string | required | |
| `private` | boolean | `false` | `true` for the target |
| `visibility` | string `public`/`private` | | alternative to `private`; the procedure uses `private` only |
| `has_issues` | boolean | `true` | issues are on by default |
| `auto_init` | boolean | `false` | `true` creates an initial commit with an empty README |
| `description` | string | | optional |

```bash
# A: public, with an initial commit
gh api orgs/SpartanLaboratories/repos -f name=phase0-rehearsal-a -F private=false -F auto_init=true \
  -F has_issues=true --jq '[.id,.node_id,.full_name,.visibility,.private,.default_branch,.has_issues,.archived]|@tsv'
# B: private, no README, no commits
gh api orgs/SpartanLaboratories/repos -f name=phase0-rehearsal-b -F private=true -F auto_init=false \
  -F has_issues=true --jq '[.id,.node_id,.full_name,.visibility,.private,.default_branch,.has_issues,.archived]|@tsv'
```

The 201 response carries `id` (integer), `node_id` (the id GraphQL takes), `full_name`, `visibility`, `private`,
`default_branch`, `has_issues`, `archived`, `size`. `default_branch` names a branch even when none exists. "Empty
repositories are repositories without branches" (REST description of `git/create-ref`), so B's emptiness is confirmed
with `gh api repos/SpartanLaboratories/phase0-rehearsal-b/branches --jq length` returning `0`, and A's initial commit
with `gh api repos/SpartanLaboratories/phase0-rehearsal-a/git/ref/heads/main --jq .object.sha`. The 403 and 422
responses are the documented failures (a name already taken is a 422). `gh repo create` exists; `gh api` is chosen for
the explicit fields and the structured response.

#### 3.1.2 Label and milestone (consensus; same description)

`POST repos/{owner}/{repo}/labels`: `name` (string, required), `color` (string, hex without `#`), `description`
(string, at most 100 characters). `POST repos/{owner}/{repo}/milestones`: `title` (string, required), `state`
(`open` default), `description` (string), `due_on` (ISO 8601 string; omit it for no due date).

```bash
for R in phase0-rehearsal-a phase0-rehearsal-b; do
  gh api repos/SpartanLaboratories/$R/labels -f name='type: tracking' -f color=ededed \
    -f description='Multi-issue initiative' --jq '[.id,.name,.color,.description]|@tsv'
  gh api repos/SpartanLaboratories/$R/labels -f name='type: feature' -f color=0e8a16 \
    -f description='New capability or API change' --jq '[.id,.name,.color,.description]|@tsv'
  gh api repos/SpartanLaboratories/$R/milestones -f title=1.0.0 \
    -f description='Rehearsal milestone, no due date' --jq '[.number,.title,.description,.due_on,.state]|@tsv'
done
```

The milestone response gives `number` (1 in a fresh repository); `due_on` reads back `null`. A repeat of a label or
milestone is a 422 with `errors[].code = "already_exists"` (documented form of 422 bodies in the REST troubleshooting
page), so a procedure checks with `GET .../labels` and `GET .../milestones?state=all` first. Use `-f`, never `-F`, for
`color`: `-F` turns an all-digit value such as `123456` into a JSON number and the request fails.

#### 3.1.3 Issue with labels and a milestone (consensus)

`POST repos/{owner}/{repo}/issues`: `title` (string, required), `body` (string), `labels` (array of names),
`milestone` (integer, the milestone's number), `parent_issue_id` (integer, the parent's REST `id`, not its number),
plus `assignees`, `type`. There is no `state` field: an issue cannot be created closed. Labels and milestone are
"silently dropped" without push access, so the response is read back and compared.

```bash
gh api repos/SpartanLaboratories/phase0-rehearsal-a/issues -f title='Tracking issue' -F body=@body-1.md \
  -f 'labels[]=type: tracking' -F milestone=1 \
  --jq '[.number,.id,.node_id,.state,([.labels[].name]|join(",")),.milestone.title]|@tsv'
```

The number is `.number`; the REST integer `.id` feeds the REST link endpoints and `parent_issue_id`; `.node_id` feeds
every GraphQL mutation. `-F body=@file` reads the file's bytes as UTF-8; `-f` with non-ASCII text in a Git Bash
argument also round-trips (observed: a variable `Café-ü-日本-€` came back unchanged in a GraphQL error message).
`gh issue create -t T -F body.md -l 'type: feature' -m 1.0.0 [--parent N] [--blocked-by N,M]` also works in 2.100.0
(flags in its help) but prints only the URL (the number is the last path segment) and resolves labels and milestone by
name; the REST form returns all three ids in one call and is preferred.

#### 3.1.4 Comment, close, reopen (consensus)

```bash
# comment: body (string, required); response has id, node_id, created_at, user.login
gh api repos/SpartanLaboratories/phase0-rehearsal-a/issues/1/comments -F body=@comment-1.md \
  --jq '[.id,.node_id,.created_at,.user.login]|@tsv'
# close as completed
gh api --method PATCH repos/SpartanLaboratories/phase0-rehearsal-a/issues/5 -f state=closed -f state_reason=completed \
  --jq '[.number,.state,.state_reason,.closed_at]|@tsv'
# reopen
gh api --method PATCH repos/SpartanLaboratories/phase0-rehearsal-a/issues/5 -f state=open \
  --jq '[.number,.state,.state_reason]|@tsv'
```

`PATCH .../issues/{n}`: `state` is `open` or `closed`; `state_reason` is `completed`, `not_planned`, `duplicate` or
`reopened`, and is "Ignored unless `state` is changed". Closing an already closed issue therefore changes nothing and
cannot alter its reason. The GraphQL `IssueStateReason` enum has `REOPENED`, `NOT_PLANNED`, `COMPLETED` and
`DUPLICATE`; an issue that was reopened is expected to read `stateReason: REOPENED` until it is closed again (the
enum and REST schema allow it; the observed value is a rehearsal measurement). The "reopen, transfer, close" route is
`PATCH state=open` on the source number, the transfer (3.1.7), then `PATCH state=closed -f state_reason=completed` on
the new repository and the new number returned by the transfer. `gh issue close N -r completed` and `gh issue reopen N`
do the same but print nothing on stdout and exit 0 with a warning when the issue is already closed (`closeRun` in
2.100.0), which hides a no-op; REST is preferred.

#### 3.1.5 Branch, commit, pull request, merge (consensus; asynchronous mergeability documented)

Order: read the base head, create the branch ref (the contents endpoint's `branch` must already exist), commit one
file on it, open the pull request, wait for mergeability, merge.

```bash
R=SpartanLaboratories/phase0-rehearsal-a
SHA=$(gh api repos/$R/git/ref/heads/main --jq .object.sha)
gh api repos/$R/git/refs -f ref=refs/heads/rehearsal-pr -f sha="$SHA" --jq '[.ref,.object.sha]|@tsv'
gh api --method PUT repos/$R/contents/rehearsal/fixture.txt -f message='Add rehearsal fixture file' \
  -f content="$(printf 'rehearsal fixture\n' | base64 -w0)" -f branch=rehearsal-pr --jq '[.commit.sha,.content.path]|@tsv'
gh api repos/$R/pulls -f title='Rehearsal pull request' -f head=rehearsal-pr -f base=main \
  -f body='Merged pull request that holds a number between issues' --jq '[.number,.state,.mergeable,.mergeable_state]|@tsv'
# repeat until the first column is not "null" (about 2 s apart)
gh api repos/$R/pulls/PRNUM --jq '[.mergeable,.mergeable_state,.merge_commit_sha]|@tsv'
gh api --method PUT repos/$R/pulls/PRNUM/merge -f merge_method=merge --jq '[.merged,.sha,.message]|@tsv'
gh api repos/$R/pulls/PRNUM --jq '[.merged,.state,.merge_commit_sha]|@tsv'
```

Fields: `git/refs` takes `ref` (fully qualified) and `sha`; contents `PUT` takes `message`, base64 `content`, `branch`
(and `sha` only to update an existing file); `pulls` takes `title`, `head`, `base`, `body`; `merge` takes
`merge_method` (`merge`, `squash`, `rebase`), `commit_title`, `commit_message`, `sha`. The `GET git/ref/{ref}`
read is singular, the create is `git/refs`. The REST description of `GET pulls/{n}` states that `mergeable` is `true`,
`false` or `null`, that `null` means "GitHub has started a background job to compute the mergeability", and to
resubmit the request after giving it time. The merge endpoint documents a 405 for "merge cannot be performed", so
the procedure polls `GET` first and merges only once `mergeable` is `true` (the delay is not documented; the rehearsal
records it). A newer
`PUT .../merge-async` (returns 202 and a uuid, result at `GET .../merge-async/{uuid}`) exists, and the synchronous endpoint's description recommends it instead ("This endpoint does not support stacked pull
requests or merging with a merge queue"); neither limitation applies to one plain pull request, so the synchronous
merge is kept because its response carries the merge commit sha directly.
Pull requests and issues share one number sequence: "Every pull request is an issue" (REST description of create
comment), and observed: `SpartanLaboratories/KotlinBottools` has pull requests at #20 and #30 between issues at #19, #21
and #29. The pull request therefore takes the next number at the moment it is created; the procedure compares the
returned `number` with the expected one and stops on a mismatch. `repository.issue(number)` on a pull request's
number returns `NOT_FOUND` in GraphQL (observed), so the number census uses REST (3.2.4).

#### 3.1.6 A closed placeholder (consensus on the absence of a field)

Neither `POST issues` (no `state` field) nor GraphQL `CreateIssueInput` (fields: `repositoryId`, `title`, `body`,
`assigneeIds`, `milestoneId`, `labelIds`, `projectIds`, `projectV2Ids`, `issueTemplate`, `issueTypeId`, `parentIssueId`,
`issueFields`, `agentAssignment`) can create a closed issue. The placeholder is created, its `number` compared with the
expected number, then closed with the `PATCH` of 3.1.4. This is the safer order for numbers: the number is fixed by the
first request and is verified before the second; a failure of the close leaves an open issue at the right number that
a re-run closes (the procedure checks `state` before writing). There is no alternative that assigns the number any
other way.

#### 3.1.7 Transfer, sub-issue, "blocked by" (consensus for fields; behaviour on refusal is not documented)

GraphQL input types by introspection (2026-11-09):

| Mutation | Input fields | Payload |
|---|---|---|
| `transferIssue` | `issueId: ID!` (node id of the issue), `repositoryId: ID!` (node id of the target repository), `createLabelsIfMissing: Boolean` | `issue`, `clientMutationId` |
| `addSubIssue` | `issueId: ID!` (the parent), `subIssueId: ID` or `subIssueUrl: String`, `replaceParent: Boolean` ("Option to replace parent issue if one already exists") | `issue`, `subIssue` |
| `addBlockedBy` | `issueId: ID!` ("The ID of the issue to be blocked"), `blockingIssueId: ID!` ("The ID of the issue that blocks the given issue") | `issue`, `blockingIssue` |
| `removeSubIssue` / `removeBlockedBy` | `issueId`, `subIssueId` / `issueId`, `blockingIssueId` | |

```bash
# node ids: from the create response (.node_id), or by query
gh api graphql -f query='query($o:String!,$n:String!,$num:Int!){repository(owner:$o,name:$n){id issue(number:$num){id}}}' \
  -f o=SpartanLaboratories -f n=phase0-rehearsal-a -F num=7 --jq '.data.repository|[.id,.issue.id]|@tsv'

gh api graphql -f query='mutation($i:ID!,$r:ID!){transferIssue(input:{issueId:$i,repositoryId:$r}){issue{id number url repository{id nameWithOwner}}}}' \
  -f i="$ISSUE_NODE_ID" -f r="$TARGET_REPO_NODE_ID" --jq '.data.transferIssue.issue|[.id,.number,.url,.repository.nameWithOwner]|@tsv'

gh api graphql -f query='mutation($p:ID!,$c:ID!){addSubIssue(input:{issueId:$p,subIssueId:$c}){issue{number repository{nameWithOwner}} subIssue{number repository{nameWithOwner}}}}' \
  -f p="$PARENT_NODE_ID" -f c="$CHILD_NODE_ID"

gh api graphql -f query='mutation($b:ID!,$k:ID!){addBlockedBy(input:{issueId:$b,blockingIssueId:$k}){issue{number repository{nameWithOwner}} blockingIssue{number repository{nameWithOwner}}}}' \
  -f b="$BLOCKED_NODE_ID" -f k="$BLOCKER_NODE_ID"
```

**Transfer: GraphQL, not `gh issue transfer`.** `transferIssue` in `gh` 2.100.0 builds `TransferIssueInput{IssueID,
RepositoryID}` (no `createLabelsIfMissing`), prints only the new URL, and costs three requests: resolve the issue, resolve
the target repository, run the mutation (a `gh` maintainer in cli/cli#4691). The direct mutation is one request, takes
the repository id the procedure already holds (so the target is pinned by id, not by name), and returns the new issue's
`id`, `number` and repository id in structured form. The pre-transfer node id must not be reused after the transfer; the
payload's `issue.id` is what the next step reads. Omitting `createLabelsIfMissing` keeps a label that is missing in the
target from being created silently with a default colour. The `gh` form is acceptable as a manual cross-check
(`gh issue transfer 7 SpartanLaboratories/phase0-rehearsal-b -R SpartanLaboratories/phase0-rehearsal-a`).

**Links: GraphQL `addSubIssue` and `addBlockedBy`; `gh issue edit` is not used.** `gh` 2.100.0 has `gh issue edit N
--add-sub-issue`, `--parent`, `--add-blocked-by`, `--add-blocking` and the matching `--remove-*` flags, and
`gh issue create --parent/--blocked-by/--blocking`, all accepting a number or a full URL, so cross-repository references
work. But `DeferredUpdateIssue` calls `AddSubIssue(..., id, true)` and the `--parent` path sets
`ReplaceExistingParent: true`: a child that already has another parent is silently re-parented, which defeats the
check-before-write discipline. Calling the mutation without `replaceParent` leaves the refusal in place (the field's
description says the option replaces "if one already exists"; the refusal itself is stated by a third-party skill
file only, see Gaps). Each `gh` flag also costs an extra lookup request.

**REST alternatives (consensus; endpoints at commit `2f8f80e`):**

| Operation | REST | Argument | Difference from GraphQL |
|---|---|---|---|
| add sub-issue | `POST repos/{o}/{r}/issues/{parent_number}/sub_issues` | `sub_issue_id` integer (REST `id`), `replace_parent` boolean | "The sub-issue must belong to the same repository owner as the parent issue"; response is the parent |
| add blocked-by | `POST repos/{o}/{r}/issues/{blocked_number}/dependencies/blocked_by` | `issue_id` integer (REST `id` of the blocker) | response is the blocked issue |
| list | `GET .../sub_issues`, `.../dependencies/blocked_by`, `.../dependencies/blocking`, `.../parent` | `per_page` up to 100, `page` | one call per issue per relation |
| remove | `DELETE .../sub_issue`, `.../dependencies/blocked_by/{issue_id}` | | |

REST needs the integer `id`, a different identifier from the node id and from the number, and it addresses the issue
by repository and number in the path, so a cross-repository link needs the far issue's integer `id` from a prior read.
GraphQL needs only node ids and returns both ends with their repositories. Either works; GraphQL is chosen because the
reads and the transfer already hold node ids. Creation-time linking exists in both APIs (`parent_issue_id` on REST
create, `parentIssueId` on GraphQL `createIssue`, `--parent` on `gh issue create`).

### 3.2 Reads

#### 3.2.1 The query (observed to run on 2026-11-09 against `SpartanLaboratories/KotlinBottools` and `MagicBot`)

```graphql
query($owner: String!, $name: String!, $cursor: String) {
  repository(owner: $owner, name: $name) {
    id
    nameWithOwner
    isPrivate
    isArchived
    issues(first: 25, after: $cursor, orderBy: {field: CREATED_AT, direction: ASC}) {
      totalCount
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        number
        title
        body
        state
        stateReason
        createdAt
        closedAt
        repository { nameWithOwner }
        labels(first: 100) { totalCount pageInfo { hasNextPage endCursor } nodes { name } }
        milestone { number title description dueOn }
        comments(first: 100) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes { id databaseId body createdAt author { login } }
        }
        parent { id number repository { nameWithOwner } }
        subIssues(first: 100) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes { id number repository { nameWithOwner } }
        }
        blockedBy(first: 100) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes { id number repository { nameWithOwner } }
        }
        blocking(first: 100) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes { id number repository { nameWithOwner } }
        }
      }
    }
  }
}
```

Run: `gh api graphql -f owner=SpartanLaboratories -f name=phase0-rehearsal-a -f cursor=<endCursor> -f query="$(cat read-repo.graphql)"`
(omit `cursor` on the first page; `-f`, not `-F`, so a repository named `123` or `true` stays a string). Schema facts
checked by introspection: `Issue.comments` has `first/last/after/before/orderBy` and its only order field is
`UPDATED_AT`, so the query leaves the default (creation) order and the script verifies `createdAt` ascends; `subIssues`
has no `orderBy`; `blockedBy` and `blocking` have `orderBy`; `Issue.stateReason` has an `enableDuplicate` argument;
`Milestone` has `description` and `dueOn`; `parent` is a nullable `Issue`.

- **Pagination.** Outer: `issues(first: 25, after: $cursor)` with the cursor from `pageInfo.endCursor` while
  `hasNextPage`. Each nested connection is requested at `first: 100` with its own `pageInfo` and `totalCount`; a script
  must treat `hasNextPage: true` on any nested connection as a hard failure, or follow it with a continuation query by
  node id: `query($id: ID!, $cursor: String){ node(id: $id){ ... on Issue { comments(first: 100, after: $cursor){ totalCount
  pageInfo{hasNextPage endCursor} nodes{ id databaseId body createdAt author{login} } } } } }` (the same shape works for
  `labels`, `subIssues`, `blockedBy`, `blocking`; observed running for `comments` on a MagicBot issue). `gh api graphql
  --paginate` follows only the first `pageInfo` it meets in document order (`findEndCursor` in 2.100.0 stops at the first
  complete `pageInfo` pair); that happens to be the outer one in this query because it precedes `nodes`, but the script
  drives the cursor itself for control and for per-page error handling. Page size 25 rather than 100: the query's
  `nodeCount` at 25 is 12,525 (observed); at 100 it would be about 50,000, inside the 500,000 limit, but a page that
  runs past the 10 s timeout fails whole.
- **Cost (observed).** `rateLimit { cost nodeCount remaining }` reported `cost: 1`, `nodeCount: 12525` for a page of 25
  issues with every nested connection requested at 100; wall time 2.3 s. The primary limit is 5,000 points per hour, so a
  few dozen full reads of two small repositories cost a few hundred points at most.
- **Author.** `author { login }` is null when the account no longer exists; the script must tolerate a null.
- **Cross-repository.** The edges carry `repository { nameWithOwner }` and `number` for the far end. Observed: from
  `KotlinBottools` the `blockedBy` nodes included `MagicBot#2` to `#5` and `WebTools#55`. A direct read of an issue in
  another repository works in the same request: `repository(owner:"SpartanLaboratories", name:"MagicBot"){ issue(number:2){...} }`
  alongside `repository(...name:"WebTools"){ issue(number:55){...} }`, and by node id with `node(id: $id)` or
  `nodes(ids: $ids)` (all observed). A far end the token cannot see would not be readable; the administrator's token
  reads all the rehearsal's repositories.
- **Private and archived (observed).** The same query shape read the private `SpartanLaboratories/TrumpBot`
  (`isPrivate: true`) and the archived public `atom/atom` (`isArchived: true`, 25 nodes, cost 1). The archive documentation
  says archived repositories become "read-only", which is consistent with reads working; no archived repository of this
  organisation exists to test, so the rehearsal's own archived pair is the final proof.

#### 3.2.2 Flat read, hierarchy at any depth (observed)

The read is flat: every issue states its own `parent` and its direct `subIssues`. `subIssues` and
`subIssuesSummary` count direct children only (observed: `KotlinBottools#1` reports 18 sub-issues and a summary total of
18, while `#2`, itself one of those 18, reports 8 of its own, `#21` to `#28`). The whole hierarchy is therefore the set of
edges `(child, parent)`, and a check never needs a depth: it collects `(kind, repository#number, repository#number)`
triples for `sub` and `blockedBy` from the reads of both repositories and compares the sets before and after a step.
Redundancy catches truncation and drift: the set of an issue's `subIssues` must equal the set of issues whose `parent` is
that issue, and `blocking` must be the inverse of `blockedBy`. The recursive walk of REST (`GET .../sub_issues`, one call
per node) is not needed and would assume a traversal bound; the documented maximum is eight levels, but nothing in the
flat read depends on it. A full read of `KotlinBottools` (28 issues, 76 edges) ran through the script of section 3.2.5 with no
error.

#### 3.2.3 `gh issue view --json` and REST per-issue reads (consensus, source of `gh` 2.100.0)

`gh issue view N --json blockedBy,blocking,parent,subIssues,stateReason,milestone,comments,...` exists, but in
`query_builder.go` at v2.100.0 it requests `blockedBy(first:50)` and `blocking(first:50)` (no cursor, `totalCount` only),
`subIssues(first:100)`, `milestone{number,title,description,dueOn}`, and `--comments` cannot be combined with
`--json`. It is per issue and per repository (`-R`), so it needs one process and several requests per issue and
silently truncates "blocked by" at 50. REST needs `GET issues/{n}`, `GET issues/{n}/comments` (paged), `GET .../sub_issues`,
`GET .../dependencies/blocked_by`, `GET .../dependencies/blocking` and `GET .../parent`: at least six calls per issue
against one GraphQL page per 25 issues. REST issue objects carry `sub_issues_summary`, `parent_issue_url` and
`issue_dependencies_summary` (counts, observed), which is useful for a cheap count cross-check.

#### 3.2.4 The number census (consensus, observed)

GraphQL `Repository.issues` excludes pull requests. The list of numbers with their kind comes from REST, which includes
both and marks pull requests with a `pull_request` key:

```bash
gh api --paginate 'repos/SpartanLaboratories/phase0-rehearsal-a/issues?state=all&per_page=100&sort=created&direction=asc' \
  --jq '.[]|[.number,(.pull_request!=null),.state,.state_reason]|@tsv'
```

Observed on `KotlinBottools`: numbers 1 to 30 with pull requests at #20 and #30. Per-item type in GraphQL:
`repository(...){ issueOrPullRequest(number: N){ __typename } }`. `gh api --paginate` follows REST `Link` headers; with a
`--jq` filter each page is filtered separately, which suits a list of rows.

### 3.3 Limits

| Limit | Value | Tier, source |
|---|---|---|
| Sub-issues per parent | 100 | consensus: GitHub Docs "Adding sub-issues" and the `sub-issue_limit: '100'` variable |
| Sub-issue nesting levels | 8 | consensus: same page |
| Sub-issue parent | one per child | consensus: `replaceParent` exists to move a child |
| "Blocked by" / "blocking" count per issue | not documented | gap; `gh issue view` reads 50 |
| GraphQL connection size | `first`/`last` between 1 and 100 | consensus: GraphQL limits page |
| GraphQL nodes per call | 500,000 | consensus: same |
| GraphQL timeout | 10 s, extra primary points deducted after a timeout | consensus: same |
| GraphQL primary limit | 5,000 points per hour per user; cost = connection requests / 100, minimum 1 | consensus: same; observed cost 1 |
| REST `per_page` | up to 100 | consensus: REST description |
| Secondary: concurrency | 100 concurrent requests, shared by REST and GraphQL | consensus |
| Secondary: per endpoint | 900 points/min REST, 2,000 points/min GraphQL; POST/PATCH/PUT/DELETE 5 points, GET 1; GraphQL mutation 5, query 1 | consensus |
| Secondary: CPU time | 90 s per 60 s, of which at most 60 s GraphQL | consensus |
| Secondary: content creation | about 80 per minute and 500 per hour; "some endpoints have lower" limits; web UI actions count | consensus |
| Secondary: guidance | requests serially; one second between each mutating request | consensus: best-practices page |
| Transfer pacing | no more than 100 transfers per hour recommended; destination repository's content creation is the limit | opinion: one GitHub-employed `gh` maintainer, 2023 |
| Observed transfer throttling | about 20 consecutive transfers succeeded, then opaque errors, for one reporter in 2021 | opinion: one report, cli/cli#4691 |

The mutation points are not the binding constraint: even 100 mutations cost 500 points against 2,000 per minute. The
content-creation counts (80 per minute, 500 per hour) bind first, then the undocumented lower per-endpoint limits.

### 3.4 Errors, detection and `gh api` behaviour

**GraphQL error shape (observed, query; mutation refusals are not documented).**

```json
{"data":{"repository":null},"errors":[{"type":"NOT_FOUND","path":["repository"],"locations":[{"line":1,"column":19}],"message":"Could not resolve to a Repository with the name 'nope/x'."}]}
```

A mutation refusal has the same envelope with `data.<mutation>: null` and the entry's `path` naming the mutation;
the `type` values seen in client code are `NOT_FOUND` (observed) and `RATE_LIMITED` (primary limit, in the Octokit
throttling plugin). The documented text of a refused `transferIssue`, `addSubIssue` or `addBlockedBy` could not be found
(Gaps); the rehearsal captures the full JSON body of each refusal it meets, which is why the scripts keep stdout.
A throttled transfer has been reported as an opaque error, not a rate-limit message: "Something went wrong while
executing your query. Please include `<request id>` when reporting this issue", with `Locations: []`, whose underlying
cause a GitHub-employed `gh` maintainer gives as "was submitted too quickly".

**`gh api` 2.100.0 (source `pkg/cmd/api/api.go`, confirmed by observation):**

- GraphQL: `parseErrorResponse` reads the top-level `errors`; any non-empty `errors` array becomes a `serverError`, the
  body is still printed (the `--jq` filter is skipped: `if opts.FilterOutput != "" && serverError == ""`), `gh: <messages
  joined by newline>` goes to stderr, and the exit status is 1 (`cmdutil.SilentError`). Observed with a query that
  returned partial data plus one error: `data` filled for one alias, exit 1, raw JSON on stdout.
- REST: status above 299 prints the JSON body to stdout and `gh: <message> (HTTP <status>)` to stderr, exit 1.
- There is no retry or backoff anywhere in `api.go` or `api/http_client.go` at that tag.
- `--include` (`-i`) prints the status line and headers (`retry-after`, `x-ratelimit-remaining`, `x-ratelimit-reset`) to
  stdout before the body; the mutating helper uses it when it needs `retry-after`.
- Other exit codes: 0 success, 1 any failure, 2 cancelled, 4 authentication required (`gh help exit-codes`).

**Secondary-limit detection (consensus).** REST: 403 or 429 with a message that says a secondary rate limit was
exceeded. GraphQL: status 200 or 403 with an error message that says so, so a 200 can carry the refusal. Reaction per
GitHub: wait `retry-after` seconds if present; else if `x-ratelimit-remaining` is `0`, wait until `x-ratelimit-reset`;
else at least one minute; if still failing, wait exponentially longer and give up after a fixed number of retries.
Practice (Octokit throttling plugin): detects with `/\bsecondary rate\b/i` on the error message, falls back to 60 s
because "The Retry-After header can sometimes be blank", spaces writes by `minTime: 1000` with one request at a time.

### 3.5 Windows Git Bash and Python 3.14 (observed 2026-11-09)

- **Leading slash.** `gh api /rate_limit` fails with `invalid API endpoint: "C:/Program Files/Git/rate_limit". Your shell
  might be rewriting URL paths as filesystem paths. To avoid this, omit the leading slash from the endpoint argument`;
  `MSYS_NO_PATHCONV=1` also fixes it. All forms here use no leading slash.
- **`-f` and `-F`.** `-f` is a raw string. `-F` converts `true`, `false`, `null` and integers to JSON types, reads
  `@file`, and substitutes `{owner}`, `{repo}`, `{branch}`. Use `-F` for booleans, integers and `@file`, and `-f` for all
  other strings (labels such as `type: tracking` go as `-f 'labels[]=type: tracking'`). Array variables for GraphQL use
  `-f 'ids[]=...'` (observed).
- **Non-ASCII.** Arguments in `-f` reached GitHub intact (observed). Bodies of 9 KB are passed with `-F body=@file`.
- **Python.** `python 3.14.7` here reports `sys.stdout.encoding` `cp1252`, `locale.getpreferredencoding()` `cp1252` and
  UTF-8 mode off: `json.load(open(path))` raised `UnicodeDecodeError` on a UTF-8 file; scripts open files with
  `encoding="utf-8"`, call `subprocess.run(..., capture_output=True, encoding="utf-8")` (the default would decode `gh`'s
  UTF-8 output as cp1252), and run as `python -X utf8 -I script.py` (or set `PYTHONUTF8=1`) so a `print` of non-ASCII to
  a pipe does not raise.

### 3.6 Fixture ordering consequence

Because pull requests and issues share one counter and an issue cannot be created closed, the fixture is built strictly
serially: create the issues up to the number before the pull request, then the pull request (branch, commit, pull
request), then the next issue, each with `number` compared against the expected value, then closes and comments. No
parallel creation and no creation in the target before its walk step, or the numbers diverge.

## 4. How comparable projects do it

- **GitHub CLI 2.100.0** ([tag](https://github.com/cli/cli/tree/v2.100.0)): `gh issue transfer` is `transferRun` and
  `issueTransfer` in `pkg/cmd/issue/transfer/transfer.go`, which sends `githubv4.TransferIssueInput{IssueID, RepositoryID}`
  after `FindIssueOrPR` and `api.IssueRepoInfo`. `gh issue edit` links through `issueShared.ResolveIssueRef` (number or
  URL, cross-repository allowed, same host only) then `api.DeferredUpdateIssue`. `gh issue view --json` builds its
  selection in `api/query_builder.go` (the field-to-selection switch: `blockedBy(first:50)`, `subIssues(first:100)`).
  `gh api` error handling is `processResponse` and `parseErrorResponse` in `pkg/cmd/api/api.go`; GraphQL
  pagination is `findEndCursor` in `pkg/cmd/api/pagination.go`.
- **`@octokit/plugin-throttling`** ([source](https://github.com/octokit/plugin-throttling.js/blob/eb4215edcd97f20ade800b18d964bf798e0d70b7/src/index.ts),
  main as of 2026-08-01): a write group with `maxConcurrent: 1, minTime: 1000`, a search group `minTime: 2000`, a
  notifications group `minTime: 3000`; secondary-limit detection by message; 60 s fallback wait.
- **GitHub's own guidance** ([best practices for the REST API](https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/rest/using-the-rest-api/best-practices-for-using-the-rest-api.md)):
  serial requests, one second between mutating requests, the retry rules of section 3.4.
- **Bulk transfer practice:** the cli/cli issues #4691 and #6920 are the public record of scripted bulk transfers
  failing with the opaque message once the destination had received many issues in a short time; the advice there is to
  pause (an hour after a failure) and to stay under about 100 transfers per hour.

## 5. Pitfalls and regrets

- **A throttled transfer does not say so.** The opaque "Something went wrong while executing your query" is the reported
  face of "was submitted too quickly". Reading the message for "secondary rate" is not enough for transfers: treat that
  message on `transferIssue` as a throttle, and read both repositories before any retry.
- **A write that errors may have landed.** After any error on a mutation the script reads the target state (issue exists
  at the expected number, link present) before retrying; retrying a transfer blindly would move a second issue and shift
  every later number.
- **`--jq` hides errors.** A `--jq` filter is skipped when `errors[]` is present, so a script that pipes `gh api ... --jq`
  straight into a parser receives the raw error body in place of the expected rows. Check the exit status first.
- **`-F` silently retypes values.** An all-digit label colour or a numeric-looking title sent with `-F` is a JSON number.
- **`replaceParent` through `gh issue edit`.** `--add-sub-issue` and `--parent` re-parent silently.
- **Truncation.** `gh issue view` caps "blocked by" and "blocking" at 50 with no cursor; a nested connection that returns
  `hasNextPage: true` in the page query is a hard failure, not something to ignore.
- **Mergeability is asynchronous.** A pull request merged while `mergeable` is `null` can be refused.
- **Pull requests are gaps in GraphQL `issues`.** A census from `Repository.issues` has holes at pull request numbers.
- **Python on this machine is not UTF-8 by default.** Every non-ASCII fixture text (and every body of 9 KB with such
  text) needs explicit encodings on both file and subprocess I/O.
- **The ordering of comments is not a documented sort.** The connection has no creation-time `orderBy`; the script
  verifies ascending `createdAt` rather than trusting the default.

## 6. Recommendation for this repository

Build the fixture with `gh api` REST calls (3.1.1 to 3.1.6) and make the transfer and every link with GraphQL
mutations using node ids (3.1.7); read with the single GraphQL page query of 3.2.1, driven by a small Python loop that
owns the cursor, treats any nested `hasNextPage` as a failure, and compares edge sets (3.2.2). Reasons: REST creation
returns every id the next step needs in one response and takes names for labels, so no lookups; the GraphQL link and
transfer mutations are the only forms with node-id addressing that also cover cross-repository ends and a pinned target
repository id; and one page of 25 issues costs 1 primary point and about two seconds while a REST read of the same
needs more than a hundred calls. Reject `gh issue transfer` (three requests, name-addressed target, opaque result), `gh
issue edit --add-sub-issue` (silent re-parent), and `gh issue view --json` (50-item truncation, one process per issue).

Copy-ready pieces: the forms of section 3.1; the query and run line of 3.2.1; the census of 3.2.4; the helper below.

```python
import json, subprocess, time

def gh_graphql(query, **variables):
    cmd = ["gh", "api", "graphql", "-f", "query=" + query]
    for k, v in variables.items():
        if v is not None:
            cmd += ["-f", f"{k}={v}"]          # strings only; never type-converted
    p = subprocess.run(cmd, capture_output=True, encoding="utf-8")
    body = json.loads(p.stdout) if p.stdout.lstrip().startswith("{") else {}
    if p.returncode != 0 or body.get("errors"):  # gh exits 1 on any errors[], with or without data
        raise RuntimeError(json.dumps({"exit": p.returncode, "stderr": p.stderr.strip(),
                                       "errors": body.get("errors")}))
    return body["data"]

def read_repo(owner, name, query, conns=("labels", "comments", "subIssues", "blockedBy", "blocking")):
    issues, cursor = [], None
    while True:
        repo = gh_graphql(query, owner=owner, name=name, cursor=cursor)["repository"]
        page = repo["issues"]
        for node in page["nodes"]:
            for c in conns:
                if node[c]["pageInfo"]["hasNextPage"]:
                    raise RuntimeError(f"{owner}/{name}#{node['number']}: {c} needs a continuation page")
            issues.append(node)
        if not page["pageInfo"]["hasNextPage"]:
            return repo, issues
        cursor = page["pageInfo"]["endCursor"]
```

(Run and observed to return 28 issues and 76 edges for `KotlinBottools` and 9 issues and 28 edges for `MagicBot`.)

**Pacing rule for the writes (about 100 to 150 across the rehearsal):**

1. One request at a time; never background or parallel.
2. After each write, run its read-back (at least 1 s, the documented floor, is spent anyway); then sleep 3 s before the
   next write. After each `transferIssue`, sleep 10 s. Total: well under 80 per minute, and under 500 per hour for a
   rehearsal of this size; transfers stay far under 100 per hour.
3. Mutations run as `gh api -i ...` so `retry-after` is visible; success is exit 0 with no `errors[]`.
4. On exit 1: if the message matches `secondary rate`, `abuse detection`, `submitted too quickly`, or (for
   `transferIssue`) `Something went wrong while executing your query`, first read back whether the write landed. If not,
   wait `retry-after` seconds if the header is present, else until `x-ratelimit-reset` if `x-ratelimit-remaining` is 0,
   else 60 s; then 120 s, 240 s; stop after four attempts and report with the full response body. Any other error is not
   retried and stops the step.
5. Before each write, check it is not already done (label, milestone, issue at that number, link present), so a re-run
   is idempotent.

## 7. Load-bearing claims

1. **Sub-issue breadth and depth.** "You can add up to {% data variables.projects.sub-issue_limit %} sub-issues per
   parent issue and create up to eight levels of nested sub-issues." and, in `data/variables/projects.yml`,
   `sub-issue_limit: '100'`. Source: GitHub Docs, `content/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues.md`
   at <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues.md>
   and <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/data/variables/projects.yml>
   (`github/docs` at `8cd1075`, 2026-11-06).
2. **GraphQL page size, node limit, timeout.** "Values of `first` and `last` must be within 1-100." and "Individual
   calls cannot request more than 500,000 total" nodes, and "takes more than 10 seconds to process an API request".
   Source: GitHub Docs, `content/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api.md`,
   <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api.md>
   (2026-11-06).
3. **GraphQL cost and secondary status.** "Divide the number by **100** and round the result to the nearest whole number
   to get the final aggregate point value." and "If you exceed a secondary rate limit, the response status will be `200`
   or `403`". Same page and commit.
4. **Secondary rate limits.** "No more than 100 concurrent requests are allowed." and "In general, no more than 80
   content-generating requests per minute and no more than 500 content-generating requests per hour are allowed. Some
   endpoints have lower content creation limits." and the table row "Most REST API `POST`, `PATCH`, `PUT`, or `DELETE`
   requests | 5". Source: `data/reusables/rest-api/secondary-rate-limit-rest-graphql.md`,
   <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/data/reusables/rest-api/secondary-rate-limit-rest-graphql.md>
   (2026-11-06).
5. **Serial requests and one second between writes.** "you should make requests serially instead of concurrently." and
   "wait at least one second between each request." Source: GitHub Docs, REST "Best practices",
   <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/rest/using-the-rest-api/best-practices-for-using-the-rest-api.md>
   (2026-11-06).
6. **Retry rules.** "If the `retry-after` response header is present, you should not retry your request until after that
   many seconds has elapsed." and "Otherwise, wait for at least one minute before retrying. If your request continues to
   fail due to a secondary rate limit, wait for an exponentially increasing amount of time between retries, and throw an
   error after a specific number of retries." Same best-practices page and commit.
7. **Transfer scope.** "When you transfer an issue, comments and assignees are retained. Labels and milestones are also
   retained if they're present in the target repository, with labels matching by name and milestones matching by both
   name and due date." and "A private repository issue cannot be transferred to a public repository." Source: GitHub Docs,
   <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository.md>
   (2026-11-06).
8. **Transfers are throttled as content creation.** "this is a content creation limit on the API level. The underlying
   error is `was submitted too quickly`, i.e. too many issues in the destination repo were created in a short amount of
   time." and "I would suggest writing a script that avoids transferring more than 100 issues per hour." Source:
   comment by `mislav` on <https://github.com/cli/cli/issues/6920> (2023-01-27 issue; one maintainer's statement).
9. **`gh issue transfer` is three requests.** "a single `gh issue transfer 123 owner/repo` results in 3 underlying API
   requests". Source: comment by `mislav` on <https://github.com/cli/cli/issues/4691> (2021).
10. **`gh issue transfer` sends no label option.** Source code: the variables map is `"input": githubv4.TransferIssueInput{`
    followed by the two fields `IssueID` and `RepositoryID` only. Source: `pkg/cmd/issue/transfer/transfer.go` at tag v2.100.0,
    <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/issue/transfer/transfer.go>.
11. **`gh issue edit --add-sub-issue` re-parents.** Source code: `return AddSubIssue(client, opts.Hostname, opts.IssueID, id, true)`
    in `DeferredUpdateIssue`, and `ReplaceExistingParent: true,` in `deferredUpdateIssueOptions`. Sources:
    <https://github.com/cli/cli/blob/v2.100.0/api/queries_issue.go> and
    <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/issue/edit/edit.go> (tag v2.100.0).
12. **`gh issue view --json` truncates links.** Source code: ``q = append(q, `blockedBy(first:50){nodes{id,number,title,url,state,repository{nameWithOwner}},totalCount}`)``.
    Source: <https://github.com/cli/cli/blob/v2.100.0/api/query_builder.go> (tag v2.100.0).
13. **`gh api` GraphQL error behaviour.** Source code: `if opts.FilterOutput != "" && serverError == "" {`,
    `fmt.Fprintf(opts.IO.ErrOut, "gh: %s\n", serverError)` and `err = cmdutil.SilentError`. Source:
    <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/api/api.go> (tag v2.100.0). Observed 2026-11-09, `gh` 2.100.0:
    exit 1 with unfiltered JSON on stdout for a response with `data` and `errors`.
14. **`gh api` GraphQL pagination follows the first `pageInfo`.** Source code: in `findEndCursor`,
    `} else if contextKey == "pageInfo" && lastKey == "endCursor" {` and `if contextKey == "pageInfo" && lastKey == "hasNextPage" {`;
    the loop breaks (`break loop`) as soon as one `endCursor` and one `hasNextPage` have been read. Source: <https://github.com/cli/cli/blob/v2.100.0/pkg/cmd/api/pagination.go> (tag v2.100.0).
15. **`-F` conversion rule.** "literal values `true`, `false`, `null`, and integer numbers get converted to appropriate
    JSON types;" and "if the value starts with `@`, the rest of the value is interpreted as a filename to read the value
    from." Source: `gh api --help`, `gh` 2.100.0 (2026-09-03).
16. **Issue creation and update fields.** REST `issues/create`: "`parent_issue_id` ... The id of the parent issue to add
    this issue to as a sub-issue."; `issues/update`: `state_reason` "The reason for the state change. Ignored unless
    `state` is changed." with enum `completed`, `not_planned`, `duplicate`, `reopened`. Source: GitHub REST description,
    `descriptions/api.github.com/api.github.com.json` at
    <https://github.com/github/rest-api-description/blob/2f8f80e47ea4d3292cf4e37ba9d9b25475e06140/descriptions/api.github.com/api.github.com.json>
    (commit `2f8f80e`, 2026-11-07).
17. **Repository create fields.** `auto_init`: "Pass `true` to create an initial commit with empty README." (default
    `false`); `has_issues`: "Either `true` to enable issues for this repository or `false` to disable them." (default
    `true`); `private` default `false`. Same REST description and commit.
18. **Empty repositories.** "Empty repositories are repositories without branches." Same REST description, `git/create-ref`.
19. **Mergeability is asynchronous.** "If the value is `null`, then GitHub has started a background job to compute the
    mergeability. After giving the job time to complete, resubmit the request." Same REST description, `pulls/get`.
20. **REST sub-issue and dependency endpoints.** `sub_issue_id`: "The id of the sub-issue to add. The sub-issue must
    belong to the same repository owner as the parent issue"; `issue_id`: "The id of the issue that blocks the current
    issue". Same REST description.
21. **GraphQL link and transfer inputs.** `AddSubIssueInput.replaceParent`: "Option to replace parent issue if one already
    exists"; `AddBlockedByInput.issueId`: "The ID of the issue to be blocked."; `AddBlockedByInput.blockingIssueId`: "The ID
    of the issue that blocks the given issue."; `TransferIssueInput.createLabelsIfMissing`: "Whether to create labels if they
    don't exist in the target repository (matched by name)". Source: GitHub GraphQL schema by introspection through
    `gh api graphql` (`__type(name: ...)`), 2026-11-09, `gh` 2.100.0.
22. **Pull requests are issues.** "Every pull request is an issue, but not every issue is a pull request." Source: the
    REST description of `issues/create-comment` at the commit of claim 16.
23. **Archived repositories are read-only.** "When a repository is archived, its issues, pull requests, code, labels,
    milestones, projects, wiki, releases, commits, tags, branches, reactions, code scanning alerts, comments and
    permissions become read-only." Source: GitHub Docs, "Archiving repositories",
    <https://github.com/github/docs/blob/8cd1075179df75319912891d6620c9cb78eefb4d/content/repositories/archiving-a-github-repository/archiving-repositories.md>
    (2026-11-06).
24. **Practice of a widely used client.** Source code: `id: "octokit-write",` with `maxConcurrent: 1,` and `minTime: 1000,`
    in the write group, and the comment "The Retry-After header can sometimes be blank when hitting a secondary rate
    limit". Source: <https://github.com/octokit/plugin-throttling.js/blob/eb4215edcd97f20ade800b18d964bf798e0d70b7/src/index.ts>
    (commit `eb4215e`, 2026-08-01).
25. **CLI link flags exist in 2.100.0.** `gh issue create --help` lists `--blocked-by numbers`, `--blocking numbers` and
    `--parent number`; `gh issue edit --help` lists `--add-sub-issue number`, `--add-blocked-by number`, `--parent number`.
    Source: `gh` 2.100.0 help output (2026-11-09); the feature arrived in v2.94.0 per the GitHub changelog of 2026-06-10,
    <https://github.blog/changelog/2026-06-10-manage-sub-issues-types-and-dependencies-from-github-cli/> ("As of v2.94.0, you
    can now work with issue hierarchy, types, and dependencies directly from gh.").

## 8. Gaps

- **Refusal texts are not established.** What `transferIssue`, `addSubIssue` and `addBlockedBy` return when refused
  (closed issue, link at the wrong place, duplicate link, child that already has a parent, link across visibility) is not
  documented and could not be observed without a write. Only the generic envelope (observed on a query), the opaque
  throttled-transfer message (one maintainer, 2023) and the third-party skill file's reports ("Child is already a
  sub-issue of this parent", "Add `replaceParent: true` to move a sub-issue from another parent") exist. The scripts
  must store each full refusal body; the rehearsal measures them.
- **Whether `addSubIssue` without `replaceParent` refuses a child that already has a parent** rests on the field's
  description plus a third-party file; the rehearsal measures it.
- **"Blocked by" and "blocking" count limits per issue** were not found in any official page.
- **Per-endpoint content-creation limits** (the "some endpoints have lower" limits) are undisclosed. The 100-transfers-per-hour
  advice and the "about 20 then errors" report are single-source opinions; the rehearsal's roughly 10 transfers are
  far below both, so the walk's pacing, not the rehearsal's, is where this matters.
- **Whether an issue reopened through REST reads `state_reason: reopened`**, and whether its node id changes on
  transfer, are not documented here; the rehearsal records both. The procedure uses the transfer payload's `issue.id`
  and never a cached id.
- **Delay between creating a pull request and `mergeable` becoming non-null** is not documented; poll, and record it.
- **A fresh `auto_init` repository's first commit** may not be readable at once; the procedure reads
  `git/ref/heads/main` with a short retry. Unverified timing. Likewise `GET .../commits` on B is expected to answer HTTP
  409 "Git Repository is empty" (from memory, not checked); the procedure relies on `branches` returning `[]`.
- **REST create-issue behaviour with a label name that does not exist** (silently creating it) is not in the description
  read; the fixture creates labels first and reads them back.
- **Archived repositories of this organisation** could not be read (none exist); reads of a public archived repository
  and of a private one succeeded, and the rehearsal's archived pair is the final proof.
- **Issue body limit** (65,536 characters is the commonly cited figure) was not checked; the fixture's 9 KB bodies are
  far below it.
- **Comment order.** The default order of `Issue.comments` is not documented; the read script verifies ascending
  `createdAt` (observed true on every issue of the two repositories read).
- **The brief gave no repository state for the rehearsal pair**, so none of the write forms was run; every write form
  above is checked against the REST description, the GraphQL schema and `gh` source, not executed.
