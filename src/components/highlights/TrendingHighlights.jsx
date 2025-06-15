// src/components/Highlights/TrendingHighlights.jsx
import React from 'react';
import { FaPlay, FaEye, FaFire } from 'react-icons/fa';

const TrendingHighlights = ({ trendingHighlights, onSelectHighlight }) => {
  return (
    <section className="bg-gamepulse-dark py-4">
      <h2 className="text-white text-lg md:text-xl font-semibold mb-3 px-4">Top Plays</h2>
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide px-2"> {/* Added scrollbar-hide */}
        {trendingHighlights.map((highlight) => (
          <div
            key={highlight.id}
            className="w-[250px] md:w-[300px] flex-shrink-0 mx-2 cursor-pointer transform hover:scale-105 transition-transform duration-200 snap-center"
            onClick={() => onSelectHighlight(highlight)}
          >
            <div className="relative w-full h-36 md:h-48 bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={highlight.thumbnailUrl}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-4xl rounded-lg">
                <FaPlay />
              </div>
              <p className="absolute bottom-2 left-2 text-white text-sm font-bold bg-black/60 px-2 py-1 rounded">
                {highlight.overlayText}
              </p>
            </div>
            <p className="text-gray-300 text-xs mt-1 truncate">{highlight.gameContext}</p>
            <div className="flex items-center text-gray-400 text-xs mt-0.5">
              {highlight.isTrending ? <FaFire className="mr-1 text-gamepulse-orange" /> : <FaEye className="mr-1" />}
              <span>{highlight.viewCount} Views</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingHighlights;