import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>REPLICA3D – Druk 3D na zamówienie – Wydruki 3D Wrocław</title>
        <meta
          name="description"
          content="Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych."
        />
        <meta
          property="og:title"
          content="REPLICA3D – Druk 3D na zamówienie – Wydruki 3D Wrocław"
        />
        <meta
          property="og:description"
          content="Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych."
        />
        <link rel="canonical" href="https://replica3d.pl" />
      </Helmet>
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