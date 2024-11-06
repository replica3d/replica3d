import { cities } from '../data/cities';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { VALID_ROUTES, isValidRoute } from '../config/routes';


interface PageContent {
  title: string;
  content: string;
  isStatic?: boolean;
  isStatic?: boolean;
}

const getHomeContent = (isStatic: boolean = false): PageContent => ({
  title: 'REPLICA3D - Druk 3D na zamówienie – Wydruki 3D Wrocław',
  content: `
    <main class="seo-content">
      <section class="hero">
        <h1>REPLICA3D - Profesjonalny druk 3D we Wrocławiu</h1>
        <p>Witaj w REPLICA3D - Twojej profesjonalnej drukarni 3D we Wrocławiu. Oferujemy kompleksowe usługi druku 3D dla firm i klientów indywidualnych, specjalizując się w wysokiej jakości wydrukach 3D na zamówienie.</p>
      </section>

      <section class="services">
        <h2>Nasze Usługi</h2>
        <div class="services-grid">
          <div class="service-card">
            <h3>Druk 3D</h3>
            <p>Wysokiej jakości usługi druku FDM i SLA dla wszystkich Twoich potrzeb.</p>
          </div>
          <div class="service-card">
            <h3>Prototypowanie</h3>
            <p>Szybkie prototypowanie, aby szybko i efektywnie zrealizować Twoje pomysły.</p>
          </div>
          <div class="service-card">
            <h3>Szybka Realizacja</h3>
            <p>Krótkie terminy realizacji bez kompromisów w jakości.</p>
          </div>
          <div class="service-card">
            <h3>Wykończenie</h3>
            <p>Różne opcje wykończenia dopasowane do Twoich wymagań.</p>
          </div>
        </div>
      </section>

      <section class="portfolio">
        <h2>Zrealizowane Projekty</h2>
        <p>Zobacz nasze ostatnie projekty i przekonaj się, jak pomagamy naszym klientom realizować ich pomysły.</p>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img src="/images/project_1.webp" alt="Projekt druku 3D 1" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_2.webp" alt="Projekt druku 3D 2" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_3.webp" alt="Projekt druku 3D 3" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_4.webp" alt="Projekt druku 3D 4" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_5.webp" alt="Projekt druku 3D 5" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_6.webp" alt="Projekt druku 3D 6" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_7.webp" alt="Projekt druku 3D 7" loading="lazy" />
          </div>
          <div class="portfolio-item">
            <img src="/images/project_8.webp" alt="Projekt druku 3D 8" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="technology">
        <h2>Nasza Technologia</h2>
        <p>Używamy najnowocześniejszej technologii druku 3D, aby zapewnić najwyższą jakość realizacji Twoich projektów.</p>
        <div class="technology-cards">
          <div class="tech-card">
            <h3>Druk FDM</h3>
            <div class="tech-specs">
              <ul>
                <li>Rozdzielczość warstwy: 0.1mm</li>
                <li>Obszar roboczy: 360x360x360mm</li>
                <li>Materiały: PLA, PETG, ABS, ASA, TPU, PA, PC</li>
                <li>Idealne do: Części funkcjonalnych, Prototypów, Narzędzi</li>
                <li>Ekonomiczne dla większych części</li>
              </ul>
            </div>
          </div>
          <div class="tech-card">
            <h3>Druk SLA</h3>
            <div class="tech-specs">
              <ul>
                <li>Rozdzielczość warstwy: 0.025mm</li>
                <li>Obszar roboczy: 145x145x175mm</li>
                <li>Materiały: Standardowe, Wytrzymałe, Elastyczne żywice</li>
                <li>Idealne do: Modeli szczegółowych, Biżuterii, Stomatologii</li>
                <li>Doskonałe wykończenie powierzchni</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="contact">
        <h2>Kontakt</h2>
        <div class="contact-info">
          <div class="contact-item">
            <h3>Email</h3>
            <p>info@replica3d.pl</p>
          </div>
          <div class="contact-item">
            <h3>Messenger</h3>
            <p>Dostępny tylko w języku angielskim</p>
          </div>
          <div class="contact-item">
            <h3>WhatsApp</h3>
            <p>Dostępny tylko w języku angielskim</p>
          </div>
          <div class="contact-item">
            <h3>Lokalizacja</h3>
            <p>Siedziba firmy mieści się we Wrocławiu w Polsce.</p>
          </div>
        </div>
      </section>

      <section class="cities">
        <h2>Druk 3D w Polsce</h2>
        <p>Świadczymy usługi druku 3D w następujących miastach:</p>
        <div class="cities-grid">
          ${Object.values(cities)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
              (city) => `
              <div class="city-item">
                <a href="/druk-3d-${city.url}">${city.name}</a>
              </div>
            `
            )
            .join('')}
        </div>
      </section>
    </main>
  `,
});

