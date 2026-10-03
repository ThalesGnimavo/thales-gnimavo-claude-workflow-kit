# Chapter 6 — The kit's commands

## Lesson

The kit adds commands on top of Claude Code's own. They are files in `.claude/skills/`,
loaded because you started `claude` in this folder. Each one is a written procedure that
Claude follows; you can read them.

Everyday commands, in the order you will meet them. Commands arrive release by release; `CHANGELOG.md` says which ones exist in your copy.

| Command | What it does |
|---|---|
| `/new-project` | Creates a project under `projects/` from a template for your kind of work, asks what it needs, writes the constitution and the cockpit, makes the first commit. |
| `/day` | Opens the day. One decision: one session or several, on which project. Shows each project's cockpit in one screen. |
| `/next` | Inside a project: opens the queued session. Reads the constitution, the cockpit, the prompt; re-checks the prompt's claims; then works. |
| `/casp` | "Where are we?" Reads the cockpit and answers. Proposes nothing, changes nothing. |
| `/notify` | At the end of a session, sends you a summary on the channel you chose in `.env`: system notification, e-mail or a webhook. Nothing is configured by default; nothing is sent until you set it. |
| `/humanizer` | Rewrites a text to remove the patterns that make machine writing recognisable. Use it on anything a person will read. |
| `/update` | Brings the kit to its latest release without touching your projects. |

For people who write software:

| Command | What it does |
|---|---|
| `/cto` | Opens a steering session: re-verifies the queue against the code, measures whether the project's checks can run in isolation, and decides solo or several sessions before writing a line. |
| `/verify` | Runs the project's declared checks (tests, build) in the background and reports; never edits. |

Advanced, off by default, read their files before use:

- `/chain` runs several sessions unattended, one after the other, stopping at the first
  level-1 question.
- `/fleet` runs several sessions in parallel on one project, each owning its folders.
  It needs macOS and iTerm2 today.
- `/audit-batch` runs a deep adversarial review of everything merged since the last one.

These three multiply spending. The kit does not run them for you.

## Exercise

Ask me to list the folder `.claude/skills/`. Compare with the two tables above: which
commands exist in your copy of the kit, and which ones does the kit announce for a later
release? Then answer: on a morning with two projects, one blocked and one with a queued
prompt, what single decision does `/day` ask you to make?

## What a good answer contains

- The names present in the listing, and the names from the tables that are absent, each
  on the right side.
- The decision: one session or several, and on which project. The blocked project is
  not opened; the one with a queued prompt is the one `/next` would open.
