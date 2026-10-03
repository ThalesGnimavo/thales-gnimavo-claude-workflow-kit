# What I'm doing NOW

> **Updated** : 2026-10-03 (phase 1, slice A shipped; slice B queued).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 1, slice A shipped: the generalised commands exist.** `/casp`, `/next`, `/cto`
take `<project>` and run from the kit root; `/notify` sends on desktop, email or webhook
through a script that is the only reader of `.env`; `/update` pulls fast-forward only;
`/humanizer` is copied as is; `.claude/skills/README.md` fixes the frontmatter and path
conventions. Still missing (slice B, same prompt): `/new-project`, the six templates,
`/day`, `/verify`, `/chain`, `/fleet`, `/audit-batch`. Nothing creates a project yet.
The GitHub repository is **private** until v0.1.0.

---

## Concrete next action if I have…

### 15 minutes

Run `/casp kit` and `/update --check` from a fresh `claude` in this folder; confirm both
answer without a permission prompt (if one appears, note the exact command for slice B).

### 1 hour

Phase 1, item 5: `/verify` (reads `## Gate` in the project's `CLAUDE.md`, background
sub-agent, report under `session-logs/verification/`, hidden for `non-developer`).

### Half a day

Phase 1, items 1 to 3 (slice B): the six templates, `/new-project`, `/day --dry-run`.
Prompt: `docs/plan/sessions/PHASE-1-SKILLS-AND-TEMPLATES.md`, arbitration already recorded.

---

## Don't get distracted by

- **The website page and the homepage download link**, phase 3: nothing to link to before v0.1.0.
- **The manual in `docs/`**, phase 2: skills must exist before being documented.
- **Spanish**, backlog: the blog publishes ES, the kit can follow once FR and EN are stable.

---

## Constraints active today

- Repository private until the blank-machine test passes (phase 3).
- No absolute path, no author-portfolio project name, no credential anywhere in the tree.
- `casp check` is mandatory before push when the casp state was bumped.
- Native command names are verified against the installed binary, never written from memory.

---

## How to use this file

- **Start of session** : `casp status` reads this + state.json + the next-prompt preview + last 10 commits in one command.
- **End of session** : overwrite the three blocks (focus, next-actions-by-budget, don't-get-distracted).
- **Before push** : `casp check` exits 0. If FAIL, fix inline.
