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

const getMetaTags = (route: string) => {
  const baseUrl = 'https://replica3d.pl';
  const imageUrl = `${baseUrl}/images/hero.webp`;

  if (route === '/') {
    return {
      title: 'REPLICA3D - Druk 3D na zamówienie – Wydruki 3D Wrocław',
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
          "addressLocality": "Wrocław",
          "addressRegion": "Dolnośląskie",
          "addressCountry": "PL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.1079,
          "longitude": 17.0385
        },
        "priceRange": "$$"
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
    return {
      title: `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`,
      description: `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
      schema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Ile kosztuje wydruk 3D ${city.preposition} ${city.nameLocative} i od czego zależy cena?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Koszt druku 3D zależy od kilku kluczowych czynników: wielkości modelu, zastosowanego materiału, czasu wydruku oraz stopnia skomplikowania projektu. Wycena uwzględnia przygotowanie projektu, post-produkcję, koszty materiałów i eksploatacji."
            }
          },
          {
            "@type": "Question",
            "name": `Jak długo trwa realizacja zamówienia w drukarni 3D ${city.preposition} ${city.nameLocative}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standardowy czas realizacji zamówień w naszej drukarni 3D wynosi 3-5 dni roboczych. Termin może być krótszy lub dłuższy w zależności od specyfikacji projektu oraz wielkości zamówienia. Na życzenie klienta oferujemy także usługę ekspresową. Dokładny czas realizacji potwierdzamy po otrzymaniu projektu."
            }
          },
          {
            "@type": "Question",
            "name": `Jakie materiały wykorzystuje wasza drukarnia 3D ${city.name} do wydruków?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nasza drukarnia 3D oferuje szeroki wybór materiałów do druku 3D w technologii FDM. Standardowo pracujemy z materiałami takimi jak PLA, PETG, ASA, TPU, PA, PET oraz PC. Maksymalne wymiary wydruku to 360x360x360mm. Niektóre materiały specjalistyczne są dostępne na zamówienie - zachęcamy do kontaktu w celu omówienia szczegółów projektu."
            }
          },
          {
            "@type": "Question",
            "name": `Czy druk 3D ${city.name} obejmuje także dostawę wydruków do klienta?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tak, oferujemy kompleksową obsługę zamówień wraz z dostawą. Realizujemy wysyłki na terenie całej Polski, a także za granicę. Współpracujemy z profesjonalnymi firmami kurierskimi, zapewniając bezpieczną dostawę wydruków 3D pod wskazany adres. Obsługujemy zarówno klientów indywidualnych, jak i firmy."
            }
          },
          {
            "@type": "Question",
            "name": `W jaki sposób mogę zamówić wydruk 3D ${city.preposition} ${city.nameLocative} i jakie pliki są potrzebne?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Proces zamawiania wydruku 3D jest prosty. Przyjmujemy pliki w formatach .stl oraz .step (inne formaty możemy sprawdzić po kontakcie mailowym). Jeśli nie posiadasz gotowego modelu 3D, oferujemy również usługi projektowe - pomożemy stworzyć model odpowiadający Twoim potrzebom. Aby otrzymać wycenę i omówić szczegóły projektu, zachęcamy do kontaktu poprzez formularz kontaktowy. Nasz zespół odpowie na wszystkie pytania i pomoże w realizacji Twojego projektu."
            }
          }
        ]
      }
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
        .append('<meta charset="UTF-8">')
        .append('<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">')
        .append('<link rel="icon" type="image/svg+xml" href="/vite.svg">')
        .append(`<title>${metaTags.title}</title>`)
        .append(`<meta name="description" content="${metaTags.description}">`)
        .append(`<meta name="robots" content="${metaTags.noindex ? 'noindex, nofollow' : 'index, follow'}">`)
        .append('<meta name="language" content="Polish">')
        .append('<meta name="author" content="REPLICA3D">')
        .append('<meta name="geo.region" content="PL-DS">')
        .append('<meta name="geo.placename" content="Wrocław">')
        .append(`<link rel="canonical" href="${baseUrl}${route}">`)
        
        // OpenGraph tags
        .append('<meta property="og:type" content="website">')
        .append(`<meta property="og:url" content="${baseUrl}${route}">`)
        .append(`<meta property="og:title" content="${metaTags.title}">`)
        .append(`<meta property="og:description" content="${metaTags.description}">`)
        .append(`<meta property="og:image" content="${baseUrl}/images/hero.webp">`)
        
        // Twitter tags
        .append('<meta property="twitter:card" content="summary_large_image">')
        .append(`<meta property="twitter:url" content="${baseUrl}${route}">`)
        .append(`<meta property="twitter:title" content="${metaTags.title}">`)
        .append(`<meta property="twitter:description" content="${metaTags.description}">`)
        .append(`<meta property="twitter:image" content="${baseUrl}/images/hero.webp">`);

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