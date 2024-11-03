import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl, schema }) => {
  // Ensure the canonical URL is absolute
  const absoluteUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `https://replica3d.pl${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://replica3d.pl/images/hero.webp" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={absoluteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://replica3d.pl/images/hero.webp" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Polish" />
      <meta name="author" content="REPLICA3D" />
      <meta name="geo.region" content="PL-DS" />
      <meta name="geo.placename" content="Wrocław" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={absoluteUrl} />

      {/* Schema.org markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;