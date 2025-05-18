// Authentication service
import api from './api';

/**
 * Authenticate user with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>} User data with token
 */
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data;
    
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    return user;
  } catch (error) {
    throw error.response?.data || { message: 'Authentication failed' };
  }
};

/**
 * Logout user by removing token
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
  }
};

/**
 * Get current user data from token
 * @returns {Promise<Object|null>} User data or null if not authenticated
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};

/**
 * Change user password
 * @param {string} currentPassword 
 * @param {string} newPassword 
 * @returns {Promise<Object>} Success message
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password change failed' };
  }
};