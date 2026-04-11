import { getSiteUrl } from '@/lib/site-config';

/** Absolute URL for this deployment (GitHub Pages project path included). */
export function absoluteUrl(pathname = '/') {
  const base = getSiteUrl().replace(/\/$/, '');
  if (!pathname || pathname === '/') {
    return base;
  }
  const segment = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${segment}`;
}
