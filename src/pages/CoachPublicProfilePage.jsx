import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope, FaUserPlus, FaShareAlt, FaInstagram, FaTwitter, FaPlay,
  FaFootballBall, FaMapMarkerAlt, FaQuoteLeft, FaQuoteRight, FaChevronDown
} from 'react-icons/fa';

// Mock data for the public coach profile
const coachPublicData = {
  name: 'Kwame Asante',
  role: 'Coach / Team Manager',
  sport: 'Football',
  academy: 'Accra Hearts Academy',
  location: 'Accra, Ghana',
  motto: '“Developing tomorrow’s stars through discipline, passion, and strategic football excellence. Building champions on and off the field.”',
  profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg', // Re-using Kwame's pic
  teamsManaged: [
    { id: 'tpm1', name: 'Hearts Academy U18', sport: 'Football - U18 Boys', activePlayers: 24, iconColor: 'text-red-600' },
    { id: 'tpm2', name: 'Hearts Academy U16', sport: 'Football - U16 Boys', activePlayers: 22, iconColor: 'text-blue-600' },
  ],
  recentMatches: [
    { id: 'rpm1', date: 'March 15, 2024', team1: 'Hearts Academy U18', score: '3 - 1', team2: 'Liberty FC', winner: 'Hearts Academy U18' },
    { id: 'rpm2', date: 'March 8, 2024', team1: 'Hearts Academy U16', score: '2 - 0', team2: 'Tema Youth', winner: 'Hearts Academy U16' },
  ],
  teamHighlights: [
    { id: 'th1', title: 'Amazing Goal vs Liberty FC', thumbnailUrl: 'https://via.placeholder.com/200x120/FF6B35/FFFFFF?text=Highlight+1' },
    { id: 'th2', title: 'Training Highlights', thumbnailUrl: 'https://via.placeholder.com/200x120/034078/B4CED9?text=Highlight+2' },
    { id: 'th3', title: 'Best Saves', thumbnailUrl: 'https://via.placeholder.com/200x120/28A745/FFFFFF?text=Highlight+3' },
    { id: 'th4', title: 'Tactical Drills', thumbnailUrl: 'https://via.placeholder.com/200x120/FCCA46/0A1128?text=Highlight+4' },
  ],
  otherTalent: [
    { id: 'ot1', name: 'Amara Diallo', role: 'Basketball Coach', location: 'Lagos, Nigeria', profilePic: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'ot2', name: 'Joseph Mwangi', role: 'Football Coach', location: 'Nairobi, Kenya', profilePic: 'https://randomuser.me/api/portraits/men/40.jpg' },
    { id: 'ot3', name: 'Fatima Kone', role: 'Athletics Coach', location: 'Abidjan, Ivory Coast', profilePic: 'https://randomuser.me/api/portraits/women/70.jpg' },
    { id: 'ot4', name: 'David Okafor', role: 'Rugby Coach', location: 'Cape Town, South Africa', profilePic: 'https://randomuser.me/api/portraits/men/48.jpg' },
  ]
};

