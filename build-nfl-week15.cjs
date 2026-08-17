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
  ["Thu 17 Dec","8:15 PM","Prime Video","San Francisco","@","LA Chargers","LAC -2.5","47.5","SoFi Stadium, Inglewood CA"],
  ["Sat 19 Dec","5:00 PM","FOX","Seattle","@","Philadelphia","PHI -1.5","43.5","Lincoln Financial Field, Philadelphia PA"],
  ["Sat 19 Dec","8:20 PM","CBS","Chicago","@","Buffalo","BUF -3.5","51.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 20 Dec","1:00 PM","FOX","Miami","@","Green Bay","GB -10.5","45.5","Lambeau Field, Green Bay WI"],
  ["Sun 20 Dec","1:00 PM","CBS","Indianapolis","@","Tennessee","IND -1.5","47.5","Nissan Stadium, Nashville TN"],
  ["Sun 20 Dec","1:00 PM","CBS","Cleveland","@","NY Giants","NYG -4.5","40.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 20 Dec","1:00 PM","CBS","Baltimore","@","Pittsburgh","BAL -2.5","46.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 20 Dec","1:00 PM","FOX","New Orleans","@","Tampa Bay","TB -3.5","45.5","Raymond James Stadium, Tampa FL"],
  ["Sun 20 Dec","1:00 PM","FOX","Atlanta","@","Washington","WSH -3.5","46.5","Northwest Stadium, Landover MD"],
  ["Sun 20 Dec","1:00 PM","FOX","Cincinnati","@","Carolina","CIN -2.5","47.5","Bank of America Stadium, Charlotte NC"],
  ["Sun 20 Dec","1:00 PM","CBS","Jacksonville","@","Houston","HOU -3","43.5","NRG Stadium, Houston TX"],
  ["Sun 20 Dec","4:05 PM","FOX","NY Jets","@","Arizona","NYJ -1.5","41.5","State Farm Stadium, Glendale AZ"],
  ["Sun 20 Dec","4:25 PM","CBS","Denver","@","Las Vegas","DEN -4.5","41.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 20 Dec","4:25 PM","CBS","Dallas","@","LA Rams","LAR -6","52.5","SoFi Stadium, Inglewood CA"],
  ["Sun 20 Dec","8:20 PM","NBC","Detroit","@","Minnesota","DET -1.5","46.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Mon 21 Dec","8:15 PM","ESPN/ABC","New England","@","Kansas City","KC -2.5","45.5","Arrowhead Stadium, Kansas City MO"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
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
<title>NFL Week 15 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 15 2026 game with kickoff, TV, venue, spread and total. Saturday football returns, Green Bay lays 10.5 at Lambeau, and SoFi hosts twice in four days.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-15-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-15-2026.html">
<meta property="og:title" content="NFL Week 15 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 15 game with times, TV, spreads and totals — Saturday football returns and the season's run-in begins.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 15 2026 Schedule, Lines and Totals","description":"Full NFL Week 15 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-15-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 15 2026","item":"https://www.freesportspicks.pro/nfl/week-15-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 15 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 15 runs Thursday 17 December through Monday 21 December 2026. It includes two Saturday games on 19 December, the main Sunday slate on 20 December, and closes with New England at Kansas City on Monday night."}},{"@type":"Question","name":"Are there Saturday NFL games in Week 15 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. Seattle at Philadelphia kicks off at 5:00 PM ET on FOX and Chicago at Buffalo at 8:20 PM ET on CBS, both on Saturday 19 December. Saturday football typically appears in the season's final weeks once the college schedule has concluded."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 15 2026?","acceptedAnswer":{"@type":"Answer","text":"Green Bay is laying 10.5 against Miami at Lambeau Field, the only double-digit number on the board and the first in four weeks. A warm-weather team travelling to Wisconsin in late December is one of the sharpest environmental contrasts the schedule produces."}},{"@type":"Question","name":"Why does SoFi Stadium host two games in Week 15?","acceptedAnswer":{"@type":"Answer","text":"The Los Angeles Chargers host San Francisco on Thursday night and the Los Angeles Rams host Dallas on Sunday afternoon. Both franchises share SoFi Stadium, so it stages two home games four days apart with different tenants."}},{"@type":"Question","name":"What is the lowest total in NFL Week 15 2026?","acceptedAnswer":{"@type":"Answer","text":"Cleveland at the New York Giants at 40.5, an outdoor game at MetLife in late December. The Jets at Arizona and Denver at Las Vegas share the next lowest at 41.5, both indoors, which makes those numbers a comment on the offences rather than the weather."}}]}</script>
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
  <h1>NFL Week 15, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; Saturday football returns, and Miami go to Lambeau in December.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("15")}

