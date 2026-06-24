export default async function handler(req, res) {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    console.log('FSP Evening Post - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';

    const OWN_CHANNELS = {
      "FSP Crypto Vietnam": { id: "-1003945068539", link: "t.me/fspcryptovietnam", lang: "Vietnamese" },
      "FSP Crypto Philippines": { id: "-1003904361668", link: "t.me/fspcryptophilippines", lang: "Filipino" },
      "FSP Crypto Indonesia": { id: "-1003774895679", link: "t.me/fspcryptoindonesia", lang: "Indonesian" },
      "FSP Crypto Thailand": { id: "-1004338838208", link: "t.me/fspcryptothailand", lang: "Thai" },
      "FSP Crypto Malaysia": { id: "-1003978299451", link: "t.me/fspcryptomalaysia", lang: "Malay" },
      "FSP Crypto Myanmar": { id: "-1003868180038", link: "t.me/fspcryptomyanmar", lang: "Burmese" },
      "FSP Crypto Cambodia": { id: "-1004440862289", link: "t.me/fspcryptocambodia", lang: "Khmer" }
    };

    async function postTG(chatId, message) {
      await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
      });
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

    // Evening FOMO post to free channel
    await postTG(FREE_CHANNEL,
      '⏰ <b>TOMORROW\'S SIGNAL GENERATES IN A FEW HOURS...</b>\n\nOur AI scans the top 10 coins by volume at 1AM ET.\n\nTomorrow\'s free signal drops at 9AM ET.\n\n🔥 Share freesportspicks.pro with 1 friend tonight.\n\n💎 Go premium for 3-5 signals daily: t.me/FreeSportsPicksProBot'
    );
    console.log('Free channel evening post: OK');

    // Evening FOMO to all Asian channels in local language
    for (const [name, ch] of Object.entries(OWN_CHANNELS)) {
      const fomoEn = '⏰ <b>TOMORROW\'S CRYPTO SIGNAL GENERATES TONIGHT...</b>\n\nOur AI is about to scan the top 10 coins by volume.\n\nTomorrow\'s free signal drops at 9AM ET.\n\n🔥 Don\'t miss it — share this channel with 1 trader friend right now:\n' + ch.link + '\n\n💎 Want 3-5 signals daily? t.me/FreeSportsPicksProBot';
      const translated = await groqTranslate(fomoEn, ch.lang);
      await postTG(ch.id, translated);
      console.log(name + ' evening FOMO: OK');
      await new Promise(r => setTimeout(r, 2000));
    }

    return res.status(200).json({ ok: true, date: today });
  } catch(e) {
    console.error('Evening post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}