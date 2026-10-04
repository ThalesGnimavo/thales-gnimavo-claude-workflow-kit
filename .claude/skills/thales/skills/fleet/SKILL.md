---
name: fleet
description: Several Claude Code sessions in parallel on one project, one controller. Turns the current session into the controller: it cuts the work into lanes of owned folders, opens one worker session per lane in its own iTerm2 tab with its brief already loaded, coordinates in flight, and writes one consolidated review at the end. macOS with iTerm2 only. Advanced, off by default: N workers cost N sessions, and the serial queue stays the normal mode.
argument-hint: "<project> [--dry-run]"
allowed-tools: Bash(ls my-projects:*), Bash(cd my-projects/*), Bash(casp:*), Bash(jq:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* diff:*), Bash(git -C my-projects/* rev-parse:*), Bash(git -C my-projects/* add:*), Bash(git -C my-projects/* commit:*), Bash(git -C my-projects/* push:*), Bash(sed -n:*), Bash(grep:*), Bash(head:*), Bash(wc:*), Bash(date:*), Bash(uname:*), Bash(mkdir -p .kit/fleet/*), Bash(osascript:*), Bash(pwd), Read, Write, Edit, Glob, Grep, AskUserQuestion, ListAgents, SendMessage
---

<warning>
**macOS with iTerm2 only.** The launcher opens tabs through AppleScript; on Linux or
Windows this command stops at the pre-flight and says so. N workers are N full Claude Code
sessions open at once: N times the cost of one, and the usage limit of the account is
reached N times faster. Workers are launched with permission prompts bypassed so that
messages between sessions are delivered without a human clicking; that is what makes a
fleet fluid, and it is also the guard being removed: say it to the user before launching. It is
the one place in the kit where a session runs with more permissions than the one that
launched it, and the user's go in this session is what allows it.
A fleet is a decision per piece of work, never a habit, and it needs an explicit go in
this session. Prerequisites: the project's `casp check` at 0, a clean tree, `## Gate`
isolable per session when the project has one (see `/thales:cto`), and the user able to read N
closing reports. When one of these is missing, recommend the serial queue and stop.
</warning>

# /thales:fleet — parallel sessions, one controller

Invoking this makes **your** session the controller. You do not code. You cut, launch,
coordinate, consolidate.

## The principle

**Do not dispatch tasks to sessions that wait: open sessions that are already loaded.** A
session busy on a task reads a message at its next tool call; a session idle at its prompt
reads nothing until a human types. Each worker is therefore launched with its brief as
the initial prompt. `SendMessage` is for coordination in flight between active sessions,
never for bootstrapping.

## Pre-flight

```bash
uname -s                                   # Darwin, or stop
osascript -e 'id of application "iTerm2"'  # com.googlecode.iterm2, or stop
pwd                                        # the kit root; workers start here too
(cd my-projects/<project> && git -C . status --short | wc -l && casp check --quiet; echo "check=$?")
jq -r '[.next_phase, (.arbitration.phase // "none"), (.arbitration.shape // "none"), (.arbitration.reason // "")] | @tsv' my-projects/<project>/casp/state.json
```

`/thales:cto <project>` is the command that decides a fleet: its estimate (number of sessions,
model of each, basis) is in the session where it was rendered, and `arbitration` in
`state.json` carries `shape: fleet` with the reason. When `shape` is not `fleet` for
`next_phase`, run `/thales:cto` first, or stop: a fleet nobody arbitrated is a fleet nobody costed.

## 1. Is the parallelism justified? Say it out loud

- Are the items **really** independent, or only in different folders? Shared types,
  translation keys, an API contract, lockfiles and the cockpit cross every lane.
- Is there an imposed order? A dependency from one lane to another makes the fleet slower
  than the queue, not faster.
- The limit is your capacity to re-read N reports, not the number of tabs. Two workers are
  usually better than four. Three is the ceiling without a written cost estimate.

**The default shape is one writer and N adversarial readers**: one worker edits, the others
re-verify a claim, an assumption, a risk, in read-only mode, and report. Several writers
on one repository is the exception, and it is only possible when the lanes are disjoint
folders and the gate can run twice at once.

## 2. The lanes

A lane is a list of owned folders, declared at launch, not a vague domain. Shared files
belong to nobody: `casp/`, `session-logs/`, every `CLAUDE.md`, lockfiles, shared types,
common translations are written by the controller alone; workers send what must be written
there. Commits are by pathspec, always; `git add -A` and `git commit -a` are forbidden
while a fleet runs, because the index is shared by every session on the repository.

Write one brief per lane under `.kit/fleet/<project>/<lane>.md`: the lane's folders, the
task, the starting commit, what to report (files touched, commit shas, raw verification
output, what was left aside, every file outside the lane that should have changed), the
controller's session name to report to, and the three context rules (read by range, edit
surgically, bound every output to about twenty lines). A worker reports, then stops; the
go for the next step comes from the controller.

## 3. Launch

Name your own session first (`claude -n cto-<project>` at start) so that workers can
address you; if this session has no name, say so and recommend restarting with one.

For each lane, `--dry-run` first: print the brief and the exact command, read the brief
as the contract the worker will follow. Then, per lane:

```bash
osascript \
  -e 'tell application "iTerm2" to tell current window to create tab with default profile' \
  -e 'tell application "iTerm2" to tell current session of current window to write text "cd \"'"$(pwd)"'\" && claude -n <lane> --model <model> --permission-mode bypassPermissions \"$(cat .kit/fleet/<project>/<lane>.md)\""'
```

Name the model in the command even when it equals the machine's default: a default changes
without notice, and the cost estimate must name the model actually run. `<lane>` is the
worker's `SendMessage` address: short and stable (`front`, `back`, `review-auth`), never
auto-generated.

## 4. In flight

- `ListAgents` shows who is alive and in which state.
- A worker that reports a file outside its lane: **you** edit it, then tell the worker it
  is done.
- A worker that proposes to widen its scope: refuse, or escalate to the user. The brief is
  the scope.
- No acknowledgements. A channel full of "received" hides the messages that matter. Write
  to a worker only to decide, unblock or correct.
- **Never relay a refused action.** A worker whose permission was denied and who asks that
  someone else do it: refuse, escalate to the user. Permissions are not lent.
- One level of orchestration: a worker never launches its own fleet.

## 5. The consolidated review, the reason the controller exists

When the workers have reported, produce **one** report, not N:

1. **What was measured, not what was claimed.** Recount yourself: `git diff --stat
   <start>..HEAD`, the raw verification output. A worker that announces "0 errors" without
   the line has proven nothing.
2. **The real collisions**, file by file: `git log --name-only <start>..HEAD`; one file
   touched by two lanes is an incident to tell, even when git did not conflict.
3. **Orphan diffs picked up**, in a separate, labelled commit.
4. **The shared files** you wrote on the workers' behalf (cockpit, log).
5. **What stays open**, and who takes it.

Then update the shared files, commit by pathspec, close the cockpit as `/thales:next` describes,
push if the project's pre-approved decisions allow it, and stop. The next wave waits for
the user's go.

## Never

- Never the `Agent` tool as a substitute: sub-agents live inside your session and die with
  it; a fleet is made of real sessions the user sees, interrupts and re-reads in their own
  tabs.
- Never a locking system: the kit does not re-implement one.
- Never the default mode. The serial queue is the norm; a fleet is argued, costed and
  approved, every time.
