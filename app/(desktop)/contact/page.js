import { getSiteUrl, siteConfig } from '@/lib/site-config';
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
  const github = `https://github.com/${siteConfig.githubUsername}`;
  return (
    <article className="page-content">
      <h1>Contact</h1>
      <p className="lead">
        The best way to reach me for engineering roles, collaborations, or
        open-source is through my public profiles.
      </p>
      <h2>GitHub</h2>
      <p>
        <a href={github} rel="me noreferrer noopener" target="_blank">
          github.com/{siteConfig.githubUsername}
        </a>
      </p>
      <p>
        After you deploy, add LinkedIn, email, or a form here and update{' '}
        <code>sameAs</code> in <code>lib/site-config.js</code> so structured data
        stays aligned with Search Console and rich results.
      </p>
      <p className="keywords-note">
        Site URL for reference: {getSiteUrl()}
      </p>
    </article>
  );
}
