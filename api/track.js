// Collects one pageview and forwards it to Supabase.
//
// Runs server-side so the visitor's country/city come from Vercel's own geo
// headers rather than a third-party IP lookup. The raw IP is used only to build
// a fingerprint string; it is hashed inside the database (with a salt that never
// leaves it) and is never stored.

const SUPABASE_URL = 'https://jsylculwywvbaxbflske.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PIemx9UDv3CnO__oOWoNvA_fPTxFz2G';

const BOT = /bot|crawl|spider|slurp|scrape|preview|facebookexternalhit|headless|phantomjs|lighthouse|pingdom|uptime|monitor|curl|wget|python-requests|node-fetch|axios|go-http-client|java\/|semrush|ahrefs|mj12|dotbot|petalbot|yandex|baidu|gptbot|claude|ccbot|perplexity|applebot|duckduck/i;

function deviceType(ua) {
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) return 'mobile';
  return 'desktop';
}

function browser(ua) {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/opr\/|opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung Internet';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/chrome|crios/i.test(ua)) return 'Chrome';
  if (/safari/i.test(ua)) return 'Safari';
  return 'Other';
}

function os(ua) {
  if (/windows nt/i.test(ua)) return 'Windows';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/mac os x/i.test(ua)) return 'macOS';
  if (/cros/i.test(ua)) return 'ChromeOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function decode(v) {
  if (!v) return null;
  try { return decodeURIComponent(v); } catch (e) { return v; }
}

function str(v, max) {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  return s ? s.slice(0, max) : null;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const ua = String(req.headers['user-agent'] || '');
  // Drop crawlers and synthetic traffic before they reach the database.
  if (!ua || BOT.test(ua)) return res.status(204).end();

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') return res.status(400).end();

  const ip = String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '')
    .split(',')[0].trim();

  const payload = {
    path: str(body.path, 512) || '/',
    title: str(body.title, 300),
    referrer_host: str(body.referrer_host, 255),
    referrer_url: str(body.referrer_url, 1024),
    utm_source: str(body.utm_source, 128),
    utm_medium: str(body.utm_medium, 128),
    utm_campaign: str(body.utm_campaign, 128),
    timezone: str(body.timezone, 64),
    lang: str(body.lang, 16),
    session_id: str(body.session_id, 64),
    screen_w: Number.isFinite(+body.screen_w) ? String(Math.min(99999, Math.max(0, Math.round(+body.screen_w)))) : null,

    country: str(req.headers['x-vercel-ip-country'], 8),
    region: str(decode(req.headers['x-vercel-ip-country-region']), 128),
    city: str(decode(req.headers['x-vercel-ip-city']), 128),

    device_type: deviceType(ua),
    browser: browser(ua),
    os: os(ua),

    // Hashed and salted inside Postgres; discarded immediately afterwards.
    fp: ip + '|' + ua
  };

  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/rpc/qh_track', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p: payload })
    });
    if (!r.ok) {
      console.error('qh_track failed', r.status, await r.text());
      return res.status(502).end();
    }
  } catch (e) {
    console.error('qh_track error', e);
    return res.status(502).end();
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(204).end();
};
