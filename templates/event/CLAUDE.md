# {{project_name}}

{{event_kind}}. Date and place: {{event_date}}. Budget envelope: {{budget_envelope}}.
Organiser: {{owner_name}}.

{{description}}

The organiser's first goal, in their words: "{{first_goal}}"

## Rule number one: a date, a venue, a vendor and a budget line are the organiser's decisions

The assistant builds the shortlists, the comparisons, the question lists and the
messages. Booking, signing, paying, confirming and inviting are done by the organiser.
Nothing in this project sends a message or commits money.

## Invariants

- **One schedule, `schedule.md`.** Every date, deadline and slot lives there; a date
  mentioned anywhere else cites it.
- **One budget, `budget.md`, three columns per line: planned, committed, paid.** A figure
  without a column is not a figure. The total of each column is recomputed, never typed.
- **Every commitment has a written confirmation stored in `confirmations/`.** A verbal
  "yes" from a vendor or a venue is a lead, not a booking.
- **The run-of-show is the one timing document on the day.** Nothing on the day is
  decided from a chat or memory.
- **A guest is invited when the invitation file carries a sent date**, and confirmed when
  the reply is stored.

## Layout

```
schedule.md             every date and deadline, past and future
budget.md               planned, committed, paid, per line, with totals recomputed
decisions.md            open decisions, each with a question, options, a recommendation, a deadline
vendors/                one file per vendor or venue: contact, quote, questions, status
confirmations/          written confirmations as received, frozen
guests.md               the guest list: name, invited on, replied, notes
run-of-show.md          the day, minute by minute, who does what
messages/               invitations, requests, thanks, prepared and sent by the organiser
```

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| When | `schedule.md` | any other date cites it |
| How much | `budget.md` | totals recomputed from the lines |
| What is booked | `confirmations/` | a booking without a file is a lead |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the files
before believing it. One slice per session. Closing follows `/next`: log, next prompt,
`casp check` exit 0. The roadmap ends after the event, with payments closed and thanks
sent.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Book, sign, pay, confirm, invite? | **Never.** Prepare; the organiser does it. Level 1. | rule number one |
| Add a vendor to the shortlist? | Yes, with a file under `vendors/` and the three questions to ask them. | layout |
| Move a date in `schedule.md`? | Level 1, except the assistant's own internal deadlines (level 2, recorded). | invariants |
| Enter a planned amount? | Yes, from a quote or an estimate named in the line. | invariants |
| Enter a committed or paid amount? | Only from a confirmation or a receipt the organiser provides. | invariants |
| Wording of a message, order of a list, file names? | Level 2: decide, record, continue. | root rules |

## What signals the organiser on this project

- Any booking, signature, payment, invitation: the organiser does it, always.
- A line that would take the committed total over the envelope.
- A vendor without a written confirmation ten days before the event.
- Two items in `schedule.md` that collide.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
