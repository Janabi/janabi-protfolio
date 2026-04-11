import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export function getPersonJsonLd() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url,
    jobTitle: siteConfig.jobTitle,
    sameAs: siteConfig.sameAs,
  };
}

export function getWebSiteJsonLd() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url,
    },
  };
}
