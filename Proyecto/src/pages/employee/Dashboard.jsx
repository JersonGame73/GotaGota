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
import { 
  formatCurrency, 
  formatDate, 
  generateSampleData, 
  generateChartData, 
  getStatusColor 
} from '../../utils/dashboardHelper';
import StatsCard from '../../components/common/StatsCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [recentClients, setRecentClients] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data
        setTimeout(() => {
          setStats({
            activeLoans: generateSampleData('activeLoans'),
            activeClients: generateSampleData('activeClients'),
            pendingPayments: generateSampleData('pendingPayments'),
            latePayments: generateSampleData('latePayments'),
            todayPayments: Math.floor(Math.random() * 10) + 2,
            thisWeekPayments: Math.floor(Math.random() * 30) + 10,
          });

          setChartData(generateChartData(6));
          
          // Mock upcoming payments
          const today = new Date();
          setUpcomingPayments([
            { 
              id: 'P-30001', 
              client: 'Juan Pérez', 
              clientId: 'C-1001',
              loanId: 'L-10001', 
              amount: 2500, 
              dueDate: new Date(today.setDate(today.getDate() + 1)).toISOString(),
              status: 'Pendiente'
            },
            { 
              id: 'P-30002', 
              client: 'María González', 
              clientId: 'C-1002',
              loanId: 'L-10002', 
              amount: 3000, 
              dueDate: new Date(today.setDate(today.getDate() + 2)).toISOString(),
              status: 'Pendiente'
            },
            { 
              id: 'P-30003', 
              client: 'Carlos Rodríguez', 
              clientId: 'C-1003',
              loanId: 'L-10003', 
              amount: 1800, 
              dueDate: new Date(today.setDate(today.getDate() + 3)).toISOString(),
              status: 'Pendiente'
            },
            { 
              id: 'P-30004', 
              client: 'Ana Martínez', 
              clientId: 'C-1004',
              loanId: 'L-10004', 
              amount: 4200, 
              dueDate: new Date(today.setDate(today.getDate() + 5)).toISOString(),
              status: 'Pendiente'
            },
            { 
              id: 'P-30005', 
              client: 'José López', 
              clientId: 'C-1005',
              loanId: 'L-10005', 
              amount: 2200, 
              dueDate: new Date(today.setDate(today.getDate() + 7)).toISOString(),
              status: 'Pendiente'
            },
          ]);
          
          // Mock recent clients
          setRecentClients([
            { id: 'C-1001', name: 'Juan Pérez', phone: '555-1234', loans: 2, registeredDate: '2023-05-01' },
            { id: 'C-1002', name: 'María González', phone: '555-2345', loans: 1, registeredDate: '2023-05-03' },
            { id: 'C-1003', name: 'Carlos Rodríguez', phone: '555-3456', loans: 3, registeredDate: '2023-05-05' },
            { id: 'C-1004', name: 'Ana Martínez', phone: '555-4567', loans: 1, registeredDate: '2023-05-08' },
            { id: 'C-1005', name: 'José López', phone: '555-5678', loans: 2, registeredDate: '2023-05-10' },
          ]);
          
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching employee dashboard data:', error);
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

  // Calculate days until due for each payment
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Empleado</h1>
        <p className="text-gray-600">Bienvenido al sistema de gestión de préstamos.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Clientes Activos" 
          value={stats.activeClients}
          colorClass="text-blue-600"
          icon={
            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
          title="Pagos Hoy" 
          value={stats.todayPayments}
          colorClass="text-yellow-600" 
          icon={
            <svg className="w-5 h-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatsCard 
          title="Pagos Atrasados" 
          value={stats.latePayments}
          colorClass="text-red-600" 
          icon={
            <svg className="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <Card className="lg:col-span-2">
          <Bar options={chartOptions} data={chartData} height={80} />
        </Card>
        
        {/* Action Card */}
        <Card title="Acciones Rápidas" className="lg:col-span-1">
          <div className="space-y-4 p-2">
            <Link to="/employee/clients/new">
              <Button variant="primary" fullWidth className="mb-3">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Registrar Nuevo Cliente
              </Button>
            </Link>
            
            <Link to="/employee/loans/new">
              <Button variant="success" fullWidth className="mb-3">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Nuevo Préstamo
              </Button>
            </Link>
            
            <Link to="/employee/payments/register">
              <Button variant="info" fullWidth className="mb-3">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Registrar Pago
              </Button>
            </Link>
            
            <Link to="/employee/calendar">
              <Button variant="secondary" fullWidth>
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ver Calendario de Pagos
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Upcoming Payments */}
      <Card title="Próximos Pagos" 
        footer={
          <Link to="/employee/payments">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Préstamo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Vencimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingPayments.map(payment => {
                const daysUntilDue = getDaysUntilDue(payment.dueDate);
                const status = daysUntilDue < 0 ? 'Atrasado' : 'Pendiente';
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/employee/clients/${payment.clientId}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {payment.client}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link to={`/employee/loans/${payment.loanId}`} className="text-blue-600 hover:text-blue-800">
                        {payment.loanId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.dueDate)}
                      <span className={`ml-2 ${daysUntilDue <= 2 ? 'text-red-600' : daysUntilDue <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {daysUntilDue < 0 
                          ? `(${Math.abs(daysUntilDue)} días atrasado)` 
                          : daysUntilDue === 0 
                            ? '(Hoy)' 
                            : `(${daysUntilDue} días)`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/employee/payments/register/${payment.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Registrar Pago
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Clients */}
      <Card 
        title="Clientes Recientes" 
        footer={
          <Link to="/employee/clients">
            <Button variant="link" className="text-sm">
              Ver todos los clientes
            </Button>
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Préstamos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/employee/clients/${client.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.loans}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.registeredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;