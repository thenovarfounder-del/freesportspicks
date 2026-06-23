export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getUTCHours();
    const easternHour = (hour - 4 + 24) % 24;

    console.log('FSP Cron running - Date:', today, 'Eastern hour:', easternHour);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const FREE_CHANNEL = '-1004292743858';
    const PREMIUM_CHANNEL = '-1004296241315';

    const LANGUAGE_GROUPS = {
      en: ['-1003046940406','-1001521913892','-1001059500837','-1001660625132','-1001364392463','-1002106350595','-1001410288757','-1003608894174','-1002298915392','-1001238236676'],
      zh: ['-1002104091566','-1001480765102'],
      vi: ['-1001183388302'],
      es: ['-1001729332644'],
      ru: ['-1001428699099','-1001208656374'],
      ar: ['-1002348048888','-1001419563233']
    };

    const LANGUAGE_NAMES = {
      en: 'English', zh: 'Mandarin Chinese', vi: 'Vietnamese',
      es: 'Spanish', ru: 'Russian', ar: 'Arabic'
    };

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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

    async function getTodaysGames() {
      const sports = ['Baseball', 'American_Football', 'Basketball'];
      for (const sport of sports) {
        const data = await apiGet('https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=' + today + '&s=' + sport);
        if (data.events && data.events.length > 0) {
          console.log('Found', data.events.length, sport, 'games');
          return { games: data.events, sport };
        }
      }
      return { games: [], sport: 'Baseball' };
    }

    async function groqCall(prompt) {
      const r = await apiPost(
        'https://api.groq.com/openai/v1/chat/completions',
        { 'Authorization': 'Bearer ' + GROQ_KEY },
        { model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1000 }
      );
      return r.choices && r.choices[0] ? r.choices[0].message.content : '';
    }

    async function generatePicks(games, sport) {
      if (!games.length) return { free_pick: 'No games today.', premium_picks: 'No games today.' };
      const gameList = games.slice(0,10).map((g,i) =>
        (i+1)+'. '+g.strHomeTeam+' vs '+g.strAwayTeam+' at '+(g.strTime||'TBD')
      ).join('\n');
      const prompt = 'You are an expert sports handicapper. Here are today\'s '+sport+' games:\n\n'+gameList+'\n\nGenerate:\n1. ONE free pick. Format: "FREE PICK: [Team] to win. Reason: [2-3 sentences]"\n2. PREMIUM CARD - 3 picks. Format: "PICK #[N]: [Team] to win. Analysis: [3-4 sentences]"\nBe confident. No disclaimers.';
      const text = await groqCall(prompt);
      const freeMatch = text.match(/FREE PICK:([\s\S]*?)(?=PREMIUM CARD|PICK #1:|$)/i);
      const premiumMatch = text.match(/PREMIUM CARD[\s\S]*|PICK #1:[\s\S]*/i);
      return {
        free_pick: freeMatch ? freeMatch[0].trim() : text.split('\n')[0],
        premium_picks: premiumMatch ? premiumMatch[0].trim() : text
      };
    }

    async function saveGameOfDay(game) {
      if (!game) return;
      const utcTime = game.strTime || '00:00:00';
      const [h, m] = utcTime.split(':').map(Number);
      const eh = (h - 4 + 24) % 24;
      const period = eh >= 12 ? 'PM' : 'AM';
      const dh = eh > 12 ? eh - 12 : (eh === 0 ? 12 : eh);
      const easternTime = dh + ':' + String(m).padStart(2,'0') + ' ' + period + ' ET';
      await apiPost(
        'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/game_of_day',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' },
        { date: today, home_team: game.strHomeTeam, away_team: game.strAwayTeam, sport: game.strSport, game_time: easternTime, league: game.strLeague }
      );
      console.log('Game saved:', game.strHomeTeam, 'vs', game.strAwayTeam);
    }

    async function savePicks(free_pick, premium_picks, game_data) {
      await apiPost(
        'https://ehjhsbrcbtqcvmgzjzkm.supabase.co/rest/v1/daily_picks',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' },
        { date: today, free_pick, premium_picks, game_data }
      );
      console.log('Picks saved to Supabase');
    }

    async function postTG(chatId, message) {
      return apiPost(
        'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
        {},
        { chat_id: chatId, text: message, parse_mode: 'HTML' }
      );
    }

    async function translate(text, langName) {
      await sleep(5000);
      return groqCall('Translate to ' + langName + '. Keep team names and numbers in English. Return translation only:\n\n' + text);
    }

    // Step 1 - Get games
    const { games, sport } = await getTodaysGames();

    // Step 2 - Save game of day
    if (games.length > 0) {
      await saveGameOfDay(games[0]);
    }

    // Step 3 - Generate picks
    const { free_pick, premium_picks } = await generatePicks(games, sport);

    // Step 4 - Save picks
    await savePicks(free_pick, premium_picks, { games: games.slice(0,10), sport });

    // Step 5 - Post to Telegram only during 8AM window
    if (easternHour >= 7 && easternHour <= 10) {
      console.log('8AM window - posting to Telegram...');

      await postTG(FREE_CHANNEL,
        '\u{1F3C6} <b>FREE PICK IS READY \u2014 ' + today + '</b>\n\n\u{1F512} Today\'s pick is locked.\n\nVisit freesportspicks.pro, sign the guestbook and unlock today\'s free pick instantly.\n\n\u{1F48E} Want the full premium card?\nTap below to get access.'
      );
      await sleep(30000);

      await postTG(PREMIUM_CHANNEL,
        '\u{1F48E} <b>FSP PREMIUM CARD \u2014 ' + today + '</b>\n\n' + premium_picks + '\n\n\u2014\u2014\u2014\n\u{1F512} Private channel. Do not share.\n\u2705 Good luck today!'
      );
      await sleep(30000);

      // Post to language groups
      for (const lang of Object.keys(LANGUAGE_GROUPS)) {
        const ids = LANGUAGE_GROUPS[lang];
        if (!ids.length) continue;
        const msg = lang === 'en' ? free_pick : await translate(free_pick, LANGUAGE_NAMES[lang]);
        const post = '\u{1F3C6} <b>FREE PICK \u2014 ' + today + '</b>\n\n' + msg + '\n\n\u{1F517} freesportspicks.pro\n\u{1F48E} Premium: t.me/FreeSportsPicksProBot';
        for (const id of ids) {
          const result = await postTG(id, post);
          console.log(lang, id, result.ok ? 'OK' : 'FAILED');
          await sleep(30000);
        }
      }
      console.log('All Telegram posts done!');
    } else {
      console.log('Not 8AM window - skipping Telegram posts. Eastern hour:', easternHour);
    }

    return res.status(200).json({ ok: true, date: today, games: games.length, sport, free_pick });

  } catch(e) {
    console.error('Cron error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}