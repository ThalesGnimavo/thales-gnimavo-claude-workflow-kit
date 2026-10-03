---
name: day
description: Open the day. Lists every project under my-projects/ with its cockpit state on one screen, shows the blocked ones with the action that unblocks them, asks the single decision of the morning (which project, one session or several), and opens /next on it. --dry-run prints the screen and stops. Runs from the kit root; never asks the user to change folder.
argument-hint: "[--dry-run]"
allowed-tools: Bash(ls my-projects:*), Bash(ls -d my-projects/*), Bash(wc:*), Bash(cd my-projects/*), Bash(casp:*), Bash(jq:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* status:*), Bash(sed -n:*), Bash(grep:*), Bash(head:*), Bash(date:*), Bash(test:*), Read, AskUserQuestion, Skill
---

# /day — one screen, one decision

The user has ten minutes. You show the state of every project, name what is blocked and
how to unblock it, ask one question, and start the session. Nothing else. Speak in the
user's language, in plain words, no git vocabulary beyond "commit".

## 1. The projects

```bash
date +%F
ls -d my-projects/*/ 2>/dev/null
```

No folder: say that no project exists yet and that `/new-project <name>` creates one;
stop. Only `README.md`: same.

## 2. One line per project

For each `my-projects/<n>/`, from the kit root, bounded to a few lines each:

```bash
test -f my-projects/<n>/casp/state.json && jq -r '[.current_phase, .next_phase, (.next_prompt // "none"), (.arbitration.phase // "none"), (.phases_shipped | length), ((.phases_shipped + .phases_queued + .phases_backlog) | length)] | @tsv' my-projects/<n>/casp/state.json
(cd my-projects/<n> && casp check --quiet > /dev/null 2>&1; echo "check=$?")
git -C my-projects/<n> log -1 --format='%cs %s' 2>/dev/null
git -C my-projects/<n> status --short 2>/dev/null | wc -l
test -f my-projects/<n>/<next_prompt> && sed -n '1,8p' my-projects/<n>/<next_prompt> | grep -E '^(status|kind):'
sed -n '/^## Blocked/,/^## /p' my-projects/<n>/casp/roadmap.md 2>/dev/null | grep -E '^\| [^-#]' | grep -v '_(none)_' | sed -n '2,2p'
```

Decide each project's state, first match wins:

| Condition | State shown | Unblock action |
|---|---|---|
| no `casp/state.json` | not set up | `/new-project` for a new one; for an existing folder, `casp init` inside it, then `/cto <n>` |
| `check` not 0 | needs a fix | `/casp <n> check` shows the failing rule; fix it before anything else |
| `next_prompt` is `none` or the file is missing | nothing planned | `/cto <n>`: it drafts the next prompt or the decisions that are due |
| prompt `status` is not `queued` | plan to review (prompt marked `<status>`) | `/cto <n>` |
| prompt `kind: discussion` | needs you | `/next <n>` opens a conversation, not a build; answer its questions |
| `## Blocked` has a real row (the scaffold's `_(none)_` row is not one) | blocked: `<first row>` | the row's own action; the user decides |
| `arbitration.phase` differs from `next_phase` | ready, to confirm | `/cto <n>`, or `/next <n> --solo "<reason>"` for a slice the user knows is small |
| otherwise | ready | `/next <n>` |

Print one table, one row per project, and nothing above it but the date:

```
Project          Phase              Next                         Last commit   State
<n>              <shipped>/<total>  <next_phase>                 <date>        ready
```

Then, only if some rows are not `ready`, a short list "Blocked" with the action per
project, one line each, the command in backticks. A dirty working tree is a trailing note
on the row ("N files not committed"), not a blocker.

## 3. `--dry-run`

Print the table and the blocked list, then stop. No question, no session.

## 4. The one decision

One `AskUserQuestion`, two parts: which project, among the ones that are `ready`,
`ready, to confirm` or `needs you` (the last one labelled "a conversation, not a build";
the other states are listed with their action, not offered); and whether to run one
session or several today.

- **One session** is the normal answer and the one to recommend. Say so in one line.
- **Several** means parallel sessions on one project: macOS with iTerm2 only, N times the
  cost, and advanced. If the user chooses it, say those three facts and run `/cto <n>`: it
  is the command that decides whether the queue can be split, records the decision, and
  hands over to `/fleet`, which asks for the user's explicit go before opening anything.
- A user with a `non-developer` profile is offered one session only; mention that several
  exists, in half a line, and leave it there.

## 5. Open the session

For a `ready` or `needs you` project: call the `/next <n>` skill. For `ready, to confirm`:
call `/cto <n>` and say in one line why (`/next` refuses to start a step nobody has
confirmed as one session or several; `/cto` confirms and chains into `/next` when the
answer is one). Then stop talking: the
session's own output takes over.

## Never

- Never read a project's files beyond `casp/` and the first lines of its queued prompt.
  `/day` decides where to work, not what to do.
- Never run `casp status` for every project in full: one line each, the table is the screen.
- Never ask the user to `cd`. Every command runs from the kit root.
- Never pick the project for the user. One ready project is still a question with one option.
