import { cities } from '../data/cities';
import { BASE_URL, DEFAULT_IMAGE } from './constants';

export const localBusinessSchema = {
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
};

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Druk 3D na zamówienie",
  "provider": {
    "@type": "LocalBusiness",
    "name": "REPLICA3D",
    "image": DEFAULT_IMAGE,
    "address": localBusinessSchema.address
  },
  "areaServed": "PL",
  "description": "Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA."
});

export const getCityFAQSchema = (cityUrl: string) => {
  const city = Object.values(cities).find(c => c.url === cityUrl);
  if (!city) throw new Error(`City not found: ${cityUrl}`);

  return {
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
};