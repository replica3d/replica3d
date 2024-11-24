import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
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

      <div className="relative h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('images/druk-3d.webp')`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: '#153243', opacity: 0.5 }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full h-full">
          <motion.h1
            className="absolute bottom-0 font-['Poppins'] font-bold text-4xl md:text-6xl text-white text-left tracking-tight -mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            druk 3d {city.name.toLowerCase()}
          </motion.h1>
        </div>
      </div>

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