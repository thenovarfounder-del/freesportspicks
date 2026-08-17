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
  ["Thu 1 Oct","8:15 PM","Prime Video","Pittsburgh","@","Cleveland","PIT -2.5","40.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 4 Oct","9:30 AM","NFL Net","Indianapolis","v","Washington","WSH -1.5","50.5","Tottenham Hotspur Stadium, London"],
  ["Sun 4 Oct","1:00 PM","CBS","New England","@","Buffalo","BUF -3","49.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 4 Oct","1:00 PM","FOX","NY Jets","@","Chicago","CHI -8.5","45.5","Soldier Field, Chicago IL"],
  ["Sun 4 Oct","1:00 PM","CBS","Jacksonville","@","Cincinnati","CIN -2.5","51.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 4 Oct","1:00 PM","CBS","Arizona","@","NY Giants","NYG -7","45.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 4 Oct","1:00 PM","FOX","LA Rams","@","Philadelphia","LAR -1.5","47.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sun 4 Oct","1:00 PM","FOX","Green Bay","@","Tampa Bay","GB -1.5","47.5","Raymond James Stadium, Tampa FL"],
  ["Sun 4 Oct","1:00 PM","CBS","Tennessee","@","Baltimore","BAL -8.5","47.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 4 Oct","1:00 PM","FOX","Dallas","@","Houston","HOU -2.5","47.5","NRG Stadium, Houston TX"],
  ["Sun 4 Oct","4:05 PM","FOX","Miami","@","Minnesota","MIN -7.5","43.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Sun 4 Oct","4:25 PM","CBS","Kansas City","@","Las Vegas","KC -5.5","43.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 4 Oct","4:25 PM","CBS","Denver","@","San Francisco","SF -2.5","46.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 4 Oct","4:25 PM","CBS","LA Chargers","@","Seattle","SEA -3","45.5","Lumen Field, Seattle WA"],
  ["Sun 4 Oct","8:20 PM","NBC","Detroit","@","Carolina","DET -3","47.5","Bank of America Stadium, Charlotte NC"],
  ["Mon 5 Oct","8:15 PM","ESPN","Atlanta","@","New Orleans","NO -2.5","45.5","Caesars Superdome, New Orleans LA"],
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

