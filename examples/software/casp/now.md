# What I'm doing NOW

> **Updated** : 2026-10-03 (session 002: phase 2 shipped, phase 3 queued).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 2 shipped: `ledger export <YYYY-MM> [file]` writes the month as CSV with RFC
4180 quoting, eight tests, gate green.** The owner's first goal is done; one Proof due
remains (the file opened in a real spreadsheet). Phase 3 (hardening: atomic write, local
date, corrupt file, every error tested) is queued with its prompt. No remote yet.

---

## Concrete next action if I have…

### 15 minutes

`node src/cli.mjs export 2026-10 october.csv`, open the file in your spreadsheet, and
say in one word whether it shows three columns without a wizard (the Proof due).

### 1 hour

`/next ledger-cli`: the atomic write (MUST 1) with its test, gate green.

### Half a day

The whole of `docs/plan/sessions/PHASE-3-HARDENING.md`, then phase 4 drafted.

---

## Don't get distracted by

These items are NOT on the Next-3 (still or newly) :

- **A new command**: phase 3 adds none; phase 4 is the release.
- **A published package**, phase 4, and the owner publishes.

---

## Constraints active today

- Rule number one: the gate passes before any push.
- No dependency without a line in the session log.
- No secret in the repository; `.env` is never read.
- `casp check` is mandatory before push when the casp state was bumped.

---

## How to use this file

- **Start of session** : `casp status` reads this + state.json + the next-prompt preview + last 10 commits in one command.
- **End of session** : overwrite the three blocks (focus, next-actions-by-budget, don't-get-distracted). No paragraphs, no narrative — mirror the shape of this file.
- **Before push** : `casp check` exits 0. If FAIL, fix inline.
- **When "don't get distracted" feels limiting** : that's the point. If you need to break it, justify in `roadmap.md` first.
