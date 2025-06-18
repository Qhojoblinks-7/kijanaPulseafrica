import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope, FaUserPlus, FaShareAlt, FaInstagram, FaWhatsapp, FaPlayCircle,
  FaCalendarAlt, FaStar, FaUserCircle, FaMapMarkerAlt, FaQuoteLeft, FaQuoteRight,
  FaComment, FaHeart, FaUserFriends, FaUsers, FaFootballBall, FaBasketballBall, FaRunning
} from 'react-icons/fa';

// Mock data for the public fan profile
const fanPublicData = {
  name: 'Amara Okafor',
  role: 'Fan / Parent',
  location: 'Lagos, Nigeria',
  motto: 'Proud supporter of African high school football. Cheering on tomorrow\'s stars and believing in the power of youth sports!',
  profilePicture: 'https://randomuser.me/api/portraits/women/42.jpg', // Placeholder image
  followers: 127,
  following: 89,
  highlightsShared: 45,
  athletesFollowing: [
    { id: 'a1', name: 'Kemi Adebayo', profilePic: 'https://randomuser.me/api/portraits/men/33.jpg' },
    { id: 'a2', name: 'David Mensah', profilePic: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 'a3', name: 'Asha Mwangi', profilePic: 'https://randomuser.me/api/portraits/women/52.jpg' },
    { id: 'a4', name: 'View All', profilePic: 'https://via.placeholder.com/64x64/FCCA46/0A1128?text=%2B10' }, // Placeholder for 'View All'
  ],
  sportsAndTeams: [
    'Football', 'Basketball', 'Track & Field', 'Lagos High School League'
  ],
  recentActivity: [
    { id: 'ra1', type: 'share', text: 'Shared: Amazing Goal by Kemi Adebayo', detail: 'Lagos High vs Victoria College', time: '2 hours ago', icon: <FaShareAlt className="text-gamepulse-orange-dark" /> },
    { id: 'ra2', type: 'like', text: 'Liked David\'s Championship Dunk', detail: 'Accra School Finals • 1 day ago', views: '1.2K views', icon: <FaHeart className="text-red-500" /> },
    { id: 'ra3', type: 'comment', text: 'Commented on Match Discussion', detail: '"Great performance by both teams!"', time: '2 days ago', icon: <FaComment className="text-gamepulse-blue-light" /> },
  ],
  communityGroups: [
    'Lagos Sports Parents Forum', 'Nigerian High School Football'
  ],
  followingSportsIn: [
    'Lagos, Nigeria', 'Accra, Ghana', 'Nairobi, Kenya'
  ],
};

