---
status: queued
kind: discussion
session_id: pending
session_log: pending
drafted_at: 2026-10-04
next_after: 26-10-04-002-phase-3-release-b
---

# Discussion — after-v0-1-0 : what the kit does once it exists outside

> **Status : QUEUED. Kind : DISCUSSION.** This session is a conversation with the user, not a
> build. Its deliverable is **decisions written down** and **the prompts they produce**: no
> code. It exists because a shipped roadmap is not a finished project: a cockpit that has
> shipped never reports nothing to start (`CASP-PROMPT-011`).
>
> **Why now.** v0.1.0 is tagged, the repository is public, the `/kit` page is live
> (session 008, 2026-10-04). Every item left in the backlog (Spanish, Windows, fleet without
> iTerm2) was written before anyone outside had opened the kit; the first outside run is the
> only input that ranks them, and it has not happened. The next step is a decision, not a slice.

**Project root.** the kit root (`/thales:cto kit`, `/thales:next kit`).
**Session log target.** `session-logs/26-10-XX-NNN-after-v0-1-0.md`.
**Decision record target.** `docs/plan/decisions/2026-10-XX-after-v0-1-0.md` (new folder; the
kit has no arbitration file yet).

---

## HOW THIS SESSION RUNS

1. Read the state (`casp/now.md`, `casp/roadmap.md`) and **every deferred item** listed below.
   Re-verify each one in the files before repeating it: a deferred item may have shipped since.
2. For each decision below, present **one question, one recommendation, one line of trade-off**.
   The agent takes a position first; the user decides.
3. Write every decision to the decision record: the reason that decided, not only the conclusion.
4. Draft the prompt(s) the decisions produce (`casp new prompt --slug <slug>`), chain them with
   `next_after`, and point `next_prompt` at the head.
5. Close like any session: log, state bump, `casp check` 0 FAIL, commit, push.

---

## WHAT REMAINS FROM THE ROADMAP (deferred items, verified on 2026-10-04)

- **Proofs due 2 to 7** (`casp/roadmap.md`, "Proofs due still open at v0.1.0", and
  `CHANGELOG.md` `[0.1.0]` "Untested at this release"): Linux and Windows notification,
  e-mail channel, `/thales:fleet` on iTerm2, `/thales:new-project` through its interactive
  menu, the blank-machine run by a first-time reader, the two lines left in proof 7.
  Unblocked by: a second machine or user account, and one session where the user says go
  for the fleet spend.
- **Spanish docs** (`phases_backlog`): the blog publishes ES; nothing in the kit does.
  Unblocked by a decision, not by work.
- **Windows walkthrough** (`phases_backlog`): `INSTALL.md` has the PowerShell line and the
  Git step; no screenshot, no run. Unblocked by a Windows machine.
- **Fleet without iTerm2** (`phases_backlog`): `/thales:fleet` says macOS and iTerm2 only.
  Unblocked by a decision on tmux versus plain multi-terminal.
- **The github.com archive link serves an HTML page to non-browser clients**; the `/kit`
  page links codeload directly (session 008). A GitHub Release with notes would give a
  stable page and a human-readable zip name. Unblocked by `gh release create v0.1.0`.

---

## DECISIONS TO OBTAIN (one question, one recommendation each)

1. **The next roadmap.** Candidates: (a) the first outside run, logged step by step, before
   any new feature; (b) Spanish; (c) Windows; (d) fleet without iTerm2. Recommendation: (a),
   then whatever that run breaks. The three others rank by the first outside feedback, not
   by the author's guess.
2. **Distribution.** Where does the first reader come from: the website's `/kit` page alone,
   an article on the site ("how we built the kit", EN/FR/ES, the site's own pipeline), the
   newsletter, LinkedIn. Recommendation: one article on the site first, because it is the
   channel already built and measured; the social post links it. One message to lead with:
   "three steps, then Claude does the rest with you".
3. **A GitHub Release for v0.1.0.** Tag only today. Recommendation: create the release with
   the `[0.1.0]` section of `CHANGELOG.md` as its notes, and switch the page's zip link to the
   release asset only if the codeload link proves to be a problem for someone.
4. **Support.** Where does a person who stops at step 3 of `INSTALL.md` write: GitHub issues
   (public repository, already there), an e-mail, the website's contact. Recommendation:
   GitHub issues with one template ("where did you stop, what was printed"), named in
   `INSTALL.md` and on the `/kit` page.
5. **The cadence of releases.** What triggers v0.1.1: every outside-found defect, or a batch.
   Recommendation: a batch per week while the first readers arrive, each with its changelog
   section and tag; never a release without an outside observation behind it.

---

## DO NOT

- **Do not write product code in this session.** A discussion that turns into a build has skipped
  the decision it existed to obtain.
- **Do not run this prompt headless.** It needs the user; `/thales:next` says so.
- **Do not leave a decision implicit.** "We'll see" is a deferred item, and goes in the record as
  one, with an owner and a date.

---

## AT END OF SESSION

1. Decision record written, one entry per decision, with the reason that decided.
2. The prompt(s) the decisions produce are drafted, chained, and `next_prompt` points at the head.
3. Session log written: `casp new log --slug after-v0-1-0`, then fill.
4. `casp/state.json` bumped, `casp/now.md` and `casp/roadmap.md` rewritten.
5. **`casp check`**: 0 FAIL. Commit, push.

---

*A discussion prompt is the answer to "what now?" once the roadmap is implemented. The queue never
ends: it changes kind.*
