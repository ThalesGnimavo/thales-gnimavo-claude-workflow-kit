# {{project_name}}

Job search of {{owner_name}}. Target role: {{target_role}}. Current situation: {{current_situation}}.
Scope: {{search_scope}}.

{{description}}

This is run as a project, not as a pile of documents: one folder per employer, one
tracking file, a roadmap that ends at a signed contract. The owner's first goal, in their
words: "{{first_goal}}"

## Rule number one: prepare everything, send nothing

Every letter, e-mail and follow-up is written here as a file, ready to send. The owner
reads it and presses Send. No command, script or integration in this project sends,
posts or submits anything. A draft placed in the owner's mailbox is the furthest an
automation goes.

## Invariants

- **A row is sent only when its "sent on" column holds a date.** A check-mark is a claim; a
  date is evidence. Nobody can fake twenty dates by accident.
- **No bracket survives in a sent document.** `[placeholders]` live in the masters; a file
  that still contains one is not ready.
- **What an employer received is frozen.** Each employer folder keeps a copy of the PDFs
  exactly as sent; the masters evolve, the copies do not.
- **No sentence the owner cannot prove.** No superlative without a fact behind it, no
  internal figure of a current or former employer, no criticism of a current or former
  employer. The assistant refuses the sentence and proposes the provable one.
- **The tracking file is the only list.** No second list in a notes app, a chat, or a head.

## Layout

```
_common/                masters: CVs, generic letters, e-mail templates with [placeholders]
_interview/             preparation: questions of the trade, answers, incident stories
<EMPLOYER-NAME>/        one folder per employer: letter (docx + pdf), e-mail .txt, pdf as sent
applications.md         the tracking file, one row per application
```

Statuses, in this order only: `to prepare → ready → sent → followed up → interview /
rejected / no answer`.

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| Who was contacted, when, with what | `applications.md` | a row without a date is not sent |
| What an employer received | `<EMPLOYER>/sent/` | never edited after the send date |
| The content rules | this file, rule number one and invariants | every letter is checked against them before "ready" |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the files
before believing it. One slice per session. Closing follows `/next`: log, next prompt,
`casp check` exit 0. The roadmap ends at a signed contract, with follow-ups, negotiation and
notice period on it from day one; the cockpit closes on signature.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Send an e-mail, submit a form, post on a job board? | **Never.** Prepare the file, the owner sends. Level 1 if a prompt seems to ask for it. | rule number one |
| Commit at the end of a session? | Yes, in this repository; it is private. | this file |
| Edit a master in `_common/`? | Yes, when a session improves it; copies already sent stay frozen. | invariants |
| Create a new employer folder? | Yes, when an offer passes the trade filter; status `to prepare`. | layout |
| Follow-up timing? | Ten working days after "sent on", one follow-up only. | phase 4 |
| An offer below the current situation? | Prepare it last, with an expectation at least equal to current pay, and record the reservation. | roadmap |
| Naming, ordering, wording of a draft? | Level 2: decide, record, continue. | root rules |

## What signals the owner on this project

- Any send, submission or publication: the owner does it, always.
- A salary expectation, a start date, a notice-period commitment.
- An employer the assistant cannot identify behind a recruiter's address.
- An offer that fails the trade filter but looks attractive: the owner decides, the log
  records the decision and the reservation.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
