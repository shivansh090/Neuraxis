// src/components/Header.js
import React from 'react';
// import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">neuraxis.</div>
      <nav className="nav-menu">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#demo">Demo</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <div className="auth-buttons">
        <button className="sign-up">Sign Up</button>
        <button className="login">Login</button>
      </div>
    </header>
  );
}

export default Header;