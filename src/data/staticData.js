// src/data/staticData.js
// Comprehensive static data for testing - no external dependencies

// Profile Pictures (base64 encoded or local paths)
export const PROFILE_PICTURES = {
  default: '/images/default-avatar.webp',
  coach: '/images/default-coach-avatar.webp',
  scout: '/images/default-scout-avatar.webp',
  fan: '/images/default-fan-avatar.webp',
  athlete1: '/images/athlete1.jpg',
  athlete2: '/images/athlete2.jpg',
  athlete3: '/images/athlete3.jpg',
  athlete4: '/images/athlete4.jpg',
  coach1: '/images/coach1.jpg',
  coach2: '/images/coach2.jpg',
  scout1: '/images/scout1.jpg',
  fan1: '/images/fan1.jpg',
  fan2: '/images/fan2.jpg',
  fan3: '/images/fan3.jpg',
};

// Mock Users for Authentication
export const mockUsers = [
  {
    id: 'user-ama',
    email: 'ama@example.com',
    password: 'passWord@123',
    fullName: 'Ama Asare',
    userType: 'athlete',
    slug: 'ama-owusu',
    profilePictureUrl: PROFILE_PICTURES.athlete1,
    location: 'Accra, Ghana',
    bio: ['An aspiring athlete ready to make an impact.'],
    motto: 'Strive for greatness.',
    careerStats: {},
    achievements: [],
    media: [],
    keyAttributes: [],
    digitalClassroomProgress: [],
    network: { followers: 0, connections: 0, following: 0 },
    contactSettings: { inAppMessagingEnabled: true, emailEnabled: true },
    icons: {},
    position: 'Guard',
    team: 'GamePulse Juniors',
    sportType: 'basketball',
    xpRank: 'Beginner',
  },
  {
    id: 'user-coach',
    email: 'coach@example.com',
    password: 'coachPassword',
    fullName: 'Coach Mensah',
    userType: 'coach',
    slug: 'coach-mensah-coach456',
    profilePictureUrl: PROFILE_PICTURES.coach1,
    location: 'Kumasi, Ashanti',
    bio: ['Experienced basketball coach. Building champions.'],
    motto: 'Discipline and Dedication.',
    careerStats: { coachedYears: 10, teams: 3, championships: 2 },
    achievements: [{ year: 2023, description: "National Coach of the Year" }],
    contactSettings: { inAppMessagingEnabled: true, emailEnabled: true, phoneEnabled: true },
    icons: { twitter: 'https://twitter.com/coachmensah' },
    xpRank: 'Expert',
  },
  {
    id: 'user-scout',
    email: 'scout@example.com',
    password: 'scoutPassword',
    fullName: 'Scout Nkrumah',
    userType: 'scout',
    slug: 'scout-nkrumah-scout789',
    profilePictureUrl: PROFILE_PICTURES.scout1,
    location: 'Accra, Ghana',
    bio: ['Passionate about discovering untapped talent across Africa.'],
    motto: 'Finding the next big star.',
    contactSettings: { inAppMessagingEnabled: true, emailEnabled: true },
    xpRank: 'Advanced',
  },
  {
    id: 'user-fan',
    email: 'fan@example.com',
    password: 'fanPassword',
    fullName: 'Fan Kwesi',
    userType: 'fan',
    slug: 'fan-kwesi-fan012',
    profilePictureUrl: PROFILE_PICTURES.fan1,
    location: 'Tema, Greater Accra',
    bio: ['Biggest fan of Ghanaian sports!'],
    motto: 'GamePulse forever!',
    contactSettings: { inAppMessagingEnabled: true, emailEnabled: true },
    xpRank: 'Casual',
  },
];

// Mock Notifications
export const mockNotifications = [
  {
    id: 1,
    type: 'match_update',
    text: 'Your match vs. Achimota School is confirmed!',
    read: false,
    timestamp: '2025-06-17T10:00:00Z',
    link: '/match-details/abc123',
    icon: '🏀',
  },
  {
    id: 2,
    type: 'new_follower',
    text: 'Coach Kwame started following you.',
    read: false,
    timestamp: '2025-06-17T09:30:00Z',
    link: '/coach-profile/kwame',
    icon: '👥',
  },
  {
    id: 3,
    type: 'message',
    text: 'You have a new message from a scout!',
    read: false,
    timestamp: '2025-06-17T08:00:00Z',
    link: '/messages',
    icon: '💬',
  },
  {
    id: 4,
    type: 'event_reminder',
    text: 'Reminder: Training session today at 4 PM.',
    read: true,
    timestamp: '2025-06-16T15:00:00Z',
    link: '/my-calendar',
    icon: '📅',
  },
  {
    id: 5,
    type: 'achievement',
    text: 'Congratulations! You earned the "Rising Star" badge.',
    read: false,
    timestamp: '2025-06-16T12:00:00Z',
    link: '/my-profile',
    icon: '🏆',
  },
];

