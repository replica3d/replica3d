import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PrintingPage from './pages/PrintingPage';
import CityPrintingPage from './pages/CityPrintingPage';
import NotFoundPage from './pages/NotFoundPage';
import MouseTrail from './components/MouseTrail';
import { cities } from './data/cities';

// Scroll handler component
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Handle normal scrolling to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Handle #wycena hash
    if (hash === '#wycena') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        <MouseTrail />
        <ScrollHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/druk-3d" element={<PrintingPage />} />
          {Object.values(cities).map(city => (
            <Route 
              key={city.url}
              path={`/druk-3d-${city.url}`} 
              element={<CityPrintingPage city={city} allCities={Object.values(cities)} />} 
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;