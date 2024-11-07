import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface City {
  name: string;
  url: string;
}

interface CitiesListProps {
  cities: City[];
}

const CitiesList: React.FC<CitiesListProps> = ({ cities }) => {
  // Sort cities alphabetically by name
  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mb-8">
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-3xl font-bold mb-3 mt-0 text-[#333333]">Druk 3D w Polsce i na Świecie</h2>
        <p className="text-base mb-4 text-[#333333]">
          Działamy bez granic! REPLICA3D świadczy profesjonalne usługi druku 3D w Polsce i za granicą. Realizujemy wysyłkę do każdego miejsca na świecie, zapewniając bezpieczne dostarczenie wydruków. Nasi klienci pochodzą między innymi z następujących miast:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {sortedCities.map((city) => (
            <motion.div
              key={city.url}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link
                to={`/druk-3d-${city.url}`}
                className="flex items-center space-x-1 p-1 rounded-lg hover:bg-white/50 transition-all duration-200"
              >
                <MapPin className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm text-[#333333] font-medium group-hover:text-blue-600 transition-colors">
                  {city.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CitiesList;