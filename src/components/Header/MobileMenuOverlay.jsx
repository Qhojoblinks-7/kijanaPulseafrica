// src/components/Header/MobileMenuOverlay.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt, FaBell, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';

const MobileMenuOverlay = ({
  navLinks, // Changed from mobileNavLinks to navLinks
  isLoggedIn,
  userType,
  handleLogout,
  onCloseMenus,
  isDarkMode,
  toggleDarkMode,
  unreadNotificationsCount,
  recentNotifications,
  hasNewMessages,
  user,
  getUserDashboardPath
}) => {
  const navigate = useNavigate();

  const getUserProfileLink = () => {
    if (user && (user.slug || user.id)) {
      return `/my-profile/${user.slug || user.id}`;
    }
    return '/my-profile';
  };

  return (
    <div
      className={`
        fixed inset-0 z-40 md:hidden overflow-y-auto scrollbar-hide
        ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
      `}
    >
      {/* FIXED MENU BAR AT THE TOP */}
      <div
        className={`
          fixed top-0 left-0 w-full p-4 border-b z-50
          ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          flex justify-between items-center
        `}
      >
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={onCloseMenus}
          className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          aria-label="Close Mobile Menu"
        >
          <FaTimes className="text-2xl" />
        </button>
      </div>

      {/* NAVIGATION CONTENT - Padded to clear the fixed menu bar */}
      <nav className="flex flex-col p-4 space-y-2 text-lg pt-20">
        {/* Role-based navigation links */}
        {navLinks.map((link, index) => (
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

            {/* Dashboard Link */}
            <Link
              to={getUserDashboardPath ? getUserDashboardPath(userType) : '/dashboard'}
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaUserCircle className="mr-3 text-xl" />
              Dashboard
            </Link>

            {/* Notifications Link */}
            <Link
              to="/notifications"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <div className="relative mr-3">
                <FaBell className="text-xl" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </div>
              Notifications
            </Link>

            {/* Messages Link */}
            <Link
              to="/messages"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <div className="relative mr-3">
                <FaEnvelope className="text-xl" />
                {hasNewMessages && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-3 h-3"></span>
                )}
              </div>
              Messages
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaCog className="mr-3 text-xl" />
              Settings
            </Link>

            {/* Help Link */}
            <Link
              to="/help"
              onClick={onCloseMenus}
              className={`flex items-center py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaQuestionCircle className="mr-3 text-xl" />
              Help
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center w-full py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <>
                  <FaSun className="mr-3 text-xl" />
                  Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mr-3 text-xl" />
                  Dark Mode
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                onCloseMenus();
              }}
              className={`flex items-center w-full py-2 px-3 rounded-md text-red-600 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaSignOutAlt className="mr-3 text-xl" />
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <div className={`border-t my-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {/* Login Link */}
            <Link
              to="/login"
              onClick={onCloseMenus}
              className={`block py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              Login
            </Link>

            {/* Sign Up Link */}
            <Link
              to="/signup"
              onClick={onCloseMenus}
              className={`block py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              Sign Up
            </Link>

            {/* Dark Mode Toggle for non-logged in users */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center w-full py-2 px-3 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <>
                  <FaSun className="mr-3 text-xl" />
                  Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mr-3 text-xl" />
                  Dark Mode
                </>
              )}
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenuOverlay;