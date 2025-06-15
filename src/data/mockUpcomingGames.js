// src/data/mockUpcomingGames.js

// Helper function to get a future date
const getFutureDate = (daysAhead) => {
  const date = new Date('2025-06-15T00:00:00Z'); // Reference date: June 15, 2025
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
};

// Placeholder images for logos and athletes
const homeLogo1 = '/images/greenwood_logo.png'; // Assuming these exist from previous context
const awayLogo1 = '/images/riverside_logo.png';
const homeLogo2 = '/images/staracademy_logo.png';
const awayLogo2 = '/images/coastal_logo.png';
const homeLogo3 = '/images/lions_logo.png';
const awayLogo3 = '/images/victory_logo.png';
const homeLogo4 = '/images/alpha_logo.png';
const awayLogo4 = '/images/thunder_logo.png'; // New placeholder
const homeLogo5 = '/images/united_logo.png'; // New placeholder
const awayLogo5 = '/images/champions_logo.png'; // New placeholder

const playerPhoto1 = '/images/player1.png'; // Example player photo
const athleteAma = '/images/athlete_ama.png'; // Example athlete photo
const athleteTunde = '/images/athlete_tunde.png'; // Example athlete photo

export const mockUpcomingGames = [
  // --- Games for Today (June 15, 2025) ---
  {
    id: 'ug1',
    date: getFutureDate(0), // Today
    time: '10:00 AM GMT',
    homeTeam: 'Greenwood High',
    awayTeam: 'Riverside Academy',
    homeLogo: homeLogo1,
    awayLogo: awayLogo1,
    sport: 'Football',
    location: 'Accra Sports Complex',
    league: 'National High School Football League',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
  {
    id: 'ug2',
    date: getFutureDate(0), // Today
    time: '01:00 PM GMT',
    homeTeam: 'Star Academy',
    awayTeam: 'Coastal Sprinters',
    homeLogo: homeLogo2,
    awayLogo: awayLogo2,
    sport: 'Basketball',
    location: 'Lagos Indoor Arena',
    league: 'West Africa Basketball Championship',
    status: 'Upcoming',
    isFavorite: true,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
  {
    id: 'ug3',
    date: getFutureDate(0), // Today
    time: '04:30 PM GMT',
    homeTeam: 'Lion\'s Pride',
    awayTeam: 'Victory FC',
    homeLogo: homeLogo3,
    awayLogo: awayLogo3,
    sport: 'Rugby',
    location: 'Cape Town Rugby Ground',
    league: 'South African Schools Rugby Cup',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
  },
  {
    id: 'ug_live_test',
    date: getFutureDate(0), // Today
    time: '06:00 PM GMT', // Slightly after current time to simulate live
    homeTeam: 'Alpha Strikers',
    awayTeam: 'Thunder Bolts',
    homeLogo: homeLogo4,
    awayLogo: awayLogo4,
    sport: 'Football',
    location: 'Kigali National Stadium',
    league: 'East African Youth League',
    status: 'In Progress', // Simulate a live game
    isFavorite: false,
    period: '1st Half',
    gameClockSeconds: 1500, // 25 minutes
    homeScore: 0,
    awayScore: 0,
  },

  // --- Games for Tomorrow (June 16, 2025) ---
  {
    id: 'ug4',
    date: getFutureDate(1), // Tomorrow
    time: '09:00 AM GMT',
    homeTeam: 'Greenwood High',
    awayTeam: 'Star Academy',
    homeLogo: homeLogo1,
    awayLogo: homeLogo2,
    sport: 'Tennis',
    location: 'Accra Tennis Club',
    league: 'National High School Tennis Meet',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
  {
    id: 'ug5',
    date: getFutureDate(1), // Tomorrow
    time: '02:00 PM GMT',
    homeTeam: 'United Youth',
    awayTeam: 'Champions XI',
    homeLogo: homeLogo5,
    awayLogo: awayLogo5,
    sport: 'Cricket',
    location: 'Nairobi Cricket Oval',
    league: 'East African Cricket League',
    status: 'Upcoming',
    isFavorite: true,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },

  // --- Games for This Week (June 17-21, 2025) ---
  {
    id: 'ug6',
    date: getFutureDate(2), // June 17
    time: '03:00 PM GMT',
    homeTeam: 'Riverside Academy',
    awayTeam: 'Coastal Sprinters',
    homeLogo: awayLogo1,
    awayLogo: awayLogo2,
    sport: 'Handball',
    location: 'Abuja Sports Centre',
    league: 'Nigerian School Handball Tournament',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
  {
    id: 'ug7',
    date: getFutureDate(3), // June 18
    time: '05:00 PM GMT',
    homeTeam: 'Victory FC',
    awayTeam: 'Alpha Strikers',
    homeLogo: awayLogo3,
    awayLogo: homeLogo4,
    sport: 'Volleyball',
    location: 'Durban Beach Courts',
    league: 'South Africa Youth Volleyball',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },

  // --- Games for Next Week / Later This Month ---
  {
    id: 'ug8',
    date: getFutureDate(7), // Next week
    time: '11:00 AM GMT',
    homeTeam: 'Greenwood High',
    awayTeam: 'Lion\'s Pride',
    homeLogo: homeLogo1,
    awayLogo: homeLogo3,
    sport: 'Athletics',
    location: 'Addis Ababa National Track',
    league: 'All Africa High School Athletics',
    status: 'Upcoming',
    isFavorite: true,
    period: 'Pre-Event',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
  {
    id: 'ug9',
    date: getFutureDate(15), // In two weeks
    time: '07:00 PM GMT',
    homeTeam: 'Star Academy',
    awayTeam: 'United Youth',
    homeLogo: homeLogo2,
    awayLogo: homeLogo5,
    sport: 'Basketball',
    location: 'Accra Sports Complex',
    league: 'National High School Basketball League',
    status: 'Upcoming',
    isFavorite: false,
    period: 'Pre-Game',
    gameClockSeconds: null,
    homeScore: null,
    awayScore: null,
  },
];

// Mock data for featured games
export const mockFeaturedGames = [
  // These could be a subset of upcoming games, or specially curated
  {
    id: 'feat1',
    date: getFutureDate(2), // June 17
    time: '03:00 PM GMT',
    homeTeam: 'Riverside Academy',
    awayTeam: 'Coastal Sprinters',
    homeLogo: awayLogo1,
    awayLogo: awayLogo2,
    sport: 'Handball',
    location: 'Abuja Sports Centre',
    league: 'Nigerian School Handball Tournament',
    status: 'Upcoming',
    isFavorite: false,
  },
  {
    id: 'feat2',
    date: getFutureDate(8), // June 23
    time: '04:00 PM GMT',
    homeTeam: 'Team Courage', // New placeholder
    awayTeam: 'Elite Warriors', // New placeholder
    homeLogo: '/images/courage_logo.png', // Placeholder
    awayLogo: '/images/elite_logo.png', // Placeholder
    sport: 'Martial Arts',
    location: 'Dakar Dojo Arena',
    league: 'West African Martial Arts Challenge',
    status: 'Upcoming',
    isFavorite: true,
  },
  {
    id: 'feat3',
    date: getFutureDate(0), // Today
    time: '01:00 PM GMT',
    homeTeam: 'Star Academy',
    awayTeam: 'Coastal Sprinters',
    homeLogo: homeLogo2,
    awayLogo: awayLogo2,
    sport: 'Basketball',
    location: 'Lagos Indoor Arena',
    league: 'West Africa Basketball Championship',
    status: 'Upcoming',
    isFavorite: true,
  },
];

// Mock data for related athletes (for the "No Games Found" section)
export const mockTrendingAthletes = [
    { id: 'athlete1', name: 'Ama Kofi', sport: 'Basketball', photo: athleteAma, team: 'Star Academy' },
    { id: 'athlete2', name: 'Tunde Balogun', sport: 'Athletics', photo: athleteTunde, team: 'Coastal Sprinters' },
    { id: 'athlete3', name: 'Zola Mofokeng', sport: 'Rugby', photo: '/images/athlete_zola.png', team: 'Lion\'s Pride' }, // Assuming this exists
];