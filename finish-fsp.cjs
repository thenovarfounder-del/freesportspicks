const fs=require("fs");
// sitemap
let sm=fs.readFileSync("sitemap.xml","utf8");
if(sm.includes("how-to-spot-a-fake-pick-record")){console.log("sitemap: already listed");}
else{
 const anchor="verified-records.html</loc>";
 const i=sm.indexOf(anchor);
 if(i<0){console.log("sitemap: anchor missing");}
 else{
  const end=sm.indexOf("</url>",i)+6;
  const today=new Date().toISOString().slice(0,10);
  sm=sm.slice(0,end)+"\n  <url><loc>https://www.freesportspicks.pro/how-to-spot-a-fake-pick-record.html</loc><lastmod>"+today+"</lastmod><priority>0.8</priority></url>"+sm.slice(end);
  fs.writeFileSync("sitemap.xml",sm);
  console.log("sitemap: added");
 }
}
// link from record page covenant
let rp=fs.readFileSync("verified-records.html","utf8");
if(rp.includes("how-to-spot-a-fake-pick-record")){console.log("record page: already linked");}
else{
 const a="graded against the official final score.";
 if(rp.includes(a)){
  rp=rp.replace(a, a+' Want to check anyone else\u2019s numbers? <a href="/how-to-spot-a-fake-pick-record.html" style="color:#C9A84C">How to spot a fake pick record</a>.');
  fs.writeFileSync("verified-records.html",rp);
  console.log("record page: linked in covenant");
 } else { console.log("record page: covenant text not found"); }
}
