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
  ["Thu 17 Sep","8:15 PM","Prime Video","Detroit","@","Buffalo","BUF -3","52.5","Highmark Stadium, Orchard Park NY"],
  ["Sun 20 Sep","1:00 PM","FOX","Carolina","@","Atlanta","ATL -1.5","44.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Sun 20 Sep","1:00 PM","FOX","Minnesota","@","Chicago","CHI -3.5","45.5","Soldier Field, Chicago IL"],
  ["Sun 20 Sep","1:00 PM","FOX","Philadelphia","@","Tennessee","PHI -4.5","42.5","Nissan Stadium, Nashville TN"],
  ["Sun 20 Sep","1:00 PM","CBS","Pittsburgh","@","New England","NE -4.5","43.5","Gillette Stadium, Foxborough MA"],
  ["Sun 20 Sep","1:00 PM","FOX","Green Bay","@","NY Jets","GB -5.5","42.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 20 Sep","1:00 PM","CBS","Cleveland","@","Tampa Bay","TB -5.5","42.5","Raymond James Stadium, Tampa FL"],
  ["Sun 20 Sep","1:00 PM","CBS","New Orleans","@","Baltimore","BAL -7.5","46.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Sun 20 Sep","1:00 PM","CBS","Cincinnati","@","Houston","HOU -2.5","46.5","NRG Stadium, Houston TX"],
  ["Sun 20 Sep","4:05 PM","CBS","Jacksonville","@","Denver","DEN -2.5","43.5","Empower Field at Mile High, Denver CO"],
  ["Sun 20 Sep","4:05 PM","CBS","Las Vegas","@","LA Chargers","LAC -8.5","42.5","SoFi Stadium, Inglewood CA"],
  ["Sun 20 Sep","4:25 PM","FOX","Washington","@","Dallas","DAL -4.5","51.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 20 Sep","4:25 PM","FOX","Seattle","@","Arizona","SEA -10","44.5","State Farm Stadium, Glendale AZ"],
  ["Sun 20 Sep","4:25 PM","FOX","Miami","@","San Francisco","SF -10.5","46.5","Levi's Stadium, Santa Clara CA"],
  ["Sun 20 Sep","8:20 PM","NBC","Indianapolis","@","Kansas City","KC -6.5","47.5","Arrowhead Stadium, Kansas City MO"],
  ["Mon 21 Sep","8:15 PM","ESPN/ABC","NY Giants","@","LA Rams","LAR -8.5","48.5","SoFi Stadium, Inglewood CA"],
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

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Week 2 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 2 2026 game with kickoff time, TV, venue, point spread and total. Plus why the market gets bolder in Week 2, the overreaction trap, and the divisional games worth a second look.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-2-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-2-2026.html">
<meta property="og:title" content="NFL Week 2 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 2 game with times, TV, spreads and totals — plus the overreaction trap that makes Week 2 different.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 2 2026 Schedule, Lines and Totals","description":"Full NFL Week 2 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-2-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 2 2026","item":"https://www.freesportspicks.pro/nfl/week-2-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 2 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 2 runs from Thursday 17 September through Monday 21 September 2026. It opens with Detroit at Buffalo on Prime Video, the main Sunday slate falls on 20 September, and the week closes with the New York Giants at the Los Angeles Rams on Monday night."}},{"@type":"Question","name":"What is the Week 2 overreaction trap?","acceptedAnswer":{"@type":"Answer","text":"After one game, lines shift substantially based on a single result — but one game is a tiny sample in a sport with enormous week-to-week variance. Markets and bettors both overweight Week 1 outcomes, which is why Week 2 numbers can move further than the underlying information justifies."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 2 2026?","acceptedAnswer":{"@type":"Answer","text":"San Francisco is laying 10.5 against Miami at Levi's Stadium, with Seattle at 10 in Arizona close behind. Three games sit at 8.5 points or more, compared with one in Week 1 — a sign the market forms firmer opinions once teams have played."}},{"@type":"Question","name":"Why is the Detroit at Buffalo total so high?","acceptedAnswer":{"@type":"Answer","text":"At 52.5 it is the highest total on the Week 2 board, reflecting expectations of two productive offences meeting in September before Buffalo's weather becomes a factor. Totals in Orchard Park typically fall later in the season as conditions deteriorate."}},{"@type":"Question","name":"Are divisional games harder to handicap?","acceptedAnswer":{"@type":"Answer","text":"Divisional opponents play twice a season, know each other's personnel and tendencies closely, and historically produce closer results than the spread suggests. Week 2 includes several, and a double-digit divisional spread is worth a second look for that reason."}}]}</script>
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
  <h1>NFL Week 2, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; plus why the market gets bolder in Week 2, and where that gets it into trouble.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

<div class="weeknav">
  <a href="/nfl/week-1-2026.html">Week 1</a>
  <a href="/nfl/week-2-2026.html" class="on">Week 2</a>
</div>

<p>Week 2 runs Thursday 17 September through Monday 21 September. It opens in Orchard Park with the highest total on the board, and closes at SoFi Stadium &mdash; which hosts its second game of the week.</p>

<h2>The full Week 2 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>What changed from Week 1</h2>

<h3>The market got bolder</h3>
<p>Week 1 had a single double-digit spread. Week 2 has <strong>three games at 8.5 points or more</strong> &mdash; San Francisco -10.5 over Miami, Seattle -10 in Arizona, and both Los Angeles teams laying 8.5.</p>
<p>That is what one week of actual football does. The market went from having no evidence to having a little, and it has priced that little confidently.</p>

<div class="keypoint">
  <p>Whether it should be that confident is the Week 2 question. One game is a very small sample in a sport where good teams lose to bad ones regularly.</p>
</div>

<h3>The overreaction trap</h3>
<p>This is the defining feature of Week 2 and it works in both directions.</p>
<p>A team that won convincingly in Week 1 gets more respect than one result justifies. A team that lost badly gets less. The market moves, the public moves further, and by Sunday the number reflects a fortnight of narrative built on sixty minutes of football.</p>
<p>The discipline is to ask what actually changed. A team that won because of a genuine improvement &mdash; a rebuilt line performing, a new scheme working &mdash; deserves the adjustment. A team that won because of three turnovers and a returned kick does not, because turnover margin is close to random week to week.</p>
<p>Distinguishing between those two is most of the available edge in Week 2.</p>

<h2>The games worth a second look</h2>

<h3>Detroit at Buffalo &mdash; 52.5, the highest total on the board</h3>
<p>Two offences that can score, in a Thursday opener, in Orchard Park in mid-September. The date matters: Highmark Stadium becomes a very different venue in December, when wind and snow routinely drag totals down. In September it is simply a stadium.</p>
<p>A Thursday game also means a short week for both teams, which historically produces sloppier football than a full preparation week.</p>

<h3>Seattle -10 in Arizona &mdash; a double-digit divisional road favourite</h3>
<p>This is the number that stands out. <strong>Divisional games are historically closer than the spread suggests</strong>, because opponents who play twice a season know each other's personnel and tendencies intimately. Familiarity compresses margins.</p>
<p>Laying double digits on the road inside a division is the market making a strong statement. Sometimes it is correct. It is always worth a second look.</p>

<h3>SoFi Stadium twice in two days</h3>
<p>The Chargers host Las Vegas on Sunday afternoon; the Rams host the Giants on Monday night. Same building, consecutive days, two different tenants.</p>
<p>Practically it changes little for the teams. It is worth knowing if you are watching the field &mdash; a surface that has hosted an NFL game the previous day is not identical to a fresh one.</p>

<h3>Washington at Dallas &mdash; 51.5 in a division rivalry</h3>
<p>The second-highest total on the board, in a divisional game, in a domed stadium. Weather is removed as a variable, which is precisely why domes tend to carry higher totals than the same matchup outdoors.</p>

<h2>What the numbers mean</h2>
<p>If the columns are unfamiliar: <strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties &mdash; a team cannot win by three and a half, so -3.5 cannot push while -3 can. Full mechanics here: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change to it carries a timestamp and nothing can be quietly removed. If you want to evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-1-2026.html">NFL Week 1 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/todays-picks.html">Today's free picks</a></li>
  <li><a href="/verified-records.html">Our complete record</a></li>
  <li><a href="/how-to-read-betting-lines.html">How to read betting lines</a></li>
  <li><a href="/sports/nfl/">NFL betting hub</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/week-2-2026.html", html);
console.log("PAGE CREATED: /nfl/week-2-2026.html");
console.log("games listed: " + games.length);

// add week nav to week 1 page
const w1p = "nfl/week-1-2026.html";
if (fs.existsSync(w1p)) {
  let w1 = fs.readFileSync(w1p, "utf8");
  if (!w1.includes("weeknav")) {
    const navCss = `.weeknav{display:flex;gap:10px;flex-wrap:wrap;margin:26px 0}
.weeknav a{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12.5px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:8px 14px;text-decoration:none}
.weeknav a:hover{border-color:#C9A84C}
.weeknav a.on{background:#C9A84C;color:#0A0A0A;border-color:#C9A84C}
</style>`;
    w1 = w1.replace("</style>", navCss);
    const navHtml = `<div class="weeknav">
  <a href="/nfl/week-1-2026.html" class="on">Week 1</a>
  <a href="/nfl/week-2-2026.html">Week 2</a>
</div>
<p>Week 1 runs`;
    w1 = w1.replace("<p>Week 1 runs", navHtml);
    fs.writeFileSync(w1p, w1);
    console.log("WEEK 1 NAV ADDED");
  } else { console.log("week 1 nav already present"); }
}

// sitemap
let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/week-2-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-1-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-2-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
