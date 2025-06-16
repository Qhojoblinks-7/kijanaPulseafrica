// src/components/Header/MobileToggle.jsx
import React from 'react';
import { FaBars, FaTimes, FaSearch, FaBell, FaSun, FaMoon } from 'react-icons/fa'; // Added FaSun, FaMoon
import { useNavigate } from 'react-router-dom';

const MobileToggle = ({
  isLoggedIn,
  isMobileMenuOpen,
  toggleMobileMenu,
  onCloseMenus,
  isDarkMode,    // NEW: Passed from Header
  toggleDarkMode // NEW: Passed from Header
}) => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex items-center space-x-4">
      {isLoggedIn && (
        <>
          {/* Mobile Search Icon */}
          <button
            className="text-neutral-white text-xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200
                       dark:text-dark-text-primary dark:hover:text-gamepulse-orange" // Dark mode styles
            onClick={() => { navigate('/search'); onCloseMenus(); }}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          {/* Mobile Notifications Icon */}
          <button
            className="relative text-neutral-white text-xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200
                       dark:text-dark-text-primary dark:hover:text-gamepulse-orange" // Dark mode styles
            onClick={() => { navigate('/notifications'); onCloseMenus(); }}
            aria-label="Notifications"
          >
            <FaBell />
            {/* Notification Badge - uses error-red for urgency */}
            <span className="absolute -top-1 -right-1 bg-error-red text-neutral-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </>
      )}

      {/* NEW: Dark Mode Toggle for Mobile Header */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full text-neutral-white hover:text-gamepulse-yellow
                   dark:text-gamepulse-yellow dark:hover:text-gamepulse-orange transition-colors duration-300"
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {/* Hamburger/Close Icon */}
      <button
        onClick={toggleMobileMenu}
        className="text-neutral-white text-2xl focus:outline-none transition-colors duration-200 hover:text-gamepulse-yellow
                   dark:text-dark-text-primary dark:hover:text-gamepulse-orange" // Dark mode styles
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default MobileToggle;