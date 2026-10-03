# Chapter 5 — Proven, not done

## Lesson

An assistant that has worked for two hours grades itself generously. "Done", "sent",
"tested", "fixed" are claims. The method treats every claim as unproven until there is an
observation: on a real target, dated, with the command that was run and what it printed.

What counts as proof:

- The file exists: the listing that shows it, with its size and date.
- The e-mail is in the drafts folder: the folder listing, not the sentence "I saved it".
- The page is online: the address and what the server answered.
- The CV reads correctly: the text extracted from the final PDF, not the code that made it.

What does not count: a test written by the same hand that wrote the code; another AI
saying "looks good"; a summary of an output instead of the output itself.

When proof is out of reach in the session, the item stays open and carries one line:
`Proof due: <what must be observed> — on <which target> — blocked by <what is missing>`.
That line turns a vague list into a list someone can execute the day the blocker lifts.

Two questions to ask at every report, every time, no exception:
"Show me the raw output." and "What did you verify, and what did you infer?"
The second one separates what was seen from what was assumed. Most errors live in the
second half of the answer.

A real incident from the author's job search: a Word export took the keyboard focus and
captured keystrokes into the document. The exit code said success. The text extracted
from the PDF said otherwise. The proof is what you read, not what the program reported.

## Exercise

Here is an end-of-session report. Find the claim that has no proof behind it and say
what proof you would demand:

> Three cover letters drafted and saved under their employer folders (listing attached:
> 3 files, 2026-03-04). PDF export run for each; all three exports returned exit code 0.
> The tracking sheet was updated with today's date on the three rows (diff attached).
> Letters are ready to send.

## What a good answer contains

- The unproven claim is the PDF export: an exit code is not a reading of the content.
- The proof to demand: the text extracted from each PDF (for instance with `pdftotext`)
  or the PDF opened and read, showing no bracket placeholders and no stray characters.
- A bonus if the user also flags "ready to send" as a judgment, not an observation.
