import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Printer } from 'lucide-react';

interface CityIntroProps {
  cityName: string;
  nameLocative: string;
  preposition: string;
}

const CityIntro: React.FC<CityIntroProps> = ({ cityName, nameLocative, preposition }) => {
  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg mb-12"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="mt-0 mb-4 text-[#333333]">Drukarnia 3D {cityName}</h2>
        <p className="text-base leading-relaxed mb-0 mt-0 text-[#333333]">
          Szukasz profesjonalnego druku 3D {preposition} {nameLocative}? Jesteśmy lokalnym ekspertem w technologii FDM, oferującym szybkie i niezawodne usługi druku 3D dla firm i osób prywatnych. Nasza drukarnia 3D {preposition} {nameLocative} specjalizuje się w tworzeniu prototypów, części zamiennych i modeli projektowych w przystępnych cenach. Dzięki najnowocześniejszym drukarkom FDM i doświadczonemu zespołowi, zrealizujemy Twój projekt szybko i dokładnie - od pojedynczych elementów po większe serie produkcyjne.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 not-prose">
        {[
          {
            icon: <DollarSign className="w-8 h-8 text-blue-600" />,
            title: 'Koszty druku 3D',
            content: `Konkurencyjne ceny druku 3D ${preposition} ${nameLocative}. Wycena uwzględnia przygotowanie projektu i materiały.`,
          },
          {
            icon: <Printer className="w-8 h-8 text-blue-600" />,
            title: 'Technologie druku',
            content: 'Profesjonalny druk FDM oraz SLA dostosowany do potrzeb Twojego projektu.',
          },
          {
            icon: <Clock className="w-8 h-8 text-blue-600" />,
            title: 'Szybka realizacja',
            content: `Ekspresowa realizacja zleceń na terenie ${cityName} i okolic.`,
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
              <h3 className="text-xl font-semibold text-[#333333]">{card.title}</h3>
            </div>
            <p className="text-base text-[#333333]">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CityIntro;