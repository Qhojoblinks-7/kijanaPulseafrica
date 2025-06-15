// src/components/AthleteProfile/PerformanceMetrics.jsx
import React, { useState } from 'react';
import { FaChartLine, FaTrophy } from 'react-icons/fa';

const PerformanceMetrics = ({ athlete }) => {
  const [selectedSport, setSelectedSport] = useState(athlete.primarySport.toLowerCase());

  // Icons from athlete.icons, or default fallback
  const ChartLineIcon = athlete.icons?.FaChartLine || FaChartLine;
  const TrophyIcon = athlete.icons?.FaTrophy || FaTrophy;

  const currentStats = athlete.stats[selectedSport] || [];
  const progressData = athlete.progressData || []; // Assuming simple data for now

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
        <ChartLineIcon className="text-gamepulse-blue mr-3" /> Performance Snapshot
      </h2>

      {/* Sport Selector (if athlete plays multiple sports) */}
      {Object.keys(athlete.stats).length > 1 && (
        <div className="flex justify-center mb-6 space-x-3">
          {Object.keys(athlete.stats).map(sport => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-200
                ${selectedSport === sport
                  ? 'bg-gamepulse-blue text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Core Stats by Sport */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentStats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-lg text-center shadow-sm flex flex-col items-center justify-center">
              {StatIcon && <StatIcon className="text-gamepulse-orange text-3xl mb-2" />}
              <p className="text-xl md:text-2xl font-bold text-gamepulse-dark">{stat.value}</p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Progress Over Time (Simplified Placeholder) */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Progress Over Time</h3>
      <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg shadow-inner flex items-center justify-center text-gray-500 text-center p-4 text-sm md:text-base">
        <p>
          [Chart Placeholder: A lightweight line graph showing progress over seasons/months. <br />
          Consider using a simple SVG chart or a dedicated, optimized React chart library like `recharts` for production, ensuring minimal bundle size.]
        </p>
        {/* Example: Basic representation of data */}
        {progressData.length > 0 && (
          <div className="flex justify-between w-full p-4">
            {progressData.map((dataPoint, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs text-gray-500">{dataPoint.name}</span>
                <div className="bg-gamepulse-blue rounded-full" style={{ height: `${dataPoint.goals * 5}px`, width: '10px' }}></div>
                <span className="text-xs font-bold text-gamepulse-dark">{dataPoint.goals}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Achievements/Awards */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 font-heading">Key Achievements</h3>
      <div className="space-y-2">
        {athlete.achievements.map((achievement, index) => {
          const AchievementIcon = achievement.icon || TrophyIcon; // Use provided icon or default
          return (
            <div key={index} className="flex items-start text-gray-700 text-base md:text-lg bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm">
              <AchievementIcon className="text-gamepulse-orange mr-3 text-xl md:text-2xl mt-1 flex-shrink-0" />
              <span>{achievement.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PerformanceMetrics;