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
  return <div className="page-content" />;
}
