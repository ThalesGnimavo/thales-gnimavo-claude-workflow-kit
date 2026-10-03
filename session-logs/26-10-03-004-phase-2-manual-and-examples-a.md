# 26-10-03-004 — phase-2-manual-and-examples, slice A : The English manual and the two worked examples

**Phase NOT finished.** Slice A shipped (the manual in English, the two examples); slice B
(the French manual, `native-commands.md`, the profile-aware wording) is the next session.
`phase-2-manual-and-examples` stays queued; the prompt is unchanged.

**Session prompt :** `docs/plan/sessions/PHASE-2-MANUAL-AND-EXAMPLES.md` (still queued).
**Previous session end :** `9318249` (arbitration recorded for phase 2 by the chain runner).
**Delegation :** inline, plus one read-only `Explore` sub-agent for the post-implementation
audit and one headless `claude -p "/casp kit"` probe in the background (the permission
Proof due). Reason: the prompt's order (examples first, then a manual that quotes them)
is serial.
**State at session start :** phase 1 shipped, phase 2 queued with its prompt and its
arbitration (`solo`, by `chain-runner`), cockpit current with casp 0.18.2, `casp check`
0 with one WARN (`last_commit` behind HEAD, the arbitration commit), `origin/main` =
`HEAD`. Autonomous session inside a chain started by the user: no question possible; the
chain is the go for build, commit and push.

## Scope shipped this session

### A — `examples/job-search/` (NEW): a job search played for two sessions
Created by replaying the `/new-project` procedure by script (headless session: the
`AskUserQuestion` menu cannot be driven) in a scratch git repository, with a fictional
owner (Léa Fontaine) and fictional employers. Session 001 shipped
`phase-1-application-kit`: masters under `_common/`, `applications.md`, `_interview/`,
`offer-filter.md`, three sentences refused under the content rules. Session 002 prepared
the first employer folder up to `ready` with both PDFs read back, and left the phase
queued: the owner has not sent. Six commits, two per session plus the creation. Frozen
into the kit without `.git`; `README.md` says what to look at in which order and lists
the history as played.

### B — `examples/software/` (NEW): `ledger-cli`, played for two sessions
Same procedure, software profile, owner Sam Idris (fictional). Node 22, no dependency,
gate `npm test` + `npm run check`. Session 001 shipped the walking skeleton (`add`,
`total`, four tests, gate green from a fresh clone; the first run was red on a wrong
`test` script, said in the log). Session 002 shipped `ledger export <YYYY-MM> [file]`
(RFC 4180 quoting, eight tests) and queued `PHASE-3-HARDENING.md` from the two risks
the first log deferred. Five commits. Frozen the same way.

### C — `docs/en/` (NEW): the manual, five chapters and a table of contents
`README.md`, `a-day.md`, `a-session.md`, `a-project.md`, `the-state.md`, `pitfalls.md`.
Every chapter ends with "What to type" and "What you should see"; every quoted output
comes from a run of this session on the examples (`casp status`, `casp check`, `casp
ship`, `casp close`, the `/new-project` proofs, the `/day` row values) or from FAILs
provoked on a copy of `examples/job-search/` (`CASP-PROMPT-003`, `CASP-SESSION-001`,
`CASP-GIT-001` in both forms, `CASP-WORKTREE-001`, `casp close` exit 1).
`native-commands.md` is not written: slice B; the table of contents says so.

### D — The French-templates decision (level 2, left open by session 003)
Templates stay in English with the owner's answers verbatim; no `templates/<profile>/fr/`.
Written in `docs/en/a-project.md`, "The language of the constitution", with the three
reasons and the one-session way to a French constitution (ask for a translation that
keeps the three headings skills read by name).

### E — `README.md`, `CHANGELOG.md`, `casp/` (MODIFIED)
Release status (EN and FR) no longer says the manual and the examples arrive later; it
says what ships today and what arrives with v0.1.0. `[Unreleased]`: two lines.
`roadmap.md`: Next-3 row 1 restated as slice B; three defects met while playing the
examples listed under "Queued — non-critical" with file and line. `now.md` refreshed.

