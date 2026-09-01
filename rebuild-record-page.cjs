#!/usr/bin/env node
/**
 * REBUILD verified-records.html WITH SEPARATE SPORT RECORDS
 *
 *   node rebuild-record-page.cjs
 *
 * 1. Moves any "CFB:" style prefix out of the pick text into a real
 *    `sport` field, and defaults everything else to MLB.
 * 2. Rebuilds verified-records.html with:
 *      - a combined all-sports block
 *      - a separate block per sport (record / win rate / picks / streak / units)
 *      - a Sport column in the pick table
 * 3. Leaves record-data.json as the single source of truth.
 *
 * Safe to re-run. Backs up both files first.
 */
const fs = require("fs");

const DATA = "record-data.json";
const OUT = "verified-records.html";
if (!fs.existsSync(DATA)) { console.error("record-data.json not found — run from fsp-current"); process.exit(1); }

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
fs.copyFileSync(DATA, `${DATA}.bak2-${stamp}`);
if (fs.existsSync(OUT)) fs.copyFileSync(OUT, `${OUT}.bak2-${stamp}`);

const d = JSON.parse(fs.readFileSync(DATA, "utf8"));

// ---- 1. normalise sport ----
let moved = 0, defaulted = 0;
d.days.forEach(day => day.picks.forEach(p => {
  const m = /^([A-Za-z]{2,4}):\s*(.*)$/.exec(p.pick || "");
  if (m) { p.sport = m[1].toUpperCase(); p.pick = m[2]; moved++; }
  else if (!p.sport) { p.sport = "MLB"; defaulted++; }
}));
fs.writeFileSync(DATA, JSON.stringify(d, null, 2));
console.log(`sport field: ${moved} extracted from pick text, ${defaulted} defaulted to MLB`);

// ---- 2. helpers ----
const LABEL = { MLB: "MLB", CFB: "College Football", NFL: "NFL", NBA: "NBA", NHL: "NHL", CBB: "College Basketball" };
const ORDER = ["MLB", "CFB", "NFL", "NBA", "NHL", "CBB"];

const all = [];
d.days.forEach(x => x.picks.forEach(k => all.push(k)));

const sports = [...new Set(all.map(k => k.sport))]
  .sort((a, b) => {
    const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });

function tally(sport) {
  let w = 0, l = 0, p = 0;
  all.forEach(k => {
    if (sport && k.sport !== sport) return;
    k.result === "W" ? w++ : k.result === "L" ? l++ : p++;
  });
  const dec = w + l;
  return { w, l, p, total: w + l + p, pct: dec ? ((w / dec) * 100).toFixed(1) : "0.0", units: (w * 0.91 - l).toFixed(2) };
}

function ordered(day, sport) {
  return day.picks.map((k, i) => ({ k, i }))
    .filter(x => !sport || x.k.sport === sport)
    .sort((a, b) => {
      const ta = a.k.time || "", tb = b.k.time || "";
      if (ta && tb && ta !== tb) return ta < tb ? -1 : 1;
      return a.i - b.i;
    })
    .map(x => x.k);
}

function streak(sport) {
  const f = [];
  d.days.slice().sort((a, b) => b.day - a.day)
    .forEach(day => ordered(day, sport).slice().reverse().forEach(k => f.push(k.result)));
  const first = f.find(r => r === "W" || r === "L");
  if (!first) return "-";
  let n = 0;
  for (const r of f) { if (r === first) n++; else if (r !== "P") break; }
  return first + n;
}

const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmt = iso => { const [y, m, dd] = iso.split("-").map(Number); return `${M[m-1]} ${dd}, ${y}`; };
const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const T = tally(null);
const days = d.days.slice().sort((a, b) => b.day - a.day);

const statBlock = (label, t, st) => `
  <h2>${label}</h2>
  <div class="stats">
    <div class="stat"><b>${t.w}-${t.l}${t.p ? "-" + t.p : ""}</b><span>Record</span></div>
    <div class="stat"><b>${t.pct}%</b><span>Win rate</span></div>
    <div class="stat"><b>${t.total}</b><span>Picks graded</span></div>
    <div class="stat"><b>${st}</b><span>Current streak</span></div>
    <div class="stat"><b>${t.units > 0 ? "+" : ""}${t.units}u</b><span>Units at -110</span></div>
  </div>`;

