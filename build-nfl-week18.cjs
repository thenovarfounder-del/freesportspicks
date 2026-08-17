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
  ["NY Jets","@","Buffalo","BUF -10","43.5","Highmark Stadium, Orchard Park NY"],
  ["Cleveland","@","Cincinnati","CIN -7.5","43.5","Paycor Stadium, Cincinnati OH"],
  ["LA Chargers","@","Denver","DEN -1.5","41.5","Empower Field at Mile High, Denver CO"],
  ["Detroit","@","Green Bay","GB -2.5","47.5","Lambeau Field, Green Bay WI"],
  ["Jacksonville","@","Indianapolis","IND -1.5","46.5","Lucas Oil Stadium, Indianapolis IN"],
  ["Las Vegas","@","Kansas City","KC -8.5","40.5","Arrowhead Stadium, Kansas City MO"],
  ["Seattle","@","LA Rams","LAR -3","44.5","SoFi Stadium, Inglewood CA"],
  ["Chicago","@","Minnesota","MIN -1.5","43.5","U.S. Bank Stadium, Minneapolis MN"],
  ["Miami","@","New England","NE -10.5","42.5","Gillette Stadium, Foxborough MA"],
  ["Tampa Bay","@","New Orleans","TB -1.5","43.5","Caesars Superdome, New Orleans LA"],
  ["Philadelphia","@","NY Giants","PHI -3","41.5","MetLife Stadium, East Rutherford NJ"],
  ["San Francisco","@","Arizona","SF -8.5","44.5","State Farm Stadium, Glendale AZ"],
  ["Dallas","@","Washington","DAL -1.5","49.5","Northwest Stadium, Landover MD"],
  ["Atlanta","@","Carolina","CAR -2.5","41.5","Bank of America Stadium, Charlotte NC"],
  ["Pittsburgh","@","Baltimore","BAL -5.5","43.5","M&amp;T Bank Stadium, Baltimore MD"],
  ["Tennessee","@","Houston","HOU -7","39.5","NRG Stadium, Houston TX"],
];

