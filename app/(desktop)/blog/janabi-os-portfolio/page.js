import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  title: 'Case study: Janabi OS portfolio',
  description: `How ${siteConfig.name} built the Janabi OS portfolio with Next.js static export, metadata, JSON-LD, and GitHub Pages.`,
  alternates: {
    canonical: absoluteUrl('/blog/janabi-os-portfolio'),
  },
  openGraph: {
    title: `Case study: Janabi OS | ${siteConfig.name}`,
    description: `Next.js, SEO, and static hosting for ${siteConfig.name}'s portfolio.`,
    url: absoluteUrl('/blog/janabi-os-portfolio'),
    type: 'article',
  },
};

export default function JanabiOsCaseStudyPage() {
  return (
    <article className="page-content" itemScope itemType="https://schema.org/Article">
      <h1 itemProp="headline">Case study: Janabi OS portfolio</h1>
      <p className="lead" itemProp="description">
        A concise build log for this site: moving from a client-only React bundle
        to <strong>Next.js</strong> with static HTML per route, structured data,
        and hosting on <strong>GitHub Pages</strong> under{' '}
        <code>/janabi-protfolio</code>.
      </p>

      <h2>Goals</h2>
      <ul>
        <li>Crawlable HTML and unique titles for home, about, projects, contact.</li>
        <li>
          Technical SEO: <code>sitemap.xml</code>, <code>robots.txt</code>,{' '}
          canonical URLs, Open Graph, and Person / WebSite JSON-LD.
        </li>
        <li>Strong Core Web Vitals via minimal JavaScript and static delivery.</li>
      </ul>

      <h2>Approach</h2>
      <p>
        The UI keeps a playful desktop metaphor (menu bar and dock) while content
        pages expose real headings and copy for indexing. Static export avoids a
        Node server on GitHub Pages; <code>basePath</code> matches the project
        site path.
      </p>

      <h2>What you should customize next</h2>
      <p>
        Replace placeholder bios with your story, add real project URLs and
        screenshots (use <code>next/image</code> when you have assets), and set{' '}
        <code>NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code> from Search Console.
      </p>
      <p>
        <Link href="/projects">Back to projects</Link>
        {' · '}
        <Link href="/blog">All posts</Link>
      </p>
    </article>
  );
}
