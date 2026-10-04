---
phase: launch-hygiene
---

# 26-10-04-004 — launch-hygiene : support for a stuck reader, `/kit` in three languages, short links, release asset

**Session prompt :** `docs/plan/sessions/LAUNCH-HYGIENE.md`.
**Previous session end :** `f4f1b77` (state commit after D8).
**Delegation :** two read-only sub-agents: the post-implementation audit (GO-WITH-FIXES) and
`/verify-thales` (3/3).
**State at session start :** tree clean, cockpit current with casp 0.18.2. Opened by
`/thales:next kit --solo "one runnable slice; release upload, two site deploys and an in-session
user answer need the user present; nothing to parallelise"`; the user had offered `/thales:chain kit`
as the alternative, refused because only one phase of the queue can run without the user.

## Scope shipped

| MUST | Repository | Commit | State |
|---|---|---|---|
| 1. Issue template `stuck-during-install` + `config.yml` | kit | `1c31a81` | proven |
| 2. Support line in `INSTALL.md` (EN, FR) and both `README.md` halves; `[Unreleased]` entries | kit | `1c31a81` | proven (pushed) |
| 3. `/kit` in EN, FR, ES: `kit.*` keys, shared `KitPage.svelte`, `[lang=lang]/kit`, hreflang, homepage links prefixed, support line on the page | blog | `c9428db`, `e11bfe6`, `ac89799`, `01a60b4` | proven |
| 4. justegnimavo.com: Featured Writing link via `/go/kit`, `workflow-kit` row in Open Source | justegnimavo-com | `35e2b67` | **open, Proof due 8** |
| 5. Short links `kit`, `kit-zip`; release asset `claude-workflow-kit.zip` on v0.1.0; release steps in `CHANGELOG.md` | blog + kit | `e11bfe6`, `1c31a81` | proven |

SHOULD: Proof due 7 answered by the user in the session (below). DEFER: nothing deferred from the
prompt's list.

## Proofs (production, 2026-10-04)

```
$ gh release view v0.1.0 --json assets -q '.assets[] | "\(.name) \(.size)"'
claude-workflow-kit.zip 336420
$ gh api repos/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/contents/.github/ISSUE_TEMPLATE -q '.[].name'
config.yml
stuck-during-install.yml
2026-10-04T10:07:53Z
$ curl -s https://thalesandhisaictoclaude.com/fr/kit | grep -o "<title>[^<]*"
<title>Claude Workflow Kit — mener n'importe quel projet avec Claude Code | Juste Thales Gnimavo &amp; Claude
$ curl -s https://thalesandhisaictoclaude.com/es/kit | grep -o "<title>[^<]*"
<title>Claude Workflow Kit — lleva cualquier proyecto con Claude Code | Juste Thales Gnimavo &amp; Claude
$ curl -s https://thalesandhisaictoclaude.com/fr | grep -o href="/fr/kit"
href="/fr/kit"
href="/fr/kit"
$ curl -s https://justegnimavo.com | grep -c go/kit ; grep -c thales-gnimavo-claude-workflow-kit
0
0
$ curl -s -o /dev/null -w "%{http_code} %{redirect_url}" https://thalesandhisaictoclaude.com/go/kit
302 https://thalesandhisaictoclaude.com/kit
$ ... /go/kit-zip
302 https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/releases/latest/download/claude-workflow-kit.zip
$ curl -sL -o kit.zip https://thalesandhisaictoclaude.com/go/kit-zip && unzip -l kit.zip | tail -1
   595286                     195 files
$ curl -s https://thalesandhisaictoclaude.com/es/kit | grep -c stuck-during-install
1
```

Local, before the push: `responsive-check` on `/kit`, `/fr/kit`, `/es/kit`, `/fr` at 390, 768 and
1280 px: `SUCCÈS — 12 rendu(s) sans débordement horizontal`, after fixing a 285 px overflow at
390 px that already existed on the English page (`li.glass-card`, a `<pre>` in a grid item;
`min-w-0`, commit `ac89799`). justegnimavo `index.html` at 390 and 1280 px: `SUCCÈS — 2 rendu(s)`.
Screenshots read, not only counted. `tdz-scan` on the three new files: `OK`.
`/verify-thales` (report `ThalesAndHisAiCtoClaude.com/verification/verify-261004-0957.md`):
`0 ERRORS 19 WARNINGS`, build and `prisma validate` pass; none of the warnings is in a touched file.

