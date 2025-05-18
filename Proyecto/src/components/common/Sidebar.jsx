import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { isAdmin, isEmployee, isClient } = useAuth();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Class for active links
  const activeLinkClass = 'bg-blue-500 text-white';
  const inactiveLinkClass = 'text-gray-600 hover:bg-blue-100';

  // Base link class for all links
  const baseLinkClass = 'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors';

  // Get navigation items based on user role
  const getNavItems = () => {
    if (isAdmin()) {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: 'chart-bar' },
        { path: '/admin/users', label: 'Usuarios', icon: 'users' },
        { path: '/admin/clients', label: 'Clientes', icon: 'user-group' },
        { path: '/admin/loans', label: 'Préstamos', icon: 'cash' },
        { path: '/admin/payments', label: 'Pagos', icon: 'credit-card' },
        { path: '/admin/reports', label: 'Reportes', icon: 'document-report' },
        { path: '/admin/settings', label: 'Configuración', icon: 'cog' }
      ];
    } else if (isEmployee()) {
      return [
        { path: '/employee/dashboard', label: 'Dashboard', icon: 'chart-bar' },
        { path: '/employee/clients', label: 'Clientes', icon: 'user-group' },
        { path: '/employee/loans', label: 'Préstamos', icon: 'cash' },
        { path: '/employee/payments', label: 'Pagos', icon: 'credit-card' },
        { path: '/employee/calendar', label: 'Calendario', icon: 'calendar' }
      ];
    } else if (isClient()) {
      return [
        { path: '/client/dashboard', label: 'Dashboard', icon: 'chart-bar' },
        { path: '/client/loans', label: 'Mis Préstamos', icon: 'cash' },
        { path: '/client/payments', label: 'Mis Pagos', icon: 'credit-card' },
        { path: '/client/calendar', label: 'Calendario', icon: 'calendar' }
      ];
    }
    return [];
  };

  // Get icon component based on icon name
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'chart-bar':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'user-group':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'cash':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'document-report':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'cog':
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        );
    }
  };

  return (
    <div className={`bg-white shadow-md transition-all duration-300 ${expanded ? 'w-64' : 'w-16'} flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b">
        {expanded && <h2 className="text-lg font-semibold text-gray-800">Menú</h2>}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expanded ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-2">
          {getNavItems().map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${baseLinkClass} ${isActive(item.path) ? activeLinkClass : inactiveLinkClass}`}
              >
                <span className="mr-3">{getIcon(item.icon)}</span>
                {expanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;