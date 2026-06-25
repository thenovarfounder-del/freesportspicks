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
    const GROQ_KEY = process.env.GROQ_KEY;

    const ASIAN_CHANNELS = {
      '-1003945068539': { name: 'FSP Crypto Vietnam', language: 'Vietnamese', link: 'https://t.me/fspcryptovietnam' },
      '-1003904361668': { name: 'FSP Crypto Philippines', language: 'Filipino/Tagalog', link: 'https://t.me/fspcryptophilippines' },
      '-1003774895679': { name: 'FSP Crypto Indonesia', language: 'Indonesian (Bahasa)', link: 'https://t.me/fspcryptoindonesia' },
      '-1004338838208': { name: 'FSP Crypto Thailand', language: 'Thai', link: 'https://t.me/fspcryptothailand' },
      '-1003978299451': { name: 'FSP Crypto Malaysia', language: 'Malay', link: 'https://t.me/fspcryptomalaysia' },
      '-1003868180038': { name: 'FSP Crypto Myanmar', language: 'Burmese', link: 'https://t.me/fspcryptomyanmar' },
      '-1004440862289': { name: 'FSP Crypto Cambodia', language: 'Khmer', link: 'https://t.me/fspcryptocambodia' },
        '-1004421194036': { name: 'FSP Crypto Hong Kong', language: 'Cantonese', link: 'https://t.me/fspcryptohongkong' },
        '-1004385446236': { name: 'FSP Crypto Singapore', language: 'English', link: 'https://t.me/fspcryptosingapore' },
        '-1004305304607': { name: 'FSP Crypto South Korea', language: 'Korean', link: 'https://t.me/fspcryptosouthkorea' },
        '-1004356903238': { name: 'FSP Crypto Japan', language: 'Japanese', link: 'https://t.me/fspcryptojapan' },
        '-1004384761881': { name: 'FSP Crypto Taiwan', language: 'Mandarin', link: 'https://t.me/fspcryptotaiwan' },
        '-1004351616026': { name: 'FSP Crypto Macau', language: 'Cantonese', link: 'https://t.me/fspcryptomacau' },
        '-1004437977246': { name: 'FSP Crypto India', language: 'Hindi', link: 'https://t.me/fspcryptoindia' },
        '-1004452301597': { name: 'FSP Crypto Pakistan', language: 'Urdu', link: 'https://t.me/fspcryptopakistan' },
        '-1004380997518': { name: 'FSP Crypto Bangladesh', language: 'Bengali', link: 'https://t.me/fspcryptobangladesh' },
        '-1003926907809': { name: 'FSP Crypto Sri Lanka', language: 'Sinhala', link: 'https://t.me/fspcryptosrilanka' },
        '-1003906546084': { name: 'FSP Crypto Nepal', language: 'Nepali', link: 'https://t.me/fspcryptonepal' },
        '-1004315496099': { name: 'FSP Crypto Kazakhstan', language: 'Kazakh', link: 'https://t.me/fspcryptokazakhstan' }
    };

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
            await checkAndRewardReferrer(tgUsername);
            return { txHash, tgUsername };
          }
        }
        return null;
      } catch(e) { return null; }
    }

    async function trackReferral(referrerUsername, referredUsername) {
      try {
        const check = await fetch(SUPABASE_URL + '/rest/v1/referrals?referred_username=eq.' + referredUsername, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const existing = await check.json();
        if (existing.length > 0) return;
        await fetch(SUPABASE_URL + '/rest/v1/referrals', {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ referrer_username: referrerUsername, referred_username: referredUsername })
        });
        console.log('Referral tracked: ' + referrerUsername + ' referred ' + referredUsername);
      } catch(e) { console.log('Referral track error:', e); }
    }

    async function checkAndRewardReferrer(paidUsername) {
      try {
        const r = await fetch(SUPABASE_URL + '/rest/v1/referrals?referred_username=eq.' + paidUsername + '&rewarded=eq.false', {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const refs = await r.json();
        if (!refs.length) return;
        const referrer = refs[0].referrer_username;
        const allRefs = await fetch(SUPABASE_URL + '/rest/v1/referrals?referrer_username=eq.' + referrer, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const allRefsJson = await allRefs.json();
        const paidRefs = allRefsJson.filter(r => !r.rewarded).length;
        if (paidRefs >= 3) {
          await fetch(SUPABASE_URL + '/rest/v1/referrals?referrer_username=eq.' + referrer + '&rewarded=eq.false', {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ rewarded: true })
          });
          const inviteLink = await createInviteLink();
          if (inviteLink) {
            await sendMessage('@' + referrer,
              '🎉 <b>FREE DAY EARNED!</b>\n\nYou referred 3 paying members!\n\nYour FREE premium access link:\n' + inviteLink + '\n\nKeep referring — every 3 pays = 1 free day!\n\n/refer to get your link again'
            );
          }
        }
      } catch(e) { console.log('Reward error:', e); }
    }

    async function getReferralCount(username) {
      try {
        const r = await fetch(SUPABASE_URL + '/rest/v1/referrals?referrer_username=eq.' + username, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const refs = await r.json();
        return refs.length;
      } catch(e) { return 0; }
    }

    const PREMIUM_MSG = (username, TON_WALLET, USDT_WALLET) =>
      '<b>🔑 FSP Premium — Sports Picks + Crypto Signals</b>\n\n' +
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
      const firstName = member.new_chat_member ? member.new_chat_member.user.first_name || 'Friend' : 'Friend';
      const newUsername = member.new_chat_member ? member.new_chat_member.user.username || '' : '';
      const inviteLink = member.invite_link ? member.invite_link.invite_link || '' : '';

      if (inviteLink && inviteLink.includes('?start=ref_') && newUsername) {
        const referrerUsername = inviteLink.split('ref_')[1];
        if (referrerUsername && referrerUsername !== newUsername) {
          await trackReferral(referrerUsername, newUsername);
        }
      }

      if (chatId === FREE_CHANNEL && newStatus === 'member' && userId) {
        await sendMessage(userId,
          '<b>Welcome to FreeSportsPicks Pro!</b>\n\nToday\'s free pick is ready and waiting for you.\n\n🏅 Unlock it here: freesportspicks.pro\n\n💎 Want the full premium card with 3-5 picks?\nType /premium and get access today.',
          [[{ text: 'Get Free Pick', url: 'https://freesportspicks.pro' }, { text: 'Premium $5.99', callback_data: 'premium' }]]
        );
      }

      if (ASIAN_CHANNELS[chatId] && newStatus === 'member' && userId) {
        const channel = ASIAN_CHANNELS[chatId];
        const today = new Date().toISOString().split('T')[0];
        const cryptoData = await fetch('https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/crypto_signals?date=eq.' + today + '&limit=1', {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const cryptoJson = await cryptoData.json();
        const signal = cryptoJson && cryptoJson[0] ? cryptoJson[0].free_signal : 'Signal generating soon. Check back at 9AM ET.';
        const englishMsg = 'Welcome ' + firstName + ' to ' + channel.name + '!\n\nToday\'s FREE crypto signal:\n\n' + signal + '\n\nWant the FULL premium card with 3-5 signals daily?\n👉 t.me/FreeSportsPicksProBot\n\n📢 Share this channel with 1 trader friend:\n' + channel.link;
        const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_KEY },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: 'Translate this EXACTLY to ' + channel.language + '. Keep all numbers, prices, links, and usernames exactly as they are. Only translate the words:\n\n' + englishMsg }],
            max_tokens: 500
          })
        });
        const groqJson = await groqResp.json();
        const translatedMsg = groqJson.choices && groqJson.choices[0] ? groqJson.choices[0].message.content : englishMsg;
        await sendMessage(userId, translatedMsg, [[{ text: '💎 Premium Access', callback_data: 'premium' }]]);
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
          await sendMessage(chatId, 'This payment was already used. Send a new payment for today.');
        } else if (result) {
          const inviteLink = await createInviteLink();
          if (inviteLink) {
            await sendMessage(chatId, '<b>Payment confirmed!</b>\n\nYour private invite link:\n' + inviteLink + '\n\nClick it now. Works once, expires in 24 hours.\n\n⚡ Your access expires in 24 hours. Pay again tomorrow for the next card.');
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
        '<b>Welcome to FreeSportsPicks Pro!</b>\n\nYour edge in sports betting starts here.\n\n/freepick - Unlock today\'s free pick\n/premium - Get full card $5.99/day\n/refer - Get your referral link\n\nPicks posted every morning at 8AM Eastern.',
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
    } else if (text === '/refer') {
      if (!username) {
        await sendMessage(chatId, 'You need a Telegram username to get a referral link. Set one in Settings and try again.');
      } else {
        const count = await getReferralCount(username);
        const needed = Math.max(0, 3 - (count % 3));
        await sendMessage(chatId,
          '🔗 <b>YOUR REFERRAL LINK</b>\n\nhttps://t.me/FreeSportsPicksProBot?start=ref_' + username + '\n\n📊 Your stats:\nTotal referrals: <b>' + count + '</b>\nUntil next free day: <b>' + needed + ' more</b>\n\n💡 Share this link with traders. When 3 of them pay for premium — you get 1 FREE day automatically!\n\n🏆 Every 3 paying referrals = 1 free premium day. No limit!'
        );
      }
    } else if (text === '/signal') {
      const today = new Date().toISOString().split('T')[0];
      try {
        const r = await fetch(SUPABASE_URL + '/rest/v1/crypto_signals?date=eq.' + today + '&limit=1', {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        });
        const data = await r.json();
        if (data && data[0] && data[0].free_signal) {
          await sendMessage(chatId,
            '💰 <b>TODAY\'S CRYPTO SIGNAL</b>\n\n' + data[0].free_signal + '\n\n🤖 Powered by FSP AI\n💎 Full premium card: /premium'
          );
        } else {
          await sendMessage(chatId, '⏰ Today\'s signal is generating now. Check back at 9AM ET.\n\n💎 Full premium card: /premium');
        }
      } catch(e) {
        await sendMessage(chatId, 'Signal not available right now. Check back at 9AM ET.');
      }
    } else {
      await sendMessage(chatId, 'Use /freepick for today\'s free pick, /premium to unlock the full card, /signal for today\'s crypto signal, or /refer to earn free days.');
    }

    return res.status(200).json({ ok: true });
  } catch(e) {
    console.error('Bot error:', e);
    return res.status(200).json({ ok: true });
  }
}