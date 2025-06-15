// src/components/UpcomingGames/FilterBar.jsx
import React, { useState } from 'react';
import { FaFilter, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaFootballBall, FaBasketballBall, FaRunning, FaHandshake, FaVolleyballBall, FaFistRaised } from 'react-icons/fa';
import { GiCricketBat, GiRugbyConversion, GiTennisBall } from 'react-icons/gi'; // Assuming Gi is for Game Icons

const sportFilterOptions = [
  { name: 'Football', icon: FaFootballBall },
  { name: 'Basketball', icon: FaBasketballBall },
  { name: 'Athletics', icon: FaRunning },
  { name: 'Rugby', icon: GiRugbyConversion },
  { name: 'Cricket', icon: GiCricketBat },
  { name: 'Handball', icon: FaHandshake },
  { name: 'Volleyball', icon: FaVolleyballBall },
  { name: 'Tennis', icon: GiTennisBall },
  { name: 'Martial Arts', icon: FaFistRaised },
];

const getSportIcon = (sportName) => {
  const sport = sportFilterOptions.find(s => s.name === sportName);
  return sport ? sport.icon : FaFootballBall; // Default
};

const FilterBar = ({
  selectedDate,
  onDateChange,
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onToggleFavorites,
  showFavoritesOnly
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to format date for display
  const formatDateDisplay = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDate = new Date(dateString + 'T00:00:00'); // Ensure UTC for consistent comparison

    if (targetDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (targetDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const handleDateNavigation = (days) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    onDateChange(currentDate.toISOString().split('T')[0]);
  };

  const handleSportChange = (sportName) => {
    const newSports = filters.sports.includes(sportName)
      ? filters.sports.filter(s => s !== sportName)
      : [...filters.sports, sportName];
    onFilterChange('sports', newSports);
  };

  // Mock Date Picker (for simplicity, a real one would be more complex)
  const handleDatePreset = (daysAhead) => {
    const newDate = new Date('2025-06-15T00:00:00Z'); // Reference for today
    if (daysAhead === 'today') {
      newDate.setDate(new Date().getDate()); // Actual today for dynamic content
    } else if (daysAhead === 'tomorrow') {
      newDate.setDate(new Date().getDate() + 1);
    } else if (daysAhead === 'thisWeek') {
        // For simplicity, just set date to current day
    } else if (daysAhead === 'next7Days') {
        // For simplicity, just set date to current day
    } else if (daysAhead === 'thisMonth') {
        // For simplicity, just set date to current day
    }
    // In a real app, these presets would adjust `selectedDate` and/or set a date range filter
    onDateChange(new Date().toISOString().split('T')[0]); // Just sets to today for now
    setIsModalOpen(false);
  };


  return (
    <>
      {/* Date Navigation & Filter Button (Top part of FilterBar, always visible) */}
      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-b-xl shadow-lg mt-16 md:mt-20"> {/* Adjusted top margin for fixed header */}
        <button onClick={() => handleDateNavigation(-1)} className="text-gamepulse-blue-light text-2xl p-2 rounded-full hover:bg-gray-700 transition-colors">
          <FaChevronLeft />
        </button>
        <div className="flex-1 text-center">
          <span className="text-xl md:text-2xl font-bold text-white">
            {formatDateDisplay(selectedDate)}
          </span>
          <button onClick={() => setIsModalOpen(true)} className="ml-3 text-gamepulse-blue text-lg p-2 rounded-full hover:bg-gray-700 transition-colors">
            <FaCalendarAlt />
          </button>
        </div>
        <button onClick={() => handleDateNavigation(1)} className="text-gamepulse-blue-light text-2xl p-2 rounded-full hover:bg-gray-700 transition-colors">
          <FaChevronRight />
        </button>
      </div>

      <div className="p-4 bg-gray-900 mx-auto max-w-4xl rounded-lg shadow-lg my-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <FaFilter className="mr-2 text-gamepulse-blue" /> Filter Games
          </h2>
          <button
            onClick={() => onToggleFavorites(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                        ${showFavoritesOnly ? 'bg-gamepulse-yellow text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {showFavoritesOnly ? 'Showing Favorites' : 'Show Favorites'}
          </button>
        </div>

        {/* Filter Modal (Opens when calendar or filter button is clicked) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Set Filters</h3>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Time Range Presets</h4>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleDatePreset('today')} className="bg-gamepulse-blue text-white px-4 py-2 rounded-full text-sm">Today</button>
                  <button onClick={() => handleDatePreset('tomorrow')} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Tomorrow</button>
                  {/* For simplicity, other presets just reset to today for now */}
                  <button onClick={() => handleDatePreset('thisWeek')} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">This Week</button>
                  <button onClick={() => handleDatePreset('next7Days')} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">Next 7 Days</button>
                  <button onClick={() => handleDatePreset('thisMonth')} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">This Month</button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Sport</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sportFilterOptions.map(sport => {
                    const SportIcon = sport.icon;
                    const isSelected = filters.sports.includes(sport.name);
                    return (
                      <button
                        key={sport.name}
                        onClick={() => handleSportChange(sport.name)}
                        className={`flex items-center p-2 rounded-md transition-colors
                                    ${isSelected ? 'bg-gamepulse-blue text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      >
                        <SportIcon className="mr-2" />
                        {sport.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Location</h4>
                <input
                  type="text"
                  placeholder="City, Country (e.g., Accra, Ghana)"
                  value={filters.location}
                  onChange={(e) => onFilterChange('location', e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gamepulse-blue"
                />
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">League/Tournament</h4>
                <input
                  type="text"
                  placeholder="League Name"
                  value={filters.league}
                  onChange={(e) => onFilterChange('league', e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gamepulse-blue"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => { onResetFilters(); setIsModalOpen(false); }}
                  className="text-gray-400 hover:text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsModalOpen(false)} // Apply filters by closing modal
                  className="bg-gamepulse-blue text-white px-6 py-2 rounded-full font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterBar;