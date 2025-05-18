// Payment service for handling all payment-related API calls
import api from './api';

/**
 * Service for handling payment-related operations
 */
const paymentService = {
  /**
   * Get all payments with optional filters
   * @param {Object} filters - Optional filters (status, clientId, loanId, etc)
   * @returns {Promise<Array>} Array of payments
   */
  getAllPayments: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/payments?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get a specific payment by ID
   * @param {number} paymentId - The payment ID
   * @returns {Promise<Object>} Payment details
   */
  getPaymentById: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment ${paymentId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new payment
   * @param {Object} paymentData - The payment data
   * @returns {Promise<Object>} Created payment
   */
  createPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update a payment
   * @param {number} paymentId - The payment ID
   * @param {Object} paymentData - Updated payment data
   * @returns {Promise<Object>} Updated payment
   */
  updatePayment: async (paymentId, paymentData) => {
    try {
      const response = await api.put(`/payments/${paymentId}`, paymentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating payment ${paymentId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update payment status
   * @param {number} paymentId - The payment ID
   * @param {string} status - New payment status
   * @returns {Promise<Object>} Updated payment
   */
  updatePaymentStatus: async (paymentId, status) => {
    try {
      const response = await api.put(`/payments/${paymentId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating payment ${paymentId} status:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get payments for calendar view
   * @param {Date} startDate - Start date of calendar range
   * @param {Date} endDate - End date of calendar range
   * @param {Object} filters - Additional filters
   * @returns {Promise<Array>} Calendar payments
   */
  getCalendarPayments: async (startDate, endDate, filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add date range to params
      if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);
      
      // Add any other filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/payments/calendar?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar payments:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get upcoming payments
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Upcoming payments
   */
  getUpcomingPayments: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/payments/upcoming?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming payments:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get overdue payments
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} Overdue payments
   */
  getOverduePayments: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/payments/overdue?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching overdue payments:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Generate a payment receipt
   * @param {number} paymentId - The payment ID
   * @returns {Promise<Object>} Receipt data or URL
   */
  generateReceipt: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}/receipt`);
      return response.data;
    } catch (error) {
      console.error(`Error generating receipt for payment ${paymentId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get the color code for a payment status
   * @param {string} status - Payment status
   * @returns {string} Color code (hex)
   */
  getPaymentStatusColor: (status) => {
    const statusColors = {
      'completed': '#10B981', // Green
      'pending': '#F59E0B',   // Yellow
      'overdue': '#EF4444',   // Red
      'scheduled': '#9CA3AF', // Gray
      'cancelled': '#6B7280', // Gray
      'partial': '#3B82F6'    // Blue
    };
    
    return statusColors[status.toLowerCase()] || '#9CA3AF'; // Default to gray
  }
};

export default paymentService;