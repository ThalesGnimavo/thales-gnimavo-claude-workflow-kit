---
name: new-project
description: Create a project under my-projects/ from a profile template (job-search, book-or-thesis, small-business, event, content-creation, software). Asks the profile's questions, writes the project's CLAUDE.md and first queued prompt from the answers, runs casp init, commits, and checks that casp check passes before ending. Use when the user wants to start a project with the kit.
argument-hint: "[name] [--profile <profile>]"
allowed-tools: Bash(ls:*), Bash(jq:*), Bash(test:*), Bash(mkdir -p my-projects/*), Bash(mv my-projects/*), Bash(tail:*), Bash(cd my-projects/*), Bash(git init:*), Bash(git symbolic-ref:*), Bash(git -C . rev-parse:*), Bash(git -C my-projects/* add:*), Bash(git -C my-projects/* commit:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* rev-parse:*), Bash(git -C my-projects/* symbolic-ref:*), Bash(casp:*), Bash(rm my-projects/*/docs/plan/sessions/PHASE-1-FIRST-SLICE.md), Bash(sed -n:*), Bash(grep:*), Bash(date:*), Bash(wc:*), Read, Write, Edit, Glob, AskUserQuestion
---

# /new-project — create a project from a profile

You create one folder, `my-projects/<name>/`, that a fresh `/next <name>` can start from.
The result is proven when `casp check` exits 0 inside it and no `{{placeholder}}` survives.
Speak in the user's language, in plain words; the user may never have opened a terminal.

## 0. Preconditions

```bash
ls my-projects/
ls templates/
```

`Read` `.kit/profile.json` for `name`, `profile`, `language`, `first_goal` (not `jq`: it is
the very first step and must work before any tool is assumed).

- No `.kit/profile.json`: say that `/setup` has not run, run it, then come back here.
- `<name>` missing: ask for one. It must match `^[a-z0-9][a-z0-9-]{1,40}$` (lower case,
  digits, hyphens). Propose the kebab-case form of what the user typed; never silently
  rename. `kit` is reserved. A name already present under `my-projects/` stops the skill:
  say so and show `/casp <name>`.
- `templates/` must hold at least one folder with `template.json`; otherwise the kit is
  damaged: say which file is missing and stop.

## 1. Choose the profile

Read every `templates/*/template.json` (`jq -r '[.label, .summary] | @tsv'`). Order the
list with the profiles whose `offer_first_to` contains the user's `profile` first. Ask one
closed question with `AskUserQuestion`: the labels, one line of summary each. `--profile
<folder>` skips the question; an unknown value shows the list and asks.

## 2. Ask, one question at a time

In this order, in plain conversation, never as a form:

1. **Description.** "In two or three sentences, what is this project?" Becomes
   `{{description}}`, verbatim.
2. **First goal.** Show `first_goal` from the profile and ask whether it is the first
   thing to do in this project, or what is. Becomes `{{first_goal}}`, verbatim.
3. **The template's questions**, `questions[]` from `template.json`, each `ask` as written,
   each answer stored under its `key`.

An empty answer is asked again once, then the skill stops: a template with a blank field
is a rule nobody agreed to. Answers are kept exactly as typed, accents included; never
rewrite the user's wording.

## 3. Build the folder

```bash
mkdir -p my-projects/<name>
(cd my-projects/<name> && git init -q -b main 2>/dev/null || (git init -q && git symbolic-ref HEAD refs/heads/main))
(cd my-projects/<name> && git -C . rev-parse --abbrev-ref HEAD)      # must print main
```

Then, from the kit root:

1. `Read` `templates/<profile>/CLAUDE.md`; replace every `{{key}}` with its answer
   (`{{project_name}}` = the name, `{{owner_name}}` = `name` from the profile,
   `{{created_at}}` = today `YYYY-MM-DD`); `Write` the result to `my-projects/<name>/CLAUDE.md`.
   A multi-line answer (the software profile's gate commands) is kept multi-line.
2. `(cd my-projects/<name> && casp init 2>&1 | tail -3)`. It scaffolds `casp/`,
   `docs/plan/sessions/PHASE-1-FIRST-SLICE.md` and the templates. Branch `main`, not
   `master`: `casp` does not care, the kit's commands do.
3. Replace the generic first prompt with the profile's: `SLUG` = `first_phase.slug`,
   `UPPER` = `SLUG` upper-cased with hyphens kept.
   ```bash
   rm my-projects/<name>/docs/plan/sessions/PHASE-1-FIRST-SLICE.md
   ```
   `Read` `templates/<profile>/first-prompt.md`, replace placeholders, `Write` to
   `my-projects/<name>/docs/plan/sessions/PHASE-1-<UPPER>.md`.
4. Point the state at it, and list the other phases as backlog:
   ```bash
   jq --arg p "phase-1-<SLUG>" --arg f "docs/plan/sessions/PHASE-1-<UPPER>.md" --argjson b '<json array of the other phase ids>' \
      '.next_phase=$p | .next_prompt=$f | .phases_queued=[$p] | .phases_backlog=$b' \
      my-projects/<name>/casp/state.json > my-projects/<name>/casp/state.tmp \
   && mv my-projects/<name>/casp/state.tmp my-projects/<name>/casp/state.json
   ```
5. `casp/roadmap.md`, with `Edit`: the "Now — Next 3" table gets the first three phases
   from `template.json` (`phases[].title`; the first with its prompt path and `queued`,
   the others "not drafted"); the "Phase scoreboard" table lists phase 0 as shipped and
   every template phase as queued or backlog. `casp/now.md`: the "Current focus" paragraph
   becomes the description plus the first goal; the "15 minutes" action is "read
   `CLAUDE.md`, then `/next <name>`"; the "1 hour" and "half a day" actions name the first
   prompt. Keep the file's headings.
6. `my-projects/<name>/README.md`, five lines: the project name, the profile, the
   description, "run from the kit root with `/next <name>`", the creation date.
7. Commit, in the project, everything (it is a fresh repository with no neighbour):
   ```bash
   git -C my-projects/<name> add -A
   git -C my-projects/<name> commit -q -m "chore: project created from the <profile> profile" && git -C my-projects/<name> log --oneline -1
   ```

## 4. Prove it

```bash
grep -rn '{{' my-projects/<name>/ --include='*.md' | wc -l         # must print 0
(cd my-projects/<name> && casp check --quiet; echo "exit=$?")        # must print exit=0
(cd my-projects/<name> && casp status --plain | sed -n '1,12p')
```

A surviving `{{`: fix the file and re-run; never leave it. A non-zero `casp check`: print
the FAIL lines, fix the state, re-run; never end the skill on a red check. Keep the three
outputs for the closing message.

## 5. Close

Say, in the user's language:

- the folder, the profile, and that a first save point was recorded (the developer
  profile also gets the branch and the commit; a `non-developer` never reads "commit",
  "branch" or a sha: wording table in `.claude/skills/README.md`);
- the raw `casp check` line and the `{{` count;
- that `CLAUDE.md` is the project's constitution and is worth reading once (one minute);
- the next step: `/next <name> --solo "first slice of a new project"` to start now
  (`--solo` says: one session, no further preparation; `/next` asks for it once per
  step), or `/cto <name>` to have the plan re-read first. For a user whose profile is
  `non-developer`, recommend the first.

Do not start the session yourself. Do not propose `/notify`: nothing was shipped.

## Never

- Never write outside `my-projects/<name>/`. The kit's own files are not touched.
- Never push: the project has no remote yet. Pushing is a level-1 decision the user
  takes when they create one.
- Never fill a placeholder with a guess. An answer the user did not give is a question.
- Never keep `PHASE-1-FIRST-SLICE.md` next to the real prompt: two queued prompts for one
  phase is the drift `casp check` exists to catch.
