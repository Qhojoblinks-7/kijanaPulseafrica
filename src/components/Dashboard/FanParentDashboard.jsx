import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaBell, FaUserCircle, FaEdit, FaEye, FaPlus, FaHeart, FaComment,
  FaCheckCircle, FaUpload, FaPlayCircle, FaCalendarAlt, FaStar, FaBookOpen,
  FaCog, FaLock, FaQuestionCircle, FaSignOutAlt, FaHome, FaFootballBall
} from 'react-icons/fa';

// Mock data for the fan/parent profile
const fanParentData = {
  name: 'Sarah Mwangi',
  role: 'Fan/Parent',
  location: 'Nairobi, Kenya',
  motto: 'Passionate supporter of youth football. Proud parent of a rising star!',
  profilePicture: 'https://randomuser.me/api/portraits/women/67.jpg', // Placeholder image
  teamsFollowing: [
    { id: 't1', name: 'Greenwood High', icon: <FaFootballBall className="text-xl text-green-600" /> },
    { id: 't2', name: 'Starehe Boys', icon: <FaFootballBall className="text-xl text-yellow-600" /> },
  ],
  athletesFollowing: [
    { id: 'a1', name: 'James M.', profilePic: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'a2', name: 'David K.', profilePic: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 'a3', name: 'Michael S.', profilePic: 'https://randomuser.me/api/portraits/men/51.jpg' },
  ],
  recentActivity: [
    { id: 'ra1', type: 'comment', text: 'Commented on Greenwood vs. Starehe match', time: '1 day ago', icon: <FaComment className="text-gamepulse-orange-dark" /> },
    { id: 'ra2', type: 'like', text: 'Liked James Mwangi\'s goal highlight', time: '1 day ago', icon: <FaHeart className="text-red-500" /> },
    { id: 'ra3', type: 'join', text: 'Joined Kenya Youth football Fanatic community', time: '2 days ago', icon: <FaCheckCircle className="text-success-green" /> },
  ],
  notificationSettings: {
    liveScoreUpdates: true,
    matchReminders: true,
    newHighlights: false,
  },
};

