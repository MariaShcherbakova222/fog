// src/pages/AllPromotionsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PromoCard from '../components/PromoCard';

const AllPromotionsPage = ({ promotions }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '1440px', margin: '0 auto', padding: '0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 20px 20px',
        width: '100%',
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Все акции</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          На главную
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
        {promotions.map((promo, index) => (
          <div key={index} style={{ width: '272px' }}>
            <PromoCard
              image={promo.image}
              discount={promo.discount}
              price={promo.price}
              originalPrice={promo.originalPrice}
              title={promo.title}
              rating={promo.rating}
              onAddToCart={() => console.log('В корзину:', promo.title)}
              onToggleFavorite={() => console.log('В избранное:', promo.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPromotionsPage;