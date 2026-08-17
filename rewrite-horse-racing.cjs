const fs = require("fs");

const src = fs.readFileSync("free-vs-premium-picks.html", "utf8");
const hs = src.indexOf('<header class="site-header"');
const he = src.indexOf("</header>", hs) + 9;
const HEADER = src.slice(hs, he);
const fsx = src.indexOf("<footer");
const fe = src.lastIndexOf("</footer>") + 9;
const FOOTER = src.slice(fsx, fe);
const GA = src.slice(src.indexOf("<!-- Google tag"), src.indexOf("</script>", src.indexOf("gtag('config'")) + 9);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>How Horse Racing Betting Works: Bet Types, Form &amp; Takeout (2026)</title>
<meta name="description" content="Win, place, show and exotics explained, how to read a form guide, what handicappers actually weigh — and the takeout figure that makes racing the hardest bet in gambling.">
<link rel="canonical" href="https://www.freesportspicks.pro/picks/horse-racing-picks/">
<meta property="og:type" content="article">
<meta property="og:url" content="https://www.freesportspicks.pro/picks/horse-racing-picks/">
<meta property="og:title" content="How Horse Racing Betting Works: Bet Types, Form &amp; Takeout">
<meta property="og:description" content="Bet types, form reading, and the takeout figure that makes racing the hardest bet in gambling.">
<meta property="og:image" content="https://www.freesportspicks.pro/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"How Horse Racing Betting Works","description":"Bet types, form reading, handicapping factors and takeout explained for horse racing betting.","url":"https://www.freesportspicks.pro/picks/horse-racing-picks/","publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":"https://www.freesportspicks.pro","logo":{"@type":"ImageObject","url":"https://www.freesportspicks.pro/fsp-logo.svg"}}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freesportspicks.pro/"},{"@type":"ListItem","position":2,"name":"How Horse Racing Betting Works","item":"https://www.freesportspicks.pro/picks/horse-racing-picks/"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is takeout in horse racing?","acceptedAnswer":{"@type":"Answer","text":"The percentage the track removes from each betting pool before paying winners. It commonly runs from the mid-teens on win, place and show pools to the mid-twenties or higher on exotic wagers, varying by track and bet type. By comparison, the effective margin on a standard -110 sports bet is roughly 4.5 percent, which makes racing structurally far harder to beat."}},{"@type":"Question","name":"What is the difference between win, place and show?","acceptedAnswer":{"@type":"Answer","text":"Win pays only if your horse finishes first. Place pays if it finishes first or second. Show pays if it finishes first, second or third. Payouts decrease accordingly, and place and show pools are typically smaller, which can produce unpredictable returns."}},{"@type":"Question","name":"What does each-way mean in horse racing?","acceptedAnswer":{"@type":"Answer","text":"An each-way bet is two bets of equal stake: one on the horse to win and one on it to place. A ten dollar each-way bet costs twenty dollars. It is more common in British and Irish racing than in North American parimutuel betting, where win, place and show are wagered separately."}},{"@type":"Question","name":"How do you read a racing form?","acceptedAnswer":{"@type":"Answer","text":"A form guide shows each horse's recent finishing positions, the class and distance of those races, the surface, the jockey and trainer, weight carried, and running style. The most useful reading compares like with like: performance at today's distance, on today's surface, against today's class of opposition."}},{"@type":"Question","name":"Why are horse racing odds different from sports betting odds?","acceptedAnswer":{"@type":"Answer","text":"Racing uses parimutuel pools rather than fixed odds. All bets go into a pool, the track removes its takeout, and the remainder is divided among winners. Your final payout is not known until betting closes, and late money can move your price substantially after you have committed."}}]}</script>
<style>
.page-hero{padding:120px 0 60px;text-align:center;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(201,168,76,0.06),transparent 70%);border-bottom:1px solid rgba(201,168,76,0.15);}
.page-hero h1{font-size:clamp(28px,4vw,48px);margin-bottom:16px;}
.page-hero p{font-size:16px;color:#808080;max-width:640px;margin:0 auto;}
.page-content-section{padding:60px 0;}
.page-content-section h2{font-family:'DM Serif Display',serif;font-size:24px;color:#F5F5F0;margin:44px 0 16px;padding-bottom:8px;border-bottom:1px solid #1A1A1A;}
.page-content-section h3{font-size:18px;color:#C9A84C;margin:28px 0 10px;}
.page-content-section p{font-size:15px;color:#808080;line-height:1.85;margin-bottom:16px;}
.page-content-section ul,.page-content-section ol{padding-left:20px;margin-bottom:20px;}
.page-content-section li{font-size:15px;color:#808080;line-height:1.8;margin-bottom:8px;}
.page-content-section strong{color:#F5F5F0;}
.page-content-section a{color:#C9A84C;}
.keypoint{background:#12161C;border-left:3px solid #C9A84C;border-radius:4px;padding:16px 20px;margin:22px 0;}
.keypoint p{margin-bottom:0;color:#F5F5F0;font-size:15px;}
.mathbox{background:#12161C;border:1px solid #1F252E;border-radius:4px;padding:18px 20px;margin:20px 0;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:14px;color:#A8B4C0;line-height:2;}
.mathbox b{color:#C9A84C;font-weight:600;}
.dtable{width:100%;border-collapse:collapse;margin:22px 0;font-size:15px;}
.dtable th{text-align:left;padding:10px 14px 10px 0;border-bottom:2px solid #1F252E;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:#C9A84C;}
.dtable td{padding:13px 14px 13px 0;border-bottom:1px solid #1A1A1A;color:#808080;line-height:1.65;vertical-align:top;}
.dtable td:first-child{color:#F5F5F0;font-weight:600;white-space:nowrap;}
</style>
</head>
<body>
${HEADER}
<main>
<section class="page-hero"><div class="container">
  <h1>How Horse Racing Betting Works</h1>
  <p>Bet types, form reading, and the one number that makes racing the hardest wager in gambling. We do not publish racing picks, and this page explains why.</p>
</div></section>

<section class="page-content-section"><div class="container" style="max-width:760px">

<p>Horse racing is the oldest form of organised betting and the least like everything else. The odds work differently, the payouts are calculated differently, and the house edge is several times what you face on a football spread.</p>
<p>None of that makes it a bad way to spend an afternoon. It does mean going in with an accurate picture, and most guides to racing betting skip the part that matters most.</p>

<h2>Parimutuel: why racing odds move after you bet</h2>
<p>Sports betting uses <strong>fixed odds</strong>. You take -110 on a spread, and -110 is what you get, regardless of what anyone bets afterwards.</p>
<p>Most horse racing in North America uses <strong>parimutuel pools</strong>. Every bet on a race goes into a shared pool. The track removes its cut. What remains is divided among the winning tickets.</p>
<p>The consequence catches everyone the first time: <strong>the odds displayed are an estimate, not a price.</strong> They move as money comes in, and a horse showing 8-1 twenty minutes out can pay 5-1 by the time the gates open. You are betting into an unknown final price.</p>

<div class="keypoint">
  <p>You are not betting against the track. You are betting against everyone else in the pool, and the track takes its percentage regardless of who wins.</p>
</div>

<h2>Takeout: the number that decides everything</h2>
<p>This is the fact that reframes racing betting, and it is missing from almost every guide.</p>
<p><strong>Takeout</strong> is the percentage the track removes from each pool before paying winners. It varies by track and by bet type, but the shape is consistent: straight pools &mdash; win, place, show &mdash; commonly run in the mid-teens, while exotic pools such as exactas, trifectas and superfectas frequently run in the low-to-mid twenties or higher.</p>

<h3>Compare that to sports betting</h3>
<div class="mathbox">
Sports bet at <b>-110</b> &rarr; effective margin roughly <b>4.5%</b><br>
Racing win pool &rarr; takeout commonly <b>15&ndash;18%</b><br>
Racing exotic pool &rarr; takeout commonly <b>20&ndash;25%+</b>
</div>
<p>You are giving up three to five times as much on every racing bet as on a point spread. And unlike the vig, which you pay once per bet, takeout compounds if you reinvest winnings across a card &mdash; each race takes another bite.</p>

<div class="keypoint">
  <p>A bettor who breaks even before takeout loses money. A bettor who is genuinely skilled must overcome fifteen to twenty-five percent before showing a profit, which is why the population of consistently winning horse players is very small and very good.</p>
</div>

<h3>Takeout varies, and it is published</h3>
<p>Tracks publish their takeout rates and they differ meaningfully. Two tracks running comparable racing can have several percentage points between them on the same bet type. If you bet racing seriously, the takeout table is worth more attention than any tip sheet.</p>

<h2>The bet types</h2>
<table class="dtable">
  <tr><th>Bet</th><th>Wins if</th></tr>
  <tr><td>Win</td><td>Your horse finishes first. Highest payout of the straight bets, lowest strike rate.</td></tr>
  <tr><td>Place</td><td>Your horse finishes first or second. Lower payout, better strike rate.</td></tr>
  <tr><td>Show</td><td>Your horse finishes first, second or third. Lowest payout, highest strike rate.</td></tr>
  <tr><td>Exacta</td><td>You pick first and second in exact order.</td></tr>
  <tr><td>Quinella</td><td>You pick first and second in either order. Not offered everywhere.</td></tr>
  <tr><td>Trifecta</td><td>First, second and third in exact order.</td></tr>
  <tr><td>Superfecta</td><td>First four in exact order.</td></tr>
  <tr><td>Daily Double</td><td>Winners of two consecutive races.</td></tr>
  <tr><td>Pick 3 / 4 / 5 / 6</td><td>Winners of three or more consecutive races. Large pools, punishing takeout.</td></tr>
</table>

<h3>Straight bets versus exotics</h3>
<p>Exotics offer the payouts that make racing appealing &mdash; a trifecta can return hundreds from a small stake. They also carry the highest takeout and require you to be right about several outcomes rather than one.</p>
<p>The honest arithmetic: exotics are where the marketing points and where the edge is worst. Straight win betting has the lowest takeout and is where the small population of profitable players tends to operate.</p>

<h3>Boxing and keying</h3>
<p><strong>Boxing</strong> covers every finishing order among your selections. A three-horse exacta box is six bets, not one, and costs six times the unit stake. <strong>Keying</strong> fixes one horse in a position and permutes the rest, which is cheaper.</p>
<p>Bettors routinely place a box without registering the multiplied cost. Check the total before confirming.</p>

<h2>Reading a form guide</h2>
<p>The form shows each horse's recent races. The useful reading compares like with like rather than treating all past performances equally.</p>

<h3>What actually matters</h3>
<ul>
  <li><strong>Class.</strong> The quality of race a horse has been competing in. A horse dropping in class faces easier opposition; one stepping up faces harder. This is arguably the single most predictive factor.</li>
  <li><strong>Distance.</strong> Horses have distance preferences and many are unsuited to today's trip. Previous form at today's distance is worth more than form at any other.</li>
  <li><strong>Surface.</strong> Dirt, turf and synthetic are different sports. Strong dirt form tells you relatively little about a turf race.</li>
  <li><strong>Running style.</strong> Front-runners, stalkers and closers. How today's field is composed determines whether a race sets up for early speed or a late run &mdash; a lone front-runner in a field of closers is a live chance.</li>
  <li><strong>Recent activity.</strong> Time since last run, and whether the horse has been working.</li>
  <li><strong>Connections.</strong> Trainer and jockey statistics, particularly a trainer's record in specific situations such as first run off a layoff.</li>
  <li><strong>Weight and post position.</strong> Both matter, and both matter less than most novices assume.</li>
</ul>

<h3>What matters less than people think</h3>
<p>Name, colour, appearance in the paddock for anyone who is not an experienced judge, and the tipster consensus printed in the programme. The last is worth noting mainly because when everyone agrees, the price collapses and the value disappears.</p>

<h2>Why we do not publish racing picks</h2>
<p>You may have arrived here looking for tips. We do not publish them, and the reason is the takeout figure above.</p>
<p>Our <a href="/verified-records.html">record</a> covers baseball, and we grade every pick publicly including the losses. To publish racing selections honestly we would need to clear fifteen to twenty-five percent takeout before showing any profit at all, sustained over a large sample. We are not confident we can, and we are not willing to sell selections we would not back with our own record.</p>
<p>Sites that do publish daily racing tips are welcome to. Ask them the same question we ask of everyone: <a href="/how-to-spot-a-fake-pick-record.html">show the complete dated record, including the losing runs</a>. Very few will.</p>

<h2>If you are going to bet racing anyway</h2>
<ul>
  <li><strong>Check the track's takeout</strong> before you decide where to play. Several points of difference is real money.</li>
  <li><strong>Favour straight bets over exotics</strong> if the goal is to last. The lowest takeout is in the win pool.</li>
  <li><strong>Understand that your price is not final</strong> until betting closes.</li>
  <li><strong>Price your boxes before confirming.</strong> A four-horse trifecta box is twenty-four bets.</li>
  <li><strong>Treat a day at the races as entertainment with a cost</strong> rather than as an investment. The maths is honest about which it is.</li>
</ul>

<h2>Related</h2>
<ul>
  <li><a href="/how-to-read-betting-lines.html">How to read betting lines &mdash; spreads, totals and the -110</a></li>
  <li><a href="/betting-glossary.html">Sports betting glossary &mdash; 58 terms</a></li>
  <li><a href="/tools/odds-converter/">Odds converter</a></li>
  <li><a href="/how-to-spot-a-fake-pick-record.html">How to spot a fake pick record</a></li>
  <li><a href="/todays-picks.html">Today's free MLB picks &mdash; what we actually publish</a></li>
</ul>

<p style="font-size:13px;color:#5a5a5a;margin-top:36px;border-top:1px solid #1A1A1A;padding-top:16px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>

</div></section>
</main>
${FOOTER}
</body>
</html>`;

fs.mkdirSync("picks/horse-racing-picks", { recursive: true });
fs.writeFileSync("picks/horse-racing-picks/index.html", html);
console.log("REWRITTEN");
console.log("header: " + html.includes("site-header"));
console.log("footer: " + html.includes("<footer"));
console.log("size: " + Math.round(html.length / 1024) + " KB");
