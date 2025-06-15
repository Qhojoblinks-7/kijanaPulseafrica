// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaPhoneAlt, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [networkError, setNetworkError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Destructure the login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    document.title = "Login | GamePulse Africa"; // Set page title
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or Username is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setNetworkError(''); // Clear general network error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNetworkError('');
    setLoading(true);

    if (validateForm()) {
      try {
        // Call the login function from AuthContext
        // It should return the user object upon successful login
        const loggedInUser = await login(formData.emailOrUsername, formData.password, formData.rememberMe);

        if (loggedInUser) {
          console.log('Login successful for user:', loggedInUser);
          // Redirect based on userType
          switch (loggedInUser.userType) {
            case 'athlete':
              navigate('/athlete-dashboard');
              break;
            case 'coach':
              navigate('/coach-dashboard');
              break;
            case 'scout':
              navigate('/scout-dashboard');
              break;
            case 'fan': // Assuming 'fan' covers general fans and parents
            case 'parent':
              navigate('/fan-dashboard');
              break;
            default:
              // Fallback for unexpected user types or general dashboard
              navigate('/dashboard');
              break;
          }
        } else {
          // This else block might be redundant if login throws an error for invalid creds
          // but good for explicit clarity if login resolves with null/false on failure
          setNetworkError('Incorrect email/username or password. Please try again.');
        }
      } catch (err) {
        // The `login` function in AuthContext should throw an error on authentication failure
        setNetworkError(err.message || 'Login failed. Please check your credentials.');
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // Stop loading if validation fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background visual - subtle and low-bandwidth friendly */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/images/login-bg-african-stadium.webp" // Place a subtle background image here
          alt="African stadium crowd"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
        {/* I. Page Header & Branding */}
        <div className="text-center mb-8">
          <img
            src="/images/gamepulse-logo.webp" // Your logo path
            alt="GamePulse Africa Logo"
            className="mx-auto h-16 md:h-20 w-auto animate-fadeIn" // Example subtle animation
            loading="lazy"
          />
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
            Welcome Back!
          </h1>
          <h2 className="mt-2 text-md md:text-lg text-gamepulse-blue font-semibold">
            Connect to Your Sporting Future.
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* II. Login Form */}
          <div>
            <h3 className="sr-only">Sign In to GamePulse Africa</h3>
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'}`}
                aria-invalid={errors.emailOrUsername ? "true" : "false"}
                aria-describedby={errors.emailOrUsername ? "emailOrUsername-error" : undefined}
              />
              {errors.emailOrUsername && <p id="emailOrUsername-error" className="mt-1 text-sm text-red-600">{errors.emailOrUsername}</p>}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
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
              {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-gamepulse-blue border-gray-300 rounded focus:ring-gamepulse-blue"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-gamepulse-blue hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gamepulse-orange text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-700 transition-colors duration-300 shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          {/* VII. Error Handling */}
          {networkError && (
            <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
              <FaExclamationCircle className="mr-2" /> {networkError}
            </p>
          )}

          {/* III. Social Login Options */}
          <div className="mt-8 text-center text-gray-500">
            <span className="relative inline-block px-3 before:absolute before:left-0 before:top-1/2 before:w-full before:h-px before:bg-gray-300 after:absolute after:left-0 after:top-1/2 after:w-full after:h-px after:bg-gray-300">
              <span className="relative z-10 bg-white px-2">Or log in with</span>
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="mr-3 text-lg" /> Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FaFacebook className="mr-3 text-lg" /> Continue with Facebook
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FaApple className="mr-3 text-lg" /> Continue with Apple
            </button>
            {/* VITAL for Africa: Phone Number OTP */}
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gamepulse-blue rounded-md shadow-sm text-white bg-gamepulse-blue hover:bg-blue-700 transition-colors"
            >
              <FaPhoneAlt className="mr-3 text-lg" /> Continue with Phone Number
            </button>
          </div>
        </form>

        {/* IV. Credibility & Value Reinforcement */}
        <div className="mt-10 text-center text-gamepulse-dark text-lg font-semibold italic max-w-xs mx-auto">
          "Connecting African high school talent to unprecedented opportunities."
        </div>

        {/* V. New User Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup" className="font-semibold text-gamepulse-blue hover:text-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>

        {/* VI. Footer */}
        <div className="mt-10 text-center text-sm text-gray-500 space-x-4">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link to="/help" className="hover:underline">Help & Support</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;