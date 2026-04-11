'use client';

import { useCallback, useState } from 'react';
import { getSiteUrl, siteConfig } from '@/lib/site-config';
import './BrowserApp.css';

function normalizeUrl(raw) {
  const t = String(raw).trim();
  if (!t) return null;
  let candidate = t;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') {
    return null;
  }
  return parsed.href;
}

const PRESETS = [
  { id: 'site', label: 'Portfolio', getUrl: () => getSiteUrl() },
  {
    id: 'github',
    label: 'GitHub',
    getUrl: () => `https://github.com/${siteConfig.githubUsername}`,
  },
];

export default function BrowserApp() {
  const initial = normalizeUrl(getSiteUrl()) || 'https://example.com';
  const [addressInput, setAddressInput] = useState(initial);
  const [loadedSrc, setLoadedSrc] = useState(initial);
  const [iframeKey, setIframeKey] = useState(0);
  const [error, setError] = useState(null);

  const navigateTo = useCallback((raw) => {
    const href = normalizeUrl(raw);
    if (!href) {
      setError('Enter a valid https URL or hostname.');
      return;
    }
    setError(null);
    setAddressInput(href);
    setLoadedSrc(href);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      navigateTo(addressInput);
    },
    [addressInput, navigateTo]
  );

  const handleReload = useCallback(() => {
    setIframeKey((k) => k + 1);
  }, []);

  return (
    <div className="browser-app">
      <div className="browser-app__toolbar">
        <div className="browser-app__presets" role="group" aria-label="Quick links">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="browser-app__preset"
              onClick={() => navigateTo(p.getUrl())}
            >
              {p.label}
            </button>
          ))}
        </div>
        <form className="browser-app__url-row" onSubmit={handleSubmit}>
          <label className="browser-app__url-label" htmlFor="browser-app-url">
            Address
          </label>
          <input
            id="browser-app-url"
            type="text"
            className="browser-app__url-input"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="https://…"
            spellCheck={false}
            autoComplete="off"
            enterKeyHint="go"
          />
          <button type="submit" className="browser-app__action">
            Go
          </button>
          <button
            type="button"
            className="browser-app__action"
            onClick={handleReload}
            title="Reload"
          >
            Reload
          </button>
          <a
            className="browser-app__action browser-app__action--link"
            href={loadedSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in tab
          </a>
        </form>
      </div>
      {error ? <p className="browser-app__error">{error}</p> : null}
      <p className="browser-app__hint">
        Many sites block embedding; if the frame stays blank, use &quot;Open in tab&quot;.
      </p>
      <div className="browser-app__frame-wrap">
        <iframe
          key={iframeKey}
          className="browser-app__frame"
          title="Embedded page preview"
          src={loadedSrc}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
