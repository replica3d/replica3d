import { cities } from '../data/cities';

interface MetaTagsConfig {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  noindex?: boolean;
  schema?: object;
}

export const getBaseMetaTags = (): MetaTagsConfig => ({
  title: 'REPLICA3D - Druk 3D na zamówienie – Wydruki 3D Wrocław',
  description: 'Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych.',
  url: 'https://replica3d.pl',
  imageUrl: 'https://replica3d.pl/images/hero.webp',
  schema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "REPLICA3D",
    "image": "https://replica3d.pl/images/hero.webp",
    "@id": "https://replica3d.pl",
    "url": "https://replica3d.pl",
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

export const getPrintingMetaTags = (): MetaTagsConfig => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  description: 'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
  url: 'https://replica3d.pl/druk-3d',
  imageUrl: 'https://replica3d.pl/images/hero.webp'
});

export const getCityMetaTags = (cityUrl: string): MetaTagsConfig => {
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
  };

  return {
    title: `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`,
    description: `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
    url: `https://replica3d.pl/druk-3d-${city.url}`,
    imageUrl: 'https://replica3d.pl/images/hero.webp',
    schema: faqSchema
  };
};

export const get404MetaTags = (): MetaTagsConfig => ({
  title: '404 - Strona nie została znaleziona | REPLICA3D',
  description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
  url: 'https://replica3d.pl/404',
  noindex: true
});

export const generateMetaTags = (config: MetaTagsConfig): string => {
  const tags = [
    `<title>${config.title}</title>`,
    `<meta name="title" content="${config.title}" />`,
    `<meta name="description" content="${config.description}" />`,
    
    // Open Graph
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${config.url}" />`,
    `<meta property="og:title" content="${config.title}" />`,
    `<meta property="og:description" content="${config.description}" />`,
    `<meta property="og:image" content="${config.imageUrl}" />`,
    
    // Twitter
    '<meta property="twitter:card" content="summary_large_image" />',
    `<meta property="twitter:url" content="${config.url}" />`,
    `<meta property="twitter:title" content="${config.title}" />`,
    `<meta property="twitter:description" content="${config.description}" />`,
    `<meta property="twitter:image" content="${config.imageUrl}" />`,
    
    // Additional SEO
    `<meta name="robots" content="${config.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    '<meta name="language" content="Polish" />',
    '<meta name="author" content="REPLICA3D" />',
    '<meta name="geo.region" content="PL-DS" />',
    '<meta name="geo.placename" content="Wrocław" />',
    
    // Canonical
    `<link rel="canonical" href="${config.url}" />`
  ];

  // Add schema if provided
  if (config.schema) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(config.schema)}</script>`);
  }

  return tags.join('\n');
};