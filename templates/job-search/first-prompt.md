---
status: queued
session_id: pending
session_log: pending
drafted_at: {{created_at}}
next_after: phase-0-init
---

# Session — phase-1-application-kit : Application kit

> **Status : QUEUED.** Drafted by `/new-project` on {{created_at}}. The cockpit exists and
> is empty; nothing has been written for an employer yet.
>
> **Goal.** The masters, the tracking file and the content rules exist, so that the first
> employer folder can be prepared in the next session without inventing anything.
>
> **Why now.** The owner's first goal: "{{first_goal}}". Nothing can be sent before the
> masters are right, and the first application is always the one that reveals what is
> missing.

**Project root.** `my-projects/{{project_name}}/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-application-kit.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/new-project` on {{created_at}}. `CLAUDE.md` holds rule
  number one (prepare everything, send nothing), the invariants and the pre-approved
  decisions. Read it before the first file.
- **Target role:** {{target_role}}. **Situation:** {{current_situation}}. **Scope:**
  {{search_scope}}.

## MUST

1. Ask the owner for their current CV and any letter they have already written, as files
   dropped in `_common/`. If none exists, write the CV from a twenty-minute interview:
   roles, dates, three provable achievements per role, with the fact behind each.
2. `_common/`: one master CV per target (target role, current role if different), two
   generic letters (spontaneous, published offer), two e-mail templates with
   `[bracketed]` placeholders and the rule at the top: no bracket survives in a sent e-mail.
3. `applications.md`: the tracking file, columns: entity, target role, type (spontaneous or
   offer), channel, folder, status, sent on, follow-up, notes. Empty, with the status chain
   written above the table.
4. `_interview/`: ten questions of the trade the owner must be able to answer, each with a
   two-line answer the owner validates. One incident story from their experience, told in
   four lines: situation, what they did, what it cost, what they changed.
5. Check every master against the content rules in `CLAUDE.md`; list every sentence that
   was refused and why, in the session log.

## SHOULD

- A trade filter written in `_common/offer-filter.md`: three criteria an offer must meet,
  three that exclude it, in the owner's words.

## MUST NOT

- No e-mail sent, no form submitted, no account created on a job board.
- No employer folder yet; that is phase 2, one at a time.

## Close

Session log, `casp ship phase-1-application-kit --log <id>`, draft
`PHASE-2-FIRST-WAVE.md` (one employer folder, sent by the owner before the next), `casp
close`, `casp check` exit 0, two commits.