const getPrintingContent = (isStatic: boolean = false): PageContent => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  content: `
    <main class="seo-content">
      <section class="intro">
        <h1>Usługi druku 3D</h1>
        <p>REPLICA3D jest profesjonalną drukarnią 3D we Wrocławiu. Specjalizujemy się w produkcji prototypów i krótkich serii. Dzięki elastyczności naszych usług 3D oraz praktyki w dostarczaniu projektów 3D, jesteśmy w stanie wykryć ewentualne błędy w projekcie i doradzić Ci tak, by zapewnić sukces Twojego projektu.</p>
      </section>

      <section class="services">
        <h2>Nasze usługi druku 3D</h2>
        <div class="service-cards">
          <div class="service-card">
            <h3>Koszty druku 3D</h3>
            <p>Wycena uwzględnia przygotowanie projektu, post-produkcję, koszty materiałów i eksploatacji.</p>
          </div>
          <div class="service-card">
            <h3>Technologie druku</h3>
            <p>Oferujemy druk FDM (depozycja ciągłych włókien) oraz SLA (druk żywicą) w atrakcyjnych cenach.</p>
          </div>
          <div class="service-card">
            <h3>Czas realizacji</h3>
            <p>Szybka realizacja zleceń z uwzględnieniem jakości i specyfikacji projektu.</p>
          </div>
        </div>
      </section>

      <section class="pricing">
        <h2>Ile kosztuje usługa drukowania 3D?</h2>
        <p>Najważniejszym, co trzeba ustalić w celu wyceny usługi druku 3D są czynniki wpływające na cenę każdej części.</p>
        <div class="pricing-factors">
          <div class="factor">
            <h3>Koszty podstawowe</h3>
            <ul>
              <li>Przygotowanie projektu</li>
              <li>Post-produkcja części</li>
              <li>Koszt godziny drukowania</li>
            </ul>
          </div>
          <div class="factor">
            <h3>Koszty dodatkowe</h3>
            <ul>
              <li>Materiały i utrzymanie sprzętu</li>
              <li>Szkolenia i rozwój</li>
              <li>Obsługa i nadzór procesu</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="time-estimation">
        <h2>Ile czasu zajmuje drukowanie 3D?</h2>
        <p>Aby zrozumieć, ile czasu zajmie druk, musimy wziąć pod uwagę szereg czynników podczas procesu drukowania 3D.</p>
        <div class="time-factors">
          <div class="factor">
            <h3>Grubość warstw</h3>
            <p>Określa jakość wykończenia. Cieńsze warstwy = wyższa jakość, dłuższy czas</p>
          </div>
          <div class="factor">
            <h3>Gęstość obiektu</h3>
            <p>Wpływa na wytrzymałość i czas druku. Większe wypełnienie = dłuższy czas</p>
          </div>
          <div class="factor">
            <h3>Złożoność projektu</h3>
            <p>Im bardziej skomplikowana geometria, tym dłuższy czas druku</p>
          </div>
        </div>
      </section>

      <section class="resources">
        <h2>Przydatne zasoby</h2>
        <div class="resources-list">
          <div class="resource">
            <h3>Makerworld</h3>
            <p>Społeczność twórców i modeli 3D</p>
          </div>
          <div class="resource">
            <h3>Printables</h3>
            <p>Platforma modeli 3D od Prusa</p>
          </div>
          <div class="resource">
            <h3>Thingiverse</h3>
            <p>Największa społeczność modeli 3D</p>
          </div>
          <div class="resource">
            <h3>MyMiniFactory</h3>
            <p>Zweryfikowane modele 3D</p>
          </div>
          <div class="resource">
            <h3>Yeggi</h3>
            <p>Wyszukiwarka modeli 3D</p>
          </div>
        </div>
      </section>

      <section class="cities">
        <h2>Druk 3D w Polsce i na Świecie</h2>
        <p>Działamy bez granic! REPLICA3D świadczy profesjonalne usługi druku 3D w Polsce i za granicą. Realizujemy wysyłkę do każdego miejsca na świecie, zapewniając bezpieczne dostarczenie wydruków.</p>
        <div class="cities-list">
          ${Object.values(cities)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
              (city) => `
              <div class="city">
                <a href="/druk-3d-${city.url}">${city.name}</a>
              </div>
            `
            )
            .join('')}
        </div>
      </section>
    </main>
  `,
});

