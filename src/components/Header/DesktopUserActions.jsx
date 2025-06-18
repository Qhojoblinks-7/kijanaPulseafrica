// src/components/Header/DesktopUserActions.jsx

import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaCog, FaQuestionCircle, FaSignOutAlt, FaUserCircle, FaBell, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';

// Receive new props for notifications
const DesktopUserActions = forwardRef(({
  isLoggedIn,
  userAvatarUrl,
  userType,
  isDropdownOpen,
  toggleDropdown,
  handleLogout,
  onCloseMenus,
  isDarkMode,
  toggleDarkMode,
  unreadNotificationsCount, // NEW
  recentNotifications,      // NEW
  hasNewMessages,           // NEW
  user                      // NEW: User object for profile link
}, ref) => {
  const navigate = useNavigate();

  // Helper to get profile link based on userType and user data
  const getUserProfileLink = () => {
    // Assuming 'user' object from AuthContext has a 'slug' or 'id'
    // If not, you might navigate to a generic '/my-profile' which then redirects based on auth
    if (user && (user.slug || user.id)) {
      return `/my-profile/${user.slug || user.id}`;
    }
    // Fallback if no specific ID/slug is available
    return '/my-profile';
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
    onCloseMenus();
  };

  const handleMessagesClick = () => {
    navigate('/messages');
    onCloseMenus();
  };

  return (
    <div className="hidden md:flex items-center space-x-4" ref={ref}>
      {isLoggedIn ? (
        <>
          {/* Notification Icon */}
          <button
            onClick={handleNotificationClick}
            className={`relative p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-white/20'} transition-colors`}
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Messages Icon */}
          <button
            onClick={handleMessagesClick}
            className={`relative p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-white/20'} transition-colors`}
            aria-label="Messages"
          >
            <FaEnvelope className="text-xl" />
            {hasNewMessages && ( // Assuming hasNewMessages is a boolean from your context/fetch
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"></span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gamepulse-yellow rounded-full"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <img
                src={userAvatarUrl || (isDarkMode ? '/path/to/dark-mode-default-avatar.png' : '/path/to/light-mode-default-avatar.png')} // Replace with actual default avatars
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <FaChevronDown className={`${isDropdownOpen ? 'transform rotate-180' : ''} transition-transform duration-200 text-white text-sm`} />
            </button>

            {isDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5
                              ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
                {/* Profile Link */}
                <Link
                  to={getUserProfileLink()}
                  onClick={onCloseMenus}
                  className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaUserCircle className="mr-3 text-lg" /> My Profile
                </Link>
                {/* Notifications Link (if not already handled by icon, or for full list) */}
                <Link
                  to="/notifications"
                  onClick={onCloseMenus}
                  className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaBell className="mr-3 text-lg" /> Notifications ({unreadNotificationsCount})
                </Link>
                {/* Messages Link */}
                <Link
                  to="/messages"
                  onClick={onCloseMenus}
                  className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaEnvelope className="mr-3 text-lg" /> Messages {hasNewMessages && <span className="ml-1 text-red-500 font-bold">• New</span>}
                </Link>
                <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t my-1`}></div>
                {/* Settings Link */}
                <Link
                  to="/settings"
                  onClick={onCloseMenus}
                  className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaCog className="mr-3 text-lg" /> Settings
                </Link>
                {/* Help Link */}
                <Link
                  to="/help" // Ensure this matches your App.jsx route
                  onClick={onCloseMenus}
                  className={`flex items-center px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaQuestionCircle className="mr-3 text-lg" /> Help & Support
                </Link>
                <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t my-1`}></div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center px-4 py-2 text-sm w-full text-left ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <FaSun className="mr-3 text-lg" /> : <FaMoon className="mr-3 text-lg" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t my-1`}></div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <FaSignOutAlt className="mr-3 text-lg" /> Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300
                        ${isDarkMode ? 'text-gamepulse-blue hover:bg-gamepulse-blue/20' : 'text-white hover:bg-white/20'}`}
            onClick={onCloseMenus}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300
                        ${isDarkMode ? 'bg-gamepulse-blue text-white hover:bg-blue-600' : 'bg-gamepulse-yellow text-[#0A1128] hover:bg-amber-400'}`}
            onClick={onCloseMenus}
          >
            Sign Up
          </Link>
          {/* Dark Mode Toggle for logged out state */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-white/20'} transition-colors`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>
      )}
    </div>
  );
});

export default DesktopUserActions;