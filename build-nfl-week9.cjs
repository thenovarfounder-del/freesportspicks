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
  ["Thu 5 Nov","8:15 PM","Prime Video","Jacksonville","@","Baltimore","BAL -4.5","49.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 8 Nov","9:30 AM","NFL Net","Cincinnati","v","Atlanta","CIN -5.5","49.5","Santiago Bernab&eacute;u, Madrid, Spain"],
  ["Sun 8 Nov","1:00 PM","FOX","Dallas","@","Indianapolis","DAL -1.5","52.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Sun 8 Nov","1:00 PM","CBS","NY Jets","@","Kansas City","KC -9.5","41.5","Arrowhead Stadium, Kansas City MO"],
  ["Sun 8 Nov","1:00 PM","FOX","Detroit","@","Miami","DET -6.5","47.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 8 Nov","1:00 PM","CBS","Cleveland","@","New Orleans","NO -3.5","41.5","Caesars Superdome, New Orleans LA"],
  ["Sun 8 Nov","1:00 PM","FOX","NY Giants","@","Philadelphia","PHI -5.5","44.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sun 8 Nov","1:00 PM","FOX","LA Rams","@","Washington","LAR -4.5","50.5","Northwest Stadium, Landover MD"],
  ["Sun 8 Nov","1:00 PM","CBS","Denver","@","Carolina","DEN -3","42.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 8 Nov","4:05 PM","CBS","Houston","@","LA Chargers","LAC -2.5","43.5","SoFi Stadium, Inglewood CA"],
  ["Sun 8 Nov","4:05 PM","CBS","Las Vegas","@","San Francisco","SF -8.5","46.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 8 Nov","4:25 PM","FOX","Green Bay","@","New England","NE -1.5","46.5","Gillette Stadium, Foxborough MA"],
  ["Sun 8 Nov","4:25 PM","FOX","Arizona","@","Seattle","SEA -13.5","45.5","Lumen Field, Seattle WA"],
  ["Sun 8 Nov","8:20 PM","NBC","Tampa Bay","@","Chicago","CHI -3.5","48.5","Soldier Field, Chicago IL"],
  ["Mon 9 Nov","8:15 PM","ESPN/ABC","Buffalo","@","Minnesota","BUF -3","48.5","U.S. Bank Stadium, Minneapolis MN"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9"];
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
<title>NFL Week 9 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 9 2026 game with kickoff, TV, venue, spread and total. Madrid at the Bernabéu, Seattle laying 13.5, and Arizona on the wrong end of a big number again.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-9-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-9-2026.html">
<meta property="og:title" content="NFL Week 9 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 9 game with times, TV, spreads and totals — Madrid, and the season's joint-biggest spread.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 9 2026 Schedule, Lines and Totals","description":"Full NFL Week 9 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-9-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 9 2026","item":"https://www.freesportspicks.pro/nfl/week-9-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 9 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 9 runs Thursday 5 November through Monday 9 November 2026. It opens with Jacksonville at Baltimore on Prime Video, includes a 9:30 AM ET kickoff from Madrid on Sunday 8 November, and closes with Buffalo at Minnesota on Monday night."}},{"@type":"Question","name":"Is there an NFL game in Madrid in 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. Cincinnati and Atlanta meet at the Santiago Bernabeu in Madrid at 9:30 AM ET on Sunday 8 November. It is the seventh international game of the 2026 season, following fixtures in Melbourne, Rio de Janeiro, London and Paris."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 9 2026?","acceptedAnswer":{"@type":"Answer","text":"Seattle is laying 13.5 against Arizona at Lumen Field, matching the largest spread of the season. Arizona has been a heavy underdog in three of the previous four weeks, including a 13.5 at the Rams in Week 6."}},{"@type":"Question","name":"What is the highest total in NFL Week 9 2026?","acceptedAnswer":{"@type":"Answer","text":"Dallas at Indianapolis at 52.5, played indoors at Lucas Oil Stadium. Domed venues consistently carry higher totals than outdoor equivalents because wind and precipitation are removed as variables."}},{"@type":"Question","name":"Why do international NFL games have lower totals?","acceptedAnswer":{"@type":"Answer","text":"Across the 2026 season's international fixtures the market has generally priced totals conservatively, reflecting the disruption both teams face: long travel, a lost preparation week, unfamiliar surfaces and kickoff times neither side is accustomed to. The Madrid game at 49.5 is a notable exception to that pattern."}}]}</script>
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
  <h1>NFL Week 9, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; Madrid at the Bernab&eacute;u, and the season's joint-biggest spread.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("9")}

<p>Week 9 runs Thursday 5 November through Monday 9 November. Fifteen games, and the international series reaches a seventh venue.</p>

<h2>The full Week 9 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Madrid: the Bernab&eacute;u hosts football</h2>
<p>Cincinnati and Atlanta meet at the <strong>Santiago Bernab&eacute;u</strong> at 9:30 AM ET &mdash; the seventh international fixture of the season, after Melbourne, Rio, three in London and Paris.</p>
<p>The usual considerations apply: <strong>neither team is at home</strong>, both have travelled, both lose a preparation week to logistics, both play at an hour their bodies do not recognise.</p>
<p>What is different is the number. The total sits at <strong>49.5</strong>, well above the 42.5 the market put on the Paris and Wembley fixtures. After progressively marking these games down through the season, it has priced this one as a normal game.</p>

<div class="keypoint">
  <p>Across seven international fixtures the totals have run 48.5, 51.5, 50.5, 45.5, 42.5, 42.5 and now 49.5. There is no simple rule &mdash; the market prices the teams, not just the travel.</p>
</div>

<h2>Seattle -13.5, and Arizona's month</h2>
<p>Seattle hosts Arizona laying <strong>13.5</strong>, matching the largest number of the season. It is also the third time in four weeks Arizona has been a heavy underdog &mdash; 13.5 at the Rams in Week 6, 7.5 at home to Denver in Week 7, 10.5 at Dallas in Week 8.</p>
<p>And it is a divisional game, which continues to be where the biggest numbers keep appearing this season despite the historical pattern of divisional matchups finishing tighter than the spread.</p>

<h3>What a run of big spreads tells you</h3>
<p>A team repeatedly priced as a double-digit underdog is one the market has genuinely written off. That is information, and it cuts both ways: the number reflects real assessment, and a market with a settled view is a market that can be slow to update when something changes.</p>

<h2>The rest of the board</h2>

<h3>Dallas at Indianapolis carries 52.5</h3>
<p>The highest total of the week, indoors at Lucas Oil. The pattern has been consistent all season &mdash; <strong>domes carry higher totals</strong>, because wind and precipitation are removed as variables and the market prices that difference explicitly.</p>

<h3>Two games at 41.5</h3>
<p>The Jets at Kansas City and Cleveland at New Orleans share the lowest number on the board. In the Superdome that is notable: an indoor game priced this low is the market rating the offences, not the conditions.</p>

<h3>Green Bay at New England at 1.5</h3>
<p>The tightest line of the week, and a non-divisional game between conferences. When the market cannot separate two teams that never play each other, it is usually because it rates them genuinely close rather than because it lacks information.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-8-2026.html">NFL Week 8 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-7-2026.html">NFL Week 7 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-9-2026.html", html);
console.log("PAGE CREATED: /nfl/week-9-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8"].forEach(n => {
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
if (sm.includes("nfl/week-9-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-8-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-9-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
