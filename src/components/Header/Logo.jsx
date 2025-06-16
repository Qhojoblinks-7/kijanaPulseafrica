import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/trans_bg.png'

const Logo = ({ dashboardHomeLink, onCloseMenus }) => {
    // Use a media query to detect mobile screens
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    return (
        <div className="flex-shrink-0">
            <Link to={dashboardHomeLink} onClick={onCloseMenus}>
                <img
                    src={logo}
                    alt="GamePulse Africa Logo"
                    className={`transition-transform duration-200 hover:scale-105 ${isMobile ? 'h-20' : 'h-16 md:h-25'}`}
                />
            </Link>
        </div>
    );
};

export default Logo;
