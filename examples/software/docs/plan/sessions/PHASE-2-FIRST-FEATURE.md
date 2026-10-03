---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-002-first-feature.md
drafted_at: 2026-10-03
next_after: 26-10-03-001-walking-skeleton
---

# Session — phase-2-first-feature : Export one month as CSV

> **Status : QUEUED.** Drafted at the close of session `26-10-03-001` (phase 1 shipped:
> `add`, `total`, the gate green from a fresh clone).
>
> **Goal.** `ledger export <YYYY-MM> [file]` writes the month's entries as CSV that a
> spreadsheet opens without a wizard, behind the gate.
>
> **Why now.** It is the owner's first goal, in their words: "Export one month as a CSV
> file I can open in a spreadsheet."

**Project root.** `my-projects/ledger-cli/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-first-feature.md`.
**Expected size.** One session. Gate: `npm test`, `npm run check`.

---

## CONTEXT — what changed since the parent prompt was drafted

- **Phase 1 shipped** (session 001, commit `b5b3a04`): `src/ledger.mjs` (pure functions,
  cents), `src/cli.mjs` (`add`, `total`), four tests, gate green in the working copy and
  from a fresh clone.
- **Known and deferred to phase 3:** whole-file read and write, UTC day for "today".

## MUST

1. `export(entries, month)` in `src/ledger.mjs`: returns the CSV text, header
   `date,amount,label`, amount with two decimals and a dot, one line per entry of the
   month, in date order, label quoted when it contains a comma, a quote or a newline
   (RFC 4180 quoting).
2. `ledger export <YYYY-MM> [file]` in the CLI: writes to the file, or to stdout when no
   file is given. Exits 1 with one line on a bad month.
3. Tests: empty month (header only), two entries in order, a label with a comma, a label
   with a quote. Raw gate output in the log.
4. `README.md` and `CHANGELOG.md` updated.
5. The exported file opened by a real spreadsheet, or, when none is on the machine, the
   file read back with `cat -A` showing `$` line ends and no stray character; say which.

## SHOULD

- A `--help` or usage line that lists the three commands.

## MUST NOT

- No dependency for CSV: twenty lines of quoting are enough and testable.
- No other feature; no change to the storage format.

## Close

Session log, `casp ship phase-2-first-feature --log <id>`, draft `PHASE-3-HARDENING.md`
(the two deferred risks of session 001 first), `casp close`, `casp check` exit 0, two
commits.
