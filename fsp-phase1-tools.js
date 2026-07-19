// FSP Phase 1: Betting Tools. Run from repo root: node fsp-phase1-tools.js
// Creates /tools/ hub + 3 calculators, patches footer sitewide, appends sitemap.
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

function nav(crumbName){
  return `<nav class="breadcrumb-nav" style="background:#050505;border-bottom:1px solid #1a1a1a;padding:12px 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 24px;">
    <ol style="list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <li><a href="/" style="font-size:12px;color:#606060;text-decoration:none;">Home</a></li>
      <li style="font-size:12px;color:#333;">/</li>
      <li><a href="/tools/" style="font-size:12px;color:#606060;text-decoration:none;">Tools</a></li>
      <li style="font-size:12px;color:#333;">/</li>
      <li style="font-size:12px;color:#C9A84C;">${crumbName}</li>
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

const TOOL_CSS = `<style>
.tool-page{padding:110px 0 80px;}
.tool-wrap{max-width:860px;margin:0 auto;padding:0 24px;}
.tool-badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C9A84C;margin-bottom:16px;}
.tool-wrap h1{font-family:'DM Serif Display',serif;font-size:clamp(28px,4vw,44px);color:#F5F5F0;margin-bottom:12px;}
.tool-sub{font-size:15px;color:#808080;line-height:1.8;margin-bottom:32px;max-width:720px;}
.tool-card{background:#111;border:1px solid #1A1A1A;border-radius:10px;padding:28px 24px;margin-bottom:20px;}
.tool-card label{display:block;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#808080;margin:0 0 8px;}
.tool-card input,.tool-card select{width:100%;background:#0A0A0A;border:1px solid #2a2a2a;border-radius:8px;color:#F5F5F0;padding:13px 14px;font-size:16px;margin-bottom:16px;}
.tool-card input:focus,.tool-card select:focus{outline:none;border-color:#C9A84C;}
.tool-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.tool-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
@media(max-width:700px){.tool-grid4{grid-template-columns:1fr 1fr;}.tool-grid2{grid-template-columns:1fr;}}
.tool-res{background:linear-gradient(135deg,rgba(201,168,76,0.10),rgba(201,168,76,0.04));border:1px solid rgba(201,168,76,0.35);border-radius:10px;padding:22px;margin-top:6px;}
.tool-res .row{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid rgba(201,168,76,0.15);}
.tool-res .row:last-child{border-bottom:none;}
.tool-res .lab{font-size:13px;color:#808080;}
.tool-res .val{font-size:19px;font-weight:800;color:#F5F5F0;}
.tool-res .val.gold{color:#C9A84C;}
.tool-btn{background:linear-gradient(135deg,#C9A84C,#A07830);color:#0A0A0A;border:none;border-radius:8px;padding:13px 22px;font-size:14px;font-weight:800;letter-spacing:.04em;cursor:pointer;}
.tool-btn.ghost{background:none;border:1px solid #2a2a2a;color:#808080;}
.tool-note{font-size:12.5px;color:#606060;line-height:1.7;margin-top:14px;}
.tool-content h2{font-family:'DM Serif Display',serif;font-size:24px;color:#F5F5F0;margin:44px 0 16px;padding-bottom:8px;border-bottom:1px solid #1A1A1A;}
.tool-content p{font-size:15px;color:#808080;line-height:1.85;margin-bottom:16px;}
.tool-content a{color:#C9A84C;}
.tool-content strong{color:#F5F5F0;}
.leg-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;margin-bottom:10px;}
.leg-row input{margin-bottom:0;}
.leg-x{background:none;border:1px solid #2a2a2a;color:#606060;border-radius:8px;width:44px;height:44px;font-size:16px;cursor:pointer;}
.tools-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:8px;}
.tool-tile{background:#111;border:1px solid #1A1A1A;border-radius:10px;padding:26px 22px;display:block;text-decoration:none;transition:.15s;}
.tool-tile:hover{border-color:rgba(201,168,76,.5);transform:translateY(-2px);}
.tool-tile .ic{font-size:30px;margin-bottom:12px;}
.tool-tile h3{font-family:'DM Serif Display',serif;font-size:19px;color:#F5F5F0;margin-bottom:8px;}
.tool-tile p{font-size:13.5px;color:#808080;line-height:1.7;margin:0;}
</style>`;

function shell(p){
  const url = BASE + p.url;
  const bc = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Home","item":BASE+"/"},
    {"@type":"ListItem","position":2,"name":"Betting Tools","item":BASE+"/tools/"},
    {"@type":"ListItem","position":3,"name":p.crumb,"item":url}]});
  const app = JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":p.h1,"description":p.desc,"url":url,"applicationCategory":"UtilitiesApplication","operatingSystem":"Any","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@type":"Organization","name":"FreeSportsPicks.pro","url":BASE}});
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
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:image" content="${BASE}/images/og-home.jpg">
<meta property="og:site_name" content="FreeSportsPicks.pro">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${app}</script>
<script type="application/ld+json">${bc}</script>
<script type="application/ld+json">${faq}</script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/css/main.css">
${TOOL_CSS}
</head>
<body>
${nav(p.crumb)}
<section class="tool-page">
<div class="tool-wrap">
<span class="tool-badge">${p.badge}</span>
<h1>${p.h1}</h1>
<p class="tool-sub">${p.sub}</p>
${p.body}
</div>
</section>
${FOOTER}
</body>
</html>`;
}

const CTA_BLOCK = `<div class="tool-card" style="text-align:center;border-color:rgba(201,168,76,.35);">
  <h2 style="font-family:'DM Serif Display',serif;font-size:21px;color:#F5F5F0;margin:0 0 8px;">Want the picks to go with the math?</h2>
  <p style="font-size:14px;color:#808080;margin:0 0 18px;">Free expert picks with a verified public record &mdash; every morning, no credit card.</p>
  <a class="tool-btn" style="text-decoration:none;display:inline-block;" href="/free-picks.html">GET TODAY&rsquo;S FREE PICKS &rarr;</a>
</div>`;

const PAGES = [
// ============ ODDS CONVERTER ============
{
  url:'/tools/odds-converter/', dir:'tools/odds-converter', crumb:'Odds Converter', badge:'Free Betting Tool',
  title:'Odds Converter | American, Decimal, Fractional &amp; Implied Probability',
  desc:'Free odds converter: instantly convert American, decimal and fractional odds and see the implied win probability and payout on any stake. No signup, no ads in your face.',
  h1:'Odds Converter',
  sub:'Type odds in any format and the other formats appear instantly, along with the implied win probability and what a bet actually pays. This is the first tool every bettor should bookmark.',
  faqs:[
    {q:'How do you convert American odds to decimal odds?', a:'For positive American odds, divide by 100 and add 1 (so +150 becomes 2.50). For negative American odds, divide 100 by the number and add 1 (so -200 becomes 1.50). Decimal odds show your total return per $1 staked, stake included.'},
    {q:'What is implied probability in betting?', a:'Implied probability is the win rate the odds are charging you for, calculated as 1 divided by the decimal odds. A -110 line implies 52.4%, which is why beating the standard vig requires winning more than 52.4% of the time, not just 50%.'},
    {q:'Why do implied probabilities add up to more than 100%?', a:'Because the sportsbook builds its margin (the vig) into both sides. A typical -110/-110 market implies 52.4% + 52.4% = 104.8%; the extra 4.8% is the house edge you are paying to play.'},
  ],
  body:`<div class="tool-card">
  <div class="tool-grid4">
    <div><label>American</label><input id="am" type="text" inputmode="text" placeholder="-110"></div>
    <div><label>Decimal</label><input id="dec" type="text" inputmode="decimal" placeholder="1.91"></div>
    <div><label>Fractional</label><input id="frac" type="text" placeholder="10/11"></div>
    <div><label>Implied %</label><input id="imp" type="text" inputmode="decimal" placeholder="52.4"></div>
  </div>
  <div class="tool-grid2">
    <div><label>Stake ($)</label><input id="stake" type="text" inputmode="decimal" value="100"></div>
    <div style="display:flex;align-items:flex-end;padding-bottom:16px;"><button class="tool-btn ghost" id="clearBtn" type="button">Clear</button></div>
  </div>
  <div class="tool-res" id="res" style="display:none;">
    <div class="row"><span class="lab">To win (profit)</span><span class="val gold" id="rProfit">&ndash;</span></div>
    <div class="row"><span class="lab">Total payout (stake + profit)</span><span class="val" id="rPayout">&ndash;</span></div>
    <div class="row"><span class="lab">Implied win probability</span><span class="val" id="rImp">&ndash;</span></div>
    <div class="row"><span class="lab">Break-even record needed</span><span class="val" id="rBE">&ndash;</span></div>
  </div>
  <p class="tool-note">Enter odds in any single field &mdash; the rest calculate automatically. Implied probability includes the book&rsquo;s vig; that is the point.</p>
</div>
<script>
(function(){
  var am=document.getElementById("am"),dec=document.getElementById("dec"),frac=document.getElementById("frac"),imp=document.getElementById("imp"),stake=document.getElementById("stake"),res=document.getElementById("res");
  var lock=false;
  function fromAmerican(a){ if(a>0) return 1+a/100; if(a<0) return 1+100/(-a); return NaN; }
  function toAmerican(d){ if(d>=2) return Math.round((d-1)*100); return Math.round(-100/(d-1)); }
  function toFrac(d){
    var x=d-1,best="",err=1e9;
    for(var q=1;q<=100;q++){ var p=Math.round(x*q); if(p<1) continue; var e=Math.abs(x-p/q); if(e<err-1e-12){ err=e; var g=gcd(p,q); best=(p/g)+"/"+(q/g);} }
    return best;
  }
  function gcd(a,b){ return b?gcd(b,a%b):a; }
  function render(d,src){
    if(!(d>1)||!isFinite(d)){ res.style.display="none"; return; }
    lock=true;
    if(src!=="am"){ var A=toAmerican(d); am.value=(A>0?"+":"")+A; }
    if(src!=="dec"){ dec.value=d.toFixed(3).replace(/\\.?0+$/,function(m){return m.indexOf(".")===0&&m.length===4?"":m;}); dec.value=(Math.round(d*1000)/1000).toString(); }
    if(src!=="frac"){ frac.value=toFrac(d); }
    if(src!=="imp"){ imp.value=(100/d).toFixed(1); }
    lock=false;
    var s=parseFloat(stake.value)||0, prof=s*(d-1);
    document.getElementById("rProfit").textContent="$"+prof.toFixed(2);
    document.getElementById("rPayout").textContent="$"+(s*d).toFixed(2);
    document.getElementById("rImp").textContent=(100/d).toFixed(1)+"%";
    document.getElementById("rBE").textContent="Win "+(100/d).toFixed(1)+"% of these bets to break even";
    res.style.display="block";
  }
  am.addEventListener("input",function(){ if(lock)return; var v=parseFloat(am.value.replace("+","")); if(am.value.trim().charAt(0)==="-") v=-Math.abs(v); render(fromAmerican(v),"am"); });
  dec.addEventListener("input",function(){ if(lock)return; render(parseFloat(dec.value),"dec"); });
  frac.addEventListener("input",function(){ if(lock)return; var m=frac.value.split("/"); if(m.length===2){ var p=parseFloat(m[0]),q=parseFloat(m[1]); if(p>0&&q>0) render(1+p/q,"frac"); } });
  imp.addEventListener("input",function(){ if(lock)return; var p=parseFloat(imp.value); if(p>0&&p<100) render(100/p,"imp"); });
  stake.addEventListener("input",function(){ if(dec.value) render(parseFloat(dec.value),"dec"); });
  document.getElementById("clearBtn").addEventListener("click",function(){ am.value=dec.value=frac.value=imp.value=""; res.style.display="none"; });
})();
</script>
${CTA_BLOCK}
<div class="tool-content">
<h2>How to read each odds format</h2>
<p><strong>American odds</strong> center on $100: negative numbers (-110) show what you must risk to win $100; positive numbers (+150) show what $100 wins. <strong>Decimal odds</strong> are the cleanest math: your total return per dollar staked, stake included, so 1.91 returns $1.91 on $1. <strong>Fractional odds</strong> (10/11) are profit over stake, the traditional racing format. They are three languages for the same number, which is why one converter replaces a lot of mental arithmetic.</p>
<h2>The number that actually matters: implied probability</h2>
<p>Every price is a probability wearing a costume. A -110 line implies a 52.4% win rate &mdash; meaning the book charges you as if your side wins 52.4% of the time, and you profit long-term only by winning more often than that. This is the honest lens for every bet you will ever consider: not &ldquo;do I like this team,&rdquo; but &ldquo;do they win more often than the price implies?&rdquo; Our guides on <a href="/blog/understanding-betting-odds.html">reading betting odds</a> and <a href="/blog/value-betting-explained.html">value betting</a> go deeper, and our <a href="/picks/best-bets-today/">free daily picks</a> put the principle to work with a verified record.</p>
</div>`,
},
// ============ PARLAY CALCULATOR ============
{
  url:'/tools/parlay-calculator/', dir:'tools/parlay-calculator', crumb:'Parlay Calculator', badge:'Free Betting Tool',
  title:'Parlay Calculator | Payouts, True Odds &amp; the Honest House Edge',
  desc:'Free parlay calculator: enter up to 10 legs in American odds and see combined odds, payout on your stake, implied probability, and the honest house-edge math books hope you skip.',
  h1:'Parlay Calculator',
  sub:'Enter your legs, see the real payout &mdash; and see the part sportsbooks leave out: how often this parlay actually needs to hit, and how much edge compounds against you per leg.',
  faqs:[
    {q:'How are parlay odds calculated?', a:'Convert each leg to decimal odds and multiply them together. Three legs at -110 (1.909 each) multiply to about 6.96, so a $100 parlay pays about $696 total. Every added leg multiplies both the payout and the failure risk.'},
    {q:'Why do sportsbooks love parlays?', a:'Because the vig compounds. Each -110 leg carries roughly a 4.5% house edge, and multiplying legs multiplies the edge: a 3-leg parlay at standard juice carries roughly a 13% combined edge versus about 4.5% on a straight bet. Parlays are the highest-margin product on the menu.'},
    {q:'What is the implied probability of a parlay hitting?', a:'One divided by the combined decimal odds. A parlay paying 6.96 implies about a 14.4% hit rate, so it should be expected to lose roughly 6 times in 7 even when every leg is priced fairly.'},
  ],
  body:`<div class="tool-card">
  <div id="legs"></div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;">
    <button class="tool-btn ghost" id="addLeg" type="button">+ Add leg</button>
    <button class="tool-btn ghost" id="resetLegs" type="button">Reset</button>
  </div>
  <div class="tool-grid2" style="margin-top:18px;">
    <div><label>Stake ($)</label><input id="pstake" type="text" inputmode="decimal" value="100"></div>
  </div>
  <div class="tool-res" id="pres" style="display:none;">
    <div class="row"><span class="lab">Combined odds</span><span class="val" id="pOdds">&ndash;</span></div>
    <div class="row"><span class="lab">Total payout</span><span class="val gold" id="pPayout">&ndash;</span></div>
    <div class="row"><span class="lab">Profit if it hits</span><span class="val" id="pProfit">&ndash;</span></div>
    <div class="row"><span class="lab">Implied hit rate</span><span class="val" id="pImp">&ndash;</span></div>
    <div class="row"><span class="lab">Expected losses per win</span><span class="val" id="pLoss">&ndash;</span></div>
  </div>
  <p class="tool-note" id="pEdge" style="display:none;"></p>
</div>
<script>
(function(){
  var legsEl=document.getElementById("legs"),pres=document.getElementById("pres");
  function fromAmerican(a){ if(a>0) return 1+a/100; if(a<0) return 1+100/(-a); return NaN; }
  function toAmerican(d){ if(d>=2) return "+"+Math.round((d-1)*100); return String(Math.round(-100/(d-1))); }
  function addLeg(val){
    if(legsEl.children.length>=10) return;
    var row=document.createElement("div"); row.className="leg-row";
    row.innerHTML='<input type="text" inputmode="text" placeholder="Leg '+(legsEl.children.length+1)+' odds, e.g. -110" value="'+(val||"")+'"><button class="leg-x" type="button">&times;</button>';
    row.querySelector("input").addEventListener("input",calc);
    row.querySelector(".leg-x").addEventListener("click",function(){ row.remove(); calc(); });
    legsEl.appendChild(row);
  }
  function calc(){
    var inputs=legsEl.querySelectorAll("input"),D=1,n=0;
    for(var i=0;i<inputs.length;i++){
      var raw=inputs[i].value.trim(); if(!raw) continue;
      var v=parseFloat(raw.replace("+","")); if(raw.charAt(0)==="-") v=-Math.abs(v);
      var d=fromAmerican(v); if(!(d>1)) continue;
      D*=d; n++;
    }
    if(n<2){ pres.style.display="none"; document.getElementById("pEdge").style.display="none"; return; }
    var s=parseFloat(document.getElementById("pstake").value)||0;
    document.getElementById("pOdds").textContent=toAmerican(D)+"  ("+(Math.round(D*100)/100)+"x)";
    document.getElementById("pPayout").textContent="$"+(s*D).toFixed(2);
    document.getElementById("pProfit").textContent="$"+(s*(D-1)).toFixed(2);
    var p=100/D;
    document.getElementById("pImp").textContent=p.toFixed(1)+"%";
    document.getElementById("pLoss").textContent="~"+Math.max(1,Math.round(D-1))+" losses per win";
    var edge=(1-Math.pow(1/1.0476,n))*100; // approx vig compounding at -110-style legs
    var pe=document.getElementById("pEdge");
    pe.style.display="block";
    pe.innerHTML="<strong style=\\"color:#C9A84C\\">The honest part:</strong> at standard juice, roughly "+edge.toFixed(0)+"% of this "+n+"-leg parlay's value goes to the house before kickoff &mdash; versus about 4.5% on a straight bet. Parlays are entertainment pricing; know it going in.";
    pres.style.display="block";
  }
  document.getElementById("addLeg").addEventListener("click",function(){ addLeg(); });
  document.getElementById("resetLegs").addEventListener("click",function(){ legsEl.innerHTML=""; addLeg(); addLeg(); calc(); });
  document.getElementById("pstake").addEventListener("input",calc);
  addLeg("-110"); addLeg("-110"); calc();
})();
</script>
${CTA_BLOCK}
<div class="tool-content">
<h2>The math sportsbooks put in small print</h2>
<p>Parlay payouts multiply, which looks like magic until you notice the failure risk multiplies too &mdash; and so does the vig. Each standard -110 leg quietly hands the book about 4.5% in edge; stack three legs and roughly 13% of the ticket&rsquo;s fair value is gone before a single game starts. That is why parlays are the most advertised product in betting: not because they are how sharp bettors get rich, but because they are how books do. Our <a href="/blog/parlay-vs-single-bets.html">parlays vs. singles breakdown</a> runs the full comparison.</p>
<h2>How to use parlays without being used</h2>
<p>Treat them as entertainment with a defined cost: small stakes, money already inside your <a href="/blog/bankroll-management.html">bankroll plan</a>, and zero legs added &ldquo;because it barely changes the price.&rdquo; Every leg is another coin that must land your way. When you want plays built on actual edge instead of stacked juice, that is what our <a href="/picks/parlay-picks/">parlay picks</a> and <a href="/picks/best-bets-today/">daily best bets</a> are for &mdash; free, with the record public.</p>
</div>`,
},
// ============ BET SIZE CALCULATOR ============
{
  url:'/tools/bet-size-calculator/', dir:'tools/bet-size-calculator', crumb:'Bet Size Calculator', badge:'Free Betting Tool',
  title:'Bet Size Calculator | Units, Bankroll &amp; Kelly Criterion',
  desc:'Free bet sizing calculator: set your bankroll and unit size like a professional, and optionally run the Kelly Criterion to see what your edge (if any) actually justifies staking.',
  h1:'Bet Size Calculator',
  sub:'Flat units keep you alive; Kelly tells you what your edge is worth. This calculator does both &mdash; and tells you honestly when the right bet is zero.',
  faqs:[
    {q:'What is a unit in sports betting?', a:'A unit is a fixed percentage of your bankroll, typically 1-2%, used as your standard bet size. A $1,000 bankroll at 1% means $10 units. Flat unit betting exists to survive losing streaks, which every bettor eventually meets.'},
    {q:'What is the Kelly Criterion?', a:'A formula for optimal bet sizing when you have a genuine edge: it stakes a fraction of bankroll proportional to your advantage. Most professionals bet half-Kelly or less because overestimating your edge with full Kelly is how bankrolls die.'},
    {q:'What if the Kelly Criterion gives a negative number?', a:'A negative Kelly means the price implies you have no edge: the bet is -EV and the mathematically correct stake is zero dollars. A calculator that tells you not to bet is doing its job.'},
  ],
  body:`<div class="tool-card">
  <h2 style="font-family:'DM Serif Display',serif;font-size:20px;color:#F5F5F0;margin:0 0 18px;">Step 1 &mdash; Your unit size</h2>
  <div class="tool-grid2">
    <div><label>Bankroll ($)</label><input id="bank" type="text" inputmode="decimal" placeholder="1000"></div>
    <div><label>Risk per bet (%)</label><input id="riskPct" type="text" inputmode="decimal" value="1"></div>
  </div>
  <div class="tool-res" id="ures" style="display:none;">
    <div class="row"><span class="lab">1 unit</span><span class="val gold" id="uOne">&ndash;</span></div>
    <div class="row"><span class="lab">Conservative range (0.5&ndash;2 units)</span><span class="val" id="uRange">&ndash;</span></div>
    <div class="row"><span class="lab">Losing streak you can survive</span><span class="val" id="uStreak">&ndash;</span></div>
  </div>
</div>
<div class="tool-card">
  <h2 style="font-family:'DM Serif Display',serif;font-size:20px;color:#F5F5F0;margin:0 0 6px;">Step 2 (optional) &mdash; Kelly Criterion</h2>
  <p style="font-size:13px;color:#606060;margin:0 0 18px;">Only meaningful if your win estimate is honest. Garbage in, bankrupt out.</p>
  <div class="tool-grid2">
    <div><label>Your estimated win probability (%)</label><input id="kProb" type="text" inputmode="decimal" placeholder="55"></div>
    <div><label>American odds offered</label><input id="kOdds" type="text" inputmode="text" placeholder="-110"></div>
  </div>
  <div class="tool-res" id="kres" style="display:none;">
    <div class="row"><span class="lab">Edge vs. the price</span><span class="val" id="kEdge">&ndash;</span></div>
    <div class="row"><span class="lab">Full Kelly stake</span><span class="val" id="kFull">&ndash;</span></div>
    <div class="row"><span class="lab">Half Kelly (recommended)</span><span class="val gold" id="kHalf">&ndash;</span></div>
  </div>
  <p class="tool-note" id="kNote" style="display:none;"></p>
</div>
<script>
(function(){
  var bank=document.getElementById("bank"),risk=document.getElementById("riskPct");
  function units(){
    var B=parseFloat(bank.value)||0,r=parseFloat(risk.value)||0;
    var u=document.getElementById("ures");
    if(B<=0||r<=0||r>10){ u.style.display="none"; kelly(); return; }
    var one=B*r/100;
    document.getElementById("uOne").textContent="$"+one.toFixed(2);
    document.getElementById("uRange").textContent="$"+(one*0.5).toFixed(2)+" &ndash; $"+(one*2).toFixed(2);
    document.getElementById("uRange").innerHTML="$"+(one*0.5).toFixed(2)+" &ndash; $"+(one*2).toFixed(2);
    document.getElementById("uStreak").textContent="~"+Math.floor(100/r)+" straight losses";
    u.style.display="block";
    kelly();
  }
  function fromAmerican(a){ if(a>0) return 1+a/100; if(a<0) return 1+100/(-a); return NaN; }
  function kelly(){
    var kres=document.getElementById("kres"),note=document.getElementById("kNote");
    var p=(parseFloat(document.getElementById("kProb").value)||0)/100;
    var raw=document.getElementById("kOdds").value.trim();
    var v=parseFloat(raw.replace("+","")); if(raw.charAt(0)==="-") v=-Math.abs(v);
    var d=fromAmerican(v);
    if(!(p>0&&p<1)||!(d>1)){ kres.style.display="none"; note.style.display="none"; return; }
    var b=d-1, f=(b*p-(1-p))/b;
    var B=parseFloat(bank.value)||0;
    var edge=(p*d-1)*100;
    document.getElementById("kEdge").textContent=(edge>=0?"+":"")+edge.toFixed(1)+"%";
    if(f<=0){
      document.getElementById("kFull").textContent="$0";
      document.getElementById("kHalf").textContent="$0";
      note.innerHTML="<strong style=\\"color:#C9A84C\\">Honest answer:</strong> at this price and win rate you have no edge &mdash; the correct stake is zero. Passing is a betting skill.";
      note.style.display="block";
    } else {
      document.getElementById("kFull").textContent=B>0?("$"+(B*f).toFixed(2)+"  ("+(f*100).toFixed(1)+"%)"):((f*100).toFixed(1)+"% of bankroll");
      document.getElementById("kHalf").textContent=B>0?("$"+(B*f/2).toFixed(2)+"  ("+(f*50).toFixed(1)+"%)"):((f*50).toFixed(1)+"% of bankroll");
      note.innerHTML="Half Kelly is the professional default: nearly all the growth, half the volatility, and insurance against the #1 killer &mdash; overestimating your own edge.";
      note.style.display="block";
    }
    kres.style.display="block";
  }
  bank.addEventListener("input",units); risk.addEventListener("input",units);
  document.getElementById("kProb").addEventListener("input",kelly);
  document.getElementById("kOdds").addEventListener("input",kelly);
})();
</script>
${CTA_BLOCK}
<div class="tool-content">
<h2>Why flat units beat feelings</h2>
<p>The bettors who last are rarely the ones who picked the most winners in a hot month; they are the ones still solvent after the cold one. Flat staking at 1-2% of bankroll means a ten-bet losing streak &mdash; which happens to everyone, including professionals &mdash; costs a survivable dent instead of the whole roll. Our <a href="/blog/bankroll-management.html">bankroll management guide</a> covers the full system, including when (and whether) to resize units.</p>
<h2>Kelly, used honestly</h2>
<p>The Kelly Criterion answers one question: given your edge, what fraction of bankroll maximizes long-term growth? Its honesty cuts both ways &mdash; feed it a real edge and it sizes your advantage; feed it wishful thinking and it sizes your bankruptcy. That is why the halved version is the professional default and why a $0 output deserves respect. Building the win estimates that make Kelly meaningful is the hard part; our <a href="/blog/handicapping-methodology.html">handicapping methodology</a> shows how we build ours, and the <a href="/verified-records.html">verified record</a> shows how it has gone.</p>
</div>`,
},
// ============ TOOLS HUB ============
{
  url:'/tools/', dir:'tools', crumb:'Betting Tools', badge:'Free Tools &mdash; No Signup',
  title:'Free Betting Tools | Odds Converter, Parlay &amp; Bet Size Calculators',
  desc:'Free sports betting tools with no signup: odds converter, parlay calculator with honest house-edge math, and a bet size calculator with units and Kelly Criterion.',
  h1:'Free Betting Tools',
  sub:'The calculators every bettor needs, free forever, no account walls. Built by the same team publishing free picks with a verified public record.',
  faqs:[
    {q:'Are these betting tools really free?', a:'Completely. No signup, no email wall, no premium tier. FreeSportsPicks.pro gives away picks with verified records; giving away calculators is the easy part.'},
    {q:'What betting tools does FreeSportsPicks.pro offer?', a:'An odds converter (American, decimal, fractional, implied probability), a parlay calculator that shows payouts plus the honest compounding house edge, and a bet size calculator covering unit sizing and the Kelly Criterion.'},
  ],
  body:`<div class="tools-grid">
  <a class="tool-tile" href="/tools/odds-converter/">
    <div class="ic">&#128202;</div>
    <h3>Odds Converter</h3>
    <p>American &harr; decimal &harr; fractional &harr; implied probability, with payouts on any stake. The tool to bookmark first.</p>
  </a>
  <a class="tool-tile" href="/tools/parlay-calculator/">
    <div class="ic">&#127922;</div>
    <h3>Parlay Calculator</h3>
    <p>Up to 10 legs, instant payouts &mdash; plus the honest math on how the house edge compounds per leg.</p>
  </a>
  <a class="tool-tile" href="/tools/bet-size-calculator/">
    <div class="ic">&#128176;</div>
    <h3>Bet Size Calculator</h3>
    <p>Unit sizing from your bankroll, and the Kelly Criterion for when you think you have an edge &mdash; including when to bet $0.</p>
  </a>
</div>
${CTA_BLOCK}
<div class="tool-content">
<h2>Tools first, tickets second</h2>
<p>Most betting mistakes are not bad opinions; they are unexamined numbers &mdash; odds never converted to probabilities, parlays never priced against their real hit rate, stakes sized by mood. Five seconds in the right calculator prevents most of them. These tools stay free and wall-free because our whole model is the same: <a href="/free-picks.html">free daily picks</a>, <a href="/verified-records.html">public verified records</a>, and math shown in the open. Start with the <a href="/blog/sports-betting-for-beginners.html">beginner&rsquo;s guide</a> if you are new, and bet like the long game matters &mdash; because it is the only game there is.</p>
</div>`,
},
];

// ---- build pages ----
let made = 0;
for (const p of PAGES) {
  fs.mkdirSync(p.dir, { recursive: true });
  fs.writeFileSync(path.join(p.dir, 'index.html'), shell(p), 'utf8');
  made++;
  console.log('WROTE ' + p.dir + '/index.html');
}

// ---- sitewide footer patch: add Betting Tools link (idempotent) ----
function walk(dir, out){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name[0] !== '.' && e.name !== 'node_modules') walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}
const ANCHOR = '<li><a href="/blog/">Blog</a></li>';
const TOOLS_LI = '<li><a href="/tools/">Betting Tools</a></li>';
let patched = 0, already = 0, noanchor = 0;
for (const f of walk('.', [])) {
  let src = fs.readFileSync(f, 'utf8');
  if (src.indexOf('href="/tools/"') !== -1) { already++; continue; }
  if (src.indexOf(ANCHOR) === -1) { noanchor++; continue; }
  src = src.replace(ANCHOR, ANCHOR + '\n          ' + TOOLS_LI);
  fs.writeFileSync(f, src, 'utf8');
  patched++;
}
console.log('FOOTER: tools link added to ' + patched + ' pages, already ' + already + ', no-anchor ' + noanchor);

// ---- sitemap ----
if (fs.existsSync('sitemap.xml')) {
  let sm = fs.readFileSync('sitemap.xml', 'utf8');
  let added = 0;
  for (const p of PAGES) {
    const url = BASE + p.url;
    if (sm.indexOf('<loc>' + url + '</loc>') === -1) {
      sm = sm.replace('</urlset>', '<url><loc>' + url + '</loc><lastmod>' + TODAY + '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>');
      added++;
    }
  }
  fs.writeFileSync('sitemap.xml', sm, 'utf8');
  console.log('SITEMAP: ' + added + ' tool URLs added');
}
console.log('DONE: ' + made + ' tool pages.');
