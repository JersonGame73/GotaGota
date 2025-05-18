import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mt-4">Página no encontrada</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <div className="mt-8">
          <Button 
            as={Link} 
            to="/"
            variant="primary"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;