# Chapter 2 — The constitution: `CLAUDE.md`

## Lesson

Every session Claude opens in this folder starts by loading one file: `CLAUDE.md`. It stays in front of Claude for the whole session.
That file is the project's constitution. It is the only thing that survives from one
session to the next without anyone retelling it.

A constitution holds five things, and nothing else:

1. **Identity.** What the project is, for whom, in three lines.
2. **Invariants.** The rules that never bend. "No message is sent without a date."
   "No price is quoted without the tax line."
3. **Decisions with their reasons.** Not "we use folder X" but "we use folder X because
   the alternative broke in March". A decision without its reason gets re-litigated
   every session.
4. **The session ritual.** How a session opens, what it ships, how it closes.
5. **Pre-approved answers.** The questions Claude may answer alone, with the answer.

What a constitution does not hold: explanations, history, tutorials. Those go in other
files, which Claude reads only when needed. Every line in `CLAUDE.md` is paid for on
every single action, so a long constitution makes every session slower and vaguer.

There are two layers. The file at the root of this kit applies to all your projects: it
says how Claude behaves, how it decides, how it proves. Each project under `my-projects/`
gets its own `CLAUDE.md` that says what that project is. The root rules win on conflicts.

You will not write a constitution from a blank page. `/new-project` starts from a
template for your kind of project and fills it with your answers. You then edit it the
way you would edit a contract: rarely, deliberately, with the reason next to the change.

## Exercise

Open the root file: ask me to show the section between `<roles>` and `</roles>` of
`CLAUDE.md`. Read it. Then tell me one rule in it you would change for your own use, and why.
There is no wrong pick; the exercise is to read a rule as a rule.

## What a good answer contains

- A specific sentence quoted or paraphrased from the section, not a general impression.
- A reason tied to how the user works, for instance "I want to be asked before any
  file is deleted, even inside the folder".
- If the user says they would change nothing, ask which rule they would enforce most
  strictly, and accept a specific answer.