// Mock Messages
export const mockMessages = [
  {
    id: 1,
    sender: {
      id: 'scout-1',
      name: 'Scout Nkrumah',
      avatar: PROFILE_PICTURES.scout1,
      type: 'scout',
    },
    content: 'Hi! I saw your recent performance and I\'m impressed. Would you be interested in discussing opportunities?',
    timestamp: '2025-06-17T10:30:00Z',
    read: false,
  },
  {
    id: 2,
    sender: {
      id: 'coach-1',
      name: 'Coach Mensah',
      avatar: PROFILE_PICTURES.coach1,
      type: 'coach',
    },
    content: 'Great work in yesterday\'s training session. Keep it up!',
    timestamp: '2025-06-16T15:45:00Z',
    read: true,
  },
  {
    id: 3,
    sender: {
      id: 'athlete-1',
      name: 'Ama Asare',
      avatar: PROFILE_PICTURES.athlete1,
      type: 'athlete',
    },
    content: 'Hey! Are you going to the regional tournament next week?',
    timestamp: '2025-06-16T14:20:00Z',
    read: true,
  },
];

// Mock Live Matches
export const mockLiveMatches = [
  {
    id: 'match-1',
    homeTeam: 'Accra Warriors',
    awayTeam: 'Kumasi Kings',
    homeScore: 2,
    awayScore: 1,
    time: '75\'',
    status: 'live',
    sport: 'football',
    venue: 'Accra Sports Stadium',
    viewers: 1250,
  },
  {
    id: 'match-2',
    homeTeam: 'Tema Titans',
    awayTeam: 'Cape Coast Crushers',
    homeScore: 0,
    awayScore: 0,
    time: '23\'',
    status: 'live',
    sport: 'basketball',
    venue: 'Tema Sports Complex',
    viewers: 890,
  },
];

// Mock Upcoming Games
export const mockUpcomingGames = [
  {
    id: 'game-1',
    homeTeam: 'Accra Warriors',
    awayTeam: 'Kumasi Kings',
    date: '2025-06-20',
    time: '15:00',
    venue: 'Accra Sports Stadium',
    sport: 'football',
    ticketPrice: '₵50',
    status: 'upcoming',
  },
  {
    id: 'game-2',
    homeTeam: 'Tema Titans',
    awayTeam: 'Cape Coast Crushers',
    date: '2025-06-22',
    time: '16:30',
    venue: 'Tema Sports Complex',
    sport: 'basketball',
    ticketPrice: '₵30',
    status: 'upcoming',
  },
];

// Mock Highlights
export const mockHighlights = [
  {
    id: 'highlight-1',
    title: 'Amazing Goal by Kwame Mensah',
    description: 'Incredible long-range goal from midfield',
    videoUrl: 'https://www.youtube.com/embed/example1',
    thumbnail: '/images/highlight1.jpg',
    athlete: 'Kwame Mensah',
    sport: 'football',
    views: 1250,
    likes: 89,
    timestamp: '2025-06-15T14:30:00Z',
  },
  {
    id: 'highlight-2',
    title: 'Basketball Dunk by Ama Asare',
    description: 'Spectacular dunk during the championship game',
    videoUrl: 'https://www.youtube.com/embed/example2',
    thumbnail: '/images/highlight2.jpg',
    athlete: 'Ama Asare',
    sport: 'basketball',
    views: 890,
    likes: 67,
    timestamp: '2025-06-14T16:45:00Z',
  },
];

