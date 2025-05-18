import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../components/common/AppLayout';
import RouteGuard from '../utils/RouteGuard';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Admin Pages - These will be implemented later
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const AdminUsers = React.lazy(() => import('../pages/admin/Users'));
const AdminClients = React.lazy(() => import('../pages/admin/Clients'));
const AdminLoans = React.lazy(() => import('../pages/admin/Loans'));
const AdminPayments = React.lazy(() => import('../pages/admin/Payments'));
const AdminReports = React.lazy(() => import('../pages/admin/Reports'));
const AdminSettings = React.lazy(() => import('../pages/admin/Settings'));

// Employee Pages - These will be implemented later
const EmployeeDashboard = React.lazy(() => import('../pages/employee/Dashboard'));
const EmployeeClients = React.lazy(() => import('../pages/employee/Clients'));
const EmployeeLoans = React.lazy(() => import('../pages/employee/Loans'));
const EmployeePayments = React.lazy(() => import('../pages/employee/Payments'));
const EmployeeCalendar = React.lazy(() => import('../pages/employee/Calendar'));

// Client Pages - These will be implemented later
const ClientDashboard = React.lazy(() => import('../pages/client/Dashboard'));
const ClientLoans = React.lazy(() => import('../pages/client/Loans'));
const ClientPayments = React.lazy(() => import('../pages/client/Payments'));
const ClientCalendar = React.lazy(() => import('../pages/client/Calendar'));

// Error Page
const NotFound = React.lazy(() => import('../pages/errors/NotFound'));

// Loading component for lazy loading
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const routes = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <RouteGuard>
        <LoginPage />
      </RouteGuard>
    ),
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },

  // Admin routes
  {
    path: '/admin',
    element: (
      <RouteGuard requireAuth allowedRoles={['admin']} redirectTo="/login">
        <React.Suspense fallback={<Loading />}>
          <AppLayout />
        </React.Suspense>
      </RouteGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminDashboard />
          </React.Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminUsers />
          </React.Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminClients />
          </React.Suspense>
        ),
      },
      {
        path: 'loans',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminLoans />
          </React.Suspense>
        ),
      },
      {
        path: 'payments',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminPayments />
          </React.Suspense>
        ),
      },
      {
        path: 'reports',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminReports />
          </React.Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <React.Suspense fallback={<Loading />}>
            <AdminSettings />
          </React.Suspense>
        ),
      }
    ],
  },

  // Employee routes
  {
    path: '/employee',
    element: (
      <RouteGuard requireAuth allowedRoles={['employee', 'admin']} redirectTo="/login">
        <React.Suspense fallback={<Loading />}>
          <AppLayout />
        </React.Suspense>
      </RouteGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <React.Suspense fallback={<Loading />}>
            <EmployeeDashboard />
          </React.Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <React.Suspense fallback={<Loading />}>
            <EmployeeClients />
          </React.Suspense>
        ),
      },
      {
        path: 'loans',
        element: (
          <React.Suspense fallback={<Loading />}>
            <EmployeeLoans />
          </React.Suspense>
        ),
      },
      {
        path: 'payments',
        element: (
          <React.Suspense fallback={<Loading />}>
            <EmployeePayments />
          </React.Suspense>
        ),
      },
      {
        path: 'calendar',
        element: (
          <React.Suspense fallback={<Loading />}>
            <EmployeeCalendar />
          </React.Suspense>
        ),
      },
    ],
  },

  // Client routes
  {
    path: '/client',
    element: (
      <RouteGuard requireAuth allowedRoles={['client']} redirectTo="/login">
        <React.Suspense fallback={<Loading />}>
          <AppLayout />
        </React.Suspense>
      </RouteGuard>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <React.Suspense fallback={<Loading />}>
            <ClientDashboard />
          </React.Suspense>
        ),
      },
      {
        path: 'loans',
        element: (
          <React.Suspense fallback={<Loading />}>
            <ClientLoans />
          </React.Suspense>
        ),
      },
      {
        path: 'payments',
        element: (
          <React.Suspense fallback={<Loading />}>
            <ClientPayments />
          </React.Suspense>
        ),
      },
      {
        path: 'calendar',
        element: (
          <React.Suspense fallback={<Loading />}>
            <ClientCalendar />
          </React.Suspense>
        ),
      },
    ],
  },

  // Error handling
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;