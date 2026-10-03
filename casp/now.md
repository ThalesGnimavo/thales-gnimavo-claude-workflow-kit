# What I'm doing NOW

> **Updated** : 2026-10-03 (phase 0 shipped).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 0 shipped: the kit boots.** Root `CLAUDE.md` (English, XML sections, rules only),
bilingual `INSTALL.md` and `README.md`, project-level permissions, `/setup` (machine check,
casp install, profile) and `/learn` (seven chapters with exercises) exist and are committed.
Nothing creates a project yet: `/new-project`, `/day` and the generalised skills are phase 1.
The GitHub repository is **private** until v0.1.0.

---

## Concrete next action if I have…

### 15 minutes

Run `/setup --check` and `/learn status` from a fresh `claude` in this folder; confirm both
read `.kit/profile.json` correctly and that `/learn 3` prints this cockpit via `casp status`.

### 1 hour

Phase 1, item 7 and 9: copy `/humanizer` as is, write `/update`, and set the frontmatter
convention every other skill will follow.

### Half a day

Phase 1, items 1 to 3: `/new-project` with the six templates and `/day --dry-run`. Prompt:
`docs/plan/sessions/PHASE-1-SKILLS-AND-TEMPLATES.md`.

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
