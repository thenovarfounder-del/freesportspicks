// FSP Phase 0: GA repair + sitemap surgery + robots hardening. Run from repo root: node fsp-phase0.js
const fs = require('fs');
const path = require('path');
const GOOD = 'G-YZPX14DK4Y';
const BAD = 'G-YPX14DK4Y';

function walk(dir, out){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name[0] !== '.' && e.name !== 'node_modules') walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

// ---- 1) GA repair ----
const files = walk('.', []);
let removedDup = 0, fixedOnly = 0, clean = 0, noga = 0;
// the broken pair as one regex (script src line + inline config line, tolerant of whitespace/newlines between)
const badPair = new RegExp(
  '<script async src="https://www\\.googletagmanager\\.com/gtag/js\\?id=' + BAD + '"></script>\\s*' +
  '<script>window\\.dataLayer=window\\.dataLayer\\|\\|\\[\\];function gtag\\(\\)\\{dataLayer\\.push\\(arguments\\);\\}gtag\\(\'js\',new Date\\(\\)\\);gtag\\(\'config\',\'' + BAD + '\'\\);</script>\\s*', 'g');
for (const f of files) {
  let src = fs.readFileSync(f, 'utf8');
  const hasGood = src.indexOf(GOOD) !== -1;
  const hasBad = src.indexOf('id=' + BAD + '"') !== -1 || src.indexOf("'" + BAD + "'") !== -1;
  if (hasGood && hasBad) {
    const before = src;
    src = src.replace(badPair, '');
    // fallback: if regex didn't catch (formatting variant), nuke line-by-line
    if (src.indexOf(BAD) !== -1) {
      src = src.split('\n').filter(l => l.indexOf(BAD) === -1).join('\n');
    }
    if (src !== before) { fs.writeFileSync(f, src, 'utf8'); removedDup++; }
  } else if (hasBad) {
    // only broken tag: correct the ID in place (preserves analytics)
    src = src.split(BAD).join(GOOD);
    fs.writeFileSync(f, src, 'utf8'); fixedOnly++;
  } else if (hasGood) clean++;
  else noga++;
}
console.log('GA: removed-broken-duplicate ' + removedDup + ', corrected-only-broken ' + fixedOnly + ', already-clean ' + clean + ', no-ga-at-all ' + noga + ' (of ' + files.length + ' html files)');

// ---- 2) sitemap surgery ----
const ADMIN = ['blog-admin.html', 'dashboard.html', 'admin.html'];
if (fs.existsSync('sitemap.xml')) {
  let sm = fs.readFileSync('sitemap.xml', 'utf8');
  let cut = 0;
  for (const a of ADMIN) {
    const re = new RegExp('<url>(?:(?!</url>)[\\s\\S])*?' + a.replace('.', '\\.') + '(?:(?!</url>)[\\s\\S])*?</url>\\s*', 'g');
    const before = sm;
    sm = sm.replace(re, '');
    if (sm !== before) cut++;
  }
  fs.writeFileSync('sitemap.xml', sm, 'utf8');
  console.log('SITEMAP: ' + cut + ' admin URL entries removed');
} else console.log('SITEMAP: WARN sitemap.xml not found');

// ---- 3) robots.txt hardening ----
if (fs.existsSync('robots.txt')) {
  let rb = fs.readFileSync('robots.txt', 'utf8');
  let added = 0;
  for (const a of ['/blog-admin.html', '/dashboard.html', '/admin.html']) {
    if (rb.indexOf('Disallow: ' + a) === -1) {
      rb = rb.trimEnd() + '\nDisallow: ' + a;
      added++;
    }
  }
  rb += '\n';
  fs.writeFileSync('robots.txt', rb, 'utf8');
  console.log('ROBOTS: ' + added + ' disallow rules added');
} else console.log('ROBOTS: WARN robots.txt not found');
console.log('PHASE 0 DONE.');
