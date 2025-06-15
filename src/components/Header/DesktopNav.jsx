// src/components/Header/DesktopNav.jsx
import React from 'react';
import NavLink from './NavLink'; // Import the new NavLink component

const DesktopNav = ({ navLinks, onCloseMenus }) => {
  return (
    <nav className="hidden md:flex flex-grow justify-center space-x-6 lg:space-x-8 text-lg font-semibold">
      {navLinks.map((link, index) => (
        link.type === 'button' ? (
          // For buttons, ensure the className prop passed from parent (e.g., Header)
          // uses the new color utility classes like bg-gamepulse-blue, text-neutral-white, etc.
          <button
            key={index}
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${link.className}`}
            onClick={link.onClick || onCloseMenus}
          >
            {link.label}
          </button>
        ) : (
          // NavLink already handles its own styling with brand colors
          <NavLink key={index} to={link.to} onClick={onCloseMenus}>{link.label}</NavLink>
        )
      ))}
    </nav>
  );
};

export default DesktopNav;