import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { VALID_ROUTES, isValidRoute } from '../config/routes';
import { getMetaConfig } from './metaConfig';
import { GOOGLE_ANALYTICS, PRELOAD_IMAGES } from './constants';

const getOutputPath = (route: string): string => {
  if (route === '/') return 'index';
  if (route === '/404') return '404';
  return route.slice(1);
};

const generateHtml = ($: cheerio.CheerioAPI, config: ReturnType<typeof getMetaConfig>): void => {
  $('head').empty()
    .append(GOOGLE_ANALYTICS)
    .append('<meta charset="UTF-8">')
    .append('<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">')
    
    // Favicon configuration
    .append('<link rel="icon" type="image/x-icon" href="/favicon.ico">')
    .append('<link rel="icon" type="image/svg+xml" href="/favicon.svg">')
    .append('<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">')
    .append('<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">')
    .append('<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">')
    .append('<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">')
    .append('<link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512">')
    .append('<link rel="apple-touch-icon" href="/apple-touch-icon.png">')
    .append('<link rel="manifest" href="/site.webmanifest">')
    .append('<meta name="theme-color" content="#ffffff">')
    .append('<meta name="msapplication-TileColor" content="#ffffff">')
    
    // Primary Meta Tags
    .append(`<title>${config.title}</title>`)
    .append(`<meta name="title" content="${config.title}">`)
    .append(`<meta name="description" content="${config.description}">`)
    
    // Open Graph / Facebook
    .append('<meta property="og:type" content="website">')
    .append(`<meta property="og:url" content="${config.url}">`)
    .append(`<meta property="og:title" content="${config.title}">`)
    .append(`<meta property="og:description" content="${config.description}">`)
    .append(`<meta property="og:image" content="${config.imageUrl}">`)
    
    // Twitter
    .append('<meta property="twitter:card" content="summary_large_image">')
    .append(`<meta property="twitter:url" content="${config.url}">`)
    .append(`<meta property="twitter:title" content="${config.title}">`)
    .append(`<meta property="twitter:description" content="${config.description}">`)
    .append(`<meta property="twitter:image" content="${config.imageUrl}">`)
    
    // Additional SEO Meta Tags
    .append(`<meta name="robots" content="${config.noindex ? 'noindex, nofollow' : 'index, follow'}">`)
    .append('<meta name="language" content="Polish">')
    .append('<meta name="author" content="REPLICA3D">')
    .append('<meta name="geo.region" content="PL-DS">')
    .append('<meta name="geo.placename" content="Wrocław">')
    .append(`<link rel="canonical" href="${config.url}">`)
    
    // Base URL
    .append('<base href="/" />');

  // Add schema if available
  if (config.schema) {
    $('head').append(`<script type="application/ld+json">${JSON.stringify(config.schema)}</script>`);
  }

  // Add preload tags for critical images
  PRELOAD_IMAGES.forEach(image => {
    $('head').append(`<link rel="preload" href="${image}" as="image" type="image/webp">`);
  });
};

export const generateStaticHtml = async (template: string): Promise<void> => {
  for (const route of VALID_ROUTES) {
    if (!isValidRoute(route)) continue;

    try {
      const $ = cheerio.load(template);
      const config = getMetaConfig(route);
      
      generateHtml($, config);

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