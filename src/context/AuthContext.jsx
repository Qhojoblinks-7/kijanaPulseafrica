// src/context/AuthContext.js (Conceptual update)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { allAthleteProfilesData } from '../data/allAthleteProfilesData'; // Import your data

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'athlete', 'scout', 'admin', etc.

  // Simulate a login process
  const login = (userId, type) => {
    // In a real app, you'd verify credentials and fetch user data from a backend
    const foundUser = allAthleteProfilesData.find(athlete => athlete.id === userId);

    if (foundUser && type === 'athlete') {
      setCurrentUser({
        id: foundUser.id,
        fullName: foundUser.fullName,
        profilePictureUrl: foundUser.athleteFullImage, // Map to the new field
        avatarUrl: foundUser.athleteFullImage, // Map to the new field
        position: foundUser.position,
        team: foundUser.careerHistory?.[0]?.team || 'N/A', // Get current team from career history
        location: foundUser.fromLocation,
        xpRank: 'Elite', // Example static rank, or derive from data
        bio: foundUser.bio?.[0] || foundUser.bio, // Use first line of bio or whole bio
        motto: foundUser.bio?.[1] || '', // Use second line as motto if available
        stats: foundUser.postseasonStats, // Use postseason stats for 'My Game'
        achievements: foundUser.achievements,
        highlights: foundUser.media.filter(m => m.type === 'video').map(v => ({
          id: v.url, // Use URL as ID for simplicity
          title: v.title,
          thumbnailUrl: v.thumbnail,
          views: Math.floor(Math.random() * 10000) // Simulate views
        })),
        story: foundUser.bio?.[0], // Re-use bio for story
        skills: foundUser.keyAttributes.map(attr => attr.name), // Map key attributes to skills
        digitalClassroomProgress: [ // Example static progress, or derive from data
          { name: 'Mental Toughness', progress: 75 },
          { name: 'Nutrition for Athletes', progress: 50 },
        ],
        network: { // Example static network, or derive from data
          followers: 1200,
          connections: 350,
          following: 80,
        },
        contactPreferences: {
          inAppMessaging: foundUser.contactSettings?.inAppMessagingEnabled || false,
          showEmailToScouts: foundUser.contactSettings?.emailEnabled || false,
        },
        socialMedia: {
          instagram: foundUser.icons?.instagram?.split('/').pop(), // Extract username from URL
          tiktok: foundUser.icons?.tiktok?.split('/').pop(),
          // Add other social media if needed and parse their usernames
        },
        upcomingEvents: foundUser.upcomingEvents,
        // ... any other fields MyProfilePage expects
      });
      setIsLoggedIn(true);
      setUserType(type);
      console.log(`Logged in as ${foundUser.fullName} (${type})`);
    } else {
      console.error('Login failed: User not found or invalid user type.');
      setCurrentUser(null);
      setIsLoggedIn(false);
      setUserType(null);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserType(null);
    console.log('Logged out.');
  };

  // Example: Auto-login 'ama_owusu' for demonstration
  useEffect(() => {
    if (!currentUser && !isLoggedIn) {
      login('ama_owusu', 'athlete'); // Auto-login Ama Owusu as an athlete
    }
  }, [currentUser, isLoggedIn]); // Run once on component mount

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);