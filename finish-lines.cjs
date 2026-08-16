const fs=require("fs");
// 1. sitemap
let sm=fs.readFileSync("sitemap.xml","utf8");
if(sm.includes("how-to-read-betting-lines")){console.log("sitemap: already listed");}
else{
 const anchor="betting-glossary.html</loc>";
 const i=sm.indexOf(anchor);
 if(i<0){console.log("sitemap: anchor missing");}
 else{
  const end=sm.indexOf("</url>",i)+6;
  const today=new Date().toISOString().slice(0,10);
  sm=sm.slice(0,end)+"\n  <url><loc>https://www.freesportspicks.pro/how-to-read-betting-lines.html</loc><lastmod>"+today+"</lastmod><priority>0.9</priority></url>"+sm.slice(end);
  fs.writeFileSync("sitemap.xml",sm);
  console.log("sitemap: added");
 }
}
// 2. link from glossary
let g=fs.readFileSync("betting-glossary.html","utf8");
if(g.includes("how-to-read-betting-lines")){console.log("glossary: already linked");}
else{
 const i=g.indexOf("</h1>");
 if(i<0){console.log("glossary: h1 not found");}
 else{
  const ins='</h1>\n<p style="font-size:15px;color:#808080;line-height:1.8;margin:16px 0 0">New to this? Start with <a href="/how-to-read-betting-lines.html" style="color:#C9A84C">how to read betting lines</a> &mdash; a plain walkthrough of what the numbers on a sportsbook screen actually mean.</p>';
  g=g.slice(0,i)+ins+g.slice(i+5);
  fs.writeFileSync("betting-glossary.html",g);
  console.log("glossary: linked");
 }
}
