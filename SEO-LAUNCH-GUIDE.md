# FreeSportsPicks.pro — SEO Launch Playbook
## Target: High Organic Traffic by September 2026

---

## DOMAIN & HOSTING SETUP

**Recommended Domain:** `freesportspicks.pro` (or .com if available)
- Exact-match keyword domain = strong ranking signal
- Register at Namecheap / Cloudflare Registrar

**Hosting (Free/Cheap options):**
1. **Netlify** (free) — drag & drop the project folder, instant HTTPS, global CDN
2. **Vercel** (free) — same deal, excellent Core Web Vitals out of box
3. **GitHub Pages** (free) — push the repo, auto-deploy
4. **Cloudflare Pages** (free) — fastest option, great SEO

**After deploying:**
- [ ] Confirm HTTPS works (green padlock)
- [ ] Set up www → non-www redirect (or vice versa, pick one)
- [ ] Enable Brotli compression on host

---

## WEEK 1: TECHNICAL FOUNDATION

### Google Search Console
1. Go to search.google.com/search-console
2. Add your property → verify via DNS TXT record
3. Submit sitemap: `https://www.freesportspicks.pro/sitemap.xml`
4. Submit news sitemap: `https://www.freesportspicks.pro/sitemap-news.xml`
5. Request indexing on homepage manually

### Google Analytics 4
1. Create GA4 property at analytics.google.com
2. Add the GA4 tracking snippet to every HTML `<head>`
3. Set up conversion event: `guestbook_signup` (fire when form submits)

### Bing Webmaster Tools
1. Register at bing.com/webmasters
2. Import from Google Search Console (1-click)
3. Submit sitemap there too

### Core Web Vitals Check
- Run PageSpeed Insights on homepage: pagespeed.web.dev
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1
- The site is already optimized (no heavy frameworks, CDN fonts)

---

## WEEK 2-4: CONTENT VELOCITY

### Daily Content Updates (CRITICAL)
Google rewards freshness. Every single day:
1. Update `<meta name="description">` dates ("Today's NFL Picks - June 10, 2026")
2. Add 2-3 new real picks to the homepage picks grid
3. Update the recent record table with real results
4. Change `dateModified` in Schema.org JSON-LD

**The faster you add real, updating picks content, the faster you rank.**

### Content to Add (High Priority)
- [ ] NFL Week 1 preview article (publish Aug 1 — huge search volume spike)
- [ ] "NFL Picks This Week" dynamic page
- [ ] "Best Bets Today" — update DAILY with real picks
- [ ] Super Bowl predictions article (perennial traffic)
- [ ] March Madness predictions (publish January)

---

## MONTH 1-2: LINK BUILDING (Most Important)

### Free Link Building Strategies

**1. Reddit (Start Immediately)**
- Post daily picks in: r/sportsbook, r/nfl, r/nba, r/mlb, r/CFB
- Be genuinely helpful — share analysis, not just "go to my site"
- After 10-15 helpful posts, include your site in comments
- Target: 50 Reddit posts/month

**2. X (Twitter)**
- Tweet every pick with hashtags: #NFLPicks #FreePicks #BestBets #SportsBetting
- Tag @NFLTwitter for NFL picks, @NBA for basketball
- Build to 500+ followers by September
- Every tweet = backlink signal

**3. Facebook Groups**
- Join NFL picks groups, sports betting groups (50+ exist)
- Share free picks daily — link in every post
- Target: 5 groups, 1 post/day each

**4. Sports Betting Forums**
- covers.com/forum — VERY high DA, link in signature
- sportsbookreview.com forums
- thespread.com
- Create account, post predictions weekly

**5. Google My Business** (Yes, even for a website)
- Create a GMB listing as "Sports Information Service"
- Adds legitimacy, local search signals

**6. Directory Submissions**
- Submit to: AllTop, BestoftheWeb, AboutUs
- DMOZ alternatives: Curlie.org
- Gambling/betting directories: thepogg.com, casino.org resource pages

**7. HARO / Qwoted**
- Sign up for Help A Reporter Out (helpareporter.com)
- Respond to queries about sports betting, NFL predictions
- Get quoted in major publications = high DA backlinks

