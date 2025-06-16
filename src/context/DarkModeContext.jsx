// src/context/DarkModeContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Initialize dark mode based on localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const storedPreference = localStorage.getItem('gamepulse_dark_mode');
    if (storedPreference !== null) {
      return JSON.parse(storedPreference);
    }
    // Then check system preference (optional but good for initial load)
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply or remove 'dark' class on <html> element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('gamepulse_dark_mode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('gamepulse_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Optionally, listen for system preference changes (for a more dynamic experience)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't explicitly set a preference
      if (localStorage.getItem('gamepulse_dark_mode') === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Run only once on mount

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);