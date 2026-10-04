---
# No `phase:` key on purpose: phase-3-release is not finished. The tag, the public flip and
# the website push are the user's; the phase ships in the session that observes them.
---

# 26-10-04-002 — phase-3-release, slice B : v0.1.0 cut, the `/kit` page written, the tag left to the user

**Session prompt :** `docs/plan/sessions/PHASE-3-RELEASE.md`, MUST 4 and 5 and the three SHOULD items.
**Previous session end :** `db43448` (session 007: README carries the plugin decision, prompt marks MUST 1 to 3 done).
**Delegation :** none. Everything inline, plus one headless `claude -p` probe for Proof due 1.
No §7.1 audit: the slice holds no logic, no auth, no schema (a static page, a changelog cut,
two documentation sheets); the rule's skip list covers it.
**State at session start :** tree clean, `origin/main` = `HEAD`, cockpit current with casp 0.18.2.
Opened by `/thales:cto kit` (first interactive use of the plugin by the user), arbitration
`solo` re-recorded as `cto-kit-008`, then `/thales:next kit`.

## Proof due 7 — interactive coexistence on the author's machine (closed in part)

Reported by the user in the session, not captured by a command: `/thales:cto` ran the plugin's
skill from an interactive `claude` at the kit root, and typing `/thales:` listed the plugin's
commands (`/thales:day` among them). Captured by command, 2026-10-04:

```
$ claude --version
2.1.289 (Claude Code)
$ claude plugin list
Skills-directory plugins (.claude/skills/*):

  ❯ thales@skills-dir
    Version: 0.1.0
    Scope: project
    Path: ./.claude/skills/thales
    Status: ✔ loaded
```

Still open inside proof 7: whether `/next` still loads the personal skill in the same session,
and whether the `/thales:` commands appear right after the first trust dialog or only after
`/reload-plugins`. Both are one line from the user.

## Proof due 1 — the project form `(cd my-projects/<x> && casp status)` from a fresh `claude -p` (closed)

A throwaway project was made from `examples/job-search` (`cp -R`, `git init -b main`, one
commit), then, from the kit root:

```
$ claude -p "/thales:casp demo-job-search status" --output-format text
Project `demo-job-search` is the only one under `my-projects/`, so I used it. No `casp/schedule.json` exists. `.kit/profile.json` is missing, so I could not determine the profile and kept the developer wording.

```
casp-managed-project · branch main · HEAD 8e68873

STATE
────────────────────────────────────────
  current_phase    phase-1-application-kit
  next_phase       phase-2-first-wave
  next_prompt      docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  last_session_id  26-10-03-002-first-wave
  last_commit      5e61803

  progress  ############............  1 shipped - 1 queued - 3 backlog

