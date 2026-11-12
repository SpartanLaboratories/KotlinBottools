# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- The `Secret scan` workflow (`.github/workflows/secret-scan.yml`). On every push and pull request to `main`, it scans
  the full history and the working tree with gitleaks 8.30.1, pinned and checked against its checksum, through the scan
  wrapper `.github/scripts/secret_scan.py`, after a canary has shown that the rules fire. Its log shows counts by rule
  id only.
- The gitleaks configuration, `.gitleaks.toml`: gitleaks' default rules, plus rules for Discord bot tokens, the bot's
  token file, its legacy data files, the older bots' key files and their runtime-state directories. One allowlist entry,
  scoped to one rule, one document and one exact text, exempts a single known false positive.
- The allowlist controls, `.github/scripts/allowlist_controls.py`, which the workflow runs on every push and pull
  request. They build throwaway repositories at run time and show that the one allowlist entry exempts its own match
  and nothing else.

### Changed

- `.gitignore` ignores the bot's local files and runtime folders (`key.txt`, `BotData.xml`, `WebParseKeys.xml`,
  `guildData/`, `services/`, `res/`, `logs/`) at the repository root only, so source packages of the same name stay
  tracked, and adds patterns for credential files, databases, logs and binaries.
