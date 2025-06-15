// src/components/Highlights/ViewHighlightsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import HighlightsNavbar from './HighlightsNavbar';
import HighlightCategoryChips from './HighlightCategoryChips';
import HighlightGrid from './HighlightGrid';
import HighlightFilters from './HighlightFilters';
import NoHighlightsFound from './NoHighlightsFound';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaSave, FaEllipsisH, FaAngleDown, FaAngleUp, FaDownload } from 'react-icons/fa';


// --- Mock Data (Centralized for simplicity) ---
const mockAllHighlights = [
  {
    id: 't1', thumbnailUrl: 'https://via.placeholder.com/640x360/FF5733/FFFFFF?text=Dunk+Player', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Jane Doe's Game-Winning Dunk - Greenwood vs. Riverside", description: "Witness Jane Doe's incredible game-winning dunk in the thrilling match between Greenwood and Riverside! She soared through the air in the final seconds, sealing the victory with this spectacular play. A true highlight of high school basketball talent in Africa!",
    gameContext: "Greenwood Academy vs. Riverside College", matchId: 'm123', matchScore: '88-87',
    views: 1234567, duration: '0:25', dateUploaded: '2025-06-12T10:00:00Z', sport: 'Basketball',
    athleteId: 'a1', athleteName: 'Jane Doe', athleteAvatarUrl: '/images/default-athlete-avatar.webp', likes: 2345, dislikes: 12, shares: 45, products: 2
  },
  {
    id: 't2', thumbnailUrl: 'https://via.placeholder.com/640x360/33FF57/FFFFFF?text=Goal+Player', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Kwame Nkrumah's Stunning Solo Goal vs. Tema City", description: "Accra United's Kwame Nkrumah pulled off a mesmerizing solo effort, weaving through defenders to net a breathtaking goal in the 88th minute against Tema City. This highlight showcases the raw football talent emerging from Ghana's high school leagues!",
    gameContext: "Accra United vs. Tema City", matchId: 'm124', matchScore: '2-1',
    views: 980123, duration: '0:35', dateUploaded: '2025-06-11T14:30:00Z', sport: 'Football',
    athleteId: 'a2', athleteName: 'Kwame Nkrumah', athleteAvatarUrl: '/images/default-athlete-avatar.webp', likes: 1800, dislikes: 8, shares: 30, products: 0
  },
  {
    id: 't3', thumbnailUrl: 'https://via.placeholder.com/640x360/3357FF/FFFFFF?text=Save+Player', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Amara Okoro's Phenomenal Triple Save", description: "In a tense final minute, Amara Okoro made three impossible saves back-to-back, denying the opposition a certain goal and securing the draw for her team. This incredible display of goalkeeping prowess is a must-watch!",
    gameContext: "Lagos Giants vs. Kano Kings", matchId: 'm125', matchScore: '0-0',
    views: 750000, duration: '0:40', dateUploaded: '2025-06-10T11:00:00Z', sport: 'Football',
    athleteId: 'a3', athleteName: 'Amara Okoro', athleteAvatarUrl: '/images/default-athlete-avatar.webp', likes: 1200, dislikes: 5, shares: 20, products: 1
  },
  {
    id: 't4', thumbnailUrl: 'https://via.placeholder.com/640x360/FFC300/FFFFFF?text=Rugby+Player', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Epic Rugby Try by Themba Mkhize", description: "Themba Mkhize's incredible solo try from midfield, breaking through three tackles to score under the posts. A testament to strength and agility in high school rugby!",
    gameContext: "Cape Town RFC vs. Durban Kings", matchId: 'm126', matchScore: '25-18',
    views: 600000, duration: '0:30', dateUploaded: '2025-06-09T09:00:00Z', sport: 'Rugby',
    athleteId: 'a4', athleteName: 'Themba Mkhize', athleteAvatarUrl: '/images/default-athlete-avatar.webp', likes: 900, dislikes: 3, shares: 15, products: 0
  },
  {
    id: 't5', thumbnailUrl: 'https://via.placeholder.com/640x360/C70039/FFFFFF?text=Athletics+Player', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Nia Amani's Gold Medal Sprint Finish", description: "Nia Amani pushes past her competitors in the final meters to clinch gold in the 100m sprint at the National High School Athletics meet. Pure speed and determination!",
    gameContext: "National High School Athletics", matchId: 'm127', matchScore: '',
    views: 1100000, duration: '0:12', dateUploaded: '2025-06-08T15:00:00Z', sport: 'Athletics',
    athleteId: 'a5', athleteName: 'Nia Amani', athleteAvatarUrl: '/images/default-athlete-avatar.webp', likes: 2000, dislikes: 10, shares: 40, products: 3
  },
  {
    id: 'h1', thumbnailUrl: 'https://via.placeholder.com/640x360/FF0000/FFFFFF?text=Skill+Move', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Chike Obi's Football Skill Masterclass", description: "Watch Chike Obi's incredible display of dribbling and ball control against top defenders.",
    gameContext: "St. Peter's vs. City Academy", matchId: 'm128', sport: 'Football',
    duration: '0:45', dateUploaded: '2025-06-07T18:00:00Z', athleteId: 'a6', athleteName: 'Chike Obi', athleteAvatarUrl: '/images/default-athlete-avatar.webp', views: 70000, likes: 700, dislikes: 2, shares: 10, products: 0
  },
  {
    id: 'h2', thumbnailUrl: 'https://via.placeholder.com/640x360/00FF00/FFFFFF?text=Volleyball+Spike', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Fatima Conteh's Match-Winning Volleyball Spike", description: "Fatima's powerful spike seals the victory in a nail-biting five-set thriller.",
    gameContext: "Sunshine Girls vs. Elite Academy", matchId: 'm129', sport: 'Volleyball',
    duration: '0:20', dateUploaded: '2025-06-06T12:00:00Z', athleteId: 'a7', athleteName: 'Fatima Conteh', athleteAvatarUrl: '/images/default-athlete-avatar.webp', views: 50000, likes: 500, dislikes: 1, shares: 5, products: 0
  },
  {
    id: 'h3', thumbnailUrl: 'https://via.placeholder.com/640x360/0000FF/FFFFFF?text=Cricket+Wicket', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Rahul Singh's Match-Winning Cricket Wicket", description: "A stunning delivery from Rahul that bowled out the last batsman for a decisive win.",
    gameContext: "Eagle XI vs. Lion XI", matchId: 'm130', sport: 'Cricket',
    duration: '0:18', dateUploaded: '2025-06-05T10:00:00Z', athleteId: 'a8', athleteName: 'Rahul Singh', athleteAvatarUrl: '/images/default-athlete-avatar.webp', views: 65000, likes: 650, dislikes: 0, shares: 8, products: 0
  },
  {
    id: 'h4', thumbnailUrl: 'https://via.placeholder.com/640x360/FF00FF/FFFFFF?text=Handball+Shot', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "Aisha Jallow's Handball Power Shot", description: "Unstoppable power from Aisha as she nets a screamer from outside the D-area.",
    gameContext: "Phoenix vs. Gladiators", matchId: 'm131', sport: 'Handball',
    duration: '0:22', dateUploaded: '2025-06-04T14:00:00Z', athleteId: 'a9', athleteName: 'Aisha Jallow', athleteAvatarUrl: '/images/default-athlete-avatar.webp', views: 40000, likes: 400, dislikes: 0, shares: 5, products: 0
  },
  {
    id: 'h5', thumbnailUrl: 'https://via.placeholder.com/640x360/FFFF00/FFFFFF?text=Tennis+Serve', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "David Omondi's Tennis Ace Serve", description: "A blistering ace from David that left his opponent with no chance.",
    gameContext: "Regional Tennis Tournament", matchId: 'm132', sport: 'Tennis',
    duration: '0:15', dateUploaded: '2025-06-03T11:00:00Z', athleteId: 'a10', athleteName: 'David Omondi', athleteAvatarUrl: '/images/default-athlete-avatar.webp', views: 30000, likes: 300, dislikes: 0, shares: 2, products: 0
  },
  {
    id: 'live1', thumbnailUrl: 'https://via.placeholder.com/640x360/9C27B0/FFFFFF?text=LIVE+Match+1', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "LIVE: Football Clash - Eagles vs. Panthers", description: "Watch the live stream of the exciting football match between the Eagles and Panthers!",
    gameContext: "Eagles vs. Panthers", matchId: 'm133', sport: 'Football',
    duration: 'LIVE', dateUploaded: '2025-06-15T09:00:00Z', athleteId: 'a1', athleteName: 'GamePulse Live', athleteAvatarUrl: '/images/default-user-avatar.webp', views: 181, likes: 10, dislikes: 0, shares: 1, isLive: true, products: 0
  },
  {
    id: 'live2', thumbnailUrl: 'https://via.placeholder.com/640x360/4CAF50/FFFFFF?text=LIVE+Basketball+2', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: "LIVE: Basketball - Dragons vs. Vipers", description: "Tune in for live basketball action as the Dragons take on the Vipers in this intense matchup.",
    gameContext: "Dragons vs. Vipers", matchId: 'm134', sport: 'Basketball',
    duration: 'LIVE', dateUploaded: '2025-06-15T10:00:00Z', athleteId: 'a2', athleteName: 'GamePulse Live', athleteAvatarUrl: '/images/default-user-avatar.webp', views: 51, likes: 5, dislikes: 0, shares: 0, isLive: true, products: 0
  },
];
// --- End Mock Data ---


