---
status: queued
session_id: pending
session_log: pending
drafted_at: 2026-10-04
next_after: launch-hygiene
---

# Session — distribution-article : "how we built the kit", the one page the first reader comes from

> **Status : QUEUED.** Drafted at the close of the discussion session `26-10-04-003`
> (decision record `docs/plan/decisions/2026-10-04-after-v0-1-0.md`, D2). Runs after
> `LAUNCH-HYGIENE.md` has shipped: the article links a `/kit` page that must already be in
> three languages. One session.

**Project root.** the kit root for the cockpit; the article is written in the blog's
repository (`ThalesAndHisAiCtoClaude.com`) through its own article pipeline, EN/FR/ES, under
the pillar that repository's `CLAUDE.md` names for "how we build" pieces.

---

## CONTEXT

- D2: one article first, because the blog is the channel already built and measured; the
  LinkedIn post and the newsletter link the article, not the product page.
- One message to lead with: "three steps, then Claude does the rest with you".
- Sources for the piece, all in this repository: `session-logs/` (ten sessions in two days,
  with what was refused and deferred), `docs/plan/decisions/2026-10-04-after-v0-1-0.md`,
  `CHANGELOG.md` `[0.1.0]` with its untested list, `README.md` (the plugin decision).

## REFERENCE FILES

- The blog repository's `CLAUDE.md`: article front matter, pillar names, the three-language
  rule, the humanizer pass if it names one.
- `docs/en/` chapters 1 and 2 of the kit: the words the article reuses for the method.
- `casp/roadmap.md` "Shipped this week": the dates and commits the article cites.

---

## SCOPE

### MUST HAVE

1. One article, three languages, same structure: what the kit is (one paragraph), who it is
   for (the two readers of the `/kit` page), the three install steps verbatim from
   `INSTALL.md`, one honest section on what is untested (the `[0.1.0]` list, not softened),
   how it was built (sessions, refusals, the plugin rename), the link to `/kit` in the
   reader's language, the issues link (D4).
2. `/thales:humanizer` pass on each language before commit, if the blog's rules allow it.
3. A LinkedIn post draft (EN and FR, ten lines each) saved in the blog repository where its
   `CLAUDE.md` keeps drafts, linking the article. **Not posted**: posting is the user's,
   level 1.

### SHOULD HAVE

- The newsletter paragraph, same place as the post draft, not sent.

### DEFER

- Any video or screenshot sequence: a later session, after the first outside run.

---

## VERIFY

- The three article URLs answer 200 with the right `<title>` after the deploy; before it,
  `Proof due`.
- Each article links `/kit`, `/fr/kit` or `/es/kit` according to its language (grep).
- `casp check` exit 0 in the kit.

## DO NOT

- Do not post, send or schedule anything: drafts only.
- Do not describe the kit as tested where the changelog says untested.
- Do not write product code in the kit.

## AT END OF SESSION

1. Kit log with the article URLs (or the proof due), the draft paths, what was left out.
2. `casp ship distribution-article --log <id>`; `next_prompt` → `FIRST-OUTSIDE-RUN.md`.
3. `casp/now.md`, `casp/roadmap.md`; `casp check` 0 FAIL; commit, push.

## EXPECTED OUTPUT

A page the user can link from LinkedIn and the newsletter when they decide the kit is ready
for its first reader (D1 criterion), written in the three languages the blog already serves.
