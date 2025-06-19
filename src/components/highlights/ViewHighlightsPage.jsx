import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaUpload, FaPlay, FaShareAlt, FaFlag, FaChevronDown, FaChevronUp, FaFootballBall, FaBasketballBall, FaRunning, FaUsers, FaFilter, FaTimes,FaStar , FaEye, FaHeart} from 'react-icons/fa'; // Added FaFilter and FaTimes

import image1 from '../../assets/freepik__the-style-is-candid-image-photography-with-natural__69798.jpeg';
import image2 from '../../assets/Gemini_Generated_Image_33sjng33sjng33sj.png'
import image3 from '../../assets/Gemini_Generated_Image_j534tfj534tfj534.png'
import image4 from '../../assets/playing-football-on-a-dusty-field.jpeg'
import Header from '../Header/Header';

// Mock Data
const featuredHighlights = [
  { id: 'fh1', duration: '2:34', thumbnailUrl: image1 },
  { id: 'fh2', duration: '1:45', thumbnailUrl: image2 },
  { id: 'fh3', duration: '3:12', thumbnailUrl: image3 },
  { id: 'fh4', duration: '0:58', thumbnailUrl: image4 },
];

const mainHighlight = {
  id: 'mh1',
  title: 'Incredible Goalkeeper Save',
  description: 'Amazing reflexes from Kwame Asante during the finals',
  thumbnailUrl: 'https://via.placeholder.com/800x450/2d3748/fff?text=Main+Highlight+Video',
  views: '234',
  shares: '45',
  likes: '1.2k',
  matchDetails: {
    teams: 'Accra High vs Cape Coast Academy',
    date: 'March 15, 2024',
    competition: 'Ghana Schools Championship',
    finalScore: '2-1',
  },
  athlete: {
    id: 'kwame-asante-123',
    name: 'Kwame Asante',
    role: 'Goalkeeper',
    xp: '1,647',
    profilePic: 'https://randomuser.me/api/portraits/men/75.jpg', // Re-using Kwame's pic
  }
};

const allHighlights = [
  { id: 'h1', sport: 'Football', title: 'Perfect Strike Goal', teams: 'Lagos Grammar vs Victoria Island High', age: '2 days ago', views: '8,456', duration: '1:34', thumbnailUrl: 'https://via.placeholder.com/200x112/34495e/ecf0f1?text=FootHighlight' },
  { id: 'h2', sport: 'Basketball', title: 'Crossover Skills', teams: 'Nairobi High vs Mombasa Academy', age: '3 days ago', views: '6,678', duration: '1:33', thumbnailUrl: 'https://via.placeholder.com/200x112/2c3e50/ecf0f1?text=BasketHighlight' },
  { id: 'h3', sport: 'Rugby', title: 'Power Scrum', teams: 'Cape Town vs Johannesburg', age: '1 week ago', views: '7,234', duration: '2:45', thumbnailUrl: 'https://via.placeholder.com/200x112/1abc9c/ecf0f1?text=RugbyHighlight' },
  { id: 'h4', sport: 'Athletics', title: 'Record Breaking Sprint', teams: 'Ghana Youth Athletics', age: '5 days ago', views: '5,123', duration: '0:45', thumbnailUrl: 'https://via.placeholder.com/200x112/2ecc71/ecf0f1?text=AthleticsHighlight' },
  { id: 'h5', sport: 'Football', title: 'Solo Dribbling Masterclass', teams: 'Kumasi vs Accra', age: '4 days ago', views: '9,123', duration: '1:50', thumbnailUrl: 'https://via.placeholder.com/200x112/e67e22/ecf0f1?text=FootHighlight2' },
  { id: 'h6', sport: 'Basketball', title: 'Slam Dunk Contest', teams: 'Dakar vs Abidjan', age: '6 days ago', views: '7,890', duration: '1:10', thumbnailUrl: 'https://via.placeholder.com/200x112/f39c12/ecf0f1?text=BasketHighlight2' },
];

