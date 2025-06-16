import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/trans_bg.png'

const Logo = ({ dashboardHomeLink, onCloseMenus }) => {
    return (
        <div className="flex-shrink-0">
            <Link to={dashboardHomeLink} onClick={onCloseMenus}>
                <img
                    src={logo}
                    alt="GamePulse Africa Logo"
                    className="h-12 md:h-25 transition-transform duration-200 hover:scale-105"
                />
            </Link>
        </div>
    );
};

export default Logo;
