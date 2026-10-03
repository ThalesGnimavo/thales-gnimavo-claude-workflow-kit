---
name: next
description: Start the queued session of a project. Reads casp/state.json for next_prompt, opens the prompt file and executes it as the session's instruction. Refuses to start when no arbitration (solo or fleet) covers the phase about to begin and points at /cto; --solo "<reason>" records a solo arbitration and proceeds. Brings the cockpit up to the installed casp when casp doctor reports drift.
argument-hint: "<project> [--solo \"<reason>\"]"
allowed-tools: Bash(ls my-projects), Bash(cd my-projects/*), Bash(git -C my-projects/* rev-parse:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* add:*), Bash(git -C my-projects/* commit:*), Bash(casp:*), Bash(jq:*), Bash(sed -n:*), Bash(grep:*), Bash(head:*), Read, Edit, Write, Glob, Grep, AskUserQuestion, Agent
---

# /next — start the queued session

You are an execution agent, not a reporter. The user typed `/next` because they want work to
begin. Discover the queued session, verify that an arbitration covers it (the gate below),
load its context, start. Do not stop to ask "shall I proceed": proceed. The one exception is
the gate, and it is absolute.

`/casp` reports. `/cto` arbitrates. `/next` executes.

## Resolve the project

`$ARGUMENTS` is `<project>`, then optionally `--solo "<reason>"`. Resolution rules are in
`.claude/skills/README.md`. Every command below runs inside `my-projects/<project>/`;
the user never changes folder. `/next kit` runs the kit's own queue.

## Pre-flight, once

```bash
git -C my-projects/<project> rev-parse --short HEAD
git -C my-projects/<project> rev-parse --abbrev-ref HEAD
git -C my-projects/<project> status --short | head -10
(cd my-projects/<project> && jq -r '[(.next_phase // "none"), (.arbitration.phase // "none"), (.arbitration.shape // "none"), (.next_prompt // "none")] | @tsv' casp/state.json)
(cd my-projects/<project> && casp doctor --json 2>/dev/null | jq -r '.checks[] | select(.id=="cockpit.version") | [.severity, .label] | @tsv')
```

First line of the reply: `<project> · <sha> on <branch>`; for a `non-developer` profile
(`Read` `.kit/profile.json`), `<project>` alone, and the wording table of
`.claude/skills/README.md` applies to every later line. If `jq` is missing, read
`casp/state.json` with `Read` and pick the four fields by eye.

**Cockpit drift.** When the last line says `warn` and the message is that the cockpit is
older than the installed tool: `(cd my-projects/<project> && casp upgrade && casp check)`.
One line in the reply: `cockpit <old> → <new>, casp check 0`. Do not ask: `upgrade` never
writes `now.md`, `roadmap.md` nor the values of `state.json`. Two cases where you do
**not** upgrade, and say why in one line: the tool is older than the cockpit
(`npm install -g @justethales/casp@latest` first, the user runs it); `casp check` fails
after the upgrade while it passed before (undo with `git -C my-projects/<project> checkout
-- casp/` **only if `git status` showed `casp/` clean before the upgrade**; otherwise show
`git diff casp/` and revert the upgrade's lines by hand, so an uncommitted arbitration is
never wiped; continue on the previous version).

## GATE — an arbitration must exist before executing

The root `CLAUDE.md` wants every substantial session arbitrated, solo or fleet, before the
first line is written. `/cto` renders that arbitration; `/next` executes it. Both open a
session, and the one that skips the gate is the faster one, so without this section a
hurried morning types `/next`, saves thirty seconds, and the arbitration never happens.

**The test.** The arbitration is valid only if `next_phase` is set (not `none`, not empty)
**and** `arbitration.phase` equals it. One rendered for the previous phase says nothing
about this one; two missing values are not a match. A valid arbitration whose `shape` is
`fleet` is not executed here: say so and point at `/fleet <project>`.

Three outcomes, only three:

1. **Equal.** Recall it in one line ("arbitration: solo, <date>, by <session>") and execute.
2. **Absent or stale.** Stop. Three lines: the phase about to start, that no arbitration
   covers it, and the two exits: `/cto <project>` (the normal path) or
   `/next <project> --solo "<reason>"` for a task the user knows is solo and small. Do not
   execute "meanwhile". Do not guess the arbitration: one the tool grants itself is none.
3. **`--solo "<reason>"` given.** The reason must be non-empty: it is what keeps the escape
   from becoming a reflex. Record, then execute:

   ```jsonc
   "arbitration": {
     "phase": "<next_phase>", "shape": "solo", "decided_at": "<YYYY-MM-DD>",
     "by": "next --solo", "reason": "<the reason, verbatim>"
   }
   ```

   Write it into `casp/state.json` with `Edit`. The field is tolerated by `casp check` and
   gates nothing: it is working state, not a claim verifiable against git.

A project with no `casp/` has nowhere to record: state the arbitration in one line in the
reply ("solo: no cockpit, nothing to parallelise") and continue.

## Decide what to execute

### A. `next_prompt` is set

```bash
(cd my-projects/<project> && sed -n '1,12p' "<next_prompt>")
```

Read the whole prompt (it is the session's instruction; this is the one whole-file read
that is deliberate). Validate before executing:

- frontmatter `status:` is `queued`. If `shipped`: the cockpit is stale; say so, do not
  execute, ask whether to re-execute or to point the queue at the real next slice.
- `next_after:` names the most recent shipped phase or session. If not: surface the drift.
- the `## CONTEXT` section mentions the latest commit. If not: flag it, proceed unless the
  user redirects.

Then one sentence ("Starting <phase>: <title>. Section 1 first.") and begin the work.

If the prompt's MUST list is clearly larger than one session: quote it, propose the cut
(what this session ships, what the next one does), then begin. Never descope silently.
If the prompt assumes a file, a value or an external state that does not exist: stop and
name the missing precondition. Never synthesise it.

A prompt whose frontmatter says `kind: discussion` is a conversation: take a position on
each listed decision, record each with the reason that decided it, write the prompts the
decisions produce, chain them with `next_after`. No code.

### B. `next_prompt` is `none`

```bash
(cd my-projects/<project> && sed -n '/## Now/,/^---$/p' casp/roadmap.md)
(cd my-projects/<project> && grep -l '^status: queued' docs/plan/sessions/*.md 2>/dev/null)
```

If the roadmap's first item names a queued prompt file, treat it as `next_prompt`, path A.
Otherwise show the roadmap's next three and ask which to start (`AskUserQuestion`). When
`phases_shipped` is not empty and the queue is empty, that is a drift, not a rest: say so;
a finished roadmap owes decisions (what next), and a decision is a session too.

### C. No `casp/`

Show `git log --oneline -10` and any queued prompt under `docs/plan/sessions/`, and ask
what to start. Suggest `/new-project` only if the folder is not a project at all.

## During execution

- Honor the prompt's `## MUST NOT` literally: that is the scope guard.
- Honor its `## Close` literally.
- Keep the project's `CLAUDE.md` in context: its `## Pre-approved decisions` section is
  level 0 (`<decision_levels>`), everything else classifies as level 1 or 2 before asking.
- Context discipline, every time: read by range, edit surgically, bound every command
  output to about twenty lines. Quote these three rules in the brief of any sub-agent.
- Never modify `casp/state.json` until the close, except the `arbitration` field above.

## Close, in this order

Work first, state second: two commits, so the state commit can be undone alone. To a
`non-developer`, say "two save points: the work, then the cockpit"; never print a sha.

```bash
# 0. The work is committed inside the project, tree clean apart from casp/ and logs.
# 1. Session log: its id is the file name without .md
(cd my-projects/<project> && casp new log --slug <slug>)        # then write session-logs/<id>.md
# 2. Next prompt, drafted, status: queued, next_after: <id of the log>
(cd my-projects/<project> && casp new prompt --slug <next-slug>)
# 3. Ship the phase, naming the log explicitly
(cd my-projects/<project> && casp ship <slug> --log <id>)
# 4. Move the three pointers by hand and queue the next slug (ship moved <slug> to shipped)
#    current_phase=<slug>, next_phase=<next-slug>, next_prompt=<path of the new prompt>,
#    phases_queued += [<next-slug>]   -- Edit on casp/state.json
#    Refresh casp/now.md: focus, next action, distractions.
# 5. Bump last_commit / last_session_id, then check: must exit 0
(cd my-projects/<project> && casp close --yes | grep -E 'FAIL|exit' ; casp check --quiet; echo "exit=$?")
# 6. The state commit: stage the new log and prompt (casp never runs git add), then commit by pathspec
git -C my-projects/<project> add casp/ docs/plan/sessions/ session-logs/
git -C my-projects/<project> commit casp/ docs/plan/sessions/ session-logs/ -m "chore(casp): close <slug>"
```

`casp close` exits 1 while `next_prompt` still points at the prompt just shipped: that is
a real signal (the queue did not move), never something to ignore. When the phase is
**not** finished (the prompt said two sessions), skip steps 2 to 4: write the log, leave
the prompt `queued`, update `now.md`, `casp close --yes`, commit the state.

The session log follows the newest one in the project's `session-logs/`, with these
sections at least: scope shipped, proofs (command and output, dated), decisions taken
without the user, deferred, next.

Then: `casp check` exit 0 before any push; push only if the project's `CLAUDE.md` says
pushing is pre-approved, otherwise show the command (to a `non-developer`: "send the save
points to the online copy", then the command). Propose `/notify` in one line; do not
run it.

## Never

- Never report "I have read the cockpit, what would you like me to do?". That is the
  friction this command removes.
- Never run `/casp` from inside `/next`.
- Never reach into another project's `casp/`.
- Never bypass the gate, never `--no-check`, never `--force`.
