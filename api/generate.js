export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('FSP Generate Picks - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;

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
      console.log('Picks saved');
    }

    const { games, sport } = await getTodaysGames();
    if (games.length > 0) await saveGameOfDay(games[0]);
    const { free_pick, premium_picks } = await generatePicks(games, sport);
    await savePicks(free_pick, premium_picks, { games: games.slice(0,10), sport });

    return res.status(200).json({ ok: true, date: today, games: games.length, sport, free_pick });
  } catch(e) {
    console.error('Generate error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}