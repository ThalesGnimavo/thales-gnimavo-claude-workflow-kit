---
name: verify
description: Run a project's declared gate (the commands under "## Gate" in its CLAUDE.md) in a background sub-agent and write a report under the project's session-logs/verification/. Reports only, never edits a file. For the developer profile; says so and stops for a non-developer. Use after a push reached a remote or when the user asks for the gate's verdict without blocking the session.
argument-hint: "<project>"
allowed-tools: Bash(ls my-projects:*), Bash(cd my-projects/*), Bash(sed -n:*), Bash(grep:*), Bash(date:*), Bash(mkdir -p my-projects/*/session-logs/verification), Bash(jq:*), Bash(wc:*), Read, Agent
---

# /verify — the gate, in the background, report only

A verification is an observation on a real target with the command and its raw output.
This command produces that observation without occupying the session that asked for it.
It never fixes anything: a red gate is reported, and the session that owns the work fixes it.

## 0. Audience and project

```bash
jq -r '.profile' .kit/profile.json
ls my-projects/
```

`non-developer`: say "this command is for the developer profile: it runs test and build
commands a project declares" and stop. Resolve `<project>` as every skill does (one project:
use it and say so; several: list and ask; `kit`: the kit root itself, in which case read
`.` wherever a command below says `my-projects/<project>`).

## 1. The gate

```bash
sed -n '/^## Gate/,/^## /p' my-projects/<project>/CLAUDE.md | sed -n '/^```/,/^```/p' | grep -v '^```'
```

One command per line. Empty, absent, or `none yet`: say that the project declares no gate,
show where to declare one (a `## Gate` section with a code block, one command per line, in
the project's `CLAUDE.md`), and stop. Do not invent `npm test`.

## 2. Launch the sub-agent, in the background

`Agent`, `run_in_background: true`, with this brief filled in:

```
You are a read-only verification agent for the project at my-projects/<project>/ (relative
to the current directory, which is the kit root). Never edit, create or delete a source
file. The report is the only file you write.

Context discipline, mandatory: (1) read by range, grep -n to locate then sed -n 'A,Bp',
never a whole file; (2) edit nothing; (3) bound every command output to about twenty
lines: redirect to a log, print the exit code and the error count, open the thirty lines
around the first error only when the exit code is non-zero.

Steps:
1. mkdir -p my-projects/<project>/session-logs/verification
2. For each command below, in order, from inside the project folder, with a 600000 ms
   timeout, output redirected to
   my-projects/<project>/session-logs/verification/<STAMP>-<k>.log where <STAMP> is
   YYMMDD-HHMM at launch and <k> the command's rank:
     (cd my-projects/<project> && <command> > session-logs/verification/<STAMP>-<k>.log 2>&1; echo "exit=$?")
   Record exit code, wall time, and the count of lines matching error|fail|FAIL in the log.
   On a non-zero exit: grep -n -m1 -iE 'error|fail' on the log, then the thirty lines
   around that line, and keep file:line references for the report.
   Commands:
   <the gate, one per line>
3. Write my-projects/<project>/session-logs/verification/verify-<STAMP>.md:

   # Verification — <project> — <YYYY-MM-DD HH:MM>
   ## Summary
   | Command | Exit | Duration | Errors | Log |
   | … one row per command … |
   **Overall: N/M passed.**
   ## Failures
   file:line — the error, verbatim — what it points at (no fix applied)
   ## Not run
   commands skipped because an earlier one failed to even start, with the reason

4. Print exactly one line: "Verification <project>: N/M passed. Report: <path>".
```

Tell the user, in one line, that the gate is running in the background and where the
report will be. Do not wait for it in the foreground. When the agent's result arrives,
repeat its one line and nothing else; if the user wants the detail, the report is on disk.
The report and its logs show as uncommitted files in the project until the session that
owns the work commits them with its session log.

## Never

- Never edit a file in the project, including to "quickly fix" a failing test.
- Never run the gate inline in this session: that is what the sub-agent is for.
- Never run commands that are not in `## Gate`.
- Never claim a pass without the report's table; "it looked fine" is not a verification.
