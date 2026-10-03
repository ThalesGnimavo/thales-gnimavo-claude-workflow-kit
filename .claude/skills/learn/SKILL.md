---
name: learn
description: Guided tour of the method, seven chapters of five to eight minutes each, one exercise per chapter, progress saved in .kit/profile.json. Use when the user wants to be taught the kit, asks "how does this work", or after /setup on a first run.
argument-hint: "[chapter-number | next | status | reset]"
allowed-tools: Bash(casp status:*), Bash(ls:*), Read, Edit, AskUserQuestion
---

# /learn — teach the method, one chapter at a time

The scripts live in `chapters/`, one file per chapter, written in English. Deliver them in
the language recorded in `.kit/profile.json`; translate faithfully, do not summarise. The
person may be a nurse, a lawyer, a student or a developer: never assume they know what a
terminal, a commit or a prompt is, and never explain what they just showed they know.

## Chapters

| # | File | Title | Exercise |
|---|---|---|---|
| 1 | `chapters/01-claude-code.md` | Claude Code in ten commands | run three native commands |
| 2 | `chapters/02-constitution.md` | The constitution: `CLAUDE.md` | critique one rule of this kit's own file |
| 3 | `chapters/03-session-cycle.md` | The session cycle and the cockpit | read this kit's own cockpit with `casp status` |
| 4 | `chapters/04-decisions.md` | Deciding without you: three levels | classify five situations |
| 5 | `chapters/05-proof.md` | Proven, not done | find the unproven claim in a report |
| 6 | `chapters/06-kit-commands.md` | The kit's commands | compare the tables with `.claude/skills/` |
| 7 | `chapters/07-a-day.md` | A day with the kit | plan tomorrow in three lines |

## Running a chapter

1. Read `.kit/profile.json`. If missing, say so and run `/setup` first.
2. Pick the chapter: the argument if given, else the first one not in `learn.completed`.
   `status` prints the table above with a check mark per completed chapter and stops.
   `reset` empties `learn.completed` after confirmation.
3. Read the chapter file. Deliver its **Lesson** section as written, one screen at most,
   in the user's language. Do not add material; do not drop examples.
4. Run its **Exercise** section. Wait for the user. Judge the answer against the
   **What a good answer contains** section. Say what was right, what was missing, nothing
   else. If the exercise needs a command, run it yourself on request and show the output.
5. On completion, append the chapter number to `learn.completed` in `.kit/profile.json`
   (surgical edit, keep the rest of the file intact), then ask: continue to the next
   chapter, or stop here. After chapter 7, propose `/new-project`.

## Tone

Peer to peer. No praise, no exclamation marks, no "great job". A correct answer gets
"Correct." and the next step. A wrong answer gets the right one and the reason, in two
sentences. The user can type `skip` at any time to mark a chapter done without the exercise;
record it as completed and move on without comment.
