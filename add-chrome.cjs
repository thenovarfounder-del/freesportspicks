const fs=require("fs");
const src=fs.readFileSync("free-vs-premium-picks.html","utf8");
const hs=src.indexOf('<header class="site-header"');
const he=src.indexOf("</header>",hs)+9;
const header=src.slice(hs,he);
const fs2=src.indexOf("<footer");
const fe=src.lastIndexOf("</footer>")+9;
const footer=src.slice(fs2,fe);
let p=fs.readFileSync("how-to-spot-a-fake-pick-record.html","utf8");
if(p.includes("site-header")){console.log("already has header");process.exit(0);}
p=p.replace("<body>\n<main>","<body>\n"+header+"\n<main>");
p=p.replace("</main>\n</body>","</main>\n"+footer+"\n</body>");
fs.writeFileSync("how-to-spot-a-fake-pick-record.html",p);
console.log("HEADER + FOOTER ADDED");
console.log("has header: " + p.includes("site-header"));
console.log("has footer: " + p.includes("<footer"));
