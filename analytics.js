/* Lightweight first-party analytics for qashtalani-haramaini.com.
   Sends one pageview per page load to /api/track. No cookies, no third-party
   requests, no persistent identifier — the session id lives in sessionStorage
   and disappears when the tab closes. */
(function () {
  'use strict';

  var h = location.hostname;

  // Never record local development or Vercel preview deployments.
  if (!h ||
      h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' ||
      /\.local$/.test(h) ||
      h.indexOf('-git-') !== -1 ||
      /-[a-z0-9]{6,}-qastil\.vercel\.app$/.test(h)) return;

  // Respect automated browsers (Lighthouse, Playwright, crawlers running JS).
  if (navigator.webdriver) return;

  function sessionId() {
    try {
      var s = sessionStorage.getItem('qh_sid');
      if (!s) {
        s = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem('qh_sid', s);
      }
      return s;
    } catch (e) {
      return '';
    }
  }

  function send() {
    var path = location.pathname || '/';
    path = path.replace(/\/index\.html$/i, '/');

    var refHost = null, refUrl = null;
    var r = document.referrer || '';
    if (r) {
      try {
        var ru = new URL(r);
        if (ru.hostname && ru.hostname !== location.hostname) {
          refHost = ru.hostname.replace(/^www\./, '');
          refUrl = r.slice(0, 1024);
        }
      } catch (e) { /* malformed referrer — treat as direct */ }
    }

    var q = new URLSearchParams(location.search);
    var tz = null;
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { /* older browser */ }

    var body = {
      path: path,
      title: (document.title || '').slice(0, 300),
      referrer_host: refHost,
      referrer_url: refUrl,
      utm_source: q.get('utm_source'),
      utm_medium: q.get('utm_medium'),
      utm_campaign: q.get('utm_campaign'),
      timezone: tz,
      lang: navigator.language || null,
      screen_w: window.screen && window.screen.width ? window.screen.width : null,
      session_id: sessionId()
    };

    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
        credentials: 'omit'
      })['catch'](function () { /* analytics must never break the page */ });
    } catch (e) { /* ignore */ }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(send, 0);
  } else {
    window.addEventListener('DOMContentLoaded', send);
  }
})();
