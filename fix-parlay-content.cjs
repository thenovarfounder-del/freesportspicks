const fs=require("fs");
const p="tools/parlay-calculator/index.html";
let s=fs.readFileSync(p,"utf8");
s=s.replace("enter up to 10 legs in American odds","enter 2 to 15 legs in American odds");
const anchor="</body>";
if(!s.includes(anchor)){console.log("ANCHOR MISSING");process.exit(1);}
const add=`<div style="max-width:820px;margin:0 auto;padding:0 20px 70px;line-height:1.7">
<h2 style="font-size:25px;margin:34px 0 12px">Why the edge compounds</h2>
<p>A sportsbook builds a margin into every line. On a single bet at -110 that margin is about 4.5 percent, small enough that most bettors never think about it. A parlay does not add those margins together &mdash; it multiplies them, because each leg's price is applied to the payout of the last one.</p>
<p>That is why a three-leg parlay carries roughly triple the edge of a single, and a ten-leg parlay carries an edge no recreational bettor can overcome. The payout grows fast, but the true probability shrinks faster, and the gap between those two curves is the sportsbook's entire parlay business.</p>
<h2 style="font-size:25px;margin:34px 0 12px">What the real hit rates look like</h2>
<p>Assume every leg is a genuine coin flip priced at -110, which is generous. A two-leg parlay hits about 22.7 percent of the time. Three legs, about 10.8 percent. Five legs, roughly 2.5 percent. Eight legs, about 0.3 percent &mdash; one ticket in 340. Twelve legs is under one in 6,000.</p>
<p>Those numbers assume you are picking at true 50 percent. If you are picking worse than that, and most bettors are, every figure above gets smaller.</p>
<h2 style="font-size:25px;margin:34px 0 12px">When a parlay is defensible</h2>
<p>Short parlays of two or three legs, sized as entertainment rather than as a strategy, carry an edge you can live with if you enjoy the format. Correlated parlays &mdash; where legs genuinely relate, like a team moneyline with the game over &mdash; can be better value than the price implies, which is exactly why books restrict them.</p>
<p>What is not defensible is treating a long parlay as an investment. The calculator above will show you the number: enter your legs, read the house edge line, and decide with the figure in front of you rather than the payout alone.</p>
<h2 style="font-size:25px;margin:34px 0 12px">How to size one</h2>
<p>The practical rule: if losing the ticket would change how you feel about your week, it is too big. Parlay stakes should come out of an entertainment budget, separate from anything you are betting with an actual edge in mind. A bettor who plays one small parlay a week and singles the rest has a very different long-run outcome than one who parlays the same picks together.</p>
<h2 style="font-size:25px;margin:34px 0 12px">Where we stand on this</h2>
<p>We publish single-game picks and grade every one publicly &mdash; wins and losses &mdash; on our <a href="/verified-records.html" style="color:#C9A84C">verified record</a>. We do not sell parlays, and the math on this page is why. If you want to see what honest grading looks like across a full season, every pick we have made is on that page with the final score beside it.</p>
<p>This calculator is free to use and free to link. If you run a betting community or write about the format, take it &mdash; there are plenty of parlay calculators that show you the payout and stop there.</p>
<p style="opacity:.6;font-size:13.5px;margin-top:26px">For entertainment purposes only. Must be 21+. Please gamble responsibly. If gambling stops being fun, call 1-800-GAMBLER.</p>
</div>
` + anchor;
s=s.replace(anchor,add);
fs.writeFileSync(p,s);
console.log("PATCHED");
console.log("size now: " + Math.round(s.length/1024) + " KB");
