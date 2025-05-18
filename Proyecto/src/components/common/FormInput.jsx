import React, { useState } from 'react';

const FormInput = ({ 
  label, 
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  helperText,
  error,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  fullWidth = true,
  icon,
  iconPosition = 'left',
  min,
  max,
  step,
  onBlur,
  onFocus,
  autoComplete = 'off',
  rows = 3,
  options = [],
  multiple = false,
  id
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Generate a unique ID for the input if not provided
  const inputId = id || `form-input-${name}`;
  
  // Common input class
  const baseInputClass = `
    block rounded-md border-gray-300 shadow-sm
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}
    ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${inputClassName}
  `;
  
  // Render different input types
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            rows={rows}
            className={baseInputClass}
          />
        );
        
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            multiple={multiple}
            className={baseInputClass}
          >
            {!multiple && !required && <option value="">Seleccione una opción</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'password':
        return (
          <div className="relative">
            <input
              id={inputId}
              type={showPassword ? 'text' : 'password'}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              autoComplete={autoComplete}
              className={baseInputClass}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        );
        
      case 'checkbox':
        return (
          <input
            id={inputId}
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={`h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${inputClassName}`}
          />
        );
        
      case 'radio':
        return (
          <input
            id={inputId}
            type="radio"
            name={name}
            checked={!!value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${inputClassName}`}
          />
        );
        
      case 'number':
        return (
          <input
            id={inputId}
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            className={baseInputClass}
          />
        );
        
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
        return (
          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            autoComplete={autoComplete}
            className={baseInputClass}
          />
        );
        
      default: // text, email, tel, url, etc.
        return (
          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            className={baseInputClass}
          />
        );
    }
  };
  
  return (
    <div className={`mb-4 ${className} ${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {(label || type === 'checkbox' || type === 'radio') && (
        <div className={`flex ${type === 'checkbox' || type === 'radio' ? 'flex-row-reverse justify-end gap-2 items-center' : 'flex-col mb-1'}`}>
          <label 
            htmlFor={inputId}
            className={`
              ${type !== 'checkbox' && type !== 'radio' ? 'block text-sm font-medium text-gray-700' : 'text-sm text-gray-700'}
              ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
              ${labelClassName}
            `}
          >
            {label}
          </label>
          
          {/* For checkbox and radio, input is rendered next to label */}
          {(type === 'checkbox' || type === 'radio') && renderInput()}
        </div>
      )}
      
      {/* Input field (except for checkbox and radio which are rendered with label) */}
      {type !== 'checkbox' && type !== 'radio' && (
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          
          {renderInput()}
          
          {icon && iconPosition === 'right' && !type === 'password' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
        </div>
      )}
      
      {/* Error or Helper Text */}
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default FormInput;