# Changelog

All notable changes to this kit. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/).

Release steps, after the tag `vX.Y.Z` is pushed and its GitHub Release created: build the
download asset from the tag and attach it under the fixed name that the short link
`/go/kit-zip` resolves through `releases/latest/download/`.

```bash
git archive --format=zip --prefix=thales-gnimavo-claude-workflow-kit/ -o claude-workflow-kit.zip vX.Y.Z
gh release upload vX.Y.Z claude-workflow-kit.zip
```

## [Unreleased]

### Added
- Issue template `stuck-during-install`: two questions in plain words (which step, what the
  screen shows), for a reader who stopped during `INSTALL.md`.
- Support line in `INSTALL.md` (after step 3, both languages) and in both halves of
  `README.md`: where to write when stuck, with the link to the template.

## [0.1.0] - 2026-10-04

First release. Download page: https://thalesandhisaictoclaude.com/kit

### Fixed
- `/new-project` step 3: the branch check uses `git symbolic-ref --short HEAD`, which prints
  `main` on an unborn branch; `rev-parse --abbrev-ref HEAD` printed `HEAD` and a fatal error.
- Templates (six) and both examples: no period after the quoted first goal, which doubled
  the user's own period.
- `templates/software/CLAUDE.md`: the auto-deploy row no longer renders `{{deploy}}` inside
  a sentence that read badly for `not deployed`.
- `INSTALL.md` and `README.md`: `/new-project` exists; the sentence that deferred it to
  v0.1.0 is gone.

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
- Every kit command lives in a Claude Code plugin named `thales`, under
  `.claude/skills/thales/`: `/setup` is `/thales:setup`, `/next` is `/thales:next`, and so on.
  The plugin namespace is the one mechanism Claude Code guarantees against a name collision
  with a personal, project or native command. Consequence: the kit's commands exist only
  when Claude starts at the kit root in a trusted folder.
- `INSTALL.md`: three human steps instead of five; Claude clones the kit and installs Node.js
  and `casp` with the person, guided by `/thales:setup`'s bootstrap flow.
- `INSTALL.md` step 4: `git clone` is the primary path (git is required by step 2 already);
  the release zip stays as the fallback and says that `/update` cannot update a zip.
- `/update`: refuses with a clear message when the kit folder is not a git repository.
- `/setup`: the `casp` install log goes to `.kit/`, not `/tmp`; `.kit/` is ignored as a whole.

### Untested at this release
Listed in `casp/roadmap.md` as Proofs due; each stays open until its observation exists.
- `/thales:fleet` opening an iTerm2 tab with the worker loaded: never run.
- `/thales:notify` on Linux (`notify-send`) and Windows (PowerShell balloon); the e-mail
  channel end to end on a real SMTP account.
- `/thales:new-project` through its interactive menu (every run so far was headless).
- The blank-machine test by a first-time reader, from `INSTALL.md` alone, on a machine that
  never had Claude Code: the sandbox run passed, the interactive `/login` was not reachable.
- Whether `/thales:` commands appear right after the first trust dialog or only after
  `/reload-plugins`.
