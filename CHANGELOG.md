# Changelog

All notable changes to this kit. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Root `CLAUDE.md`: roles, session cycle, decision levels, verification, context discipline.
- `INSTALL.md` (EN + FR): the five human steps before the first `claude`.
- `/setup`: machine check, `casp` install, profile written to `.kit/profile.json`.
- `/learn`: guided tour of the method, one exercise per chapter.
- Project-level `.claude/settings.json` with safe default permissions.
- The kit's own `casp/` cockpit.
- `.claude/skills/README.md`: the frontmatter and path conventions every skill follows.
- `/casp <project>`: the cockpit read from the kit root (`status`, `check`, `where`, snapshot).
- `/next <project>`: the queued session, with the arbitration gate and `--solo "<reason>"`.
- `/cto <project>`: the steering session, solo-or-fleet arbitration recorded in `state.json`.
- `/notify`: end-of-session summary on desktop, email or webhook; `.env` is read by a
  script, never by Claude.
- `/update`: fast-forward pull of the kit, refused on a dirty tree.
- `/humanizer`: copied as is from the author's kit.
