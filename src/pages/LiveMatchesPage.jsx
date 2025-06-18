import React from 'react';
import AppHeader from '../components/LiveMatches/AppHeader'; // Import the new AppHeader component
import { FaCalendarAlt } from 'react-icons/fa'; // For the date icon in MatchListing

// Placeholder components for other sections (we'll build these next)
const LeftSidebar = () => (
  <aside className="bg-gray-800-custom rounded-lg p-4 h-fit sticky top-20"> {/* Adjusted top for fixed header */}
    <h3 className="text-lg font-bold text-gray-300 mb-4">Popular Leagues</h3>
    <ul className="space-y-2 text-gray-400 text-sm">
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">UEFA Champions <span className="text-xs text-gray-500">38</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">European League <span className="text-xs text-gray-500">41</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer text-gamepulse-yellow bg-gray-700-custom">Premier League <span className="text-xs text-gamepulse-yellow">133</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">La Liga <span className="text-xs text-gray-500">136</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">Serie A <span className="text-xs text-gray-500">140</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">Bundesliga <span className="text-xs text-gray-500">150</span></li>
      <li className="flex items-center justify-between p-2 rounded hover:bg-gray-700-custom cursor-pointer">Liga 1 <span className="text-xs text-gray-500">139</span></li>
    </ul>
    <h3 className="text-lg font-bold text-gray-300 mb-4 mt-6">Popular Countries</h3>
    <ul className="space-y-2 text-gray-400 text-sm">
      <li className="flex items-center p-2 rounded hover:bg-gray-700-custom cursor-pointer"><span className="w-4 h-4 mr-2 bg-red-500 rounded-full"></span> Germany</li>
      <li className="flex items-center p-2 rounded hover:bg-gray-700-custom cursor-pointer"><span className="w-4 h-4 mr-2 bg-blue-500 rounded-full"></span> France</li>
      <li className="flex items-center p-2 rounded hover:bg-gray-700-custom cursor-pointer"><span className="w-4 h-4 mr-2 bg-yellow-500 rounded-full"></span> Spain</li>
      <li className="flex items-center p-2 rounded hover:bg-gray-700-custom cursor-pointer"><span className="w-4 h-4 mr-2 bg-green-500 rounded-full"></span> England</li>
      <li className="flex items-center p-2 rounded hover:bg-gray-700-custom cursor-pointer"><span className="w-4 h-4 mr-2 bg-gray-500 rounded-full"></span> Italy</li>
    </ul>
  </aside>
);

const FeaturedMatchBanner = () => (
  <section className="bg-gradient-to-r from-gamepulse-blue to-gamepulse-blue-darker rounded-lg p-6 mb-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[200px] text-center md:text-left">
    <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://via.placeholder.com/800x400/000000/FFFFFF?text=Ronaldo+Background')" }}></div> {/* Placeholder background image */}
    <div className="relative z-10 text-white w-full md:w-2/3">
      <p className="text-sm text-gray-200 mb-1">VS • Today, 08:30 PM</p>
      <h2 className="text-xl md:text-3xl font-extrabold mb-2">Premier League</h2>
      <h1 className="text-2xl md:text-4xl font-extrabold text-gamepulse-yellow leading-tight mb-4">
        Liverpool FC vs Manchester United
      </h1>
      <p className="text-sm text-gray-200 mb-6 hidden md:block"> {/* Hide on small screens */}
        Place a bet on this match today, get instant cashback and participate in various raffles.
      </p>
      <button className="bg-white text-gamepulse-blue px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
        Bet now
      </button>
    </div>
    <div className="relative z-10 w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
        {/* You can place a player image here if desired, e.g., <img src="/images/ronaldo.png" alt="Featured Player" className="max-h-40 md:max-h-60 object-contain" /> */}
    </div>
  </section>
);

const MatchListing = () => {
  const matches = [
    { league: 'Premier League', date: '25 Aug Wednesday 17:00 PM', team1: 'Liverpool FC', team2: 'Manchester United', odds: { '1': '1.56', 'X': '3.40', '2': '3.99' } },
    { league: 'Premier League', date: '25 Aug Wednesday 17:00 PM', team1: 'Manchester City', team2: 'Tottenham Hotspur', odds: { '1': '1.75', 'X': '3.60', '2': '2.50' } },
    { league: 'La Liga', date: '25 Aug Wednesday 17:00 PM', team1: 'Real Madrid', team2: 'Athletic Madrid', odds: { '1': '4.10', 'X': '2.05', '2': '1.80' } },
    { league: 'La Liga', date: '25 Aug Wednesday 17:00 PM', team1: 'FC Barcelona', team2: 'Athletic Bilbao', odds: { '1': '1.20', 'X': '4.50', '2': '3.10' } },
  ];

  const MatchCard = ({ match }) => (
    <div className="bg-gray-700-custom/50 rounded-lg p-4 mb-3 flex flex-col sm:flex-row items-center justify-between text-white text-sm">
      <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
        <p className="text-xs text-gray-400 mb-1">{match.league}</p>
        <p className="font-semibold">{match.date}</p>
      </div>
      <div className="flex-1 text-center mb-2 sm:mb-0">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <span className="font-bold text-lg">{match.team1}</span>
          <span className="text-gray-400 text-xs">VS</span>
          <span className="font-bold text-lg">{match.team2}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center sm:justify-end space-x-2 w-full sm:w-auto">
        {Object.entries(match.odds).map(([key, value]) => (
          <div key={key} className="bg-gray-600-custom rounded px-3 py-1 text-center flex-shrink-0">
            <span className="block text-xs text-gray-400">{key}</span>
            <span className="block font-bold">{value}</span>
          </div>
        ))}
        <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-darker rounded px-3 py-1 flex items-center justify-center">
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-800-custom rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Football Matches</h2>
        <span className="text-sm text-gray-400 flex items-center">
          <FaCalendarAlt className="mr-2" /> August 24, 2022
        </span>
      </div>
      <div className="flex space-x-2 mb-4 border-b border-gray-700-custom overflow-x-auto pb-2">
        <button className="px-4 py-2 text-gamepulse-yellow border-b-2 border-gamepulse-yellow font-semibold flex-shrink-0">All games</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-600-custom flex-shrink-0">Live matches</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-600-custom flex-shrink-0">ODDS</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-600-custom flex-shrink-0">Finished</button>
      </div>
      <div className="space-y-3">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </section>
  );
};