const FanParentDashboard = () => {
  return (
    <div className="min-h-screen bg-neutral-light-gray-bg font-sans flex flex-col">
      {/* Header - A lighter, more minimal header for this page */}
      <header className="bg-white py-3 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-orange-dark hover:text-gamepulse-orange-light transition-colors">
          GamePulse
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-neutral-medium-gray hover:text-neutral-dark-gray transition-colors"><FaSearch className="text-xl" /></button>
          <button className="text-neutral-medium-gray hover:text-neutral-dark-gray transition-colors"><FaBell className="text-xl" /></button>
          <div className="flex items-center text-neutral-dark-gray text-sm font-semibold cursor-pointer">
            <FaUserCircle className="text-2xl mr-2 text-gamepulse-orange-dark" /> Sarah Mwangi
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow pt-16 pb-20 overflow-auto"> {/* Added pb-20 for bottom nav */}
        {/* Fan/Parent Header/Hero Section */}
        <section className="bg-gradient-to-br from-gamepulse-orange-dark to-gamepulse-orange-light py-8 px-4 text-center text-white relative">
          <div className="absolute top-4 right-4">
            {/* Small icon, not explicitly clear in image, but placeholder for potential settings */}
            <FaCog className="text-lg text-neutral-white opacity-75" />
          </div>
          <div className="relative inline-block mb-4">
            <img
              src={fanParentData.profilePicture}
              alt={fanParentData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {/* Small icon over profile pic, unclear what it is, using FaEdit as placeholder */}
            <div className="absolute bottom-0 right-0 bg-neutral-white text-gamepulse-orange-dark rounded-full p-2 text-sm border-2 border-gamepulse-orange-light">
              <FaEdit />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold mb-1">{fanParentData.name}</h1>
          <p className="text-lg font-semibold mb-2">
            {fanParentData.role} - {fanParentData.location}
          </p>
          <p className="italic text-neutral-light-gray text-sm mb-4">
            "{fanParentData.motto}"
          </p>
          <Link to={`/public-profile/${fanParentData.name.toLowerCase().replace(/\s/g, '-')}`} className="bg-white text-gamepulse-orange-dark px-6 py-2 rounded-full flex items-center justify-center mx-auto w-fit font-bold shadow-md hover:bg-neutral-light-gray-bg transition-colors">
            <FaEye className="mr-2" /> View Public Profile
          </Link>
        </section>

        <div className="container mx-auto px-4 py-6 space-y-6">

          {/* My Favorites Section */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">My Favorites</h2>

            <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Teams Following</h3>
            <div className="space-y-3 mb-6">
              {fanParentData.teamsFollowing.map(team => (
                <div key={team.id} className="flex items-center bg-neutral-light-gray-bg rounded-lg p-3">
                  {team.icon}
                  <span className="ml-3 text-neutral-dark-gray font-medium">{team.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Athletes I'm Following</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {fanParentData.athletesFollowing.map(athlete => (
                <div key={athlete.id} className="flex flex-col items-center text-center">
                  <img src={athlete.profilePic} alt={athlete.name} className="w-16 h-16 rounded-full object-cover border-2 border-gamepulse-orange-light mb-2" />
                  <p className="text-xs text-neutral-dark-gray font-medium">{athlete.name}</p>
                </div>
              ))}
            </div>

            <button className="w-full bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full font-bold transition-colors">
              <FaPlus className="mr-2 inline-block" /> Discover More
            </button>
          </section>

          {/* Recent Activity Section */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Recent Activity</h2>
            <div className="space-y-4 mb-6">
              {fanParentData.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start text-neutral-dark-gray text-sm">
                  <span className="flex-shrink-0 mt-1 mr-3">{activity.icon}</span>
                  <div>
                    <p>{activity.text}</p>
                    <p className="text-xs text-neutral-medium-gray">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button className="flex-1 bg-neutral-light-gray-bg hover:bg-neutral-light-gray text-neutral-dark-gray px-5 py-2 rounded-full font-bold transition-colors">
                View All Activity
              </button>
              <button className="flex-1 bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full font-bold transition-colors flex items-center justify-center">
                <FaUpload className="mr-2" /> Upload Highlight
              </button>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-neutral-dark-gray text-sm font-medium">Live Score Updates</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={fanParentData.notificationSettings.liveScoreUpdates} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-light-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-medium-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gamepulse-orange-dark"></div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-dark-gray text-sm font-medium">Match Reminders</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={fanParentData.notificationSettings.matchReminders} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-light-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-medium-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gamepulse-orange-dark"></div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-neutral-dark-gray text-sm font-medium">New Highlights</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={fanParentData.notificationSettings.newHighlights} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-light-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-medium-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gamepulse-orange-dark"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Explore GamePulse */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Explore GamePulse</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/live-matches" className="bg-gamepulse-orange-dark text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
                <FaPlayCircle className="text-4xl mb-2" /> Live Matches
              </Link>
              <Link to="/upcoming-talents" className="bg-success-green text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
                <FaCalendarAlt className="text-4xl mb-2" /> Upcoming Talents
              </Link>
              <Link to="/highlights" className="bg-gamepulse-yellow text-neutral-dark-gray rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
                <FaStar className="text-4xl mb-2" /> My Highlights
              </Link>
              <Link to="/digital-classroom" className="bg-gamepulse-blue-light text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
                <FaBookOpen className="text-4xl mb-2" /> Digital Classroom
              </Link>
            </div>
          </section>

          {/* Settings & Tools */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Settings & Tools</h2>
            <ul className="space-y-4">
              <li>
                <Link to="/edit-profile" className="flex items-center text-neutral-dark-gray hover:text-gamepulse-orange-dark font-semibold text-sm transition-colors">
                  <FaEdit className="mr-3 text-lg text-neutral-medium-gray" /> Edit Profile
                </Link>
              </li>
              <li>
                <Link to="/privacy-settings" className="flex items-center text-neutral-dark-gray hover:text-gamepulse-orange-dark font-semibold text-sm transition-colors">
                  <FaLock className="mr-3 text-lg text-neutral-medium-gray" /> Privacy Settings
                </Link>
              </li>
              <li>
                <Link to="/help-support" className="flex items-center text-neutral-dark-gray hover:text-gamepulse-orange-dark font-semibold text-sm transition-colors">
                  <FaQuestionCircle className="mr-3 text-lg text-neutral-medium-gray" /> Help & Support
                </Link>
              </li>
              <li>
                <button className="w-full flex items-center text-red-500 hover:text-red-700 font-semibold text-sm transition-colors pt-4 border-t border-neutral-light-gray mt-4">
                  <FaSignOutAlt className="mr-3 text-lg" /> Log Out
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Bottom Navigation (Fixed) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-neutral-light-gray py-3 flex justify-around items-center md:hidden z-50">
        <Link to="/" className="flex flex-col items-center text-neutral-medium-gray hover:text-gamepulse-orange-dark transition-colors text-xs">
          <FaHome className="text-xl mb-1" /> Home
        </Link>
        <Link to="/matches" className="flex flex-col items-center text-neutral-medium-gray hover:text-gamepulse-orange-dark transition-colors text-xs">
          <FaFootballBall className="text-xl mb-1" /> Matches
        </Link>
        <Link to="/highlights" className="flex flex-col items-center text-neutral-medium-gray hover:text-gamepulse-orange-dark transition-colors text-xs">
          <FaStar className="text-xl mb-1" /> Highlights
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gamepulse-orange-dark text-xs">
          <FaUserCircle className="text-xl mb-1" /> Profile
        </Link>
      </nav>
    </div>
  );
};


export default FanParentDashboard;