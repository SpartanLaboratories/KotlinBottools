#!/usr/bin/env python3
"""Safe wrapper around "gitleaks git" / "gitleaks dir" for history purges and CI.

Every line this script prints is a count, a rule id, a fixed marker, or a command exit status. It never prints
a file path, a secret, a match, a commit id, an author or a commit message, whatever the report contains.

Subcommands
  scan           run gitleaks, check that the scan really happened, print counts by rule id
  control        compare a report with an independent count taken from "git log --numstat"
  canary-make    create a throwaway repository with planted fake secrets (random, generated at run time)
  canary-check   check a canary scan report against the exact expected counts

Exit statuses of "scan": 0 clean, 1 findings present (all consistency checks passed), 2 consistency check failed.
Run with "python -I" (isolated mode).
"""
import argparse
import base64
import collections
import json
import os
import re
import secrets
import string
import subprocess
import sys
import tomllib

REFS = {
    "all": "--all",
    "branches": "--branches --tags",
}
ANSI = re.compile(r"\x1b\[[0-9;]*m")


class GitFailed(Exception):
    pass


def log_opts(refs):
    """The git log options handed to gitleaks (--log-opts); they replace gitleaks' own defaults."""
    return "--full-history " + REFS[refs] + " --no-renames -m --diff-filter=tuxdb"


def git_numstat(repo, refs):
    """Yield (commit, added, deleted, path) for every file change that git log reports for these options."""
    cmd = ["git", "-c", "core.quotepath=false", "-C", repo, "log"] + REFS[refs].split() + [
        "-m", "--no-renames", "--diff-filter=tuxdb", "--numstat", "--format=%x01%H"]
    proc = subprocess.run(cmd, capture_output=True)
    if proc.returncode != 0:
        raise GitFailed("git log failed with status %d" % proc.returncode)
    commit = None
    for raw in proc.stdout.split(b"\n"):
        raw = raw.rstrip(b"\r")
        if raw.startswith(b"\x01"):
            commit = raw[1:]
            continue
        parts = raw.split(b"\t", 2)
        if commit is not None and len(parts) == 3:
            yield commit, parts[0], parts[1], parts[2].decode("utf-8", "replace")


def scannable(added, deleted):
    """A change gitleaks yields a fragment for: a text file (numstat is not "-") with at least one changed line."""
    return added != b"-" and (added != b"0" or deleted != b"0")


def expected_commits(repo, refs):
    return len({c for c, a, d, _ in git_numstat(repo, refs) if scannable(a, d)})


def load_report(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, list):
        raise ValueError("report is not a JSON array")
    return data


def print_rule_counts(findings):
    counts = collections.Counter(x["RuleID"] for x in findings)
    for rule in sorted(counts):
        files = len({x["File"] for x in findings if x["RuleID"] == rule})
        print("rule %s findings=%d files=%d" % (rule, counts[rule], files))


def cmd_scan(a):
    mode = a.mode
    expected = expected_commits(a.repo, a.refs) if mode == "git" else 0
    cmd = [a.gitleaks, mode, a.repo, "--config", a.config, "--redact=100", "--no-banner", "--no-color",
           "--exit-code", "2", "--report-format", "json", "--report-path", a.report]
    if mode == "git":
        cmd += ["--log-opts", log_opts(a.refs)]
    with open(a.log, "wb") as logf:
        rc = subprocess.run(cmd, stdout=logf, stderr=subprocess.STDOUT).returncode
    with open(a.log, encoding="utf-8", errors="replace") as f:
        log = ANSI.sub("", f.read())  # a few early messages are coloured even with --no-color
    problems = []
    err_lines = len(re.findall(r"\s(?:ERR|FTL)\s", log))
    if err_lines:
        problems.append("log has %d ERR/FTL lines" % err_lines)
    if rc not in (0, 2):
        problems.append("gitleaks exit status %d" % rc)
    try:
        findings = load_report(a.report)
    except (OSError, ValueError) as e:
        findings = []
        problems.append("report unreadable (%s)" % type(e).__name__)
    m = re.search(r"leaks found: (\d+)", log)
    logged = int(m.group(1)) if m else 0
    if logged != len(findings):
        problems.append("log says %d findings, report holds %d" % (logged, len(findings)))
    if (rc == 2) != (len(findings) > 0):
        problems.append("exit status and report disagree")
    if mode == "git":
        m = re.search(r"(\d+) commits scanned\.", log)
        scanned = int(m.group(1)) if m else -1
        print("commits_scanned=%d expected_commits=%d" % (scanned, expected))
        if expected < 1:
            problems.append("fewer than one scannable commit")
        if scanned != expected:
            problems.append("scanned commits differ from the independent count")
    else:
        m = re.search(r"scanned ~(\d+) bytes", log)
        scanned = int(m.group(1)) if m else 0
        print("bytes_scanned=%d" % scanned)
        if scanned < 1:
            problems.append("no bytes scanned")
    print("gitleaks_exit=%d error_lines=%d findings=%d" % (rc, err_lines, len(findings)))
    print_rule_counts(findings)
    if problems:
        for p in problems:
            print("GATE FAILED: " + p)
        return 2
    print("RESULT: " + ("FINDINGS" if findings else "CLEAN"))
    return 1 if findings else 0


