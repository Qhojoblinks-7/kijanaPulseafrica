// src/pages/LiveMatchesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFilter, FaChevronDown, FaFootballBall, FaBasketballBall, FaRunning,
  FaHandshake, FaVolleyballBall, // FaRugbyBall REMOVED from here
  FaFistRaised, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaBell, FaFire,
  FaTrophy // Add FaTrophy if it's not already there for general use
} from 'react-icons/fa';
import { GiCricketBat, GiRugbyConversion, GiTennisBall } from 'react-icons/gi'; // ADDED GiRugbyBall here

// --- Mock Data for Live Matches (UNCHANGED) ---
const mockLiveMatches = [
  {
    id: 'm1',
    homeTeam: 'Greenwood High',
    awayTeam: 'Riverside Academy',
    homeLogo: '/images/greenwood_logo.png', // Placeholder
    awayLogo: '/images/riverside_logo.png', // Placeholder
    homeScore: 1,
    awayScore: 0,
    sport: 'Football',
    gameClockSeconds: 4080, // 68 minutes
    period: '2nd Half',
    status: 'In Progress',
    location: 'Accra Sports Stadium, Ghana',
    league: 'National High School Football League',
    keyEvent: 'GOAL! Greenwood High takes the lead!',
    isFavorite: false,
  },
  {
    id: 'm2',
    homeTeam: 'Star Academy',
    awayTeam: 'Unity School',
    homeLogo: '/images/star_logo.png',
    awayLogo: '/images/unity_logo.png',
    homeScore: 65,
    awayScore: 62,
    sport: 'Basketball',
    gameClockSeconds: 270, // 4:30 in Q3 (4*12*60 = 2880 total, 9 min per Q)
    period: 'Q3',
    status: 'In Progress',
    location: 'Kasarani Arena, Nairobi, Kenya',
    league: 'East African Basketball Championship',
    keyEvent: 'Timeout called by Unity School.',
    isFavorite: true,
  },
  {
    id: 'm3',
    homeTeam: 'Lion\'s Pride',
    awayTeam: 'Eagle Wings',
    homeLogo: '/images/lions_logo.png',
    awayLogo: '/images/eagles_logo.png',
    homeScore: 12, // Tries
    awayScore: 7, // Tries
    sport: 'Rugby',
    gameClockSeconds: 2100, // 35 minutes
    period: '1st Half',
    status: 'In Progress',
    location: 'Ellis Park, Johannesburg, South Africa',
    league: 'Gauteng Rugby Cup',
    keyEvent: null,
    isFavorite: false,
  },
  {
    id: 'm4',
    homeTeam: 'Coastal Sprinters',
    awayTeam: 'Highland Track Club',
    homeLogo: '/images/coastal_logo.png',
    awayLogo: '/images/highland_logo.png',
    homeScore: null,
    awayScore: null,
    sport: 'Athletics',
    gameClockSeconds: 0,
    period: 'Event in Progress', // E.g., currently 100m heats
    status: 'Live',
    location: 'Adokiye Amiesimaka Stadium, Port Harcourt, Nigeria',
    league: 'Niger Delta Athletics Meet',
    keyEvent: 'Men\'s 100m Final underway!',
    isFavorite: false,
  },
  {
    id: 'm5',
    homeTeam: 'Blue Sharks',
    awayTeam: 'Red Devils',
    homeLogo: '/images/blue_sharks.png',
    awayLogo: '/images/red_devils.png',
    homeScore: 2,
    awayScore: 1,
    sport: 'Football',
    gameClockSeconds: 5100, // 85 minutes
    period: '2nd Half',
    status: 'In Progress',
    location: 'Kumasi Sports Stadium, Ghana',
    league: 'Ashanti Regional Cup',
    keyEvent: 'Red Devils pushing for equalizer!',
    isFavorite: true,
  },
];

// --- Mock Data for Upcoming Matches (simplified for now) ---
const mockUpcomingMatches = [
  {
    id: 'u1',
    homeTeam: 'United Youth',
    awayTeam: 'Rising Stars',
    homeLogo: '/images/united_logo.png',
    awayLogo: '/images/rising_logo.png',
    sport: 'Basketball',
    date: 'Today',
    time: '6:00 PM GMT',
    location: 'Lagos City Dome, Nigeria',
    league: 'Lagos High School League',
    isFavorite: false,
  },
  {
    id: 'u2',
    homeTeam: 'Victory FC',
    awayTeam: 'Alpha Strikers',
    homeLogo: '/images/victory_logo.png',
    awayLogo: '/images/alpha_logo.png',
    sport: 'Football',
    date: 'Tomorrow',
    time: '2:30 PM GMT',
    location: 'Cape Town Stadium, South Africa',
    league: 'Western Cape Schools Cup',
    isFavorite: false,
  },
];

