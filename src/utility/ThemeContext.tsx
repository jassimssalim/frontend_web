import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for the context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Create a provider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem("isDarkMode") === "true"); // Default is light mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("isDarkMode", (!isDarkMode).toString())
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