const getCityContent = (
  city: {
  name: string;
  nameLocative: string;
  preposition: string;
  },
  isStatic: boolean = false
): PageContent => ({
  title: `Druk 3D ${city.name}`,
  content: `
    <main>
      <div class="intro-section">
        <h1>Drukarnia 3D ${city.name}</h1>
        <p>
          Szukasz profesjonalnego druku 3D ${city.preposition} ${city.nameLocative}? Jesteśmy lokalnym ekspertem w technologii FDM, oferującym szybkie i niezawodne <a href="/druk-3d">usługi druku 3D dla firm</a> i osób prywatnych. Nasza drukarnia 3D ${city.preposition} ${city.nameLocative} specjalizuje się w tworzeniu prototypów, części zamiennych i modeli projektowych w przystępnych cenach. Dzięki najnowocześniejszym drukarkom FDM i doświadczonemu zespołowi, zrealizujemy Twój projekt szybko i dokładnie - od pojedynczych elementów po większe serie produkcyjne.
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card">
          <h3>Koszty druku 3D</h3>
          <p>Konkurencyjne ceny druku 3D ${city.preposition} ${city.nameLocative}. Wycena uwzględnia przygotowanie projektu i materiały.</p>
        </div>
        <div class="service-card">
          <h3>Technologie druku</h3>
          <p>Profesjonalny druk FDM oraz SLA dostosowany do potrzeb Twojego projektu.</p>
        </div>
        <div class="service-card">
          <h3>Szybka realizacja</h3>
          <p>Ekspresowa realizacja zleceń na terenie ${city.name} i okolic.</p>
        </div>
      </div>

      <div class="faq-section">
        <h2>Druk 3D na zamówienie ${city.preposition} ${city.nameLocative}</h2>
        <div class="faq-items">
          <div class="faq-item">
            <h3>Ile kosztuje wydruk 3D ${city.preposition} ${city.nameLocative} i od czego zależy cena?</h3>
            <p>Koszt druku 3D zależy od kilku kluczowych czynników: wielkości modelu, zastosowanego materiału, czasu wydruku oraz stopnia skomplikowania projektu. Nasza drukarnia 3D wykonuje indywidualną wycenę po otrzymaniu modelu 3D. Dla większych serii produkcyjnych oferujemy atrakcyjne rabaty. Nie wymagamy minimalnej wartości zamówienia, dzięki czemu możesz zamówić nawet pojedynczy wydruk 3D.</p>
          </div>
          <div class="faq-item">
            <h3>Jak długo trwa realizacja zamówienia w drukarni 3D ${city.preposition} ${city.nameLocative}?</h3>
            <p>Standardowy czas realizacji zamówień w naszej drukarni 3D wynosi 3-5 dni roboczych. Termin może być krótszy lub dłuższy w zależności od specyfikacji projektu oraz wielkości zamówienia. Na życzenie klienta oferujemy także usługę ekspresową. Dokładny czas realizacji potwierdzamy po otrzymaniu projektu.</p>
          </div>
          <div class="faq-item">
            <h3>Jakie materiały wykorzystuje wasza drukarnia 3D ${city.name} do wydruków?</h3>
            <p>Nasza drukarnia 3D oferuje szeroki wybór materiałów do druku 3D w technologii FDM. Standardowo pracujemy z materiałami takimi jak PLA, PETG, ASA, TPU, PA, PET oraz PC. Maksymalne wymiary wydruku to 360x360x360mm. Niektóre materiały specjalistyczne są dostępne na zamówienie - zachęcamy do kontaktu w celu omówienia szczegółów projektu.</p>
          </div>
          <div class="faq-item">
            <h3>Czy druk 3D ${city.name} obejmuje także dostawę wydruków do klienta?</h3>
            <p>Tak, oferujemy kompleksową obsługę zamówień wraz z dostawą. Realizujemy wysyłki na terenie całej Polski, a także za granicę. Współpracujemy z profesjonalnymi firmami kurierskimi, zapewniając bezpieczną dostawę wydruków 3D pod wskazany adres. Obsługujemy zarówno klientów indywidualnych, jak i firmy.</p>
          </div>
          <div class="faq-item">
            <h3>W jaki sposób mogę zamówić wydruk 3D ${city.preposition} ${city.nameLocative} i jakie pliki są potrzebne?</h3>
            <p>Proces zamawiania wydruku 3D jest prosty. Przyjmujemy pliki w formatach .stl oraz .step (inne formaty możemy sprawdzić po kontakcie mailowym). Jeśli nie posiadasz gotowego modelu 3D, oferujemy również usługi projektowe - pomożemy stworzyć model odpowiadający Twoim potrzebom. Aby otrzymać wycenę i omówić szczegóły projektu, zachęcamy do kontaktu poprzez formularz kontaktowy. Nasz zespół odpowie na wszystkie pytania i pomoże w realizacji Twojego projektu.</p>
          </div>
        </div>
      </div>
        <section class="cities">
        <h2>Druk 3D w Polsce</h2>
        <p>Świadczymy usługi druku 3D w następujących miastach:</p>
        <div class="cities-grid">
          ${Object.values(cities)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(
              (city) => `
              <div class="city-item">
                <a href="/druk-3d-${city.url}">${city.name}</a>
              </div>
            `
            )
            .join('')}
        </div>
      </section>
    </main>
  `,
  isStatic
});