## What did NOT ship — and why
- Slice B, as the prompt dimensions it: `docs/fr/`, `native-commands.md`, the
  profile-aware wording in `/casp`, `/next`, `/update`.
- MUST 5 on the root `CLAUDE.md`: its `<workspace>` block never said the manual arrives
  later; line 11 ("say it ships in a later release") stays true for slice B. No edit.
- Three defects found while playing the examples, not fixed (prompt, MUST NOT: a defect
  goes to the roadmap): `/new-project` step 3's branch check fails on an unborn branch;
  `"{{first_goal}}".` doubles the period; `{{deploy}}` inside the software pre-approved
  table reads badly.

## Files touched

```
docs/en/{README,a-day,a-session,a-project,the-state,pitfalls}.md       new
examples/job-search/**  examples/software/**                            new (frozen copies)
README.md  CHANGELOG.md  CLAUDE.md (one line, `<language>` block)        modified
casp/{state.json,now.md,roadmap.md}  session-logs/                      state
examples/{job-search,software}/casp/state.json                          last_commit re-pointed at the kit commit that froze them (state commit)
```

## Verify

### Inline (2026-10-03, macOS, casp 0.18.2, Node v22.17.1)

- `/new-project` replay, both examples, in their scratch repositories:
  ```
  0            # grep -rn '{{' | wc -l, each
  exit=0       # casp check --quiet, each
  ```
- `examples/job-search/` at freeze, in its scratch repository:
  ```
  casp:check · 18 PASS · 0 WARN · 0 FAIL
  ```
  PDF read-back after the fix (`pdftotext`): `sent/cv.pdf brackets=0 hashes=0 stars=0`,
  `sent/letter.pdf brackets=0 hashes=0 stars=0`. The first export of the CV had five
  `#` lines with exit code 0: recorded in the example's log 002 as the incident it is.
- `examples/software/` at freeze:
  ```
  npm test: # tests 8 / # pass 8 / # fail 0, exit=0
  npm run check: exit=0
  fresh clone (session 001): # tests 4 / # pass 4 / # fail 0, exit=0
  casp:check · 18 PASS · 0 WARN · 0 FAIL
  ```
- Inside the frozen copies before the kit commit, `casp check` fails as expected on
  `CASP-GIT-001 last_commit not found in git · state=489bea9` (and `bd67317`): the scratch
  SHAs do not exist in the kit. Re-pointed in the state commit; the check after it is in
  "CASP state" below.
- Lint over `docs/en` and `examples`: `/Users/`, author product names, emoji → 0 hits.
- Headless probe (the Proof due carried from 002 and 003): `env -u CLAUDECODE claude -p
  "/casp kit" --output-format text` from the kit root, fresh process, default permission
  mode. Exit 0, a full snapshot printed (focus, next 3, last 5 commits, working tree,
  phase, arbitration), no permission refusal in the output. Observed, not inferred: the
  `/casp` skill's commands on the kit itself pass the `.claude/settings.json` allowlist
  from a fresh `claude -p`. Not observed: the `(cd my-projects/x && casp status)` form,
  since `my-projects/` is empty; that half of the Proof due stays.

### Post-implementation audit (Explore sub-agent)