// Mock Search Results
export const mockSearchResults = [
  {
    id: 'athlete-1',
    name: 'Kwame Mensah',
    type: 'athlete',
    sport: 'football',
    position: 'Midfielder',
    location: 'Kumasi, Ashanti',
    avatar: PROFILE_PICTURES.athlete2,
    rating: 4.8,
  },
  {
    id: 'athlete-2',
    name: 'Ama Asare',
    type: 'athlete',
    sport: 'basketball',
    position: 'Guard',
    location: 'Accra, Ghana',
    avatar: PROFILE_PICTURES.athlete1,
    rating: 4.9,
  },
  {
    id: 'coach-1',
    name: 'Coach Mensah',
    type: 'coach',
    sport: 'basketball',
    experience: '10 years',
    location: 'Kumasi, Ashanti',
    avatar: PROFILE_PICTURES.coach1,
    rating: 4.7,
  },
];

// Mock Analytics Data
export const mockAnalytics = {
  userStats: {
    totalUsers: 15420,
    activeUsers: 8920,
    newUsers: 234,
    userGrowth: 15.2,
  },
  engagement: {
    totalMatches: 456,
    totalHighlights: 1234,
    totalMessages: 5678,
    averageSessionTime: '12m 34s',
  },
  sports: {
    football: 45,
    basketball: 30,
    athletics: 15,
    volleyball: 10,
  },
};

// Mock Settings
export const mockSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    matchUpdates: true,
    newFollowers: true,
    messages: true,
  },
  privacy: {
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  },
  preferences: {
    language: 'en',
    theme: 'auto',
    timezone: 'Africa/Accra',
  },
};

// Mock Digital Classroom Content
export const mockDigitalClassroom = [
  {
    id: 'course-1',
    title: 'Football Fundamentals',
    description: 'Learn the basics of football',
    instructor: 'Coach Mensah',
    duration: '2 hours',
    progress: 75,
    modules: [
      { id: 1, title: 'Basic Dribbling', completed: true },
      { id: 2, title: 'Passing Techniques', completed: true },
      { id: 3, title: 'Shooting Skills', completed: false },
      { id: 4, title: 'Tactical Awareness', completed: false },
    ],
  },
  {
    id: 'course-2',
    title: 'Basketball Mastery',
    description: 'Advanced basketball techniques',
    instructor: 'Coach Kwame',
    duration: '3 hours',
    progress: 30,
    modules: [
      { id: 1, title: 'Advanced Dribbling', completed: true },
      { id: 2, title: 'Shooting Form', completed: false },
      { id: 3, title: 'Defensive Strategies', completed: false },
      { id: 4, title: 'Team Play', completed: false },
    ],
  },
];

// Mock Network Data
export const mockNetwork = {
  followers: [
    { id: 'f1', name: 'John Doe', avatar: PROFILE_PICTURES.fan1, type: 'fan' },
    { id: 'f2', name: 'Jane Smith', avatar: PROFILE_PICTURES.fan2, type: 'fan' },
    { id: 'f3', name: 'Coach Wilson', avatar: PROFILE_PICTURES.coach2, type: 'coach' },
  ],
  following: [
    { id: 'fw1', name: 'Pro Athlete', avatar: PROFILE_PICTURES.athlete3, type: 'athlete' },
    { id: 'fw2', name: 'Elite Coach', avatar: PROFILE_PICTURES.coach1, type: 'coach' },
  ],
  connections: [
    { id: 'c1', name: 'Team Captain', avatar: PROFILE_PICTURES.athlete4, type: 'athlete' },
    { id: 'c2', name: 'Scout Expert', avatar: PROFILE_PICTURES.scout1, type: 'scout' },
  ],
};

// Mock Calendar Events
export const mockCalendarEvents = [
  {
    id: 'event-1',
    title: 'Training Session',
    date: '2025-06-20',
    time: '16:00',
    location: 'Accra Sports Complex',
    type: 'training',
    description: 'Regular team training session',
  },
  {
    id: 'event-2',
    title: 'Match vs. Kumasi Kings',
    date: '2025-06-22',
    time: '15:00',
    location: 'Accra Sports Stadium',
    type: 'match',
    description: 'League match against Kumasi Kings',
  },
  {
    id: 'event-3',
    title: 'Scout Meeting',
    date: '2025-06-25',
    time: '10:00',
    location: 'Coffee Shop, Accra',
    type: 'meeting',
    description: 'Meeting with talent scout',
  },
];

// Export all static data
export default {
  mockUsers,
  mockNotifications,
  mockMessages,
  mockLiveMatches,
  mockUpcomingGames,
  mockHighlights,
  mockSearchResults,
  mockAnalytics,
  mockSettings,
  mockDigitalClassroom,
  mockNetwork,
  mockCalendarEvents,
  PROFILE_PICTURES,
};