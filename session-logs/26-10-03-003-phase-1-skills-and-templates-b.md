---
phase: phase-1-skills-and-templates
---

# 26-10-03-003 — phase-1-skills-and-templates, slice B : Templates, `/new-project`, `/day`, `/verify`, `/chain`, `/fleet`, `/audit-batch`

**Session prompt :** `docs/plan/sessions/PHASE-1-SKILLS-AND-TEMPLATES.md` (shipped by this log).
**Previous session end :** `01999a2` (state bump of session 002, slice A).
**Delegation :** Inline, plus two sub-agents: one `general-purpose` in the background to
prove `/verify` on a throwaway project (41 k tokens), one read-only `Explore` for the
post-implementation audit. Reason: the prompt's order (templates → `/new-project` →
`/day`) is serial; nothing to parallelise.
**State at session start :** slice A shipped, `arbitration` recorded for this phase by
`cto-26-10-03-002` (solo), cockpit current with casp 0.18.2, `casp check` 0,
`origin/main` = `HEAD`. Autonomous session inside a chain started by the user: no
question possible; the chain is the go for build, commit and push.

## Scope shipped this session

### A — `templates/` (NEW): six profiles and a README
`job-search`, `book-or-thesis`, `small-business`, `event`, `content-creation`,
`software`. Each folder holds `template.json` (label, summary, who sees it first, the
first phase, three questions, the roadmap phases), `CLAUDE.md` (identity, rule number
one, invariants with the defect each avoids, layout, sources of truth, session cycle,
`## Pre-approved decisions`, what signals the owner, debt; adapted from the author's
model, `>` commentary removed) and `first-prompt.md` (the `casp` prompt layout, one
sitting of MUSTs, `next_after: phase-0-init`). The job-search one carries the eight steps
of the article: private repository, masters plus one folder per employer with frozen
PDFs, one tracking file where a row is sent only with a date, written content rules,
interview prep as a test suite, an offer filter on the trade, a roadmap that ends at a
signed contract, automation that prepares and never sends. `templates/README.md`: the
placeholders, the headings skills read by name, the six steps to add a seventh profile.

