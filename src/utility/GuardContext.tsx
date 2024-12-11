import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for the context
interface GuardContextType {
  userLoggedIn: boolean;
  changeLoggedIn: () => void;
}

const GuardContext = createContext<GuardContextType | undefined>(undefined);

// Create a provider component
export const GuardProvider = ({ children }: { children: ReactNode }) => {
  
  const [userLoggedIn, setIsUserLoggedIn] = useState<boolean>(localStorage.getItem("userLoggedIn") === "true");

  const changeLoggedIn = () => {
    setIsUserLoggedIn(false)
  }

  return (
    <GuardContext.Provider value={{ userLoggedIn, changeLoggedIn}}>
      {children}
    </GuardContext.Provider>
  );
};

export const useGuardSecurity = () => {
  const context = useContext(GuardContext);
  if (!context) {
    throw new Error('useGuard must be used within a GuardProvider');
  }
  return context;
};
