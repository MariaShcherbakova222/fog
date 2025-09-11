import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/Header.css';
import Logo from './Logo';
import userPhoto from '../assets/photo/man.jpg';
import { MenuIcon, HeartIcon, BoxIcon, CartIcon } from './Icons';
import AuthModal from './AuthModal';

const Header = ({ searchQuery, setSearchQuery, searchHistory, onSearch }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetch('http://localhost:5000/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(userData => {
          if (userData.id) {
            setUser(userData);
            localStorage.setItem('currentUser', JSON.stringify(userData)); 
          } else {
            clearAuth(); 
          }
        })
        .catch(clearAuth);н
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }

    
    window.updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

  }, []); 

  const clearAuth = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const handleLogout = () => {
    clearAuth();
    setIsDropdownOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ width: '1440px', margin: '0 auto', padding: '0' }}>
      <header className="header">
        {/* Логотип */}
        <div className="logo-container">
          <Logo />
          <span>СЕВЕРЯНОЧКА</span>
        </div>

        {/* Каталог */}
        <button
          className="catalog-button"
          onClick={() => (window.location.href = '/catalog')}
        >
          <MenuIcon />
          <span>Каталог</span>
        </button>

        {/* Поиск */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Найти товар"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button onClick={() => onSearch(searchQuery)}>🔍</button>

          {showSuggestions && searchHistory.length > 0 && (
            <div className="search-suggestions">
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/*Навигация*/}
        <nav className="nav-links">
          <Link to="/favorites" className="nav-link">
            <HeartIcon />
            <span>Избранное</span>
          </Link>
          <Link to="/orders" className="nav-link">
            <BoxIcon />
            <span>Заказы</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <CartIcon />
            <span>Корзина</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>

        {/*Пользователь*/}
        <div className="user-menu">
          {user ? (
            <div className="user-profile">
              <img src={user.photo || userPhoto} alt="User" />
              <span>{user.name}</span>
              <svg
                className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}
                viewBox="0 0 16 16"
                fill="currentColor"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <path d="M7.999 11.5l-3.5-3.5 1.414-1.414L7.999 9.672l3.5-3.5 1.414 1.414L9.414 11.5H7.999z" />
              </svg>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setIsAuthOpen(true)}>
              Войти
            </button>
          )}
        </div>
      </header>

      {/*Модальное окно */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLoginSuccess}
        onRegister={handleRegisterSuccess}
      />
    </div>
  );
};

export default Header;
