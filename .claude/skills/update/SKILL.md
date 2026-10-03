---
name: update
description: Bring the kit to its latest release with a fast-forward pull. Refuses when the kit's working tree has local changes, never touches my-projects/, and shows what changed in CHANGELOG.md. Also reports whether the casp state tool has a newer version.
argument-hint: "[--check]"
allowed-tools: Bash(git fetch:*), Bash(git status:*), Bash(git pull --ff-only:*), Bash(git rev-parse:*), Bash(git diff:*), Bash(git log:*), Bash(casp --version), Bash(npm view @justethales/casp version), AskUserQuestion
---

# /update — bring the kit to its latest release

The kit is a git repository the user cloned. Updating it is a fast-forward pull, nothing
else. The user's projects are separate repositories under `my-projects/`, ignored by the
kit's git: this command cannot touch them, and says so once.

## 1. Where we are

```bash
git rev-parse --short HEAD
git status --porcelain | head -20
git fetch origin --quiet && git log --oneline HEAD..origin/main | head -20
```

Report in two lines: current commit, and either "already up to date" or "N commits behind".
With `--check`, stop here.

## 2. Refuse on a dirty tree

If `git status --porcelain` printed anything, stop. Say which files are modified and that
`/update` will not merge over local edits. Two ways forward, in this order:

1. The edits are the user's own notes in the kit (a changed `CLAUDE.md`, a chapter): they
   commit them first, then run `/update` again. Show the two commands.
2. The edits are accidental: `git checkout -- <file>` discards them. Name the file; do not
   run it yourself.

A project folder never shows up here: `my-projects/*` is git-ignored. If it does show up,
`.gitignore` was edited; say so and stop.

## 3. Pull

```bash
OLD=$(git rev-parse --short HEAD)
git pull --ff-only origin main
git log --oneline "$OLD"..HEAD | head -20
git diff "$OLD"..HEAD -- CHANGELOG.md | grep '^+' | grep -v '^+++' | head -30
```

`--ff-only` is not negotiable: a refused fast-forward means the user's kit diverged from
the release line. Report it, show `git log --oneline origin/main..HEAD | head`, and stop.
Never rebase, never merge, never reset from this command.

Then report:

- the commits pulled (verbatim, bounded);
- the `CHANGELOG.md` lines added, verbatim;
- if `.claude/settings.json` or `CLAUDE.md` is among the changed files, one line saying the
  new rules apply from the next `claude` start, not this session.

## 4. The state tool

```bash
casp --version
npm view @justethales/casp version
```

If the published version is newer, say so and show the one command to run:
`npm install -g @justethales/casp@latest`. Do not run it; installing a tool is the user's
call (`<decision_levels>`, level 1: it changes the machine). If `casp` is missing, point to
`/setup`.

## Never

- Never run on a dirty tree. Never `--force`, never `reset --hard`.
- Never write under `my-projects/`.
- Never touch `.kit/profile.json`: it is the user's, and git-ignored.
