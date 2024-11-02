import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Technology from '../components/Technology';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
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