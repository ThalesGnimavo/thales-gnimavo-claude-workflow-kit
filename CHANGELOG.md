# Changelog

All notable changes to this kit. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `docs/fr/`: the manual in French, same six chapters and file names as `docs/en/`.
- `docs/<lang>/native-commands.md`: the native Claude Code commands the manual relies on,
  read from the command table of the installed binary (2.1.288) and tested from `claude -p`.
- Wording by profile: `/casp`, `/next`, `/update`, `/day`, `/new-project` say "save point"
  and print no sha or branch to a `non-developer`; the table is in `.claude/skills/README.md`.
- Root `CLAUDE.md`: roles, session cycle, decision levels, verification, context discipline.
- `INSTALL.md` (EN + FR): the five human steps before the first `claude`.
- `/setup`: machine check, `casp` install, profile written to `.kit/profile.json`.
- `/learn`: guided tour of the method, one exercise per chapter.
- Project-level `.claude/settings.json` with safe default permissions.
- The kit's own `casp/` cockpit.
- `.claude/skills/README.md`: the frontmatter and path conventions every skill follows.
- `/casp <project>`: the cockpit read from the kit root (`status`, `check`, `where`, snapshot).
- `/next <project>`: the queued session, with the arbitration gate and `--solo "<reason>"`.
- `/cto <project>`: the steering session, solo-or-fleet arbitration recorded in `state.json`.
- `/notify`: end-of-session summary on desktop, email or webhook; `.env` is read by a
  script, never by Claude.
- `/update`: fast-forward pull of the kit, refused on a dirty tree.
- `/humanizer`: copied as is from the author's kit.
- `templates/`: six profiles (job-search, book-or-thesis, small-business, event,
  content-creation, software), each with `template.json`, `CLAUDE.md` and
  `first-prompt.md`; `templates/README.md` says how to add a seventh.
- `/new-project <name>`: a project under `my-projects/` from a profile, its own git
  repository on `main`, `CLAUDE.md` and first queued prompt written from the user's answers,
  `casp init`, one commit, `casp check` at exit 0 before the command ends.
- `/day [--dry-run]`: every project on one screen, the blocked ones with their unblock
  action, one decision, then `/next`.
- `/verify <project>`: the project's `## Gate` in a background sub-agent, report under
  `session-logs/verification/`, never edits; developer profile only.
- `/chain <project> [N]`, `/fleet <project>`, `/audit-batch <project>`: generalised from the
  author's, each opening with a warning on cost and prerequisites; `/fleet` is macOS with
  iTerm2 only.
- `docs/en/`: the manual in English, five chapters (a day, a session, a project, the
  state, pitfalls) plus a table of contents; every chapter ends with "What to type" and
  "What you should see", taken from real runs on 2026-10-03. `native-commands.md` and
  `docs/fr/` follow.
- `examples/job-search/` and `examples/software/`: two projects created with
  `/new-project` for a fictional owner and played for two sessions each (real session
  logs, a shipped phase, a queued prompt, `casp check` at exit 0), frozen without their
  `.git`; each `README.md` says what to look at and in which order.

### Changed
- `/setup`: the `casp` install log goes to `.kit/`, not `/tmp`; `.kit/` is ignored as a whole.
