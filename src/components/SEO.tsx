import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  getBaseMetaTags,
  getPrintingMetaTags,
  getCityMetaTags,
  get404MetaTags
} from '../utils/metaTagsGenerator';

const SEO: React.FC = () => {
  const location = useLocation();
  
  const metaTags = useMemo(() => {
    const path = location.pathname;
    
    if (path === '/') return getBaseMetaTags();
    if (path === '/druk-3d') return getPrintingMetaTags();
    if (path === '/404') return get404MetaTags();
    
    if (path.startsWith('/druk-3d-')) {
      const cityUrl = path.replace('/druk-3d-', '');
      return getCityMetaTags(cityUrl);
    }
    
    return get404MetaTags();
  }, [location.pathname]);

  const {
    title,
    description,
    url,
    imageUrl,
    noindex,
    schema
  } = metaTags;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="Polish" />
      <meta name="author" content="REPLICA3D" />
      <meta name="geo.region" content="PL-DS" />
      <meta name="geo.placename" content="Wrocław" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

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