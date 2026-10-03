# Templates — one folder per profile

`/new-project` offers these profiles and builds a project from the chosen one. A profile
is a folder with exactly three files:

| File | Role |
|---|---|
| `template.json` | What `/new-project` asks and what it writes: label, summary, questions, first phase, roadmap phases |
| `CLAUDE.md` | The project's constitution: identity, rule number one, invariants, layout, sources of truth, session cycle, pre-approved decisions, what signals the owner, debt |
| `first-prompt.md` | The first queued session prompt, in the `casp` layout, written from the owner's answers |

## Placeholders

Both markdown files use `{{key}}` placeholders. Five are always available:

| Key | Value |
|---|---|
| `{{project_name}}` | the folder name under `my-projects/` |
| `{{owner_name}}` | `name` from `.kit/profile.json` |
| `{{description}}` | the project in two or three sentences, asked by `/new-project` |
| `{{first_goal}}` | the first thing the owner wants done, asked by `/new-project` (seeded from the profile) |
| `{{created_at}}` | today, `YYYY-MM-DD` |

Every other key comes from `template.json` → `questions[].key`. `/new-project` refuses to
finish while a `{{` survives in the written files: a placeholder the user never saw is a
rule nobody agreed to.

## Headings that skills read

Keep these headings exactly; other commands look them up by name:

- `## Pre-approved decisions`: the level-0 table (`/next`, `/cto`, `/chain` cite its lines).
- `## Gate`: one command per line in a code block, software profile only (`/verify` runs
  them, `/cto` measures whether they can run twice at once). A profile without a gate has
  no such section; do not write an empty one.
- `## Not done yet and should be`: the debt list sessions append to.

## Adding a seventh profile

1. Copy the closest existing folder to `templates/<new-profile>/`. Kebab-case name; it is
   the value shown in the menu and stored in the project's `casp/` notes.
2. `template.json`: change `label`, `summary`, `offer_first_to` (`developer`,
   `non-developer`, or both: which profile sees it at the top of the menu), `first_phase`
   (`slug` becomes `phase-1-<slug>` and `PHASE-1-<SLUG>.md`), `questions` (three or four,
   each with a `key` and the question as asked, in plain words), `phases` (three to five,
   ids in `phase-N-<slug>` form, the first one equal to `first_phase`).
3. `CLAUDE.md`: write rule number one first; it is the single sentence a session must
   obey above everything else. Then invariants, each with the defect it avoids. No `>`
   commentary: the file is loaded on every turn of every session in that project, and
   every line is paid for continuously.
4. `first-prompt.md`: keep the frontmatter as is (`next_after: phase-0-init`), name the
   phase `phase-1-<slug>` in the title and in `## Close`, and write a MUST list a fresh
   session can finish in one sitting.
5. Run `/new-project` with the new profile in a throwaway name; `casp check` must exit 0
   in the created project, and `grep -rn '{{' my-projects/<name>/` must print nothing.
6. Add a line under `[Unreleased]` in `CHANGELOG.md`.

The six shipped profiles all share one rule: the assistant prepares, the owner sends,
signs, pays, publishes or pushes. A seventh profile keeps it.