// --- Filter Options ---
const sportFilterOptions = [
  { name: 'Football', icon: FaFootballBall },
  { name: 'Basketball', icon: FaBasketballBall },
  { name: 'Athletics', icon: FaRunning },
  { name: 'Rugby', icon: GiRugbyConversion }, // CHANGED: Using GiRugbyBall
  { name: 'Cricket', icon: GiCricketBat },
  { name: 'Handball', icon: FaHandshake },
  { name: 'Volleyball', icon: FaVolleyballBall },
  { name: 'Tennis', icon: GiTennisBall },
  { name: 'Martial Arts', icon: FaFistRaised },
];

const locationFilterOptions = [
  'Accra, Ghana', 'Nairobi, Kenya', 'Johannesburg, South Africa',
  'Port Harcourt, Nigeria', 'Kumasi, Ghana', 'Lagos, Nigeria', 'Cape Town, South Africa'
];

const leagueFilterOptions = [
  'National High School Football League', 'East African Basketball Championship',
  'Gauteng Rugby Cup', 'Niger Delta Athletics Meet', 'Ashanti Regional Cup',
  'Lagos High School League', 'Western Cape Schools Cup'
];

// --- Helper Functions (UNCHANGED) ---
const formatGameClock = (sport, seconds) => {
  if (sport === 'Football' || sport === 'Rugby') {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}'${remainingSeconds > 0 ? ` ${String(remainingSeconds).padStart(2, '0')}` : ''}`;
  }
  if (sport === 'Basketball') {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  return 'Running'; // For Athletics or other continuous sports
};

const getSportIcon = (sportName) => {
  const sport = sportFilterOptions.find(s => s.name === sportName);
  return sport ? sport.icon : FaFootballBall; // Default to football if not found
};

