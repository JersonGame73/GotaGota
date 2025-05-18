import React from 'react';

// Button variants
const VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  info: 'bg-cyan-500 hover:bg-cyan-600 text-white',
  light: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  link: 'text-blue-600 hover:underline'
};

// Button sizes
const SIZES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5 text-lg',
  xl: 'px-6 py-3 text-xl'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  type = 'button',
  className = '',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  ...props 
}) => {
  // Combine the classes
  const buttonClass = `
    ${VARIANTS[variant] || VARIANTS.primary}
    ${SIZES[size] || SIZES.md}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-colors duration-200 ease-in-out
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;