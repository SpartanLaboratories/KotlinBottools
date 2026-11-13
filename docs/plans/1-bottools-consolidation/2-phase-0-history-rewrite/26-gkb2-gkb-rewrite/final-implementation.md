# Phase 0 · 6 — Rewriting GKB2 and GKB: as-built record

- **Covers:** [SpartanLaboratories/KotlinBottools#26](https://github.com/SpartanLaboratories/KotlinBottools/issues/26),
  *"Phase 0 · 6 — Rewrite GKB2 and GKB"*.
- **Related:** [`plan.md`](plan.md), the procedure this record is measured against; [`consequences.md`](consequences.md).

This record holds counts, statuses and fixed markers only.

## Deviations

1. **`S0.grant` prints eight `ok` lines and one `RECORD` line.** [Plan, Procedure, "S0 — Readiness", `S0.grant`](plan.md#s0--readiness)
   expects eight `ok` lines, or seven and a `RECORD` line. The tool (`s0-ready.sh`, step `grant`, Appendix A) makes eight checks
   before it compares the wording, so its output is nine `ok` lines, or eight and a `RECORD` line. The step ended with status 0 and
   `STAGE S0.grant OK`. The `RECORD` line is the plan's own case of a wording that differs: the section in place holds the plan's
   five lines and one further line, and its actions, issue, branch, targets and end are as the plan needs.
2. **The request-written line carries the request's key.** [Plan, Procedure, "Steps 1 to 9 of a repository", `S?.5`](plan.md#steps-1-to-9-of-a-repository)
   expects `ok    request written: requests/push-<repo>.json (6 commands, …)`. The tool (`g26_req.py`, `cmd_build`, Appendix A) prints
   `(key push-<repo>, 6 commands, expected tally …)`. Seen at `S1.5` and at `S2.5`, and again where each request step rebuilds the
   file, at `S1.6.request` and `S2.6.request` (4 lines in all). Each step ended with status 0 and its closing line.
3. **The first `request` of a repository prints two shell error lines that name files of the data folder.**
   [Plan, Design, "The output rule"](plan.md#the-output-rule) and Requirements, goal 7, say no machine-local path is printed. In
   `p6-push.sh`, step `request` (Appendix A), the two reads of the class file and the key file of the last attempt redirect standard
   input from a file that does not exist before the first attempt; the shell reports each failed redirection itself, with the file's
   path, before the command's own `2> /dev/null` applies. The two lines reach the console and the run log in the data folder, which is
   never committed. The step's result is unaffected: both values are empty, as a first send needs, and the step printed its `PROCEED`
   line with status 0. Seen at `S1.6.request` and at `S2.6.request` (2 lines each).
4. **GKB2's push request was run under one id as two attempts, and its one reply reports attempt 2.**
   [Plan, Design, "The requests"](plan.md#the-requests) has `attempt` as the number of stored replies plus one, and names no rerun by
   the request service of a request it had not carried out. The request was sent once, as attempt 1, the `PROCEED` line's number. That
   attempt was not carried out: the request service's shell call was refused before any entry of the procedure started, so no guard,
   dry run or push ran, nothing was printed and none of the four stream files was created; a read-back showed `master` still at its
   old tip. Its answer was of the kind the plan does not store. Once the cause was removed, the request service ran the same request
   again itself, under the same id, as attempt 2; nothing was sent a second time. That run carried out the six entries once, with
   status 0. The key therefore has one reply, which reports attempt 2 where the `PROCEED` line said attempt 1. GKB's request was
   carried out on its first attempt.

   Where the evidence is: the read-back after the first attempt (`master` at its old tip, none of the four stream files present) was
   made directly against the remote and the record folder at 2026-11-13T06:01:41Z, outside the runner, so the run log does not hold
   it. The run holds the equivalent evidence. The stored reply of attempt 2 carries the third guard's marker,
   `SERVER-HEADS-AND-TAGS-ARE-THE-OLD-COLUMN`, printed before its push: the server's heads and tags still equalled the old column
   when attempt 2 started. And the repository's activity feed, 19 entries at `S0.repos`, holds 20 entries with exactly 1 forced
   update, as read after the close-out (GKB: 9 entries, then 10 with exactly 1).
5. **What is stored as a reply is the reply's printed lines, one per line.**
   [Plan, Procedure, Conventions, "A request STEP", item 3](plan.md#conventions) has the reply text pasted into the heredoc. The reply
   arrives as one document that holds the procedure's printed lines as list entries on a single line, and the classifier
   (`g26_req.py`, `parse_rc`, Appendix A) reads a status line (`dry rc=<n>`, `push rc=<n>`) only where it starts a line: on the
   document as received it finds neither status, which it classes as `stopped-by-guard`. By the owner's decision, made on
   2026-11-13, the stored text is the reply's printed lines alone, in order, one per line, nothing added or dropped, for both
   repositories. Each stored reply holds 11 lines after its status header, GKB2's and GKB's alike, with no id of a history and no
   path. The reply's envelope, its id and attempt, is in deviation 4. With that text `S1.6.check` and `S2.6.check` each printed the
   plan's expected `CLASS pushed` line and their `STAGE` line.
6. **A passing self-test prints an eight-line traceback, three lines of which carry a machine-local path.**
   [Plan, Design, "The output rule"](plan.md#the-output-rule) and Requirements, goal 7, say no machine-local path is printed. In
   `gselftest.sh` (Appendix A), where it prepares the made-up checkout for the landing's document checks, the first call of
   `scrub_expressions.py` runs before the folder of its output file exists, and only its standard output is discarded: the tool ends
   with a traceback on standard error, and the alternative branch then makes the folder and runs the tool again, which succeeds. It
   happens by construction, on every run. The eight lines reach the console and the run log in the data folder, which is never
   committed; three of them carry a path of the self-test's sandbox under the workspace. The self-test's result is unaffected: it
   ended with `ok    gselftest: 132 checks passed` and status 0. This unit's part of the run log holds 7 path-carrying lines in all,
   the 4 of deviation 3 and these 3, and no forty-digit id.
7. **Two scripts besides the parameter table name the repositories.** [Plan, Design, "The tools"](plan.md#the-tools) says no script
   but the parameter table names GKB2 or GKB. `s0-ready.sh`, step `grant` (Appendix A), holds both target names in its check that the
   grant's scope names both targets. `gselftest.sh` (Appendix A) selects the parameter table's two rows by those names to take the
   probe arguments of its fixtures, and names one target where it makes the grant's text lack it. Two header comments name them as
   well (`p7-verify.sh`, `g26_req.py`). Every step script takes the repository as its argument, as the plan says.
8. **The run records hold each request's key file.** [Plan, Design, "Records and where they live"](plan.md#records-and-where-they-live)
   lists the contents of the run-record folder without `push-<repo>.key`. `p6-push.sh`, step `request` (Appendix A), writes that file,
   the key of the last request, and `S3.record` checksums it: 2 of the 33 run records.
9. **Each request's procedure ran as one shell.** The self-test's stand-in for the request service (`gselftest.sh`, `run_proc`,
   Appendix A), on which the component self-test of [the Test plan](plan.md#test-plan) rests, carries each of the six entries out in
   a shell of its own. Each of the two requests was carried out as six entries in one shell, once, with status 0, as its reply
   reported. That is what each request asked for: its note named the one shell (deviation 10). The result is the same: every entry
   sets what it uses, as [Design, "The requests"](plan.md#the-requests) requires of the procedure, and every guard ends the shell,
   so no later entry runs after a guard's stop either way.
10. **Each push request was sent as a reference to its request file, not as the file's contents.**
    [Plan, Design, "The requests"](plan.md#the-requests) has the file's contents sent as one request, and its field table holds no
    file, hash or note field; [Procedure, Conventions, "A request STEP", item 2](plan.md#conventions) says the same of the send. Each
    of the two requests carried `action`, `github`, `issue`, `mirror`, `permissionReason` and `target`, the request file's absolute
    path, the file's sha256 and a note, and no `procedure`, `inputs` or `checks` of its own. The request service compared the hash
    with the file and ran the file's procedure. The note asked that the six entries be run as one shell, unchanged and in order, in
    a single call, and that every printed line be given in the reply. The hash sent equals the request file as it stands for both
    repositories: GKB2's file holds 9,199 bytes and GKB's 9,154, and each file's sha256 is also the one the run records' checksum
    list holds for it. The reason: the file reaches the request service byte for byte, with nothing transcribed.
