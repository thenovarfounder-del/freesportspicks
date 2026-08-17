const fs = require("fs");

const src = fs.readFileSync("free-vs-premium-picks.html", "utf8");
const hs = src.indexOf('<header class="site-header"');
const he = src.indexOf("</header>", hs) + 9;
const HEADER = src.slice(hs, he);
const fsx = src.indexOf("<footer");
const fe = src.lastIndexOf("</footer>") + 9;
const FOOTER = src.slice(fsx, fe);
const GA = src.slice(src.indexOf("<!-- Google tag"), src.indexOf("</script>", src.indexOf("gtag('config'")) + 9);

const WEEKS = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
function nav(current){
  let s = '<div class="weeknav">\n' + WEEKS.map(w =>
    `  <a href="/nfl/week-${w}-2026.html"${w===current?' class="on"':''}>Wk ${w}</a>`
  ).join("\n");
  s += `\n  <a href="/nfl/playoffs-2027.html"${current==="PO"?' class="on"':''}>Playoffs</a>\n</div>`;
  return s;
}

const wildcard = [
  ["Sat 16 Jan 2027","Game 1","TBD","@","TBD"],
  ["Sat 16 Jan 2027","Game 2","TBD","@","TBD"],
  ["Sun 17 Jan 2027","Game 3","TBD","@","TBD"],
  ["Sun 17 Jan 2027","Game 4","TBD","@","TBD"],
  ["Sun 17 Jan 2027","Game 5","TBD","@","TBD"],
  ["Mon 18 Jan 2027","Game 6","TBD","@","TBD"],
];

