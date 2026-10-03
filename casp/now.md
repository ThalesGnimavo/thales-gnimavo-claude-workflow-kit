# What I'm doing NOW

> **Updated** : 2026-10-03 (phase 1 shipped; phase 2 queued).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 1 shipped: every command of the `<skills>` table exists and `/new-project`
produces a project whose `casp check` passes on first run.** Fourteen skills under
`.claude/skills/`, six profile templates under `templates/` driven by a `template.json`
each, conventions in `.claude/skills/README.md` and `templates/README.md`. The kit can be
run; it cannot yet be read: `docs/fr/`, `docs/en/` and `examples/` are empty. Phase 2
(the manual and the two worked examples) is queued with its prompt; it needs its own
arbitration (`/cto kit`) before `/next kit` starts it. The GitHub repository is
**private** until v0.1.0.

---

## Concrete next action if I have…

### 15 minutes

From a fresh `claude` in this folder: `/day --dry-run` (one table, no project yet),
then `/casp kit`. Note any permission prompt with the exact command (Proof due since 002).

### 1 hour

`/new-project demo-job --profile job-search` interactively, answer the questions, read
the generated `CLAUDE.md`, then delete `my-projects/demo-job/`. This is the first
end-to-end run through the skill text rather than the replayed procedure.

### Half a day

`/cto kit`, then `/next kit`: phase 2, slice A (the manual in one language and the two
examples). Prompt: `docs/plan/sessions/PHASE-2-MANUAL-AND-EXAMPLES.md`.

---

## Don't get distracted by

- **The website page and the homepage download link**, phase 3: nothing to link to before v0.1.0.
- **A `fleet.sh` launcher**: the `osascript` line in `/fleet` is the launcher until a real
  iTerm2 run says otherwise.
- **French templates**: decide in phase 2, with the manual, whether twelve more files are worth it.
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
