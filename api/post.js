export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('FSP Post Picks - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';

    const LANGUAGE_GROUPS = {
      en: ['-1003046940406','-1001521913892','-1001059500837','-1001660625132','-1001364392463','-1002106350595','-1001410288757','-1003608894174','-1002298915392','-1001238236676'],
      zh: ['-1002104091566','-1001480765102'],
      vi: ['-1001183388302'],
      es: ['-1001729332644'],
      ru: ['-1001428699099','-1001208656374'],
      ar: ['-1002348048888','-1001419563233']
    };

    const LANGUAGE_NAMES = {
      en: 'English', zh: 'Mandarin Chinese', vi: 'Vietnamese',
      es: 'Spanish', ru: 'Russian', ar: 'Arabic'
    };

    async function apiPost(url, headers, body) {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body)
      });
      return resp.json();
    }

    async function apiGet(url, headers = {}) {
      const resp = await fetch(url, { headers });
      return resp.json();
    }

    async function getTodaysPicks() {
      const data = await apiGet(
        'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/daily_picks?date=eq.' + today + '&limit=1',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      );
      return data && data[0] ? data[0] : null;
    }

    async function postTG(chatId, message) {
      return apiPost(
        'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
        {},
        { chat_id: chatId, text: message, parse_mode: 'HTML' }
      );
    }

    async function translate(text, langName) {
      const r = await apiPost(
        'https://api.groq.com/openai/v1/chat/completions',
        { 'Authorization': 'Bearer ' + GROQ_KEY },
        { model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: 'Translate to ' + langName + '. Keep team names and numbers in English. Return translation only:\n\n' + text }], max_tokens: 500 }
      );
      return r.choices && r.choices[0] ? r.choices[0].message.content : text;
    }

    const picks = await getTodaysPicks();
    if (!picks) {
      return res.status(200).json({ ok: false, error: 'No picks found for today' });
    }

    console.log('Picks found - posting to Telegram...');

    // Post to free channel
    const freeResult = await postTG(FREE_CHANNEL,
      '\u{1F3C6} <b>FREE PICK IS READY \u2014 ' + today + '</b>\n\n\u{1F512} Today\'s pick is locked.\n\nVisit freesportspicks.pro, sign the guestbook and unlock today\'s free pick instantly.\n\n\u{1F48E} Want the full premium card?\nTap below to get access.'
    );
    console.log('Free channel:', freeResult.ok ? 'OK' : 'FAILED');

    // Post to premium channel
    const premiumResult = await postTG(PREMIUM_CHANNEL,
      '\u{1F48E} <b>FSP PREMIUM CARD \u2014 ' + today + '</b>\n\n' + picks.premium_picks + '\n\n\u2014\u2014\u2014\n\u{1F512} Private channel. Do not share.\n\u2705 Good luck today!'
    );
    console.log('Premium channel:', premiumResult.ok ? 'OK' : 'FAILED');

    // Post to language groups - no sleep delays to avoid timeout
    const results = [];
    for (const lang of Object.keys(LANGUAGE_GROUPS)) {
      const ids = LANGUAGE_GROUPS[lang];
      if (!ids.length) continue;
      const msg = lang === 'en' ? picks.free_pick : await translate(picks.free_pick, LANGUAGE_NAMES[lang]);
      const post = '\u{1F3C6} <b>FREE PICK \u2014 ' + today + '</b>\n\n' + msg + '\n\n\u{1F517} freesportspicks.pro\n\u{1F48E} Premium: t.me/FreeSportsPicksProBot';
      for (const id of ids) {
        const r = await postTG(id, post);
        results.push({ lang, id, ok: r.ok });
      }
    }

    return res.status(200).json({ ok: true, date: today, results });
  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}