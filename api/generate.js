export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const SUPABASE_URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';

    async function apiPost(url, headers, body) {
      const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
      const text = await resp.text();
      try { return text ? JSON.parse(text) : {}; } catch(e) { return {}; }
    }

    async function apiGet(url, headers = {}) {
      const resp = await fetch(url, { headers });
      const text = await resp.text();
      try { return text ? JSON.parse(text) : {}; } catch(e) { return {}; }
    }

    async function groqCall(prompt) {
      try {
        const r = await apiPost('https://api.groq.com/openai/v1/chat/completions', { 'Authorization': 'Bearer ' + GROQ_KEY }, { model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1000 });
        return r.choices && r.choices[0] ? r.choices[0].message.content : '';
      } catch(e) { return ''; }
    }

    async function getTodaysGames() {
      const sports = ['Baseball', 'American_Football', 'Basketball'];
      for (const sport of sports) {
        try {
          const data = await apiGet('https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=' + today + '&s=' + sport);
          if (data.events && data.events.length > 0) {
            // Only return games with valid team names
            const valid = data.events.filter(g => g.strHomeTeam && g.strAwayTeam && g.strHomeTeam.length > 1 && g.strAwayTeam.length > 1);
            if (valid.length > 0) {
              console.log('Found ' + valid.length + ' valid ' + sport + ' games');
              return { games: valid, sport };
            }
          }
        } catch(e) { console.log('Sport error:', sport, e.message); }
      }
      return { games: [], sport: 'Baseball' };
    }

    async function generatePicks(games, sport) {
      if (!games.length) return { free_pick: 'No games today.', premium_picks: 'No games today.' };
      const gameList = games.slice(0,10).map((g,i) => (i+1)+'. '+g.strHomeTeam+' vs '+g.strAwayTeam+' at '+(g.strTime||'TBD')).join('\n');
      const prompt = 'You are an expert sports handicapper. Here are today\'s '+sport+' games:\n\n'+gameList+'\n\nRespond ONLY in this exact format:\nFREE PICK: [Team Name] to win\nREASON: [2 sentences]\nPICK #1: [Team] to win | [1 sentence]\nPICK #2: [Team] to win | [1 sentence]\nPICK #3: [Team] to win | [1 sentence]';
      const text = await groqCall(prompt);
      if (!text) return { free_pick: 'Check back soon.', premium_picks: '' };
      const lines = text.split('\n');
      const freeLine = lines.find(l => l.toUpperCase().includes('FREE PICK'));
      const premLines = lines.filter(l => l.match(/PICK #[123]/i));
      return { free_pick: freeLine ? freeLine.trim() : lines[0].trim(), premium_picks: premLines.length ? premLines.join('\n') : text };
    }

    async function generateCryptoSignals() {
      const rawCoins = await apiGet('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1');
      const coins = Array.isArray(rawCoins) ? rawCoins : [];
      if (!coins.length) throw new Error('CoinGecko returned no data');
      const coinSummary = coins.map(c => c.name+' ('+c.symbol.toUpperCase()+'): $'+c.current_price+', 24h: '+(c.price_change_percentage_24h||0).toFixed(2)+'%, Vol: $'+(c.total_volume/1e9).toFixed(2)+'B').join('\n');
      const sentiment = coins.filter(c => c.price_change_percentage_24h > 0).length >= 6 ? 'Bullish' : coins.filter(c => c.price_change_percentage_24h > 0).length <= 3 ? 'Bearish' : 'Neutral';
      const prompt = 'You are an elite crypto analyst. Market data:\n'+coinSummary+'\nSentiment: '+sentiment+'\n\nGive ONE trade signal in this exact format:\nCOIN: [name]\nENTRY: $[price]\nTARGET: $[price]\nSTOP: $[price]\nWHY: [2 sentences]\n\n--PREMIUM--\nCOIN #1: [name] | BUY at $[price] | Target $[price]\nCOIN #2: [name] | BUY at $[price] | Target $[price]\nCOIN #3: [name] | BUY at $[price] | Target $[price]';
      const signals = await groqCall(prompt);
      const parts = (signals||'').split('--PREMIUM--');
      const freeSignal = 'FSP CRYPTO SIGNAL\n\n'+(parts[0]||'').trim()+'\n\nNot financial advice. DYOR.';
      const premiumSignals = parts[1] ? parts[1].trim() : 'LOCKED\nSignal 2 - LOCKED\nSignal 3 - Unlock: t.me/FreeSportsPicksProBot';
      await apiPost(SUPABASE_URL+'/rest/v1/crypto_signals', { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer '+SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' }, { date: today, free_signal: freeSignal, premium_signals: premiumSignals, coin_data: coins });
      return { freeSignal };
    }

    const { games, sport } = await getTodaysGames();

    // Save game_of_day with VALID team names
    if (games.length > 0) {
      const g = games[0];
      const homeTeam = g.strHomeTeam;
      const awayTeam = g.strAwayTeam;
      const [h,m] = (g.strTime||'00:00').split(':').map(Number);
      const eh = (h-4+24)%24;
      const et = (eh>12?eh-12:(eh===0?12:eh))+':'+String(m).padStart(2,'0')+(eh>=12?' PM':' AM')+' ET';
      console.log('Saving game_of_day:', homeTeam, 'vs', awayTeam, 'at', et);
      await apiPost(SUPABASE_URL+'/rest/v1/game_of_day', { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer '+SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' }, { date: today, home_team: homeTeam, away_team: awayTeam, sport: g.strSport || sport, league: g.strLeague || sport, game_time: et });
    } else {
      // No valid games — save placeholder
      await apiPost(SUPABASE_URL+'/rest/v1/game_of_day', { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer '+SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' }, { date: today, home_team: 'Daily Pick', away_team: 'Sign In to Reveal', sport: 'Sports', league: 'Free Pick', game_time: '9:00 AM ET' });
    }

    const { free_pick, premium_picks } = await generatePicks(games, sport);
    await apiPost(SUPABASE_URL+'/rest/v1/daily_picks', { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer '+SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' }, { date: today, free_pick, premium_picks, game_data: { games: games.slice(0,10), sport } });
    const { freeSignal } = await generateCryptoSignals();

    return res.status(200).json({ ok: true, date: today, games: games.length, sport, free_pick, crypto_signal: freeSignal });
  } catch(e) {
    console.error('Generate error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}
