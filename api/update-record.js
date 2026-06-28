export default async function handler(req, res) {
  try {
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const SUPABASE_URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';

    // Fetch all picks with results
    const resp = await fetch(SUPABASE_URL + '/rest/v1/daily_picks?select=date,free_pick,result&order=date.desc&limit=1000', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    });
    const picks = await resp.json();

    // Calculate record
    let wins = 0, losses = 0, pushes = 0;
    picks.forEach(p => {
      if (p.result === 'win') wins++;
      else if (p.result === 'loss') losses++;
      else if (p.result === 'push') pushes++;
    });

    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
    const record = wins + '-' + losses + (pushes > 0 ? '-' + pushes : '');

    // Save to Supabase track_record table
    await fetch(SUPABASE_URL + '/rest/v1/track_record', {
      method: 'POST',
      headers: { 
        'apikey': SUPABASE_KEY, 
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ id: 1, wins, losses, pushes, win_rate: winRate, record, updated_at: new Date().toISOString() })
    });

    console.log('Track record updated:', record, winRate + '%');
    return res.status(200).json({ ok: true, record, wins, losses, pushes, winRate });
  } catch(e) {
    console.error('update-record error:', e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}
