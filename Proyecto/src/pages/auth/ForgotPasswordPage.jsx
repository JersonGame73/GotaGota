import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import Card from '../../components/common/Card';
import { login, getCurrentUser } from '../../services/authService';

// Forgot password validation schema
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingrese un correo electrónico válido')
    .required('El correo electrónico es requerido')
});

const ForgotPasswordPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Initial form values
  const initialValues = {
    email: ''
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // This would normally call an API endpoint to send a password reset email
      // For now, we'll simulate a successful API call
      setTimeout(() => {
        setSuccessMessage(`Se ha enviado un enlace de restablecimiento a ${values.email}. Por favor revise su correo electrónico.`);
        resetForm();
        setSubmitting(false);
      }, 1000);
    } catch (err) {
      setError('No se pudo enviar el correo de restablecimiento. Por favor, intente nuevamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <div className="mb-6">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
              ¿Olvidó su contraseña?
            </h1>
            <p className="text-center text-gray-600">
              Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.
            </p>
          </div>
          
          {successMessage && (
            <Alert 
              type="success" 
              message={successMessage} 
              onClose={() => setSuccessMessage('')}
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
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
              <Form className="space-y-6">
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="Ingrese su correo electrónico"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                >
                  Enviar enlace de restablecimiento
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

export default ForgotPasswordPage;