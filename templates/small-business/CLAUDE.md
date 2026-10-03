# {{project_name}}

{{business_kind}}. Owner: {{owner_name}}. Customers: {{customers}}. Tools already in use:
{{existing_tools}}.

{{description}}

The owner's first goal, in their words: "{{first_goal}}"

## Rule number one: nothing leaves this folder without the owner

No quote, invoice, e-mail, order, payment, declaration or message reaches a customer, a
supplier, a bank or an administration from a session. The assistant prepares the file,
names it, and tells the owner where it is. The owner sends, signs and pays.

## Invariants

- **A figure quoted comes from the register, never from memory.** `register.md` (or the
  tool named in Sources of truth) is the only source of amounts; a session that needs a
  figure reads it there or says "not in the register".
- **A price is the owner's decision.** The assistant computes, compares and proposes;
  changing a price in `offers.md` is a level-1 question.
- **Every customer-facing text is in the owner's voice**, as written in `voice.md`: short,
  no superlative without a fact, no promise the business cannot keep.
- **A quote carries a validity date and a number; an invoice carries a due date and a
  number.** Numbering never skips and never reuses.
- **Recurring tasks are listed, with their rhythm, in `recurring.md`.** A task done is a
  line with a date, not a memory.

## Layout

```
offers.md               what is sold, at what price, with what conditions
voice.md                how the business speaks to customers
register.md             quotes, invoices, payments: number, date, customer, amount, status
customers/              one file per customer: contacts, history, open items
recurring.md            weekly, monthly, yearly tasks, with the last date done
templates/              quote, invoice, e-mail templates with [placeholders]
sent/                   copies of what the owner actually sent, frozen
```

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| What is sold and at what price | `offers.md` | a price change is a level-1 decision |
| Money in and out | `register.md` | every amount quoted elsewhere cites a line here |
| What a customer received | `sent/` | never edited after the send date |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the files
before believing it. One slice per session. Closing follows `/next`: log, next prompt,
`casp check` exit 0.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Send a quote, invoice, e-mail, or pay anything? | **Never.** Prepare the file; the owner sends or pays. Level 1. | rule number one |
| Change a price, a discount, a payment term? | Level 1. Propose with the arithmetic, wait. | invariants |
| Create a customer file? | Yes, when a quote is prepared for them. | layout |
| Number a new quote or invoice? | Yes: next number in `register.md`, never reused. | invariants |
| Record a payment? | Only from a bank line or a receipt the owner provides, with its date. | invariants |
| Wording, file names, order of a list? | Level 2: decide, record, continue. | root rules |

## What signals the owner on this project

- Any send, signature, payment, declaration: the owner does it, always.
- A price, discount, or payment term.
- An unpaid invoice past its due date: the owner decides the follow-up, the assistant
  prepares it.
- A figure the register and a bank line disagree on.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
