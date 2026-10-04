# Chapter 1 — Claude Code in ten commands

## Lesson

Claude Code is a program that runs in a terminal and reads the folder you started it in.
It is not a chat window: it opens files, runs commands, writes, and remembers what it did
in this session. You type sentences; it answers and acts. Everything it does is shown.

Three things about the terminal you need, nothing more:

- You started Claude Code by typing `claude` inside this folder. Next time, do the same.
- Press Enter to send a message. Press Escape to interrupt what Claude is doing.
- A line that starts with `/` is a command, not a sentence. Type `/` alone to see them all.

The ten native commands worth knowing in the first week:

| Command | What it does | When |
|---|---|---|
| `/help` | Lists commands and shortcuts | when lost |
| `/clear` | Starts a new session with an empty memory; the old one stays on disk | between two unrelated tasks |
| `/compact` | Summarises the conversation so far to free space | when Claude says the context is getting long |
| `/context` | Shows how much of Claude's working memory is used | before deciding to compact or clear |
| `/model` | Chooses which Claude model answers | heavier model for hard decisions, lighter for routine |
| `/effort` | Sets how long Claude thinks before answering | raise it for design, lower it for small edits |
| `/rewind` | Goes back to an earlier point of the session; undoes edits Claude made with its editing tools, not what shell commands did | after an edit you want undone |
| `/resume` | Reopens a previous session | the next morning |
| `/btw` | Asks a side question without derailing the main work | "what does this word mean?" |
| `/permissions` | Shows and edits what Claude may do without asking | once, after the first week |

Two ways to start that save time: `claude -c` continues the last session,
`claude -n <name>` gives the session a name you can find later.

The memory is finite. A session that runs for hours fills it; Claude then works with a
summary of its own earlier work. The method in this kit exists because of that limit:
short sessions, written state, the next session starts from files, not from memory.

## Exercise

Run these three, in this order, and tell me in one sentence each what you saw:
`/context`, then `/btw what is a git commit, in two sentences`, then `/model`.
Do not change the model; just read the list and come back.

## What a good answer contains

- `/context`: a grid or a percentage showing memory used.
- `/btw`: an answer appeared and the main conversation was not affected.
- `/model`: a list of models with one marked current.
