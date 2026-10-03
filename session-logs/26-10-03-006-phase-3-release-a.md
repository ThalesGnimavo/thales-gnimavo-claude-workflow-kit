# 26-10-03-006 — phase-3-release, slice A : The known defects fixed, the first-run test in a sandbox, the install path corrected

**Phase not finished.** Slice A of two. `phase-3-release` stays queued for slice B (the
skill-collision decision written in `README.md`, the website page, the `[0.1.0]` changelog,
the tag, the public flip). No `phase:` key in this log's frontmatter on purpose.

**Session prompt :** `docs/plan/sessions/PHASE-3-RELEASE.md`.
**Previous session end :** `1713326` (session 005 closed, phase 3 queued with its prompt).
**Delegation :** executed inline. Six headless `claude -p` probes in the background, in a
sandbox built from a clone of the work commit. No sub-agent: the session edits were one to
ten lines each, and the audit of §7.1 is skipped by its own rule (no module, no schema, no
auth; fixes of one line and documentation).
**State at session start :** phase 2 shipped, phase 3 queued, cockpit current with casp
0.18.2, tree clean, `origin/main` = `HEAD`. Opened by `/cto kit` in an interactive session:
arbitration `solo` recorded by `cto-kit-006` before the first edit (reason in
`state.json`). The `/cto` and `/next` that ran were the author's user-level skills, not the
kit's: the collision the prompt describes was observed a third time, in this very session.

## Scope shipped this session

### A — The three known defects (MUST 1), each with its proof

- `.claude/skills/new-project/SKILL.md:59`: `git symbolic-ref --short HEAD` replaces
  `git -C . rev-parse --abbrev-ref HEAD`. Proof on an unborn branch, in a scratch folder:
  ```
  symbolic-ref: main exit=0
  rev-parse: fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
  ```
- `templates/*/CLAUDE.md` (six files) and `examples/{job-search,software}/CLAUDE.md`: the
  period after `"{{first_goal}}"` is gone. The examples carry the rendered line as the
  fixed template now produces it; nothing else in them changed.
- `templates/software/CLAUDE.md:58`: the auto-deploy row reads "Level 1, unless the
  deployment line at the top of this file names that branch as the normal path; then yes,
  with the gate green." No placeholder inside a sentence.

Proof on two throwaway projects created by `/new-project` in the sandbox (see "Verify"):
`casp check` exit 0 on both, zero `{{` left, the rendered lines pasted below.

### B — Defects found by reading `INSTALL.md` before the test

- **Step 4 said "download the zip"; `/update` says "the kit is a git repository the user
  cloned" and does `git pull --ff-only`.** A release zip has no `.git`: `/update` was dead on
  arrival for anyone who followed step 4. Git is already required by step 2, so step 4 now
  gives `git clone` + `cd` as the primary path (EN and FR); the zip stays as the fallback
  with the sentence "A zip cannot be updated in place: `/update` will ask you to download
  again." `README.md` line 5: "Clone it, type `claude`."
- **`/update`** has a first line `git rev-parse --is-inside-work-tree || echo "no-git"` and
  stops with a clear message on `no-git`.
- **"`/new-project` arrives with v0.1.0"** (last line of both halves of `INSTALL.md`): stale
  since phase 1; replaced by "or `/new-project` to start your first project".

### C — Defects found by the test

- **`/setup` wrote "non-développeuse"**, a gendered noun inferred from the first name "Awa".
  Rule added to `.claude/skills/setup/SKILL.md` §4: repeat the user's own answer ("you do
  not write software"), never a noun whose gender would be guessed from the name.
- **The manual's "What you should see" showed only `18 PASS · 0 WARN · 0 FAIL`**, the count
  of a project that has lived sessions. A fresh project shows `14 PASS · 2 WARN · 0 FAIL`
  (`last_session_id` and `last_commit` still `pending`). Paragraph added to
  `docs/en/the-state.md` and `docs/fr/the-state.md` under that heading.

### D — Cockpit and changelog

- `casp/roadmap.md`: the open Proofs due consolidated under "Queued — non-critical". The
  prompt counted two; the logs 002 to 005 hold six. Listed with their blocker, for the
  release notes.
- `CHANGELOG.md` `[Unreleased]`: `### Fixed` (four entries) and two lines under the
  existing `### Changed`.

## What did NOT ship — and why

- **The skill-collision decision (MUST 3).** Level 1, the user decides. Recommendation
  given at the opening: document, do not prefix, and have `/setup` print the names under
  `~/.claude/skills/` that shadow a kit skill. Nothing written in `README.md` until the
  answer. The `/setup` line waits for the same answer.
