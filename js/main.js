// FreeSportsPicks.pro - Main JS
// Supabase lead capture + EmailJS + guestbook

const SUPABASE_URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoamhzYnJjYnRxY3ZtZ3pqemttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDcwMjQsImV4cCI6MjA5MzQ4MzAyNH0.q96sEV0oUxX5kMCYyUJjysxxERMhhlq9cCBKAQ801_g';

const EMAIL_CFG = {
  serviceId:  'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey:  'YOUR_EMAILJS_PUBLIC_KEY',
};

const TODAYS_PICK = {
  sport:      'NFL',
  matchup:    'Kansas City Chiefs vs Baltimore Ravens',
  pick:       'Kansas City Chiefs -3.5',
  line:       '-3.5 (-110)',
  confidence: 5,
  analysis:   'KC covers at home. Ravens secondary banged up. Mahomes spreads the field perfectly against this scheme. Sharp money on KC side since open.',
  tipoff:     'Sunday 4:25 PM ET',
};

const BLOCKED_KEY = 'fsp_claimed_emails_v1';
const GB_KEY = 'fsp_guestbook_v1';

function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

function isEmailBlocked(email){ return false; }

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

function gbLoad() {
  try { return JSON.parse(localStorage.getItem(GB_KEY) || '[]'); }
  catch { return []; }
}

function gbSave(entries) {
  try { localStorage.setItem(GB_KEY, JSON.stringify(entries)); } catch {}
}

function gbAdd(entry) {
  const entries = gbLoad();
  entry.id = Date.now();
  entry.date = new Date().toISOString();
  entries.unshift(entry);
  gbSave(entries);
  return entry;
}

async function saveToSupabase(entry) {
  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/sportspicks_leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: entry.name || '',
        email: entry.email || '',
        phone: '',
        sport: entry.favSport || '',
        favorite_team: entry.favTeam || '',
        message: entry.message || '',
        source: 'freesportspicks.pro - signup form'
      })
    });
    if (!res.ok) {
      const err = await res.text();
      console.warn('Supabase error:', res.status, err);
    } else {
      console.log('Supabase save OK');
    }
  } catch(e) {
    console.warn('Supabase fetch failed:', e);
  }
}

async function sendThankYouEmail(entry) {
  if (EMAIL_CFG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    console.warn('EmailJS not configured');
    return { ok: true, skipped: true };
  }
  try {
    const result = await emailjs.send(
      EMAIL_CFG.serviceId,
      EMAIL_CFG.templateId,
      {
        to_name: entry.name,
        to_email: entry.email,
        fav_team: entry.favTeam || 'your favorite team',
        fav_sport: entry.favSport || 'all sports',
        pick_sport: TODAYS_PICK.sport,
        pick_matchup: TODAYS_PICK.matchup,
        pick_selection: TODAYS_PICK.pick,
        pick_line: TODAYS_PICK.line,
        pick_analysis: TODAYS_PICK.analysis,
        pick_tipoff: TODAYS_PICK.tipoff,
        pick_confidence: TODAYS_PICK.confidence + '/5',
        site_url: 'https://www.freesportspicks.pro',
      },
      EMAIL_CFG.publicKey
    );
    return { ok: true, result };
  } catch (err) {
    console.error('EmailJS send failed:', err);
    return { ok: false, err };
  }
}

function renderLockedState(formWrapId, email) {
  const wrap = document.getElementById(formWrapId);
  if (!wrap) return;
  wrap.innerHTML = '<div style="text-align:center;padding:40px 24px;"><div style="font-size:3rem;margin-bottom:16px;">&#128274;</div><h3 style="font-family:var(--font-display);font-size:1.6rem;font-weight:900;text-transform:uppercase;margin-bottom:12px;">Pick Already Claimed</h3><p style="color:var(--muted);font-size:0.95rem;max-width:440px;margin:0 auto 20px;">The email address <strong style="color:var(--white)">' + escHtml(email) + '</strong> has already received today's free pick.</p><a href="/" class="btn-secondary" style="margin-top:20px;display:inline-block;">View All Picks &rarr;</a></div>';
}

