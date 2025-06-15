// src/components/Header/DesktopUserActions.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaDownload } from 'react-icons/fa';

const DesktopUserActions = ({ isLoggedIn, userAvatarUrl, userType, isDropdownOpen, toggleDropdown, handleLogout, onCloseMenus }) => {
  const navigate = useNavigate(); // useNavigate is used here for buttons like Download App, Search, Notifications

  return (
    <div className="hidden md:flex items-center space-x-4">
      {!isLoggedIn ? (
        <>
          <Link to="/login" onClick={onCloseMenus}>
            <button className="px-5 py-2 rounded-full border border-gamepulse-orange text-gamepulse-orange hover:bg-gamepulse-orange hover:text-white transition-all duration-300 font-semibold text-base">
              Login
            </button>
          </Link>
          <Link to="/signup" onClick={onCloseMenus}>
            <button className="px-6 py-2 rounded-full bg-gamepulse-orange text-white font-bold text-base shadow-md hover:bg-orange-700 transition-colors duration-300">
              Sign Up
            </button>
          </Link>
          <button
            className="px-6 py-2 rounded-full bg-gamepulse-teal text-white font-bold text-base shadow-md flex items-center hover:bg-gamepulse-teal-dark transition-colors duration-300"
            onClick={() => { navigate('/download-app'); onCloseMenus(); }}
          >
            <FaDownload className="mr-2" /> Download App
          </button>
        </>
      ) : (
        <>
          {/* Search Bar (Desktop) */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gamepulse-blue text-base"
            />
          </div>

          {/* Notifications */}
          <button className="relative text-gray-200 text-2xl cursor-pointer hover:text-gamepulse-orange transition-colors duration-200"
                  onClick={() => { navigate('/notifications'); onCloseMenus(); }}>
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="block focus:outline-none">
              <img
                src={userAvatarUrl || "/images/default-avatar.webp"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gamepulse-orange object-cover transition-transform duration-200 hover:scale-105"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right animate-fade-in-down">
                <Link to="/my-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onCloseMenus}>My Profile</Link>
                {userType === 'coach' || userType === 'scout' || userType === 'fan' || userType === 'parent' ? (
                  <Link to="/messages" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onCloseMenus}>Messages</Link>
                ) : null}
                 {userType === 'scout' ? (
                  <Link to="/reports" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onCloseMenus}>Scouting Reports</Link>
                ) : null}
                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onCloseMenus}>Settings</Link>
                <Link to="/help" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={onCloseMenus}>Help & Support</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopUserActions;