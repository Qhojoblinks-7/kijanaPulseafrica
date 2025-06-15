// src/components/Header/MobileMenuOverlay.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import NavLink from './NavLink'; // Import NavLink

const MobileMenuOverlay = ({ mobileNavLinks, isLoggedIn, userType, handleLogout, onCloseMenus }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gamepulse-dark z-40 flex flex-col items-center justify-center py-16 px-8 animate-fade-in">
      <div className="w-full flex flex-col items-center space-y-6 text-xl font-bold">
        {mobileNavLinks.map((link, index) => (
          link.type === 'button' ? (
            <button key={index} className={`w-full px-6 py-3 rounded-full ${link.className} text-neutral-white font-bold text-lg shadow-md flex items-center justify-center`} onClick={link.onClick || onCloseMenus}>
              {link.label}
            </button>
          ) : (
            // NavLink is expected to handle its own coloring based on props or internal logic
            <NavLink key={index} to={link.to}>{link.label}</NavLink>
          )
        ))}

        {/* Mobile-specific CTA / Logout buttons at the bottom */}
        <div className="w-full pt-6 border-t border-neutral-medium-gray mt-6 flex flex-col items-center space-y-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="w-full" onClick={onCloseMenus}>
                <button className="w-full px-6 py-3 rounded-full border border-gamepulse-yellow text-gamepulse-yellow hover:bg-gamepulse-yellow hover:text-gamepulse-dark transition-all duration-300 font-semibold text-lg">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="w-full" onClick={onCloseMenus}>
                <button className="w-full px-6 py-3 rounded-full bg-gamepulse-yellow text-gamepulse-dark font-bold text-lg shadow-md hover:bg-gamepulse-yellow/80 transition-colors duration-300">
                  Sign Up
                </button>
              </Link>
              <button
                className="w-full px-6 py-3 rounded-full bg-gamepulse-blue text-neutral-white font-bold text-lg shadow-md flex items-center justify-center hover:bg-gamepulse-blue-dark transition-colors duration-300"
                onClick={() => { navigate('/download-app'); onCloseMenus(); }}
              >
                <FaDownload className="mr-2" /> Download App
              </button>
            </>
          ) : (
            <>
              {/* Additional mobile-only dropdown-like links for logged in users */}
              <NavLink to="/my-profile">My Profile</NavLink>
              {userType === 'coach' || userType === 'scout' || userType === 'fan' || userType === 'parent' ? (
                <NavLink to="/messages">Messages</NavLink>
              ) : null}
              {userType === 'scout' ? (
                <NavLink to="/reports">Scouting Reports</NavLink>
              ) : null}
              <NavLink to="/settings">Settings</NavLink>
              <NavLink to="/help">Help & Support</NavLink>
              <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-error-red hover:text-red-600 font-bold transition-colors duration-200">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;