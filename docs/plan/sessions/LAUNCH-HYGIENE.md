---
status: shipped
session_id: pending
session_log: session-logs/26-10-04-004-launch-hygiene.md
drafted_at: 2026-10-04
next_after: 26-10-04-003-after-v0-1-0
---

# Session — launch-hygiene : the known defects fixed before the first outside reader

> **Status : QUEUED.** Drafted at the close of the discussion session `26-10-04-003`
> (decision record `docs/plan/decisions/2026-10-04-after-v0-1-0.md`, D1, D4, D6, D7, D8).
> One session. Opened by `/thales:cto kit` or `/thales:next kit --solo "<reason>"`.

**Project root.** the kit root. Two companion repositories are edited in the same session,
each under its own `CLAUDE.md`: `ThalesAndHisAiCtoClaude.com` (the blog, SvelteKit) and
`justegnimavo-com` (static HTML). Their commits live in their repositories; their proofs
are recorded in this session's kit log.

---

## CONTEXT — what changed since the discussion

- `v0.1.0` is tagged, public, and has a GitHub Release with the changelog as notes (D3).
- `/fr/kit` and `/es/kit` render the empty pillar listing: the site has no `kit` route per
  language and the page is English with no i18n key (`src/routes/kit/+page.svelte`,
  0 `t(lang, …)` calls). The homepage links `/kit` literally (`HomePage.svelte:51` and
  `:125`), while every other product uses `pillarHref()`.
- justegnimavo.com has no link to the kit at all.
- The user's criterion for the first outside reader: this slice shipped and Proof due 7
  observed. Not before.

## REFERENCE FILES (read these before writing)

- `docs/plan/decisions/2026-10-04-after-v0-1-0.md` — D4, D6, D7 with their reasons.
- `INSTALL.md`, `README.md` (EN and FR halves) — where the support line goes.
- Website: `src/routes/kit/+page.svelte`, `src/routes/casp/+page.svelte` (same layout
  classes), `src/lib/components/HomePage.svelte` lines 30 to 52 and 120 to 130,
  `src/lib/i18n/{en,fr,es}.ts` (keys `downloadKit`, `kitDesc` already exist),
  `src/params/lang.ts` (fr and es only; English is unprefixed).
- justegnimavo.com: `index.html` lines 140 to 170 (Featured writing block, Open source list).

---

## SCOPE (must-have → should-have → defer)

### MUST HAVE — ship these or don't push

1. **Issue template** (kit): `.github/ISSUE_TEMPLATE/stuck-during-install.yml`, two fields
   ("At which step did you stop?" with the three steps of `INSTALL.md` as choices, "What
   was printed on the screen?" as a text area), plus `config.yml` with `blank_issues_enabled:
   true`. Plain words, no jargon: the reader may never have opened a terminal.
2. **Support line** (kit): one sentence in `INSTALL.md` after step 3 and in the two README
   halves: where to write when stuck, with the issues URL. `CHANGELOG.md` `[Unreleased]`
   carries the two entries.
3. **`/kit` in three languages** (website): the page strings move to i18n keys (one prefix,
   `kit.*`), the component is shared by `src/routes/kit/+page.svelte` and
   `src/routes/[lang=lang]/kit/+page.svelte` (a static segment wins over `[pillar]`);
   `<title>`, description, canonical and `og:url` per language; the Spanish text says the
   kit's manual exists in English and French. Homepage: button and card use the language
   prefix like `pillarHref()`. The support line (D4) appears on the page.
4. **Links on justegnimavo.com**: a second button in "Featured writing" to
   `https://thalesandhisaictoclaude.com/go/kit?utm_source=justegnimavo.com&utm_medium=hero`,
   and a `workflow-kit` row in "Open source" to the GitHub repository, same markup as the
   casp row. Update `llms.txt` and the JSON-LD `sameAs` only if they list repositories.

5. **Short links** (D8). Website: two entries in `src/lib/server/tracked-assets.ts`,
   `kit` → `https://thalesandhisaictoclaude.com/kit` and `kit-zip` →
   `https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/releases/latest/download/claude-workflow-kit.zip`
   (absolute targets; the allowlist stays hardcoded, no request-supplied URL). The justegnimavo
   button and the `/kit` page's zip button use the two slugs. Kit: build the asset from the tag
   and upload it under the fixed name, then add the upload line to the release steps in
   `CHANGELOG.md`'s header or `README.md`:

   ```bash
   git archive --format=zip --prefix=thales-gnimavo-claude-workflow-kit/ -o claude-workflow-kit.zip v0.1.0
   gh release upload v0.1.0 claude-workflow-kit.zip
   ```

### SHOULD HAVE — same session if time permits

- The two lines left open in Proof due 7 (does `/next` still load the personal skill in the
  same session; do `/thales:` commands appear before `/reload-plugins`): the user answers,
  the log records.

### DEFER if time runs short

- Anything in Spanish beyond the `/kit` page strings. Spanish docs stay in the backlog (D1).

---

## BUILD (in this order)

1. Kit: template, support lines, changelog. Commit by pathspec in the kit.
2. Website: i18n keys first (the shared file is committed before its consumer), then the
   component and the two routes, then the homepage. Build only with the user's approval
   (that repository's rule); otherwise push and run `/verify-thales`.
3. justegnimavo.com: the two links. That site's deploy is its own (Dockerfile): follow its
   `CLAUDE.md` or `NEXT-SESSION-DESIGN-ROLLOUT.md` for the push step.

## VERIFY

- `curl -s https://thalesandhisaictoclaude.com/fr/kit | grep -o '<title>[^<]*'` shows the
  French title, same for `/es/kit`, after the deploy. Before it: `Proof due`.
- `curl -s https://thalesandhisaictoclaude.com/fr | grep -o 'href="/fr/kit"'` finds the
  homepage button.
- `curl -s https://justegnimavo.com | grep -c 'thalesandhisaictoclaude.com/kit'` ≥ 1 and
  `grep -c 'thales-gnimavo-claude-workflow-kit'` ≥ 1, after the deploy.
- `gh issue create --web` is not run; `gh api repos/ThalesGnimavo/thales-gnimavo-claude-workflow-kit/contents/.github/ISSUE_TEMPLATE` lists the two files after the push.
- `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://thalesandhisaictoclaude.com/go/kit`
  prints `302` and the `/kit` URL; same for `/go/kit-zip` with the `releases/latest/download`
  URL; then `curl -sL -o /tmp/kit.zip https://thalesandhisaictoclaude.com/go/kit-zip && unzip -l /tmp/kit.zip | tail -1`
  shows the file count.
- `casp check` exit 0.

## DO NOT

- Do not cut `v0.1.1` in this session: D5 wants an outside observation behind every release.
- Do not rewrite the English text of `/kit` while moving it to keys; translate, do not edit.
- Do not touch `casp/` of another project; the two companion repositories have none to touch.
- Do not invite anyone to the kit yet (D1 criterion).

## AT END OF SESSION

1. Log `session-logs/26-10-XX-NNN-launch-hygiene.md` with the raw proofs above, the
   companion commits' SHAs in their repositories, and anything deferred.
2. `casp ship launch-hygiene --log <id>`; `next_prompt` → `DISTRIBUTION-ARTICLE.md`.
3. `casp/now.md`, `casp/roadmap.md` rewritten; `casp check` 0 FAIL; commit, push.

## EXPECTED OUTPUT

A French or Spanish reader who clicks the homepage button lands on a page in their language,
a stuck reader knows where to write, and the author's own site points at the kit twice. No
release, no invitation yet.