const CoachPublicProfilePage = () => {
  return (
    <div className="min-h-screen bg-neutral-light-gray-bg text-neutral-dark-gray font-sans">
      {/* Header - Minimal, as per public view */}
      <header className="bg-white py-3 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
        <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-blue-light hover:text-gamepulse-yellow transition-colors">
          GamePulse Africa
        </Link>
        {/* Potentially add simple icons like search, notifications for guest view if needed */}
      </header>

      {/* Main Content Area */}
      <div className="pt-20 container mx-auto px-4 py-6 space-y-6">

        {/* Coach Info Section */}
        <section className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center shadow-md">
          <div className="relative mb-4 md:mb-0 md:mr-6 flex-shrink-0">
            <img
              src={coachPublicData.profilePicture}
              alt={coachPublicData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gamepulse-blue shadow-lg"
            />
            {/* Small status/online indicator, placeholder for the green dot */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-success-green rounded-full border-2 border-white"></div>
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-heading font-extrabold text-neutral-dark-gray mb-1">
              {coachPublicData.name}
            </h1>
            <p className="text-lg text-gamepulse-blue font-semibold mb-2">
              {coachPublicData.role} • {coachPublicData.sport} • {coachPublicData.academy}
            </p>
            <p className="text-neutral-medium-gray text-sm flex items-center justify-center md:justify-start mb-3">
              <FaMapMarkerAlt className="mr-2 text-gamepulse-blue" /> {coachPublicData.location}
            </p>
            <p className="italic text-neutral-medium-gray text-sm">
              <FaQuoteLeft className="inline-block mr-1 text-xs" />{coachPublicData.motto}<FaQuoteRight className="inline-block ml-1 text-xs" />
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full flex items-center font-bold transition-colors">
                <FaUserPlus className="mr-2" /> Follow
              </button>
              <button className="bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center font-bold transition-colors">
                <FaEnvelope className="mr-2" /> Message
              </button>
            </div>
          </div>
        </section>

        {/* Teams Managed Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Teams Managed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachPublicData.teamsManaged.map(team => (
              <div key={team.id} className="border border-neutral-light-gray rounded-lg p-4 flex flex-col items-center text-center">
                <div className={`text-5xl mb-3 ${team.iconColor}`}>
                  <FaFootballBall />
                </div>
                <h3 className="text-lg font-bold text-neutral-dark-gray mb-1">{team.name}</h3>
                <p className="text-sm text-neutral-medium-gray mb-3">{team.sport}</p>
                <p className="text-gamepulse-blue text-md font-semibold mb-4">{team.activePlayers} Active Players</p>
                <button className="text-gamepulse-blue border border-gamepulse-blue px-4 py-2 rounded-full text-sm font-semibold hover:bg-gamepulse-blue hover:text-white transition-colors">
                  View Roster
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Matches Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Recent Matches</h2>
          <div className="space-y-4">
            {coachPublicData.recentMatches.map(match => (
              <div key={match.id} className="border border-neutral-light-gray rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-neutral-medium-gray">{match.date}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold text-neutral-dark-gray">{match.team1}</p>
                    <span className="text-xl font-bold text-gamepulse-blue">{match.score}</span>
                    <p className="text-lg font-semibold text-neutral-dark-gray">{match.team2}</p>
                  </div>
                </div>
                {match.winner && (
                  <span className="bg-success-green text-white text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                    WIN
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Team Highlights Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Team Highlights</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {coachPublicData.teamHighlights.map(highlight => (
              <div key={highlight.id} className="flex-shrink-0 w-60 relative rounded-lg overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity">
                <img src={highlight.thumbnailUrl} alt={highlight.title} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-neutral-white text-4xl" />
                </div>
                <div className="absolute bottom-2 left-2 text-neutral-white text-sm font-semibold">
                  {highlight.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Connect with Kwame Asante Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Connect with {coachPublicData.name}</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="bg-success-green hover:bg-success-green/80 text-white px-5 py-2 rounded-full flex items-center font-bold transition-colors text-sm">
              <FaEnvelope className="mr-2" /> Send Message
            </button>
            <button className="bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center font-bold transition-colors text-sm">
              <FaShareAlt className="mr-2" /> Share Profile
            </button>
            <a href="#" className="bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center font-bold transition-colors text-sm" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="mr-2" /> Instagram
            </a>
            <a href="#" className="bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center font-bold transition-colors text-sm" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="mr-2" /> Twitter
            </a>
          </div>
        </section>

        {/* Discover More Talent Section */}
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Discover More Talent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {coachPublicData.otherTalent.map(talent => (
              <div key={talent.id} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-neutral-light-gray-bg transition-colors cursor-pointer">
                <img src={talent.profilePic} alt={talent.name} className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gamepulse-blue" />
                <p className="font-semibold text-neutral-dark-gray">{talent.name}</p>
                <p className="text-sm text-neutral-medium-gray">{talent.role}</p>
                <p className="text-xs text-neutral-medium-gray">{talent.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoachPublicProfilePage;