---
name: setup
description: First-run check of the machine. Verifies Claude Code, git and Node.js, installs the casp state tool, asks who the user is, and writes .kit/profile.json. Run automatically when the profile is missing; re-run any time with /setup.
argument-hint: "[--check]"
allowed-tools: Bash(uname:*), Bash(node --version), Bash(npm --version), Bash(git --version), Bash(claude --version), Bash(casp --version), Bash(jq --version), Bash(git config:*), Read, Write, AskUserQuestion
---

# /setup — prepare the machine and the profile

You are talking to someone who may never have used a terminal. Every step shows the
command you ran and its result, in one or two lines. Never run a command that installs
software without saying what it installs and why, in one sentence, first.

## 0. Arguments

- `--check`: run step 1 only, print the table, change nothing.

Any command not pre-approved above (an install, for instance) will ask the user for
permission: that is intended. Say what the command installs before running it.

## 1. Detect the environment

Run, one at a time, bounded to one line each:

```bash
uname -s 2>/dev/null || echo Windows   # Darwin = macOS; Linux; MINGW* or MSYS* or Windows = windows
claude --version 2>/dev/null || echo "claude: missing"
git --version 2>/dev/null || echo "git: missing"
node --version 2>/dev/null || echo "node: missing"
npm --version 2>/dev/null || echo "npm: missing"
casp --version 2>/dev/null || echo "casp: missing"
jq --version 2>/dev/null || echo "jq: missing"
```

Print a four-column table: tool, found version, required, status. Requirements:
Claude Code any version; git any version; Node.js 22 or newer; casp 0.18 or newer; jq
any version (the kit's commands read the cockpit with it).

## 2. Fix what is missing, in this order

- **jq missing.** macOS: `brew install jq` (or https://jqlang.org/download/ without
  Homebrew). Debian/Ubuntu: `sudo apt install jq`. Windows: `winget install jqlang.jq`.

- **git missing.** macOS: `xcode-select --install` (opens a dialog; tell the user to accept).
  Debian/Ubuntu: `sudo apt install git`. Windows: https://git-scm.com/downloads/win, then
  restart the terminal and `claude`. Do not continue without git.
- **Node.js missing or below 22.** Point to https://nodejs.org and say to pick "LTS", the
  long-term-support version. On macOS, if `brew --version` answers, `brew install node` works
  too. Do not install a version manager for a beginner. After install, the
  terminal and `claude` must be restarted; say so and stop here.
- **casp missing.** Say: "casp is the small tool that checks your project's state against
  git; it is open source, MIT, and sends nothing anywhere." Then:
  `mkdir -p .kit && npm install -g @justethales/casp > .kit/casp-install.log 2>&1; echo "exit=$?"`.
  If the exit code is not 0, print the last ten lines of the log. A line containing
  `EACCES` means the folder npm installs into is not writable by the user: offer
  `npx @justethales/casp` as the fallback (same tool, downloaded on each use) and record
  `"casp": "npx"` in the profile.
- **git identity missing** (`git config user.name` prints nothing): explain in one sentence
  that git stamps every saved change with a name and an e-mail, visible only to people who
  receive the files; ask for both; set them with `git config --global user.name` and
  `git config --global user.email`.

## 3. Ask who the user is

Two closed questions in one block, in the user's language:

1. Preferred language for the manual: French or English.
2. Profile: "I write software" or "I do not write software". This selects which templates
   `/new-project` offers first and whether `/verify` and `/audit-batch` are shown.

Then two open questions, asked in plain conversation, one at a time:

3. Their first name (used in greetings and session logs).
4. The first thing they want to run with this kit, in one sentence. It seeds
   `/new-project` later; it is not acted on now.

## 4. Write the profile

Write `.kit/profile.json` (create `.kit/` if needed):

```json
{
  "name": "<first name>",
  "language": "fr" | "en",
  "profile": "developer" | "non-developer",
  "first_goal": "<sentence>",
  "os": "darwin" | "linux" | "windows",
  "tools": { "claude": "<version>", "git": "<version>", "node": "<version>", "casp": "<version>" | "npx" },
  "kit_version": "<from CHANGELOG.md, first version heading or 'unreleased'>",
  "created_at": "<YYYY-MM-DD>",
  "learn": { "completed": [] }
}
```

This file is personal and ignored by git. Say so.

When you read the profile back to the user, repeat their own answer ("you do not write
software", « vous ne codez pas »), never a noun whose gender you would have to guess from
the first name: a first name says nothing about the person. Observed in session 006:
"non-développeuse" written from the name alone.

## 5. Close

Print the table from step 1 again with the final statuses, then exactly this choice:

- `/learn` to be taught the method, chapter by chapter, about forty minutes in total.
- `/new-project <name>` to start a project now and learn by doing.

Recommend `/learn` to a non-developer and to anyone who has never used Claude Code.
Recommend `/new-project` to a developer who already uses Claude Code daily.
Stop there. Do not start either on your own.
