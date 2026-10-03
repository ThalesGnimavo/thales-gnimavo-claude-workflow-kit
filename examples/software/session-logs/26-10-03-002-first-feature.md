---
phase: phase-2-first-feature
---

# 26-10-03-002 — phase-2-first-feature : Export one month as CSV

**Session prompt :** `docs/plan/sessions/PHASE-2-FIRST-FEATURE.md` (shipped by this log).
**Previous session end :** `cab420f` (state bump of session 001).
**Delegation :** executed inline.
**State at session start :** phase 1 shipped, phase 2 queued, `casp check` 0, gate green.

## Scope shipped this session

### A — `src/ledger.mjs` (MODIFIED): `exportCsv(entries, month)`
Header `date,amount,label`, entries of the month in date order, amount with two
decimals, RFC 4180 quoting of the label (comma, quote, newline). Bad month throws.

### B — `src/cli.mjs` (MODIFIED): `ledger export <YYYY-MM> [file]`
To a file (one line: how many entries were written) or to stdout. The usage line now
lists the three commands (SHOULD).

### C — `test/ledger.test.mjs` (MODIFIED): four more tests
Empty month, order and decimals, comma and quote in a label, bad month.

### D — `README.md`, `CHANGELOG.md` (MODIFIED)

## What did NOT ship — and why
- No spreadsheet on this machine: MUST 5 was proven by the read-back below, as the
  prompt allows; the owner opens the file once in their own spreadsheet (Proof due).

## Files touched

```
src/{ledger,cli}.mjs  test/ledger.test.mjs  README.md  CHANGELOG.md   modified
casp/{state.json,now.md,roadmap.md}  docs/plan/sessions/  session-logs/   state
```

## Verify

### Inline (2026-10-03, macOS, Node v22.17.1)

- Gate:
  ```
  $ npm test
  # tests 8
  # pass 8
  # fail 0
  npm test exit=0
  $ npm run check
  npm run check exit=0
  ```
- The path, from an empty ledger (`add 12.50 coffee`, `add 1 "tea, green"`):
  ```
  $ node src/cli.mjs export 2026-10 october.csv
  wrote 2 entries to october.csv
  $ cat -ve october.csv
  date,amount,label$
  2026-10-03,12.50,coffee$
  2026-10-03,1.00,"tea, green"$
  $ node src/cli.mjs export October
  error: bad month: October
  exit=1
  ```
  (`cat -A` is GNU only; on macOS `cat -ve` shows the `$` line ends. The prompt said
  `cat -A`; the observation is the same.)

### Not seen
The file in a spreadsheet: none installed on this machine.

### Post-implementation audit
Skipped: forty lines, pure function plus one CLI branch, covered by the tests above.

## Deferred / risks
- `Proof due: october.csv opens in a spreadsheet with three columns and no wizard — on the
  owner's machine — blocked by: no spreadsheet here.`
- Carried from 001 to phase 3: whole-file write (two `add` at once), UTC day for "today".

## Decisions taken without the user
- Line ends are `\n`, not `\r\n`: every spreadsheet tested by the owner later can read
  both; the file stays diff-friendly. Way back: `\r\n` in `exportCsv`.
- Entries sorted by date only, ties kept in insertion order (stable sort). Way back:
  sort by date then label.

## CASP state + housekeeping
- `casp ship phase-2-first-feature --log 26-10-03-002-first-feature`.
- Pointers: `current_phase` = phase 2, `next_phase` = `phase-3-hardening`,
  `next_prompt` = `docs/plan/sessions/PHASE-3-HARDENING.md` (drafted, queued).
- `casp close --yes`, `casp check` 0; two commits, work first. No remote: no push.