**Proof due 8:** `curl -s https://justegnimavo.com | grep -c 'go/kit'` ≥ 1 and
`grep -c 'thales-gnimavo-claude-workflow-kit'` ≥ 1 — on justegnimavo.com — blocked by the deploy
of `35e2b67`: pushed at 09:57Z, both counts still `0` at 10:08:30Z. The previous push of that
repository (`0fd8d50`, 2026-10-01) is live, so the pipeline works; whether it deploys on push or
by hand is not documented in that repository and not visible from here.

## Proof due 7 — closed

Reported by the user in the session (`AskUserQuestion`, answer "Oui aux deux"), not captured by a
command, the same standard as the first half in log `26-10-04-002`: in a session opened from the
kit root, the personal `/next` still loads, and the `/thales:` commands appear without
`/reload-plugins`.

## Audit (read-only sub-agent): GO-WITH-FIXES

Applied: Spanish angle quotes in the first message, a stray blank line (`01a60b4`); the release
asset uploaded (its one FAIL, by design pending the go). Kept, see decisions: the optional third
field of the issue template, the Spanish sentence promising answers in Spanish.

## Decisions taken without the user

- **`/thales:next --solo` rather than `/thales:chain`.** Only launch-hygiene can run unattended;
  the article ends in a publication and the outside run needs a person. Way back: none needed.
- **Optional third field "Which computer do you use?"** in the issue template, beyond the two the
  prompt named: Mac or Windows changes the diagnosis from step 2. Way back: delete lines 31 to 37.
- **Label `question`** (existing) rather than a new `install` label: creating a label is a write on
  the public repository nobody asked for. Way back: create the label, change line 4.
- **Spanish `/kit` says Claude answers in Spanish anyway**: true by the root `CLAUDE.md`
  `<language>` rule. Way back: drop the sentence from `kit.manual` in `es.ts`.
- **English `kit.zipBody` / `kit.zipButton` reworded** ("the latest release") because the button
  now resolves to `releases/latest`; every other English string moved verbatim (audit item 7).
- **The VERIFY grep for justegnimavo.com uses `go/kit`**: the prompt's `thalesandhisaictoclaude.com/kit`
  predates D8 and would count 0 on correct markup.
- **Phase shipped with MUST 4 open as Proof due 8**: the code is pushed; what remains is an
  observation, not a session. FIRST-OUTSIDE-RUN stays gated on it. Way back: re-queue
  `launch-hygiene` and point `next_prompt` back at it.

## Files touched

Kit: `.github/ISSUE_TEMPLATE/{stuck-during-install,config}.yml` (new), `INSTALL.md`, `README.md`,
`CHANGELOG.md`; cockpit at the close. Blog: `src/lib/i18n/{en,fr,es}.ts`,
`src/lib/components/KitPage.svelte` (new), `src/routes/kit/+page.svelte`,
`src/routes/[lang=lang]/kit/+page.svelte` (new), `src/lib/components/HomePage.svelte`,
`src/lib/server/tracked-assets.ts`. justegnimavo-com: `index.html`.

## Deferred / risks

- Proof due 8 (above): the first check of the next session.
- `/go/[slug]` looks the slug up with `TRACKED_ASSETS[params.slug]`; `__proto__` or `constructor`
  would reach `redirect()` with an object (a 500, not an open redirect). Older than this session;
  `Object.hasOwn` is the one-line fix. Noted in the roadmap.
- `/kit`, `/fr/kit`, `/es/kit` are missing from the blog's sitemap; `src/app.html` sets
  `lang="en"` on every page, French and Spanish included. Older; noted.
- The `v0.1.0` badge on `/kit` is hardcoded while the zip button follows `latest`: bump it with
  the next release.

## Next

`/thales:next kit` opens `DISTRIBUTION-ARTICLE.md` (arbitration needed: `/thales:cto kit` or
`--solo`). First, re-run the Proof due 8 command; the outside run waits for it.