def cmd_control(a):
    findings = load_report(a.report)
    with open(a.config, "rb") as f:
        cfg = tomllib.load(f)
    git_paths = {p for _, ad, de, p in git_numstat(a.repo, a.refs) if scannable(ad, de)}
    rule_paths = {}
    for rule in cfg.get("rules", []):
        if "path" in rule and "regex" not in rule:
            rule_paths[rule["id"]] = re.compile(rule["path"])
    for rule_id, pat in rule_paths.items():
        x = len({f["File"] for f in findings if f["RuleID"] == rule_id})
        y = sum(1 for p in git_paths if pat.search(p))
        print("rule %s report_files=%d git_files=%d%s" % (rule_id, x, y, "" if x <= y else " IMPOSSIBLE"))
    for spec in a.probe_name:  # RULE:FILENAME, a fixed name taken from the plan
        rule_id, name = spec.split(":", 1)
        n = sum(1 for f in findings if f["RuleID"] == rule_id and f["File"] == name)
        print("probe %s file=%s findings=%d" % (rule_id, name, n))
    for spec in a.probe_prefix:  # RULE:PREFIX, a fixed directory prefix taken from the plan
        rule_id, prefix = spec.split(":", 1)
        x = len({f["File"] for f in findings if f["RuleID"] == rule_id and f["File"].startswith(prefix)})
        pat = rule_paths.get(rule_id)
        y = sum(1 for p in git_paths if p.startswith(prefix) and pat is not None and pat.search(p))
        print("probe %s prefix=%s report_files=%d git_files=%d" % (rule_id, prefix, x, y))
    return 0


ALPHABET = string.ascii_letters + string.digits + "_-"


def rnd(n):
    return "".join(secrets.choice(ALPHABET) for _ in range(n))


def fake_token():
    # The shape of a Discord bot token; random, generated at run time, never written into this repository.
    # The first part is the base64 of a decimal id, so its second character is one of D, T, j, z (a random
    # second character such as "Z" would give the file an "MZ" executable header, which "gitleaks dir" skips).
    return "M" + secrets.choice("DTjz") + rnd(22) + "." + rnd(6) + "." + rnd(38)


