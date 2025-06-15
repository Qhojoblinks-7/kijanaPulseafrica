// src/components/Highlights/HighlightCategoryChips.jsx
import React from 'react';

const categories = [
  "All",
  "Football",
  "Basketball",
  "Athletics",
  "Rugby",
  "Cricket",
  "Handball",
  "Volleyball",
  "Tennis",
  "Martial Arts",
  "Trending",
  "Latest",
  "Top Goals",
  "Best Dunks",
  "Spectacular Saves",
  "Skill Moves"
];

const HighlightCategoryChips = ({ activeCategory, onCategorySelect }) => {
  return (
    <div className="fixed top-14 md:top-16 left-0 w-full z-30 bg-gamepulse-dark border-b border-gray-700 py-2 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mr-2 transition-colors duration-200
            ${activeCategory === category
              ? 'bg-white text-gamepulse-dark' // YouTube's active chip is usually white text on dark background
              : 'bg-gray-700 text-white hover:bg-gray-600'
            }`
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default HighlightCategoryChips;