import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { localBusinessSchema, getServiceSchema, getCityFAQSchema } from '../utils/schema';

const BASE_URL = 'https://replica3d.pl';
const DEFAULT_IMAGE = `${BASE_URL}/images/hero.webp`;

interface MetaConfig {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  noindex?: boolean;
  schema?: object;
}

const getBaseMetaConfig = (): MetaConfig => ({
  title: 'REPLICA3D - Druk 3D na zamówienie - Wydruki 3D Wrocław',
  description: 'Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych.',
  url: BASE_URL,
  imageUrl: DEFAULT_IMAGE,
  schema: localBusinessSchema
});

const getPrintingMetaConfig = (): MetaConfig => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  description: 'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
  url: `${BASE_URL}/druk-3d`,
  imageUrl: DEFAULT_IMAGE,
  schema: getServiceSchema()
});

const getCityMetaConfig = (cityUrl: string): MetaConfig => ({
  title: `Drukowanie 3D ${cityUrl} | Usługi druku 3D - REPLICA3D`,
  description: `Profesjonalne usługi druku 3D w ${cityUrl}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
  url: `${BASE_URL}/druk-3d-${cityUrl}`,
  imageUrl: DEFAULT_IMAGE,
  schema: getCityFAQSchema(cityUrl)
});

const get404MetaConfig = (): MetaConfig => ({
  title: '404 - Strona nie została znaleziona | REPLICA3D',
  description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
  url: `${BASE_URL}/404`,
  imageUrl: DEFAULT_IMAGE,
  noindex: true
});

const SEO: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const config = (() => {
    if (path === '/') return getBaseMetaConfig();
    if (path === '/druk-3d') return getPrintingMetaConfig();
    if (path === '/404') return get404MetaConfig();
    
    if (path.startsWith('/druk-3d-')) {
      const cityUrl = path.replace('/druk-3d-', '');
      return getCityMetaConfig(cityUrl);
    }
    
    return get404MetaConfig();
  })();

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