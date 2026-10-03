---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-001-phase-0-skeleton.md
drafted_at: 2026-10-03
next_after: none
---

# Session — phase-0-skeleton : Boot a first-time user

> **Status : SHIPPED** in session `26-10-03-001`. Drafted at the opening of the kit, before any file existed.
>
> **Goal.** A person who has never used Claude Code unzips the kit, types `claude`, and is
> greeted, checked, taught and pointed at `/new-project`, without reading anything but `INSTALL.md`.
>
> **Why now.** Nothing else in the kit can be tested until it boots.

**Project root.** `thales-gnimavo-claude-workflow-kit/`
**Branch.** `main`.
**Session log target.** `session-logs/26-10-03-001-phase-0-skeleton.md`.
**Expected size.** half-day. No schema change. No migration. No UI mount.

## MUST

- Root `CLAUDE.md` in English, XML-sectioned, rules only, under 150 lines.
- `INSTALL.md` bilingual, the five human steps, commands verified against the official docs.
- `/setup` and `/learn` with its seven chapters.
- Project-level `.claude/settings.json` with safe defaults.
- `README.md`, `LICENSE` (MIT), `CHANGELOG.md`, `.gitignore`.
- The kit's own `casp/` cockpit with the four-phase plan.

## SHOULD

- Native slash commands verified against the installed binary, not from memory.