def cmd_canary_make(a):
    root = a.dir
    os.makedirs(root)
    env = dict(os.environ, GIT_AUTHOR_NAME="canary", GIT_AUTHOR_EMAIL="canary@example.invalid",
               GIT_COMMITTER_NAME="canary", GIT_COMMITTER_EMAIL="canary@example.invalid")

    def git(*args):
        subprocess.run(["git", "-C", root, "-c", "core.autocrlf=false", "-c", "commit.gpgsign=false"] + list(args),
                       check=True, capture_output=True, env=env)

    def write(rel, text):
        p = os.path.join(root, rel)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", newline="") as f:
            f.write(text)

    # The marker text is split so that this file does not itself match the private-key rule.
    pem = ("-----BEGIN RSA PRIV" "ATE KEY-----\n"
           + "\n".join(base64.b64encode(secrets.token_bytes(48)).decode() for _ in range(20))
           + "\n-----END RSA PRIV" "ATE KEY-----\n")
    git("init", "-q", "-b", "main")
    write("key.txt", fake_token() + "\n")
    write("key.pem", pem)
    write("BotData.xml", "<d>%s</d>\n" % rnd(40))
    write("WebParseKeys.xml", "<k>%s</k>\n" % rnd(10))
    write("guildData/g.xml", "<g>%s</g>\n" % rnd(10))
    write("logs/a.log", "line %s\n" % rnd(10))
    write("services/s.xml", "<s>%s</s>\n" % rnd(10))
    write("src/Main.kt", "fun main() {}\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 1")
    git("mv", "key.txt", "keys.txt")
    git("commit", "-q", "-m", "canary 2 rename")
    git("checkout", "-q", "-b", "side")
    write("side.txt", "side\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 3 side")
    git("checkout", "-q", "main")
    write("main2.txt", "main\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 4 main")
    git("merge", "-q", "--no-ff", "--no-commit", "side")
    write("merge-only.txt", fake_token() + "\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 5 merge")
    git("checkout", "-q", "-b", "pr-tmp")
    write("pr-only.txt", fake_token() + "\n")
    git("add", "-A")
    git("commit", "-q", "-m", "canary 6 pull ref")
    sha = subprocess.run(["git", "-C", root, "rev-parse", "HEAD"], check=True, capture_output=True,
                         text=True).stdout.strip()
    git("checkout", "-q", "main")
    git("branch", "-q", "-D", "pr-tmp")
    git("update-ref", "refs/pull/1/head", sha)
    print("canary repository created")
    return 0


# Distinct files per rule that a correct configuration reports on the canary mirror.
CANARY_EXPECTED = {
    "all": {"bare-token-file": 1, "discord-bot-token": 4, "legacy-bot-data-file": 3, "legacy-key-file": 2,
            "legacy-state-directory": 2, "private-key": 1},
    "branches": {"bare-token-file": 1, "discord-bot-token": 3, "legacy-bot-data-file": 3, "legacy-key-file": 2,
                 "legacy-state-directory": 2, "private-key": 1},
}


def cmd_canary_check(a):
    findings = load_report(a.report)
    got = {r: len({x["File"] for x in findings if x["RuleID"] == r}) for r in {x["RuleID"] for x in findings}}
    want = CANARY_EXPECTED[a.refs]
    for rule in sorted(set(got) | set(want)):
        print("canary rule %s files=%d expected=%d" % (rule, got.get(rule, 0), want.get(rule, 0)))
    ok = got == want
    print("CANARY " + ("OK" if ok else "FAILED"))
    return 0 if ok else 2


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("scan")
    s.add_argument("--gitleaks", required=True)
    s.add_argument("--mode", choices=["git", "dir"], default="git")
    s.add_argument("--repo", required=True)
    s.add_argument("--config", required=True)
    s.add_argument("--refs", choices=list(REFS), default="all")
    s.add_argument("--report", required=True)
    s.add_argument("--log", required=True)
    s.set_defaults(fn=cmd_scan)
    c = sub.add_parser("control")
    c.add_argument("--repo", required=True)
    c.add_argument("--config", required=True)
    c.add_argument("--refs", choices=list(REFS), default="all")
    c.add_argument("--report", required=True)
    c.add_argument("--probe-name", action="append", default=[], metavar="RULE:FILENAME")
    c.add_argument("--probe-prefix", action="append", default=[], metavar="RULE:PREFIX")
    c.set_defaults(fn=cmd_control)
    m = sub.add_parser("canary-make")
    m.add_argument("dir")
    m.set_defaults(fn=cmd_canary_make)
    k = sub.add_parser("canary-check")
    k.add_argument("--report", required=True)
    k.add_argument("--refs", choices=list(REFS), required=True)
    k.set_defaults(fn=cmd_canary_check)
    a = p.parse_args()
    try:
        sys.exit(a.fn(a))
    except GitFailed as e:
        print("GATE FAILED: " + str(e))
        sys.exit(2)


if __name__ == "__main__":
    main()