function renderSuccessState(formWrapId, entry) {
  const wrap = document.getElementById(formWrapId);
  if (!wrap) return;
  wrap.innerHTML = '<div style="text-align:center;padding:40px 24px;"><div style="font-size:3rem;margin-bottom:16px;">&#127881;</div><h3 style="font-family:var(--font-display);font-size:1.6rem;font-weight:900;text-transform:uppercase;color:var(--green);margin-bottom:12px;">You're In, ' + escHtml(entry.name.split(' ')[0]) + '!</h3><p style="color:rgba(240,244,255,0.8);font-size:0.95rem;max-width:480px;margin:0 auto 24px;">Welcome to FreeSportsPicks.pro! Your free pick has been sent to <strong style="color:var(--green)">' + escHtml(entry.email) + '</strong>.</p><div style="background:var(--navy-light);border:2px solid var(--green);border-radius:8px;padding:24px;max-width:460px;margin:0 auto 24px;text-align:left;"><div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;">&#127942; Today's Free Pick</div><div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;text-transform:uppercase;margin-bottom:4px;">' + escHtml(TODAYS_PICK.pick) + '</div><div style="font-family:var(--font-mono);font-size:0.82rem;color:var(--amber);margin-bottom:10px;">' + escHtml(TODAYS_PICK.matchup) + ' &middot; ' + escHtml(TODAYS_PICK.line) + '</div><p style="font-size:0.85rem;color:rgba(240,244,255,0.8);line-height:1.6;margin-bottom:10px;">' + escHtml(TODAYS_PICK.analysis) + '</p></div><a href="/" class="btn-primary">See All Picks &rarr;</a></div>';
}

function initGuestbookForm(formId, formWrapId, listId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const emailInput = form.querySelector('[name="email"]');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const v = normalizeEmail(emailInput.value);
      if (v && isEmailBlocked(v)) renderLockedState(formWrapId, v);
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = normalizeEmail(fd.get('email') || '');
    const name = (fd.get('name') || '').trim().slice(0, 60);
    const message = (fd.get('message') || '').trim().slice(0, 500);

    if (!name || !email || !message) return;
    if (isEmailBlocked(email)) { renderLockedState(formWrapId, email); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const ef = form.querySelector('[name="email"]');
      if (ef) { ef.style.borderColor = 'var(--red)'; ef.focus(); }
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Sending your pick...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const entry = {
      name,
      email,
      location: (fd.get('location') || '').trim().slice(0, 60),
      favTeam: (fd.get('favTeam') || '').trim().slice(0, 40),
      favSport: fd.get('favSport') || 'all',
      message,
    };

    // Save to localStorage
    gbAdd(entry);

    // Save to Supabase
    await saveToSupabase(entry);

    // Block email
    blockEmail(email);
    // Send to Formspree
    try {
      var fd2 = new FormData();
      fd2.append('name', entry.name);
      fd2.append('email', entry.email);
      fd2.append('sport', entry.favSport || '');
      fd2.append('team', entry.favTeam || '');
      fd2.append('message', entry.message || '');
      fetch('https://formspree.io/f/mkoaavdg', { method: 'POST', body: fd2, headers: { 'Accept': 'application/json' } });
    } catch(e) {}

    // Send email
    await sendThankYouEmail(entry);

    // Show success
    renderSuccessState(formWrapId, entry);
    renderGuestbook(listId);

    const countEl = document.getElementById('entry-count');
    if (countEl) countEl.textContent = gbLoad().length + ' entries';
  });
}

function checkLockedOnLoad(formWrapId) {
  try {
    const lastEmail = localStorage.getItem('fsp_last_email');
    if (lastEmail && isEmailBlocked(lastEmail)) renderLockedState(formWrapId, lastEmail);
  } catch {}
}

