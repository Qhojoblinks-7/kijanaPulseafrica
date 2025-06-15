// src/components/Header/Logo.jsx (if you have a blue SVG)
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ dashboardHomeLink, onCloseMenus }) => {
  return (
    <div className="flex-shrink-0">
      <Link to={dashboardHomeLink} onClick={onCloseMenus}>
        <img
          src="/images/gamepulse-logo-blue.svg" // Changed to blue version
          alt="GamePulse Africa Logo"
          className="h-9 md:h-10 transition-transform duration-200 hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default Logo;