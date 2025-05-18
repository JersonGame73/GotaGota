import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';

// Reset password validation schema
const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial'
    )
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirme su contraseña')
});

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if token exists
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <Alert
            type="error"
            title="Enlace inválido"
            message="El enlace de restablecimiento es inválido o ha expirado."
          />
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
              Solicitar un nuevo enlace de restablecimiento
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Initial form values
  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // This would normally call an API endpoint to reset the password
      // For now, we'll simulate a successful API call
      setTimeout(() => {
        setSuccessMessage('Su contraseña ha sido restablecida exitosamente.');
        setSubmitting(false);
        
        // Redirect to login page after showing success message
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }, 1000);
    } catch (err) {
      setError('No se pudo restablecer la contraseña. El enlace puede haber expirado.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <div className="mb-6">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
              Restablecer contraseña
            </h1>
            <p className="text-center text-gray-600">
              Ingrese su nueva contraseña.
            </p>
          </div>
          
          {successMessage && (
            <Alert 
              type="success" 
              message={successMessage} 
              className="mb-4"
            />
          )}
          
          {error && (
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError('')}
              className="mb-4"
            />
          )}
          
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  label="Nueva contraseña"
                  placeholder="Ingrese su nueva contraseña"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
                
                <FormInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirmar contraseña"
                  placeholder="Confirme su nueva contraseña"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting || successMessage}
                >
                  Restablecer contraseña
                </Button>
                
                <div className="text-center mt-4">
                  <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    Volver a iniciar sesión
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;