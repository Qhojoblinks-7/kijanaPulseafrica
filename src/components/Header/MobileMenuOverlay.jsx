// src/components/Header/MobileMenuOverlay.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDownload, FaTimes, FaSun, FaMoon, FaUserCircle, FaCog, FaQuestionCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Import additional icons for clarity
import NavLink from './NavLink'; // Import NavLink

const MobileMenuOverlay = ({
  mobileNavLinks,
  isLoggedIn,
  userType,
  handleLogout,
  onCloseMenus,
  isDarkMode,    // NEW: Passed from Header
  toggleDarkMode // NEW: Passed from Header
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gamepulse-dark z-40 flex flex-col items-center justify-center py-16 px-8 animate-fade-in
                    dark:bg-dark-background-primary transition-colors duration-300"> {/* Dark mode background */}
      {/* NEW: Close button at top right for mobile menu */}
      <button
        onClick={onCloseMenus} // Calls the closeMenus function passed from Header
        className="absolute top-4 right-4 text-neutral-white text-3xl focus:outline-none hover:text-gamepulse-yellow transition-colors duration-200
                   dark:text-dark-text-primary dark:hover:text-gamepulse-orange" // Dark mode text color
        aria-label="Close menu"
      >
        <FaTimes />
      </button>

      <div className="w-full flex flex-col items-center space-y-6 text-xl font-bold">
        {mobileNavLinks.map((link, index) => (
          link.type === 'button' ? (
            <button
              key={index}
              className={`w-full px-6 py-3 rounded-full ${link.className} text-neutral-white font-bold text-lg shadow-md flex items-center justify-center
                          dark:shadow-none`} // Apply dark mode shadow if needed, default buttons likely covered
              onClick={link.onClick || onCloseMenus}
            >
              {link.label}
            </button>
          ) : (
            // Pass isDarkMode to NavLink for it to handle its own styles
            <NavLink key={index} to={link.to} onClick={onCloseMenus} isDarkMode={isDarkMode}>{link.label}</NavLink>
          )
        ))}

        {/* Mobile-specific CTA / Logout buttons at the bottom */}
        <div className="w-full pt-6 border-t border-neutral-medium-gray mt-6 flex flex-col items-center space-y-4
                        dark:border-dark-border-primary"> {/* Dark mode border color */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="w-full" onClick={onCloseMenus}>
                <button className="w-full px-6 py-3 rounded-full border border-gamepulse-yellow text-gamepulse-yellow hover:bg-gamepulse-yellow hover:text-gamepulse-dark transition-all duration-300 font-semibold text-lg
                                   dark:border-gamepulse-yellow dark:text-gamepulse-yellow dark:hover:bg-gamepulse-yellow dark:hover:text-dark-background-primary"> {/* Dark mode styles */}
                  Login
                </button>
              </Link>
              <Link to="/signup" className="w-full" onClick={onCloseMenus}>
                <button className="w-full px-6 py-3 rounded-full bg-gamepulse-yellow text-gamepulse-dark font-bold text-lg shadow-md hover:bg-gamepulse-yellow/80 transition-colors duration-300
                                   dark:bg-gamepulse-orange dark:text-white dark:hover:bg-orange-700 dark:shadow-none"> {/* Dark mode styles */}
                  Sign Up
                </button>
              </Link>
              <button
                className="w-full px-6 py-3 rounded-full bg-gamepulse-blue text-neutral-white font-bold text-lg shadow-md flex items-center justify-center hover:bg-[#034078] transition-colors duration-300
                           dark:bg-gamepulse-teal dark:text-white dark:hover:bg-[#006B6B] dark:shadow-none" // Dark mode styles
                onClick={() => { navigate('/download-app'); onCloseMenus(); }}
              >
                <FaDownload className="mr-2" /> Download App
              </button>
            </>
          ) : (
            <>
              {/* Additional mobile-only dropdown-like links for logged in users */}
              <NavLink to="/my-profile" onClick={onCloseMenus} isDarkMode={isDarkMode}><FaUserCircle className="mr-3" /> My Profile</NavLink>
              {userType === 'coach' || userType === 'scout' || userType === 'fan' || userType === 'parent' ? (
                <NavLink to="/messages" onClick={onCloseMenus} isDarkMode={isDarkMode}><FaEnvelope className="mr-3" /> Messages</NavLink>
              ) : null}
              {userType === 'scout' ? (
                <NavLink to="/reports" onClick={onCloseMenus} isDarkMode={isDarkMode}>Scouting Reports</NavLink> // No specific icon provided, you can add one
              ) : null}
              <NavLink to="/settings" onClick={onCloseMenus} isDarkMode={isDarkMode}><FaCog className="mr-3" /> Settings</NavLink>
              <NavLink to="/help-center" onClick={onCloseMenus} isDarkMode={isDarkMode}><FaQuestionCircle className="mr-3" /> Help & Support</NavLink>

              {/* Dark Mode Toggle for Mobile */}
              <button
                onClick={toggleDarkMode}
                className="w-full text-left px-6 py-3 rounded-full text-neutral-white font-bold text-lg flex items-center justify-center hover:bg-gamepulse-dark-light transition-colors duration-300
                           dark:text-gamepulse-yellow dark:hover:bg-dark-background-tertiary" // Dark mode colors
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <FaSun className="mr-3 text-2xl" /> : <FaMoon className="mr-3 text-2xl" />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>

              <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-error-red hover:text-red-600 font-bold transition-colors duration-200
                           dark:text-red-500 dark:hover:text-red-400">
                <FaSignOutAlt className="inline mr-3" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;