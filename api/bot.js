export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TON_WALLET = process.env.TON_WALLET_ADDRESS;

  const { message } = req.body;
  if (!message) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = (message.text || '').toLowerCase().trim();

  async function sendMessage(chat, msg, keyboard) {
    const body = { chat_id: chat, text: msg, parse_mode: 'HTML' };
    if (keyboard) body.reply_markup = { inline_keyboard: keyboard };
    await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }

  if (text === '/start' || text === '/help') {
    await sendMessage(chatId,
      '<b>Welcome to FreeSportsPicks Pro!</b>\n\n' +
      'Your edge in sports betting starts here.\n\n' +
      'Free pick - Get today\'s free pick\n' +
      'Premium - Unlock full card for $5.99\n' +
      'Visit freesportspicks.pro for more',
      [[{ text: 'Free Pick', callback_data: 'freepick' }, { text: 'Premium $5.99', callback_data: 'premium' }]]
    );
  } else if (text === '/freepick') {
    await sendMessage(chatId,
      '<b>Today\'s Free Pick</b>\n\n' +
      'Check our channel: t.me/freesportspickspro\n\n' +
      'Want the full card? Use /premium',
      [[{ text: 'Get Full Card $5.99', callback_data: 'premium' }]]
    );
  } else if (text === '/premium') {
    await sendMessage(chatId,
      '<b>Premium Full Card - $5.99/day</b>\n\n' +
      'Get ALL picks for today\n' +
      'NFL/NBA/MLB/NHL picks\n' +
      'Best bets of the day\n\n' +
      '<b>Pay with TON:</b>\n' +
      TON_WALLET + '\n\n' +
      'Send exactly 1.5 TON and reply with your transaction hash.',
      [[{ text: 'I Sent Payment', callback_data: 'verify' }]]
    );
  } else {
    await sendMessage(chatId, 'Use /freepick for free pick or /premium for full card.');
  }

  return res.status(200).json({ ok: true });
}