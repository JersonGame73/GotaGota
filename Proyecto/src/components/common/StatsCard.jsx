import React from 'react';
import { formatNumber, formatCurrency } from '../../utils/dashboardHelper';

const StatsCard = ({ 
  title, 
  value, 
  previousValue,
  icon, 
  trend = 0, 
  trendLabel,
  colorClass = 'text-blue-600',
  isCurrency = false,
  onClick = null
}) => {
  // Calculate trend percentage if not explicitly provided
  const trendPercentage = trend !== 0 ? trend : 
    previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  
  // Determine trend direction and color
  const isPositiveTrend = trendPercentage >= 0;
  const trendColorClass = isPositiveTrend ? 'text-green-600' : 'text-red-600';
  
  // Format the value based on type
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value);
  
  return (
    <div 
      className={`p-6 bg-white rounded-lg shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && (
          <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '100')} mr-4`}>
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              {formattedValue}
            </p>
            {trendPercentage !== 0 && (
              <span className={`text-sm font-medium ${trendColorClass} flex items-center`}>
                {isPositiveTrend ? (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {Math.abs(trendPercentage).toFixed(1)}%
              </span>
            )}
          </div>
          {trendLabel && <p className="text-xs text-gray-500 mt-1">{trendLabel}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;