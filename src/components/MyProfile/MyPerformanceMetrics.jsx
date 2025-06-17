// src/components/MyProfile/MyPerformanceMetrics.jsx
import React from 'react';

// Assuming you have stat configurations or just want to display generic data
// For a full implementation, you might import stat configurations like this:
// import { BASKETBALL_STATS_CONFIG, FOOTBALL_STATS_CONFIG, etc. } from '../../utils/statConfigs'; // Example path

const MyPerformanceMetrics = ({ athlete }) => {
  // Ensure athlete object exists before trying to access its properties.
  // Use optional chaining for safe access to sportType.
  // The sportType is already lowercase from MyProfilePage.
  const sportType = athlete?.sportType; // This line should be safe now. (Line 6 in your context)

  // Helper function to make sport names more readable (e.g., 'field_hockey' -> 'Field Hockey')
  const getDisplaySportName = (sport) => {
    if (!sport) return 'N/A';
    return sport.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const displaySport = getDisplaySportName(sportType);

  // Determine which stats to display based on sportType
  // You would typically have a more sophisticated mapping here,
  // potentially using a configuration object like in ProfileHeader.
  let currentPostseasonStats = {};
  let currentCareerStats = {};

  if (athlete) {
    currentPostseasonStats = athlete.postseasonStats || {};
    currentCareerStats = athlete.careerStats || {};

    // Example of sport-specific stat selection (similar to ProfileHeader)
    // if (sportType === 'basketball') {
    //   // Use basketball-specific stats if available, or a generic set
    // } else if (sportType === 'football') {
    //   // Use football-specific stats
    // }
    // ... add more conditions for other sports if needed
  }


  return (
    <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
        Performance Metrics for {displaySport}
      </h3>

      {athlete && Object.keys(currentPostseasonStats).length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(currentPostseasonStats).map(([key, value]) => (
            <div key={key} className="p-3 bg-gray-50 rounded-md dark:bg-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No postseason metrics available for {displaySport} yet.</p>
      )}

      {/* Career Stats Section */}
      {athlete && Object.keys(currentCareerStats).length > 0 && (
        <div className="mt-6">
          <h4 className="text-xl font-bold mb-3 border-b pb-1 border-gray-200 dark:border-gray-700">Career Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(currentCareerStats).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-md dark:bg-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MyPerformanceMetrics;