// src/data/allAthleteProfilesData.js

// Import athlete-specific images from your assets
// Ensure these paths are correct based on your project structure.
import athlete1FullImage from '../assets/profileOne.png'; // Generic athlete, good for basketball
import athlete1SchoolLogo from '../assets/school1.png';
import athlete1TeamLogo from '../assets/bb1.png';

import athlete2FullImage from '../assets/soccerplayer.png'; // Good for football
import athlete2SchoolLogo from '../assets/school1.png';
import athlete2TeamLogo from '../assets/soccerT2.png';

import athlete3FullImage from '../assets/runner.png'; // Good for athletics
import athlete4FullImage from '../assets/Gemini_Generated_Image_syu00fsyu00fsyu0.png'; // Another good athlete image for any sport

import athlete3TeamLogo from '../assets/soccerT2.png';

// New imports for career history logos (add these if you have them in your assets)
// If you don't have these specific logos, you can leave the `logo` field as `null`
// or replace them with generic school/team logos you already have.
import ghanaBasketballLogo from '../assets/soccerT2.png'
import ghanaFootballLogo from '../assets/soccerT2.png'
import ghanaAthleticsLogo from '../assets/soccerT2.png'
import ghanaVolleyballLogo from '../assets/soccerT2.png'
import ghanaSwimmingLogo from '../assets/soccerT2.png'
import ghanaHandballLogo from '../assets/soccerT2.png'
import ghanaTennisLogo from '../assets/soccerT2.png'
import ghanaTableTennisLogo from '../assets/soccerT2.png'
import ghanaRugbyLogo from '../assets/soccerT2.png'
import ghanaBadmintonLogo from '../assets/soccerT2.png'
import ghanaHockeyLogo from '../assets/soccerT2.png'
import ghanaTaekwondoLogo from '../assets/soccerT2.png'




const placeholderNike = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=NIKE';
const placeholderAdidas = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=ADIDAS';
const placeholderRedBull = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=RED+BULL';
const placeholderVodafone = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=VODAFONE';
const placeholderBetPawa = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=BETPAWA';
const placeholderFanMilk = 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=FANMILK';


