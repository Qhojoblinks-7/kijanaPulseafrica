// src/components/Dashboard/AthleteDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSchool, FaAward, FaEnvelope, FaRulerVertical, FaWeightHanging, FaDumbbell, FaBook, FaGraduationCap, FaMedal, FaQuoteLeft, FaFacebook, FaYoutube, FaTwitter, FaInstagram, FaRegPlayCircle, FaUserEdit, FaCalendarAlt, FaMapMarkerAlt, FaChartLine, FaRegLightbulb, FaShareAlt,
  FaFutbol, // Imported FaFutbol for the soccer ball icon
  FaUpload, // Icon for upload
  FaCog // Icon for settings/manage profile
} from 'react-icons/fa';
import { MdOutlineSpeed } from "react-icons/md"; // Icon for speed

// This component receives the 'user' prop (which is the currentUser from AuthContext)
function AthleteDashboard({ user }) {
  // Use the user data passed via props
  const athlete = user;
  const [activeVideo, setActiveVideo] = useState(athlete.videoHighlights && athlete.videoHighlights.length > 0 ? athlete.videoHighlights[0] : null);

  const handleUploadHighlight = () => {
    alert("Simulating 'Upload Highlight' action: A modal/form would appear here for athletes to upload new footage.");
  };

  const handleManageProfile = () => {
    alert("Simulating 'Manage Profile' action: Redirect to profile settings page.");
    // In a real app: navigate('/settings/profile');
  };

  // If for some reason user data isn't complete (though AuthContext should prevent this)
  if (!athlete) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Athlete Data Missing</h2>
        <p className="mt-4 text-gray-600">Unable to load your athlete profile. Please try logging in again.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Hero/Athlete Header Section - Adapted for Dashboard context */}
      <section
        className="relative h-[45vh] lg:h-[40vh] bg-cover bg-center flex items-end pb-10 text-white rounded-lg shadow-xl overflow-hidden mb-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${athlete.mainPhoto || '/images/default-athlete-banner.webp'})`,
          backgroundAttachment: 'local', // Changed to local as it's a dashboard, not a static profile
        }}
      >
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center md:items-end justify-between w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 font-heading drop-shadow-lg">
              Welcome, {athlete.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md flex items-center">
              <FaFutbol className="mr-3 text-gamepulse-orange" /> Your {athlete.primarySport} Dashboard
            </p>
            <p className="text-lg md:text-xl drop-shadow-md flex items-center">
              <FaSchool className="mr-3" /> {athlete.highSchool}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-4">
            <button
              onClick={handleUploadHighlight}
              className="bg-gamepulse-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaUpload className="mr-2" /> Upload Highlight
            </button>
            <button
              onClick={handleManageProfile}
              className="bg-gamepulse-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaCog className="mr-2" /> Manage Profile
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column (Bio, Academic, Testimonials) */}
        <div className="lg:col-span-2 space-y-10">
          {/* About Me & Bio Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaUserEdit className="mr-3 text-gamepulse-orange" /> About You
            </h2>
            <div className="flex flex-col md:flex-row items-start md:space-x-6">
              {athlete.headshot && (
                <img
                  src={athlete.headshot}
                  alt={`${athlete.fullName} headshot`}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-center mb-6 md:mb-0 shadow-md flex-shrink-0"
                />
              )}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {athlete.bio}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
                  <p className="flex items-center"><FaRulerVertical className="mr-3 text-gamepulse-teal" /> <strong>Height:</strong> {athlete.height}</p>
                  <p className="flex items-center"><FaWeightHanging className="mr-3 text-gamepulse-teal" /> <strong>Weight:</strong> {athlete.weight}</p>
                  {/* FIX IS APPLIED HERE */}
                  <p className="flex items-center">
                    <FaFutbol className="mr-3 text-gamepulse-teal" /> <strong>Position(s):</strong>{' '}
                    {athlete.positions && Array.isArray(athlete.positions) && athlete.positions.length > 0
                      ? athlete.positions.join(', ')
                      : 'N/A'} {/* Display N/A if positions is undefined or empty */}
                  </p>
                  <p className="flex items-center"><i className="fas fa-hand-paper mr-3 text-gamepulse-teal"></i> <strong>Strong Foot:</strong> {athlete.foot}</p>
                  <p className="flex items-center"><FaCalendarAlt className="mr-3 text-gamepulse-teal" /> <strong>Graduation Year:</strong> {athlete.graduationYear}</p>
                  <p className="flex items-center"><FaMapMarkerAlt className="mr-3 text-gamepulse-teal" /> <strong>Region:</strong> {athlete.geographicRegion}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Performance Metrics & Statistics Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaChartLine className="mr-3 text-gamepulse-blue" /> Your Performance Metrics & Stats
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2023-2024 Season Averages:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
              {athlete.stats && athlete.stats['2023-2024 Season'] ? (
                Object.entries(athlete.stats['2023-2024 Season']).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-3xl font-bold text-gamepulse-teal">{value}{key.includes('Rate') || key.includes('Accuracy') || key.includes('Won') || key.includes('Target') ? '%' : ''}</p> {/* Smarter % check */}
                    <p className="text-sm text-gray-600">{
                      // Ensure these replacement keys match your data keys (e.g., 'goals', 'assists', etc. are lowercase in data)
                      key.replace('goals', 'Goals').replace('assists', 'Assists').replace('matchesPlayed', 'Matches Played').replace('shotsOnTarget', 'Shots on Target')
                      .replace('conversionRate', 'Conversion Rate').replace('dribbleSuccessRate', 'Dribble Success').replace('passAccuracy', 'Pass Accuracy')
                      .replace('tackleSuccessRate', 'Tackle Success').replace('aerialDuelsWon', 'Aerial Duels Won').replace('clearancesPerGame', 'Clearances/Game')
                      .replace('keyPassesPerGame', 'Key Passes/Game').replace('foulsWon', 'Fouls Won')
                    }</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 col-span-full text-center">No season stats available yet.</p>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Game Log:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gamepulse-dark text-white">
                    <th className="py-3 px-4 text-left">Opponent</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Goals</th>
                    <th className="py-3 px-4 text-left">Assists</th>
                    <th className="py-3 px-4 text-left">Mins Played</th>
                  </tr>
                </thead>
                <tbody>
                  {athlete.gameLog && athlete.gameLog.length > 0 ? (
                    athlete.gameLog.map((game, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                        <td className="py-3 px-4">{game.opponent}</td>
                        <td className="py-3 px-4">{game.date}</td>
                        <td className="py-3 px-4">{game.goals}</td>
                        <td className="py-3 px-4">{game.assists}</td>
                        <td className="py-3 px-4">{game.minutesPlayed}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="py-4 text-center text-gray-500">No recent game data available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Academic Profile Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-teal">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
              <FaGraduationCap className="mr-3 text-gamepulse-orange" /> Your Academic Profile
            </h2>
            {athlete.academicProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
                <p className="flex items-center"><FaSchool className="mr-3 text-gamepulse-blue" /> <strong>Institution:</strong> {athlete.academicProfile.institution}</p>
                <p className="flex items-center"><FaMedal className="mr-3 text-gamepulse-blue" /> <strong>GPA:</strong> {athlete.academicProfile.gpa}</p>
                <p className="flex items-center"><FaBook className="mr-3 text-gamepulse-blue" /> <strong>SAT:</strong> {athlete.academicProfile.testScores?.sat || 'N/A'}</p>
                <p className="flex items-center"><FaBook className="mr-3 text-gamepulse-blue" /> <strong>WASSCE:</strong> {athlete.academicProfile.testScores?.wassce || 'N/A'}</p>
                <p className="col-span-1 md:col-span-2 flex items-center"><FaRegLightbulb className="mr-3 text-gamepulse-blue" /> <strong>Academic Interests:</strong> {athlete.academicProfile.interests}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-center">No academic profile data available. Consider adding it!</p>
            )}
          </section>

          {/* Testimonials & Endorsements Section */}
          <section className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gamepulse-dark">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading text-center">
              Testimonials & Endorsements
            </h2>
            {athlete.testimonials && athlete.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {athlete.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                    <FaQuoteLeft className="text-gamepulse-orange text-3xl mb-4" />
                    <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No testimonials received yet.</p>
            )}
          </section>
        </div>

        {/* Right Column (Video Highlights, Social Media) */}
        <div className="lg:col-span-1 space-y-10">
          {/* Video Highlights & Game Footage Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-blue">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaRegPlayCircle className="mr-3 text-gamepulse-orange" /> Your Video Highlights
            </h2>
            {activeVideo && (
              <div className="mb-6 aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-200">
                <iframe
                  className="w-full h-full"
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="space-y-4">
              {athlete.videoHighlights && athlete.videoHighlights.length > 0 ? (
                athlete.videoHighlights.map((video, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      activeVideo && activeVideo.title === video.title ? 'bg-gamepulse-teal/10 border-l-4 border-gamepulse-teal shadow-md' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => setActiveVideo(video)}
                  >
                    <img
                      src={video.thumbnail || "https://via.placeholder.com/120x80?text=Video+Thumbnail"}
                      alt={`${video.title} thumbnail`}
                      className="w-24 h-16 object-cover rounded mr-4 flex-shrink-0 shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg leading-tight">{video.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No video highlights uploaded yet. Start sharing your talent!</p>
              )}
            </div>
          </section>

          {/* Social Media & Influence Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-gamepulse-orange">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 font-heading flex items-center">
              <FaShareAlt className="mr-3 text-gamepulse-blue" /> Your Social Media & Influence
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Connect your social media to showcase your off-field personality.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-5xl">
              {athlete.socialMedia?.facebook?.url && (
                <a href={athlete.socialMedia.facebook.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors duration-200 text-center">
                  <FaFacebook /><span className="block text-sm mt-1">{athlete.socialMedia.facebook.followers}</span>
                </a>
              )}
              {athlete.socialMedia?.twitter?.url && (
                <a href={athlete.socialMedia.twitter.url} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black transition-colors duration-200 text-center">
                  <FaTwitter /><span className="block text-sm mt-1">{athlete.socialMedia.twitter.followers}</span>
                </a>
              )}
              {athlete.socialMedia?.instagram?.url && (
                <a href={athlete.socialMedia.instagram.url} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors duration-200 text-center">
                  <FaInstagram /><span className="block text-sm mt-1">{athlete.socialMedia.instagram.followers}</span>
                </a>
              )}
              {athlete.socialMedia?.youtube?.url && (
                <a href={athlete.socialMedia.youtube.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors duration-200 text-center">
                  <FaYoutube /><span className="block text-sm mt-1">{athlete.socialMedia.youtube.subscribers}</span>
                </a>
              )}
              {(!athlete.socialMedia || Object.keys(athlete.socialMedia).every(key => !athlete.socialMedia[key]?.url)) && (
                <p className="text-sm text-gray-500 col-span-full">No social media links added yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AthleteDashboard;