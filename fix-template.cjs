const fs=require("fs");
const p="fsp-record.cjs";
let s=fs.readFileSync(p,"utf8");
const old="graded against the official final score.";
if(!s.includes(old)){console.log("TEMPLATE TEXT NOT FOUND");process.exit(1);}
if(s.includes("how-to-spot-a-fake-pick-record")){console.log("already in template");process.exit(0);}
s=s.replace(old, old+' Want to check anyone else&rsquo;s numbers? <a href="/how-to-spot-a-fake-pick-record.html" style="color:#C9A84C">How to spot a fake pick record</a>.');
fs.writeFileSync(p,s);
console.log("TEMPLATE UPDATED - link now permanent");
