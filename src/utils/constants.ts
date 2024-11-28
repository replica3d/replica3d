export const BASE_URL = 'https://replica3d.pl';
export const DEFAULT_IMAGE = `${BASE_URL}/images/hero.webp`;

export const PRELOAD_IMAGES = [
  '/images/hero.webp',
  '/images/druk-3d.webp',
  '/images/footer.webp',
  '/images/bg.webp'
];

export const GOOGLE_ANALYTICS = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ELPH6H9K2Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ELPH6H9K2Z');
</script>
`;