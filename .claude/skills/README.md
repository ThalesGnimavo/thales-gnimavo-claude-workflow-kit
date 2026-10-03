# The kit's skills — conventions

One folder per command, `SKILL.md` inside. Claude Code loads them when `claude` starts from
the kit root. Every skill follows the rules below; a skill that breaks one is a bug.

## Frontmatter, four fields, in this order

```yaml
---
name: <folder name>
description: <one line: what it does, when to use it>
argument-hint: "<project> [--flag]"      # quoted; "[...]" marks an optional part
allowed-tools: Bash(casp:*), Read, Edit   # comma-separated, one line
---
```

No `version` field: the kit is versioned as a whole in `CHANGELOG.md`.

## Paths

- Never an absolute path. The kit runs on a machine that is not the author's.
- A project is always `my-projects/<name>/`, resolved from the kit root. A skill that takes
  `<project>` runs the project's commands in a subshell: `(cd my-projects/<name> && casp status)`.
  It never asks the user to change folder.
- `.kit/profile.json` is read with `Read` from the kit root. Fields: `profile`
  (`developer` | `non-developer`), `language`, `learned` (chapters done).
- Never read a `.env` with `Read`. A skill that needs a value from `.env` sources it in a
  shell script whose output never prints the value (see `notify/notify.sh`).

## Argument `<project>`

When a skill takes a project name and none is given: if `my-projects/` holds exactly one
project, use it and say so in one line; otherwise list the names and ask.
A name that does not match a folder stops the skill with the list of existing names.
One reserved name: `kit` means the kit root itself (it has its own `casp/`); the commands
then run without the `cd my-projects/<name>` prefix.

## Audience

`.kit/profile.json` says who is in front of you. A skill marked `developers` in the root
`CLAUDE.md` table says "this command is for the developer profile" and stops when the
profile is `non-developer`. Everything else speaks to someone who may never have opened a
terminal: show the command and its result in one or two lines, never assume a tool is
installed, never assume git vocabulary.

## Adding a skill

1. Create `.claude/skills/<name>/SKILL.md` with the frontmatter above.
2. Add the row to the `<skills>` table of the root `CLAUDE.md`: that table is the contract.
3. Add a line under `[Unreleased]` in `CHANGELOG.md`.
