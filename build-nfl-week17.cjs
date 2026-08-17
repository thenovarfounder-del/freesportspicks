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
  ["Thu 31 Dec &mdash; New Year's Eve","8:15 PM","Prime Video","Baltimore","@","Cincinnati","CIN -2.5","51.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 3 Jan","1:00 PM","FOX","New Orleans","@","Atlanta","ATL -1.5","44.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Sun 3 Jan","1:00 PM","FOX","Indianapolis","@","Cleveland","IND -2.5","43.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 3 Jan","1:00 PM","FOX","NY Giants","@","Dallas","DAL -4.5","49.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 3 Jan","1:00 PM","CBS","Pittsburgh","@","Tennessee","PIT -1.5","42.5","Nissan Stadium, Nashville TN"],
  ["Sun 3 Jan","1:00 PM","CBS","Buffalo","@","Miami","BUF -7.5","47.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 3 Jan","1:00 PM","CBS","Minnesota","@","NY Jets","MIN -3.5","39.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 3 Jan","1:00 PM","FOX","Seattle","@","Carolina","SEA -5.5","42.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 3 Jan","4:05 PM","CBS","Las Vegas","@","Arizona","LV -1.5","42.5","State Farm Stadium, Glendale AZ"],
  ["Sun 3 Jan","4:25 PM","FOX","Detroit","@","Chicago","CHI -1.5","49.5","Soldier Field, Chicago IL"],
  ["Sun 3 Jan","8:20 PM","NBC","Philadelphia","@","San Francisco","SF -1.5","45.5","Levi's Stadium, Santa Clara CA"],
  ["Mon 4 Jan","8:15 PM","ESPN","Houston","@","Green Bay","GB -2.5","42.5","Lambeau Field, Green Bay WI"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Denver","@","New England","NE -2.5","42.5","Gillette Stadium, Foxborough MA"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Kansas City","@","LA Chargers","LAC -1.5","45.5","SoFi Stadium, Inglewood CA"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","LA Rams","@","Tampa Bay","LAR -4.5","48.5","Raymond James Stadium, Tampa FL"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Washington","@","Jacksonville","JAX -3.5","48.5","EverBank Stadium, Jacksonville FL"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17"];
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
<title>NFL Week 17 2026-27: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 17 game with kickoff, TV, venue, spread and total. Seven games priced at 2.5 or under, four flex fixtures still open, and playoff positioning driving every number.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-17-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-17-2026.html">
<meta property="og:title" content="NFL Week 17 2026-27: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 17 game with times, TV, spreads and totals — the tightest board of the season with the playoffs in view.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 17 Schedule, Lines and Totals","description":"Full NFL Week 17 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-17-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 17","item":"https://www.freesportspicks.pro/nfl/week-17-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 17?","acceptedAnswer":{"@type":"Answer","text":"Week 17 runs Thursday 31 December 2026 through Monday 4 January 2027. It opens with Baltimore at Cincinnati on New Year's Eve, the main slate falls on Sunday 3 January, and it closes with Houston at Green Bay on Monday night. Four games remain flexed with times to be confirmed."}},{"@type":"Question","name":"Why are Week 17 spreads so close?","acceptedAnswer":{"@type":"Answer","text":"Seven of the sixteen games are priced at 2.5 points or fewer. By Week 17 the market has a full season of evidence and has separated the clear gaps, and playoff positioning means most teams still have something to play for, which reduces the motivational mismatches that produce larger numbers."}},{"@type":"Question","name":"Do teams rest players in Week 17?","acceptedAnswer":{"@type":"Answer","text":"Some do, but it is more common in Week 18. Teams with position already secured may limit snaps for key players, while teams still competing play full strength. This creates motivational mismatches that markets attempt to price but cannot always anticipate before lineups are confirmed."}},{"@type":"Question","name":"What is the lowest total in NFL Week 17?","acceptedAnswer":{"@type":"Answer","text":"Minnesota at the New York Jets at 39.5, an outdoor game at MetLife in early January. Several games sit at 42.5, reflecting a board where mid-winter conditions and defensive matchups dominate."}},{"@type":"Question","name":"What does it mean when a game is flexed?","acceptedAnswer":{"@type":"Answer","text":"The league moves selected late-season fixtures between broadcast slots depending on their playoff relevance, confirming times closer to the date. Spreads and totals are posted even while the timing remains open, so the number exists before the kickoff is known."}}]}</script>
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
  <h1>NFL Week 17</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; New Year's Eve football, four flex fixtures still open, and seven games the market cannot split.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("17")}

<p>Week 17 runs Thursday 31 December 2026 through Monday 4 January 2027. Sixteen games, four of them with kickoff times still to be confirmed.</p>

<h2>The full Week 17 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>The tightest board of the season</h2>
<p><strong>Seven of sixteen games are priced at 2.5 points or fewer</strong>, and only one number reaches 7.5. Both the Sunday night and Monday night games sit inside three points.</p>
<p>Two things produce that. The market has a full season of evidence and has long since priced the obvious gaps. And by Week 17 most teams still have something at stake, which removes the motivational mismatches that generate larger numbers earlier in the year.</p>

<div class="keypoint">
  <p>A board this tight is a market saying the league is closely matched and everyone is trying. Both halves of that matter &mdash; and the second half stops being true in Week 18.</p>
</div>

<h2>Positioning, and what it does to a number</h2>
<p>By this point the playoff picture is largely formed, and that introduces a variable no model handles cleanly.</p>
<p><strong>Teams with position secured may limit snaps</strong> for key players, though it is more common a week later. <strong>Teams eliminated</strong> play differently from teams still alive, in ways that are real but hard to quantify in advance.</p>
<p>The practical consequence for a bettor is that <strong>lineup news matters more in the final weeks than at any other point</strong>. A number set on Tuesday can be badly wrong by Sunday if a team announces it is resting starters.</p>

<h2>New Year's Eve in Cincinnati</h2>
<p>Baltimore at Cincinnati opens the week with a <strong>51.5 total</strong>, the highest on the board, in an outdoor stadium on the last day of December.</p>
<p>It is the second meeting between them this season and a divisional game, which has meant tight pricing all year &mdash; the line is 2.5. High total, close line: two offences the market rates, in conditions it expects them to overcome.</p>

<h2>39.5 at MetLife</h2>
<p>Minnesota at the Jets carries the lowest number on the board. Early January in New Jersey, outdoors, and a market that rates neither offence highly enough to fight the calendar.</p>
<p>MetLife has produced several of the season's lowest totals, alongside Cleveland. Both are outdoor northern venues where the market discounts scoring by default once winter arrives.</p>

<h2>The flex games</h2>
<p>Four fixtures remain unscheduled: Denver at New England, Kansas City at the Chargers, the Rams at Tampa Bay, and Washington at Jacksonville.</p>
<p>All four are priced, which is the point worth understanding &mdash; <strong>the number exists before the timing does</strong>. Kansas City at the Chargers at 1.5 looks like a candidate for a prime slot; a divisional game between two teams the market cannot separate is exactly what the league flexes upward.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. On a board with seven games at 2.5 or under, that distinction settles most of them. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-16-2026.html">NFL Week 16 &mdash; Christmas schedule, lines and totals</a></li>
  <li><a href="/nfl/week-15-2026.html">NFL Week 15 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-17-2026.html", html);
console.log("PAGE CREATED: /nfl/week-17-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"].forEach(n => {
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
if (sm.includes("nfl/week-17-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-16-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-17-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
