import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaArrowLeft, FaShareAlt, FaBell, FaStar, FaTrophy, FaFire, FaMapMarkerAlt,
  FaFootballBall, FaBasketballBall, FaRunning, FaHandshake, FaVolleyballBall,
  FaFistRaised, FaInfoCircle, FaUsers, FaChartLine, FaVideo,
  FaImage, FaPlayCircle, FaPauseCircle, FaStopCircle
} from 'react-icons/fa';
import { GiCricketBat, GiRugbyConversion, GiTennisBall } from 'react-icons/gi';

// --- Helper Functions (Re-used from LiveMatchesDashboard) ---
const sportFilterOptions = [
  { name: 'Football', icon: FaFootballBall },
  { name: 'Basketball', icon: FaBasketballBall },
  { name: 'Athletics', icon: FaRunning },
  { name: 'Rugby', icon: GiRugbyConversion },
  { name: 'Cricket', icon: GiCricketBat },
  { name: 'Handball', icon: FaHandshake },
  { name: 'Volleyball', icon: FaVolleyballBall },
  { name: 'Tennis', icon: GiTennisBall },
  { name: 'Martial Arts', icon: FaFistRaised },
];

const getSportIcon = (sportName) => {
  const sport = sportFilterOptions.find(s => s.name === sportName);
  return sport ? sport.icon : FaFootballBall; // Default
};

const formatGameClock = (sport, seconds) => {
  if (seconds === null) return ''; // Handle null seconds for finished matches or non-timed sports
  if (sport === 'Football' || sport === 'Rugby') {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}'${remainingSeconds > 0 ? ` ${String(remainingSeconds).padStart(2, '0')}` : ''}`;
  }
  if (sport === 'Basketball') {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  return 'Running'; // For Athletics or other continuous sports
};

