// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState('/images/default-avatar.webp');
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();

  // Helper function to redirect based on user type
  // Added userId parameter to allow for specific profile/calendar paths
  const redirectToUserDashboard = (type, userId = null) => {
    const currentPath = window.location.pathname;
    let targetPath;

    switch (type) {
      case 'athlete':
        // If it's an athlete, redirect to their specific profile page by default
        targetPath = userId ? `/my-profile/${userId}` : '/my-profile';
        break;
      case 'coach':
        targetPath = '/coach-dashboard';
        break;
      case 'scout':
        targetPath = '/scout-dashboard';
        break;
      case 'fan':
      case 'parent':
        targetPath = '/fan-dashboard';
        break;
      default:
        targetPath = '/dashboard';
        break;
    }

    // Define paths that should NOT trigger a redirect if the user is already on them,
    // or if they are specific user-centric pages (like their own profile/calendar).
    const isExcludedPath =
      currentPath.includes('/login') ||
      currentPath.includes('/signup') ||
      currentPath.includes('/forgot-password') ||
      currentPath.includes('/reset-password') ||
      (type === 'athlete' && userId && (
        currentPath === `/my-profile/${userId}` ||   // If already on THIS athlete's profile
        currentPath.startsWith(`/my-calendar/${userId}`) // If already on THIS athlete's calendar
      ));

    // Only redirect if current path is not an excluded path AND it's not the target path
    if (!isExcludedPath && currentPath !== targetPath) {
      navigate(targetPath);
    }
  };

  // Simulate checking for a logged-in user on app load (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('gamepulse_current_user');
    const token = localStorage.getItem('gamepulse_auth_token');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
        setUserType(parsedUser.userType);
        setUserAvatarUrl(parsedUser.avatarUrl || parsedUser.profilePictureUrl || '/images/sample-athlete-avatar.webp');

        // Pass the user ID when calling redirectToUserDashboard from useEffect
        redirectToUserDashboard(parsedUser.userType, parsedUser.id);

      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem('gamepulse_current_user');
        localStorage.removeItem('gamepulse_auth_token');
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserType(null);
        setUserAvatarUrl('/images/default-avatar.webp');
      }
    }
  }, []);

  const login = async (emailOrUsername, password, rememberMe) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      let simulatedUser = null;
      let token = 'dummy-jwt-token-123';

      if (emailOrUsername === 'athlete@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'ama_owusu', fullName: 'Ama Owusu', email: 'athlete@example.com', userType: 'athlete', // Use 'ama_owusu' ID
          avatarUrl: '/images/sample-athlete-avatar.webp', sport: 'Football', school: 'Accra High Spartans',
          stats: { goals: 15, assists: 10 }, highlights: [{ id: 1, title: 'Epic Goal vs Kumasi' }],
          upcomingEvents: [{ id: 1, title: 'Match Day', date: '2025-06-25' }], bio: 'Young and talented striker with a powerful shot.',
        };
      } else if (emailOrUsername === 'coach@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'coach1', fullName: 'Coach Mensah', email: 'coach@example.com', userType: 'coach',
          avatarUrl: '/images/coach-avatar.webp', teamName: 'Accra High Spartans',
          roster: [{ id: 'ath2', name: 'Amaani Okoro' }], matchReports: [],
          teams: [{ id: 1, name: 'U17 Spartans' }], notifications: [{ id: 1, message: 'New athlete joined your team' }],
        };
      } else if (emailOrUsername === 'immanueleshun9@gmail.com' && password === '1234567890') {
        simulatedUser = {
          id: 'coach_ie', fullName: 'Immanuel Eshun', email: 'immanueleshun9@gmail.com', userType: 'coach',
          avatarUrl: '/images/coach-avatar.webp', teamName: 'Accra Youth United',
          roster: [], matchReports: [], teams: [{ id: 2, name: 'U15 Accra Youth' }], notifications: [],
        };
      } else if (emailOrUsername === 'scout@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'scout1', fullName: 'Global Scout Network', email: 'scout@example.com', userType: 'scout',
          avatarUrl: '/images/scout-avatar.webp', regionsOfInterest: ['Greater Accra', 'Ashanti'],
          trackedAthletes: [{ id: 'ath3', name: 'Amaani Okoro' }], newHighlights: [{ id: 1, title: 'Striker Showcase' }],
        };
      } else if (emailOrUsername === 'fan@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'fan1', fullName: 'Mr. & Mrs. Asante', email: 'fan@example.com', userType: 'fan',
          avatarUrl: '/images/fan-avatar.webp', followedAthletes: ['Amaani Okoro', 'Kofi Adom'],
          upcomingMatches: [{ id: 1, team: 'My Daughter\'s Team', opponent: 'Rival Academy', date: 'July 5, 2025', time: '2:00 PM', location: 'Local Pitch' }],
          latestHighlights: [{ id: 1, title: 'Amazing Goal by Amaani Okoro' }],
        };
      } else {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem('gamepulse_auth_token', token);
      localStorage.setItem('gamepulse_current_user', JSON.stringify(simulatedUser));

      setIsLoggedIn(true);
      setCurrentUser(simulatedUser);
      setUserType(simulatedUser.userType);
      setUserAvatarUrl(simulatedUser.avatarUrl || simulatedUser.profilePictureUrl || '/images/sample-athlete-avatar.webp');

      console.log("User logged in successfully!");
      // Pass the user ID when calling redirectToUserDashboard after login
      redirectToUserDashboard(simulatedUser.userType, simulatedUser.id);
      return simulatedUser;
    } catch (error) {
      console.error("Login failed in AuthContext:", error);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setUserType(null);
      setUserAvatarUrl('/images/default-avatar.webp');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('gamepulse_auth_token');
    localStorage.removeItem('gamepulse_current_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserType(null);
    setUserAvatarUrl('/images/default-avatar.webp');
    console.log("User logged out!");
    navigate('/login');
  };

  // --- NEW/RE-ADDED: Password Reset Functions ---

  const sendPasswordResetEmail = async (email) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call delay

      console.log(`Simulating sending password reset email to: ${email}`);

      if (email.includes('@example.com') || email === 'immanueleshun9@gmail.com') {
        console.log(`Password reset link sent to ${email}. Check console for mock token.`);
        return { success: true, message: 'If an account with that email exists, a password reset link has been sent.', mockToken: 'MOCK_RESET_TOKEN_FOR_EMAIL_123' };
      } else {
        throw new Error('Email not found. Please try again.');
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  const resetUserPassword = async (token, newPassword) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call delay

      console.log(`Simulating password reset for token: ${token} with new password: ${newPassword}`);

      if (token === 'MOCK_RESET_TOKEN_FOR_EMAIL_123' && newPassword.length >= 8) { // Basic validation
        console.log("Password reset successful!");
        return { success: true, message: 'Your password has been reset successfully. You can now log in.' };
      } else {
        throw new Error('Invalid or expired token, or password does not meet requirements.');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, userAvatarUrl, userType, login, logout, sendPasswordResetEmail, resetUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};