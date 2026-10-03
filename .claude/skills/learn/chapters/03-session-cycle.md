# Chapter 3 — The session cycle and the cockpit

## Lesson

A session is one sitting with Claude on one project. It has four beats, always the same.

1. **Start.** Claude reads the project's `CLAUDE.md`, then the cockpit, then the queued
   prompt: the written description of what this session must deliver. It was written by
   the previous session. Claude re-checks its claims against the files before trusting it.
2. **Work.** One slice. Not two. Anything else noticed along the way is written down in the
   roadmap and left there.
3. **Close.** Claude writes a session log (what shipped, what was refused, what was
   deferred), writes the prompt for the next session, and updates the cockpit.
4. **Gate.** A tool called `casp` checks that the cockpit says the truth about git: the
   phase it calls shipped has a log, the log has a commit, the next prompt exists. If not,
   nothing is pushed until it is fixed.

The cockpit is the folder `casp/` inside every project. Three files:

- `state.json`: what phase we are in, what comes next, which prompt opens the next session.
  This is the file the gate validates.
- `now.md`: one screen for a human. "Where am I, what next if I have fifteen minutes, an
  hour, half a day, and what I must not get distracted by."
- `roadmap.md`: the next three things to ship, in order, what is blocked and why.

Why a tool and not just discipline: an assistant that has worked for three hours will
tell you the phase shipped. Sometimes it did not. The cockpit is a claim; `casp check`
compares the claim with git and says PASS or FAIL per rule. It runs on your machine and
sends nothing anywhere.

The words you will see: a **phase** is a named slice of the project; a **prompt** is the
written brief for one session; a **log** is the written record of one session;
**ship** marks a phase delivered; **close** writes the end-of-session state.

## Exercise

This kit is itself run with its own method. Ask me to run `casp status` at the root of the
kit and show you the raw output. Then answer: which phase is current, and what file would
open the next session?

## What a good answer contains

- The current phase name as printed (not reworded).
- The path printed on the `next_prompt` line.
- A bonus if the user notices the output comes from a command, not from Claude's memory.
