// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

const Header = ({ title, showBackButton = true, showSearch = true, onSearchClick, onBackClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gamepulse-dark-gradient from-gamepulse-blue-dark to-gamepulse-dark p-4 shadow-lg flex items-center justify-between">
      {showBackButton ? (
        <Link to="/" className="text-white text-2xl" onClick={onBackClick}>
          <FaArrowLeft />
        </Link>
      ) : (
        <div className="w-8"></div> // Placeholder to keep title centered
      )}
      <h1 className="text-xl md:text-2xl font-extrabold text-white text-center flex-grow truncate px-2">
        {title}
      </h1>
      {showSearch ? (
        <button className="text-white text-2xl" onClick={onSearchClick}>
          <FaSearch />
        </button>
      ) : (
        <div className="w-8"></div> // Placeholder
      )}
    </div>
  );
};

export default Header;