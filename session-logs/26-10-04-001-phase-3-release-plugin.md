# 26-10-04-001 — phase-3-release, the collision closed : every kit command becomes `/thales:<name>`

**Phase not finished.** `phase-3-release` stays queued for the release slice (website page,
`[0.1.0]`, tag on the user's go, public flip). No `phase:` key on purpose.

**Session prompt :** `docs/plan/sessions/PHASE-3-RELEASE.md`, MUST 3 (the collision
decided), executed from the user's brief of 2026-10-04 (`BRIEF-kit-builder.md`, on the
Desktop), which replaced the "document, do not prefix" recommendation of session 006.
**Previous session end :** `ad673c7` (session 006, slice A).
**Delegation :** one `claude-code-guide` sub-agent to confront the brief's claims with the
Anthropic documentation (six questions, each answered with the quoted sentence); one
read-only `Explore` audit (§7.1, 70 files touched). Everything else inline, with headless
probes in three sandbox clones.
**State at session start :** same session as 006, continued after the user's message; tree
clean, `origin/main` = `HEAD`, arbitration `solo` for `phase-3-release` still valid.

## Decision taken (level 1, by the user) and the position rendered before the first edit

The user decided: the kit's commands live in a Claude Code plugin named `thales`, a
skills-directory plugin of the project (`.claude/skills/thales/` with
`.claude-plugin/plugin.json`), invoked as `/thales:setup`, `/thales:next <project>` …
The plugin namespace is the one mechanism Claude Code guarantees against a collision with
a personal, project or native command. The brief was adopted with four amendments, all
stated before the first edit:

1. The pasted message of `INSTALL.md` step 3 reaches a Claude that has no kit file loaded;
   the onboarding flow lives in `/thales:setup`, unreachable before the clone. The message
   now says: clone, then read `INSTALL.md`'s section "For Claude", which points to the flow.
2. The flow's step 5 does not call the user's `~/.claude/skills/{casp,next,fleet,audit-batch}`
   "an old casp install": on the author's machine they are personal forks. Same names as
   casp's skills, offer removal only on an explicit yes, never on a machine where they are
   the person's own skills.
3. `session-logs/` are not rewritten: records of what was typed. The brief's final grep has
   hits there, deliberate. `CHANGELOG.md` past entries likewise. Examples renamed with the
   note the brief asked for.
4. The brief's §7 (clone fails without authentication) is MUST 6 of the phase prompt: the
   repository is private until v0.1.0. Nothing to escalate.

The companion brief for the casp repository (plugin `casp`, `/casp:next`) is a separate
repository and a separate session; the kit does not install that plugin.

## Scope shipped this session

### A — The plugin (`53f5890`, amended as `2c26ad4` → `53f5890`)

- `.claude/skills/thales/.claude-plugin/plugin.json`: name `thales`, version `0.1.0`.
- Fourteen skills moved by `git mv` to `.claude/skills/thales/skills/<name>/`; the skills
  README to `.claude/skills/thales/README.md`. No flat skill left, no `SKILL.md` at the
  plugin root.
- Anchored rename `(?<![\w/:])/(<names>)\b` → `/thales:$1` over `*.md`, `*.json`, `*.sh`,
  excluding `CHANGELOG.md` and `session-logs/`: 455 replacements in 69 files; the paths
  `.claude/skills/<name>` → `.claude/skills/thales/skills/<name>`.
- `CLAUDE.md`: the kit-root start is a technical condition (project plugin, trusted folder,
  headless loads once trusted); tree, skills table, `notify.sh` path.
- `INSTALL.md` (EN, FR): the user's version, three human steps, with amendment 1 and a
  "For Claude" section.
- `/thales:setup`: the bootstrap flow appended (amendment 2).
- `/thales:update`: `/reload-plugins` after a pull. `/thales:chain`: trust required for `-p`
  (measured, below). `docs/{en,fr}/native-commands.md`: `/reload-plugins` row, plugin path.
- `README.md` (EN, FR): three steps, prerequisites (Node for casp, Git on Windows), clone
  wording aligned in both languages. `examples/*/README.md`: rename note. `CHANGELOG.md`:
  two `Changed` entries.

### B — Audit fixes (`ca1a8ab`)

The `Explore` audit returned `GO-WITH-FIXES` with one FAIL: the rename had also hit the
path segment `my-projects/<x>/casp/` (six lines in `new-project`, `day`, `chain`, `fleet`),
which would have made those skills read a folder that does not exist. Fixed, with the
check `grep -rn '/thales:casp/'` → 0. Also applied: `update`'s no-git wording without
"step 4", the bootstrap step 7 asks section 3's questions before writing the profile, step
5 keeps the `npx` fallback on `EACCES`, the phase prompt's history line restored
(`claude -p "/casp kit"`), the plugin README's first line.

## What did NOT ship — and why

