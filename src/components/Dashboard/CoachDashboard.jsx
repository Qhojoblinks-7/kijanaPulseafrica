import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaBell, FaUserCircle, FaPlus, FaEye, FaUsers, FaChild, FaFootballBall,
  FaEdit, FaUpload, FaChartLine, FaTrophy, FaStar, FaLinkedin, FaWhatsapp,
  FaCog, FaBellSlash, FaLock, FaQuestionCircle, FaSignOutAlt, FaEnvelopeOpenText
} from 'react-icons/fa';

// Mock data for the coach profile
const coachData = {
  name: 'Samuel Adebayo',
  role: 'Coach',
  academy: 'Lagos High School Eagles',
  motto: 'Developing tomorrow\'s leaders through sport!',
  profilePicture: 'https://randomuser.me/api/portraits/men/80.jpg', // Placeholder image
  followers: 3,
  athletes: 251,
  scouts: 12,
  teams: [
    {
      id: 'team1',
      name: 'Lagos High School Eagles - U17',
      sport: 'Football',
      record: '10-2-1',
      status: 'In Season',
      lastMatch: { type: 'win', score: '2-1' },
    },
    {
      id: 'team2',
      name: 'Lagos High School Eagles - U15',
      sport: 'Football',
      record: '8-0-1',
      status: 'Training',
      nextMatch: 'on St. Paul\'s',
    },
  ],
  upcomingMatches: [
    { id: 'um1', team1: 'Eagles U17', team2: 'Thunder FC', date: 'Jul 20, 2024', time: '4:00 PM', location: 'Lagos Arena' },
  ],
  recentMatches: [
    { id: 'rm1', team1: 'Eagles U17', team2: 'Lions FC', score: '3-1', date: 'Jul 10, 2024' },
  ],
  teamAnalytics: {
    performance: 78, // percentage
    goalsScored: 42,
    goalsAgainst: 18,
    avgXPGain: 8.2,
    topPerformer: {
      name: 'Kemi Okafor',
      position: 'Forward',
      xpGain: 125,
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
    }
  },
  learningProgress: [
    { id: 'lc1', title: 'Tactical Masterclasses', progress: 85, status: 'Continue' },
    { id: 'lc2', title: 'Sports Psychology', progress: 100, status: 'Completed' },
  ],
  network: {
    followers: 127,
    following: 89,
    messages: 5,
  },
  socialMedia: {
    linkedin: 'samueladebayo_coach',
    whatsapp: '+23480xxxxxxxx', // Placeholder for whatsapp link/number
  }
};

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-neutral-light-gray-bg text-neutral-dark-gray font-sans">
      {/* Header - Light theme version */}
      <header className="bg-white py-3 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-blue-light hover:text-gamepulse-yellow transition-colors">
            GamePulse Africa
          </Link>
          <nav className="hidden lg:flex space-x-6">
            {['Dashboard', 'My Teams', 'Matches', 'Analytics', 'Learn & Grow'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-neutral-dark-gray hover:text-gamepulse-blue-light transition-colors text-sm font-semibold px-2 py-1 ${item === 'Dashboard' ? 'text-gamepulse-blue' : ''}`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-neutral-medium-gray hover:text-neutral-dark-gray transition-colors"><FaSearch className="text-xl" /></button>
          <button className="text-neutral-medium-gray hover:text-neutral-dark-gray transition-colors"><FaBell className="text-xl" /></button>
          <div className="flex items-center text-neutral-dark-gray text-sm font-semibold cursor-pointer">
            <FaUserCircle className="text-2xl mr-2 text-gamepulse-blue" /> Samuel Adebayo
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="pt-20 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Content Column (Left/Center on large screens) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Coach Header/Hero Section */}
          <section className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center shadow-md">
            <img
              src={coachData.profilePicture}
              alt={coachData.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-gamepulse-blue shadow-lg flex-shrink-0 mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-heading font-extrabold text-neutral-dark-gray mb-1">{coachData.name}</h1>
              <p className="text-lg text-gamepulse-blue font-semibold mb-2">
                {coachData.role} - {coachData.academy}
              </p>
              <p className="italic text-neutral-medium-gray text-sm mt-2">
                "{coachData.motto}"
              </p>
              <div className="flex justify-center md:justify-start space-x-6 mt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-gamepulse-blue">{coachData.followers}</p>
                  <p className="text-xs text-neutral-medium-gray">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gamepulse-blue">{coachData.athletes}</p>
                  <p className="text-xs text-neutral-medium-gray">Athletes</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gamepulse-blue">{coachData.scouts}</p>
                  <p className="text-xs text-neutral-medium-gray">Scouts</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3 mt-6 md:mt-0 md:ml-6 flex-shrink-0">
              <Link to={`/public-profile/${coachData.name.toLowerCase().replace(/\s/g, '-')}`} className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full flex items-center justify-center font-bold transition-colors">
                <FaEye className="mr-2" /> View Public Profile
              </Link>
            </div>
          </section>

          {/* My Teams & Rosters */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-dark-gray">My Teams & Rosters</h2>
              <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-4 py-2 rounded-full text-sm flex items-center font-semibold transition-colors">
                <FaPlus className="mr-2" /> Add Team
              </button>
            </div>
            <div className="space-y-4">
              {coachData.teams.map(team => (
                <div key={team.id} className="border border-neutral-light-gray rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-dark-gray">{team.name}</h3>
                    <p className="text-sm text-neutral-medium-gray">{team.sport} - Record: {team.record}</p>
                  </div>
                  <div className="text-sm text-neutral-medium-gray mt-2 sm:mt-0 sm:text-right">
                    {team.status === 'In Season' ? (
                      <p className="text-success-green font-semibold">{team.status}</p>
                    ) : (
                      <p className="text-orange-500 font-semibold">{team.status}</p>
                    )}
                    {team.lastMatch && <p>Last Match: {team.lastMatch.type} {team.lastMatch.score}</p>}
                    {team.nextMatch && <p>Next Match: {team.nextMatch}</p>}
                  </div>
                  <div className="flex space-x-2 mt-3 sm:mt-0">
                    <button className="bg-neutral-light-gray text-neutral-dark-gray px-3 py-1 rounded-full text-xs font-semibold hover:bg-neutral-medium-gray transition-colors">
                      Manage Team
                    </button>
                    <button className="text-gamepulse-blue border border-gamepulse-blue px-3 py-1 rounded-full text-xs font-semibold hover:bg-gamepulse-blue hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Matches & Events */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-dark-gray">My Matches & Events</h2>
              <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-4 py-2 rounded-full text-sm flex items-center font-semibold transition-colors">
                <FaPlus className="mr-2" /> Add Match
              </button>
            </div>

            <h3 className="text-lg font-bold text-neutral-dark-gray mb-3">Upcoming Matches</h3>
            <div className="space-y-3 mb-6">
              {coachData.upcomingMatches.map(match => (
                <div key={match.id} className="border border-neutral-light-gray rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="text-neutral-dark-gray font-semibold">{match.team1} vs {match.team2}</p>
                    <p className="text-sm text-neutral-medium-gray">{match.date} - {match.time} ({match.location})</p>
                  </div>
                  <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                    Setup
                  </button>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-neutral-dark-gray mb-3">Recent Matches</h3>
            <div className="space-y-3">
              {coachData.recentMatches.map(match => (
                <div key={match.id} className="border border-neutral-light-gray rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="text-neutral-dark-gray font-semibold">{match.team1} vs {match.team2}</p>
                    <p className="text-sm text-neutral-medium-gray">{match.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gamepulse-blue text-lg font-bold">{match.score}</span>
                    <button className="text-gamepulse-blue border border-gamepulse-blue px-3 py-1 rounded-full text-xs font-semibold hover:bg-gamepulse-blue hover:text-white transition-colors flex items-center">
                      <FaUpload className="mr-1" /> Upload Highlights
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Analytics */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Team Analytics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gamepulse-blue/10 rounded-lg p-4 text-center">
                <p className="text-neutral-medium-gray text-sm mb-1">Team Performance This Month</p>
                <p className="text-3xl font-bold text-gamepulse-blue">{coachData.teamAnalytics.performance}%</p>
              </div>
              <div className="bg-success-green/10 rounded-lg p-4 text-center">
                <p className="text-neutral-medium-gray text-sm mb-1">Goals Scored</p>
                <p className="text-3xl font-bold text-success-green">{coachData.teamAnalytics.goalsScored}</p>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4 text-center">
                <p className="text-neutral-medium-gray text-sm mb-1">Goals Against</p>
                <p className="text-3xl font-bold text-red-500">{coachData.teamAnalytics.goalsAgainst}</p>
              </div>
              <div className="bg-gamepulse-yellow/10 rounded-lg p-4 text-center">
                <p className="text-neutral-medium-gray text-sm mb-1">Avg. XP Gain</p>
                <p className="text-3xl font-bold text-gamepulse-yellow">{coachData.teamAnalytics.avgXPGain}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-neutral-dark-gray mb-3">Top Performer This Month</h3>
            <div className="flex items-center bg-neutral-light-gray rounded-lg p-3">
              <img src={coachData.teamAnalytics.topPerformer.profilePic} alt={coachData.teamAnalytics.topPerformer.name} className="w-10 h-10 rounded-full object-cover mr-3" />
              <div>
                <p className="font-semibold text-neutral-dark-gray">{coachData.teamAnalytics.topPerformer.name}</p>
                <p className="text-sm text-neutral-medium-gray">{coachData.teamAnalytics.topPerformer.position}</p>
              </div>
              <span className="ml-auto text-gamepulse-blue font-bold">+ {coachData.teamAnalytics.topPerformer.xpGain} XP</span>
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar on large screens) */}
        <div className="lg:col-span-1 space-y-6">

          {/* Coach's Corner: Learn & Grow */}
          <section className="bg-white rounded-xl p-6 shadow-md sticky top-20">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Coach's Corner: Learn & Grow</h2>
            <div className="space-y-4 mb-6">
              {coachData.learningProgress.map(course => (
                <div key={course.id}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-neutral-dark-gray font-semibold">{course.title}</p>
                    <span className={`text-xs font-semibold ${course.status === 'Completed' ? 'text-success-green' : 'text-gamepulse-blue'}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-light-gray rounded-full h-2">
                    <div
                      className={`${course.status === 'Completed' ? 'bg-success-green' : 'bg-gamepulse-blue'} h-2 rounded-full`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/digital-classroom" className="text-gamepulse-blue flex items-center justify-center hover:underline text-sm font-semibold">
                <FaPlus className="mr-2 text-gamepulse-blue" /> Explore More Courses
              </Link>
            </div>
          </section>

          {/* My Network */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">My Network</h2>
            <div className="grid grid-cols-3 text-center gap-4 mb-6">
              <div>
                <p className="text-2xl font-bold text-gamepulse-blue">{coachData.network.followers}</p>
                <p className="text-sm text-neutral-medium-gray">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gamepulse-blue">{coachData.network.following}</p>
                <p className="text-sm text-neutral-medium-gray">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gamepulse-blue">{coachData.network.messages}</p>
                <p className="text-sm text-neutral-medium-gray">Messages</p>
              </div>
            </div>
            <div className="flex space-x-3 mb-4">
              <button className="flex-1 bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
                Compose Message
              </button>
              <button className="flex-1 bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-4 py-2 rounded-full text-sm font-bold transition-colors">
                View Network
              </button>
            </div>
            <p className="text-neutral-medium-gray text-sm mb-2">Connect on Social</p>
            <div className="flex space-x-3 text-2xl">
              <a href={`https://linkedin.com/in/${coachData.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gamepulse-blue hover:text-gamepulse-blue-dark transition-colors">
                <FaLinkedin />
              </a>
              <a href={`https://wa.me/${coachData.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-success-green hover:text-success-green/80 transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </section>

          {/* Settings & Tools */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Settings & Tools</h2>
            <ul className="space-y-4">
              <li>
                <Link to="/edit-profile" className="flex justify-between items-center text-neutral-dark-gray hover:text-gamepulse-blue-light font-semibold text-sm transition-colors">
                  <span className="flex items-center"><FaEdit className="mr-3 text-lg text-neutral-medium-gray" /> Edit Profile</span>
                  <FaChevronDown className="rotate-270 text-neutral-medium-gray" />
                </Link>
              </li>
              <li>
                <Link to="/notification-preferences" className="flex justify-between items-center text-neutral-dark-gray hover:text-gamepulse-blue-light font-semibold text-sm transition-colors">
                  <span className="flex items-center"><FaBellSlash className="mr-3 text-lg text-neutral-medium-gray" /> Notification Preferences</span>
                  <FaChevronDown className="rotate-270 text-neutral-medium-gray" />
                </Link>
              </li>
              <li>
                <Link to="/privacy-settings" className="flex justify-between items-center text-neutral-dark-gray hover:text-gamepulse-blue-light font-semibold text-sm transition-colors">
                  <span className="flex items-center"><FaLock className="mr-3 text-lg text-neutral-medium-gray" /> Privacy Settings</span>
                  <FaChevronDown className="rotate-270 text-neutral-medium-gray" />
                </Link>
              </li>
              <li>
                <Link to="/help-support" className="flex justify-between items-center text-neutral-dark-gray hover:text-gamepulse-blue-light font-semibold text-sm transition-colors">
                  <span className="flex items-center"><FaQuestionCircle className="mr-3 text-lg text-neutral-medium-gray" /> Help & Support</span>
                  <FaChevronDown className="rotate-270 text-neutral-medium-gray" />
                </Link>
              </li>
              <li>
                <button className="w-full flex justify-between items-center text-red-500 hover:text-red-700 font-semibold text-sm transition-colors pt-4 border-t border-neutral-light-gray mt-4">
                  <span className="flex items-center"><FaSignOutAlt className="mr-3 text-lg" /> Log Out</span>
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};


export default CoachDashboard;