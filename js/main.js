// FreeSportsPicks.pro — Main JS
// v2: Email confirmation via EmailJS, duplicate-email blocking, locked-out UI

// ─────────────────────────────────────────────
// EMAIL CONFIG — fill these in after signing up
// at https://www.emailjs.com (free: 200 emails/mo)
// ─────────────────────────────────────────────
const EMAIL_CFG = {
  serviceId:  'YOUR_EMAILJS_SERVICE_ID',   // e.g. 'service_abc123'
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',  // e.g. 'template_xyz789'
  publicKey:  'YOUR_EMAILJS_PUBLIC_KEY',   // e.g. 'abcDEFghiJKL'
};

// ─────────────────────────────────────────────
// TODAY'S PICK — update this daily
// ─────────────────────────────────────────────
const TODAYS_PICK = {
  sport:      'NFL',
  matchup:    'Kansas City Chiefs vs Baltimore Ravens',
  pick:       'Kansas City Chiefs -3.5',
  line:       '-3.5 (-110)',
  confidence: 5,
  analysis:   'KC covers at home. Ravens secondary banged up. Mahomes spreads the field perfectly against this scheme. Sharp money on KC side since open.',
  tipoff:     'Sunday 4:25 PM ET',
};

// ─────────────────────────────────────────────
// BLOCKED-EMAIL DATABASE  (localStorage)
// ─────────────────────────────────────────────
const BLOCKED_KEY = 'fsp_claimed_emails_v1';
const GB_KEY      = 'fsp_guestbook_v1';

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

function isEmailBlocked(email) {
  try {
    const blocked = JSON.parse(localStorage.getItem(BLOCKED_KEY) || '[]');
    return blocked.includes(normalizeEmail(email));
  } catch { return false; }
}

function blockEmail(email) {
  try {
    const blocked = JSON.parse(localStorage.getItem(BLOCKED_KEY) || '[]');
    const norm = normalizeEmail(email);
    if (!blocked.includes(norm)) {
      blocked.push(norm);
      localStorage.setItem(BLOCKED_KEY, JSON.stringify(blocked));
    }
  } catch {}
}

// ─────────────────────────────────────────────
// GUESTBOOK DATABASE
// ─────────────────────────────────────────────
function gbLoad() {
  try { return JSON.parse(localStorage.getItem(GB_KEY) || '[]'); }
  catch { return []; }
}
function gbSave(entries) {
  localStorage.setItem(GB_KEY, JSON.stringify(entries));
}
function gbAdd(entry) {
  const entries = gbLoad();
  entry.id   = Date.now();
  entry.date = new Date().toISOString();
  entries.unshift(entry);
  gbSave(entries);
  return entry;
}

// ─────────────────────────────────────────────
// EMAILJS SENDER
// ─────────────────────────────────────────────
async function sendThankYouEmail(entry) {
  // If EmailJS not configured yet, log and skip gracefully
  if (EMAIL_CFG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    console.warn('EmailJS not configured — skipping email send. See EMAIL_CFG in main.js.');
    return { ok: true, skipped: true };
  }

  try {
    // EmailJS is loaded via CDN in the HTML
    const result = await emailjs.send(
      EMAIL_CFG.serviceId,
      EMAIL_CFG.templateId,
      {
        to_name:         entry.name,
        to_email:        entry.email,
        fav_team:        entry.favTeam  || 'your favorite team',
        fav_sport:       entry.favSport || 'all sports',
        pick_sport:      TODAYS_PICK.sport,
        pick_matchup:    TODAYS_PICK.matchup,
        pick_selection:  TODAYS_PICK.pick,
        pick_line:       TODAYS_PICK.line,
        pick_analysis:   TODAYS_PICK.analysis,
        pick_tipoff:     TODAYS_PICK.tipoff,
        pick_confidence: TODAYS_PICK.confidence + '/5',
        site_url:        'https://www.freesportspicks.pro',
      },
      EMAIL_CFG.publicKey
    );
    return { ok: true, result };
  } catch (err) {
    console.error('EmailJS send failed:', err);
    return { ok: false, err };
  }
}

// ─────────────────────────────────────────────
// RENDER LOCKED-OUT STATE (already claimed)
// ─────────────────────────────────────────────
function renderLockedState(formWrapId, email) {
  const wrap = document.getElementById(formWrapId);
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="text-align:center;padding:40px 24px;">
      <div style="font-size:3rem;margin-bottom:16px;">🔒</div>
      <h3 style="font-family:var(--font-display);font-size:1.6rem;font-weight:900;text-transform:uppercase;margin-bottom:12px;">
        Pick Already Claimed
      </h3>
      <p style="color:var(--muted);font-size:0.95rem;max-width:440px;margin:0 auto 20px;">
        The email address <strong style="color:var(--white)">${escHtml(email)}</strong> has already received today's free pick.
        Each email address can claim one free pick per day.
      </p>
      <div style="background:rgba(255,179,0,0.08);border:1px solid rgba(255,179,0,0.3);border-radius:6px;padding:16px 20px;max-width:420px;margin:0 auto 24px;text-align:left;">
        <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--amber);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">Already Sent To You</div>
        <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:800;text-transform:uppercase;">${escHtml(TODAYS_PICK.pick)}</div>
        <div style="font-size:0.82rem;color:var(--muted);margin-top:4px;">${escHtml(TODAYS_PICK.matchup)} · ${escHtml(TODAYS_PICK.line)}</div>
      </div>
      <p style="color:var(--muted);font-size:0.82rem;">Check your inbox for the full analysis. Come back tomorrow for a new free pick!</p>
      <a href="/" class="btn-secondary" style="margin-top:20px;display:inline-block;">View All Picks →</a>
    </div>`;
}

// ─────────────────────────────────────────────
// RENDER SUCCESS STATE (just signed up)
// ─────────────────────────────────────────────
function renderSuccessState(formWrapId, entry) {
  const wrap = document.getElementById(formWrapId);
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="text-align:center;padding:40px 24px;">
      <div style="font-size:3rem;margin-bottom:16px;">🎉</div>
      <h3 style="font-family:var(--font-display);font-size:1.6rem;font-weight:900;text-transform:uppercase;color:var(--green);margin-bottom:12px;">
        You're In, ${escHtml(entry.name.split(' ')[0])}!
      </h3>
      <p style="color:rgba(240,244,255,0.8);font-size:0.95rem;max-width:480px;margin:0 auto 24px;">
        Welcome to FreeSportsPicks.pro! Your free pick has been sent to
        <strong style="color:var(--green)">${escHtml(entry.email)}</strong>.
        Check your inbox (and spam folder just in case).
      </p>

      <!-- TODAY'S PICK REVEAL -->
      <div style="background:var(--navy-light);border:2px solid var(--green);border-radius:8px;padding:24px;max-width:460px;margin:0 auto 24px;text-align:left;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--green);"></div>
        <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;">
          🏆 Today's Free Pick — Exclusive to Members
        </div>
        <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;text-transform:uppercase;margin-bottom:4px;">
          ${escHtml(TODAYS_PICK.pick)}
        </div>
        <div style="font-family:var(--font-mono);font-size:0.82rem;color:var(--amber);margin-bottom:10px;">
          ${escHtml(TODAYS_PICK.matchup)} · ${escHtml(TODAYS_PICK.line)} · ${escHtml(TODAYS_PICK.tipoff)}
        </div>
        <p style="font-size:0.85rem;color:rgba(240,244,255,0.8);line-height:1.6;margin-bottom:10px;">
          ${escHtml(TODAYS_PICK.analysis)}
        </p>
        <div style="display:flex;align-items:center;gap:8px;font-size:0.78rem;color:var(--muted);">
          <span>Confidence:</span>
          ${[1,2,3,4,5].map(i=>`<span style="width:8px;height:8px;border-radius:50%;background:${i<=TODAYS_PICK.confidence?'var(--green)':'var(--navy)'};display:inline-block;"></span>`).join('')}
          <span>${TODAYS_PICK.confidence}/5</span>
        </div>
      </div>

      <p style="color:var(--muted);font-size:0.8rem;margin-bottom:20px;">
        🔒 This pick is locked to your email. One free pick per email per day.
      </p>
      <a href="/" class="btn-primary">See All Today's Picks →</a>
    </div>`;
}

