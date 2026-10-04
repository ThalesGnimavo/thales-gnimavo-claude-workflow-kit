---
status: shipped
session_id: pending
session_log: session-logs/26-10-03-003-phase-1-skills-and-templates-b.md
drafted_at: 2026-10-03
next_after: phase-0-skeleton
---

# Session — phase-1-skills-and-templates : Generalised skills and the six profile templates

> **Status : QUEUED.** Drafted at the close of session `26-10-03-001` (phase 0). The kit
> boots, greets, checks the machine and teaches; it cannot yet create a project or run a day.
>
> **Goal.** Every command listed in the root `CLAUDE.md` `<skills>` table exists, works from
> this folder on a machine that is not the author's, and `/thales:new-project` produces a project
> whose `casp check` passes on first run.
>
> **Why now.** Chapter 6 of `/thales:learn` already names `/thales:day --dry-run`; a user who finishes the
> tour today hits a missing command.

**Project root.** `thales-gnimavo-claude-workflow-kit/`
**Branch.** `main` (single branch, push at end).
**Session log target.** `session-logs/26-10-XX-NNN-phase-1-skills-and-templates.md`.
**Expected size.** two sessions. No schema change. No migration. No UI mount.

---

## CONTEXT — what changed since the parent prompt was drafted

- **Phase 0 shipped** (session 001). Root `CLAUDE.md`, `INSTALL.md`, `/thales:setup`, `/thales:learn`
  with seven chapters, `.claude/settings.json`, cockpit. Constraint: the `<skills>` table in
  `CLAUDE.md` is the contract; implement exactly those names.
- **Source skills to generalise** live in the author's private skills folder and in the
  published package `@justethales/casp` (`skills/{casp,next,fleet,audit-batch}`). The
  published `next` lacks the arbitration gate that the author's fork has; take the fork as
  the base and strip every author-specific path, project name and terminal integration.
  Write `/thales:notify` from scratch; never copy the author's notification skill.
- **Profile** is in `.kit/profile.json` (`profile: developer | non-developer`, `language`).
  Skills read it to choose what to show.

## MUST

1. `/thales:new-project <name>`: asks for the profile template (job-search, book-or-thesis,
   small-business, event, content-creation, software), creates `my-projects/<name>/` as its
   own git repository, writes `CLAUDE.md` from `templates/<profile>/CLAUDE.md` with the
   user's answers, runs `casp init`, writes the first queued prompt from the user's
   `first_goal`, commits. `casp check` passes in the new project before the skill ends.
2. The six templates under `templates/<profile>/`: `CLAUDE.md` (identity, invariants,
   pre-approved decisions, session ritual; adapted from the author's `MODELE-CLAUDE-MD.md`)
   and `first-prompt.md`. The job-search one follows the eight steps of the author's
   article "CASP for a job search".
3. `/thales:day [--dry-run]`: lists every project under `my-projects/` with its `casp status` in one
   screen, shows blocked ones with their unblock action, asks the single decision (which
   project, one session or several), and opens `/thales:next <project>` there. `--dry-run` prints
   and stops. Runs from the kit root; never asks the user to change folder.
4. `/thales:casp [project]`, `/thales:next <project>`, `/thales:cto <project>`: generalised copies that take the
   project name and operate on `my-projects/<name>/` from the kit root (the kit's skills and
   permissions load only when `claude` starts here; `CLAUDE.md` says so). `/thales:next` keeps
   the arbitration gate and the `--solo "<reason>"` escape. `/thales:cto` measures gate isolation only when the project's
   `CLAUDE.md` declares a gate.
5. `/thales:verify`: reads a `## Gate` section in the project's `CLAUDE.md` (one command per line),
   runs them in a background sub-agent, writes a report under `session-logs/verification/`,
   never edits. Hidden when `profile` is `non-developer`.
6. `/thales:notify`: reads `.env` (`NOTIFY_CHANNEL=desktop|email|webhook`, plus the channel's
   variables), sends the end-of-session summary, prints "not configured" otherwise.
   Desktop uses `osascript` on macOS, `notify-send` on Linux, PowerShell toast on Windows.
7. `/thales:humanizer`: copied as is (no coupling). `/thales:update`: `git fetch` + `git pull --ff-only`
   on the kit, refuses if the working tree is dirty, never touches `my-projects/`.
8. `/thales:chain`, `/thales:fleet`, `/thales:audit-batch`: generalised, each starting with a `<warning>` block
   on cost and prerequisites; `fleet` states macOS + iTerm2 up front.
9. Every skill: frontmatter `name`, `description`, `argument-hint`, `allowed-tools`; no
   absolute path; no project name from the author's portfolio.

## SHOULD

- A `templates/README.md` explaining how to add a seventh profile.
- `/thales:setup --global`: deferred from phase 0 because the copied skills depend on relative
  paths (`.kit/profile.json`, `chapters/`). Ship it only with a resolved-path design, or drop it.
- `CHANGELOG.md` updated under `[Unreleased]`.

## MUST NOT

- No docs yet (`docs/fr`, `docs/en` are phase 2) beyond what a skill needs inline.
- No website work.

## Close

Session log, this prompt flipped by `casp ship phase-1-skills-and-templates --log <id>`,
draft `PHASE-2-MANUAL-AND-EXAMPLES.md`, `casp close`, `casp check` exit 0, two commits, push.
