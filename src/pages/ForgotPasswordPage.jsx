// src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast.success('Password reset email sent successfully!');
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-stretch justify-center font-sans">
      {/* Left Side - Hero Section */}
      <div
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9)), url("/images/forgot-password-hero.jpg")',
        }}
      >
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-6">
            Reset Your Password
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Don't worry! It happens to the best of us. Enter your email and we'll send you a link to reset your password.
          </p>
          
          <div className="mt-10 text-center text-white text-lg font-semibold italic max-w-xs mx-auto">
            "Your journey in sports continues with secure access."
          </div>

          <div className="mt-10 text-center text-sm text-white space-x-4">
            <Link to="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
            <Link to="/help-center" className="hover:underline hover:text-white">Help & Support</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
        <div className="text-center">
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
            Forgot Password?
          </h1>
          <p className="mt-2 text-md md:text-lg text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-3 pl-10 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <div className="mb-6">
              <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h2>
              <p className="text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">What's next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Check your email inbox</li>
                <li>• Click the reset link in the email</li>
                <li>• Create a new password</li>
                <li>• Sign in with your new password</li>
              </ul>
            </div>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center text-blue-600 hover:text-blue-500 transition-colors font-semibold"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Need help?</p>
          <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;