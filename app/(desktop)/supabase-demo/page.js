import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { absoluteUrl } from '@/lib/urls';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Supabase demo',
  description: `Supabase connectivity demo for ${siteConfig.name}.`,
  alternates: {
    canonical: absoluteUrl('/supabase-demo'),
  },
  robots: { index: false, follow: false },
};

const DEMO_TABLE =
  process.env.NEXT_PUBLIC_SUPABASE_DEMO_TABLE || 'todos';
const DEMO_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_DEMO_BUCKET || '';

export default async function SupabaseDemoPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return (
      <div className="page-content">
        <h1>Supabase demo</h1>
        <p>
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in{' '}
          <code>.env.local</code>, then reload.
        </p>
      </div>
    );
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: rows, error: dbError } = await supabase
    .from(DEMO_TABLE)
    .select('*')
    .limit(20);

  let storageList = null;
  let storageError = null;
  let publicUrl = null;

  if (DEMO_BUCKET) {
    const listResult = await supabase.storage
      .from(DEMO_BUCKET)
      .list('', { limit: 20 });
    storageList = listResult.data;
    storageError = listResult.error;

    const firstFile = storageList?.find((f) => f.name);
    if (firstFile?.name) {
      const { data: pub } = supabase.storage
        .from(DEMO_BUCKET)
        .getPublicUrl(firstFile.name);
      publicUrl = pub?.publicUrl ?? null;
    }
  }

  return (
    <div className="page-content">
      <h1>Supabase demo</h1>
      <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>
        Table: <code>{DEMO_TABLE}</code>
        {DEMO_BUCKET ? (
          <>
            {' '}
            · Bucket: <code>{DEMO_BUCKET}</code>
          </>
        ) : (
          <>
            {' '}
            · Storage: set <code>NEXT_PUBLIC_SUPABASE_DEMO_BUCKET</code> to test
            listing
          </>
        )}
      </p>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Postgres</h2>
        {dbError ? (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.85rem',
              opacity: 0.9,
            }}
          >
            {dbError.message}
          </pre>
        ) : (
          <ul>
            {(rows ?? []).map((row) => (
              <li key={row.id ?? JSON.stringify(row)}>
                <code>{JSON.stringify(row)}</code>
              </li>
            ))}
          </ul>
        )}
        {!dbError && (!rows || rows.length === 0) ? (
          <p>No rows (empty table or RLS blocked anon read).</p>
        ) : null}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Storage</h2>
        {!DEMO_BUCKET ? (
          <p>Skipped — no demo bucket configured.</p>
        ) : storageError ? (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.85rem',
              opacity: 0.9,
            }}
          >
            {storageError.message}
          </pre>
        ) : (
          <>
            <ul>
              {(storageList ?? []).map((item) => (
                <li key={item.id ?? item.name}>
                  <code>{item.name}</code>
                </li>
              ))}
            </ul>
            {publicUrl ? (
              <p>
                Example public URL:{' '}
                <a href={publicUrl} rel="noreferrer">
                  {publicUrl}
                </a>
              </p>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
