import React from 'react';
import { FaFootballBall, FaBasketballBall, FaTennisBall, FaVolleyballBall, FaSearch, FaBell, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming the logo links to home or a main dashboard

const AppHeader = () => {
  return (
    <header className="bg-gray-800-custom py-3 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
      {/* Left Section: Logo & Sport Filters */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold text-gamepulse-blue-darker hover:text-gamepulse-blue transition-colors">
          BL Betlive
        </Link>
        <nav className="hidden md:flex space-x-4"> {/* Hide on small screens */}
          <button className="flex items-center text-gamepulse-yellow text-sm font-semibold p-2 rounded-full bg-gray-700-custom hover:bg-gray-600-custom transition-colors">
            <FaFootballBall className="mr-2" /> Football
          </button>
          <button className="flex items-center text-white text-sm font-semibold p-2 rounded-full hover:bg-gray-700-custom transition-colors">
            <FaBasketballBall className="mr-2" /> Basketball
          </button>
          <button className="flex items-center text-white text-sm font-semibold p-2 rounded-full hover:bg-gray-700-custom transition-colors">
            <FaTennisBall className="mr-2" /> Tennis
          </button>
          <button className="flex items-center text-white text-sm font-semibold p-2 rounded-full hover:bg-gray-700-custom transition-colors">
            <FaVolleyballBall className="mr-2" /> Volleyball
          </button>
        </nav>
      </div>

      {/* Right Section: Balance, Icons, User */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-700-custom rounded-full px-3 py-1 text-sm font-semibold text-white cursor-pointer">
          <span className="mr-1">1500.00 USD</span>
          <FaChevronDown className="text-xs text-gray-400" />
        </div>
        <button className="text-gray-400 hover:text-white transition-colors"><FaSearch className="text-xl" /></button>
        <button className="text-gray-400 hover:text-white transition-colors"><FaBell className="text-xl" /></button>
        <div className="flex items-center text-white text-sm font-semibold cursor-pointer">
          <FaUserCircle className="text-2xl mr-2 text-gamepulse-yellow" /> George Chichua
        </div>
      </div>
    </header>
  );
};

export default AppHeader;