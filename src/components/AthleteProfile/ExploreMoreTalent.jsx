// src/components/AthleteProfile/ExploreMoreTalent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

// MiniProfileCard Component (reusable)
const MiniProfileCard = ({ athlete }) => (
  <Link to={`/athlete/${athlete.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300 group">
    <img
      src={athlete.profilePicture}
      alt={athlete.name}
      className="w-full h-32 object-cover object-center group-hover:opacity-90 transition-opacity duration-200"
      loading="lazy" // Optimize image loading
    />
    <div className="p-3 text-center">
      <p className="font-semibold text-gray-900 text-base md:text-lg">{athlete.name}</p>
      <p className="text-sm text-gray-600">{athlete.sport}</p>
    </div>
  </Link>
);

const ExploreMoreTalent = ({ similarAthletes, schoolAthletes, athleteName, athleteIcons }) => {
  const UsersIcon = athleteIcons?.FaUsers || FaUsers;

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
        <UsersIcon className="text-gamepulse-blue mr-3" /> Discover More Talent
      </h2>

      {/* Similar Athletes */}
      {similarAthletes && similarAthletes.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Similar to {athleteName.split(' ')[0]}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {similarAthletes.map(athlete => (
              <MiniProfileCard key={athlete.id} athlete={athlete} />
            ))}
          </div>
        </>
      )}

      {/* From Same School/Team */}
      {schoolAthletes && schoolAthletes.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">More from {athleteName.split(' ')[0]}'s School</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {schoolAthletes.map(athlete => (
              <MiniProfileCard key={athlete.id} athlete={athlete} />
            ))}
          </div>
        </>
      )}

      {/* Quick Links to Explore Talent */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        <Link to="/explore/football" className="px-5 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200 text-sm md:text-base">
          View All Football Talent
        </Link>
        <Link to="/explore/basketball" className="px-5 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200 text-sm md:text-base">
          Browse Basketball Stars
        </Link>
        <Link to="/explore/accra" className="px-5 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200 text-sm md:text-base">
          Athletes from Accra
        </Link>
      </div>
    </section>
  );
};

export default ExploreMoreTalent;