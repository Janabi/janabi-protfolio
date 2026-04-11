import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function MailApp() {
  const github = `https://github.com/${siteConfig.githubUsername}`;
  return (
    <div className="mail-app">
      <p>
        Quick links — same as the{' '}
        <Link href="/contact">Contact</Link> page.
      </p>
      <h2>GitHub</h2>
      <p>
        <a href={github} rel="me noreferrer noopener" target="_blank">
          github.com/{siteConfig.githubUsername}
        </a>
      </p>
      <p className="mail-app-hint">
        Add a public email in <code>site-config</code> and a{' '}
        <code>mailto:</code> link here when ready.
      </p>
    </div>
  );
}
