export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('FSP Post - Date:', today);
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';

    const OWN_CHANNELS = {
      "FSP Crypto Vietnam": "-1003945068539",
      "FSP Crypto Philippines": "-1003904361668",
      "FSP Crypto Indonesia": "-1003774895679",
      "FSP Crypto Thailand": "-1004338838208",
      "FSP Crypto Malaysia": "-1003978299451",
      "FSP Crypto Myanmar": "-1003868180038",
      "FSP Crypto Cambodia": "-1004440862289"
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

    // Post sports pick to free channel
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

    // Post crypto signal to all Asian channels
    if (todayCrypto) {
      const cryptoMsg = '\u{1F4B0} <b>CRYPTO SIGNAL — ' + today + '</b>\n\n' + todayCrypto.free_signal + '\n\n\u{1F916} Powered by FSP AI\n\u{1F4E9} Premium card: t.me/FreeSportsPicksProBot';
      
      for (const [name, id] of Object.entries(OWN_CHANNELS)) {
        const result = await postTG(id, cryptoMsg);
        console.log(name + ':', result.ok ? 'OK' : 'FAILED - ' + JSON.stringify(result));
      }
    } else {
      console.log('No crypto signals found for today');
    }

    return res.status(200).json({ ok: true, date: today });
  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}