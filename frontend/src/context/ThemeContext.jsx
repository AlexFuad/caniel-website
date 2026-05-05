import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/config/constants';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to dark theme
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const setThemeMode = (mode) => {
    if (['light', 'dark'].includes(mode)) {
      setTheme(mode);
      applyTheme(mode);
      localStorage.setItem(STORAGE_KEYS.THEME, mode);
    }
  };

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
