import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Initialize state from localStorage, or null if not found
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || null;
  });
  const [userAvatarUrl, setUserAvatarUrl] = useState(() => {
    return localStorage.getItem('userAvatarUrl') || null;
  });
  const [loading, setLoading] = useState(true); // Added loading state for initial load

  // Effect to handle initial loading and hydration from localStorage
  useEffect(() => {
    // This effect runs once on mount
    // The initial state is already set by the useState(() => ...) calls
    setLoading(false); // Mark loading as complete after initial hydration
  }, []);


  // --- Login Function ---
  // This function would be called after successful authentication (e.g., from LoginPage, SignUpPage)
  const login = useCallback((userData) => {
    // Basic validation for userData
    if (!userData || !userData.id || !userData.userType || !userData.fullName) {
      console.error("Login: Invalid user data provided.", userData);
      return;
    }

    // Determine the user's profile slug
    const userSlug = userData.slug || userData.fullName.toLowerCase().replace(/\s/g, '_');

    // Store data in localStorage
    try {
      localStorage.setItem('user', JSON.stringify({ ...userData, slug: userSlug })); // Store full user object including slug
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', userData.userType);
      // Set a default or provided avatar URL
      localStorage.setItem('userAvatarUrl', userData.avatarUrl || '/path/to/default-avatar.png'); // Provide a default
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
      // Potentially alert the user or fallback to session storage
    }

    // Update React state
    setUser({ ...userData, slug: userSlug });
    setIsLoggedIn(true);
    setUserType(userData.userType);
    setUserAvatarUrl(userData.avatarUrl || '/path/to/default-avatar.png');

    console.log(`Logged in as ${userData.fullName} (${userData.userType})`);

    // Redirect based on user type
    let redirectTo = '/dashboard'; // Default
    switch (userData.userType) {
      case 'athlete':
        redirectTo = `/my-profile/${userSlug}`; // Redirect to specific profile with slug
        break;
      case 'coach':
        redirectTo = '/coach-dashboard';
        break;
      case 'scout':
        redirectTo = '/scout-dashboard';
        break;
      case 'fan':
      case 'parent':
        redirectTo = '/fan-dashboard';
        break;
      default:
        redirectTo = '/dashboard';
    }
    navigate(redirectTo);
  }, [navigate]);

  // --- Logout Function ---
  const logout = useCallback(() => {
    // Clear data from localStorage
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      localStorage.removeItem('userAvatarUrl');
    } catch (error) {
      console.error("Failed to clear user data from localStorage:", error);
    }

    // Clear React state
    setUser(null);
    setIsLoggedIn(false);
    setUserType(null);
    setUserAvatarUrl(null);

    console.log("Logged out.");
    navigate('/login'); // Redirect to login page after logout
  }, [navigate]);


  const value = {
    user,
    isLoggedIn,
    userType,
    userAvatarUrl,
    login,
    logout,
    loading // Provide loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when authentication state has been loaded */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};