const ViewHighlightsPage = () => {
  const [filters, setFilters] = useState({
    sport: 'All Sports',
    teamSchool: '',
    highlightType: [],
    dateRange: 'Last 7 days',
    xpMin: '',
    xpMax: '',
  });

  // Accordion state: All closed by default for mobile
  const [accordionOpen, setAccordionOpen] = useState({
    sport: false,
    teamSchool: false,
    highlightType: false,
    dateRange: false,
    xpRanking: false,
    quickLinks: false,
  });

  // State to control visibility of the entire filter sidebar on mobile
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // Toggle function for accordion sections
  const toggleAccordion = (section) => {
    setAccordionOpen(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleHighlightTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      highlightType: prev.highlightType.includes(type)
        ? prev.highlightType.filter(item => item !== type)
        : [...prev.highlightType, type]
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    // In a real app, this would trigger data fetching/filtering
    setIsFilterSidebarOpen(false); // Close sidebar after applying filters on mobile
  };

  const resetFilters = () => {
    setFilters({
      sport: 'All Sports',
      teamSchool: '',
      highlightType: [],
      dateRange: 'Last 7 days',
      xpMin: '',
      xpMax: '',
    });
    // Optionally close sidebar after resetting filters
  };

  // Helper component for an accordion item
  const AccordionItem = ({ title, children, sectionKey }) => {
    const isOpen = accordionOpen[sectionKey];
    return (
      <div className="border-b border-neutral-black/50 last:border-b-0 lg:border-b-0">
        <button
          className="w-full flex justify-between items-center py-3 px-1.5 text-neutral-white font-semibold text-sm md:text-base lg:cursor-default lg:hover:bg-transparent lg:px-0 lg:py-0"
          onClick={() => toggleAccordion(sectionKey)}
        >
          {title}
          <span className="lg:hidden"> {/* Hide chevron on large screens */}
            {isOpen ? <FaChevronUp className="text-gamepulse-yellow text-sm" /> : <FaChevronDown className="text-gamepulse-yellow text-sm" />}
          </span>
        </button>
        {/* The content div. On small screens, max-h and opacity are toggled.
            On large screens (lg:), it's always max-h-screen and opacity-100. */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'}
          lg:max-h-screen lg:opacity-100 lg:py-0`}>
          {children}
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-neutral-dark-gray text-neutral-white font-sans">
      <Header/>
      
      <div className="pt-16 md:pt-20 md:mt-10 mt-15 container mx-auto px-2 py-4 md:px-4 md:py-6 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Filter Sidebar - Mobile Overlay/Drawer */}
        {isFilterSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
            onClick={() => setIsFilterSidebarOpen(false)} // Close when clicking outside
          ></div>
        )}
        
        {/* ASIDE - Filter Card (Fixed on Desktop, Drawer on Mobile) */}
        <aside
          className={`
            fixed top-0 left-0 w-full h-full bg-neutral-dark-gray z-50
            transform transition-transform duration-300 ease-in-out
            ${isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            p-4 md:p-6 overflow-y-auto
            lg:fixed lg:top-20 lg:left-auto lg:right-auto lg:bottom-auto
            lg:w-[280px] // *** Set explicit width for fixed sidebar ***
            lg:translate-x-0 lg:block rounded-xl
            lg:h-[calc(100vh-80px)] // Optional: Make it occupy almost full height, adjusted for header top-20
            lg:overflow-y-auto scrollbar-hide
          `}
        >
          {/* Close button for mobile filter drawer */}
          <div className="flex justify-between items-center mt-17 mb-4 lg:hidden">
            <h2 className="text-lg font-bold text-neutral-white">Filters</h2>
            <button
              onClick={() => setIsFilterSidebarOpen(false)}
              className="text-neutral-white text-xl p-2 rounded-full hover:bg-neutral-black/30"
            >
              <FaTimes />
            </button>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 hidden lg:block">Filters</h2> {/* Show "Filters" title only on larger screens */}


          {/* Individual Filter Sections as Accordion Items */}
          <AccordionItem title="Sport" sectionKey="sport">
            <div className="mb-4 lg:mb-0"> {/* Adjusted margin for accordion context */}
              <label htmlFor="sport-filter" className="block text-neutral-medium-gray text-xs md:text-sm font-semibold mb-2 lg:hidden">Sport</label> {/* Label visible only on mobile */}
              <select
                id="sport-filter"
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-1.5 text-xs md:text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.sport}
                onChange={(e) => handleFilterChange('sport', e.target.value)}
              >
                <option>All Sports</option>
                <option>Football</option>
                <option>Basketball</option>
                <option>Tennis</option>
                <option>Volleyball</option>
              </select>
            </div>
          </AccordionItem>

          <AccordionItem title="Team/School" sectionKey="teamSchool">
            <div className="mb-4 lg:mb-0">
              <label htmlFor="team-school-filter" className="block text-neutral-medium-gray text-xs md:text-sm font-semibold mb-2 lg:hidden">Team/School</label>
              <input
                type="text"
                id="team-school-filter"
                placeholder="Search teams..."
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-1.5 text-xs md:text-sm text-neutral-white placeholder-neutral-medium-gray focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.teamSchool}
                onChange={(e) => handleFilterChange('teamSchool', e.target.value)}
              />
            </div>
          </AccordionItem>

          <AccordionItem title="Highlight Type" sectionKey="highlightType">
            <div className="mb-4 lg:mb-0">
              <label className="block text-neutral-medium-gray text-xs md:text-sm font-semibold mb-2 lg:hidden">Highlight Type</label>
              <div className="space-y-2">
                {['Goals', 'Skills', 'Saves', 'Assists'].map(type => (
                  <label key={type} className="flex items-center text-neutral-light-gray text-xs md:text-sm">
                    <input
                      type="checkbox"
                      className="form-checkbox h-3.5 w-3.5 md:h-4 md:w-4 text-gamepulse-blue rounded-sm border-neutral-black bg-gamepulse-blue-dark focus:ring-gamepulse-blue"
                      checked={filters.highlightType.includes(type)}
                      onChange={() => handleHighlightTypeChange(type)}
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Date Range" sectionKey="dateRange">
            <div className="mb-4 lg:mb-0">
              <label htmlFor="date-range-filter" className="block text-neutral-medium-gray text-xs md:text-sm font-semibold mb-2 lg:hidden">Date Range</label>
              <select
                id="date-range-filter"
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-1.5 text-xs md:text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
          </AccordionItem>

          <AccordionItem title="XP Ranking" sectionKey="xpRanking">
            <div className="mb-4 lg:mb-0"> {/* Changed mb-6 to mb-4 to be consistent within accordion item */}
              <label className="block text-neutral-medium-gray text-xs md:text-sm font-semibold mb-2 lg:hidden">XP Ranking</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-1.5 text-xs md:text-sm text-neutral-white placeholder-neutral-medium-gray focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                  value={filters.xpMin}
                  onChange={(e) => handleFilterChange('xpMin', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-1.5 text-xs md:text-sm text-neutral-white placeholder-neutral-medium-gray focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                  value={filters.xpMax}
                  onChange={(e) => handleFilterChange('xpMax', e.target.value)}
                />
              </div>
            </div>
          </AccordionItem>

          {/* Apply/Reset Buttons (These will always be visible regardless of accordion state) */}
          <div className="flex space-x-3 mt-4 mb-4 lg:mt-6 lg:mb-6"> {/* Adjusted margin-top */}
            <button
              className="flex-1 bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-colors"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="flex-1 bg-neutral-black/30 hover:bg-neutral-black text-neutral-white px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-colors"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          {/* Quick Links (Also as an accordion item) */}
          <AccordionItem title="Quick Links" sectionKey="quickLinks">
            <ul className="space-y-3 text-neutral-medium-gray text-xs md:text-sm pt-2 lg:pt-0"> {/* Adjusted padding-top */}
              <li>
                <Link to="/highlights/trending" className="hover:text-gamepulse-yellow flex items-center transition-colors">
                  <FaStar className="mr-2 text-gamepulse-yellow text-sm md:text-base" /> Trending Highlights
                </Link>
              </li>
              <li>
                <Link to="/live-matches" className="hover:text-gamepulse-yellow flex items-center transition-colors">
                  <FaPlay className="mr-2 text-gamepulse-blue-light text-sm md:text-base" /> Live Matches
                </Link>
              </li>
              <li>
                <Link to="/athletes/discover" className="hover:text-gamepulse-yellow flex items-center transition-colors">
                  <FaUsers className="mr-2 text-success-green text-sm md:text-base" /> Discover Athletes
                </Link>
              </li>
            </ul>
          </AccordionItem>
        </aside>

        {/* SPACER DIV: This div occupies the grid space that the fixed sidebar *would* take */}
        {/* It is hidden on mobile and only appears on large screens to push the main content */}
        <div className="hidden lg:block lg:col-span-1 lg:w-[280px]"></div> {/* Match the width of your fixed sidebar */}

        {/* Main Content Column */}
        <main className="lg:col-span-3 space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-neutral-white mb-2 sm:mb-0">Game Highlights</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <span className="text-neutral-medium-gray text-xs sm:text-sm hidden sm:block">Discover the best moments from African high school sports</span>
              <select className="bg-neutral-dark-gray border border-neutral-black rounded-full px-3 py-1.5 text-xs sm:text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue w-full sm:w-auto">
                <option>Most Recent</option>
                <option>Most Viewed</option>
                <option>Highest Rated</option>
              </select>
              <Link
                to="/upload-highlight"
                className="bg-success-green hover:bg-success-green/80 text-gamepulse-dark px-4 py-1.5 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors w-full sm:w-auto"
              >
                <FaUpload className="mr-2 text-sm sm:text-sm" /> Upload Highlight
              </Link>
              {/* Filter button for mobile */}
              <button
                onClick={() => setIsFilterSidebarOpen(true)}
                className="lg:hidden bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-1.5 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors w-full sm:w-auto"
              >
                <FaFilter className="mr-2 text-sm" /> Filters
              </button>
            </div>
          </div>

          {/* Featured & Trending Highlights */}
          <section className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4">Featured & Trending</h2>
            <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-2 scrollbar-hide">
              {featuredHighlights.map(highlight => (
                <div key={highlight.id} className="flex-shrink-0 w-48 md:w-60 relative rounded-lg overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity">
                  <img src={highlight.thumbnailUrl} alt="Featured Highlight" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-3xl md:text-4xl text-gamepulse-yellow" />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-neutral-white text-xxs px-1.5 py-0.5 rounded md:text-xs">
                    {highlight.duration}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Highlight Section */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Video Player */}
            <div className="md:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src={mainHighlight.thumbnailUrl} alt={mainHighlight.title} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay className="text-5xl md:text-6xl text-gamepulse-yellow" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-lg md:text-xl font-bold text-neutral-white">{mainHighlight.title}</h3>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="bg-black/50 p-1.5 rounded-full text-neutral-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"><FaShareAlt /></button>
                <button className="bg-black/50 p-1.5 rounded-full text-neutral-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"><FaFlag /></button>
              </div>
            </div>

            {/* Details and Athlete Profile */}
            <div className="md:col-span-1 space-y-3 md:space-y-4">
              <p className="text-neutral-light-gray text-xs md:text-sm">{mainHighlight.description}</p>

              {/* Engagement */}
              <div className="flex items-center space-x-4 text-neutral-medium-gray text-xs md:text-sm">
                <span className="flex items-center"><FaEye className="mr-1 text-sm" /> {mainHighlight.views}</span>
                <span className="flex items-center"><FaHeart className="mr-1 text-sm" /> {mainHighlight.likes}</span>
                <span className="flex items-center"><FaShareAlt className="mr-1 text-sm" /> {mainHighlight.shares}</span>
              </div>

              {/* Match Details */}
              <div className="bg-gamepulse-blue-dark rounded-lg p-3 md:p-4">
                <h4 className="text-neutral-white font-bold mb-2 text-sm md:text-base">Match Details</h4>
                <p className="text-xs text-neutral-light-gray">Teams: {mainHighlight.matchDetails.teams}</p>
                <p className="text-xs text-neutral-light-gray">Date: {mainHighlight.matchDetails.date}</p>
                <p className="text-xs text-neutral-light-gray">Competition: {mainHighlight.matchDetails.competition}</p>
                <p className="text-xs text-neutral-light-gray">Final Score: {mainHighlight.matchDetails.finalScore}</p>
              </div>

              {/* Athlete Profile Card */}
              <Link to={`/athlete/${mainHighlight.athlete.id}`} className="block bg-gamepulse-blue-dark rounded-lg p-3 md:p-4 flex items-center space-x-3 md:space-x-4 hover:bg-gamepulse-blue-dark/80 transition-colors">
                <img src={mainHighlight.athlete.profilePic} alt={mainHighlight.athlete.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-gamepulse-yellow flex-shrink-0" />
                <div>
                  <h4 className="text-neutral-white font-bold text-sm md:text-base">{mainHighlight.athlete.name}</h4>
                  <p className="text-xs text-neutral-medium-gray">{mainHighlight.athlete.role} • XP: {mainHighlight.athlete.xp}</p>
                  <span className="text-gamepulse-yellow text-xs md:text-sm hover:underline">
                    View Profile
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* All Highlights Grid */}
          <section>
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4">All Highlights</h2>
            <p className="text-neutral-medium-gray text-xs md:text-sm mb-3 md:mb-4">Showing 1,247 results</p> {/* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {allHighlights.map(highlight => (
                <div key={highlight.id} className="bg-neutral-dark-gray rounded-lg overflow-hidden cursor-pointer group hover:bg-neutral-blue-dark transition-colors">
                  <div className="relative w-full h-36 overflow-hidden">
                    <img src={highlight.thumbnailUrl} alt={highlight.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaPlay className="text-3xl md:text-4xl text-gamepulse-yellow" />
                    </div>
                    <div className="absolute top-2 left-2 bg-neutral-black/70 text-neutral-white text-xxs px-2 py-1 rounded-full flex items-center">
                      {highlight.sport === 'Football' && <FaFootballBall className="mr-1 text-xs" />}
                      {highlight.sport === 'Basketball' && <FaBasketballBall className="mr-1 text-xs" />}
                      {highlight.sport === 'Rugby' && <FaUsers className="mr-1 text-xs" />} {/* Using users for rugby as no specific icon */}
                      {highlight.sport === 'Athletics' && <FaRunning className="mr-1 text-xs" />}
                      {highlight.sport}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-neutral-white text-xxs px-2 py-1 rounded">
                      {highlight.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-neutral-white text-sm md:text-md mb-1">{highlight.title}</h3>
                    <p className="text-xs text-neutral-medium-gray">{highlight.teams}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-neutral-medium-gray">
                      <span>{highlight.age}</span>
                      <span className="flex items-center"><FaEye className="mr-1 text-sm" /> {highlight.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ViewHighlightsPage;