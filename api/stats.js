// Returns the aggregated analytics for the dashboard.
//
// The passphrase is verified inside Postgres (qh_stats compares it against a
// stored SHA-256 hash), so no secret is present in any file served to the
// browser — a wrong passphrase gets a 401 and no data.

const SUPABASE_URL = 'https://jsylculwywvbaxbflske.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PIemx9UDv3CnO__oOWoNvA_fPTxFz2G';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token') || '';
  const days = Math.min(365, Math.max(1, parseInt(url.searchParams.get('days'), 10) || 30));

  if (!token) return res.status(401).json({ error: 'unauthorized' });

  let r;
  try {
    r = await fetch(SUPABASE_URL + '/rest/v1/rpc/qh_stats', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p_token: token, p_days: days })
    });
  } catch (e) {
    console.error('qh_stats error', e);
    return res.status(502).json({ error: 'upstream_unreachable' });
  }

  const text = await r.text();

  if (!r.ok) {
    // Postgres raises SQLSTATE 28000 for a bad passphrase; anything else is a fault.
    if (/unauthorized/i.test(text)) return res.status(401).json({ error: 'unauthorized' });
    console.error('qh_stats failed', r.status, text);
    return res.status(502).json({ error: 'upstream_error' });
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).send(text);
};
