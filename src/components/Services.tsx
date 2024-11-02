import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Layers, Clock, Palette } from 'lucide-react';

const services = [
  {
    icon: <Printer className="w-12 h-12 text-blue-600" />,
    title: 'Druk 3D',
    description: 'Wysokiej jakości usługi druku FDM i SLA dla wszystkich Twoich potrzeb.',
  },
  {
    icon: <Layers className="w-12 h-12 text-blue-600" />,
    title: 'Prototypowanie',
    description: 'Szybkie prototypowanie, aby szybko i efektywnie zrealizować Twoje pomysły.',
  },
  {
    icon: <Clock className="w-12 h-12 text-blue-600" />,
    title: 'Szybka Realizacja',
    description: 'Krótkie terminy realizacji bez kompromisów w jakości.',
  },
  {
    icon: <Palette className="w-12 h-12 text-blue-600" />,
    title: 'Wykończenie',
    description: 'Różne opcje wykończenia dopasowane do Twoich wymagań.',
  },
];

const Services = () => {
  return (
    <div id="services" className="py-12 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('images/bg.webp')`
        }}
      />
      <div className="absolute inset-0 bg-black opacity-5" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 text-sm font-semibold tracking-wider mb-2">CO OFERUJEMY</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">nasze usługi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferujemy kompleksowy zakres usług druku 3D, od prototypowania po serie produkcyjne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;