// ─────────────────────────────────────────────
// GUESTBOOK FORM INIT — main logic
// ─────────────────────────────────────────────
function initGuestbookForm(formId, formWrapId, listId) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Check on load if this device already has a blocked email
  const emailInput = form.querySelector('[name="email"]');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const v = normalizeEmail(emailInput.value);
      if (v && isEmailBlocked(v)) {
        renderLockedState(formWrapId, v);
      }
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd      = new FormData(form);
    const email   = normalizeEmail(fd.get('email') || '');
    const name    = (fd.get('name')    || '').trim().slice(0, 60);
    const message = (fd.get('message') || '').trim().slice(0, 500);

    if (!name || !email || !message) return;

    // ── BLOCK CHECK ──
    if (isEmailBlocked(email)) {
      renderLockedState(formWrapId, email);
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const emailField = form.querySelector('[name="email"]');
      if (emailField) {
        emailField.style.borderColor = 'var(--red)';
        emailField.focus();
      }
      return;
    }

    // ── LOADING STATE ──
    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending your pick...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const entry = {
      name,
      email,
      location: (fd.get('location') || '').trim().slice(0, 60),
      favTeam:  (fd.get('favTeam')  || '').trim().slice(0, 40),
      favSport:  fd.get('favSport') || 'all',
      message,
    };

    // ── SAVE TO DB ──
    gbAdd(entry);

    // ── BLOCK EMAIL NOW ──
    blockEmail(email);

    // ── SEND EMAIL ──
    const emailResult = await sendThankYouEmail(entry);
    if (!emailResult.ok && !emailResult.skipped) {
      // Email failed but we still saved — show success anyway, note check spam
      console.warn('Email failed to send but entry was saved.');
    }

    // ── RENDER SUCCESS ──
    fetch('https://formsubmit.co/ajax/thenovar.founder@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: entry.name, email: entry.email, sport: entry.favSport, team: entry.favTeam, message: entry.message })
    }).catch(function(){});
    renderSuccessState(formWrapId, entry);
    renderGuestbook(listId);

    // Update count
    const countEl = document.getElementById('entry-count');
    if (countEl) {
      const entries = gbLoad();
      countEl.textContent = entries.length + ' entries';
    }
  });
}

// ─────────────────────────────────────────────
// CHECK + RENDER LOCKED ON PAGE LOAD
// ─────────────────────────────────────────────
function checkLockedOnLoad(formWrapId) {
  // We can't check without the email, so we show the form initially.
  // The blur handler on the email field handles the check.
  // But if somehow we stored which email this device used last, check it:
  try {
    const lastEmail = localStorage.getItem('fsp_last_email');
    if (lastEmail && isEmailBlocked(lastEmail)) {
      renderLockedState(formWrapId, lastEmail);
    }
  } catch {}
}

