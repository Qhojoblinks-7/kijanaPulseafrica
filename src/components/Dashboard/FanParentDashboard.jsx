// src/components/Dashboard/FanParentDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaCalendarCheck, FaNewspaper, FaChild } from 'react-icons/fa'; // Icons for fan/parent
import { MdOutlinePlayCircleFilled } from "react-icons/md"; // Icon for highlights

function FanParentDashboard({ user }) {
  const fan = user; // Renamed to 'fan' for clarity, but it's the same user object

  if (!fan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Fan/Parent Data Missing</h2>
        <p className="mt-4 text-gray-600">Unable to load your dashboard. Please try logging in again.</p>
      </div>
    );
  }

  // Determine if the user is explicitly a 'parent' or just a 'fan'
  const isParent = fan.userType === 'parent'; // Assuming you might have a specific 'parent' userType or flag

  return (
    <div className="bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Hero/Fan/Parent Header Section */}
      <section
        className="relative h-[45vh] lg:h-[40vh] bg-cover bg-center flex items-end pb-10 text-white rounded-lg shadow-xl overflow-hidden mb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(/images/fan-dashboard-banner.webp)`, // Placeholder banner
          backgroundAttachment: 'local',
        }}
      >
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center md:items-end justify-between w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 font-heading drop-shadow-lg">
              Hello, {fan.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md flex items-center">
              <FaHeart className="mr-3 text-gamepulse-orange" /> Your Sports Journey
            </p>
            {isParent && (
              <p className="text-lg md:text-xl drop-shadow-md flex items-center">
                <FaChild className="mr-3" /> Supporting Your Young Athlete(s)
              </p>
            )}
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <button
              onClick={() => alert("Simulating 'Follow New Athletes' action")}
              className="bg-gamepulse-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaHeart className="mr-2" /> Follow More Athletes
            </button>
            {isParent && (
              <button
                onClick={() => alert("Simulating 'View Child's Profile' action")}
                className="bg-gamepulse-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <FaChild className="mr-2" /> My Child's Profile
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column (Followed Athletes/Team News, Upcoming Matches) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Followed Athletes/Team News */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaHeart className="mr-3 text-gamepulse-orange" /> Athletes & Teams You Follow
            </h2>
            {fan.followedAthletes && fan.followedAthletes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fan.followedAthletes.map((followedItem, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">{followedItem}</h3> {/* Assuming string names for now */}
                    <p className="text-gray-600 text-sm">Latest Update: New Highlight!</p>
                    {/* In a real app, you'd fetch more details and link to their profile */}
                    <Link to="/highlights" className="text-gamepulse-blue text-sm hover:underline mt-2 block">View Latest</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">Start following athletes and teams to see updates here!</p>
            )}
          </section>

          {/* Upcoming Matches Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaCalendarCheck className="mr-3 text-gamepulse-blue" /> Your Upcoming Matches
            </h2>
            {fan.upcomingMatches && fan.upcomingMatches.length > 0 ? (
              <div className="space-y-4">
                {fan.upcomingMatches.map((match, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">{match.team} vs {match.opponent}</h3>
                    <p className="text-gray-600 text-sm">Date: {match.date} | Time: {match.time} | Location: {match.location}</p>
                    {/* Add link to match details page */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No upcoming matches for your followed athletes/teams.</p>
            )}
          </section>
        </div>

        {/* Right Column (Latest Highlights, News Feed) */}
        <div className="lg:col-span-1 space-y-10">
          {/* Latest Highlights */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <MdOutlinePlayCircleFilled className="mr-3 text-gamepulse-orange" /> Latest Highlights
            </h2>
            {fan.latestHighlights && fan.latestHighlights.length > 0 ? (
              <div className="space-y-3">
                {fan.latestHighlights.map((highlight, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{highlight.title}</p>
                    <p className="text-sm text-gray-600">From [Athlete/Team Name]</p>
                    <Link to={`/highlights/${highlight.id}`} className="text-gamepulse-blue text-sm hover:underline mt-1 block">Watch Now</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No new highlights to show.</p>
            )}
          </section>

          {/* General Sports News */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaNewspaper className="mr-3 text-gamepulse-blue" /> Sports News
            </h2>
            <ul className="space-y-3">
              <li className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700">
                <p className="font-semibold">Local Tournament Kicks Off!</p>
                <p className="text-sm text-gray-600">June 14, 2025</p>
              </li>
              <li className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700">
                <p className="font-semibold">Top Scouts Visit Accra Academies</p>
                <p className="text-sm text-gray-600">June 12, 2025</p>
              </li>
              {/* More news items */}
            </ul>
            <Link to="/news" className="bg-gamepulse-teal/10 text-gamepulse-teal hover:bg-gamepulse-teal/20 p-3 rounded-lg flex items-center justify-center mt-4">
              <FaNewspaper className="mr-3" /> View All News
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FanParentDashboard;