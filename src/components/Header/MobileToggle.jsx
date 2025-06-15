// src/components/Header/MobileToggle.jsx
import React from 'react';
import { FaBars, FaTimes, FaSearch, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MobileToggle = ({ isLoggedIn, isMobileMenuOpen, toggleMobileMenu, onCloseMenus }) => {
  const navigate = useNavigate();
  return (
    <div className="md:hidden flex items-center space-x-4">
      {isLoggedIn && (
        <>
          {/* Mobile Search Icon */}
          <button className="text-white text-xl cursor-pointer hover:text-gamepulse-orange" onClick={() => { navigate('/search'); onCloseMenus(); }}>
            <FaSearch />
          </button>
          {/* Mobile Notifications Icon */}
          <button className="relative text-white text-xl cursor-pointer hover:text-gamepulse-orange" onClick={() => { navigate('/notifications'); onCloseMenus(); }}>
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
        </>
      )}

      {/* Hamburger Icon */}
      <button onClick={toggleMobileMenu} className="text-white text-2xl focus:outline-none">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default MobileToggle;