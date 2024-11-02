import React from 'react';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';

const technologies = [
  {
    icon: <Printer className="w-16 h-16 text-white" />,
    title: 'Druk FDM',
    description: 'Idealny do prototypów funkcjonalnych i części użytkowych',
    specs: [
      'Rozdzielczość warstwy: 0.1mm',
      'Obszar roboczy: 300x300x400mm',
      'Materiały: PLA, ABS, PETG, TPU',
      'Idealne do: Części funkcjonalnych, Prototypów, Narzędzi',
      'Ekonomiczne dla większych części'
    ],
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    icon: <Printer className="w-16 h-16 text-white" />,
    title: 'Druk SLA',
    description: 'Wydruki o wysokiej szczegółowości do precyzyjnych zastosowań',
    specs: [
      'Rozdzielczość warstwy: 0.025mm',
      'Obszar roboczy: 145x145x175mm',
      'Materiały: Standardowe, Wytrzymałe, Elastyczne żywice',
      'Idealne do: Modeli szczegółowych, Biżuterii, Stomatologii',
      'Doskonałe wykończenie powierzchni'
    ],
    gradient: 'from-orange-500 to-orange-700'
  }
];

const Technology = () => {
  return (
    <div id="technology" className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://replica3d.pl/wp-content/uploads/2020/03/bg-home.jpg')`
        }}
      />
      <div className="absolute inset-0 bg-black opacity-5" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wider mb-2">JAK PRACUJEMY</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">nasza technologia</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Używamy najnowocześniejszej technologii druku 3D, aby zapewnić najwyższą
            jakość realizacji Twoich projektów.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.02 }}
              className="relative h-[280px] rounded-lg shadow-xl overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient}`}>
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-white text-center transition-transform duration-300 group-hover:-translate-y-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{tech.title}</h3>
                  <p className="text-lg text-gray-100">{tech.description}</p>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-white transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
                  <ul className="space-y-2 text-left w-full">
                    {tech.specs.map((spec, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center"
                      >
                        <span className="w-2 h-2 bg-white rounded-full mr-2 flex-shrink-0"></span>
                        <span className="break-words">{spec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;