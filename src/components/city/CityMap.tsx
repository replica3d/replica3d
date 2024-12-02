import React from 'react';
import { motion } from 'framer-motion';

interface CityMapProps {
  cityName: string;
}

const CityMap: React.FC<CityMapProps> = ({ cityName }) => {
  const encodedAddress = encodeURIComponent(`${cityName}, Poland`);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=12`;

  return (
    <div className="w-full bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full h-[400px] md:h-[500px]"
      >
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa ${cityName}`}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default CityMap;