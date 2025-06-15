// src/components/Dashboard/ScoutDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserPlus, FaEye, FaBell, FaFileAlt , FaChartBar} from 'react-icons/fa'; // Icons for scout
import { MdOutlineStars } from "react-icons/md"; // Icon for talent

function ScoutDashboard({ user }) {
  const scout = user;

  if (!scout) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Scout Data Missing</h2>
        <p className="mt-4 text-gray-600">Unable to load your scout dashboard. Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Hero/Scout Header Section */}
      <section
        className="relative h-[45vh] lg:h-[40vh] bg-cover bg-center flex items-end pb-10 text-white rounded-lg shadow-xl overflow-hidden mb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(/images/scout-dashboard-banner.webp)`, // Placeholder banner
          backgroundAttachment: 'local',
        }}
      >
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center md:items-end justify-between w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 font-heading drop-shadow-lg">
              Welcome, {scout.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md flex items-center">
              <FaSearch className="mr-3 text-gamepulse-orange" /> Your Talent Scouting Hub
            </p>
            <p className="text-lg md:text-xl drop-shadow-md flex items-center">
              <MdOutlineStars className="mr-3" /> Focus Regions: {scout.regionsOfInterest?.join(', ') || 'Global'}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <button
              onClick={() => alert("Simulating 'Advanced Search' action")}
              className="bg-gamepulse-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaSearch className="mr-2" /> Advanced Search
            </button>
            <button
              onClick={() => alert("Simulating 'Manage Watchlist' action")}
              className="bg-gamepulse-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaEye className="mr-2" /> Manage Watchlist
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column (Watchlist, New Highlights Feed) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Watched Athletes / Watchlist Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaEye className="mr-3 text-gamepulse-orange" /> Your Tracked Athletes
            </h2>
            {scout.trackedAthletes && scout.trackedAthletes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scout.trackedAthletes.map((athlete, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">{athlete.name} - {athlete.sport}</h3>
                    <p className="text-gray-600 text-sm">Potential: {athlete.potential}</p>
                    <p className="text-gray-700 mt-2">{athlete.notes || 'No specific notes.'}</p>
                    <Link to={`/athlete/${athlete.id}`} className="text-gamepulse-blue text-sm hover:underline mt-2 block">View Full Profile</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No athletes on your watchlist yet. Start discovering talent!</p>
            )}
          </section>

          {/* New Highlights Feed */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaBell className="mr-3 text-gamepulse-blue" /> New & Trending Highlights
            </h2>
            {scout.newHighlights && scout.newHighlights.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {scout.newHighlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
                    <img src={highlight.thumbnail || "https://via.placeholder.com/100x70?text=Highlight"} alt={highlight.title} className="w-24 h-16 object-cover rounded mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{highlight.title}</h3>
                      <p className="text-gray-600 text-sm">{highlight.athleteName} - {highlight.date}</p>
                      <Link to={`/highlights/${highlight.id}`} className="text-gamepulse-blue text-sm hover:underline mt-1 block">Watch Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No new highlights matching your interests.</p>
            )}
          </section>
        </div>

        {/* Right Column (Quick Search, Reports) */}
        <div className="lg:col-span-1 space-y-10">
          {/* Quick Search */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaSearch className="mr-3 text-gamepulse-orange" /> Quick Search
            </h2>
            <input
              type="text"
              placeholder="Search athletes by name, sport..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-gamepulse-blue focus:border-gamepulse-blue"
            />
            <button className="mt-4 w-full bg-gamepulse-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Search
            </button>
          </section>

          {/* Reports & Analytics */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaFileAlt className="mr-3 text-gamepulse-blue" /> Reports
            </h2>
            <p className="text-gray-700 mb-4">Generate scouting reports and talent analytics.</p>
            <Link to="/scout/reports" className="bg-gamepulse-teal/10 text-gamepulse-teal hover:bg-gamepulse-teal/20 p-3 rounded-lg flex items-center justify-center">
              <FaChartBar className="mr-3" /> View All Reports
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ScoutDashboard;