import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Technology from '../components/Technology';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Technology />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;