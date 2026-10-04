---
name: chain
description: Run several sessions of one project in a row without the user present, one fresh headless Claude Code process per phase (claude -p "/thales:next <project> …"), with a deterministic check between phases and a safe stop. The current session becomes the runner: it launches, watches, verifies and stops; it never codes. Advanced, off by default; costs one full session per phase.
argument-hint: "<project> [N]"
allowed-tools: Bash(ls my-projects:*), Bash(cd my-projects/*), Bash(casp:*), Bash(jq:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* rev-parse:*), Bash(git -C my-projects/* commit casp/state.json:*), Bash(git -C my-projects/* push:*), Bash(git status:*), Bash(git log:*), Bash(git rev-parse:*), Bash(git commit casp/state.json:*), Bash(sed -n:*), Bash(grep:*), Bash(head:*), Bash(tail:*), Bash(wc:*), Bash(seq:*), Bash(date:*), Bash(mkdir -p .kit/chain), Bash(nohup:*), Bash(pgrep:*), Bash(kill:*), Bash(find:*), Bash(sleep:*), Bash(claude --version), Read, Write, Edit
---

<warning>
A chain runs N complete sessions of a project while nobody watches. Each child is a full
Claude Code session: expect the cost of N sessions, plus the runner's own. Each child may
commit and, if the project's pre-approved decisions allow it, push. Prerequisites: the
`claude` command in the terminal (`claude --version`), `casp` installed, the project's
`casp check` at exit 0, a clean working tree, and the runner started from the kit root with
the permission mode the children should inherit. On a project that deploys automatically
on push, N phases are N deployments nobody has read: decide before launching whether the
chain pushes or only commits (a line in the project's pre-approved decisions). A level-1
question stops the chain; it never answers one. Off by default: run it only when the
queue holds phases you have read and would have approved one by one.
</warning>

# /thales:chain — N sessions in a row, a fresh context each

One phase is one new `claude -p` process. Context never accumulates from one phase to the
next; the hand-over is `casp/state.json` and the cockpit, which is what the method
promises. This session is the **runner**: it launches, watches, verifies and stops. The
user is not at the screen: any ambiguity that would have been a question is a clean stop,
never a guess. The quality of one phase matters more than the number of phases.

## Input

- `<project>`: a folder under `my-projects/`, or `kit`. For `kit`, read `.` wherever a
  command below says `my-projects/<project>`.
- `N` (optional, default **3**): the maximum number of phases.

## Pre-flight, once

```bash
claude --version
(cd my-projects/<project> && git -C . status --short | wc -l && casp check --quiet; echo "check=$?")
jq -r '[.next_phase, (.next_prompt // "none"), (.arbitration.phase // "none")] | @tsv' my-projects/<project>/thales:casp/state.json
grep -c 'GATE' .claude/skills/thales/skills/next/SKILL.md
mkdir -p .kit/chain
```

Stop and say why when: the tree is dirty, `casp check` is not 0, `next_prompt` is none,
or the project's `CLAUDE.md` has no `## Pre-approved decisions` section (a child would
stop on its first question). The `GATE` count must be above 0: it proves the loaded `/thales:next`
carries the arbitration gate that step 1b relies on.

Permission mode of the children: the runner's own, never higher. `--permission-mode
acceptEdits` by default; `--dangerously-skip-permissions` only if this session was
started with it, and say so in the digest.

## Loop: one iteration = one phase = one fresh child

**1. Deterministic validation, by reading files, before spending a session.**
`next_prompt` exists, its frontmatter says `status: queued`, `next_after` matches
`last_session_id`, the last shipped phase, or `current_phase` (a project fresh from
`/thales:new-project` has `last_session_id: pending` and a first prompt whose `next_after` is
`phase-0-init`). Otherwise: stop (see conditions).

**1b. Arbitrate the phase: the runner, never the child.** `/thales:next` refuses to start a
phase without an `arbitration` block whose `phase` equals `next_phase`. The fix is not to
let the child arbitrate itself: that is exactly what the gate forbids. The runner reads
the queued prompt, measures whether the project's `## Gate` could run in two sessions at
once (fixed ports, a shared database, a shared build folder: solo), then writes:

```jsonc
"arbitration": { "phase": "<next_phase>", "shape": "solo", "decided_at": "<YYYY-MM-DD>",
                 "by": "chain-runner", "reason": "<what decided it, one line>" }
```

**In a headless chain the shape is always solo**: a fleet needs the user's explicit go,
which does not exist without them. A queued prompt that asks for a fleet is a level-1 stop.
Commit the block alone, by pathspec, so the child starts on a clean tree:

```bash
git -C my-projects/<project> commit casp/state.json -m "chore(casp): arbitration <phase> — solo"
```

Then launch the child on `/thales:next` bare: never `--solo`, which is the human escape hatch.

**2. Launch the child**, from the kit root, through a script, because a tool call of this
harness is capped at ten minutes even in the background, and a child lasts longer:

Trust first. The kit's commands are a project plugin: a headless `claude -p` loads them only
if the kit folder was trusted once in an interactive session (observed on 2026-10-04,
Claude Code 2.1.288: `/thales:casp kit` loads the kit's text in `-p` with the folder trusted,
and the plugin is skipped with a warning without it). A chain launched on a never-trusted
clone runs without `/thales:next`; stop and say so.

```bash
# .kit/chain/<project>-<NN>.sh
export CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0
claude -p "/thales:next <project> — Autonomous session inside a chain started by the user: no
question is possible, nobody answers. The user launched the chain: that is the go for
building, committing and, if the project's pre-approved decisions allow it, pushing; never
--force, never --no-verify, never a .env. Three decision levels. Level 0: a question whose
answer is in the project's '## Pre-approved decisions': apply the line, cite it. Level 2:
anything reversible in less than a session (naming, order, default value, severity of a
new rule, form of an output, choice between two equivalent implementations): decide,
record under 'Decisions taken without the user' in the session log, continue. Level 1:
spending or external commitment, irreversible on live data, a tool or structure that
binds more than one phase, price, positioning, legal, a scope the user approved, a
missing credential or external state: close what is safe, record the question under
'Deferred / risks', end. Context discipline: read by range (grep -n then sed -n), edit
surgically, bound every command output to about twenty lines; quote these three rules in
the brief of every sub-agent. Long commands: in the background to a file, waited for with
a bounded until loop under nine minutes per call, repeated, with an explicit flag before
the break, never the exit code of the last sleep; nobody wakes you up in print mode.
Proof = command and raw output on a real target, dated; otherwise 'Proof due: … — on … —
blocked by …'. Complete close, in the exact order of the 'Close, in this order' section of
/thales:next: work committed, session log, next prompt drafted if the phase is finished, casp
ship with --log, pointers moved, now.md refreshed, casp close --yes, casp check exit 0,
state commit by pathspec. End your output with 'Escalations' (empty if none) and
'Decisions taken without the user'." --permission-mode <mode>
echo "child exit=$?"
```

```bash
nohup bash .kit/chain/<project>-<NN>.sh > .kit/chain/<project>-<NN>.log 2>&1 < /dev/null &
```

The child writes its output only at the end: the log stays empty for the whole session,
so **silence in the log means nothing**. Watch with a bounded loop, repeated as many times
as needed, nine minutes per call at most, an explicit flag before the break:

```bash
FOUND=no; for i in $(seq 1 50); do grep -q 'child exit=' .kit/chain/<project>-<NN>.log && { FOUND=yes; break; }; sleep 10; done; echo "found=$FOUND"
git -C my-projects/<project> log --oneline -3
find my-projects/<project> -type f -mmin -20 -not -path '*/.git/*' -not -path '*/node_modules/*' | wc -l
```

A real stall is **no file activity for twenty minutes and no build process**, both at
once. A long build is silent and legitimate; one of the two signals alive means the child
is working.

**3. Deterministic close check, when the child has exited:**

- `casp check` exits 0 in the project;
- `last_session_id` advanced and the session log exists;
- `current_phase` equals the launched phase and `next_prompt` is no longer the launched
  prompt, when the phase was finished (`ship` and `close` move no pointer; a child that
  forgot step 4 of the close leaves the queue in place, and the next iteration would
  relaunch the same phase); when the prompt said two sessions and the child finished only
  one, the log exists, `last_session_id` advanced, `next_prompt` is unchanged and still
  `queued`: that is an advanced phase, not a closed one. The next iteration then relaunches
  the same prompt on purpose, and its `next_after` still matches the last shipped phase;
- `next_prompt` points at a `queued` prompt, or is empty (an empty queue is a clean stop);
- git: new commits, a state commit, a clean tree.

Incomplete close: **one corrective relaunch at most**, a `claude -p` that describes the
exact gap observed; then the circuit breaker: stop.

**4. Read the child's final output**: every escalation or question goes into the digest.
A blocking escalation stops the chain.

**5. Stop conditions.** None applies: next iteration.

## Stop conditions

- **Budget**: N phases closed.
- **Queue empty or blocked**: `next_prompt` none, file missing, status not `queued`,
  `next_after` inconsistent.
- **A discussion prompt at the head**: frontmatter `kind: discussion`. A conversation with
  the user does not run headless; stop, and name the prompt in the digest as the reason.
- **A level-1 escalation**, and only level 1. Level 2 is decided and recorded by the child;
  the runner collects it for the digest. Level 0 is not an escalation.
- **Circuit breaker**: launch and corrective relaunch both failed on the same phase. Never
  descope silently; record the failure in the chain log.
- **Irreversible action outside the contract**: anything beyond commit and push of this
  repository.
- **Silent or stalled child**: no file activity for twenty minutes and no build process;
  tail the log; still nothing: kill the process (`pgrep -f '<project>-<NN>.sh'`), count the
  phase as failed.

## The digest, at the end

One message: the phases closed with their commits, the reason for the stop, the
escalations and questions collected phase by phase (the children's final outputs and the
`Deferred` sections of their logs), the level-2 decisions taken without the user (for veto
on their next pass), and the current `next_prompt`. Then `/thales:notify` once for the chain, if
configured; each child proposes its own and does not run it.

## Never

- Never bypass a `casp check` FAIL or a red gate to continue.
- Never chain onto a prompt whose `next_after` matches neither `last_session_id`, nor the
  last shipped phase, nor `current_phase`.
- Never change permissions, settings or this skill while a chain runs; never raise the
  children's permission mode above the runner's.
- Never treat the user's silence as a go: silence is a stop condition.
- Never fall back to running the phases inside this session when `claude -p` fails to
  load the skill: stop and say so. Running them in-context accumulates the context the
  chain exists to avoid.
- Never propose this as routine. A chain is a decision per queue, taken by the user.
