// src/data/athleteData.js

// Import icons needed for stats (ensure you have react-icons installed)
import {
  FaFutbol, FaHandsHelping, FaCalendarAlt, FaShieldAlt, // Football
  FaBasketballBall, FaRetweet, FaLifeRing, FaBullseye,     // Basketball (example)
  FaRunning, FaRulerHorizontal,                          // Athletics (example)
  FaTrophy, FaMapMarkerAlt, FaPlus, FaUserPlus, FaVideo, FaPlayCircle, FaLink,
  FaUserGraduate, FaStar, FaGraduationCap, FaEnvelope, FaAt, FaShareAlt, FaUsers,
  FaTiktok, FaInstagram, FaTwitter, FaHandshake, FaChartLine
} from 'react-icons/fa';

export const dummyAthleteData = {
  profilePicture: '/images/athlete-amaani.webp', // Placeholder - place in public/images
  bannerImage: '/images/profile-banner-football.webp', // Placeholder - place in public/images
  fullName: 'Amaani Okoro',
  primarySport: 'Football',
  position: 'Striker',
  schoolTeam: 'Accra High School Spartans',
  location: 'Accra, Ghana',
  bio: 'Aspiring Olympian | Dedicated Team Player | Dreamer of the World Cup stage.',
  followers: 234,
  xpRank: '#12 Region (U17)', // XP Ranking for talent identification
  stats: {
    football: [
      { label: 'Goals', value: 15, icon: FaFutbol },
      { label: 'Assists', value: 8, icon: FaHandsHelping },
      { label: 'Appearances', value: 20, icon: FaCalendarAlt },
      { label: 'Tackle Success', value: '75%', icon: FaShieldAlt },
    ],
    basketball: [
      { label: 'PPG', value: 18.5, icon: FaBasketballBall },
      { label: 'RPG', value: 7.2, icon: FaRetweet },
      { label: 'APG', value: 4.1, icon: FaLifeRing },
      { label: 'FG%', value: '45%', icon: FaBullseye },
    ],
    athletics: [
      { label: '100m PB', value: '10.8s', icon: FaRunning },
      { label: 'Long Jump PB', value: '6.8m', icon: FaRulerHorizontal },
      { label: 'Season Rank', value: '#3', icon: FaTrophy },
    ]
  },
  progressData: [ // Simple data for a placeholder chart
    { name: 'Jan', goals: 2 },
    { name: 'Feb', goals: 3 },
    { name: 'Mar', goals: 4 },
    { name: 'Apr', goals: 6 },
    { name: 'May', goals: 0 }, // Example dip
    { name: 'Jun', goals: 8 },
  ],
  achievements: [
    { text: 'League Top Scorer 2024', icon: FaTrophy },
    { text: 'National High School All-Star Team', icon: FaTrophy },
    { text: 'MVP Regional Tournament 2023', icon: FaTrophy },
    { text: 'Golden Boot Winner U16 League', icon: FaTrophy }
  ],
  featuredVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0&showinfo=0&controls=0', // Replace with a real embed
  videoThumbnails: [
    { id: 1, src: '/images/video-thumb-1.webp', alt: 'Goal vs Rivals', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=...' },
    { id: 2, src: '/images/video-thumb-2.webp', alt: 'Dribbling Skills', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=...' },
  ],
  photoThumbnails: [
    { id: 3, src: '/images/photo-action-1.webp', alt: 'Celebration Shot', type: 'photo' },
    { id: 4, src: '/images/photo-training-2.webp', alt: 'Training Focus', type: 'photo' },
    { id: 5, src: '/images/photo-team-3.webp', alt: 'Team Huddle', type: 'photo' },
    { id: 6, src: '/images/photo-action-4.webp', alt: 'Game intensity', type: 'photo' },
  ],
  liveStreamLinks: [
    { label: 'Watch Full Match Replay (vs. City Rivals - Oct 2024)', url: '#' },
    { label: 'Upcoming Match: vs. Green Eagles (Aug 15)', url: '#' },
  ],
  personalStatement: "My journey in football began on the dusty pitches of Accra, fueled by a simple dream: to play professionally and make my country proud. I thrive under pressure, constantly push my limits, and believe in the power of teamwork. Every game is an opportunity to learn, grow, and deliver excellence.",
  skills: ['Leadership', 'Vision', 'Teamwork', 'Dedication', 'Mental Toughness', 'Coachability'],
  digitalClassroomProgress: [
    { name: 'Nutrition for Athletes Module', completed: true },
    { name: 'Mental Toughness Certified (GamePulse Academy)', completed: true },
    { name: 'Injury Prevention Fundamentals', completed: false }
  ],
  contactOptions: {
    inAppMessaging: true, // If in-app messaging is available
    publicEmail: 'amaani.okoro.athlete@gamepulse.africa', // If athlete chooses to make it public
  },
  coachAgentContact: {
    name: 'Coach Kwame Nkrumah',
    phone: '+233 55 123 4567',
    email: 'coach.kwame@school.com',
  },
  socialMediaLinks: [
    { platform: 'TikTok', url: 'https://tiktok.com/@amaani_football', icon: FaTiktok },
    { platform: 'Instagram', url: 'https://instagram.com/amaani_athlete', icon: FaInstagram },
    { platform: 'Twitter', url: 'https://twitter.com/amaani_sports', icon: FaTwitter },
  ],
  // Pass icons for these as well
  icons: {
    FaMapMarkerAlt: FaMapMarkerAlt,
    FaPlus: FaPlus,
    FaUserPlus: FaUserPlus,
    FaVideo: FaVideo,
    FaPlayCircle: FaPlayCircle,
    FaLink: FaLink,
    FaUserGraduate: FaUserGraduate,
    FaStar: FaStar,
    FaGraduationCap: FaGraduationCap,
    FaEnvelope: FaEnvelope,
    FaAt: FaAt,
    FaShareAlt: FaShareAlt,
    FaUsers: FaUsers,
    FaHandshake: FaHandshake,
    FaChartLine: FaChartLine,
  }
};

export const dummySimilarAthletes = [
  { id: 1, name: 'Kwame Adjei', sport: 'Football - Midfielder', profilePicture: '/images/athlete-kwame.webp' },
  { id: 2, name: 'Selah Kojo', sport: 'Football - Defender', profilePicture: '/images/athlete-selah.webp' },
  { id: 3, name: 'Nala Mensah', sport: 'Basketball - Forward', profilePicture: '/images/athlete-nala.webp' },
  { id: 4, name: 'Jelani Asante', sport: 'Athletics - Sprinter', profilePicture: '/images/athlete-jelani.webp' },
];

export const dummySchoolAthletes = [
  { id: 5, name: 'Zara Abubakar', sport: 'Football - Goalkeeper', profilePicture: '/images/athlete-zara.webp' },
  { id: 6, name: 'Kofi Owusu', sport: 'Basketball - Center', profilePicture: '/images/athlete-kofi.webp' },
];