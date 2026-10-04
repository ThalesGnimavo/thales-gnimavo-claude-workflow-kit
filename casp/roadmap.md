# Roadmap

> **Updated** : 2026-10-04 (session 011: distribution article drafted EN/FR/ES, not published; Proof due 8 closed; "Proof due 7 closed" corrected: it was the coexistence item, the blank-machine run stays open).
> **Source of truth** : this file + `docs/plan/sessions/*.md` (status frontmatter) + `session-logs/`.
> **Maintenance rule** : update at the end of every session that ships something or surfaces a blocker.

---

## Now — Next 3 to ship (in this order)

| # | Item | Prompt | Status |
|---|------|--------|--------|
| 1 | Publish the distribution article (drafts in the blog, `caaaf66`): sync entries, sync, `llms.txt`, push; then post the LinkedIn draft. User's go | log `26-10-04-005` | waiting on the user |
| 2 | First outside run — one reader, observed and logged raw; backlog re-ranked by it. Starts only when the blank-machine run (Proofs due, item 7) is observed; launch hygiene shipped, Proof due 8 closed in session 011 | `docs/plan/sessions/FIRST-OUTSIDE-RUN.md` | queued, blocked |
| 3 | _(ranked by the outside run; candidates in "Queued — non-critical")_ | — | — |

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
| First outside run (`FIRST-OUTSIDE-RUN.md`) | D1 criterion: the blank-machine run (Proofs due, item 7) not observed; session 010's "Proof due 7 closed" was the coexistence item | The user runs `INSTALL.md` on a clean macOS user account, logged; or restates D1's criterion (level 1) |
| Distribution article published | The user's go (publish date, sync) | Read the drafts in the blog (`caaaf66`), then sync per log `26-10-04-005` |

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
  6. ~~Interactive coexistence~~ closed in session 010 (log `26-10-04-004`, "Proof due 7" there): the
     user reports the personal `/next` still loads and the `/thales:` commands appear without
     `/reload-plugins`.
  7. A first-time reader runs a day from `docs/<lang>/` alone, on a machine that never had
     Claude Code: the blank-machine test, blocked in-session by the interactive `/login`
     (session 006, "Verify").
  8. ~~justegnimavo.com serves the two kit links~~ closed in session 011: `grep -c 'go/kit'` = 1 at
     2026-10-04T10:18:45Z (log `26-10-04-005`).
  9. post16 answers 200 on the three URLs: blocked by the user's publish go (log `26-10-04-005`).
- Blog, older than session 010: `/go/[slug]` should look the slug up with `Object.hasOwn`
  (`__proto__` gives a 500); `/kit` pages missing from the sitemap; `app.html` sets
  `lang="en"` on French and Spanish pages; the `v0.1.0` badge on `/kit` is hardcoded.

---

## Shipped this week

| Date | Commit | Title | Notes |
|------|--------|-------|-------|
| 2026-10-03 | _(first commit)_ | Phase 0 — the kit boots | `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`, cockpit |
| 2026-10-03 | `7cda8c9` | Phase 1 — skills and templates | fourteen skills, six templates |
| 2026-10-03 | `5e61803`, `db4536f` | Phase 2 — manual and examples | `docs/en/`, `docs/fr/`, `examples/`, native-commands sheet, wording by profile |
| 2026-10-04 | `5c92d1a` | Phase 3 — v0.1.0 tagged, public, `/kit` live | logs 006, 26-10-04-001, 26-10-04-002 |
| 2026-10-04 | `e2e871d` | Discussion after v0.1.0 — seven decisions, GitHub Release created | log 26-10-04-003 |
| 2026-10-04 | `1c31a81` | Launch hygiene — issue template, support line, `/kit` EN/FR/ES, short links, release asset | log 26-10-04-004; blog `c9428db`…`01a60b4`, justegnimavo `35e2b67` (Proof due 8) |
| 2026-10-04 | blog `caaaf66` | Distribution article — post16 EN/FR/ES drafts, LinkedIn and newsletter drafts, nothing published | log 26-10-04-005 |

---

## Phase scoreboard

| Phase | Status | Session log | Notes |
|-------|--------|-------------|-------|
| Phase 0 — Skeleton, `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`, cockpit | shipped | `session-logs/26-10-03-001-phase-0-skeleton.md` | the kit boots a first-time user |
| Phase 1 — Skills and templates | shipped | `session-logs/26-10-03-002-phase-1-skills-and-templates-a.md`, `session-logs/26-10-03-003-phase-1-skills-and-templates-b.md` | fourteen skills, six templates, de-coupled from the author's private infrastructure |
| Phase 2 — Manual and examples | shipped | `session-logs/26-10-03-004-phase-2-manual-and-examples-a.md`, `session-logs/26-10-03-005-phase-2-manual-and-examples-b.md` | EN then FR, six chapters each, two examples, native commands checked against 2.1.288 |
| Phase 3 — Blank-machine test, website, v0.1.0 | shipped | `session-logs/26-10-03-006-phase-3-release-a.md`, `26-10-04-001-phase-3-release-plugin.md`, `26-10-04-002-phase-3-release-b.md` | tag `v0.1.0`, public, `/kit` live, GitHub Release 2026-10-04 |
| After v0.1.0 — discussion, seven decisions | shipped | `session-logs/26-10-04-003-after-v0-1-0.md` | `docs/plan/decisions/2026-10-04-after-v0-1-0.md` |
| Launch hygiene | shipped | `session-logs/26-10-04-004-launch-hygiene.md` | D4, D6, D7, D8; Proof due 8 closed in 011 |
| Distribution article | shipped (drafts) | `session-logs/26-10-04-005-distribution-article.md` | D2; blog `caaaf66` not pushed, not synced |
| First outside run | queued | _(pending)_ | D1 criterion |
