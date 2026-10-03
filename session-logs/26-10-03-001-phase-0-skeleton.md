---
phase: phase-0-skeleton
---

# 26-10-03-001 — phase-0-skeleton : Boot a first-time user

**Session prompt :** `docs/plan/sessions/PHASE-0-SKELETON.md`.
**Previous session end :** none (first commit of the repository).
**Delegation :** Inline, plus one read-only Explore sub-agent to synthesise the author's five
workflow documents and the private skills, one `claude-code-guide` sub-agent to verify the
current Claude Code norms, and one read-only audit sub-agent before the commit.
**State at session start :** empty folder. The plan (four phases, solo) was validated by
the author with three amendments: slug `thales-gnimavo-workflow-kit`, owner `ThalesGnimavo`,
`CLAUDE.md` in English with XML sections.

## Scope shipped this session

### Root `CLAUDE.md`
English, nine XML sections, rules only: first run, language, roles, workspace layout,
session cycle, decision levels, verification, context discipline, skills table, never-list.

### `INSTALL.md`, `README.md`, `LICENSE`, `CHANGELOG.md`, `.gitignore`
Bilingual EN + FR. Install commands quoted from the official setup page the same day
(native installer for macOS/Linux/WSL, PowerShell, CMD; npm; Node 22+; paid plan required).

### `.claude/settings.json`
Project-scoped permissions: read-only git and casp commands allowed; force-push, `rm -rf`
on root or home, and reading any `.env` denied.

### `/setup`
Environment table, fixes in order (git, Node, casp, git identity), four profile questions,
`.kit/profile.json`, `--check` and `--global` flags.

### `/learn`
Runner plus seven chapter scripts (323 lines), one exercise each with an answer key,
progress in the profile. Chapter 3 reads the kit's own cockpit; chapter 6 dry-runs `/day`.

### Cockpit
`casp/` with the four-phase roadmap, phase 0 shipped here, phase 1 prompt drafted.

## Verified

- Native slash commands: every name the author listed exists in the installed binary
  (2.1.288) except `/cost`, `/vim`, `/review`; `/hook` is `/hooks`. Checked with
  `grep -a 'name:"<cmd>"'` on the binary. `/setup`, `/learn`, `/day`, `/update`,
  `/new-project` collide with nothing.
- CLI flags `-n/--name`, `-c`, `-r`, `-p`, `--permission-mode`, `--model`, `--effort`,
  `--remote-control`, `--chrome` present in `claude --help`.
- Project-level `.claude/skills/` auto-loads; frontmatter fields `name`, `description`,
  `argument-hint`, `allowed-tools` are documented (code.claude.com/docs/en/skills).
- `casp check` output pasted below.

## Decisions taken without the user

- Repository created **private** on GitHub; flips to public at v0.1.0 (phase 3). Way back:
  `gh repo edit --visibility public`.
- The remote is the author's personal account, as requested; the local clone sits inside
  the author's workspace and is ignored there.
- Repository-internal files (`casp/`, `session-logs/`, prompts, `CHANGELOG.md`) in English;
  user-facing docs bilingual. Way back: translate the cockpit, nothing depends on it.
- `/learn` chapters are English scripts delivered live in the user's language, rather than
  two parallel sets of files. Way back: add `chapters/fr/` and point the runner at it.
- Repo-wide `.gitignore` ignores `projects/*`: each project is its own repository, as in
  the author's workspace.

## Deferred / risks

- The author's private notification skill is not reusable as is; `/notify` is rewritten
  from scratch in phase 1 with every setting read from `.env`.
- `/learn` chapter 6 references `/day --dry-run`, implemented in phase 1. A user who
  completes the tour before phase 1 ships hits a missing command.
- Windows: `/setup` commands assume Git Bash is present; without it Claude Code uses the
  PowerShell tool and some one-liners differ. To test on a real Windows machine in phase 3.
- The Desktop app route (no terminal) is not covered by `INSTALL.md`; worth one line in
  phase 2 for non-developers.

## Raw outputs

`casp check` at close (pasted verbatim):

```
CASP_CHECK_PLACEHOLDER
```
