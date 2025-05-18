/**
 * Service for financial calculations related to loans and payments
 * Handles different interest calculation methods and amortization schedules
 */

// Helper function for precision rounding to avoid floating point issues
const roundToDecimal = (value, decimals = 2) => {
  return Number(Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals);
};

/**
 * Calculation service for loan-related operations
 */
export const calculationService = {
  /**
   * Calculate monthly payment for a loan
   * @param {number} principal - Loan amount
   * @param {number} annualInterestRate - Annual interest rate (%)
   * @param {number} termMonths - Loan term in months
   * @returns {number} Monthly payment amount
   */
  calculateMonthlyPayment: (principal, annualInterestRate, termMonths) => {
    // Convert annual interest rate to monthly decimal
    const monthlyRate = annualInterestRate / 100 / 12;
    
    // Handle edge case of zero interest
    if (monthlyRate === 0) {
      return roundToDecimal(principal / termMonths);
    }
    
    // Calculate monthly payment using the formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    
    return roundToDecimal(monthlyPayment);
  },
  
  /**
   * Calculate total interest over loan lifetime
   * @param {number} principal - Loan amount
   * @param {number} monthlyPayment - Monthly payment amount
   * @param {number} termMonths - Loan term in months
   * @returns {number} Total interest paid
   */
  calculateTotalInterest: (principal, monthlyPayment, termMonths) => {
    const totalPaid = monthlyPayment * termMonths;
    return roundToDecimal(totalPaid - principal);
  },
  
  /**
   * Generate full amortization schedule for a loan
   * @param {number} principal - Loan amount
   * @param {number} annualInterestRate - Annual interest rate (%)
   * @param {number} termMonths - Loan term in months
   * @param {Date} startDate - Start date of the loan
   * @returns {Array} Array of payment objects with details for each payment
   */
  generateAmortizationSchedule: (principal, annualInterestRate, termMonths, startDate = new Date()) => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const monthlyPayment = calculationService.calculateMonthlyPayment(principal, annualInterestRate, termMonths);
    
    let balance = principal;
    let schedule = [];
    let paymentDate = new Date(startDate);
    
    for (let paymentNumber = 1; paymentNumber <= termMonths; paymentNumber++) {
      // Calculate interest payment for this period
      const interestPayment = roundToDecimal(balance * monthlyRate);
      
      // Calculate principal payment for this period
      const principalPayment = roundToDecimal(monthlyPayment - interestPayment);
      
      // Update balance
      balance = roundToDecimal(balance - principalPayment);
      
      // Handle potential floating point issues for final payment
      if (paymentNumber === termMonths) {
        if (Math.abs(balance) < 0.01) {
          balance = 0;
        }
      }
      
      // Calculate payment date
      paymentDate = new Date(paymentDate);
      paymentDate.setMonth(paymentDate.getMonth() + 1);
      
      schedule.push({
        paymentNumber,
        paymentDate: new Date(paymentDate),
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance < 0 ? 0 : balance,
        dueDate: new Date(paymentDate)
      });
    }
    
    return schedule;
  },
  
  /**
   * Calculate loan details including monthly payment, total payment and interest
   * @param {number} amount - Loan amount
   * @param {number} interestRate - Annual interest rate (%)
   * @param {number} term - Loan term in months
   * @param {string} calculationMethod - Calculation method (simple, compound)
   * @returns {Object} Loan details with payment amounts
   */
  calculateLoan: (amount, interestRate, term, calculationMethod = 'simple') => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const termMonths = parseInt(term);
    
    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterest = 0;
    
    if (calculationMethod === 'simple') {
      // Simple interest calculation (equal principal payments + declining interest)
      const monthlyPrincipal = roundToDecimal(principal / termMonths);
      const firstMonthInterest = roundToDecimal((principal * rate) / 100 / 12);
      
      monthlyPayment = monthlyPrincipal + firstMonthInterest; // Initial payment
      totalInterest = roundToDecimal((principal * rate * termMonths / 12) / 100);
      totalPayment = principal + totalInterest;
    } else {
      // Compound interest calculation (equal total payments)
      monthlyPayment = calculationService.calculateMonthlyPayment(principal, rate, termMonths);
      totalPayment = roundToDecimal(monthlyPayment * termMonths);
      totalInterest = roundToDecimal(totalPayment - principal);
    }
    
    return {
      amount: principal,
      interestRate: rate,
      term: termMonths,
      monthlyPayment,
      totalPayment,
      totalInterest,
      calculationMethod
    };
  },
  
  /**
   * Calculate penalty for late payment
   * @param {number} paymentAmount - Regular payment amount
   * @param {number} daysLate - Number of days payment is late
   * @param {number} penaltyRate - Daily penalty rate (%)
   * @returns {number} Penalty amount
   */
  calculatePenalty: (paymentAmount, daysLate, penaltyRate = 0.1) => {
    if (daysLate <= 0) return 0;
    
    // Default penalty rate is 0.1% per day
    const penalty = paymentAmount * (penaltyRate / 100) * daysLate;
    return roundToDecimal(penalty);
  },
  
  /**
   * Calculate remaining balance at a specific date
   * @param {Object} loan - Loan object with amount, start date, etc.
   * @param {Date} referenceDate - Date to calculate balance for
   * @returns {number} Remaining balance
   */
  calculateRemainingBalance: (loan, referenceDate) => {
    const { amount, interestRate, term, startDate } = loan;
    const schedule = calculationService.generateAmortizationSchedule(
      amount, interestRate, term, new Date(startDate)
    );
    
    // Find the payment period that includes the reference date
    const refDate = new Date(referenceDate);
    
    // If before start date, return full loan amount
    if (refDate < new Date(startDate)) {
      return amount;
    }
    
    // If after all payments, return 0
    const lastPayment = schedule[schedule.length - 1];
    if (refDate >= lastPayment.paymentDate) {
      return 0;
    }
    
    // Find the last payment made before the reference date
    const lastPaymentBeforeRef = schedule.filter(p => p.paymentDate <= refDate)
      .sort((a, b) => b.paymentNumber - a.paymentNumber)[0];
    
    return lastPaymentBeforeRef ? lastPaymentBeforeRef.balance : amount;
  }
};

export default calculationService;