- **The website page, the changelog version, the tag, the public flip (MUST 4 to 6)**:
  slice B, after the decision above.
- **The fully blank machine (MUST 2), as the prompt words it.** Blocked by the interactive
  `/login`: see "Verify", first paragraph. What was run instead is the closest approximation
  a session can build, and its limits are written down.
- **`/fleet` on iTerm2 (SHOULD)**: not run; still a Proof due.
- **`native-commands.md` re-check (SHOULD)**: the sandbox runs the same 2.1.288 binary the
  sheet was written against; nothing to re-check on this machine.

## Files touched

Work commit 1 (`cd5642d`): `INSTALL.md`, `README.md`, `examples/job-search/CLAUDE.md`,
`examples/software/CLAUDE.md`, `templates/*/CLAUDE.md` (six),
`.claude/skills/new-project/SKILL.md`, `.claude/skills/update/SKILL.md`.
Work commit 2: `.claude/skills/setup/SKILL.md`, `docs/en/the-state.md`,
`docs/fr/the-state.md`, `CHANGELOG.md`.
State commit: `casp/state.json` (arbitration, pointers), `casp/now.md`, `casp/roadmap.md`,
this log.

## Verify

**The blank machine cannot be reached headless, and the reason is measured.** Four one-turn
probes from the kit clone, same binary 2.1.288:

| HOME | config dir | env | result |
|---|---|---|---|
| empty | fresh | `env -i` | `Not logged in · Please run /login` |
| empty | fresh, with `oauthAccount` and trust copied in | `env -i` + `USER` | `Not logged in` |
| real | `CLAUDE_CONFIG_DIR` fresh | full env | `Not logged in` |
| real | real | `env -i` | `ok` |

The login state lives in `~/.claude/` (the keychain item alone, account `juste`, is not
enough); a fresh config dir only logs in through the interactive `/login`, which opens a
browser. That is `INSTALL.md` step 5, by nature not scriptable. Also observed: without
the trust dialog answered once, `-p` prints `Ignoring 13 permissions.allow entries from
.claude/settings.json: this workspace has not been trusted`, and the kit's allowlist is
void. Step 5 covers both ("log in", "answer yes").

**What was run instead** (sandbox under the session scratchpad):
`git clone` of the work commit `cd5642d` (step 4 as amended), no `.kit/`, `PATH` reduced
to symlinks of `node npm npx git jq claude` (no `casp`), `npm_config_prefix` pointing into
the sandbox so `/setup`'s install lands there, the real `~/.claude/` (logged in), and a
`projects[<sandbox path>].hasTrustDialogAccepted = true` entry added to `~/.claude.json`
for the run and removed at close. What this approximation does not test: steps 1 to 3 of
`INSTALL.md`, the login, and a machine without the author's user-level skills (`casp`,
`next`, `cto`, `fleet`, `chain`, `audit-batch`, `humanizer` are shadowed here; `/setup`,
`/new-project`, `/day`, `/learn`, `/update`, `/notify` are not).

Probe 2, `claude -p "bonjour …"` with the four `/setup` answers in the message and the
install line pre-approved as the tester would (`--allowedTools "Bash(npm install -g
@justethales/casp:*)"`), exit 0. Printed, trimmed:
```
| Outil | Version trouvée | Requis | État |
| Claude Code | 2.1.288 | toute version | ok |
| git | 2.44.0 | toute version | ok |
| Node.js | 22.17.1 | 22 ou plus | ok |
| casp | 0.18.2 | 0.18 ou plus | ok |
| jq | 1.7.1 | toute version | ok |
- `/learn` pour apprendre la méthode chapitre par chapitre, environ quarante minutes au total.
- `/new-project recherche-emploi-comptable` pour créer votre projet tout de suite et apprendre en faisant.
```
`.kit/profile.json` written (`name` Awa, `language` fr, `profile` non-developer, `casp`
0.18.2); `<sandbox>/npm-global/bin/casp --version` → `0.18.2`; `.kit/casp-install.log`
ends on npm's funding notice. One wording defect: "non-développeuse" (fixed, C above).

Probes 3 and 4, first attempt: `/new-project recherche-emploi --profile job-search` and
`/new-project appli-notes --profile software` with the template answers but no
description. Both stopped and asked for the description, exit 0, no folder created:
"Je ne les devine pas : ce que vous écrivez devient la règle du projet, mot pour mot."
Observed, not inferred: the skill does not invent a missing answer. Not a defect.

