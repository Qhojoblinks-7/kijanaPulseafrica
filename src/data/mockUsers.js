// src/data/mockAuthUsers.js

// !!! WARNING: Storing plain-text passwords like this is a severe security risk !!!
// !!! This mock data is ONLY for client-side, frontend simulation/prototyping. !!!
// !!! In a real application, passwords MUST be securely hashed and handled by a backend.

let mockUsers = [ // Using 'let' so new users can be added during signup simulation
    {
        id: 'user-ama', // Unique ID for AuthContext
        email: 'ama@example.com',
        password: 'passWord@123', // In a real app, never store/return plain passwords!
        fullName: 'Ama Asare',
        userType: 'athlete',
        slug: 'ama-owusu', // This slug must match the 'id' in allAthleteProfilesData if it's an athlete profile
        // Basic profile data for non-athlete types, or for a new athlete before detailed profile is created
        profilePictureUrl: '/images/default-avatar.webp', // Default avatar
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
        position: 'Guard', // Example default for an athlete
        team: 'GamePulse Juniors', // Example default for an athlete
        sportType: 'basketball', // Example default for an athlete
        xpRank: 'Beginner',
    },
    {
        id: 'user-coach',
        email: 'coach@example.com',
        password: 'coachPassword',
        fullName: 'Coach Mensah',
        userType: 'coach',
        slug: 'coach-mensah-coach456', // Coaches might have a 'coach profile' but not an 'athlete profile'
        profilePictureUrl: '/images/default-coach-avatar.webp',
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
        profilePictureUrl: '/images/default-scout-avatar.webp',
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
        profilePictureUrl: '/images/default-fan-avatar.webp',
        location: 'Tema, Greater Accra',
        bio: ['Biggest fan of Ghanaian sports!'],
        motto: 'GamePulse forever!',
        contactSettings: { inAppMessagingEnabled: true, emailEnabled: true },
        xpRank: 'Casual',
    },
    // Add more mock users here as needed for testing login/signup
];

export { mockUsers };