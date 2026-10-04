# What I'm doing NOW

> **Updated** : 2026-10-04 (session 008: phase 3 shipped, v0.1.0 tagged and public, `/kit` page live; a discussion prompt is queued).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**Phase 3 is shipped: `v0.1.0` is tagged on `5c92d1a`, the repository is public, the `/kit`
page is live on thalesandhisaictoclaude.com with the codeload zip link and the clone line,
and the homepage carries the button and the card.** Nothing is queued as a build: the next
session is a discussion (`DISCUSSION-AFTER-V0-1-0.md`, five decisions, the user present).
Proofs due 2 to 7 stay open; the `[0.1.0]` section of `CHANGELOG.md` lists them as untested.

---

## Concrete next action if I have…

### 15 minutes

Answer the two lines left in Proof due 7 (does `/next` still load the personal skill in the
same session; do `/thales:` commands appear before `/reload-plugins`) and paste them in the
next log. Read the `/verify-thales` report under the website's `verification/`.

### 1 hour

`/thales:cto kit` opens the discussion: five decisions, one recommendation each, written to
`docs/plan/decisions/`; the prompts they produce are drafted and chained.

### Half a day

The first outside run of `INSTALL.md` by someone who is not the author, logged step by step;
every stop becomes a fix or a roadmap row. That run ranks Spanish, Windows and the fleet fallback.

---

## Don't get distracted by

- **A new feature before the first outside run**: the backlog was written without an outside reader.
- **Building the website in session**: its `CLAUDE.md` forbids inline builds; `/verify-thales` after the push.
- **A `fleet.sh` launcher**: the `osascript` line in `/thales:fleet` is the launcher until a real iTerm2 run says otherwise (Proof due 4).
- **French templates**: decided in session 004; templates stay English.
- **Spanish**, backlog: after the first outside feedback.

---

## Constraints active today

- Repository public since 2026-10-04; every push is visible, `casp check` before each.
- No absolute path, no author-portfolio project name, no credential anywhere in the tree.
- `casp check` is mandatory before push when the casp state was bumped.
- Native command names are verified against the installed binary, never written from memory.

## How to use this file

- **Start of session** : `casp status` reads this + state.json + the next-prompt preview + last 10 commits in one command.
- **End of session** : overwrite the three blocks (focus, next-actions-by-budget, don't-get-distracted).
- **Before push** : `casp check` exits 0. If FAIL, fix inline.
