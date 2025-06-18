// src/components/Header/MobileMenuOverlay.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt, FaBell, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';

const MobileMenuOverlay = ({
  mobileNavLinks,
  isLoggedIn,
  userType,
  handleLogout,
  onCloseMenus,
  isDarkMode,
  toggleDarkMode,
  unreadNotificationsCount, // NEW
  recentNotifications,      // NEW - used for potential preview, though less common in full mobile overlay
  hasNewMessages,           // NEW
  user                      // NEW: User object
}) => {
  const navigate = useNavigate();

  // Helper to get profile link for mobile
  const getUserProfileLink = () => {
    if (user && (user.slug || user.id)) {
      return `/my-profile/${user.slug || user.id}`;
    }
    return '/my-profile';
  };

  return (
    <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out
                    ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}
         style={{ transform: 'translateX(0%)' }}> {/* This component is only rendered when open */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={onCloseMenus}
          className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          aria-label="Close Mobile Menu"
        >
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2 text-lg">
        {mobileNavLinks.map((link, index) => (
          link.type === 'button' ? (
            <button
              key={index}
              onClick={() => { link.onClick(); onCloseMenus(); }}
              className={`w-full text-left py-2 px-3 rounded-md ${link.className}`}
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={index}
              to={link.to}
              onClick={onCloseMenus}
              className={`block py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              {link.label}
            </Link>
          )
        ))}

        {isLoggedIn && (
          <>
            <div className={`border-t my-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* Profile Link */}
            <Link
              to={getUserProfileLink()}
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaUserCircle className="mr-3 text-xl" /> My Profile
            </Link>
            {/* Notifications Link */}
            <Link
              to="/notifications"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaBell className="mr-3 text-xl" /> Notifications
              {unreadNotificationsCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
            {/* Messages Link */}
            <Link
              to="/messages"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaEnvelope className="mr-3 text-xl" /> Messages
              {hasNewMessages && <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">New</span>}
            </Link>
            {/* Settings Link */}
            <Link
              to="/settings"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaCog className="mr-3 text-xl" /> Settings
            </Link>
            {/* Help Link */}
            <Link
              to="/help"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaQuestionCircle className="mr-3 text-xl" /> Help & Support
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center py-2 px-3 rounded-md w-full text-left ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaSun className="mr-3 text-xl" /> : <FaMoon className="mr-3 text-xl" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => { handleLogout(); onCloseMenus(); }}
              className={`flex items-center py-2 px-3 rounded-md w-full text-left ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaSignOutAlt className="mr-3 text-xl" /> Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenuOverlay;