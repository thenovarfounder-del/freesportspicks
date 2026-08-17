const fs = require("fs");

const src = fs.readFileSync("free-vs-premium-picks.html", "utf8");
const hs = src.indexOf('<header class="site-header"');
const he = src.indexOf("</header>", hs) + 9;
const HEADER = src.slice(hs, he);
const fsx = src.indexOf("<footer");
const fe = src.lastIndexOf("</footer>") + 9;
const FOOTER = src.slice(fsx, fe);
const GA = src.slice(src.indexOf("<!-- Google tag"), src.indexOf("</script>", src.indexOf("gtag('config'")) + 9);

const games = [
  ["Thu 10 Dec","8:15 PM","Prime Video","Minnesota","@","New England","NE -4.5","43.5","Gillette Stadium, Foxborough MA"],
  ["Sun 13 Dec","1:00 PM","CBS","Atlanta","@","Cleveland","CLE -1.5","40.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 13 Dec","1:00 PM","FOX","Tennessee","@","Detroit","DET -7.5","47.5","Ford Field, Detroit MI"],
  ["Sun 13 Dec","1:00 PM","CBS","Chicago","@","Miami","CHI -5.5","46.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 13 Dec","1:00 PM","CBS","Denver","@","NY Jets","DEN -5.5","39.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 13 Dec","1:00 PM","FOX","Indianapolis","@","Philadelphia","PHI -5.5","46.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sun 13 Dec","1:00 PM","CBS","Houston","@","Washington","HOU -1.5","44.5","Northwest Stadium, Landover MD"],
  ["Sun 13 Dec","1:00 PM","CBS","New Orleans","@","Carolina","CAR -2.5","43.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 13 Dec","1:00 PM","FOX","Tampa Bay","@","Baltimore","BAL -6","48.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 13 Dec","4:05 PM","CBS","LA Chargers","@","Las Vegas","LAC -5.5","43.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 13 Dec","4:25 PM","FOX","Kansas City","@","Cincinnati","CIN -1.5","48.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 13 Dec","4:25 PM","FOX","LA Rams","@","San Francisco","LAR -2.5","49.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 13 Dec","4:25 PM","FOX","NY Giants","@","Seattle","SEA -7.5","45.5","Lumen Field, Seattle WA"],
  ["Sun 13 Dec","8:20 PM","NBC","Buffalo","@","Green Bay","GB -1.5","49.5","Lambeau Field, Green Bay WI"],
  ["Mon 14 Dec","8:15 PM","ESPN","Pittsburgh","@","Jacksonville","JAX -3","44.5","EverBank Stadium, Jacksonville FL"],
];

let rows = "";
let lastDay = "";
games.forEach(g => {
  const [day,time,tv,away,sep,home,line,ou,venue] = g;
  if (day !== lastDay) {
    rows += `<tr class="daybreak"><td colspan="4">${day}</td></tr>`;
    lastDay = day;
  }
  rows += `<tr>
    <td class="g-match"><span class="g-away">${away}</span> <span class="g-sep">${sep}</span> <span class="g-home">${home}</span><span class="g-venue">${venue}</span></td>
    <td class="g-time">${time}<span class="g-tv">${tv}</span></td>
    <td class="g-line">${line}</td>
    <td class="g-ou">${ou}</td>
  </tr>`;
});

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"];
function nav(current){
  return '<div class="weeknav">\n' + WEEKS.map(w =>
    `  <a href="/nfl/week-${w}-2026.html"${w===current?' class="on"':''}>Wk ${w}</a>`
  ).join("\n") + '\n</div>';
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Week 14 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 14 2026 game with kickoff, TV, venue, spread and total. Buffalo at Lambeau in December, the 39.5 at MetLife, and a board with no double-digit spreads for a third straight week.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-14-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-14-2026.html">
<meta property="og:title" content="NFL Week 14 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 14 game with times, TV, spreads and totals — Buffalo at Lambeau, and a December board that splits both ways.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 14 2026 Schedule, Lines and Totals","description":"Full NFL Week 14 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-14-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 14 2026","item":"https://www.freesportspicks.pro/nfl/week-14-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 14 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 14 runs Thursday 10 December through Monday 14 December 2026. It opens with Minnesota at New England on Prime Video, the main Sunday slate falls on 13 December, and the week closes with Pittsburgh at Jacksonville on Monday night."}},{"@type":"Question","name":"What is the lowest total in NFL Week 14 2026?","acceptedAnswer":{"@type":"Answer","text":"Denver at the New York Jets at 39.5, an outdoor game at MetLife Stadium in mid-December. Atlanta at Cleveland at 40.5 is next lowest, continuing a season-long pattern of Cleveland producing among the lowest numbers on the board."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 14 2026?","acceptedAnswer":{"@type":"Answer","text":"Detroit at home to Tennessee and Seattle at home to the New York Giants are both priced at 7.5. There are no double-digit spreads for the third consecutive week."}},{"@type":"Question","name":"Does December weather affect NFL totals at Lambeau Field?","acceptedAnswer":{"@type":"Answer","text":"Historically yes, with cold and wind suppressing scoring. Week 14's Buffalo at Green Bay game carries 49.5 despite a mid-December date, which is the market rating both offences highly enough to offset conditions it fully understands."}},{"@type":"Question","name":"Why do some December games have high totals and others very low ones?","acceptedAnswer":{"@type":"Answer","text":"A total prices the teams as well as the weather. Week 14 ranges from 39.5 at MetLife to 49.5 at Lambeau, both outdoor northern venues in mid-December. The difference is the market's assessment of the offences involved, not the forecast."}}]}</script>
<style>
.page-hero{padding:120px 0 50px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(201,168,76,0.06),transparent 70%);border-bottom:1px solid rgba(201,168,76,0.15);}
.page-hero h1{font-size:clamp(28px,4vw,46px);margin-bottom:14px;}
.page-hero p{font-size:16px;color:#808080;max-width:640px;margin:0 auto;}
.page-content-section{padding:52px 0;}
.page-content-section h2{font-family:'DM Serif Display',serif;font-size:24px;color:#F5F5F0;margin:42px 0 16px;padding-bottom:8px;border-bottom:1px solid #1A1A1A;}
.page-content-section h3{font-size:18px;color:#C9A84C;margin:26px 0 10px;}
.page-content-section p{font-size:15px;color:#808080;line-height:1.85;margin-bottom:16px;}
.page-content-section ul{padding-left:20px;margin-bottom:20px;}
.page-content-section li{font-size:15px;color:#808080;line-height:1.8;margin-bottom:8px;}
.page-content-section strong{color:#F5F5F0;}
.page-content-section a{color:#C9A84C;}
.sched{width:100%;border-collapse:collapse;margin:24px 0;background:#0E1218;border:1px solid #1F252E;border-radius:6px;overflow:hidden;}
.sched th{background:#151B23;color:#6C7A89;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:11px 14px;border-bottom:1px solid #1F252E;font-weight:600;}
.sched td{padding:13px 14px;border-bottom:1px solid #171D25;vertical-align:top;}
.sched tr:last-child td{border-bottom:none;}
.daybreak td{background:#151B23;color:#C9A84C;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;padding:9px 14px;font-weight:600;}
.g-match{color:#F5F5F0;font-size:15px;}
.g-away,.g-home{color:#F5F5F0;}
.g-sep{color:#5C6875;margin:0 4px;}
.g-venue{display:block;color:#5C6875;font-size:11.5px;margin-top:3px;}
.g-time{color:#A8B4C0;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13px;white-space:nowrap;}
.g-tv{display:block;color:#5C6875;font-size:11px;margin-top:3px;}
.g-line,.g-ou{color:#C9A84C;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13.5px;white-space:nowrap;}
.keypoint{background:#12161C;border-left:3px solid #C9A84C;border-radius:4px;padding:16px 20px;margin:22px 0;}
.keypoint p{margin-bottom:0;color:#F5F5F0;font-size:15px;}
.weeknav{display:flex;gap:8px;flex-wrap:wrap;margin:26px 0}
.weeknav a{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:7px 11px;text-decoration:none}
.weeknav a:hover{border-color:#C9A84C}
.weeknav a.on{background:#C9A84C;color:#0A0A0A;border-color:#C9A84C}
@media(max-width:640px){.sched th:nth-child(2),.sched td:nth-child(2){display:none}}
</style>
</head>
<body>
${HEADER}
<main>
<section class="page-hero"><div class="container">
  <h1>NFL Week 14, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; two outdoor northern venues in December, ten points apart on the total.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("14")}

<p>Week 14 runs Thursday 10 December through Monday 14 December. Fifteen games, and no double-digit spread for a third consecutive week.</p>

<h2>The full Week 14 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>39.5 at MetLife, 49.5 at Lambeau</h2>
<p>This board answers a question the season has been posing since October: <strong>how much of a low December total is the weather, and how much is the teams?</strong></p>
<p>Denver at the Jets carries <strong>39.5</strong>. Buffalo at Green Bay carries <strong>49.5</strong>. Both are outdoor games in northern venues in mid-December. Ten points separate them.</p>

<div class="keypoint">
  <p>The weather is not ten points different between New Jersey and Wisconsin in December. The teams are. A total prices the offences first and the forecast second, and this board makes that unusually clear.</p>
</div>

<h3>Lambeau at 49.5</h3>
<p>Sunday night, mid-December, one of the coldest venues in the league, and the market expects fifty points. It is a statement about two offences it rates highly enough to overcome conditions it understands perfectly well.</p>
<p>Green Bay lays 1.5, so it also expects the game to be close. High total, tight line &mdash; the market's picture is two good offences and two defences it does not fear.</p>

<h3>Cleveland again</h3>
<p>Atlanta at Cleveland carries 40.5, and Cleveland has now been involved in the lowest or joint-lowest total on four separate boards this season. Some of that is a rotating cast of visiting offences; a good deal is the venue and the calendar.</p>

<h2>No double digits for a third week</h2>
<p>Detroit -7.5 and Seattle -7.5 top the board. Weeks 12, 13 and 14 have now passed without a single double-digit spread &mdash; the longest such run of the season.</p>
<p>Four games sit at 1.5 or under: Atlanta at Cleveland, Houston at Washington, Kansas City at Cincinnati, and Buffalo at Green Bay. The market's view of the league has compressed rather than separated as the season has gone on.</p>

<h3>Kansas City at Cincinnati at 1.5</h3>
<p>A 48.5 total in Cincinnati in December with a line inside two points. Same combination as Lambeau &mdash; the market rates both offences and expects a close, high-scoring game in conditions that would usually suppress both.</p>

<h2>The Rams at Levi's carries 49.5</h2>
<p>The other 49.5 on the board, and this one indoors-adjacent in northern California where December weather is mild. That is the number you would expect for two offences the market respects, without the conditions argument attached.</p>
<p>Worth noting the contrast: Lambeau and Levi's carry the same total in the same week, in entirely different climates. Again, the teams are doing the work.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-13-2026.html">NFL Week 13 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-12-2026.html">NFL Week 12 2026 &mdash; Thanksgiving schedule</a></li>
  <li><a href="/todays-picks.html">Today's free picks</a></li>
  <li><a href="/verified-records.html">Our complete record</a></li>
  <li><a href="/sports/nfl/">NFL betting hub</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/week-14-2026.html", html);
console.log("PAGE CREATED: /nfl/week-14-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12","13"].forEach(n => {
  const f = `nfl/week-${n}-2026.html`;
  if (!fs.existsSync(f)) { console.log("missing: " + f); return; }
  let c = fs.readFileSync(f, "utf8");
  const navRe = /<div class="weeknav">[\s\S]*?<\/div>/;
  if (!navRe.test(c)) { console.log("week " + n + ": no nav found"); return; }
  c = c.replace(navRe, nav(n));
  fs.writeFileSync(f, c);
  console.log("week " + n + " nav refreshed");
});

let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/week-14-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-13-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-14-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