const FanPublicProfilePage = () => {
  return (
    <div className="min-h-screen bg-neutral-light-gray-bg text-neutral-dark-gray font-sans">
      {/* Header - Minimal, as per public view */}
      <header className="bg-white py-3 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-orange-dark hover:text-gamepulse-orange-light transition-colors">
          GamePulse
        </Link>
        {/* Potentially add simple icons like search, notifications for guest view if needed */}
      </header>

      {/* Main Content Area */}
      <div className="pt-20 container mx-auto px-4 py-6 space-y-6">

        {/* Fan Info Section */}
        <section className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center shadow-md">
          <div className="relative mb-4 md:mb-0 md:mr-6 flex-shrink-0">
            <img
              src={fanPublicData.profilePicture}
              alt={fanPublicData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gamepulse-orange-dark shadow-lg"
            />
            {/* Small status/online indicator, placeholder for the green dot */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-success-green rounded-full border-2 border-white"></div>
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-heading font-extrabold text-neutral-dark-gray mb-1">
              {fanPublicData.name}
            </h1>
            <p className="text-lg text-gamepulse-orange-dark font-semibold mb-2">
              {fanPublicData.role} • {fanPublicData.location}
            </p>
            <p className="italic text-neutral-medium-gray text-sm mb-3">
              <FaQuoteLeft className="inline-block mr-1 text-xs" />{fanPublicData.motto}<FaQuoteRight className="inline-block ml-1 text-xs" />
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <button className="bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-white px-5 py-2 rounded-full flex items-center font-bold transition-colors">
                <FaUserPlus className="mr-2" /> Follow
              </button>
              <button className="bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center font-bold transition-colors">
                <FaEnvelope className="mr-2" /> Message
              </button>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 mt-4 text-neutral-dark-gray">
              <div className="text-center">
                <p className="text-xl font-bold">{fanPublicData.followers}</p>
                <p className="text-xs text-neutral-medium-gray">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{fanPublicData.following}</p>
                <p className="text-xs text-neutral-medium-gray">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{fanPublicData.highlightsShared}</p>
                <p className="text-xs text-neutral-medium-gray">Highlights Shared</p>
              </div>
            </div>
          </div>
        </section>

        {/* My Favorites Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">My Favorites</h2>

          <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Athletes Following ({fanPublicData.athletesFollowing.length})</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {fanPublicData.athletesFollowing.map(athlete => (
              <div key={athlete.id} className="flex flex-col items-center text-center">
                <img src={athlete.profilePic} alt={athlete.name} className="w-16 h-16 rounded-full object-cover border-2 border-gamepulse-orange-dark mb-2" />
                <p className="text-xs text-neutral-dark-gray font-medium">{athlete.name}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Sports & Teams</h3>
          <div className="flex flex-wrap gap-2">
            {fanPublicData.sportsAndTeams.map(item => (
              <span key={item} className="bg-neutral-light-gray-bg text-neutral-dark-gray px-4 py-2 rounded-full text-sm font-medium hover:bg-neutral-light-gray cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {fanPublicData.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start text-neutral-dark-gray text-sm">
                <span className="flex-shrink-0 mt-1 mr-3 text-lg">{activity.icon}</span>
                <div>
                  <p className="font-medium">{activity.text}</p>
                  <p className="text-xs text-neutral-medium-gray">{activity.detail}</p>
                  {activity.views && <p className="text-xs text-neutral-medium-gray">{activity.views}</p>}
                  <p className="text-xs text-neutral-medium-gray">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-neutral-light-gray-bg hover:bg-neutral-light-gray text-neutral-dark-gray px-5 py-2 rounded-full font-bold transition-colors">
              View All Activity
            </button>
          </div>
        </section>

        {/* Community & Interests Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Community & Interests</h2>
          <p className="text-sm text-neutral-medium-gray mb-4">
            Actively engaging with the GamePulse Africa community to promote youth sports development and connect talented athletes with opportunities.
          </p>

          <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Community Groups</h3>
          <div className="space-y-2 mb-6">
            {fanPublicData.communityGroups.map(group => (
              <div key={group} className="flex items-center text-neutral-dark-gray text-sm">
                <FaUsers className="mr-3 text-gamepulse-blue-light" /> {group}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Following Sports In</h3>
          <div className="flex flex-wrap gap-2">
            {fanPublicData.followingSportsIn.map(location => (
              <span key={location} className="bg-gamepulse-blue-light/10 text-gamepulse-blue-light px-4 py-2 rounded-full text-sm font-medium hover:bg-gamepulse-blue-light/20 cursor-pointer">
                {location}
              </span>
            ))}
          </div>
        </section>

        {/* Connect with Amara Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Connect with {fanPublicData.name}</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
            <button className="flex-1 bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full flex items-center justify-center font-bold transition-colors text-sm">
              <FaEnvelope className="mr-2" /> Send Message
            </button>
            <button className="flex-1 bg-neutral-light-gray-bg hover:bg-neutral-light-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center justify-center font-bold transition-colors text-sm">
              <FaShareAlt className="mr-2" /> Share Profile
            </button>
          </div>
          <p className="text-neutral-medium-gray text-sm mb-2">Social Media</p>
          <div className="flex space-x-3 text-2xl">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gamepulse-blue hover:text-gamepulse-blue-dark transition-colors">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-success-green hover:text-success-green/80 transition-colors">
              <FaWhatsapp />
            </a>
          </div>
        </section>

        {/* Discover More Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Discover More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/trending-highlights" className="bg-gamepulse-orange-dark text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
              <FaStar className="text-4xl mb-2" /> Trending Highlights
              <p className="text-sm font-normal mt-1">Check out the most popular plays this week.</p>
            </Link>
            <Link to="/upcoming-games" className="bg-success-green text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
              <FaCalendarAlt className="text-4xl mb-2" /> Upcoming Games
              <p className="text-sm font-normal mt-1">Don't miss the next big matches</p>
            </Link>
            <Link to="/athletes-to-watch" className="bg-gamepulse-yellow text-neutral-dark-gray rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
              <FaUserCircle className="text-4xl mb-2" /> Athletes to Watch
              <p className="text-sm font-normal mt-1">Rising stars you should follow</p>
            </Link>
            <Link to="/similar-fans" className="bg-gamepulse-blue-light text-white rounded-lg p-4 flex items-center justify-center flex-col text-center font-bold text-lg hover:opacity-90 transition-opacity">
              <FaUserFriends className="text-4xl mb-2" /> Similar Fans
              <p className="text-sm font-normal mt-1">Connect with fans who share your interests</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FanPublicProfilePage;