---
status: queued
session_id: pending
session_log: pending
drafted_at: {{created_at}}
next_after: phase-0-init
---

# Session — phase-1-scope-and-budget : Scope, date, budget, decisions

> **Status : QUEUED.** Drafted by `/new-project` on {{created_at}}. The cockpit exists;
> no schedule, budget or decision is written yet.
>
> **Goal.** The event in one page, the schedule with its known dates, the budget envelope
> split into planned lines, and the list of open decisions with a recommendation each, so
> that the organiser can decide in one sitting.
>
> **Why now.** The organiser's first goal: "{{first_goal}}". Vendors and venues cannot be
> asked anything before the date window, the headcount and the envelope are written.

**Project root.** `my-projects/{{project_name}}/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-scope-and-budget.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/new-project` on {{created_at}}. `CLAUDE.md` holds rule
  number one (dates, venues, vendors and budget lines are the organiser's decisions), the
  invariants and the pre-approved decisions. Read it before the first file.
- **Event:** {{event_kind}}. **Date and place:** {{event_date}}. **Envelope:**
  {{budget_envelope}}.

## MUST

1. Interview the organiser, one question at a time: what success looks like at the end of
   the day, who must be there, what cannot go wrong, what has already been decided or
   promised to anyone.
2. `schedule.md`: every known date (the event, deadlines already given, the organiser's
   own constraints), and the deadlines that follow from them, working backwards.
3. `budget.md`: the envelope split into planned lines (venue, food and drink, equipment,
   communication, travel, contingency at ten percent), each with the estimate's origin.
   Committed and paid columns empty.
4. `decisions.md`: every open decision, each with the question, two or three options, a
   recommendation with its reason, and the date by which it must be taken.
5. `vendors/`, `confirmations/`, `messages/` created empty with a `.gitkeep`;
   `guests.md` and `run-of-show.md` as empty tables with their columns.

## SHOULD

- A one-line risk per budget line: what happens if the estimate is wrong by thirty
  percent.

## MUST NOT

- No vendor or venue contacted. No message prepared yet.
- No date confirmed to anyone.

## Close

Session log, `casp ship phase-1-scope-and-budget --log <id>`, draft
`PHASE-2-VENUE-AND-VENDORS.md` (shortlist, questions, confirmations), `casp close`,
`casp check` exit 0, two commits.
