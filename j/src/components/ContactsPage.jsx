import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ContactsPage.css';

const ContactsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Контакты</h2>
        <button
          onClick={() => navigate('/')}
          className="back-button"
        >
          На главную
        </button>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <div className="text-contact">
            <img src={require('../assets/photo/home.png')} alt="Дом" />
            Бухгалтерия, склад
          </div>
          <p className="phone">+7 82140 92619</p>
        </div>
        <div className="contact-item">
          <div className="text-contact">
            <img src={require('../assets/photo/percent.png')} alt="Вопросы" />
            Вопросы по системе лояльности
          </div>
          <p className="phone">+7 908 716 33 97</p>
        </div>
      </div>


      <div className="store-title">
        Наши магазины
      </div>

      <div className="store-tabs">
        <div className="store-tab active">п.Щельяюр</div>
        <div className="store-tab">д.Вертeп</div>
        <div className="store-tab">с.Краснобор</div>
        <div className="store-tab">д.Диор</div>
      </div>

      <div className="store-list">
        <div className="store-item">
          <img src={require('../assets/photo/voshod.png')} alt="Восход" style={{ width: '146px', height: '20px' }} />
          <div className="address">
            <img src={require('../assets/photo/home.png')} alt="Дом" />
            ул. Дорожная 10
          </div>
          <div className="phone">
            <img src={require('../assets/photo/phone.png')} alt="Телефон" />
            +7 904 271 35 90
          </div>
        </div>
        <div className="store-item">
          <div className="text-svet">
            <img src={require('../assets/photo/parys.png')} alt="Парус" style={{ width: '146px', height: '20px' }} />
          </div>
          <div className="address">
            <img src={require('../assets/photo/home.png')} alt="Дом" />
            ул. Советская 87
          </div>
          <div className="phone">
            <img src={require('../assets/photo/phone.png')} alt="Телефон" />
            +7 82140 91330
          </div>
        </div>
        <div className="store-item">
          <img src={require('../assets/photo/ryabinyshka.png')} alt="Рябинушка" style={{ width: '146px', height: '20px' }} />
          <div className="address">
            <img src={require('../assets/photo/home.png')} alt="Дом" />
            ул. Заводская 16
          </div>
          <div className="phone">
            <img src={require('../assets/photo/phone.png')} alt="Телефон" />
            +7 82140 91101
          </div>
        </div>
        <div className="store-item">
          <img  src={require('../assets/photo/pelys.png')} alt="Пелысь" style={{ width: '146px', height: '20px' }} />
          <div className="address">
            <img src={require('../assets/photo/home.png')} alt="Дом" />
            ул. Рабочая 1
          </div>
          <div className="phone">
            <img src={require('../assets/photo/phone.png')} alt="Телефон" />
            +7 82140 91300
          </div>
        </div>
      </div>

      <div className="map">
        <img
          src={require('../assets/photo/map1.png')} 
          alt="Карта"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default ContactsPage;