// src/components/Header/NavLink.jsx
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'; // Renamed to avoid conflict with component name

const NavLink = ({ to, children, onClick, className = "", isDarkMode }) => { // Added isDarkMode prop
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `block py-2 transition-colors duration-200 md:inline-block md:py-0 md:hover:scale-105
        ${isActive
          ? 'text-gamepulse-yellow dark:text-gamepulse-orange' // Active link: gamepulse-yellow in light, gamepulse-orange in dark
          : isDarkMode
            ? 'text-dark-text-primary hover:text-gamepulse-orange' // Dark mode inactive: dark-text-primary, hover gamepulse-orange
            : 'text-neutral-white hover:text-gamepulse-yellow' // Light mode inactive: neutral-white, hover gamepulse-yellow
        }
        ${className}` // Apply any additional classNames passed in
      }
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;