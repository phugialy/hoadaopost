import React from 'react';
import '../styles/Header.css';

const Header = ({ darkMode, toggleTheme }) => {
    return (
        <header className="header">
            {/* Left Section: Logo and Text */}
            <div className="header-left">
                <img src="/hoaDaoLogo.png" alt="Hoa Dao Logo" className="header-logo" />
                <span className="header-text">HOA DAO 2025</span>
                
            </div>

            {/* Center Section: Empty Space */}
            <div className="header-center"></div>

            {/* Right Section: Dark Mode Button */}
            <div className="header-right">
                <button className="dark-mode-toggle" onClick={toggleTheme}>
                    {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
        </header>
    );
};

export default Header;