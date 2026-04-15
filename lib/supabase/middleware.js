import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Refreshes the Supabase session on each matched request.
 * @param {import('next/server').NextRequest} request
 */
export async function updateSession(request) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({
      request: { headers: request.headers },
    });
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, cacheHeaders) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
        if (cacheHeaders && typeof cacheHeaders === 'object') {
          Object.entries(cacheHeaders).forEach(([key, value]) => {
            if (typeof value === 'string') {
              supabaseResponse.headers.set(key, value);
            }
          });
        }
      },
    },
  });

  // Prefer getClaims when available (JWT validated against project keys); else getUser refreshes the session.
  if (typeof supabase.auth.getClaims === 'function') {
    await supabase.auth.getClaims();
  } else {
    await supabase.auth.getUser();
  }

  return supabaseResponse;
}
