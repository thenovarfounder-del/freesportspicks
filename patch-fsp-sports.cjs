#!/usr/bin/env node
/**
 * FSP RECORD — ADD SPORT CATEGORIES + FIX TIME PARSER
 *
 *   node patch-fsp-sports.cjs
 *
 * WHAT IT DOES
 *   1. Backs up fsp-record.cjs and record-data.json first.
 *   2. Fixes the pick parser so the optional 4th field (kickoff/first-pitch
 *      time) is actually stored. It currently drops it, which is why Day 32
 *      has no times.
 *   3. Adds an optional sport prefix:  "CFB:TCU -6.5 vs UNC|L|10-15|12:00"
 *      No prefix = MLB, so nothing about the existing daily routine changes.
 *   4. Backfills sport:"MLB" on all existing picks.
 *   5. Renders a separate stat block per sport on the record page, each with
 *      its own record, win rate, pick count and streak — plus the combined
 *      total.
 *
 * It is defensive: if it cannot find an anchor it reports and changes nothing.
 */
const fs = require("fs");
const path = require("path");

const SCRIPT = "fsp-record.cjs";
const DATA = "record-data.json";

if (!fs.existsSync(SCRIPT)) { console.error("fsp-record.cjs not found — run from C:\\Users\\randy\\fsp-current"); process.exit(1); }

// ---------- 0. BACKUP ----------
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
fs.copyFileSync(SCRIPT, `${SCRIPT}.bak-${stamp}`);
if (fs.existsSync(DATA)) fs.copyFileSync(DATA, `${DATA}.bak-${stamp}`);
console.log(`backed up -> ${SCRIPT}.bak-${stamp}`);

let s = fs.readFileSync(SCRIPT, "utf8");
const problems = [];

// ---------- 1. FIX THE PICK PARSER ----------
// find whatever splits on "|" and make it capture time + sport
const splitRe = /const\s*\[([^\]]+)\]\s*=\s*([A-Za-z_$][\w$]*)\.split\("\|"\)/;
const m = s.match(splitRe);
if (!m) {
  problems.push("parser: could not find the .split(\"|\") destructure");
} else {
  const varName = m[2];
  const replacement =
    `let [pick,result,score,time] = ${varName}.split("|");\n` +
    `    let sport = "MLB";\n` +
    `    const _sp = /^([A-Za-z]{2,4}):\\s*(.*)$/.exec(pick||"");\n` +
    `    if(_sp){ sport = _sp[1].toUpperCase(); pick = _sp[2]; }`;
  s = s.replace(splitRe, replacement);
  console.log(`parser: now captures time and sport (was destructuring: ${m[1]})`);
}

// make the stored object carry time + sport
const objRe = /\{\s*pick\s*,\s*result\s*,\s*score\s*\}/;
if (objRe.test(s)) {
  s = s.replace(objRe, "{pick,result,score,time:time||undefined,sport}");
  console.log("parser: stored object now includes time and sport");
} else if (/\{pick,result,score,time:time\|\|undefined\}/.test(s)) {
  s = s.replace(/\{pick,result,score,time:time\|\|undefined\}/,
                "{pick,result,score,time:time||undefined,sport}");
  console.log("parser: stored object now includes sport");
} else {
  problems.push("parser: could not find the {pick,result,score} object literal");
}

// ---------- 2. SPORT-AWARE TALLY ----------
const tallyRe = /function tally\(days\)\{[\s\S]*?return\{w,l,p,total:w\+l\+p,pct:dec\?\(\(w\/dec\)\*100\)\.toFixed\(1\):"0\.0",units:\(w\*0\.91-l\)\.toFixed\(2\)\};\}/;
if (!tallyRe.test(s)) {
  problems.push("tally: could not find the tally() function");
} else {
  const newTally =
`function tally(days,sport){let w=0,l=0,p=0;days.forEach(d=>d.picks.forEach(k=>{
    if(sport && (k.sport||"MLB")!==sport) return;
    k.result==="W"?w++:k.result==="L"?l++:p++;}));
  const dec=w+l;return{w,l,p,total:w+l+p,pct:dec?((w/dec)*100).toFixed(1):"0.0",units:(w*0.91-l).toFixed(2)};}
function sportsIn(days){const set=new Set();days.forEach(d=>d.picks.forEach(k=>set.add(k.sport||"MLB")));
  const order=["MLB","CFB","NFL","NBA","NHL","CBB"];
  return [...set].sort((a,b)=>{const ia=order.indexOf(a),ib=order.indexOf(b);
    return (ia<0?99:ia)-(ib<0?99:ib)||a.localeCompare(b);});}
const SPORT_LABEL={MLB:"MLB",CFB:"College Football",NFL:"NFL",NBA:"NBA",NHL:"NHL",CBB:"College Basketball"};`;
  s = s.replace(tallyRe, newTally);
  console.log("tally: now sport-aware, plus sportsIn() and labels");
}

