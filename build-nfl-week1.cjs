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
  ["Wed 9 Sep","8:20 PM","NBC","New England","@","Seattle","SEA -3.5","44.5","Lumen Field, Seattle WA"],
  ["Thu 10 Sep","8:35 PM","Netflix","San Francisco","v","LA Rams","LAR -3.5","48.5","Melbourne Cricket Ground, Australia"],
  ["Sun 13 Sep","1:00 PM","FOX","Tampa Bay","@","Cincinnati","CIN -3.5","51.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 13 Sep","1:00 PM","FOX","New Orleans","@","Detroit","DET -7","48.5","Ford Field, Detroit MI"],
  ["Sun 13 Sep","1:00 PM","CBS","NY Jets","@","Tennessee","TEN -3","38.5","Nissan Stadium, Nashville TN"],
  ["Sun 13 Sep","1:00 PM","CBS","Baltimore","@","Indianapolis","BAL -3.5","48.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Sun 13 Sep","1:00 PM","FOX","Atlanta","@","Pittsburgh","PIT -3","41.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 13 Sep","1:00 PM","FOX","Chicago","@","Carolina","CHI -2.5","46.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 13 Sep","1:00 PM","CBS","Cleveland","@","Jacksonville","JAX -7.5","40.5","EverBank Stadium, Jacksonville FL"],
  ["Sun 13 Sep","1:00 PM","CBS","Buffalo","@","Houston","BUF -1.5","44.5","NRG Stadium, Houston TX"],
  ["Sun 13 Sep","4:25 PM","FOX","Miami","@","Las Vegas","LV -3.5","40.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 13 Sep","4:25 PM","CBS","Green Bay","@","Minnesota","MIN -1.5","45.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Sun 13 Sep","4:25 PM","FOX","Washington","@","Philadelphia","PHI -4.5","47.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sun 13 Sep","4:25 PM","CBS","Arizona","@","LA Chargers","LAC -10.5","46.5","SoFi Stadium, Inglewood CA"],
  ["Sun 13 Sep","8:20 PM","NBC","Dallas","@","NY Giants","DAL -2.5","48.5","MetLife Stadium, East Rutherford NJ"],
  ["Mon 14 Sep","8:15 PM","ESPN/ABC","Denver","@","Kansas City","KC -3","42.5","Arrowhead Stadium, Kansas City MO"],
];

