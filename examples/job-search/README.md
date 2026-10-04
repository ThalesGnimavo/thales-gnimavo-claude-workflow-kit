# job-search

> Commands renamed to `/thales:` on 2026-10-04; logs updated to match.

Profile: job-search. Owner: Léa Fontaine (fictional).
A bilingual customer support role in Lyon or remote, every application tracked in one place, nothing sent that the owner has not read.
Run from the kit root with `/thales:next job-search`.
Created on 2026-10-03.

## What this folder is

A project created with `/thales:new-project` from the `job-search` profile, then played for two
sessions on 2026-10-03, and frozen here so that you can compare your own project to a
finished one. Every name in it is invented: the owner, the agency, the hotel, the
employer, the addressee, the e-mail address and the phone number. The two PDFs under
`MERIDIAN-TRAVEL-ASSISTANCE/sent/` were produced in session 002 and read back; they are
kept so that the folder looks like a real one at `ready`.

In your own project, the folder is its own git repository and `casp/state.json` names
your own commits. This copy ships without its `.git` folder: `last_commit` names the kit
commit that froze it, so that `casp status` and `casp check` still run from inside it.
The history as it was played is listed at the end of this file.

## What to look at, in this order

1. `CLAUDE.md`: the constitution. Rule number one (prepare everything, send nothing), the
   invariants, the layout, the `## Pre-approved decisions` table. Every answer the owner
   gave to `/thales:new-project` is in it, word for word.
2. `docs/plan/sessions/PHASE-1-APPLICATION-KIT.md`: the first prompt, now `status: shipped`.
   Read its MUST list, then compare with what session 001 says it shipped.
3. `session-logs/26-10-03-001-application-kit.md`: the first session. Look for the three
   sentences refused under the content rules, the "Verify" block with its raw commands,
   and "Decisions taken without the user" with a way back for each.
4. `docs/plan/sessions/PHASE-2-FIRST-WAVE.md`: the queued prompt, drafted at the end of
   session 001. Its `next_after` names the log that drafted it.
5. `session-logs/26-10-03-002-first-wave.md`: a session whose phase is **not finished**,
   said in its first lines. The folder is at `ready`; the owner has not sent it. Read the
   PDF incident in "Verify": the export returned exit code 0 and the text read back from
   the PDF still had the Markdown heading marks.
6. `casp/now.md`, then `casp/roadmap.md`: the one-screen state and the real row under
   `## Blocked`, which is what `/thales:day` shows for this project.
7. `applications.md`: one row, status `ready`, "sent on" empty. The phase ships in the
   session that writes the date.
8. From this folder: `casp status`, then `casp check`.

## The history as it was played

```
c3354bd chore(casp): session 002 — first folder at ready, phase 2 stays queued
489bea9 fix: CV PDF re-exported without the Markdown heading marks
2439969 feat: first employer folder — Meridian Travel Assistance at ready, PDFs read back
5f274cc chore(casp): close phase-1-application-kit — phase 2 queued with its prompt
ebf97fa feat: application kit — masters, tracking file, interview sheet, offer filter
132bd58 chore: project created from the job-search profile
```

Two commits per session, the work first, the state second. The commit SHAs quoted in the
session logs and in `casp/roadmap.md` are these.

## What not to do with it

Do not copy this folder into `my-projects/`. Create your own with `/thales:new-project`: the
constitution must hold your answers, not Léa's.
