import { absoluteUrl } from '@/lib/urls';

export const metadata = {
  alternates: {
    canonical: absoluteUrl('/'),
  },
};

export default function HomePage() {
  return <div className="page-content" />;
}