// ─────────────────────────────────────────────
// RENDER GUESTBOOK ENTRIES
// ─────────────────────────────────────────────
function renderGuestbook(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const entries = gbLoad();

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--muted);">
        <p style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;text-transform:uppercase;">Be the first to sign in!</p>
        <p style="margin-top:8px;font-size:0.9rem;">Join our community of sharp sports bettors.</p>
      </div>`;
    return;
  }

  const sportEmoji = {
    nfl:'🏈', nba:'🏀', mlb:'⚾', nhl:'🏒',
    cfb:'🏈', cbb:'🏀', soccer:'⚽', mma:'🥊',
    golf:'⛳', tennis:'🎾', racing:'🏇', all:'🎯'
  };

  container.innerHTML = `<div class="entry-list">${entries.map(e => {
    const initials = (e.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    const sport    = sportEmoji[e.favSport] || '🎯';
    const dt       = new Date(e.date);
    const dateStr  = dt.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    return `
    <article class="entry-card" itemscope itemtype="https://schema.org/Comment">
      <div class="entry-header">
        <div class="entry-avatar">${initials}</div>
        <div>
          <div class="entry-name" itemprop="author">${escHtml(e.name)}</div>
          ${e.location ? `<div class="entry-location">📍 ${escHtml(e.location)}</div>` : ''}
        </div>
        ${e.favTeam ? `<span class="entry-fav-team">${sport} ${escHtml(e.favTeam)}</span>` : ''}
        <span class="entry-date">${dateStr}</span>
      </div>
      <p class="entry-message" itemprop="text">${escHtml(e.message)}</p>
    </article>`;
  }).join('')}</div>`;
}

// ─────────────────────────────────────────────
// HTML ESCAPE
// ─────────────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])
  );
}

// ─────────────────────────────────────────────
// SAMPLE PICKS
// ─────────────────────────────────────────────
const SAMPLE_PICKS = [
  { sport:'NFL',  matchup:'Chiefs vs Ravens',    line:'KC -3.5',   pick:'Kansas City Chiefs -3.5', analysis:'KC covers at home — Ravens secondary banged up. Mahomes spreads the field.', confidence:5 },
  { sport:'NBA',  matchup:'Celtics vs Heat',     line:'BOS -6',    pick:'Boston Celtics -6',       analysis:'Heat struggle on road vs elite defenses. Boston\'s 3-point volume too much.', confidence:4 },
  { sport:'MLB',  matchup:'Dodgers vs Padres',   line:'LAD -145',  pick:'LA Dodgers ML',           analysis:'Yamamoto on the mound, Padres rotation thin. Value at -145.',               confidence:4 },
  { sport:'NFL',  matchup:'Bills vs Dolphins',   line:'BUF -4',    pick:'Buffalo Bills -4',        analysis:'Tua questionable. Bills D elite vs the run. Cover in cold weather.',         confidence:5 },
  { sport:'NHL',  matchup:'Leafs vs Bruins',     line:'TOR +120',  pick:'Toronto ML +120',         analysis:'Value play on Toronto home ice. Woll sharp last 10 starts.',                confidence:3 },
  { sport:'CFB',  matchup:'Alabama vs Georgia',  line:'UGA -2.5',  pick:'Georgia Bulldogs -2.5',   analysis:'UGA defensive line advantage too significant. Cover at home.',               confidence:4 },
];

function renderPicks(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sportClass = { NFL:'football', NBA:'basketball', MLB:'baseball', NHL:'hockey', CFB:'football' };
  container.innerHTML = SAMPLE_PICKS.map(p => {
    const dots = [1,2,3,4,5].map(i => `<span class="dot ${i<=p.confidence?'filled':''}"></span>`).join('');
    return `
    <article class="pick-card" itemscope itemtype="https://schema.org/Article">
      <div class="pick-sport sport-${sportClass[p.sport]||'general'}">&nbsp;${p.sport}</div>
      <div class="pick-matchup" itemprop="headline">${escHtml(p.matchup)}</div>
      <div class="pick-line">${escHtml(p.line)}</div>
      <div class="pick-recommendation">✅ <strong>${escHtml(p.pick)}</strong></div>
      <p style="font-size:0.82rem;color:var(--muted);margin-bottom:12px;" itemprop="description">${escHtml(p.analysis)}</p>
      <div class="pick-confidence">
        <div class="confidence-dots">${dots}</div>
        <span>Confidence ${p.confidence}/5</span>
      </div>
    </article>`;
  }).join('');
}

// ─────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ─────────────────────────────────────────────
// HAMBURGER NAV
// ─────────────────────────────────────────────
function initNav() {
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (ham && nav) ham.addEventListener('click', () => nav.classList.toggle('open'));
}

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
function initTicker() {
  const ticker = document.querySelector('.ticker-inner');
  if (ticker) ticker.innerHTML += ticker.innerHTML;
}

// ─────────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target    = parseFloat(el.dataset.count);
    const isPercent = el.dataset.type === 'pct';
    let current     = 0;
    const step      = target / 60;
    const timer     = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = isPercent ? current.toFixed(1) + '%' : Math.round(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTicker();
  initFAQ();
  renderPicks('picks-grid');
  renderGuestbook('guestbook-entries');
  initGuestbookForm('guestbook-form', 'guestbook-form-wrap', 'guestbook-entries');
  checkLockedOnLoad('guestbook-form-wrap');

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    });
    obs.observe(heroStats);
  }

  const path = window.location.pathname;
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path !== '/' && a.getAttribute('href')?.includes(path.split('/')[1]))) {
      a.classList.add('active');
    }
  });
});
