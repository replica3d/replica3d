import React from 'react';
import { motion } from 'framer-motion';

interface CityHeroProps {
  title: string;
}

const CityHero: React.FC<CityHeroProps> = ({ title }) => {
  return (
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
          {title}
        </motion.h1>
      </div>
    </div>
  );
};

export default CityHero;