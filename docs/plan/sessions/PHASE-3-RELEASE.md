---
status: shipped
session_id: pending
session_log: session-logs/26-10-04-002-phase-3-release-b.md
drafted_at: 2026-10-03
next_after: 26-10-03-005-phase-2-manual-and-examples-b
---

# Session — phase-3-release : Blank-machine test, download page, v0.1.0

> **Status : QUEUED.** Drafted at the close of session `26-10-03-005` (phase 2 shipped:
> the manual in English and in French, the native-commands sheet, the two examples, the
> wording by profile). The kit can be run and read; it has never been opened by someone
> who is not its author, and it has no public address.
>
> **Goal.** A person who has never opened Claude Code downloads the kit from the author's
> website, follows `INSTALL.md`, types `claude`, and reaches a first project with a passing
> `casp check` without asking the author anything; `v0.1.0` is tagged on that proof.
>
> **Why now.** Every later phase (Spanish, Windows walkthrough, fleet without iTerm2) adds
> to a kit nobody outside has tried. The first outside run is the only test that finds
> what the author cannot see.

**Project root.** `thales-gnimavo-claude-workflow-kit/`
**Branch.** `main` (single branch, push at end).
**Session log target.** `session-logs/26-10-XX-NNN-phase-3-release.md`.
**Expected size.** Three sessions; two are done (see Status below). Originally: two sessions (A: the known defects fixed and the blank-machine test
with its findings fixed; B: the website page, the download link, the tag). No schema
change. No migration. The website page is the one UI mount, on the author's site, not in
this repository.

---

## CONTEXT — what changed since the parent prompt was drafted

**Status on 2026-10-04 (sessions 006 and 007, commits `cd5642d` to `852c44b`).** MUST 1 is
done with its proof (log 006). MUST 2 is done as far as a session can take it: the sandbox
first-run test passed (`/thales:setup`, two `/thales:new-project`, `/thales:day`), the fully
blank machine stays Proof due 6 (interactive `/login`). MUST 3 is done: the user decided a
project plugin named `thales`, every command is `/thales:<name>`, `README.md` carries the
decision under "Already using Claude Code with your own skills?", and seven proofs passed
on a fresh clone with Claude Code 2.1.289 (log 007). `INSTALL.md` has three human steps,
not five. **What remains is one session: the release slice**, MUST 4 to 6 and the SHOULD
items, opened by `/thales:cto kit` and started by `/thales:next kit`. First thing to paste
in its log: Proof due 7 of `roadmap.md` (`claude plugin list` and `/thales:next` from an
interactive session at the kit root).


- **Phase 2 shipped** (sessions 004 and 005, commits `5e61803` and `db4536f`). Six
  chapters in `docs/en/` and `docs/fr/`, `examples/job-search/` and `examples/software/`
  frozen without `.git`, `native-commands.md` checked against Claude Code 2.1.288 from the
  binary's command table and three `claude -p` runs. Constraint: the blank-machine test
  reads `INSTALL.md` and the manual as they are; a sentence the tester cannot follow is a
  defect of the kit, never of the tester.
- **Three defects known since session 004**, in `casp/roadmap.md` under "Queued —
  non-critical", each with file and line: `/thales:new-project` step 3's branch check fails on an
  unborn branch; `"{{first_goal}}".` doubles the period; `{{deploy}}` inside the software
  pre-approved table reads badly. Fix them first: the tester will meet all three.
- **A fourth finding from session 005**: on a machine where `~/.claude/skills/` holds a
  skill with the same name as a kit skill (`casp`, `next`, `cto` …), `claude -p "/casp kit"`
  ran the user-level skill, not the kit's. A blank machine has no user-level skills, so the
  test is unaffected; a developer who already uses Claude Code is. Decide in this phase
  (level 1, the user decides: rename the kit's skills with a prefix, document the
  collision in `INSTALL.md`, or accept it) and write the decision in `README.md`.
