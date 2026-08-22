const fs = require("fs");

// ============================================================
// Adds an optional `time` field to each pick (24h "HH:MM" ET)
// and makes streak() sort by it instead of trusting array order.
// Backwards compatible: picks without a time keep their array position.
// ============================================================

const p = "fsp-record.cjs";
let s = fs.readFileSync(p, "utf8");

if (s.includes("__ordered")) {
  console.log("already patched");
  process.exit(0);
}

// ---- 1. replace the streak function with a time-aware version ----
const oldStreak = s.match(/function streak\(days\)\{[\s\S]*?return first\+n;\}/);
if (!oldStreak) { console.log("STREAK FUNCTION NOT FOUND — aborting"); process.exit(1); }

const newStreak = `function __ordered(day){
  // chronological within a day: use time when present, else keep entry order
  return day.picks.map((k,i)=>({k,i})).sort((a,b)=>{
    const ta=a.k.time||"", tb=b.k.time||"";
    if(ta&&tb&&ta!==tb) return ta<tb?-1:1;
    if(ta&&!tb) return 0;
    if(!ta&&tb) return 0;
    return a.i-b.i;
  }).map(x=>x.k);
}
function streak(days){
  const f=[];
  days.slice().sort((a,b)=>b.day-a.day).forEach(d=>__ordered(d).slice().reverse().forEach(k=>f.push(k.result)));
  const first=f.find(r=>r==="W"||r==="L");
  if(!first)return "-";
  let n=0;
  for(const r of f){ if(r===first)n++; else if(r!=="P")break; }
  return first+n;
}`;

s = s.replace(oldStreak[0], newStreak);

// ---- 2. make the pick parser accept an optional 4th field: time ----
// existing format: "Team|W|score"   new optional: "Team|W|score|19:10"
const parseRe = /const\s*\[\s*pick\s*,\s*result\s*,\s*score\s*\]\s*=\s*([A-Za-z_$][\w$]*)\.split\("\|"\)/;
const m = s.match(parseRe);
if (m) {
  s = s.replace(parseRe, 'const [pick,result,score,time] = $1.split("|")');
  // include time in the stored object
  s = s.replace(/\{\s*pick\s*,\s*result\s*,\s*score\s*\}/, "{pick,result,score,time:time||undefined}");
  console.log("parser: extended to accept |HH:MM");
} else {
  console.log("parser: pattern not matched — times can still be added manually to record-data.json");
}

// ---- 3. render the time in the pick table when present ----
s = s.replace(
  '"<tr><td class=d>Day "+d.day+"</td><td class=dt>"+esc(fmt(d.date))+"</td><td class=pk>"+esc(k.pick)+"</td>',
  '"<tr><td class=d>Day "+d.day+"</td><td class=dt>"+esc(fmt(d.date))+(k.time?" <span style=\\"color:#5a5a5a;font-size:12px\\">"+esc(k.time)+"</span>":"")+"</td><td class=pk>"+esc(k.pick)+"</td>'
);

// ---- 4. sort picks chronologically in the rendered table too ----
s = s.replace(
  "const rows=days.map(d=>d.picks.map(k=>{",
  "const rows=days.map(d=>__ordered(d).slice().reverse().map(k=>{"
);

fs.writeFileSync(p, s);
console.log("PATCHED fsp-record.cjs");

// ---- 5. backfill times for the picks we know ----
const DATA = "record-data.json";
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const known = {
  "24": { "Phillies ML vs STL": "18:40", "Yankees ML vs TOR": "19:05", "Dodgers ML vs PIT": "22:10" },
  "23": { "Royals ML vs ATH": "14:10", "Yankees ML @ BAL": "18:35", "Astros ML vs LAA": "20:10" },
  "22": { "Phillies ML vs MIA": "18:05", "Guardians ML vs SF": "18:40", "Dodgers ML @ COL": "20:40" },
  "21": { "Phillies ML vs MIA": "18:40", "Red Sox ML vs AZ": "19:10", "Dodgers ML @ COL": "20:40" },
};
let filled = 0;
data.days.forEach(d => {
  const map = known[String(d.day)];
  if (!map) return;
  d.picks.forEach(k => {
    if (!k.time && map[k.pick]) { k.time = map[k.pick]; filled++; }
  });
});
fs.writeFileSync(DATA, JSON.stringify(data, null, 2));
console.log("BACKFILLED TIMES: " + filled + " picks");
console.log("");
console.log("From now on add picks with an optional 4th field:");
console.log('  node fsp-record.cjs add 25 2026-08-22 "Yankees ML vs TOR|W|3-1|13:35" ...');
console.log("Times are 24h Eastern. Omitting one is fine — entry order is used as fallback.");
