// Client service for handling all client-related API calls
import api from './api';

/**
 * Service for handling client-related operations
 */
const clientService = {
  /**
   * Get all clients with optional filters
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Array of clients
   */
  getAllClients: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/clients?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get a specific client by ID
   * @param {number} clientId - The client ID
   * @returns {Promise<Object>} Client details
   */
  getClientById: async (clientId) => {
    try {
      const response = await api.get(`/clients/${clientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching client ${clientId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new client
   * @param {Object} clientData - The client data
   * @returns {Promise<Object>} Created client
   */
  createClient: async (clientData) => {
    try {
      const response = await api.post('/clients', clientData);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update a client
   * @param {number} clientId - The client ID
   * @param {Object} clientData - Updated client data
   * @returns {Promise<Object>} Updated client
   */
  updateClient: async (clientId, clientData) => {
    try {
      const response = await api.put(`/clients/${clientId}`, clientData);
      return response.data;
    } catch (error) {
      console.error(`Error updating client ${clientId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get loans for a client
   * @param {number} clientId - The client ID
   * @returns {Promise<Array>} Client loans
   */
  getClientLoans: async (clientId) => {
    try {
      const response = await api.get(`/clients/${clientId}/loans`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching loans for client ${clientId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get payments for a client
   * @param {number} clientId - The client ID
   * @returns {Promise<Array>} Client payments
   */
  getClientPayments: async (clientId) => {
    try {
      const response = await api.get(`/clients/${clientId}/payments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments for client ${clientId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get client history (all activities and interactions)
   * @param {number} clientId - The client ID
   * @returns {Promise<Array>} Client history
   */
  getClientHistory: async (clientId) => {
    try {
      const response = await api.get(`/clients/${clientId}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for client ${clientId}:`, error);
      throw error.response?.data || error;
    }
  }
};

export default clientService;