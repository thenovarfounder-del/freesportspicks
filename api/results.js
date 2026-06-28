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

async function apiPost(url, headers, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  return r.json();
}

async function apiPatch(url, headers, body) {
  const r = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  return r.json();
}

// Check if yesterday's sports pick won or lost
async function checkSportsPickResult(yesterday) {
  try {
    // Get yesterday's pick from Supabase
    const picks = await apiGet(
      SUPABASE_URL + '/rest/v1/daily_picks?date=eq.' + yesterday + '&limit=1',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );

    if (!picks || !picks[0]) {
      console.log('No sports pick found for', yesterday);
      return null;
    }

    const pick = picks[0];

    // Skip if result already set
    if (pick.result === 'win' || pick.result === 'loss') {
      console.log('Result already set:', pick.result);
      return { result: pick.result, free_pick: pick.free_pick, alreadySet: true };
    }

    const freePick = pick.free_pick || '';
    const gameData = pick.game_data || {};
    const sport = gameData.sport || 'Baseball';
    const games = gameData.games || [];

    if (!games.length) {
      console.log('No game data for', yesterday);
      return null;
    }

    // Get the game we picked
    const game = games[0];
    const eventId = game.idEvent;

    if (!eventId) {
      console.log('No event ID found');
      return null;
    }

    // Fetch final score from TheSportsDB
    const scoreData = await apiGet('https://www.thesportsdb.com/api/v1/json/3/lookupevent.php?id=' + eventId, {});

    if (!scoreData || !scoreData.events || !scoreData.events[0]) {
      console.log('No score data from TheSportsDB for event', eventId);
      return null;
    }

    const event = scoreData.events[0];
    const homeScore = parseInt(event.intHomeScore);
    const awayScore = parseInt(event.intAwayScore);
    const homeTeam = event.strHomeTeam || '';
    const awayTeam = event.strAwayTeam || '';

    // Skip if game not finished
    if (isNaN(homeScore) || isNaN(awayScore)) {
      console.log('Game not finished yet for event', eventId);
      return null;
    }

    console.log('Scores:', homeTeam, homeScore, 'vs', awayTeam, awayScore);

    // Determine winner
    const homeWon = homeScore > awayScore;
    const awayWon = awayScore > homeScore;
    const winnerTeam = homeWon ? homeTeam : awayTeam;

    // Check if our pick matches the winner
    const pickUpper = freePick.toUpperCase();
    const winnerUpper = winnerTeam.toUpperCase();

    // Extract team name from pick text
    // Format: "FREE PICK: Los Angeles Dodgers to win"
    let pickedTeam = '';
    const pickMatch = freePick.match(/FREE PICK:\s*(.+?)\s+to win/i);
    if (pickMatch) pickedTeam = pickMatch[1].trim().toUpperCase();

    let result = 'loss';
    if (pickedTeam && winnerUpper.includes(pickedTeam.split(' ').pop())) {
      result = 'win';
    } else if (pickedTeam && pickedTeam.includes(winnerUpper.split(' ').pop())) {
      result = 'win';
    }

    console.log('Picked:', pickedTeam, '| Winner:', winnerTeam, '| Result:', result);

    // Save result to Supabase
    await apiPatch(
      SUPABASE_URL + '/rest/v1/daily_picks?date=eq.' + yesterday,
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'return=minimal' },
      { result }
    );

    console.log('Saved result:', result, 'for', yesterday);
    return { result, free_pick: freePick, homeTeam, awayTeam, homeScore, awayScore, pickedTeam, winnerTeam };

  } catch(e) {
    console.log('checkSportsPickResult error:', e.message);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // ─── CHECK SPORTS PICK RESULT ────────────────────────────────────────────
    const sportsResult = await checkSportsPickResult(yesterday);

    if (sportsResult && !sportsResult.alreadySet) {
      const emoji = sportsResult.result === 'win' ? '✅' : '❌';
      const sportMsg = emoji + ' <b>Yesterday\'s Free Pick Result</b>\n\n' +
        sportsResult.free_pick + '\n\n' +
        'Final Score: ' + sportsResult.homeTeam + ' ' + sportsResult.homeScore + ' - ' + sportsResult.awayTeam + ' ' + sportsResult.awayScore + '\n\n' +
        (sportsResult.result === 'win' ? '🏆 Winner! Our pick was correct!' : '📊 Tough loss. We track all results transparently.') + '\n\n' +
        '🤖 Powered by FSP AI\n' +
        '💸 Premium picks: t.me/FreeSportsPicksProBot';

      for (const channelId of ALL_CHANNELS) {
        try { await postTG(channelId, sportMsg); } catch(e) {}
      }
      console.log('Sports result posted to Telegram:', sportsResult.result);
    }

    // ─── CHECK CRYPTO SIGNAL RESULT ──────────────────────────────────────────
    const data = await apiGet(
      SUPABASE_URL + '/rest/v1/crypto_signals?date=eq.' + yesterday + '&limit=1&order=created_at.desc',
      { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    );

    if (data && data[0]) {
      const signal = data[0];
      const result = signal.result || 'pending';
      const coin = signal.coin || signal.symbol || 'BTC';
      const direction = signal.direction || signal.signal || 'LONG';
      let emoji = result === 'WIN' ? '✅' : result === 'LOSS' ? '❌' : '⏳';
      let msg = '📊 <b>Yesterday\'s Signal Result</b>\n\n';
      msg += emoji + ' ' + coin + ' ' + direction + ' — <b>' + result.toUpperCase() + '</b>\n\n';
      msg += '🤖 Powered by FSP AI\n';
      msg += '💸 Full premium card: t.me/FreeSportsPicksProBot';
      for (const channelId of ALL_CHANNELS) {
        try { await postTG(channelId, msg); } catch(e) {}
      }
    }

    res.status(200).json({ 
      success: true, 
      sports: sportsResult ? { result: sportsResult.result, pick: sportsResult.free_pick } : null,
      date: yesterday
    });

  } catch(e) {
    console.error('results.js error:', e);
    res.status(500).json({ error: e.message });
  }
}
