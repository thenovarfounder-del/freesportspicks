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
      "FSP Crypto India": { id: "-1004437977246", link: "t.me/fspcryptoindia", lang: "Hindi" }
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

    async function getChatMemberCount(chatId) {
      try {
        const r = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/getChatMemberCount?chat_id=' + chatId);
        const data = await r.json();
        return data.ok ? data.result : 0;
      } catch(e) { return 0; }
    }

    async function runGiveaway(channelId, channelName, channelLang, channelLink) {
      try {
        const alreadyRan = await apiGet(
          SUPABASE_URL + '/rest/v1/giveaway_winners?channel_id=eq.' + channelId + '&announced_at=gte.' + today,
          { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
        );
        if (alreadyRan.length > 0) { console.log(channelName + ' giveaway already ran today'); return; }

        const memberCount = await getChatMemberCount(channelId);
        if (memberCount < 2) { console.log(channelName + ' not enough members for giveaway'); return; }

        const winnerNumber = Math.floor(Math.random() * (memberCount - 1)) + 1;
        const winnerUsername = 'member' + winnerNumber;

        await apiPost(
          SUPABASE_URL + '/rest/v1/giveaway_winners',
          { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY },
          { username: winnerUsername, channel_id: channelId, prize: '1 day premium' }
        );

        const r = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/createChatInviteLink', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: PREMIUM_CHANNEL, member_limit: 1, expire_date: Math.floor(Date.now() / 1000) + 86400 })
        });
        const linkData = await r.json();
        const inviteLink = linkData.result ? linkData.result.invite_link : '';

        const giveawayEn = '🎉 <b>WEEKLY GIVEAWAY WINNER!</b>\n\nCongratulations to our lucky member this week!\n\n🏆 Prize: 1 FREE day of Premium Signals\n💎 3-5 crypto signals daily\n\n' + (inviteLink ? 'Winner — claim your prize here:\n' + inviteLink + '\n\n' : '') + '🔔 Want to win next week? Stay subscribed!\n\n📢 Share this channel: ' + channelLink + '\n\n💎 Or get premium anytime: t.me/FreeSportsPicksProBot';

        const translated = await groqTranslate(giveawayEn, channelLang);
        await postTG(channelId, translated);
        console.log(channelName + ' giveaway posted');
      } catch(e) { console.log('Giveaway error:', e.message); }
    }

    async function getWeeklyBest() {
      const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const data = await apiGet(
        SUPABASE_URL + '/rest/v1/crypto_signals?date=gte.' + weekAgo + '&result=eq.win&order=created_at.desc&limit=1',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      );
      if (data && data[0]) return data[0];
      const all = await apiGet(
        SUPABASE_URL + '/rest/v1/crypto_signals?date=gte.' + weekAgo + '&order=created_at.desc&limit=1',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      );
      return all && all[0] ? all[0] : null;
    }

    const channelLinks = Object.entries(OWN_CHANNELS)
      .map(([name, ch]) => '👉 ' + ch.link)
      .join('\n');

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

    // POST 1 — Morning hype countdown to free channel (30 min before signal)
    const hypeMsg = '⚡ <b>SIGNAL DROPPING IN 30 MINUTES</b>\n\nOur AI just finished scanning the top 10 coins by volume.\n\nToday\'s free crypto signal posts at 9AM ET.\n\n🔥 Share this channel with 1 trader friend right now so they don\'t miss it:\nt.me/freesportspickspro\n\n💎 Want the full premium card with 3-5 signals? t.me/FreeSportsPicksProBot';
    await postTG(FREE_CHANNEL, hypeMsg);
    console.log('Free channel hype: OK');

    // POST 2 — Sports pick to free + premium channels
    if (todayPicks) {
      const freeResult = await postTG(FREE_CHANNEL,
        '🏆 <b>FREE PICK IS READY — ' + today + '</b>\n\n🔒 Today\'s pick is locked.\n\nVisit freesportspicks.pro, sign the guestbook and unlock today\'s free pick instantly.\n\n💎 Want the full premium card?\nTap /premium to get access.'
      );
      console.log('Free channel pick:', freeResult.ok ? 'OK' : 'FAILED');

      const premiumResult = await postTG(PREMIUM_CHANNEL,
        '💎 <b>FSP PREMIUM CARD — ' + today + '</b>\n\n' + todayPicks.premium_picks + '\n\n———\n🔒 Private channel. Do not share.\n✅ Good luck today!'
      );
      console.log('Premium channel:', premiumResult.ok ? 'OK' : 'FAILED');
    }

    // POST 3 — All posts to each Asian channel
    for (const [name, ch] of Object.entries(OWN_CHANNELS)) {

      // Morning hype in local language
      const hypeEn = '⚡ <b>SIGNAL DROPPING IN 30 MINUTES</b>\n\nOur AI just finished scanning the top 10 coins by volume.\n\nFree crypto signal posts at 9AM ET.\n\n🔥 Share this channel with 1 trader friend:\n' + ch.link + '\n\n💎 Full premium card: t.me/FreeSportsPicksProBot';
      const hypeTranslated = await groqTranslate(hypeEn, ch.lang);
      await postTG(ch.id, hypeTranslated);
      console.log(name + ' hype: OK');

      // Crypto signal
      if (todayCrypto) {
        const cryptoMsg = '💰 <b>CRYPTO SIGNAL — ' + today + '</b>\n\n' + todayCrypto.free_signal + '\n\n🤖 Powered by FSP AI\n📩 Full premium card: t.me/FreeSportsPicksProBot';
        const translated = await groqTranslate(cryptoMsg, ch.lang);
        const result = await postTG(ch.id, translated);
        console.log(name + ' signal:', result.ok ? 'OK' : 'FAILED');
      }

      // Cross promotion
      const crossPromoEn = '🌐 <b>JOIN ALL FSP CRYPTO CHANNELS</b>\n\nGet free crypto signals in your language every day!\n\n' + channelLinks + '\n\n📩 Premium card with 3-5 signals: t.me/FreeSportsPicksProBot';
      const crossPromoTranslated = await groqTranslate(crossPromoEn, ch.lang);
      await postTG(ch.id, crossPromoTranslated);
      console.log(name + ' cross promo: OK');

      // FOMO post
      const fomoEn = '⏰ <b>TOMORROW\'S SIGNAL IS GENERATING NOW...</b>\n\nOur AI is scanning the top 10 coins by volume right now.\n\nTomorrow\'s free signal drops at 9AM ET.\n\n🔥 Don\'t miss it — share this channel with 1 trader friend now:\n' + ch.link + '\n\n💎 Want 3-5 signals daily? t.me/FreeSportsPicksProBot';
      const fomoTranslated = await groqTranslate(fomoEn, ch.lang);
      await postTG(ch.id, fomoTranslated);
      console.log(name + ' FOMO: OK');

      // Sunday giveaway
      if (dayOfWeek === 0) {
        await runGiveaway(ch.id, name, ch.lang, ch.link);
      }

      // Sunday weekly recap
      if (dayOfWeek === 0) {
        const weeklyBest = await getWeeklyBest();
        if (weeklyBest) {
          const weeklyEn = '📊 <b>FSP CRYPTO — BEST SIGNAL THIS WEEK</b>\n\n' + weeklyBest.free_signal + '\n\n🔥 Want signals like this every day?\n💎 Premium card: t.me/FreeSportsPicksProBot\n\n📢 Share this channel: ' + ch.link;
          const weeklyTranslated = await groqTranslate(weeklyEn, ch.lang);
          await postTG(ch.id, weeklyTranslated);
          console.log(name + ' weekly recap: OK');
        }
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    return res.status(200).json({ ok: true, date: today });
  } catch(e) {
    console.error('Post error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}