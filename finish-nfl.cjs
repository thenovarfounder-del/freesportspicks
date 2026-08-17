const fs=require("fs");
// 1. sitemap
let sm=fs.readFileSync("sitemap.xml","utf8");
if(sm.includes("nfl/week-1-2026")){console.log("sitemap: already listed");}
else{
 const anchor="sports/nfl/</loc>";
 let i=sm.indexOf(anchor);
 if(i<0){ i=sm.indexOf("todays-picks.html</loc>"); }
 if(i<0){console.log("sitemap: anchor missing");}
 else{
  const end=sm.indexOf("</url>",i)+6;
  const today=new Date().toISOString().slice(0,10);
  sm=sm.slice(0,end)+"\n  <url><loc>https://www.freesportspicks.pro/nfl/week-1-2026.html</loc><lastmod>"+today+"</lastmod><priority>0.9</priority></url>"+sm.slice(end);
  fs.writeFileSync("sitemap.xml",sm);
  console.log("sitemap: added");
 }
}
// 2. link from NFL hub
const hub="sports/nfl/index.html";
if(!fs.existsSync(hub)){console.log("NFL hub not at "+hub);}
else{
 let h=fs.readFileSync(hub,"utf8");
 if(h.includes("nfl/week-1-2026")){console.log("hub: already linked");}
 else{
  const i=h.indexOf("</h1>");
  if(i<0){console.log("hub: no h1 found");}
  else{
   const ins='</h1>\n<p style="font-size:15px;color:#808080;line-height:1.8;margin:14px 0 0"><a href="/nfl/week-1-2026.html" style="color:#C9A84C">NFL Week 1 2026 &mdash; full schedule, lines and totals &rarr;</a></p>';
   h=h.slice(0,i)+ins+h.slice(i+5);
   fs.writeFileSync(hub,h);
   console.log("hub: linked");
  }
 }
}
