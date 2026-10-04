---
name: notify
description: Send the end-of-session summary on the channel configured in the kit's .env (desktop notification, email, or webhook). Prints "not configured" when there is no .env or no channel. Never reads .env itself; a script does, and no value from it reaches the conversation.
argument-hint: "[project]"
allowed-tools: Bash(bash .claude/skills/thales/skills/notify/notify.sh:*), Bash(test -f .env), Bash(git log:*), Read, Glob
---

# /thales:notify — the end-of-session summary, delivered

The user is away from the keyboard and wants to know what happened without opening the
terminal. This command writes a short summary and hands it to `notify.sh`, which reads
`.env` and sends it. You never read `.env`: the root `CLAUDE.md` forbids it with any tool,
and the script exists so that you do not need to.

## 1. Is a channel configured?

```bash
test -f .env && echo "env:yes" || echo "env:no"
```

On `env:no`, print the one-paragraph setup and stop:

> Not configured. Create a file named `.env` at the kit root with one line,
> `NOTIFY_CHANNEL=desktop`, for a notification on this computer. For an email or a
> webhook, see the keys listed at the top of `.claude/skills/thales/skills/notify/notify.sh`.
> `.env` is never committed and never read by Claude.

## 2. Write the summary

Six lines at most, plain text, no markdown headers, in the user's language. Source: the
session that just ended. When a project name is given, read its newest
`my-projects/<project>/session-logs/*.md` (`Glob`, newest by name) and the last three
commits (`git log -3 --oneline`, inside the project); otherwise use what this session did.

```
<project> — <date>
Done: <one line>
Proven: <one line: what was observed, on what target>  |  Nothing proven this session
Next: <the queued prompt's title>
Blocked: <one line, or "nothing">
```

Never pad the summary, never claim a proof the session log does not contain.

## 3. Send

```bash
bash .claude/skills/thales/skills/notify/notify.sh <<'EOF'
<the summary>
EOF
```

Report the script's output verbatim: it is one line, either `sent: …`, `not configured: …`
or an error. On an error, quote it and stop; do not retry with another channel, do not
edit `.env`.

## Who gives the go

The user typing `/thales:notify` is the go for this one send. Another command that reaches its
close step (`/thales:next`, `/thales:day`) proposes `/thales:notify` in one line and does not run it: sending
is an external action, and the root `CLAUDE.md` wants an explicit go in the current session.

## Never

- Never read `.env`, `Read` or `cat` or anything else. The script does.
- Never print a value that could come from `.env`. The script prints only the channel name.
- Never send twice for one session.