Verdict GO-WITH-FIXES (77 k tokens, 39 tool uses). SHAs, `next_after` chains, state
versus prompt and log headers consistent in both examples; `npm test` 8/8 and `npm run
check` green from `examples/software/`; hygiene clean (fictional contacts, no path, no
product name, no `{{`). Applied inline: the close-by-hand sequence in `a-session.md`
lacked the pointer step (the exact trap `pitfalls.md` describes); `pitfalls.md` had no
"What to type" / "What you should see" (MUST 4), added with the real `CASP-PROMPT-003`
line and a measured WARN for the single-commit case; `a-day.md` said the session waits
for a "go" (it does not) and `a-session.md` / `pitfalls.md` gave `/cto`'s replay of the
prompt's claims to `/next` (now: `/next` checks status, `next_after`, the CONTEXT commit
and preconditions; `/cto` replays); `the-state.md` labelled a kit-cockpit WARN as
provoked on the example; `a-project.md` said "three questions" (one profile has four)
and that `## Not done yet` is read by name (it is not); `examples/software/README.md`
said `october.csv` is ignored (it is not); root `CLAUDE.md` `<language>` block said the
manual exists in `docs/fr/`; `a-day.md` now says why the row reads `software` and the
project `ledger-cli`; `a-session.md` points at the README history. The FAIL the auditor
saw inside the frozen examples (`CASP-GIT-001 last_commit not found`) is the pre-commit
state described above; re-pointed in the state commit and re-checked below. Not applied:
`*.csv` in the example's `.gitignore` (the frozen copy stays what was played); the casp
tool's own GitHub URL in `examples/*/casp/README.md` (generated by `casp init`, the
tool's real address, not an author product name).

### Proof due

- `Proof due: no permission prompt on (cd my-projects/x && casp status) — on a fresh
  claude start from the kit root with one project under my-projects/ — blocked by: no
  project under my-projects/ in this session; the kit-root half was observed above.`
- `Proof due: /new-project end to end through the skill text — on an interactive session
  — blocked by: headless session; the procedure was replayed by script` (carried).
- `Proof due: an iTerm2 tab opens with the worker loaded — on macOS with iTerm2` (carried).
- `Proof due: a first-time reader runs a day from docs/en alone — on a person who has not
  read the author's blog — blocked by: phase 3's blank-machine test.`

## Deferred / risks
- The examples ship without `.git`; `casp check` inside them relies on the kit's history
  (`last_commit` = the kit commit that froze them). The thirteenth rule ("last_commit is
  the parent of HEAD, touches only the state surface") will WARN or PASS depending on the
  kit's own commits; it never FAILs on a SHA that exists. The README of each example says
  so. Way back: ship each example as a git bundle next to the folder.
- `docs/en/a-day.md`'s table is the `/day` layout filled with the examples' real values
  (the row commands were run on both); `/day` itself was not run through the skill in
  this headless session.
- The two PDFs (40 KB) are binary files in the kit. Acceptable for an example at `ready`;
  drop them if the kit's size ever matters.

## Decisions taken without the user
- English first for the manual (slice A), French in slice B. The kit's canonical language
  (root `CLAUDE.md`, skills, templates, README order) is English; the French chapters
  are a translation of a text that must be right first. Way back: none needed, B does FR.
- Templates stay in English, no `templates/<profile>/fr/` (section D). Way back: twelve
  files under `templates/<profile>/fr/` and a `language` switch in `/new-project`.
- Examples frozen as plain folders inside the kit, not as nested repositories or
  submodules: a clone must show their files. Way back: git bundles.
- The job-search example's second session leaves its phase unfinished on purpose (the
  owner must send), to show the "phase not finished" close and a real `## Blocked` row.
  Way back: play a third session that writes the date and ships.
- `native-commands.md` absent rather than stubbed: a stub would be a file the table of
  contents has to apologise for twice. Way back: a one-paragraph stub.
- Session log id `…-phase-2-manual-and-examples-a`, mirroring 002/003 of phase 1.

## CASP state + housekeeping
- No `casp ship`: the phase is not finished. `last_session_id` advances to this log;
  `next_prompt` unchanged, still `queued`; `arbitration` untouched (still phase 2, solo).
- `examples/*/casp/state.json`: `last_commit` set to the work commit of this session.
- `casp close --yes`, `casp check` 0; two commits (work, then state); push.

## End-of-session
Next: `/next kit`, phase 2 slice B. Start by `claude --version` and the native-commands
sheet (the only part that depends on the installed binary), then `docs/fr/`, then the
profile-aware wording, then `casp ship phase-2-manual-and-examples` and `PHASE-3-RELEASE.md`.