const getPageContent = (route: string, isStatic: boolean = false): PageContent => {
  if (route === '/') return getHomeContent();
  if (route === '/druk-3d') return getPrintingContent();
  if (route === '/404') return get404Content();

  const city = Object.values(cities).find((c) => route === `/druk-3d-${c.url}`);
  if (city) return getCityContent(city, isStatic);

  return get404Content();
};

const get404Content = (): PageContent => ({
  title: '404 - Strona nie została znaleziona | REPLICA3D',
  description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
  content: `
    <main class="error-page">
      <h1>404 - Strona nie została znaleziona</h1>
      <p>Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.</p>
    </main>
  `,
  isStatic: true
});

interface RouteMetadata {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const getRouteMetadata = (route: string): RouteMetadata => {
  if (route === '/') {
    return {
      title: 'REPLICA3D - Druk 3D na zamówienie - Wydruki 3D Wrocław',
      description:
        'Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych.',
      path: 'index',
    };
  }

  if (route === '/druk-3d') {
    return {
      title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
      description:
        'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
      path: 'druk-3d',
    };
  }

  const city = Object.values(cities).find((c) => route === `/druk-3d-${c.url}`);
  if (city) {
    return {
      title: `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`,
      description: `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
      path: `druk-3d-${city.url}`,
    };
  }

  // Return 404 metadata for invalid routes
  return {
    title: '404 - Strona nie została znaleziona | REPLICA3D',
    description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
    path: '404',
    noindex: true
  };
};

const clearSEOContent = ($: cheerio.CheerioAPI): void => {
  $('#seo-content').remove();
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  // Generate HTML for each route
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) {
      continue;
    }

    try {
      const $ = cheerio.load(template);

      // Add common meta tags
      $('head').append(`
        <meta name="robots" content="index, follow">
        <meta name="language" content="Polish">
        <meta name="author" content="REPLICA3D">
        <meta name="geo.region" content="PL-DS">
        <meta name="geo.placename" content="Wrocław">
        <link rel="preload" href="/images/hero.webp" as="image">
        <link rel="preload" href="/images/druk-3d.webp" as="image">
        <link rel="preload" href="/images/footer.webp" as="image">
        <link rel="preload" href="/images/bg.webp" as="image">
      `);

      const metadata = getRouteMetadata(route);
      const filePath = path.resolve(`dist/${metadata.path}.html`);

      // Clear any existing SEO content
      clearSEOContent($);

      // Update all title and meta tags
      $('title').text(metadata.title);
      $('meta[name="description"]').attr('content', metadata.description);
      if (metadata.noindex) {
        $('meta[name="robots"]').attr('content', 'noindex, nofollow');
      }
      // Add style for SEO content
      $('head').append(`
        <style>
          .seo-content {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
            z-index: -1;
            opacity: 0.01;
            pointer-events: none;
            visibility: hidden;
            user-select: none;
            display: none !important;
          }

          /* Hide SEO content in city pages */
          .city-page .seo-content {
            display: none !important;
            visibility: hidden !important;
          }

          /* Ensure React content is visible */
          #root {
            display: block !important;
            visibility: visible !important;
          }
        </style>
      `);

      $('meta[name="title"]').attr('content', metadata.title);
      $('link[rel="canonical"]').attr('href', `https://replica3d.pl${route}`);
      $('meta[property="og:url"]').attr(
        'content',
        `https://replica3d.pl${route}`
      );
      $('meta[property="twitter:url"]').attr(
        'content',
        `https://replica3d.pl${route}`
      );
      $('meta[property="og:title"]').attr('content', metadata.title);
      $('meta[property="og:description"]').attr(
        'content',
        metadata.description
      );
      $('meta[property="twitter:title"]').attr('content', metadata.title);
      $('meta[property="twitter:description"]').attr(
        'content',
        metadata.description
      );

      // Add page content for SEO
      const pageContent = getPageContent(route, true);
      if (pageContent.isStatic) {
        const seoDiv = `<div class="seo-content" aria-hidden="true" data-nosnippet>${pageContent.content}</div>`;
        if (route.includes('/druk-3d-')) {
          $('.city-page').prepend(seoDiv);
        } else {
          $('#root').before(seoDiv);
        }
      }

      // Create directory if needed
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(filePath, $.html());
      console.log(`Generated: ${metadata.path}.html`);
    } catch (error: any) {
      console.error(`Failed to generate HTML for route ${route}: ${error.message}`);
    }
  }
};
