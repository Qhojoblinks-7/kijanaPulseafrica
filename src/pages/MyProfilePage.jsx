import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaUpload, FaEye, FaPlus, FaTrophy, FaStar, FaPlay, FaShareAlt, FaBell, FaUserCircle, FaSearch, FaChevronDown, FaChartLine, FaBookOpen, FaUsers, FaLink } from 'react-icons/fa';

// Mock data for the athlete profile
const athleteData = {
  id: 'kwame-asante-123',
  name: 'Kwame Asante',
  position: 'Striker',
  team: 'Accra Sports Academy',
  location: 'Accra, Ghana',
  xpRank: 1247,
  motto: 'Future Black Stars striker with Olympic dreams',
  profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg', // Placeholder image
  stats: {
    goals: 23,
    assists: 12,
    appearances: 18,
    passAccuracy: 87, // Percentage
  },
  achievements: [
    { id: 'ach1', text: 'Top Scorer - Regional Championship 2024' },
    { id: 'ach2', text: 'Player of the Match - vs Tema Academy' },
  ],
  story: `Started playing football at age 7 in the streets of Accra. My dream is to represent Ghana in the World Cup and inspire the next generation of African footballers. Every training session brings me closer to this goal.`,
  skills: ['Leadership', 'Speed', 'Finishing', 'Teamwork', 'Vision'],
  digitalClassroomProgress: [
    { name: 'Nutrition Basics', progress: 80 },
    { name: 'Mental Toughness', progress: 72 },
  ],
  network: {
    followers: 234,
    connections: 12,
    following: 5,
  },
  contactPreferences: {
    inAppMessaging: true,
    showEmailToScouts: false,
  },
  socialMedia: {
    instagram: 'kwame_football',
    tiktok: 'kwame_highlights',
  },
  highlights: [
    { id: 'h1', title: 'Featured Highlight Reel', views: '2,341', thumbnailUrl: 'https://via.placeholder.com/400x225/1A202C/FFFFFF?text=Featured+Highlight' },
    { id: 'h2', title: 'Hat-trick vs Kumasi Academy', views: '1,234', thumbnailUrl: 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=Highlight+1' },
    { id: 'h3', title: 'Best Skills Compilation', views: '882', thumbnailUrl: 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=Highlight+2' },
    { id: 'h4', title: 'Amazing Free Kick Goal', views: '567', thumbnailUrl: 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=Highlight+3' },
    { id: 'h5', title: 'Defensive Masterclass', views: '401', thumbnailUrl: 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=Highlight+4' },
    { id: 'h6', title: 'Team Play & Assists', views: '320', thumbnailUrl: 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=Highlight+5' },
  ]
};

const MyProfilePage = () => {
  const navigate = useNavigate();

  // --- Header Navigation Handlers ---
  // Using Link for actual navigation where applicable, and buttons with navigate for others
  const handleSearchClick = () => {
    console.log('Search button clicked! (Opens search modal/page)');
    alert('Simulating: Open search functionality!');
  };

  const handleNotificationsClick = () => {
    console.log('Notifications button clicked! (Opens notification panel)');
    alert('Simulating: Show notifications!');
  };

  const handleUserProfileClick = () => {
    console.log('User profile clicked! (Opens user settings/account menu)');
    alert('Simulating: Open user account menu!');
  };

  // --- Athlete Header Section Handlers ---
  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked!');
    alert('Simulating: Navigate to Edit Profile form!');
  };

  // --- My Game Section Handlers ---
  const handleAddEditStatsClick = () => {
    console.log('Add/Edit Stats button clicked!');
    alert('Simulating: Open Stats Editor!');
  };

  const handleAddAchievementClick = () => {
    console.log('Add Achievement button clicked!');
    alert('Simulating: Open Add Achievement modal!');
  };

  // --- My Highlights Section Handlers ---
  const handleAllHighlightsDropdown = () => {
    console.log('All Highlights dropdown clicked!');
    alert('Simulating: Open Highlights filter dropdown!');
  };

  const handleHighlightPlay = (highlightTitle) => {
    console.log(`Playing highlight: "${highlightTitle}"`);
    alert(`Simulating: Playing video for "${highlightTitle}"`);
  };

  const handleShareHighlight = (highlightTitle) => {
    console.log(`Sharing highlight: "${highlightTitle}"`);
    alert(`Simulating: Share option for "${highlightTitle}"`);
  };

  // --- Digital Classroom Section Handlers ---
  const handleContinueLearningClick = () => {
    console.log('Continue Learning button clicked!');
    navigate('/digital-classroom'); // Actual navigation
  };

  // --- My Network & Contact Section Handlers ---
  const handleInAppMessagingToggle = () => {
    console.log('Toggle In-app messaging preference');
    alert('Simulating: Toggling In-app Messaging Preference!');
  };

  const handleShowEmailToScoutsToggle = () => {
    console.log('Toggle Show email to scouts preference');
    alert('Simulating: Toggling Email Visibility to Scouts Preference!');
  };

  const handleSocialMediaLinkClick = (platform, username) => {
    const url = platform === 'instagram'
      ? `https://www.instagram.com/${username}`
      : `https://www.tiktok.com/@${username}`;
    console.log(`Opening social media link: ${url}`);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gamepulse-dark text-neutral-white font-sans">      

      {/* Main Content Area - Adjusted pt for fixed header, mobile-first padding */}
      <div className="pt-16 md:pt-20 container mx-auto px-2 py-4 md:px-4 md:py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {/* Athlete Header/Hero Section - Responsive flex/layout */}
          <section className="bg-success-green/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center relative overflow-hidden text-center md:text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-gamepulse-blue-dark via-gamepulse-dark to-success-green/20 opacity-80 rounded-xl z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center w-full">
              <img
                src={athleteData.profilePicture}
                alt={athleteData.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-3 md:border-4 border-gamepulse-yellow shadow-lg flex-shrink-0 mb-3 md:mb-0 md:mr-6"
              />
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-neutral-white mb-1">{athleteData.name}</h1>
                <p className="text-base md:text-lg text-gamepulse-yellow font-semibold mb-1 md:mb-2">
                  {athleteData.position} - {athleteData.team}
                </p>
                <p className="text-xs md:text-sm text-neutral-light-gray mb-1">
                  {athleteData.location} <span className="font-bold ml-2 md:ml-4">XP Rank: {athleteData.xpRank}</span>
                </p>
                <p className="italic text-neutral-medium-gray text-xs md:text-sm mt-2">
                  "{athleteData.motto}"
                </p>
              </div>
              <div className="relative z-10 flex flex-col space-y-2 md:space-y-3 mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={handleEditProfileClick}
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <Link
                  to="/upload-highlight" // Updated route for upload highlight
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaUpload className="mr-2" /> Upload Highlight
                </Link>
                <Link
                  to={`/athlete/${athleteData.id}`} // Updated route for public profile
                  className="bg-neutral-dark-gray hover:bg-neutral-black text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaEye className="mr-2" /> View Public Profile
                </Link>
              </div>
            </div>
          </section>

          {/* My Game: Stats & Progress - Responsive grid and padding */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaChartLine className="mr-2 text-gamepulse-yellow" /> My Game: Stats & Progress
              </h2>
              <button
                onClick={handleAddEditStatsClick}
                className="bg-gamepulse-blue-dark hover:bg-gamepulse-blue text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center font-semibold transition-colors"
              >
                <FaPlus className="mr-2" /> Add/Edit Stats
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              {Object.entries(athleteData.stats).map(([key, value]) => (
                <div key={key} className="bg-gamepulse-blue-dark rounded-lg p-3 md:p-4 text-center">
                  <p className="text-neutral-medium-gray text-xs md:text-sm mb-1">{key.replace(/([A-Z])/g, ' $1').trim().replace('Accuracy', ' Accuracy')}</p>
                  <p className="text-2xl md:text-3xl font-bold text-success-green">{value}{key === 'passAccuracy' ? '%' : ''}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Performance Over Time (Coming Soon)</h3>
            <div className="bg-neutral-black/50 h-32 md:h-48 rounded-lg flex items-center justify-center text-neutral-medium-gray italic mb-4 md:mb-6 text-sm">
              [Placeholder for Performance Over Time Graph]
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 md:mb-3">
              <h3 className="text-base md:text-lg font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaTrophy className="mr-2 text-gamepulse-yellow" /> Recent Achievements
              </h3>
              <button
                onClick={handleAddAchievementClick}
                className="bg-gamepulse-blue-dark hover:bg-gamepulse-blue text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center font-semibold transition-colors"
              >
                <FaPlus className="mr-2" /> Add Achievement
              </button>
            </div>
            <ul className="space-y-2">
              {athleteData.achievements.map((ach) => (
                <li key={ach.id} className="bg-neutral-blue-dark rounded-lg p-2.5 md:p-3 text-neutral-light-gray flex items-center text-sm">
                  <FaStar className="text-gamepulse-yellow mr-2 md:mr-3" /> {ach.text}
                </li>
              ))}
            </ul>
          </section>

          {/* My Highlights - Responsive layout */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaPlay className="mr-2 text-gamepulse-yellow" /> My Highlights
              </h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleAllHighlightsDropdown}
                  className="bg-neutral-black/30 hover:bg-neutral-black text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors flex items-center justify-center"
                >
                  All Highlights <FaChevronDown className="ml-2 inline-block" />
                </button>
                <Link
                  to="/upload-highlight" // Use Link for navigation
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center justify-center font-semibold transition-colors"
                >
                  <FaUpload className="mr-2" /> Upload Now
                </Link>
              </div>
            </div>

            {/* Featured Highlight */}
            {athleteData.highlights[0] && (
              <div
                className="relative w-full rounded-lg overflow-hidden mb-4 md:mb-6 group cursor-pointer"
                onClick={() => handleHighlightPlay(athleteData.highlights[0].title)}
              >
                <img src={athleteData.highlights[0].thumbnailUrl} alt={athleteData.highlights[0].title} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-gamepulse-yellow text-4xl md:text-5xl" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-base md:text-lg font-bold text-neutral-white">{athleteData.highlights[0].title}</h3>
                  <p className="text-xxs md:text-xs text-neutral-medium-gray">{athleteData.highlights[0].views} views</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleShareHighlight(athleteData.highlights[0].title); }}
                  className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/50 p-1.5 md:p-2 rounded-full text-neutral-white text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <FaShareAlt />
                </button>
              </div>
            )}

            {/* Other Highlights (Horizontal Scroll) */}
            <div className="flex overflow-x-auto pb-2 scrollbar-hide">
              {athleteData.highlights.slice(1).map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex-shrink-0 w-36 md:w-40 mr-3 md:mr-4 bg-neutral-blue-dark rounded-lg overflow-hidden cursor-pointer group hover:bg-neutral-blue-dark/80 transition-colors"
                  onClick={() => handleHighlightPlay(highlight.title)}
                >
                  <div className="relative w-full h-20 md:h-24 overflow-hidden">
                    <img src={highlight.thumbnailUrl} alt={highlight.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaPlay className="text-gamepulse-yellow text-2xl md:text-3xl" />
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-neutral-white leading-tight mb-1">{highlight.title}</p>
                    <p className="text-xxs text-neutral-medium-gray">{highlight.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">

          {/* My Story & Aspirations - Responsive padding and sticky position */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6 h-fit sticky top-16 md:top-20">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaBookOpen className="mr-2 text-gamepulse-yellow" /> My Story & Aspirations
            </h2>
            <p className="text-neutral-light-gray text-sm mb-3 md:mb-4">
              {athleteData.story}
            </p>
            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Key Skills & Attributes</h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {athleteData.skills.map((skill) => (
                <span key={skill} className="bg-gamepulse-blue-dark text-neutral-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Digital Classroom Progress - Responsive padding */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaBookOpen className="mr-2 text-gamepulse-yellow" /> Digital Classroom Progress
            </h2>
            {athleteData.digitalClassroomProgress.map((course) => (
              <div key={course.name} className="mb-3 md:mb-4 last:mb-0">
                <div className="flex justify-between text-xs md:text-sm text-neutral-light-gray mb-1">
                  <span>{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-neutral-blue-dark rounded-full h-2 md:h-2.5">
                  <div
                    className="bg-success-green h-2 md:h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <button
              onClick={handleContinueLearningClick}
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 mt-3 md:mt-4 w-full rounded-full font-bold text-sm transition-colors"
            >
              Continue Learning
            </button>
          </section>

          {/* My Network & Contact - Responsive padding and text sizes */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaUsers className="mr-2 text-gamepulse-yellow" /> My Network & Contact
            </h2>
            <div className="grid grid-cols-3 text-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network.followers}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Followers</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network.connections}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Connections</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network.following}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Following</p>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Contact Preferences</h3>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between items-center text-neutral-light-gray text-sm">
                <span>Allow in-app messaging</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={athleteData.contactPreferences.inAppMessaging}
                    onChange={handleInAppMessagingToggle}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-neutral-medium-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-dark-gray after:border after:rounded-full after:h-4 md:h-5 after:w-4 md:w-5 after:transition-all peer-checked:bg-success-green"></div>
                </label>
              </div>
              <div className="flex justify-between items-center text-neutral-light-gray text-sm">
                <span>Show email to scouts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={athleteData.contactPreferences.showEmailToScouts}
                    onChange={handleShowEmailToScoutsToggle}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-neutral-medium-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-dark-gray after:border after:rounded-full after:h-4 md:h-5 after:w-4 md:w-5 after:transition-all peer-checked:bg-success-green"></div>
                </label>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Social Media</h3>
            <div className="space-y-2 md:space-y-3">
              <div
                className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                onClick={() => handleSocialMediaLinkClick('instagram', athleteData.socialMedia.instagram)}
              >
                <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`instagram.com/${athleteData.socialMedia.instagram}`}</span>
              </div>
              <div
                className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                onClick={() => handleSocialMediaLinkClick('tiktok', athleteData.socialMedia.tiktok)}
              >
                <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`tiktok.com/@${athleteData.socialMedia.tiktok}`}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;