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
    highlights: [
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
    // ADDED CONTACT SETTINGS
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: false, // Example: Ama prefers not to share phone directly
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
    }
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
    highlights: [
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
    // ADDED CONTACT SETTINGS
    contactSettings: {
      inAppMessagingEnabled: true,
      emailEnabled: true,
      phoneEnabled: true, // Example: Kwame allows phone calls
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
    }
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
    highlights: [
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
    // ADDED CONTACT SETTINGS
    contactSettings: {
      inAppMessagingEnabled: false, // Example: Akua prefers email only
      emailEnabled: true,
      phoneEnabled: false,
      socialMediaVisibility: {
        facebook: true,
        twitter: true,
        instagram: true,
        linkedin: true,
        tiktok: true,
        whatsapp: false, // Example: Not on WhatsApp for public contact
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS (with default/example values)
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
      email: 'eya.baiden.tennis@example.com',
      phone: '+233 27 555 6677'
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
      email: 'nana.opoku.tt@example.com',
      phone: '+233 59 888 9900'
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
        education: [],
    // ADDED CONTACT SETTINGS
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
    }
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
    highlights: [],
    bio: [],
    interests: [],
    achievements: [],
    education: [],
    // ADDED CONTACT SETTINGS
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
    }
  },
];