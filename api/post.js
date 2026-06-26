export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    console.log('FSP Post - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';
    const SUPABASE_URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';

    const OWN_CHANNELS = {
      "FSP Crypto Vietnam": { id: "-1003945068539", link: "t.me/fspcryptovietnam", lang: "Vietnamese" },
      "FSP Crypto Philippines": { id: "-1003904361668", link: "t.me/fspcryptophilippines", lang: "Filipino" },
      "FSP Crypto Indonesia": { id: "-1003774895679", link: "t.me/fspcryptoindonesia", lang: "Indonesian" },
      "FSP Crypto Thailand": { id: "-1004338838208", link: "t.me/fspcryptothailand", lang: "Thai" },
      "FSP Crypto Malaysia": { id: "-1003978299451", link: "t.me/fspcryptomalaysia", lang: "Malay" },
      "FSP Crypto Myanmar": { id: "-1003868180038", link: "t.me/fspcryptomyanmar", lang: "Burmese" },
      "FSP Crypto Cambodia": { id: "-1004440862289", link: "t.me/fspcryptocambodia", lang: "Khmer" },
      "FSP Crypto Hong Kong": { id: "-1004421194036", link: "t.me/fspcryptohongkong", lang: "Cantonese" },
      "FSP Crypto Singapore": { id: "-1004385446236", link: "t.me/fspcryptosingapore", lang: "English" },
      "FSP Crypto South Korea": { id: "-1004305304607", link: "t.me/fspcryptosouthkorea", lang: "Korean" },
      "FSP Crypto Japan": { id: "-1004356903238", link: "t.me/fspcryptojapan", lang: "Japanese" },
      "FSP Crypto Taiwan": { id: "-1004384761881", link: "t.me/fspcryptotaiwan", lang: "Mandarin" },
      "FSP Crypto Macau": { id: "-1004351616026", link: "t.me/fspcryptomacau", lang: "Cantonese" },
      "FSP Crypto India": { id: "-1004437977246", link: "t.me/fspcryptoindia", lang: "Hindi" },
      "FSP Crypto Sri Lanka": { id: "-1003926907809", link: "t.me/fspcryptosrilanka", lang: "Sinhala" },
      "FSP Crypto Nepal": { id: "-1003906546084", link: "t.me/fspcryptonepal", lang: "Nepali" },
      "FSP Crypto Kazakhstan": { id: "-1004315496099", link: "t.me/fspcryptokazakhstan", lang: "Kazakh" },
      "FSP Crypto Russia": { id: "-1004312236522", link: "t.me/fspcryptorussia", lang: "Russian" },
      "FSP Crypto Turkey": { id: "-1003973361171", link: "t.me/fspcryptoturkey", lang: "Turkish" }
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
      if (language === 'English') return text;
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
      SUPABASE_URL + '/rest/v1/daily_picks?date=eq.' + today + '&limit=1',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );
    const todayPicks = picks && picks[0] ? picks[0] : null;

    const cryptoData = await apiGet(
      SUPABASE_URL + '/rest/v1/crypto_signals?date=eq.' + today + '&limit=1',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );
    const todayCrypto = cryptoData && cryptoData[0] ? cryptoData[0] : null;

    // POST to free channel
    await postTG(FREE_CHANNEL, 'FSP SIGNAL READY\n\nToday\'s free crypto signal is live.\n\nVisit freesportspicks.pro to unlock it.\n\nWant 3-5 signals daily? t.me/FreeSportsPicksProBot');
    console.log('Free channel: OK');

    // POST to premium channel
    if (todayPicks) {
      const premiumResult = await postTG(PREMIUM_CHANNEL,
        'FSP PREMIUM CARD - ' + today + '\n\n' + todayPicks.premium_picks + '\n\nPrivate channel. Do not share.\nGood luck today!'
      );
      console.log('Premium channel:', premiumResult.ok ? 'OK' : 'FAILED');
    }

    // POST crypto signal to premium channel
    if (todayCrypto) {
      const premiumCrypto = await postTG(PREMIUM_CHANNEL,
        'FSP PREMIUM CRYPTO - ' + today + '\n\n' + (todayCrypto.premium_signals || todayCrypto.free_signal) + '\n\nNot financial advice. DYOR.'
      );
      console.log('Premium crypto:', premiumCrypto.ok ? 'OK' : 'FAILED');
    }

    // Build translation cache by language to avoid duplicate Groq calls
    const translationCache = {};
    async function getTranslated(text, lang) {
      const key = lang + '::' + text.substring(0, 30);
      if (!translationCache[key]) {
        translationCache[key] = await groqTranslate(text, lang);
      }
      return translationCache[key];
    }

    // POST to each own channel - signal only, one translation per channel
    for (const [name, ch] of Object.entries(OWN_CHANNELS)) {
      if (todayCrypto) {
        const cryptoMsgEn = 'FSP CRYPTO SIGNAL - ' + today + '\n\n' + todayCrypto.free_signal + '\n\nFull premium card: t.me/FreeSportsPicksProBot\nJoin: ' + ch.link;
        const translated = await getTranslated(cryptoMsgEn, ch.lang);
        const result = await postTG(ch.id, translated);
        console.log(name + ' signal:', result.ok ? 'OK' : 'FAILED');
      } else {
        const noSignalEn = 'FSP CRYPTO\n\nFree signal coming soon. Visit freesportspicks.pro\n\nJoin: ' + ch.link;
        const translated = await getTranslated(noSignalEn, ch.lang);
        await postTG(ch.id, translated);
        console.log(name + ' no signal posted');
      }
      await new Promise(r => setTimeout(r, 500));
    }

    return res.status(200).json({ ok: true, date: today });
  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}
