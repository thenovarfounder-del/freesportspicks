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
  ["Thu 19 Nov","8:15 PM","Prime Video","Indianapolis","@","Houston","HOU -5.5","45.5","NRG Stadium, Houston TX"],
  ["Sun 22 Nov","1:00 PM","FOX","Miami","@","Buffalo","BUF -11.5","47.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 22 Nov","1:00 PM","FOX","New Orleans","@","Chicago","CHI -6.5","46.5","Soldier Field, Chicago IL"],
  ["Sun 22 Nov","1:00 PM","FOX","Tennessee","@","Dallas","DAL -6.5","48.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 22 Nov","1:00 PM","CBS","Tampa Bay","@","Detroit","DET -4.5","49.5","Ford Field, Detroit MI"],
  ["Sun 22 Nov","1:00 PM","CBS","Arizona","@","Kansas City","KC -11.5","44.5","Arrowhead Stadium, Kansas City MO"],
  ["Sun 22 Nov","1:00 PM","CBS","Jacksonville","@","NY Giants","JAX -1.5","46.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 22 Nov","1:00 PM","FOX","Baltimore","@","Carolina","BAL -4.5","46.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 22 Nov","4:05 PM","FOX","NY Jets","@","LA Chargers","LAC -9.5","41.5","SoFi Stadium, Inglewood CA"],
  ["Sun 22 Nov","4:25 PM","CBS","Las Vegas","@","Denver","DEN -7.5","41.5","Empower Field at Mile High, Denver CO"],
  ["Sun 22 Nov","4:25 PM","CBS","Pittsburgh","@","Philadelphia","PHI -5.5","42.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sun 22 Nov","8:20 PM","NBC","Minnesota","v","San Francisco","SF -3.5","46.5","Estadio Banorte, Mexico City, Mexico"],
  ["Mon 23 Nov","8:15 PM","ESPN","Cincinnati","@","Washington","CIN -1.5","52.5","Northwest Stadium, Landover MD"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11"];
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
<title>NFL Week 11 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 11 2026 game with kickoff, TV, venue, spread and total. Mexico City in prime time, two 11.5 spreads, and the altitude question at Estadio Banorte.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-11-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-11-2026.html">
<meta property="og:title" content="NFL Week 11 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 11 game with times, TV, spreads and totals — Mexico City in prime time and two double-digit spreads.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 11 2026 Schedule, Lines and Totals","description":"Full NFL Week 11 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-11-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 11 2026","item":"https://www.freesportspicks.pro/nfl/week-11-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 11 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 11 runs Thursday 19 November through Monday 23 November 2026. It opens with Indianapolis at Houston on Prime Video, includes a Sunday night game from Mexico City, and closes with Cincinnati at Washington on Monday night."}},{"@type":"Question","name":"Is there an NFL game in Mexico City in 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. Minnesota and San Francisco meet at Estadio Banorte in Mexico City in the Sunday night slot on 22 November. It is the ninth international game of the 2026 season and the first played in prime time rather than the 9:30 AM ET window."}},{"@type":"Question","name":"Does altitude affect NFL games in Mexico City?","acceptedAnswer":{"@type":"Answer","text":"Mexico City sits at roughly 7,300 feet, higher than Denver. Thinner air affects player conditioning and also ball flight, with kicks and passes travelling further. Both teams face the same conditions since neither is acclimatised, but the effect on fatigue in the fourth quarter is a genuine factor."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 11 2026?","acceptedAnswer":{"@type":"Answer","text":"Buffalo at home to Miami and Kansas City at home to Arizona are both priced at 11.5. Buffalo's is a divisional game, a category that has historically produced closer results than the number suggests."}},{"@type":"Question","name":"What is the lowest total in NFL Week 11 2026?","acceptedAnswer":{"@type":"Answer","text":"Two games sit at 41.5: the New York Jets at the Los Angeles Chargers and Las Vegas at Denver. The Chargers game is indoors at SoFi, which makes that number a comment on the offences rather than the conditions."}}]}</script>
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
  <h1>NFL Week 11, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; Mexico City in prime time, and the first board with two double-digit spreads.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("11")}

<p>Week 11 runs Thursday 19 November through Monday 23 November. Thirteen games &mdash; six teams on bye, the largest number of the season.</p>

<h2>The full Week 11 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Mexico City, and the altitude nobody prices</h2>
<p>Minnesota and San Francisco meet at <strong>Estadio Banorte</strong> in the Sunday night slot &mdash; the ninth international game of the season and the first in prime time rather than the 9:30 AM window.</p>
<p>The prime-time placement matters. The morning games have carried the disruption of an unfamiliar body clock; this one is played at a normal hour for both teams, removing one variable that has run through every other international fixture this season.</p>
<p>What replaces it is <strong>altitude</strong>. Mexico City sits at roughly 7,300 feet &mdash; higher than Denver, which is the only comparable environment in the league. Thin air affects two things: player conditioning, particularly in the fourth quarter, and ball flight, with kicks and passes carrying further than either side is used to.</p>

<div class="keypoint">
  <p>Both teams face identical conditions, so altitude confers no advantage in itself. What it does is add fatigue and unfamiliarity to a game where neither side is acclimatised &mdash; and fatigue tends to show late.</p>
</div>

<h2>Two 11.5s on one board</h2>
<p>Buffalo lays 11.5 at home to Miami; Kansas City lays 11.5 at home to Arizona. It is the first time this season two double-digit spreads have appeared on the same slate.</p>
<p><strong>Buffalo&ndash;Miami is divisional</strong>, which continues the season's oddest pattern: the biggest numbers keep appearing in the matchups where familiarity historically compresses margins.</p>
<p>And Arizona is on the wrong end of a large spread for the fifth time in six weeks &mdash; 13.5, 7.5, 10.5, 13.5 and now 11.5. The market's view has been consistent and unrelenting.</p>

<h2>Six teams on bye</h2>
<p>Thirteen games is the shortest slate of the season so far. From here the schedule fills back out toward the December run-in, but this week is thin.</p>
<p>The practical consequence is the same as always: <strong>a team returning from a bye has had extra recovery and preparation</strong>, and by late November the injury lists are long enough for that to matter more than it did in October.</p>

<h2>The rest of the board</h2>

<h3>Cincinnati at Washington carries 52.5</h3>
<p>The highest total on the board, on Monday night, outdoors in Landover in late November. That is the market backing two offences against the calendar &mdash; and the line is just 1.5, so it expects a close, high-scoring game.</p>

<h3>Two games at 41.5</h3>
<p>The Jets at the Chargers and Las Vegas at Denver share the low. The Chargers game is <strong>indoors at SoFi</strong>, which makes that number a verdict on the offences rather than the weather.</p>

<h3>Pittsburgh at Philadelphia at 42.5</h3>
<p>A low number for a game between two teams with genuine offensive personnel. Late November in Philadelphia is not December, but the direction is set.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-10-2026.html">NFL Week 10 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-9-2026.html">NFL Week 9 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-11-2026.html", html);
console.log("PAGE CREATED: /nfl/week-11-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10"].forEach(n => {
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
if (sm.includes("nfl/week-11-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-10-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-11-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
