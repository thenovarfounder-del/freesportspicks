const fs=require("fs");
const p="vercel.json";
let j = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p,"utf8")) : {};
j.redirects = j.redirects || [];
const r={source:"/blog/horse-racing-betting-strategy.html",destination:"/picks/horse-racing-picks/",permanent:true};
if(j.redirects.some(x=>x.source===r.source)){console.log("already present");}
else{ j.redirects.push(r); fs.writeFileSync(p,JSON.stringify(j,null,2)); console.log("REDIRECT ADDED"); }
// remove from sitemap
let sm=fs.readFileSync("sitemap.xml","utf8");
const before=sm.length;
sm=sm.replace(/\s*<url>(?:(?!<\/url>)[\s\S])*horse-racing-betting-strategy[\s\S]*?<\/url>/,"");
fs.writeFileSync("sitemap.xml",sm);
console.log("sitemap changed: " + (before !== sm.length));
