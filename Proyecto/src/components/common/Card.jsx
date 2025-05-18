import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  footer,
  noPadding = false,
  bordered = true
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm overflow-hidden
        ${bordered ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 px-4 py-3 ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className={`${noPadding ? '' : 'p-4'} ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 px-4 py-3 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;