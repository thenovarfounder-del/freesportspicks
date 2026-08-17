const fs=require("fs");
const p="free-picks.html";
let s=fs.readFileSync(p,"utf8");
const old="<label>Phone (optional &mdash; get picks by text before games lock)</label>";
if(!s.includes(old)){console.log("LABEL NOT FOUND");process.exit(1);}
s=s.replace(old,"<label>Phone number <span style=\"color:#C9A84C\">*</span></label>\n        <p style=\"font-size:12.5px;color:#64748b;margin:-2px 0 8px;line-height:1.5\">We text the card before games lock, and we call new members once to set up your sports and frequency. One call, not a campaign.</p>");
fs.writeFileSync(p,s);
console.log("LABEL UPDATED");
