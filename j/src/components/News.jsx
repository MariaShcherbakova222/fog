import React from 'react';
import ProductCard from './ProductCard';
import '../assets/News.css';
import { Link } from 'react-router-dom';

const News = ({ onProductClick, toggleFavorite, isFavorite }) => {
  const products = [
    {
      id: 5,
      image: require('../assets/photo/colbasa1.png'),
      price: '599,99',
      title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
      rating: 2,
      category: 'Еда',
    },
    {
      id: 3,
      image: require('../assets/photo/colbasa.png'),
      price: '44,50',
      title: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...',
      rating: 5,
      category: 'Еда',
    },
    {
      id: 6,
      image: require('../assets/photo/sausages.png'),
      price: '159,99',
      title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
      rating: 2,
      category: 'Еда',
    },
    {
      id: 7,
      image: require('../assets/photo/milk1.webp'),
      price: '49,39',
      title: 'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»',
      rating: 2,
      category: 'Еда',
    },
  ];

  return (
    <div className="news-section">
      <div className="section-header">
        <h2>Новинки</h2>
        <Link to="/news" className="all-news">Все новинки</Link>
      </div>
      <div className="news-container">
        <div className="cards-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => onProductClick?.(product)}
              onToggleFavorite={() => toggleFavorite(product)}
              isFavorite={isFavorite(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;