import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaFootballBall, FaBasketballBall,  FaVolleyballBall, FaSearch, FaBell, FaUserCircle, FaChevronDown, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaPlusCircle, FaStar, FaTrophy, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Utility for smooth scrolling in horizontal lists
const scrollHorizontally = (elementRef, direction) => {
  if (elementRef.current) {
    const scrollAmount = elementRef.current.clientWidth / 2; // Scroll half the container width
    if (direction === 'left') {
      elementRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      elementRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
};

// Helper to format dates consistently
const formatDateForDisplay = (date) => {
  if (!(date instanceof Date)) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const formatTimeForDisplay = (date) => {
    if (!(date instanceof Date)) {
        return '';
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// Custom Hook to simulate live match data
const useLiveMatchData = (initialMatches) => {
  const [liveMatches, setLiveMatches] = useState(() => initialMatches.map(match => ({
    ...match,
    // Ensure date is a Date object if it's not already
    date: match.date instanceof Date ? match.date : new Date(match.date),
    score1: 0,
    score2: 0,
    gameTime: 0,
    status: 'scheduled'
  })));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches(prevMatches => prevMatches.map(match => {
        // Only update matches that are scheduled or live and are on or after current date
        const isTodayOrFuture = match.date.toDateString() === new Date().toDateString() || match.date > new Date();

        if (isTodayOrFuture && match.status === 'scheduled') {
          // Simulate some matches starting live if their scheduled time has passed
          const now = new Date();
          if (match.date <= now && Math.random() > 0.6) { // ~40% chance to start if time has come
            return {
              ...match,
              status: 'live',
              score1: Math.floor(Math.random() * 2),
              score2: Math.floor(Math.random() * 2),
              gameTime: 0
            };
          }
        } else if (match.status === 'live') {
          let newGameTime = match.gameTime + 1;
          let newScore1 = match.score1;
          let newScore2 = match.score2;

          if (newGameTime % 15 === 0 && Math.random() > 0.7) {
            if (Math.random() > 0.5) { newScore1 += 1; } else { newScore2 += 1; }
          }

          if (newGameTime >= 90) {
            return { ...match, status: 'finished', gameTime: 90, score1: newScore1, score2: newScore2 };
          }

          return { ...match, gameTime: newGameTime, score1: newScore1, score2: newScore2 };
        }
        return match;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return liveMatches;
};


const LiveMatchesDashboard = () => {
  const liveMatchesScrollRef = useRef(null);
  const upcomingMatchesScrollRef = useRef(null); // Ref for upcoming matches

  // Initial placeholder data for matches, with Date objects
  const initialFootballMatches = [
    { id: 'm1', league: 'Premier League U17', date: new Date(2025, 5, 18, 17, 0), team1: 'Liverpool FC U17', team2: 'Man Utd U17', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png' },
    { id: 'm2', league: 'La Liga U17', date: new Date(2025, 5, 18, 17, 30), team1: 'Real Madrid Youth', team2: 'Athletic Madrid Juniors', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png' },
    { id: 'm3', league: 'African Youth League', date: new Date(2025, 5, 18, 18, 0), team1: 'Accra Lions U17', team2: 'Cape Town FC Youth', team1Logo: 'https://via.placeholder.com/50/FFD700/000000?text=AL', team2Logo: 'https://via.placeholder.com/50/000080/FFFFFF?text=CTFC' },
    { id: 'm4', league: 'Premier League U17', date: new Date(2025, 5, 19, 14, 0), team1: 'Man City Academy', team2: 'Spurs Youth', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png' },
    { id: 'm5', league: 'La Liga U17', date: new Date(2025, 5, 19, 15, 30), team1: 'FC Barcelona U17', team2: 'Athletic Bilbao Academy', team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona.svg/1200px-FC_Barcelona.svg.png', team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Athletic_Club_logo.svg/1200px-Athletic_Club_logo.svg.png' },
    { id: 'm6', league: 'African Youth League', date: new Date(2025, 5, 20, 19, 30), team1: 'Nairobi Stars U17', team2: 'Lagos Dynamos Youth', team1Logo: 'https://via.placeholder.com/50/A52A2A/FFFFFF?text=NS', team2Logo: 'https://via.placeholder.com/50/008000/FFFFFF?text=LD' },
  ];

  const allFootballMatches = useLiveMatchData(initialFootballMatches);

  const [activeMatchTab, setActiveMatchTab] = useState('All games'); // Current tab (All, Live, Upcoming, Finished)
  const [activeSportFilter, setActiveSportFilter] = useState('Football'); // Right sidebar sports filter
  const [activeLeague, setActiveLeague] = useState('Premier League U17'); // Left sidebar popular leagues
  const [currentDate, setCurrentDate] = useState(new Date()); // For date navigation

  // Filter matches based on active tab AND selected date
  const matchesForCurrentDate = useMemo(() => {
    return allFootballMatches.filter(match => {
        return match.date.toDateString() === currentDate.toDateString();
    });
  }, [allFootballMatches, currentDate]);


  const filteredMatchesByTab = useMemo(() => {
    return matchesForCurrentDate.filter(match => {
      if (activeMatchTab === 'All games') {
        return true;
      } else if (activeMatchTab === 'Live matches') {
        return match.status === 'live';
      } else if (activeMatchTab === 'Upcoming') {
        return match.status === 'scheduled';
      } else if (activeMatchTab === 'Finished') {
        return match.status === 'finished';
      }
      return true;
    });
  }, [matchesForCurrentDate, activeMatchTab]);


  // Placeholder data for Top Scouts and Player Performance
  const topScouts = [
    { id: 's1', name: 'Kwame Mensah', talentDiscovered: 15, avgRating: 4.8, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 's2', name: 'Naledi Zuma', talentDiscovered: 12, avgRating: 4.7, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 's3', name: 'Jide Okoro', talentDiscovered: 10, avgRating: 4.5, avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { id: 's4', name: 'Amina Diallo', talentDiscovered: 8, avgRating: 4.4, avatar: 'https://randomuser.me/api/portraits/women/62.jpg' },
  ];

  const playerPerformance = [
    { id: 'pp1', name: 'Chisom Ugo', team: 'Lagos Dynamos', pos: 'FW', goals: 7, assists: 3, rating: 8.9 },
    { id: 'pp2', name: 'Ama Adom', team: 'Accra Lions', pos: 'MF', goals: 4, assists: 6, rating: 8.7 },
    { id: 'pp3', name: 'Thabo Mbeki', team: 'Cape Town FC', pos: 'DF', goals: 1, tackles: 15, rating: 8.5 },
    { id: 'pp4', name: 'Zara Conteh', team: 'Nairobi Stars', pos: 'GK', saves: 20, cleanSheets: 5, rating: 8.8 },
  ];

  const newsArticles = [
    { id: 'n1', title: 'Rising Stars from Ghana: Who to Watch in the Upcoming Season', imageUrl: 'https://via.placeholder.com/150x80/1282A2/FFFFFF?text=News1', date: 'June 15, 2025' },
    { id: 'n2', title: 'South African Youth Leagues: A Hotbed for Future Talent', imageUrl: 'https://via.placeholder.com/150x80/FCCA46/0A1128?text=News2', date: 'June 14, 2025' },
    { id: 'n3', title: 'Scouting Success: How Tech is Transforming Talent Discovery', imageUrl: 'https://via.placeholder.com/150x80/034078/B4CED9?text=News3', date: 'June 13, 2025' },
  ];

  const leagueStandings = {
    'Premier League U17': [
        { team: 'Man City Academy', played: 10, wins: 8, draws: 1, losses: 1, points: 25 },
        { team: 'Liverpool FC U17', played: 10, wins: 7, draws: 2, losses: 1, points: 23 },
        { team: 'Man Utd U17', played: 10, wins: 6, draws: 2, losses: 2, points: 20 },
        { team: 'Spurs Youth', played: 10, wins: 5, draws: 3, losses: 2, points: 18 },
    ],
    'African Youth League': [
        { team: 'Accra Lions U17', played: 8, wins: 7, draws: 1, losses: 0, points: 22 },
        { team: 'Lagos Dynamos Youth', played: 8, wins: 5, draws: 2, losses: 1, points: 17 },
        { team: 'Cape Town FC Youth', played: 8, wins: 4, draws: 2, losses: 2, points: 14 },
        { team: 'Nairobi Stars U17', played: 8, wins: 3, draws: 2, losses: 3, points: 11 },
    ]
  };


  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
    setActiveMatchTab('All games'); // Reset tab when date changes
  };


  // Main Featured Match Component - adapting to the new design
  const FeaturedMatch = ({ match }) => {
    const isLive = match.status === 'live';
    const isFinished = match.status === 'finished';

    // Find a featured player for this match (placeholder logic, could be dynamic based on performance)
    const featuredPlayer = playerPerformance.find(p => p.team.includes(match.team1.split(' ')[0]) || p.team.includes(match.team2.split(' ')[0])) || playerPerformance[0];

    return (
      <div className="bg-neutral-dark-gray rounded-xl p-6 relative overflow-hidden h-[400px] flex flex-col justify-between">
        {/* Background gradient overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gamepulse-blue-dark via-gamepulse-dark to-gamepulse-dark opacity-90 rounded-xl"></div>
        {/* Placeholder background image - replace with actual match or stadium background */}
        <div className="absolute inset-0 bg-cover bg-center rounded-xl z-0 opacity-20" style={{ backgroundImage: "url('https://via.placeholder.com/800x400/333333/000000?text=Stadium+Background')" }}></div>

        {/* Top section: League, Status, Time */}
        <div className="relative z-10 flex justify-between items-center text-sm text-neutral-medium-gray mb-4">
          <span className="bg-neutral-black/50 px-3 py-1 rounded-full text-xs font-semibold">{match.league}</span>
          <span className={`font-bold text-xs flex items-center ${isLive ? 'text-success-green' : isFinished ? 'text-error-red' : 'text-neutral-white'}`}>
            {isLive && (
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green"></span>
              </span>
            )}
            {isLive ? 'LIVE' : isFinished ? 'FULL TIME' : 'SCHEDULED'}
            <span className="ml-2 text-neutral-light-gray">{isLive ? `${match.gameTime}'` : formatTimeForDisplay(match.date)}</span>
          </span>
        </div>

        {/* Middle section: Teams & Score */}
        <div className="relative z-10 flex items-center justify-center space-x-6 flex-grow">
          <div className="flex flex-col items-center">
            <img src={match.team1Logo} alt={`${match.team1} Logo`} className="w-20 h-20 object-contain mb-2 filter drop-shadow-lg" />
            <span className="text-xl font-heading font-extrabold text-neutral-white text-center">{match.team1}</span>
          </div>
          <div className="text-center">
            <span className="text-5xl font-heading font-extrabold text-gamepulse-yellow">
              {isLive || isFinished ? `${match.score1}:${match.score2}` : 'VS'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src={match.team2Logo} alt={`${match.team2} Logo`} className="w-20 h-20 object-contain mb-2 filter drop-shadow-lg" />
            <span className="text-xl font-heading font-extrabold text-neutral-white text-center">{match.team2}</span>
          </div>
        </div>

        {/* Bottom section: Player to Watch / Actions */}
        <div className="relative z-10 bg-neutral-black/40 backdrop-blur-sm rounded-lg p-4 mt-4 flex items-center justify-between">
            <div className="flex items-center">
                <FaStar className="text-gamepulse-yellow text-2xl mr-3" />
                <div>
                    <p className="text-xs text-neutral-medium-gray">Player to Watch:</p>
                    <p className="font-bold text-neutral-white text-lg">{featuredPlayer?.name || 'N/A'}</p>
                </div>
            </div>
            <Link to={`/athlete/${featuredPlayer?.id}`} className="bg-gamepulse-yellow text-gamepulse-dark px-5 py-2 rounded-full font-bold hover:bg-gamepulse-yellow/80 transition-colors">
                View Profile
            </Link>
        </div>
      </div>
    );
  };

  // Small Match Card for horizontal list and upcoming matches
  const SmallMatchCard = ({ match }) => {
    const isLive = match.status === 'live';
    const isFinished = match.status === 'finished';

    return (
      <Link to={`/match-details/${match.id}`} className="flex-shrink-0 w-60 bg-neutral-dark-gray rounded-lg p-3 mr-4 flex flex-col justify-between hover:bg-neutral-medium-gray transition-colors cursor-pointer">
        <div className="flex justify-between items-center text-xs text-neutral-medium-gray mb-2">
          <span>{match.league}</span>
          <span className={`font-bold ${isLive ? 'text-success-green' : isFinished ? 'text-error-red' : 'text-neutral-white'}`}>
            {isLive ? 'LIVE' : isFinished ? 'FT' : formatTimeForDisplay(match.date)}
          </span>
        </div>
        <div className="flex items-center justify-between text-neutral-white text-sm font-semibold mb-2">
          <img src={match.team1Logo} alt="" className="w-6 h-6 object-contain mr-2" />
          <span>{match.team1.replace(' U17', '').split(' ')[0]}</span>
          <span className="text-neutral-medium-gray text-xs mx-2">
            {isLive || isFinished ? `${match.score1}:${match.score2}` : 'VS'}
          </span>
          <span>{match.team2.replace(' Youth', '').replace(' Juniors', '').split(' ')[0]}</span>
          <img src={match.team2Logo} alt="" className="w-6 h-6 object-contain ml-2" />
        </div>
        <div className="text-xs text-neutral-medium-gray text-right">
          {isLive && `${match.gameTime}'`}
          {!isLive && !isFinished && formatDateForDisplay(match.date)}
        </div>
      </Link>
    );
  };


  return (
    <div className="min-h-screen bg-gamepulse-dark text-neutral-white font-sans">
      {/* Dashboard Specific Header */}
      <header className="bg-neutral-dark-gray py-3 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
        {/* Left Section: Logo & Main Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-blue-light hover:text-gamepulse-yellow transition-colors">
            GamePulse Africa
          </Link>
          <nav className="hidden lg:flex space-x-6"> {/* Larger screens for main nav */}
            {['Live Matches', 'Upcoming Talents', 'discover talent', 'Highlights', 'Statistics', 'News'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                className="text-neutral-medium-gray hover:text-neutral-white transition-colors text-sm font-semibold px-2 py-1"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: User & Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gamepulse-blue-dark rounded-full px-3 py-1 text-sm font-semibold text-neutral-white cursor-pointer" onClick={() => alert('Manage your GamePulse Credits / Profile Points.')}>
            <span className="mr-1">Points: 1500 GP</span> {/* Re-purposed balance */}
            <FaChevronDown className="text-xs text-neutral-medium-gray" />
          </div>
          <button className="text-neutral-medium-gray hover:text-neutral-white transition-colors" onClick={() => alert('Search functionality coming soon!')}><FaSearch className="text-xl" /></button>
          <button className="text-neutral-medium-gray hover:text-neutral-white transition-colors" onClick={() => alert('You have new notifications!')}><FaBell className="text-xl" /></button>
          <div className="flex items-center text-neutral-white text-sm font-semibold cursor-pointer" onClick={() => alert('George Chichua profile settings.')}>
            <FaUserCircle className="text-2xl mr-2 text-gamepulse-yellow" /> George Chichua
          </div>
        </div>
      </header>

      {/* Main Content Area - Adjusted pt-16 for the fixed header */}
      <div className="pt-16 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Main Content Column (Left, wider) */}
        <main className="lg:col-span-3">
          {/* Date Navigation */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6 flex justify-between items-center">
            <button className="p-2 rounded-full bg-neutral-black/30 hover:bg-gamepulse-blue-dark transition-colors" onClick={() => handleDateChange(-1)}>
                <FaChevronLeft className="text-neutral-white" />
            </button>
            <h2 className="text-xl font-bold text-neutral-white flex items-center">
                <FaCalendarAlt className="mr-3 text-gamepulse-yellow" /> {formatDateForDisplay(currentDate)}
            </h2>
            <button className="p-2 rounded-full bg-neutral-black/30 hover:bg-gamepulse-blue-dark transition-colors" onClick={() => handleDateChange(1)}>
                <FaChevronRight className="text-neutral-white" />
            </button>
          </section>

          {/* Featured Match Section (First match for the selected date, if any) */}
          {matchesForCurrentDate.length > 0 && (
             <div className="mb-6">
                <FeaturedMatch match={matchesForCurrentDate[0]} />
             </div>
          )}
          {matchesForCurrentDate.length === 0 && (
              <div className="bg-neutral-dark-gray rounded-xl p-6 mb-6 text-center text-neutral-medium-gray h-[400px] flex items-center justify-center">
                  No matches scheduled for {formatDateForDisplay(currentDate)}.
              </div>
          )}


          {/* Live Matches Horizontal Scroll Section */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-white">Live Matches</h2>
              <div className="flex space-x-2 text-neutral-medium-gray">
                <button className="hover:text-neutral-white p-2 rounded-full bg-neutral-black/30" onClick={() => scrollHorizontally(liveMatchesScrollRef, 'left')}><FaChevronLeft /></button>
                <button className="hover:text-neutral-white p-2 rounded-full bg-neutral-black/30" onClick={() => scrollHorizontally(liveMatchesScrollRef, 'right')}><FaChevronRight /></button>
              </div>
            </div>
            <div ref={liveMatchesScrollRef} className="flex overflow-x-auto pb-4 scrollbar-hide">
              {filteredMatchesByTab.filter(m => m.status === 'live').map((match) => (
                <SmallMatchCard key={match.id} match={match} />
              ))}
              {filteredMatchesByTab.filter(m => m.status === 'live').length === 0 && (
                  <p className="text-neutral-medium-gray text-center w-full min-w-[300px] py-4">No live matches for this date.</p>
              )}
            </div>
          </section>

          {/* Upcoming Matches Section (Vertical list for selected date) */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-neutral-white">Upcoming Matches</h2>
                <div className="flex space-x-2 text-neutral-medium-gray">
                    <button className="hover:text-neutral-white p-2 rounded-full bg-neutral-black/30" onClick={() => scrollHorizontally(upcomingMatchesScrollRef, 'left')}><FaChevronLeft /></button>
                    <button className="hover:text-neutral-white p-2 rounded-full bg-neutral-black/30" onClick={() => scrollHorizontally(upcomingMatchesScrollRef, 'right')}><FaChevronRight /></button>
                </div>
            </div>
            <div ref={upcomingMatchesScrollRef} className="flex overflow-x-auto pb-4 scrollbar-hide">
                {filteredMatchesByTab.filter(m => m.status === 'scheduled').length > 0 ? (
                    filteredMatchesByTab.filter(m => m.status === 'scheduled').map((match) => (
                        <SmallMatchCard key={match.id} match={match} />
                    ))
                ) : (
                    <p className="text-neutral-medium-gray text-center w-full min-w-[300px] py-4">No upcoming matches for this date.</p>
                )}
            </div>
          </section>


          {/* Player Performance Leaderboard (replaces Tipster Rating) */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6">
            <h2 className="text-xl font-bold text-neutral-white mb-4 flex items-center"><FaChartLine className="mr-2 text-gamepulse-yellow" /> Player Performance Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-neutral-light-gray">
                <thead>
                  <tr className="text-left text-neutral-medium-gray border-b border-neutral-black">
                    <th className="py-2 px-3">Rank</th>
                    <th className="py-2 px-3">Player</th>
                    <th className="py-2 px-3">Team</th>
                    <th className="py-2 px-3">Position</th>
                    <th className="py-2 px-3">Stats</th> {/* Changed from Goals/Points to generic Stats */}
                    <th className="py-2 px-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {playerPerformance.map((player, index) => (
                    <tr key={player.id} className="border-b border-neutral-black last:border-b-0 hover:bg-neutral-dark-gray/50">
                      <td className="py-2 px-3 font-bold">{index + 1}</td>
                      <td className="py-2 px-3">{player.name}</td>
                      <td className="py-2 px-3">{player.team}</td>
                      <td className="py-2 px-3">{player.pos}</td>
                      <td className="py-2 px-3">{player.goals ? `${player.goals}G, ${player.assists}A` : player.saves ? `${player.saves} Saves` : ''}</td>
                      <td className="py-2 px-3 text-gamepulse-yellow font-semibold">{player.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Scout Leaderboard (replaces Bookmaker Rating) */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6">
            <h2 className="text-xl font-bold text-neutral-white mb-4 flex items-center"><FaTrophy className="mr-2 text-gamepulse-yellow" /> Top Scout Leaderboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topScouts.map((scout) => (
                <div key={scout.id} className="bg-gamepulse-dark rounded-lg p-3 text-center flex flex-col items-center">
                  <img src={scout.avatar} alt={scout.name} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-gamepulse-blue" />
                  <p className="font-semibold text-neutral-white">{scout.name}</p>
                  <p className="text-xs text-neutral-medium-gray mb-2">{scout.talentDiscovered} Talents Discovered</p>
                  <span className="text-gamepulse-yellow text-sm font-bold flex items-center"><FaStar className="mr-1" /> {scout.avgRating}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GamePulse News Section */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 mb-6">
            <h2 className="text-xl font-bold text-neutral-white mb-4 flex items-center"><FaBell className="mr-2 text-gamepulse-blue-light" /> GamePulse News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsArticles.map((article) => (
                <Link to={`/news/${article.id}`} key={article.id} className="bg-gamepulse-dark rounded-lg overflow-hidden flex flex-col sm:flex-row hover:bg-gamepulse-blue-dark transition-colors">
                  <img src={article.imageUrl} alt={article.title} className="w-full sm:w-24 h-24 object-cover flex-shrink-0" />
                  <div className="p-3">
                    <h3 className="font-semibold text-neutral-white text-md mb-1">{article.title}</h3>
                    <p className="text-xs text-neutral-medium-gray">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block bg-neutral-dark-gray rounded-xl p-4 h-fit sticky top-20">
          {/* Sports Filter */}
          <h3 className="text-lg font-bold text-neutral-light-gray mb-4">Sports</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {['All Sports', 'Football', 'Basketball', 'Tennis'].map((sport) => (
              <button
                key={sport}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeSportFilter === sport
                    ? 'bg-gamepulse-blue text-neutral-white'
                    : 'bg-neutral-black/30 text-neutral-medium-gray hover:bg-gamepulse-blue-dark hover:text-neutral-white'
                }`}
                onClick={() => setActiveSportFilter(sport)}
              >
                {sport}
              </button>
            ))}
          </div>

          {/* Popular Leagues */}
          <h3 className="text-lg font-bold text-neutral-light-gray mb-4">Popular Leagues</h3>
          <ul className="space-y-2 text-neutral-medium-gray text-sm">
            {['Premier League U17', 'La Liga U17', 'African Youth League', 'NBA High School', 'WTA Juniors'].map((league, index) => (
              <li
                key={league} // Use league name as key
                className={`flex items-center justify-between p-2 rounded cursor-pointer ${activeLeague === league ? 'text-gamepulse-yellow bg-gamepulse-blue-dark' : 'hover:bg-gamepulse-blue-dark'}`}
                onClick={() => setActiveLeague(league)}
              >
                {league} <span className="text-xs text-neutral-medium-gray">({(index + 1) * 10 + 5} matches)</span>
              </li>
            ))}
          </ul>

          {/* League Standings Section */}
          {activeLeague && leagueStandings[activeLeague] && (
            <section className="mt-6">
              <h3 className="text-lg font-bold text-neutral-light-gray mb-4">{activeLeague} Standings</h3>
              <div className="overflow-x-auto bg-gamepulse-dark rounded-lg">
                <table className="min-w-full text-xs text-neutral-light-gray">
                  <thead>
                    <tr className="text-left text-neutral-medium-gray border-b border-neutral-black">
                      <th className="py-2 px-2">Team</th>
                      <th className="py-2 px-1 text-center">P</th>
                      <th className="py-2 px-1 text-center">W</th>
                      <th className="py-2 px-1 text-center">D</th>
                      <th className="py-2 px-1 text-center">L</th>
                      <th className="py-2 px-2 text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leagueStandings[activeLeague].map((team, index) => (
                      <tr key={team.team} className="border-b border-neutral-black last:border-b-0 hover:bg-neutral-blue-dark/50">
                        <td className="py-2 px-2 font-semibold">{team.team}</td>
                        <td className="py-2 px-1 text-center">{team.played}</td>
                        <td className="py-2 px-1 text-center">{team.wins}</td>
                        <td className="py-2 px-1 text-center">{team.draws}</td>
                        <td className="py-2 px-1 text-center">{team.losses}</td>
                        <td className="py-2 px-2 text-center font-bold text-gamepulse-yellow">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Match Filtering Tabs */}
          <h3 className="text-lg font-bold text-neutral-light-gray mb-4 mt-6">Match Filters</h3>
          <div className="flex flex-col space-y-2">
            {['All games', 'Live matches', 'Upcoming', 'Finished'].map(tab => (
                <button
                  key={tab}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-semibold ${
                    activeMatchTab === tab
                      ? 'bg-gamepulse-blue text-neutral-white'
                      : 'bg-neutral-black/30 text-neutral-medium-gray hover:bg-gamepulse-blue-dark hover:text-neutral-white'
                  }`}
                  onClick={() => setActiveMatchTab(tab)}
                >
                  {tab}
                </button>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
};

export default LiveMatchesDashboard;