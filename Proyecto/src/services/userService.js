// User service for handling all user-related API calls
import api from './api';

/**
 * Service for handling user-related operations
 */
const userService = {
  /**
   * Get all users with optional filters
   * @param {Object} filters - Optional filters (role, status, etc)
   * @returns {Promise<Array>} Array of users
   */
  getAllUsers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get a specific user by ID
   * @param {number} userId - The user ID
   * @returns {Promise<Object>} User details
   */
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new user
   * @param {Object} userData - The user data
   * @returns {Promise<Object>} Created user
   */
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update a user
   * @param {number} userId - The user ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Deactivate a user
   * @param {number} userId - The user ID
   * @returns {Promise<Object>} Updated user
   */
  deactivateUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating user ${userId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Activate a user
   * @param {number} userId - The user ID
   * @returns {Promise<Object>} Updated user
   */
  activateUser: async (userId) => {
    try {
      const response = await api.put(`/users/${userId}/activate`);
      return response.data;
    } catch (error) {
      console.error(`Error activating user ${userId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get user notifications
   * @param {number} userId - The user ID
   * @returns {Promise<Array>} User notifications
   */
  getUserNotifications: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/notifications`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching notifications for user ${userId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success response
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error.response?.data || error;
    }
  }
};

export default userService;