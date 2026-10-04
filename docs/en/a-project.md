# A project

A project is a folder under `my-projects/` with a constitution (`CLAUDE.md`), a cockpit
(`casp/`), and its own git history. `/thales:new-project` creates one from a profile, with your
answers, and proves it is startable before it ends. You never write a constitution from
a blank page.

## The six profiles

| Profile | For | First phase |
|---|---|---|
| `job-search` | applications, letters, follow-ups and interviews, tracked until a contract is signed; the assistant prepares everything and sends nothing | application kit: masters, tracking file, content rules |
| `book-or-thesis` | a long text with chapters, sources and a deadline; the assistant structures, questions and edits, the voice and the claims stay the author's | outline, sources on disk, writing rules |
| `small-business` | offers, prices, customers, quotes, invoices and recurring tasks; nothing reaches a customer, a supplier, a bank or an administration without the owner | operating baseline: what is sold, to whom, at what price, with which recurring tasks |
| `event` | a conference, wedding, launch, workshop or trip with a date, a venue, vendors and a budget; written confirmations for every commitment | scope, date, budget envelope, the list of decisions |
| `content-creation` | a newsletter, blog, channel or social presence with a rhythm; briefs before drafts, sources behind facts; the assistant drafts and never publishes | editorial baseline: audience, voice, pillars, calendar |
| `software` | a codebase with a gate (tests, build, lint) that must pass before any push; nothing is published, deployed or paid without the owner | walking skeleton: the gate runs, one end-to-end path works |

All six share one rule: Claude prepares, you send, sign, pay, publish or push. Each
profile is a folder under `templates/` with three files; `templates/README.md` says how to
add a seventh.

## What `/thales:new-project` asks

One question at a time, in plain conversation, never as a form:

1. The project in two or three sentences. Kept word for word.
2. The first thing to do. The profile proposes one; you confirm or replace it.
3. The profile's own questions, three or four of them. For `job-search`: the target role, your
   current situation, where and how you search. For `software`: the stack, the commands
   that must pass before a push, how it reaches users.

An empty answer is asked once more, then the command stops: a constitution with a blank
is a rule nobody agreed to. Your wording is never rewritten, accents included.

## What it writes

```
my-projects/<name>/
  CLAUDE.md                          the constitution, from the profile and your answers
  README.md                          five lines
  casp/                              the cockpit: state.json, now.md, roadmap.md
  docs/plan/sessions/PHASE-1-<SLUG>.md   the first queued prompt
```

The constitution has, in this order: identity, rule number one, invariants (each with the
defect it avoids), layout, sources of truth, session cycle, `## Pre-approved decisions`,
what signals the owner, and a debt list. Three headings must stay as written: `## Pre-approved
decisions` and `## Gate` (software only, one command per line) are read by name by other
commands; `## Not done yet and should be` is where sessions append the debt they meet.

The first prompt is the profile's first phase, with your answers inside, `status:
queued`. The other phases of the profile are listed as backlog in the cockpit.

## The language of the constitution

The six templates are written in English; your answers are kept in the language you gave
them. A French owner therefore gets an English constitution with French sentences inside
it. This is a decision, not an oversight:

- The kit's commands read the constitution by its headings. One set of headings, in one
  language, is one thing to keep right.
- Claude answers you in the language you write in, whatever the constitution's language
  (root `CLAUDE.md`, `<language>` block). The constitution is read by Claude far more
  often than by you.
- Twelve more files to keep in step with the English ones would cost every release more
  than they would give a first-time user.

If you want your project's constitution in French, ask in the first session: "Translate
`CLAUDE.md` into French, keeping the three headings `## Pre-approved decisions`,
`## Gate` and `## Not done yet and should be` exactly as they are." It is a level-2
decision in that project: one session, one commit, reversible.

## What it proves before it ends

Three commands, their output shown to you:

```
grep -rn '{{' my-projects/<name>/ --include='*.md' | wc -l      # must print 0
(cd my-projects/<name> && casp check --quiet; echo "exit=$?")     # must print exit=0
(cd my-projects/<name> && casp status --plain | sed -n '1,12p')
```

A `{{` left is a placeholder you never saw; a red `casp check` is a cockpit that lies on
day one. Neither is allowed to survive the command.

## After `/thales:new-project`

The project has no remote: nothing leaves your machine until you create one, and that is
a level-1 decision you take. The closing message gives the next command:
`/thales:next <name> --solo "first slice of a new project"` to start now, or `/thales:cto <name>` to
have the plan re-read first.

Read the constitution once, one minute. Then start.

## What to type

```
/thales:new-project job-search --profile job-search
```

Without `--profile`, the menu lists the six profiles with one line each, the ones for
your kind of work first.

## What you should see

The three proofs, as printed on 2026-10-03 for a project created from the `job-search`
profile (the one frozen under `examples/job-search/`):

```
       0            # grep -rn '{{' | wc -l
exit=0              # casp check --quiet

casp-managed-project · branch main · HEAD 132bd58

STATE
────────────────────────────────────────
  current_phase    phase-0-init
  next_phase       phase-1-application-kit
  next_prompt      docs/plan/sessions/PHASE-1-APPLICATION-KIT.md
  last_session_id  pending
  last_commit      pending

  progress  ........................  0 shipped - 1 queued - 4 backlog
```

`pending` on the two last lines is normal on day one: no session has run yet. The first
`/thales:next` fills them.
