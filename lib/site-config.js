/**
 * Central SEO and site identity. Update sameAs, jobTitle, and bio for your profiles.
 */
export const BASE_PATH = '/janabi-protfolio';

export function getSiteUrl() {
  const fromEnv =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
      : '';
  return fromEnv || 'https://janabi.github.io/janabi-protfolio';
}

export const siteConfig = {
  /** Legal / display name for Person schema and titles */
  name: 'Abdulrahman Al-Janabi',
  /** Short brand used in the desktop UI */
  brand: 'Janabi OS',
  defaultTitle: 'Abdulrahman Al-Janabi — Software engineer & portfolio',
  titleTemplate: '%s | Abdulrahman Al-Janabi',
  description:
    'Official portfolio of Abdulrahman Al-Janabi: software engineering work, selected projects, and ways to get in touch. Built with React and Next.js.',
  /** Target queries: name, role, stack, niche */
  keywords: [
    'Abdulrahman Al-Janabi',
    'Janabi',
    'software engineer',
    'portfolio',
    'React',
    'Next.js',
    'web development',
    'full-stack',
  ],
  jobTitle: 'Software Engineer',
  locale: 'en_US',
  sameAs: ['https://github.com/janabi'],
  githubUsername: 'janabi',
};

export const routes = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog/janabi-os-portfolio', changeFrequency: 'yearly', priority: 0.6 },
];
