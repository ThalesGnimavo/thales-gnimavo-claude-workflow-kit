# A day

A day with the kit has three moments: ten minutes in the morning, nothing during the day
unless Claude stops, fifteen minutes in the evening. The method works because the state
lives in files and not in anyone's memory, Claude's included.

## Morning, ten minutes

Open a terminal in the kit's folder (the one that holds this `docs/`), type `claude`,
then `/day`. One table appears, one row per project under `my-projects/`, with its phase,
what comes next, the last save point, and a state. Under the table, the projects that are
not ready, each with the command that unblocks it.

`/day` then asks one question with two parts: which project, and one session or several.
One session is the normal answer. "Several" means parallel sessions on one project; it
costs several times as much and needs macOS with iTerm2; leave it for later.

`/day` opens `/next <project>` for you. The session reads the project's constitution, its
cockpit and the queued prompt, checks that the prompt is still the right one, says in one
sentence what it starts, and starts. It does not wait for a "go"; interrupt it and correct
the prompt if it is wrong. Then leave.

Always start `claude` from the kit's folder, never from inside a project. The kit's
commands and permissions load from here, and every command takes the project name as its
argument.

## During the day

Do not watch. You send three kinds of messages only:

- **A decision**, when Claude stopped on a level-1 question (sending, publishing, paying,
  deleting, a choice that binds more than one phase). It wrote the question in one
  paragraph and is waiting.
- **An unblock**, when it lacks something only you have: a file, a name, a date, a
  password you type yourself.
- **A correction**, when you read something wrong.

Everything else waits for the evening. A question that can be undone in less than a
session is answered by Claude alone and written down; you read it tonight.

## Evening, fifteen minutes

Read the session log, not the conversation. It is under `my-projects/<project>/session-logs/`,
the newest file. In this order:

1. **What shipped.** For each item marked done, the log must show the command and what it
   printed. "Done" with no output is a claim; ask for the output.
2. **Decisions taken without the user.** Each has a one-line way back. Veto what you
   dislike; a veto costs one correction.
3. **The next prompt.** Open the file named on the `next_prompt` line of `casp status`.
   It must name one slice that a fresh session could start alone. If it names three, cut.
4. **`casp check`.** One line per rule, PASS or FAIL. A FAIL names the rule and the fix.
   Nothing is pushed while a FAIL stands.

Then close the terminal. The next session starts from the files.

## What never gets delegated

What the project is for. What comes first. Anything that spends money. Anything that goes
out to another person. Anything judged on a real device, in a real room, by a real
reader. The constitution's `## Pre-approved decisions` table says what Claude may decide
alone; everything with an external consequence is yours.

## What to type

```
cd <the kit's folder>
claude
/day --dry-run
/day
```

`--dry-run` prints the table and stops, with no question; use it the first time, to read
the screen without opening anything.

## What you should see

The table for the two projects of `examples/`, as `/day` lays it out, with the values
their cockpits held on 2026-10-03:

```
2026-10-03

Project          Phase   Next                   Last commit   State
job-search       1/5     phase-2-first-wave     2026-10-03    blocked: First application (Meridian Travel Assistance)
software         2/4     phase-3-hardening      2026-10-03    ready, to confirm

Blocked
- job-search: the owner sends from their mailbox and gives the date; `/next job-search` writes it
- software: `/cto software`, or `/next software --solo "<reason>"` for a slice you know is small
```

"1/5" is one phase shipped out of five. The `software` row is the folder name: that
project was played under the name `ledger-cli`, and its own `README.md` says
`/next ledger-cli`; under `my-projects/` the folder name and the project name are the same. "blocked" comes from a real row under
`## Blocked` in the project's `casp/roadmap.md`: the first application is at `ready` and
only the owner can send it. "ready, to confirm" means the queued step has not been
confirmed as one session or several; `/next software --solo "<reason>"` confirms it in
one gesture.

Then the one question, in two parts: which project, one session or several. Answer it,
and `/next` takes over.
