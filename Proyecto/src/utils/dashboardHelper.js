/**
 * Helper utilities for dashboard components
 */

// Format large numbers with thousand separators
export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-MX').format(number);
};

// Format currency values
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (!previous) return 100;
  return ((current - previous) / previous) * 100;
};

// Format date for display
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('es-MX', options);
};

// Get status color class based on loan status
export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'activo':
      return 'bg-green-100 text-green-800';
    case 'late':
    case 'atrasado':
      return 'bg-red-100 text-red-800';
    case 'pending':
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
    case 'completado':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Generate random sample data for demo purposes
export const generateSampleData = (type) => {
  switch (type) {
    case 'totalLoans':
      return Math.floor(Math.random() * 500) + 100;
    case 'activeLoans':
      return Math.floor(Math.random() * 300) + 50;
    case 'totalClients':
      return Math.floor(Math.random() * 200) + 50;
    case 'activeClients':
      return Math.floor(Math.random() * 150) + 30;
    case 'totalAmount':
      return Math.floor(Math.random() * 5000000) + 1000000;
    case 'collectedAmount':
      return Math.floor(Math.random() * 3000000) + 500000;
    case 'pendingPayments':
      return Math.floor(Math.random() * 50) + 10;
    case 'latePayments':
      return Math.floor(Math.random() * 30) + 5;
    default:
      return 0;
  }
};

// Generate chart data for demo purposes
export const generateChartData = (months = 6) => {
  const labels = [];
  const disbursedData = [];
  const collectedData = [];
  
  const currentDate = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
    const monthName = date.toLocaleString('es-MX', { month: 'short' });
    labels.push(monthName);
    
    disbursedData.push(Math.floor(Math.random() * 800000) + 200000);
    collectedData.push(Math.floor(Math.random() * 700000) + 150000);
  }
  
  return {
    labels,
    datasets: [
      {
        label: 'Préstamos Desembolsados',
        data: disbursedData,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Pagos Recibidos',
        data: collectedData,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };
};

// Generate sample loans for client dashboard
export const generateSampleLoans = (count = 3) => {
  const loanTypes = ['Personal', 'Vivienda', 'Vehículo', 'Negocio', 'Educación'];
  const statuses = ['Activo', 'Atrasado', 'Completado', 'Pendiente'];
  
  const loans = [];
  
  for (let i = 0; i < count; i++) {
    const amount = Math.floor(Math.random() * 50000) + 5000;
    const remainingAmount = Math.floor(Math.random() * amount);
    const type = loanTypes[Math.floor(Math.random() * loanTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12));
    
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + Math.floor(Math.random() * 5) + 1);
    
    loans.push({
      id: `LOAN-${10000 + i}`,
      type,
      amount,
      remainingAmount,
      status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      nextPayment: {
        amount: Math.floor(amount / 12),
        date: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30))).toISOString(),
      }
    });
  }
  
  return loans;
};

// Generate sample payments for client dashboard
export const generateSamplePayments = (count = 5) => {
  const payments = [];
  
  for (let i = 0; i < count; i++) {
    const amount = Math.floor(Math.random() * 5000) + 500;
    const date = new Date();
    date.setDate(date.getDate() - (i * 30));
    
    payments.push({
      id: `PAY-${20000 + i}`,
      amount,
      date: date.toISOString(),
      status: i === 0 ? 'Pendiente' : 'Pagado',
      loanId: `LOAN-${10000 + Math.floor(Math.random() * 3)}`,
    });
  }
  
  return payments;
};