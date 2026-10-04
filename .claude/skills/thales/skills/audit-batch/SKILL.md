---
name: audit-batch
description: The expensive, holistic verification pass over everything merged since the last deep audit, once, not per session: the project's full gate, an adversarial read-only audit of the accumulated diff by a sub-agent, and a security review when the range touches one. On GO it advances the casp audit watermark. For the developer profile, user-triggered only, never routine; use before a deployment or a cutover, or as the closing step of a batch of sessions.
argument-hint: "<project>"
allowed-tools: Bash(ls my-projects:*), Bash(cd my-projects/*), Bash(casp:*), Bash(jq:*), Bash(git -C my-projects/* log:*), Bash(git -C my-projects/* diff:*), Bash(git -C my-projects/* status:*), Bash(git -C my-projects/* rev-parse:*), Bash(git -C my-projects/* add:*), Bash(git -C my-projects/* commit:*), Bash(git -C my-projects/* push:*), Bash(git -C my-projects/* rev-list:*), Bash(git log:*), Bash(git diff:*), Bash(git status:*), Bash(git rev-parse:*), Bash(git rev-list:*), Bash(git commit:*), Bash(sleep:*), Bash(sed -n:*), Bash(grep:*), Bash(head:*), Bash(tail:*), Bash(wc:*), Bash(date:*), Read, Edit, Write, Glob, Grep, Agent
---

<warning>
This pass is expensive: the whole gate once, then a sub-agent that reads the entire diff
since the last deep audit, then possibly a security review. Expect tens of thousands of
tokens and, on a large range, an hour. It does not replace the cheap per-session gate
(`casp check` plus the project's `## Gate`), which stays the only thing standing between a
session and the main branch. Prerequisites: the developer profile, a project with
`casp/`, a `## Gate` section, a clean tree, and the user asking for it in this session.
Never run it on a schedule, never propose it as a closing habit.
</warning>

# /thales:audit-batch — the batched deep audit, before a cutover

The cheap gate runs every session and catches what a test can catch. This pass runs once
over a batch of sessions and catches what only a reader catches: a semantic drift across
commits, a security assumption nobody wrote, an edge case between two slices. It is the
deployment gate, on the user's call.

## 0. Audience and project

```bash
jq -r '.profile' .kit/profile.json       # developer, or say so and stop
ls my-projects/
```

Resolve `<project>` as every skill does. `kit` is accepted: read `.` wherever a command
below says `my-projects/<project>`.

## 1. Pre-flight: the range

```bash
(cd my-projects/<project> && git -C . rev-parse --abbrev-ref HEAD && git -C . status --short | wc -l)
(cd my-projects/<project> && casp audit status)
```

`casp audit status` prints the unaudited range `last_deep_audit..HEAD`, its commit count
and changed-file count.

- **0 commits unaudited**: report "up to date, nothing to audit" and stop. Do not run the
  gate for nothing.
- **No watermark**: first deep audit. Audit the whole tree when the repository is small;
  otherwise propose to the user a baseline at a known-good commit (`casp audit bump <sha>`)
  and audit forward from it. The user chooses: a baseline is a claim about untested code.
- **Watermark orphaned** (the commit is no longer in the history): tell the user, and agree
  on a baseline commit before anything runs: `RANGE` below would name a commit `git` cannot
  find. Re-baseline with `casp audit bump <sha>` after this pass.

```bash
WM=$(cd my-projects/<project> && casp audit status --json | jq -r '.watermark // ""')
ROOT=$(git -C my-projects/<project> rev-list --max-parents=0 HEAD | tail -1)
RANGE="${WM:-$ROOT}..HEAD"; echo "$RANGE"        # no watermark: from the first commit, the whole history
git -C my-projects/<project> diff --stat "$RANGE" | tail -20
git -C my-projects/<project> log --oneline "$RANGE" | head -20
```

## 2. The gate, once, in full

The commands under `## Gate` in the project's `CLAUDE.md`, as `/thales:verify` runs them: in a
background sub-agent, output to `session-logs/verification/`, report only. Wait for its
one-line result with a bounded loop on the report file, never in the foreground. A red
gate is a NO-GO before the audit even starts; still run the audit, because the readings
are wanted either way.

## 3. The adversarial audit: one sub-agent, read-only

`Agent`, `subagent_type: "Explore"`, with a structured brief; a generic "review this"
yields a generic review:

- `## Context`: what the range contains (the `git log` lines), what the project is (the
  first twenty lines of its `CLAUDE.md`), where the rules live (rule number one,
  invariants).
- `## Files to audit`: every file of `git diff --stat`, with a one-line summary each when
  you can give it; the sub-agent reads the diff of each with `git -C my-projects/<project>
  diff <RANGE> -- <file>`, by range.
- `## Checklist`, targeted: secrets and credentials in the diff; authentication and
  authorisation paths; input validation at every boundary; race conditions and
  idempotence; data integrity and migrations; error paths that swallow failures; trust in
  headers, environment or external responses; dead code and TODOs that hide a decision;
  every invariant of the project's `CLAUDE.md`, by name; consistency between what the
  session logs claim and what the diff shows.
- `## Output`: verdict `GO` / `GO-WITH-FIXES` / `NO-GO`; PASS, WARN or FAIL per checklist
  item with `file:line`; "Top 5 to fix"; "deferred / nice-to-have".
- Quote the three context rules: read by range, edit nothing, bound every output to about
  twenty lines.

## 4. The security review, when the range touches a security surface

Authentication, sessions, payments, uploads, external calls, permissions, anything that
handles data of other people: a second read-only sub-agent on those files only, with the
checklist narrowed to injection, authorisation bypass, secrets, unsafe deserialisation,
and the project's own threat lines. Skip it, and say you skipped it, when the range
touches none of these.

## 5. Synthesis and fixes

One verdict from the three inputs: `GO`, `GO-WITH-FIXES`, `NO-GO`. Apply the real fixes
inline, as new commits in the project, each by pathspec; re-run only the targeted checks
for what you fixed, never the whole gate again. `GO-WITH-FIXES` becomes `GO` only after
the fix commits get a targeted re-read (the auditor, or you, on their diff alone); until
then, no bump. Write the deferred items in the session log of this pass (`casp new log
--slug audit-batch`), under `## Deferred / risks`.

## 6. The watermark, on GO only

```bash
(cd my-projects/<project> && casp audit bump)
git -C my-projects/<project> commit casp/state.json -m "chore(casp): deep-audit watermark → $(git -C my-projects/<project> rev-parse --short HEAD)"
```

Push only when the project's pre-approved decisions allow it; otherwise show the command.
On `NO-GO`: do not bump. Report the blockers; the watermark staying put is the signal that
the range is not clear for a cutover.

## Never

- Never per session. The cheap gate is per session; this is the batch gate.
- Never automatic, never on a schedule, never proposed as routine.
- Never move the cheap, invariant-guarding tests out of the per-session gate "to save them
  for the batch": they are cheap and they guard the irreversible class every commit.
- Never let a sub-agent re-run the full gate: it receives the range and the results.
- Never bump past code that was not audited or got a NO-GO. The watermark is a truth claim.
- Never audit a sibling project's range; `<project>` is the scope.
