---
phase: distribution-article
---

# 26-10-04-005 — distribution-article : "how we built the kit" drafted in three languages, nothing published

**Session prompt :** `docs/plan/sessions/DISTRIBUTION-ARTICLE.md`.
**Previous session end :** `eccae20` (state commit shipping launch-hygiene).
**Delegation :** two `general-purpose` sub-agents in parallel for the French and Spanish
translations, each briefed with the three context-discipline rules; everything else inline.
No post-implementation audit: content only, no code (§7.1 "sessions purement documentaires").
**State at session start :** tree clean, `origin/main` = `HEAD`, cockpit current with casp
0.18.2. Opened by `/thales:cto kit`, arbitration solo (one article written sequentially;
publication is level 1). Blog repository with two untracked files from other work, left
alone.

## Discrepancies found at the opening (reported to the user before the first line)

1. The prompt's VERIFY ("the three article URLs answer 200 after the deploy") and its close
   ("commit, push") treat publication as a session step. On the blog, publication is the
   sync of `prisma/sync-*.ts` into the database, not the push: the `Dockerfile` runs
   `prisma migrate deploy && node build`, no sync. Publication is an external commitment
   (root `CLAUDE.md`, `<never>`): drafts only this session.
2. **"Proof due 7 closed" in the cockpit is a numbering collision.** Log `26-10-04-004` closed
   its own "Proof due 7", which is the interactive coexistence item (roadmap list, item 6).
   D1's criterion for the first outside reader is the **blank-machine run** (roadmap list,
   item 7), and it is still open. `casp/roadmap.md` row 2 and `casp/now.md` said otherwise;
   corrected in this session's state commit. `FIRST-OUTSIDE-RUN.md` had it right.

## Scope shipped

### MUST 1 — the article, three languages (blog repository, `caaaf66`)

`draft/ai-cto-duties/post16/how-we-built-the-claude-workflow-kit{.md,.fr.md,.es.md}`,
pillar `thales`, series `ai-cto-duties` (the "Thales workflow" series of the blog), same
structure in the three: what the kit is; who it is for (the two readers of `/kit`, from the
page's own strings); the three install steps verbatim (English `INSTALL.md`; French
`INSTALL.md` lines 99-158 for FR; Spanish translated, with the site's `kit.firstMessage`,
and saying `INSTALL.md` exists in English and French); what is untested, placed **before**
the build story, the `[0.1.0]` list unedited plus one line on the single item answered
since (by the author's report, not a first-time install); how it was built (ten sessions,
the shipped table, the plugin rename with Claude's overruled recommendation, four
refusals); the `/kit` link in the reader's language; the issues link (D4).

### MUST 2 — humanizer pass

`/thales:humanizer` on the English draft: two sentences changed (a metaphor, a slogan
closing line replaced by the concrete cost of skipping a stop); no em dash, no AI-vocabulary
hit. The same two changes carried by hand into FR and ES. The install section and the
untested list are quotations and were not touched.

### MUST 3 and SHOULD — LinkedIn and newsletter

`draft/social-linkedin-claude-workflow-kit.md` (blog repository, next to the existing
`draft/social-thread-*.md`): LinkedIn post EN and FR, ten lines each, linking the article;
newsletter paragraph EN and FR. Header says: draft, not posted, not sent, live links only
after the sync.

## Proofs (2026-10-04)

```
$ for f in post16/*.md; do … grep -c 'claude.com/kit' / '/fr/kit' / '/es/kit'; done   # 10:18:29Z
how-we-built-the-claude-workflow-kit.es.md en=0 fr=0 es=2
how-we-built-the-claude-workflow-kit.fr.md en=0 fr=2 es=0
how-we-built-the-claude-workflow-kit.md en=2 fr=0 es=0
$ curl -s -o /dev/null -w '%{http_code}' https://www.thalesandhisaictoclaude.com/thales/how-we-built-the-claude-workflow-kit
404
```

The 404 is expected: not synced. **Proof due:** the three URLs answer 200 with the right
`<title>` — on www.thalesandhisaictoclaude.com (`/thales/how-we-built-the-claude-workflow-kit`,
`/fr/thales/comment-nous-avons-construit-le-kit-claude`, `/es/thales/como-construimos-el-kit-claude`)
— blocked by the user's publish go (sync entries, sync, `llms.txt`, push).

**Proof due 8 — closed** (from log `26-10-04-004`, justegnimavo.com links):

```
$ date -u; curl -s https://justegnimavo.com | grep -c 'go/kit'      # 2026-10-04T10:18:45Z
1
$ curl -s https://justegnimavo.com | grep -o 'href="[^"]*…"' | sort -u
href="https://github.com/ThalesGnimavo/thales-gnimavo-claude-workflow-kit"
href="https://thalesandhisaictoclaude.com/go/kit?utm_source=justegnimavo.com&amp;utm_medium=hero"
```

## Decisions taken without the user

- **No sync entries added to `prisma/sync-ai-cto-duties.ts`.** An entry in a sync file is
  published by the next `sync-all` anyone runs for another article; the essays precedent in
  the blog's `CLAUDE.md` shows the risk is real. Way back: add the three entries (shape of
  post15, slugs below) when the go comes.
- Slugs: EN `how-we-built-the-claude-workflow-kit` (also the `translationKey`), FR
  `comment-nous-avons-construit-le-kit-claude`, ES `como-construimos-el-kit-claude`. Way
  back: rename the files' future sync entries; nothing references them yet but the social draft.
- `author: both`, `product: zerosuite` (as post15), `category: methodology`,
  `date: 2026-10-04`. **The date drives `publishedAt` and is create-only: confirm or change it
  on the publish go.**
- The untested section comes before the build story. Way back: move one section.
- The blog commit was not pushed: the drafts would be public in the repository before the
  user has read them. Way back: `git -C ../ThalesAndHisAiCtoClaude.com push`.

## Deferred / risks

- Video or screenshot sequence: deferred by the prompt, after the first outside run.
- The `[0.1.0]` "Untested" list in `CHANGELOG.md` still names the `/reload-plugins` item,
  answered since by the user's report. Left for the next release's notes.
- **The first outside run cannot start yet:** its criterion (blank-machine run observed) is
  open, and the blank-machine run by a first-time reader is close to being the outside run
  itself. Needs the user: either the author runs `INSTALL.md` on a clean macOS user account
  (observable, closes item 7, unlocks the reader), or the criterion is restated. Level 1.

## Files touched

- Blog (`caaaf66`): `draft/ai-cto-duties/post16/` (3 files), `draft/social-linkedin-claude-workflow-kit.md`.
- Kit: this log, `casp/` (state, now, roadmap), `docs/plan/sessions/DISTRIBUTION-ARTICLE.md`
  (shipped), `docs/plan/sessions/FIRST-OUTSIDE-RUN.md` (`next_after`).

## Next

`FIRST-OUTSIDE-RUN.md`, blocked by the blank-machine run (above). Independent of it, on the
user's go: publish post16 (sync entries, sync, `llms.txt`, push the blog), then post the
LinkedIn draft.
