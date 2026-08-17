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
  ["Thu 29 Oct","8:15 PM","Prime Video","Carolina","@","Green Bay","GB -7","45.5","Lambeau Field, Green Bay WI"],
  ["Sun 1 Nov","1:00 PM","CBS","Baltimore","@","Buffalo","BUF -2.5","51.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 1 Nov","1:00 PM","CBS","Tennessee","@","Cincinnati","CIN -6.5","49.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 1 Nov","1:00 PM","FOX","Arizona","@","Dallas","DAL -10.5","47.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 1 Nov","1:00 PM","FOX","Minnesota","@","Detroit","DET -4.5","47.5","Ford Field, Detroit MI"],
  ["Sun 1 Nov","1:00 PM","FOX","Las Vegas","@","NY Jets","NYJ -1.5","40.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 1 Nov","1:00 PM","CBS","Cleveland","@","Pittsburgh","PIT -6","39.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 1 Nov","1:00 PM","FOX","Atlanta","@","Tampa Bay","TB -4.5","46.5","Raymond James Stadium, Tampa FL"],
  ["Sun 1 Nov","1:00 PM","CBS","Indianapolis","@","Jacksonville","JAX -4.5","49.5","EverBank Stadium, Jacksonville FL"],
  ["Sun 1 Nov","4:05 PM","FOX","LA Chargers","@","LA Rams","LAR -3.5","48.5","SoFi Stadium, Inglewood CA"],
  ["Sun 1 Nov","4:25 PM","CBS","Kansas City","@","Denver","DEN -1.5","43.5","Empower Field at Mile High, Denver CO"],
  ["Sun 1 Nov","4:25 PM","CBS","New England","@","Miami","NE -7","45.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 1 Nov","8:20 PM","NBC","Philadelphia","@","Washington","PHI -1.5","46.5","Northwest Stadium, Landover MD"],
  ["Mon 2 Nov","8:15 PM","ESPN","Chicago","@","Seattle","SEA -4.5","47.5","Lumen Field, Seattle WA"],
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

const WEEKS = ["1","2","3","4","5","6","7","8"];
function nav(current){
  return '<div class="weeknav">\n' + WEEKS.map(w =>
    `  <a href="/nfl/week-${w}-2026.html"${w===current?' class="on"':''}>Week ${w}</a>`
  ).join("\n") + '\n</div>';
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Week 8 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 8 2026 game with kickoff, TV, venue, spread and total. The season's lowest total at 39.5, the crosstown game at SoFi, and eight divisional matchups.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-8-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-8-2026.html">
<meta property="og:title" content="NFL Week 8 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 8 game with times, TV, spreads and totals — the lowest total of the season and a heavy divisional slate.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 8 2026 Schedule, Lines and Totals","description":"Full NFL Week 8 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-8-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 8 2026","item":"https://www.freesportspicks.pro/nfl/week-8-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 8 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 8 runs Thursday 29 October through Monday 2 November 2026. It opens with Carolina at Green Bay on Prime Video, the main Sunday slate falls on 1 November, and the week closes with Chicago at Seattle on Monday night."}},{"@type":"Question","name":"What is the lowest total in NFL Week 8 2026?","acceptedAnswer":{"@type":"Answer","text":"Cleveland at Pittsburgh at 39.5, the lowest number of the 2026 season to that point. It is a divisional game in an outdoor stadium in early November, when conditions in Pittsburgh begin to suppress scoring."}},{"@type":"Question","name":"Is there a Chargers versus Rams game at SoFi Stadium?","acceptedAnswer":{"@type":"Answer","text":"Yes. The Los Angeles Chargers meet the Los Angeles Rams at SoFi Stadium on Sunday 1 November at 4:05 PM ET, with the Rams listed as the home team at -3.5. Both franchises share the stadium, so the visiting side plays in its own building."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 8 2026?","acceptedAnswer":{"@type":"Answer","text":"Dallas is laying 10.5 against Arizona at AT&T Stadium, the only double-digit number on the board. Everything else sits at 7 or below."}},{"@type":"Question","name":"How many divisional games are in NFL Week 8 2026?","acceptedAnswer":{"@type":"Answer","text":"Eight of the fourteen games are divisional matchups, including Cleveland at Pittsburgh, Kansas City at Denver, New England at Miami, Philadelphia at Washington and the Chargers at the Rams. Divisional games historically finish closer than the spread suggests."}}]}</script>
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
  <h1>NFL Week 8, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; the season's lowest number, a crosstown game in a shared stadium, and eight divisional matchups.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("8")}

<p>Week 8 runs Thursday 29 October through Monday 2 November. Fourteen games, four teams on bye, and the season's first game priced below 40.</p>

<h2>The full Week 8 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>39.5 at Acrisure: the lowest number of the season</h2>
<p>Cleveland at Pittsburgh carries a total of <strong>39.5</strong>, below anything the first seven weeks produced.</p>
<p>Three things are stacked into that number. It is a <strong>divisional game</strong>, where familiarity compresses scoring as well as margins. It is an <strong>outdoor stadium in early November</strong>, when Pittsburgh's conditions start to matter. And the market does not rate either offence highly.</p>

<div class="keypoint">
  <p>The seasonal pattern is now visible across our weekly boards: the lowest total was 40.5 in Week 4, 39.5 here, and outdoor numbers will keep drifting down through December. A total is a forecast about weather as much as about football.</p>
</div>

<h2>Eight divisional games out of fourteen</h2>
<p>Cleveland at Pittsburgh, Kansas City at Denver, New England at Miami, Philadelphia at Washington, Las Vegas at the Jets, Minnesota at Detroit, Atlanta at Tampa Bay, and the Chargers at the Rams.</p>
<p>That is more than half the slate, and the pricing follows the pattern that has held all season: <strong>divisional games are priced tightly</strong>. Six of the eight sit at 4.5 or under, with Kansas City at Denver at 1.5 and Philadelphia at Washington at 1.5.</p>

<h3>Kansas City at Denver at 1.5</h3>
<p>A divisional game at altitude priced at a point and a half. Whatever the records say, the market is treating this as a coin flip &mdash; and Denver's home environment is one of the few genuine venue advantages in the league.</p>

<h2>Chargers at Rams: the crosstown game</h2>
<p>Both franchises share SoFi Stadium, so the Chargers travel nowhere to play a road game. The Rams are listed as home at <strong>-3.5</strong>.</p>
<p>It is worth thinking about what home advantage means in that circumstance. There is no travel, no unfamiliar surface, no time zone, and the visiting team practises down the road. What remains is crowd composition and the logistics of which locker room you use.</p>
<p>Markets typically apply a smaller home adjustment to these fixtures for exactly that reason, though it is rarely stated openly.</p>

<h2>The top of the board</h2>
<p><strong>Dallas -10.5</strong> over Arizona is the only double-digit number, and Arizona has now appeared as a heavy underdog in consecutive weeks after LAR -13.5 in Week 6.</p>
<p>At the other end, <strong>Baltimore at Buffalo carries 51.5</strong>, the highest total on the board, in an outdoor stadium in November. That is the market backing two offences against the conditions rather than the other way round.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by one and a half, so -1.5 cannot push. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-7-2026.html">NFL Week 7 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-6-2026.html">NFL Week 6 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-8-2026.html", html);
console.log("PAGE CREATED: /nfl/week-8-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7"].forEach(n => {
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
if (sm.includes("nfl/week-8-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-7-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-8-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
