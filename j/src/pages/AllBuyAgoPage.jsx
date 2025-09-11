// src/pages/AllBuyAgoPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const AllBuyAgoPage = ({ products = [] }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '1440px', margin: '0 auto', padding: '0' }}>
      {/* Заголовок и кнопка "На главную" */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '40px 20px 20px',
          width: '100%',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          Все покупки
        </h2>
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

      {/* Карточки товаров */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}
      >
        {products.map((product) => (
          <div key={product.id} style={{ width: '272px' }}>
            <ProductCard
              image={product.image}
              price={product.price}
              title={product.title}
              rating={product.rating}
              onAddToCart={() => console.log('В корзину:', product.title)}
              onToggleFavorite={() => console.log('В избранное:', product.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBuyAgoPage;