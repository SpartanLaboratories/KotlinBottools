#!/usr/bin/env python3
"""Controls for the one scoped allowlist entry of .gitleaks.toml.

The configuration exempts a single known match of the default rule curl-auth-user: a command example in one research
document whose credential is a shell command substitution, not a literal. These controls build throwaway repositories
at run time and scan each one through secret_scan.py with the configuration, in git mode and in dir mode, to show that
the entry exempts that match and nothing else:

  unchanged       the document at its path, as committed ................ clean
  literal         the document at its path, plus a literal credential .... reported
  elsewhere       the document at another path ........................... reported
  prefixed-path   the document under one more leading directory ......... reported   (the path's start anchor)
  longer-name     the document's name with one more character ........... reported
  suffixed-path   the document's path with a suffix after it ............ reported   (the path's end anchor)
  text-suffix     one more character inside the quotes, at the end ...... reported   (the exempted text itself)
  text-prefix     one more character inside the quotes, at the start .... reported   (the exempted text itself)
  after-quotes    a colon and a word after the closing quote ............ reported   (the text's end anchor)
  before-quotes   a word and a colon before the opening quote ........... reported   (the text's start anchor)
  other-rule      the document at its path, plus another rule's finding .. reported, as that rule

Every line this script prints is a fixture name, a mode, an exit status, rule ids with counts, or a fixed marker. The
credentials and words the fixtures hold are generated at run time and never printed. The fixtures, reports and logs stay
in the work directory.

usage: python3 -I allowlist_controls.py --gitleaks BINARY --work NEW-DIRECTORY
                                        [--repo DIRECTORY] [--config FILE] [--wrapper FILE]
Exit status: 0 every control as expected; 2 a control not as expected, or a fixture that could not be built.
"""
import argparse
import os
import re
import secrets
import shutil
import string
import subprocess
import sys

DOCUMENT = "docs/plans/1-bottools-consolidation/2-phase-0-history-rewrite/research/github-residual-exposure-and-visibility.md"
EXEMPT = b"x-access-token:$(gh auth token)"  # the credential text the entry exempts, without its quotes
QUOTED = b'"' + EXEMPT + b'"'  # the secret the rule captures from the document, quotes included
RULE = "curl-auth-user"
ALPHABET = string.ascii_letters + string.digits + "_-"
RULE_LINE = re.compile(r"^rule (\S+) findings=(\d+) files=(\d+)$")


class Failed(Exception):
    """A fixture that could not be built; printed as CONTROLS FAILED with a fixed reason."""


def rnd(n):
    return "".join(secrets.choice(ALPHABET) for _ in range(n))


def word():
    # Hexadecimal, so that it can never spell one of the placeholder words the rule's own allowlist exempts.
    return secrets.token_hex(6).encode()


def literal_block():
    # A command line with a literal basic-auth credential, generated now. The tool's name and its option are built
    # from fragments, so that this file holds no such line itself.
    tool, option = "cu" + "rl", "-" + "u"
    line = '%s -s %s "svc:%s" https://api.example.invalid/v1/items' % (tool, option, secrets.token_hex(12))
    return ("\n```\n" + line + "\n```\n").encode()


def token_block():
    # A token of the shape the discord-bot-token rule matches, generated now, as the scan wrapper's canary makes it.
    return ("\nM" + secrets.choice("DTjz") + rnd(22) + "." + rnd(6) + "." + rnd(38) + "\n").encode()


def fixtures(doc):
    """(name, path in the fixture, content, the rule ids the scan must report, one finding in one file each)."""
    if doc.count(EXEMPT) != 1 or doc.count(QUOTED) != 1:
        raise Failed("the exempted text is not in the document exactly once")
    return [
        ("unchanged", DOCUMENT, doc, []),
        ("literal", DOCUMENT, doc + literal_block(), [RULE]),
        ("elsewhere", "docs/other/copy.md", doc, [RULE]),
        ("prefixed-path", "x/" + DOCUMENT, doc, [RULE]),
        ("longer-name", DOCUMENT[:-len(".md")] + "X.md", doc, [RULE]),
        ("suffixed-path", DOCUMENT + ".bak", doc, [RULE]),
        ("text-suffix", DOCUMENT, doc.replace(EXEMPT, EXEMPT + b"X"), [RULE]),
        ("text-prefix", DOCUMENT, doc.replace(EXEMPT, b"X" + EXEMPT), [RULE]),
        ("after-quotes", DOCUMENT, doc.replace(QUOTED, QUOTED + b":" + word()), [RULE]),
        ("before-quotes", DOCUMENT, doc.replace(QUOTED, word() + b":" + QUOTED), [RULE]),
        ("other-rule", DOCUMENT, doc + token_block(), ["discord-bot-token"]),
    ]


