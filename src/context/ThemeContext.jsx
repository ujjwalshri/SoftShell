import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize state with null to prevent hydration issues
  const [darkMode, setDarkMode] = useState(null);
  
  // Set up the theme on initial client-side load
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDarkMode = savedTheme 
      ? savedTheme === 'dark'
      : prefersDark;
    
    setDarkMode(initialDarkMode);
    
    // Apply theme immediately to avoid flash
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Apply the theme whenever darkMode changes after initial load
  useEffect(() => {
    if (darkMode === null) return; // Skip initial null state
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      console.log('Toggling theme to:', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Only render children when theme is determined to avoid flash
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {darkMode !== null ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};