import React from 'react';
import { motion } from 'framer-motion';

interface CityFAQProps {
  cityName: string;
  nameLocative: string;
  preposition: string;
  schema: any;
}

const CityFAQ: React.FC<CityFAQProps> = ({ cityName, nameLocative, preposition, schema }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-[#333333]">
        Druk 3D na zamówienie {preposition} {nameLocative}
      </h2>
      <div className="space-y-6">
        {schema.mainEntity.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-3 mt-3 text-[#333333]">{item.name}</h3>
            <p className="text-base text-[#333333] m-0">{item.acceptedAnswer.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CityFAQ;