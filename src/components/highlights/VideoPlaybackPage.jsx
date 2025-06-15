// src/components/Highlights/VideoPlaybackPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaSave, FaEllipsisH, FaBell, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import HighlightsNavbar from './HighlightsNavbar'; // Import the YouTube-like navbar

// Mock Data for a single highlight and related videos (replace with API calls)
const mockHighlightDetails = {
    't1': {
      id: 't1',
      thumbnailUrl: 'https://via.placeholder.com/640x360/FF5733/FFFFFF?text=Dunk+Player',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: "Jane Doe's Game-Winning Dunk - Greenwood vs. Riverside",
      description: "Witness Jane Doe's incredible game-winning dunk in the thrilling match between Greenwood and Riverside! She soared through the air in the final seconds, sealing the victory with this spectacular play. A true highlight of high school basketball talent in Africa!",
      gameContext: "Greenwood Academy vs. Riverside College",
      matchId: 'm123',
      matchScore: '88-87',
      athleteId: 'a1',
      athleteName: 'Jane Doe',
      athleteAvatarUrl: '/images/default-athlete-avatar.webp', // Placeholder
      timeInMatch: '48:30',
      duration: '0:25',
      views: 1234567, // Numeric views
      likes: 2345,
      dislikes: 12,
      shares: 45,
      dateUploaded: '2025-06-12T10:00:00Z', // ISO format for timeSince
      sport: 'Basketball'
    },
    't2': {
      id: 't2',
      thumbnailUrl: 'https://via.placeholder.com/640x360/33FF57/FFFFFF?text=Goal+Player',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: "Kwame Nkrumah's Stunning Solo Goal vs. Tema City",
      description: "Accra United's Kwame Nkrumah pulled off a mesmerizing solo effort, weaving through defenders to net a breathtaking goal in the 88th minute against Tema City. This highlight showcases the raw football talent emerging from Ghana's high school leagues!",
      gameContext: "Accra United vs. Tema City",
      matchId: 'm124',
      matchScore: '2-1',
      athleteId: 'a2',
      athleteName: 'Kwame Nkrumah',
      athleteAvatarUrl: '/images/default-athlete-avatar.webp',
      timeInMatch: '88:30',
      duration: '0:35',
      views: 980123,
      likes: 1800,
      dislikes: 8,
      shares: 30,
      dateUploaded: '2025-06-11T14:30:00Z',
      sport: 'Football'
    },
    // Add other highlights here with full details for demo
};

// Mock related videos (similar to mockAllHighlights)
const mockRelatedHighlights = [
    {
        id: 'h1',
        thumbnailUrl: 'https://via.placeholder.com/320x180/FF0000/FFFFFF?text=Skill+Move+Related',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: "Football Skill Masterclass by Chike Obi",
        gameContext: "St. Peter's vs. City Academy",
        sport: 'Football',
        duration: '0:45',
        dateUploaded: '2025-06-12T08:00:00Z',
        athleteId: 'a6', athleteName: 'Chike Obi', athleteAvatarUrl: '/images/default-athlete-avatar.webp',
        views: 70000, likes: 700, shares: 10,
    },
    {
        id: 'h2',
        thumbnailUrl: 'https://via.placeholder.com/320x180/00FF00/FFFFFF?text=Volleyball+Spike+Related',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: "Fatima Conteh's Match-Winning Volleyball Spike",
        gameContext: "Sunshine Girls vs. Elite Academy",
        sport: 'Volleyball',
        duration: '0:20',
        dateUploaded: '2025-06-11T16:00:00Z',
        athleteId: 'a7', athleteName: 'Fatima Conteh', athleteAvatarUrl: '/images/default-athlete-avatar.webp',
        views: 50000, likes: 500, shares: 5,
    },
    {
        id: 't3', // Re-use a trending highlight as a related video
        thumbnailUrl: 'https://via.placeholder.com/320x180/3357FF/FFFFFF?text=Save+Related',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: "Amara Okoro's Phenomenal Triple Save",
        gameContext: "Lagos Giants vs. Kano Kings",
        views: 750000,
        athleteName: 'Amara Okoro',
        athleteAvatarUrl: '/images/default-athlete-avatar.webp',
        dateUploaded: '2025-06-10T11:00:00Z',
        duration: '0:40',
        sport: 'Football'
    }
    // ... add more as needed
];

// Re-use formatting helpers from HighlightCard
const formatViewCount = (views) => {
    if (views === undefined) return ''; // Handle undefined views
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return `${views}`;
};

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


const VideoPlaybackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [highlight, setHighlight] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // In a real app, fetch highlight details from API using 'id'
    const fetchedHighlight = mockHighlightDetails[id];
    if (fetchedHighlight) {
      setHighlight(fetchedHighlight);
      // Optional: scroll to top when highlight changes
      window.scrollTo(0, 0);
    } else {
      // Handle 404 or redirect if highlight not found
      navigate('/highlights'); // Redirect back to highlights list
    }
  }, [id, navigate]);

  if (!highlight) {
    return <div className="min-h-screen bg-gamepulse-dark flex items-center justify-center text-white pt-16">Loading highlight...</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: highlight.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share this link: ${window.location.href}`);
    }
  };

  const onSearchIconClick = () => {
      // For simplicity, we'll navigate back to the main highlights page with a filter open state
      // In a more complex app, this might open a search overlay/modal here.
      navigate('/highlights?openFilters=true');
  };


  return (
    <div className="min-h-screen bg-gamepulse-dark text-white pt-16"> {/* pt-16 to offset fixed navbar */}
      <HighlightsNavbar onSearchIconClick={onSearchIconClick} userAvatarUrl="/images/user-avatar.webp" /> {/* Pass mock user avatar */}

      <div className="container mx-auto px-0 md:px-4 py-4">
        {/* Main Video Player */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden md:rounded-xl relative">
          <video
            src={highlight.videoUrl}
            poster={highlight.thumbnailUrl}
            controls={true}
            className="w-full h-full object-contain"
            playsInline
            autoPlay // Autoplay on dedicated page
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Title and Actions */}
        <div className="px-4 md:px-0 py-3">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2">
            {highlight.title}
          </h1>

          {/* Views and Upload Date */}
          <p className="text-gray-400 text-sm mb-3">
            {formatViewCount(highlight.views)} views • {timeSince(highlight.dateUploaded)}
          </p>

          {/* Channel/Uploader Info and Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-700 py-3">
            <div className="flex items-center">
              <Link to={`/athlete-profile/${highlight.athleteId}`} className="flex items-center">
                <img
                  src={highlight.athleteAvatarUrl || "/images/default-athlete-avatar.webp"}
                  alt={highlight.athleteName}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="text-white font-semibold text-base">{highlight.athleteName}</p>
                  <p className="text-gray-400 text-xs">GamePulse Player</p> {/* Or "X Subscribers/Followers" */}
                </div>
              </Link>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-4 text-sm font-semibold">
              <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
                <FaThumbsUp className="text-lg" />
                <span>{formatViewCount(highlight.likes)}</span>
              </button>
              <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
                <FaThumbsDown className="text-lg" />
                <span>{highlight.dislikes}</span>
              </button>
              <button onClick={handleShare} className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
                <FaShareAlt className="text-lg" />
                <span>Share</span>
              </button>
              <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors hidden md:flex"> {/* Hidden on small mobile */}
                <FaSave className="text-lg" />
                <span>Save</span>
              </button>
              <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors hidden md:flex"> {/* Hidden on small mobile */}
                <FaEllipsisH className="text-lg" />
                <span>More</span>
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-800 rounded-lg p-3 mt-4 text-sm">
            <div className="flex items-center text-gray-300 font-semibold mb-2">
              <span>{formatViewCount(highlight.views)} views</span>
              <span className="mx-2">•</span>
              <span>{new Date(highlight.dateUploaded).toLocaleDateString()}</span>
            </div>
            <p className={`text-gray-300 overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {highlight.description}
            </p>
            {highlight.description.length > 150 && ( // Simple check for long description
                <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-gamepulse-blue hover:underline mt-2 flex items-center"
                >
                    {showFullDescription ? (
                        <>Show less <FaAngleUp className="ml-1" /></>
                    ) : (
                        <>Show more <FaAngleDown className="ml-1" /></>
                    )}
                </button>
            )}
            <Link to={`/match-details/${highlight.matchId}`} className="text-gamepulse-orange hover:underline text-sm font-medium block mt-2">
                Full Match Details: {highlight.gameContext}
            </Link>
          </div>
        </div>

        {/* Up Next / Related Videos Section */}
        <div className="px-4 md:px-0 mt-6">
          <h2 className="text-white text-lg font-semibold mb-4">Up Next</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockRelatedHighlights.map((related) => (
              <Link to={`/highlights/${related.id}`} key={related.id} className="flex items-start group">
                <div className="relative flex-shrink-0 w-36 h-20 md:w-44 md:h-24 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={related.thumbnailUrl}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                    {related.duration}
                  </span>
                </div>
                <div className="ml-3 flex-grow">
                  <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
                    {related.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {related.athleteName}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatViewCount(related.views)} views • {timeSince(related.dateUploaded)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comments Section (Placeholder - highly complex to implement fully) */}
        <div className="px-4 md:px-0 mt-8">
            <h2 className="text-white text-lg font-semibold mb-4">Comments (15)</h2>
            <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Comments section is coming soon!</p>
                {/* Example comment input and display area */}
            </div>
        </div>

      </div>
    </div>
  );
};

export default VideoPlaybackPage;