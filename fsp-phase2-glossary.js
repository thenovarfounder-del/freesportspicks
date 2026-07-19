// FSP Phase 2: Betting Glossary + 4 missing explainers. Run from repo root: node fsp-phase2-glossary.js
const fs = require('fs');
const path = require('path');
const BASE = 'https://www.freesportspicks.pro';
const TODAY = '2026-07-19';

const GA = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YZPX14DK4Y"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YZPX14DK4Y');
</script>`;

function chrome(crumbs, active){
  const items = crumbs.map((c,i) => i < crumbs.length-1
    ? `<li><a href="${c[1]}" style="font-size:12px;color:#606060;text-decoration:none;">${c[0]}</a></li>\n      <li style="font-size:12px;color:#333;">/</li>`
    : `<li style="font-size:12px;color:#C9A84C;">${c[0]}</li>`).join('\n      ');
  return `<nav class="breadcrumb-nav" style="background:#050505;border-bottom:1px solid #1a1a1a;padding:12px 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 24px;">
    <ol style="list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      ${items}
    </ol>
  </div>
</nav>
<header class="site-header">
  <nav class="nav-container">
    <a href="/" class="nav-logo" style="text-decoration:none;display:flex;align-items:center;">
      <img src="/fsp-logo.svg" alt="FreeSportsPicks.pro" style="height:90px;width:auto;display:block;" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
      <span style="display:none;align-items:center;gap:8px;font-family:'DM Serif Display',serif;font-size:20px;color:#F5F5F0;">FreeSportsPicks<span style="color:#C9A84C;">.pro</span></span>
    </a>
    <ul class="nav-links">
      <li><a href="/picks/nfl-picks/">NFL Picks</a></li>
      <li><a href="/picks/nba-picks/">NBA Picks</a></li>
      <li><a href="/picks/mlb-picks/">MLB Picks</a></li>
      <li><a href="/picks/college-basketball-picks/">CBB Picks</a></li>
      <li><a href="/picks/college-football-picks/">CFB Picks</a></li>
      <li><a href="/picks/free-sports-picks/">Free Picks</a></li>
      <li><a href="/picks/best-bets-today/">Best Bets</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/blog/">Blog</a></li>
    </ul>
    <a href="/guestbook.html" class="nav-cta">Get Free Picks</a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </nav>
</header>
<div class="mobile-nav" id="mobileNav">
  <a href="/picks/nfl-picks/">NFL Picks</a>
  <a href="/picks/nba-picks/">NBA Picks</a>
  <a href="/picks/mlb-picks/">MLB Picks</a>
  <a href="/picks/college-basketball-picks/">CBB Picks</a>
  <a href="/picks/college-football-picks/">CFB Picks</a>
  <a href="/picks/free-sports-picks/">Free Picks</a>
  <a href="/picks/best-bets-today/">Best Bets</a>
  <a href="/tools/">Betting Tools</a>
  <a href="/blog/">Blog</a>
  <a href="/about.html">About</a>
  <a href="/guestbook.html" class="mobile-cta">Get Free Picks &rarr;</a>
</div>`;
}

const FOOTER = `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo" style="display:flex;align-items:center;">
          <img src="/fsp-logo-footer.svg" alt="FreeSportsPicks.pro" style="height:64px;width:auto;display:block;" onerror="this.style.display='none'">
        </div>
        <p class="footer-desc">Free daily sports picks for NFL, NBA, MLB, NHL and more. AI-powered picks with verified records.</p>
      </div>
      <div>
        <div class="footer-col-title">Picks</div>
        <ul class="footer-links">
          <li><a href="/picks/free-nfl-picks/">Free NFL Picks</a></li>
          <li><a href="/picks/free-nba-picks/">Free NBA Picks</a></li>
          <li><a href="/picks/free-mlb-picks/">Free MLB Picks</a></li>
          <li><a href="/picks/best-bets-today/">Best Bets Today</a></li>
          <li><a href="/picks/nfl-predictions/">NFL Predictions</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">More Picks</div>
        <ul class="footer-links">
          <li><a href="/picks/nba-picks/">NBA Picks</a></li>
          <li><a href="/picks/nfl-picks/">NFL Picks</a></li>
          <li><a href="/picks/parlay-picks/">Parlay Picks</a></li>
          <li><a href="/picks/nhl-picks/">NHL Picks</a></li>
          <li><a href="/picks/sports-picks/">Sports Picks</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Resources</div>
        <ul class="footer-links">
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/tools/">Betting Tools</a></li>
          <li><a href="/betting-glossary.html">Betting Glossary</a></li>
          <li><a href="/verified-records.html">Verified Records</a></li>
          <li><a href="/responsible-gambling.html">Responsible Gambling</a></li>
          <li><a href="https://t.me/freesportspickspro" target="_blank">Telegram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 FreeSportsPicks.pro &mdash; All Rights Reserved. For entertainment purposes only. Must be 21+.</p>
    </div>
  </div>
