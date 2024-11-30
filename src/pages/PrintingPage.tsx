import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Clock, DollarSign, Printer, ExternalLink } from 'lucide-react';
import CitiesList from '../components/city/CitiesList';
import MaterialsTable from '../components/materials/MaterialsTable';
import { cities } from '../data/cities';

const PrintingPage = () => {
  return (
    <>
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
            className="absolute bottom-0 font-['Poppins'] font-bold text-6xl md:text-8xl text-white text-left tracking-tight -mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            druk 3d
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none text-[#333333]"
        >
          {/* Introduction Card */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg mb-12"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-base leading-relaxed mb-0 mt-0">
              <strong>REPLICA3D</strong> jest profesjonalną{' '}
              <strong>drukarnią 3D we Wrocławiu</strong>. Specjalizujemy się w
              produkcji prototypów i krótkich serii. Dzięki elastyczności
              naszych usług 3D oraz praktyki w dostarczaniu projektów 3D,
              jesteśmy w stanie wykryć ewentualne błędy w projekcie i doradzić
              Ci tak, by zapewnić sukces Twojego projektu.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 not-prose">
            {[
              {
                icon: <DollarSign className="w-8 h-8 text-blue-600" />,
                title: 'Koszty druku 3D',
                content:
                  'Wycena uwzględnia przygotowanie projektu, post-produkcję, koszty materiałów i eksploatacji.',
              },
              {
                icon: <Printer className="w-8 h-8 text-blue-600" />,
                title: 'Technologie druku',
                content:
                  'Oferujemy druk FDM (depozycja ciągłych włókien) oraz SLA (druk żywicą) w atrakcyjnych cenach.',
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-600" />,
                title: 'Czas realizacji',
                content:
                  'Szybka realizacja zleceń z uwzględnieniem jakości i specyfikacji projektu.',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                </div>
                <p className="text-base">{card.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Materials Table */}
          <MaterialsTable />

          {/* Pricing Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 mt-0">
              Ile kosztuje usługa drukowania 3D?
            </h2>
            <div className="space-y-4">
              <p className="text-base">
                Najważniejszym, co trzeba ustalić w celu wyceny{' '}
                <strong>usługi druku 3D</strong> są czynniki wpływające na cenę
                każdej części.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">
                    Koszty podstawowe
                  </h3>
                  <ul className="text-base space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Przygotowanie projektu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Post-produkcja części</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Koszt godziny drukowania</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">
                    Koszty dodatkowe
                  </h3>
                  <ul className="text-base space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Materiały i utrzymanie sprzętu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Szkolenia i rozwój</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>Obsługa i nadzór procesu</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Time Estimation Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 mt-0">
              Ile czasu zajmuje drukowanie 3D?
            </h2>
            <div className="space-y-6">
              <p className="text-base">
                Aby zrozumieć, ile czasu zajmie druk, musimy wziąć pod uwagę
                szereg czynników podczas procesu drukowania 3D.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                {[
                  {
                    title: 'Grubość warstw',
                    description:
                      'Określa jakość wykończenia. Cieńsze warstwy = wyższa jakość, dłuższy czas',
                  },
                  {
                    title: 'Gęstość obiektu',
                    description:
                      'Wpływa na wytrzymałość i czas druku. Większe wypełnienie = dłuższy czas',
                  },
                  {
                    title: 'Złożoność projektu',
                    description:
                      'Im bardziej skomplikowana geometria, tym dłuższy czas druku',
                  },
                ].map((factor, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {factor.title}
                    </h3>
                    <p className="text-base">{factor.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* External Resources */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 mt-0">
              Przydatne zasoby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
              {[
                {
                  name: 'Makerworld',
                  url: 'https://makerworld.com/',
                  description: 'Społeczność twórców i modeli 3D',
                },
                {
                  name: 'Printables',
                  url: 'https://printables.com/',
                  description: 'Platforma modeli 3D od Prusa',
                },
                {
                  name: 'Thingiverse',
                  url: 'https://www.thingiverse.com/',
                  description: 'Największa społeczność modeli 3D',
                },
                {
                  name: 'MyMiniFactory',
                  url: 'https://www.myminifactory.com/',
                  description: 'Zweryfikowane modele 3D',
                },
                {
                  name: 'Yeggi',
                  url: 'https://www.yeggi.com/',
                  description: 'Wyszukiwarka modeli 3D',
                },
              ].map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{resource.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-base mt-2">{resource.description}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Cities List */}
          <CitiesList cities={Object.values(cities)} />
        </motion.div>
      </div>

      <Contact />
      <Footer />
    </>
  );
};

export default PrintingPage;