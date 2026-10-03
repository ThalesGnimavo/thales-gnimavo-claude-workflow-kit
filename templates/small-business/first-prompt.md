---
status: queued
session_id: pending
session_log: pending
drafted_at: {{created_at}}
next_after: phase-0-init
---

# Session — phase-1-operating-baseline : Operating baseline

> **Status : QUEUED.** Drafted by `/new-project` on {{created_at}}. The cockpit exists;
> nothing about the business is written in this folder yet.
>
> **Goal.** What is sold, to whom, at what price, how the business speaks, and which tasks
> recur, all written from the owner's answers, so that the next session can prepare a
> real quote without asking a single question already answered.
>
> **Why now.** The owner's first goal: "{{first_goal}}". Every later phase reads these
> files; a quote prepared before the price list exists is a quote to redo.

**Project root.** `my-projects/{{project_name}}/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-operating-baseline.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/new-project` on {{created_at}}. `CLAUDE.md` holds rule
  number one (nothing leaves this folder without the owner), the invariants and the
  pre-approved decisions. Read it before the first file.
- **Business:** {{business_kind}}. **Customers:** {{customers}}. **Tools:**
  {{existing_tools}}.

## MUST

1. Interview the owner for twenty minutes, one question at a time: each offer, its price,
   its conditions; who the five most frequent customers are; how customers pay and how
   long they take; which tasks come back every week, month, year.
2. `offers.md`: one block per offer: name, price, unit, conditions, what is included and
   what is not. Prices exactly as the owner says them; nothing rounded.
3. `voice.md`: how the business speaks, from three real messages the owner has already
   sent (ask for them); ten words or patterns to avoid.
4. `register.md`: the empty register with its columns (number, date, customer, kind,
   amount, status, paid on) and the numbering rule chosen by the owner.
5. `recurring.md`: the recurring tasks with their rhythm and the last date each was done,
   "unknown" when the owner does not remember.
6. `customers/`: one file for each of the five most frequent customers, with contacts and
   open items as the owner states them.

## SHOULD

- A one-paragraph "what this business is for" at the top of `CLAUDE.md`, from the owner's
  words, replacing the generated description if the owner prefers theirs.

## MUST NOT

- No quote, invoice or e-mail prepared yet; that is phase 2, with templates.
- No price proposed or changed.

## Close

Session log, `casp ship phase-1-operating-baseline --log <id>`, draft
`PHASE-2-QUOTES-AND-INVOICES.md` (templates and numbering), `casp close`, `casp check`
exit 0, two commits.
