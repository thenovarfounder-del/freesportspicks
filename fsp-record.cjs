const fs=require("fs"),path=require("path");
const DATA=path.join(__dirname,"record-data.json"),OUT=path.join(__dirname,"verified-records.html");
const load=()=>fs.existsSync(DATA)?JSON.parse(fs.readFileSync(DATA,"utf8")):{days:[]};
const save=d=>{d.days.sort((a,b)=>a.day-b.day);fs.writeFileSync(DATA,JSON.stringify(d,null,2));};
function tally(days){let w=0,l=0,p=0;days.forEach(d=>d.picks.forEach(k=>{k.result==="W"?w++:k.result==="L"?l++:p++;}));
const dec=w+l;return{w,l,p,total:w+l+p,pct:dec?((w/dec)*100).toFixed(1):"0.0",units:(w*0.91-l).toFixed(2)};}
function streak(days){const f=[];days.slice().sort((a,b)=>b.day-a.day).forEach(d=>d.picks.slice().reverse().forEach(k=>f.push(k.result)));
const first=f.find(r=>r==="W"||r==="L");if(!first)return "-";let n=0;for(const r of f){if(r===first)n++;else if(r!=="P")break;}return first+n;}
const dayLine=d=>d.picks.filter(k=>k.result==="W").length+"-"+d.picks.filter(k=>k.result==="L").length;
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmt=iso=>{const[y,m,d]=iso.split("-").map(Number);return M[m-1]+" "+d+", "+y;};
function render(data){
const days=data.days.slice().sort((a,b)=>b.day-a.day),t=tally(data.days),st=streak(data.days);
const updated=days[0]?fmt(days[0].date):"-";
const rows=days.map(d=>d.picks.map(k=>{const c=k.result==="W"?"win":k.result==="L"?"loss":"push";
const mk=k.result==="W"?"&#10003;":k.result==="L"?"&#10007;":"~";
return "<tr><td class=d>Day "+d.day+"</td><td class=dt>"+esc(fmt(d.date))+"</td><td class=pk>"+esc(k.pick)+"</td><td class=sc>"+esc(k.score||"")+"</td><td><span class=\"badge "+c+"\">"+mk+" "+k.result+"</span></td></tr>";}).join("\n")).join("\n");
const dayRows=days.map(d=>"<tr><td class=d>Day "+d.day+"</td><td class=dt>"+esc(fmt(d.date))+"</td><td class=sc>"+dayLine(d)+"</td></tr>").join("\n");
return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verified Record - Every Pick Graded | FreeSportsPicks.pro</title>
<meta name="description" content="Our complete public pick record - every pick graded, wins and losses. Current record ${t.w}-${t.l} (${t.pct}%).">
<link rel="canonical" href="https://www.freesportspicks.pro/verified-records.html">
<meta name="robots" content="index, follow">
<meta property="og:title" content="Verified Record - ${t.w}-${t.l} | FreeSportsPicks.pro">
<meta property="og:description" content="Every pick graded publicly - wins AND losses.">
<meta property="og:url" content="https://www.freesportspicks.pro/verified-records.html">
<meta name="twitter:card" content="summary_large_image">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YZPX14DK4Y"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-YZPX14DK4Y");</script>
<style>
:root{--navy:#0A0A0A;--panel:#111;--gold:#C9A84C;--cream:#F5F5F0;--muted:#808080;--win:#3FB27F;--loss:#D65D5D;--push:#8A93A6;--line:rgba(201,168,76,.2)}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--navy);color:var(--cream);font-family:Arial,Helvetica,sans-serif;line-height:1.6;padding:24px 16px}
.wrap{max-width:960px;margin:0 auto}
h1{font-size:30px;margin-bottom:6px}
.sub{color:var(--muted);font-size:14px;margin-bottom:26px}
.stats{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:14px}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:18px}
.stat b{display:block;font-size:28px;color:var(--gold)}
.stat span{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.09em}
.cov{background:var(--panel);border-left:3px solid var(--gold);border-radius:4px;padding:16px 18px;margin:22px 0;color:var(--muted);font-size:14px}
.cov strong{color:var(--cream)}
h2{font-size:19px;margin:30px 0 12px}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;padding:10px 8px;border-bottom:1px solid var(--line);color:var(--gold);font-size:11px;text-transform:uppercase;letter-spacing:.08em}
td{padding:10px 8px;border-bottom:1px solid rgba(255,255,255,.05)}
.d{color:var(--gold);white-space:nowrap;font-weight:bold}
.dt{color:var(--muted);white-space:nowrap}
.sc{color:var(--muted);white-space:nowrap}
.badge{display:inline-block;padding:2px 9px;border-radius:3px;font-size:12px;font-weight:bold}
.badge.win{background:rgba(63,178,127,.15);color:var(--win)}
.badge.loss{background:rgba(214,93,93,.15);color:var(--loss)}
.badge.push{background:rgba(138,147,166,.15);color:var(--push)}
footer{margin-top:36px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:12.5px}
footer a{color:var(--gold);text-decoration:none;margin-right:14px}
@media(max-width:620px){th:nth-child(2),td:nth-child(2){display:none}}
</style></head><body><div class="wrap">
<h1>Verified Record</h1>
<p class="sub">Every pick posted before the game. Every pick graded the next morning - wins and losses. Last updated ${updated}.</p>
<div class="stats">
<div class="stat"><b>${t.w}-${t.l}${t.p?"-"+t.p:""}</b><span>Record</span></div>
<div class="stat"><b>${t.pct}%</b><span>Win rate</span></div>
<div class="stat"><b>${t.total}</b><span>Picks graded</span></div>
<div class="stat"><b>${st}</b><span>Current streak</span></div>
<div class="stat"><b>${t.units>0?"+":""}${t.units}u</b><span>Units at -110</span></div>
</div>
<div class="cov"><strong>The covenant.</strong> Nobody sustains 60% against the number. Sharp bettors live at 53-57%, and the break-even bar at standard -110 juice is 52.38%. We do not sell locks and we do not quietly delete losers. Every pick below was published publicly before first pitch and graded against the official final score.</div>
<h2>Every pick, most recent first</h2>
<table><thead><tr><th>Day</th><th>Date</th><th>Pick</th><th>Final</th><th>Result</th></tr></thead><tbody>
${rows||"<tr><td colspan=5 style=\"color:#808080;padding:24px 8px\">No picks recorded yet.</td></tr>"}
</tbody></table>
<h2>Day by day</h2>
<table><thead><tr><th>Day</th><th>Date</th><th>Record</th></tr></thead><tbody>
${dayRows||"<tr><td colspan=3 style=\"color:#808080;padding:24px 8px\">-</td></tr>"}
</tbody></table>
<footer><p style="margin-bottom:10px"><a href="/">Home</a><a href="/free-picks.html">Free Picks</a><a href="/methodology.html">Methodology</a><a href="/picks-results.html">Results</a><a href="/responsible-gambling.html">Responsible Gambling</a></p>
<p>For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p></footer>
</div></body></html>`;}
const[cmd,...a]=process.argv.slice(2);const data=load();
if(cmd==="add"){const day=parseInt(a[0],10),date=a[1];
if(!day||!/^\d{4}-\d{2}-\d{2}$/.test(date||"")){console.log("Usage: add <day> <YYYY-MM-DD> \"Pick|W|score\" ...");process.exit(1);}
const picks=a.slice(2).map(s=>{const[p,r,sc]=s.split("|");return{pick:(p||"").trim(),result:(r||"").trim().toUpperCase(),score:(sc||"").trim()};});
if(!picks.length||picks.find(p=>!["W","L","P"].includes(p.result))){console.log("Each pick: \"Brewers ML|W|4-3\"");process.exit(1);}
data.days=data.days.filter(d=>d.day!==day);data.days.push({day,date,picks});save(data);
const t=tally(data.days);console.log("ADDED Day "+day+" ("+date+"): "+dayLine({picks}));
console.log("SEASON: "+t.w+"-"+t.l+"  ("+t.pct+"%)  "+t.total+" picks");
fs.writeFileSync(OUT,render(data));console.log("WROTE verified-records.html");}
else if(cmd==="build"){fs.writeFileSync(OUT,render(data));const t=tally(data.days);
console.log("BUILT - "+t.w+"-"+t.l+" ("+t.pct+"%), "+t.total+" picks across "+data.days.length+" days");}
else if(cmd==="show"){const t=tally(data.days);
console.log("SEASON: "+t.w+"-"+t.l+"  "+t.pct+"%  "+t.total+" picks  "+(t.units>0?"+":"")+t.units+"u");
data.days.slice().sort((x,y)=>x.day-y.day).forEach(d=>console.log("  Day "+String(d.day).padStart(2)+"  "+d.date+"  "+dayLine(d)));
const nums=data.days.map(d=>d.day),max=Math.max(0,...nums),miss=[];
for(let i=1;i<=max;i++)if(!nums.includes(i))miss.push(i);
if(miss.length)console.log("MISSING DAYS: "+miss.join(", "));}
else{console.log("Commands: show | build | add <day> <date> \"Pick|W|score\" ...");}
