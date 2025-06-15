// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState('/images/default-avatar.webp'); // Default avatar
  // Add userType state to be explicitly managed and exposed
  const [userType, setUserType] = useState(null); // Initialize userType state

  const navigate = useNavigate();

  // Simulate checking for a logged-in user on app load (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('gamepulse_current_user');
    const token = localStorage.getItem('gamepulse_auth_token');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
        // Set userType from parsed user data
        setUserType(parsedUser.userType);
        // Set avatar from parsed user data, or fallback to a default/sample
        setUserAvatarUrl(parsedUser.avatarUrl || parsedUser.profilePictureUrl || '/images/sample-athlete-avatar.webp');

        // Optional: Redirect user to their specific dashboard on app load
        // This is useful if they refresh the page while logged in.
        // You might refine this to only happen if they are on a generic page like '/'
        redirectToUserDashboard(parsedUser.userType);

      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        // Clear invalid stored data to prevent issues
        localStorage.removeItem('gamepulse_current_user');
        localStorage.removeItem('gamepulse_auth_token');
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserType(null); // Reset userType on error
        setUserAvatarUrl('/images/default-avatar.webp');
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  // Helper function to redirect based on user type
  const redirectToUserDashboard = (type) => { // Renamed parameter to 'type' to avoid confusion with state 'userType'
    // Only navigate if the current path isn't already the target dashboard
    const currentPath = window.location.pathname;
    let targetPath;

    switch (type) { // Use the 'type' parameter
      case 'athlete':
        targetPath = '/athlete-dashboard';
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

    // Only navigate if the current path is not already the target dashboard
    // and if the current path is not specifically a login/signup page after successful login
    if (currentPath !== targetPath && !currentPath.includes('/login') && !currentPath.includes('/signup')) {
      navigate(targetPath);
    }
  };


  // Modified login function to accept full user data
  // In a real app, this `userData` would come from your backend's login response
  const login = async (emailOrUsername, password, rememberMe) => {
    try {
      // --- START: Simulate actual API call and response ---
      // In a real application, you would replace this with an actual fetch/axios call to your backend
      // Example: const response = await fetch('/api/login', { /* ... */ });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Login failed');

      // Simulating a backend response for different user types
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      let simulatedUser = null;
      let token = 'dummy-jwt-token-123'; // Simulate a token

      // This is where you'd typically check credentials against a backend
      if (emailOrUsername === 'athlete@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'ath1',
          fullName: 'Amaani Okoro',
          email: 'athlete@example.com',
          userType: 'athlete', // Crucial: userType is set here
          avatarUrl: '/images/sample-athlete-avatar.webp',
          // Example athlete specific data:
          sport: 'Football',
          school: 'Accra High Spartans',
          stats: { goals: 15, assists: 10 },
          highlights: [{ id: 1, title: 'Epic Goal vs Kumasi' }],
          upcomingEvents: [{id:1, title: 'Match Day', date: '2025-06-25'}],
          bio: 'Young and talented striker with a powerful shot.',
        };
      } else if (emailOrUsername === 'coach@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'coach1',
          fullName: 'Coach Mensah',
          email: 'coach@example.com',
          userType: 'coach', // Crucial: userType is set here
          avatarUrl: '/images/coach-avatar.webp',
          teamName: 'Accra High Spartans',
          roster: [{ id: 'ath1', name: 'Amaani Okoro' }],
          matchReports: [],
          teams: [{id:1, name: 'U17 Spartans'}],
          notifications: [{id:1, message: 'New athlete joined your team'}],
        };
      }
      // Added your test user here!
      else if (emailOrUsername === 'immanueleshun9@gmail.com' && password === '1234567890') {
        simulatedUser = {
          id: 'coach_ie',
          fullName: 'Immanuel Eshun',
          email: 'immanueleshun9@gmail.com',
          userType: 'coach', // Crucial: userType is set here
          avatarUrl: '/images/coach-avatar.webp',
          teamName: 'Accra Youth United',
          roster: [],
          matchReports: [],
          teams: [{id:2, name: 'U15 Accra Youth'}],
          notifications: [],
        };
      }
      else if (emailOrUsername === 'scout@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'scout1',
          fullName: 'Global Scout Network',
          email: 'scout@example.com',
          userType: 'scout', // Crucial: userType is set here
          avatarUrl: '/images/scout-avatar.webp',
          regionsOfInterest: ['Greater Accra', 'Ashanti'],
          trackedAthletes: [{ id: 'ath1', name: 'Amaani Okoro', sport: 'Football', potential: 'High' }],
          newHighlights: [{ id: 1, title: 'Striker Showcase' }],
        };
      } else if (emailOrUsername === 'fan@example.com' && password === 'password123') {
        simulatedUser = {
          id: 'fan1',
          fullName: 'Mr. & Mrs. Asante',
          email: 'fan@example.com',
          userType: 'fan', // Crucial: userType is set here
          avatarUrl: '/images/fan-avatar.webp',
          followedAthletes: ['Amaani Okoro', 'Kofi Adom'],
          upcomingMatches: [
            { id: 1, team: 'My Daughter\'s Team', opponent: 'Rival Academy', date: 'July 5, 2025', time: '2:00 PM', location: 'Local Pitch' },
          ],
          latestHighlights: [{ id: 1, title: 'Amazing Goal by Amaani Okoro' }],
        };
      } else {
        throw new Error('Invalid credentials'); // This will now be hit if none of the above match
      }
      // --- END: Simulate actual API call and response ---

      localStorage.setItem('gamepulse_auth_token', token);
      localStorage.setItem('gamepulse_current_user', JSON.stringify(simulatedUser)); // Store user data

      setIsLoggedIn(true);
      setCurrentUser(simulatedUser);
      setUserType(simulatedUser.userType); // Set userType state upon successful login
      setUserAvatarUrl(simulatedUser.avatarUrl || simulatedUser.profilePictureUrl || '/images/sample-athlete-avatar.webp');

      console.log("User logged in successfully!");
      redirectToUserDashboard(simulatedUser.userType); // Redirect after successful login
      return simulatedUser; // Return the user object for the LoginPage to use
    } catch (error) {
      console.error("Login failed in AuthContext:", error);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setUserType(null); // Reset userType on login failure
      setUserAvatarUrl('/images/default-avatar.webp');
      throw error; // Re-throw the error so LoginPage can catch and display it
    } finally {
      // Any cleanup, if necessary
    }
  };

  const logout = () => {
    localStorage.removeItem('gamepulse_auth_token'); // Clear token
    localStorage.removeItem('gamepulse_current_user'); // Clear user data
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear current user
    setUserType(null); // Clear userType on logout
    setUserAvatarUrl('/images/default-avatar.webp'); // Reset avatar
    console.log("User logged out!");
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, userAvatarUrl, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};