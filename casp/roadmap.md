# Roadmap

> **Updated** : 2026-10-04 (session 008: release slice, v0.1.0 cut; the three defects of session 004 are fixed since session 006).
> **Source of truth** : this file + `docs/plan/sessions/*.md` (status frontmatter) + `session-logs/`.
> **Maintenance rule** : update at the end of every session that ships something or surfaces a blocker.

---

## Now — Next 3 to ship (in this order)

| # | Item | Prompt | Status |
|---|------|--------|--------|
| 1 | Phase 3, slice A — the three known template and skill defects fixed with proofs, the blank-machine test on a machine without `~/.claude/`, the skill-name collision decided (level 1) | `docs/plan/sessions/PHASE-3-RELEASE.md` | done (sessions 006 and 007) |
| 2 | Phase 3, slice B — `/kit` page on the author's website, homepage download link, `CHANGELOG.md` cut to `[0.1.0]`, tag `v0.1.0` on the user's go, repository flipped to public by the user | `docs/plan/sessions/PHASE-3-RELEASE.md` | in progress (session 008) |
| 3 | After v0.1.0 — a `casp new discussion`: Spanish, Windows walkthrough, `/thales:fleet` without iTerm2, the first outside feedback | (drafted at the close of phase 3) | not drafted |

If you reach for anything BELOW Next-3, stop and check why.

---

## In-flight (other agents working in parallel)

| Item | Owner | Expected close |
|------|-------|----------------|
| _(none)_ | _(none)_ | _(none)_ |

---

## Blocked

| Item | Blocker | Unblock action |
|------|---------|----------------|
| Public visibility of the GitHub repository | v0.1.0 not released; half-built kit must not be the first thing a developer sees | flip to public in phase 3 after the blank-machine test |
| Kit skills shadowed by user-level skills of the same name (`~/.claude/skills/thales/skills/casp` ran instead of `.claude/skills/thales/skills/casp` on `claude -p "/thales:casp kit"`, observed 2026-10-03, session 005) | level 1: rename with a prefix, document in `INSTALL.md`, or accept; binds every later phase | the user decides in phase 3 slice A; the decision goes to `README.md` |

---

## Queued — launch-critical (do before public launch)

1. Re-check `docs/*/native-commands.md` against the Claude Code version installed on the test machine (`claude --version`, `/help` compared with the table); the sheet was checked against 2.1.288 from the binary's command table and three `claude -p` runs on 2026-10-03.
2. Blank-machine test: a user who has never opened Claude Code unzips, runs `claude`, and reaches a first project without reading anything but `INSTALL.md`.

---

## Queued — non-critical (post-launch deferable)

- Spanish docs (the blog already publishes ES; the kit can follow).
- Windows-native walkthrough for `/thales:setup` with screenshots.
- `fleet` without iTerm2 (tmux or plain multi-terminal fallback).
- Defects met while playing the examples (session 004): the three were fixed in session 006,
  proofs in its log; entry kept one release for the trail.
- Proofs due still open at v0.1.0 (consolidated by session 006 from logs 002 to 005; the
  release notes list them as untested until each one has its observation):
  1. `(cd my-projects/<x> && casp status)` without a permission prompt, from a fresh `claude`
     at the kit root with a real project under `my-projects/` (the kit-root form was observed
     twice).
  2. Desktop notification on Linux (`notify-send`) and Windows (PowerShell balloon): only
     macOS available.
  3. Email channel of `/thales:notify` end to end on a real SMTP account: design only.
  4. `/thales:fleet` opening an iTerm2 tab with the worker loaded: the `osascript` line has never run.
  5. `/thales:new-project` end to end through the skill text in an interactive session
     (`AskUserQuestion` menu, one question at a time): every run so far was headless, with
     the answers given in the message.
  6. Interactive coexistence on the author's machine: `claude plugin list` shows
     `thales@skills-dir`, `/thales:next <example>` loads the kit's text, `/next` still loads
     the personal skill (brief of 2026-10-04, §8.2); and whether `/thales:` commands are
     available in the same session right after the first trust dialog, or only after
     `/reload-plugins` (§8.4).
  7. A first-time reader runs a day from `docs/<lang>/` alone, on a machine that never had
     Claude Code: the blank-machine test, blocked in-session by the interactive `/login`
     (session 006, "Verify").

---

## Shipped this week

| Date | Commit | Title | Notes |
|------|--------|-------|-------|
| 2026-10-03 | _(first commit)_ | Phase 0 — the kit boots | `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`, cockpit |
| 2026-10-03 | `7cda8c9` | Phase 1 — skills and templates | fourteen skills, six templates |
| 2026-10-03 | `5e61803`, `db4536f` | Phase 2 — manual and examples | `docs/en/`, `docs/fr/`, `examples/`, native-commands sheet, wording by profile |

---

## Phase scoreboard

| Phase | Status | Session log | Notes |
|-------|--------|-------------|-------|
| Phase 0 — Skeleton, `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`, cockpit | shipped | `session-logs/26-10-03-001-phase-0-skeleton.md` | the kit boots a first-time user |
| Phase 1 — Skills and templates | shipped | `session-logs/26-10-03-002-phase-1-skills-and-templates-a.md`, `session-logs/26-10-03-003-phase-1-skills-and-templates-b.md` | fourteen skills, six templates, de-coupled from the author's private infrastructure |
| Phase 2 — Manual and examples | shipped | `session-logs/26-10-03-004-phase-2-manual-and-examples-a.md`, `session-logs/26-10-03-005-phase-2-manual-and-examples-b.md` | EN then FR, six chapters each, two examples, native commands checked against 2.1.288 |
| Phase 3 — Blank-machine test, website, v0.1.0 | queued | _(pending)_ | repo flips to public here |
