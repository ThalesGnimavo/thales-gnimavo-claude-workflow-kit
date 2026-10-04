---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-005-phase-2-manual-and-examples-b.md
drafted_at: 2026-10-03
next_after: 26-10-03-003-phase-1-skills-and-templates-b
---

# Session — phase-2-manual-and-examples : The manual (FR + EN) and the two worked examples

> **Status : QUEUED.** Drafted at the close of session `26-10-03-003` (phase 1 shipped:
> every command of the `<skills>` table exists, `/thales:new-project` produces a project whose
> `casp check` passes on first run). The kit can be run; it cannot yet be read.
>
> **Goal.** A first-time user who reads `docs/<lang>/` can run a day, a session and a
> project without the author, and `examples/` shows two finished projects they can compare
> their own to.
>
> **Why now.** `README.md` and the root `CLAUDE.md` point at `docs/fr/`, `docs/en/` and
> `examples/`, all three empty. Phase 3 (blank-machine test, release) cannot test a manual
> that does not exist.

**Project root.** `thales-gnimavo-claude-workflow-kit/`
**Branch.** `main` (single branch, push at end).
**Session log target.** `session-logs/26-10-XX-NNN-phase-2-manual-and-examples.md`.
**Expected size.** Two sessions (A: the manual in one language plus the examples; B: the
second language, the native-commands sheet, the profile-aware wording). No schema change.
No migration. No UI mount.

---

## CONTEXT — what changed since the parent prompt was drafted

- **Phase 1 shipped** (sessions 002 and 003). Fourteen skills under `.claude/skills/`, six
  templates under `templates/` with `template.json` driving `/thales:new-project`, conventions in
  `.claude/skills/thales/README.md` and `templates/README.md`. Constraint: the manual documents
  what exists; a chapter that describes a behaviour must quote the skill's own words.
- **`/thales:new-project` was proven** on throwaway projects (job-search and software profiles):
  `casp check` exit 0, zero `{{` left, branch `main`. The examples can be produced the
  same way, then played for two or three sessions each.
- **Deferred from 002 and 003**: `/thales:casp`, `/thales:next`, `/thales:update` show sha, branch, "commits"
  to a `non-developer`; `/thales:fleet`'s iTerm2 launch is unproven (Proof due); the permission
  behaviour of `(cd my-projects/x && …)` from a fresh `claude` is unobserved (Proof due).
- **Source material**: the author's two guides (running a day, starting a project) and the
  `/thales:learn` chapters are the base; the manual is longer than the chapters and shorter than
  the guides, and never names the author's products.

## MUST

1. `docs/en/` and `docs/fr/`, same file names, same section order, one file per chapter:
   `a-day.md`, `a-session.md`, `a-project.md`, `the-state.md` (what `casp/` is, the three
   files, `casp status`, `casp check`, what a FAIL means and how to fix the common ones),
   `native-commands.md`, `pitfalls.md`, plus `README.md` as the table of contents. French
   with every accent; no emoji; no author project name.
2. `native-commands.md`: every native Claude Code command the manual relies on
   (`/compact`, `/model`, `/context`, `/rewind`, `/clear`, `/help`, `/permissions`,
   `/mcp`, `/config` …) with one line each, **verified against the installed version**:
   the sheet names the version it was checked against and the method. A command that
   cannot be verified from this session (interactive `/help`) is listed under "to confirm
   on your machine", not written from memory.
3. `examples/job-search/` and `examples/software/`: two projects created with
   `/thales:new-project` (profiles `job-search` and `software`) for a fictional owner, then played
   for two sessions each with real session logs, a shipped phase, a queued prompt, and
   `casp check` at exit 0 in each. No real person, employer, company or credential. Each
   example has a `README.md` saying what to look at and in which order.
4. Every chapter ends with "What to type", the exact commands in order, and "What you
   should see", the raw output shape, taken from a real run in this session.
5. `README.md` line 10 and the `<workspace>` block of the root `CLAUDE.md` no longer say
   that the manual and the examples arrive later.
6. `CHANGELOG.md` under `[Unreleased]`.

## SHOULD

- Profile-aware wording in `/thales:casp`, `/thales:next`, `/thales:update`: a `non-developer` sees "saved
  point" for commit, no sha, no branch (deferred from 002).
- The Proof due on permission prompts: run `/thales:casp kit` from a fresh `claude -p` in this
  folder and paste the exact outcome in the log.
- `docs/<lang>/pitfalls.md` lists the three first-week mistakes of `/thales:learn` chapter 7 with
  the command that catches each.

## MUST NOT

- No website work, no download link, no release tag (phase 3).
- No Spanish (backlog).
- No change to a skill's behaviour beyond the SHOULD wording item; a defect found while
  writing the manual goes to `casp/roadmap.md` under Blocked or Queued, with the file and
  line.

## Close

Session log, this prompt flipped by `casp ship phase-2-manual-and-examples --log <id>`,
draft `PHASE-3-RELEASE.md`, `casp close`, `casp check` exit 0, two commits, push.
