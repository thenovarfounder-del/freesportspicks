# EmailJS Setup Guide — FreeSportsPicks.pro
## Get emails sending in ~10 minutes, free (200/month)

---

## STEP 1 — Create EmailJS Account

1. Go to **https://www.emailjs.com**
2. Click "Sign Up Free" — use your site's email (e.g. picks@freesportspicks.pro)
3. Free plan: **200 emails/month**, no credit card needed

---

## STEP 2 — Connect an Email Service

1. In EmailJS dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** (easiest) or any SMTP provider
3. Click "Connect Account" and authorize your Gmail
4. Note your **Service ID** (e.g. `service_abc123`)

---

## STEP 3 — Create the Email Template

1. In dashboard → **Email Templates** → **Create New Template**
2. Set **Subject**: `🏆 Your Free Pick is Here, {{to_name}}!`
3. Paste the HTML below as the template body
4. Under "To email": set to `{{to_email}}`
5. Note your **Template ID** (e.g. `template_xyz789`)

---

## EMAIL TEMPLATE HTML — Copy & Paste into EmailJS

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin:0; padding:0; background:#0B1220; font-family:'Helvetica Neue',Arial,sans-serif; }
  .wrap { max-width:600px; margin:0 auto; background:#131E30; }
  .header { background:#0B1220; padding:24px 32px; border-bottom:3px solid #00E676; }
  .logo { color:#F0F4FF; font-size:1.4rem; font-weight:900; letter-spacing:0.02em; text-decoration:none; }
  .logo span { color:#00E676; }
  .hero { background:linear-gradient(135deg,#131E30,#0D2A1A); padding:36px 32px; text-align:center; }
  .hero-eyebrow { color:#00E676; font-size:0.75rem; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:12px; }
  .hero h1 { color:#F0F4FF; font-size:1.8rem; font-weight:900; margin:0 0 8px; text-transform:uppercase; }
  .hero .sub { color:#7A8CA8; font-size:0.9rem; }
  .pick-box { background:#1C2D45; border:2px solid #00E676; border-radius:8px; padding:28px; margin:28px 32px; }
  .pick-label { color:#00E676; font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:8px; }
  .pick-main { color:#F0F4FF; font-size:1.5rem; font-weight:900; text-transform:uppercase; margin-bottom:6px; }
  .pick-matchup { color:#7A8CA8; font-size:0.85rem; margin-bottom:14px; }
  .pick-line { display:inline-block; background:rgba(255,179,0,0.15); color:#FFB300; padding:4px 12px; border-radius:4px; font-size:0.82rem; font-family:monospace; margin-bottom:16px; }
  .pick-analysis { color:rgba(240,244,255,0.8); font-size:0.9rem; line-height:1.7; margin-bottom:16px; }
  .confidence-row { display:flex; align-items:center; gap:6px; }
  .dot { display:inline-block; width:10px; height:10px; border-radius:50%; }
  .dot-on { background:#00E676; }
  .dot-off { background:#1C2D45; border:1px solid #333; }
  .conf-label { color:#7A8CA8; font-size:0.78rem; margin-left:4px; }
  .body { padding:0 32px 28px; }
  .body p { color:rgba(240,244,255,0.75); font-size:0.9rem; line-height:1.7; margin:0 0 16px; }
  .cta-btn { display:block; background:#00E676; color:#0B1220 !important; text-align:center; padding:14px 24px; border-radius:6px; font-weight:900; font-size:1rem; text-decoration:none; text-transform:uppercase; letter-spacing:0.05em; margin:24px 32px 0; }
  .footer { background:#0B1220; padding:24px 32px; border-top:1px solid rgba(0,230,118,0.1); }
  .footer p { color:#7A8CA8; font-size:0.75rem; line-height:1.6; margin:0; }
  .footer a { color:#7A8CA8; }
</style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <div class="header">
    <span class="logo">Free<span>SportsPicks</span>.pro</span>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-eyebrow">🏆 Your Free Pick Has Arrived</div>
    <h1>Hey {{to_name}}, you're in!</h1>
    <p class="sub">Thanks for signing the guestbook. Here's today's expert pick — just for you.</p>
  </div>

  <!-- PICK BOX -->
  <div class="pick-box">
    <div class="pick-label">📊 Today's Expert Pick · {{pick_sport}}</div>
    <div class="pick-main">{{pick_selection}}</div>
    <div class="pick-matchup">{{pick_matchup}}</div>
    <span class="pick-line">{{pick_line}} · {{pick_tipoff}}</span>
    <p class="pick-analysis">{{pick_analysis}}</p>
    <div class="confidence-row">
      <span style="color:#7A8CA8;font-size:0.78rem;">Confidence:</span>
      <!-- Stars rendered based on confidence — EmailJS will show literal text -->
      <span style="color:#00E676;font-size:0.9rem;font-weight:700;">{{pick_confidence}} ⭐</span>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <p>
      We're glad you joined the <strong style="color:#F0F4FF;">FreeSportsPicks.pro</strong> community, {{to_name}}!
      This pick was hand-selected by our expert handicappers and represents our highest-confidence play for today.
    </p>
    <p>
      📌 <strong style="color:#F0F4FF;">Important:</strong> This free pick is exclusive to your sign-in.
      Each email address receives one complimentary pick. Come back to the site tomorrow for a fresh one!
    </p>
    <p>
      Want more picks? Visit our site for the full daily slate — NFL picks, NBA picks, parlays, best bets, and more.
      All 100% free, updated every morning.
    </p>

    <a href="{{site_url}}" class="cta-btn">See All Free Picks Today →</a>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <p>
      You're receiving this because you signed the guestbook at <a href="{{site_url}}">FreeSportsPicks.pro</a>.<br>
      ⚠️ FreeSportsPicks.pro is for entertainment purposes only. Sports betting involves risk.
      Past performance does not guarantee future results. Please bet responsibly. Must be 21+ and in a jurisdiction where sports betting is legal.<br><br>
      © 2024–2026 FreeSportsPicks.pro · <a href="{{site_url}}/privacy.html">Privacy Policy</a>
    </p>
  </div>

</div>
</body>
</html>
```

---

## STEP 4 — Get Your Public Key

1. In EmailJS dashboard → **Account** → **General**
2. Copy your **Public Key** (e.g. `abcDEFghiJKL`)

---

## STEP 5 — Update Your Site

Open **`js/main.js`** and fill in `EMAIL_CFG` at the top:

```javascript
const EMAIL_CFG = {
  serviceId:  'service_abc123',    // ← your Service ID
  templateId: 'template_xyz789',   // ← your Template ID
  publicKey:  'abcDEFghiJKL',      // ← your Public Key
};
```

Also in **`guestbook.html`**, uncomment and update this line:
```javascript
// emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
// → becomes:
emailjs.init('abcDEFghiJKL');
```

---

## STEP 6 — Update Today's Pick Daily

In **`js/main.js`**, update `TODAYS_PICK` each morning:

```javascript
const TODAYS_PICK = {
  sport:      'NFL',
  matchup:    'Kansas City Chiefs vs Baltimore Ravens',
  pick:       'Kansas City Chiefs -3.5',
  line:       '-3.5 (-110)',
  confidence: 5,
  analysis:   'KC covers at home. Ravens secondary banged up...',
  tipoff:     'Sunday 4:25 PM ET',
};
```

---

## HOW THE BLOCKING WORKS

The system uses **two layers** of duplicate protection:

### Layer 1 — localStorage (immediate, device-level)
When someone signs in, their email is stored in `fsp_claimed_emails_v1` in browser localStorage.
If they return on the same browser/device, the form is replaced with the locked-out UI before they can submit.

### Layer 2 — Email blur check
When a user types an email and tabs away, the system checks instantly and shows the locked state if already blocked — before they even hit submit.

### Upgrading to server-side blocking (recommended for production)

For true cross-device blocking, upgrade to a backend:

**Option A: Supabase (free)**
```javascript
// In main.js, replace isEmailBlocked() / blockEmail() with:
const supabase = createClient('URL', 'KEY');

async function isEmailBlocked(email) {
  const { data } = await supabase
    .from('claimed_emails')
    .select('email')
    .eq('email', email)
    .single();
  return !!data;
}

async function blockEmail(email) {
  await supabase.from('claimed_emails').insert([{ email, claimed_at: new Date() }]);
}
```

**Option B: Netlify Functions + KV store**
Use a serverless function to check/write a KV database on form submit.

---

## EMAIL VOLUME PLANNING

| Plan | Cost | Emails/Month |
|------|------|-------------|
| EmailJS Free | $0 | 200 |
| EmailJS Personal | $15/mo | 1,000 |
| EmailJS Professional | $35/mo | 5,000 |
| Brevo (alternative) | Free | 300/day |
| Resend (alternative) | Free | 3,000/mo |

Once traffic grows, switch to **Resend.com** — 3,000 free emails/month and a much better API.