def git(args, root, env):
    subprocess.run(["git", "-c", "core.autocrlf=false", "-c", "commit.gpgsign=false", "-C", root] + args,
                   check=True, capture_output=True, env=env)


def build(work, name, path, content, env):
    root = os.path.join(work, name)
    target = os.path.join(root, *path.split("/"))
    os.makedirs(os.path.dirname(target))
    with open(target, "wb") as f:
        f.write(content)
    git(["init", "-q"], root, env)
    git(["add", "-A"], root, env)
    git(["commit", "-q", "-m", "fixture"], root, env)
    return root


def scan(a, root, mode, tag):
    """Run the wrapper from the fixture's root; return its exit status and its rule lines, sorted."""
    cmd = [sys.executable, "-I", a.wrapper, "scan", "--gitleaks", a.gitleaks, "--mode", mode, "--repo", ".",
           "--config", a.config, "--refs", "all",
           "--report", os.path.join(a.work, tag + ".json"), "--log", os.path.join(a.work, tag + ".log")]
    proc = subprocess.run(cmd, cwd=root, capture_output=True, text=True)
    lines = [line.strip() for line in proc.stdout.splitlines()]
    return proc.returncode, sorted(line for line in lines if RULE_LINE.match(line))


def run(a):
    env = dict(os.environ, GIT_AUTHOR_NAME="controls", GIT_AUTHOR_EMAIL="controls@example.invalid",
               GIT_COMMITTER_NAME="controls", GIT_COMMITTER_EMAIL="controls@example.invalid")
    shown = subprocess.run(["git", "-C", a.repo, "show", "HEAD:" + DOCUMENT], capture_output=True)
    if shown.returncode != 0:
        raise Failed("the document is not in the repository")
    planned = fixtures(shown.stdout)
    binary = shutil.which(a.gitleaks)
    if binary is None:
        raise Failed("the gitleaks binary is not found")
    a.gitleaks = os.path.abspath(binary)
    os.makedirs(a.work)  # a new directory: an existing one is refused, so nothing is ever overwritten
    unexpected = 0
    for name, path, content, want in planned:
        root = build(a.work, name, path, content, env)
        for mode in ("git", "dir"):
            status, rules = scan(a, root, mode, name + "-" + mode)
            expected = sorted("rule %s findings=1 files=1" % rule for rule in want)
            ok = status == (1 if want else 0) and rules == expected
            unexpected += 0 if ok else 1
            counts = ",".join("%s:%s:%s" % RULE_LINE.match(line).groups() for line in rules) or "-"
            print("control %s %s status=%d rules=%s %s" % (name, mode, status, counts, "ok" if ok else "UNEXPECTED"))
    if unexpected:
        print("CONTROLS FAILED: %d unexpected" % unexpected)
        return 2
    print("CONTROLS OK")
    return 0


def main():
    p = argparse.ArgumentParser(description="Controls for the one scoped allowlist entry of .gitleaks.toml.")
    p.add_argument("--gitleaks", required=True, help="the gitleaks binary: a path, or a command on PATH")
    p.add_argument("--work", required=True, help="a directory that does not exist yet; the fixtures are built in it")
    p.add_argument("--repo", default=".", help="the repository whose committed document the fixtures copy")
    p.add_argument("--config", default=".gitleaks.toml", help="the configuration under test")
    p.add_argument("--wrapper", default=".github/scripts/secret_scan.py", help="the scan wrapper")
    a = p.parse_args()
    a.work, a.repo, a.config, a.wrapper = (os.path.abspath(x) for x in (a.work, a.repo, a.config, a.wrapper))
    try:
        return run(a)
    except Failed as e:
        print("CONTROLS FAILED: " + str(e))
    except (OSError, subprocess.CalledProcessError) as e:
        print("CONTROLS FAILED: " + type(e).__name__)
    return 2


if __name__ == "__main__":
    sys.exit(main())
