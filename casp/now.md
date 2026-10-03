# What I'm doing NOW

> **Updated** : 2026-10-03 (session 004: phase 2 slice A shipped, slice B queued).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 2, slice A shipped: the English manual (`docs/en/`, five chapters plus a table of
contents, every chapter ending with real output) and the two worked examples
(`examples/job-search/`, `examples/software/`, two sessions each, `casp check` 0 inside
each, frozen without their `.git`).** The phase stays queued for slice B: `docs/fr/`,
`native-commands.md`, the profile-aware wording in `/casp`, `/next`, `/update`. Three
template and skill defects met while playing the examples are listed in `roadmap.md`,
not fixed (out of the prompt's scope). The GitHub repository is **private** until v0.1.0.

---

## Concrete next action if I have…

### 15 minutes

Read `docs/en/a-day.md` as a first-time user would, then `examples/job-search/README.md`
and follow its order for two files. Note every sentence that needs the author to be
understood.

### 1 hour

Fix the three defects listed under "Queued — non-critical" in `roadmap.md` (two template
lines, one skill line), re-run the `/new-project` proofs on a throwaway project.

### Half a day

`/next kit`: phase 2, slice B. `docs/fr/` as a translation of `docs/en/` with every
accent, `native-commands.md` verified against the installed `claude` (`claude --version`
first), the profile-aware wording in `/casp`, `/next`, `/update`; then `casp ship
phase-2-manual-and-examples` and `PHASE-3-RELEASE.md` drafted.

---

## Don't get distracted by

- **The website page and the homepage download link**, phase 3: nothing to link to before v0.1.0.
- **A `fleet.sh` launcher**: the `osascript` line in `/fleet` is the launcher until a real
  iTerm2 run says otherwise.
- **French templates**: decided in session 004, `docs/en/a-project.md`: templates stay English, the owner asks for a translation in the first session; no `templates/<profile>/fr/`.
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
