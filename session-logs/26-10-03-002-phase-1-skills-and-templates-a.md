---
# No `phase:` key: this session shipped slice A of phase-1-skills-and-templates; the
# phase stays queued until slice B (templates, /new-project, /day, /verify, /chain,
# /fleet, /audit-batch) ships. The log that ships the phase will carry the key.
---

# 26-10-03-002 — phase-1-skills-and-templates, slice A : The generalised commands

**Session prompt :** `docs/plan/sessions/PHASE-1-SKILLS-AND-TEMPLATES.md` (still `queued`).
**Previous session end :** `5383ea0` (state bump after the rename to `thales-gnimavo-claude-workflow-kit`).
**Delegation :** Inline, plus one read-only Explore sub-agent for the post-implementation
audit (56 k tokens). Reason: nine MUST items with serial dependencies, nothing to
parallelise; arbitration recorded as solo in `casp/state.json` before the first line.
**State at session start :** phase 0 shipped, `arbitration: null`, cockpit current with
casp 0.18.2, `casp check` 0, `origin/main` = `HEAD`. Opened with `/cto`, which replayed
the prompt's claims (sources all present; one overstatement: `/learn` chapter 6 names
`/day`, not `/day --dry-run`) and chained into `/next`.

## Scope shipped this session

### A — `.claude/skills/README.md` (NEW)
The frontmatter convention (MUST 9): `name`, `description`, `argument-hint`,
`allowed-tools`, in that order, no `version`; no absolute path; `<project>` resolves to
`my-projects/<name>/` from the kit root, `kit` reserved for the kit itself; `.env` is
never read with `Read`.

### B — `/humanizer` (NEW, copied as is)
`SKILL.md`, `README.md`, `LICENSE` from the author's skill. Body untouched (462 lines);
frontmatter normalised to the four-field convention. `WARP.md` not copied.

### C — `/update` (NEW)
Fast-forward pull of the kit, refused on a dirty tree, never touches `my-projects/`,
shows the `CHANGELOG.md` lines added, reports a newer `casp` without installing it.

### D — `/notify` (NEW) + `notify.sh`
The skill writes a six-line summary and pipes it to `notify.sh`; the script is the only
reader of `.env`, parsed dotenv-style (not sourced: a value with a space would run as a
command), and prints only the channel name or an error that names the key to check.
Channels: desktop (`osascript`, `notify-send`, PowerShell balloon), email (curl SMTP,
STARTTLS 587), webhook (JSON POST, no `jq` dependency).

### E — `/casp <project>` (NEW, generalised)
Reporter: `status` (board verbatim), `check`, `where`, snapshot. Subcommands dropped from
the author's version: `roadmap`, `changelog`, `version`, `ship`, `stack`, `architecture`,
`carte` (developer-only or author-specific).

### F — `/next <project>` (NEW, generalised from the author's fork)
Arbitration gate (`next_phase` set and equal to `arbitration.phase`; `fleet` hands over
to `/fleet`), `--solo "<reason>"`, cockpit upgrade without asking, paths A/B/C, the close
sequence with `git add` before the pathspec commit and a "phase not finished" branch.

### G — `/cto <project>` (NEW, generalised)
State, shared-state check against the remote, prompt replay, gate isolation only when the
project's `CLAUDE.md` declares `## Gate`, costed arbitration in both directions, field
recorded, solo executes / fleet waits.

### H — `CLAUDE.md`, `CHANGELOG.md`, `casp/now.md` (MODIFIED)
`<never>`: one-line carve-out for `notify.sh`. `[Unreleased]`: seven lines. `now.md`:
focus and next actions for slice B.

## What did NOT ship this session — and why

Slice B of the same prompt: templates (MUST 2), `/new-project` (1), `/day` (3), `/verify`
(5), `/chain`, `/fleet`, `/audit-batch` (8), `templates/README.md`, `/setup --global`.
The prompt sized itself at two sessions; the serial order (convention → copies → templates
→ `/new-project` → `/day`) put these second.

## Files touched

```
.claude/skills/README.md                         new
.claude/skills/{casp,cto,next,notify,update}/SKILL.md   new
.claude/skills/notify/notify.sh                  new
.claude/skills/humanizer/{SKILL.md,README.md,LICENSE}   new (copy)
CLAUDE.md  CHANGELOG.md  casp/now.md  casp/state.json   modified
```

## Verify

### Inline (2026-10-03, macOS, bash 3.2)

- `bash -n notify.sh` → `syntax ok`.
- No `.env` → `not configured: no .env at the kit root …`, exit 0.
- `NOTIFY_TITLE=t` only → `not configured: NOTIFY_CHANNEL is not set in .env …`, exit 0.
- `NOTIFY_CHANNEL=desktop`, `NOTIFY_TITLE=Kit test` → `sent: desktop notification`, exit 0
  (notification displayed on this machine).
