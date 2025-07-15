import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="profile-info">
          <h1 className="name">Abdulrahman Al-Janabi</h1>
          <h2 className="title">Senior Software Engineer</h2>
          <div className="location">Amman, Jordan</div>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <span className="icon">📞</span>
            <a href="tel:+962775354221">+962-775354221</a>
          </div>
          <div className="contact-item">
            <span className="icon">📧</span>
            <a href="mailto:aaljanabi@rocketmail.com">aaljanabi@rocketmail.com</a>
          </div>
          <div className="contact-item">
            <span className="icon">💼</span>
            <a href="https://linkedin.com/in/abdulrahman-al-janabi" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="contact-item">
            <span className="icon">🐙</span>
            <a href="https://github.com/janabi" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;