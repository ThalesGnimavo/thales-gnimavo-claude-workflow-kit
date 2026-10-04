---
status: queued
session_id: pending
session_log: pending
drafted_at: {{created_at}}
next_after: phase-0-init
---

# Session — phase-1-outline-and-sources : Outline, sources on disk, writing rules

> **Status : QUEUED.** Drafted by `/thales:new-project` on {{created_at}}. The cockpit exists;
> no outline, no source and no chapter exists yet.
>
> **Goal.** The outline with one promise per chapter, every source the author already has
> as a file in `sources/`, and the writing rules, so that the first chapter session can
> start from the outline alone.
>
> **Why now.** The author's first goal: "{{first_goal}}". A first draft written before the
> outline is the draft that gets thrown away.

**Project root.** `my-projects/{{project_name}}/`
**Branch.** `main`.
**Session log target.** `session-logs/YY-MM-DD-NNN-outline-and-sources.md`.
**Expected size.** One session. No gate.

---

## CONTEXT — what changed since the parent prompt was drafted

- **The project was created** by `/thales:new-project` on {{created_at}}. `CLAUDE.md` holds rule
  number one (no claim without a source the author has read), the invariants and the
  pre-approved decisions. Read it before the first file.
- **Working title:** "{{working_title}}". **Kind:** {{text_kind}}. **Deadline:**
  {{deadline}}. **Target length:** {{target_length}}.

## MUST

1. Interview the author for twenty minutes: what the text argues or tells in one
   sentence, who reads it, what the reader must be able to do or believe at the end. Write
   the answers at the top of `outline.md`.
2. `outline.md`: the chapters in order, each with a one-paragraph promise and a target
   length. The sum of the targets equals the target length, or the gap is named.
3. `sources/`: ask the author for every document they already have (files, links, notes);
   store each as a file with a one-line note saying what it supports. Nothing fetched or
   summarised from memory.
4. `writing-rules.md`: person, tense, voice, reference format, ten words or patterns the
   author refuses, written from the author's answers, not from a style guide.
5. Create `manuscript/` empty, and `exports/` empty, with a `.gitkeep` each.

## SHOULD

- A pace line at the bottom of `outline.md`: sessions available before the deadline,
  words per session needed, and whether that pace is realistic, with the arithmetic.

## MUST NOT

- No chapter prose. Phase 2 writes, one chapter per session, from the outline.
- No reference fetched from the web and added without the author confirming they read it.

## Close

Session log, `casp ship phase-1-outline-and-sources --log <id>`, draft
`PHASE-2-FIRST-DRAFT.md` (chapter 1 only, from its promise), `casp close`, `casp check`
exit 0, two commits.
