# Roadmap

> **Updated** : 2026-10-03 (phase 2 slice A shipped: English manual, two examples; slice B queued).
> **Source of truth** : this file + `docs/plan/sessions/*.md` (status frontmatter) + `session-logs/`.
> **Maintenance rule** : update at the end of every session that ships something or surfaces a blocker.

---

## Now — Next 3 to ship (in this order)

| # | Item | Prompt | Status |
|---|------|--------|--------|
| 1 | Phase 2, slice B — the French manual, the native-commands sheet verified against `/help`, the profile-aware wording (slice A shipped on 2026-10-03: `docs/en/`, `examples/`) | `docs/plan/sessions/PHASE-2-MANUAL-AND-EXAMPLES.md` | queued |
| 2 | Phase 3 — blank-machine test with a first-time user, `/kit` page on thalesandhisaictoclaude.com, homepage download link, release v0.1.0 | (prompt not yet drafted) | not drafted |
| 3 | Follow-ups from phase 1: profile-aware wording in `/casp`, `/next`, `/update`, `/day`, `/new-project`; `/fleet` launch proven on iTerm2; permission-prompt Proof due | (inside phase 2 SHOULD) | not drafted |

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

---

## Queued — launch-critical (do before public launch)

1. Verify every native slash command named in `docs/*/native-commands.md` against the installed Claude Code `/help` output on release day.
2. Blank-machine test: a user who has never opened Claude Code unzips, runs `claude`, and reaches a first project without reading anything but `INSTALL.md`.

---

## Queued — non-critical (post-launch deferable)

- Spanish docs (the blog already publishes ES; the kit can follow).
- Windows-native walkthrough for `/setup` with screenshots.
- `fleet` without iTerm2 (tmux or plain multi-terminal fallback).
- Defects met while playing the examples (session 004, level 2, one line each):
  `.claude/skills/new-project/SKILL.md:59` — `git -C . rev-parse --abbrev-ref HEAD` prints `HEAD` and a fatal error on an unborn branch; the check that prints `main` is `git symbolic-ref --short HEAD`.
  `templates/*/CLAUDE.md` (six files, the `"{{first_goal}}".` line) — an answer that ends with a period renders as `week.".`; drop the period after the closing quote.
  `templates/software/CLAUDE.md:58` — `{{deploy}}` inside the pre-approved table renders as "unless `not deployed` names it as the normal path"; rephrase the row so that any answer reads.

---

## Shipped this week

| Date | Commit | Title | Notes |
|------|--------|-------|-------|
| 2026-10-03 | _(first commit)_ | Phase 0 — the kit boots | `CLAUDE.md`, `INSTALL.md`, `/setup`, `/learn`, cockpit |

---

## Phase scoreboard

| Phase | Status | Session log | Notes |
|-------|--------|-------------|-------|
| Phase 0 — Skeleton, `CLAUDE.md`, `INSTALL.md`, `/setup`, `/learn`, cockpit | shipped | `session-logs/26-10-03-001-phase-0-skeleton.md` | the kit boots a first-time user |
| Phase 1 — Skills and templates | shipped | `session-logs/26-10-03-002-phase-1-skills-and-templates-a.md`, `session-logs/26-10-03-003-phase-1-skills-and-templates-b.md` | fourteen skills, six templates, de-coupled from the author's private infrastructure |
| Phase 2 — Manual and examples | queued | _(pending)_ | FR + EN from day one |
| Phase 3 — Blank-machine test, website, v0.1.0 | queued | _(pending)_ | repo flips to public here |
