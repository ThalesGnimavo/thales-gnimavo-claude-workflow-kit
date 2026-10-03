---
phase: phase-1-application-kit
---

# 26-10-03-001 — phase-1-application-kit : Application kit

**Session prompt :** `docs/plan/sessions/PHASE-1-APPLICATION-KIT.md` (shipped by this log).
**Previous session end :** `132bd58` (project created by `/new-project`, job-search profile).
**Delegation :** executed inline. One sitting; nothing to run in the background.
**State at session start :** phase 0 shipped (the cockpit), phase 1 queued with its prompt,
`casp check` 0. The owner had no CV file and one old letter she did not want to reuse;
the CV was written from a twenty-minute interview, as the prompt allows.

## Scope shipped this session

### A — `_common/` (NEW): the masters
- `cv-customer-support.md`: one master CV for the target role. Three provable
  achievements per role, each with the fact behind it (satisfaction score, refund delay,
  two agents trained). Two `[placeholders]` only: e-mail and phone, filled at send time.
- `letter-spontaneous.md`, `letter-offer.md`: two generic letters. Every variable part is
  a `[bracket]`; the rule "no bracket survives in a sent document" is at the top of each.
- `email-templates.md`: the application e-mail and the ten-working-days follow-up.
- `offer-filter.md` (SHOULD): three criteria an offer must meet, three that exclude it,
  in the owner's words.

### B — `applications.md` (NEW): the tracking file
Columns: entity, target role, type, channel, folder, status, sent on, follow-up, notes.
Empty. The status chain and the "a date, not a check-mark" rule are written above the table.

### C — `_interview/` (NEW)
- `questions.md`: ten questions of the trade, a two-line answer each, validated by the
  owner during the session.
- `incident-story.md`: the coach operator bankruptcy of spring 2024, in four lines
  (situation, what she did, what it cost, what she changed).

### D — Content rules applied (MUST 5)
Every master was checked against `CLAUDE.md`. Sentences refused and replaced:
- "Excellent communicator with outstanding people skills" (CV profile): superlative
  without a fact. Replaced by the satisfaction score and the two agents trained.
- "The agency closed because management never listened to the front line" (old letter):
  criticism of a former employer. Dropped; the closure is stated as a fact, without cause.
- "I handled hundreds of complaints a month" (CV): figure the owner cannot prove. Replaced
  by "about 40 customers a day at peak season", which she can.

## What did NOT ship — and why
- No employer folder: phase 2, one at a time, as the prompt's MUST NOT says.
- No PDF export yet: the masters are Markdown; the export is done per employer, at the
  moment a folder goes to `ready`, so that what is frozen is what was sent.

## Files touched

```
_common/{cv-customer-support,letter-spontaneous,letter-offer,email-templates,offer-filter}.md   new
_interview/{questions,incident-story}.md                                                         new
applications.md                                                                                  new
casp/{state.json,now.md,roadmap.md}  docs/plan/sessions/  session-logs/                          state
```

## Verify

### Inline (2026-10-03)

- Bracket count in the masters, which must be non-zero (they are masters):
  ```
  $ grep -c '\[' _common/letter-spontaneous.md _common/letter-offer.md _common/email-templates.md
  _common/letter-spontaneous.md:11
  _common/letter-offer.md:13
  _common/email-templates.md:12
  ```
- `applications.md` has zero rows under the header (`grep -c '^| [A-Z]' applications.md` → 0 data rows; the two lines matched are the header and the separator).
- `casp check` after the state bump: see "CASP state" below.

### Post-implementation audit
Skipped: no automation, no sending, no data of a third party. The content check against
`CLAUDE.md` (section D) is the audit this project needs.

## Deferred / risks
- The CV facts come from the owner's memory, not from documents. Before the first send,
  the owner re-reads the three figures (4.6 / 5, eight working days, two agents) and
  confirms each in one word.
- `Proof due: the PDF of a letter reads correctly with no bracket — on the first employer
  folder — blocked by: no employer folder yet (phase 2).`

## Decisions taken without the user
- Masters kept in Markdown, exported to PDF per employer at `ready`. Way back: export the
  masters once and freeze them in `_common/`.
- The offer filter is a file in `_common/`, not a section of `CLAUDE.md`: it will change
  more often than the constitution. Way back: move the six lines into `CLAUDE.md`.
- One master CV (target role only): the current role is the same trade. Way back: a
  second master if a different target appears.

## CASP state + housekeeping
- `casp ship phase-1-application-kit --log 26-10-03-001-application-kit`.
- Pointers: `current_phase` = phase 1, `next_phase` = `phase-2-first-wave`,
  `next_prompt` = `docs/plan/sessions/PHASE-2-FIRST-WAVE.md` (drafted, queued).
- `casp close --yes`, `casp check` 0; two commits, work first.

## End-of-session
Next: `/next job-search`, phase 2, first wave. The first employer folder; the owner
sends before the second one is prepared.
