'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import './TopMenuBar.css';

function formatDateTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export default function TopMenuBar() {
  const [now, setNow] = useState(null);
  const [platform, setPlatform] = useState('Web');

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.platform) {
      setPlatform(navigator.platform);
    }
  }, []);

  return (
    <header
      className="top-menu-bar"
      role="banner"
      aria-label="System menu bar"
    >
      <div className="top-menu-bar__left">
        <Link href="/" className="top-menu-bar__brand-link">
          <span className="top-menu-bar__brand">{siteConfig.brand}</span>
        </Link>
        <span className="top-menu-bar__system">· {platform}</span>
      </div>
      <time
        className="top-menu-bar__clock"
        dateTime={now ? now.toISOString() : undefined}
      >
        {now ? formatDateTime(now) : '\u00a0'}
      </time>
    </header>
  );
}
