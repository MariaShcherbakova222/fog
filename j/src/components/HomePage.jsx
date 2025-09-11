// src/components/HomePage.jsx
import React from 'react';
import Hero from './Hero';
import Promotions from './Promotions';
import News from './News';
import BuyAgo from './BuyAgo';
import SpecialOffersSection from './SpecialOffersSection';
import OurStores from './OurStores';
import ArticlesSection from './ArticlesSection';

const HomePage = ({ 
  promotions, 
  newsProducts, 
  buyAgoProducts, 
  articles, 
  toggleFavorite, 
  isFavorite 
}) => {
  return (
    <>
      <Hero />
      
      {/* Акции */}
      <Promotions
        promotions={promotions}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Новинки */}
      <News
        products={newsProducts}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Покупали раньше */}
      <BuyAgo
        products={buyAgoProducts}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      <SpecialOffersSection />
      <OurStores />
      <ArticlesSection articles={articles} />
    </>
  );
};

export default HomePage;