</footer>
<script>
(function(){var h=document.getElementById("hamburger"),m=document.getElementById("mobileNav");if(h&&m){h.addEventListener("click",function(){m.classList.toggle("open");h.classList.toggle("open");});}})();
</script>`;

const BLOG_CSS = `<style>
.blog-page{padding:120px 0 80px;}
.blog-content{max-width:860px;margin:0 auto;padding:0 24px;}
.blog-content h1{font-family:'DM Serif Display',serif;font-size:clamp(28px,4vw,48px);color:#F5F5F0;margin-bottom:12px;}
.blog-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C9A84C;margin-bottom:16px;}
.blog-meta{display:flex;align-items:center;gap:12px;margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1A1A1A;}
.blog-avatar{width:36px;height:36px;background:linear-gradient(135deg,#A07830,#C9A84C);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#0A0A0A;}
.blog-author{font-size:13px;color:#F5F5F0;font-weight:600;}
.blog-date{font-size:12px;color:#606060;}
.blog-content h2{font-family:'DM Serif Display',serif;font-size:24px;color:#F5F5F0;margin:40px 0 16px;padding-bottom:8px;border-bottom:1px solid #1A1A1A;}
.blog-content h3{font-family:'DM Serif Display',serif;font-size:18px;color:#C9A84C;margin:28px 0 12px;}
.blog-content p{font-size:15px;color:#808080;line-height:1.85;margin-bottom:16px;}
.blog-content ul{padding-left:20px;margin-bottom:20px;}
.blog-content li{font-size:15px;color:#808080;line-height:1.8;margin-bottom:8px;}
.blog-content strong{color:#F5F5F0;}
.blog-content a{color:#C9A84C;}
.blog-cta{background:linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.04));border:1px solid rgba(201,168,76,0.3);border-radius:6px;padding:32px;text-align:center;margin:48px 0;}
.blog-cta h3{font-size:20px;color:#F5F5F0;margin-bottom:8px;}
.blog-cta p{font-size:14px;color:#808080;margin-bottom:20px;}
.blog-cta a.btn{display:inline-block;background:linear-gradient(135deg,#C9A84C,#A07830);color:#0A0A0A;font-weight:800;font-size:14px;letter-spacing:.04em;padding:13px 24px;border-radius:8px;text-decoration:none;}
.blog-disclaimer{background:#111;border:1px solid #1A1A1A;border-radius:4px;padding:16px;font-size:12px;color:#606060;line-height:1.6;margin-top:32px;}
</style>`;

const CTA = `<div class="blog-cta">
  <h3>Put the knowledge to work &mdash; free</h3>
  <p>Expert picks with a verified public record, delivered free every morning. No credit card, no catch.</p>
  <a class="btn" href="/free-picks.html">GET TODAY&rsquo;S FREE PICKS &rarr;</a>
</div>`;

const DISC = `<div class="blog-disclaimer">FreeSportsPicks.pro content is for entertainment and informational purposes only. Sports betting involves risk; never bet money you cannot afford to lose. Must be 21+. If gambling stops being fun, visit our <a href="/responsible-gambling.html" style="color:#808080;">responsible gambling</a> page.</div>`;

function blogPage(p){
  const url = BASE + '/blog/' + p.slug + '.html';
  const art = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":p.h1,"description":p.desc,"author":{"@type":"Organization","name":"FreeSportsPicks.pro","url":BASE},"publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","logo":{"@type":"ImageObject","url":BASE+"/logo.png"}},"datePublished":TODAY,"dateModified":TODAY,"mainEntityOfPage":{"@type":"WebPage","@id":url}});
  const bc = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},{"@type":"ListItem","position":2,"name":"Blog","item":BASE+"/blog/"},{"@type":"ListItem","position":3,"name":p.h1,"item":url}]});
  const faq = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":p.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))});
  return `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${BASE}/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${art}</script>
<script type="application/ld+json">${bc}</script>
<script type="application/ld+json">${faq}</script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/css/main.css">
${BLOG_CSS}
</head>
<body>
${chrome([["Home","/"],["Blog","/blog/"],[p.h1,""]])}
<section class="blog-page">
<div class="blog-content">
<span class="blog-badge">${p.badge}</span>
<h1>${p.h1}</h1>
<div class="blog-meta">
  <div class="blog-avatar">FSP</div>
  <div><div class="blog-author">FreeSportsPicks.pro Team</div><div class="blog-date">July 19, 2026</div></div>
</div>
${p.body}
<h2>Frequently asked questions</h2>
${p.faqs.map(f=>'<h3>'+f.q+'</h3><p>'+f.a+'</p>').join('\n')}
${CTA}
${DISC}
</div>
</section>
${FOOTER}
</body>
</html>`;
}

const GUIDES = [
{
  slug:'moneyline-betting-explained', badge:'Betting School',
  title:'Moneyline Betting Explained: How It Works &amp; When to Use It',
  desc:'Moneyline betting explained simply: how to read the odds, favorites vs underdogs, when moneylines beat spreads, and the break-even math nobody shows beginners.',
  h1:'Moneyline Betting Explained',
  faqs:[
    {q:'What is a moneyline bet?', a:'The simplest bet in sports: pick who wins the game, no point spread involved. The odds handle the difference in team strength: favorites pay less than you risk, underdogs pay more.'},
    {q:'What does -150 mean on a moneyline?', a:'You must risk $150 to win $100 (plus your stake back). The negative number is the favorite tax: the more likely the win, the more you pay for it. A -150 line implies a 60% win probability.'},
    {q:'Is the moneyline better than the spread?', a:'Neither is better universally: moneylines shine with live underdogs (paid in full for the upset) and in low-scoring sports like baseball and hockey where one run decides games; spreads generally offer better value on big favorites where the moneyline price gets prohibitive.'},
    {q:'How do you calculate moneyline implied probability?', a:'For negative odds: the number divided by (the number + 100), so -150 is 150/250 = 60%. For positive odds: 100 divided by (the odds + 100), so +200 is 100/300 = 33.3%. Beat those percentages long-term and you profit.'},
  ],
  body:`<p>Every betting menu starts here: the moneyline is a bet on who wins, full stop. No spreads, no margins, no backdoor covers &mdash; if your team wins by one point in overtime, you cash exactly as if they won by forty. The simplicity is real; the pricing is where the sport hides its math, and where most beginners pay tuition they never itemize.</p>
<h2>Reading the numbers</h2>
<p>Moneylines speak in American odds centered on $100. <strong>Favorites carry negative numbers</strong>: -150 means risking $150 to win $100, the price of backing the likely winner. <strong>Underdogs carry positive numbers</strong>: +130 means $100 wins $130, the reward for backing the upset. The gap between a game&rsquo;s two prices (-150 / +130 rather than -150 / +150) is the vig &mdash; the book&rsquo;s built-in cut, present in every market, visible once you know to look. Our <a href="/tools/odds-converter/">odds converter</a> turns any line into its implied probability instantly, which is the only translation that matters.</p>
<h2>The break-even lens</h2>
<p>Every moneyline is a claim about probability: -150 charges you as if the favorite wins 60% of the time; +200 pays you as if the underdog wins 33%. Profitable moneyline betting is nothing more mysterious than disagreeing with those claims correctly &mdash; finding favorites who win more often than their price implies, and dogs who win less rarely. Bet -200 favorites blindly and a 65% win rate still loses money; that arithmetic ambushes every beginner exactly once.</p>
<h2>When the moneyline is the right tool</h2>
<p>Three situations favor it. <strong>Live underdogs:</strong> when your analysis says the dog wins outright, the moneyline pays for the whole opinion while the spread pays for a fraction of it. <strong>Low-scoring sports:</strong> baseball and hockey price in moneylines natively (with the <a href="/blog/mlb-run-line-betting.html">run line</a> and <a href="/blog/nhl-puck-line-explained.html">puck line</a> as spread cousins) because one-run margins make spreads brutal. <strong>Small favorites:</strong> laying -120 to skip spread drama is often worth the modest premium. What rarely pays is the beginner special &mdash; parlaying heavy favorites &ldquo;because they all win anyway.&rdquo; They do, until the one Tuesday they don&rsquo;t, and our <a href="/tools/parlay-calculator/">parlay calculator</a> shows what that ticket was really worth all along.</p>
<h2>The FSP approach</h2>
<p>Our daily cards mix moneylines, spreads and totals based on where the price is wrong, not where the bet type is fashionable &mdash; and every result lands on the <a href="/verified-records.html">verified record</a>. Start with the <a href="/picks/best-bets-today/">free best bets</a> and watch which tool gets used when; that education is free too.</p>`,
},
{
  slug:'over-under-totals-explained', badge:'Betting School',
  title:'Over/Under Betting Explained: How Totals Work',
  desc:'Over/under (totals) betting explained: how the number is set, what moves it, juice on each side, and the honest way to handicap totals instead of rooting for points.',
  h1:'Over/Under Betting Explained: How Totals Work',
  faqs:[
    {q:'What is an over/under bet?', a:'A bet on the combined final score of both teams versus a number the sportsbook sets. Take the over if you expect more total points, the under for fewer. Who wins the game is irrelevant.'},
    {q:'What happens if the total lands exactly on the number?', a:'A push: stakes are refunded on both sides. Books increasingly hang half-point totals (47.5) specifically to eliminate pushes and guarantee a decision.'},
    {q:'Why do totals have different juice on each side?', a:'When action or sharp money leans one way, books adjust the price (over -115 / under -105) before moving the number itself. The juice is a message about where informed money sits.'},
    {q:'What moves an over/under line?', a:'Injuries to key scorers or elite defenders, pace and style matchups, weather in outdoor sports (wind is the totals assassin), and betting volume. The number you get at 10am rarely matches kickoff, which is why line shopping applies to totals too.'},
  ],
  body:`<p>The total is the one bet where you fire your rooting interest entirely: nobody needs to win, cover or survive &mdash; you are betting on the shape of the game itself. Books post a combined-score number; you take over or under; the teams unknowingly collaborate on your fate. It looks like the simplest market on the board, which is exactly why it punishes lazy handicapping so reliably.</p>
<h2>How the number works</h2>
<p>A total of 47.5 in an NFL game means over bettors need 48+ combined points and under bettors need 47 or fewer &mdash; the half point exists to guarantee a decision (whole numbers can push, refunding everyone). Standard juice sits near -110 each side, and when it drifts (over -118 / under -102), the book is telling you where pressure is building before it moves the number itself. Reading that pressure is free education posted in plain sight.</p>
<h2>What actually moves totals</h2>
<p>Four forces, in rough order of violence: <strong>personnel</strong> (a backup quarterback or a resting star swings scoring expectancy immediately), <strong>pace and style</strong> (two fast-break teams inflate possessions; two grinders strangle them &mdash; the matchup matters more than the season averages), <strong>weather</strong> (wind above 15 mph is the great NFL under-maker, mangling passing and kicking alike), and <strong>the market</strong> (early sharp bets push numbers hours before casual money arrives). The bettor who checks all four before the number moves is playing a different game than the one who checks the forecast at kickoff.</p>
<h2>The honest way to handicap a total</h2>
<p>Build your own number first &mdash; even a rough one from pace, efficiency and matchup &mdash; then compare it to the market instead of asking &ldquo;do I feel points tonight?&rdquo; If your number says 51 and the book hangs 47.5, you have an opinion worth pricing; if they match, passing is correct and free. This is the same value discipline from our <a href="/blog/value-betting-explained.html">value betting guide</a> applied to game shape, and sport-specific wrinkles live in our <a href="/blog/mlb-over-under-strategy.html">MLB totals</a> and <a href="/blog/nba-totals-betting-strategy.html">NBA totals</a> breakdowns.</p>
<h2>Totals on the FSP card</h2>
<p>Totals appear on our free daily cards whenever the number, not the narrative, is wrong &mdash; and land on the <a href="/verified-records.html">verified record</a> like everything else. See today&rsquo;s on the <a href="/picks/best-bets-today/">best bets page</a>, and run any price through the <a href="/tools/odds-converter/">odds converter</a> to see what win rate it demands of you.</p>`,
},
{
  slug:'futures-betting-explained', badge:'Betting School',
  title:'Futures Betting Explained: Odds, Value &amp; the Hold Problem',
  desc:'Futures betting explained honestly: how championship odds work, why futures markets carry the biggest house edge on the board, hedging opportunities, and when futures are actually worth it.',
  h1:'Futures Betting Explained',
  faqs:[
    {q:'What is a futures bet?', a:'A wager on a season-long outcome: championship winners, division titles, win totals, or awards like MVP. Your money is locked from bet to settlement, which can be months.'},
    {q:'Why do futures have such a big house edge?', a:'Because books price every contender with margin and sell the whole field: add up the implied probabilities in a championship market and they routinely total 130-150%, versus about 105% on a single game. Futures are the highest-hold product on the menu.'},
    {q:'Can you cash out a futures bet early?', a:'Many books offer cash-out at their price, which embeds a fresh margin; the sharper exit is often hedging: betting the other side of your position near settlement to lock profit. Our hedging guide covers the math.'},
    {q:'When are futures actually worth betting?', a:'Early, on genuine analysis the market has not priced: a division favorite at +250 in July that will be -150 by December, or win totals where you disagree with the projection. Betting the preseason favorite at short odds mostly donates months of locked capital to the hold.'},
  ],
  body:`<p>Futures are betting&rsquo;s long game: one ticket in September, one sweat until February. They are also, quietly, the worst-priced product in the building &mdash; and the books are betting you never add up why. This guide does the addition, then shows the narrow cases where futures still make sense.</p>
<h2>How futures odds work</h2>
<p>Championship markets list every team at a price: +600 for the contender, +25000 for the miracle. Convert any of them with the <a href="/tools/odds-converter/">odds converter</a> and the individual prices look normal &mdash; the trick only appears in aggregate. Sum the implied probabilities across a full title market and they commonly total 130-150%. On a single game that overround is about 105%. The difference is the hold: futures charge triple to quintuple the margin of a Sunday spread, and they charge it while holding your money for months of dead time you could have compounded elsewhere.</p>
<h2>Where the value hides anyway</h2>
<p>Two honest windows exist. <strong>Early mispricing:</strong> markets set in July run on last season&rsquo;s narratives; a bettor who genuinely projects a division or a breakout before the market does gets +250 on a future -150 reality &mdash; that gap is real edge, big enough to survive the hold. <strong>Number disagreements:</strong> win totals and award markets reduce to a single projection you can independently model, which is more honest work than most futures bettors ever attempt and precisely why it pays the few who do it. What has no window: betting the consensus favorite at short odds in a 140% market. That ticket is a donation with a receipt.</p>
<h2>The exit: hedging your position</h2>
<p>The best futures feature is what happens when you are right early: your +900 team reaches the final, and betting their opponent locks guaranteed profit whatever happens &mdash; the one moment betting offers a risk-free return. The sizing math lives in our <a href="/blog/hedging-a-bet-explained.html">hedging guide</a>; the discipline is deciding your exit plan the day you bet the ticket, not the night the market tempts you.</p>
<h2>Futures, the FSP way</h2>
<p>We publish futures analysis when a number is genuinely wrong &mdash; our <a href="/blog/nhl-stanley-cup-futures-betting.html">Stanley Cup futures</a> and <a href="/blog/nba-mvp-betting-odds-analysis.html">NBA award odds</a> breakdowns show the method &mdash; and skip the annual favorite-worship entirely. The daily edge remains sharper than the seasonal one, which is why the <a href="/picks/best-bets-today/">free daily card</a> is the main event and futures are the occasional dessert.</p>`,
},
{
  slug:'hedging-a-bet-explained', badge:'Betting School',
  title:'Hedging a Bet Explained: The Math of Locking In Profit',
  desc:'How to hedge a bet: the exact formula for guaranteeing profit on futures and parlays, when hedging is smart versus when it burns value, with worked examples.',
  h1:'Hedging a Bet Explained: The Math of Locking In Profit',
  faqs:[
    {q:'What does hedging a bet mean?', a:'Betting the opposite side of an existing position to reduce risk or guarantee profit. The classic case: your +1000 futures team reaches the final, and betting their opponent locks a win regardless of the result.'},
    {q:'What is the formula for an equal-profit hedge?', a:'Hedge stake = (original potential payout) divided by (decimal odds of the hedge side). If your ticket pays $1,100 total and the opponent is 2.00, betting $550 on them guarantees $550 back either way, locking equal profit both outcomes.'},
    {q:'Is hedging always the smart play?', a:'No: every hedge sells some of your position back to the book at their price, vig included. Hedge when the locked amount genuinely matters to you or your original edge is gone; let it ride when your ticket still holds positive expected value and the swing is affordable.'},
    {q:'Should you hedge the last leg of a parlay?', a:'Same math, smaller scale: with a big payout pending on one leg, betting the other side converts a maybe into a definitely. Whether to do it depends on the payout size relative to your bankroll, which is a nerves question wearing a math costume.'},
  ],
  body:`<p>Hedging is the one move in betting that can manufacture certainty: bet against yourself at the right moment, in the right amount, and you win no matter what the scoreboard says. It is also routinely done badly &mdash; panic-hedged at terrible prices, or reflex-hedged when letting it ride was free money. The difference is one formula and one honest question, both below.</p>
<h2>The classic setup</h2>
<p>September you: $100 on a team at +1000 to win it all. February you: they are in the final, and your ticket is worth $1,100 if they win, $0 if they lose. Their opponent is priced around even. Betting nothing risks everything on one game; betting the opponent converts the coin flip into a guarantee. The only question is how much &mdash; and that is arithmetic, not instinct.</p>
<h2>The equal-profit formula</h2>
<p><strong>Hedge stake = your potential payout &divide; the hedge side&rsquo;s decimal odds.</strong> Here: $1,100 &divide; 2.00 = $550 on the opponent. If your team wins: collect $1,100, lose the $550 hedge, profit $450 net of all stakes. If they lose: the hedge returns $1,100, same $450 profit. One number, sleep guaranteed. Slide anywhere between $0 and $550 to trade guaranteed floor for upside &mdash; a half-hedge of $275 locks a smaller floor while keeping real skin on your original ticket. The <a href="/tools/odds-converter/">odds converter</a> handles the decimal conversions.</p>
<h2>The honest question first</h2>
<p>Every hedge sells part of your position back to the book, vig included &mdash; hedging is insurance, and insurance has a premium. So ask what is actually true: <strong>does your original bet still hold value?</strong> If your team remains live and fairly priced, hedging burns expected value for comfort; professionals mostly let positive-EV positions ride and size their original stakes (see the <a href="/tools/bet-size-calculator/">bet size calculator</a>) so no single result threatens them. Hedge when the pending amount is genuinely life-relevant, when your edge has evaporated since the original bet, or when a futures market&rsquo;s endgame hands you the equal-profit lock. The worst hedge is the tilted one, placed at any price because the sweat got loud &mdash; that is not risk management, that is paying the book to hold your hand.</p>
<h2>Where this fits the system</h2>
<p>Hedging is an exit tool inside a bigger machine: honest sizing going in (<a href="/blog/bankroll-management.html">bankroll management</a>), value discipline on entries (<a href="/blog/value-betting-explained.html">value betting</a>), and a public <a href="/verified-records.html">record</a> keeping the whole thing accountable. The <a href="/picks/best-bets-today/">free daily picks</a> supply the entries; now you know the math for the exits.</p>`,
},
];

// ---- glossary ----
const TERMS = [
['Action','Any active bet; also a book confirming your wager counts.'],
['Against the Spread (ATS)','A team\u2019s record versus the point spread rather than wins and losses. The honest measure of betting performance.'],
['Alternate Line','A spread or total offered at a different number for a different price, letting you buy safety or chase payout.'],
['American Odds','The +150 / -110 format centered on $100. Negative = risk that much to win $100; positive = win that much on $100.'],
['Arbitrage','Betting all sides of a market across books at prices that guarantee profit. Rare, small, and books limit those who find it.'],
['Bad Beat','A bet that loses in improbable, painful fashion. Every bettor owns a collection.'],
['Bankroll','The total money set aside for betting \u2014 the fund every stake should be sized from. See our bankroll guide.'],
['Book / Sportsbook','The business taking bets and setting prices.'],
['Buying Points','Paying extra juice to move a spread in your favor (e.g., +2.5 to +3.5). Usually overpriced around key numbers.'],
['Chalk','The favorite. \u201cChalk bettor\u201d = someone who mostly backs favorites.'],
['Closing Line','The final odds before an event starts \u2014 the market\u2019s most informed price.'],
['Closing Line Value (CLV)','Consistently beating the closing price \u2014 the classic marker of a long-term winner, covered in our line shopping guide.'],
['Cover','Winning against the spread. A 7-point favorite winning by 10 covers; by 3, they don\u2019t.'],
['Decimal Odds','Total return per unit staked, stake included. 2.50 returns $2.50 per $1.'],
['Dog / Underdog','The side expected to lose, carrying the plus price.'],
['Edge','Your advantage over the price: the gap between your true win probability and the implied one. No edge, no bet.'],
['Even Money','+100 / 2.00 \u2014 win exactly what you risk.'],
['Expected Value (EV)','The long-run average result of a bet. Positive EV wins over time regardless of tonight; negative EV loses the same way.'],
['Favorite','The side expected to win, carrying the minus price.'],
['Fractional Odds','Profit over stake (5/2 wins $5 per $2). The traditional racing format.'],
['Futures','Season-long bets on championships, win totals or awards. Highest hold on the menu \u2014 see our futures guide.'],
['Handle','Total money wagered on an event or by a book.'],
['Hedge','Betting the opposite side of an existing position to cut risk or lock profit. The math lives in our hedging guide.'],
['Hook','The half point on a spread or total (-3.5 = \u201cthree and a hook\u201d). Wins and loses fortunes.'],
['Implied Probability','The win rate an odds price is charging for: 1 \u00f7 decimal odds. -110 implies 52.4%. The most important concept on this page.'],
['Juice / Vig','The book\u2019s commission baked into prices \u2014 why both sides of a fair coin flip cost -110.'],
['Kelly Criterion','A stake-sizing formula scaling bets to your edge. Powerful with honest inputs, fatal with flattering ones \u2014 built into our bet size calculator.'],
['Key Numbers','Common victory margins (3 and 7 in the NFL) that make half-points near them disproportionately valuable.'],
['Limit','The maximum a book will accept from you. Winners find theirs shrinking.'],
['Line','The current odds or spread on offer.'],
['Line Movement','Odds changing after open \u2014 driven by money, news and injuries. Reading it is a skill; chasing it is a leak.'],
['Line Shopping','Comparing prices across books before betting. The cheapest edge in the sport.'],
['Live Betting','Wagering during the game at continuously updated odds.'],
['Lock','Slang for a supposed can\u2019t-lose bet. There is no such thing; anyone selling one is selling.'],
['Middle','Winning both sides of the same game at different numbers (bet +7.5 and -6.5; a 7-point margin cashes both).'],
['Moneyline','A bet on who wins outright, no spread. Full guide in our Betting School.'],
['Off the Board','A market pulled from betting, usually pending injury news.'],
['Over/Under (Total)','A bet on combined points versus the book\u2019s number. Full totals guide in the Betting School.'],
['Parlay','Multiple bets combined; all must win. Multiplied payouts, multiplied juice \u2014 our parlay calculator shows both.'],
['Pick\u2019em','A game with no favorite \u2014 spread of zero, pick the winner.'],
['Point Spread','The margin a favorite must win by (or a dog stay within) for the bet to cash.'],
['Prop Bet','A wager on something other than the final result \u2014 player yards, first touchdown, team totals.'],
['Public Money','Bets from casual bettors, typically favorites and overs. Its opposite is sharp money.'],
['Push','A tie against the number \u2014 stakes refunded.'],
['ROI','Return on investment: profit divided by total staked. The honest scoreboard, which is why ours is public.'],
['Run Line','Baseball\u2019s standard -1.5 spread.'],
['Puck Line','Hockey\u2019s standard -1.5 spread.'],
['Sharp','A skilled, respected bettor whose action moves lines.'],
['Steam','Sudden coordinated line movement from sharp action across the market.'],
['Straight Bet','A single wager on one outcome \u2014 the professional\u2019s bread and butter.'],
['Teaser','A parlay where you move each spread in your favor for a reduced payout. Usually worse than it looks outside key numbers.'],
['Ticket','Your bet, physical or digital.'],
['Tilt','Betting emotionally after losses \u2014 the bankroll\u2019s natural predator. Named in poker, native to everything.'],
['Total','See Over/Under.'],
['Tout','Someone selling picks. Judge every tout \u2014 including us \u2014 by a verified public record, nothing else.'],
['Units','Standardized bet sizing as a percentage of bankroll, so records can be compared honestly. Ours are on the verified record.'],
['Value','Getting a better price than the true probability deserves \u2014 the entire game, condensed to one word.'],
['Wager','A bet. You knew this one; completeness demanded it.'],
];

function glossaryPage(){
  const url = BASE + '/betting-glossary.html';
  const letters = {};
  for (const [t,d] of TERMS) {
    const L = t[0].toUpperCase();
    (letters[L] = letters[L] || []).push([t,d]);
  }
  const keys = Object.keys(letters).sort();
  const jump = keys.map(k => '<a href="#g-'+k+'" style="color:#C9A84C;text-decoration:none;font-weight:700;padding:6px 10px;border:1px solid #1A1A1A;border-radius:6px;">'+k+'</a>').join('\n      ');
  const sections = keys.map(k =>
    '<h2 id="g-'+k+'">'+k+'</h2>\n' + letters[k].map(([t,d]) => '<h3>'+t+'</h3>\n<p>'+d+'</p>').join('\n')
  ).join('\n');
  const defined = JSON.stringify({"@context":"https://schema.org","@type":"DefinedTermSet","name":"Sports Betting Glossary","url":url,"hasDefinedTerm":TERMS.slice(0,25).map(([t,d])=>({"@type":"DefinedTerm","name":t,"description":d}))});
  const bc = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},{"@type":"ListItem","position":2,"name":"Betting Glossary","item":url}]});
  return `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sports Betting Glossary: ${TERMS.length} Terms Explained Honestly | FreeSportsPicks.pro</title>
<meta name="description" content="The A-Z sports betting glossary: ${TERMS.length} terms from action to vig, defined in plain English with the honest context most glossaries skip.">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="Sports Betting Glossary: ${TERMS.length} Terms Explained Honestly">
<meta property="og:description" content="Every betting term from action to vig, defined in plain English with the honest context most glossaries skip.">
<meta property="og:image" content="${BASE}/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${defined}</script>
<script type="application/ld+json">${bc}</script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/css/main.css">
${BLOG_CSS}
</head>
<body>
${chrome([["Home","/"],["Betting Glossary",""]])}
<section class="blog-page">
<div class="blog-content">
<span class="blog-badge">Betting School &middot; Reference</span>
<h1>The Sports Betting Glossary</h1>
<p style="font-size:15px;color:#808080;line-height:1.85;margin-bottom:22px;">${TERMS.length} terms in plain English &mdash; with the honest context most glossaries leave out. Bookmark it; the jargon never stops.</p>
<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
      ${jump}
</div>
${sections}
${CTA}
${DISC}
</div>
</section>
${FOOTER}
</body>
</html>`;
}

// ---- build ----
let made = 0;
for (const p of GUIDES) {
  fs.writeFileSync(path.join('blog', p.slug + '.html'), blogPage(p), 'utf8');
  made++;
  console.log('WROTE blog/' + p.slug + '.html');
}
fs.writeFileSync('betting-glossary.html', glossaryPage(), 'utf8');
made++;
console.log('WROTE betting-glossary.html (' + TERMS.length + ' terms)');

// ---- sitewide footer patch: add Glossary link after Tools link (idempotent) ----
function walk(dir, out){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name[0] !== '.' && e.name !== 'node_modules') walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}
const ANCHOR = '<li><a href="/tools/">Betting Tools</a></li>';
const GLOSS_LI = '<li><a href="/betting-glossary.html">Betting Glossary</a></li>';
let patched = 0, already = 0, noanchor = 0;
for (const f of walk('.', [])) {
  let src = fs.readFileSync(f, 'utf8');
  if (src.indexOf('href="/betting-glossary.html"') !== -1) { already++; continue; }
  if (src.indexOf(ANCHOR) === -1) { noanchor++; continue; }
  src = src.replace(ANCHOR, ANCHOR + '\n          ' + GLOSS_LI);
  fs.writeFileSync(f, src, 'utf8');
  patched++;
}
console.log('FOOTER: glossary link added to ' + patched + ' pages, already ' + already + ', no-anchor ' + noanchor);

// ---- sitemap ----
if (fs.existsSync('sitemap.xml')) {
  let sm = fs.readFileSync('sitemap.xml', 'utf8');
  let added = 0;
  const urls = GUIDES.map(p => BASE + '/blog/' + p.slug + '.html').concat([BASE + '/betting-glossary.html']);
  for (const url of urls) {
    if (sm.indexOf('<loc>' + url + '</loc>') === -1) {
      sm = sm.replace('</urlset>', '<url><loc>' + url + '</loc><lastmod>' + TODAY + '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>');
      added++;
    }
  }
  fs.writeFileSync('sitemap.xml', sm, 'utf8');
  console.log('SITEMAP: ' + added + ' URLs added');
}
console.log('DONE: ' + made + ' pages (4 guides + glossary).');
