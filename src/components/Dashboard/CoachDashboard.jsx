// src/components/Dashboard/CoachDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaChartBar, FaPlus, FaEnvelopeOpenText,FaFileAlt,FaRegLightbulb } from 'react-icons/fa'; // Icons for coach
import { MdOutlineSportsFootball } from "react-icons/md"; // Generic sport icon

function CoachDashboard({ user }) {
  const coach = user;

  if (!coach) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Coach Data Missing</h2>
        <p className="mt-4 text-gray-600">Unable to load your coach dashboard. Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Hero/Coach Header Section */}
      <section
        className="relative h-[45vh] lg:h-[40vh] bg-cover bg-center flex items-end pb-10 text-white rounded-lg shadow-xl overflow-hidden mb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(/images/coach-dashboard-banner.webp)`, // Placeholder banner
          backgroundAttachment: 'local',
        }}
      >
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center md:items-end justify-between w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 font-heading drop-shadow-lg">
              Hello, Coach {coach.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md flex items-center">
              <MdOutlineSportsFootball className="mr-3 text-gamepulse-orange" /> Managing {coach.teamName || 'Your Team'}
            </p>
            <p className="text-lg md:text-xl drop-shadow-md flex items-center">
              <FaUsers className="mr-3" /> Leading {coach.teams?.map(t => t.name).join(', ') || 'Your Teams'}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <button
              onClick={() => alert("Simulating 'Add New Player' action")}
              className="bg-gamepulse-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> Add New Player
            </button>
            <button
              onClick={() => alert("Simulating 'Manage Roster' action")}
              className="bg-gamepulse-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaUsers className="mr-2" /> Manage Roster
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column (Team Roster, Upcoming Events) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Team Roster Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaUsers className="mr-3 text-gamepulse-orange" /> Your Team Roster
            </h2>
            <div className="overflow-x-auto">
              {coach.roster && coach.roster.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gamepulse-dark text-white">
                      <th className="py-3 px-4 text-left">Player Name</th>
                      <th className="py-3 px-4 text-left">Position</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coach.roster.map((player, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                        <td className="py-3 px-4">{player.name}</td>
                        <td className="py-3 px-4">{player.position || 'N/A'}</td> {/* Assuming position might be available */}
                        <td className="py-3 px-4">
                          <Link to={`/athlete/${player.id}`} className="text-blue-600 hover:underline">View Profile</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600 text-center">No players added to your roster yet.</p>
              )}
            </div>
          </section>

          {/* Upcoming Events/Matches Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaCalendarAlt className="mr-3 text-gamepulse-blue" /> Upcoming Matches & Events
            </h2>
            {coach.upcomingEvents && coach.upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {coach.upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                    <p className="text-gray-600 text-sm">Date: {event.date} | Location: {event.location || 'TBD'}</p>
                    <p className="text-gray-700 mt-2">{event.description || 'No description available.'}</p>
                    {/* Add more event details or a button to manage event */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No upcoming events scheduled.</p>
            )}
          </section>

          {/* Notifications/Messages Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-teal">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaEnvelopeOpenText className="mr-3 text-gamepulse-orange" /> Notifications
            </h2>
            {coach.notifications && coach.notifications.length > 0 ? (
              <ul className="space-y-3">
                {coach.notifications.map((notif, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700">
                    <p><span className="font-semibold">{notif.message}</span> - <span className="text-sm text-gray-500">{notif.date || 'Today'}</span></p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">You have no new notifications.</p>
            )}
          </section>
        </div>

        {/* Right Column (Quick Stats, Recruitment Needs - place specific coach data here) */}
        <div className="lg:col-span-1 space-y-10">
          {/* Team Performance Overview */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaChartBar className="mr-3 text-gamepulse-orange" /> Team Overview
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700"><strong>Team Size:</strong> {coach.roster?.length || 0} players</p>
              <p className="text-lg text-gray-700"><strong>Wins (Season):</strong> {coach.teamStats?.wins || 'N/A'}</p>
              <p className="text-lg text-gray-700"><strong>Losses (Season):</strong> {coach.teamStats?.losses || 'N/A'}</p>
              {/* Add more relevant team stats here */}
            </div>
          </section>

          {/* Recent Match Reports/Analysis */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaFileAlt className="mr-3 text-gamepulse-blue" /> Recent Match Reports
            </h2>
            {coach.matchReports && coach.matchReports.length > 0 ? (
              <div className="space-y-3">
                {coach.matchReports.map((report, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                    <Link to={`/coach/match-report/${report.id}`} className="text-gamepulse-blue text-sm hover:underline mt-1 block">View Report</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No match reports available.</p>
            )}
          </section>

          {/* Quick Actions / Important Links */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-dark">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaRegLightbulb className="mr-3 text-gamepulse-blue" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Link to="/coach/messages" className="bg-gamepulse-blue/10 text-gamepulse-blue hover:bg-gamepulse-blue/20 p-3 rounded-lg flex items-center">
                <FaEnvelopeOpenText className="mr-3" /> View Messages
              </Link>
              <Link to="/coach/calendar" className="bg-gamepulse-orange/10 text-gamepulse-orange hover:bg-gamepulse-orange/20 p-3 rounded-lg flex items-center">
                <FaCalendarAlt className="mr-3" /> Team Calendar
              </Link>
              {/* Add more coach-specific links here */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CoachDashboard;