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
  return (
    <article className="page-content">
      <h1>About {siteConfig.name}</h1>
      <p className="lead">
        I am a {siteConfig.jobTitle.toLowerCase()} building reliable web
        experiences. This site is both a portfolio and a playground for UI
        craft—currently styled as a desktop environment ({siteConfig.brand}).
      </p>
      <h2>What you will find here</h2>
      <ul>
        <li>
          <strong>Projects</strong> — selected work, stack choices, and outcomes.
        </li>
        <li>
          <strong>Blog / case studies</strong> — longer write-ups for long-tail
          search (for example &ldquo;{siteConfig.name} React portfolio&rdquo; or
          &ldquo;Next.js static export GitHub Pages&rdquo;).
        </li>
        <li>
          <strong>Contact</strong> — how to reach me for roles or collaboration.
        </li>
      </ul>
      <h2>Stacks and keywords</h2>
      <p>
        I emphasize {siteConfig.keywords.slice(3, 7).join(', ')}, and ship
        performant sites with attention to Core Web Vitals and semantic HTML.
      </p>
      <p className="keywords-note" aria-hidden="true">
        Indexing hints: {siteConfig.keywords.join(', ')}.
      </p>
    </article>
  );
}
