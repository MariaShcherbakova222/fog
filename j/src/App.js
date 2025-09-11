// src/App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage'; // ← новый компонент
import FavoritesPage from './components/FavoritesPage';
import CatalogPage from './components/CatalogPage';
import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import VacanciesPage from './components/VacanciesPage';
import ContactsPage from './components/ContactsPage';
import CartPage from './components/CartPage';
import DeliveryPage from './components/DeliveryPage';
import OrdersPage from './components/OrdersPage';
import Footer from './components/Footer';

// Страницы
import AllArticlesPage from './pages/AllArticlesPage';
import AllPromotionsPage from './pages/AllPromotionsPage';
import AllNewsPage from './pages/AllNewsPage';
import AllBuyAgoPage from './pages/AllBuyAgoPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // --- ДАННЫЕ С API ---
  const [promotions, setPromotions] = useState([]);
  const [newsProducts, setNewsProducts] = useState([]); // Новинки
  const [buyAgoProducts, setBuyAgoProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  // --- ЗАГРУЗКА ДАННЫХ ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promoRes, productRes, articleRes] = await Promise.all([
          fetch('http://localhost:5000/api/promotions').then(r => r.json()),
          fetch('http://localhost:5000/api/products').then(r => r.json()),
          fetch('http://localhost:5000/api/articles').then(r => r.json()),
        ]);

        setPromotions(promoRes);
        setNewsProducts(productRes.slice(0, 8));
        setBuyAgoProducts(productRes.slice(8, 16));
        setArticles(articleRes);

      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    };

    fetchData();
  }, []);

  const onSearch = async (query) => {
    if (!query.trim()) return;

    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      // Здесь можно использовать setFilteredProducts, если нужно фильтровать
    } catch (err) {
      console.error('Ошибка поиска:', err);
    }
  };

  // --- Работа с избранным ---
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === product.id)
        ? prev.filter(fav => fav.id !== product.id)
        : [...prev, product]
    );
  };

  const isFavorite = (product) => {
    return favorites.some(fav => fav.id === product.id);
  };

  return (
    <Router>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchHistory={searchHistory}
        onSearch={onSearch}
      />

      {/* Все маршруты теперь полностью заменяют контент */}
      <Routes>
        {/* Главная страница — только она содержит Hero и секции */}
        <Route path="/" element={
          <HomePage
            promotions={promotions}
            newsProducts={newsProducts}
            buyAgoProducts={buyAgoProducts}
            articles={articles}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        } />

        {/* Отдельные страницы */}
        <Route path="/favorites" element={
          <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
        } />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/category/:categoryKey" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/articles" element={<AllArticlesPage articles={articles} />} />
        <Route path="/promotions" element={<AllPromotionsPage promotions={promotions} />} />
        <Route path="/news" element={<AllNewsPage products={newsProducts} />} />
        <Route path="/buyago" element={<AllBuyAgoPage products={buyAgoProducts} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
