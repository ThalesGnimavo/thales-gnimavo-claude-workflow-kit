# What I'm doing NOW

> **Updated** : 2026-10-03 (session 006: phase 3 slice A shipped, phase stays queued for slice B).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 3, slice A shipped: the three known defects fixed with proof, `INSTALL.md` step 4
on `git clone` (a zip cannot be updated by `/update`), the first-run test run in a sandbox
(`/setup`, two `/new-project`, `/day`: all pass, two wording defects fixed), six Proofs due
consolidated in `roadmap.md`.** Slice B waits on one level 1 answer: the skill-name
collision with `~/.claude/skills/` (observed four times, in interactive and `-p` sessions).
Recommendation on file: document in `README.md` and have `/setup` print the shadowing
names; do not prefix. Then the website page, `[0.1.0]`, the tag on the user's go, the
public flip by the user. The repository is **private** until then.

---

## Concrete next action if I have…

### 15 minutes

Answer the collision question (session 006 log, "What did NOT ship"), then write the
`README.md` section under a heading a developer will find ("Already using Claude Code
with your own skills?").

### 1 hour

The `/setup` line that lists the names under `~/.claude/skills/` shadowing a kit skill,
`CHANGELOG.md` `[Unreleased]` → `[0.1.0] - <date>`, the release notes with the six Proofs
due still open (`roadmap.md`, "Queued — non-critical").

### Half a day

`/next kit`, slice B: the `/kit` page in `ThalesAndHisAiCtoClaude.com` (its own `CLAUDE.md`
governs it; clone line first, zip second, same order as `INSTALL.md`), the tag `v0.1.0` on
the user's go, `casp ship phase-3-release --log 26-10-03-006-phase-3-release-a` plus the
slice B log, a `casp new discussion` as the next prompt. Optional, fifteen minutes on a fresh
macOS user account: `INSTALL.md` steps 3 to 5 as written, which produces Proof due 6.

---

## Don't get distracted by

- **The website page before the collision answer and the changelog version**: it links a tag that does not exist yet.
- **A `fleet.sh` launcher**: the `osascript` line in `/fleet` is the launcher until a real
  iTerm2 run says otherwise.
- **French templates**: decided in session 004, `docs/en/a-project.md`: templates stay English, the owner asks for a translation in the first session; no `templates/<profile>/fr/`.
- **Renaming the kit's skills now**: the collision with user-level skills is a level 1 decision for phase 3; nothing moves before the user answers.
- **Spanish**, backlog: the blog publishes ES, the kit can follow once FR and EN are stable.

---

## Constraints active today

- Repository private until the blank-machine test passes (phase 3).
- No absolute path, no author-portfolio project name, no credential anywhere in the tree.
- `casp check` is mandatory before push when the casp state was bumped.
- Native command names are verified against the installed binary, never written from memory.

## How to use this file

- **Start of session** : `casp status` reads this + state.json + the next-prompt preview + last 10 commits in one command.
- **End of session** : overwrite the three blocks (focus, next-actions-by-budget, don't-get-distracted).
- **Before push** : `casp check` exits 0. If FAIL, fix inline.
