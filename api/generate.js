export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('FSP Generate Picks - Date:', today);

    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const GROQ_KEY = process.env.GROQ_KEY;
    const SUPABASE_URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';

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
        SUPABASE_URL + '/rest/v1/game_of_day',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' },
        { date: today, home_team: game.strHomeTeam, away_team: game.strAwayTeam, sport: game.strSport, game_time: easternTime, league: game.strLeague }
      );
      console.log('Game saved:', game.strHomeTeam, 'vs', game.strAwayTeam);
    }

    async function savePicks(free_pick, premium_picks, game_data) {
      await apiPost(
        SUPABASE_URL + '/rest/v1/daily_picks',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' },
        { date: today, free_pick, premium_picks, game_data }
      );
      console.log('Picks saved');
    }

    async function generateCryptoSignals() {
      console.log('Fetching crypto data from CoinGecko...');
      const rawCoins = await apiGet('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1');
      const coins = Array.isArray(rawCoins) ? rawCoins : [];
      if (!coins.length) throw new Error('CoinGecko returned no data');
      const coinSummary = coins.map(c =>
        c.name + ' (' + c.symbol.toUpperCase() + '): $' + c.current_price + ', 24h change: ' + (c.price_change_percentage_24h?.toFixed(2)) + '%, Volume: $' + (c.total_volume/1e9).toFixed(2) + 'B'
      ).join('\n');

      const marketSentiment = coins.filter(c => c.price_change_percentage_24h > 0).length >= 6 ? 'Bullish' : coins.filter(c => c.price_change_percentage_24h > 0).length <= 3 ? 'Bearish' : 'Neutral';

      const prompt = 'You are an elite crypto analyst. Based on this market data generate a professional signal.\n\nMarket data:\n' + coinSummary + '\n\nMarket sentiment: ' + marketSentiment + '\n\nRespond in this EXACT format and nothing else:\n\nFREE SIGNAL:\nCONFIDENCE: [X]% - [LOW/MEDIUM/HIGH/VERY HIGH]\nMARKET: ' + marketSentiment + ' - [one sentence market condition]\n\nCOIN: [Full Name (SYMBOL)]\nCATEGORY: [Layer 1/Layer 2/DeFi/Exchange Token]\nENTRY: $[exact current price]\nTARGET: $[price] (+[X]%)\nSTOP LOSS: $[price] (-[X]%)\nRISK/REWARD: 1:[ratio]\nTIMEFRAME: [12-24 hours/24-48 hours/2-5 days]\nPOSITION SIZE: [X]% of portfolio max\n\nWHY TODAY:\n[4-5 specific sentences about volume, price action, market conditions. Be specific with numbers.]\n\n---PREMIUM---\nCOIN 1: [name] | ENTRY: $[price] | TARGET: $[price] (+[X]%) | STOP: $[price] | CONFIDENCE: [X]% | [1 sentence why]\nCOIN 2: [name] | ENTRY: $[price] | TARGET: $[price] (+[X]%) | STOP: $[price] | CONFIDENCE: [X]% | [1 sentence why]\nCOIN 3: [name] | ENTRY: $[price] | TARGET: $[price] (+[X]%) | STOP: $[price] | CONFIDENCE: [X]% | [1 sentence why]';

      const signals = await groqCall(prompt);
      const parts = signals.split('---PREMIUM---');
      const freeSignal = 'FSP CRYPTO SIGNAL\n\n' + (parts[0] || '').replace('FREE SIGNAL:', '').trim() + '\n\nPREMIUM SIGNALS - LOCKED\nSignal 2 - LOCKED\nSignal 3 - LOCKED\nUnlock: t.me/FreeSportsPicksProBot\n\nNot financial advice. DYOR.';
      const premiumSignals = parts[1] ? parts[1].trim() : '';

      await apiPost(
        SUPABASE_URL + '/rest/v1/crypto_signals',
        { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Prefer': 'resolution=merge-duplicates' },
        { date: today, free_signal: freeSignal, premium_signals: premiumSignals, coin_data: coins }
      );
      console.log('Crypto signals saved');
      return { freeSignal, premiumSignals };
    }

    const { games, sport } = await getTodaysGames();
    if (games.length > 0) await saveGameOfDay(games[0]);
    const { free_pick, premium_picks } = await generatePicks(games, sport);
    await savePicks(free_pick, premium_picks, { games: games.slice(0,10), sport });
    const { freeSignal } = await generateCryptoSignals();

    return res.status(200).json({ ok: true, date: today, games: games.length, sport, free_pick, crypto_signal: freeSignal });
  } catch(e) {
    console.error('Generate error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}
