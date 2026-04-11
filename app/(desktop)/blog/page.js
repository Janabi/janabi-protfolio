import Link from 'next/link';
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
  return (
    <article className="page-content">
      <h1>Blog &amp; case studies</h1>
      <p className="lead">
        Longer content improves relevance for specific searches (framework +
        problem + your name). Start with one solid case study, then add posts on
        things you actually shipped.
      </p>

      <h2>Posts</h2>
      <ul>
        <li>
          <Link href="/blog/janabi-os-portfolio">
            Building this portfolio as Janabi OS (Next.js, SEO, GitHub Pages)
          </Link>
        </li>
      </ul>
    </article>
  );
}
