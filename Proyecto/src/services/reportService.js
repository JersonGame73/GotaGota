// Report service for handling all report-related API calls
import api from './api';

/**
 * Service for handling report-related operations
 */
const reportService = {
  /**
   * Get loan reports with optional filters
   * @param {Object} filters - Optional filters (date range, status, etc)
   * @returns {Promise<Object>} Loan reports data
   */
  getLoanReports: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/reports/loans?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching loan reports:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get payment reports with optional filters
   * @param {Object} filters - Optional filters (date range, status, etc)
   * @returns {Promise<Object>} Payment reports data
   */
  getPaymentReports: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/reports/payments?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment reports:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get client reports with optional filters
   * @param {Object} filters - Optional filters
   * @returns {Promise<Object>} Client reports data
   */
  getClientReports: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/reports/clients?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching client reports:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get performance metrics with optional filters
   * @param {Object} filters - Optional filters (date range, etc)
   * @returns {Promise<Object>} Performance metrics data
   */
  getPerformanceMetrics: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/reports/performance?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Export a report as PDF or CSV
   * @param {string} reportType - Type of report (loans, payments, clients, performance)
   * @param {string} format - Export format (pdf, csv)
   * @param {Object} filters - Optional filters for the report
   * @returns {Promise<Object>} Export URL or data
   */
  exportReport: async (reportType, format = 'pdf', filters = {}) => {
    try {
      const params = new URLSearchParams();
      params.append('format', format);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.post(`/reports/export`, {
        reportType,
        format,
        filters
      });
      return response.data;
    } catch (error) {
      console.error(`Error exporting ${reportType} report:`, error);
      throw error.response?.data || error;
    }
  },

  /**
   * Generate dashboard summary data
   * @param {string} userRole - User role (admin, employee, client)
   * @param {Object} filters - Optional filters
   * @returns {Promise<Object>} Dashboard summary data
   */
  getDashboardSummary: async (userRole, filters = {}) => {
    try {
      const params = new URLSearchParams();
      params.append('role', userRole);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      
      const response = await api.get(`/reports/dashboard?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw error.response?.data || error;
    }
  }
};

export default reportService;