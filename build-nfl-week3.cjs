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
  ["Thu 24 Sep","8:15 PM","Prime Video","Atlanta","@","Green Bay","GB -7.5","46.5","Lambeau Field, Green Bay WI"],
  ["Sun 27 Sep","1:00 PM","FOX","LA Chargers","@","Buffalo","BUF -3","48.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 27 Sep","1:00 PM","FOX","Carolina","@","Cleveland","CAR -1.5","39.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 27 Sep","1:00 PM","FOX","NY Jets","@","Detroit","DET -9.5","45.5","Ford Field, Detroit MI"],
  ["Sun 27 Sep","1:00 PM","CBS","Houston","@","Indianapolis","HOU -1.5","45.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Sun 27 Sep","1:00 PM","CBS","Kansas City","@","Miami","KC -7.5","44.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 27 Sep","1:00 PM","CBS","Tennessee","@","NY Giants","NYG -3","44.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 27 Sep","1:00 PM","CBS","Cincinnati","@","Pittsburgh","CIN -1.5","47.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 27 Sep","1:00 PM","FOX","Seattle","@","Washington","SEA -3.5","46.5","Northwest Stadium, Landover MD"],
  ["Sun 27 Sep","1:00 PM","CBS","New England","@","Jacksonville","JAX -1.5","45.5","EverBank Stadium, Jacksonville FL"],
  ["Sun 27 Sep","4:05 PM","FOX","Arizona","@","San Francisco","SF -11.5","46.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 27 Sep","4:05 PM","FOX","Minnesota","@","Tampa Bay","&mdash;","44.5","Raymond James Stadium, Tampa FL"],
  ["Sun 27 Sep","4:25 PM","CBS","Baltimore","v","Dallas","BAL -2.5","51.5","Maracan&atilde; Stadium, Rio de Janeiro, Brazil"],
  ["Sun 27 Sep","4:25 PM","CBS","Las Vegas","@","New Orleans","NO -3.5","42.5","Caesars Superdome, New Orleans LA"],
  ["Sun 27 Sep","8:20 PM","NBC","LA Rams","@","Denver","LAR -3","45.5","Empower Field at Mile High, Denver CO"],
  ["Mon 28 Sep","8:15 PM","ESPN/ABC","Philadelphia","@","Chicago","CHI -1.5","46.5","Soldier Field, Chicago IL"],
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