### B — `/new-project <name> [--profile <p>]` (NEW)
Reads the profile, orders the menu by `offer_first_to`, asks description, first goal and
the template's questions one at a time, `git init -b main`, renders `CLAUDE.md`, `casp
init`, replaces `PHASE-1-FIRST-SLICE.md` by the profile's prompt, points `state.json` at
it with `jq` (other phases to backlog), fills `roadmap.md` and `now.md`, commits, then
proves: zero `{{` and `casp check` exit 0. Ends on `/next <name> --solo "…"` or `/cto`.

### C — `/day [--dry-run]` (NEW)
One table, one row per project from `state.json`, `casp check --quiet`, the last commit
and the queued prompt's frontmatter; eight states in a first-match-wins order with the
unblock command each; `--dry-run` stops after the table; one question (project, one or
several sessions); opens `/next`, or `/cto` when the phase has no arbitration.

### D — `/verify <project>` (NEW)
Extracts the `## Gate` code block from the project's `CLAUDE.md`, launches a background
sub-agent with a full brief (stamp, per-command logs, report table, one-line result),
never edits. Developer profile only; "no gate declared" otherwise, never an invented
`npm test`.

### E — `/chain`, `/fleet`, `/audit-batch` (NEW, generalised)
Each opens with a `<warning>` block on cost and prerequisites. `/chain`: runner arbitrates
solo per phase, child launched through a script under `.kit/chain/` with `nohup`, bounded
polling with an explicit flag, deterministic close check with the "phase not finished"
case, stop conditions, digest. `/fleet`: macOS with iTerm2 stated first, `uname` and
`osascript` pre-flight, lanes, briefs under `.kit/fleet/`, one-writer-N-readers default,
inline `osascript` launch command (no launcher script shipped), consolidated review.
`/audit-batch`: `casp audit status` range, the gate once through the `/verify` form, one
`Explore` auditor with a structured brief, optional security read, watermark bumped on
GO only.

### F — `CHANGELOG.md`, `/setup`, `.gitignore`, `casp/` (MODIFIED)
`[Unreleased]`: eight lines added, one changed. `/setup`: install log under `.kit/`
instead of `/tmp` (deferred from 002); its close line no longer says `/new-project` ships
later. `.gitignore`: `.kit/` as a whole. `roadmap.md`, `now.md`: phase 1 shipped, phase 2
queued with its prompt.

## What did NOT ship — and why

- `/setup --global` (SHOULD): dropped. The skills resolve `.kit/profile.json`,
  `templates/` and `my-projects/` from the kit root; a global install would need every
  path rewritten against a stored root. The root `CLAUDE.md` already says to start
  `claude` here. Way back: a `kit_root` field in `~/.claude/kit.json` read by every skill.
- A `fleet.sh` launcher: the author's script is 317 lines tied to their machine; the kit
  ships the `osascript` command inline with `--dry-run`. Proof due below.

## Files touched

```
templates/README.md                                          new
templates/{job-search,book-or-thesis,small-business,event,content-creation,software}/{template.json,CLAUDE.md,first-prompt.md}   new
.claude/skills/{new-project,day,verify,chain,fleet,audit-batch}/SKILL.md   new
.claude/skills/setup/SKILL.md  .gitignore  CHANGELOG.md       modified
casp/{state.json,now.md,roadmap.md}  docs/plan/sessions/      state
```

## Verify

### Inline (2026-10-03, macOS, casp 0.18.2)

- `casp init` in a temporary repository: scaffold observed (`casp/`, `docs/plan/sessions/
  PHASE-1-FIRST-SLICE.md`, templates), `casp check` → `12 PASS · 3 WARN · 0 FAIL`, exit 0.
  The fresh repository was on `master`: `/new-project` uses `git init -b main`.
- `/new-project` procedure replayed on `my-projects/zz-test-job` (job-search) and
  `my-projects/zz-test-soft` (software, two-line gate):
  ```
  == zz-test-job
  main
         0            # grep -rn '{{' | wc -l
  exit=0              # casp check --quiet
  casp:check · 14 PASS · 2 WARN · 0 FAIL
    next_phase       phase-1-application-kit
    next_prompt      docs/plan/sessions/PHASE-1-APPLICATION-KIT.md
  == zz-test-soft
  main
         0
  exit=0
  casp:check · 14 PASS · 2 WARN · 0 FAIL
    next_phase       phase-1-walking-skeleton
    next_prompt      docs/plan/sessions/PHASE-1-WALKING-SKELETON.md
  ```
  The software `## Gate` block rendered multi-line (`npm test` / `npm run build`).
- `/day` row commands on both throwaways: `check=0`, prompt `status: queued`, the
  scaffold's `_(none)_` row in `## Blocked` was matched by the first filter; the skill now
  excludes it.
- `/verify` gate extraction on `zz-test-soft` → `npm test`, `npm run build`.
- `/verify` sub-agent run for real on `zz-test-soft` (background, 41 s): report
  `session-logs/verification/verify-261003-1536.md`, table with two rows, exit 254 each,
  `Overall: 0/2 passed` (no `package.json`, expected), two logs next to it, no other file
  touched (`git status --short` → `?? session-logs/` only).
- All six `template.json` parse and carry `label`, `first_phase.slug`, `questions`,
  `phases` (`jq -e`).
- Lint over the new files: `/Users/`, `/tmp`, author project names, messaging tools → 0
  hits; four-field frontmatter in order on all fourteen skills.
- `claude --help` confirms `-n, --name`, `--permission-mode`, `-p, --print`;
  `casp audit status|bump` exist in 0.18.2.
- Throwaway projects deleted after the proofs.

### Post-implementation audit (Explore sub-agent)

Verdict GO-WITH-FIXES (68 k tokens, 42 tool uses). Templates: zero orphan placeholder,
phase ids consistent, headings in place; zero absolute path, author name, credential or
emoji. Applied inline: `/chain` accepted `next_after` only against `last_session_id` or
the last shipped phase, so it stopped on every project `/new-project` creates (first
prompt says `phase-0-init`): `current_phase` added to the rule, in the loop and in Never;
the "phase not finished" case re-defined as "log written, `last_session_id` advanced,
`next_prompt` unchanged and still queued"; `kit` accepted by `/verify`, `/chain`,
`/audit-batch` but every path said `my-projects/<project>`: one line each ("read `.`");
`allowed-tools` completed (`test`, `mv`, `tail`, `git symbolic-ref`, `git -C .` in
`/new-project`; `wc` in `/day` and `/fleet`; `wc`, `seq`, `kill`, kit-root `git` forms
in `/chain`; `ls my-projects:*` everywhere; `sleep`, `git add/commit` on any path,
`rev-list` in `/audit-batch`); `jq` added to `/setup`'s machine check with install
lines, and `/new-project` reads the profile with `Read`; plain words for the
non-developer in `/new-project`'s close and `/day`'s state labels, `--solo` explained in
one parenthesis; `/day` offers "needs you" projects, counts backlog in the total, and
routes "several" to `/cto` (which decides a fleet) instead of `/fleet` (which refuses
without that decision); `/fleet`'s `cd` quoted for a path with a space, and the
permission exception written down; `/audit-batch`: no-watermark range from the root
commit, orphaned watermark re-baselined before any `git diff`, `GO-WITH-FIXES` bumps only
after a targeted re-read of the fix commits; `/verify` says its report shows as
uncommitted. Not applied: the profile check on `/chain` and `/fleet` (the table marks
them advanced, not developer-only); the English-templates point (see Deferred);
`CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` kept (measured by the author on 2026-09-10 in the
source skill, unverifiable from this session).

### Proof due

- `Proof due: an iTerm2 tab opens with the worker loaded — on macOS with iTerm2, from a
  fresh claude at the kit root — blocked by: a headless chain must not open windows on
  the user's screen; the osascript line is untested.`
- `Proof due: no permission prompt on (cd my-projects/x && casp status) — on a fresh
  claude start from the kit root — blocked by: cannot be observed from inside a running
  session` (carried from 002).
- `Proof due: /new-project end to end through the skill text (AskUserQuestion menu,
  Read/Write rendering) — on an interactive session — blocked by: this session is
  headless; the procedure was replayed by script, not through the skill.`
- `Proof due: /chain launching a child from the kit root with the kit's /next — on a
  real queue — blocked by: this session is itself a chain child; launching a chain inside
  a chain is forbidden by the skill.`

## Deferred / risks

- Templates are in English, with the user's answers verbatim in their language. A French
  user gets an English constitution in their project; the manual (phase 2) is the place to
  decide whether `templates/<profile>/fr/` is worth twelve more files.
- `/day` and `/new-project` still show "commit" and "branch" to a `non-developer`; the
  profile-aware wording is in the phase 2 SHOULD, with `/casp`, `/next`, `/update`.
- `/fleet` ships no launcher script: the `osascript` line is the launcher. If it fails on
  a real iTerm2, a `fleet.sh` under `.claude/skills/fleet/` is the fix (level 2).
- `/chain` inlines a long child prompt in a shell script; a project's `CLAUDE.md` without
  `## Pre-approved decisions` stops the chain at pre-flight by design.
- `/verify` on the `kit` project: no `## Gate` in the root `CLAUDE.md`, so it stops with
  "no gate declared", which is true.

## Decisions taken without the user

- `template.json` per profile (label, questions, phases) instead of questions hard-coded
  in `/new-project`. Way back: inline the six question lists in the skill.
- First prompt renamed to `PHASE-1-<SLUG>.md` with the profile's slug, and the other
  phases listed in `phases_backlog`. Way back: keep `casp init`'s `PHASE-1-FIRST-SLICE.md`.
- `/new-project` ends on `/next <name> --solo "first slice of a new project"` for a
  non-developer rather than recording an arbitration itself: a tool granting its own
  arbitration is what the gate forbids. Way back: write `arbitration` in the skill.
- Templates in English (see Deferred). Way back: `templates/<profile>/fr/`.
- `.kit/` ignored as a whole (chain scripts and logs, fleet briefs). Way back: list the
  three paths.
- `/setup --global` dropped (see above).
- Chain scripts and logs under `.kit/chain/`, fleet briefs under `.kit/fleet/<project>/`.
  Way back: a `scratch/` folder at the root.
- `/verify` sub-agent type `general-purpose` (it writes a report), `/audit-batch` auditor
  `Explore` (reads only).

## CASP state + housekeeping

- Phase shipped: `casp ship phase-1-skills-and-templates --log 26-10-03-003-phase-1-skills-and-templates-b`.
- Pointers: `current_phase` = phase 1, `next_phase` = `phase-2-manual-and-examples`,
  `next_prompt` = `docs/plan/sessions/PHASE-2-MANUAL-AND-EXAMPLES.md` (drafted, queued;
  the slug was already in `phases_queued`). `arbitration` left on phase 1: phase 2 needs
  its own, by `/cto kit` or the chain runner.
- `casp close --yes`, `casp check` 0; two commits, work first; push.

## End-of-session

Next: `/cto kit` then `/next kit` for phase 2, slice A (the manual in one language plus
the two examples). First check of the session: the Proof due on permission prompts.
