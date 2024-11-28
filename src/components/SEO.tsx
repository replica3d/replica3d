import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cities } from '../data/cities';

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
  schema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "REPLICA3D",
    "image": DEFAULT_IMAGE,
    "@id": BASE_URL,
    "url": BASE_URL,
    "telephone": "+48786886676",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Drohobycka 16D",
      "addressLocality": "Wrocław",
      "postalCode": "54-620",
      "addressRegion": "Dolnośląskie",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.1079,
      "longitude": 17.0385
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/replica3dpl",
      "https://www.instagram.com/replica3d/",
      "https://x.com/replica3d"
    ]
  }
});

const getPrintingMetaConfig = (): MetaConfig => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  description: 'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
  url: `${BASE_URL}/druk-3d`,
  imageUrl: DEFAULT_IMAGE,
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Druk 3D na zamówienie",
    "provider": {
      "@type": "LocalBusiness",
      "name": "REPLICA3D",
      "image": DEFAULT_IMAGE,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wrocław",
        "addressRegion": "Dolnośląskie",
        "addressCountry": "PL"
      }
    },
    "areaServed": "PL",
    "description": "Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA."
  }
});

const getCityMetaConfig = (cityUrl: string): MetaConfig => {
  const city = Object.values(cities).find(c => c.url === cityUrl);
  if (!city) throw new Error(`City not found: ${cityUrl}`);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Ile kosztuje wydruk 3D ${city.preposition} ${city.nameLocative} i od czego zależy cena?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Koszt druku 3D zależy od kilku kluczowych czynników: wielkości modelu, zastosowanego materiału, czasu wydruku oraz stopnia skomplikowania projektu."
        }
      },
      {
        "@type": "Question",
        "name": `Jak długo trwa realizacja zamówienia w drukarni 3D ${city.preposition} ${city.nameLocative}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standardowy czas realizacji zamówień w naszej drukarni 3D wynosi 3-5 dni roboczych. Termin może być krótszy lub dłuższy w zależności od specyfikacji projektu oraz wielkości zamówienia."
        }
      },
      {
        "@type": "Question",
        "name": `Jakie materiały wykorzystuje wasza drukarnia 3D ${city.name} do wydruków?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nasza drukarnia 3D oferuje szeroki wybór materiałów do druku 3D w technologii FDM. Standardowo pracujemy z materiałami takimi jak PLA, PETG, ASA, TPU, PA, PET oraz PC."
        }
      }
    ]
  };

  return {
    title: `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`,
    description: `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
    url: `${BASE_URL}/druk-3d-${city.url}`,
    imageUrl: DEFAULT_IMAGE,
    schema: faqSchema
  };
};

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