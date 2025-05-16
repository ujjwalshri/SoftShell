import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  // Use local state to prevent rendering issues when darkMode is null
  const [mounted, setMounted] = useState(false);

  // Only run after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    console.log(`Toggling theme from ${darkMode ? 'dark' : 'light'} to ${darkMode ? 'light' : 'dark'} mode`);
    toggleDarkMode();
  };

  // Don't render the toggle until after client-side hydration
  if (!mounted) return null;

  return (
    <motion.button
      onClick={handleToggle}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      
      {/* Toggle Track Animation */}
      <motion.span 
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: darkMode ? '#1f2937' : '#e5e7eb'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Toggle Handle with Animation */}
      <motion.span 
        className="absolute left-1 flex items-center justify-center w-4 h-4 rounded-full bg-white dark:bg-blue-500"
        animate={{ 
          x: darkMode ? 24 : 0,
          backgroundColor: darkMode ? '#3b82f6' : '#ffffff'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30
        }}
      >
        {/* Sun icon for light mode */}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3 w-3 text-amber-500"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ 
            opacity: darkMode ? 0 : 1,
            rotate: darkMode ? 90 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </motion.svg>
        
        {/* Moon icon for dark mode */}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-3 w-3 text-gray-100 absolute"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={{ 
            opacity: darkMode ? 1 : 0,
            rotate: darkMode ? 0 : -90 
          }}
          transition={{ duration: 0.2 }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </motion.svg>
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;