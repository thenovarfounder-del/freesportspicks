export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TON_WALLET = process.env.TON_WALLET_ADDRESS;
    const USDT_WALLET = 'TSq5g6gtJhBxKctXzVa59yKrbsecrJmamb';
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const PREMIUM_CHANNEL = process.env.PREMIUM_CHANNEL_ID;
    const FREE_CHANNEL = '-1004292743858';

    async function sendMessage(chat, msg, keyboard) {
      const body = { chat_id: chat, text: msg, parse_mode: 'HTML' };
      if (keyboard) body.reply_markup = { inline_keyboard: keyboard };
      await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    }

    async function createInviteLink() {
      const r = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/createChatInviteLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: PREMIUM_CHANNEL, member_limit: 1, expire_date: Math.floor(Date.now() / 1000) + 86400 })
      });
      const data = await r.json();
      return data.result ? data.result.invite_link : null;
    }

    async function checkTonPayment(tgUsername) {
      try {
        const url = 'https://toncenter.com/api/v2/getTransactions?address=' + TON_WALLET + '&limit=20';
        const r = await fetch(url);
        const data = await r.json();
        if (!data.result) return null;
        const cutoff = Math.floor(Date.now() / 1000) - 3600;
        for (const tx of data.result) {
          if (tx.utime < cutoff) continue;
          const amount = parseInt(tx.in_msg && tx.in_msg.value ? tx.in_msg.value : 0) / 1e9;
          if (amount < 1.4 || amount > 1.6) continue;
          const comment = tx.in_msg && tx.in_msg.message ? tx.in_msg.message : '';
          if (comment.toLowerCase().includes(tgUsername.toLowerCase())) {
            const txHash = tx.transaction_id ? tx.transaction_id.hash : tx.utime.toString();
            const check = await fetch(SUPABASE_URL + '/rest/v1/ton_payments?tx_hash=eq.' + txHash, {
              headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
            });
            const existing = await check.json();
            if (existing.length > 0) return 'already_used';
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
            await fetch(SUPABASE_URL + '/rest/v1/ton_payments', {
              method: 'POST',
              headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({ tx_hash: txHash, amount, tg_username: tgUsername, status: 'confirmed', expires_at: expiresAt })
            });
            return { txHash, tgUsername };
          }
        }
        return null;
      } catch(e) { return null; }
    }

    const PREMIUM_MSG = (username, TON_WALLET, USDT_WALLET) =>
      '<b>🔥 FSP Premium — Sports Picks + Crypto Signals</b>\n\n' +
      '<b>DAILY — $5.99</b>\n' +
      'TON: <code>1.5 TON</code> → <code>' + TON_WALLET + '</code>\n' +
      'USDT: <code>$5.99</code> → <code>' + USDT_WALLET + '</code>\n\n' +
      '<b>WEEKLY — $19.99</b>\n' +
      'TON: <code>5 TON</code> → <code>' + TON_WALLET + '</code>\n' +
      'USDT: <code>$19.99</code> → <code>' + USDT_WALLET + '</code>\n\n' +
      '<b>MONTHLY — $59.99</b>\n' +
      'TON: <code>15 TON</code> → <code>' + TON_WALLET + '</code>\n' +
      'USDT: <code>$59.99</code> → <code>' + USDT_WALLET + '</code>\n\n' +
      '📝 Memo: <b>@' + (username || 'yourusername') + '</b>\n\n' +
      'Tap below after sending:';

    const body = req.body;
    const callback_query = body.callback_query;
    const message = body.message;

    if (body.chat_member) {
      const member = body.chat_member;
      const chatId = member.chat ? member.chat.id.toString() : '';
      const newStatus = member.new_chat_member ? member.new_chat_member.status : '';
      const userId = member.new_chat_member ? member.new_chat_member.user.id : null;

      if (chatId === FREE_CHANNEL && newStatus === 'member' && userId) {
        await sendMessage(userId,
          '<b>Welcome to FreeSportsPicks Pro!</b>\n\nToday\'s free pick is ready and waiting for you.\n\n≡ƒåô Unlock it here: freesportspicks.pro\n\n≡ƒÆÄ Want the full premium card with 3-5 picks?\nType /premium and get access today.',
          [[{ text: 'Get Free Pick', url: 'https://freesportspicks.pro' }, { text: 'Premium $5.99', callback_data: 'premium' }]]
        );
      }
      return res.status(200).json({ ok: true });
    }

    if (callback_query) {
      const chatId = callback_query.message.chat.id;
      const username = callback_query.from.username || '';
      const data = callback_query.data;

      await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/answerCallbackQuery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callback_query.id })
      });

      if (data === 'verify') {
        if (!username) {
          await sendMessage(chatId, 'You need a Telegram username to verify. Set one in Settings and try again.');
          return res.status(200).json({ ok: true });
        }
        await sendMessage(chatId, 'Checking payment for @' + username + '... please wait.');
        const result = await checkTonPayment(username);
        if (result === 'already_used') {
          await sendMessage(chatId, 'This payment was already used. Send a new 1.5 TON payment for today.');
        } else if (result) {
          const inviteLink = await createInviteLink();
          if (inviteLink) {
            await sendMessage(chatId, '<b>Payment confirmed!</b>\n\nYour private invite link:\n' + inviteLink + '\n\nClick it now. Works once, expires in 24 hours.\n\nΓÜá∩╕Å Your access expires in 24 hours. Pay again tomorrow for the next card.');
          } else {
            await sendMessage(chatId, 'Payment confirmed! Invite link failed. Please contact support.');
          }
        } else {
          await sendMessage(chatId, 'Payment not found. Make sure you:\n1. Sent exact amount\n2. Put @' + username + ' in the memo field\n\nWait 60 seconds and try again.',
            [[{ text: 'Check Again', callback_data: 'verify' }]]
          );
        }
      }

      if (data === 'freepick') {
        await sendMessage(chatId, '<b>Today\'s Free Pick</b>\n\nVisit freesportspicks.pro and sign the guestbook to unlock today\'s free pick.',
          [[{ text: 'Get Free Pick', url: 'https://freesportspicks.pro' }]]
        );
      }

      if (data === 'premium') {
        await sendMessage(chatId, PREMIUM_MSG(username, TON_WALLET, USDT_WALLET),
          [[{ text: 'I Sent Payment', callback_data: 'verify' }]]
        );
      }

      return res.status(200).json({ ok: true });
    }

    if (!message) return res.status(200).json({ ok: true });

    const chatId = message.chat.id;
    const username = message.from ? message.from.username || '' : '';
    const text = (message.text || '').toLowerCase().trim();

    if (text === '/start' || text === '/help') {
      await sendMessage(chatId,
        '<b>Welcome to FreeSportsPicks Pro!</b>\n\nYour edge in sports betting starts here.\n\n/freepick - Unlock today\'s free pick\n/premium - Get full card $5.99/day\n\nPicks posted every morning at 8AM Eastern.',
        [[{ text: 'Free Pick', callback_data: 'freepick' }, { text: 'Premium $5.99', callback_data: 'premium' }]]
      );
    } else if (text === '/freepick') {
      await sendMessage(chatId,
        '<b>Today\'s Free Pick</b>\n\nVisit freesportspicks.pro and sign the guestbook to unlock today\'s free pick.',
        [[{ text: 'Get Free Pick', url: 'https://freesportspicks.pro' }]]
      );
    } else if (text === '/premium') {
      await sendMessage(chatId, PREMIUM_MSG(username, TON_WALLET, USDT_WALLET),
        [[{ text: 'I Sent Payment', callback_data: 'verify' }]]
      );
    } else {
      await sendMessage(chatId, 'Use /freepick for today\'s free pick or /premium to unlock the full card.');
    }

    return res.status(200).json({ ok: true });
  } catch(e) {
    console.error('Bot error:', e);
    return res.status(200).json({ ok: true });
  }
}