Probes 3b and 4b, with every answer in the message, exit 0 each. Measured in the sandbox:
```
recherche-emploi  branch: main  commits: 1  placeholders: 0  casp check exit=0
                  casp:check · 14 PASS · 2 WARN · 0 FAIL
  CLAUDE.md:10    words: "Trouver un emploi de comptable à Abidjan"
appli-notes       branch: main  commits: 1  placeholders: 0  casp check exit=0
                  casp:check · 14 PASS · 2 WARN · 0 FAIL
  CLAUDE.md:6     owner's words: "exporter mes notes du mois en CSV"
  CLAUDE.md:59    | Push to a branch that deploys automatically? | Level 1, unless the deployment line at the top of this file names that branch as the normal path; then yes, with the gate green. | this file |
```
The two WARNs: `CASP-SESSION-001 last_session_id is 'pending'` and `CASP-GIT-001
last_commit is 'pending'`, both "expected before the first session closes". Probe 4b also
told the non-developer, unprompted, that the software template is normally offered to
people who write code and went on: correct per the skill.

Probe 5b, `/day --dry-run` from a fresh `claude -p` with the two projects under
`my-projects/`, exit 0:
```
| Projet | Phase | Prochaine étape | Dernier point de sauvegarde | État |
| appli-notes | 0/4 | phase-1-walking-skeleton | 2026-10-03 | prête, à confirmer |
| recherche-emploi | 0/5 | phase-1-application-kit | 2026-10-03 | prête, à confirmer |
```
No permission word in any probe output (`grep -iE 'permission|denied|refus|not allowed'`
over probes 2 to 5b: zero refusals). **This closes Proof due 1 of the roadmap list**: the
`(cd my-projects/<x> && casp status)` form ran from a fresh `claude -p` with real
projects, under the kit's allowlist, without a prompt.

Probe 6, `/next recherche-emploi --solo "première tranche d'un nouveau projet"`, bounded to
three turns: `Error: Reached max turns (3)`, exit 1, no text. Afterwards the project's
`casp/state.json` carried `arbitration.shape = solo`, `by = "next --solo"`, and phase-1
files existed (`applications.md`, `_common/email-candidature.md`, `_interview/`). The
transcript of the run (`~/.claude/projects/<sandbox>/…jsonl`) contains the marker sentence
of the author's user-level `/next` ("Fork local du skill") and not the kit's ("the user
never changes folder"): **the user-level skill ran, in `-p` too**, and reached the right
cockpit by the model's reading of the arguments, not by the kit's text. Fourth observation
of the collision; the pass criterion's third leg is not proven by this run.

Lint over the files touched: `grep -rn '{{'` on both sandbox projects → 0; `casp check` on
the kit → exit 0 after every edit.

## Deferred / risks

- The pass criterion's third leg, `/next <project> --solo "…"` starting through the kit's
  own `/next`, cannot be observed on a machine where `~/.claude/skills/next` exists. Proof
  due 6 (the blank machine) covers it; the author can also produce it in a fresh macOS user
  account, `INSTALL.md` steps 3 to 5 as written, about fifteen minutes.
- Session B links "the zip of the tagged release" from the website page; with step 4 now
  on `git clone`, the page should give the clone line first and the zip second, same order
  as `INSTALL.md`.
- The trust entry for the sandbox path was removed from `~/.claude.json` at close
  (`jq 'del(.projects["<sandbox>"])'`); the sandbox itself lives in the session scratchpad
  and is not kept.

## Decisions taken without the user

- **`git clone` as the primary install path, zip as fallback.** Level 2: `INSTALL.md` and
  one guard line in `/update`; way back: `git revert cd5642d` restores the zip wording.
  Reason: step 2 already requires git, and `/update` cannot work on a zip.
- **The `/setup` wording rule** (no gendered noun from a first name). Level 2, one
  paragraph; way back: delete it.
- **The manual's fresh-project line** (`14 PASS · 2 WARN · 0 FAIL`). Level 2; way back:
  delete the paragraph in both files.
- **The six Proofs due consolidated in `roadmap.md`.** Level 2, state surface; way back:
  delete the block.

## CASP state + housekeeping

- No `casp ship`: the phase is not finished. `last_session_id` advances to this log;
  `next_prompt` unchanged, still `queued`; `arbitration` for `phase-3-release`, `solo`, by
  `cto-kit-006`, stays valid for slice B.
- `now.md` rewritten for slice B.
- `casp close --yes`, `casp check` 0; three commits (work, work, state); push.

## End-of-session

Next: the user answers the collision question (recommendation: document + `/setup` line,
no prefix). Then `/next kit`, slice B: `README.md` section, `/setup` line, the website page
in `ThalesAndHisAiCtoClaude.com` under its own `CLAUDE.md`, `CHANGELOG.md` `[0.1.0]`, tag on
the user's go, `casp ship phase-3-release --log <id>`, a `casp new discussion` as the next
prompt, public flip by the user.
