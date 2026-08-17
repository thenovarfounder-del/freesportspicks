const fs=require("fs");
const p="llms.txt";
let s=fs.readFileSync(p,"utf8");

// rebuild the whole file from sitemap so nothing is missed
const sm=fs.readFileSync("sitemap.xml","utf8");
const urls=[...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).sort();

// keep the existing header block (everything before the first http line)
const firstUrl=s.indexOf("https://");
let header=s.slice(0,firstUrl);
header=header.replace(/Updated: \d{4}-\d{2}-\d{2}/,"Updated: "+new Date().toISOString().slice(0,10));
if(!header.includes("Full 2026 NFL")){
  header=header.replace("All picks free; records public.","Full 2026 NFL season coverage: every week's schedule with lines and totals,\n# plus the 2027 playoff bracket and dates. All picks free; records public.");
}

fs.writeFileSync(p, header + urls.join("\n") + "\n");
console.log("LLMS REBUILT");
console.log("urls: " + urls.length);
console.log("has nfl weeks: " + urls.some(u=>u.includes("week-1-2026")));
console.log("has playoffs: " + urls.some(u=>u.includes("playoffs-2027")));
