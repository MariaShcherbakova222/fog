import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <img 
            src={require('../assets/photo/logofoot.png')} 
            alt="Логотип Северяночка" 
            className="footer-logo"
          />
        </div>

        <nav className="footer-links">
          <Link to="/about">О компании</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/vacancies">Вакансии</Link>
          <Link to="/articles">Статьи</Link>
          <a href="#">Политика обработки персональных данных</a>
        </nav>

        <div className="social-icons">
          <a href="#" aria-label="Instagram">
            <img src={require('../assets/photo/insta.png')} alt="Instagram" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </a>
          <a href="#" aria-label="VK">
            <img src={require('../assets/photo/vk.png')} alt="VK" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </a>
          <a href="#" aria-label="Facebook">
            <img src={require('../assets/photo/facebook.png')} alt="Facebook" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </a>
          <a href="#" aria-label="OK">
            <img src={require('../assets/photo/odnoklassniki.png')} alt="OK" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </a>
        </div>

        <div className="phone">
          <img 
            src={require('../assets/photo/phone.png')} 
            alt="Телефон" 
            style={{ width: '16px', height: '16px' }} 
          />
          <span>8 800 777 33 33</span>
        </div>

        <div className="designer">
          Дизайн: ZASOVSKIY
        </div>
      </div>
    </footer>
  );
};


export default Footer;


