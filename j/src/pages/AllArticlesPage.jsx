// src/pages/AllArticlesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

const AllArticlesPage = ({ articles }) => {
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
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Все статьи</h2>
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
        {articles.map((article, index) => (
          <div key={index} style={{ width: '376px' }}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPage;