import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  formatCurrency,
  formatDate,
  generateSampleLoans,
  generateSamplePayments,
  getStatusColor
} from '../../utils/dashboardHelper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatsCard from '../../components/common/StatsCard';
import { useAuth } from '../../context/AuthContext';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [nextPayment, setNextPayment] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    totalAmountBorrowed: 0,
    remainingBalance: 0
  });

  useEffect(() => {
    // Simulate API call to fetch client dashboard data
    const fetchClientData = async () => {
      try {
        // In a real app, this would be an API call with the client ID
        setTimeout(() => {
          // Generate sample loans
          const sampleLoans = generateSampleLoans(3);
          setLoans(sampleLoans);
          
          // Calculate stats from loans
          const totalLoans = sampleLoans.length;
          const activeLoans = sampleLoans.filter(loan => 
            loan.status === 'Activo' || loan.status === 'Pendiente').length;
          const totalAmountBorrowed = sampleLoans.reduce((sum, loan) => sum + loan.amount, 0);
          const remainingBalance = sampleLoans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
          
          setStats({
            totalLoans,
            activeLoans,
            totalAmountBorrowed,
            remainingBalance
          });
          
          // Get the nearest upcoming payment
          const upcomingPayment = sampleLoans
            .filter(loan => loan.status === 'Activo' || loan.status === 'Pendiente')
            .sort((a, b) => new Date(a.nextPayment.date) - new Date(b.nextPayment.date))[0]?.nextPayment;
          
          setNextPayment(upcomingPayment ? {
            amount: upcomingPayment.amount,
            date: upcomingPayment.date
          } : null);
          
          // Generate sample payment history
          const paymentHistory = generateSamplePayments(5);
          setRecentPayments(paymentHistory);
          
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching client dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calculate days until next payment
  const getDaysUntilPayment = () => {
    if (!nextPayment) return null;
    
    const today = new Date();
    const paymentDate = new Date(nextPayment.date);
    const diffTime = paymentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const daysUntilPayment = getDaysUntilPayment();
  
  // Format the current date
  const today = new Date();
  const formattedDate = format(today, "d 'de' MMMM, yyyy", { locale: es });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.full_name ? `Hola, ${user.full_name.split(' ')[0]}` : 'Hola'}
        </h1>
        <p className="text-gray-600">{formattedDate}</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total de Préstamos" 
          value={stats.totalLoans} 
          colorClass="text-blue-600"
          icon={
            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Préstamos Activos" 
          value={stats.activeLoans}
          colorClass="text-green-600"
          icon={
            <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Total Prestado" 
          value={stats.totalAmountBorrowed}
          colorClass="text-purple-600"
          isCurrency={true}
          icon={
            <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Saldo Pendiente" 
          value={stats.remainingBalance}
          colorClass="text-red-600"
          isCurrency={true}
          icon={
            <svg className="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>
      
      {/* Next payment card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900">Próximo Pago</h3>
              {nextPayment ? (
                <>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {formatCurrency(nextPayment.amount)}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Fecha de vencimiento: {formatDate(nextPayment.date)}
                    <span className={`ml-2 font-medium ${
                      daysUntilPayment <= 0 ? 'text-red-600' : 
                      daysUntilPayment <= 3 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {daysUntilPayment < 0 
                        ? `(${Math.abs(daysUntilPayment)} días atrasado)` 
                        : daysUntilPayment === 0 
                          ? '(Hoy)' 
                          : `(En ${daysUntilPayment} días)`}
                    </span>
                  </p>
                </>
              ) : (
                <p className="text-gray-600 mt-2">No tienes pagos pendientes</p>
              )}
            </div>
            
            <div>
              {nextPayment && (
                <Link to="/client/payments/make">
                  <Button variant="primary">
                    Realizar Pago
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
        
        <Card title="Acciones Rápidas">
          <div className="space-y-4">
            <Link to="/client/loans">
              <Button variant="secondary" fullWidth>
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Mis Préstamos
              </Button>
            </Link>
            
            <Link to="/client/payments">
              <Button variant="secondary" fullWidth>
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Historial de Pagos
              </Button>
            </Link>
            
            <Link to="/client/calendar">
              <Button variant="secondary" fullWidth>
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendario de Pagos
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* My Loans */}
      <Card 
        title="Mis Préstamos" 
        footer={
          <Link to="/client/loans">
            <Button variant="link" className="text-sm">
              Ver todos los préstamos
            </Button>
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Vencimiento</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loans.map(loan => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/client/loans/${loan.id}`} className="text-blue-600 hover:text-blue-800">
                      {loan.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.remainingAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(loan.endDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Payments */}
      <Card 
        title="Pagos Recientes"
        footer={
          <Link to="/client/payments">
            <Button variant="link" className="text-sm">
              Ver todos los pagos
            </Button>
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Préstamo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/client/loans/${payment.loanId}`} className="text-blue-600 hover:text-blue-800">
                      {payment.loanId}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientDashboard;