/**
 * Service for formatting various data types used in the loan management system
 */

/**
 * Format service for consistent data presentation across the application
 */
const formatService = {
  /**
   * Format currency value
   * @param {number} value - Amount to format
   * @param {string} locale - Locale for formatting (default: 'es-MX')
   * @param {string} currency - Currency code (default: 'MXN')
   * @returns {string} Formatted currency string
   */
  currency: (value, locale = 'es-MX', currency = 'MXN') => {
    if (value === null || value === undefined) return '';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  },
  
  /**
   * Format percentage value
   * @param {number} value - Percentage to format
   * @param {string} locale - Locale for formatting (default: 'es-MX')
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted percentage string
   */
  percentage: (value, locale = 'es-MX', decimals = 2) => {
    if (value === null || value === undefined) return '';
    
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  },
  
  /**
   * Format date
   * @param {Date|string} date - Date to format
   * @param {string} locale - Locale for formatting (default: 'es-MX')
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date string
   */
  date: (date, locale = 'es-MX', options = {}) => {
    if (!date) return '';
    
    const defaultOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return new Intl.DateTimeFormat(
      locale, 
      { ...defaultOptions, ...options }
    ).format(dateObj);
  },
  
  /**
   * Format a full datetime
   * @param {Date|string} date - Date to format
   * @param {string} locale - Locale for formatting (default: 'es-MX')
   * @returns {string} Formatted datetime string
   */
  datetime: (date, locale = 'es-MX') => {
    if (!date) return '';
    
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return formatService.date(date, locale, options);
  },
  
  /**
   * Format a phone number
   * @param {string} phone - Phone number to format
   * @returns {string} Formatted phone number
   */
  phoneNumber: (phone) => {
    if (!phone) return '';
    
    // Remove non-numeric characters
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length === 11) { // With country code
      return `+${cleaned.substring(0, 1)} (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
    }
    
    return phone;
  },
  
  /**
   * Format document/ID number with proper spacing
   * @param {string} document - Document number
   * @returns {string} Formatted document number
   */
  documentNumber: (document) => {
    if (!document) return '';
    
    // Remove spaces and special characters
    const cleaned = document.replace(/[\s-]/g, '');
    
    // Format with a space every 4 characters
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  },
  
  /**
   * Format a name (capitalize first letter of each word)
   * @param {string} name - Name to format
   * @returns {string} Formatted name
   */
  name: (name) => {
    if (!name) return '';
    
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  
  /**
   * Get the appropriate status badge color for a loan status
   * @param {string} status - Loan status
   * @returns {string} CSS color class
   */
  loanStatusColor: (status) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800',
      'completed': 'bg-gray-100 text-gray-800',
      'overdue': 'bg-red-100 text-red-800',
      'defaulted': 'bg-purple-100 text-purple-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  },
  
  /**
   * Get the appropriate status badge color for a payment status
   * @param {string} status - Payment status
   * @returns {string} CSS color class
   */
  paymentStatusColor: (status) => {
    const statusColors = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'overdue': 'bg-red-100 text-red-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-gray-100 text-gray-800',
      'partial': 'bg-indigo-100 text-indigo-800'
    };
    
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  },
  
  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  truncate: (text, length = 100) => {
    if (!text) return '';
    
    return text.length > length 
      ? `${text.substring(0, length)}...` 
      : text;
  },
  
  /**
   * Convert bytes to human-readable size
   * @param {number} bytes - Size in bytes
   * @returns {string} Human-readable size
   */
  fileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

export default formatService;