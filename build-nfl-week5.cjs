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
  ["Thu 8 Oct","8:15 PM","Prime Video","Tampa Bay","@","Dallas","DAL -3.5","52.5","AT&amp;T Stadium, Arlington TX"],
  ["Sun 11 Oct","9:30 AM","NFL Net","Philadelphia","v","Jacksonville","PHI -1.5","45.5","Tottenham Hotspur Stadium, London"],
  ["Sun 11 Oct","1:00 PM","CBS","Houston","@","Tennessee","HOU -3.5","43.5","Nissan Stadium, Nashville TN"],
  ["Sun 11 Oct","1:00 PM","FOX","Cincinnati","@","Miami","CIN -6","49.5","Hard Rock Stadium, Miami Gardens FL"],
  ["Sun 11 Oct","1:00 PM","CBS","Las Vegas","@","New England","NE -8.5","44.5","Gillette Stadium, Foxborough MA"],
  ["Sun 11 Oct","1:00 PM","FOX","Minnesota","@","New Orleans","MIN -1.5","44.5","Caesars Superdome, New Orleans LA"],
  ["Sun 11 Oct","1:00 PM","CBS","Cleveland","@","NY Jets","NYJ -2.5","39.5","MetLife Stadium, East Rutherford NJ"],
  ["Sun 11 Oct","1:00 PM","CBS","Indianapolis","@","Pittsburgh","PIT -2.5","47.5","Acrisure Stadium, Pittsburgh PA"],
  ["Sun 11 Oct","1:00 PM","FOX","NY Giants","@","Washington","WSH -2.5","48.5","Northwest Stadium, Landover MD"],
  ["Sun 11 Oct","4:05 PM","CBS","Denver","@","LA Chargers","LAC -2.5","44.5","SoFi Stadium, Inglewood CA"],
  ["Sun 11 Oct","4:25 PM","FOX","Chicago","@","Green Bay","GB -3","49.5","Lambeau Field, Green Bay WI"],
  ["Sun 11 Oct","4:25 PM","FOX","Detroit","@","Arizona","DET -8.5","48.5","State Farm Stadium, Glendale AZ"],
  ["Sun 11 Oct","4:25 PM","FOX","San Francisco","@","Seattle","SEA -3.5","48.5","Lumen Field, Seattle WA"],
  ["Sun 11 Oct","8:20 PM","NBC","Baltimore","@","Atlanta","BAL -4.5","48.5","Mercedes-Benz Stadium, Atlanta GA"],
  ["Mon 12 Oct","8:15 PM","ESPN/ABC","Buffalo","@","LA Rams","LAR -3","53.5","SoFi Stadium, Inglewood CA"],
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

const WEEKS = ["1","2","3","4","5"];
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
<title>NFL Week 5 2026: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 5 2026 game with kickoff, TV, venue, spread and total. Byes begin, London returns, and SoFi hosts twice in two days — plus what a 39.5 total in New Jersey tells you.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-5-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-5-2026.html">
<meta property="og:title" content="NFL Week 5 2026: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="Every Week 5 game with times, TV, spreads and totals — byes begin, London returns, and the totals spread widens.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 5 2026 Schedule, Lines and Totals","description":"Full NFL Week 5 2026 schedule with kickoff times, TV networks, venues, point spreads and totals.","url":"https://www.freesportspicks.pro/nfl/week-5-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 5 2026","item":"https://www.freesportspicks.pro/nfl/week-5-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 5 2026?","acceptedAnswer":{"@type":"Answer","text":"Week 5 runs Thursday 8 October through Monday 12 October 2026. It opens with Tampa Bay at Dallas on Prime Video, includes a 9:30 AM ET kickoff from London on Sunday 11 October, and closes with Buffalo at the Los Angeles Rams on Monday night."}},{"@type":"Question","name":"Why are there only 15 games in NFL Week 5 2026?","acceptedAnswer":{"@type":"Answer","text":"Bye weeks have begun. With 32 teams and 15 games, two teams are not playing. Byes run through much of the season and are worth tracking, because a team coming off a bye has had extra preparation and recovery time."}},{"@type":"Question","name":"What is the highest total in NFL Week 5 2026?","acceptedAnswer":{"@type":"Answer","text":"Buffalo at the Los Angeles Rams on Monday night carries a total of 53.5, the highest of the season so far. Tampa Bay at Dallas on Thursday is next at 52.5. Both are indoor games, which typically supports higher totals than outdoor venues."}},{"@type":"Question","name":"What is the lowest total in NFL Week 5 2026?","acceptedAnswer":{"@type":"Answer","text":"Cleveland at the New York Jets at 39.5, the only total below 43 on the board. It reflects market expectations of a low-scoring game between two offences it does not rate highly, in an outdoor stadium in October."}},{"@type":"Question","name":"Does a bye week help a team's performance?","acceptedAnswer":{"@type":"Answer","text":"Teams returning from a bye have had extra recovery time and an additional week of preparation, which is generally regarded as an advantage, particularly for teams carrying injuries. Whether markets price it fully is debated, but the schedule context is worth knowing before betting either side."}}]}</script>
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
  <h1>NFL Week 5, 2026</h1>
  <p>Every game with kickoff, TV, venue, spread and total &mdash; byes begin, London returns, and the totals spread from 39.5 to 53.5.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("5")}

