// src/components/HeroSection.js
import React from 'react';
// import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <h1>
        Real-Time <span className="highlight">ISL</span> for a World Without Barriers
      </h1>
      <p className="subtext">
        Seamless speech-to-sign and sign-to-speech conversion, bridging communication gaps effortlessly.
      </p>
      <div className="hero-icons">
        <i className="icon mic"></i>
        <i className="icon text-to-sign"></i>
        <i className="icon sign"></i>
      </div>
      <button className="cta-button">Take a Demo</button>
    </section>
  );
}

export default HeroSection;