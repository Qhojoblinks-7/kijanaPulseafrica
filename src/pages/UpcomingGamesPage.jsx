// src/pages/UpcomingGamesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/common/Header';
import FilterBar from '../components/UpcomingGames/FilterBar';
import GameCard from '../components/UpcomingGames/GameCard';
import FeaturedGamesCarousel from '../components/UpcomingGames/FeaturedGamesCarousel';
import { mockUpcomingGames, mockFeaturedGames, mockTrendingAthletes } from '../data/mockUpcomingGames';
import { FaRegCalendarTimes, FaChartLine, FaFootballBall, FaBasketballBall } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UpcomingGamesPage = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Initialize with today's date in YYYY-MM-DD format
    const today = new Date('2025-06-15T00:00:00Z'); // Fixed reference date
    return today.toISOString().split('T')[0];
  });

  const [filters, setFilters] = useState({
    sports: [],
    location: '',
    league: '',
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // For search bar

  // Simulate fetching games based on selectedDate and filters
  const filteredGames = useMemo(() => {
    // Get today's date for comparison logic
    const today = new Date('2025-06-15T00:00:00Z');
    const tomorrow = new Date('2025-06-16T00:00:00Z'); // Fixed reference date
    const selected = new Date(selectedDate + 'T00:00:00Z'); // Ensure UTC for consistency

    return mockUpcomingGames.filter(game => {
      const gameDate = new Date(game.date + 'T00:00:00Z'); // Ensure UTC for consistency

      // 1. Date filter
      let matchesDate = false;
      // If selected date is "Today", show all games for today's date
      if (selected.toDateString() === today.toDateString() && gameDate.toDateString() === today.toDateString()) {
        matchesDate = true;
      }
      // If selected date is "Tomorrow", show all games for tomorrow's date
      else if (selected.toDateString() === tomorrow.toDateString() && gameDate.toDateString() === tomorrow.toDateString()) {
        matchesDate = true;
      }
      // For any other specific selected date
      else if (gameDate.toDateString() === selected.toDateString()) {
          matchesDate = true;
      }

      if (!matchesDate) return false;

      // 2. Sport filter
      if (filters.sports.length > 0 && !filters.sports.includes(game.sport)) {
        return false;
      }

      // 3. Location filter
      if (filters.location && !game.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // 4. League filter
      if (filters.league && !game.league.toLowerCase().includes(filters.league.toLowerCase())) {
        return false;
      }

      // 5. Favorites filter
      if (showFavoritesOnly && !game.isFavorite) {
        return false;
      }

      return true;
    }).sort((a, b) => {
        // Sort by time
        const timeA = new Date(`2000/01/01 ${a.time}`);
        const timeB = new Date(`2000/01/01 ${b.time}`);
        return timeA - timeB;
    });
  }, [selectedDate, filters, showFavoritesOnly]);


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      sports: [],
      location: '',
      league: '',
    });
    setShowFavoritesOnly(false);
  };

  const handleSetReminder = (gameId) => {
    alert(`Reminder set for game ID: ${gameId}!`);
    // In a real app, this would trigger a notification service or native calendar integration.
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    // In a real app, this might show a search input within the header or a dedicated search page
    alert('Search functionality would expand here or open a search modal!');
  };

  return (
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col">
      <Header
        title="Upcoming Games"
        showBackButton={false} // No back button on main calendar page
        showSearch={true}
        onSearchClick={handleSearchClick}
      />

      {/* Main content area */}
      <div className="flex-grow pb-8 overflow-y-auto custom-scrollbar pt-20 md:pt-24"> {/* Adjusted pt for fixed header */}
        <FeaturedGamesCarousel games={mockFeaturedGames} />

        <FilterBar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={() => {/* Logic handled by modal close */}}
          onResetFilters={handleResetFilters}
          onToggleFavorites={setShowFavoritesOnly}
          showFavoritesOnly={showFavoritesOnly}
        />

        <section className="p-4 md:p-6">
          <h2 className="text-2xl font-bold text-white mb-4 mx-auto max-w-4xl">
            Games on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-4xl">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} onSetReminder={handleSetReminder} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-900 rounded-lg mx-auto my-12 max-w-md shadow-lg">
              <FaRegCalendarTimes className="text-6xl text-gray-600 mb-4 mx-auto" />
              <p className="text-xl font-semibold text-white mb-4">
                No upcoming games match your current criteria.
              </p>
              <p className="text-gray-400 mb-6">
                Try broadening your filters or checking different dates!
              </p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">You might also be interested in:</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/trending-athletes" className="bg-gamepulse-blue text-white py-2 px-4 rounded-full flex items-center font-semibold hover:bg-gamepulse-blue-dark transition-colors">
                  <FaChartLine className="mr-2" /> Trending Athletes
                </Link>
                <Link to="/games/football-lagos" className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center font-semibold hover:bg-gray-600 transition-colors">
                  <FaFootballBall className="mr-2" /> Football in Lagos
                </Link>
                <Link to="/games/basketball-accra" className="bg-gray-700 text-white py-2 px-4 rounded-full flex items-center font-semibold hover:bg-gray-600 transition-colors">
                  <FaBasketballBall className="mr-2" /> Basketball in Accra
                </Link>
                {/* For past results, assuming a route exists */}
                <Link to="/past-results" className="text-gamepulse-blue-light hover:underline mt-4 block">
                  View Yesterday's Scores
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UpcomingGamesPage;