# What I'm doing NOW

> **Updated** : 2026-10-04 (session 007: the skill-name collision decided and implemented, the kit's commands are `/thales:<name>`; phase 3 stays queued for the release slice).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**The collision is closed by construction: every kit command is a skill of a project plugin
named `thales` (`.claude/skills/thales/`), invoked as `/thales:setup`, `/thales:next <project>`
and so on; `INSTALL.md` is down to three human steps, Claude clones the kit and installs the
rest through `/thales:setup`'s bootstrap flow.** Measured on Claude Code 2.1.288: manifest
valid, `thales@skills-dir` loaded from a trusted kit root, the kit's skill text loaded in
`-p`. Left for the release slice: the website page, `[0.1.0]`, the tag on the user's go, the
public flip by the user, and the interactive proofs on the author's machine (brief §8.2).
The repository is **private** until then.

---

## Concrete next action if I have…

### 15 minutes

On the author's machine, a new interactive `claude` at the kit root: `claude plugin list`
shows `thales@skills-dir`; `/thales:next job-search` loads the kit's text (first line
quoted) while `/next` still loads the personal skill. Paste both in the next log.

### 1 hour

`CHANGELOG.md` `[Unreleased]` → `[0.1.0] - <date>` with the release notes listing the
Proofs due still open (`roadmap.md`); `plugin.json` already says `0.1.0`.

### Half a day

`/thales:cto kit` (arbitration, then it chains on `/thales:next kit`), release slice: the `/kit` page in `ThalesAndHisAiCtoClaude.com` (three
steps, same order as `INSTALL.md`), the tag `v0.1.0` on the user's go,
`casp ship phase-3-release --log <id>`, a `casp new discussion` as the next prompt. Then the
casp repository's own brief (plugin `casp`, separate chantier).

---

## Don't get distracted by

- **The website page before the collision answer and the changelog version**: it links a tag that does not exist yet.
- **A `fleet.sh` launcher**: the `osascript` line in `/thales:fleet` is the launcher until a real
  iTerm2 run says otherwise.
- **French templates**: decided in session 004, `docs/en/a-project.md`: templates stay English, the owner asks for a translation in the first session; no `templates/<profile>/fr/`.
- **The casp repository's plugin brief**: separate repository, separate session; the kit does not install that plugin.
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
