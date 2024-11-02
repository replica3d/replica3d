import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import PrintingPage from './pages/PrintingPage';
import MouseTrail from './components/MouseTrail';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;