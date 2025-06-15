// src/components/MyProfile/MyPerformanceMetrics.jsx
import React, { useState } from 'react';
import { FaChartLine, FaTrophy, FaPlusCircle, FaPen, FaTrashAlt } from 'react-icons/fa';

const MyPerformanceMetrics = ({ athlete }) => {
  const [selectedSport, setSelectedSport] = useState(athlete.primarySport.toLowerCase());

  // Icons from athlete.icons, or default fallback
  const ChartLineIcon = athlete.icons?.FaChartLine || FaChartLine;
  const TrophyIcon = athlete.icons?.FaTrophy || FaTrophy;
  const PlusCircleIcon = athlete.icons?.FaPlusCircle || FaPlusCircle;
  const PenIcon = athlete.icons?.FaPen || FaPen;
  const TrashIcon = athlete.icons?.FaTrashAlt || FaTrashAlt;

  const currentStats = athlete.stats[selectedSport] || [];
  const progressData = athlete.progressData || [];

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading flex items-center">
          <ChartLineIcon className="text-gamepulse-blue mr-3" /> My Game: Stats & Progress
        </h2>
        <button className="px-4 py-2 bg-gamepulse-orange text-white rounded-full text-sm font-semibold flex items-center hover:bg-orange-700 transition-colors">
          <PlusCircleIcon className="mr-2" /> Add New Game/Stats
        </button>
      </div>

      {/* Sport Selector */}
      {athlete.sports && athlete.sports.length > 1 && (
        <div className="flex justify-center mb-6 space-x-3">
          {athlete.sports.map(sport => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-200
                ${selectedSport === sport.id
                  ? 'bg-gamepulse-blue text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {sport.name}
            </button>
          ))}
        </div>
      )}

      {/* Core Stats by Sport */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentStats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-lg text-center shadow-sm flex flex-col items-center justify-center relative group">
              {StatIcon && <StatIcon className="text-gamepulse-orange text-3xl mb-2" />}
              <p className="text-xl md:text-2xl font-bold text-gamepulse-dark">{stat.value}</p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gamepulse-blue transition-colors opacity-0 group-hover:opacity-100 text-sm">
                <PenIcon />
                <span className="sr-only">Edit Stat</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Progress Over Time (Placeholder) */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Progress Over Time</h3>
      <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg shadow-inner flex items-center justify-center text-gray-500 text-center p-4 text-sm md:text-base">
        <p>
          [Chart Placeholder: A lightweight line graph showing progress over seasons/months. <br />
          Add interactive elements like time range selectors (e.g., "Last 6 Months", "This Season").]
        </p>
        {/* Simple visual representation for demo */}
        {progressData.length > 0 && (
          <div className="flex justify-between items-end w-full p-2">
            {progressData.map((dataPoint, index) => (
              <div key={index} className="flex flex-col items-center mx-1">
                <span className="text-[10px] text-gray-500 mb-1">{dataPoint.name}</span>
                <div className="bg-gamepulse-blue rounded-t-sm" style={{ height: `${dataPoint.goals * 4 + 10}px`, width: '10px' }}></div>
                <span className="text-[10px] font-bold text-gamepulse-dark mt-1">{dataPoint.goals}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Achievements/Awards */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 font-heading">Key Achievements</h3>
      <div className="space-y-2">
        {athlete.achievements.map((achievement, index) => {
          const AchievementIcon = achievement.icon || TrophyIcon;
          return (
            <div key={index} className="flex items-start text-gray-700 text-base md:text-lg bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm relative group">
              <AchievementIcon className="text-gamepulse-orange mr-3 text-xl md:text-2xl mt-1 flex-shrink-0" />
              <span>{achievement.text}</span>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-400 hover:text-gamepulse-blue text-sm">
                  <PenIcon />
                  <span className="sr-only">Edit Achievement</span>
                </button>
                <button className="text-gray-400 hover:text-red-500 text-sm">
                  <TrashIcon />
                  <span className="sr-only">Delete Achievement</span>
                </button>
              </div>
            </div>
          );
        })}
        <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center hover:bg-gray-200 transition-colors">
          <PlusCircleIcon className="mr-2" /> Add Achievement
        </button>
      </div>
    </section>
  );
};

export default MyPerformanceMetrics;