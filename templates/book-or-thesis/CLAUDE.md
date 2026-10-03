# {{project_name}}

{{text_kind}}. Working title: "{{working_title}}". Author: {{owner_name}}. Deadline:
{{deadline}}. Target length: {{target_length}}.

{{description}}

The author's first goal, in their words: "{{first_goal}}".

## Rule number one: no claim without a source the author has read

Every factual statement, quotation and figure in the manuscript points at a document in
`sources/` that the author has read. The assistant never invents a reference, a page
number or a quotation; when a source is missing, the sentence carries `[source needed]`
and is listed in the session log. The text is submitted only when that marker appears
zero times.

## Invariants

- **The voice is the author's.** The assistant proposes structure, questions, cuts and
  clearer sentences; it does not write a paragraph the author has not dictated, outlined
  or approved in the same session. A passage the author did not read is a draft, not text.
- **One manuscript, in `manuscript/`, one file per chapter**, numbered. No second copy in
  a mail, a chat or a cloud document; exports go to `exports/` and are regenerated.
- **Length is measured, never estimated.** `wc -w manuscript/*.md` is the figure quoted.
- **A chapter has a one-paragraph promise before it has a first line.** The promise lives
  in `outline.md`; a chapter that drifts from its promise changes the outline first.
- **References have one format**, written in `writing-rules.md`, applied by the submission
  phase, never by hand in the middle of a draft.

## Layout

```
outline.md              the chapters, each with its promise and its target length
writing-rules.md        voice, tense, person, reference format, words to avoid
sources/                every document cited, as a file, with a one-line note each
manuscript/             01-<chapter>.md, 02-<chapter>.md …
exports/                generated docx or pdf, never edited by hand
```

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| What the text claims | `manuscript/` | every claim points at `sources/` |
| What the text is for | `outline.md` | a chapter that drifts updates the outline first |
| How it is written | `writing-rules.md` | checked at the end of every chapter session |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the files
before believing it. One chapter, or one revision pass over one chapter, per session.
Closing follows `/next`: log with the measured word count, next prompt, `casp check` exit 0.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Send the text to a supervisor, publisher, jury, or anyone? | **Never.** Prepare the export; the author sends. Level 1. | rule number one |
| Write a paragraph the author has not outlined? | No. Propose an outline of the paragraph, wait for the author's words. | invariants |
| Reorder chapters? | Propose in `outline.md` with the reason; the author decides. Level 1. | invariants |
| Cut a sentence, a repetition, a weak adverb? | Level 2: do it, list the cuts in the log. | root rules |
| Add a source? | Only a document present in `sources/` that the author confirms having read. | rule number one |
| Change the reference format mid-draft? | No. The format is applied once, in phase 4. | invariants |

## What signals the author on this project

- Any submission, upload or send: the author does it, always.
- A claim the assistant believes false, with the source that contradicts it.
- A chapter running more than twenty percent over or under its target length.
- A deadline that the measured pace cannot meet, with the figures.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
