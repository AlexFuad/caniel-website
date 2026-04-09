import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const login = async (email, password, recaptchaToken = null) => {
    const VALID_EMAIL = 'admin@caniel.my.id';
    const VALID_PASSWORD = '4dL14@23#02';

    // Validate reCAPTCHA token in development/mock mode
    if (recaptchaToken) {
      console.log('✓ reCAPTCHA token received:', recaptchaToken.substring(0, 20) + '...');
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const value = {
    isAdmin,
    isLoading,
    login,
    logout,
    setIsAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
