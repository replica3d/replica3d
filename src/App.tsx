import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PrintingPage from './pages/PrintingPage';
import CityPrintingPage from './pages/CityPrintingPage';
import MouseTrail from './components/MouseTrail';
import { cities } from './data/cities';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <MouseTrail />
        <ScrollToTop />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;