NEXT PROMPT
────────────────────────────────────────
  path     docs/plan/sessions/PHASE-2-FIRST-WAVE.md
  status   queued
  log      pending
  # Session — phase-2-first-wave : The first employer folder, sent by the owner before the next
  > **Status : QUEUED.** Drafted at the close of session `26-10-03-001` (phase 1 shipped:
[…]
One observation from the board itself: `last_commit` in the state is `5e61803` while HEAD is `8e68873`, a single throwaway commit made for a proof. The focus says the Meridian folder is ready and waits on the owner sending it, so phase 2 stays queued until a date lands in the tracking file.
exit=0
```

The skill resolved the only project under `my-projects/`, ran the project form without a
permission prompt in `-p`, and printed the board. The throwaway project was removed after
the capture (`my-projects/` is ignored by git).

## Scope shipped this session

### A — `ThalesAndHisAiCtoClaude.com` : the `/kit` page and the homepage link (NEW, uncommitted in that repository)

- `src/routes/kit/+page.svelte` (new, 150 lines): what the kit is, who it is for (two
  cards: people who never opened a terminal, developers already on Claude Code), the three
  install steps in the order of `INSTALL.md` with the two install lines and the message of
  step 3 verbatim, the clone line, the zip link
  `https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/archive/refs/tags/v0.1.0.zip`
  (built by GitHub from the tag, no artefact to upload), a GitHub button. Same layout
  classes as `src/routes/casp/+page.svelte`. English only, like the other product pages.
- `src/lib/components/HomePage.svelte`: a hero button to `/kit` (Download icon, after the
  PDF guide button) and a product card "Claude Workflow Kit" after CASP.
- `src/lib/i18n/{en,fr,es}.ts`: keys `downloadKit` and `kitDesc`.
- Not built, not type-checked: that repository's `CLAUDE.md` forbids inline builds without
  the user's approval. Gate after the push: `/verify-thales`.

### B — `CHANGELOG.md`, `README.md`

- `[Unreleased]` → `[0.1.0] - 2026-10-04` with the download page line; a new empty
  `[Unreleased]` ("Nothing yet."); a `### Untested at this release` list under 0.1.0, the
  Proofs due of `roadmap.md` in release-notes form.
- README "Release status" (EN and FR): v0.1.0 is the first release, Claude Code 2.1.289,
  the download page, and the pointer to the untested list.

### C — `docs/en/native-commands.md`, `docs/fr/native-commands.md` re-checked against 2.1.289

Method: `strings` on `/usr/local/Caskroom/claude-code@latest/2.1.289/claude`, then each
description cell of the 25 rows searched verbatim; 15 found as such, 10 are the manual's own
wording (aliases, notes) and were read by eye. Two rows changed between 2.1.288 and 2.1.289:

- `/reload-plugins` is now in the command table: `name:"reload-plugins",description:"Activate
  pending plugin changes in the current session",argumentHint:"[--force]"`.
- `/model` reads `Set the AI model for Claude Code`; the 2.1.288 wording "Set model for this
  session (not persisted)" now belongs to another entry of the table (a FleetView variant).

Both sheets: version paragraph (2.1.289, 2026-10-04, the two changes named), table header,
the two rows. The 2.1.288 binary is no longer on disk, so no full table diff; the row-by-row
check above is the proof.

### D — `casp/` (CTO-owned)

- `state.json`: `arbitration` re-recorded by this session (solo, reason in the field).
- `roadmap.md`: row 1 marked done (sessions 006 and 007), row 2 in progress, the three
  defects of session 004 marked fixed since 006 (they were still listed as open while the
  files had the fix), Proofs due renumbered in order (7 and 6 were swapped), "Updated" line.
- `now.md`: focus, next actions and distractions rewritten for the hand-over below.

## What did NOT ship — and why

- **The tag `v0.1.0`, the public flip, the website push**: level 1, the user's. The session
  stopped there on purpose. The ordering it defends: commit, tag, push the kit, flip, then
  push the website, so the zip link is never live while it returns 404.
- **The commits themselves**: the auto-mode classifier refused the session's commit
  commands ("Unrequested Commit in a Connected App"). Every change is in the working trees
  of the two repositories; the commands are in "End-of-session" below, pathspec by pathspec.
- **`/thales:fleet` on iTerm2 with two workers** (SHOULD 1): restated as Proof due 4. Two
  worker sessions are a spend that needs the user's signature; the user was not in the
  session at that point.
- **`casp ship phase-3-release`**: not run. The phase ships when the tag and the flip exist;
  "Never mark an item done without its proof".

## Files touched

Kit (`thales-gnimavo-claude-workflow-kit`): `CHANGELOG.md`, `README.md`,
`docs/en/native-commands.md`, `docs/fr/native-commands.md`, `casp/state.json`,
`casp/roadmap.md`, `casp/now.md`, `session-logs/26-10-04-002-phase-3-release-b.md`.

Website (`ThalesAndHisAiCtoClaude.com`): `src/routes/kit/+page.svelte` (new),
`src/lib/components/HomePage.svelte`, `src/lib/i18n/en.ts`, `src/lib/i18n/fr.ts`,
`src/lib/i18n/es.ts`. One untracked draft in that tree (`draft/how-we-built-sh0/…`) is not
this session's and was left alone.

## Verify

- Proof 7 and Proof 1: raw output above.
- Native commands: `rows=25 ok=15 miss=10` from the verbatim search; the two changed rows
  quoted from the binary above.
- `casp check` after `casp close --yes`: pasted in "CASP state" below.
- Website: nothing run (no-inline-builds rule). `Proof due: /kit renders and the homepage
  shows the button and the card — on thalesandhisaictoclaude.com — blocked by the push,
  which waits for the flip.`

## Deferred / risks

- The website page is unbuilt. A Svelte or Tailwind slip there is caught only by
  `/verify-thales` after the push, or by a build the user approves before it.
- The zip link on the page is dead until the repository is public: pushing the website
  before the flip advertises a 404 for the time between the two.
- `plugin.json` already says `0.1.0`; a later release must bump it with the changelog.

## Decisions taken without the user

- **`.kit/profile.json` absent on the author's machine, treated as the developer profile**
  (the `<first_run>` clause would run `/thales:setup`; the kit's own sessions have never
  needed it). Way back: run `/thales:setup` once at the kit root.
- **Tag target = the kit's work commit** (the one holding `CHANGELOG.md`), as the prompt
  says literally; the state commit comes after it. Way back: tag the state commit instead.
- **Proofs due renumbered** so that 6 and 7 read in order; the changelog's untested list
  names them by content, not by number.
- **Fleet SHOULD restated, not run** (cost; see above). Way back: `/thales:fleet` on a
  throwaway project in a session where the user says go.
- **No §7.1 audit** (static page, documentation, no logic). Way back: an `Explore` pass on
  the `/kit` page before the website push.

## CASP state + housekeeping

`casp close --yes`: `last_commit → db43448`, `last_session_id → 26-10-04-002-phase-3-release-b`.
`casp check`, 2026-10-04, exit 0 (the WARN is the uncommitted cockpit this log hands over):

```
casp:check · 17 PASS · 1 WARN · 0 FAIL
──────────────────────────────────────────────────────────────────────
  PASS  state.json has 'updated_at'
  PASS  state.json has 'last_session_id'
  PASS  state.json has 'last_commit'
  PASS  state.json has 'current_phase'
  PASS  state.json has 'phases_shipped'
  PASS  state.json has 'next_phase'
  PASS  state.json has 'next_prompt'
  PASS  the cockpit has shipped and still names something to start
  PASS  next_prompt file exists · docs/plan/sessions/PHASE-3-RELEASE.md
  PASS  next_prompt status is 'queued' · docs/plan/sessions/PHASE-3-RELEASE.md
  PASS  last_session_id has a matching session log · session-logs/26-10-04-002-phase-3-release-b.md
  PASS  every shipped phase has a declaring session log · all 3 shipped phase(s)
  PASS  last_commit matches HEAD · state=db43448 HEAD=db43448
  PASS  phases_shipped is unique (3 entries)
  PASS  all 4 prompt(s) have canonical status
  PASS  every shipped prompt has a session_log pointer
  PASS  the queued next_after chain is coherent · 1 chained prompt(s)
  WARN  CASP-WORKTREE-001 casp / sessions / logs have uncommitted changes · M casp/now.md ·  M casp/roadmap.md ·  M casp/state.json · ?? session-logs/26-10-04-002-phase-3-release-b.md
        → commit + push before the session closes

⚠ 1 warning (not blocking).
```

## End-of-session — what the user runs, in this order

```
# 1. Kit: the work commit (the tag goes on it)
git commit CHANGELOG.md README.md docs/en/native-commands.md docs/fr/native-commands.md \
  -m "release(kit): v0.1.0 — changelog cut from [Unreleased] with the untested list, README release status points at the download page, native-commands sheet re-checked against Claude Code 2.1.289"
git tag -a v0.1.0 -m "v0.1.0 — first release"
# 2. Kit: the state commit
git add casp/ session-logs/
git commit casp/ session-logs/ -m "chore(casp): session 008 — v0.1.0 cut, /kit page written, tag and flip handed to the user"
casp check && git push && git push origin v0.1.0
# 3. The flip (GitHub settings, or:)
gh repo edit ThalesGnimavo/thales-gnimavo-claude-workflow-kit --visibility public --accept-visibility-change-consequences
# 4. Website, after the flip
cd /Users/juste/ZeroSuite/ThalesAndHisAiCtoClaude.com
git add src/routes/kit/+page.svelte
git commit src/routes/kit/+page.svelte src/lib/components/HomePage.svelte src/lib/i18n/en.ts src/lib/i18n/fr.ts src/lib/i18n/es.ts \
  -m "feat(kit): /kit page for the Claude Workflow Kit and the homepage link and product card (EN, FR, ES)"
git push
# 5. Next session: /thales:next kit ships phase-3-release once the tag and the flip are observed.
```

## Addendum — the user's go, same session

The user switched the session to bypass-permissions mode and said: execute all the commands.
Run by the session from that point, 2026-10-04:

```
$ git commit CHANGELOG.md README.md docs/en/native-commands.md docs/fr/native-commands.md -m "release(kit): v0.1.0 — …"
5c92d1a release(kit): v0.1.0 — changelog cut from [Unreleased] with the untested list, README release status points at the download page, native-commands sheet re-checked against Claude Code 2.1.289
$ git tag -a v0.1.0 -m "v0.1.0 — first release" && git tag -n1 v0.1.0 && git describe --tags
v0.1.0          v0.1.0 — first release
v0.1.0
```
