# {{project_name}}

{{description}}

Stack: {{stack}}. Deployment: {{deploy}}. Owner: {{owner_name}}. First goal, in the
owner's words: "{{first_goal}}"

## Rule number one: the gate passes before any push

The commands under `## Gate` run before every push and their raw output is in the session
log. A red gate is fixed, never bypassed: no `--no-verify`, no skipped test, no commented
assertion. When the gate cannot run on this machine, the push does not happen and the log
says why.

## Invariants

- **A known bug is never carried over silently.** It is fixed in the session that found
  it, or written in `## Not done yet` with the way to reproduce it.
- **A dependency added is a line in the session log** with the reason and the alternative
  considered. A major framework, runtime or database change is a level-1 decision.
- **Migrations are additive and reversible** in the same change; a destructive migration
  is a level-1 decision with the backup command written first.
- **No secret in the repository.** Configuration comes from the environment; `.env` is
  never read by the assistant and never committed.
- **A screen described as working was seen.** A session without a browser or device
  writes "not seen", never "works".

## Gate

```
{{gate_commands}}
```

One command per line. `/verify <project>` runs them in the background and writes the
report under `session-logs/verification/`; `/cto` reads this section to decide whether
two sessions can run the gate at once.

## Sources of truth

| Subject | File | What locks it |
|---|---|---|
| What the code must do | the tests | the gate |
| What changed and why | `session-logs/` and `CHANGELOG.md` | `casp check` |
| How it is run | `README.md` | a fresh clone that follows it |

## Session cycle

`casp status` opens a session; the queued prompt is a claim to replay against the code
before believing it. One slice per session. Closing follows `/next`: work committed, gate
green with its output in the log, next prompt, `casp check` exit 0.

## Pre-approved decisions

| Question | Approved answer | Source |
|---|---|---|
| Push to the remote at the end of a session? | Yes, after the gate is green and `casp check` exits 0. | rule number one |
| Publish a package, a release, a store build? | **Never in an implementation session.** Level 1. | root rules |
| Push to a branch that deploys automatically? | Level 1, unless the deployment line at the top of this file names that branch as the normal path; then yes, with the gate green. | this file |
| Add a dependency? | Yes if small and justified in the log; major framework or runtime: level 1. | invariants |
| Call a paid or external service for real (mail, SMS, payment)? | **Never without a go in the current session.** Level 1. | root rules |
| Naming, file layout, error codes, test names, ordering? | Level 2: decide, record, continue. | root rules |

## What signals the owner on this project

- A gate that stays red after one corrective pass.
- Any deployment, publication, credential or payment.
- A schema change that destroys data.
- A prompt whose MUST list cannot fit one session: propose the cut before starting.

## Not done yet and should be

- Add a line here each time a session pays for a rule that was not written.