<p>Week 15 runs Thursday 17 December through Monday 21 December, across five days including two Saturday games. Sixteen games &mdash; a full slate, byes finished.</p>

<h2>The full Week 15 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Saturday football returns</h2>
<p>Two games on Saturday 19 December &mdash; Seattle at Philadelphia in the late afternoon and Chicago at Buffalo in the evening. Saturday fixtures appear in the season's closing weeks once the college schedule has wound down.</p>
<p>It is worth knowing for a practical reason: <strong>Saturday games have a different information environment</strong>. Injury reports and line movement compress into a shorter window, and the usual Sunday-morning news cycle does not apply.</p>

<h2>Miami at Lambeau, and the only double digit on the board</h2>
<p>Green Bay lays <strong>10.5</strong>, the first double-digit spread in four weeks. It is also the sharpest environmental contrast the schedule produces: a team that plays its home games in South Florida travelling to Wisconsin in late December.</p>
<p>That contrast is real but it is also well known, which means it is priced. The question with any weather-driven number is never whether the effect exists &mdash; it is whether the market has over- or under-adjusted for something everyone can see coming.</p>

<div class="keypoint">
  <p>The total sits at 45.5, which is not especially low for a Lambeau game in December. The market expects the cold to shape the margin more than the scoring.</p>
</div>

<h2>SoFi hosts twice in four days</h2>
<p>The Chargers host San Francisco on Thursday night; the Rams host Dallas on Sunday afternoon. It is the third time this season the building has staged two home games in one week.</p>
<p>Dallas at the Rams carries <strong>52.5</strong>, the highest total on the board &mdash; a domed venue, two offences the market rates, and no weather to argue about.</p>

<h2>The run-in begins</h2>
<p>By Week 15 the table has largely taken shape, and that changes what the numbers mean.</p>
<p><strong>Motivation becomes a variable.</strong> Teams still competing for position play differently from teams whose season is effectively over, and the gap widens through the final three weeks. Markets attempt to price this, but it is among the harder things to quantify.</p>
<p><strong>Rest management appears.</strong> Sides with position secured begin protecting players, though rarely this early. It matters more in Weeks 17 and 18 than here.</p>

<h3>Ten games at 4.5 or under</h3>
<p>The board remains tight in the middle despite the Lambeau outlier. Detroit at Minnesota, Indianapolis at Tennessee, the Jets at Arizona, Seattle at Philadelphia and Baltimore at Pittsburgh are all inside three points.</p>

<h2>Baltimore at Pittsburgh in December</h2>
<p>A divisional game at Acrisure in the week before Christmas, priced at 2.5 with a 46.5 total. The second meeting of the season between two teams who know each other exhaustively.</p>
<p>The pattern has held every week we have covered: <strong>divisional games are priced tightly</strong>, and the second meeting is tighter still, because both sides have the first as evidence.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-14-2026.html">NFL Week 14 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-13-2026.html">NFL Week 13 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-15-2026.html", html);
console.log("PAGE CREATED: /nfl/week-15-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12","13","14"].forEach(n => {
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
if (sm.includes("nfl/week-15-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-14-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-15-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
