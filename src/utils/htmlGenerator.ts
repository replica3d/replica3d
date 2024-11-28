import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { VALID_ROUTES, isValidRoute } from '../config/routes';
import { cities } from '../data/cities';

const getOutputPath = (route: string): string => {
  if (route === '/') return 'index';
  if (route === '/404') return '404';
  return route.slice(1); // Remove leading slash
};

const preloadImages = [
  '/images/hero.webp',
  '/images/druk-3d.webp',
  '/images/footer.webp',
  '/images/bg.webp'
];

const googleAnalytics = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ELPH6H9K2Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ELPH6H9K2Z');
</script>
`;

const getMetaTags = (route: string) => {
  const baseUrl = 'https://replica3d.pl';
  const imageUrl = `${baseUrl}/images/hero.webp`;

  if (route === '/') {
    return {
      title: 'REPLICA3D - Druk 3D na zamówienie - Wydruki 3D Wrocław',
      description: 'Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych.',
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "REPLICA3D",
        "image": imageUrl,
        "@id": baseUrl,
        "url": baseUrl,
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
    };
  }

  if (route === '/druk-3d') {
    return {
      title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
      description: 'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Druk 3D na zamówienie",
        "provider": {
          "@type": "LocalBusiness",
          "name": "REPLICA3D",
          "image": imageUrl,
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
    };
  }

  const cityUrl = route.replace('/druk-3d-', '');
  const city = Object.values(cities).find(c => c.url === cityUrl);

  if (city) {
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
      schema: faqSchema
    };
  }

  return {
    title: '404 - Strona nie została znaleziona | REPLICA3D',
    description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
    noindex: true
  };
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) continue;

    try {
      const $ = cheerio.load(template);
      const metaTags = getMetaTags(route);
      const baseUrl = 'https://replica3d.pl';

      // Set basic meta tags
      $('head').empty()
        .append(googleAnalytics)
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
        .append(`<title>${metaTags.title}</title>`)
        .append(`<meta name="title" content="${metaTags.title}">`)
        .append(`<meta name="description" content="${metaTags.description}">`)
        
        // Open Graph / Facebook
        .append('<meta property="og:type" content="website">')
        .append(`<meta property="og:url" content="${baseUrl}${route}">`)
        .append(`<meta property="og:title" content="${metaTags.title}">`)
        .append(`<meta property="og:description" content="${metaTags.description}">`)
        .append(`<meta property="og:image" content="${baseUrl}/images/hero.webp">`)
        
        // Twitter
        .append('<meta property="twitter:card" content="summary_large_image">')
        .append(`<meta property="twitter:url" content="${baseUrl}${route}">`)
        .append(`<meta property="twitter:title" content="${metaTags.title}">`)
        .append(`<meta property="twitter:description" content="${metaTags.description}">`)
        .append(`<meta property="twitter:image" content="${baseUrl}/images/hero.webp">`)
        
        // Additional SEO Meta Tags
        .append(`<meta name="robots" content="${metaTags.noindex ? 'noindex, nofollow' : 'index, follow'}">`)
        .append('<meta name="language" content="Polish">')
        .append('<meta name="author" content="REPLICA3D">')
        .append('<meta name="geo.region" content="PL-DS">')
        .append('<meta name="geo.placename" content="Wrocław">')
        .append(`<link rel="canonical" href="${baseUrl}${route}">`)
        
        // Base URL
        .append('<base href="/" />');

      // Add schema if available
      if (metaTags.schema) {
        $('head').append(`<script type="application/ld+json">${JSON.stringify(metaTags.schema)}</script>`);
      }

      // Add preload tags for critical images
      preloadImages.forEach(image => {
        $('head').append(`<link rel="preload" href="${image}" as="image" type="image/webp">`);
      });

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