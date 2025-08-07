import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      toast.success('Login successful! Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light-gray flex flex-col lg:flex-row items-stretch justify-center font-sans">
      {/* Left Side - Hero Section */}
      <div
        className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-neutral-white py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(18, 130, 162, 0.9), rgba(3, 64, 120, 0.9)), url("/images/login-hero.jpg")',
        }}
      >
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-6">
            Welcome Back to GamePulse Africa
          </h1>
          <p className="text-lg md:text-xl text-neutral-white/90 mb-8">
            Connect with Africa's brightest sports talents and continue your journey in the world of sports.
          </p>
          
          <div className="mt-8 text-center text-neutral-white">
            <p className="text-lg font-semibold mb-4">New to GamePulse Africa?</p>
            <div className="space-y-3">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-neutral-white/50 rounded-md shadow-sm text-neutral-white bg-transparent hover:bg-neutral-white/10 transition-colors"
              >
                <FaGoogle className="mr-2" />
                Continue with Google
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-neutral-white/50 rounded-md shadow-sm text-neutral-white bg-transparent hover:bg-gamepulse-blue transition-colors"
              >
                <FaFacebook className="mr-2" />
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative z-10 w-full max-w-md bg-neutral-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-neutral-light-gray">
        <div className="text-center">
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-neutral-black font-heading">
            Sign In
          </h1>
          <p className="mt-2 text-md md:text-lg text-neutral-medium-gray">
            Access your GamePulse Africa account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email/Username Field */}
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-neutral-dark-gray mb-1">
              Email or Username
            </label>
            <input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              required
              value={formData.emailOrUsername}
              onChange={handleChange}
              className={`w-full px-3 py-3 border rounded-md text-neutral-black placeholder-neutral-medium-gray focus:outline-none focus:ring-2 focus:ring-gamepulse-blue transition-colors ${
                errors.emailOrUsername ? 'border-error-red' : 'border-neutral-medium-gray'
              }`}
              placeholder="Enter your email or username"
            />
            {errors.emailOrUsername && (
              <p className="mt-1 text-sm text-error-red">{errors.emailOrUsername}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-dark-gray mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-3 pr-10 border rounded-md text-neutral-black placeholder-neutral-medium-gray focus:outline-none focus:ring-2 focus:ring-gamepulse-blue transition-colors ${
                  errors.password ? 'border-error-red' : 'border-neutral-medium-gray'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-neutral-medium-gray" />
                ) : (
                  <FaEye className="h-5 w-5 text-neutral-medium-gray" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-error-red">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-gamepulse-blue focus:ring-gamepulse-blue border-neutral-medium-gray rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-dark-gray">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-gamepulse-blue hover:text-gamepulse-blue-dark transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gamepulse-blue text-neutral-white py-3 rounded-md font-semibold text-lg hover:bg-gamepulse-blue-dark transition-colors duration-300 shadow-lg flex items-center justify-center mt-6"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-neutral-white mr-3" viewBox="0 0 24 24">
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
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-neutral-medium-gray">Don't have an account?</p>
          <Link to="/signup" className="font-semibold text-gamepulse-blue hover:text-gamepulse-blue-dark transition-colors">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;