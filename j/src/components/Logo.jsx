import React from 'react';
import logoImg from '../assets/photo/logo.png'; 

const Logo = () => {
  return (
    <img 
      src={logoImg} 
      alt="Логотип Северяночка" 
      style={{ width: '40px', height: '32px' }} 
    />
  );
};

export default Logo;