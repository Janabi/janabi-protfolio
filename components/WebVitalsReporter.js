'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Logs Core Web Vitals in development for quick local audits.
 * Wire `sendToAnalytics` here if you add an analytics endpoint later.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console -- intentional dev-only CWV logging
      console.log(`[web-vitals] ${metric.name}`, metric.value, metric.rating);
    }
  });
  return null;
}
