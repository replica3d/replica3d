import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  getBaseMetaTags,
  getPrintingMetaTags,
  getCityMetaTags,
  get404MetaTags
} from '../utils/metaTagsGenerator';

const SEO: React.FC = () => {
  const location = useLocation();
  
  const metaTags = (() => {
    const path = location.pathname;
    
    if (path === '/') return getBaseMetaTags();
    if (path === '/druk-3d') return getPrintingMetaTags();
    if (path === '/404') return get404MetaTags();
    
    if (path.startsWith('/druk-3d-')) {
      const cityUrl = path.replace('/druk-3d-', '');
      return getCityMetaTags(cityUrl);
    }
    
    return get404MetaTags();
  })();

  const {
    title,
    description,
    url,
    imageUrl,
    noindex,
    schema
  } = metaTags;

  return (
    <></>
  );
};

export default SEO;