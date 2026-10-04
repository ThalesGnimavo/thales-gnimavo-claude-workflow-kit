# Pitfalls

The mistakes of the first week, each with the command or the line that catches it. The
first three are the ones everyone makes; the others were met while the two examples in
`examples/` were being played, on 2026-10-03.

## 1. Asking for everything at once

"Write the whole business plan." The answer is long, vague and unverifiable, and the
session ends with nothing a second session can check. One slice per session, the one the
prompt names.

What catches it: the prompt's `## MUST` list. A session that cannot fit it in one sitting
says so before the first file and proposes the cut. If a prompt of yours has eight MUSTs,
cut it yourself before `/thales:next`.

## 2. Trusting "done"

"Done", "sent", "tested", "fixed" are claims. An exit code is a claim too: the CV export
of `examples/job-search/` returned exit code 0 and the PDF still carried the Markdown
heading marks; the test script of `examples/software/` was wrong on its first run and the
gate was red. Both were caught by reading the output, not the status.

What catches it: two questions at every report. "Show me the raw output." "What did you
verify, and what did you infer?" In the log, the `## Verify` block holds the commands and
what they printed; an item with no output under it is not done. When the proof is out of
reach, the log carries `Proof due: <what> — on <where> — blocked by <what is missing>`,
and the item stays open.

## 3. Letting the session run for hours

Claude's working memory fills. After a few hours it works from a summary of its own
earlier work, and the quality drops without warning. Close, then open a new session: the
state is in the files.

What catches it: `/context` shows how much is used. When Claude says the context is
getting long, finish the slice, close properly, and start again. `/compact` buys time; it
does not replace a close.

## 4. Starting `claude` inside a project

The kit's commands and permissions load from the kit's folder. Started inside
`my-projects/<name>/`, Claude has none of them: no `/thales:next`, no `/thales:day`, and the project's
constitution alone.

What catches it: type `/`. If `/thales:next` is not in the list, you are in the wrong folder.
Every command takes the project name as its argument from the kit's folder.

## 5. Believing the prompt

The prompt was written by the previous session, from what it believed at the time. "The
masters exist" may be true, or may be what that session meant to do. The root rules say
to replay a prompt's assertions against the files before believing them; `/thales:cto <project>`
is the command that does it thoroughly, and `/thales:next` stops when a file or state the prompt
assumes does not exist.

What catches it: the `## CONTEXT` section of the prompt names the last commit. If the
history has moved past it, the prompt may be stale; `/thales:next` says so before starting.

## 6. Moving the pointers in the wrong order

`casp ship` marks a phase shipped but moves no pointer. Run `casp close` right after,
with `next_prompt` still pointing at the prompt just shipped, and it exits 1 with
`CASP-PROMPT-003`. The next session would re-execute a finished phase.

What catches it: `casp close` itself. Exit 1 is the signal; draft the next prompt, move
`next_phase` and `next_prompt`, then close again. `a-session.md` has the full sequence.

## 7. One commit instead of two

The work and the state committed together make the cockpit's `last_commit` point at a
commit that also changed the code, and the thirteenth line of `casp check` ("last_commit
is the parent of HEAD, touches only the state surface") no longer holds. It is a WARN,
not a FAIL (provoked on a copy of `examples/job-search/` on 2026-10-03:
`WARN  CASP-GIT-001 last_commit is in history but not at HEAD`), but the history stops
telling which commit shipped what.

What catches it: the two-commit rhythm in the history listed at the end of each
example's `README.md`. Work first, state second.

## 8. Sending

Every profile has the same rule number one: Claude prepares, you send, sign, pay,
publish or push. A session that "could send it now" is at a level-1 question and must
stop. If it did not stop, the constitution is missing a line.

What catches it: the `## Pre-approved decisions` table of the constitution. The
`job-search` profile has the line "Send an e-mail, submit a form, post on a job board?
Never." Read yours once; add the line your project is missing.

## 9. Fixing the gate by making it quieter

A red `casp check`, a failing test, a build error: the fix is a file to write or a
pointer to move, never a bypass. `--no-verify`, a skipped test, a commented assertion,
a hand-typed SHA are the ways a project starts lying to itself.

What catches it: the root `CLAUDE.md`, `<never>` block, and the second line of every
FAIL, which names the real fix.

## What to type

At the end of any session that felt wrong, in this order:

```
/context
casp check
```

The first says whether the session ran too long (pitfall 3). The second says whether the
cockpit tells the truth (pitfalls 6, 7 and 9).

## What you should see

`/context` prints a grid or a percentage of the working memory used; above about three
quarters, close the session properly rather than compact it. `casp check` prints one line
per rule; the pitfall-6 case, provoked on a copy of `examples/job-search/` on 2026-10-03,
reads:

```
casp:check · 16 PASS · 1 WARN · 1 FAIL
  FAIL  CASP-PROMPT-003 next_prompt is already SHIPPED · docs/plan/sessions/PHASE-1-APPLICATION-KIT.md has status: shipped — casp was not bumped after that session
        → either update state.json.next_prompt to the real next slice, or re-execute the shipped prompt explicitly
```

The second line is the fix. A clean close reads `0 FAIL` and
`✓ state in sync with git. Clear for push.`
