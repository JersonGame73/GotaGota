import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md', // sm, md, lg, xl, full
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventBackgroundScrolling = true
}) => {
  const [mounted, setMounted] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const modalSizeClass = sizeClasses[size] || sizeClasses.md;

  useEffect(() => {
    setMounted(true);
    
    // Prevent background scrolling when modal is open
    if (preventBackgroundScrolling && isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      if (preventBackgroundScrolling) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventBackgroundScrolling]);
  
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? '' : 'hidden'}`} 
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0"
        onClick={handleOverlayClick}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        
        {/* Modal Content */}
        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle ${modalSizeClass} w-full`}>
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900" id="modal-title">
              {title}
            </h3>
            {showCloseButton && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
                aria-label="Close"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Body */}
          <div className="px-4 py-3 sm:px-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-2 border-t border-gray-200">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(
    modalContent,
    document.getElementById('root')
  );
};

export default Modal;