let rows = `<tr class="daybreak"><td colspan="3">All games &mdash; date and time TBD</td></tr>`;
games.forEach(g => {
  const [away,sep,home,line,ou,venue] = g;
  rows += `<tr>
    <td class="g-match"><span class="g-away">${away}</span> <span class="g-sep">${sep}</span> <span class="g-home">${home}</span><span class="g-venue">${venue}</span></td>
    <td class="g-line">${line}</td>
    <td class="g-ou">${ou}</td>
  </tr>`;
});

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
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
<title>NFL Week 18 2027: Full Schedule, Lines &amp; Totals | FreeSportsPicks.pro</title>
<meta name="description" content="Every NFL Week 18 game with spread, total and venue. All sixteen are divisional, all kickoff times are TBD, and resting starters makes this the hardest week of the year to handicap.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/week-18-2026.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/week-18-2026.html">
<meta property="og:title" content="NFL Week 18 2027: Full Schedule, Lines &amp; Totals">
<meta property="og:description" content="All sixteen games are divisional, all times are TBD, and lineup news matters more than the line.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Week 18 Schedule, Lines and Totals","description":"Full NFL Week 18 schedule with venues, point spreads and totals for all sixteen divisional matchups.","url":"https://www.freesportspicks.pro/nfl/week-18-2026.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Week 18","item":"https://www.freesportspicks.pro/nfl/week-18-2026.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When is NFL Week 18?","acceptedAnswer":{"@type":"Answer","text":"Week 18 falls between 6 and 12 January 2027. No kickoff times are confirmed in advance: the league schedules the entire final week close to the date so that games with playoff implications can be placed in the best slots and games affecting the same playoff picture can kick off simultaneously."}},{"@type":"Question","name":"Why are all Week 18 games divisional?","acceptedAnswer":{"@type":"Answer","text":"The league schedules every Week 18 fixture as a division matchup by design. It maximises the number of games with direct playoff consequences and ensures teams competing for the same division title face relevant opponents in the final week rather than unrelated ones."}},{"@type":"Question","name":"Why are Week 18 kickoff times not announced in advance?","acceptedAnswer":{"@type":"Answer","text":"So the league can flex games based on what is at stake once Week 17 concludes. Games that affect the same playoff outcome are typically scheduled simultaneously to prevent teams from knowing results in advance, and the most consequential fixtures are moved into prime slots."}},{"@type":"Question","name":"Is Week 18 harder to bet than other weeks?","acceptedAnswer":{"@type":"Answer","text":"Generally yes. Teams with playoff position secured often rest starters, while opponents still competing play full strength. That produces motivational and personnel mismatches that markets attempt to price but cannot fully anticipate until lineups are confirmed, which is often shortly before kickoff."}},{"@type":"Question","name":"What is the biggest spread in NFL Week 18?","acceptedAnswer":{"@type":"Answer","text":"New England is laying 10.5 against Miami and Buffalo 10 against the New York Jets. Both are divisional games, and both numbers were set before it was known which teams would rest players."}}]}</script>
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
.g-line,.g-ou{color:#C9A84C;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13.5px;white-space:nowrap;}
.keypoint{background:#12161C;border-left:3px solid #C9A84C;border-radius:4px;padding:16px 20px;margin:22px 0;}
.keypoint p{margin-bottom:0;color:#F5F5F0;font-size:15px;}
.weeknav{display:flex;gap:8px;flex-wrap:wrap;margin:26px 0}
.weeknav a{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:12px;color:#C9A84C;border:1px solid #2A2F38;border-radius:4px;padding:7px 11px;text-decoration:none}
.weeknav a:hover{border-color:#C9A84C}
.weeknav a.on{background:#C9A84C;color:#0A0A0A;border-color:#C9A84C}
</style>
</head>
<body>
${HEADER}
<main>
<section class="page-hero"><div class="container">
  <h1>NFL Week 18</h1>
  <p>Sixteen games, all divisional, all with kickoff times unannounced &mdash; and the week where the line tells you least.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("18")}

<p>Week 18 falls between 6 and 12 January 2027. Every fixture is a division matchup and not one kickoff time is confirmed. Both of those things are deliberate.</p>

<h2>The full Week 18 board</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Line</th><th>Total</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">Lines and totals as posted at time of writing. Kickoff times are confirmed after Week 17 concludes. Numbers move &mdash; check current pricing before betting anything.</p>

<h2>Why every game is divisional</h2>
<p>The league builds the final week entirely from division matchups, and the reason is competitive integrity.</p>
<p>By Week 18 the playoff picture usually turns on a handful of outcomes. Making every game divisional <strong>maximises the number of fixtures with direct consequences</strong> &mdash; teams competing for the same title play each other rather than unrelated opponents, so the results that decide a division are settled between the teams involved.</p>

<h2>Why no kickoff times</h2>
<p>The entire week is scheduled after Week 17 finishes, for two reasons.</p>
<p><strong>Flexing.</strong> Games that turn out to matter get the best slots; games rendered meaningless get buried.</p>
<p><strong>Simultaneous kickoffs.</strong> Fixtures that affect the same playoff outcome are typically played at the same time, so no team enters the fourth quarter knowing exactly what result it needs. That is a fairness measure, and it is why the schedule cannot be set in advance.</p>

<div class="keypoint">
  <p>The practical consequence for a bettor: these lines were set before anyone knew which teams would have something to play for. That is unusual, and it is the defining feature of the week.</p>
</div>

<h2>The resting problem</h2>
<p>This is what makes Week 18 the hardest week of the season to handicap, and it is worth being direct about.</p>
<p><strong>A team with its seeding secured may rest its starters.</strong> Not partially &mdash; some teams sit their quarterback, their leading rusher and half the offensive line. An opponent still fighting for a place plays full strength.</p>
<p>Markets adjust when the news arrives, but the news often arrives late. A number posted a week out reflects two full-strength teams; the game played may not resemble that at all.</p>

<h3>What this means in practice</h3>
<ul>
  <li><strong>Lineup news outranks everything.</strong> In no other week does a single announcement move a game this far.</li>
  <li><strong>Early numbers are the least reliable of the season.</strong> They price a matchup that may not occur.</li>
  <li><strong>A big spread may be too big or nowhere near big enough</strong>, depending on which side is resting. New England -10.5 and Buffalo -10 were both set without knowing.</li>
  <li><strong>Motivation is real but hard to price.</strong> An eliminated team playing a rival for pride is a genuinely different proposition from an eliminated team going through the motions, and nobody knows which you are getting.</li>
</ul>

<h2>The board itself</h2>
<p><strong>New England -10.5</strong> and <strong>Buffalo -10</strong> are the largest numbers. <strong>Tennessee at Houston carries 39.5</strong>, the lowest total, and six games sit at 1.5 or 2.5.</p>
<p>Across eighteen weeks the divisional pattern has been consistent: these games price tightly because familiarity compresses margins. Week 18 is entirely divisional and mostly tight, which fits &mdash; but with a caveat that applies to no other week. <strong>The familiarity argument assumes both teams field their usual personnel</strong>, and in Week 18 that assumption frequently fails.</p>

<h2>Reading the numbers on this page</h2>
<p><strong>Line</strong> shows the favourite and the points they must win by. <strong>Total</strong> is the combined score expected from both teams, and you bet whether the result finishes above or below it.</p>
<p>Full mechanics: <a href="/how-to-read-betting-lines.html">how to read betting lines</a>.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>The full 2026 season</h2>
<ul>
  <li><a href="/nfl/week-17-2026.html">Week 17</a> &middot; <a href="/nfl/week-16-2026.html">Week 16 (Christmas)</a> &middot; <a href="/nfl/week-15-2026.html">Week 15</a> &middot; <a href="/nfl/week-14-2026.html">Week 14</a></li>
  <li><a href="/nfl/week-13-2026.html">Week 13</a> &middot; <a href="/nfl/week-12-2026.html">Week 12 (Thanksgiving)</a> &middot; <a href="/nfl/week-11-2026.html">Week 11</a> &middot; <a href="/nfl/week-10-2026.html">Week 10</a></li>
  <li><a href="/todays-picks.html">Today's free picks</a> &middot; <a href="/verified-records.html">Our complete record</a> &middot; <a href="/sports/nfl/">NFL betting hub</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/week-18-2026.html", html);
console.log("PAGE CREATED: /nfl/week-18-2026.html");
console.log("games listed: " + games.length);

["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17"].forEach(n => {
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
if (sm.includes("nfl/week-18-2026")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-17-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/week-18-2026.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
