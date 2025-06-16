// src/data/athleteData.js (or adjust your myProfileData.js)

export const dummyAthleteData = {
  id: 'amaani-okoro-123',
  firstName: 'Amaani', // New field
  lastName: 'Okoro',   // New field
  fullName: 'Amaani Okoro', // Keep for other components if needed
  primarySport: 'Football',
  position: 'Striker',
  schoolAffiliation: 'Accra High School Spartans',
  location: 'Accra, Ghana',
  aspirationalQuote: 'Aspiring Olympian | Dedicated Team Player | Dreamer of the World Cup stage.',

  // New fields for the updated ProfileHeader
  height: '5 ft 10 in', // Example height
  weight: '160 lbs',    // Example weight
  bornDate: '01/15/2007', // Example born date
  fromLocation: 'Accra, Ghana', // Example 'from' location
  sportsDebut: '2022', // Example sports debut year
  previousLocation: 'Youth Academy FC', // Example previous club/location

  // Placeholder images and details for the new layout
  athleteFullImage: 'https://via.placeholder.com/600x800/A0A0A0/FFFFFF?text=Amaani+Okoro+Full', // Large image for div2
  schoolLogo: 'https://via.placeholder.com/50x50?text=School+Logo', // Placeholder for school logo
  teamLogo: 'https://via.placeholder.com/50x50?text=Team+Logo',     // Placeholder for team logo
  jerseyNumber: '#10', // Example jersey number


  // Stats for Div3, mimicking the Stephen Curry layout
  postseasonStats: {
    mp: '37',
    fg: '45.1%',
    '3p': '39.5%',
    ft: '95.7%',
    ppg: '25.5',
    rpg: '6.1',
    apg: '5.4',
    bpg: '0.7',
  },
  careerStats: {
    mp: '34.4',
    fg: '47.7%',
    '3p': '43.6%',
    ft: '90.3%',
    ppg: '23.1',
    rpg: '4.4',
    apg: '6.8',
    bpg: '0.2',
  },

  // --- Keep existing data for other components ---
  profilePhoto: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=AO', // Smaller headshot, might not be used here now
  bannerPhoto: 'https://via.placeholder.com/800x200/2C3E50/FFFFFF?text=Amaani+Banner', // Might not be used now

  xpRank: '#12 Region (U17)',
  followers: '234',
  goals: '15',

  detailedStats: {
    football: [
      { id: 'g1', name: 'Goals', value: 15, icon: 'FaFutbol' },
      // ... rest of detailed stats
    ],
  },
  stats: {
    "2023-2024 Season": {
      goals: 15,
      // ... rest of season stats
    },
  },
  videoHighlights: [],
  gameLog: [],
  academicProfile: {},
  testimonials: [],
  socialMedia: {},
  sports: ['Football'],
  progressData: {},
  icons: {},
};


// Keep other dummy exports as they were
export const dummySimilarAthletes = [
  // ... similar athlete objects
];

export const dummySchoolAthletes = [
  // ... school athlete objects
];