# {{project_name}}

Content of {{owner_name}}. Channels: {{channels}}. Audience: {{audience}}. Cadence:
{{cadence}}.

{{description}}

The owner's first goal, in their words: "{{first_goal}}".

## Rule number one: the assistant drafts, the owner publishes

No piece is posted, scheduled, sent or uploaded from a session. A piece is `ready` when
its file is complete and checked; the owner publishes it and writes the date in the
calendar. A scheduling tool, if the owner uses one, is fed by the owner.

## Invariants

- **A brief before a draft.** Every piece starts as a brief: audience, the one thing the
  reader takes away, the call to action, the sources. A draft without a brief is deleted.
- **A fact carries a source** in the brief, as a file or a link the owner has opened. No
  figure, quotation or claim from memory.
- **One calendar, `calendar.md`.** A piece exists there or it does not exist; the status
  chain is `idea → brief → draft → ready → published`, and `published` requires a date.
- **The voice is written in `voice.md`** and checked at the end of every draft: the words
  refused, the sentence length, the tone, the things never said.
- **Nothing promotional without a fact behind it.** A superlative is replaced by the
  number or the example that justified it, or cut.

## Layout

```
voice.md                how it is written, what is never said, words refused
pillars.md              the three to five subjects the content returns to, and why
calendar.md             every piece: title, pillar, channel, status, planned date, published on
pieces/                 one folder per piece: brief.md, draft.md, final.md, sources/
measure.md              per published piece: what was measured, on which date
```

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| What is planned and what went out | `calendar.md` | `published` needs a date |
| What a piece promises | `pieces/<piece>/brief.md` | a draft is checked against its brief |
| How it is written | `voice.md` | checked at the end of every draft |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the files
before believing it. One piece, or one editorial pass, per session. Closing follows
`/next`: log, next prompt, `casp check` exit 0.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Publish, schedule, post, send? | **Never.** Prepare `final.md`; the owner publishes. Level 1. | rule number one |
| Add an idea to the calendar? | Yes, status `idea`, with its pillar. | layout |
| Write a brief? | Yes, for the next piece in the calendar. | invariants |
| Draft from a brief the owner has not read? | No. The brief is approved in the session, then drafted. | invariants |
| Change a pillar, the cadence, a channel? | Level 1. | this file |
| Title, structure, order of sections, cuts? | Level 2: decide, record, continue. | root rules |

## What signals the owner on this project

- Any publication: the owner does it, always.
- A piece whose brief needs a fact the sources do not hold.
- A planned date the calendar cannot meet at the committed cadence.
- Anything that names a person, a company or a competitor.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
