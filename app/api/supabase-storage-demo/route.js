import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_DEMO_BUCKET;
  if (!bucket) {
    return Response.json({
      skipped: true,
      message: 'Set NEXT_PUBLIC_SUPABASE_DEMO_BUCKET to list objects.',
    });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return Response.json(
      { error: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY' },
      { status: 500 }
    );
  }

  const supabase = createClient(cookies());
  const { data, error } = await supabase.storage.from(bucket).list('', {
    limit: 20,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ bucket, objects: data ?? [] });
}