const WEEKS = ["1","2","3","4"];
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
<title>NFL Week 4 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 4 2026 game with kickoff, TV, venue, spread and total. Plus the London 9:30am kickoff, five divisional matchups, and why Week 4 is where early-season narratives get tested.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-4-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-4-2026.html">
<meta property="og:title" content="NFL Week 4 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 4 game with times, TV, spreads and totals — plus London, the divisional cluster, and what three weeks has settled.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 4 2026 Schedule, Lines and Totals","description":"Full NFL Week 4 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-4-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 4 2026","item":"https://www.freesportspicks.pro/nfl/week-4-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 4 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 4 runs Thursday 1 October through Monday 5 October 2026. It opens with Pittsburgh at Cleveland on Prime Video, includes a 9:30 AM ET kickoff from London on Sunday 4 October, and closes with Atlanta at New Orleans on Monday night."}},{"@type":"Question","name":"What time is the NFL London game in Week 4?","acceptedAnswer":{"@type":"Answer","text":"Indianapolis and Washington meet at Tottenham Hotspur Stadium at 9:30 AM ET on Sunday 4 October, shown on NFL Network. It is the earliest kickoff of the American day and the third international game of the 2026 season."}},{"@type":"Question","name":"How many divisional games are in NFL Week 4 2026?","acceptedAnswer":{"@type":"Answer","text":"Five: Pittsburgh at Cleveland, New England at Buffalo, Kansas City at Las Vegas, the LA Chargers at Seattle, and Atlanta at New Orleans. Divisional games historically produce closer results than the spread suggests, because opponents who meet twice a season know each other's personnel intimately."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 4 2026?","acceptedAnswer":{"@type":"Answer","text":"Chicago and Baltimore are both laying 8.5 points, against the New York Jets and Tennessee respectively. There are no double-digit spreads on the Week 4 board, which is a tighter picture than Week 3 produced."}},{"@type":"Question","name":"Does the early London kickoff affect the game?","acceptedAnswer":{"@type":"Answer","text":"Both teams travel and both play at an hour neither is accustomed to, with body clocks several hours out. Neither side holds conventional home advantage. Markets have limited data to price these factors, which is why international games are often described as harder to handicap than domestic ones."}}]}</script>
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
  <h1>NFL Week 4, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; plus a 9:30am start from London, five divisional matchups, and no double-digit spreads anywhere.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("4")}

<p>Week 4 runs Thursday 1 October through Monday 5 October. It opens with a divisional game in Cleveland, includes the earliest kickoff of the American day from Tottenham, and closes in the Superdome.</p>

<h2>The full Week 4 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>What this board looks like</h2>

<h3>No double digits, anywhere</h3>
<p>Week 3 produced an 11.5 and a 9.5. Week 4 tops out at <strong>8.5</strong>, with Chicago hosting the Jets and Baltimore hosting Tennessee.</p>
<p>That is a market with no strong convictions about any matchup on the board. Eight of sixteen games sit at three points or fewer, which continues the pattern Week 3 established: the obvious gaps have been priced, and what remains is close.</p>

<h3>Five divisional games</h3>
<p>Pittsburgh at Cleveland, New England at Buffalo, Kansas City at Las Vegas, the Chargers at Seattle, and Atlanta at New Orleans. That is nearly a third of the slate.</p>
<p><strong>Divisional games historically finish closer than the number suggests.</strong> Teams that meet twice a season know each other's personnel, tendencies and coaching habits intimately, and familiarity compresses margins. None of these five is priced above 5.5, which suggests the market already knows it.</p>

<div class="keypoint">
  <p>Pittsburgh at Cleveland opens the week with a total of <strong>40.5</strong> &mdash; the lowest on the board. A cold-weather divisional game on a short week is exactly where points go to disappear.</p>
</div>

<h2>London at 9:30 in the morning</h2>
<p>Indianapolis and Washington meet at <strong>Tottenham Hotspur Stadium</strong> at 9:30 AM ET on Sunday, the third international game of the young season after Melbourne and Rio.</p>
<p>The handicapping considerations repeat, and they matter every time. <strong>Neither team is at home</strong>, so conventional home advantage is neutral. Both squads have travelled, both have lost a normal preparation week to logistics, and both are playing at an hour their bodies do not recognise as football time.</p>
<p>What is different here is the total: <strong>50.5</strong>, the second-highest on the board. The market expects points from a game where both teams are tired and displaced, which is a view worth noticing rather than assuming.</p>

<h2>Three weeks in: what has actually been established</h2>
<p>By Week 4 the sample is large enough to be suggestive and still too small to be conclusive. Three games against three different opponents in three different settings is genuinely more informative than one, and it is not a season.</p>
<p>What has changed since Week 1 is that the market now has evidence rather than projection. The tight spreads across this board are not uncertainty in the Week 1 sense &mdash; they are a market that has looked at the evidence and concluded these teams really are close.</p>

<h3>What to look at this week</h3>
<ul>
  <li><strong>The short week.</strong> Pittsburgh and Cleveland played Thursday, meaning compressed preparation for a physical divisional game. It usually shows in execution rather than in the final margin.</li>
  <li><strong>Post-international recovery.</strong> Teams returning from overseas games have historically found the following week difficult. Worth remembering when Baltimore and Dallas appear again after Rio.</li>
  <li><strong>Injury accumulation.</strong> Four weeks of football produces a real injury list, and reports become more informative as the season settles.</li>
  <li><strong>Totals in cold-weather venues.</strong> Buffalo, Cleveland and Chicago are all hosting. October is not December, but the direction of travel on those totals is downward from here.</li>
</ul>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by three and a half, so -3.5 cannot push while -3 can. With eight games on this board at three points or fewer, that distinction decides a great many bets. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-1-2026.html">NFL Week 1 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-2-2026.html">NFL Week 2 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-3-2026.html">NFL Week 3 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/todays-picks.html">Today's free picks</a></li>
  <li><a href="/sports/nfl/">NFL betting hub</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/week-4-2026.html", html);
console.log("PAGE CREATED: /nfl/week-4-2026.html");
console.log("games listed: " + games.length);

// refresh nav on all prior weeks
["1","2","3"].forEach(n => {
  const f = `nfl/week-${n}-2026.html`;
  if (!fs.existsSync(f)) { console.log("missing: " + f); return; }
  let c = fs.readFileSync(f, "utf8");
  const navRe = /<div class="weeknav">[\s\S]*?<\/div>/;
  if (!navRe.test(c)) { console.log("week " + n + ": no nav found"); return; }
  c = c.replace(navRe, nav(n));
  fs.writeFileSync(f, c);
  console.log("week " + n + " nav refreshed");
});

// sitemap
let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/week-4-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-3-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-4-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
