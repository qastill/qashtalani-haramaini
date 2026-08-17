# Site analytics

First-party analytics for qashtalani-haramaini.com. No third-party trackers, no
cookies, no ad-tech — the visitor's browser only ever talks to this domain.

**Dashboard:** https://qashtalani-haramaini.com/insights.html (passphrase-protected)

## How it works

```
browser ──> /analytics.js ──POST──> /api/track ──> Supabase RPC qh_track ──> qh_pageviews
                                                                                  │
browser ──> /insights.html ──GET──> /api/stats ──> Supabase RPC qh_stats ─────────┘
```

| Piece | File | Role |
|---|---|---|
| Tracking script | `analytics.js` | One pageview per page load. Skips localhost, Vercel preview URLs and automated browsers. |
| Collector | `api/track.js` | Adds country/city from Vercel's geo headers, classifies device/browser/OS from the user agent, drops known crawlers. |
| Reader | `api/stats.js` | Verifies the passphrase via the database and returns the aggregates. |
| Dashboard | `insights.html` | `noindex`; asks for the passphrase, then renders the report. |

Database: Supabase project `jsylculwywvbaxbflske` (region ap-southeast-1),
tables `qh_pageviews` and `qh_config` in the `public` schema.

## Privacy

- **No IP address is ever stored.** `api/track.js` passes `IP + user agent` to the
  database, where `qh_track` hashes it with a salt that never leaves the database
  and with the current date mixed in. The hash rotates every day, so the same
  person cannot be followed across days.
- **No cookies and no `localStorage`.** The session id lives in `sessionStorage`
  and is gone when the tab closes.
- The dashboard passphrase is never stored in this repository. Only its SHA-256
  hash lives in `qh_config`, and the comparison happens inside Postgres.

The Supabase publishable key in `api/*.js` is safe to commit — it is designed for
public use. `qh_pageviews` has row-level security enabled with no policies, so
that key cannot read or write the table directly; the only ways in are the two
functions above, one of which is write-only and the other passphrase-gated.

## Changing the passphrase

```sql
update public.qh_config
   set value = encode(digest('new-passphrase', 'sha256'), 'hex')
 where key = 'dashboard_token_sha256';
```

## Notes

- `insights.html` is kept out of search results with a `noindex` meta tag rather
  than a `robots.txt` rule — a `Disallow` would stop crawlers from reading the
  `noindex` at all.
- Times in the dashboard are Asia/Jakarta (WIB).
- Search *queries* (what people typed into Google) are not visible here; that
  data only exists in Google Search Console.
