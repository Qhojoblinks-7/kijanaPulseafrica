// src/components/Highlights/HighlightFilters.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sports = ["Football", "Basketball", "Athletics", "Rugby", "Cricket", "Handball", "Volleyball", "Tennis", "Martial Arts"];
const highlightTypes = ["Goals", "Assists", "Dunks", "Saves", "Big Plays", "Skill Moves"];
const dateRanges = ["Today", "This Week", "This Month", "All Time"];

const HighlightFilters = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  const [openSection, setOpenSection] = useState(null); // State to control collapsible sections

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <section className="bg-gamepulse-dark py-4 px-4">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-4">Explore More Highlights</h2>

      {/* Sort By */}
      <div className="mb-4">
        <label htmlFor="sortBy" className="block text-gray-300 text-sm font-medium mb-2">Sort By:</label>
        <select
          id="sortBy"
          name="sortBy"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-gamepulse-blue focus:border-gamepulse-blue"
          value={filters.sortBy}
          onChange={onFilterChange}
        >
          <option value="most-recent">Most Recent</option>
          <option value="most-viewed">Most Viewed</option>
          <option value="most-liked">Most Liked</option>
          <option value="highest-rated-athlete">Highest Rated Athlete</option>
        </select>
      </div>

      {/* Filter Sections */}
      {[
        { name: 'sport', label: 'Sport', type: 'multi-select', options: sports },
        { name: 'team', label: 'Team/School', type: 'text-input' },
        { name: 'athlete', label: 'Athlete', type: 'text-input' },
        { name: 'highlightType', label: 'Highlight Type', type: 'multi-select', options: highlightTypes },
        { name: 'dateRange', label: 'Date Range', type: 'select', options: dateRanges },
        { name: 'xpRanking', label: 'XP Ranking', type: 'select', options: ["Any", "Top 100", "Top 500"] },
      ].map((section) => (
        <div key={section.name} className="mb-2 border border-gray-700 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full py-3 px-4 bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
            onClick={() => toggleSection(section.name)}
          >
            <span>{section.label}</span>
            {openSection === section.name ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openSection === section.name && (
            <div className="p-4 bg-gray-900">
              {section.type === 'multi-select' && (
                <div className="grid grid-cols-2 gap-2 text-white">
                  {section.options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        name={section.name}
                        value={option}
                        checked={filters[section.name]?.includes(option) || false}
                        onChange={onFilterChange}
                        className="form-checkbox h-4 w-4 text-gamepulse-orange rounded border-gray-600 bg-gray-700 focus:ring-gamepulse-orange"
                      />
                      <span className="ml-2 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}
              {section.type === 'text-input' && (
                <input
                  type="text"
                  name={section.name}
                  placeholder={`Search by ${section.label}`}
                  value={filters[section.name] || ''}
                  onChange={onFilterChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue"
                />
              )}
              {section.type === 'select' && (
                <select
                  name={section.name}
                  value={filters[section.name] || ''}
                  onChange={onFilterChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-gamepulse-blue focus:border-gamepulse-blue"
                >
                  {section.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={onApplyFilters}
          className="bg-gamepulse-orange text-white font-bold py-2 px-4 rounded-full w-full md:w-auto hover:bg-orange-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onResetFilters}
          className="bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full md:w-auto hover:bg-gray-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default HighlightFilters;