# Native commands

The commands below belong to Claude Code itself, not to the kit. The kit's own commands
(`/next`, `/casp`, `/day` …) live in `.claude/skills/` and are listed in the root
`CLAUDE.md`. This sheet exists because the root `CLAUDE.md` and `pitfalls.md` name five native
commands (`/compact`, `/context`, `/rewind`, `/model`, `/schedule`) and a first week meets
a few more.

## Checked against which version, and how

- **Version.** `claude --version` printed `2.1.288 (Claude Code)` on 2026-10-03 (macOS,
  Homebrew cask `claude-code@latest`).
- **Method.** Claude Code embeds its command table in the installed binary. Each line
  below was read from that table (`strings` on the binary, then a search for
  `name:"<command>",description:"…"`), so the one-line description is the program's own,
  not a memory. Three commands were also run from a non-interactive session
  (`claude -p "/<command>"`): the raw results are under "What you should see".
- **Limit.** A description read from the binary proves the command exists in this build.
  It does not prove how the screen looks when you type it: that part is interactive, and
  this sheet was written from a session that has no screen. Commands whose behaviour was
  not observed are listed under "To confirm on your machine", with the command that
  confirms them.

Your version may differ. Type `/help` in an interactive session and compare: a command
listed here that `/help` does not show has been renamed or removed in your build; trust
`/help`.

## The ones the manual relies on

| Command | What it does (Claude Code's own words, 2.1.288) | When the kit uses it |
|---|---|---|
| `/compact` | Free up context by summarizing the conversation so far | when Claude says the context is getting long and the slice is not finished; it buys time, it does not replace a close (`pitfalls.md`, pitfall 3) |
| `/context` | Visualize current context usage as a colored grid | before deciding between "finish the slice" and "close now" |
| `/rewind` | aliases `/checkpoint`, `/undo`; restores code, conversation, or both, to an earlier user message | after a bad edit, before the next prompt; interactive only (`supportsNonInteractive: false` in the table) |
| `/model` | Set model for this session (not persisted) | named in the root `CLAUDE.md`; choose once per session, the choice does not survive `/clear` |
| `/schedule` | aliases `/routines`; create and manage scheduled remote Claude Code agents | not used by the kit's commands; `/chain` runs locally and needs no schedule |

## The ones a first week meets

| Command | What it does (Claude Code's own words, 2.1.288) |
|---|---|
| `/help` | Show help and available commands |
| `/clear` | Start a new session with empty context; previous session stays on disk (resumable with `/resume`) |
| `/resume` | Resume a previous conversation |
| `/exit` (alias `/quit`) | leave the session |
| `/status` | Show Claude Code status including version, model, account, API connectivity, and tool statuses |
| `/usage` (aliases `/cost`, `/stats`) | Show session cost, plan usage, and activity stats |
| `/permissions` (alias `/allowed-tools`) | Manage allow and deny tool permission rules |
| `/config` | Open settings |
| `/mcp` | Manage MCP servers |
| `/memory` | Edit CLAUDE.md files and memory settings |
| `/skills` | List available skills (the kit's commands appear here) |
| `/doctor` (alias `/checkup`) | checks the installation; the description is computed at run time |
| `/init` | writes a first `CLAUDE.md` for a folder; the kit's `/new-project` does this for you, from a template |
| `/plan` | Enable plan mode or view the current session plan |
| `/btw` | Ask a quick side question without interrupting the main conversation |
| `/version` | Print the version this session is running (not what autoupdate downloaded) |
| `/release-notes` | what changed in Claude Code; interactive only |
| `/login`, `/logout` | sign in with or out of your Anthropic account |
| `/bug`, `/feedback` | Report a bug or share your conversation; send feedback to Anthropic |

Six of these have no description in the table (`/rewind`, `/exit`, `/doctor`, `/init`,
`/release-notes`, `/login`): the program builds the text at run time from your settings.
The wording above for those is this manual's, not the program's.

## What to type

In an interactive session, from the kit's folder:

```
claude
/help
/context
/skills
```

From a terminal, to confirm the version this sheet was checked against:

```
claude --version
```

## What you should see

`claude --version`, 2026-10-03:

```
2.1.288 (Claude Code)
```

The same three commands from a non-interactive session (`claude -p`), 2026-10-03. The
first is instructive: `/version` is not in the non-interactive table, so Claude read it
as a question and answered from the folder; the other two print the program's own refusal.

```
### claude -p "/version"
`/version` n'est pas une commande installée ici. Voici les versions relevées :
[a table of kit, casp and Claude Code versions]

### claude -p "/status"
/status isn't available in this environment.

### claude -p "/help"
/help isn't available in this environment.
```

Lesson: the native commands are for the interactive screen. The kit's commands
(`/next`, `/casp` …) are skills and work in both modes; that is how `/chain` runs them.

## To confirm on your machine

Not observed from this session; run the command and compare with the table.

- `/help`: the list it prints is the authority for your build. If `/rewind`, `/compact`
  or `/context` are missing, note the version and read the release notes.
- `/rewind`: open it once on a throwaway change to see the three choices (restore code,
  restore conversation, restore both) before you need it in anger.
- `/permissions`: check that the kit's `.claude/settings.json` rules appear under the
  allow list.
- `/doctor`: run it once after `/setup`; it is the program's own check of the install.
