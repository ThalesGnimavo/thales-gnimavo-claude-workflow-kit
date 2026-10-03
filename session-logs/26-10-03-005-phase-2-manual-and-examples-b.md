---
phase: phase-2-manual-and-examples
---

# 26-10-03-005 — phase-2-manual-and-examples, slice B : The French manual, the native-commands sheet, the wording by profile

**Phase finished.** Slice B shipped; `phase-2-manual-and-examples` is shipped by this
session and `phase-3-release` is queued with its prompt.

**Session prompt :** `docs/plan/sessions/PHASE-2-MANUAL-AND-EXAMPLES.md`.
**Previous session end :** `59b57ce` (session 004, slice A shipped, phase left queued).
**Delegation :** three `general-purpose` sub-agents in parallel for the translation (two
chapters each, context rules quoted in the brief, one `Write` per file), one read-only
`Explore` sub-agent for the post-implementation audit, one headless `claude -p "/casp kit"`
probe in the background. Reason: the six English chapters were final and independent; the
native-commands sheet depends on the installed binary and was written inline.
**State at session start :** phase 1 shipped, phase 2 queued with its prompt and its
arbitration (`solo`, by `chain-runner`), cockpit current with casp 0.18.2, tree clean,
`origin/main` = `HEAD`. Autonomous session inside a chain started by the user: no question
possible; the chain is the go for build, commit and push.

## Scope shipped this session

### A — `docs/fr/` (NEW): the manual in French, seven files
`README.md`, `a-day.md`, `a-session.md`, `a-project.md`, `the-state.md`, `pitfalls.md`,
`native-commands.md`: same file names, same section order, same number of headings and
of fenced blocks as `docs/en/`. Every fenced block is byte-identical to the English one
(raw outputs of real runs, `casp` prints English). The reader is addressed with « vous »;
the only « tu » forms are inside quoted lines the user says to Claude. Kit words fixed
across the seven files: constitution, cockpit, session, tranche, point de sauvegarde,
prompt en file, journal de session, feuille de route, preuve, vérification de sortie.

### B — `docs/en/native-commands.md` and `docs/fr/native-commands.md` (NEW)
Checked against `2.1.288 (Claude Code)`. Method, stated in the sheet: the command table
embedded in the installed binary (`strings` on
`/usr/local/Caskroom/claude-code@latest/2.1.288/claude`, then
`name:"<command>",description:"…"`), so every one-line description is the program's own;
three commands run from `claude -p`; everything interactive listed under "To confirm on
your machine" with the command that confirms it. Five commands the root `CLAUDE.md` and
`pitfalls.md` rely on, nineteen a first week meets. Six commands whose description the
program computes at run time are marked as this manual's wording.

### C — Wording by profile (MODIFIED): `/casp`, `/next`, `/update`, `/day`, `/new-project`
Table in `.claude/skills/README.md`, "Wording by profile": a `non-developer` reads "save
point" for commit, "N files changed since the last save point", "send to the online
copy", and never a sha, a hash or a branch. Each of the five skills carries its own lines:
`/casp` header reduced to `<project>`, `LAST 5 SAVE POINTS` and `SINCE THE LAST SAVE
POINT` with `git log --format='%cs %s'`; `/next` first line and close ("two save points:
the work, then the cockpit"); `/update` ("N updates are waiting", changes listed without
hash); `/day` column `Last save point`; `/new-project` close. The commands run do not
change; only the reply does. `/update` gains `Read` in `allowed-tools` for the profile.

### D — `README.md`, `CLAUDE.md`, `CHANGELOG.md`, `docs/en/README.md` (MODIFIED)
No file says any longer that the French manual or the native sheet arrive later. Release
status (EN and FR): what ships today, what remains before v0.1.0 (blank-machine test,
download page). `<language>` block: both manuals, point to the user's language.
`[Unreleased]`: three lines.

