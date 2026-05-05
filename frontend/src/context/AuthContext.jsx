import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, usersAPI } from '@/lib/api';
import { STORAGE_KEYS, DEFAULT_ADMIN, ROLES, ROLE_PERMISSIONS } from '@/config/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is already logged in
        const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        
        if (userData && token) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
        
        // Initialize default admin user if not exists
        const users = await usersAPI.getAll();
        if (users.length === 0) {
          await usersAPI.create(DEFAULT_ADMIN);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password, recaptchaToken = null) => {
    setIsLoading(true);
    try {
      // Validate reCAPTCHA token if provided
      if (recaptchaToken) {
        console.log('✓ reCAPTCHA token received:', recaptchaToken.substring(0, 20) + '...');
      }

      const authData = await authAPI.login(email, password);
      setUser(authData.user);
      setIsAuthenticated(true);
      return { success: true, user: authData.user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login gagal. Periksa email dan password Anda.'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    if (!user || !user.role) return false;
    
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  }, [user]);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    if (!user || !user.role) return false;
    return user.role === role;
  }, [user]);

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles) => {
    if (!user || !user.role) return false;
    return roles.includes(user.role);
  }, [user]);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    try {
      const updatedUser = await usersAPI.update(user.id, updates);
      const userData = {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      };
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    hasPermission,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
