import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  title: 'Blog',
  description: `Articles and case studies by ${siteConfig.name}: engineering notes, portfolio build log, and SEO-friendly long-form content.`,
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Case studies and posts by ${siteConfig.name}.`,
    url: absoluteUrl('/blog'),
  },
};

export default function BlogIndexPage() {
  return <div className="page-content" />;
}