- The interactive proofs on the author's machine (brief §8.2 and §8.4): `claude plugin
  list` showing `thales@skills-dir` from an interactive session, `/thales:next <example>`
  loading the kit's text while `/next` loads the personal skill, and whether `/thales:`
  commands appear in the same session right after the first trust dialog. A session cannot
  observe its own startup. Added to `roadmap.md` as Proof due 7, with the commands.
- The release slice (website, `[0.1.0]`, tag, flip): unchanged, after this.
- `allowed-tools` of `/thales:setup` left as is: the installs are meant to prompt.

## Files touched

`53f5890`: 70 files (14 skills moved, 55 edited, `plugin.json` new). `ca1a8ab`: 7 files.
State commit: `casp/now.md`, `casp/roadmap.md`, `casp/state.json`, this log.

## Verify

**Doc check** (sub-agent, quoting `code.claude.com/docs`): a folder under the project's
`.claude/skills/` with `.claude-plugin/plugin.json` loads as `<name>@skills-dir`; it loads
"only from the `.claude/skills/` of the session's primary working directory, and only after
you accept the workspace trust dialog for that folder"; "Trusting a parent folder or running
with `-p` isn't enough"; a personal copy under `~/.claude/skills/` wins over the project's;
`${CLAUDE_SKILL_DIR}` exists; a root `SKILL.md` would be `/<name>`.

**Measured on a fresh clone of `ca1a8ab`, Claude Code 2.1.289** (sandbox under the session
scratchpad; the trust entry for that path added to `~/.claude.json` for the run and removed
after):
```
=== 1. validate ===
✔ Validation passed
=== 2. flat skills ===
thales
no root SKILL.md
=== 3. regex residual (outside CHANGELOG/session-logs) ===
0
=== 3b. path damage ===
0
=== 4. plugin list, untrusted ===
  ⚠ 1 project-scope directory under ./.claude/skills/ that may load as a plugin was skipped because this workspace was n[ot trusted]
=== 4b. plugin list, trusted ===
  ❯ thales@skills-dir
    Version: 0.1.0
    Scope: project
    Path: ./.claude/skills/thales
    Status: ✔ loaded
=== 5. negative from examples/job-search ===
0
=== 6. -p /thales:casp kit (2.1.289) ===
kit · ca1a8ab on main
transcript: kit-body=1 zs-body=0
=== 7. casp check ===
casp:check · 17 PASS · 1 WARN · 0 FAIL
```
Line 6 reads the run's transcript for a sentence of each skill's **body** (the kit's
`casp`: "You are a status reporter. The user opens a sessio"; the author's personal `casp`:
"You are a **status reporter**, not a planner. Read"): the kit's text loaded, the personal
one did not. The same was observed twice on 2.1.288 earlier in the session, with and
without `--plugin-dir`, on a sandbox that still had the flat skills. The doc's "`-p` isn't
enough" is about an untrusted folder: with the folder trusted once, `-p` loads the plugin.
So `/thales:chain` works on a trusted kit; `chain/SKILL.md` says so.

Not observed: the interactive items above (Proof due 7).

**Incident during the session.** `claude` started exiting 137 in every new sandbox: the
user's Homebrew update to 2.1.289 had installed the binary with `com.apple.quarantine`, and
Gatekeeper killed it ("Apple could not verify 'claude' is free of malware"). Fixed with
`xattr -d com.apple.quarantine /usr/local/Caskroom/claude-code@latest/2.1.289/claude`;
`claude --version` → `2.1.289 (Claude Code)`. Not a kit matter; recorded because it cost
the proof battery two silent runs.

## Deferred / risks

- A personal `~/.claude/skills/thales/` with a manifest would shadow the kit's plugin
  (doc). Name reserved by the kit; nothing to do unless it happens.
- `INSTALL.md`'s bootstrap path has never been run by an outside person: Proof due 6
  stands, now on the three-step version.
- `plugin.json` says `0.1.0` while `CHANGELOG.md` still says `[Unreleased]`; the release
  slice closes the gap the same day it tags.

## Decisions taken without the user

- **Session logs not rewritten by the rename** (amendment 3). Level 2; way back: run the
  same regex over `session-logs/`.
- **`plugin.json` version `0.1.0`** before the changelog flips. Level 2; way back: edit one
  field.
- **`/reload-plugins` row in `native-commands.md` marked as manual wording** (not in
  2.1.288's `/help` table). Level 2; the release slice re-checks against 2.1.289.
- **`allowed-tools` of setup unchanged.** Level 2; the installs prompt by design.

## CASP state + housekeeping

- No `casp ship`: the phase is not finished. `last_session_id` advances to this log;
  `next_prompt` unchanged, still `queued`; `arbitration` unchanged.
- `now.md` rewritten; `roadmap.md`: Proof due 7 added.
- `casp close --yes`, `casp check` 0; three commits (work, fixes, state); push.

## End-of-session

Next, in a **new** session (this one runs on 2.1.288 with the old flat skills in context):
`claude` at the kit root, `claude plugin list`, `/thales:next kit`; the first thing to paste
in the next log is the interactive proof (Proof due 7). Then the release slice.