- `NOTIFY_CHANNEL=webhook` against a local Python listener on 127.0.0.1:8765, summary with
  quotes, a tab and a backslash → listener printed
  `RECEIVED {"title": "Claude session", "text": "line \"one\"\n\tline\\two\nthird"}`, exit 0.
- Webhook against a closed port → `error: webhook send failed (curl exit 7); check
  NOTIFY_WEBHOOK_URL in .env`, exit 1.
- `.env` holding `1BAD=secretvalue` → output contains the string 0 times (leak fixed).
- `NOTIFY_CHANNEL=email` alone → `not configured: NOTIFY_EMAIL_TO is missing in .env`, exit 1.
- Lint over `.claude/skills/`: `/Users/`, author project names, `/tmp` → 0 hits in the new
  files; four-field frontmatter on all eight skills.
- `casp check` → exit 0 (one WARN, `CASP-WORKTREE-001`, expected before the state commit).

### Post-implementation audit (Explore sub-agent)

Verdict GO-WITH-FIXES. Applied: `git add` before the close commit in `/next`; digit-first
keys rejected in the dotenv parser (bash printed the whole pair on `export` failure);
`NOTIFY_EMAIL_TO` no longer echoed; curl stderr suppressed and replaced by an error naming
the key; CR and control characters stripped in `json_escape`; curly quotes mapped before
the PowerShell string; gate fails on `none == none` and routes `fleet` to `/fleet`;
`allowed-tools` narrowed (`git -C … log/status/rev-parse/fetch` instead of all of git) and
completed (`jq`, `sed -n`, `grep`, `head`, `wc`); `/tmp` log files removed from `/casp`
and `/next`; `now.md` added to the finished-phase close; undo of a failed `casp upgrade`
conditioned on a clean `casp/`; `kit` as reserved project name documented; `<never>`
carve-out for `notify.sh`.

### Proof due

- `Proof due: no permission prompt on (cd my-projects/x && casp status) and git -C forms
  — on a fresh claude start from the kit root — blocked by: cannot be observed from inside
  the running session.` Listed in `now.md`, 15-minute block.
- `Proof due: desktop notification on Linux (notify-send) and Windows (PowerShell balloon)
  — on those systems — blocked by: only macOS available.`
- `Proof due: email channel end to end — on a real SMTP account — blocked by: no test
  account; design only.`

## Deferred / risks

- Audience wording (audit item 7): `/casp`, `/next`, `/update` show sha, branch,
  "commits", "fast-forward" to a `non-developer` profile. Profile-aware wording is phase 2
  work (manual) and a follow-up on these three skills.
- `notify.sh`: no `--crlf` / `Date:` / `Message-ID:` on email, port 465 unsupported,
  inline `# comment` after a quoted value kept, credentials visible in `ps` argv during
  the send.
- `setup/SKILL.md:48` still writes `/tmp/casp-install.log` (phase 0 file, out of this
  slice); align with the no-absolute-path rule in slice B.
- References to `/new-project`, `/day`, `/fleet` from the new skills point at commands
  that ship in slice B; the root `CLAUDE.md` already says to announce a missing command as
  "ships in a later release".
- Permission matcher behaviour for `(cd … && …)` subshells is unverified (see Proof due).
  If it prompts, slice B adds the matching allow rules to `.claude/settings.json`.

## Decisions taken without the user

- `<never>` carve-out in the root `CLAUDE.md` for `notify.sh` (one line). The prompt's
  MUST 6 and the `<never>` list contradicted each other; the narrowest resolution was
  chosen. Way back: delete the two lines and make `/notify` read channel and keys from
  `.kit/profile.json` instead of `.env`.
- `/casp` subcommands reduced to `status`, `check`, `where`, snapshot. Way back: port the
  dropped ones from the author's skill.
- `.env` parsed line by line instead of sourced. Way back: none needed; sourcing is the
  less safe form.
- `/notify` is proposed, never run, by other skills at their close step (the kit's
  `<never>` wants an explicit go in the current session).

## CASP state + housekeeping

- `arbitration` recorded by `/cto` (solo, reason: serial dependencies, nothing delivered
  for readers to contradict).
- Phase not shipped: no `casp ship`; prompt stays `queued`; `now.md` updated; `casp close
  --yes`, `casp check` 0; two commits, work first.

## End-of-session

Next: `/next kit` for slice B (items 1, 2, 3, 5, 8, SHOULDs). Arbitration already covers
the phase. First check of the session: the Proof due on permission prompts.
