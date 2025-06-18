import React, { createContext, useState, useContext, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@app_settings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (settings) {
        const { isDarkMode: savedDarkMode } = JSON.parse(settings);
        setIsDarkMode(savedDarkMode);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTheme = () => {
    return {
      ...COLORS,
      background: isDarkMode ? '#121212' : COLORS.background,
      text: isDarkMode ? '#FFFFFF' : COLORS.text,
      textLight: isDarkMode ? '#B0B0B0' : COLORS.textLight,
      border: isDarkMode ? '#2C2C2C' : COLORS.border,
      card: isDarkMode ? '#1E1E1E' : COLORS.card,
    };
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ isDarkMode: newDarkMode }));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    getTheme,
    isLoading,
  };

  if (isLoading) {
    return null;
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 