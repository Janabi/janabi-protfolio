import { JsonLd } from '@/components/JsonLd';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';
import { getSiteUrl, siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';
import './globals.css';

const siteUrl = getSiteUrl();
const canonicalHome = absoluteUrl('/');

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  alternates: {
    canonical: canonicalHome,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: canonicalHome,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
