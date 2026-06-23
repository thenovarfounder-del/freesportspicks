export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('FSP Post Picks - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';

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

    // OWN LANGUAGE CHANNELS - ADD IDs HERE AS YOU CREATE THEM
    const OWN_CHANNELS = {
  "FSP Crypto Vietnam": "-1003945068539",
  "FSP Crypto Philippines": "-1003904361668",
  "FSP Crypto Indonesia": "-1003774895679",
  "FSP Crypto Thailand": "-1004338838208",
  "FSP Crypto Malaysia": "-1003978299451",
  "FSP Crypto Myanmar": "-1003868180038",
  "FSP Crypto Cambodia": "-1004440862289",
      // Format: 'Channel Name': 'channel_id'
      // Add each new channel ID here after creating it in Telegram
      // Example: 'FSP Crypto Vietnam': '-1001234567890',
    };

    console.log('Own channels ready for:', Object.keys(OWN_CHANNELS).length, 'channels');
    console.log('DONE - Posts sent to free and premium channels!');

    return res.status(200).json({ 
      ok: true, 
      date: today, 
      free_channel: freeResult.ok,
      premium_channel: premiumResult.ok
    });

  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}