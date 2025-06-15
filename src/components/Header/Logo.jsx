// src/components/Header/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ dashboardHomeLink, onCloseMenus }) => {
  return (
    <div className="flex-shrink-0">
      <Link to={dashboardHomeLink} onClick={onCloseMenus}>
        <img
          src="/images/gamepulse-logo-white.svg"
          alt="GamePulse Africa Logo"
          className="h-9 md:h-10 transition-transform duration-200 hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default Logo;