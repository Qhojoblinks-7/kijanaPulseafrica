// src/components/UpcomingGames/GameCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaMapMarkerAlt, FaStar, FaPlayCircle } from 'react-icons/fa';
import { FaFootballBall, FaBasketballBall, FaRunning, FaHandshake, FaVolleyballBall, FaFistRaised } from 'react-icons/fa';
import { GiCricketBat, GiRugbyConversion, GiTennisBall } from 'react-icons/gi'; // Assuming Gi is for Game Icons


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

const GameCard = ({ game, onSetReminder }) => {
  const SportIcon = sportIcons[game.sport] || FaFootballBall; // Default to football if not found

  const statusColor = game.status === 'In Progress' ? 'bg-red-600' : 'bg-gray-600';
  const statusDot = game.status === 'In Progress' ? 'animate-pulse' : '';
  const statusText = game.status === 'In Progress' ? 'LIVE' : 'Upcoming';

  const formatGameClock = (sport, seconds) => {
    if (seconds === null) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (sport === 'Football' || sport === 'Rugby') {
      return `${minutes}'${remainingSeconds > 0 ? ` ${String(remainingSeconds).padStart(2, '0')}` : ''}`;
    }
    if (sport === 'Basketball') {
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
    return ''; // For other sports or when not applicable
  };

  return (
    <Link to={`/match-details/${game.id}`} className="block">
      <div className="bg-gray-900 rounded-lg shadow-lg p-4 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
        {/* Status and Reminder */}
        <div className="flex justify-between items-center mb-3">
          <span className={`${statusColor} text-white text-xs px-2 py-0.5 rounded-full flex items-center ${statusDot} font-semibold`}>
            <span className={`w-2 h-2 ${statusColor === 'bg-red-600' ? 'bg-white' : 'bg-gray-300'} rounded-full mr-1`}></span>
            {statusText}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to detail page
              e.stopPropagation(); // Prevent card click
              onSetReminder(game.id);
            }}
            className="text-gray-500 hover:text-gamepulse-yellow transition-colors text-xl"
          >
            <FaBell />
          </button>
        </div>

        {/* Time and Sport */}
        <div className="flex items-center text-sm font-semibold text-gamepulse-blue-light mb-3">
          <SportIcon className="mr-2 text-gamepulse-yellow text-lg" />
          <span>{game.time}</span>
          {game.status === 'In Progress' && game.gameClockSeconds !== null && (
            <span className="ml-2 text-white">({formatGameClock(game.sport, game.gameClockSeconds)})</span>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center flex-1 pr-2">
            <img src={game.homeLogo} alt={game.homeTeam} className="w-8 h-8 object-contain rounded-full border border-gray-700 mr-2" />
            <span className="font-bold text-white text-lg truncate">{game.homeTeam}</span>
          </div>
          <span className="mx-2 text-xl font-extrabold text-gamepulse-blue">
            {game.status === 'In Progress' ? game.homeScore : ''} - {game.status === 'In Progress' ? game.awayScore : ''}
            {game.status === 'Upcoming' && 'vs'}
          </span>
          <div className="flex items-center flex-1 pl-2 justify-end">
            <span className="font-bold text-white text-lg truncate text-right">{game.awayTeam}</span>
            <img src={game.awayLogo} alt={game.awayTeam} className="w-8 h-8 object-contain rounded-full border border-gray-700 ml-2" />
          </div>
        </div>

        {/* Location & League */}
        <p className="text-xs text-gray-400 mb-1 flex items-center">
          <FaMapMarkerAlt className="mr-1 text-red-400" /> {game.location}
        </p>
        <p className="text-xs text-gray-500 font-medium truncate">{game.league}</p>

        {/* Favorite Star (optional, can be separate action) */}
        {game.isFavorite && (
          <div className="absolute top-4 right-4 text-gamepulse-yellow text-xl">
            <FaStar />
          </div>
        )}
      </div>
    </Link>
  );
};

export default GameCard;