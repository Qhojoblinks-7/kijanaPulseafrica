// src/components/Header/DesktopNav.jsx
import React from 'react';
import NavLink from './NavLink'; // Import the new NavLink component

const DesktopNav = ({ navLinks, onCloseMenus }) => {
  return (
    <nav className="hidden md:flex flex-grow justify-center space-x-6 lg:space-x-8 text-lg font-semibold">
      {navLinks.map((link, index) => (
        link.type === 'button' ? (
          <button key={index} className={link.className} onClick={link.onClick || onCloseMenus}>
            {link.label}
          </button>
        ) : (
          <NavLink key={index} to={link.to} onClick={onCloseMenus}>{link.label}</NavLink>
        )
      ))}
    </nav>
  );
};

export default DesktopNav;