- **Two Proofs due still open**: `/thales:fleet`'s iTerm2 launch has never been run; the
  `(cd my-projects/<x> && casp status)` form has never been observed from a fresh
  `claude -p` with a project under `my-projects/` (the kit root form was, twice). Both are
  produced on the test machine or stay listed in the release notes as untested.
- **Standing conventions**: English is the canonical language; templates stay English;
  no author product name in the tree; the repository stays private until the test passes.

---

## REFERENCE FILES (read these before writing)

1. **`INSTALL.md`** — the three steps the tester follows; every finding maps to one of them.
2. **`casp/roadmap.md`**, "Queued — non-critical" — the three defects with file and line.
3. **`.claude/skills/thales/skills/new-project/SKILL.md`**, step 3 — the branch check to replace.
4. **`templates/*/CLAUDE.md`** — the `first_goal` line in six files; `templates/software/CLAUDE.md:58`.
5. **`session-logs/26-10-03-005-phase-2-manual-and-examples-b.md`**, "Verify" — how the
   headless probe was run and what it showed.
6. **`docs/en/the-state.md`**, "What you should see" — the `casp check` output a fresh
   project must reproduce on the tester's machine.

---

## MUST

1. The three known defects fixed, each with its proof: a throwaway `/thales:new-project` run on
   the `job-search` and `software` profiles, `casp check` exit 0, zero `{{` left, the
   rendered `first_goal` line and the software pre-approved row pasted in the log.
2. A blank-machine test on a machine (or a fresh user account, or a clean VM) with no
   `~/.claude/`, no `casp`, no prior Claude Code: the tester follows `INSTALL.md` only.
   The log records, step by step, what was typed, what was printed, and every point where
   the tester stopped. Each stop becomes a fix in this phase or a row in `roadmap.md`
   with the file and line. Pass criterion: `/thales:setup` writes the profile, `/thales:new-project`
   ends with `casp check` at exit 0, `/thales:next <project> --solo "…"` starts, all without the
   author.
3. The user-level skill collision decided (level 1) and the decision written in
   `README.md` under a heading a developer will find.
4. A `/kit` page on the author's website and a download link on its homepage: the page
   says what the kit is, who it is for, the three install steps, and links the clone line and the zip of the
   tagged release. The website is a separate repository; this prompt names the deliverable,
   the website's own `CLAUDE.md` governs the work.
5. `CHANGELOG.md`: `[Unreleased]` becomes `[0.1.0] - <date>`; a new empty `[Unreleased]`.
   Tag `v0.1.0` on the commit that holds that changelog; the zip the website links is
   built from the tag. Tagging is a release: level 1, the user says go in the session.
6. The repository flipped to public after the tag, by the user, not by the session.

## SHOULD

- `/thales:fleet` run once on iTerm2 with two workers on a throwaway project; the raw tab list
  and the workers' first lines pasted in the log; or the Proof due restated.
- The `(cd my-projects/<x> && casp status)` form observed from a fresh `claude -p` with a
  real project under `my-projects/`, exact outcome pasted.
- `docs/<lang>/native-commands.md` re-checked against the Claude Code version installed
  on the test machine (`claude --version`, `/help` compared with the table), the version
  line updated if it differs.

## MUST NOT

- No Spanish, no Windows screenshots, no tmux fallback for `/thales:fleet` (backlog).
- No new skill, no new template: the phase ships what exists, fixed.
- No tag and no public flip without the user's go in the session: both are level 1.
- No edit to the examples beyond what a fixed template forces (a changed `first_goal`
  line is acceptable, re-frozen from the same procedure; a replayed session is not).

## Close

Session log; this prompt flipped by `casp ship phase-3-release --log <id>`; the next
prompt is a `casp new discussion` (what comes after v0.1.0: Spanish, Windows, fleet
without iTerm2, the first outside feedback), not a build; `casp close`, `casp check`
exit 0, two commits, push.
