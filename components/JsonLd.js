import { getPersonJsonLd, getWebSiteJsonLd } from '@/lib/json-ld';

export function JsonLd() {
  const blocks = [getPersonJsonLd(), getWebSiteJsonLd()];
  return (
    <>
      {blocks.map((data) => (
        <script
          key={data['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
