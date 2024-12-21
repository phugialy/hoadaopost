import React from 'react';
import '../styles/Header.css';

const Header = ({ darkMode, toggleTheme }) => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/hoaDaoLogo.png" alt="Logo" className="header-logo" />
                <span className="header-text">HOA DAO</span>
            </div>
            <div className="social-buttons">
                <a
                    href="https://www.facebook.com/search/top?q=hoa%20dao%20lion%20dance%20association"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button facebook"
                >
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a
                    href="https://www.instagram.com/hoadaoliondance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button instagram"
                >
                    <i className="fab fa-instagram"></i>
                </a>
                <button
                    className="social-button share"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                    }}
                >
                    <i className="fas fa-share"></i>
                </button>
            </div>
            <div className="header-right">
                <button className="dark-mode-toggle" onClick={toggleTheme}>
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </header>
    );
};

export default Header;
