import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatCurrency, generateSampleData, generateChartData } from '../../utils/dashboardHelper';
import StatsCard from '../../components/common/StatsCard';
import Card from '../../components/common/Card';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [recentLoans, setRecentLoans] = useState([]);
  const [latePayments, setLatePayments] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data
        setTimeout(() => {
          setStats({
            totalLoans: generateSampleData('totalLoans'),
            activeLoans: generateSampleData('activeLoans'),
            totalClients: generateSampleData('totalClients'),
            activeClients: generateSampleData('activeClients'),
            totalAmount: generateSampleData('totalAmount'),
            collectedAmount: generateSampleData('collectedAmount'),
            pendingPayments: generateSampleData('pendingPayments'),
            latePayments: generateSampleData('latePayments'),
          });

          setChartData(generateChartData(6));
          
          // Mock recent loans
          setRecentLoans([
            { id: 'L-10001', client: 'Juan Pérez', amount: 25000, status: 'Activo', date: '2023-05-15' },
            { id: 'L-10002', client: 'María González', amount: 50000, status: 'Activo', date: '2023-05-12' },
            { id: 'L-10003', client: 'Carlos Rodríguez', amount: 15000, status: 'Pendiente', date: '2023-05-10' },
            { id: 'L-10004', client: 'Ana Martínez', amount: 30000, status: 'Activo', date: '2023-05-08' },
            { id: 'L-10005', client: 'José López', amount: 20000, status: 'Atrasado', date: '2023-05-05' },
          ]);
          
          // Mock late payments
          setLatePayments([
            { id: 'P-20001', client: 'José López', loanId: 'L-10005', amount: 2500, dueDate: '2023-04-25', daysLate: 20 },
            { id: 'P-20002', client: 'Luis Torres', loanId: 'L-9998', amount: 3000, dueDate: '2023-04-28', daysLate: 17 },
            { id: 'P-20003', client: 'Carmen Díaz', loanId: 'L-9995', amount: 1800, dueDate: '2023-05-01', daysLate: 14 },
            { id: 'P-20004', client: 'Roberto Sánchez', loanId: 'L-9992', amount: 4200, dueDate: '2023-05-03', daysLate: 12 },
          ]);
          
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Préstamos y Pagos (Últimos 6 meses)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Format the values as currency
          callback: function(value) {
            return '$' + (value / 1000) + 'k';
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600">Visualiza el estado general del sistema de préstamos.</p>
      </div>
      
      {/* Stats Cards */}
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
          title="Total de Clientes" 
          value={stats.totalClients}
          colorClass="text-purple-600" 
          icon={
            <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Clientes Activos" 
          value={stats.activeClients}
          colorClass="text-indigo-600" 
          icon={
            <svg className="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>
      
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard 
          title="Monto Total Prestado" 
          value={stats.totalAmount}
          isCurrency={true}
          colorClass="text-emerald-600"
          icon={
            <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Monto Cobrado" 
          value={stats.collectedAmount}
          isCurrency={true}
          colorClass="text-cyan-600"
          icon={
            <svg className="w-5 h-5 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Pagos Pendientes" 
          value={stats.pendingPayments}
          colorClass="text-amber-600"
          trend={5.2}
          trendLabel="Vs. mes pasado"
          icon={
            <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
      
      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <Bar options={chartOptions} data={chartData} height={80} />
        </Card>
        
        <Card title="Pagos Atrasados" className="lg:col-span-1">
          <div className="space-y-2">
            {stats.latePayments > 0 ? (
              <div className="text-center py-3">
                <div className="text-3xl font-bold text-red-600">
                  {stats.latePayments}
                </div>
                <div className="text-sm text-gray-500">pagos atrasados</div>
              </div>
            ) : (
              <div className="text-center py-10">
                <svg className="w-10 h-10 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-gray-600">No hay pagos atrasados</p>
              </div>
            )}
            
            {latePayments.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Días</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {latePayments.map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {payment.client}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-red-600 font-medium">
                          {payment.daysLate} días
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Recent Loans */}
      <Card title="Préstamos Recientes">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLoans.map(loan => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${loan.status === 'Activo' ? 'bg-green-100 text-green-800' : ''}
                      ${loan.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${loan.status === 'Atrasado' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {loan.status}
                    </span>
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

export default AdminDashboard;