---

## TECHNICAL SEO CHECKLIST

### Already Done in Your Site:
- [x] Semantic HTML5 structure
- [x] Schema.org JSON-LD (WebSite, Organization, Article, FAQPage, BreadcrumbList)
- [x] Open Graph + Twitter Cards
- [x] Canonical URLs on every page
- [x] XML Sitemap (53 URLs)
- [x] News Sitemap (15 top pages)
- [x] LLMs.txt for AI crawler indexing
- [x] robots.txt with explicit bot allowances (GPTBot, ClaudeBot, PerplexityBot)
- [x] Breadcrumb navigation (schema + HTML)
- [x] FAQ schema on every keyword page
- [x] Internal linking between all 50 pages
- [x] Previous/Next page navigation
- [x] Related pages section
- [x] Mobile responsive
- [x] Aria labels / accessibility
- [x] "dateModified" on all article schema

### Still To Do:
- [ ] Add actual images with descriptive alt text
- [ ] Create og-home.jpg (1200x630 social preview image)
- [ ] Add logo.png (400x100)
- [ ] Compress all images with squoosh.app
- [ ] Add privacy.html and terms.html pages
- [ ] Implement real pick database (Supabase free tier)

---

## SEPTEMBER RANKING TARGETS

### Realistic by September 2026 (5 months of work):
| Keyword | Target Position | Monthly Traffic |
|---|---|---|
| "free sports picks" | Top 10 | 3,000-8,000 visits |
| "free nfl picks" | Top 5 | 5,000-15,000 visits |
| "nfl picks this week" | Top 10 | 2,000-6,000 visits |
| "best bets today" | Top 15 | 1,000-4,000 visits |
| Long-tail (50 pages) | Top 5 each | 500-2,000 each |

**Total realistic target: 20,000-60,000 organic visits/month by September**

---

## UPGRADING THE GUESTBOOK TO A REAL DATABASE

Current implementation uses localStorage (works instantly, no server needed).

To upgrade to a real cloud database (free):

### Option 1: Supabase (Recommended)
```javascript
// Install: npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY')

// Save entry
const { data, error } = await supabase
  .from('guestbook')
  .insert([{ name, location, message, fav_team, fav_sport }])

// Load entries
const { data } = await supabase
  .from('guestbook')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(50)
```
- Free tier: 500MB, 50,000 requests/month
- Sign up: supabase.com

### Option 2: Firebase Firestore
```javascript
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
// Free tier: 1GB storage, 50K reads/day
```

### Option 3: Airtable API
- No-code database, free 1,200 records
- REST API, easy to integrate

---

## LLM / AI SEARCH OPTIMIZATION

Your site already has `llms.txt` — this helps AI search engines like:
- **Perplexity AI** (huge growth, surfaces sports content)
- **ChatGPT with search** (cites quality sports sites)
- **Claude** (same)
- **Bing Copilot** (heavy sports coverage)

**Additional AI SEO steps:**
1. Write clear, factual pick analysis (AI prefers authoritative tone)
2. Use structured data (you already have this)
3. Update `llms.txt` weekly with fresh picks
4. Create a `/api/picks.json` endpoint with today's picks (AI can fetch this)

---

## WEEKLY MAINTENANCE SCHEDULE

| Day | Task |
|---|---|
| Monday | Post NFL weekly picks, update all NFL pages |
| Tuesday | Add NBA picks, post on Reddit/Twitter |
| Wednesday | Mid-week best bets update |
| Thursday | NFL Thursday Night Football preview |
| Friday | Weekend slate release, college football picks |
| Saturday | CFB picks update with real-time results |
| Sunday | NFL picks, update record table |

---

## MONETIZATION (Once Traffic Hits)

Once you reach 5,000+ monthly visitors:
1. **Google AdSense** — $3-8 RPM on sports betting content
2. **Sports betting affiliate links** — DraftKings, FanDuel pay $100-300/signup
3. **Covers.com affiliate program** — Revenue share
4. **Direct ad sales** — Sports betting brands pay $500-2,000/month for banner ads

At 50K visitors/month: potential $2,000-10,000/month in affiliate revenue.
