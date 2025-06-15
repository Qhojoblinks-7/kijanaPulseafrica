// src/components/UpcomingGames/FeaturedGamesCarousel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaPlayCircle } from 'react-icons/fa';
import { FaFootballBall, FaBasketballBall, FaRunning, FaHandshake, FaVolleyballBall, FaFistRaised } from 'react-icons/fa';
import { GiCricketBat, GiRugbyConversion, GiTennisBall } from 'react-icons/gi'; // Assuming Gi is for Game Icons

// You might also need these if they are used elsewhere and from 'fa'
import { FaMapMarkerAlt, FaStar} from 'react-icons/fa';
const sportIcons = {
  Football: FaFootballBall,
  Basketball: FaBasketballBall,
  Athletics: FaRunning,
  Rugby: GiRugbyConversion,
  Cricket: GiCricketBat,
  Handball: FaHandshake,
  Volleyball: FaVolleyballBall,
  Tennis: GiTennisBall,
  'Martial Arts': FaFistRaised,
};

const FeaturedGamesCarousel = ({ games }) => {
  if (!games || games.length === 0) {
    return null; // Don't render if no featured games
  }

  // Helper to format date for display
  const formatDateDisplay = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString + 'T00:00:00');

    if (targetDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (targetDate.toDateString() === new Date(today.setDate(today.getDate() + 1)).toDateString()) {
      return 'Tomorrow';
    } else {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };


  return (
    <section className="bg-gradient-to-r from-gamepulse-dark to-gray-900 p-4 mb-6 rounded-b-xl shadow-inner">
      <h2 className="text-2xl font-bold text-white mb-4 mx-2 flex items-center">
        <FaFire className="mr-2 text-orange-400" /> Regional Showdowns
      </h2>
      <div className="flex overflow-x-scroll snap-x snap-mandatory pb-4 custom-scrollbar">
        {games.map(game => {
          const SportIcon = sportIcons[game.sport] || FaFootballBall;
          return (
            <Link to={`/match-details/${game.id}`} key={game.id} className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] mx-2 snap-center">
              <div className="bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col justify-between transform hover:scale-[1.01] transition-transform duration-200">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gamepulse-blue-light">{formatDateDisplay(game.date)} {game.time}</span>
                    <SportIcon className="text-gamepulse-yellow text-lg" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">{game.homeTeam} vs. {game.awayTeam}</h3>
                  <p className="text-xs text-gray-400 flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-1 text-red-400" /> {game.location}
                  </p>
                  <p className="text-xs text-gray-500 font-medium truncate">{game.league}</p>
                </div>
                {game.status === 'In Progress' && (
                  <div className="mt-4 text-center">
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center justify-center animate-pulse">
                      <FaPlayCircle className="mr-2" /> LIVE
                    </span>
                  </div>
                )}
                {game.isFavorite && (
                  <div className="absolute top-3 right-3 text-gamepulse-yellow text-lg">
                    <FaStar />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedGamesCarousel;