import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  title: 'About',
  description: `About ${siteConfig.name}: ${siteConfig.jobTitle}, focus areas, and how to interpret this portfolio.`,
  alternates: {
    canonical: absoluteUrl('/about'),
  },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `Background and expertise of ${siteConfig.name}.`,
    url: absoluteUrl('/about'),
  },
};

export default function AboutPage() {
  return <div className="page-content" />;
}
