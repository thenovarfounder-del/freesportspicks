// FSP GA Fix - injects Google Analytics into every HTML page that lacks it
// Run from the freesportspicks folder:  node fix_ga.js
const fs = require('fs');
const path = require('path');
const BASE = 'C:\\Users\\randy\\Downloads\\freesportspicks';
const GA_ID = 'G-YZPX14DK4Y';

// exact GA block used across the site (matches existing pages)
const GA_BLOCK = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
`;

// recursively find all .html files
function walk(dir){
  let out=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()){
      if(e.name==='node_modules'||e.name==='.git') continue;
      out=out.concat(walk(p));
    } else if(e.name.endsWith('.html')){
      out.push(p);
    }
  }
  return out;
}

const files = walk(BASE);
let fixed=[], already=[], failed=[];

for(const f of files){
  let html = fs.readFileSync(f,'utf8');
  if(html.includes(GA_ID)){ already.push(f); continue; }
  // insert GA right after <head> (works whether <head> is on its own line or not)
  const headIdx = html.search(/<head[^>]*>/i);
  if(headIdx < 0){ failed.push(f+' (no <head>)'); continue; }
  const insertAt = html.indexOf('>', headIdx) + 1;
  const newHtml = html.slice(0,insertAt) + '\n' + GA_BLOCK + html.slice(insertAt);
  // verify GA is now present
  if(!newHtml.includes(GA_ID)){ failed.push(f+' (insert failed)'); continue; }
  fs.writeFileSync(f, newHtml, 'utf8');
  fixed.push(f.replace(BASE+path.sep,''));
}

console.log('=== GA FIX COMPLETE ===');
console.log('Already had GA: '+already.length);
console.log('NEWLY FIXED:    '+fixed.length);
console.log('Failed:         '+failed.length);
if(fixed.length){ console.log('\n--- Fixed pages ---'); fixed.forEach(f=>console.log('  '+f)); }
if(failed.length){ console.log('\n--- FAILED (need manual check) ---'); failed.forEach(f=>console.log('  '+f)); }

// final verification pass
let stillMissing=0;
for(const f of files){ if(!fs.readFileSync(f,'utf8').includes(GA_ID)) stillMissing++; }
console.log('\n=== VERIFICATION: pages still missing GA after fix: '+stillMissing+' (should be 0) ===');