function renderGuestbook(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const entries = gbLoad();
  if (entries.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--muted);"><p style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;text-transform:uppercase;">Be the first to sign in!</p><p style="margin-top:8px;font-size:0.9rem;">Join our community of sharp sports bettors.</p></div>';
    return;
  }
  const sportEmoji = { nfl:'&#127944;', nba:'&#127936;', mlb:'&#9918;', nhl:'&#127944;', cfb:'&#127944;', cbb:'&#127936;', soccer:'&#9917;', mma:'&#129354;', golf:'&#9971;', tennis:'&#127934;', racing:'&#127943;', all:'&#127919;' };
  container.innerHTML = '<div class="entry-list">' + entries.map(e => {
    const initials = (e.name || 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    const sport = sportEmoji[e.favSport] || '&#127919;';
    const dt = new Date(e.date);
    const dateStr = dt.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    return '<article class="entry-card" itemscope itemtype="https://schema.org/Comment"><div class="entry-header"><div class="entry-avatar">' + initials + '</div><div><div class="entry-name" itemprop="author">' + escHtml(e.name) + '</div>' + (e.location ? '<div class="entry-location">&#128205; ' + escHtml(e.location) + '</div>' : '') + '</div>' + (e.favTeam ? '<span class="entry-fav-team">' + sport + ' ' + escHtml(e.favTeam) + '</span>' : '') + '<span class="entry-date">' + dateStr + '</span></div><p class="entry-message" itemprop="text">' + escHtml(e.message) + '</p></article>';
  }).join('') + '</div>';
}

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

const SAMPLE_PICKS = [
  { sport:'NFL', matchup:'Chiefs vs Ravens', line:'KC -3.5', pick:'Kansas City Chiefs -3.5', analysis:'KC covers at home - Ravens secondary banged up. Mahomes spreads the field.', confidence:5 },
  { sport:'NBA', matchup:'Celtics vs Heat', line:'BOS -6', pick:'Boston Celtics -6', analysis:'Heat struggle on road vs elite defenses. Boston 3-point volume too much.', confidence:4 },
  { sport:'MLB', matchup:'Dodgers vs Padres', line:'LAD -145', pick:'LA Dodgers ML', analysis:'Yamamoto on the mound, Padres rotation thin. Value at -145.', confidence:4 },
  { sport:'NFL', matchup:'Bills vs Dolphins', line:'BUF -4', pick:'Buffalo Bills -4', analysis:'Tua questionable. Bills D elite vs the run. Cover in cold weather.', confidence:5 },
  { sport:'NHL', matchup:'Leafs vs Bruins', line:'TOR +120', pick:'Toronto ML +120', analysis:'Value play on Toronto home ice. Woll sharp last 10 starts.', confidence:3 },
  { sport:'CFB', matchup:'Alabama vs Georgia', line:'UGA -2.5', pick:'Georgia Bulldogs -2.5', analysis:'UGA defensive line advantage too significant. Cover at home.', confidence:4 },
];

function renderPicks(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sportClass = { NFL:'football', NBA:'basketball', MLB:'baseball', NHL:'hockey', CFB:'football' };
  container.innerHTML = SAMPLE_PICKS.map(p => {
    const dots = [1,2,3,4,5].map(i => '<span class="dot ' + (i<=p.confidence?'filled':'') + '"></span>').join('');
    return '<article class="pick-card" itemscope itemtype="https://schema.org/Article"><div class="pick-sport sport-' + (sportClass[p.sport]||'general') + '">&nbsp;' + p.sport + '</div><div class="pick-matchup" itemprop="headline">' + escHtml(p.matchup) + '</div><div class="pick-line">' + escHtml(p.line) + '</div><div class="pick-recommendation">&#9989; <strong>' + escHtml(p.pick) + '</strong></div><p style="font-size:0.82rem;color:var(--muted);margin-bottom:12px;" itemprop="description">' + escHtml(p.analysis) + '</p><div class="pick-confidence"><div class="confidence-dots">' + dots + '</div><span>Confidence ' + p.confidence + '/5</span></div></article>';
  }).join('');
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function initNav() {
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (ham && nav) ham.addEventListener('click', () => nav.classList.toggle('open'));
}

function initTicker() {
  const ticker = document.querySelector('.ticker-inner');
  if (ticker) ticker.innerHTML += ticker.innerHTML;
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isPercent = el.dataset.type === 'pct';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = isPercent ? current.toFixed(1) + '%' : Math.round(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

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
  const p = window.location.pathname;
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === p || (p !== '/' && a.getAttribute('href')?.includes(p.split('/')[1]))) {
      a.classList.add('active');
    }
  });
});
