import { getSiteUrl } from '@/lib/site-config';

/** Absolute URL for this deployment (set NEXT_PUBLIC_SITE_URL for your host). */
export function absoluteUrl(pathname = '/') {
  const base = getSiteUrl().replace(/\/$/, '');
  if (!pathname || pathname === '/') {
    return base;
  }
  const segment = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${segment}`;
}
