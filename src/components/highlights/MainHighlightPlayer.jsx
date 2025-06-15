// src/components/Highlights/MainHighlightPlayer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaShareAlt, FaHeart, FaFlag } from 'react-icons/fa';

const MainHighlightPlayer = ({ highlight, onShare, onLike, onReport }) => {
  if (!highlight) {
    return (
      <div className="bg-gamepulse-dark text-white p-4 text-center">
        <p>Select a highlight to play.</p>
      </div>
    );
  }

  // Placeholder for video controls logic (not fully implemented here)
  const isPlaying = true; // Example state
  const isMuted = false; // Example state

  return (
    <section className="bg-gamepulse-dark py-4">
      <h2 className="text-white text-xl md:text-2xl font-bold px-4 mb-2">
        {highlight.title}
      </h2>

      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
        <video
          src={highlight.videoUrl}
          poster={highlight.thumbnailUrl} // Use thumbnail as poster
          controls={true} // Use native controls for simplicity and bandwidth
          className="w-full h-full object-contain" // object-contain to prevent stretching
          playsInline // Important for mobile
          preload="metadata" // Load metadata but not full video
        >
          Your browser does not support the video tag.
        </video>
        {/* You could overlay custom controls here if desired */}
      </div>

      <p className="text-gray-300 text-sm md:text-base px-4 mt-3">
        {highlight.description}
      </p>

      {/* Contextual Information */}
      <div className="px-4 mt-2">
        <Link to={`/match-details/${highlight.matchId}`} className="text-gamepulse-orange hover:underline text-sm font-medium block">
          From: {highlight.gameContext} - {highlight.matchScore}
        </Link>
        {highlight.athleteId && (
          <Link to={`/athlete-profile/${highlight.athleteId}`} className="text-gamepulse-teal hover:underline text-sm font-medium block mt-1">
            Featured Athlete: {highlight.athleteName}
          </Link>
        )}
        <p className="text-gray-400 text-xs mt-1">
          Highlight at: {highlight.timeInMatch} | {highlight.duration}
        </p>
      </div>

      {/* Engagement Section */}
      <div className="flex justify-around items-center border-t border-b border-gray-700 py-3 mt-4 px-4">
        <button
          onClick={onShare}
          className="flex items-center text-gamepulse-orange hover:text-orange-500 transition-colors px-3 py-1 rounded-full text-sm font-semibold"
          aria-label="Share highlight"
        >
          <FaShareAlt className="mr-2" /> Share ({highlight.shares})
        </button>
        <button
          onClick={onLike}
          className="flex items-center text-red-500 hover:text-red-600 transition-colors px-3 py-1 rounded-full text-sm font-semibold"
          aria-label="Like highlight"
        >
          <FaHeart className="mr-2" /> Like ({highlight.likes})
        </button>
        <button
          onClick={onReport}
          className="flex items-center text-gray-500 hover:text-gray-300 transition-colors px-3 py-1 rounded-full text-sm"
          aria-label="Report highlight"
        >
          <FaFlag className="mr-1" /> Report
        </button>
      </div>
    </section>
  );
};

export default MainHighlightPlayer;