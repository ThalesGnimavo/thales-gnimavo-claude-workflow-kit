---
status: queued
session_id: pending
session_log: pending
drafted_at: 2026-10-03
next_after: 26-10-03-002-first-feature
---

# Session — phase-3-hardening : Errors, edge cases, what the tests do not cover

> **Status : QUEUED.** Drafted at the close of session `26-10-03-002` (phase 2 shipped:
> `ledger export`, eight tests, gate green).
>
> **Goal.** The two risks carried since session 001 are closed or written down as
> accepted, and every error the CLI can print has a test.
>
> **Why now.** Phase 4 is the release; a released tool that loses an entry when two
> commands overlap is a bug report, not a release.

**Project root.** `my-projects/ledger-cli/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-hardening.md`.
**Expected size.** One session. Gate: `npm test`, `npm run check`.

---

## CONTEXT — what changed since the parent prompt was drafted

- **Phase 2 shipped** (session 002, commit `bd67317`): `exportCsv`, `ledger export`,
  four more tests. Line ends `\n`.
- **Carried risks:** whole-file read and write of `ledger.json` (two `add` at the same
  time can lose one); "today" is the UTC day.

## MUST

1. `save` writes to a temporary file in the same folder and renames it over
   `ledger.json`, so that a crash mid-write never leaves a half file. Test: the file is
   either the old content or the new one, never truncated.
2. "Today" uses the local date, not UTC; test with `TZ` set to a UTC+ zone and a time
   late in the evening.
3. A corrupt `ledger.json` (not JSON, or not an array) exits 1 with one line that names
   the file; test both.
4. Every `error:` line the CLI can print has a test that runs the CLI as a child process
   and checks the exit code and the message.
5. `CHANGELOG.md` under `[Unreleased]`; the two risks removed from `## Not done yet` in
   `CLAUDE.md` or written there as accepted with the reason.

## SHOULD

- `ledger total` with no entries for the month prints `0.00`, tested through the CLI.

## MUST NOT

- No new command, no new dependency, no change to the CSV format.

## Close

Session log, `casp ship phase-3-hardening --log <id>`, draft `PHASE-4-RELEASE.md` (the
owner publishes; the session prepares the tag and the notes only), `casp close`,
`casp check` exit 0, two commits.
