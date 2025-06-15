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
          <button
            className="text-neutral-white text-xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200"
            onClick={() => { navigate('/search'); onCloseMenus(); }}
            aria-label="Search" // Added for accessibility
          >
            <FaSearch />
          </button>
          {/* Mobile Notifications Icon */}
          <button
            className="relative text-neutral-white text-xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200"
            onClick={() => { navigate('/notifications'); onCloseMenus(); }}
            aria-label="Notifications" // Added for accessibility
          >
            <FaBell />
            {/* Notification Badge - uses error-red for urgency */}
            <span className="absolute -top-1 -right-1 bg-error-red text-neutral-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </>
      )}

      {/* Hamburger/Close Icon */}
      <button
        onClick={toggleMobileMenu}
        className="text-neutral-white text-2xl focus:outline-none transition-colors duration-200 hover:text-gamepulse-yellow" // Added hover effect
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} // Added for accessibility
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default MobileToggle;