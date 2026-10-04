---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-001-application-kit.md
drafted_at: 2026-10-03
next_after: phase-0-init
---

# Session — phase-1-application-kit : Application kit

> **Status : QUEUED.** Drafted by `/thales:new-project` on 2026-10-03. The cockpit exists and
> is empty; nothing has been written for an employer yet.
>
> **Goal.** The masters, the tracking file and the content rules exist, so that the first
> employer folder can be prepared in the next session without inventing anything.
>
> **Why now.** The owner's first goal: "Have a CV and a letter I am not ashamed of, then send the first application within a week.". Nothing can be sent before the
> masters are right, and the first application is always the one that reveals what is
> missing.

**Project root.** `my-projects/job-search/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-application-kit.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/thales:new-project` on 2026-10-03. `CLAUDE.md` holds rule
  number one (prepare everything, send nothing), the invariants and the pre-approved
  decisions. Read it before the first file.
- **Target role:** Customer Support Specialist (bilingual French and English). **Situation:** between jobs since September 2026, four years as a travel agent before that. **Scope:**
  Lyon or fully remote, full-time, travel, insurance and software companies; no call centre with scripted calls, no commission-only pay.

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
