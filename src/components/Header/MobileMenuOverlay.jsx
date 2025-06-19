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
  unreadNotificationsCount,
  recentNotifications,
  hasNewMessages,
  user
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
        fixed inset-0 z-40 md:hidden overflow-y-auto scrollbar-hide // Main overlay container
        ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
      `}
      // The transform style here is typically for animating the entry/exit of the overlay itself.
      // If the overlay itself slides in/out, this is where that logic usually resides,
      // often controlled by a state variable. For a full-screen fixed overlay, `inset-0` is enough.
      // style={{ transform: 'translateX(0%)' }} // Removed if you're using CSS classes for entry/exit
    >
      {/* FIXED MENU BAR AT THE TOP */}
      <div
        className={`
          fixed top-0 left-0 w-full p-4 border-b z-50 // <--- CHANGED FROM sm:fixed to fixed
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
      <nav className="flex flex-col p-4 space-y-2 text-lg pt-20"> {/* Added pt-20 */}
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
              <img
                src={user?.userAvatarUrl || 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=GP'}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              My Profile
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