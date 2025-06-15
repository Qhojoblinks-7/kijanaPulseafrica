// src/components/Header/NavLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children, onClick, className = "" }) => (
  <Link
    to={to}
    className={`block py-2 text-white hover:text-gamepulse-orange transition-colors duration-200 md:inline-block md:py-0 md:hover:scale-105 ${className}`}
    onClick={onClick} // Ensure onClick is passed and used
  >
    {children}
  </Link>
);

export default NavLink;