// ---------- 3. SPORT-AWARE STREAK ----------
const streakRe = /function streak\(days\)\{[\s\S]*?return first\+n;\s*\}/;
if (!streakRe.test(s)) {
  problems.push("streak: could not find streak()");
} else {
  const newStreak =
`function __ordered(day,sport){
  return day.picks.map((k,i)=>({k,i}))
    .filter(x=>!sport || (x.k.sport||"MLB")===sport)
    .sort((a,b)=>{const ta=a.k.time||"",tb=b.k.time||"";
      if(ta&&tb&&ta!==tb)return ta<tb?-1:1;return a.i-b.i;})
    .map(x=>x.k);}
function streak(days,sport){
  const f=[];
  days.slice().sort((a,b)=>b.day-a.day).forEach(d=>__ordered(d,sport).slice().reverse().forEach(k=>f.push(k.result)));
  const first=f.find(r=>r==="W"||r==="L");
  if(!first)return "-";
  let n=0;for(const r of f){if(r===first)n++;else if(r!=="P")break;}
  return first+n;}`;
  s = s.replace(streakRe, newStreak);
  console.log("streak: now sport-aware and time-ordered");
}

// ---------- 4. RENDER PER-SPORT BLOCKS ----------
// the render() call site
s = s.replace(/const days=data\.days\.slice\(\)\.sort\(\(a,b\)=>b\.day-a\.day\),t=tally\(data\.days\),st=streak\(data\.days\);/,
  `const days=data.days.slice().sort((a,b)=>b.day-a.day),t=tally(data.days),st=streak(data.days);
  const SPORTS=sportsIn(data.days);
  const perSport=SPORTS.map(sp=>({sport:sp,label:SPORT_LABEL[sp]||sp,t:tally(data.days,sp),st:streak(data.days,sp)}));`);

// the stats block
const statRe = /<div class="stat"><b>\$\{t\.w\}-\$\{t\.l\}\$\{t\.p\?"-"\+t\.p:""\}<\/b><span>Record<\/span><\/div>/;
if (!statRe.test(s)) {
  problems.push("render: could not find the Record stat div (per-sport blocks NOT added)");
} else {
  const newStats =
    '<div class="stat"><b>${t.w}-${t.l}${t.p?"-"+t.p:""}</b><span>Record (all sports)</span></div>';
  s = s.replace(statRe, newStats);

  // inject per-sport section right after the closing </div> of .stats
  const afterStats = /(<div class="stat"><b>\$\{t\.units>0\?"\+":""\}\$\{t\.units\}u<\/b><span>Units at -110<\/span><\/div>\s*<\/div>)/;
  if (afterStats.test(s)) {
    s = s.replace(afterStats,
`$1
  \${perSport.length>1 ? perSport.map(x=>\`
  <h2 style="font-size:19px;margin:26px 0 10px;color:var(--gold)">\${x.label}</h2>
  <div class="stats">
    <div class="stat"><b>\${x.t.w}-\${x.t.l}\${x.t.p?"-"+x.t.p:""}</b><span>Record</span></div>
    <div class="stat"><b>\${x.t.pct}%</b><span>Win rate</span></div>
    <div class="stat"><b>\${x.t.total}</b><span>Picks graded</span></div>
    <div class="stat"><b>\${x.st}</b><span>Current streak</span></div>
    <div class="stat"><b>\${x.t.units>0?"+":""}\${x.t.units}u</b><span>Units at -110</span></div>
  </div>\`).join("") : ""}`);
    console.log("render: per-sport stat blocks added");
  } else {
    problems.push("render: found Record div but not the Units div — per-sport blocks NOT added");
  }
}

// ---------- 5. SPORT COLUMN IN THE PICK TABLE ----------
s = s.replace(/<th>Day<\/th><th>Date<\/th><th>Pick<\/th>/,
              "<th>Day</th><th>Date</th><th>Sport</th><th>Pick</th>");
s = s.replace(/"<tr><td class=d>Day "\+d\.day\+"<\/td><td class=dt>"\+esc\(fmt\(d\.date\)\)/,
              '"<tr><td class=d>Day "+d.day+"</td><td class=dt>"+esc(fmt(d.date))+"</td><td class=dt>"+esc(k.sport||"MLB")');

// ---------- WRITE ----------
if (problems.length) {
  console.log("\nPROBLEMS — nothing written, original untouched:");
  problems.forEach(p => console.log("   " + p));
  console.log("\nRestore is not needed; the file was not modified.");
  process.exit(1);
}
fs.writeFileSync(SCRIPT, s);
console.log(`\n${SCRIPT} patched`);

// ---------- 6. BACKFILL sport ON EXISTING DATA ----------
if (fs.existsSync(DATA)) {
  const d = JSON.parse(fs.readFileSync(DATA, "utf8"));
  let n = 0;
  d.days.forEach(day => day.picks.forEach(p => { if (!p.sport) { p.sport = "MLB"; n++; } }));
  fs.writeFileSync(DATA, JSON.stringify(d, null, 2));
  console.log(`backfilled sport:"MLB" on ${n} existing picks`);
}

console.log("\nUSAGE FROM NOW ON");
console.log('  MLB (unchanged):  node fsp-record.cjs add 33 2026-08-30 "Braves ML vs COL|W|2-1|13:35"');
console.log('  College football: node fsp-record.cjs add 32 2026-08-29 "CFB:TCU -6.5 vs UNC|L|10-15|12:00"');
console.log("\nNext: node fsp-record.cjs build");
