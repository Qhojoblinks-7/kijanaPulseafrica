// src/components/Highlights/HighlightCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // No need for useParams here

// Helper to format view count (e.g., 1234567 -> 1.2M)
const formatViewCount = (views) => {
  if (views === undefined) return ''; // Handle undefined views
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return `${views}`;
};

// Helper to format time since upload (e.g., 2 days ago)
const timeSince = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const HighlightCard = ({ highlight }) => {
  return (
    // Link to the same /highlights route, but with a new 'id' query parameter
    <Link to={`/highlights?id=${highlight.id}`} className="block">
      <div className="bg-gamepulse-dark rounded-lg overflow-hidden cursor-pointer group">
        {/* Thumbnail Section */}
        <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={highlight.thumbnailUrl}
            alt={highlight.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {highlight.duration}
          </span>
          {/* Optional: Play icon on hover (YouTube has this on desktop) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {/* <FaPlay /> */} {/* Removed this to be less intrusive */}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex items-start mt-3 px-2 pb-3">
          {/* Channel/Athlete Avatar (Small) */}
          <img
            src={highlight.athleteAvatarUrl || "/images/default-athlete-avatar.webp"}
            alt={highlight.athleteName}
            className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          />
          {/* Video Title and Metadata */}
          <div className="flex-grow">
            <h3 className="text-white text-base font-semibold leading-tight line-clamp-2">
              {highlight.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              <Link to={`/athlete-profile/${highlight.athleteId}`} className="hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                {highlight.athleteName}
              </Link>
            </p>
            <p className="text-gray-400 text-xs">
              {formatViewCount(highlight.views)} views • {timeSince(highlight.dateUploaded)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HighlightCard;