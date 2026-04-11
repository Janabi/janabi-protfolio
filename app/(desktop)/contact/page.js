import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  title: 'Contact',
  description: `Contact ${siteConfig.name}: GitHub and professional inquiries.`,
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `How to reach ${siteConfig.name}.`,
    url: absoluteUrl('/contact'),
  },
};

export default function ContactPage() {
  return <div className="page-content" />;
}
