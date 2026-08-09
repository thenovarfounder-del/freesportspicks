const fs = require('fs');
const path = require('path');
const map = {
  '/blog/nfl-preseason-betting-guide.html': '/blog/nfl-preseason-betting-guide-2026.html',
  '/blog/nba-summer-league-betting.html': '/blog/nba-summer-league-betting-strategy.html',
  '/blog/how-to-read-betting-lines.html': '/blog/how-to-read-nfl-betting-lines.html'
};
const j = JSON.parse(fs.readFileSync('vercel.json','utf8'));
j.redirects = j.redirects || [];
let added = 0;
Object.entries(map).forEach(([s,d]) => {
  if (!j.redirects.some(r => r.source === s)) { j.redirects.push({source:s, destination:d, permanent:true}); added++; }
});
fs.writeFileSync('vercel.json', JSON.stringify(j, null, 2));
console.log('REDIRECTS ADDED: ' + added + ' | keys: ' + Object.keys(j).join(', '));
function walk(d, out) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.vercel|\.git/.test(e.name)) walk(p, out); }
    else if (e.name.endsWith('.html')) out.push(p);
  });
  return out;
}
let touched = 0, total = 0;
walk('.', []).forEach(f => {
  const norm = '/' + f.replace(/\\/g,'/').replace(/^\.\//,'');
  if (Object.values(map).includes(norm)) return;
  let s = fs.readFileSync(f,'utf8'); const orig = s;
  Object.entries(map).forEach(([from,to]) => {
    if (norm === from) return;
    [from, from.slice(1)].forEach(v => {
      const parts = s.split(v);
      if (parts.length > 1) { total += parts.length-1; s = parts.join(v === from ? to : to.slice(1)); }
    });
  });
  if (s !== orig) { fs.writeFileSync(f,s); touched++; }
});
console.log('FILES: ' + touched + ' | LINKS: ' + total);
let sm = fs.readFileSync('sitemap.xml','utf8');
const before = (sm.match(/<url>/g)||[]).length;
Object.keys(map).forEach(d => {
  const re = new RegExp('\\s*<url>(?:(?!<\\/url>)[\\s\\S])*?' + d.replace(/[.\/]/g,'\\$&') + '[\\s\\S]*?<\\/url>','g');
  sm = sm.replace(re,'');
});
const after = (sm.match(/<url>/g)||[]).length;
fs.writeFileSync('sitemap.xml', sm);
console.log('SITEMAP: ' + before + ' -> ' + after);
