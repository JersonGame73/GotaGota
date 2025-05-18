// Loan service for handling all loan-related API calls
import api from './api';
import { calculationService } from '../utils/calculationService';

/**
 * Service for handling loan-related operations
 */
const loanService = {
  /**
   * Get all loans with optional filters
   * @param {Object} filters - Optional filters (status, clientId, etc)
   * @returns {Promise<Array>} Array of loans
   */
  getAllLoans: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add any filters to the query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/loans?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching loans:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get a specific loan by ID
   * @param {number} loanId - The loan ID
   * @returns {Promise<Object>} Loan details
   */
  getLoanById: async (loanId) => {
    try {
      const response = await api.get(`/loans/${loanId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching loan ${loanId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new loan
   * @param {Object} loanData - The loan data
   * @returns {Promise<Object>} Created loan
   */
  createLoan: async (loanData) => {
    try {
      const response = await api.post('/loans', loanData);
      return response.data;
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update a loan
   * @param {number} loanId - The loan ID
   * @param {Object} loanData - Updated loan data
   * @returns {Promise<Object>} Updated loan
   */
  updateLoan: async (loanId, loanData) => {
    try {
      const response = await api.put(`/loans/${loanId}`, loanData);
      return response.data;
    } catch (error) {
      console.error(`Error updating loan ${loanId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update loan status
   * @param {number} loanId - The loan ID
   * @param {string} status - New loan status
   * @returns {Promise<Object>} Updated loan
   */
  updateLoanStatus: async (loanId, status) => {
    try {
      const response = await api.put(`/loans/${loanId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating loan ${loanId} status:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get loan amortization table
   * @param {number} loanId - The loan ID
   * @returns {Promise<Array>} Amortization table entries
   */
  getLoanAmortization: async (loanId) => {
    try {
      const response = await api.get(`/loans/${loanId}/amortization`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching amortization for loan ${loanId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get loan payments
   * @param {number} loanId - The loan ID
   * @returns {Promise<Array>} Loan payments
   */
  getLoanPayments: async (loanId) => {
    try {
      const response = await api.get(`/loans/${loanId}/payments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payments for loan ${loanId}:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Simulate a loan calculation
   * @param {Object} simulationData - Loan simulation parameters (amount, term, interestRate, etc)
   * @returns {Promise<Object>} Loan simulation result
   */
  simulateLoan: async (simulationData) => {
    try {
      const response = await api.post('/loans/simulate', simulationData);
      return response.data;
    } catch (error) {
      console.error('Error simulating loan:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Calculate loan details locally
   * @param {Object} loanData - Loan parameters
   * @returns {Object} Calculated loan details
   */
  calculateLoanDetails: (loanData) => {
    const { amount, interestRate, term, calculationMethod = 'simple' } = loanData;
    
    // Delegate to the calculation service
    return calculationService.calculateLoan(amount, interestRate, term, calculationMethod);
  }
};

export default loanService;