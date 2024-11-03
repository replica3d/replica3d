import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Technology from '../components/Technology';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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
      <SEO
        title="REPLICA3D – Druk 3D na zamówienie – Wydruki 3D Wrocław"
        description="Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych."
        canonicalUrl="https://replica3d.pl"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "REPLICA3D",
          "image": "https://replica3d.pl/images/hero.webp",
          "@id": "https://replica3d.pl",
          "url": "https://replica3d.pl",
          "telephone": "+48786886676",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Wrocław",
            "addressRegion": "Dolnośląskie",
            "addressCountry": "PL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.1079,
            "longitude": 17.0385
          },
          "priceRange": "$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          },
          "sameAs": [
            "https://www.facebook.com/replica3dpl",
            "https://www.instagram.com/replica3d/",
            "https://x.com/replica3d"
          ]
        }}
      />
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