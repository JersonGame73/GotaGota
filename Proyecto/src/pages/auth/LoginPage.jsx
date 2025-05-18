import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

// Login validation schema
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('El nombre de usuario es requerido'),
  password: Yup.string()
    .required('La contraseña es requerida')
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  
  // Get redirect path from location state or use default based on user role
  const from = location.state?.from?.pathname || '/';
  
  const initialValues = {
    username: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = await login(values.username, values.password);
      setSubmitting(false);
      
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'employee') {
        navigate('/employee/dashboard', { replace: true });
      } else if (user.role === 'client') {
        navigate('/client/dashboard', { replace: true });
      } else {
        // Fallback
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Credenciales inválidas. Por favor, intente nuevamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Sistema de Gestión de Préstamos
          </h1>
          <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        
        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')}
          />
        )}
        
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <FormInput
                  id="username"
                  name="username"
                  type="text"
                  label="Nombre de usuario"
                  placeholder="Ingrese su nombre de usuario"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && errors.username}
                  autoComplete="username"
                />
                
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                >
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;