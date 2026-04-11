import { routes } from '@/lib/site-config';
import { absoluteUrl } from '@/lib/urls';

export default function sitemap() {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === '' ? absoluteUrl('/') : absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
