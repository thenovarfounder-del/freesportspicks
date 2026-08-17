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
  ["Thu 26 Nov &mdash; Thanksgiving","1:00 PM","CBS","Chicago","@","Detroit","DET -2.5","52.5","Ford Field, Detroit MI"],
  ["Thu 26 Nov &mdash; Thanksgiving","4:30 PM","FOX","Philadelphia","@","Dallas","DAL -1.5","49.5","AT&amp;T Stadium, Arlington TX"],
  ["Thu 26 Nov &mdash; Thanksgiving","8:20 PM","NBC","Kansas City","@","Buffalo","BUF -2.5","50.5","Highmark Stadium, Orchard Park NY"],
  ["Fri 27 Nov","3:00 PM","Prime Video","Denver","@","Pittsburgh","DEN -1.5","39.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 29 Nov","1:00 PM","CBS","New Orleans","@","Cincinnati","CIN -6.5","48.5","Paycor Stadium, Cincinnati OH"],
  ["Sun 29 Nov","1:00 PM","FOX","Las Vegas","@","Cleveland","CLE -1.5","39.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 29 Nov","1:00 PM","FOX","NY Giants","@","Indianapolis","IND -2.5","47.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Sun 29 Nov","1:00 PM","CBS","NY Jets","@","Miami","MIA -1.5","40.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 29 Nov","1:00 PM","FOX","Atlanta","@","Minnesota","MIN -4.5","43.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Sun 29 Nov","1:00 PM","CBS","Baltimore","@","Houston","HOU -1.5","45.5","NRG Stadium, Houston TX"],
  ["Sun 29 Nov","4:05 PM","CBS","Tennessee","@","Jacksonville","JAX -5.5","45.5","EverBank Stadium, Jacksonville FL"],
  ["Sun 29 Nov","4:25 PM","FOX","Washington","@","Arizona","WSH -4.5","47.5","State Farm Stadium, Glendale AZ"],
  ["Sun 29 Nov","4:25 PM","FOX","Seattle","@","San Francisco","SEA -1.5","46.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 29 Nov","8:20 PM","NBC","New England","@","LA Chargers","LAC -1.5","45.5","SoFi Stadium, Inglewood CA"],
  ["Mon 30 Nov","8:15 PM","ESPN","Carolina","@","Tampa Bay","TB -3.5","44.5","Raymond James Stadium, Tampa FL"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12"];
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
<title>NFL Week 12 2026: Thanksgiving Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 12 2026 game with kickoff, TV, venue, spread and total. Three Thanksgiving games, a Friday afternoon fixture, and eleven of fifteen games priced inside a field goal.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-12-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-12-2026.html">
<meta property="og:title" content="NFL Week 12 2026: Thanksgiving Schedule, Lines &amp; Totals">
<meta property="og:description" content="Three Thanksgiving games, a Friday fixture, and the tightest board of the season.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 12 2026 Thanksgiving Schedule, Lines and Totals","description":"Full NFL Week 12 2026 schedule with kickoff times, TV networks, venues, point spreads and totals, including the three Thanksgiving games.","url":"https://www.freesportspicks.pro/nfl/week-12-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 12 2026","item":"https://www.freesportspicks.pro/nfl/week-12-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What are the NFL Thanksgiving games in 2026?","acceptedAnswer":{"@type":"Answer","text":"Three games on Thursday 26 November: Chicago at Detroit at 1:00 PM ET on CBS, Philadelphia at Dallas at 4:30 PM ET on FOX, and Kansas City at Buffalo at 8:20 PM ET on NBC. Detroit and Dallas host their traditional slots, with the night game in Orchard Park."}},{"@type":"Question","name":"Is there an NFL game on Black Friday 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. Denver at Pittsburgh kicks off at 3:00 PM ET on Friday 27 November, streaming on Prime Video. It carries a total of 39.5, one of the lowest of the season."}},{"@type":"Question","name":"How many NFL games are on Thanksgiving weekend 2026?","acceptedAnswer":{"@type":"Answer","text":"Fifteen across five days: three on Thanksgiving Thursday, one on Friday afternoon, ten on Sunday, and one on Monday night. It is the most spread-out slate of the regular season."}},{"@type":"Question","name":"Why are so many Week 12 games priced so closely?","acceptedAnswer":{"@type":"Answer","text":"Eleven of the fifteen games sit at 4.5 points or fewer, and seven are at 2.5 or under. There are no double-digit spreads anywhere on the board. Twelve weeks of results have let the market separate the clear gaps, leaving a large cluster of teams it rates as genuinely close."}},{"@type":"Question","name":"Do teams playing on Thanksgiving have an advantage the following week?","acceptedAnswer":{"@type":"Answer","text":"Teams playing Thursday get extra rest before their next fixture, effectively a mini-bye. The trade is a short preparation week beforehand. Detroit and Dallas play on Thanksgiving annually and structure their schedules around it, which is generally regarded as a modest advantage over visiting teams unaccustomed to the routine."}}]}</script>
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
  <h1>NFL Week 12, 2026</h1>
  <p>Thanksgiving week &mdash; three games Thursday, one Friday afternoon, and the tightest board of the season with no double-digit spread anywhere.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("12")}

