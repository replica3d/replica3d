import React from 'react';
import { motion } from 'framer-motion';

interface CityFAQProps {
  cityName: string;
  nameLocative: string;
  preposition: string;
  schema: any;
}

const CityFAQ: React.FC<CityFAQProps> = ({ cityName, nameLocative, preposition, schema }) => {
  const faqItems = [
    {
      question: `Ile kosztuje wydruk 3D ${preposition} ${nameLocative} i od czego zależy cena?`,
      answer: `Koszt druku 3D zależy od kilku kluczowych czynników: wielkości modelu, zastosowanego materiału, czasu wydruku oraz stopnia skomplikowania projektu.`
    },
    {
      question: `Jak długo trwa realizacja zamówienia w drukarni 3D ${preposition} ${nameLocative}?`,
      answer: `Standardowy czas realizacji zamówień w naszej drukarni 3D wynosi 3-5 dni roboczych. Termin może być krótszy lub dłuższy w zależności od specyfikacji projektu oraz wielkości zamówienia. Na życzenie klienta oferujemy także usługę ekspresową. Dokładny czas realizacji potwierdzamy po otrzymaniu projektu.`
    },
    {
      question: `Jakie materiały wykorzystuje wasza drukarnia 3D ${cityName} do wydruków?`,
      answer: `Nasza drukarnia 3D oferuje szeroki wybór materiałów do druku 3D w technologii FDM. Standardowo pracujemy z materiałami takimi jak PLA, PETG, ASA, TPU, PA, PET oraz PC. Maksymalne wymiary wydruku to 360x360x360mm. Niektóre materiały specjalistyczne są dostępne na zamówienie - zachęcamy do kontaktu w celu omówienia szczegółów projektu.`
    },
    {
      question: `Czy druk 3D ${cityName} obejmuje także dostawę wydruków do klienta?`,
      answer: `Tak, oferujemy kompleksową obsługę zamówień wraz z dostawą. Realizujemy wysyłki na terenie całej Polski, a także za granicę. Współpracujemy z profesjonalnymi firmami kurierskimi, zapewniając bezpieczną dostawę wydruków 3D pod wskazany adres. Obsługujemy zarówno klientów indywidualnych, jak i firmy.`
    },
    {
      question: `W jaki sposób mogę zamówić wydruk 3D ${preposition} ${nameLocative} i jakie pliki są potrzebne?`,
      answer: `Proces zamawiania wydruku 3D jest prosty. Przyjmujemy pliki w formatach .stl oraz .step (inne formaty możemy sprawdzić po kontakcie mailowym). Jeśli nie posiadasz gotowego modelu 3D, oferujemy również usługi projektowe - pomożemy stworzyć model odpowiadający Twoim potrzebom. Aby otrzymać wycenę i omówić szczegóły projektu, zachęcamy do kontaktu poprzez formularz kontaktowy. Nasz zespół odpowie na wszystkie pytania i pomoże w realizacji Twojego projektu.`
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-[#333333]">
        Druk 3D na zamówienie {preposition} {nameLocative}
      </h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-3 mt-3 text-[#333333]">{item.question}</h3>
            <p className="text-base text-[#333333] m-0">{item.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CityFAQ;