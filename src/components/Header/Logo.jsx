// src/components/Header/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/trans_bg.png'; // Your single logo file

const Logo = ({ dashboardHomeLink, onCloseMenus, isDarkMode }) => { // Still receiving isDarkMode
    // Use a media query to detect mobile screens
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    return (
        <div className="flex-shrink-0">
            <Link to={dashboardHomeLink} onClick={onCloseMenus}>
                <img
                    src={logo} // Always use the same logo
                    alt="GamePulse Africa Logo"
                    className={`transition-transform duration-200 hover:scale-105 ${isMobile ? 'h-20' : 'h-16 md:h-25'}
                                ${isDarkMode ? 'dark:filter dark:brightness-110' : ''} // Optional: Adjust brightness for dark mode
                                `}
                    // Consider adding a border or subtle shadow in dark mode if your logo needs it to pop
                    // For example: ${isDarkMode ? 'dark:border dark:border-gray-700 dark:rounded-md' : ''}
                />
            </Link>
        </div>
    );
};

export default Logo;