import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  //Читать корзину
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Ошибка чтения корзины', e);
      }
    }
  }, []);

  //Обновляь при изменении localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Ошибка чтения корзины', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  //Выделенные товары
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Удаление выбранных
  const handleDeleteSelected = () => {
    const updatedCart = cartItems.filter(item => !selectedItems.has(item.id));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // ✅ Сохраняем обратно
    setSelectedItems(new Set());
  };

  //Выделить все
  const handleSelectAll = () => {
    const allIds = new Set(cartItems.map(item => item.id));
    setSelectedItems(allIds);
  };

  //Выделить/снять выделение
  const toggleItemSelection = (id) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedItems(newSet);
  };

  //Изменение количества
  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  //Расчет итога
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.discount ? item.price * 0.9 : item.price;
    return sum + price * item.quantity;
  }, 0);

  const finalPrice = totalPrice;

  const isMinOrderReached = finalPrice >= 1000;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Корзина</h2>
        <button
          onClick={() => navigate('/')}
          className="back-button"
        >
          На главную
        </button>
      </div>

      {/* Фильтры */}
      <div className="filters">
        <button
          className="filter-btn select-all"
          onClick={handleSelectAll}
        >
          Выделить всё
        </button>
        <button
          className="filter-btn delete-selected"
          onClick={handleDeleteSelected}
        >
          Удалить выбранные
        </button>
      </div>

      {/* Товары и плашка справа */}
      <div style={{ display: 'flex', gap: '32px', margin: '20px 0' }}>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              Корзина пуста
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="checkbox" onClick={() => toggleItemSelection(item.id)}>
                  {selectedItems.has(item.id) && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
                <img src={item.image} alt={item.title} />
                <div className="product-info">
                  <h3 className="product-title">{item.title}</h3>
                  <div className="price-per-unit">
                    {item.discount && (
                      <span style={{ marginRight: '8px', color: '#ff6b35' }}>
                        {item.discount}
                      </span>
                    )}
                    {item.price.toFixed(2)} ₽ за шт.
                  </div>
                </div>
                <div className="counter">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <div className="price">
                  {(item.discount ? item.price * 0.9 : item.price) * item.quantity} ₽
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="total">
            <span>Товаров</span>
            <span>{totalItems}</span>
          </div>
          <div className="total">
            <span>Сумма</span>
            <span className="total-price">{totalPrice.toFixed(2)} ₽</span>
          </div>
          <div className="total">
            <span>Итого</span>
            <span className="total-price">{finalPrice.toFixed(2)} ₽</span>
          </div>
          {!isMinOrderReached && (
            <div className="min-order-warning">
              Минимальная сумма заказа 1000р.
            </div>
          )}
          <button
            className="checkout-btn"
            disabled={!isMinOrderReached}
            onClick={() => navigate('/delivery')}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};


export default CartPage;
