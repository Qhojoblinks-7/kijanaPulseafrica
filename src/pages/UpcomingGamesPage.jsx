// App.jsx
import React, { useState } from 'react';

function  UpcomingGamesPage() {
  // Mock data for games to populate the list
  const [games, setGames] = useState([
    {
      id: 1,
      sport: 'Football',
      team1: 'Greenwood High',
      team1Location: 'Lagos, Nigeria',
      team1Logo: 'GH', // Placeholder for logo initials
      team2: 'Riverside Academy',
      team2Location: 'Lagos, Nigeria',
      team2Logo: 'RA', // Placeholder for logo initials
      time: '3:00 PM GMT',
      tournament: 'Regional Championship',
      stadium: 'City Stadium, Lagos',
      isStarred: false,
    },
    {
      id: 2,
      sport: 'Basketball',
      team1: 'Lagos Elite',
      team1Location: 'Lagos, Nigeria',
      team1Logo: 'LE',
      team2: 'Accra Lions',
      team2Location: 'Accra, Ghana',
      team2Logo: 'AL',
      time: '5:30 PM GMT',
      tournament: 'West Africa Cup',
      stadium: 'National Stadium, Lagos',
      isStarred: true,
    },
    {
      id: 3,
      sport: 'Athletics',
      event: 'East African Athletics Meet',
      details: '100m, 200m, Long Jump Finals',
      time: '7:00 PM GMT',
      tournament: 'Regional Championship',
      stadium: 'Moi Stadium, Nairobi',
      isStarred: false,
    },
  ]);

  // State for the active date filter
  const [activeFilter, setActiveFilter] = useState('Today');

  // Function to toggle star status for a game
  const toggleStar = (id) => {
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === id ? { ...game, isStarred: !game.isStarred } : game)),
    );
  };

  return (
    <div className="min-h-screen bg-neutral-medium-grayfont-sans text-neutral-dark-gray antialiased">
      {/* Top Navigation Bar */}
      <header className="relative flex items-center justify-center bg-neutral-white p-4 shadow-sm">
        {/* Left arrow icon */}
        <button aria-label="Go back" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-neutral-light-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-medium-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Date display with navigation */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-neutral-black">Today, March 15</span>
          {/* Calendar icon - as per the new image */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-medium-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h.01M10 11h.01M12 11h.01M14 11h.01M16 11h.01M8 15h.01M10 15h.01M12 15h.01M14 15h.01M16 15h.01M8 19h.01M10 19h.01M12 19h.01M14 19h.01M16 19h.01M5 19a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12z"
            />
          </svg>
        </div>

        {/* Right arrow icon */}
        <button aria-label="Next day" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-neutral-light-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-neutral-medium-gray"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </header>

      {/* Date Filter Buttons */}
      <div className="flex justify-around space-x-2 bg-neutral-white px-4 py-3 shadow-sm md:justify-start md:px-8">
        {['Today', 'Tomorrow', 'This Week', 'Next 7 Days'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-6 md:text-base ${
              activeFilter === filter
                ? 'bg-gamepulse-blue text-neutral-white shadow'
                : 'text-neutral-medium-gray hover:bg-neutral-light-gray'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Filter Games Section */}
      <section className="relative flex items-center justify-between gap-2 p-4">
        {/* Search input for filtering games */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Filter Games"
            className="w-full rounded-full border border-neutral-medium-gray py-2 pl-10 pr-4 text-neutral-dark-gray focus:border-gamepulse-blue focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
          />
          {/* Search icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-medium-gray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {/* Filters button */}
        <button className="flex items-center space-x-2 rounded-full border border-neutral-medium-gray bg-neutral-white px-4 py-2 font-medium text-neutral-medium-gray shadow-sm hover:bg-neutral-light-gray">
          <span>Filters</span>
          {/* Dropdown arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* Key Matches This Week Section */}
      <section className="relative px-4 py-6">
        <h2 className="mb-4 text-xl font-bold text-neutral-black">Key Matches This Week</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Key Match Card 1 */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gamepulse-blue to-gamepulse-blue-dark p-4 text-neutral-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">3:00 PM GMT</span>
              <button aria-label="Favorite match" className="text-neutral-white opacity-80 hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.974 2.887a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.683-1.539 1.118l-3.974-2.887a1 1 0 00-1.176 0l-3.974 2.887c-.784.565-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.364-1.118L2.924 9.241c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>
            <div className="my-3 flex items-center justify-center space-x-4 text-lg font-bold">
              <span className="flex flex-col items-center">
                <span>Greenwood High</span>
                <span className="text-sm font-normal">VS</span>
              </span>
              <span>Riverside Academy</span>
            </div>
            <p className="text-center text-sm opacity-90">Regional Championship Final</p>
          </div>
          {/* Key Match Card 2 */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gamepulse-blue-light to-gamepulse-blue p-4 text-neutral-white shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">5:30 PM GMT</span>
              <button aria-label="Favorite match" className="text-neutral-white opacity-80 hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.974 2.887a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.683-1.539 1.118l-3.974-2.887a1 1 0 00-1.176 0l-3.974 2.887c-.784.565-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.364-1.118L2.924 9.241c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>
            <div className="my-3 flex items-center justify-center space-x-4 text-lg font-bold">
              <span className="flex flex-col items-center">
                <span>Lagos Elite</span>
                <span className="text-sm font-normal">VS</span>
              </span>
              <span>Accra Lions</span>
            </div>
            <p className="text-center text-sm opacity-90">West Africa Cup Semi-Final</p>
          </div>
        </div>
        {/* Plus icon for adding (positioned absolutely) */}
        <button className="absolute -top-1 right-4 rounded-full bg-gamepulse-blue p-2 text-neutral-white shadow-md hover:bg-gamepulse-blue-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </section>

      {/* Games Today Section */}
      <section className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-black">Games Today</h2>
          {/* View toggle icons */}
          <div className="flex space-x-2">
            <button aria-label="List view" className="rounded-full p-2 hover:bg-neutral-light-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-medium-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button aria-label="Grid view" className="rounded-full p-2 hover:bg-neutral-light-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-medium-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* List of Games */}
        <div className="space-y-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex items-start rounded-xl bg-neutral-white p-4 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
            >
              {/* Sport Icon */}
              <div className="mr-4 flex-shrink-0">
                {game.sport === 'Football' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-success-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    />
                  </svg>
                )}
                {game.sport === 'Basketball' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-warning-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9.247a3.425 3.425 0 014.282 0m-4.73 2.113c-.017 0-.034.001-.05.002-3.15.002-5.748 2.597-5.75 5.748-.001.016 0 .033 0 .049s.001.034.002.05h.001a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-.001c-.017 0-.034-.001-.05-.002-3.15-.002-5.748-2.597-5.75-5.748-.001.016 0 .033 0 .049s-.001-.034-.002-.05h.001a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h.001zM12 21a9 9 0 100-18 9 9 0 000 18zM6.51 12.378c-.017 0-.034.001-.05.002-3.15.002-5.748 2.597-5.75 5.748-.001.016 0 .033 0 .049s.001.034.002.05h.001a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-.001c-.017 0-.034-.001-.05-.002-3.15-.002-5.748-2.597-5.75-5.748-.001.016 0-.033 0-.049s-.001-.034-.002-.05h.001a.75.75 0 00-.75.75v2.25a.75.75 0 00.75.75h.001zM17.49 12.378c.017 0 .034.001.05.002 3.15.002 5.748 2.597 5.75 5.748.001.016 0 .033 0 .049s-.001.034-.002.05h-.001a.75.75 0 00-.75-.75v-2.25a.75.75 0 00.75-.75h.001c.017 0 .034-.001.05-.002 3.15-.002 5.748-2.597 5.75-5.748.001-.016 0-.033 0-.049s-.001-.034-.002-.05h-.001a.75.75 0 00-.75.75v2.25a.75.75 0 00-.75-.75h.001z"
                    />
                  </svg>
                )}
                {game.sport === 'Athletics' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gamepulse-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                )}
              </div>

              {/* Game Details */}
              <div className="flex flex-grow flex-col">
                <p className="font-semibold text-neutral-black">
                  {game.sport !== 'Athletics' ? (
                    <>
                      {game.team1}{' '}
                      <span className="text-sm font-normal text-neutral-medium-gray">({game.team1Location})</span>
                    </>
                  ) : (
                    game.event
                  )}
                </p>
                <p className="text-sm text-neutral-medium-gray">{game.tournament}</p>
              </div>

              {/* Time and Opponent/Details */}
              <div className="ml-auto flex flex-col items-end text-right">
                <p className="font-medium text-neutral-black">{game.time}</p>
                {game.sport !== 'Athletics' ? (
                  <p className="text-sm text-neutral-medium-gray">
                    {game.team2}{' '}
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-warning-orange text-xs font-bold text-neutral-white">
                      {game.team2Logo}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-neutral-medium-gray">{game.details}</p>
                )}
                <p className="text-xs text-neutral-medium-gray">{game.stadium}</p>
              </div>

              {/* Star Icon */}
              <button onClick={() => toggleStar(game.id)} aria-label="Favorite game" className="ml-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-colors duration-200 ${
                    game.isStarred ? 'text-gamepulse-yellow' : 'text-neutral-medium-gray hover:text-gamepulse-yellow'
                  }`}
                  fill={game.isStarred ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.974 2.887a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.683-1.539 1.118l-3.974-2.887a1 1 0 00-1.176 0l-3.974 2.887c-.784.565-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.364-1.118L2.924 9.241c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Load More Games Button */}
        <div className="mt-8 text-center">
          <button className="transform rounded-full bg-success-green px-6 py-3 font-semibold text-neutral-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-success-green">
            Load More Games
          </button>
        </div>
      </section>
    </div>
  );
}



export default UpcomingGamesPage;
