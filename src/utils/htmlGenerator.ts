import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { VALID_ROUTES, isValidRoute } from '../config/routes';
import { cities } from '../data/cities';

interface MetaConfig {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  noindex?: boolean;
  schema?: object;
}

const BASE_URL = 'https://replica3d.pl';
const DEFAULT_IMAGE = `${BASE_URL}/images/hero.webp`;

const PRELOAD_IMAGES = [
  '/images/hero.webp',
  '/images/druk-3d.webp',
  '/images/footer.webp',
  '/images/bg.webp'
];

const GOOGLE_ANALYTICS = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ELPH6H9K2Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ELPH6H9K2Z');
</script>
`;

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

const getMetaConfig = (route: string): MetaConfig => {
  if (route === '/') return getBaseMetaConfig();
  if (route === '/druk-3d') return getPrintingMetaConfig();
  if (route === '/404') return get404MetaConfig();
  
  if (route.startsWith('/druk-3d-')) {
    const cityUrl = route.replace('/druk-3d-', '');
    return getCityMetaConfig(cityUrl);
  }
  
  return get404MetaConfig();
};

const getOutputPath = (route: string): string => {
  if (route === '/') return 'index';
  if (route === '/404') return '404';
  return route.slice(1);
};

const generateHtml = ($: cheerio.CheerioAPI, config: MetaConfig): void => {
  $('head').empty()
    .append(GOOGLE_ANALYTICS)
    .append('<meta charset="UTF-8">')
    .append('<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">')
    
    // Favicon configuration
    .append('<link rel="icon" type="image/x-icon" href="/favicon.ico">')
    .append('<link rel="icon" type="image/svg+xml" href="/favicon.svg">')
    .append('<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">')
    .append('<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">')
    .append('<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">')
    .append('<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">')
    .append('<link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512">')
    .append('<link rel="apple-touch-icon" href="/apple-touch-icon.png">')
    .append('<link rel="manifest" href="/site.webmanifest">')
    .append('<meta name="theme-color" content="#ffffff">')
    .append('<meta name="msapplication-TileColor" content="#ffffff">')
    
    // Primary Meta Tags
    .append(`<title>${config.title}</title>`)
    .append(`<meta name="title" content="${config.title}">`)
    .append(`<meta name="description" content="${config.description}">`)
    
    // Open Graph / Facebook
    .append('<meta property="og:type" content="website">')
    .append(`<meta property="og:url" content="${config.url}">`)
    .append(`<meta property="og:title" content="${config.title}">`)
    .append(`<meta property="og:description" content="${config.description}">`)
    .append(`<meta property="og:image" content="${config.imageUrl}">`)
    
    // Twitter
    .append('<meta property="twitter:card" content="summary_large_image">')
    .append(`<meta property="twitter:url" content="${config.url}">`)
    .append(`<meta property="twitter:title" content="${config.title}">`)
    .append(`<meta property="twitter:description" content="${config.description}">`)
    .append(`<meta property="twitter:image" content="${config.imageUrl}">`)
    
    // Additional SEO Meta Tags
    .append(`<meta name="robots" content="${config.noindex ? 'noindex, nofollow' : 'index, follow'}">`)
    .append('<meta name="language" content="Polish">')
    .append('<meta name="author" content="REPLICA3D">')
    .append('<meta name="geo.region" content="PL-DS">')
    .append('<meta name="geo.placename" content="Wrocław">')
    .append(`<link rel="canonical" href="${config.url}">`)
    
    // Base URL
    .append('<base href="/" />');

  // Add schema if available
  if (config.schema) {
    $('head').append(`<script type="application/ld+json">${JSON.stringify(config.schema)}</script>`);
  }

  // Add preload tags for critical images
  PRELOAD_IMAGES.forEach(image => {
    $('head').append(`<link rel="preload" href="${image}" as="image" type="image/webp">`);
  });
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) continue;

    try {
      const $ = cheerio.load(template);
      const config = getMetaConfig(route);
      
      generateHtml($, config);

      // Add CSS files
      const cssFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.css'))
        .map(file => `<link rel="stylesheet" href="/assets/${file}">`);
      $('head').append(cssFiles.join('\n'));

      // Add JS files at the end of body
      const jsFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.js') && !file.includes('.map'))
        .map(file => `<script type="module" src="/assets/${file}"></script>`);
      $('body').append(jsFiles.join('\n'));

      // Write the generated HTML file
      const outputPath = path.resolve(`dist/${getOutputPath(route)}.html`);
      const outputDir = path.dirname(outputPath);
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, $.html());
      console.log(`Generated: ${getOutputPath(route)}.html`);
    } catch (error) {
      console.error(`Failed to generate HTML for route ${route}:`, error);
    }
  }
};