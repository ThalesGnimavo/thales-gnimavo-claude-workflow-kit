# Roadmap

> **Updated** : 2026-10-03 (session 002: phase 2 shipped, phase 3 queued).
> **Source of truth** : this file + `docs/plan/sessions/*.md` (status frontmatter) + `session-logs/`.
> **Maintenance rule** : update at the end of every session that ships something or surfaces a blocker.

---

## Now — Next 3 to ship (in this order)

| # | Item | Prompt | Status |
|---|------|--------|--------|
| 1 | Errors, edge cases, what the tests do not cover | `docs/plan/sessions/PHASE-3-HARDENING.md` | queued |
| 2 | Versioned release, changelog, the owner publishes | (prompt not yet drafted) | not drafted |
| 3 | _(the roadmap ends at phase 4; after it, decisions)_ | — | — |

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
| _(none)_ | _(none)_ | _(none)_ |

---

## Queued — launch-critical (do before public launch)

1. Versioned release, changelog, the owner publishes (phase 4).

---

## Queued — non-critical (post-launch deferable)

- _(none)_

---

## Shipped this week

| Date | Commit | Title | Notes |
|------|--------|-------|-------|
| 2026-10-03 | `b5b3a04` | Walking skeleton | `add`, `total`, gate green from a fresh clone |
| 2026-10-03 | `bd67317` | CSV export | `ledger export`, eight tests |

---

## Phase scoreboard

| Phase | Status | Session log | Notes |
|-------|--------|-------------|-------|
| Phase 0 — Init | shipped | — | created by `/thales:new-project` on 2026-10-03 |
| Phase 1 — Walking skeleton | shipped | `26-10-03-001-walking-skeleton` | the gate runs, one path works |
| Phase 2 — First feature | shipped | `26-10-03-002-first-feature` | export one month as CSV |
| Phase 3 — Hardening | queued | _(pending)_ | errors, edge cases |
| Phase 4 — Release | backlog | — | the owner publishes |
