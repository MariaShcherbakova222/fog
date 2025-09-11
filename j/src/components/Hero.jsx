import React from 'react';
import '../assets/Hero.css'
import heroBg from '../assets/photo/hero-bg1.png'; 

const Hero = () => {
  return (
    <section className="hero">
      <img src={heroBg} alt="Доставка бесплатно" />
    </section>
  );
};


export default Hero;
