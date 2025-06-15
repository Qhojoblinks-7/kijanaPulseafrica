// src/pages/SignUpPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FaFootballBall, FaUserTie, FaSearch, FaUsers } from 'react-icons/fa'; // Specific icons for user types

// Assume a base path for dashboards or specific onboarding flows
const DASHBOARD_ROUTES = {
  athlete: '/athlete-dashboard', // Example: Athlete-specific dashboard
  coach: '/coach-dashboard',     // Example: Coach-specific dashboard
  scout: '/scout-dashboard',     // Example: Scout-specific dashboard
  fan: '/fan-dashboard',         // Example: Fan-specific dashboard
};

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '', // 'athlete', 'coach', 'scout', 'fan'
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [networkError, setNetworkError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    document.title = "Sign Up | GamePulse Africa"; // Set page title
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.userType) {
      newErrors.userType = 'Please select your user type.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, userType: type }));
    if (errors.userType) {
      setErrors(prev => ({ ...prev, userType: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNetworkError('');
    setSubmitSuccess(false);

    if (validateForm()) {
      // Simulate API call
      try {
        // In a real app, you'd send formData to your backend:
        // const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
        // const data = await response.json();
        // if (response.ok) { ... } else { ... }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate success or failure
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo
        if (isSuccess) {
          console.log('Sign up data:', formData);
          setSubmitSuccess(true);

          // Determine the redirection path based on userType
          const redirectTo = DASHBOARD_ROUTES[formData.userType] || '/dashboard'; // Default to /dashboard if type not found

          // Redirect after a short delay for the success message to be seen
          setTimeout(() => {
            navigate(redirectTo);
          }, 2000); // Redirect after 2 seconds
        } else {
          setNetworkError('Registration failed. This email might already be registered or something went wrong. Please try again.');
        }
      } catch (err) {
        setNetworkError('Unable to connect. Please check your internet connection and try again.');
        console.error('Sign up error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background visual - subtle and low-bandwidth friendly */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/images/signup-bg-african-athlete.webp" // Place a subtle background image here
          alt="African athlete in action"
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
            Join GamePulse Africa
          </h1>
          <h2 className="mt-2 text-md md:text-lg text-gamepulse-blue font-semibold">
            Your Digital Bridge to Opportunity.
          </h2>
        </div>

        {submitSuccess ? (
          <div className="text-center text-gamepulse-teal py-8">
            <FaCheckCircle className="mx-auto text-6xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
            <p className="text-lg">Welcome to GamePulse Africa, {formData.fullName}.</p>
            <p className="mt-2">Redirecting you to your dashboard...</p>
            {/* The Link below is primarily for users whose redirect might fail, or for immediate interaction */}
            <Link to={DASHBOARD_ROUTES[formData.userType] || '/dashboard'} className="mt-6 inline-block bg-gamepulse-blue text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors">
              Go to Dashboard Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* II. Core Registration Form */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tell Us About Yourself</h3>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && <p id="fullName-error" className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                    placeholder="Create a password"
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

              <div className="mt-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* III. User Type Selection */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What Best Describes You?</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: 'athlete', label: 'Athlete', description: 'High School Player looking for exposure and growth.', icon: FaFootballBall },
                  { type: 'coach', label: 'Coach', description: 'Managing a team, spotting and nurturing talent.', icon: FaUserTie },
                  { type: 'scout', label: 'Scout', description: 'Discovering promising talent across Africa.', icon: FaSearch },
                  { type: 'fan', label: 'Fan / Parent', description: 'Following games, supporting athletes, staying updated.', icon: FaUsers },
                ].map((userTypeOption) => (
                  <button
                    key={userTypeOption.type}
                    type="button"
                    onClick={() => handleUserTypeSelect(userTypeOption.type)}
                    className={`flex flex-col items-center p-4 border rounded-lg text-center transition-all duration-200
                      ${formData.userType === userTypeOption.type
                        ? 'border-gamepulse-blue ring-2 ring-gamepulse-blue bg-gamepulse-blue/5 shadow-md'
                        : 'border-gray-300 hover:border-gamepulse-blue/50 hover:shadow-sm'
                      }`}
                  >
                    <userTypeOption.icon className={`text-3xl mb-2 ${formData.userType === userTypeOption.type ? 'text-gamepulse-blue' : 'text-gray-500'}`} />
                    <p className="font-semibold text-gray-800 mb-1">{userTypeOption.label}</p>
                    <p className="text-xs text-gray-600">{userTypeOption.description}</p>
                  </button>
                ))}
              </div>
              {errors.userType && <p className="mt-2 text-sm text-red-600 text-center">{errors.userType}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gamepulse-orange text-white py-3 rounded-md font-semibold text-lg hover:bg-orange-700 transition-colors duration-300 shadow-lg"
            >
              Sign Up
            </button>

            {/* Error Handling */}
            {networkError && (
              <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
                <FaExclamationCircle className="mr-2" /> {networkError}
              </p>
            )}

            {/* IV. Social/Quick Sign-Up Options */}
            <div className="mt-8 text-center text-gray-500">
              <span className="relative inline-block px-3 before:absolute before:left-0 before:top-1/2 before:w-full before:h-px before:bg-gray-300 after:absolute after:left-0 after:top-1/2 after:w-full after:h-px after:bg-gray-300">
                <span className="relative z-10 bg-white px-2">Or sign up quickly with</span>
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
        )}

        {/* V. Credibility & Value Reinforcement */}
        <div className="mt-10 text-center text-gamepulse-dark text-lg font-semibold italic max-w-xs mx-auto">
          "Connecting African high school talent to unprecedented opportunities."
        </div>

        {/* VI. Existing User Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="font-semibold text-gamepulse-blue hover:text-blue-700 transition-colors">
            Log In
          </Link>
        </div>

        {/* VII. Footer */}
        <div className="mt-10 text-center text-sm text-gray-500 space-x-4">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link to="/help" className="hover:underline">Help & Support</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;