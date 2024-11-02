import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PrintingPage = () => {
  return (
    <>
      <Helmet>
        <title>Usługi Druku 3D Wrocław - REPLICA3D</title>
        <meta name="description" content="Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk FDM i SLA, szybką realizację i konkurencyjne ceny. Sprawdź naszą ofertę!" />
        <meta property="og:title" content="Usługi Druku 3D Wrocław - REPLICA3D" />
        <meta property="og:description" content="Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk FDM i SLA, szybką realizację i konkurencyjne ceny. Sprawdź naszą ofertę!" />
      </Helmet>

      <Navbar />

      {/* Rest of the component remains the same */}
      <div className="relative h-[30vh] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('images/druk-3d.webp')`
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute inset-0"
          style={{ backgroundColor: '#153243', opacity: 0.5 }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <motion.h2 
            className="font-['Poppins'] font-bold text-6xl md:text-8xl text-white text-left tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            druk 3d
          </motion.h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="mb-6">
            W REPLICA3D specjalizujemy się w świadczeniu wysokiej jakości usług druku 3D przy użyciu najnowszej technologii i materiałów. Nasza wiedza obejmuje różne branże, od prototypowania po serie produkcyjne.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Nasze Technologie Druku</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 not-prose">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-3">Druk FDM</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Rozdzielczość warstwy: 0.1mm</li>
                <li>Obszar roboczy: 300x300x400mm</li>
                <li>Materiały: PLA, ABS, PETG, TPU</li>
                <li>Idealne do prototypów funkcjonalnych</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-3">Druk SLA</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Rozdzielczość warstwy: 0.025mm</li>
                <li>Obszar roboczy: 145x145x175mm</li>
                <li>Różne materiały żywiczne</li>
                <li>Idealne do modeli wysokiej szczegółowości</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Zastosowania</h3>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Szybkie Prototypowanie</li>
            <li>Rozwój Produktu</li>
            <li>Produkcja Części na Zamówienie</li>
            <li>Modele Architektoniczne</li>
            <li>Zastosowania Medyczne i Stomatologiczne</li>
            <li>Projekty Edukacyjne</li>
          </ul>

          <p className="mb-6">
            Niezależnie od tego, czy potrzebujesz pojedynczego prototypu czy pełnej serii produkcyjnej, nasz zespół ekspertów będzie z Tobą współpracował, aby zapewnić sukces Twojego projektu. Oferujemy usługi konsultacyjne, aby pomóc Ci wybrać odpowiednią technologię i materiał do Twoich konkretnych potrzeb.
          </p>
        </motion.div>
      </div>

      <Contact />
      <Footer />
    </>
  );
};

export default PrintingPage;