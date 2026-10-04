---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-001-walking-skeleton.md
drafted_at: 2026-10-03
next_after: phase-0-init
---

# Session — phase-1-walking-skeleton : The gate runs, one path works end to end

> **Status : QUEUED.** Drafted by `/thales:new-project` on 2026-10-03. The cockpit exists;
> the repository holds `CLAUDE.md`, `casp/` and nothing that runs.
>
> **Goal.** A fresh clone runs the gate green and one path works end to end, however
> thin, so that every later slice is added behind a gate that already exists.
>
> **Why now.** The owner's first goal: "Export one month as a CSV file I can open in a spreadsheet.". A feature built before the gate
> exists is a feature nobody can refuse.

**Project root.** `my-projects/ledger-cli/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-walking-skeleton.md`.
**Expected size.** One session. Gate: see `CLAUDE.md`.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/thales:new-project` on 2026-10-03. `CLAUDE.md` holds rule
  number one (the gate passes before any push), the invariants, the `## Gate` section and
  the pre-approved decisions. Read it before the first file.
- **Stack:** Node.js 22, plain JavaScript (ES modules), one JSON file as storage, no framework, no dependency. **Deployment:** not deployed. **Gate:** the commands under
  `## Gate` in `CLAUDE.md`. When that section says "none yet", this session's first job is
  to make a gate exist and to replace that line.

## MUST

1. Initialise the stack: the minimal project files, a `README.md` that says how to
   install and run from a fresh clone, a `.gitignore` for the stack, `.env.example` with
   every variable named and no value.
2. The gate: at least one test that runs and one build or type check, wired to the
   commands under `## Gate`. Raw output in the session log.
3. One path end to end: the thinnest request, command or screen that touches every layer
   the stack will have (for a web service: one route that reads from the database and
   returns something; for a CLI: one command that reads an input and writes an output).
4. `CHANGELOG.md` with `[Unreleased]` and the lines of this session.
5. The gate green from a fresh clone (`git clone` into a temporary folder, install, run
   the gate), with the output in the log.

## SHOULD

- A `## Not seen` line in the log for any screen the session could not open.

## MUST NOT

- No feature beyond the walking path. Phase 2 builds the first feature the owner named.
- No deployment, no publication, no external service called for real.

## Close

Session log, `casp ship phase-1-walking-skeleton --log <id>`, draft
`PHASE-2-FIRST-FEATURE.md` from the owner's first goal, `casp close`, `casp check`
exit 0, two commits, push after the gate is green.
