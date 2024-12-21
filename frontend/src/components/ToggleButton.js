import React from 'react';
import '../styles/ToggleButton.css';


const ToggleButton = ({ toggleTheme }) => {
    return (
        <button className="toggle-button" onClick={toggleTheme}>
            🌙 / ☀️
        </button>
    );
};

export default ToggleButton;
