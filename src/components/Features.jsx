// src/components/Features.js
import React from 'react';
// import './Features.css';

function Features() {
  return (
    <section className="features-section">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <i className="icon mic"></i>
          <p>Speech to Sign conversion</p>
        </div>
        <div className="feature-card">
          <i className="icon text-to-sign"></i>
          <p>Text to Sign conversion</p>
        </div>
        <div className="feature-card">
          <i className="icon sign"></i>
          <p>Sign to Speech conversion</p>
        </div>
        <div className="feature-card">
          <i className="icon text-to-speech"></i>
          <p>Sign to Text conversion</p>
        </div>
      </div>
    </section>
  );
}

export default Features;