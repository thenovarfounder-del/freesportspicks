
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const data = await fetch(
      SUPABASE_URL + '/rest/v1/sportspicks_leads?last_active=lte.' + sevenDaysAgo + '&select=telegram_id',
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
    ).then(r => r.json());

    const msg = '👋 Still with us?\n\nToday\'s free crypto signal is ready and waiting.\n\n🌐 freesportspicks.pro\n💸 Full card: t.me/FreeSportsPicksProBot';

    let sent = 0;
    if(data && data.length) {
      for(const lead of data) {
        if(lead.telegram_id) {
          try {
            await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: lead.telegram_id, text: msg, parse_mode: 'HTML' })
            });
            sent++;
          } catch(e) {}
        }
      }
    }
    res.status(200).json({ success: true, sent });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
