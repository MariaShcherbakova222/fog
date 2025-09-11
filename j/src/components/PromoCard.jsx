import React, { useState, useEffect } from 'react';
import '../assets/PromoCard.css';

const PromoCard = ({ 
  image, 
  discount, 
  price, 
  originalPrice, 
  title, 
  rating, 
  onToggleFavorite,
  isFavorite = false
}) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      const item = cart.find(p => p.title === title);
      if (item) {
        setQuantity(item.quantity);
      }
    }
  }, [title]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    updateCart(newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeFromCart();
      setQuantity(0);
    } else {
      const newQuantity = quantity - 1;
      updateCart(newQuantity);
      setQuantity(newQuantity);
    }
  };

  const updateCart = (qty) => {
    const product = {
      id: Date.now() + Math.random(),
      image,
      title,
      price: parseFloat(price.replace(',', '.')),
      discount,
      quantity: qty,
    };

    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existingIndex = cart.findIndex(p => p.title === title);
    if (existingIndex !== -1) {
      if (qty > 0) {
        cart[existingIndex].quantity = qty;
      } else {
        cart.splice(existingIndex, 1);
      }
    } else if (qty > 0) {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.updateCartCount?.();
  };

  const removeFromCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return;

    const cart = JSON.parse(savedCart);
    const updatedCart = cart.filter(p => p.title !== title);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.updateCartCount?.();
  };

  return (
    <div className="promo-card">
      <div className="card-image-container">
        <img src={image} alt={title} />
        <div className="discount-badge">{discount}</div>
        <button 
          className="favorite-btn"
          onClick={() => onToggleFavorite()}
          aria-label="Добавить в избранное"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? '#ff6b35' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 18.33l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="card-info">
        <div className="prices">
          <span className="price-current">{price} ₽</span>
          <span className="price-original">{originalPrice} ₽</span>
        </div>
        <div className="product-title">{title}</div>
        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
          ))}
        </div>
        <div className="add-to-cart-container">
          {quantity === 0 ? (
            <button 
              className="add-to-cart"
              onClick={handleIncrement}
            >
              В корзину
            </button>
          ) : (
            <div className="counter">
              <button onClick={handleDecrement}>−</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
