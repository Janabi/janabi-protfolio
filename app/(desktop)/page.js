import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomePage() {
  return (
    <section
      className="page-content home-intro"
      aria-labelledby="home-heading"
    >
      <h1 id="home-heading">{siteConfig.name}</h1>
      <p className="lead">
        {siteConfig.jobTitle} — portfolio presented as &ldquo;{siteConfig.brand}
        &rdquo;, a desktop-inspired shell. Built with React and Next.js for fast,
        crawl-friendly pages.
      </p>
      <p>
        Read the{' '}
        <Link href="/about">about</Link> page for background and keywords, browse{' '}
        <Link href="/projects">projects</Link>, see a{' '}
        <Link href="/blog/janabi-os-portfolio">case study</Link> on this site, or{' '}
        <Link href="/contact">get in touch</Link>.
      </p>
    </section>
  );
}
