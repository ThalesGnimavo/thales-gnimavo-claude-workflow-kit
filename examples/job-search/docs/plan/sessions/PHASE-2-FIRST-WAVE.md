---
status: queued
session_id: pending
session_log: pending
drafted_at: 2026-10-03
next_after: 26-10-03-001-application-kit
---

# Session — phase-2-first-wave : The first employer folder, sent by the owner before the next

> **Status : QUEUED.** Drafted at the close of session `26-10-03-001` (phase 1 shipped:
> masters in `_common/`, tracking file, interview sheet, offer filter). Nothing has been
> prepared for an employer yet.
>
> **Goal.** One employer folder at `ready`: letter, e-mail and CV with no bracket, the
> PDF read back, one row in `applications.md` at `ready`. The owner sends; the row gets
> its date; only then is the second folder started.
>
> **Why now.** The owner's first goal was to send the first application within a week.
> Every day without a folder at `ready` is a day the masters are not tested against a
> real offer.

**Project root.** `my-projects/job-search/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-first-wave.md`.
**Expected size.** One session per employer folder; the phase ships when the first
application has been sent and its row holds a date.

---

## CONTEXT — what changed since the parent prompt was drafted

- **Phase 1 shipped** (session 001, commit `ebf97fa`): masters, tracking file, interview
  sheet, offer filter. Three sentences were refused under the content rules; the log says
  which.
- **Proof due carried:** the PDF of a letter read back with no bracket. This session
  produces it.

## MUST

1. Ask the owner for one offer or one target employer that passes `_common/offer-filter.md`.
   Record the filter result in the row's notes, criterion by criterion.
2. Create `<EMPLOYER-NAME>/` with the letter (from the matching master), the e-mail (from
   the template) and the CV, every `[bracket]` filled from facts the owner gave. A fact
   the owner did not give is a question, not a guess.
3. Export the letter and the CV to PDF under `<EMPLOYER-NAME>/sent/`, then read the text
   back from each PDF: zero bracket, no stray character. Paste the check in the log.
4. One row in `applications.md` at `ready`, with the folder path and an empty "sent on".
5. Stop. The owner sends from their own mailbox and gives the date; the session, or the
   next one, writes it in "sent on" and moves the status to `sent`.

## SHOULD

- A `follow-up` date computed as "sent on" plus ten working days, written in the row the
  moment "sent on" is filled.

## MUST NOT

- No e-mail sent, no form submitted, no account created on a job board (rule number one).
- No second employer folder before the first row holds a date.
- No edit of a file under `<EMPLOYER-NAME>/sent/` once the date is written.

## Close

Session log. If the first row holds a date: `casp ship phase-2-first-wave --log <id>`,
draft `PHASE-3-OFFER-WATCH.md`, `casp close`, `casp check` exit 0, two commits. If the
row is at `ready` and waiting for the owner: say so at the top of the log, leave this
prompt queued, refresh `casp/now.md`, `casp close`, `casp check` exit 0, two commits.
