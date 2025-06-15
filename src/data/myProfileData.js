// src/data/myProfileData.js

// Import all necessary icons from react-icons
import {
  FaMapMarkerAlt, FaPlus, FaUserPlus, FaEye, FaChartLine, FaPlusCircle,
  FaFutbol, FaHandsHelping, FaCalendarAlt, FaShieldAlt, // Football stats
  FaBasketballBall, FaRetweet, FaLifeRing, FaBullseye,     // Basketball stats
  FaTrophy, FaVideo, FaPlayCircle, FaLink, FaCloudUploadAlt,
  FaUserGraduate, FaStar, FaGraduationCap, FaHandshake, FaEnvelope, FaAt,
  FaTiktok, FaInstagram, FaTwitter, FaShareAlt, FaUsers, FaCog
} from 'react-icons/fa';

export const myAthleteProfileData = {
  // Header Section
  profilePicture: '/images/my-athlete-avatar.webp', // Placeholder - place in public/images
  bannerImage: '/images/my-profile-banner.webp',    // Placeholder - place in public/images
  fullName: 'Amaani Okoro',
  primarySport: 'Football',
  position: 'Striker',
  schoolTeam: 'Accra High School Spartans',
  location: 'Accra, Ghana',
  bio: 'Aspiring Olympian | Dedicated Team Player | Dreamer of the World Cup stage.',
  followers: 234, // This would be dynamic, but static for demo
  xpRank: '#12 Region (U17)',

  // Performance Metrics Section
  sports: [ // To dynamically render sport tabs
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' }
  ],
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
    ]
  },
  progressData: [ // Simple data for a placeholder chart
    { name: 'Jan', goals: 2, assists: 1 },
    { name: 'Feb', goals: 3, assists: 2 },
    { name: 'Mar', goals: 4, assists: 2 },
    { name: 'Apr', goals: 6, assists: 3 },
    { name: 'May', goals: 0, assists: 0 },
    { name: 'Jun', goals: 8, assists: 4 },
  ],
  achievements: [
    { text: 'League Top Scorer 2024', icon: FaTrophy },
    { text: 'National High School All-Star Team', icon: FaTrophy },
    { text: 'MVP Regional Tournament 2023', icon: FaTrophy },
    { text: 'Golden Boot Winner U16 League', icon: FaTrophy }
  ],

  // Highlights & Media Gallery Section
  featuredVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder: Rick Astley - Never Gonna Give You Up (use a real highlight embed in production)
  videoThumbnails: [
    { id: 1, src: '/images/video-thumb-1.webp', alt: 'Goal vs Rivals', type: 'video', videoUrl: 'https://www.youtube.com/embed/2M-kLp10r9E' },
    { id: 2, src: '/images/video-thumb-2.webp', alt: 'Dribbling Skills', type: 'video', videoUrl: 'https://www.youtube.com/embed/l5A0c3yL370' },
  ],
  photoThumbnails: [
    { id: 3, src: '/images/photo-action-1.webp', alt: 'Celebration Shot', type: 'photo' },
    { id: 4, src: '/images/photo-training-2.webp', alt: 'Training Focus', type: 'photo' },
    { id: 5, src: '/images/photo-team-3.webp', alt: 'Team Huddle', type: 'photo' },
    { id: 6, src: '/images/photo-action-4.webp', alt: 'Game Intensity', type: 'photo' },
  ],
  liveStreamLinks: [
    { label: 'Watch Full Match Replay (vs. City Rivals - Oct 2024)', url: '#' },
    { label: 'Upcoming Match: vs. Green Eagles (Aug 15)', url: '#' },
  ],

  // About Me Section
  personalStatement: "My journey in football began on the dusty pitches of Accra, fueled by a simple dream: to play professionally and make my country proud. I thrive under pressure, constantly push my limits, and believe in the power of teamwork. Every game is an opportunity to learn, grow, and deliver excellence.",
  skills: ['Leadership', 'Vision', 'Teamwork', 'Dedication', 'Mental Toughness', 'Coachability'],
  digitalClassroomProgress: [
    { name: 'Nutrition for Athletes Module', completed: true },
    { name: 'Mental Toughness Certified (GamePulse Academy)', completed: true },
    { name: 'Injury Prevention Fundamentals', completed: false }
  ],

  // Connections & Contact Section
  contactOptions: {
    inAppMessagingEnabled: true, // Athlete can toggle this
    publicEmail: 'amaani.okoro.athlete@gamepulse.africa',
    publicEmailEnabled: true, // Athlete can toggle this
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

  // Icons (passed down for consistency and easy access)
  icons: {
    FaMapMarkerAlt, FaPlus, FaUserPlus, FaEye, FaChartLine, FaPlusCircle,
    FaFutbol, FaHandsHelping, FaCalendarAlt, FaShieldAlt,
    FaBasketballBall, FaRetweet, FaLifeRing, FaBullseye,
    FaTrophy, FaVideo, FaPlayCircle, FaLink, FaCloudUploadAlt,
    FaUserGraduate, FaStar, FaGraduationCap, FaHandshake, FaEnvelope, FaAt,
    FaTiktok, FaInstagram, FaTwitter, FaShareAlt, FaUsers, FaCog
  }
};