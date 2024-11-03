import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CityHero from '../components/city/CityHero';
import CityIntro from '../components/city/CityIntro';
import CityFAQ from '../components/city/CityFAQ';
import CitiesList from '../components/city/CitiesList';
import SEO from '../components/SEO';

interface City {
  name: string;
  nameLocative: string;
  url: string;
  preposition: string;
}

interface CityPageProps {
  city: City;
  allCities: City[];
}

const CityPrintingPage: React.FC<CityPageProps> = ({ city, allCities }) => {
  const title = `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`;
  const description = `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`;
  const canonicalUrl = `https://replica3d.pl/druk-3d-${city.url}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Ile kosztuje wydruk 3D ${city.preposition} ${city.nameLocative} i od czego zależy cena?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Koszt druku 3D zależy od kilku kluczowych czynników: wielkości modelu, zastosowanego materiału, czasu wydruku oraz stopnia skomplikowania projektu. Nasza drukarnia 3D wykonuje indywidualną wycenę po otrzymaniu modelu 3D. Dla większych serii produkcyjnych oferujemy atrakcyjne rabaty. Nie wymagamy minimalnej wartości zamówienia, dzięki czemu możesz zamówić nawet pojedynczy wydruk 3D."
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

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        schema={faqSchema}
      />

      <Navbar />
      <CityHero title={`druk 3d ${city.name.toLowerCase()}`} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="prose prose-lg max-w-none text-[#333333]">
          <CityIntro
            cityName={city.name}
            nameLocative={city.nameLocative}
            preposition={city.preposition}
          />
          <CityFAQ
            cityName={city.name}
            nameLocative={city.nameLocative}
            preposition={city.preposition}
            schema={faqSchema}
          />
          <CitiesList cities={allCities} />
        </div>
      </div>

      <Contact />
      <Footer />
    </>
  );
};

export default CityPrintingPage;