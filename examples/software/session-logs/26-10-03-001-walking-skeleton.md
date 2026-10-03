---
phase: phase-1-walking-skeleton
---

# 26-10-03-001 — phase-1-walking-skeleton : The gate runs, one path works end to end

**Session prompt :** `docs/plan/sessions/PHASE-1-WALKING-SKELETON.md` (shipped by this log).
**Previous session end :** `ccc505d` (project created by `/new-project`, software profile).
**Delegation :** executed inline; the gate takes under two seconds, nothing to background.
**State at session start :** phase 0 shipped (the cockpit), phase 1 queued, `casp check` 0.
The repository held `CLAUDE.md`, `casp/`, `README.md` and nothing that runs.

## Scope shipped this session

### A — `package.json`, `.gitignore`, `.env.example` (NEW)
ES modules, Node 22 or newer, no dependency. Scripts: `test` = `node --test`,
`check` = `node --check` on the three source files. `ledger.json` (the data) is ignored.
`.env.example` names the one variable, `LEDGER_FILE`, with no value.

### B — `src/ledger.mjs`, `src/cli.mjs` (NEW): the walking path
`load`, `save`, `add`, `total`, `parseAmount`, `formatCents`. Amounts are stored in
cents (integers) so that `12.50 + 3` never becomes `15.499999`. The CLI has two commands,
`add <amount> <label...>` and `total [YYYY-MM]`; a bad amount exits 1 with one line.

### C — `test/ledger.test.mjs` (NEW): four tests
Append without mutation; refusals (bad date, non-positive amount, empty label); one month
only; cents round-trip.

### D — `README.md`, `CHANGELOG.md` (MODIFIED, NEW)
Install and run from a fresh clone; `[Unreleased]` with this session's lines.

## What did NOT ship — and why
- The CSV export: phase 2, the owner's first goal. The skeleton exists for it.
- No validation of the label beyond "not empty", no locale, no currency: phase 3.

## Files touched

```
package.json  .gitignore  .env.example  CHANGELOG.md        new
src/{ledger,cli}.mjs  test/ledger.test.mjs                  new
README.md                                                    modified
casp/{state.json,now.md,roadmap.md}  docs/plan/sessions/  session-logs/   state
```

## Verify

### Inline (2026-10-03, macOS, Node v22.17.1)

- First run of the gate was **red**: `"test": "node --test test/"` made Node look for a
  module named `test` (`Cannot find module '…/software/test'`, 1 fail). Fixed to
  `node --test`, which discovers `*.test.mjs` itself.
- Gate after the fix, in the working copy:
  ```
  $ npm test
  # tests 4
  # pass 4
  # fail 0
  npm test exit=0
  $ npm run check
  npm run check exit=0
  ```
- The path end to end, from an empty ledger:
  ```
  $ node src/cli.mjs add 12.50 coffee
  added 12.50 coffee on 2026-10-03
  $ node src/cli.mjs add 3 bread
  added 3.00 bread on 2026-10-03
  $ node src/cli.mjs total
  2026-10 15.50
  $ node src/cli.mjs total 2026-09
  2026-09 0.00
  $ node src/cli.mjs add 1,5 x
  error: bad amount: 1,5
  exit=1
  ```
- Fresh clone (MUST 5), `git clone` into a temporary folder:
  ```
  clone npm test exit=0
  # tests 4
  # pass 4
  # fail 0
  clone npm run check exit=0
  $ node src/cli.mjs add 12.50 coffee
  added 12.50 coffee on 2026-10-03
  $ node src/cli.mjs total
  2026-10 12.50
  ```

### Not seen
No screen in this project: the CLI output above is what the user sees.

### Post-implementation audit
Skipped: under fifty lines of logic, no auth, no network, no data of a third party.

## Deferred / risks
- `ledger.json` is read and written whole; two `add` commands at the same second could
  lose one entry. Single user, by design; noted for phase 3.
- A date is always "today" in the machine's UTC day; an entry added late in the evening
  in a UTC+ timezone may land on the next day. Phase 3.

## Decisions taken without the user
- Amounts stored in cents as integers. Way back: store decimal strings and parse on read.
- Test discovery by `node --test` with no path (the directory form failed on 22.17).
  Way back: list the files explicitly in the script.
- `LEDGER_FILE` as the only configuration, default `ledger.json` in the current folder.
  Way back: a `--file` flag.

## CASP state + housekeeping
- `casp ship phase-1-walking-skeleton --log 26-10-03-001-walking-skeleton`.
- Pointers: `current_phase` = phase 1, `next_phase` = `phase-2-first-feature`,
  `next_prompt` = `docs/plan/sessions/PHASE-2-FIRST-FEATURE.md` (drafted, queued).
- `casp close --yes`, `casp check` 0; two commits, work first. No remote yet: no push
  (the owner creates one; level 1).
