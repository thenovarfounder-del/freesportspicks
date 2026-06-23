export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const dayOfWeek = now.getUTCDay(); // 0=Sunday
    console.log('FSP Post - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';

    const OWN_CHANNELS = {
      "FSP Crypto Vietnam": { id: "-1003945068539", link: "t.me/fspcryptovietnam", lang: "Vietnamese" },
      "FSP Crypto Philippines": { id: "-1003904361668", link: "t.me/fspcryptophilippines", lang: "Filipino" },
      "FSP Crypto Indonesia": { id: "-1003774895679", link: "t.me/fspcryptoindonesia", lang: "Indonesian" },
      "FSP Crypto Thailand": { id: "-1004338838208", link: "t.me/fspcryptothailand", lang: "Thai" },
      "FSP Crypto Malaysia": { id: "-1003978299451", link: "t.me/fspcryptomalaysia", lang: "Malay" },
      "FSP Crypto Myanmar": { id: "-1003868180038", link: "t.me/fspcryptomyanmar", lang: "Burmese" },
      "FSP Crypto Cambodia": { id: "-1004440862289", link: "t.me/fspcryptocambodia", lang: "Khmer" }
    };

    async function apiGet(url, headers = {}) {
      const resp = await fetch(url, { headers });
      return resp.json();
    }

    async function apiPost(url, headers, body) {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body)
      });
      return resp.json();
    }

    async function postTG(chatId, message) {
      return apiPost(
        'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
        {},
        { chat_id: chatId, text: message, parse_mode: 'HTML' }
      );
    }

    async function groqTranslate(text, language) {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: 'Translate EXACTLY to ' + language + '. Keep all numbers, prices, links, emojis exactly as they are. Only translate the words:\n\n' + text }],
          max_tokens: 500
        })
      });
      const data = await r.json();
      return data.choices && data.choices[0] ? data.choices[0].message.content : text;
    }

    const picks = await apiGet(
      'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/daily_picks?date=eq.' + today + '&limit=1',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );
    const todayPicks = picks && picks[0] ? picks[0] : null;

    const cryptoData = await apiGet(
      'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/crypto_signals?date=eq.' + today + '&limit=1',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );
    const todayCrypto = cryptoData && cryptoData[0] ? cryptoData[0] : null;

    // Get best signal from this week for Sunday recap
    async function getWeeklyBest() {
      const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const data = await apiGet(
        'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/crypto_signals?date=gte.' + weekAgo + '&order=created_at.desc',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      );
      return data && data[0] ? data[0] : null;
    }

    // Build cross promo links list
    const channelLinks = Object.entries(OWN_CHANNELS)
      .map(([name, ch]) => '👉 ' + ch.link)
      .join('\n');

    // POST 1 — Sports pick to free + premium channels
    if (todayPicks) {
      const freeResult = await postTG(FREE_CHANNEL,
        '\u{1F3C6} <b>FREE PICK IS READY — ' + today + '</b>\n\n\u{1F512} Today\'s pick is locked.\n\nVisit freesportspicks.pro, sign the guestbook and unlock today\'s free pick instantly.\n\n\u{1F48E} Want the full premium card?\nTap below to get access.'
      );
      console.log('Free channel:', freeResult.ok ? 'OK' : 'FAILED');

      const premiumResult = await postTG(PREMIUM_CHANNEL,
        '\u{1F48E} <b>FSP PREMIUM CARD — ' + today + '</b>\n\n' + todayPicks.premium_picks + '\n\n———\n\u{1F512} Private channel. Do not share.\n\u2705 Good luck today!'
      );
      console.log('Premium channel:', premiumResult.ok ? 'OK' : 'FAILED');
    }

    // POST 2 — Crypto signal + all 4 marketing posts to each Asian channel
    for (const [name, ch] of Object.entries(OWN_CHANNELS)) {

      // MARKETING POST 1 — Crypto signal
      if (todayCrypto) {
        const cryptoMsg = '\u{1F4B0} <b>CRYPTO SIGNAL — ' + today + '</b>\n\n' + todayCrypto.free_signal + '\n\n\u{1F916} Powered by FSP AI\n\u{1F4E9} Full premium card: t.me/FreeSportsPicksProBot';
        const translated = await groqTranslate(cryptoMsg, ch.lang);
        const result = await postTG(ch.id, translated);
        console.log(name + ' signal:', result.ok ? 'OK' : 'FAILED');
      }

      // MARKETING POST 2 — Cross promotion (every day)
      const crossPromoEn = '\u{1F310} <b>JOIN ALL FSP CRYPTO CHANNELS</b>\n\nGet free crypto signals in your language every day!\n\n' + channelLinks + '\n\n\u{1F4E9} Premium card with 3-5 signals: t.me/FreeSportsPicksProBot';
      const crossPromoTranslated = await groqTranslate(crossPromoEn, ch.lang);
      await postTG(ch.id, crossPromoTranslated);
      console.log(name + ' cross promo: OK');

      // MARKETING POST 3 — FOMO evening post (every day)
      const fomoEn = '\u23F0 <b>TOMORROW\'S SIGNAL IS GENERATING NOW...</b>\n\nOur AI is scanning the top 10 coins by volume right now.\n\nTomorrow\'s free signal drops at 9AM ET.\n\n\u{1F525} Don\'t miss it — share this channel with 1 trader friend now:\n' + ch.link + '\n\n\u{1F48E} Want 3-5 signals daily? t.me/FreeSportsPicksProBot';
      const fomoTranslated = await groqTranslate(fomoEn, ch.lang);
      await postTG(ch.id, fomoTranslated);
      console.log(name + ' FOMO post: OK');

      // MARKETING POST 4 — Weekly performance recap (Sundays only)
      if (dayOfWeek === 0) {
        const weeklyBest = await getWeeklyBest();
        if (weeklyBest) {
          const weeklyEn = '\u{1F4CA} <b>FSP CRYPTO — BEST SIGNAL THIS WEEK</b>\n\n' + weeklyBest.free_signal + '\n\n\u{1F525} Want signals like this every day?\n\u{1F48E} Premium card: t.me/FreeSportsPicksProBot\n\n\u{1F4E2} Share this channel: ' + ch.link;
          const weeklyTranslated = await groqTranslate(weeklyEn, ch.lang);
          await postTG(ch.id, weeklyTranslated);
          console.log(name + ' weekly recap: OK');
        }
      }

      // Small delay between channels to avoid spam flags
      await new Promise(r => setTimeout(r, 2000));
    }

    return res.status(200).json({ ok: true, date: today });
  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}