// Re-use formatting helpers
const formatViewCount = (views) => {
    if (views === undefined) return '';
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
    if (interval > 0.05) return Math.floor(interval * 60) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};


const ViewHighlightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allHighlights, setAllHighlights] = useState(mockAllHighlights);
  const [displayedHighlights, setDisplayedHighlights] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'most-recent', sport: [], team: '', athlete: '', highlightType: [], dateRange: 'All Time', xpRanking: 'Any',
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeRelatedTab, setActiveRelatedTab] = useState("All");

  useEffect(() => {
    const id = searchParams.get('id');
    let highlightToPlay = null;

    if (id) {
        highlightToPlay = allHighlights.find(h => h.id === id);
    }

    if (!highlightToPlay && allHighlights.length > 0) {
        highlightToPlay = allHighlights[0];
        if (!id) {
            setSearchParams({ id: allHighlights[0].id }, { replace: true });
        }
    }
    setSelectedHighlight(highlightToPlay);
    setShowFullDescription(false);
    // Scroll the main content area to top when video changes
    const mainContentContainer = document.getElementById('main-content-container');
    if (mainContentContainer) {
      mainContentContainer.scrollTop = 0;
    }
  }, [searchParams, allHighlights, setSearchParams]);


  useEffect(() => {
    let filtered = [...allHighlights];

    if (activeRelatedTab === "From the series") {
        if (selectedHighlight) {
            filtered = filtered.filter(h =>
                h.athleteId === selectedHighlight.athleteId && h.id !== selectedHighlight.id
            ).sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded));
        } else {
            filtered = [];
        }
    } else if (activeRelatedTab === "From Learnit Training") {
        filtered = filtered.filter(h => h.athleteName === "Jane Doe" || h.athleteName === "Kwame Nkrumah").filter(h => h.id !== selectedHighlight?.id);
    } else {
        filtered.sort((a, b) => b.views - a.views);
    }

    const filteredForGrid = filtered.filter(h => h.id !== selectedHighlight?.id);

    setDisplayedHighlights(filteredForGrid);
  }, [activeCategory, allHighlights, selectedHighlight, activeRelatedTab]);


  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => {
      if (type === 'checkbox') {
        const currentValues = prevFilters[name] || [];
        return { ...prevFilters, [name]: checked ? [...currentValues, value] : currentValues.filter(item => item !== value) };
      } else {
        return { ...prevFilters, [name]: value };
      }
    });
  };

  const handleApplyFilters = useCallback(() => {
    setShowFiltersModal(false);
    let filtered = mockAllHighlights.filter(h => {
      if (filters.sport.length > 0 && !filters.sport.includes(h.sport)) return false;
      if (filters.team && !h.gameContext.toLowerCase().includes(filters.team.toLowerCase())) return false;
      if (filters.athlete && !h.athleteName?.toLowerCase().includes(filters.athlete.toLowerCase())) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (filters.sortBy === 'most-recent') {
        return new Date(b.dateUploaded) - new Date(a.dateUploaded);
      }
      if (filters.sortBy === 'most-viewed') {
        return b.views - a.views;
      }
      if (filters.sortBy === 'most-liked') {
        return b.likes - a.likes;
      }
      return 0;
    });

    setAllHighlights(filtered);
    setActiveCategory("All");
  }, [filters]);


  const handleResetFilters = useCallback(() => {
    setFilters({
      sortBy: 'most-recent', sport: [], team: '', athlete: '', highlightType: [], dateRange: 'All Time', xpRanking: 'Any',
    });
    setAllHighlights(mockAllHighlights);
    setActiveCategory("All");
    setShowFiltersModal(false);
  }, []);

  const onSearchIconClick = () => {
    setShowFiltersModal(true);
  };

  const handleShare = () => {
    if (selectedHighlight && navigator.share) {
      navigator.share({
        title: selectedHighlight.title,
        url: window.location.href,
      }).catch(console.error);
    } else if (selectedHighlight) {
      alert(`Share this link: ${window.location.href}`);
    }
  };

  return (
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col">
      <HighlightsNavbar onSearchIconClick={onSearchIconClick} userAvatarUrl="/images/user-avatar.webp" />
      <HighlightCategoryChips activeCategory={activeCategory} onCategorySelect={setActiveCategory} />

      {selectedHighlight ? (
        <div className="flex-grow flex flex-col md:flex-row relative mt-24 md:mt-16 lg:mt-30 pb-4">
          {/* Left Column: Main Video Player, Description, Comments */}
          <div id="main-content-container" className="md:w-3/5 lg:w-2/3 px-2 md:pr-0 overflow-y-auto custom-scrollbar md:h-[calc(100vh-80px)]">
              {/* Main Video Player */}
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden md:rounded-xl relative mb-3">
                <video
                  key={selectedHighlight.id}
                  src={selectedHighlight.videoUrl}
                  poster={selectedHighlight.thumbnailUrl}
                  controls={true}
                  className="w-full h-full object-contain"
                  playsInline
                  autoPlay
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Title and Actions */}
              <div className="py-2">
                <h1 className="text-lg md:text-xl font-bold leading-tight mb-1">
                  {selectedHighlight.title}
                </h1>

                {/* Channel/Uploader Info and Action Buttons */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-700 py-2">
                  <div className="flex items-center mb-3 md:mb-0">
                    <Link to={`/athlete-profile/${selectedHighlight.athleteId}`} className="flex items-center">
                      <img
                        src={selectedHighlight.athleteAvatarUrl || "/images/default-athlete-avatar.webp"}
                        alt={selectedHighlight.athleteName}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="text-white font-semibold text-sm flex items-center">
                            {selectedHighlight.athleteName}
                            {selectedHighlight.athleteName === "Jane Doe" && <span className="ml-1 text-gamepulse-blue text-xs">✓</span>}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatViewCount(Math.floor(Math.random() * 500000) + 1000)} subscribers
                        </p>
                      </div>
                    </Link>
                    <button className="ml-3 px-3 py-1 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-xs">
                      Subscribe
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center space-x-2 text-xs font-semibold text-gray-300">
                    <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                      <button className="flex items-center hover:text-white transition-colors mr-2">
                        <FaThumbsUp className="text-base mr-1" />
                        <span>{formatViewCount(selectedHighlight.likes)}</span>
                      </button>
                      <span className="border-l border-gray-600 h-4"></span>
                      <button className="flex items-center hover:text-white transition-colors ml-2">
                        <FaThumbsDown className="text-base" />
                      </button>
                    </div>
                    <button onClick={handleShare} className="flex items-center bg-gray-800 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors">
                      <FaShareAlt className="text-base mr-1" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center bg-gray-800 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors hidden md:flex">
                      <FaDownload className="text-base mr-1" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center bg-gray-800 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors hidden md:flex">
                      <FaEllipsisH className="text-base" />
                    </button>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-gray-800 rounded-lg p-2 mt-3 text-xs">
                  <div className="flex items-center text-gray-300 font-semibold mb-1">
                    <span>{formatViewCount(selectedHighlight.views)} views</span>
                    <span className="mx-1">•</span>
                    <span>{timeSince(selectedHighlight.dateUploaded)}</span>
                    {selectedHighlight.products > 0 && (
                        <>
                            <span className="mx-1">•</span>
                            <span>{selectedHighlight.products} products</span>
                        </>
                    )}
                  </div>
                  <p className={`text-gray-300 overflow-hidden ${showFullDescription ? '' : 'line-clamp-2'}`}>
                    {selectedHighlight.description}
                    <br/><br/>
                    {selectedHighlight.athleteName === "Jane Doe" && (
                        <>
                            Get exclusive training tips and behind-the-scenes content by becoming a GamePulse member! Learn more <Link to="/premium" className="text-gamepulse-blue hover:underline">here</Link>.
                        </>
                    )}
                  </p>
                  {selectedHighlight.description.length > 150 || selectedHighlight.products > 0 && (
                      <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-gamepulse-blue hover:underline mt-1 flex items-center text-xs"
                      >
                          {showFullDescription ? (
                              <>Show less <FaAngleUp className="ml-1" /></>
                          ) : (
                              <>Show more <FaAngleDown className="ml-1" /></>
                          )}
                      </button>
                  )}
                  <Link to={`/match-details/${selectedHighlight.matchId}`} className="text-gamepulse-orange hover:underline text-xs font-medium block mt-1">
                      Full Match Details: {selectedHighlight.gameContext}
                  </Link>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-5">
                  <h2 className="text-white text-base font-semibold mb-2 flex items-center">
                      <span>{Math.floor(Math.random() * 1000) + 100} Comments</span>
                      <button className="ml-3 text-xs text-gray-400 hover:text-white flex items-center">
                          <FaEllipsisH className="rotate-90 mr-1" /> Sort by
                      </button>
                  </h2>
                  <div className="flex items-start mb-3">
                      <img src="/images/user-avatar.webp" alt="Your Avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
                      <input
                          type="text"
                          placeholder="Add a comment..."
                          className="flex-grow bg-transparent border-b border-gray-700 focus:border-white text-white py-1 px-0 focus:outline-none text-xs"
                      />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                        <img src="/images/default-user-avatar.webp" alt="Commenter Avatar" className="w-6 h-6 rounded-full object-cover mr-2" />
                        <div>
                            <p className="text-xs text-gray-300 font-semibold">
                                @HenryHalamadrid <span className="text-xs font-normal text-gray-400 ml-1">{timeSince('2025-06-13T10:00:00Z')}</span>
                            </p>
                            <p className="text-gray-300 text-xs mt-1">
                                Incredible play! This is why I love GamePulse.
                            </p>
                            <div className="flex items-center text-xs text-gray-400 mt-1 space-x-3">
                                <button className="flex items-center hover:text-white"><FaThumbsUp className="mr-1" /> 12</button>
                                <button className="flex items-center hover:text-white"><FaThumbsDown className="mr-1" /> 0</button>
                                <button className="hover:text-white">Reply</button>
                            </div>
                        </div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={`mock-comment-${i}`} className="flex items-start">
                          <img src="/images/default-athlete-avatar.webp" alt="Commenter Avatar" className="w-6 h-6 rounded-full object-cover mr-2" />
                          <div>
                              <p className="text-xs text-gray-300 font-semibold">
                                  @AnotherFan{i} <span className="text-xs font-normal text-gray-400 ml-1">{timeSince(new Date(Date.now() - (i * 86400000)).toISOString())}</span>
                              </p>
                              <p className="text-gray-300 text-xs mt-1">
                                  Amazing! Can't wait to see more from this athlete.
                              </p>
                              <div className="flex items-center text-xs text-gray-400 mt-1 space-x-3">
                                  <button className="flex items-center hover:text-white"><FaThumbsUp className="mr-1" /> {10 - i}</button>
                                  <button className="flex items-center hover:text-white"><FaThumbsDown className="mr-1" /> 0</button>
                                  <button className="hover:text-white">Reply</button>
                              </div>
                          </div>
                      </div>
                    ))}
                  </div>
              </div>
          </div>

          {/* Right Column: Up Next / Related Videos */}
          <div className="md:w-2/5 lg:w-1/3 xl:w-1/4 shrink-0 px-2 mt-6 md:mt-0 overflow-y-auto custom-scrollbar md:h-[calc(100vh-80px)] md:pl-4">
              <div className="flex items-center space-x-1 mb-3">
                  {["All", "From the series", "From Learnit Training"].map(tab => (
                      <button
                          key={tab}
                          onClick={() => setActiveRelatedTab(tab)}
                          className={`
                              px-2 py-1 rounded-full text-xs font-semibold transition-colors
                              ${activeRelatedTab === tab ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}
                          `}
                      >
                          {tab}
                      </button>
                  ))}
              </div>

            {displayedHighlights.length > 0 ? (
              <HighlightGrid
                highlights={displayedHighlights}
                headline=""
              />
            ) : (
              <NoHighlightsFound
                message="No related highlights found."
                onShowTrending={() => setActiveCategory("Trending")}
                onGoLiveMatches={() => {}}
                onDiscoverAthletes={() => {}}
              />
            )}
          </div>
        </div>
      ) : (
        <NoHighlightsFound
          message="No highlights available. Check back soon!"
          onShowTrending={() => setActiveCategory("Trending")}
          onGoLiveMatches={() => {}}
          onDiscoverAthletes={() => {}}
        />
      )}

      {showFiltersModal && (
        <div className="fixed inset-0 z-50 bg-gamepulse-dark bg-opacity-95 flex flex-col items-center justify-start pt-10 animate-fade-in">
           <div className="w-full text-right px-3 py-1">
              <button
                  onClick={() => setShowFiltersModal(false)}
                  className="text-white text-xl p-1 rounded-full hover:bg-white/10"
              >
                  &times;
              </button>
          </div>
          <HighlightFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        </div>
      )}
    </div>
  );
};

export default ViewHighlightsPage;