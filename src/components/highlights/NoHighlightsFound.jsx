// src/components/Highlights/NoHighlightsFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NoHighlightsFound = ({ onShowTrending, onGoLiveMatches, onDiscoverAthletes }) => {
  return (
    <section className="bg-gamepulse-dark py-10 px-4 text-center">
      <p className="text-white text-base md:text-lg mb-6">
        No highlights match your current criteria. Try broadening your filters or explore other sports!
      </p>
      <h3 className="text-gray-300 text-md font-medium mb-4">You might also be interested in:</h3>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={onShowTrending}
          className="bg-gamepulse-orange text-white font-bold py-2 px-4 rounded-full w-full md:w-auto hover:bg-orange-700 transition-colors"
        >
          View Trending Highlights
        </button>
        <Link to="/live-matches" className="w-full md:w-auto">
          <button
            onClick={onGoLiveMatches}
            className="bg-gamepulse-blue text-white font-bold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition-colors"
          >
            Go to Live Matches
          </button>
        </Link>
        <Link to="/discover-athletes" className="w-full md:w-auto">
          <button
            onClick={onDiscoverAthletes}
            className="bg-gamepulse-teal text-white font-bold py-2 px-4 rounded-full w-full hover:bg-teal-600 transition-colors"
          >
            Discover Athletes
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NoHighlightsFound;