import { FaChevronLeft, FaChevronRight, FaPlusCircle, FaTimes } from 'react-icons/fa'; // For RightSidebar

const RightSidebar = () => (
  <aside className="bg-gray-800-custom rounded-lg p-4 h-fit sticky top-20"> {/* Adjusted top for fixed header */}
    {/* Popular Live Matches */}
    <h3 className="text-lg font-bold text-gray-300 mb-4 flex items-center justify-between">
      Popular Live Matches
      <div className="flex space-x-2 text-gray-400">
        <button className="hover:text-white"><FaChevronLeft /></button>
        <button className="hover:text-white"><FaChevronRight /></button>
      </div>
    </h3>
    <div className="bg-gray-700-custom/50 rounded-lg p-3 mb-4 text-white text-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/20" alt="Italy Flag" className="w-5 h-5 rounded-full" />
          <span>Italy / Serie A / Matchday 2 of 38</span>
        </div>
        <span className="text-green-500 font-bold">● LIVE</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Naples.svg/1200px-Flag_of_Naples.svg.png" alt="Napoli Logo" className="w-8 h-8 rounded-full bg-white p-1" />
          <span className="text-lg font-bold">Napoli</span>
        </div>
        <span className="text-2xl font-bold text-gamepulse-yellow">2:1</span>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">Inter</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png" alt="Inter Logo" className="w-8 h-8 rounded-full bg-white p-1" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold mb-3">
        <div className="bg-gray-600-custom rounded p-2">1 <br/> 2.10</div>
        <div className="bg-gray-600-custom rounded p-2">X <br/> 2.80</div>
        <div className="bg-gamepulse-blue rounded p-2">2 <br/> 1.70</div>
      </div>
      <button className="flex items-center justify-center w-full text-gamepulse-blue font-bold py-2 rounded-lg bg-gray-700-custom hover:bg-gray-600-custom">
        <FaPlusCircle className="mr-2" /> Match details
      </button>
    </div>

    {/* Bet Slip */}
    <h3 className="text-lg font-bold text-gray-300 mt-6 mb-4">Bet slip</h3>
    <div className="bg-gray-700-custom/50 rounded-lg p-4">
      <div className="flex space-x-2 mb-4 border-b border-gray-600-custom pb-2">
        <button className="px-4 py-2 text-gamepulse-yellow border-b-2 border-gamepulse-yellow font-semibold text-sm">Single</button>
        <button className="px-4 py-2 text-gray-400 hover:text-white text-sm">Multi</button>
      </div>
      <div className="bg-gray-900-custom rounded-lg p-3 text-white text-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Liverpool FC - Manchester United</span>
          <button className="text-gray-400 hover:text-white"><FaTimes /></button>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gamepulse-blue font-bold text-lg">1X2</span>
          <span className="text-gamepulse-blue font-bold text-lg">2.20</span> {/* This would be the selected odd */}
        </div>
        <div className="flex justify-between items-center bg-gray-800-custom rounded-full px-4 py-2">
          <span className="text-gray-400">Bet amount</span>
          <input type="number" defaultValue="150.00" className="bg-transparent text-white w-24 text-right focus:outline-none" />
          <span className="text-gray-400">USD</span>
        </div>
      </div>
      <div className="text-sm mb-4">
        <div className="flex justify-between text-gray-400 mb-1">
          <span>ODDS:</span> <span className="text-gamepulse-yellow font-semibold">2.19</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Potential win:</span> <span className="font-bold text-gamepulse-yellow">330.00 USD</span>
        </div>
      </div>
      <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-darker text-white font-bold py-3 px-4 rounded-lg w-full text-lg">
        Place a bet
      </button>
    </div>
  </aside>
);


const LiveMatchesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900-custom text-white font-sans pt-16"> {/* Add pt-16 to account for fixed header height */}
      {/* Header Section */}
      <AppHeader />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 hidden md:block"> {/* Hide on small screens, show on medium and larger */}
          <LeftSidebar />
        </div>

        {/* Main Content (Featured Banner + Match Listings) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3"> {/* Takes full width on small, 3 columns on medium/large */}
          <FeaturedMatchBanner />
          <MatchListing />
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1 hidden md:block"> {/* Hide on small screens, show on medium and larger */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default LiveMatchesPage;