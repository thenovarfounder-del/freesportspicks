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
  ["Thu 24 Dec &mdash; Christmas Eve","8:15 PM","Prime Video","Houston","@","Philadelphia","PHI -2.5","37.5","Lincoln Financial Field, Philadelphia PA"],
  ["Fri 25 Dec &mdash; Christmas Day","1:00 PM","Netflix","Green Bay","@","Chicago","CHI -1.5","47.5","Soldier Field, Chicago IL"],
  ["Fri 25 Dec &mdash; Christmas Day","4:30 PM","Netflix","Buffalo","@","Denver","BUF -1.5","46.5","Empower Field at Mile High, Denver CO"],
  ["Fri 25 Dec &mdash; Christmas Day","8:15 PM","FOX","LA Rams","@","Seattle","SEA -1.5","47.5","Lumen Field, Seattle WA"],
  ["Sun 27 Dec","1:00 PM","FOX","LA Chargers","@","Miami","LAC -7","45.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 27 Dec","1:00 PM","FOX","Arizona","@","New Orleans","NO -5.5","44.5","Caesars Superdome, New Orleans LA"],
  ["Sun 27 Dec","1:00 PM","CBS","New England","@","NY Jets","NE -6.5","40.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 27 Dec","1:00 PM","CBS","Cleveland","@","Baltimore","BAL -10","43.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 27 Dec","4:05 PM","FOX","Tennessee","@","Las Vegas","&mdash;","42.5","Allegiant Stadium, Las Vegas NV"],
  ["Sun 27 Dec","4:25 PM","CBS","San Francisco","@","Kansas City","KC -3","46.5","Arrowhead Stadium, Kansas City MO"],
  ["Sun 27 Dec","8:20 PM","NBC","Jacksonville","@","Dallas","DAL -3","51.5","AT&amp;T Stadium, Arlington TX"],
  ["Mon 28 Dec","8:15 PM","ESPN","NY Giants","@","Detroit","DET -4.5","49.5","Ford Field, Detroit MI"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Tampa Bay","@","Atlanta","TB -1.5","45.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Cincinnati","@","Indianapolis","CIN -1.5","52.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Washington","@","Minnesota","MIN -2.5","46.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Flex &mdash; date and time TBD","TBD","&mdash;","Carolina","@","Pittsburgh","PIT -3.5","41.5","Acrisure Stadium, Pittsburgh PA"],
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

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
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
<title>NFL Week 16 2026: Christmas Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 16 2026 game with kickoff, TV, venue, spread and total. A Christmas Day triple-header including two on Netflix, four flex games still TBD, and the season's lowest total at 37.5.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-16-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-16-2026.html">
<meta property="og:title" content="NFL Week 16 2026: Christmas Schedule, Lines &amp; Totals">
<meta property="og:description" content="Christmas Day triple-header, four flex games, and the lowest total of the season.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 16 2026 Christmas Schedule, Lines and Totals","description":"Full NFL Week 16 2026 schedule with kickoff times, TV networks, venues, point spreads and totals, including the Christmas Day games.","url":"https://www.freesportspicks.pro/nfl/week-16-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 16 2026","item":"https://www.freesportspicks.pro/nfl/week-16-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What NFL games are on Christmas Day 2026?","acceptedAnswer":{"@type":"Answer","text":"Three: Green Bay at Chicago at 1:00 PM ET on Netflix, Buffalo at Denver at 4:30 PM ET on Netflix, and the Los Angeles Rams at Seattle at 8:15 PM ET on FOX. All three are priced at 1.5 points."}},{"@type":"Question","name":"Are NFL Christmas games on Netflix in 2026?","acceptedAnswer":{"@type":"Answer","text":"Two of the three are. Green Bay at Chicago and Buffalo at Denver both stream on Netflix, with the Rams at Seattle night game on FOX."}},{"@type":"Question","name":"What is the lowest total in NFL Week 16 2026?","acceptedAnswer":{"@type":"Answer","text":"Houston at Philadelphia at 37.5 on Christmas Eve, the lowest number of the entire 2026 season. It is an outdoor game in Philadelphia in late December between two teams the market rates defensively."}},{"@type":"Question","name":"Why are four Week 16 games listed as TBD?","acceptedAnswer":{"@type":"Answer","text":"They are flex games. The league moves selected late-season fixtures to different slots depending on their playoff relevance, so kickoff times are confirmed closer to the date. Spreads and totals are posted even while the timing remains open."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 16 2026?","acceptedAnswer":{"@type":"Answer","text":"Baltimore is laying 10 against Cleveland, the only double-digit number on the board. It is a divisional game, a category that has produced closer results than the spread suggests throughout the season."}}]}</script>
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
  <h1>NFL Week 16, 2026</h1>
  <p>Christmas week &mdash; a three-game Christmas Day, two of them on Netflix, four flex fixtures still open, and the lowest total of the season.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("16")}

<p>Week 16 runs Christmas Eve through Monday 28 December, with four games whose kickoff times are still to be confirmed. Sixteen games in total.</p>

<h2>The full Week 16 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Tennessee at Las Vegas shows a total only; the spread was not posted when this was compiled. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Christmas Day: three games, all at 1.5</h2>
<p>Green Bay at Chicago, Buffalo at Denver, and the Rams at Seattle. Two on Netflix, one on FOX.</p>
<p>The striking thing is the pricing. <strong>All three are at 1.5 points.</strong> Three games, three coin flips, on the biggest single day of the regular season.</p>

<div class="keypoint">
  <p>That is unlikely to be coincidence. The league schedules its marquee dates for competitive games, and by Week 16 it knows which matchups will still matter. Christmas gets the fixtures most likely to be close.</p>
</div>

<h3>Buffalo at Denver</h3>
<p>A cold-weather team travelling to altitude on Christmas afternoon. Denver's home advantage is among the few genuine venue effects in the league &mdash; visiting players are not acclimatised to 5,280 feet, and it shows late. Buffalo laying 1.5 on the road there is the market rating them clearly higher on neutral ground.</p>

<h3>Green Bay at Soldier Field</h3>
<p>The league's oldest rivalry, on Christmas Day, in Chicago, priced at a point and a half with a 47.5 total. December at Soldier Field usually suppresses scoring; the market is not expecting it to here.</p>

<h2>37.5 in Philadelphia: the season's floor</h2>
<p>Houston at Philadelphia on Christmas Eve carries <strong>37.5</strong> &mdash; the lowest total of the entire 2026 season, below the 38.5 in Cleveland in Week 10 and the 39.5s that appeared through November.</p>
<p>The seasonal pattern we have tracked across sixteen boards is complete: <strong>40.5, 39.5, 38.5, 39.5, 37.5</strong>. Outdoor totals in northern venues have declined steadily from October to Christmas, and this is the bottom.</p>
<p>Two defences the market respects, in Philadelphia, four days before the end of December. There is not much argument to be made for points.</p>

<h2>The flex games</h2>
<p>Four fixtures carry no confirmed kickoff time: Tampa Bay at Atlanta, Cincinnati at Indianapolis, Washington at Minnesota, and Carolina at Pittsburgh.</p>
<p>Flexing moves late-season games between slots depending on what is at stake. The practical consequence for a bettor is that <strong>the number exists before the timing does</strong>, and a game moved into a prime slot attracts different money than one buried in the early window.</p>
<p>Cincinnati at Indianapolis carries 52.5, the highest total on the board, which suggests it is a candidate for a better slot.</p>

<h2>Baltimore -10, the only double digit</h2>
<p>Cleveland at Baltimore is the sole double-digit spread, and it is divisional &mdash; the second meeting between the two after Week 8.</p>
<p>The season-long pattern has been that divisional games price tightly and the biggest numbers still keep appearing in them. Both things have been true all year.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by one and a half, so all three Christmas games can be settled without a push. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-15-2026.html">NFL Week 15 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-14-2026.html">NFL Week 14 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-16-2026.html", html);
console.log("PAGE CREATED: /nfl/week-16-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"].forEach(n => {
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
if (sm.includes("nfl/week-16-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-15-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-16-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
