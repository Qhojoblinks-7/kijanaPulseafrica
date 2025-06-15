// src/components/Highlights/HighlightsNavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaMicrophone, FaBell, FaPlus } from 'react-icons/fa'; // Importing necessary icons

const HighlightsNavbar = ({ onSearchIconClick, userAvatarUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="fixed top-0 left-0 w-full bg-gamepulse-dark z-40 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between h-16">
        {/* Left Section: Menu Icon, Logo, GH */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-xl p-2 hover:bg-gray-700 rounded-full md:hidden"
            aria-label="Toggle navigation menu"
          >
            <FaBars />
          </button>
          <Link to="/" className="flex items-center space-x-1 text-white text-2xl font-bold">
            {/* Using a placeholder for YouTube-like logo, replace with actual SVG/Image if available */}
            <img src="/images/youtube-logo-white.png" alt="YouTube" className="h-6" /> {/* Placeholder image */}
            <span className="text-xl">GamePulse</span> {/* Change 'YouTube' to 'GamePulse' or similar */}
            <span className="text-sm font-normal text-gray-400 ml-1">GH</span> {/* "GH" as in the image */}
          </Link>
        </div>

        {/* Center Section: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-grow max-w-xl mx-4">
          <div className="relative flex items-center w-full bg-gray-800 border border-gray-700 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
            />
            <button
              onClick={onSearchIconClick} // Keep existing functionality for detailed search
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Search"
            >
              <FaSearch />
            </button>
            <button
              className="p-2 mr-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white ml-2" // Microphone button
              aria-label="Search by voice"
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Right Section: Action Icons and User Avatar */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex items-center space-x-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white text-sm font-semibold">
            <FaPlus className="text-lg" />
            <span>Create</span>
          </button>
          <button className="text-white text-xl p-2 hover:bg-gray-700 rounded-full">
            <FaBell />
          </button>
          <Link to="/my-profile">
            <img
              src={userAvatarUrl || "/images/default-user-avatar.webp"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-gamepulse-blue"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (appears below main nav on small screens) */}
      <div className="md:hidden px-4 pb-2">
        <div className="relative flex items-center w-full bg-gray-800 border border-gray-700 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-transparent text-white focus:outline-none"
          />
          <button
            onClick={onSearchIconClick}
            className="p-2 text-gray-400 hover:text-white"
            aria-label="Search"
          >
            <FaSearch />
          </button>
          <button
            className="p-2 mr-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white ml-2"
            aria-label="Search by voice"
          >
            <FaMicrophone />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (simplified, full implementation might be complex) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gamepulse-dark bg-opacity-95 z-30 flex flex-col p-4 space-y-4">
          {/* Add your mobile menu links here, e.g., */}
          <Link to="/" className="text-white text-lg hover:text-gamepulse-blue" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/discover-talent" className="text-white text-lg hover:text-gamepulse-blue" onClick={() => setIsMenuOpen(false)}>Discover Talent</Link>
          {/* ... more links */}
        </div>
      )}
    </nav>
  );
};

export default HighlightsNavbar;