// --- LiveMatchesDashboard Component (REST OF COMPONENT UNCHANGED) ---
const LiveMatchesDashboard = () => {
  const [activeTab, setActiveTab] = useState('live'); // 'live' or 'upcoming'
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Controls main filter panel

  // Individual collapsible filter sections
  const [isSportFilterOpen, setIsSportFilterOpen] = useState(false);
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
  const [isLeagueFilterOpen, setIsLeagueFilterOpen] = useState(false);

  // State to hold the current live matches (for simulating updates)
  const [currentLiveMatches, setCurrentLiveMatches] = useState(mockLiveMatches);

  // --- Simulate real-time updates ---
  useEffect(() => {
    if (activeTab === 'live') {
      const interval = setInterval(() => {
        setCurrentLiveMatches(prevMatches =>
          prevMatches.map(match => {
            if (match.status === 'In Progress' || match.status === 'Live') {
              let newScore = { homeScore: match.homeScore, awayScore: match.awayScore };
              let newGameClockSeconds = match.gameClockSeconds + 1;

              // Simple score update logic (every 30 seconds for demo)
              if (newGameClockSeconds % 30 === 0) {
                if (Math.random() < 0.2) { // 20% chance to score
                  if (Math.random() < 0.5) newScore.homeScore = (newScore.homeScore || 0) + 1;
                  else newScore.awayScore = (newScore.awayScore || 0) + 1;
                }
              }

              // Simulate end of game after 90 mins (football) or certain time
              let newStatus = match.status;
              let newPeriod = match.period;
              if (match.sport === 'Football' && newGameClockSeconds >= 5400) { // 90 mins
                  newStatus = 'Finished';
                  newPeriod = 'FT';
                  newGameClockSeconds = 5400;
              } else if (match.sport === 'Basketball' && newGameClockSeconds >= 2880) { // 4 quarters * 12 mins = 48 mins total
                  newStatus = 'Finished';
                  newPeriod = 'FT';
                  newGameClockSeconds = 2880;
              }

              return {
                ...match,
                homeScore: newScore.homeScore,
                awayScore: newScore.awayScore,
                gameClockSeconds: newGameClockSeconds,
                status: newStatus,
                period: newPeriod,
              };
            }
            return match;
          })
        );
      }, 1000); // Update every second

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [activeTab]);


  // --- Filtering Logic ---
  const getFilteredMatches = (matches) => {
    return matches.filter(match => {
      // Favorite filter
      if (showFavorites && !match.isFavorite) {
        return false;
      }
      // Sport filter
      if (selectedSports.length > 0 && !selectedSports.includes(match.sport)) {
        return false;
      }
      // Location filter
      if (selectedLocation && !match.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      // League filter
      if (selectedLeague && match.league !== selectedLeague) {
        return false;
      }
      return true;
    });
  };

  const filteredLiveMatches = getFilteredMatches(currentLiveMatches);
  const filteredUpcomingMatches = getFilteredMatches(mockUpcomingMatches); // Apply filters to upcoming too

  // --- Filter Handlers ---
  const toggleSport = (sportName) => {
    setSelectedSports(prev =>
      prev.includes(sportName)
        ? prev.filter(s => s !== sportName)
        : [...prev, sportName]
    );
  };

  const resetFilters = () => {
    setShowFavorites(false);
    setSelectedSports([]);
    setSelectedLocation('');
    setSelectedLeague('');
    // Close filter sections
    setIsSportFilterOpen(false);
    setIsLocationFilterOpen(false);
    setIsLeagueFilterOpen(false);
    setIsFiltersOpen(false); // Close main filter panel
  };


  // --- Collapsible Section Helper Component ---
  const CollapsibleSection = ({ title, icon: Icon, isOpen, toggleOpen, children }) => (
    <div className="bg-gray-800 rounded-lg mb-3 p-4 shadow-md">
      <button
        className="w-full flex justify-between items-center text-left py-2"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-white flex items-center">
          {Icon && <Icon className="mr-3 text-gamepulse-blue" />} {title}
        </h3>
        <FaChevronDown className={`text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} pt-4 border-t border-gray-700 mt-2`}>
        {children}
      </div>
    </div>
  );

  // --- Individual Match Card Component (reusable for Live & Featured) ---
  const MatchCard = ({ match, isFeatured = false }) => {
    const SportIcon = getSportIcon(match.sport);
    const statusColor = match.status === 'In Progress' || match.status === 'Live' ? 'bg-red-600' : 'bg-gray-500';
    const statusDot = match.status === 'In Progress' || match.status === 'Live' ? 'animate-pulse' : '';
    const statusText = match.status === 'In Progress' || match.status === 'Live' ? 'LIVE' : match.status;

    return (
      <Link to={`/match-details/${match.id}`} className="block">
        <div className={`bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col p-4
                           transition-transform duration-200 hover:scale-[1.02] cursor-pointer
                           border-t-4 ${isFeatured ? 'border-gamepulse-orange' : 'border-gamepulse-blue'}
                           hover:border-gamepulse-orange relative h-full`}>
          <div className="absolute top-2 left-2 flex items-center">
            <span className={`${statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center ${statusDot}`}>
              <span className={`w-2 h-2 ${statusColor === 'bg-red-600' ? 'bg-white' : 'bg-gray-300'} rounded-full mr-1`}></span>
              {statusText}
            </span>
          </div>
          <SportIcon className="text-gamepulse-blue text-lg absolute top-2 right-2" />
          <FaStar className={`absolute top-2 right-8 text-xl cursor-pointer ${match.isFavorite ? 'text-gamepulse-yellow' : 'text-gray-500 hover:text-gray-300'}`} />
          {/* You'd add a real favorite toggle logic here */}
          <FaBell className="absolute top-2 right-16 text-xl text-gray-500 hover:text-gray-300 cursor-pointer" />


          <div className="flex flex-col items-center justify-center pt-8 flex-grow"> {/* Increased pt to account for status/icon */}
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-white font-bold text-lg text-right flex-1 pr-1">{match.homeTeam}</span>
              <img src={match.homeLogo} alt={`${match.homeTeam} Logo`} className="w-10 h-10 object-contain rounded-full border border-gray-700" onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_team_logo.png'; }} />
              <span className="text-4xl font-extrabold text-gamepulse-orange px-2">{match.homeScore}</span>
              <span className="text-4xl font-extrabold text-gamepulse-orange">-</span>
              <span className="text-4xl font-extrabold text-gamepulse-orange px-2">{match.awayScore}</span>
              <img src={match.awayLogo} alt={`${match.awayTeam} Logo`} className="w-10 h-10 object-contain rounded-full border border-gray-700" onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_team_logo.png'; }} />
              <span className="text-white font-bold text-lg text-left flex-1 pl-1">{match.awayTeam}</span>
            </div>

            <p className="text-sm text-gray-400 text-center font-medium mt-2">
              {match.period} {match.gameClockSeconds !== null && match.status !== 'Finished' ? formatGameClock(match.sport, match.gameClockSeconds) : ''}
              {match.status === 'Finished' && 'Full Time'}
            </p>
            {match.keyEvent && (
              <p className="text-gamepulse-green text-xs font-semibold mt-2 px-2 py-1 bg-gray-700 rounded-md text-center max-w-full truncate">{match.keyEvent}</p>
            )}
          </div>

          <div className="text-gray-500 text-xs text-center mt-4 pt-2 border-t border-gray-700">
            <p className="flex items-center justify-center mb-1">
              <FaMapMarkerAlt className="mr-1 text-gray-600" /> {match.location}
            </p>
            <p className="flex items-center justify-center">
              <FaTrophy className="mr-1 text-gray-600" /> {match.league}
            </p>
          </div>
        </div>
      </Link>
    );
  };


  // --- Upcoming Match Card (simpler design) ---
  const UpcomingMatchCard = ({ match }) => {
    const SportIcon = getSportIcon(match.sport);
    return (
      <Link to={`/match-details/${match.id}`} className="block">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col p-4
                           transition-transform duration-200 hover:scale-[1.02] cursor-pointer
                           border-t-4 border-gamepulse-purple hover:border-gamepulse-orange relative h-full">
          <SportIcon className="text-gamepulse-purple text-lg absolute top-2 right-2" />
          <FaStar className={`absolute top-2 right-8 text-xl cursor-pointer ${match.isFavorite ? 'text-gamepulse-yellow' : 'text-gray-500 hover:text-gray-300'}`} />
          <FaBell className="absolute top-2 right-16 text-xl text-gray-500 hover:text-gray-300 cursor-pointer" />

          <div className="flex flex-col items-center justify-center flex-grow pt-8">
            <div className="flex items-center justify-between w-full px-2 mb-2">
              <span className="text-white font-bold text-lg text-right flex-1 pr-1 truncate">{match.homeTeam}</span>
              <img src={match.homeLogo} alt={`${match.homeTeam} Logo`} className="w-10 h-10 object-contain rounded-full border border-gray-700" onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_team_logo.png'; }} />
              <span className="text-2xl text-gray-400 px-2">vs</span>
              <img src={match.awayLogo} alt={`${match.awayTeam} Logo`} className="w-10 h-10 object-contain rounded-full border border-gray-700" onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_team_logo.png'; }} />
              <span className="text-white font-bold text-lg text-left flex-1 pl-1 truncate">{match.awayTeam}</span>
            </div>

            <p className="text-gamepulse-orange text-sm font-semibold mt-2">
              {match.date}, {match.time}
            </p>
          </div>

          <div className="text-gray-500 text-xs text-center mt-4 pt-2 border-t border-gray-700">
            <p className="flex items-center justify-center mb-1">
              <FaMapMarkerAlt className="mr-1 text-gray-600" /> {match.location}
            </p>
            <p className="flex items-center justify-center">
              <FaTrophy className="mr-1 text-gray-600" /> {match.league}
            </p>
          </div>
        </div>
      </Link>
    );
  };


  return (
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col pt-20"> {/* pt-20 for main app header */}

      {/* I. Page Header & Navigation */}
      <div className="bg-gamepulse-dark-gradient from-gamepulse-blue-dark to-gamepulse-dark p-4 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center py-4">GamePulse Live</h1>
        <div className="flex justify-center items-center bg-gray-900 p-1 rounded-full mx-auto max-w-sm my-4 shadow-inner">
          <button
            className={`flex-1 text-center py-2 px-6 rounded-full text-sm font-semibold transition-colors
                        ${activeTab === 'live' ? 'bg-gamepulse-blue text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('live')}
          >
            Live Matches
          </button>
          <button
            className={`flex-1 text-center py-2 px-6 rounded-full text-sm font-semibold transition-colors
                        ${activeTab === 'upcoming' ? 'bg-gamepulse-blue text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Games
          </button>
        </div>
        <p className="text-center text-gray-400 text-sm mb-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          <span className="ml-2">
            {activeTab === 'live' ? ' - Live' : ' - Scheduled'}
          </span>
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow pb-8 overflow-y-auto custom-scrollbar">

        {/* V. "Don't Miss" / Featured Live Matches (only for Live tab) */}
        {activeTab === 'live' && (
          <section className="px-4 md:px-8 mt-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaFire className="mr-2 text-gamepulse-orange" /> Top Live Matches
            </h2>
            <div className="overflow-x-auto custom-scrollbar-hidden pb-4">
              <div className="flex space-x-4">
                {mockLiveMatches.filter(match => match.isFavorite).slice(0, 3).map(match => ( // Use isFavorite as a proxy for featured
                  <div key={`featured-${match.id}`} className="flex-shrink-0 w-64">
                    <MatchCard match={match} isFeatured={true} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* II. Filtering & Personalization Options */}
        <section className="px-4 md:px-8 mt-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FaFilter className="mr-2" /> Filter {activeTab === 'live' ? 'Live' : 'Upcoming'} Games
            </h2>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center"
            >
              <FaFilter className="mr-2" /> {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className={`${isFiltersOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>

            {/* My Favorites Toggle */}
            <div className="bg-gray-800 rounded-lg mb-3 p-4 shadow-md flex justify-between items-center">
              <span className="text-white text-lg font-medium flex items-center">
                <FaStar className="mr-3 text-gamepulse-yellow" /> Show only my favorite
              </span>
              <label className="switch relative inline-block w-12 h-7">
                <input
                  type="checkbox"
                  checked={showFavorites}
                  onChange={() => setShowFavorites(!showFavorites)}
                  className="hidden"
                />
                <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-600 rounded-full before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-400"></span>
              </label>
            </div>

            <CollapsibleSection title="Sport" icon={FaFootballBall} isOpen={isSportFilterOpen} toggleOpen={() => setIsSportFilterOpen(!isSportFilterOpen)}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sportFilterOptions.map(sport => (
                  <label key={sport.name} className="inline-flex items-center cursor-pointer text-white text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSports.includes(sport.name)}
                      onChange={() => toggleSport(sport.name)}
                      className="form-checkbox h-4 w-4 text-gamepulse-blue border-gray-600 bg-gray-700 rounded focus:ring-gamepulse-blue"
                    />
<sport.icon className="ml-2 mr-1 text-gray-400" />                    <span className="ml-1">{sport.name}</span>
                  </label>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Location" icon={FaMapMarkerAlt} isOpen={isLocationFilterOpen} toggleOpen={() => setIsLocationFilterOpen(!isLocationFilterOpen)}>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                >
                  <option value="">All Locations</option>
                  {locationFilterOptions.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FaChevronDown className="fill-current h-4 w-4" />
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="League/Tournament" icon={FaTrophy} isOpen={isLeagueFilterOpen} toggleOpen={() => setIsLeagueFilterOpen(!isLeagueFilterOpen)}>
              <div className="relative">
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                >
                  <option value="">All Leagues</option>
                  {leagueFilterOptions.map(league => (
                    <option key={league} value={league}>{league}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FaChevronDown className="fill-current h-4 w-4" />
                </div>
              </div>
            </CollapsibleSection>

            {/* Apply/Reset Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3 mt-6">
              <button
                onClick={resetFilters}
                className="text-gray-400 hover:text-white font-semibold py-2 px-6 rounded-full border border-gray-700 hover:border-gray-600 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsFiltersOpen(false)} // Apply filters effectively just closes the panel after state update
                className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </section>

        {/* III. Live Game Listings Display / Upcoming Game Listings */}
        <section className="px-4 md:px-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {activeTab === 'live' ? `Live Now (${filteredLiveMatches.length} matches)` : `Upcoming Games (${filteredUpcomingMatches.length} matches)`}
          </h2>

          {activeTab === 'live' && filteredLiveMatches.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLiveMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && filteredUpcomingMatches.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredUpcomingMatches.map(match => (
                <UpcomingMatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          {/* IV. "No Live Games Found" State */}
          {(activeTab === 'live' && filteredLiveMatches.length === 0) || (activeTab === 'upcoming' && filteredUpcomingMatches.length === 0) ? (
            <div className="text-center py-12 px-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-8">
              <h3 className="text-xl text-white mb-4">
                No {activeTab === 'live' ? 'live' : 'upcoming'} games match your current criteria.
              </h3>
              <p className="text-gray-300 mb-6">
                Try broadening your filters, or check out other exciting content!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to={activeTab === 'live' ? '/upcoming-matches' : '/live-matches'} className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-bold py-2 px-5 rounded-full">
                  {activeTab === 'live' ? 'View Upcoming Games' : 'View Live Matches'}
                </Link>
                <Link to="/discover-talent" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-full">
                  Discover Talent
                </Link>
              </div>
              <Link to="/help-center" className="text-gamepulse-blue hover:text-gamepulse-blue-dark underline mt-6 block text-sm">
                Need help? Visit our Help Center.
              </Link>
            </div>
          ) : null}
        </section>

      </div>
    </div>
  );
};

export default LiveMatchesDashboard;