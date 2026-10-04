# A session

A session is one sitting with Claude on one project. It ships one slice, the one the
queued prompt names, and closes with a written record and the next session's brief. It
has four beats; none is skipped, none is merged with another.

## 1. Start

`/thales:next <project>` from the kit's folder. The session reads, in this order:

1. The project's `CLAUDE.md`: the constitution.
2. `casp status`: the cockpit. Which phase is current, which comes next, which file opens
   this session.
3. The queued prompt, the file on the `next_prompt` line. It was written by the previous
   session. A prompt is a claim, not a specification: `/thales:next` checks that it is still
   `queued`, that its `next_after` names the last log, that its `## CONTEXT` names the
   last commit, and stops when a file or state it assumes does not exist. The thorough
   replay of its claims against the files is what `/thales:cto <project>` does before it
   confirms a step.

`/thales:next` refuses to start a step nobody has confirmed as one session or several. The
confirmation is written in `casp/state.json` by `/thales:cto <project>` (which re-reads the
queue first) or by `/thales:next <project> --solo "<reason>"`, the one-gesture form for a slice
you know is small. A project fresh from `/thales:new-project` has no confirmation yet; the
closing message of `/thales:new-project` gives you the exact command.

Then the session says in one sentence what it is about to do, and begins. It does not
ask whether to proceed: the prompt is the scope.

## 2. Work

One slice. Anything else noticed along the way goes to `casp/roadmap.md` and is left
there. A prompt whose MUST list cannot fit one sitting is said out loud before the first
file, with the proposed cut; it is not silently trimmed.

The prompt's `## MUST NOT` section is read literally. It is the guard against scope creep.

Questions come up. Each is classified before being asked:

- **Level 0**: the answer is in the constitution's `## Pre-approved decisions` table.
  Applied, the line quoted.
- **Level 1**: external consequence, irreversible, binds more than one phase, changes what
  you approved. The session stops and writes the question in one paragraph.
- **Level 2**: reversible in less than a session. Decided, written in the log under
  "Decisions taken without the user" with a way back, and the work continues.

## 3. Close

In this order, and the order matters:

1. **The work is committed** (a save point in git), first and alone.
2. **The session log** is written under `session-logs/`, named `YY-MM-DD-NNN-<slug>.md`.
   It says what shipped, what did not and why, the raw output of every check, the
   deferred items with their `Proof due` line, and the decisions taken without you.
3. **The next prompt** is drafted under `docs/plan/sessions/`, `status: queued`, its
   `next_after` naming this session's log.
4. If the phase is finished: `casp ship <phase> --log <log id>` marks it shipped; the
   three pointers (`current_phase`, `next_phase`, `next_prompt`) are moved to the next
   phase. If it is not finished: the log says so in its first lines, the prompt stays
   queued, `casp/now.md` is refreshed.
5. `casp close` records the last commit and the last log in the state.
6. **The state is committed**, second commit.

Two commits per session: the work, then the state. Look at the history listed at the end
of either example's `README.md` in `examples/`: the rhythm is visible in the commit list.

## 4. Gate

`casp check` compares the cockpit with git, one rule per line, PASS or FAIL. It exits 0
before any push. A FAIL is fixed, never bypassed: the fix is always a file to write or a
pointer to move, and the FAIL line says which. `the-state.md` lists the common ones.

## The next session must be startable by someone who has read nothing but the cockpit

That sentence is the test of a good close. If the next prompt needs the conversation that
wrote it to be understood, it is not finished.

## What to type

```
/thales:next job-search
```

At the end, the session runs the close itself. If you close by hand, the sequence is:

```
casp new log --slug <slug>           # then write session-logs/<id>.md
casp new prompt --slug <next-slug>   # then write docs/plan/sessions/<FILE>.md, status: queued
casp ship <phase> --log <id>         # only when the phase is finished
# then, by hand, in casp/state.json: current_phase = <phase>, next_phase = <next-slug>,
# next_prompt = docs/plan/sessions/<FILE>.md, and <next-slug> added to phases_queued
casp close --yes
casp check
```

`casp ship` moves the phase to the shipped list and nothing else; the three pointers are
yours to move. Skip that line and `casp close` exits 1 (see `the-state.md`).

## What you should see

`casp status` at the start of a session, on `examples/job-search/` on 2026-10-03:

```
casp-managed-project · branch main · HEAD c3354bd

STATE
────────────────────────────────────────
  current_phase    phase-1-application-kit
  next_phase       phase-2-first-wave
  next_prompt      docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  last_session_id  26-10-03-002-first-wave
  last_commit      489bea9

  progress  ████████████░░░░░░░░░░░░  1 shipped · 1 queued · 3 backlog

NEXT PROMPT
────────────────────────────────────────
  path     docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  status   queued
  log      pending
  # Session — phase-2-first-wave : The first employer folder, sent by the owner before the next
```

`casp ship` and `casp close` at the end of a session that finished its phase (the first
session of the same example):

```
$ casp ship phase-1-application-kit --log 26-10-03-001-application-kit
        moved 'phase-1-application-kit' → phases_shipped

$ casp close --yes
        last_commit     → ebf97fa
        last_session_id → 26-10-03-001-application-kit
        updated_at      → 2026-10-03
```

And the gate, green:

```
$ casp check
casp:check · 18 PASS · 0 WARN · 0 FAIL
✓ state in sync with git. Clear for push.
```

The session log that goes with these lines is
`examples/job-search/session-logs/26-10-03-001-application-kit.md`. Read it once: its
shape is the one every session of yours will have.
