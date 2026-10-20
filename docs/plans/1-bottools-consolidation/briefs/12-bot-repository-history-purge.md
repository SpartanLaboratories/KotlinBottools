=== YOUR QUESTION (Question 12 of the research plan) ===

What must the history rewrite remove from each bot repository, and how is it done safely on GitHub?

Findings file (write exactly here): /home/user/KotlinBottools/docs/plans/1-bottools-consolidation/research/bot-repository-history-purge.md

What your answer informs (use it to aim; keep it out of the file):
- the scope and order of the history-hygiene work at the start of the initiative;
- its exit criterion;
- how it interacts with archiving, with KotlinBottools becoming public, and with open branches.

Repositories:
- On disk, full history. Use git -C <path> log --all and related commands:
  - /home/user/KotlinBottools
  - /home/user/GKB2
  - /home/user/spartanlaboratories/gkb
  - /home/user/spartanlaboratories/bottools
- Not on disk: SpartanLaboratories/TrumpBot (private) and SpartanLaboratories/Support (private). Do not try to fetch them. List them as not inspected, and say what the rewrite needs from them once they are available.

Produce:
1. Per repository, every tracked path that is a secret, data, runtime state, scraped/cached artefact, binary blob, IDE file or build output, at any point in history. Examples:
   - key.txt / keys.txt;
   - BotData.xml (it holds a cookie section);
   - WebParseKeys.xml;
   - guildData/;
   - services/;
   - res/;
   - logs/;
   - screenshots;
   - youtube-dl.exe;
   - .idea/, .gradle/, build/, out/, bin/;
   - Eclipse metadata.
   For each path give the commits that add and remove it (short hash, date, subject), and whether it is still in the current tree.
2. Whether any secret string also appears outside those paths (for example hard-coded in source or in committed build output). Check by searching history for the secret files' contents without ever printing them: compare in shell variables and print only file paths and counts. Never print, copy or quote a secret value.
3. Rewrite mechanics:
   - git filter-repo by path (--invert-paths --path ... --path-glob ...) versus by content (--replace-text), or both;
   - BFG Repo-Cleaner as a comparison;
   - how tags, all branches and remote refs are handled;
   - the force-push;
   - what every existing clone must do afterwards.
4. What GitHub keeps after a force-push:
   - pull-request refs (refs/pull/*);
   - forks;
   - cached commit views;
   - and how to clear them (GitHub Support's removal process, per GitHub's documentation on removing sensitive data).
   Check whether these repositories have pull requests or forks where you can tell from what is on disk or reachable.
5. Ordering constraints:
   - copy guildData/ outside the repository first, because the legacy importer reads it;
   - rewrite before archiving, since archived repositories are read-only;
   - rewrite KotlinBottools before it becomes public;
   - branches that exist when the rewrite runs (this planning work lives on branch ccr-2c690a64-fz5whf of KotlinBottools and is merged to main before the rewrite);
   - commit hashes cited in documents change after the rewrite.
6. The .gitignore patterns each repository needs afterwards (secrets, data directories, build output, IDE files), and a secret-scanning step in CI (for example gitleaks): whether it fits the organisation's CI.

Requirements specific to your question:
- No secret or data file remains anywhere in the history of KotlinBottools, GKB2, GKB, BotTools or TrumpBot, or of Support if it is bot-related.
- KotlinBottools' known paths are key.txt, guildData/, BotData.xml, WebParseKeys.xml, services/, res/, .gradle/ and .idea/.
- Each repository's default branch is force-pushed once.
- No token in these histories is current. The rewrite is hygiene before archiving and before KotlinBottools becomes public.
- GKB2, GKB, BotTools and TrumpBot are archived later with README pointers to bottools.

Sources:
- The on-disk histories.
- GitHub's documentation on removing sensitive data from a repository (docs.github.com).
- git filter-repo's documentation (github.com/newren/git-filter-repo).
- BFG's documentation.
- gitleaks' documentation.

Lenses: lens 2, the conventions (what GitHub and git document as the safe procedure). Lens 1 where tools differ. Lens 3 does not apply.

Absolute rule: never print, copy or quote any secret value, cookie value, member name or id, in your shell output, your findings file or your reply. Report paths, commits and counts only.
