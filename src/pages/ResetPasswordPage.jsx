// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Backdrop from './../assets/backdrop.png';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get token from URL params
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [networkError, setNetworkError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetUserPassword } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reset Password | GamePulse Africa";
    // In a real app, you might want to validate the token's presence/initial validity here
    if (!token) {
      setNetworkError('Invalid or missing password reset token.');
    }
  }, [token]);

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'New Password must be at least 8 characters long.')
      .matches(/[A-Z]/, 'New Password must contain at least one uppercase letter.')
      .matches(/[a-z]/, 'New Password must contain at least one lowercase letter.')
      .matches(/[0-9]/, 'New Password must contain at least one number.')
      .matches(/[^A-Za-z0-9]/, 'New Password must contain at least one special character.')
      .required('New Password is required.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
      .required('Confirm Password is required.'),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setNetworkError('');
      setSuccessMessage('');
      setLoading(true);

      if (!token) {
        setNetworkError('Password reset token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await resetUserPassword(token, values.newPassword);
        setSuccessMessage(response.message);
        // Optionally redirect to login after a short delay for success message to be seen
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } catch (err) {
        setNetworkError(err.message || 'Failed to reset password. Please try again.');
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
            Secure Your Account
          </h2>
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-yellow drop-shadow-md max-w-sm mx-auto">
            Set a strong new password to protect your GamePulse Africa account.
          </p>

          <div className="mt-10 text-center text-white text-lg font-semibold italic max-w-xs mx-auto">
            "Strength and security, on and off the field."
          </div>

          <div className="mt-10 text-center text-sm text-white space-x-4">
            <Link to="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
            <Link to="/help-center" className="hover:underline hover:text-white">Help & Support</Link>
          </div>
        </div>
      </div>

      {/* Right Column (Reset Password Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
              Set New Password
            </h1>
            <p className="mt-2 text-md md:text-lg text-gray-600">
              Please enter and confirm your new password.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your new password"
                  className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={formik.touched.newPassword && formik.errors.newPassword ? "true" : "false"}
                  aria-describedby={formik.touched.newPassword && formik.errors.newPassword ? "newPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p id="newPassword-error" className="mt-1 text-sm text-red-600 flex items-center"><FaExclamationCircle className="mr-1" />{formik.errors.newPassword}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm your new password"
                  className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={formik.touched.confirmPassword && formik.errors.confirmPassword ? "true" : "false"}
                  aria-describedby={formik.touched.confirmPassword && formik.errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600 flex items-center"><FaExclamationCircle className="mr-1" />{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid || formik.isSubmitting}
              className="w-full bg-gamepulse-blue text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg flex items-center justify-center mt-6"
              aria-label={loading ? 'Resetting Password...' : 'Reset Password'}
            >
              {loading || formik.isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading || formik.isSubmitting ? 'Resetting Password...' : 'Reset Password'}
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
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">Remember your password?</p>
            <Link to="/login" className="font-semibold text-gamepulse-blue hover:text-blue-700 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;