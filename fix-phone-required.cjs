const fs=require("fs");
const p="free-picks.html";
let s=fs.readFileSync(p,"utf8");

// 1. require phone in validation
const oldV = "if(!name || !email){ err.textContent='Please enter your name and email.'; err.style.display='block'; return; }";
if(!s.includes(oldV)){console.log("VALIDATION NOT FOUND");process.exit(1);}
const newV = "if(!name || !email){ err.textContent='Please enter your name and email.'; err.style.display='block'; return; }\n    var digits = phone.replace(/[^0-9]/g,'');\n    if(digits.length < 10){ err.textContent='Please enter a valid phone number so we can send the card before games lock.'; err.style.display='block'; return; }";
s = s.replace(oldV, newV);

// 2. consent string covers calls
s = s.split("consent:'YES - email+SMS marketing, 21+ confirmed'").join("consent:'YES - email, SMS and phone contact, 21+ confirmed'");

fs.writeFileSync(p,s);
console.log("VALIDATION ADDED");
console.log("phone now required: " + s.includes("digits.length < 10"));
console.log("consent updated: " + s.includes("email, SMS and phone contact"));
