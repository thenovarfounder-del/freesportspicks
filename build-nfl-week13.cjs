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
  ["Thu 3 Dec","8:15 PM","Prime Video","Kansas City","@","LA Rams","LAR -4.5","47.5","SoFi Stadium, Inglewood CA"],
  ["Sun 6 Dec","1:00 PM","CBS","Detroit","@","Atlanta","DET -3.5","48.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Sun 6 Dec","1:00 PM","FOX","Jacksonville","@","Chicago","CHI -3","47.5","Soldier Field, Chicago IL"],
  ["Sun 6 Dec","1:00 PM","CBS","Cincinnati","@","Cleveland","CIN -4.5","45.5","Huntington Bank Field, Cleveland OH"],
  ["Sun 6 Dec","1:00 PM","CBS","Washington","@","Tennessee","WSH -1.5","46.5","Nissan Stadium, Nashville TN"],
  ["Sun 6 Dec","1:00 PM","FOX","Green Bay","@","New Orleans","GB -4.5","45.5","Caesars Superdome, New Orleans LA"],
  ["Sun 6 Dec","1:00 PM","FOX","San Francisco","@","NY Giants","SF -3","47.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 6 Dec","1:00 PM","CBS","LA Chargers","@","Tampa Bay","LAC -2.5","46.5","Raymond James Stadium, Tampa FL"],
  ["Sun 6 Dec","4:05 PM","FOX","Miami","@","Denver","DEN -9.5","42.5","Empower Field at Mile High, Denver CO"],
  ["Sun 6 Dec","4:05 PM","FOX","Philadelphia","@","Arizona","PHI -8.5","43.5","State Farm Stadium, Glendale AZ"],
  ["Sun 6 Dec","4:25 PM","CBS","Carolina","@","Minnesota","MIN -3.5","42.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Sun 6 Dec","4:25 PM","CBS","Buffalo","@","New England","NE -1.5","48.5","Gillette Stadium, Foxborough MA"],
  ["Sun 6 Dec","8:20 PM","NBC","Houston","@","Pittsburgh","HOU -1.5","41.5","Acrisure Stadium, Pittsburgh PA"],
  ["Mon 7 Dec","8:15 PM","ESPN/ABC","Dallas","@","Seattle","SEA -4.5","48.5","Lumen Field, Seattle WA"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];
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
<title>NFL Week 13 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 13 2026 game with kickoff, TV, venue, spread and total. The first December board, why the totals have not dropped as far as expected, and Denver laying 9.5 at altitude.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-13-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-13-2026.html">
<meta property="og:title" content="NFL Week 13 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 13 game with times, TV, spreads and totals — the first December board of the season.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 13 2026 Schedule, Lines and Totals","description":"Full NFL Week 13 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-13-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 13 2026","item":"https://www.freesportspicks.pro/nfl/week-13-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 13 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 13 runs Thursday 3 December through Monday 7 December 2026. It opens with Kansas City at the Los Angeles Rams on Prime Video, the main Sunday slate falls on 6 December, and the week closes with Dallas at Seattle on Monday night."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 13 2026?","acceptedAnswer":{"@type":"Answer","text":"Denver is laying 9.5 against Miami at Empower Field, with Philadelphia at 8.5 in Arizona close behind. There are no double-digit spreads on the board for the second consecutive week."}},{"@type":"Question","name":"Do NFL totals drop in December?","acceptedAnswer":{"@type":"Answer","text":"Generally yes for outdoor northern venues, as wind and cold suppress passing efficiency and kicking accuracy. Week 13's board is a partial exception, with only two games below 43 and several outdoor fixtures priced in the high forties, suggesting the market rates the offences involved highly enough to offset the calendar."}},{"@type":"Question","name":"Does altitude affect the Denver game?","acceptedAnswer":{"@type":"Answer","text":"Denver plays at roughly 5,280 feet, the highest home stadium in the league. Thinner air affects visiting player conditioning and also ball flight, with kicks travelling further. Home teams are acclimatised and visitors are not, which is one of the few genuine venue advantages in the NFL."}},{"@type":"Question","name":"What is the lowest total in NFL Week 13 2026?","acceptedAnswer":{"@type":"Answer","text":"Houston at Pittsburgh at 41.5 on Sunday night, an outdoor game at Acrisure Stadium in early December. Miami at Denver and Carolina at Minnesota share the next lowest at 42.5."}}]}</script>
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
  <h1>NFL Week 13, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; the first December board, and the totals have not fallen the way the calendar suggests they should.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("13")}

<p>Week 13 runs Thursday 3 December through Monday 7 December. Fourteen games, and the season enters its final stretch.</p>

<h2>The full Week 13 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>December arrives, and the totals hold up</h2>
<p>The expectation going into December is that outdoor totals fall. Across our weekly boards the floor dropped steadily &mdash; 40.5 in Week 4, 39.5 in Week 8, 38.5 in Week 10, 39.5 twice in Week 12.</p>
<p>This board partly breaks that. <strong>Only two games sit below 43</strong>, and several outdoor fixtures carry numbers in the high forties: Buffalo at New England at 48.5, Detroit at Atlanta at 48.5, Dallas at Seattle at 48.5.</p>

<div class="keypoint">
  <p>A total is a forecast about the teams as well as the weather. When the market prices an outdoor December game at 48.5, it is saying the offences involved are good enough to overcome conditions it fully understands.</p>
</div>

<h3>The exception proves it</h3>
<p>Houston at Pittsburgh carries <strong>41.5</strong> on Sunday night, the lowest on the board. Acrisure Stadium in December, two defences the market respects, and neither offence rated highly enough to fight the conditions. That is what a December number looks like when the teams do not offset the calendar.</p>

<h2>Denver -9.5, and the altitude question</h2>
<p>Denver hosts Miami laying <strong>9.5</strong>, the largest number on the board. It is also the matchup that most exposes a genuine venue effect.</p>
<p>Empower Field sits at roughly 5,280 feet, the highest home stadium in the league. <strong>Visiting players are not acclimatised and home players are</strong>, and the effect shows most in the fourth quarter when conditioning matters. Ball flight changes too, with kicks carrying further than either side is used to.</p>
<p>Add a Miami team travelling from sea level in a warm climate to Denver in December, and the number reflects several stacked disadvantages rather than one.</p>

<h2>No double digits, for a second week</h2>
<p>Week 12 had none. Week 13 tops out at 9.5. That is a market with settled but moderate views &mdash; it knows which teams are better and does not think any gap this week is enormous.</p>
<p>Five games sit at 3 or fewer, including three at 1.5: Washington at Tennessee, Buffalo at New England, and Houston at Pittsburgh. The pattern that has run all season continues into December.</p>

<h2>Buffalo at New England at 1.5</h2>
<p>A divisional game at Gillette in December priced within a field goal, with a 48.5 total. Two things worth holding together: the market cannot separate these teams, and it expects them to score.</p>
<p>Divisional games in December carry an additional dimension &mdash; by this point both sides have already played once, and the second meeting comes with the first as evidence. Familiarity has been compressing margins all season, and it compresses them hardest in the second meeting.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-12-2026.html">NFL Week 12 2026 &mdash; Thanksgiving schedule, lines and totals</a></li>
  <li><a href="/nfl/week-11-2026.html">NFL Week 11 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-13-2026.html", html);
console.log("PAGE CREATED: /nfl/week-13-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12"].forEach(n => {
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
if (sm.includes("nfl/week-13-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-12-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-13-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
