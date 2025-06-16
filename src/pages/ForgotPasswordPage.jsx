// src/pages/ForgotPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Backdrop from './../assets/backdrop.png';

const ForgotPasswordPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [networkError, setNetworkError] = useState('');
  const [loading, setLoading] = useState(false);

  const { sendPasswordResetEmail } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Forgot Password | GamePulse Africa";
  }, []);

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email format. E.g., user@example.com')
      .required('Email is required.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setNetworkError('');
      setSuccessMessage('');
      setLoading(true);

      try {
        const response = await sendPasswordResetEmail(values.email);
        setSuccessMessage(response.message);
        formik.resetForm(); // Clear the form on success
      } catch (err) {
        setNetworkError(err.message || 'Failed to send password reset link. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-stretch justify-center font-sans">
      {/* Left Column (Backdrop) */}
      <div
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${Backdrop})`,
        }}
      >
        <div className="text-center z-10 p-4 bg-opacity-20 rounded-lg lg:bg-transparent lg:p-0">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading leading-tight drop-shadow-lg">
            Don't worry, we've got you covered.
          </h2>
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-yellow drop-shadow-md max-w-sm mx-auto">
            Enter your email to reset your password and get back to your game.
          </p>

          <div className="mt-10 text-center text-white text-lg font-semibold italic max-w-xs mx-auto">
            "Your journey back to the pitch starts here."
          </div>

          <div className="mt-10 text-center text-sm text-white space-x-4">
            <Link to="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
            <Link to="/help-center" className="hover:underline hover:text-white">Help & Support</Link>
          </div>
        </div>
      </div>

      {/* Right Column (Forgot Password Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
          <div className="text-center mb-8">
            
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
              Reset Your Password
            </h1>
            <p className="mt-2 text-md md:text-lg text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
                aria-describedby={formik.touched.email && formik.errors.email ? "email-error" : undefined}
              />
              {formik.touched.email && formik.errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center"><FaExclamationCircle className="mr-1" />{formik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid || formik.isSubmitting}
              className="w-full bg-gamepulse-blue text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg flex items-center justify-center mt-6"
              aria-label={loading ? 'Sending Link...' : 'Send Reset Link'}
            >
              {loading || formik.isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading || formik.isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
            </button>

            {successMessage && (
              <p className="mt-4 text-sm text-green-600 text-center flex items-center justify-center">
                <FaExclamationCircle className="mr-2" /> {successMessage}
              </p>
            )}

            {networkError && (
              <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
                <FaExclamationCircle className="mr-2" /> {networkError}
              </p>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">Remember your password?</p>
              <Link to="/login" className="font-semibold text-gamepulse-blue hover:text-blue-700 transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;