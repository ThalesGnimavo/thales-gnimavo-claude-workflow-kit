# What I'm doing NOW

> **Updated** : 2026-10-04 (session 008, slice B of phase 3: v0.1.0 cut in the tree, the `/kit` page written in the website repository, the tag and the public flip handed to the user).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**v0.1.0 is cut in the working tree (`CHANGELOG.md` `[0.1.0] - 2026-10-04` with the untested
list, README release status, native commands re-checked against 2.1.289) and the `/kit` page
plus the homepage link are written in `ThalesAndHisAiCtoClaude.com`; nothing is committed,
tagged, pushed or public yet: those five actions are the user's, in the order written at the
end of `session-logs/26-10-04-002-phase-3-release-b.md`.** Proof due 1 closed (project form
of `casp status` from a fresh `claude -p`), Proof due 7 closed in part (`/thales:cto` and the
`/thales:` listing observed by the user; `claude plugin list` captured).

---

## Concrete next action if I have…

### 15 minutes

Run the "End-of-session" block of log 26-10-04-002: the two kit commits, the tag, the push,
the flip, then the website commit and push. Then `/verify-thales`.

### 1 hour

`/thales:next kit`: observe the tag (`git tag --contains`), the public repository
(`gh repo view --json visibility`), the page (`curl -sI https://thalesandhisaictoclaude.com/kit`),
paste the three outputs in a log, `casp ship phase-3-release --log <id>`, draft the
`casp new discussion` prompt (Spanish, Windows, fleet without iTerm2, first outside
feedback), `casp close`, commit, push.

### Half a day

The two lines still open inside Proof due 7 (does `/next` still load the personal skill;
do `/thales:` commands appear before `/reload-plugins`), then the first outside run of
`INSTALL.md` by someone who is not the author, logged step by step.

---

## Don't get distracted by

- **Pushing the website before the flip**: the zip link returns 404 until the repository is public.
- **Building the website in session**: its `CLAUDE.md` forbids inline builds; `/verify-thales` after the push.
- **A `fleet.sh` launcher**: the `osascript` line in `/thales:fleet` is the launcher until a real iTerm2 run says otherwise (Proof due 4).
- **French templates**: decided in session 004; templates stay English.
- **Spanish**, backlog: after the first outside feedback.

---

## Constraints active today

- Repository private until the user flips it, after the tag.
- No absolute path, no author-portfolio project name, no credential anywhere in the tree.
- `casp check` is mandatory before push when the casp state was bumped.
- Native command names are verified against the installed binary, never written from memory.

## How to use this file

- **Start of session** : `casp status` reads this + state.json + the next-prompt preview + last 10 commits in one command.
- **End of session** : overwrite the three blocks (focus, next-actions-by-budget, don't-get-distracted).
- **Before push** : `casp check` exits 0. If FAIL, fix inline.
