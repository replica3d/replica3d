import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { VALID_ROUTES, isValidRoute } from '../config/routes';
import { getBaseMetaTags, getPrintingMetaTags, getCityMetaTags, get404MetaTags } from './metaTagsGenerator';
import { cities } from '../data/cities';

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
  if (route === '/') return 'index';
  if (route === '/404') return '404';
  return route.slice(1); // Remove leading slash
};

const preloadImages = [
  '/images/hero.webp',
  '/images/druk-3d.webp',
  '/images/footer.webp',
  '/images/bg.webp'
];

const seoContentStyles = `
<style>
  .seo-content {
    display: none;
    visibility: hidden;
    width: 0;
    height: 0;
    position: absolute;
    left: -9999px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
</style>`;

const getCitiesList = () => {
  const sortedCities = Object.values(cities).sort((a, b) => a.name.localeCompare(b.name));
  return `
    <div>
      <h2>Druk 3D w Polsce</h2>
      <p>Oferujemy usługi druku 3D w następujących miastach:</p>
      <ul>
        ${sortedCities.map(city => `
          <li>
            <a href="/druk-3d-${city.url}">Druk 3D ${city.name}</a>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
};

const getPageContent = (route: string, isStatic: boolean = false) => {
  if (route === '/') {
    return {
      isStatic: true,
      content: `
        <div>
          <h1>REPLICA3D - Profesjonalny druk 3D we Wrocławiu</h1>
          <p>Witaj w REPLICA3D - profesjonalnej drukarni 3D oferującej kompleksowe usługi druku 3D. Specjalizujemy się w druku FDM i SLA, zapewniając najwyższą jakość wydruków 3D dla klientów indywidualnych i firm.</p>
          ${getCitiesList()}
        </div>`
    };
  }

  if (route === '/druk-3d') {
    return {
      isStatic: true,
      content: `
        <div>
          <h1>Usługi druku 3D - REPLICA3D</h1>
          <p>Oferujemy profesjonalne usługi druku 3D w technologiach FDM i SLA. Specjalizujemy się w prototypowaniu, małoseryjnej produkcji i tworzeniu modeli koncepcyjnych.</p>
          ${getCitiesList()}
        </div>`
    };
  }

  if (route.startsWith('/druk-3d-')) {
    const cityUrl = route.replace('/druk-3d-', '');
    const city = Object.values(cities).find(c => c.url === cityUrl);
    if (!city) return { isStatic: false, content: '' };

    return {
      isStatic: true,
      content: `
        <div>
          <h1>Druk 3D ${city.name}</h1>
          <p>Profesjonalne usługi druku 3D w technologii FDM i SLA ${city.preposition} ${city.nameLocative}. Oferujemy szybką realizację, konkurencyjne ceny i najwyższą jakość wydruków 3D.</p>
          ${getCitiesList()}
        </div>`
    };
  }

  return {
    isStatic: false,
    content: ''
  };
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) continue;

    try {
      const $ = cheerio.load(template);

      // Keep only essential meta tags
      const charset = $('meta[charset]').clone();
      const viewport = $('meta[name="viewport"]').clone();
      const icon = $('link[rel="icon"]').clone();
      $('head').empty().append(charset).append(viewport).append(icon);

      // Add SEO styles
      $('head').append(seoContentStyles);

      // Generate and add meta tags
      const metaTags = getMetaTagsForRoute(route);
      $('head').append(`
        <title>${metaTags.title}</title>
        <meta name="title" content="${metaTags.title}">
        <meta name="description" content="${metaTags.description}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${metaTags.url}">
        <meta property="og:title" content="${metaTags.title}">
        <meta property="og:description" content="${metaTags.description}">
        <meta property="og:image" content="${metaTags.imageUrl}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${metaTags.url}">
        <meta property="twitter:title" content="${metaTags.title}">
        <meta property="twitter:description" content="${metaTags.description}">
        <meta property="twitter:image" content="${metaTags.imageUrl}">
        <meta name="robots" content="${metaTags.noindex ? 'noindex, nofollow' : 'index, follow'}">
        <link rel="canonical" href="${metaTags.url}">
        ${metaTags.schema ? `<script type="application/ld+json">${JSON.stringify(metaTags.schema)}</script>` : ''}
      `);

      // Add preload tags for critical images
      preloadImages.forEach(image => {
        $('head').append(`<link rel="preload" href="${image}" as="image" type="image/webp">`);
      });

      // Add static content for SEO if available
      const pageContent = getPageContent(route);
      if (pageContent.isStatic) {
        $('#root').before(`
          <noscript>
            <div class="seo-content" aria-hidden="true" data-nosnippet tabindex="-1">
              ${pageContent.content}
            </div>
          </noscript>
        `);
      }

      // Add CSS files
      const cssFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.css'))
        .map(file => `<link rel="stylesheet" href="/assets/${file}">`);
      $('head').append(cssFiles.join('\n'));

      // Add JS files at the end of body
      const jsFiles = fs.readdirSync(path.resolve('dist/assets'))
        .filter(file => file.endsWith('.js') && !file.includes('.map'))
        .map(file => `<script type="module" src="/assets/${file}"></script>`);
      $('body').append(jsFiles.join('\n'));

      // Write the generated HTML file
      const outputPath = path.resolve(`dist/${getOutputPath(route)}.html`);
      const outputDir = path.dirname(outputPath);
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, $.html());
      console.log(`Generated: ${getOutputPath(route)}.html`);
    } catch (error) {
      console.error(`Failed to generate HTML for route ${route}:`, error);
    }
  }
};