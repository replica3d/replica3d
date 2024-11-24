import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div
      ref={ref}
      className="relative h-[250px] md:h-[500px] overflow-hidden"
    >
      <Navbar />
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('images/hero.webp')`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#494949', opacity: 0.7 }}
        />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white space-y-0 w-full"
        >
          <h1 className="font-extrabold text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl leading-none text-left md:text-left">
            <div>Druk 3D </div>
            <div>na zamówienie </div>
            <div>Wrocław</div>
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;