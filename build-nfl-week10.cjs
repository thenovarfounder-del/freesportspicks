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
  ["Thu 12 Nov","8:15 PM","Prime Video","Washington","@","NY Giants","NYG -1.5","47.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 15 Nov","9:30 AM","FOX","New England","v","Detroit","DET -1.5","48.5","FC Bayern Munich Stadium, Munich, Germany"],
  ["Sun 15 Nov","1:00 PM","CBS","Kansas City","@","Atlanta","KC -4.5","45.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Sun 15 Nov","1:00 PM","FOX","Houston","@","Cleveland","HOU -4.5","38.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 15 Nov","1:00 PM","FOX","Minnesota","@","Green Bay","GB -4.5","45.5","Lambeau Field, Green Bay WI"],
  ["Sun 15 Nov","1:00 PM","FOX","Jacksonville","@","Tennessee","JAX -2.5","45.5","Nissan Stadium, Nashville TN"],
  ["Sun 15 Nov","1:00 PM","CBS","Miami","@","Indianapolis","IND -6.5","47.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Sun 15 Nov","1:00 PM","FOX","Carolina","@","New Orleans","NO -1.5","43.5","Caesars Superdome, New Orleans LA"],
  ["Sun 15 Nov","1:00 PM","CBS","Buffalo","@","NY Jets","BUF -7","46.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 15 Nov","4:05 PM","CBS","Seattle","@","Las Vegas","SEA -7","43.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 15 Nov","4:05 PM","CBS","LA Rams","@","Arizona","LAR -10.5","47.5","State Farm Stadium, Glendale AZ"],
  ["Sun 15 Nov","4:25 PM","FOX","San Francisco","@","Dallas","DAL -1.5","52.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 15 Nov","8:20 PM","NBC","Pittsburgh","@","Cincinnati","CIN -3.5","47.5","Paycor Stadium, Cincinnati OH"],
  ["Mon 16 Nov","8:15 PM","ESPN","LA Chargers","@","Baltimore","BAL -3.5","47.5","M&amp;T Bank Stadium, Baltimore MD"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10"];
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
<title>NFL Week 10 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 10 2026 game with kickoff, TV, venue, spread and total. Munich hosts, MetLife hosts twice in four days, and Texans–Browns sets a new season low at 38.5.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-10-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-10-2026.html">
<meta property="og:title" content="NFL Week 10 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 10 game with times, TV, spreads and totals — Munich, MetLife twice, and a new season-low total.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 10 2026 Schedule, Lines and Totals","description":"Full NFL Week 10 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-10-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 10 2026","item":"https://www.freesportspicks.pro/nfl/week-10-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 10 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 10 runs Thursday 12 November through Monday 16 November 2026. It opens with Washington at the New York Giants on Prime Video, includes a 9:30 AM ET kickoff from Munich on Sunday 15 November, and closes with the Los Angeles Chargers at Baltimore on Monday night."}},{"@type":"Question","name":"Is there an NFL game in Munich in 2026?","acceptedAnswer":{"@type":"Answer","text":"Yes. New England and Detroit meet at the FC Bayern Munich Stadium at 9:30 AM ET on Sunday 15 November, shown on FOX. It is the eighth international game of the 2026 season and the first in Germany."}},{"@type":"Question","name":"What is the lowest total in NFL Week 10 2026?","acceptedAnswer":{"@type":"Answer","text":"Houston at Cleveland at 38.5, a new low for the 2026 season. It is an outdoor game in Cleveland in mid-November, when conditions on Lake Erie begin to affect passing and kicking, and the market does not rate either offence highly."}},{"@type":"Question","name":"Why does MetLife Stadium host two games in Week 10?","acceptedAnswer":{"@type":"Answer","text":"The New York Giants host Washington on Thursday night and the New York Jets host Buffalo the following Sunday. Both franchises share MetLife Stadium, so the building stages two home games four days apart with different tenants."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 10 2026?","acceptedAnswer":{"@type":"Answer","text":"The Los Angeles Rams are laying 10.5 at Arizona, the only double-digit number on the board. It is the fourth time in five weeks Arizona has faced a spread of 7.5 or larger."}}]}</script>
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
  <h1>NFL Week 10, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; Munich, MetLife hosting twice in four days, and a new season-low total.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("10")}

<p>Week 10 runs Thursday 12 November through Monday 16 November. Fourteen games, and the international series reaches Germany.</p>

<h2>The full Week 10 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>38.5 in Cleveland: another season low</h2>
<p>Houston at Cleveland carries <strong>38.5</strong>, undercutting the 39.5 that Browns&ndash;Steelers set two weeks earlier.</p>
<p>The pattern across our weekly boards is now unmistakable. The lowest total was 40.5 in Week 4, 39.5 in Week 8, and 38.5 here. <strong>Outdoor totals in northern venues decline steadily as the calendar advances</strong>, and Cleveland in mid-November is where that becomes pronounced.</p>

<div class="keypoint">
  <p>Both of the season's lowest totals have involved Cleveland at home. Some of that is the market's view of the offences; some is the venue. Separating the two is the useful work.</p>
</div>

<h2>MetLife hosts twice in four days</h2>
<p>The Giants host Washington on Thursday night. The Jets host Buffalo on Sunday afternoon. Same building, different tenants, four days apart.</p>
<p>For the teams involved it changes little. It is worth knowing if you are looking at the surface, which is not identical after staging an NFL game earlier the same week &mdash; particularly in November, when the grass does not recover as quickly.</p>

<h2>Munich: the eighth international venue</h2>
<p>New England and Detroit meet at the <strong>FC Bayern Munich Stadium</strong> at 9:30 AM ET, the eighth international fixture of a season that has now visited Australia, Brazil, England, France, Spain and Germany.</p>
<p>The considerations are unchanged: <strong>neither team is at home</strong>, both travel, both lose a preparation week, both play at an unfamiliar hour. The line is 1.5 and the total 48.5 &mdash; a normal-looking price for a game with abnormal inputs.</p>
<p>Detroit is also the more interesting side of it, having played indoors at Ford Field for most of the season and now facing an open stadium in a European November.</p>

<h2>Arizona, again</h2>
<p>The Rams lay <strong>10.5</strong> in Glendale, and that is the fourth time in five weeks Arizona has faced a spread of 7.5 or more. The market's view has been consistent and it has not softened.</p>
<p>It is also worth noting this is the second Rams&ndash;Cardinals meeting we have covered &mdash; Week 6 at SoFi was 13.5. The number has come in three points for the away leg, which is roughly what a home-field adjustment looks like when the market's opinion of both teams is unchanged.</p>

<h2>The rest of the board</h2>

<h3>San Francisco at Dallas carries 52.5</h3>
<p>The highest total of the week, indoors at AT&amp;T Stadium, with the line at just 1.5. A near-pick'em game the market expects to be high-scoring is an unusual combination and it points to two offences it rates and two defences it does not.</p>

<h3>Five games at 4.5 or under</h3>
<p>The board is tight in the middle, which has been the season's persistent shape. Only one double-digit number, and most of the slate sitting within a touchdown.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-9-2026.html">NFL Week 9 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-8-2026.html">NFL Week 8 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-10-2026.html", html);
console.log("PAGE CREATED: /nfl/week-10-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9"].forEach(n => {
  const f = `nfl/week-${n}-2026.html`;
  if (!fs.existsSync(f)) { console.log("missing: " + f); return; }
  let c = fs.readFileSync(f, "utf8");
  const navRe = /<div class="weeknav">[\s\S]*?<\/div>/;
  if (!navRe.test(c)) { console.log("week " + n + ": no nav found"); return; }
  c = c.replace(navRe, nav(n));
  // tighten nav css on older pages
  c = c.replace(/\.weeknav\{display:flex;gap:10px;/, ".weeknav{display:flex;gap:8px;");
  c = c.replace(/\.weeknav a\{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12\.5px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:8px 14px;/, ".weeknav a{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:7px 11px;");
  fs.writeFileSync(f, c);
  console.log("week " + n + " nav refreshed");
});

let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/week-10-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-9-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-10-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
