# ledger-cli

> Commands renamed to `/thales:` on 2026-10-04; logs updated to match.

Profile: software. Owner: Sam Idris (fictional).
A command-line tool that records small expenses in a plain JSON file and prints monthly totals; one folder, no server, no account.
Run from the kit root with `/thales:next ledger-cli`.
Created on 2026-10-03.

## What this folder is

A project created with `/thales:new-project` from the `software` profile under the name
`ledger-cli`, then played for two sessions on 2026-10-03, and frozen here as
`examples/software/`. The owner is invented. The code is real and runs: Node.js 22 or
newer, no dependency.

In your own project, the folder is its own git repository and `casp/state.json` names
your own commits. This copy ships without its `.git` folder: `last_commit` names the kit
commit that froze it, so that `casp status` and `casp check` still run from inside it.
The history as it was played is listed at the end of this file.

## What to look at, in this order

1. `CLAUDE.md`: the constitution. Rule number one (the gate passes before any push), the
   invariants, the `## Gate` block with the two commands the owner gave, the
   `## Pre-approved decisions` table.
2. `docs/plan/sessions/PHASE-1-WALKING-SKELETON.md`: the first prompt, now `status: shipped`.
3. `session-logs/26-10-03-001-walking-skeleton.md`: the first session. The gate was red on
   its first run (a wrong `test` script) and the log says so; then the raw output of the
   gate, of the end-to-end path, and of the same gate from a fresh clone.
4. `docs/plan/sessions/PHASE-2-FIRST-FEATURE.md`: the owner's first goal as a prompt,
   with a MUST list that fits one session and a MUST NOT that forbids a dependency.
5. `session-logs/26-10-03-002-first-feature.md`: phase 2 shipped. One `Proof due` remains
   (the CSV opened in a real spreadsheet), stated as such rather than claimed.
6. `docs/plan/sessions/PHASE-3-HARDENING.md`: the queued prompt, built from the two risks
   the first log deferred.
7. `casp/now.md`, `casp/roadmap.md`, `casp/state.json`.
8. From this folder: `npm test`, `npm run check`, then `casp status` and `casp check`.

## Run it

```
cd examples/software
npm test
npm run check
node src/cli.mjs add 12.50 coffee
node src/cli.mjs total 2026-10
node src/cli.mjs export 2026-10 october.csv
```

`ledger.json` is created in the folder and ignored by git; delete `october.csv` when done.

## The history as it was played

```
41c0c8d chore(casp): close phase-2-first-feature — phase 3 queued with its prompt
bd67317 feat: export one month as CSV (ledger export <YYYY-MM> [file])
cab420f chore(casp): close phase-1-walking-skeleton — phase 2 queued with its prompt
b5b3a04 feat: walking skeleton — add and total, the gate (npm test, npm run check)
ccc505d chore: project created from the software profile
```

Two commits per session, the work first, the state second. The commit SHAs quoted in the
session logs and in `casp/roadmap.md` are these.

## What not to do with it

Do not copy this folder into `my-projects/`. Create your own with `/thales:new-project`: the
gate commands and the deployment answer must be yours.
