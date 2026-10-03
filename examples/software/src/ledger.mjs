import { readFileSync, writeFileSync, existsSync } from "node:fs";

/** Read the ledger file; a missing file is an empty ledger. */
export function load(file) {
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(data)) throw new Error(`${file}: expected a JSON array`);
  return data;
}

export function save(file, entries) {
  writeFileSync(file, JSON.stringify(entries, null, 2) + "\n");
}

/** Append one entry. Amount is in cents to avoid floating-point drift. */
export function add(entries, { date, cents, label }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`bad date: ${date}`);
  if (!Number.isInteger(cents) || cents <= 0) throw new Error(`bad amount: ${cents}`);
  if (!label) throw new Error("label is required");
  return [...entries, { date, cents, label }];
}

/** Sum of the entries of one month ("YYYY-MM"), in cents. */
export function total(entries, month) {
  return entries
    .filter((e) => e.date.startsWith(month + "-"))
    .reduce((sum, e) => sum + e.cents, 0);
}

export function parseAmount(text) {
  if (!/^\d+(\.\d{1,2})?$/.test(text)) throw new Error(`bad amount: ${text}`);
  const [units, decimals = ""] = text.split(".");
  return Number(units) * 100 + Number((decimals + "00").slice(0, 2));
}

export function formatCents(cents) {
  return (cents / 100).toFixed(2);
}

/** Quote one CSV field per RFC 4180: only when it holds a comma, a quote or a newline. */
function csvField(text) {
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** CSV text of one month: header, then one line per entry in date order. */
export function exportCsv(entries, month) {
  if (!/^\d{4}-\d{2}$/.test(month)) throw new Error(`bad month: ${month}`);
  const lines = entries
    .filter((e) => e.date.startsWith(month + "-"))
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => [e.date, formatCents(e.cents), csvField(e.label)].join(","));
  return ["date,amount,label", ...lines].join("\n") + "\n";
}