export const allAthleteProfilesData = [
  // --- BASKETBALL ATHLETE ---
  {
    id: 'ama_owusu',
    firstName: 'Ama',
    lastName: 'Owusu',
    fullName: 'Ama Owusu',
    sportType: 'basketball',
    athleteFullImage: athlete1FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: athlete1TeamLogo,
    position: 'Guard',
    jerseyNumber: '10',
    height: '5\'7"',
    weight: '140 lbs',
    bornDate: 'January 15, 2007',
    fromLocation: 'Accra, Greater Accra',
    sportsDebut: '2021',
    previousLocation: 'Greater Accra League',
    postseasonStats: {
      mp: '35.2', fg: '48.5%', '3p': '35.1%', ft: '88.9%',
      ppg: '28.5', rpg: '6.2', apg: '4.1', bpg: '1.0'
    },
    careerStats: {
      mp: '32.1', fg: '45.3%', '3p': '32.7%', ft: '85.2%',
      ppg: '25.3', rpg: '5.5', apg: '3.8', bpg: '0.8'
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=example', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', title: 'Game-Winning Three-Pointer', description: 'Ama sinks a crucial shot at the buzzer.' },
      { type: 'image', url: athlete1FullImage, title: 'In-Game Action Shot', description: 'Driving to the basket during the regional finals.' },
      { type: 'video', url: 'https://www.youtube.com/embed/another_video_id?si=example', thumbnail: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=HighlightVideo', title: 'Top 5 Plays', description: 'Best moments from the last season.' },
    ],
    bio: [
      "Ama Owusu is a dynamic point guard known for her exceptional court vision and sharp shooting. Hailing from Accra, she quickly rose through the ranks of the Greater Accra League, making her mark with impressive performances.",
      "Beyond the court, Ama is a dedicated student and an advocate for youth sports development in her community. She believes in inspiring the next generation of athletes through hard work and perseverance."
    ],
    interests: [
      "Reading sports biographies",
      "Volunteering at local basketball clinics",
      "Learning new languages",
      "Graphic design"
    ],
    achievements: [
      { year: 2023, description: "Greater Accra League MVP" },
      { year: 2022, description: "Top Scorer, National U17 Championship" },
      { year: 2021, description: "Rookie of the Year, Regional League" }
    ],
    education: [
      { year: "2021 - Present", institution: "St. John's Senior High School", degree: "WASSCE (expected 2025)" }
    ],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true,
        twitter: true,
        instagram: true,
        linkedin: true,
        tiktok: true,
        whatsapp: true,
        youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/amaowusu_bball',
      twitter: 'https://twitter.com/ama_bball',
      instagram: 'https://instagram.com/ama.hoops',
      linkedin: 'https://linkedin.com/in/amaowusu-basketball',
      tiktok: 'https://tiktok.com/@ama_gets_buckets',
      whatsapp: '233241234567',
      youtube: 'https://youtube.com/channel/ama_bball_highlights',
      email: 'ama.owusu.bball@example.com',
      phone: '+233 24 123 4567'
    },
    careerHistory: [
      { year: '2023-Present', team: 'National U18 Team (Ghana)', logo: ghanaBasketballLogo, description: 'Representing Ghana at continental championships.' },
      { year: '2021-2023', team: 'Greater Accra League (Senior Team)', logo: athlete1TeamLogo, description: 'Became a dominant force, winning MVP in 2023.' },
      { year: '2019-2021', team: 'St. John\'s Senior High School (Basketball Team)', logo: athlete1SchoolLogo, description: 'Led school team to regional titles.' },
      { year: '2017-2019', team: 'Accra Youth Basketball Academy', logo: null, description: 'Honed fundamental skills and game IQ.' },
    ],
    keyAttributes: [
      { name: 'Court Vision', rating: 5, description: 'Exceptional ability to read the game and find open teammates.' },
      { name: 'Shooting Accuracy', rating: 4.5, description: 'Consistent from both inside and beyond the arc.' },
      { name: 'Ball Handling', rating: 4, description: 'Strong and confident dribbling under pressure.' },
      { name: 'Leadership', rating: 4, description: 'Commands the floor and motivates teammates.' },
    ],
    sponsors: [
      { name: 'Nike', logoUrl: placeholderNike },
      { name: 'Red Bull', logoUrl: placeholderRedBull },
      { name: 'FanMilk', logoUrl: placeholderFanMilk },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-20', time: '18:00', title: 'National League Playoffs - Game 1', location: 'Accra Sports Stadium Arena', description: 'Vs. Tema Ballers' },
      { date: '2025-07-23', time: '19:30', title: 'National League Playoffs - Game 2', location: 'Kumasi Sports Complex', description: 'Vs. Kumasi Knights' },
      { date: '2025-08-05', time: '10:00', title: 'U18 National Team Training Camp', location: 'Ghana National Sports College, Winneba', description: 'Preparatory camp for African Youth Games.' },
    ],
  },
  

  // --- FOOTBALL (SOCCER) ATHLETE ---
  {
    id: 'kwame_mensah',
    firstName: 'Kwame',
    lastName: 'Mensah',
    fullName: 'Kwame Mensah',
    sportType: 'football',
    athleteFullImage: athlete2FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: athlete2TeamLogo,
    position: 'Midfielder',
    jerseyNumber: '8',
    height: '5\'11"',
    weight: '165 lbs',
    bornDate: 'August 22, 2006',
    fromLocation: 'Kumasi, Ashanti',
    sportsDebut: '2020',
    previousLocation: 'Ashanti Regional League',
    postseasonStats: {
      appearances: '15', goals: '7', assists: '5', passAccuracy: '88%',
      tackles: '30', yellowCards: '2', redCards: '0', cleanSheets: '0'
    },
    careerStats: {
      appearances: '80', goals: '25', assists: '18', passAccuracy: '85%',
      tackles: '120', yellowCards: '10', redCards: '1', cleanSheets: '0'
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/some_football_highlight?si=example', thumbnail: 'https://img.youtube.com/vi/some_football_highlight/hqdefault.jpg', title: 'Goal vs. Rivals', description: 'Kwame scores a brilliant long-range goal.' },
      { type: 'image', url: athlete2FullImage, title: 'Midfield Maestro', description: 'Controlling the ball in the midfield.' },
    ],
    bio: [
      "Kwame Mensah is a versatile midfielder renowned for his exceptional passing range and defensive work rate. A product of the Kumasi youth system, he quickly became a pivotal player in the Ashanti Regional League.",
      "Off the pitch, Kwame is passionate about tactics and analytics, often studying professional matches to refine his own game. He aspires to play professionally and represent Ghana on the international stage."
    ],
    interests: [
      "Football tactics and analysis",
      "Playing video games",
      "Fitness training",
      "Mentoring young players"
    ],
    achievements: [
      { year: 2023, description: "Ashanti Regional League Champion" },
      { year: 2022, description: "Most Assists, Regional League" }
    ],
    education: [
      { year: "2020 - Present", institution: "Kumasi Royal Academy", degree: "WASSCE (expected 2024)" }
    ],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: true,
      socialMediaVisibility: {
        facebook: true,
        twitter: true,
        instagram: true,
        linkedin: true,
        tiktok: true,
        whatsapp: true,
        youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/kwame_football',
      twitter: 'https://twitter.com/kwame_midfielder',
      instagram: 'https://instagram.com/kwame.scores',
      linkedin: 'https://linkedin.com/in/kwamemensah-football',
      tiktok: 'https://tiktok.com/@kwame_skills',
      whatsapp: '233249876543',
      youtube: 'https://youtube.com/channel/kwame_match_highlights',
      email: 'kwame.mensah.football@example.com',
      phone: '+233 24 987 6543'
    },
    careerHistory: [
      { year: '2023-Present', team: 'National U17 Team (Ghana)', logo: ghanaFootballLogo, description: 'Key player in the national youth setup.' },
      { year: '2021-2023', team: 'Ashanti Regional League (Senior Team)', logo: athlete2TeamLogo, description: 'Helped team win regional championship.' },
      { year: '2018-2021', team: 'Kumasi Royal Academy (Football Program)', logo: athlete2SchoolLogo, description: 'Developed technical skills and tactical awareness.' },
      { year: '2015-2018', team: 'Kumasi Youth Football Club', logo: null, description: 'Started playing organized football at a young age.' },
    ],
    keyAttributes: [
      { name: 'Passing Range', rating: 5, description: 'Ability to deliver accurate long and short passes.' },
      { name: 'Defensive Work Rate', rating: 4.5, description: 'High intensity in winning back possession.' },
      { name: 'Tactical Awareness', rating: 4, description: 'Excellent understanding of game flow and positioning.' },
      { name: 'Ball Control', rating: 4, description: 'Close control in tight spaces and under pressure.' },
    ],
    sponsors: [
      { name: 'Adidas', logoUrl: placeholderAdidas },
      { name: 'Vodafone Ghana', logoUrl: placeholderVodafone },
      { name: 'BetPawa', logoUrl: placeholderBetPawa },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-06-25', time: '16:00', title: 'Ashanti League Matchday 10', location: 'Baba Yara Sports Stadium, Kumasi', description: 'Vs. Asante Kotoko Youth' },
      { date: '2025-07-01', time: '09:00', title: 'National Team U17 Selection Trials', location: 'Accra Sports Stadium Training Pitch', description: 'Phase 2 Trials' },
      { date: '2025-07-10', time: '15:30', title: 'Ashanti League Matchday 11', location: 'Obuasi Len Clay Stadium', description: 'Vs. Goldfields Academy' },
    ],
  },

  // --- ATHLETICS (TRACK & FIELD) ATHLETE ---
  {
    id: 'akua_ansah',
    firstName: 'Akua',
    lastName: 'Ansah',
    fullName: 'Akua Ansah',
    sportType: 'athletics',
    athleteFullImage: athlete3FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: athlete3TeamLogo,
    position: 'Sprinter',
    jerseyNumber: null,
    height: '5\'4"',
    weight: '120 lbs',
    bornDate: 'March 10, 2008',
    fromLocation: 'Cape Coast, Central',
    sportsDebut: '2022',
    previousLocation: 'Regional Athletics Meet',
    postseasonStats: {
      events: '100m, 200m', pb100m: '12.05s', pb200m: '25.10s',
      medals: '3 Gold', rank: '1st Regional', avgSpeed: '28km/h', starts: 'Excellent', form: 'Strong'
    },
    careerStats: {
      events: '100m, 200m, 4x100m', pb100m: '11.80s', pb200m: '24.50s',
      medals: '8 Gold', rank: 'National Top 5', avgSpeed: '29km/h', starts: 'Elite', form: 'Excellent'
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/some_athletics_highlight?si=example', thumbnail: 'https://img.youtube.com/vi/some_athletics_highlight/hqdefault.jpg', title: '100m Dash Victory', description: 'Akua crossing the finish line first.' },
      { type: 'image', url: athlete3FullImage, title: 'Ready to Sprint', description: 'Akua at the starting blocks.' },
    ],
    bio: [
      "Akua Ansah is a rising star in Ghanaian athletics, specializing in short-distance sprints. Her explosive starts and powerful stride have earned her numerous accolades at regional and national levels.",
      "Akua is dedicated to her training regimen and constantly strives to improve her personal bests. She dreams of representing Ghana at international championships."
    ],
    interests: [
      "Track and field history",
      "Nutrition and fitness",
      "Listening to motivational podcasts",
      "Art and drawing"
    ],
    achievements: [
      { year: 2023, description: "National U17 100m Silver Medalist" },
      { year: 2022, description: "Central Region Athletics Champion (100m, 200m)" }
    ],
    education: [
      { year: "2022 - Present", institution: "Cape Coast High School", degree: "WASSCE (expected 2026)" }
    ],
    contactSettings: {
      inAppMessagingEnabled: false,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true,
        twitter: true,
        instagram: true,
        linkedin: true,
        tiktok: true,
        whatsapp: false,
        youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/akua_sprints',
      twitter: 'https://twitter.com/akua_track',
      instagram: 'https://instagram.com/akua_speedster',
      linkedin: 'https://linkedin.com/in/akuaansah-athletics',
      tiktok: 'https://tiktok.com/@akua_on_track',
      whatsapp: '233541112233',
      youtube: 'https://youtube.com/channel/akua_sprint_vids',
      email: 'akua.ansah.athletics@example.com',
      phone: '+233 54 111 2233'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Athletics Team (Youth)', logo: ghanaAthleticsLogo, description: 'Competing at national and regional championships.' },
      { year: '2022-2023', team: 'Central Region Athletics Club', logo: null, description: 'Dominated regional meets in sprint events.' },
      { year: '2020-2022', team: 'Cape Coast High School (Track Team)', logo: athlete1SchoolLogo, description: 'Broke school records in 100m and 200m.' },
      { year: '2018-2020', team: 'Local Athletics Training Group', logo: null, description: 'Began specialized sprint training.' },
    ],
    keyAttributes: [
      { name: 'Explosive Start', rating: 5, description: 'Quickest out of the blocks, gaining early lead.' },
      { name: 'Top-End Speed', rating: 4.5, description: 'Maintains high velocity throughout the race.' },
      { name: 'Form & Technique', rating: 4.5, description: 'Efficient running mechanics for optimal performance.' },
      { name: 'Race Strategy', rating: 3.5, description: 'Ability to pace and finish strong in longer sprints.' },
    ],
    sponsors: [
      { name: 'Puma', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=PUMA' },
      { name: 'Gatorade', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=GATORADE' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-01', time: '14:00', title: 'National Athletics Championship - Heats', location: 'Accra Sports Stadium, Accra', description: '100m and 200m Heats' },
      { date: '2025-07-02', time: '16:00', title: 'National Athletics Championship - Finals', location: 'Accra Sports Stadium, Accra', description: '100m and 200m Finals (if qualified)' },
      { date: '2025-08-15', time: '09:00', title: 'West African Youth Games', location: 'Dakar, Senegal', description: 'Representing Ghana in sprint events.' },
    ],
  },

  // --- VOLLEYBALL ATHLETE ---
  {
    id: 'yaw_nkrumah',
    firstName: 'Yaw',
    lastName: 'Nkrumah',
    fullName: 'Yaw Nkrumah',
    sportType: 'volleyball',
    athleteFullImage: athlete4FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: athlete1TeamLogo,
    position: 'Setter',
    jerseyNumber: '7',
    height: '6\'0"',
    weight: '175 lbs',
    bornDate: 'November 5, 2006',
    fromLocation: 'Tema, Greater Accra',
    sportsDebut: '2021',
    previousLocation: 'Volleyball Championship',
    postseasonStats: {
      sets: '120', assists: '80', blocks: '15', aces: '10',
      digs: '25', serviceEff: '90%', attackingPct: '45%', games: '10'
    },
    careerStats: {
      sets: '500', assists: '350', blocks: '70', aces: '40',
      digs: '100', serviceEff: '88%', attackingPct: '40%', games: '45'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: false, instagram: true, linkedin: true, tiktok: false, whatsapp: true, youtube: false,
      }
    },
    icons: {
      facebook: 'https://facebook.com/yaw_volley',
      instagram: 'https://instagram.com/yaw.setter',
      linkedin: 'https://linkedin.com/in/yawnkrumah-volleyball',
      whatsapp: '233204445566',
      email: 'yaw.nkrumah.volley@example.com',
      phone: '+233 20 444 5566'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Greater Accra Volleyball Club', logo: ghanaVolleyballLogo, description: 'Key setter for the regional team.' },
      { year: '2021-2023', team: 'Tema Senior High School (Volleyball Team)', logo: athlete2SchoolLogo, description: 'Led school to inter-school championships.' },
      { year: '2019-2021', team: 'Tema Youth Volleyball Program', logo: null, description: 'Developed core setting and defensive skills.' },
    ],
    keyAttributes: [
      { name: 'Setting Accuracy', rating: 5, description: 'Precise ball placement for hitters.' },
      { name: 'Game IQ', rating: 4.5, description: 'Reads opponent defense and orchestrates offense.' },
      { name: 'Leadership', rating: 4, description: 'Commands the court and directs play.' },
      { name: 'Blocking', rating: 3.5, description: 'Effective at the net to deny attacks.' },
    ],
    sponsors: [
      { name: 'Mizuno', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=MIZUNO' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-06-28', time: '17:00', title: 'Regional Volleyball League Match', location: 'Tema Sports Complex', description: 'Vs. Accra Spikers' },
      { date: '2025-07-07', time: '10:00', title: 'National Club Championship Warm-up', location: 'University of Ghana, Legon', description: 'Friendly match with Legon Aces.' },
    ],
  },

  // --- SWIMMING ATHLETE ---
  {
    id: 'adwoa_mensah',
    firstName: 'Adwoa',
    lastName: 'Mensah',
    fullName: 'Adwoa Mensah',
    sportType: 'swimming',
    athleteFullImage: athlete1FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: null,
    position: 'Freestyle',
    jerseyNumber: null,
    height: '5\'8"',
    weight: '135 lbs',
    bornDate: 'April 20, 2007',
    fromLocation: 'Accra, Greater Accra',
    sportsDebut: '2020',
    previousLocation: 'National Swimming Gala',
    postseasonStats: {
      events: '50m, 100m Free', pb50m: '28.5s', pb100m: '1:02.0s',
      medals: '2 Silver', rank: '3rd National', strokes: 'Freestyle', starts: 'Good', turns: 'Fast'
    },
    careerStats: {
      events: '50m, 100m, 200m Free', pb50m: '27.8s', pb100m: '1:00.5s',
      medals: '5 Gold', rank: 'National Champion', strokes: 'Freestyle', starts: 'Excellent', turns: 'Very Fast'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/adwoa_swims',
      instagram: 'https://instagram.com/adwoa.splash',
      linkedin: 'https://linkedin.com/in/adwoamensah-swimming',
      whatsapp: '233267778899',
      youtube: 'https://youtube.com/channel/adwoa_swim_vids',
      email: 'adwoa.mensah.swim@example.com',
      phone: '+233 26 777 8899'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Swimming Team (Youth)', logo: ghanaSwimmingLogo, description: 'National champion in freestyle events.' },
      { year: '2020-2023', team: 'Accra Sharks Swim Club', logo: null, description: 'Consistently ranked top in national galas.' },
      { year: '2018-2020', team: 'Local Swim School', logo: null, description: 'Began competitive swimming training.' },
    ],
    keyAttributes: [
      { name: 'Endurance', rating: 4.5, description: 'Strong stamina for longer freestyle events.' },
      { name: 'Start & Turns', rating: 4, description: 'Efficient dives and quick flip turns.' },
      { name: 'Stroke Technique', rating: 4, description: 'Fluid and powerful freestyle stroke.' },
      { name: 'Race Pace', rating: 3.5, description: 'Ability to maintain target pace throughout the race.' },
    ],
    sponsors: [
      { name: 'Speedo', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=SPEEDO' },
      { name: 'Arena', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=ARENA' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-05', time: '11:00', title: 'National Swimming Gala - Finals', location: 'Bukom Boxing Arena Swimming Pool, Accra', description: '50m and 100m Freestyle events.' },
      { date: '2025-07-20', time: '08:00', title: 'Ghana Olympic Committee Trials', location: 'The Trust Sports Emporium, Accra', description: 'Selection trials for upcoming international meets.' },
    ],
  },

  // --- HANDBALL ATHLETE ---
  {
    id: 'kofi_asare',
    firstName: 'Kofi',
    lastName: 'Asare',
    fullName: 'Kofi Asare',
    sportType: 'handball',
    athleteFullImage: athlete2FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: athlete1TeamLogo,
    position: 'Left Back',
    jerseyNumber: '11',
    height: '6\'1"',
    weight: '180 lbs',
    bornDate: 'July 1, 2006',
    fromLocation: 'Accra, Greater Accra',
    sportsDebut: '2021',
    previousLocation: 'Handball League',
    postseasonStats: {
      games: '12', goals: '40', assists: '20', steals: '15',
      blocks: '8', shots: '60', penalties: '5', discipline: 'Low'
    },
    careerStats: {
      games: '50', goals: '150', assists: '70', steals: '50',
      blocks: '25', shots: '250', penalties: '15', discipline: 'Good'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: true,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/kofi_handball',
      instagram: 'https://instagram.com/kofi.scorer',
      linkedin: 'https://linkedin.com/in/kofiasare-handball',
      whatsapp: '233501122334',
      email: 'kofi.asare.handball@example.com',
      phone: '+233 50 112 2334'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Handball Team (Youth)', logo: ghanaHandballLogo, description: 'Representing Ghana in international youth tournaments.' },
      { year: '2021-2023', team: 'Accra Handball Club', logo: athlete1TeamLogo, description: 'Top scorer in the national league.' },
      { year: '2019-2021', team: 'Accra High School (Handball Team)', logo: athlete2SchoolLogo, description: 'Led school team to regional championships.' },
    ],
    keyAttributes: [
      { name: 'Shooting Power', rating: 5, description: 'Strong and accurate shots from various positions.' },
      { name: 'Agility', rating: 4.5, description: 'Quick movements for dodging defenders and creating space.' },
      { name: 'Defensive Pressure', rating: 4, description: 'Effective in disrupting opponent attacks and stealing balls.' },
      { name: 'Playmaking', rating: 3.5, description: 'Good vision for assists and setting up teammates.' },
    ],
    sponsors: [
      { name: 'Hummel', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=HUMMEL' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-08', time: '19:00', title: 'National Handball League Match', location: 'Bukom Boxing Arena, Accra', description: 'Vs. Kumasi Kicks' },
      { date: '2025-07-15', time: '15:00', title: 'International Friendly Tournament', location: 'Lagos, Nigeria', description: 'Ghana vs. Nigeria Youth Team' },
    ],
  },

  // --- TENNIS ATHLETE ---
  {
    id: 'eya_baiden',
    firstName: 'Eya',
    lastName: 'Baiden',
    fullName: 'Eya Baiden',
    sportType: 'tennis',
    athleteFullImage: athlete3FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: null,
    position: 'Singles Player',
    jerseyNumber: null,
    height: '5\'5"',
    weight: '125 lbs',
    bornDate: 'February 18, 2008',
    fromLocation: 'Tema, Greater Accra',
    sportsDebut: '2022',
    previousLocation: 'National Junior Circuit',
    postseasonStats: {
      matches: '10', wins: '8', losses: '2', tournaments: '3',
      aces: '30', forehand: 'Strong', backhand: 'Consistent', serveWin: '75%'
    },
    careerStats: {
      matches: '40', wins: '30', losses: '10', tournaments: '10',
      aces: '100', forehand: 'Elite', backhand: 'Strong', serveWin: '70%'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/eya_tennis',
      twitter: 'https://twitter.com/eya_ace',
      instagram: 'https://instagram.com/eya.court',
      linkedin: 'https://linkedin.com/in/eyabaiden-tennis',
      whatsapp: '233275556677',
      youtube: 'https://youtube.com/channel/adwoa_swim_vids',
      email: 'eya.baiden.tennis@example.com',
      phone: '+233 27 555 6677'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Junior Tennis Team', logo: ghanaTennisLogo, description: 'Competing on the international junior circuit.' },
      { year: '2022-2023', team: 'Tema Tennis Club', logo: null, description: 'Won multiple regional junior tournaments.' },
      { year: '2019-2022', team: 'Local Tennis Academy', logo: null, description: 'Received intensive coaching and developed strong fundamentals.' },
    ],
    keyAttributes: [
      { name: 'Forehand', rating: 5, description: 'Powerful and accurate, a primary weapon.' },
      { name: 'Serve Consistency', rating: 4, description: 'High percentage of first serves in.' },
      { name: 'Court Coverage', rating: 4.5, description: 'Excellent agility and speed to cover the court.' },
      { name: 'Mental Toughness', rating: 3.5, description: 'Composed under pressure in crucial points.' },
    ],
    sponsors: [
      { name: 'Wilson', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=WILSON' },
      { name: 'Head', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=HEAD' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-01', time: '09:00', title: 'National Junior Tennis Championship', location: 'Accra Sports Stadium Tennis Courts', description: 'Singles and Doubles Matches' },
      { date: '2025-07-15', time: '10:00', title: 'ITF Junior Circuit - Accra Open', location: 'Accra Lawn Tennis Club', description: 'International junior tournament.' },
    ],
  },

  // --- TABLE TENNIS ATHLETE ---
  {
    id: 'nana_opoku',
    firstName: 'Nana',
    lastName: 'Opoku',
    fullName: 'Nana Opoku',
    sportType: 'table_tennis',
    athleteFullImage: athlete4FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: null,
    position: 'All-Round Player',
    jerseyNumber: null,
    height: '5\'6"',
    weight: '130 lbs',
    bornDate: 'September 1, 2007',
    fromLocation: 'Kumasi, Ashanti',
    sportsDebut: '2021',
    previousLocation: 'Regional Table Tennis',
    postseasonStats: {
      matches: '15', wins: '12', losses: '3', tournaments: '4',
      serves: 'Fast', smashes: 'Accurate', spins: 'High', defVolley: 'Good'
    },
    careerStats: {
      matches: '60', wins: '48', losses: '12', tournaments: '15',
      serves: 'Elite', smashes: 'Powerful', spins: 'Diverse', defVolley: 'Excellent'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/nana_tt',
      instagram: 'https://instagram.com/nana.pong',
      linkedin: 'https://linkedin.com/in/nanaopoku-tabletennis',
      whatsapp: '233598889900',
      youtube: 'https://youtube.com/channel/aku_tkd_demos',
      email: 'nana.opoku.tt@example.com',
      phone: '+233 59 888 9900'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Table Tennis Team (Youth)', logo: ghanaTableTennisLogo, description: 'Ranked top junior player nationally.' },
      { year: '2021-2023', team: 'Kumasi Table Tennis Club', logo: null, description: 'Won multiple regional and inter-club competitions.' },
      { year: '2019-2021', team: 'Kumasi Youth Sports Center', logo: null, description: 'Began competitive training and developed unique playing style.' },
    ],
    keyAttributes: [
      { name: 'Spin Control', rating: 5, description: 'Mastery of various spins to deceive opponents.' },
      { name: 'Forehand Loop', rating: 4.5, description: 'Powerful and consistent attacking shot.' },
      { name: 'Footwork', rating: 4, description: 'Quick and agile movement around the table.' },
      { name: 'Serve Variety', rating: 4, description: 'Diverse serves to gain an advantage.' },
    ],
    sponsors: [
      { name: 'Butterfly', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=BUTTERFLY' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-06-27', time: '14:00', title: 'Ashanti Regional Table Tennis Cup', location: 'Kumasi Sports Complex', description: 'Singles and Team Events' },
      { date: '2025-07-05', time: '10:00', title: 'National Championship Preparatory Camp', location: 'Ghana Table Tennis Federation Hall, Accra', description: 'Intensive training for national finals.' },
    ],
  },

  // --- RUGBY ATHLETE ---
  {
    id: 'kojo_manu',
    firstName: 'Kojo',
    lastName: 'Manu',
    fullName: 'Kojo Manu',
    sportType: 'rugby',
    athleteFullImage: athlete2FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: athlete2TeamLogo,
    position: 'Flanker',
    jerseyNumber: '7',
    height: '6\'0"',
    weight: '200 lbs',
    bornDate: 'December 25, 2005',
    fromLocation: 'Sekondi-Takoradi, Western',
    sportsDebut: '2020',
    previousLocation: 'Ghana Rugby League',
    postseasonStats: {
      matches: '8', tries: '3', tackles: '40', carries: '50',
      metersRun: '250', turnovers: '5', lineouts: 'Good', scrum: 'Strong'
    },
    careerStats: {
      matches: '30', tries: '10', tackles: '150', carries: '200',
      metersRun: '1000', turnovers: '15', lineouts: 'Excellent', scrum: 'Very Strong'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: true,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/kojo_rugby',
      twitter: 'https://twitter.com/kojo_tackles',
      instagram: 'https://instagram.com/kojo.scrums',
      linkedin: 'https://linkedin.com/in/kojomanu-rugby',
      whatsapp: '233241212323',
      email: 'kojo.manu.rugby@example.com',
      phone: '+233 24 121 2323'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Rugby Team (Youth)', logo: ghanaRugbyLogo, description: 'Key forward in the national youth squad.' },
      { year: '2021-2023', team: 'Western Region Rugby Club', logo: athlete2TeamLogo, description: 'Helped team win regional league title.' },
      { year: '2019-2021', team: 'Sekondi-Takoradi High School (Rugby Team)', logo: athlete1SchoolLogo, description: 'Developed strong tackling and rucking skills.' },
    ],
    keyAttributes: [
      { name: 'Tackling', rating: 5, description: 'Consistent and dominant in defensive tackles.' },
      { name: 'Breakdown Work', rating: 4.5, description: 'Effective at securing and turning over ball at rucks and mauls.' },
      { name: 'Ball Carrying', rating: 4, description: 'Strong runner with ball in hand, gaining meters.' },
      { name: 'Fitness & Stamina', rating: 4, description: 'High work rate throughout the entire match.' },
    ],
    sponsors: [
      { name: 'Canterbury', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=CANTERBURY' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-01', time: '15:00', title: 'Ghana Rugby Sevens Championship', location: 'Accra Sports Stadium Rugby Pitch', description: 'National club championship.' },
      { date: '2025-07-10', time: '11:00', title: 'Western Region Club Match', location: 'Takoradi Sports Stadium', description: 'Vs. Cape Coast Crusaders' },
    ],
  },

  // --- BADMINTON ATHLETE ---
  {
    id: 'abena_darko',
    firstName: 'Abena',
    lastName: 'Darko',
    fullName: 'Abena Darko',
    sportType: 'badminton',
    athleteFullImage: athlete1FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: null,
    position: 'Singles Player',
    jerseyNumber: null,
    height: '5\'3"',
    weight: '115 lbs',
    bornDate: 'July 7, 2008',
    fromLocation: 'Ho, Volta',
    sportsDebut: '2022',
    previousLocation: 'Regional Badminton Cup',
    postseasonStats: {
      matches: '12', wins: '9', losses: '3', tournaments: '3',
      smashes: 'Powerful', drops: 'Precise', netPlay: 'Excellent', defense: 'Solid'
    },
    careerStats: {
      matches: '50', wins: '38', losses: '12', tournaments: '10',
      smashes: 'Elite', drops: 'Elite', netPlay: 'Exceptional', defense: 'Impenetrable'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/abena_baddy',
      instagram: 'https://instagram.com/abena.shuttle',
      linkedin: 'https://linkedin.com/in/abenadarko-badminton',
      whatsapp: '233554443322',
      email: 'abena.darko.badminton@example.com',
      phone: '+233 55 444 3322'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Junior Badminton Team', logo: ghanaBadmintonLogo, description: 'Representing Ghana in West African junior championships.' },
      { year: '2022-2023', team: 'Volta Regional Badminton Club', logo: null, description: 'Won regional singles titles.' },
      { year: '2020-2022', team: 'Ho Sports Complex Badminton Program', logo: null, description: 'Focused on advanced techniques and footwork.' },
    ],
    keyAttributes: [
      { name: 'Net Play', rating: 5, description: 'Exceptional touch and control at the net.' },
      { name: 'Drop Shots', rating: 4.5, description: 'Deceptive and precise drop shots.' },
      { name: 'Agility & Speed', rating: 4.5, description: 'Quick movement around the court.' },
      { name: 'Smash Power', rating: 3.5, description: 'Strong attacking overhead smashes.' },
    ],
    sponsors: [
      { name: 'Yonex', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=YONEX' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-03', time: '13:00', title: 'National Junior Badminton Championship', location: 'Ghana National Sports College, Winneba', description: 'Singles and Mixed Doubles.' },
      { date: '2025-07-25', time: '09:00', title: 'West African Badminton Games', location: 'Abidjan, Ivory Coast', description: 'Representing Ghana.' },
    ],
  },

  // --- HOCKEY (FIELD HOCKEY) ATHLETE ---
  {
    id: 'oscar_sarpong',
    firstName: 'Oscar',
    lastName: 'Sarpong',
    fullName: 'Oscar Sarpong',
    sportType: 'field_hockey',
    athleteFullImage: athlete3FullImage,
    schoolLogo: athlete1SchoolLogo,
    teamLogo: athlete1TeamLogo,
    position: 'Midfielder',
    jerseyNumber: '6',
    height: '5\'9"',
    weight: '160 lbs',
    bornDate: 'June 1, 2006',
    fromLocation: 'Kumasi, Ashanti',
    sportsDebut: '2021',
    previousLocation: 'National Hockey League',
    postseasonStats: {
      games: '10', goals: '5', assists: '7', tackles: '20',
      passes: '80', interceptions: '15', penaltyCorners: '3', fieldCoverage: 'High'
    },
    careerStats: {
      games: '40', goals: '20', assists: '25', tackles: '70',
      passes: '300', interceptions: '50', penaltyCorners: '10', fieldCoverage: 'Excellent'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: true,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/oscar_hockey',
      instagram: 'https://instagram.com/oscar.fhockey',
      linkedin: 'https://linkedin.com/in/oscarsarpong-fieldhockey',
      whatsapp: '233209988776',
      email: 'oscar.sarpong.hockey@example.com',
      phone: '+233 20 998 8776'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Field Hockey Team (Youth)', logo: ghanaHockeyLogo, description: 'Integral part of the national youth squad.' },
      { year: '2021-2023', team: 'Kumasi Hockey Club', logo: athlete1TeamLogo, description: 'Helped team achieve top rankings in the national league.' },
      { year: '2019-2021', team: 'Kumasi High School (Hockey Team)', logo: athlete1SchoolLogo, description: 'Developed strong stick skills and midfield control.' },
    ],
    keyAttributes: [
      { name: 'Stick Handling', rating: 4.5, description: 'Excellent control of the ball under pressure.' },
      { name: 'Passing Accuracy', rating: 4, description: 'Delivers precise passes to teammates.' },
      { name: 'Field Vision', rating: 4, description: 'Ability to read the game and identify opportunities.' },
      { name: 'Defensive Tackling', rating: 3.5, description: 'Effective in dispossessing opponents.' },
    ],
    sponsors: [
      { name: 'Grays', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=GRAYS' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-06-29', time: '16:00', title: 'National Hockey League - Playoff Match', location: 'Theodosia Okoh Hockey Stadium, Accra', description: 'Vs. Tema Tigers' },
      { date: '2025-07-07', time: '10:00', title: 'Youth International Hockey Camp', location: 'Pretoria, South Africa', description: 'Training with international coaches.' },
    ],
  },

  // --- TAEKWONDO / MARTIAL ARTS ATHLETE ---
  {
    id: 'aku_addo',
    firstName: 'Aku',
    lastName: 'Addo',
    fullName: 'Aku Addo',
    sportType: 'taekwondo',
    athleteFullImage: athlete4FullImage,
    schoolLogo: athlete2SchoolLogo,
    teamLogo: null,
    position: 'Sparring',
    jerseyNumber: null,
    height: '5\'6"',
    weight: '145 lbs',
    bornDate: 'October 12, 2005',
    fromLocation: 'Sunyani, Bono',
    sportsDebut: '2019',
    previousLocation: 'National Taekwondo Championship',
    postseasonStats: {
      matches: '10', wins: '8', losses: '2', medals: '2 Gold',
      belts: 'Black Belt 1st Dan', kicks: 'Spinning', punches: 'Accurate', defense: 'Strong'
    },
    careerStats: {
      matches: '40', wins: '35', losses: '5', medals: '10 Gold',
      belts: 'Black Belt 2nd Dan', kicks: 'Diverse', punches: 'Powerful', defense: 'Impenetrable'
    },
    media: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true, twitter: true, instagram: true, linkedin: true, tiktok: true, whatsapp: true, youtube: true,
      }
    },
    icons: {
      facebook: 'https://facebook.com/aku_tkd',
      instagram: 'https://instagram.com/aku.martialarts',
      linkedin: 'https://linkedin.com/in/akuaddo-taekwondo',
      whatsapp: '233591110000',
      youtube: 'https://youtube.com/channel/aku_tkd_demos',
      email: 'aku.addo.tkd@example.com',
      phone: '+233 59 111 0000'
    },
    careerHistory: [
      { year: '2023-Present', team: 'Ghana National Taekwondo Team (Youth)', logo: ghanaTaekwondoLogo, description: 'Achieved Black Belt 2nd Dan and competed internationally.' },
      { year: '2021-2023', team: 'Sunyani Taekwondo Academy', logo: null, description: 'Won multiple national championships and advanced through belt ranks.' },
      { year: '2019-2021', team: 'Local Taekwondo Club', logo: null, description: 'Began training, focusing on discipline and basic techniques.' },
    ],
    keyAttributes: [
      { name: 'Kicking Power', rating: 5, description: 'Devastating power in various kicks.' },
      { name: 'Agility & Balance', rating: 4.5, description: 'Quick footwork and stable balance during techniques.' },
      { name: 'Sparring Strategy', rating: 4, description: 'Intelligent approach to offensive and defensive sparring.' },
      { name: 'Flexibility', rating: 3.5, description: 'High range of motion for diverse kicking techniques.' },
    ],
    sponsors: [
      { name: 'Daedo', logoUrl: 'https://via.placeholder.com/150x80/0D214F/FFFFFF?text=DAEDO' },
    ],
    // --- ADDED NEW FIELD: upcomingEvents ---
    upcomingEvents: [
      { date: '2025-07-01', time: '09:00', title: 'National Taekwondo Championship', location: 'Accra Sports Stadium Multi-Purpose Hall', description: 'Sparring and Poomsae divisions.' },
      { date: '2025-08-01', time: '14:00', title: 'African Youth Taekwondo Open', location: 'Casablanca, Morocco', description: 'International competition for youth.' },
    ],
  },
];


export const getAthleteProfile = (id) => {
  return allAthleteProfilesData.find(athlete => athlete.id === id);
};