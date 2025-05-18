import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

// Create the authentication context
const AuthContext = createContext(null);

// Provider component for the authentication context
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const handleLogin = async (username, password) => {
    try {
      setLoading(true);
      const userData = await login(username, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    hasRole,
    isAuthenticated,
    isAdmin: () => hasRole('admin'),
    isEmployee: () => hasRole('employee'),
    isClient: () => hasRole('client')
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}