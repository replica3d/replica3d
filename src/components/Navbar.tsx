import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = scrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-transparent';
  const textColor = scrolled ? 'text-[#333333]' : 'text-white';

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex-shrink-0">
            <h1 className={`font-bungee text-2xl md:text-6xl transition-colors duration-300 ${textColor}`}>
              REPLICA3D
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/druk-3d"
            className={`hover:text-blue-600 transition-colors font-semibold ${textColor}`}
          >
            Druk 3D
          </Link>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="flex-shrink-0 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Kontakt
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden ${scrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-black/80'}`}
          >
            <div className="px-4 py-4 space-y-4 flex flex-col items-center">
              <Link
                to="/druk-3d"
                onClick={() => setIsMenuOpen(false)}
                className={`text-center font-semibold hover:text-blue-600 transition-colors ${
                  scrolled ? 'text-[#333333]' : 'text-white'
                }`}
              >
                Druk 3D
              </Link>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="w-full max-w-[200px] bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Kontakt
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;