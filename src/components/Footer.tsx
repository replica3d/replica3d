import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're on the home page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="relative text-white w-full overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('images/footer.webp')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#54595F', opacity: 0.8 }}
      />
      <div className="relative max-w-6xl mx-auto px-4 py-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4" aria-label="O nas">Drukarnia 3D</h3>
            <p className="text-gray-300">
              Profesjonalne usługi druku 3D dla wszystkich Twoich potrzeb. Od
              prototypów po serie produkcyjne, mamy wszystko, czego
              potrzebujesz.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" aria-label="Menu nawigacyjne">Szybkie Linki</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Usługi
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleLinkClick(e, 'portfolio')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  onClick={(e) => handleLinkClick(e, 'technology')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Technologia
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Wy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" aria-label="Informacje kontaktowe">Wycena Druku 3D</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={20} className="text-gray-300 flex-shrink-0" />
                <a
                  href="mailto:info@replica3d.pl"
                  className="text-gray-300 hover:text-white transition-colors break-all"
                >
                  info@replica3d.pl
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle size={20} className="text-gray-300 flex-shrink-0" />
                <a
                  href="https://m.me/replica3dpl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Messenger (tylko po angielsku)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="text-gray-300 flex-shrink-0" />
                <a
                  href="https://wa.me/+48786886676"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  WhatsApp (tylko po angielsku)
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin
                  size={20}
                  className="text-gray-300 mt-1 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Siedziba firmy mieści się we Wrocławiu w Polsce.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4" aria-label="Media społecznościowe">Śledź Nas</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:info@replica3d.pl"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.instagram.com/replica3d/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://x.com/replica3d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.facebook.com/replica3dpl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-[#0A0A0AED] w-full">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-body">
            <div className="text-center md:text-left mb-2 md:mb-0">
              REPLICA3D © 2024 | RN:387720616 | NIP:8982231371
            </div>
            <div className="flex items-center">
              With <span className="text-red-500 mx-1">❤️</span> from Wrocław
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;