let wcRows = "";
let lastDay = "";
wildcard.forEach(g => {
  const [day,label,away,sep,home] = g;
  if (day !== lastDay) {
    wcRows += `<tr class="daybreak"><td colspan="3">${day}</td></tr>`;
    lastDay = day;
  }
  wcRows += `<tr>
    <td class="g-match"><span class="g-tbd">${away}</span> <span class="g-sep">${sep}</span> <span class="g-tbd">${home}</span><span class="g-venue">${label} &mdash; higher seed hosts</span></td>
    <td class="g-time">TBD</td>
    <td class="g-line">&mdash;</td>
  </tr>`;
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NFL Playoff Schedule 2027: Bracket, Dates &amp; How Seeding Works | FreeSportsPicks.pro</title>
<meta name="description" content="The 2027 NFL playoff schedule with confirmed dates for Wild Card, Divisional, Conference Championship and Super Bowl weekends — plus how seeding, byes and home field are decided.">
<link rel="canonical" href="https://www.freesportspicks.pro/nfl/playoffs-2027.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/nfl/playoffs-2027.html">
<meta property="og:title" content="NFL Playoff Schedule 2027: Bracket, Dates &amp; How Seeding Works">
<meta property="og:description" content="Confirmed playoff dates, how the bracket is built, and why home field is worth more in January.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"NFL Playoff Schedule 2027","description":"The 2027 NFL playoff schedule with dates for all four rounds, plus how seeding, byes and home field advantage are determined.","url":"https://www.freesportspicks.pro/nfl/playoffs-2027.html","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"NFL","item":"https://www.freesportspicks.pro/sports/nfl/"},{"@type":"ListItem","position":3,"name":"Playoffs 2027","item":"https://www.freesportspicks.pro/nfl/playoffs-2027.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When do the 2027 NFL playoffs start?","acceptedAnswer":{"@type":"Answer","text":"Wild Card weekend runs 13 to 19 January 2027, with games on Saturday 16, Sunday 17 and Monday 18 January. The Divisional round follows 20 to 26 January, Conference Championships 27 January to 2 February, and the Super Bowl falls in the 10 to 15 February window."}},{"@type":"Question","name":"How many teams make the NFL playoffs?","acceptedAnswer":{"@type":"Answer","text":"Fourteen — seven from each conference. That is four division winners seeded one through four by record, plus three wild card teams seeded five through seven. Only the number one seed in each conference receives a first-round bye."}},{"@type":"Question","name":"Who hosts NFL playoff games?","acceptedAnswer":{"@type":"Answer","text":"The higher seed always hosts, in every round except the Super Bowl, which is played at a predetermined neutral venue. A division winner with a worse record than a wild card opponent still hosts, because seeding is determined by division title first and record second."}},{"@type":"Question","name":"How does the NFL playoff bracket reseed?","acceptedAnswer":{"@type":"Answer","text":"After Wild Card weekend the bracket reseeds, so the number one seed faces the lowest remaining seed in the Divisional round rather than a fixed opponent. This means the identity of the number one seed's opponent is not known until the Wild Card results are complete."}},{"@type":"Question","name":"Are NFL playoff games harder to bet than regular season games?","acceptedAnswer":{"@type":"Answer","text":"They differ in ways worth understanding. Every team is good, so spreads compress. Public money concentrates heavily on a small number of games, which can move numbers away from where a model would set them. And teams have full preparation time with no short weeks, which removes one variable that matters in the regular season."}}]}</script>
<style>
.page-hero{padding:120px 0 50px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(201,168,76,0.06),transparent 70%);border-bottom:1px solid rgba(201,168,76,0.15);}
.page-hero h1{font-size:clamp(28px,4vw,46px);margin-bottom:14px;}
.page-hero p{font-size:16px;color:#808080;max-width:640px;margin:0 auto;}
.page-content-section{padding:52px 0;}
.page-content-section h2{font-family:'DM Serif Display',serif;font-size:24px;color:#F5F5F0;margin:42px 0 16px;padding-bottom:8px;border-bottom:1px solid #1A1A1A;}
.page-content-section h3{font-size:18px;color:#C9A84C;margin:26px 0 10px;}
.page-content-section p{font-size:15px;color:#808080;line-height:1.85;margin-bottom:16px;}
.page-content-section ul,.page-content-section ol{padding-left:20px;margin-bottom:20px;}
.page-content-section li{font-size:15px;color:#808080;line-height:1.8;margin-bottom:8px;}
.page-content-section strong{color:#F5F5F0;}
.page-content-section a{color:#C9A84C;}
.sched{width:100%;border-collapse:collapse;margin:24px 0;background:#0E1218;border:1px solid #1F252E;border-radius:6px;overflow:hidden;}
.sched th{background:#151B23;color:#6C7A89;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:11px 14px;border-bottom:1px solid #1F252E;font-weight:600;}
.sched td{padding:13px 14px;border-bottom:1px solid #171D25;vertical-align:top;}
.sched tr:last-child td{border-bottom:none;}
.daybreak td{background:#151B23;color:#C9A84C;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;padding:9px 14px;font-weight:600;}
.g-match{color:#F5F5F0;font-size:15px;}
.g-tbd{color:#5C6875;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:14px;}
.g-sep{color:#5C6875;margin:0 6px;}
.g-venue{display:block;color:#5C6875;font-size:11.5px;margin-top:3px;}
.g-time,.g-line{color:#5C6875;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13px;white-space:nowrap;}
.rounds{width:100%;border-collapse:collapse;margin:24px 0;background:#0E1218;border:1px solid #1F252E;border-radius:6px;overflow:hidden;}
.rounds th{background:#151B23;color:#6C7A89;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;text-align:left;padding:11px 14px;border-bottom:1px solid #1F252E;font-weight:600;}
.rounds td{padding:14px;border-bottom:1px solid #171D25;color:#808080;font-size:15px;}
.rounds tr:last-child td{border-bottom:none;}
.rounds td:first-child{color:#F5F5F0;font-weight:600;white-space:nowrap;}
.rounds td:nth-child(2){color:#C9A84C;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:13.5px;white-space:nowrap;}
.keypoint{background:#12161C;border-left:3px solid #C9A84C;border-radius:4px;padding:16px 20px;margin:22px 0;}
.keypoint p{margin-bottom:0;color:#F5F5F0;font-size:15px;}
.seedbox{background:#12161C;border:1px solid #1F252E;border-radius:6px;padding:20px 22px;margin:22px 0;}
.seedbox h4{color:#C9A84C;font-size:13px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 12px;}
.seedbox ol{margin:0;padding-left:22px}
.seedbox li{color:#808080;font-size:14.5px;line-height:1.9;margin-bottom:4px}
.seedbox li strong{color:#F5F5F0}
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
  <h1>NFL Playoffs 2027</h1>
  <p>Confirmed dates for all four rounds, how the bracket is built, and why the seeding matters more than the record.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:820px">

${nav("PO")}

<p>The matchups are not set. The dates are. Below is the confirmed structure, what is known so far, and how the bracket resolves once Week 18 concludes on 12 January.</p>

<h2>The four rounds</h2>

<table class="rounds">
  <tr><th>Round</th><th>Dates</th><th>Format</th></tr>
  <tr><td>Wild Card</td><td>13&ndash;19 Jan 2027</td><td>Six games. Seeds 2 through 7 in each conference. Number one seeds rest.</td></tr>
  <tr><td>Divisional</td><td>20&ndash;26 Jan 2027</td><td>Four games. Number one seeds enter. Bracket reseeds.</td></tr>
  <tr><td>Conference Championship</td><td>27 Jan &ndash; 2 Feb 2027</td><td>Two games. AFC and NFC titles decided.</td></tr>
  <tr><td>Super Bowl</td><td>10&ndash;15 Feb 2027</td><td>One game, neutral venue.</td></tr>
</table>

<h2>Wild Card weekend: what is confirmed</h2>

<table class="sched">
  <tr><th>Matchup</th><th>Kickoff</th><th>Line</th></tr>
  ${wcRows}
</table>
<p style="font-size:13px;color:#5a5a5a">Matchups, kickoff times and lines are set after Week 18 concludes on 12 January 2027. Six Wild Card games are played across Saturday, Sunday and Monday.</p>

<h2>How the fourteen teams are decided</h2>
<p>Seven teams qualify from each conference.</p>

<div class="seedbox">
  <h4>Seeding order</h4>
  <ol>
    <li><strong>Seeds 1&ndash;4:</strong> the four division winners, ranked by record</li>
    <li><strong>Seeds 5&ndash;7:</strong> the three best remaining records, regardless of division</li>
  </ol>
</div>

<p>The consequence catches people every year: <strong>a division winner is seeded above every wild card team even with a worse record.</strong> A 9-8 division champion hosts an 12-5 wild card side, because winning your division is the first criterion and record only breaks ties within those groups.</p>

<div class="keypoint">
  <p>That is why the road team is sometimes favoured in a Wild Card game. The market prices the teams; the bracket prices the division title.</p>
</div>

<h2>The bye, and what it is worth</h2>
<p><strong>Only the number one seed in each conference receives a first-round bye.</strong> Under the fourteen-team format that is a single team per conference rather than two.</p>
<p>The bye is worth more than a week off. It means an extra week of recovery for a squad that has played seventeen games, no travel, and preparation time while opponents play. It also means the number one seed reaches the Divisional round facing a team that has just played a physical playoff game.</p>
<p>The counter-argument, which surfaces every January: <strong>rust</strong>. A team that has not played competitive football for two weeks may start slowly. The evidence for this is weaker than the evidence for the rest advantage, but it is not nothing.</p>

<h2>Reseeding: why the bracket is not fixed</h2>
<p>The NFL reseeds after each round rather than running a fixed bracket.</p>
<p>After Wild Card weekend, <strong>the number one seed plays the lowest remaining seed</strong>, whoever that turns out to be. If the seven seed wins its opening game, it travels to the one seed. If the seven loses and the six wins, the six goes instead.</p>
<p>The practical implication: you cannot map a path to the Super Bowl in advance. A team's second-round opponent depends on results elsewhere in the conference.</p>

<h2>Home field, and why January is different</h2>
<p>The higher seed hosts every game except the Super Bowl. In the regular season that is worth a couple of points; in January it can be worth more.</p>
<p><strong>Weather is the reason.</strong> A game in Buffalo, Green Bay or Kansas City in January is played in conditions that visiting warm-weather teams rarely encounter. Our <a href="/nfl/week-16-2026.html">Week 16 board</a> showed totals dropping to 37.5 in late December; playoff numbers in northern venues sit in similar territory.</p>
<p>The Super Bowl is the exception &mdash; a neutral site, chosen years in advance, usually warm or domed.</p>

<h2>How playoff betting differs</h2>
<p>Three things change once the regular season ends, and they are worth knowing before January.</p>

<h3>The spreads compress</h3>
<p>Every remaining team is good. The gulf between a playoff side and a bottom-of-the-table team no longer exists on the board, so the enormous numbers of the regular season largely disappear.</p>

<h3>Public money concentrates</h3>
<p>Six games in a weekend attract the attention that sixteen normally share, and casual money arrives in volume. That can push a number away from where a model would set it &mdash; which is either an opportunity or a warning depending on which side you are on.</p>

<h3>Preparation is equalised</h3>
<p>No short weeks, no Thursday games, no travelling to London. Every team has a full week to prepare, which removes a variable that matters through the regular season and leaves the matchup itself doing more of the work.</p>

<h2>What is still unknown</h2>
<p>Everything except the calendar. Seeding turns on Week 18, and under the current format several playoff places routinely come down to the final Sunday.</p>
<p>We will update this page with matchups, kickoff times and lines as soon as the bracket is set. Until then, our <a href="/nfl/week-18-2026.html">Week 18 board</a> covers the games that decide it &mdash; all sixteen of them divisional, by design.</p>

<h2>Our picks and our record</h2>
<p>We publish free picks daily and grade every one publicly the following morning, wins and losses both. The <a href="/verified-records.html">record page</a> lists every pick since day one with the date and result, including the losing runs.</p>
<p>The record file is version-controlled, so every change carries a timestamp and nothing can be quietly removed. To evaluate any pick service including ours, our guide on <a href="/how-to-spot-a-fake-pick-record.html">spotting a fake pick record</a> lists the tests worth applying.</p>

<h2>The 2026 season</h2>
<ul>
  <li><a href="/nfl/week-18-2026.html">Week 18</a> &middot; <a href="/nfl/week-17-2026.html">Week 17</a> &middot; <a href="/nfl/week-16-2026.html">Week 16 (Christmas)</a> &middot; <a href="/nfl/week-15-2026.html">Week 15</a></li>
  <li><a href="/nfl/week-12-2026.html">Week 12 (Thanksgiving)</a> &middot; <a href="/nfl/week-1-2026.html">Week 1</a> &middot; <a href="/sports/nfl/">NFL betting hub</a></li>
  <li><a href="/how-to-read-betting-lines.html">How to read betting lines</a> &middot; <a href="/todays-picks.html">Today's free picks</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("nfl", { recursive: true });
fs.writeFileSync("nfl/playoffs-2027.html", html);
console.log("PAGE CREATED: /nfl/playoffs-2027.html");

// add playoffs link to all 18 week navs
WEEKS.forEach(n => {
  const f = `nfl/week-${n}-2026.html`;
  if (!fs.existsSync(f)) { console.log("missing: " + f); return; }
  let c = fs.readFileSync(f, "utf8");
  const navRe = /<div class="weeknav">[\s\S]*?<\/div>/;
  if (!navRe.test(c)) { console.log("week " + n + ": no nav found"); return; }
  c = c.replace(navRe, nav(n));
  fs.writeFileSync(f, c);
});
console.log("all 18 week navs updated with Playoffs link");

let sm = fs.readFileSync("sitemap.xml", "utf8");
if (sm.includes("nfl/playoffs-2027")) { console.log("sitemap: already listed"); }
else {
  const anchor = "nfl/week-18-2026.html</loc>";
  const i = sm.indexOf(anchor);
  if (i < 0) { console.log("sitemap: anchor missing"); }
  else {
    const end = sm.indexOf("</url>", i) + 6;
    const today = new Date().toISOString().slice(0, 10);
    sm = sm.slice(0, end) + `\n  <url><loc>https://www.freesportspicks.pro/nfl/playoffs-2027.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>` + sm.slice(end);
    fs.writeFileSync("sitemap.xml", sm);
    console.log("sitemap: added");
  }
}
