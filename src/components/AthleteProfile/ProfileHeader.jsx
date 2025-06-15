// src/components/AthleteProfile/ProfileHeader.jsx
import React from 'react';
import { FaMapMarkerAlt, FaPlus, FaUserPlus } from 'react-icons/fa';

const ProfileHeader = ({ athlete }) => {
  // Destructure icons from athlete.icons, or directly import if not passed down
  const MapMarkerIcon = athlete.icons?.FaMapMarkerAlt || FaMapMarkerAlt;
  const PlusIcon = athlete.icons?.FaPlus || FaPlus;
  const UserPlusIcon = athlete.icons?.FaUserPlus || FaUserPlus;

  return (
    <section className="relative bg-gray-50 pb-16 md:pb-24">
      {/* Background Banner */}
      <div
        className="relative h-32 md:h-48 bg-gradient-to-r from-gamepulse-blue to-gamepulse-teal overflow-hidden"
        style={{
          backgroundImage: athlete.bannerImage ? `url(${athlete.bannerImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional: Overlay for better text readability */}
        <div className="absolute inset-0 bg-gamepulse-dark/30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Profile Picture */}
        <div className="relative -mt-16 md:-mt-24 z-10 flex justify-center">
          <img
            src={athlete.profilePicture}
            alt={`${athlete.fullName}'s Profile`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gamepulse-orange shadow-lg bg-gray-200"
            loading="lazy" // Optimize image loading
          />
        </div>

        {/* Athlete Info */}
        <div className="text-center mt-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 font-heading leading-tight">
            {athlete.fullName}
          </h1>
          <p className="text-gamepulse-blue text-lg md:text-xl font-semibold mt-1">
            {athlete.primarySport} - {athlete.position}
          </p>
          <p className="text-gray-600 text-md md:text-lg">{athlete.schoolTeam}</p>
          <p className="text-gray-500 text-sm md:text-base flex items-center justify-center mt-1">
            <MapMarkerIcon className="mr-2 text-gamepulse-teal" /> {athlete.location}
          </p>
          <p className="text-gray-700 text-base md:text-lg italic mt-3 max-w-sm mx-auto">
            "{athlete.bio}"
          </p>
        </div>

        {/* Follow Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-8 py-3 bg-gamepulse-orange text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-colors duration-300 transform hover:scale-105 flex items-center">
            <UserPlusIcon className="mr-2 text-white" /> Follow ({athlete.followers})
          </button>
        </div>

        {/* Quick Stats Overview */}
        <div className="mt-8 flex justify-center space-x-6 md:space-x-12 text-center border-t border-b border-gray-200 py-4 mb-4">
          <div>
            <p className="font-bold text-xl md:text-2xl text-gamepulse-dark">{athlete.xpRank}</p>
            <p className="text-gray-500 text-sm md:text-base">XP Rank</p>
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

export default ProfileHeader;