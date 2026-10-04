---
status: queued
session_id: pending
session_log: pending
drafted_at: {{created_at}}
next_after: phase-0-init
---

# Session — phase-1-editorial-baseline : Audience, voice, pillars, calendar

> **Status : QUEUED.** Drafted by `/thales:new-project` on {{created_at}}. The cockpit exists;
> no voice, pillar or calendar is written yet.
>
> **Goal.** The voice, the pillars, the calendar four weeks ahead with its first four
> ideas, and the brief of the first piece, so that the next session drafts from the brief
> alone.
>
> **Why now.** The owner's first goal: "{{first_goal}}". A first piece written before the
> voice and the pillars exist sets a tone nobody chose.

**Project root.** `my-projects/{{project_name}}/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-editorial-baseline.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/thales:new-project` on {{created_at}}. `CLAUDE.md` holds rule
  number one (the assistant drafts, the owner publishes), the invariants and the
  pre-approved decisions. Read it before the first file.
- **Channels:** {{channels}}. **Audience:** {{audience}}. **Cadence:** {{cadence}}.

## MUST

1. Ask the owner for three pieces they have already published or written and liked, and
   two they dislike (theirs or anyone's). Derive `voice.md` from the contrast: tone,
   sentence length, person, what is never said, ten words refused.
2. `pillars.md`: three to five subjects, each with one line on why the audience cares
   and one on what the owner knows that others do not.
3. `calendar.md`: the status chain written above the table; four ideas placed on dates
   at the committed cadence, each with a pillar and a channel.
4. `pieces/<first-piece>/brief.md`: audience, the one takeaway, the call to action, the
   sources as files or links the owner has opened. Approved by the owner in the session.
5. `measure.md`: the two or three figures the owner can actually read per channel, and
   where to read them. Nothing that requires a tool the owner does not have.

## SHOULD

- A line in `voice.md` for each channel where the format differs (length, title, first
  sentence).

## MUST NOT

- No draft. Phase 2 drafts from the approved brief.
- No publication, no scheduling, no account created.

## Close

Session log, `casp ship phase-1-editorial-baseline --log <id>`, draft
`PHASE-2-FIRST-PIECES.md` (the first piece: draft, review, ready), `casp close`,
`casp check` exit 0, two commits.
