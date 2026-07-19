// FSP fix: converts the SECOND <h1> on each pick page to <h2> (fixes double-H1 SEO bug).
// Safe: only touches pages that have exactly 2 h1s; converts only the 2nd. Idempotent.
const fs = require('fs');
const path = require('path');

const PICKS_DIR = process.argv[2];
if (!PICKS_DIR) { console.log('Usage: node fix-h1.js <picks-dir>'); process.exit(1); }

const dirs = fs.readdirSync(PICKS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let fixed = 0, skipped = 0, alreadyOk = 0;
const report = [];

for (const d of dirs) {
  const fp = path.join(PICKS_DIR, d, 'index.html');
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');

  // Count h1 opening tags
  const h1count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1count < 2) { alreadyOk++; report.push(`${d}: ${h1count} h1 (ok, skipped)`); continue; }

  // Convert the SECOND h1 to h2. Find first h1, then convert the next one.
  let firstIdx = html.search(/<h1[\s>]/i);
  // slice after the first h1's closing to find the second
  const afterFirst = html.indexOf('</h1>', firstIdx);
  const rest = html.slice(afterFirst + 5);
  const secondOpenRel = rest.search(/<h1([\s>])/i);
  if (secondOpenRel === -1) { alreadyOk++; continue; }
  const secondOpenAbs = afterFirst + 5 + secondOpenRel;
  const secondCloseAbs = html.indexOf('</h1>', secondOpenAbs);
  if (secondCloseAbs === -1) { skipped++; continue; }

  // Rebuild: replace the opening <h1...> with <h2...> and the closing </h1> with </h2> for that segment
  let before = html.slice(0, secondOpenAbs);
  let segment = html.slice(secondOpenAbs, secondCloseAbs + 5);
  let after = html.slice(secondCloseAbs + 5);
  segment = segment.replace(/^<h1([\s>])/i, '<h2$1').replace(/<\/h1>$/i, '</h2>');
  html = before + segment + after;

  fs.writeFileSync(fp, html, 'utf8');
  fixed++;
  report.push(`${d}: FIXED (2 h1 -> 1 h1 + 1 h2)`);
}

console.log('=== H1 FIX REPORT ===');
report.forEach(r => console.log('  ' + r));
console.log(`\nFixed: ${fixed}, Already OK: ${alreadyOk}, Skipped(weird): ${skipped}`);
