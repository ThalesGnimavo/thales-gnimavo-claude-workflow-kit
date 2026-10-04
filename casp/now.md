# What I'm doing NOW

> **Updated** : 2026-10-04 (session 010: launch hygiene shipped across three repositories; Proof due 7 closed; Proof due 8 open).
>
> **Read this first.** The single most important file in casp/. "Where am I?" has a one-screen answer here.

---

## Current focus (1 sentence)

**A stuck reader now knows where to write, `/kit` speaks English, French and Spanish, and the
short links `/go/kit` and `/go/kit-zip` resolve to the page and to the zip attached to the
latest release;** what remains before the first outside run is one observation, Proof due 8
(the two kit links on justegnimavo.com, pushed but not yet deployed). Next session: the
distribution article (`DISTRIBUTION-ARTICLE.md`), drafts only, nothing posted.

---

## Concrete next action if I have…

### 15 minutes

Run `curl -s https://justegnimavo.com | grep -c 'go/kit'`. At 1 or more, record Proof due 8
closed in the next log; at 0, the user triggers that site's deploy.

### 1 hour

`/thales:next kit` (arbitration first: `/thales:cto kit` or `--solo`): the English draft of the
distribution article.

### 1 day

`DISTRIBUTION-ARTICLE.md` shipped in three languages on the blog as drafts, LinkedIn and
newsletter texts written and not sent; then `FIRST-OUTSIDE-RUN.md` if Proof due 8 holds.

---

## Distractions to refuse this week

- **Cutting `v0.1.1`** for the hygiene fixes: D5 wants an outside observation behind every
  release. The fixes go to `[Unreleased]`.
- **Spanish docs, Windows walkthrough, fleet without iTerm2**: backlog until the first
  outside run ranks them (D1).
- **Inviting a reader early** because the page looks ready: the criterion is written, apply
  it.
- **Fixing the blog's older defects** (`Object.hasOwn` in `/go`, sitemap, `app.html` lang)
  inside the article session: they are in the roadmap, not in its scope.

---

## Open proofs (see `roadmap.md`, "Proofs due still open at v0.1.0")

2 to 6 and 8. Proof 7 closed in session 010. Proof 8 (justegnimavo.com deploy) is the gate
of the first outside run; that run can close several of the others.
