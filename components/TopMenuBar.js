'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import './TopMenuBar.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

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
      <nav className="top-menu-bar__nav" aria-label="Site sections">
        <ul className="top-menu-bar__nav-list">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="top-menu-bar__nav-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <time
        className="top-menu-bar__clock"
        dateTime={now ? now.toISOString() : undefined}
      >
        {now ? formatDateTime(now) : '\u00a0'}
      </time>
    </header>
  );
}
