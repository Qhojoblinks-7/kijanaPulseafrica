// src/components/Header/DesktopUserActions.jsx
import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaDownload, FaSun, FaMoon, FaUserCircle, FaCog, FaQuestionCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Added FaSun, FaMoon, and other icons

const DesktopUserActions = forwardRef(({
  isLoggedIn,
  userAvatarUrl,
  userType,
  isDropdownOpen,
  toggleDropdown,
  handleLogout,
  onCloseMenus,
  isDarkMode,    // NEW: Passed from Header
  toggleDarkMode // NEW: Passed from Header
}, ref) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center space-x-4 user-actions-container" ref={ref}>
      {/* Dark Mode Toggle - Integrated here for desktop */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full text-gamepulse-yellow hover:text-gamepulse-orange
                   dark:text-gamepulse-yellow dark:hover:text-gamepulse-orange transition-colors duration-300"
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>

      {!isLoggedIn ? (
        <>
          {/* Login Button */}
          <Link to="/login" onClick={onCloseMenus}>
            <button className="px-5 py-2 rounded-full border border-gamepulse-yellow text-gamepulse-yellow hover:bg-gamepulse-yellow hover:text-gamepulse-dark transition-all duration-300 font-semibold text-base
                               dark:border-gamepulse-yellow dark:text-gamepulse-yellow dark:hover:bg-gamepulse-yellow dark:hover:text-dark-background-primary">
              Login
            </button>
          </Link>
          {/* Sign Up Button */}
          <Link to="/signup" onClick={onCloseMenus}>
            <button className="px-6 py-2 rounded-full bg-gamepulse-yellow text-gamepulse-dark font-bold text-base shadow-md hover:bg-gamepulse-yellow/80 transition-colors duration-300
                               dark:bg-gamepulse-orange dark:text-white dark:hover:bg-orange-700 dark:shadow-none"> {/* Adjusted for dark mode */}
              Sign Up
            </button>
          </Link>
          {/* Download App Button */}
          <button
            className="px-6 py-2 rounded-full bg-gamepulse-blue text-neutral-white font-bold text-base shadow-md flex items-center hover:bg-[#034078] transition-colors duration-300
                       dark:bg-gamepulse-teal dark:text-white dark:hover:bg-[#006B6B] dark:shadow-none"> {/* Adjusted for dark mode */}
            <FaDownload className="mr-2" /> Download App
          </button>
        </>
      ) : (
        <>
          {/* Search Bar (Desktop) */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium-gray
                                 dark:text-dark-text-secondary" /> {/* Dark mode text color */}
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-10 pr-4 py-2 rounded-full bg-neutral-dark-gray text-neutral-white placeholder-neutral-medium-gray focus:outline-none focus:ring-2 focus:ring-gamepulse-blue text-base
                         dark:bg-dark-background-tertiary dark:text-dark-text-primary dark:placeholder-dark-text-disabled dark:focus:ring-gamepulse-orange dark:border dark:border-gray-700" // Dark mode styles
            />
          </div>

          {/* Notifications */}
          <button
            className="relative text-neutral-white text-2xl cursor-pointer hover:text-gamepulse-yellow transition-colors duration-200
                       dark:text-dark-text-primary dark:hover:text-gamepulse-yellow" // Dark mode text color
            onClick={() => { navigate('/notifications'); onCloseMenus(); }}
          >
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-error-red text-neutral-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="block focus:outline-none">
              <img
                src={userAvatarUrl || "/images/default-avatar.webp"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gamepulse-yellow object-cover transition-transform duration-200 hover:scale-105
                           dark:border-gamepulse-blue dark:hover:border-gamepulse-orange" // Dark mode border colors
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-neutral-white rounded-md shadow-lg py-1 z-50 origin-top-right animate-fade-in-down
                              dark:bg-dark-background-secondary dark:shadow-xl-dark dark:border dark:border-gray-700 transition-colors duration-300"> {/* Dark mode styles */}
                <Link to="/my-profile" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray
                           dark:text-dark-text-primary dark:hover:bg-dark-background-tertiary" onClick={onCloseMenus}><FaUserCircle className="inline mr-2" /> My Profile</Link>
                {userType === 'coach' || userType === 'scout' || userType === 'fan' || userType === 'parent' ? (
                  <Link to="/messages" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray
                             dark:text-dark-text-primary dark:hover:bg-dark-background-tertiary" onClick={onCloseMenus}><FaEnvelope className="inline mr-2" /> Messages</Link>
                ) : null}
                {userType === 'scout' ? (
                  <Link to="/reports" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray
                             dark:text-dark-text-primary dark:hover:bg-dark-background-tertiary" onClick={onCloseMenus}>Scouting Reports</Link>
                ) : null}
                <Link to="/settings" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray
                           dark:text-dark-text-primary dark:hover:bg-dark-background-tertiary" onClick={onCloseMenus}><FaCog className="inline mr-2" /> Settings</Link>
                <Link to="/help" className="block px-4 py-2 text-neutral-dark-gray hover:bg-neutral-light-gray
                           dark:text-dark-text-primary dark:hover:bg-dark-background-tertiary" onClick={onCloseMenus}><FaQuestionCircle className="inline mr-2" /> Help & Support</Link> {/* Corrected path and added icon */}
                <div className="border-t border-neutral-light-gray my-1 dark:border-gray-700"></div> {/* Dark mode border */}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-error-red hover:bg-neutral-light-gray
                           dark:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"><FaSignOutAlt className="inline mr-2" /> Logout</button>

                {/* NEW: Explicit Close Button for the dropdown */}
                <div className="border-t border-neutral-light-gray my-1 dark:border-gray-700"></div> {/* Optional: a subtle separator */}
                <button
                  onClick={onCloseMenus} // This will call closeMenus from Header, closing the dropdown
                  className="w-full text-left px-4 py-2 text-neutral-medium-gray hover:bg-neutral-light-gray hover:text-neutral-dark-gray transition-colors duration-200
                             dark:text-dark-text-secondary dark:hover:bg-dark-background-tertiary dark:hover:text-dark-text-primary"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default DesktopUserActions;