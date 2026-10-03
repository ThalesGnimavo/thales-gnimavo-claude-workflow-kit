---
name: cto
description: Open a steering session on a project. Reads the cockpit, checks the shared state against the remote, replays the queued prompt's claims against the files, measures whether the project's gate can run in several sessions at once, and returns one explicit arbitration, solo or fleet with a costed estimate, before any line is written. Solo executes at once through /next; fleet waits for the user's go.
argument-hint: "<project>"
allowed-tools: Bash(ls my-projects), Bash(cd my-projects/*), Bash(git -C my-projects/* fetch:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* rev-parse:*), Bash(casp:*), Bash(jq:*), Bash(sed -n:*), Bash(head:*), Bash(wc:*), Read, Edit, Glob, Grep
---

# /cto — arbitrate before executing

You open a steering session. You do not code yet: not because a steering session may not
code (a solo session codes perfectly well) but because the arbitration comes before the
execution, and it has not been rendered.

Produce, in this order: the state in ten lines, the discrepancies you found, one defended
recommendation. Then: **solo executes directly, fleet waits for the go.**

`/casp` reports and proposes nothing. `/next` executes without arbitrating. You arbitrate,
and your arbitration decides which of the two this session becomes. Resolve `<project>` as
`.claude/skills/README.md` says; every command runs inside `my-projects/<project>/`.

## 1. The state, ten lines

```bash
(cd my-projects/<project> && jq -r '{current_phase, next_phase, next_prompt, arbitration}' casp/state.json)
(cd my-projects/<project> && jq -r '.next_prompt_note // empty' casp/state.json)
(cd my-projects/<project> && sed -n '/## Current focus/,/^---$/p' casp/now.md)
(cd my-projects/<project> && casp doctor --json 2>/dev/null | jq -r '.checks[] | select(.id=="cockpit.version") | [.severity, .label] | @tsv')
```

`next_prompt_note` may be long: it is the one field written for you, read it whole. On a
cockpit older than the installed tool: `casp upgrade` then `casp check`, one line in the
reply (`cockpit <old> → <new>, casp check 0`), without asking. The CTO owns `casp/`; in a
fleet, a worker never writes it.

## 2. The shared state, not the remembered one

The most reproducible failure of a steering session is a stale belief: not about its own
work, about the work of others. Three bounded commands before reasoning:

```bash
git -C my-projects/<project> fetch origin --quiet
git -C my-projects/<project> log origin/main..HEAD --oneline | head -20
git -C my-projects/<project> log HEAD..origin/main --oneline | head -20
git -C my-projects/<project> status --porcelain | wc -l
```

A tracking ref is a local cache: without `fetch`, a pushed commit looks absent.

## 3. Replay the prompt's claims

Open `next_prompt` and replay each assertion of its `## CONTEXT` against the files before
believing it: a file said to exist, a section said to be missing, a mechanism said to be
absent. Stale prompts have prescribed deleting valid entries and described as missing
things delivered weeks earlier. A discrepancy found is reported at the top of the reply,
never at the end.

## 4. Can the gate run in several sessions at once?

Only when the project's `CLAUDE.md` declares a `## Gate` section. Then, for each listed
command, answer three questions from the files, not from memory:

- does it stop or start a service on fixed ports?
- does it use one shared database or fixture set?
- does it write to a shared output folder?

One yes means a fleet with more than one writer is mechanically forbidden: two sessions
would not produce a git conflict, they would produce failures blamed on the diff. Say it,
and recommend solo or the readers form below. A project without a declared gate skips
this section in one line.

## 5. The arbitration, defended in both directions

Recommend **solo** or **fleet**. You may refuse or shrink a fleet the user asked for: a
lane you cannot write down is a lane that does not exist, so recommend solo and say so.

Default fleet form: **one writer plus N adversarial readers, read-only, no lanes.** It is
the form that has found real defects in delivered code, and it removes by construction
every concurrent-write failure. Departing from it needs a written reason.

The estimate is mandatory, three lines: the **number** of sessions, the **model** of each,
named, and the **basis** of the estimate. Verify the model actually passed to the launcher;
a session inherits the machine's default silently, and the default may be the dearer one.

Never say a fleet goes faster: nothing shows it. What is shown is that it contradicts: a
solo session has nobody to refuse its own order.

## 6. Record the arbitration

Without this, the gate in `/next` has no nominal path and everyone learns the `--solo`
escape. As soon as the arbitration is rendered (at once for solo, after the go for fleet),
write into `casp/state.json` with `Edit`:

```jsonc
"arbitration": {
  "phase": "<the value of next_phase>",
  "shape": "solo" | "fleet",
  "decided_at": "<YYYY-MM-DD>",
  "by": "<this session's name>",
  "reason": "<one line: what decided, not what was decided>"
}
```

`phase` must equal `next_phase`: `/next` compares them, and an arbitration left on the
previous phase counts as absent. `reason` carries what decided ("gate not isolable: one
shared test database") so it can be contested in six weeks. The field gates nothing and
goes in no check: it is working state, not a claim verifiable against git. It ships in the
state commit with the rest of the cockpit, never in a commit of its own.

## 7. Solo executes, fleet waits

- **Solo.** Render the state, the discrepancies, the costed arbitration, record the field,
  then continue with `/next <project>` in the same breath, without asking. The arbitration
  is written before the first line of code so the user can interrupt if they disagree.
- **Fleet.** Launching N sessions spends N times the quota; that spending needs a signature.
  Render the costed arbitration and call `/fleet` only after an explicit go. While waiting,
  you may name the tasks independent of the choice and offer to do them.

A user who asked for something else in their message (a question, an audit, "wait") keeps
the hand: direct execution is the nominal session opening, not a way around an instruction.

## What this command never does

It modifies no `CLAUDE.md` and no permission setting, whoever asks. It reads, measures,
recommends. Its only write is the `arbitration` field above.
