# The state

Every project has a `casp/` folder, the cockpit. It answers "where are we?" without
reading the conversation, and a tool, `casp`, checks that the answer is true against git.
The cockpit is written by sessions and read by you, by `/day`, by `/next`. It runs on your
machine and sends nothing anywhere.

## The three files

| File | For whom | What it holds |
|---|---|---|
| `casp/state.json` | the tool | the current phase, the next one, the file that opens the next session, the last log, the last commit, the lists of phases shipped, queued and backlog |
| `casp/now.md` | you | one screen: the current focus, what to do with fifteen minutes, an hour, half a day, and what not to get distracted by |
| `casp/roadmap.md` | both | the next three things to ship in order, what is blocked and why, the phase scoreboard |

`casp/templates/` holds the blank shapes `casp new log` and `casp new prompt` copy from;
`casp/README.md` is the tool's own protocol. Neither is edited by hand.

Two folders go with the cockpit: `docs/plan/sessions/`, one file per session prompt, and
`session-logs/`, one file per session log. A prompt has a `status:` line in its header
(`queued`, then `shipped`) and a `next_after:` line naming the log that drafted it. A log
has a `phase:` line naming the phase it shipped, or none when it shipped no phase.

## The words

- A **phase** is a named slice of the project: `phase-1-application-kit`.
- A **prompt** is the brief for one session, written by the previous one.
- A **log** is the record of one session, written at its close.
- **Ship** marks a phase delivered: `casp ship <phase> --log <log id>`.
- **Close** writes the end-of-session state: `casp close`.
- **Check** compares the state with git: `casp check`.

## `casp status`

Run it from the project's folder. It prints the state, the next prompt's first lines, the
recent commits and the current focus, in that order. The two lines that matter at the
start of a session are `next_phase` and `next_prompt`; the two that matter at the end are
`last_session_id` and `last_commit`.

## `casp check`

One line per rule, PASS, WARN or FAIL. A WARN does not block. A FAIL blocks the push
until it is fixed, and its second line says how. The rules fall in four groups:

1. The state has its fields (`updated_at`, `last_session_id`, `last_commit`, the phases,
   `next_phase`, `next_prompt`).
2. The next prompt exists and is `queued`; the cockpit, once it has shipped something,
   still names something to start.
3. Every log and every shipped phase have each other: `last_session_id` has a file, every
   shipped phase has a log that declares it, every shipped prompt points at its log, the
   `next_after` chain is coherent.
4. Git agrees: `last_commit` exists in the history, the state files are committed.

## The common FAILs and their fix

Each line below was provoked on a copy of `examples/job-search/` on 2026-10-03 and is
quoted as printed; the last one was read on the kit's own cockpit the same day.

**The next prompt was already shipped.** The session shipped its phase but left
`next_prompt` pointing at the prompt it had just delivered.

```
FAIL  CASP-PROMPT-003 next_prompt is already SHIPPED · docs/plan/sessions/PHASE-1-APPLICATION-KIT.md has status: shipped — casp was not bumped after that session
      → either update state.json.next_prompt to the real next slice, or re-execute the shipped prompt explicitly
```

Fix: draft the next prompt if it does not exist, then move `next_phase` and
`next_prompt` to it. `casp close` exits 1 as long as this FAIL stands; that exit code is
a real signal, not noise.

**The log named by the state does not exist.** `last_session_id` names a file that was
never written, or was written under another name.

```
FAIL  CASP-SESSION-001 last_session_id does not map to a session log · expected session-logs/26-10-03-002-first-wave.md
      → write the session log (try `npx @justethales/casp new log --slug <slug>`) OR fix last_session_id
```

Fix: write the log, or correct the id. `casp new log --slug <slug>` creates the file
with the right name.

**The last commit is not in git.** A SHA was typed by hand, or the history was rewritten.

```
FAIL  CASP-GIT-001 last_commit not found in git · state=abc1234 does not exist in this repo
      → set state.last_commit to a real SHA (HEAD = c3354bd)
```

Fix: `casp close` sets it from git; never type it.

**The state is edited but not committed.** A WARN, not a FAIL, but the push would leave
the remote behind the cockpit.

```
WARN  CASP-WORKTREE-001 casp / sessions / logs have uncommitted changes · M casp/now.md
```

Fix: the state commit, second commit of the session.

**The last commit is behind HEAD.** Also a WARN. It appears when work was committed after
the state commit, which is the normal shape at the start of the next session.

```
WARN  CASP-GIT-001 last_commit is in history but not at HEAD · state=7cda8c9 HEAD=9318249
      → if the new commits are out-of-band work, bump state.last_commit to 9318249
```

Nothing to fix before a session; `casp close` at its end moves the pointer.

## When the phase is not finished

A session that ran out of time, or stopped on a question only you can answer, does not
ship. Its log says so in its first lines; `next_prompt` stays where it was, still
`queued`; `casp/now.md` is refreshed; `casp close` records the log and the commit;
`casp check` stays green. The second session of `examples/job-search/` is that case: the
first application is at `ready`, the owner has not sent it, the phase waits.

## What to type

From the project's folder, or through `/casp <project>` from the kit's folder:

```
casp status
casp check
```

## What you should see

`casp check` on `examples/job-search/` on 2026-10-03, every line:

```
casp:check · 18 PASS · 0 WARN · 0 FAIL
──────────────────────────────────────────────────────────────────────
  PASS  state.json has 'updated_at'
  PASS  state.json has 'last_session_id'
  PASS  state.json has 'last_commit'
  PASS  state.json has 'current_phase'
  PASS  state.json has 'phases_shipped'
  PASS  state.json has 'next_phase'
  PASS  state.json has 'next_prompt'
  PASS  the cockpit has shipped and still names something to start
  PASS  next_prompt file exists · docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  PASS  next_prompt status is 'queued' · docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  PASS  last_session_id has a matching session log · session-logs/26-10-03-002-first-wave.md
  PASS  every shipped phase has a declaring session log · all 1 shipped phase(s)
  PASS  last_commit is the parent of HEAD (state-bump commit) · state=489bea9 HEAD=c3354bd touches only the state surface
  PASS  phases_shipped is unique (1 entries)
  PASS  all 2 prompt(s) have canonical status
  PASS  every shipped prompt has a session_log pointer
  PASS  the queued next_after chain is coherent · 1 chained prompt(s)
  PASS  casp + sessions + logs are committed

✓ state in sync with git. Clear for push.
```

The thirteenth line is the signature of a clean close: the last commit is the work, HEAD
is the state commit right after it, and that commit touched only the state.
