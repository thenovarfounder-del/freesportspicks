
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const ALL_CHANNELS = [
  '-1003945068539','-1003904361668','-1003774895679','-1004338838208',
  '-1003978299451','-1003868180038','-1004440862289','-1004292743858',
  '-1004421194036','-1004385446236','-1004305304607','-1004356903238',
  '-1004384761881','-1004351616026','-1004437977246','-1004452301597',
  '-1004380997518','-1003926907809','-1003906546084','-1004315496099'
];

async function postTG(chatId, message) {
  await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
  });
}

async function apiGet(url, headers) {
  const r = await fetch(url, { headers });
  return r.json();
}

export default async function handler(req, res) {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const data = await apiGet(
      SUPABASE_URL + '/rest/v1/crypto_signals?date=gte.' + weekAgo + '&order=created_at.desc',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );
    
    const wins = data.filter(s => s.result === 'WIN').length;
    const losses = data.filter(s => s.result === 'LOSS').length;
    const total = wins + losses;
    const winRate = total > 0 ? Math.round(wins / total * 100) : 0;
    
    let trophy = winRate >= 60 ? '🏆' : winRate >= 50 ? '💪' : '📊';
    let msg = trophy + ' <b>FSP Weekly Recap</b>\n\n';
    msg += '✅ Wins: <b>' + wins + '</b>\n';
    msg += '❌ Losses: <b>' + losses + '</b>\n';
    msg += '📊 Win Rate: <b>' + winRate + '%</b>\n\n';
    msg += '💎 Want the full daily card?\n';
    msg += 'Join VIP → @FSPPremiumPicks\n\n';
    msg += '🌐 FreeSportsPicks.Pro';
    
    for(const channelId of ALL_CHANNELS) {
      try { await postTG(channelId, msg); } catch(e) {}
    }
    
    res.status(200).json({ success: true, wins, losses, winRate });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