<p>Week 5 runs Thursday 8 October through Monday 12 October. Fifteen games rather than sixteen &mdash; the bye weeks have started.</p>

<h2>The full Week 5 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff / TV</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Byes begin</h2>
<p>Fifteen games means two teams are not playing, and that continues through much of the remaining schedule. It is worth tracking for two reasons.</p>
<p><strong>A team coming off a bye</strong> has had an extra week of preparation and recovery. That matters most for sides carrying injuries, and it is one of the few genuinely knowable schedule advantages in football.</p>
<p><strong>A team playing an opponent coming off a bye</strong> is facing a better-prepared side than the record alone suggests. Whether the market prices that fully is debated; that it exists is not.</p>

<h2>The totals tell the story this week</h2>

<h3>53.5 and 39.5 on the same board</h3>
<p>Buffalo at the Rams on Monday night carries <strong>53.5</strong>, the highest total of the season so far. Cleveland at the Jets carries <strong>39.5</strong>, the only number below 43.</p>
<p>A fourteen-point gap between the highest and lowest expectations on one slate is a market with strong and divergent views about which offences can score.</p>

<div class="keypoint">
  <p>Both of the top two totals are indoor games &mdash; SoFi and AT&amp;T Stadium. Domes remove wind and precipitation as variables, and totals in them consistently sit above the equivalent outdoor matchup.</p>
</div>

<h3>The 39.5 deserves attention</h3>
<p>Cleveland at the Jets in New Jersey in October, with a total that low, is the market saying it expects very little from either offence. Numbers that far below the board average are worth understanding rather than assuming &mdash; a low total is a strong opinion, not an absence of one.</p>

<h2>SoFi Stadium, twice again</h2>
<p>The Chargers host Denver on Sunday afternoon; the Rams host Buffalo on Monday night. Same building, consecutive days, two tenants &mdash; the second time this has happened in five weeks.</p>
<p>Practically it changes little for the teams. It is worth knowing if you are watching the surface, which is not identical after hosting an NFL game the previous day.</p>

<h2>London, again</h2>
<p>Philadelphia and Jacksonville meet at <strong>Tottenham Hotspur Stadium</strong> at 9:30 AM ET, the fourth international game in five weeks after Melbourne, Rio and last week's London fixture.</p>
<p>The considerations are unchanged and worth repeating each time: <strong>neither team is at home</strong>, both have travelled, both lose a normal preparation week, and both play at an hour their bodies do not recognise. The total here is 45.5 &mdash; noticeably more conservative than the 50.5 the market put on last week's London game.</p>

<h2>The divisional games</h2>
<p>Houston at Tennessee, Cleveland at the Jets, the Giants at Washington, Chicago at Green Bay, and San Francisco at Seattle. Five again, and none priced above 3.5.</p>
<p>That is consistent with the pattern: <strong>markets price divisional games tightly</strong> because teams meeting twice a season know each other closely, and familiarity compresses margins regardless of quality gap.</p>

<h3>Chicago at Lambeau</h3>
<p>The oldest rivalry in the league, at Lambeau Field, in October, priced at three points. Worth noting the ticket prices on this one relative to the rest of the board &mdash; the market for seats and the market for bets do not always agree, but both are telling you something about the occasion.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>The half points prevent ties. Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>Related</h2>
<ul>
  <li><a href="/nfl/week-4-2026.html">NFL Week 4 2026 &mdash; schedule, lines and totals</a></li>
  <li><a href="/nfl/week-3-2026.html">NFL Week 3 2026 &mdash; schedule, lines and totals</a></li>
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
fs.writeFileSync("nfl/week-5-2026.html", html);
console.log("PAGE CREATED: /nfl/week-5-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4"].forEach(n => {
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
if (sm.includes("nfl/week-5-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-4-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-5-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
