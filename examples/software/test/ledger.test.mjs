import { test } from "node:test";
import assert from "node:assert/strict";
import { add, total, parseAmount, formatCents } from "../src/ledger.mjs";

test("add appends an entry without mutating the input", () => {
  const before = [];
  const after = add(before, { date: "2026-10-03", cents: 1250, label: "coffee" });
  assert.equal(before.length, 0);
  assert.deepEqual(after, [{ date: "2026-10-03", cents: 1250, label: "coffee" }]);
});

test("add refuses a bad date, a non-positive amount, an empty label", () => {
  assert.throws(() => add([], { date: "3/10/2026", cents: 100, label: "x" }), /bad date/);
  assert.throws(() => add([], { date: "2026-10-03", cents: 0, label: "x" }), /bad amount/);
  assert.throws(() => add([], { date: "2026-10-03", cents: 100, label: "" }), /label/);
});

test("total sums one month only", () => {
  const entries = [
    { date: "2026-09-30", cents: 500, label: "september" },
    { date: "2026-10-01", cents: 1250, label: "coffee" },
    { date: "2026-10-03", cents: 300, label: "bread" },
  ];
  assert.equal(total(entries, "2026-10"), 1550);
  assert.equal(total(entries, "2026-09"), 500);
  assert.equal(total(entries, "2026-08"), 0);
});

test("parseAmount and formatCents round-trip in cents", () => {
  assert.equal(parseAmount("12.5"), 1250);
  assert.equal(parseAmount("3"), 300);
  assert.equal(parseAmount("0.07"), 7);
  assert.throws(() => parseAmount("1,5"), /bad amount/);
  assert.equal(formatCents(1550), "15.50");
});

import { exportCsv } from "../src/ledger.mjs";

test("exportCsv: empty month is the header only", () => {
  assert.equal(exportCsv([], "2026-10"), "date,amount,label\n");
});

test("exportCsv: entries in date order, two decimals", () => {
  const entries = [
    { date: "2026-10-03", cents: 300, label: "bread" },
    { date: "2026-10-01", cents: 1250, label: "coffee" },
    { date: "2026-09-30", cents: 500, label: "september" },
  ];
  assert.equal(
    exportCsv(entries, "2026-10"),
    "date,amount,label\n2026-10-01,12.50,coffee\n2026-10-03,3.00,bread\n",
  );
});

test("exportCsv: a label with a comma or a quote is quoted", () => {
  const entries = [
    { date: "2026-10-02", cents: 100, label: "tea, green" },
    { date: "2026-10-02", cents: 200, label: 'the "good" bread' },
  ];
  assert.equal(
    exportCsv(entries, "2026-10"),
    'date,amount,label\n2026-10-02,1.00,"tea, green"\n2026-10-02,2.00,"the ""good"" bread"\n',
  );
});

test("exportCsv refuses a bad month", () => {
  assert.throws(() => exportCsv([], "October"), /bad month/);
});
