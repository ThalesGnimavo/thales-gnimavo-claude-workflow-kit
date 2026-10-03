# The manual

How to run a project, technical or not, with Claude Code as a working partner, using this
kit. Six chapters, in the order a first week meets them. Each chapter ends with "What to
type", the exact commands in order, and "What you should see", the raw output as it was
printed during a real run on 2026-10-03.

| Chapter | File | Read it when |
|---|---|---|
| A day | `a-day.md` | before your first morning with the kit |
| A session | `a-session.md` | before your first `/next` |
| A project | `a-project.md` | before your first `/new-project` |
| The state | `the-state.md` | the first time `casp check` prints a FAIL, or before |
| Native commands | `native-commands.md` | the first time you wonder what `/compact` or `/rewind` does; checked against an installed Claude Code |
| Pitfalls | `pitfalls.md` | at the end of the first week, then whenever something felt wrong |

The manual is longer than `/learn` (seven chapters of five to eight minutes, with an
exercise each) and shorter than a book. `/learn` teaches; this manual is what you open
when you have a question. Two finished projects to compare yours to are in `examples/`:
`examples/job-search/` (non-technical) and `examples/software/` (technical). Each has a
`README.md` that says what to look at and in which order.

The French version, `docs/fr/`, has the same six chapters under the same file names. The
root `CLAUDE.md` and the kit's commands answer in the language you write in, whichever
manual you read.

## Three words, before anything

- **Constitution**: the `CLAUDE.md` of a project. Loaded on every turn of every session.
  It holds what the project is, the rules that never bend, and the questions Claude may
  answer alone.
- **Cockpit**: the `casp/` folder of a project. Three files that say where the project is
  and what comes next. A tool, `casp`, checks them against git.
- **Session**: one sitting on one project, one slice of work, closed with a written log
  and the next session's brief.
