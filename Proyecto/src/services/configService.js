// Config service for handling system configuration and loan types
import api from './api';

/**
 * Service for handling configuration-related operations
 */
const configService = {
  /**
   * Get all loan types
   * @returns {Promise<Array>} Array of loan types
   */
  getLoanTypes: async () => {
    try {
      const response = await api.get('/config/loan-types');
      return response.data;
    } catch (error) {
      console.error('Error fetching loan types:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get loan type by ID
   * @param {number} loanTypeId - The loan type ID
   * @returns {Promise<Object>} Loan type details
   */
  getLoanTypeById: async (loanTypeId) => {
    try {
      const response = await api.get(`/config/loan-types/${loanTypeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching loan type ${loanTypeId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new loan type
   * @param {Object} loanTypeData - The loan type data
   * @returns {Promise<Object>} Created loan type
   */
  createLoanType: async (loanTypeData) => {
    try {
      const response = await api.post('/config/loan-types', loanTypeData);
      return response.data;
    } catch (error) {
      console.error('Error creating loan type:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update a loan type
   * @param {number} loanTypeId - The loan type ID
   * @param {Object} loanTypeData - Updated loan type data
   * @returns {Promise<Object>} Updated loan type
   */
  updateLoanType: async (loanTypeId, loanTypeData) => {
    try {
      const response = await api.put(`/config/loan-types/${loanTypeId}`, loanTypeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating loan type ${loanTypeId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get system configuration
   * @returns {Promise<Object>} System configuration
   */
  getSystemConfig: async () => {
    try {
      const response = await api.get('/config/system');
      return response.data;
    } catch (error) {
      console.error('Error fetching system configuration:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update system configuration
   * @param {Object} configData - Updated configuration data
   * @returns {Promise<Object>} Updated system configuration
   */
  updateSystemConfig: async (configData) => {
    try {
      const response = await api.put('/config/system', configData);
      return response.data;
    } catch (error) {
      console.error('Error updating system configuration:', error);
      throw error.response?.data || error;
    }
  }
};

export default configService;