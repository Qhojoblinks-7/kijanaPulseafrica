import React from 'react';
// Importing specific icons needed for the header as seen in the image
import { FaEdit, FaMapMarkerAlt, FaEye, FaUserPlus } from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext'; // For consistent dark mode styling

const MyProfileHeader = ({ athlete }) => {
  const { isDarkMode } = useDarkMode();

  // Tailwind CSS classes for consistent theming based on dark mode
  const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
  const subTextColorClass = isDarkMode ? 'text-dark-text-secondary' : 'text-gray-600';
  const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue'; // For informational icons like map marker
  const editIconColorClass = isDarkMode ? 'text-gray-400 hover:text-gamepulse-teal' : 'text-gray-500 hover:text-gamepulse-blue'; // For edit icons

  return (
    <header className="relative w-full h-auto pb-6 md:pb-0">
      {/* 1. Banner Image Area:
           - Matches the full-width banner at the top of the profile section.
           - Uses athlete.bannerImage or a placeholder.
           - Has an 'Edit' button at the top-right.
      */}
      <div className="relative w-full h-40 md:h-64 bg-gray-300 dark:bg-gray-800 overflow-hidden">
        {athlete.bannerImage ? (
          <img
            src={athlete.bannerImage}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 text-sm">Upload Banner</span>
          </div>
        )}
        <button
          className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-dark-background-tertiary text-dark-text-secondary' : 'bg-white text-gray-700'} shadow-md hover:scale-105 transition-transform`}
          aria-label="Edit banner image"
        >
          <FaEdit className="text-lg" />
        </button>
      </div>

      {/* 2. Main Content Area (below banner):
           - This white/dark-secondary background section contains all the profile details.
           - Rounded bottom corners and shadow for visual separation.
      */}
      <div className={`relative px-4 pb-4 md:px-8 ${isDarkMode ? 'bg-dark-background-secondary' : 'bg-white'} shadow-md rounded-b-lg transition-colors duration-300`}>
        {/* 3. Profile Picture:
             - Circular, positioned absolutely to overlap the banner and the content area below it.
             - Centered horizontally using transform.
             - White border as seen in the image.
             - Has an 'Edit' button at the bottom-right of the picture.
        */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-dark-background-secondary shadow-lg">
          {athlete.profilePicture ? (
            <img
              src={athlete.profilePicture}
              alt={athlete.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm">
              <FaUserPlus className="text-4xl" /> {/* Placeholder icon if no picture */}
            </div>
          )}
          <button
            className={`absolute bottom-0 right-0 p-2 rounded-full ${isDarkMode ? 'bg-dark-background-tertiary text-dark-text-secondary' : 'bg-white text-gray-700'} shadow-md hover:scale-105 transition-transform`}
            aria-label="Edit profile picture"
          >
            <FaEdit className="text-lg" />
          </button>
        </div>

        {/* 4. Athlete Info Block (Name, Sport, School, Location, Bio):
             - Vertically spaced, centered text.
             - Edit icons next to editable fields.
        */}
        <div className="pt-16 md:pt-20 text-center"> {/* pt-16/20 pushes content down to clear the profile pic */}
          <h1 className={`text-3xl font-bold ${textColorClass} flex justify-center items-center`}>
            {athlete.fullName} {/* "Amaani Okoro" */}
            <button className={`ml-2 ${editIconColorClass}`} aria-label="Edit full name"><FaEdit className="text-lg" /></button>
          </h1>
          <p className={`text-lg font-medium ${subTextColorClass} flex justify-center items-center mt-1`}>
            {athlete.primarySport} - {athlete.position} {/* "Football - Striker" */}
            <button className={`ml-2 ${editIconColorClass}`} aria-label="Edit sport and position"><FaEdit className="text-base" /></button>
          </p>
          <p className={`text-md ${subTextColorClass} mt-1`}>
            {athlete.schoolTeam} {/* "Accra High School Spartans" (no edit icon in image) */}
          </p>
          <p className={`text-md ${subTextColorClass} flex justify-center items-center mt-1`}>
            <FaMapMarkerAlt className={`mr-2 ${iconColorClass}`} /> {athlete.location} {/* "Accra, Ghana" with map icon */}
            <button className={`ml-2 ${editIconColorClass}`} aria-label="Edit location"><FaEdit className="text-base" /></button>
          </p>
          <p className={`mt-3 text-md italic ${textColorClass} leading-relaxed flex justify-center items-center`}>
            "{athlete.bio}" {/* "Aspiring Olympian | Dedicated Team Player..." */}
            <button className={`ml-2 ${editIconColorClass}`} aria-label="Edit bio"><FaEdit className="text-base" /></button>
          </p>

          {/* 5. "View Public Profile" Button:
               - Centered, prominent button with an eye icon.
          */}
          <div className="mt-5">
            <button className={`px-5 py-2 rounded-full font-semibold text-sm flex items-center justify-center mx-auto
              ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}
            >
              <FaEye className="mr-2" /> View Public Profile
            </button>
          </div>
        </div>

        {/* 6. Key Metrics Section:
             - Separated by a thin top border.
             - Three columns for XP Rank, Followers, and Goals.
             - Bold values and smaller labels below.
        */}
        <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-dark-background-tertiary' : 'border-gray-200'} grid grid-cols-3 gap-4 text-center`}>
          <div>
            <div className={`text-2xl font-bold ${textColorClass}`}>{athlete.xpRank.split(' ')[0]}</div>
            <div className={`text-sm ${subTextColorClass}`}>XP Rank</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${textColorClass}`}>{athlete.followers}</div>
            <div className={`text-sm ${subTextColorClass}`}>Followers</div>
          </div>
          <div>
            {/* Accessing Goals based on the data structure in myProfileData.js */}
            <div className={`text-2xl font-bold ${textColorClass}`}>
              {athlete.stats?.football?.[0]?.value || 'N/A'} 
            </div>
            <div className={`text-sm ${subTextColorClass}`}>Goals</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyProfileHeader;