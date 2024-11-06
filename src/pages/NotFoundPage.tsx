import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="404 - Strona nie została znaleziona | REPLICA3D"
        description="Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona."
        canonicalUrl="https://replica3d.pl/404"
        noindex={true}
      />
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-[#333333] mb-6">Strona nie została znaleziona</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home size={20} />
              <span>Strona główna</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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