import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  title: 'Projects',
  description: `Selected projects by ${siteConfig.name}: software engineering work and experiments.`,
  alternates: {
    canonical: absoluteUrl('/projects'),
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Portfolio projects by ${siteConfig.name}.`,
    url: absoluteUrl('/projects'),
  },
};

export default function ProjectsPage() {
  return (
    <article className="page-content">
      <h1>Projects</h1>
      <p className="lead">
        Highlights from my work as a {siteConfig.jobTitle.toLowerCase()}. Each
        entry is written to be readable by humans and search engines alike.
      </p>

      <h2>Janabi OS portfolio</h2>
      <p>
        This repository: a personal portfolio with a macOS-style menu bar and
        dock, migrated to <strong>Next.js</strong> with static export for{' '}
        <strong>GitHub Pages</strong>, including metadata, JSON-LD, sitemap, and
        robots.
      </p>
      <p>
        <Link href="/blog/janabi-os-portfolio">Read the case study</Link>
      </p>

      <h2>More projects</h2>
      <p>
        Add repositories, demos, and metrics here as you ship work. Unique
        titles and descriptions per project page help capture long-tail queries
        (for example project name + your name).
      </p>
    </article>
  );
}