<p>Week 12 runs Thursday 26 November through Monday 30 November, spread across five days. Fifteen games, and not a single one priced in double figures.</p>

<h2>The full Week 12 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Thanksgiving: three games, three networks</h2>
<p>Detroit at 1:00, Dallas at 4:30, and a night game in Orchard Park. The two traditional hosts keep their slots, with Kansas City at Buffalo closing the day.</p>

<h3>The scheduling advantage nobody quantifies</h3>
<p>Detroit and Dallas play on Thanksgiving every year. They structure their week around it, their staff have done it repeatedly, and the routine is familiar. The visiting side is usually doing it for the first time in years.</p>
<p><strong>Both teams face the same short week</strong>, so the physical disadvantage is shared. What is not shared is the familiarity with the routine, and that is the argument for a modest home edge beyond the usual.</p>

<div class="keypoint">
  <p>The market has both traditional games at 2.5 and 1.5. Whatever edge exists in hosting Thanksgiving, the number is not treating it as large.</p>
</div>

<h3>Kansas City at Buffalo in the night slot</h3>
<p>A 50.5 total in Orchard Park in late November is the market backing two offences against the conditions &mdash; and Highmark in late November can be genuinely hostile. Buffalo lays 2.5.</p>

<h2>Black Friday in Pittsburgh</h2>
<p>Denver at Pittsburgh at 3:00 PM on Friday, streaming on Prime Video. The total is <strong>39.5</strong>, joint-lowest on the board.</p>
<p>A Friday afternoon kickoff is unusual enough that neither side has a routine for it, and it comes on a short week for both. Combine that with Acrisure Stadium in late November and a market that rates neither offence highly, and the low number follows.</p>

<h2>The tightest board of the season</h2>
<p><strong>Eleven of fifteen games sit at 4.5 points or fewer</strong>, and seven are at 2.5 or under. The largest number anywhere is 6.5.</p>
<p>That is the clearest expression yet of a pattern that has run all season. Twelve weeks of evidence has let the market price the obvious gaps, and what remains is a large group of teams it genuinely cannot separate.</p>
<p>Five games sit at exactly 1.5: Philadelphia at Dallas, Denver at Pittsburgh, Las Vegas at Cleveland, the Jets at Miami, Baltimore at Houston, Seattle at San Francisco, and New England at the Chargers. Seven, in fact &mdash; nearly half the slate is a coin flip in the market's view.</p>

<h2>The totals split</h2>
<p><strong>52.5 at Ford Field</strong> tops the board, indoors on Thanksgiving afternoon. <strong>39.5 twice</strong> marks the floor &mdash; Denver at Pittsburgh and Las Vegas at Cleveland, both outdoors, both in the last days of November.</p>
<p>Cleveland has now produced or shared the season's lowest total three times. Some of that is the market's view of the offences involved; a good deal of it is the venue and the calendar.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by one and a half. On a board where seven games sit at 1.5, that matters on nearly every one. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-11-2026.html">NFL Week 11 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-10-2026.html">NFL Week 10 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-12-2026.html", html);
console.log("PAGE CREATED: /nfl/week-12-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11"].forEach(n => {
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
if (sm.includes("nfl/week-12-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-11-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-12-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
