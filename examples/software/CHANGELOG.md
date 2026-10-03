# Changelog

All notable changes to this project. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- `ledger export <YYYY-MM> [file]`: the month as CSV (`date,amount,label`, RFC 4180 quoting), to a file or to stdout.
- `ledger add <amount> <label>`: appends an entry (date, amount in cents, label) to `ledger.json`.
- `ledger total [YYYY-MM]`: prints the month's total.
- The gate: `npm test` (node:test) and `npm run check` (`node --check` on every source file).
