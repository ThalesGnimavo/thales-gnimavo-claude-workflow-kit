# What I'm doing NOW

> **Updated** : 2026-10-03 (session 005: phase 2 shipped, phase 3 queued with its prompt).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 2 shipped: the manual in English and in French (`docs/en/`, `docs/fr/`, six
chapters each, native commands checked against Claude Code 2.1.288), the two worked
examples, and the wording by profile in `/casp`, `/next`, `/update`, `/day`,
`/new-project`.** Phase 3 is queued with its prompt: the three known defects fixed, the
blank-machine test, the skill-name collision decided, then the website page and the
`v0.1.0` tag on the user's go. The GitHub repository is **private** until v0.1.0.

---

## Concrete next action if I have…

### 15 minutes

Read `docs/fr/a-day.md` as a first-time French reader would, then `docs/fr/native-commands.md`;
note every sentence that reads as a translation rather than as French. Compare one table
with its English row.

### 1 hour

Fix the three defects listed under "Queued — non-critical" in `roadmap.md` (two template
lines, one skill line), re-run the `/new-project` proofs on a throwaway project: it is
MUST 1 of phase 3 and needs no decision.

### Half a day

`/cto kit` then `/next kit`: phase 3, slice A. The defects first, then the blank-machine
test on a machine without `~/.claude/` (a fresh user account is enough), every stop of the
tester written in the log; the skill-name collision put to the user as a level 1 question
before the website work starts.

---

## Don't get distracted by

- **The website page and the homepage download link**, phase 3: nothing to link to before v0.1.0.
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
