// src/components/MyProfile/MyProfileHeader.jsx
import React from 'react';
import { FaMapMarkerAlt, FaEye, FaPen, FaCamera } from 'react-icons/fa'; // Import all necessary icons
import { Link } from 'react-router-dom';

const MyProfileHeader = ({ athlete }) => {
  // Use passed icons or default to react-icons if not provided (for flexibility)
  const MapMarkerIcon = athlete.icons?.FaMapMarkerAlt || FaMapMarkerAlt;
  const EyeIcon = athlete.icons?.FaEye || FaEye;
  const PenIcon = athlete.icons?.FaPen || FaPen;
  const CameraIcon = athlete.icons?.FaCamera || FaCamera; // Using FaCamera for banner/profile picture edit

  return (
    <section className="relative bg-gray-50 pb-16 md:pb-24">
      {/* Background Banner */}
      <div
        className="relative h-36 md:h-48 bg-gradient-to-r from-gamepulse-blue to-gamepulse-teal overflow-hidden group"
        style={{
          backgroundImage: athlete.bannerImage ? `url(${athlete.bannerImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gamepulse-dark/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white bg-black/50 p-3 rounded-full text-lg hover:scale-110 transition-transform">
            <CameraIcon />
            <span className="sr-only">Edit Banner</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Profile Picture */}
        <div className="relative -mt-20 md:-mt-28 z-10 flex justify-center group">
          <img
            src={athlete.profilePicture}
            alt={`${athlete.fullName}'s Profile`}
            className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-gamepulse-orange shadow-lg bg-gray-200"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
            <button className="text-white bg-black/50 p-3 rounded-full text-lg hover:scale-110 transition-transform">
              <CameraIcon />
              <span className="sr-only">Edit Profile Picture</span>
            </button>
          </div>
        </div>

        {/* Athlete Info */}
        <div className="text-center mt-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 font-heading leading-tight flex items-center justify-center">
            {athlete.fullName}
            <button className="ml-3 text-gray-400 hover:text-gamepulse-blue transition-colors text-xl">
              <PenIcon />
              <span className="sr-only">Edit Name</span>
            </button>
          </h1>
          <p className="text-gamepulse-blue text-lg md:text-xl font-semibold mt-1 flex items-center justify-center">
            {athlete.primarySport} - {athlete.position}
            <button className="ml-2 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm">
              <PenIcon />
              <span className="sr-only">Edit Sport/Position</span>
            </button>
          </p>
          <p className="text-gray-600 text-md md:text-lg">{athlete.schoolTeam}</p>
          <p className="text-gray-500 text-sm md:text-base flex items-center justify-center mt-1">
            <MapMarkerIcon className="mr-2 text-gamepulse-teal" /> {athlete.location}
            <button className="ml-2 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm">
              <PenIcon />
              <span className="sr-only">Edit Location</span>
            </button>
          </p>
          <p className="text-gray-700 text-base md:text-lg italic mt-3 max-w-sm mx-auto relative group">
            "{athlete.bio}"
            <button className="absolute top-0 right-0 -mr-6 -mt-2 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm opacity-0 group-hover:opacity-100 md:opacity-100 md:static md:ml-2">
              <PenIcon />
              <span className="sr-only">Edit Bio</span>
            </button>
          </p>
        </div>

        {/* "View Public Profile" Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/athlete-profile" // Link to the public view (assuming this route exists)
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
          >
            <EyeIcon className="mr-2 text-gamepulse-blue" /> View Public Profile
          </Link>
        </div>

        {/* Quick Stats Overview */}
        <div className="mt-8 flex justify-center space-x-6 md:space-x-12 text-center border-t border-b border-gray-200 py-4 mb-4">
          <div>
            <p className="font-bold text-xl md:text-2xl text-gamepulse-dark">{athlete.xpRank}</p>
            <p className="text-gray-500 text-sm md:text-base">XP Rank</p>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl text-gamepulse-dark">{athlete.followers}</p>
            <p className="text-gray-500 text-sm md:text-base">Followers</p>
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl text-gamepulse-dark">
              {athlete.stats[athlete.primarySport.toLowerCase()]?.[0]?.value || 'N/A'}
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              {athlete.stats[athlete.primarySport.toLowerCase()]?.[0]?.label || 'Key Stat'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfileHeader;