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
      className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh] overflow-hidden"
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
          <div className="font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-8xl leading-none text-right md:text-left">
            <div>we make</div>
            <div>awesome</div>
            <div>prints</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
