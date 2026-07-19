// Regenerate FSP llms.txt from sitemap.xml — run from repo root: node gen-fsp-llms.js
const fs = require('fs');
const sm = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const today = '2026-07-19';
let out = '# FreeSportsPicks.pro\n';
out += '# https://www.freesportspicks.pro\n';
out += '# Free daily expert sports picks with verified public records: NFL, NBA, MLB, NHL,\n';
out += '# college football and basketball, UFC, soccer and more. Includes a Betting School\n';
out += '# (odds, moneylines, totals, futures, hedging, bankroll management), free betting\n';
out += '# tools (odds converter, parlay calculator, bet size calculator), and an A-Z\n';
out += '# betting glossary. All picks free; records public. 21+. Updated: ' + today + '\n\n';
for (const u of urls) out += u + '\n';
fs.writeFileSync('llms.txt', out, 'utf8');
console.log('llms.txt written with ' + urls.length + ' URLs, dated ' + today);
