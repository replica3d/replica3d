import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, image: 'images/project_1.webp' },
  { id: 2, image: 'images/project_2.webp' },
  { id: 3, image: 'images/project_3.webp' },
  { id: 4, image: 'images/project_4.webp' },
  { id: 5, image: 'images/project_5.webp' },
  { id: 6, image: 'images/project_6.webp' },
  { id: 7, image: 'images/project_7.webp' },
  { id: 8, image: 'images/project_8.webp' },
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getVisibleProjects = () => {
    if (windowWidth < 768) {
      return [projects[currentIndex]];
    } else {
      const visibleProjects = [];
      for (let i = 0; i < 5; i++) {
        const index = (currentIndex + i) % projects.length;
        visibleProjects.push(projects[index]);
      }
      return visibleProjects;
    }
  };

  return (
    <div id="portfolio" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Nasze Portfolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zobacz nasze ostatnie projekty i przekonaj się, jak pomagamy naszym
            klientom realizować ich pomysły.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className={`grid ${windowWidth < 768 ? 'grid-cols-1' : 'grid-cols-5'} gap-4`}>
            <AnimatePresence mode="popLayout">
              {getVisibleProjects().map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square"
                >
                  <motion.div 
                    className="w-full h-full bg-gray-200"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {windowWidth < 768 && (
            <div className="flex justify-center mt-4 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;