const rows = days.map(x => ordered(x, null).slice().reverse().map(k => {
  const c = k.result === "W" ? "win" : k.result === "L" ? "loss" : "push";
  const mk = k.result === "W" ? "&#10003;" : k.result === "L" ? "&#10007;" : "~";
  const tm = k.time ? ` <span style="color:#5a5a5a;font-size:12px">${esc(k.time)}</span>` : "";
  return `<tr><td class=d>Day ${x.day}</td><td class=dt>${esc(fmt(x.date))}${tm}</td><td class=dt>${esc(k.sport)}</td><td class=pk>${esc(k.pick)}</td><td class=sc>${esc(k.score || "")}</td><td><span class="badge ${c}">${mk} ${k.result}</span></td></tr>`;
}).join("\n")).join("\n");

const dayRows = days.map(x => {
  const w = x.picks.filter(k => k.result === "W").length;
  const l = x.picks.filter(k => k.result === "L").length;
  return `<tr><td class=d>Day ${x.day}</td><td class=dt>${esc(fmt(x.date))}</td><td class=sc>${w}-${l}</td></tr>`;
}).join("\n");

const perSport = sports.length > 1
  ? sports.map(s => statBlock(LABEL[s] || s, tally(s), streak(s))).join("")
  : "";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verified Pick Record | FreeSportsPicks.pro</title>
<meta name="description" content="Every FreeSportsPicks.pro pick, published before the game and graded against the official final score. Wins and losses both, separated by sport.">
<link rel="canonical" href="https://www.freesportspicks.pro/verified-records.html">
<style>
:root{--navy:#0A0A0A;--panel:#111;--gold:#C9A84C;--cream:#F5F5F0;--muted:#808080;--win:#3FB27F;--loss:#D65D5D;--push:#8A93A6;--line:rgba(201,168,76,.2)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--navy);color:var(--cream);font-family:Arial,Helvetica,sans-serif;line-height:1.6;padding:24px 16px}
.wrap{max-width:960px;margin:0 auto}
h1{font-size:30px;margin-bottom:6px}
.sub{color:var(--muted);font-size:14px;margin-bottom:26px}
.stats{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:14px}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:14px}
.stat b{display:block;font-size:26px;color:var(--gold)}
.stat span{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.cov{background:var(--panel);border-left:3px solid var(--gold);border-radius:4px;padding:16px 18px;margin:26px 0;font-size:14.5px;color:var(--muted)}
h2{font-size:19px;margin:28px 0 10px;color:var(--gold)}
table{width:100%;border-collapse:collapse;margin-bottom:26px;font-size:14px}
th{text-align:left;padding:9px 8px;border-bottom:2px solid #222;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}
td{padding:10px 8px;border-bottom:1px solid #1a1a1a;color:var(--muted);vertical-align:top}
td.pk{color:var(--cream)}
td.d{white-space:nowrap}
.badge{padding:2px 9px;border-radius:3px;font-weight:700;font-size:12px;white-space:nowrap}
.badge.win{background:rgba(63,178,127,.15);color:var(--win)}
.badge.loss{background:rgba(214,93,93,.15);color:var(--loss)}
.badge.push{background:#222;color:var(--push)}
a{color:var(--gold)}
</style>
</head>
<body>
<div class="wrap">
  <h1>Verified Pick Record</h1>
  <p class="sub">Every pick published publicly before the game and graded against the official final score. Updated ${fmt(days[0].date)}.</p>

${perSport}
  <div class="cov"><strong>The covenant.</strong> Nobody sustains 60% against the number. Sharp bettors live at 53&ndash;57%, and the break-even bar at standard -110 juice is 52.38%. We do not sell locks and we do not quietly delete losers. Every pick below was published publicly before the game and graded against the official final score. Want to check anyone else&rsquo;s numbers? <a href="/how-to-spot-a-fake-pick-record.html">How to spot a fake pick record</a>.</div>

  <h2>Every pick, most recent first</h2>
  <table>
    <thead><tr><th>Day</th><th>Date</th><th>Sport</th><th>Pick</th><th>Final</th><th>Result</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>

  <h2>Day by day</h2>
  <table>
    <thead><tr><th>Day</th><th>Date</th><th>W-L</th></tr></thead>
    <tbody>
${dayRows}
    </tbody>
  </table>

  <p class="sub">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>
</div>
</body>
</html>`;

fs.writeFileSync(OUT, html);

console.log("\nREBUILT verified-records.html");
sports.forEach(s => {
  const t = tally(s);
  console.log(`  ${(LABEL[s] || s).padEnd(18)} ${t.w}-${t.l}  ${t.pct}%  ${t.total} picks  streak ${streak(s)}`);
});
console.log(`  ${"COMBINED".padEnd(18)} ${T.w}-${T.l}  ${T.pct}%  ${T.total} picks  streak ${streak(null)}`);
