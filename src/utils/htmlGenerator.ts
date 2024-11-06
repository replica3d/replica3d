import { cities } from '../data/cities';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { VALID_ROUTES, isValidRoute } from '../config/routes';
import {
  getBaseMetaTags,
  getPrintingMetaTags,
  getCityMetaTags,
  get404MetaTags,
  generateMetaTags
} from './metaTagsGenerator';

// Constants
const preloadImages = [
  '/images/hero.webp',
  '/images/druk-3d.webp',
  '/images/footer.webp',
  '/images/bg.webp'
];

const seoContentStyles = `
  <style>
    .seo-content {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
      visibility: hidden !important;
      display: none !important;
    }
    @media print { .seo-content { display: none !important; } }
    #root{display:block!important;visibility:visible!important}
  </style>
`;

// Helper functions
const getMetaTagsForRoute = (route: string) => {
  if (route === '/') return getBaseMetaTags();
  if (route === '/druk-3d') return getPrintingMetaTags();
  if (route === '/404') return get404MetaTags();
  
  if (route.startsWith('/druk-3d-')) {
    const cityUrl = route.replace('/druk-3d-', '');
    return getCityMetaTags(cityUrl);
  }
  
  return get404MetaTags();
};

const getOutputPath = (route: string): string => {
  return route === '/' ? 'index' : route.slice(1);
};

interface PageContent {
  title: string;
  content: string;
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
            <p>Szybkie prototypowanie dla efektywnej realizacji Twoich pomysłów.</p>
          </div>
        </div>
      </section>
    </main>
  `,
  isStatic
});

const getPrintingContent = (isStatic: boolean = false): PageContent => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  content: `
    <main class="seo-content">
      <section class="intro">
        <h1>Usługi druku 3D</h1>
        <p>REPLICA3D jest profesjonalną drukarnią 3D we Wrocławiu. Specjalizujemy się w produkcji prototypów i krótkich serii.</p>
      </section>
      <section class="services">
        <h2>Nasze usługi druku 3D</h2>
        <div class="service-cards">
          <div class="service-card">
            <h3>Koszty druku 3D</h3>
            <p>Wycena uwzględnia przygotowanie projektu, post-produkcję, koszty materiałów i eksploatacji.</p>
          </div>
        </div>
      </section>
    </main>
  `,
  isStatic
});

const getCityContent = (city: { name: string; nameLocative: string; preposition: string }, isStatic: boolean = false): PageContent => ({
  title: `Druk 3D ${city.name}`,
  content: `
    <main class="seo-content">
      <section class="intro">
        <h1>Drukarnia 3D ${city.name}</h1>
        <p>Szukasz profesjonalnego druku 3D ${city.preposition} ${city.nameLocative}? Jesteśmy lokalnym ekspertem w technologii FDM.</p>
      </section>
    </main>
  `,
  isStatic
});

const get404Content = (): PageContent => ({
  title: '404 - Strona nie została znaleziona | REPLICA3D',
  content: `
    <main class="error-page seo-content">
      <h1>404 - Strona nie została znaleziona</h1>
      <p>Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.</p>
    </main>
  `,
  isStatic: true
});

const getPageContent = (route: string, isStatic: boolean = false): PageContent => {
  if (route === '/') return getHomeContent(isStatic);
  if (route === '/druk-3d') return getPrintingContent(isStatic);
  if (route === '/404') return get404Content();

  const city = Object.values(cities).find((c) => route === `/druk-3d-${c.url}`);
  if (city) return getCityContent(city, isStatic);

  return get404Content();
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) continue;

    try {
      const $ = cheerio.load(template);

      // Keep only charset and viewport meta tags
      const charset = $('meta[charset]').clone();
      const viewport = $('meta[name="viewport"]').clone();
      const icon = $('link[rel="icon"]').clone();
      $('head').empty().append(charset).append(viewport).append(icon);

      // Generate and add new meta tags
      const metaTags = generateMetaTags(getMetaTagsForRoute(route));
      $('head').append(metaTags);

      // Add preload tags for images
      preloadImages.forEach(image => {
        $('head').append(`<link rel="preload" href="${image}" as="image">`);
      });

      // Add SEO styles
      $('head').append(seoContentStyles);

      const filePath = path.resolve(`dist/${getOutputPath(route)}.html`);
      const pageContent = getPageContent(route, true);

      if (pageContent.isStatic) {
        const seoDiv = `<noscript><div class="seo-content" aria-hidden="true" data-nosnippet tabindex="-1">${pageContent.content}</div></noscript>`;
        if (route.includes('/druk-3d-')) {
          $('.city-page').prepend(seoDiv);
        } else {
          $('#root').before(seoDiv);
        }
      }

      // Ensure root div exists
      if ($('#root').length === 0) {
        $('body').html('<div id="root"></div>');
      }

      // Add CSS before JS for better performance
      const cssFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.css'))
        .map(file => `<link rel="stylesheet" href="/assets/${file}">`);
      $('head').append(cssFiles.join('\n'));
      
      // Add the main script tag at the end of body
      const jsFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.js') && !file.endsWith('.map'))
        .map(file => `<script type="module" src="/assets/${file}"></script>`);
      $('body').append(jsFiles.join('\n'));

      // Create directory if needed
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(path.resolve(`dist/${getOutputPath(route)}.html`), $.html());
      console.log(`Generated: ${getOutputPath(route)}.html`);
    } catch (error: any) {
      console.error(`Failed to generate HTML for route ${route}: ${error.message}`);
    }
  }
};