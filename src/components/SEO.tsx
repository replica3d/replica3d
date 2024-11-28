import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getMetaConfig } from '../utils/metaConfig';

const SEO: React.FC = () => {
  const location = useLocation();
  const config = getMetaConfig(location.pathname);

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.url} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={config.imageUrl} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={config.url} />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={config.imageUrl} />
      
      <meta name="robots" content={config.noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={config.url} />
      
      {config.schema && (
        <script type="application/ld+json">
          {JSON.stringify(config.schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;