### E — `casp/` and `docs/plan/sessions/PHASE-3-RELEASE.md` (state)
Phase 3 drafted: two slices (defects fixed and blank-machine test; website page, tag on
the user's go, public flip by the user). `roadmap.md`: Next-3 rewritten, scoreboard,
"Shipped this week", a new Blocked row (skill-name collision, level 1), the
launch-critical item restated. `now.md` refreshed.

## What did NOT ship — and why
- The three template and skill defects from session 004: still in `roadmap.md`, now MUST
  1 of phase 3 (prompt, MUST NOT: no change to a skill's behaviour beyond the wording).
- The other half of the permission Proof due (`(cd my-projects/<x> && casp status)` from a
  fresh `claude -p`): `my-projects/` is still empty. Carried to phase 3 SHOULD.
- `/fleet` on iTerm2: not in this prompt. Carried to phase 3 SHOULD.

## Files touched

```
docs/fr/{README,a-day,a-session,a-project,the-state,pitfalls,native-commands}.md   new
docs/en/native-commands.md                                                         new
docs/en/README.md  README.md  CLAUDE.md  CHANGELOG.md                              modified
.claude/skills/README.md  .claude/skills/{casp,next,update,day,new-project}/SKILL.md modified
docs/plan/sessions/PHASE-3-RELEASE.md  session-logs/                               state
casp/{state.json,now.md,roadmap.md}                                                state
```

Work commits: `db4536f` (slice B), `2eaa893` (audit fixes).

## Verify

- `claude --version`, 2026-10-03: `2.1.288 (Claude Code)`. `casp --version`: `0.18.2`.
- Command table extraction: `strings -n 8 <binary> > /tmp/claude-strings.log` (372 711
  lines), `grep -oE 'name:"[a-z][a-z0-9-]*",description:"[^"]{3,160}"' | sort -u`:
  108 entries; the commands without a `description` key (`rewind`, `exit`, `doctor`,
  `init`, `release-notes`, `login`) found by `name:"<x>"` with `get description()` or
  `load:()=>import(`. `rewind` carries `supportsNonInteractive:!1`.
- Three `claude -p` runs, 16:20, raw:
  ```
  ### claude -p "/version"
  `/version` n'est pas une commande installée ici. Voici les versions relevées : [table]
  ### claude -p "/status"
  /status isn't available in this environment.
  ### claude -p "/help"
  /help isn't available in this environment.
  ```
  Observed: native commands are refused by the program in `-p`; `/version`, absent from
  the non-interactive table, was answered by the model as a question.
- EN/FR parity, after the audit fixes (headings `^#`, fenced lines, lines):
  ```
  README           h:2/2   code:0/0   lines:35/36
  a-day            h:7/7   code:4/4   lines:102/106
  a-session        h:10/10 code:10/10 lines:147/153
  a-project        h:9/9   code:8/8   lines:128/134
  the-state        h:9/9   code:14/14 lines:157/165
  pitfalls         h:12/12 code:4/4   lines:126/132
  native-commands  h:10/10 code:8/8   lines:120/126, table rows 28/28
  ```
  Fenced-block diff EN vs FR on the six chapters (audit sub-agent, `awk` extraction):
  empty. Accent grep (`etat|deja|tres|meme|apres|premiere|derniere|verifie|cree|regle`)
  outside code: empty. Emoji grep: only `✓` inside raw `casp check` output, same as EN.
  Author product names: none. `grep -rn 'next release\|later release\|ships with v0.1.0'
  README.md CLAUDE.md docs/`: only the generic rule at `CLAUDE.md:11`.
- Headless probe, 16:21, `claude -p "/casp kit" --output-format text` from the kit root,
  `CLAUDECODE` left set: a full snapshot printed, `casp status` and `git log` ran, no
  permission refusal. **Finding:** the snapshot carried `NEXT 3`, `PHASE` and
  `ASK ME : /casp where | roadmap | changelog | version | ship | stack | architecture`,
  which are the author's user-level `~/.claude/skills/casp`, not the kit's
  `.claude/skills/casp` (whose `ASK ME` line is `status | check | where`). On a machine
  that has both, the user-level skill answered. Session 004's probe output ("focus, next 3,
  last 5 commits, working tree, phase, arbitration") shows the same blocks: it ran the
  same user-level skill without noticing. The permission half of the proof stands (the
  commands passed from a fresh `claude -p`); the "kit skill works from a fresh process"
  half is not proven on this machine and goes to the blank-machine test.

### Post-implementation audit (Explore sub-agent)
Verdict `GO-WITH-FIXES`. FAIL: three places still printed a hash to a `non-developer`
(`/update` pulled commits, `/next` path C, `/casp` no-cockpit fallback): fixed with
`git log --format='%cs %s'`. WARN: profile notes inside example blocks (`/casp`, `/day`)
could be printed verbatim: moved to prose. WARN: three sentences in `native-commands.md`
asserted unobserved behaviour (`/model` and `/clear`, `/skills` listing the kit, `/rewind`
as fact): rewritten as the program's word or moved to "To confirm", `/skills` and
`/model` added there. WARN: three French wordings (`Vérifiée contre`, `description d'une
ligne`, `au niveau des fichiers anglais`): fixed. PASS: tables, accents, emoji, product
names, « vous », cross-references, EN/FR code blocks. All applied in `2eaa893`.

## Deferred / risks
- **Skill-name collision** (above). Level 1: renaming the kit's skills with a prefix binds
  every phase and every chapter; documenting it in `INSTALL.md` is cheaper but leaves a
  developer with user-level skills on a silent wrong path. Put to the user in phase 3
  slice A before the website work; row in `roadmap.md` Blocked.
- The native sheet is checked against one build on one machine. Phase 3 SHOULD re-checks
  it on the test machine; the sheet tells the reader to trust `/help` over the table.
- `docs/fr/` is a translation by three sub-agents with one audit sample each of thirty
  lines; the prose outside the samples was not read line by line by this session. The
  `now.md` "15 minutes" action is a French read of `a-day.md` and `native-commands.md`.
- `/update`'s `allowed-tools` now lists `Read`; the permission behaviour of that line on a
  fresh install is untested (same Proof due as the others).

## Decisions taken without the user
- Translation delegated to three parallel sub-agents, two chapters each, rather than
  inline: the chapters were final and independent, and 694 lines read plus written inline
  would have doubled this session's context. Way back: none needed; the files are the
  deliverable.
- Native-commands method: the binary's command table rather than a `/help` screen, since
  the session has no screen; the sheet states the method and the limit. Way back: phase 3
  re-checks against `/help` on the test machine (roadmap, launch-critical 1).
- Wording table placed in `.claude/skills/README.md` with concrete lines repeated in each
  skill: a skill is loaded alone, so a pointer without the lines would not act. Way back:
  delete the five blocks, keep the table.
- `/update` gets `Read` in `allowed-tools`: the only way to read the profile that the
  skills README prescribes. Way back: drop `Read` and treat every `/update` user as a
  developer.
- Phase 3 drafted as two slices with the tag and the public flip as level 1 inside the
  session: the chain contract never covers a release. Way back: split into two prompts.
- The French `native-commands.md` keeps the program's descriptions in English inside the
  table, with French glosses only where the English did not quote the program: the
  reader compares with `/help`, which prints English. Way back: translate the column.
- Session log id `…-phase-2-manual-and-examples-b`, mirroring 004.

## CASP state + housekeeping
- `casp ship phase-2-manual-and-examples --log 26-10-03-005-phase-2-manual-and-examples-b`;
  pointers moved by hand: `current_phase` = phase 2, `next_phase` = `phase-3-release`,
  `next_prompt` = `docs/plan/sessions/PHASE-3-RELEASE.md`, `phases_queued` += phase 3.
- `arbitration` left as is (phase 2, solo, chain-runner): it no longer matches
  `next_phase`, which is the intended state: phase 3 needs its own arbitration (`/cto kit`
  or `/next kit --solo`).
- `casp close --yes`, `casp check` 0; state commit by pathspec; push.

## End-of-session
Next: `/cto kit` (arbitrate phase 3), then `/next kit`. Slice A starts with the three
defects, then the blank-machine test on a machine without `~/.claude/`, then the level 1
question on the skill-name collision.
