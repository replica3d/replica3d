import { BASE_URL, DEFAULT_IMAGE } from './constants';
import { localBusinessSchema, getServiceSchema, getCityFAQSchema } from './schema';
import { cities } from '../data/cities';

export interface MetaConfig {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  noindex?: boolean;
  schema?: object;
}

export const getBaseMetaConfig = (): MetaConfig => ({
  title: 'Druk 3D na zamówienie – Wydruki 3D Wrocław - REPLICA3D',
  description: 'Profesjonalna drukarnia 3D we Wrocławiu oferuje wysokiej jakości wydruki 3D na zamówienie. Kompleksowe usługi druku 3D dla firm i klientów indywidualnych.',
  url: BASE_URL,
  imageUrl: DEFAULT_IMAGE,
  schema: localBusinessSchema
});

export const getPrintingMetaConfig = (): MetaConfig => ({
  title: 'Usługi druku 3D | Druk 3D na zamówienie Wrocław - REPLICA3D',
  description: 'Profesjonalne usługi druku 3D we Wrocławiu. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.',
  url: `${BASE_URL}/druk-3d`,
  imageUrl: DEFAULT_IMAGE,
  schema: getServiceSchema()
});

export const getCityMetaConfig = (cityUrl: string): MetaConfig => {
  const city = Object.values(cities).find(c => c.url === cityUrl);
  if (!city) throw new Error(`City not found: ${cityUrl}`);

  return {
    title: `Drukowanie 3D ${city.name} | Usługi druku 3D - REPLICA3D`,
    description: `Profesjonalne usługi druku 3D w ${city.name}. Oferujemy druk 3D na zamówienie, wydruki 3D FDM i SLA, szybka realizacja i konkurencyjne ceny.`,
    url: `${BASE_URL}/druk-3d-${city.url}`,
    imageUrl: DEFAULT_IMAGE,
    schema: getCityFAQSchema(cityUrl)
  };
};

export const get404MetaConfig = (): MetaConfig => ({
  title: '404 - Strona nie została znaleziona | REPLICA3D',
  description: 'Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.',
  url: `${BASE_URL}/404`,
  imageUrl: DEFAULT_IMAGE,
  noindex: true
});

export const getMetaConfig = (path: string): MetaConfig => {
  if (path === '/') return getBaseMetaConfig();
  if (path === '/druk-3d') return getPrintingMetaConfig();
  if (path === '/404') return get404MetaConfig();
  
  if (path.startsWith('/druk-3d-')) {
    const cityUrl = path.replace('/druk-3d-', '');
    return getCityMetaConfig(cityUrl);
  }
  
  return get404MetaConfig();
};