const NAV = `<div class="weeknav">
  <a href="/nfl/week-1-2026.html">Week 1</a>
  <a href="/nfl/week-2-2026.html">Week 2</a>
  <a href="/nfl/week-3-2026.html" class="on">Week 3</a>
</div>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Week 3 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 3 2026 game with kickoff, TV, venue, spread and total. Plus the Rio de Janeiro game, six spreads under a field goal, and why Week 3 is where the season's real shape starts to show.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-3-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-3-2026.html">
<meta property="og:title" content="NFL Week 3 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 3 game with times, TV, spreads and totals — plus Rio, the pick'em cluster, and where the season's shape starts to show.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 3 2026 Schedule, Lines and Totals","description":"Full NFL Week 3 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-3-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 3 2026","item":"https://www.freesportspicks.pro/nfl/week-3-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 3 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 3 runs Thursday 24 September through Monday 28 September 2026. It opens with Atlanta at Green Bay on Prime Video, the Sunday slate falls on 27 September including a game in Rio de Janeiro, and closes with Philadelphia at Chicago on Monday night."}},{"@type":"Question","name":"Where is the NFL game in Brazil being played?","acceptedAnswer":{"@type":"Answer","text":"Baltimore and Dallas meet at the Maracana Stadium in Rio de Janeiro on Sunday 27 September at 4:25 PM ET. It is a neutral-site game with both teams travelling, which removes conventional home advantage."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 3 2026?","acceptedAnswer":{"@type":"Answer","text":"San Francisco is laying 11.5 against Arizona at Levi's Stadium, the largest number of the season so far. Detroit at 9.5 over the Jets is next. Both are divisional or conference matchups where the market has formed a firm view after two weeks."}},{"@type":"Question","name":"Why are so many Week 3 spreads under three points?","acceptedAnswer":{"@type":"Answer","text":"Six of the sixteen games sit at 3 points or fewer, including five at 1.5 or 2.5. After two weeks the market has enough information to separate the clear mismatches, and what remains is a large cluster of genuinely close matchups it cannot confidently split."}},{"@type":"Question","name":"Does Week 3 tell you anything Week 1 and 2 did not?","acceptedAnswer":{"@type":"Answer","text":"Two games is still a small sample, but it is enough to start distinguishing signal from noise. Teams have now faced different opponents in different conditions, injuries have begun to accumulate, and early-season narratives are being tested rather than simply repeated."}}]}</script>
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
.weeknav{display:flex;gap:10px;flex-wrap:wrap;margin:26px 0}
.weeknav a{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12.5px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:8px 14px;text-decoration:none}
.weeknav a:hover{border-color:#C9A84C}
.weeknav a.on{background:#C9A84C;color:#0A0A0A;border-color:#C9A84C}
@media(max-width:640px){.sched th:nth-child(2),.sched td:nth-child(2){display:none}}
</style>
</head>
<body>
${HEADER}
<main>
<section class="page-hero"><div class="container">
  <h1>NFL Week 3, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; plus Rio, a cluster of near-pick'em games, and what two weeks of football has actually settled.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${NAV}

<p>Week 3 runs Thursday 24 September through Monday 28 September. It opens at Lambeau, includes a game at the Maracan&atilde; in Rio de Janeiro, and closes at Soldier Field with a one-and-a-half point line.</p>

<h2>The full Week 3 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Minnesota at Tampa Bay shows a total only; the spread was not posted when this was compiled. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>The shape of this board</h2>

<h3>A pick'em cluster</h3>
<p>Six games sit at <strong>three points or fewer</strong>, and five of those are at 1.5 or 2.5. Carolina at Cleveland, Houston at Indianapolis, Cincinnati at Pittsburgh, New England at Jacksonville and Philadelphia at Chicago are all effectively coin flips in the market's view.</p>
<p>That is a different picture from Week 2, where the market moved boldly on single results. Two weeks in, it has separated the obvious mismatches and is left with a large group of teams it genuinely cannot split.</p>

<div class="keypoint">
  <p>A near-pick'em line is the market saying it has no edge. That is not an invitation &mdash; it usually means the game is genuinely close, and the vig still applies. See our guide to <a href="/how-to-read-betting-lines.html">reading betting lines</a> for why 52.38% is the number that matters.</p>
</div>

<h3>And two big numbers at the other end</h3>
<p><strong>San Francisco -11.5</strong> against Arizona is the largest spread of the season so far, and it comes in a divisional game &mdash; the category that historically produces closer results than the number suggests.</p>
<p><strong>Detroit -9.5</strong> over the Jets at Ford Field is the other outlier. A dome, a rested home side, and a market that has clearly formed a view.</p>

<h2>Rio de Janeiro: the second neutral site in three weeks</h2>
<p>Baltimore and Dallas meet at the <strong>Maracan&atilde; Stadium</strong> on Sunday afternoon. It is the second international game of the young season, after San Francisco and the Rams played in Melbourne in Week 1.</p>
<p>The handicapping considerations are the same as Melbourne's and worth repeating. <strong>Neither team is at home</strong>, so the usual home adjustment is neutral by definition. Both squads travel a long way and lose a preparation week to logistics rather than football. The surface, the crowd and the routine are all unfamiliar to both sides.</p>
<p>The total sits at 51.5, second-highest on the board, which suggests the market expects the unfamiliarity to produce points rather than caution. That is a view, not a certainty.</p>

<h2>What two weeks actually tells you</h2>
<p>By Week 3 the early narratives are being tested rather than simply repeated, and that is the useful shift.</p>
<p>A team that won its opener and then lost is a different proposition from one that won both, even though the market may have moved similarly on each after Week 1. Two data points against two different opponents in two different conditions is meaningfully more than one.</p>
<p>What has not changed is the sample problem. Two games is still small, injuries have begun to accumulate without much public clarity, and September results are compiled in conditions that bear little resemblance to December.</p>

<h3>What is worth watching by now</h3>
<ul>
  <li><strong>Whether Week 1 performances repeated.</strong> A team that has now done the same thing twice is showing something. One result was noise.</li>
  <li><strong>Injury accumulation.</strong> Two weeks of football produces a real injury list, and the reports become more informative as the season settles.</li>
  <li><strong>Short weeks.</strong> Atlanta and Green Bay play Thursday, meaning both had a compressed preparation. It shows more often in execution than in the result.</li>
  <li><strong>Line movement against the narrative.</strong> Where a number moves opposite to the public story, that is usually the most informative signal available.</li>
</ul>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by three and a half, so -3.5 cannot push while -3 can. That distinction matters enormously in a week with this many games sitting on or near a field goal. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and the result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-1-2026.html">NFL Week 1 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-2-2026.html">NFL Week 2 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-3-2026.html", html);
console.log("PAGE CREATED: /nfl/week-3-2026.html");
console.log("games listed: " + games.length);

// update nav on weeks 1 and 2
[["nfl/week-1-2026.html","1"],["nfl/week-2-2026.html","2"]].forEach(([f,n]) => {
  if (!fs.existsSync(f)) { console.log("missing: " + f); return; }
  let c = fs.readFileSync(f, "utf8");
  if (c.includes("week-3-2026.html")) { console.log("week " + n + " nav already updated"); return; }
  const navRe = /<div class="weeknav">[\s\S]*?<\/div>/;
  if (!navRe.test(c)) { console.log("week " + n + ": no nav found"); return; }
  const newNav = `<div class="weeknav">
  <a href="/nfl/week-1-2026.html"${n==="1"?' class="on"':''}>Week 1</a>
  <a href="/nfl/week-2-2026.html"${n==="2"?' class="on"':''}>Week 2</a>
  <a href="/nfl/week-3-2026.html">Week 3</a>
</div>`;
  c = c.replace(navRe, newNav);
  fs.writeFileSync(f, c);
  console.log("week " + n + " nav updated");
});

// sitemap
let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/week-3-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-2-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-3-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
