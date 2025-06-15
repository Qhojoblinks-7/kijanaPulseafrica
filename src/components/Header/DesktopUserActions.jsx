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
          {/* Login Button */}
          <Link to="/login" onClick={onCloseMenus}>
            <button className="px-5 py-2 rounded-full border border-gamepulse-yellow text-gamepulse-yellow hover:bg-gamepulse-yellow hover:text-gamepulse-dark transition-all duration-300 font-semibold text-base">
              Login
            </button>
          </Link>
          {/* Sign Up Button */}
          <Link to="/signup" onClick={onCloseMenus}>
            <button className="px-6 py-2 rounded-full bg-gamepulse-yellow text-gamepulse-dark font-bold text-base shadow-md hover:bg-gamepulse-yellow/80 transition-colors duration-300">
              Sign Up
            </button>
          </Link>
          {/* Download App Button */}
          <button
            className="px-6 py-2 rounded-full bg-gamepulse-blue text-neutral-white font-bold text-base shadow-md flex items-center hover:bg-gamepulse-blue-dark transition-colors duration-300"
            onClick={() => { navigate('/download-app'); onCloseMenus(); }}
          >
            <FaDownload className="mr-2" /> Download App
          </button>
        </>
      ) : (
        <>
          {/* Search Bar (Desktop) */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium-gray" /> {/* Changed text color */}
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-2 rounded-full bg-neutral-dark-gray text-neutral-white placeholder-neutral-medium-gray focus:outline-none focus:ring-2 focus:ring-gamepulse-blue text-base" // Updated colors
            />
          </div>

          {/* Notifications */}
          <button
            className="relative text-neutral-white text-2xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200" // Updated colors
            onClick={() => { navigate('/notifications'); onCloseMenus(); }}
          >
            <FaBell />
            {/* Notification Badge - uses error-red for urgency */}
            <span className="absolute -top-1 -right-1 bg-error-red text-neutral-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span> {/* Updated colors */}
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="block focus:outline-none">
              <img
                src={userAvatarUrl || "/images/default-avatar.webp"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gamepulse-yellow object-cover transition-transform duration-200 hover:scale-105" // Updated border color
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-neutral-white rounded-md shadow-lg py-1 z-50 origin-top-right animate-fade-in-down"> {/* Updated background */}
                <Link to="/my-profile" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray" onClick={onCloseMenus}>My Profile</Link> {/* Updated colors */}
                {userType === 'coach' || userType === 'scout' || userType === 'fan' || userType === 'parent' ? (
                  <Link to="/messages" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray" onClick={onCloseMenus}>Messages</Link> 
                ) : null}
                {userType === 'scout' ? (
                  <Link to="/reports" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray" onClick={onCloseMenus}>Scouting Reports</Link> 
                ) : null}
                <Link to="/settings" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray" onClick={onCloseMenus}>Settings</Link> {/* Updated colors */}
                <Link to="/help" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray" onClick={onCloseMenus}>Help & Support</Link> {/* Updated colors */}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-error-red hover:bg-neutral-light-gray">Logout</button> {/* Updated colors */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DesktopUserActions;