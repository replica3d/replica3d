import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Link as LinkIcon, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO />
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <div className="relative mb-8 inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative"
            >
              <div className="flex items-center justify-center space-x-4">
                <LinkIcon className="w-16 h-16 text-blue-600" />
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Ups! Zerwane połączenie</h1>
          <h2 className="text-xl text-gray-600 mb-6">Wygląda na to, że ten link jest uszkodzony</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Nie martw się! Możesz wrócić do strony głównej lub cofnąć się do poprzedniej strony.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105"
            >
              <Home size={20} />
              <span>Strona główna</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span>Wróć</span>
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;