---
status: queued
session_id: pending
session_log: pending
drafted_at: 2026-10-04
next_after: 26-10-04-005-distribution-article
---

# Session — first-outside-run : one person who is not the author opens the kit, logged step by step

> **Status : QUEUED.** Drafted at the close of the discussion session `26-10-04-003`
> (decision record `docs/plan/decisions/2026-10-04-after-v0-1-0.md`, D1). Runs only when the
> user's criterion holds: `LAUNCH-HYGIENE.md` shipped **and** Proof due 7 (the blank-machine
> run) observed. If either is missing, this prompt is not started; the gap is the session.

**Project root.** the kit root.

---

## CONTEXT

- Everything left in the backlog (Spanish docs, Windows walkthrough, fleet without iTerm2)
  was written before anyone outside opened the kit. This run is the only input that ranks
  them. The user is not in a hurry and wants no known defect presented: hence the criterion.
- The reader is chosen by the user: one person, ideally non-technical, on a machine that
  never had Claude Code, who reads nothing but `INSTALL.md` and the `/kit` page in their
  language.

## REFERENCE FILES

- `INSTALL.md`, `docs/<lang>/01-*.md` and `02-*.md`: what the reader is expected to follow.
- `CHANGELOG.md` `[0.1.0]` "Untested at this release": what the run may confirm or break.
- `casp/roadmap.md` "Proofs due": 2 to 7, each one the run can close.

---

## SCOPE

### MUST HAVE

1. **The run itself**, observed, not reported second-hand: screen share or the reader's
   terminal transcript, from the download to the first `/thales:new-project` ending with
   `casp check` at 0 FAIL. Every stop, every question asked aloud, every message the reader
   did not understand, with the minute.
2. **The log of the run** in `session-logs/`, raw: what was typed, what was printed, where
   the reader stopped, how long each step took. No paraphrase.
3. **The ranking**: every defect met, classified blocking / confusing / cosmetic, each one
   either a changelog `[Unreleased]` entry with a fix, or a backlog entry with an owner.
   Then the backlog reordered: Spanish, Windows, fleet, by what the run showed.
4. **Proofs due closed by the run** moved from "Proofs due" to the log with their
   observation; the `[0.1.0]` untested list is not edited (release notes are history), the
   next release's section says what was confirmed.

### SHOULD HAVE

- The first `v0.1.1` prompt drafted from the blocking defects, if there is at least one
  outside observation behind it (D5).

### DEFER

- Fixing anything during the run. The run is observed, not steered; a fix made live
  invalidates the observation.

---

## VERIFY

- The run log exists and names the reader's OS, Claude Code version (`claude --version` as
  printed on their machine) and the kit version they downloaded.
- `casp check` exit 0.

## DO NOT

- Do not help the reader beyond what `INSTALL.md` says; write down the moment help was
  needed instead.
- Do not start this prompt before the two conditions above hold.
- Do not send any invitation from the session: the user chooses and contacts the reader.

## AT END OF SESSION

1. Run log, ranking, backlog reordered, proofs moved.
2. `casp ship first-outside-run --log <id>`; the next prompt is whatever the ranking puts
   first (a `v0.1.1` slice, or a discussion if the run opens a question the user must settle).
3. `casp/now.md`, `casp/roadmap.md`; `casp check` 0 FAIL; commit, push.

## EXPECTED OUTPUT

The first observation of the kit by someone else, dated and raw, and a backlog ordered by it
instead of by the author's guess.
