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
  ["Thu 22 Oct","8:15 PM","Prime Video","New England","@","Chicago","CHI -1.5","47.5","Soldier Field, Chicago IL"],
  ["Sun 25 Oct","9:30 AM","NFL Net","Pittsburgh","v","New Orleans","PIT -2.5","42.5","Stade de France, Saint-Denis, France"],
  ["Sun 25 Oct","1:00 PM","FOX","San Francisco","@","Atlanta","SF -4.5","47.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Sun 25 Oct","1:00 PM","CBS","Cleveland","@","Tennessee","TEN -2.5","40.5","Nissan Stadium, Nashville TN"],
  ["Sun 25 Oct","1:00 PM","CBS","Indianapolis","@","Minnesota","MIN -2.5","46.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Sun 25 Oct","1:00 PM","CBS","Miami","@","NY Jets","NYJ -2.5","41.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 25 Oct","1:00 PM","FOX","Tampa Bay","@","Carolina","TB -1.5","45.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 25 Oct","1:00 PM","CBS","Cincinnati","@","Baltimore","BAL -3.5","51.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 25 Oct","1:00 PM","FOX","NY Giants","@","Houston","HOU -5.5","43.5","NRG Stadium, Houston TX"],
  ["Sun 25 Oct","4:05 PM","CBS","Denver","@","Arizona","DEN -7.5","43.5","State Farm Stadium, Glendale AZ"],
  ["Sun 25 Oct","4:25 PM","FOX","Green Bay","@","Detroit","DET -2.5","50.5","Ford Field, Detroit MI"],
  ["Sun 25 Oct","4:25 PM","FOX","LA Rams","@","Las Vegas","LAR -7.5","46.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 25 Oct","8:20 PM","NBC","Kansas City","@","Seattle","SEA -3","45.5","Lumen Field, Seattle WA"],
  ["Mon 26 Oct","8:15 PM","ESPN/ABC","Dallas","@","Philadelphia","PHI -3","48.5","Lincoln Financial Field, Philadelphia PA"],
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

const WEEKS = ["1","2","3","4","5","6","7"];
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
<title>NFL Week 7 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 7 2026 game with kickoff, TV, venue, spread and total. The Paris game at Stade de France, ten spreads under a field goal, and the tightest board of the season.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-7-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-7-2026.html">
<meta property="og:title" content="NFL Week 7 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 7 game with times, TV, spreads and totals — Paris, and the tightest board of the season so far.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 7 2026 Schedule, Lines and Totals","description":"Full NFL Week 7 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-7-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 7 2026","item":"https://www.freesportspicks.pro/nfl/week-7-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 7 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 7 runs Thursday 22 October through Monday 26 October 2026. It opens with New England at Chicago on Prime Video, includes a 9:30 AM ET kickoff from Paris on Sunday 25 October, and closes with Dallas at Philadelphia on Monday night."}},{"@type":"Question","name":"Where is the NFL game in Paris being played?","acceptedAnswer":{"@type":"Answer","text":"Pittsburgh and New Orleans meet at the Stade de France in Saint-Denis at 9:30 AM ET on Sunday 25 October. It is the sixth international game of the 2026 season and the first outside London, Melbourne and Rio de Janeiro."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 7 2026?","acceptedAnswer":{"@type":"Answer","text":"Denver at Arizona and the LA Rams at Las Vegas are both priced at 7.5, the largest numbers on the board. There are no double-digit spreads in Week 7, a notable contrast with Week 6's 13.5."}},{"@type":"Question","name":"Why are so many Week 7 games priced under three points?","acceptedAnswer":{"@type":"Answer","text":"Ten of the fourteen games sit at 3.5 points or fewer, and six are at 2.5 or under. Six weeks of results have given the market enough information to price the clear gaps, and what remains is a large group of teams it genuinely cannot separate."}},{"@type":"Question","name":"What is the lowest total in NFL Week 7 2026?","acceptedAnswer":{"@type":"Answer","text":"Cleveland at Tennessee at 40.5, with Miami at the New York Jets close behind at 41.5. Both reflect market expectations of low-scoring games, and both are outdoor venues in late October when conditions begin to matter."}}]}</script>
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
  <h1>NFL Week 7, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; Paris, and the tightest board the season has produced.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("7")}

<p>Week 7 runs Thursday 22 October through Monday 26 October. Fourteen games, four teams on bye, and not a double-digit spread anywhere.</p>

<h2>The full Week 7 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>The tightest board of the season</h2>
<p><strong>Ten of the fourteen games sit at 3.5 points or fewer</strong>, and six are at 2.5 or under. The largest number is 7.5, appearing twice.</p>
<p>That is a striking contrast with Week 6, which produced a 13.5 and a 9.5. One week the market had strong convictions; the next it has almost none.</p>

<div class="keypoint">
  <p>Six weeks of results have let the market price the obvious gaps. What is left is a large cluster of teams it genuinely cannot separate &mdash; and a near-pick'em line means the vig is doing most of the work. See <a href="/how-to-read-betting-lines.html">how to read betting lines</a> for why 52.38% is the number that matters.</p>
</div>

<h2>Paris: the sixth international game</h2>
<p>Pittsburgh and New Orleans meet at the <strong>Stade de France</strong> in Saint-Denis at 9:30 AM ET &mdash; the first NFL fixture of the season outside London, Melbourne and Rio.</p>
<p>The handicapping considerations are the same as every neutral-site game and worth restating: <strong>neither team is at home</strong>, both have travelled, both lose a normal preparation week to logistics, and both play at an hour their bodies do not recognise as football time.</p>
<p>The total sits at <strong>42.5</strong>, matching the conservative pattern these games have developed. Across the season's international fixtures the market has moved from 50.5 down toward the low forties, which suggests it has been learning something from what these games actually produce.</p>

<h2>Late October: the totals start dropping</h2>
<p>Cleveland at Tennessee carries <strong>40.5</strong>, the lowest on the board, with Miami at the Jets at 41.5 just above it.</p>
<p>This is the point in the calendar where outdoor totals begin their seasonal decline. Wind and cold suppress passing efficiency and kicking accuracy, and the market prices that progressively as the schedule moves toward December.</p>
<p>The two highest numbers on this board tell the same story from the other side: <strong>Cincinnati at Baltimore 51.5</strong> and <strong>Green Bay at Detroit 50.5</strong> &mdash; and Detroit plays indoors.</p>

<h2>Divisional games, again</h2>
<p>Cleveland at Tennessee, Miami at the Jets, Tampa Bay at Carolina, Cincinnati at Baltimore, Green Bay at Detroit, and Dallas at Philadelphia. Six of fourteen, and the largest of them is priced at 3.5.</p>
<p>The pattern has now held for seven consecutive weeks: <strong>markets price divisional matchups tightly</strong>, because teams meeting twice a season know each other closely enough that familiarity compresses the margin regardless of quality gap.</p>

<h3>Dallas at Philadelphia to close the week</h3>
<p>Monday night, division rivals, three points, and a 48.5 total. The market has no idea, and that is usually the correct position on this fixture.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by two and a half, so -2.5 cannot push. On a board where six games sit at 2.5 or under, that distinction decides a great many bets. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-6-2026.html">NFL Week 6 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-5-2026.html">NFL Week 5 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-7-2026.html", html);
console.log("PAGE CREATED: /nfl/week-7-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6"].forEach(n => {
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
if (sm.includes("nfl/week-7-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-6-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-7-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
