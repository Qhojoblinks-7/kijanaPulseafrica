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

import profileOne from '../assets/profileOne.png'; // Assuming this is the full athlete image
import schoolLogoExample from '../assets/school1.png'; // Placeholder, replace with actual path if you have one
import teamLogoExample from '../assets/team3.png';     // Placeholder, replace with actual path if you have one

export const myAthleteProfileData = {
    // Header Section - Updated to match ProfileHeader.jsx requirements
    id: 'amaani-okoro-my-profile', // Unique ID for this profile
    firstName: 'Amaani', // <-- NEW: Required by ProfileHeader
    lastName: 'Okoro',   // <-- NEW: Required by ProfileHeader
    fullName: 'Amaani Okoro',
    primarySport: 'Football',
    position: 'Striker',
    // schoolAffiliation: 'Accra High School Spartans', // This might be covered by schoolLogo/teamLogo now
    location: 'Accra, Ghana',
    bio: 'Aspiring Olympian | Dedicated Team Player | Dreamer of the World Cup stage.',
    followers: 234, // This would be dynamic, but static for demo
    xpRank: '#12 Region (U17)',

    // NEW FIELDS FOR ProfileHeader Component
    height: '5 ft 10 in',
    weight: '160 lbs',
    bornDate: 'January 15, 2007', // Changed format for better readability
    fromLocation: 'Accra, Ghana',
    sportsDebut: '2022',
    previousLocation: 'Youth Academy FC',

    // Image paths for the new layout
    athleteFullImage: profileOne, // <-- NEW: This is for Div2's main image. Using your profileOne.
    schoolLogo: schoolLogoExample, // <-- NEW: Add actual path or keep placeholder
    teamLogo: teamLogoExample,     // <-- NEW: Add actual path or keep placeholder
    jerseyNumber: '#10',           // <-- NEW: Example jersey number

    // Stats for Div3, mimicking the Stephen Curry layout
    postseasonStats: { // <-- NEW: Required by ProfileHeader
        mp: '37',
        fg: '45.1%',
        '3p': '39.5%', // Note: '3p' is a string key
        ft: '95.7%',
        ppg: '25.5',
        rpg: '6.1',
        apg: '5.4',
        bpg: '0.7',
    },
    careerStats: { // <-- NEW: Required by ProfileHeader
        mp: '34.4',
        fg: '47.7%',
        '3p': '43.6%', // Note: '3p' is a string key
        ft: '90.3%',
        ppg: '23.1',
        rpg: '4.4',
        apg: '6.8',
        bpg: '0.2',
    },

    // --- Keep existing data for other components ---
    // profilePicture and bannerImage are now less critical for ProfileHeader,
    // but keep if MyPerformanceMetrics or other components use them
    profilePicture: profileOne,
    bannerImage: profileOne,
    
    sports: [ // To dynamically render sport tabs
        { id: 'football', name: 'Football' },
        { id: 'basketball', name: 'Basketball' }
    ],
    stats: { // This 'stats' object is likely used by MyPerformanceMetrics, not ProfileHeader
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
    featuredVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
        inAppMessagingEnabled: true,
        publicEmail: 'amaani.okoro.athlete@gamepulse.africa',
        publicEmailEnabled: true,
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