let rows = "";
let lastDay = "";
games.forEach(g => {
  const [day,time,tv,away,sep,home,line,ou,venue] = g;
  if (day !== lastDay) {
    rows += `<tr class="daybreak"><td colspan="5">${day}</td></tr>`;
    lastDay = day;
  }
  rows += `<tr>
    <td class="g-match"><span class="g-away">${away}</span> <span class="g-sep">${sep}</span> <span class="g-home">${home}</span><span class="g-venue">${venue}</span></td>
    <td class="g-time">${time}<span class="g-tv">${tv}</span></td>
    <td class="g-line">${line}</td>
    <td class="g-ou">${ou}</td>
  </tr>`;
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Week 1 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 1 2026 game with kickoff time, TV, venue, point spread and total. Plus what the Melbourne opener, the Wednesday kickoff and the Week 1 line inefficiency actually mean for bettors.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-1-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-1-2026.html">
<meta property="og:title" content="NFL Week 1 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 1 game with times, TV, spreads and totals — plus what the numbers actually tell you before anyone has played a snap.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 1 2026 Schedule, Lines and Totals","description":"Full NFL Week 1 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-1-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 1 2026","item":"https://www.freesportspicks.pro/nfl/week-1-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When does the NFL 2026 season start?","acceptedAnswer":{"@type":"Answer","text":"Week 1 opens Wednesday 9 September 2026 with New England at Seattle at 8:20 PM ET on NBC. The main Sunday slate is 13 September, and Week 1 closes with Denver at Kansas City on Monday 14 September."}},{"@type":"Question","name":"Why is an NFL game being played in Melbourne?","acceptedAnswer":{"@type":"Answer","text":"San Francisco and the Los Angeles Rams meet at the Melbourne Cricket Ground on Thursday 10 September, streaming on Netflix. It is part of the NFL's international series. Both teams travel, which removes conventional home advantage and introduces a long-haul travel factor markets historically struggle to price."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 1 2026?","acceptedAnswer":{"@type":"Answer","text":"The Los Angeles Chargers are laying 10.5 points against Arizona at SoFi Stadium, the largest number on the Week 1 board. Nine of the sixteen games sit at 3.5 points or fewer, making it a tightly priced opening week overall."}},{"@type":"Question","name":"Are NFL Week 1 lines less accurate than later in the season?","acceptedAnswer":{"@type":"Answer","text":"Week 1 lines are built entirely on prior-season data, offseason roster moves and projection, because no current-season football has been played. Preseason results are close to meaningless for handicapping. That combination makes Week 1 one of the least informed weeks of the year for everyone, including the market."}},{"@type":"Question","name":"What does the total tell you about a game?","acceptedAnswer":{"@type":"Answer","text":"The total is the combined score the market expects. Week 1's range runs from 38.5 on Jets at Titans to 51.5 on Buccaneers at Bengals, which is a wide spread reflecting very different expectations about pace and offensive quality across the slate."}}]}</script>
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
@media(max-width:640px){.sched th:nth-child(2),.sched td:nth-child(2){display:none}}
</style>
</head>
<body>
${HEADER}
<main>
<section class="page-hero"><div class="container">
  <h1>NFL Week 1, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; plus what the numbers actually tell you before anyone has played a snap.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

<p>Week 1 runs from Wednesday 9 September through Monday 14 September, and it opens in an unusual place: a Wednesday night kickoff, followed by a Thursday game in Australia, before the conventional Sunday slate.</p>

<h2>The full Week 1 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>What the board actually says</h2>

<h3>This is a tight slate</h3>
<p>Nine of the sixteen games are priced at <strong>3.5 points or fewer</strong>. Only one game reaches double digits. That is a market saying it does not have strong opinions about the gaps between these teams, which is what you would expect when nobody has played a competitive snap.</p>

<h3>The biggest number on the board</h3>
<p><strong>LA Chargers -10.5 against Arizona</strong> is the outlier, and double-digit spreads in Week 1 are aggressive by definition. The market is projecting a gap based on last season and offseason moves, with no current evidence for either side.</p>

<h3>The totals range is wide</h3>
<p>From <strong>38.5</strong> on Jets at Titans to <strong>51.5</strong> on Buccaneers at Bengals &mdash; a thirteen-point spread across the slate. That reflects genuinely different expectations about pace and offensive quality rather than uncertainty, and totals tend to be where Week 1 opinion is strongest.</p>

<h2>Melbourne: the game nobody knows how to price</h2>
<p>San Francisco and the Rams meet at the <strong>Melbourne Cricket Ground</strong> on Thursday 10 September, streaming on Netflix.</p>
<p>It is worth thinking about carefully, because several conventional assumptions do not apply. <strong>Neither team is at home</strong>, so the usual home-field adjustment is neutral by definition. Both squads have made an extraordinarily long journey across many time zones, and both are doing it in the season's opening week rather than mid-schedule.</p>
<p>International games have historically produced results that surprise people, and the honest reason is that the inputs are unfamiliar. Travel recovery, unfamiliar surface, an atypical crowd and a disrupted preparation week are all real factors that nobody &mdash; including the market &mdash; has much data to price.</p>

<div class="keypoint">
  <p>A game with unusual inputs is not automatically a good bet. It is a game where both you and the market know less than usual, and that cuts both ways.</p>
</div>

<h2>The Week 1 problem, stated honestly</h2>
<p>Every line on this page was built without a single snap of 2026 regular-season football.</p>
<p>What the market has to work with: last season's results, offseason roster movement, coaching changes, and projection models. What it does not have: any evidence of how these teams actually look this year. Preseason results are close to useless for handicapping &mdash; starters play limited snaps, schemes are deliberately vanilla, and the outcomes are noise.</p>
<p>The consequence is that <strong>Week 1 is one of the least informed weeks of the season for everyone</strong>. That includes the sportsbooks, which is why some bettors regard it as an opportunity. It also includes you, which is why others sit it out entirely.</p>
<p>Both positions are defensible. What is not defensible is treating a Week 1 number as though it carries the same information as a Week 10 number.</p>

<h3>What genuinely matters in Week 1</h3>
<ul>
  <li><strong>Roster changes that the market may underweight.</strong> A new offensive line, a coordinator change, or significant departures take time to be priced correctly.</li>
  <li><strong>Coaching debuts.</strong> First games under a new system are volatile in both directions.</li>
  <li><strong>Injury news through the week.</strong> Week 1 injury reports carry more uncertainty than usual because teams have less obligation to be forthcoming in the preseason.</li>
  <li><strong>Line movement from open to close.</strong> Where a number has moved significantly without obvious news, that is information &mdash; see our <a href="/how-to-read-betting-lines.html">guide to reading betting lines</a>.</li>
</ul>

<h2>Reading the numbers on this page</h2>
<p>If the spread and total columns are unfamiliar, the short version: <strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score both teams are expected to produce, and you bet whether the actual result finishes above or below it.</p>
<p>The half points exist to prevent ties. A team cannot win by three and a half points, so -3.5 cannot push, while -3 can. Our full explainer covers the mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> shows every pick since day one with the date and the result.</p>
<p>Baseball has been the focus through the summer. As the NFL season begins, the same standard applies &mdash; picks published before kickoff, graded against the final score, nothing quietly removed.</p>
<p>If you want to evaluate any pick service including this one, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/todays-picks.html">Today's free picks</a></li>
  <li><a href="/verified-records.html">Our complete record</a></li>
  <li><a href="/how-to-read-betting-lines.html">How to read betting lines</a></li>
  <li><a href="/sports/nfl/">NFL betting hub</a></li>
  <li><a href="/tools/bet-size-calculator/">Bet size calculator</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/week-1-2026.html", html);
console.log("PAGE CREATED: /nfl/week-1-2026.html");
console.log("games listed: " + games.length);
console.log("header: " + html.includes("site-header") + " | footer: " + html.includes("<footer"));