// --- Mock Data for Match Details ---
const mockMatchDetails = {
  'm1': { // This ID should match an ID from LiveMatchesDashboard
    id: 'm1',
    homeTeam: 'Greenwood High',
    awayTeam: 'Riverside Academy',
    homeLogo: '/images/greenwood_logo.png', // Placeholder
    awayLogo: '/images/riverside_logo.png', // Placeholder
    homeScore: 1,
    awayScore: 0,
    sport: 'Football',
    gameClockSeconds: 4080, // 68 minutes
    period: '2nd Half',
    status: 'In Progress',
    location: 'Accra Sports Stadium, Ghana',
    league: 'National High School Football League',
    keyEvent: 'GOAL! Greenwood High takes the lead!',
    isFavorite: true,
    // --- New detailed data for Match Details Page ---
    timeline: [
      { time: "68'", type: "goal", player: "Jane Doe", team: "Greenwood High", description: "GOAL! Jane Doe puts Greenwood High in the lead with a powerful shot!" },
      { time: "60'", type: "yellow_card", player: "Alex Kwasi", team: "Riverside Academy", description: "Yellow Card for Alex Kwasi for a late tackle." },
      { time: "45'", type: "halftime", description: "Half-time whistle blows. Greenwood High 0 - 0 Riverside Academy." },
      { time: "30'", type: "substitution", player: "Ben Carter", team: "Greenwood High", playerOut: "Mark Owusu", description: "Substitution for Greenwood: Ben Carter replaces Mark Owusu." },
      { time: "15'", type: "shot_on_target", player: "Sarah Mensah", team: "Greenwood High", description: "Shot on target by Sarah Mensah, saved by the keeper." },
      { time: "1'", type: "kick_off", description: "Match kicks off!" },
    ].sort((a, b) => {
        // Simple time parsing for sorting: "68'" becomes 68, "Q3 04:30" handled for basketball
        const parseTime = (timeStr) => {
            if (timeStr.endsWith("'")) return parseInt(timeStr.slice(0, -1));
            if (timeStr.startsWith("Q")) {
                const [q, minSec] = timeStr.split(' ');
                const [mins, secs] = minSec.split(':').map(Number);
                const quarterNum = parseInt(q.slice(1));
                // Assuming 12 mins per quarter for basketball
                return (quarterNum - 1) * 12 * 60 + mins * 60 + secs;
            }
            return 0; // For events like 'halftime' or 'kick_off'
        };
        return parseTime(b.time) - parseTime(a.time); // Reverse chronological
    }),
    stats: {
      home: {
        possession: 55, shots: 12, shotsOnTarget: 6, fouls: 8, corners: 4, offsides: 1,
        passesCompleted: 85,
      },
      away: {
        possession: 45, shots: 8, shotsOnTarget: 3, fouls: 10, corners: 2, offsides: 3,
        passesCompleted: 78,
      },
    },
    lineups: {
      home: [
        { id: 'p1', name: 'Kwame Nkrumah', jersey: 1, position: 'GK', photo: '/images/player1.png', stats: { saves: 5, clean_sheets: 0 } },
        { id: 'p2', name: 'Aisha Sesay', jersey: 2, position: 'DF', photo: '/images/player2.png', stats: { tackles: 3, interceptions: 2 } },
        { id: 'p3', name: 'Jane Doe', jersey: 10, position: 'FW', photo: '/images/player3.png', stats: { goals: 1, assists: 0, shots: 3 } },
        { id: 'p4', name: 'Samuel Kojo', jersey: 4, position: 'MF', photo: '/images/player4.png', stats: { passes: 45, accuracy: 89 } },
        { id: 'p5', name: 'Nuru Musa', jersey: 5, position: 'DF', photo: '/images/player5.png', stats: { tackles: 2, clearances: 4 } },
        { id: 'p6', name: 'Chukwuma Obi', jersey: 6, position: 'MF', photo: '/images/player6.png', stats: { dribbles: 5, key_passes: 1 } },
        { id: 'p7', name: 'Fatima Conteh', jersey: 7, position: 'FW', photo: '/images/player7.png', stats: { shots: 2, on_target: 1 } },
        { id: 'p8', name: 'David Adewale', jersey: 8, position: 'MF', photo: '/images/player8.png', stats: { interceptions: 3, fouls: 1 } },
        { id: 'p9', name: 'Aminata Diallo', jersey: 9, position: 'FW', photo: '/images/player9.png', stats: { goals: 0, assists: 0 } },
        { id: 'p10', name: 'Emmanuel Ekwueme', jersey: 11, position: 'DF', photo: '/images/player10.png', stats: { blocks: 1, headers: 3 } },
        { id: 'p11', name: 'Zainab Bello', jersey: 12, position: 'MF', photo: '/images/player11.png', stats: { passes: 30, accuracy: 92 } },
      ],
      away: [
        { id: 'p12', name: 'Mercy Okoro', jersey: 1, position: 'GK', photo: '/images/player12.png', stats: { saves: 4, clean_sheets: 0 } },
        { id: 'p13', name: 'Daniel Ofori', jersey: 3, position: 'DF', photo: '/images/player13.png', stats: { tackles: 2, clearances: 3 } },
        { id: 'p14', name: 'Alex Kwasi', jersey: 8, position: 'MF', photo: '/images/player14.png', stats: { yellow_cards: 1, fouls: 3 } },
        { id: 'p15', name: 'Sophie Mensah', jersey: 9, position: 'FW', photo: '/images/player15.png', stats: { shots: 2, on_target: 1 } },
        { id: 'p16', name: 'Kofi Asante', jersey: 11, position: 'FW', photo: '/images/player16.png', stats: { goals: 0, assists: 0 } },
        { id: 'p17', name: 'Ngozi Chukwu', jersey: 13, position: 'DF', photo: '/images/player17.png', stats: { interceptions: 1, blocks: 1 } },
        { id: 'p18', name: 'Tunde Adeyemi', jersey: 14, position: 'MF', photo: '/images/player18.png', stats: { passes: 25, accuracy: 75 } },
        { id: 'p19', name: 'Laila Hassan', jersey: 15, position: 'DF', photo: '/images/player19.png', stats: { tackles: 1, fouls: 2 } },
        { id: 'p20', name: 'Ahmed Sani', jersey: 16, position: 'MF', photo: '/images/player20.png', stats: { key_passes: 0, dribbles: 1 } },
        { id: 'p21', name: 'Chioma Obi', jersey: 17, position: 'FW', photo: '/images/player21.png', stats: { shots: 1, on_target: 0 } },
        { id: 'p22', name: 'Moussa Kone', jersey: 18, position: 'DF', photo: '/images/player22.png', stats: { clearances: 2, headers: 1 } },
      ],
      homeCoach: 'Coach Emma Osei',
      awayCoach: 'Coach John Banda',
      substitutes: {
        home: [{ id: 'p23', name: 'Obi Nnamdi', jersey: 13, position: 'DF' }],
        away: [{ id: 'p24', name: 'Zara Bello', jersey: 10, position: 'MF' }],
      }
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&modestbranding=1', thumbnail: '/images/video_thumb1.jpg', title: 'Game Opening Action' },
      { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&modestbranding=1', thumbnail: '/images/video_thumb2.jpg', title: 'Jane Doe Goal!' },
      { type: 'photo', url: '/images/match_photo1.jpg', thumbnail: '/images/match_photo1_thumb.jpg', title: 'Midfield Battle' },
      { type: 'photo', url: '/images/match_photo2.jpg', thumbnail: '/images/match_photo2_thumb.jpg', title: 'Keeper Save' },
    ],
    relatedMatches: [
      { id: 'u1', homeTeam: 'United Youth', awayTeam: 'Rising Stars', sport: 'Basketball', date: 'Tomorrow', time: '6:00 PM GMT', league: 'Lagos High School League', homeLogo: '/images/united_logo.png', awayLogo: '/images/rising_logo.png' },
      { id: 'u2', homeTeam: 'Victory FC', awayTeam: 'Alpha Strikers', sport: 'Football', date: 'Tomorrow', time: '2:30 PM GMT', league: 'Western Cape Schools Cup', homeLogo: '/images/victory_logo.png', awayLogo: '/images/alpha_logo.png' },
    ],
    relatedAthletes: [
      { id: 'athlete1', name: 'Ama Kofi', sport: 'Basketball', photo: '/images/athlete_ama.png', team: 'Star Academy' },
      { id: 'athlete2', name: 'Tunde Balogun', sport: 'Athletics', photo: '/images/athlete_tunde.png', team: 'Coastal Sprinters' },
      { id: 'athlete3', name: 'Zola Mofokeng', sport: 'Rugby', photo: '/images/athlete_zola.png', team: 'Lion\'s Pride' },
    ]
  },
  'm2': {
    id: 'm2',
    homeTeam: 'Star Academy',
    awayTeam: 'Coastal Sprinters',
    homeLogo: '/images/staracademy_logo.png',
    awayLogo: '/images/coastal_logo.png',
    homeScore: 78,
    awayScore: 82,
    sport: 'Basketball',
    gameClockSeconds: 2880, // 48 minutes (end of Q4)
    period: 'Q4',
    status: 'Finished',
    location: 'Lagos Arena, Nigeria',
    league: 'Lagos High School League',
    keyEvent: 'Coastal Sprinters clinch it in the final seconds!',
    isFavorite: false,
    timeline: [
      { time: "Q4 00:05", type: "basket", player: "Tunde Balogun", team: "Coastal Sprinters", description: "Game-winning layup by Tunde Balogun!" },
      { time: "Q4 00:30", type: "timeout", team: "Star Academy", description: "Timeout called by Star Academy." },
      { time: "Q3 10:12", type: "three_pointer", player: "Ama Kofi", team: "Star Academy", description: "Ama Kofi drains a three-pointer!" },
      { time: "Q2 05:45", type: "foul", player: "Samuel Ade", team: "Coastal Sprinters", description: "Personal foul by Samuel Ade." },
      { time: "Q1 12:00", type: "tip_off", description: "Game starts with the tip-off!" },
    ].sort((a, b) => {
        const parseTime = (timeStr) => {
            if (timeStr.endsWith("'")) return parseInt(timeStr.slice(0, -1));
            if (timeStr.startsWith("Q")) {
                const [q, minSec] = timeStr.split(' ');
                const [mins, secs] = minSec.split(':').map(Number);
                const quarterNum = parseInt(q.slice(1));
                return (quarterNum - 1) * 12 * 60 + mins * 60 + secs;
            }
            return 0;
        };
        return parseTime(b.time) - parseTime(a.time);
    }),
    stats: {
      home: {
        fgPercentage: '44%',
        rebounds: 35,
        assists: 18,
        turnovers: 12,
        fouls: 15,
        threePointers: 7,
      },
      away: {
        fgPercentage: '48%',
        rebounds: 38,
        assists: 20,
        turnovers: 10,
        fouls: 13,
        threePointers: 9,
      },
    },
    lineups: {
      home: [
        { id: 'p31', name: 'Ama Kofi', jersey: 5, position: 'G', photo: '/images/athlete_ama.png', stats: { points: 22, assists: 7, rebounds: 4, threePointers: 4 } },
        { id: 'p32', name: 'Kwesi Mensah', jersey: 8, position: 'F', photo: '/images/player32.png', stats: { points: 14, rebounds: 8 } },
        { id: 'p33', name: 'Linda Owusu', jersey: 11, position: 'C', photo: '/images/player33.png', stats: { points: 10, rebounds: 10 } },
        { id: 'p34', name: 'Samuel Ade', jersey: 3, position: 'G', photo: '/images/player34.png', stats: { points: 9, assists: 5 } },
        { id: 'p35', name: 'Felix Boateng', jersey: 7, position: 'F', photo: '/images/player35.png', stats: { points: 7, rebounds: 5 } },
      ],
      away: [
        { id: 'p36', name: 'Tunde Balogun', jersey: 6, position: 'G', photo: '/images/athlete_tunde.png', stats: { points: 26, assists: 6, rebounds: 3 } },
        { id: 'p37', name: 'Chika Okafor', jersey: 9, position: 'F', photo: '/images/player37.png', stats: { points: 15, rebounds: 9 } },
        { id: 'p38', name: 'Zara Bello', jersey: 10, position: 'C', photo: '/images/player38.png', stats: { points: 12, rebounds: 11 } },
        { id: 'p39', name: 'Musa Lawal', jersey: 12, position: 'G', photo: '/images/player39.png', stats: { points: 11, assists: 4 } },
        { id: 'p40', name: 'Ngozi Chukwu', jersey: 13, position: 'F', photo: '/images/player40.png', stats: { points: 8, rebounds: 6 } },
      ],
      homeCoach: 'Coach Nana Asare',
      awayCoach: 'Coach Sola Ogun',
      substitutes: {
        home: [{ id: 'p41', name: 'Yaw Mensimah', jersey: 14, position: 'G' }],
        away: [{ id: 'p42', name: 'Bola Ajayi', jersey: 15, position: 'F' }],
      }
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/9bZkp7q19f0?autoplay=0&controls=0&modestbranding=1', thumbnail: '/images/video_thumb3.jpg', title: 'Final Buzzer Highlights' },
      { type: 'photo', url: '/images/basketball_photo1.jpg', thumbnail: '/images/basketball_photo1_thumb.jpg', title: 'Tip-off Moment' },
      { type: 'photo', url: '/images/basketball_photo2.jpg', thumbnail: '/images/basketball_photo2_thumb.jpg', title: 'Crowd Cheers' },
    ],
    relatedMatches: [
      { id: 'm1', homeTeam: 'Greenwood High', awayTeam: 'Riverside Academy', sport: 'Football', date: 'Yesterday', time: '4:00 PM GMT', league: 'National High School Football League', homeLogo: '/images/greenwood_logo.png', awayLogo: '/images/riverside_logo.png' },
      { id: 'u3', homeTeam: 'Lion\'s Pride', awayTeam: 'Victory FC', sport: 'Rugby', date: 'Next Week', time: '3:00 PM GMT', league: 'Western Cape Schools Cup', homeLogo: '/images/lions_logo.png', awayLogo: '/images/victory_logo.png' },
    ],
    relatedAthletes: [
      { id: 'athlete3', name: 'Zola Mofokeng', sport: 'Rugby', photo: '/images/athlete_zola.png', team: 'Lion\'s Pride' },
      { id: 'athlete4', name: 'Linda Owusu', sport: 'Basketball', photo: '/images/player33.png', team: 'Star Academy' },
    ]
  },
  'm3': {
    id: 'm3',
    homeTeam: 'Lion\'s Pride',
    awayTeam: 'Victory FC',
    homeLogo: '/images/lions_logo.png',
    awayLogo: '/images/victory_logo.png',
    homeScore: 18,
    awayScore: 22,
    sport: 'Rugby',
    gameClockSeconds: 4800, // 80 minutes
    period: 'Full Time',
    status: 'Finished',
    location: 'Cape Town Stadium, South Africa',
    league: 'Western Cape Schools Cup',
    keyEvent: 'Victory FC scores a late try to win!',
    isFavorite: false,
    timeline: [
      { time: "80'", type: "try", player: "Peter Mokoena", team: "Victory FC", description: "Try by Peter Mokoena seals the win for Victory FC!" },
      { time: "65'", type: "conversion", player: "Samuel Dlamini", team: "Victory FC", description: "Conversion by Samuel Dlamini." },
      { time: "40'", type: "halftime", description: "Half-time: Lion's Pride 10 - 12 Victory FC." },
      { time: "20'", type: "penalty_goal", player: "Sipho Ndlovu", team: "Lion's Pride", description: "Penalty goal by Sipho Ndlovu." },
      { time: "1'", type: "kick_off", description: "Match kicks off!" },
    ].sort((a, b) => {
        const parseTime = (timeStr) => {
            if (timeStr.endsWith("'")) return parseInt(timeStr.slice(0, -1));
            return 0;
        };
        return parseTime(b.time) - parseTime(a.time);
    }),
    stats: {
      home: {
        tries: 2,
        conversions: 1,
        penaltyGoals: 2,
        tackles: 34,
        turnovers: 5,
        possession: 48,
      },
      away: {
        tries: 3,
        conversions: 2,
        penaltyGoals: 1,
        tackles: 29,
        turnovers: 7,
        possession: 52,
      },
    },
    lineups: {
      home: [
        { id: 'p51', name: 'Sipho Ndlovu', jersey: 1, position: 'Prop', photo: '/images/player51.png', stats: { tries: 1, tackles: 8 } },
        { id: 'p52', name: 'Thabo Maseko', jersey: 2, position: 'Hooker', photo: '/images/player52.png', stats: { tackles: 6 } },
        { id: 'p53', name: 'Lebo Mofokeng', jersey: 3, position: 'Lock', photo: '/images/player53.png', stats: { tackles: 5 } },
        { id: 'p54', name: 'Kabelo Dube', jersey: 4, position: 'Flanker', photo: '/images/player54.png', stats: { tries: 1, tackles: 7 } },
        { id: 'p55', name: 'Sizwe Nkosi', jersey: 5, position: 'No. 8', photo: '/images/player55.png', stats: { tackles: 8 } },
      ],
      away: [
        { id: 'p56', name: 'Peter Mokoena', jersey: 6, position: 'Wing', photo: '/images/player56.png', stats: { tries: 2 } },
        { id: 'p57', name: 'Samuel Dlamini', jersey: 7, position: 'Fly-half', photo: '/images/player57.png', stats: { conversions: 2 } },
        { id: 'p58', name: 'John Mensah', jersey: 8, position: 'Centre', photo: '/images/player58.png', stats: { tackles: 6 } },
        { id: 'p59', name: 'Felix Boateng', jersey: 9, position: 'Fullback', photo: '/images/player59.png', stats: { penaltyGoals: 1 } },
        { id: 'p60', name: 'Kwame Osei', jersey: 10, position: 'Scrum-half', photo: '/images/player60.png', stats: { tackles: 5 } },
      ],
      homeCoach: 'Coach Themba Zulu',
      awayCoach: 'Coach Peter Mensah',
      substitutes: {
        home: [{ id: 'p61', name: 'Lucky Mthembu', jersey: 11, position: 'Lock' }],
        away: [{ id: 'p62', name: 'Bongani Sithole', jersey: 12, position: 'Prop' }],
      }
    },
    media: [
      { type: 'photo', url: '/images/rugby_photo1.jpg', thumbnail: '/images/rugby_photo1_thumb.jpg', title: 'Scrum Battle' },
      { type: 'photo', url: '/images/rugby_photo2.jpg', thumbnail: '/images/rugby_photo2_thumb.jpg', title: 'Try Celebration' },
    ],
    relatedMatches: [
      { id: 'm2', homeTeam: 'Star Academy', awayTeam: 'Coastal Sprinters', sport: 'Basketball', date: 'Yesterday', time: '6:00 PM GMT', league: 'Lagos High School League', homeLogo: '/images/staracademy_logo.png', awayLogo: '/images/coastal_logo.png' },
      { id: 'm4', homeTeam: 'Coastal Sprinters', awayTeam: 'Lion\'s Pride', sport: 'Athletics', date: 'Next Month', time: '10:00 AM GMT', league: 'National Athletics Meet', homeLogo: '/images/coastal_logo.png', awayLogo: '/images/lions_logo.png' },
    ],
    relatedAthletes: [
      { id: 'athlete3', name: 'Zola Mofokeng', sport: 'Rugby', photo: '/images/athlete_zola.png', team: 'Lion\'s Pride' },
      { id: 'athlete5', name: 'Peter Mokoena', sport: 'Rugby', photo: '/images/player56.png', team: 'Victory FC' },
    ]
  },
  'm4': {
    id: 'm4',
    homeTeam: 'Coastal Sprinters',
    awayTeam: 'Lion\'s Pride',
    homeLogo: '/images/coastal_logo.png',
    awayLogo: '/images/lions_logo.png',
    homeScore: 5,
    awayScore: 3,
    sport: 'Athletics',
    gameClockSeconds: null,
    period: 'Finals',
    status: 'Finished',
    location: 'National Stadium, Kenya',
    league: 'National Athletics Meet',
    keyEvent: 'Coastal Sprinters win the relay finals!',
    isFavorite: false,
    timeline: [
      { time: "Final", type: "finish", team: "Coastal Sprinters", description: "Coastal Sprinters finish first in the relay!" },
      { time: "Start", type: "start", description: "Relay race starts." },
    ],
    stats: {
      home: {
        golds: 2,
        silvers: 1,
        bronzes: 2,
        totalPoints: 45,
      },
      away: {
        golds: 1,
        silvers: 2,
        bronzes: 1,
        totalPoints: 38,
      },
    },
    lineups: {
      home: [
        { id: 'p63', name: 'Tunde Balogun', jersey: 1, position: 'Sprinter', photo: '/images/athlete_tunde.png', stats: { golds: 1 } },
        { id: 'p64', name: 'Ama Kofi', jersey: 2, position: 'Sprinter', photo: '/images/athlete_ama.png', stats: { silvers: 1 } },
        { id: 'p65', name: 'Linda Owusu', jersey: 3, position: 'Sprinter', photo: '/images/player33.png', stats: { bronzes: 1 } },
        { id: 'p66', name: 'Samuel Ade', jersey: 4, position: 'Sprinter', photo: '/images/player34.png', stats: { golds: 1 } },
      ],
      away: [
        { id: 'p67', name: 'Zola Mofokeng', jersey: 5, position: 'Sprinter', photo: '/images/athlete_zola.png', stats: { golds: 1 } },
        { id: 'p68', name: 'Felix Boateng', jersey: 6, position: 'Sprinter', photo: '/images/player35.png', stats: { silvers: 1 } },
        { id: 'p69', name: 'Peter Mokoena', jersey: 7, position: 'Sprinter', photo: '/images/player56.png', stats: { bronzes: 1 } },
        { id: 'p70', name: 'Kwame Osei', jersey: 8, position: 'Sprinter', photo: '/images/player60.png', stats: { silvers: 1 } },
      ],
      homeCoach: 'Coach Sola Ogun',
      awayCoach: 'Coach Themba Zulu',
      substitutes: {
        home: [],
        away: [],
      }
    },
    media: [
      { type: 'photo', url: '/images/athletics_photo1.jpg', thumbnail: '/images/athletics_photo1_thumb.jpg', title: 'Relay Finish' },
      { type: 'photo', url: '/images/athletics_photo2.jpg', thumbnail: '/images/athletics_photo2_thumb.jpg', title: 'Medal Ceremony' },
    ],
    relatedMatches: [
      { id: 'm3', homeTeam: 'Lion\'s Pride', awayTeam: 'Victory FC', sport: 'Rugby', date: 'Last Week', time: '3:00 PM GMT', league: 'Western Cape Schools Cup', homeLogo: '/images/lions_logo.png', awayLogo: '/images/victory_logo.png' },
      { id: 'm5', homeTeam: 'Greenwood High', awayTeam: 'Star Academy', sport: 'Tennis', date: 'Tomorrow', time: '11:00 AM GMT', league: 'National Tennis League', homeLogo: '/images/greenwood_logo.png', awayLogo: '/images/staracademy_logo.png' },
    ],
    relatedAthletes: [
      { id: 'athlete2', name: 'Tunde Balogun', sport: 'Athletics', photo: '/images/athlete_tunde.png', team: 'Coastal Sprinters' },
      { id: 'athlete3', name: 'Zola Mofokeng', sport: 'Rugby', photo: '/images/athlete_zola.png', team: 'Lion\'s Pride' },
    ]
  },
  'm5': {
    id: 'm5',
    homeTeam: 'Greenwood High',
    awayTeam: 'Star Academy',
    homeLogo: '/images/greenwood_logo.png',
    awayLogo: '/images/staracademy_logo.png',
    homeScore: 2,
    awayScore: 1,
    sport: 'Tennis',
    gameClockSeconds: null,
    period: 'Final Set',
    status: 'Finished',
    location: 'Accra Tennis Club, Ghana',
    league: 'National Tennis League',
    keyEvent: 'Greenwood High wins the deciding set!',
    isFavorite: false,
    timeline: [
      { time: "Set 3", type: "set_win", player: "Kwame Nkrumah", team: "Greenwood High", description: "Kwame Nkrumah wins the final set for Greenwood High!" },
      { time: "Set 2", type: "set_win", player: "Ama Kofi", team: "Star Academy", description: "Ama Kofi levels the match by winning set 2." },
      { time: "Set 1", type: "set_win", player: "Kwame Nkrumah", team: "Greenwood High", description: "Kwame Nkrumah takes the opening set." },
    ],
    stats: {
      home: {
        aces: 7,
        doubleFaults: 2,
        winners: 24,
        unforcedErrors: 15,
        breakPointsWon: 3,
      },
      away: {
        aces: 5,
        doubleFaults: 3,
        winners: 19,
        unforcedErrors: 18,
        breakPointsWon: 2,
      },
    },
    lineups: {
      home: [
        { id: 'p1', name: 'Kwame Nkrumah', jersey: 1, position: 'Singles', photo: '/images/player1.png', stats: { aces: 7, winners: 24 } },
      ],
      away: [
        { id: 'p31', name: 'Ama Kofi', jersey: 5, position: 'Singles', photo: '/images/athlete_ama.png', stats: { aces: 5, winners: 19 } },
      ],
      homeCoach: 'Coach Emma Osei',
      awayCoach: 'Coach Nana Asare',
      substitutes: {
        home: [],
        away: [],
      }
    },
    media: [
      { type: 'photo', url: '/images/tennis_photo1.jpg', thumbnail: '/images/tennis_photo1_thumb.jpg', title: 'Match Point' },
      { type: 'photo', url: '/images/tennis_photo2.jpg', thumbnail: '/images/tennis_photo2_thumb.jpg', title: 'Trophy Presentation' },
    ],
    relatedMatches: [
      { id: 'm4', homeTeam: 'Coastal Sprinters', awayTeam: 'Lion\'s Pride', sport: 'Athletics', date: 'Yesterday', time: '10:00 AM GMT', league: 'National Athletics Meet', homeLogo: '/images/coastal_logo.png', awayLogo: '/images/lions_logo.png' },
      { id: 'm1', homeTeam: 'Greenwood High', awayTeam: 'Riverside Academy', sport: 'Football', date: 'Last Week', time: '4:00 PM GMT', league: 'National High School Football League', homeLogo: '/images/greenwood_logo.png', awayLogo: '/images/riverside_logo.png' },
    ],
    relatedAthletes: [
      { id: 'athlete1', name: 'Ama Kofi', sport: 'Basketball', photo: '/images/athlete_ama.png', team: 'Star Academy' },
      { id: 'athlete6', name: 'Kwame Nkrumah', sport: 'Tennis', photo: '/images/player1.png', team: 'Greenwood High' },
    ]
  },
  // Add more mock match details here if you have more match IDs
};

const MatchDetailsPage = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // Default tab
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null); // For selected video/photo

  // --- DEBUGGING CONSOLE LOGS ---
  console.log("MatchDetailsPage Rendered. matchId from useParams:", matchId);
  console.log("mockMatchDetails keys:", Object.keys(mockMatchDetails));

  useEffect(() => {
    // Simulate fetching data
    const fetchMatch = setTimeout(() => {
      const data = mockMatchDetails[matchId];
      console.log(`Attempting to find match with ID: ${matchId}`);
      console.log("Found data:", data); // Should be the match object or undefined

      if (data) {
        setMatchData(data);
        setIsFavorite(data.isFavorite || false);
        // Set first video/photo as current media if available
        if (data.media && data.media.length > 0) {
            setCurrentMedia(data.media[0]);
        }
      } else {
        // Handle case where matchId is not found (e.g., redirect to 404 or dashboard)
        console.warn(`Match with ID ${matchId} not found in mock data.`);
        setMatchData(null); // Or set an error state
      }
    }, 500); // Simulate network delay

    return () => clearTimeout(fetchMatch);
  }, [matchId]);

  const handleShare = () => {
    // In a real app, this would use Web Share API or copy link to clipboard
    alert('Share functionality triggered! (Link would be copied or shared via native)');
  };

  if (!matchData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gamepulse-dark text-white">
        <p>Loading match details or Match with ID "{matchId}" not found...</p>
      </div>
    );
  }

  const SportIcon = getSportIcon(matchData.sport);
  const statusColor = matchData.status === 'In Progress' || matchData.status === 'Live' ? 'bg-red-600' : 'bg-gray-500';
  const statusDot = matchData.status === 'In Progress' || matchData.status === 'Live' ? 'animate-pulse' : '';
  const statusText = matchData.status === 'In Progress' || matchData.status === 'Live' ? 'LIVE' : matchData.status;

  return (
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col pt-20"> {/* pt-20 for main app header */}

      {/* I. Page Header & Primary Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gamepulse-dark-gradient from-gamepulse-blue-dark to-gamepulse-dark p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-white text-2xl">
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl md:text-2xl font-extrabold text-white text-center flex-grow truncate px-2">
            {matchData.homeTeam} vs. {matchData.awayTeam}
          </h1>
          <button onClick={handleShare} className="text-white text-2xl ml-2">
            <FaShareAlt />
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm mb-4">
          <span className="font-semibold">{matchData.period}</span>
          <span className="ml-2">{matchData.gameClockSeconds !== null && matchData.status !== 'Finished' ? formatGameClock(matchData.sport, matchData.gameClockSeconds) : ''}</span>
          {matchData.status === 'Finished' && <span className="ml-2">Full Time</span>}
        </div>

        <div className="flex justify-around bg-gray-900 p-1 rounded-full mx-auto max-w-lg my-2 shadow-inner">
          {['overview', 'stats', 'timeline', 'media', 'lineups'].map(tab => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 px-2 rounded-full text-sm font-semibold transition-colors
                          ${activeTab === tab ? 'bg-gamepulse-blue text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Rendered based on active tab */}
      <div className="flex-grow pb-8 overflow-y-auto custom-scrollbar pt-[160px] md:pt-[180px]"> {/* Dynamic padding to account for fixed header */}

        {/* II. Live Scoreboard & Key Game Info (Always visible in Overview tab) */}
        {activeTab === 'overview' && (
          <section className="bg-gray-900 p-6 md:p-8 rounded-b-xl shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className={`${statusColor} text-white text-xs px-3 py-1 rounded-full flex items-center ${statusDot} font-bold`}>
                <span className={`w-2 h-2 ${statusColor === 'bg-red-600' ? 'bg-white' : 'bg-gray-300'} rounded-full mr-1`}></span>
                {statusText}
              </span>
              <SportIcon className="text-gamepulse-blue text-3xl" />
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`text-2xl ${isFavorite ? 'text-gamepulse-yellow' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
                >
                  <FaStar />
                </button>
                <button className="text-2xl text-gray-500 hover:text-gray-300">
                  <FaBell /> {/* Notifications button */}
                </button>
                {/* For real implementation, add a 'Watch Live' button if media.type === 'video' and is streaming */}
                {matchData.status === 'In Progress' || matchData.status === 'Live' ? (
                  <button className="bg-gamepulse-blue text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <FaPlayCircle className="mr-2" /> Watch Live
                  </button>
                ) : (
                  currentMedia && currentMedia.type === 'video' && (
                    <button
                      onClick={() => alert(`Playing: ${currentMedia.title}`)}
                      className="bg-gamepulse-blue text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center"
                    >
                      <FaPlayCircle className="mr-2" /> Play Highlights
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Scoreboard */}
            <div className="flex justify-between items-center my-6">
              <div className="flex flex-col items-center flex-1">
                <img src={matchData.homeLogo} alt={matchData.homeTeam} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2" />
                <span className="font-bold text-lg md:text-xl text-center">{matchData.homeTeam}</span>
              </div>
              <div className="mx-4 text-5xl md:text-6xl font-extrabold text-gamepulse-blue">
                {matchData.homeScore !== null ? matchData.homeScore : '-'} - {matchData.awayScore !== null ? matchData.awayScore : '-'}
              </div>
              <div className="flex flex-col items-center flex-1">
                <img src={matchData.awayLogo} alt={matchData.awayTeam} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2" />
                <span className="font-bold text-lg md:text-xl text-center">{matchData.awayTeam}</span>
              </div>
            </div>

            <div className="text-center text-gray-300 text-sm md:text-base">
              <p className="mb-1 flex items-center justify-center"><FaTrophy className="mr-2 text-gamepulse-yellow" />{matchData.league}</p>
              <p className="mb-1 flex items-center justify-center"><FaMapMarkerAlt className="mr-2 text-red-400" />{matchData.location}</p>
              {matchData.keyEvent && (
                <p className="mt-3 p-2 bg-gray-800 rounded-lg flex items-center justify-center text-gamepulse-green text-sm">
                  <FaFire className="mr-2 text-orange-400" />{matchData.keyEvent}
                </p>
              )}
            </div>
          </section>
        )}

        {/* III. Stats Tab */}
        {activeTab === 'stats' && (
          <section className="p-4 md:p-6 bg-gray-900 mx-4 md:mx-auto rounded-lg shadow-lg mb-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Match Statistics</h2>
            {matchData.stats ? (
              <div className="space-y-4">
                {Object.keys(matchData.stats.home).map(statKey => (
                  <div key={statKey} className="flex flex-col items-center">
                    <span className="text-gray-400 text-sm mb-1">{statKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <div className="flex items-center w-full">
                      <div className="text-gamepulse-blue font-bold w-1/4 text-right pr-2">{matchData.stats.home[statKey]}</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-gamepulse-blue h-2.5 rounded-full"
                          style={{ width: `${(matchData.stats.home[statKey] / (matchData.stats.home[statKey] + matchData.stats.away[statKey])) * 100 || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-gamepulse-red font-bold w-1/4 text-left pl-2">{matchData.stats.away[statKey]}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">No detailed statistics available for this match yet.</p>
            )}
          </section>
        )}

        {/* IV. Timeline Tab */}
        {activeTab === 'timeline' && (
          <section className="p-4 md:p-6 bg-gray-900 mx-4 md:mx-auto rounded-lg shadow-lg mb-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Match Timeline</h2>
            {matchData.timeline && matchData.timeline.length > 0 ? (
              <div className="relative border-l-2 border-gray-700 ml-4 pl-4">
                {matchData.timeline.map((event, index) => (
                  <div key={index} className="mb-6 flex items-start">
                    <div className="absolute w-3 h-3 bg-gamepulse-blue rounded-full -left-1.5 mt-1.5 border border-gray-900"></div>
                    <div className="flex-1 ml-4">
                      <p className="text-sm text-gray-400">{event.time}</p>
                      <p className={`font-semibold ${event.team === matchData.homeTeam ? 'text-gamepulse-blue' : event.team === matchData.awayTeam ? 'text-gamepulse-red' : 'text-white'}`}>
                        {event.description}
                      </p>
                      {event.player && <p className="text-xs text-gray-500">Player: {event.player} {event.playerOut ? `(Sub out: ${event.playerOut})` : ''}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">No live updates or timeline events available yet.</p>
            )}
          </section>
        )}

        {/* V. Media Tab */}
        {activeTab === 'media' && (
          <section className="p-4 md:p-6 bg-gray-900 mx-4 md:mx-auto rounded-lg shadow-lg mb-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Match Media</h2>
            {matchData.media && matchData.media.length > 0 ? (
              <div className="space-y-4">
                {currentMedia && (
                  <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    {currentMedia.type === 'video' ? (
                      <video controls className="w-full h-full">
                        <source src={currentMedia.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={currentMedia.url} alt={currentMedia.title} className="w-full h-full object-contain" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm font-semibold">
                      {currentMedia.title}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {matchData.media.map((mediaItem, index) => (
                    <button
                      key={index}
                      className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105
                                  ${currentMedia && currentMedia.url === mediaItem.url ? 'border-2 border-gamepulse-blue' : 'border border-gray-700'}`}
                      onClick={() => setCurrentMedia(mediaItem)}
                    >
                      <img
                        src={mediaItem.thumbnail}
                        alt={mediaItem.title}
                        className="w-full h-full object-cover"
                      />
                      {mediaItem.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <FaPlayCircle className="text-white text-3xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-black bg-opacity-70 text-white text-xs truncate">
                        {mediaItem.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400">No media available for this match yet.</p>
            )}
          </section>
        )}

        {/* VI. Lineups Tab */}
        {activeTab === 'lineups' && (
          <section className="p-4 md:p-6 bg-gray-900 mx-4 md:mx-auto rounded-lg shadow-lg mb-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Team Lineups</h2>
            {matchData.lineups ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Home Team */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gamepulse-blue mb-3 text-center">{matchData.homeTeam}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">Coach: {matchData.lineups.homeCoach}</p>
                  <h4 className="font-bold text-lg mb-2 border-b border-gray-700 pb-2">Starting Players</h4>
                  <div className="space-y-2">
                    {matchData.lineups.home.map(player => (
                      <div key={player.id} className="flex items-center bg-gray-700 p-2 rounded-md">
                        <img src={player.photo} alt={player.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                        <span className="font-medium">{player.jersey}. {player.name}</span>
                        <span className="ml-auto text-gray-400 text-sm">({player.position})</span>
                      </div>
                    ))}
                  </div>
                  {matchData.lineups.substitutes.home.length > 0 && (
                    <>
                      <h4 className="font-bold text-lg mt-4 mb-2 border-b border-gray-700 pb-2">Substitutes</h4>
                      <div className="space-y-2">
                        {matchData.lineups.substitutes.home.map(player => (
                          <div key={player.id} className="flex items-center bg-gray-700 p-2 rounded-md">
                            <img src={player.photo || '/images/player_placeholder.png'} alt={player.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                            <span className="font-medium">{player.jersey}. {player.name}</span>
                            <span className="ml-auto text-gray-400 text-sm">({player.position})</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Away Team */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-gamepulse-red mb-3 text-center">{matchData.awayTeam}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4">Coach: {matchData.lineups.awayCoach}</p>
                  <h4 className="font-bold text-lg mb-2 border-b border-gray-700 pb-2">Starting Players</h4>
                  <div className="space-y-2">
                    {matchData.lineups.away.map(player => (
                      <div key={player.id} className="flex items-center bg-gray-700 p-2 rounded-md">
                        <img src={player.photo} alt={player.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                        <span className="font-medium">{player.jersey}. {player.name}</span>
                        <span className="ml-auto text-gray-400 text-sm">({player.position})</span>
                      </div>
                    ))}
                  </div>
                  {matchData.lineups.substitutes.away.length > 0 && (
                    <>
                      <h4 className="font-bold text-lg mt-4 mb-2 border-b border-gray-700 pb-2">Substitutes</h4>
                      <div className="space-y-2">
                        {matchData.lineups.substitutes.away.map(player => (
                          <div key={player.id} className="flex items-center bg-gray-700 p-2 rounded-md">
                            <img src={player.photo || '/images/player_placeholder.png'} alt={player.name} className="w-8 h-8 rounded-full object-cover mr-2" />
                            <span className="font-medium">{player.jersey}. {player.name}</span>
                            <span className="ml-auto text-gray-400 text-sm">({player.position})</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400">Lineup information not available for this match yet.</p>
            )}
          </section>
        )}

        {/* VII. Related Matches and Athletes (always visible below tabs or within Overview) */}
        {activeTab === 'overview' && ( // Or move this out of conditional tab rendering if you want it always visible
          <section className="p-4 md:p-6 bg-gray-900 mx-4 md:mx-auto rounded-lg shadow-lg max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">More from {matchData.league}</h2>

            {matchData.relatedMatches && matchData.relatedMatches.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gamepulse-blue mb-3 flex items-center"><FaUsers className="mr-2" />Related Matches</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {matchData.relatedMatches.map(relMatch => (
                    <Link to={`/match-details/${relMatch.id}`} key={relMatch.id} className="block bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="flex items-center mb-2">
                        <img src={relMatch.homeLogo} alt={relMatch.homeTeam} className="w-6 h-6 object-contain mr-2" />
                        <span className="font-semibold">{relMatch.homeTeam}</span>
                        <span className="mx-1 text-gray-400">vs</span>
                        <img src={relMatch.awayLogo} alt={relMatch.awayTeam} className="w-6 h-6 object-contain mr-2" />
                        <span className="font-semibold">{relMatch.awayTeam}</span>
                      </div>
                      <p className="text-sm text-gray-400">{relMatch.sport} | {relMatch.date} {relMatch.time}</p>
                      <p className="text-xs text-gray-500">{relMatch.league}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {matchData.relatedAthletes && matchData.relatedAthletes.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gamepulse-blue mb-3 flex items-center"><FaChartLine className="mr-2" />Featured Athletes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {matchData.relatedAthletes.map(athlete => (
                    <div key={athlete.id} className="bg-gray-800 p-3 rounded-lg text-center">
                      <img src={athlete.photo} alt={athlete.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-gamepulse-blue" />
                      <p className="font-semibold text-sm truncate">{athlete.name}</p>
                      <p className="text-xs text-gray-400">{athlete.sport} - {athlete.team}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {(!matchData.relatedMatches || matchData.relatedMatches.length === 0) &&
             (!matchData.relatedAthletes || matchData.relatedAthletes.length === 0) && (
              <p className="text-center text-gray-400">No related content available.</p>
            )}
          </section>
        )}

      </div>
    </div>
  );
};

export default MatchDetailsPage;