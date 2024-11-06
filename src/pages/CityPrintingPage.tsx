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
          "text": "Standardowy czas realizacji zamówień w naszej drukarni 3D wynosi 3-5 dni roboczych."
        }
      }
    ]
  };

  return (
    <div className="city-page">
      <SEO />

      <Navbar />
      <CityHero title={`druk 3d ${city.name.toLowerCase()}`} />

      <main className="max-w-6xl mx-auto px-4 py-10">
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
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default CityPrintingPage;