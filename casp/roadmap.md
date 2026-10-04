# Roadmap

> **Updated** : 2026-10-04 (session 009: discussion after v0.1.0 closed, seven decisions in `docs/plan/decisions/2026-10-04-after-v0-1-0.md`, GitHub Release v0.1.0 created; three prompts chained, launch hygiene first).
> **Source of truth** : this file + `docs/plan/sessions/*.md` (status frontmatter) + `session-logs/`.
> **Maintenance rule** : update at the end of every session that ships something or surfaces a blocker.

---

## Now — Next 3 to ship (in this order)

| # | Item | Prompt | Status |
|---|------|--------|--------|
| 1 | Launch hygiene — issue template and support line (D4), `/kit` in EN/FR/ES on the blog (D6), two links on justegnimavo.com (D7); no release, no invitation | `docs/plan/sessions/LAUNCH-HYGIENE.md` | queued |
| 2 | Distribution article — "how we built the kit", EN/FR/ES on the blog, LinkedIn and newsletter drafts not posted (D2) | `docs/plan/sessions/DISTRIBUTION-ARTICLE.md` | queued |
| 3 | First outside run — one reader, observed and logged raw; backlog re-ranked by it. Starts only when item 1 is shipped **and** Proof due 7 is observed (D1) | `docs/plan/sessions/FIRST-OUTSIDE-RUN.md` | queued |

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
| First outside run (`FIRST-OUTSIDE-RUN.md`) | the user's criterion (D1): no known defect presented; `LAUNCH-HYGIENE.md` not shipped yet, Proof due 7 not observed | ship item 1; the user runs the blank-machine test or answers the two lines of proof 7 |

---

## Queued — launch-critical (do before public launch)

1. ~~Re-check `docs/*/native-commands.md`~~ done in session 008 against 2.1.289 (log `26-10-04-002`). Original wording: re-check against the Claude Code version installed on the test machine (`claude --version`, `/help` compared with the table); the sheet was checked against 2.1.288 from the binary's command table and three `claude -p` runs on 2026-10-03.
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
| 2026-10-04 | `5c92d1a` | Phase 3 — v0.1.0 tagged, public, `/kit` live | logs 006, 26-10-04-001, 26-10-04-002 |
| 2026-10-04 | `e2e871d` | Discussion after v0.1.0 — seven decisions, GitHub Release created | log 26-10-04-003 |

---

## Phase scoreboard

| Phase | Status | Session log | Notes |
|-------|--------|-------------|-------|
| Phase 0 — Skeleton, `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`, cockpit | shipped | `session-logs/26-10-03-001-phase-0-skeleton.md` | the kit boots a first-time user |
| Phase 1 — Skills and templates | shipped | `session-logs/26-10-03-002-phase-1-skills-and-templates-a.md`, `session-logs/26-10-03-003-phase-1-skills-and-templates-b.md` | fourteen skills, six templates, de-coupled from the author's private infrastructure |
| Phase 2 — Manual and examples | shipped | `session-logs/26-10-03-004-phase-2-manual-and-examples-a.md`, `session-logs/26-10-03-005-phase-2-manual-and-examples-b.md` | EN then FR, six chapters each, two examples, native commands checked against 2.1.288 |
| Phase 3 — Blank-machine test, website, v0.1.0 | shipped | `session-logs/26-10-03-006-phase-3-release-a.md`, `26-10-04-001-phase-3-release-plugin.md`, `26-10-04-002-phase-3-release-b.md` | tag `v0.1.0`, public, `/kit` live, GitHub Release 2026-10-04 |
| After v0.1.0 — discussion, seven decisions | shipped | `session-logs/26-10-04-003-after-v0-1-0.md` | `docs/plan/decisions/2026-10-04-after-v0-1-0.md` |
| Launch hygiene | queued | _(pending)_ | D4, D6, D7 |
| Distribution article | queued | _(pending)_ | D2 |
| First outside run | queued | _(pending)_ | D1 criterion |
