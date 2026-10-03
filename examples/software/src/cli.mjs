#!/usr/bin/env node
import { load, save, add, total, parseAmount, formatCents, exportCsv } from "./ledger.mjs";
import { writeFileSync } from "node:fs";

const FILE = process.env.LEDGER_FILE || "ledger.json";
const [command, ...args] = process.argv.slice(2);
const today = new Date().toISOString().slice(0, 10);

function usage() {
  console.error("usage: ledger add <amount> <label...>\n       ledger total [YYYY-MM]\n       ledger export <YYYY-MM> [file]");
  process.exit(2);
}

try {
  if (command === "add") {
    const [amount, ...label] = args;
    if (!amount || label.length === 0) usage();
    const entries = add(load(FILE), { date: today, cents: parseAmount(amount), label: label.join(" ") });
    save(FILE, entries);
    console.log(`added ${formatCents(entries.at(-1).cents)} ${entries.at(-1).label} on ${today}`);
  } else if (command === "total") {
    const month = args[0] || today.slice(0, 7);
    console.log(`${month} ${formatCents(total(load(FILE), month))}`);
  } else if (command === "export") {
    const [month, file] = args;
    if (!month) usage();
    const csv = exportCsv(load(FILE), month);
    if (file) {
      writeFileSync(file, csv);
      console.log(`wrote ${csv.split("\n").length - 2} entries to ${file}`);
    } else {
      process.stdout.write(csv);
    }
  } else {
    usage();
  }
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exit(1);
}
