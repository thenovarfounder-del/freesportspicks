const fs = require("fs");
const p = "nfl/playoffs-2027.html";

if (!fs.existsSync(p)) { console.log("PLAYOFFS PAGE NOT FOUND — run build-nfl-playoffs.cjs first"); process.exit(1); }
let s = fs.readFileSync(p, "utf8");

if (s.includes("Divisional round: what is confirmed")) { console.log("already added"); process.exit(0); }

function block(games, note) {
  let rows = "";
  let lastDay = "";
  games.forEach(g => {
    const [day, label] = g;
    if (day !== lastDay) {
      rows += `<tr class="daybreak"><td colspan="3">${day}</td></tr>`;
      lastDay = day;
    }
    rows += `<tr>
    <td class="g-match"><span class="g-tbd">TBD</span> <span class="g-sep">@</span> <span class="g-tbd">TBD</span><span class="g-venue">${label}</span></td>
    <td class="g-time">TBD</td>
    <td class="g-line">&mdash;</td>
  </tr>`;
  });
  return `<table class="sched">
  <tr><th>Matchup</th><th>Kickoff</th><th>Line</th></tr>
  ${rows}
</table>
<p style="font-size:13px;color:#5a5a5a">${note}</p>`;
}

const divisional = block([
  ["Sat 23 Jan 2027", "Game 1 &mdash; higher seed hosts"],
  ["Sat 23 Jan 2027", "Game 2 &mdash; higher seed hosts"],
  ["Sun 24 Jan 2027", "Game 3 &mdash; higher seed hosts"],
  ["Sun 24 Jan 2027", "Game 4 &mdash; higher seed hosts"],
], "Matchups are set once Wild Card weekend concludes on 18 January. The number one seed in each conference enters here and faces the lowest remaining seed after reseeding.");

const conference = block([
  ["Sun 31 Jan 2027", "AFC Championship &mdash; higher seed hosts"],
  ["Sun 31 Jan 2027", "NFC Championship &mdash; higher seed hosts"],
], "Both conference finals are played on the same day. Winners advance to the Super Bowl.");

const superbowl = block([
  ["Sun 14 Feb 2027", "Super Bowl &mdash; neutral venue"],
], "The Super Bowl is played at a predetermined neutral site. Neither finalist holds home advantage.");

const insert = `
<h2>Divisional round: what is confirmed</h2>
${divisional}

<h3>Why the number one seed's opponent is unknown</h3>
<p>The bracket reseeds after Wild Card weekend. <strong>The number one seed faces the lowest remaining seed</strong>, whoever survives &mdash; so if the seven seed wins its opening game it travels to the one seed, and if it loses, the next-lowest survivor goes instead.</p>
<p>That is why no path to the Super Bowl can be mapped in advance. A team's second-round opponent depends on results elsewhere in its conference.</p>

<h2>Conference Championships</h2>
${conference}

<p>Two games, one day, and the higher remaining seed hosts each. By this stage every side has had a full preparation week, which removes the short-week variable that runs through the regular season.</p>

<h2>Super Bowl LXI</h2>
${superbowl}

<p>The Super Bowl is the one playoff game with <strong>no home team</strong>. Venues are selected years ahead and are typically warm-weather or domed, which removes the conditions factor that shapes January football in northern cities.</p>
<p>It also carries the longest lay-off of the season &mdash; two weeks between the conference finals and the game itself, giving both sides preparation time available nowhere else on the calendar.</p>

<h2>How the fourteen teams are decided</h2>`;

const anchor = "<h2>How the fourteen teams are decided</h2>";
if (!s.includes(anchor)) { console.log("ANCHOR NOT FOUND"); process.exit(1); }
s = s.replace(anchor, insert);

// update meta description to reflect fuller coverage
s = s.replace(
  'content="The 2027 NFL playoff schedule with confirmed dates for Wild Card, Divisional, Conference Championship and Super Bowl weekends — plus how seeding, byes and home field are decided."',
  'content="The full 2027 NFL playoff schedule — every Wild Card, Divisional, Conference Championship and Super Bowl slot with confirmed dates, plus how seeding, reseeding and home field work."'
);

fs.writeFileSync(p, s);
console.log("ALL ROUNDS ADDED");
console.log("divisional: " + s.includes("Divisional round: what is confirmed"));
console.log("conference: " + s.includes("Conference Championships"));
console.log("super bowl: " + s.includes("Super Bowl LXI"));
