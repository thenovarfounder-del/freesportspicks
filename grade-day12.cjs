const fs=require("fs");
const p="record/index.html";
let t=fs.readFileSync(p,"utf8");
if(t.includes("Day 12 &mdash; Sun Aug 9</td>")){console.log("already graded");process.exit(0);}
const before=t;
t=t.replace(/<strong>RECORD: [0-9]+&ndash;[0-9]+<\/strong> <span style="opacity:\.75">\([0-9.]+%\)<\/span>/,"<strong>RECORD: 23&ndash;13</strong> <span style=\"opacity:.75\">(63.9%)</span>");
console.log("header swapped: "+(t!==before));
const R='<tr><td style="border:1px solid #444;padding:10px">Day 12 &mdash; Sun Aug 9</td><td style="border:1px solid #444;padding:10px">Brewers ML &middot; Red Sox ML &middot; Phillies ML</td><td style="border:1px solid #444;padding:10px"><strong>2&ndash;1</strong> &mdash; MIL W 4-3 &#9989; &middot; PHI W 7-6 &#9989; &middot; BOS L 3-4 &#10060;</td></tr>';
const b2=t;
t=t.replace("<tbody>","<tbody>\n"+R);
console.log("row added: "+(t!==b2));
const b3=t;
t=t.replace(/<p style="opacity:\.8"><em>Day [0-9]+ picks[\s\S]*?<\/em><\/p>/,'<p style="opacity:.8"><em>Day 13 picks are live &mdash; win or lose, every result lands here and on X.</em></p>');
console.log("footer swapped: "+(t!==b3));
fs.writeFileSync(p,t);
const c=fs.readFileSync(p,"utf8");
console.log("VERIFIED: 23-13: "+c.includes("23&ndash;13")+" | Day 12 row: "+c.includes("Sun Aug 9</td>"));
