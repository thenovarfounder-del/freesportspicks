const fs=require("fs");
const p="free-picks.html";
let s=fs.readFileSync(p,"utf8");
const old = "By checking this box, I agree to receive free daily picks and sports betting offers from FreeSportsPicks.pro and its partners by email and (if provided) text message. Automated technology may be used. Consent is not a condition of any purchase. Msg/data rates may apply. Reply STOP to opt out. I confirm I am 21+.";
if(!s.includes(old)){console.log("CONSENT TEXT NOT FOUND");process.exit(1);}
const nu = "By checking this box, I agree to receive free daily picks and sports betting offers from FreeSportsPicks.pro and its partners by email, text message and phone call at the number provided. Automated technology may be used. Consent is not a condition of any purchase. Msg/data rates may apply. Reply STOP to opt out of texts, or tell us on any call to stop calls. I confirm I am 21+.";
s = s.replace(old, nu);
fs.writeFileSync(p,s);
console.log("CONSENT TEXT UPDATED");
