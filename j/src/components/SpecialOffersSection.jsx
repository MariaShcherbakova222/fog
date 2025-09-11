import React from 'react';
import SpecialOffer from './SpecialOffer';
import '../assets/SpecialOffersSection.css';

const SpecialOffersSection = () => {
  const offer1 = require('../assets/photo/banner.png');
  const offer2 = require('../assets/photo/banner1.png');

  return (
    <section className="special-offers-section">
      <h2>Специальные предложения</h2>
      <div className="offers-container">
        <SpecialOffer image={offer1} alt="Оформите карту Северяночка" />
        <SpecialOffer image={offer2} alt="Покупайте акционные товары" />
      </div>
    </section>
  );
};

export default SpecialOffersSection;