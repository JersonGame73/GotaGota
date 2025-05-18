import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route guard component that restricts access based on authentication state and user roles
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {boolean} props.requireAuth - Whether the route requires authentication
 * @param {string[]} props.allowedRoles - Roles allowed to access the route
 * @param {string} props.redirectTo - Path to redirect to if access is denied
 */
const RouteGuard = ({
  children,
  requireAuth = false,
  allowedRoles = [],
  redirectTo = '/login',
}) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    // Save the location user was trying to visit
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If route has role restrictions
  if (requireAuth && allowedRoles.length > 0) {
    // Check if user has at least one of the required roles
    const hasPermission = allowedRoles.some(role => hasRole(role));
    
    if (!hasPermission) {
      // Redirect based on user role
      if (user?.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user?.role === 'employee') {
        return <Navigate to="/employee/dashboard" replace />;
      } else if (user?.role === 'client') {
        return <Navigate to="/client/dashboard" replace />;
      }
      
      // Fallback to login if no role is matched
      return <Navigate to={redirectTo} replace />;
    }
  }

  // If user is already authenticated and tries to access login page
  if (!requireAuth && isAuthenticated() && redirectTo !== '/login') {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === 'employee') {
      return <Navigate to="/employee/dashboard" replace />;
    } else if (user?.role === 'client') {
      return <Navigate to="/client/dashboard" replace />;
    }
  }

  // If all conditions pass, render the children
  return children;
};

export default RouteGuard;