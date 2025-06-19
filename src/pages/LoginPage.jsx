import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaPhoneAlt, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Backdrop from './../assets/backdrop.png';

// Define ABSOLUTE paths for dashboards (consistent with SignUpPage)
const DASHBOARD_ROUTES = {
    athlete: '/my-profile',
    coach: '/coach-dashboard', // Ensure these routes exist in your App.jsx router
    scout: '/scout-dashboard',
    fan: '/fan-dashboard',
    parent: '/fan-dashboard', // Assuming 'parent' also goes to fan-dashboard
};

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [networkError, setNetworkError] = useState('');
    const [loading, setLoading] = useState(false); // Local loading state for form submission

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on page load
        document.title = "Login | GamePulse Africa"; // Set page title
    }, []);

    const LoginSchema = Yup.object().shape({
        emailOrUsername: Yup.string()
            .trim()
            .required('Email or Username is required.')
            .min(3, 'Email or Username must be at least 3 characters.'),
        password: Yup.string()
            .required('Password is required.')
            .min(6, 'Password must be at least 6 characters.'), // Consider making this 8 for consistency with signup
    });

    const formik = useFormik({
        initialValues: {
            emailOrUsername: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            setNetworkError(''); // Clear any previous network errors
            setLoading(true);    // Start loading animation

            try {
                // Pass as an object with email and password keys
                const loggedInUser = await login({
                    email: values.emailOrUsername, // Or handle username based on backend
                    password: values.password,
                });

                if (loggedInUser && loggedInUser.userType) {
                    // Use the centralized DASHBOARD_ROUTES for navigation
                    const redirectToPath = DASHBOARD_ROUTES[loggedInUser.userType] || '/dashboard';
                    navigate(redirectToPath, { replace: true }); // Use replace to prevent back navigation to login
                } else {
                    // This case might hit if login() resolves but user data is incomplete or unexpected
                    setNetworkError('Login failed. No user data received or user type unknown.');
                }
            } catch (err) {
                // Catch errors thrown by the login function (e.g., API errors, invalid credentials)
                setNetworkError(err.message || 'Login failed. Please check your credentials and network connection.');
                console.error('Login error:', err);
            } finally {
                setLoading(false); // Stop loading animation regardless of success or failure
            }
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-stretch justify-center font-sans">
            {/* Left Column (Backdrop / Mobile Hero) */}
            <div
                className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${Backdrop})`,
                }}
            >
                <div className="text-center z-10 p-4 bg-opacity-20 rounded-lg lg:bg-transparent lg:p-0">
                    <h2 className="text-3xl md:text-5xl font-extrabold font-heading leading-tight drop-shadow-lg">
                        Where Africa's Sporting Stars Rise.
                    </h2>
                    <p className="mt-4 text-lg md:text-xl leading-relaxed text-yellow drop-shadow-md max-w-sm mx-auto">
                        Connect to compete, discover, and unlock your true potential.
                    </p>

                    <div className="mt-8 text-center text-white">
                        <span className="relative inline-block px-3 mb-4 text-lg font-semibold block">
                            Log in with
                        </span>
                    </div>
                    <div className="space-y-3 max-w-xs mx-auto">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-white/50 rounded-md shadow-sm text-white bg-transparent hover:bg-white/10 transition-colors"
                            aria-label="Continue with Google"
                        >
                            <FaGoogle className="mr-3 text-lg" /> Continue with Google
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-white/50 rounded-md shadow-sm text-white bg-transparent hover:bg-blue transition-colors"
                            aria-label="Continue with Facebook"
                        >
                            <FaFacebook className="mr-3 text-lg" /> Continue with Facebook
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-white/50 rounded-md shadow-sm text-white bg-transparent hover:bg-white/10 transition-colors"
                            aria-label="Continue with Apple"
                        >
                            <FaApple className="mr-3 text-lg" /> Continue with Apple
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-gamepulse-orange rounded-md shadow-sm text-white bg-gamepulse-orange hover:bg-orange-700 transition-colors"
                            aria-label="Continue with Phone Number"
                        >
                            <FaPhoneAlt className="mr-3 text-lg" /> Continue with Phone Number
                        </button>
                    </div>

                    <div className="mt-10 text-center text-white text-lg font-semibold italic max-w-xs mx-auto">
                        "Connecting African high school talent to unprecedented opportunities."
                    </div>

                    <div className="mt-10 text-center text-sm text-white space-x-4">
                        <Link to="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:underline hover:text-white">Terms of Service</Link>
                        <Link to="/help-center" className="hover:underline hover:text-white">Help & Support</Link>
                    </div>
                </div>
            </div>

            {/* Right Column (Login Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
                            Welcome Back!
                        </h1>
                        <h2 className="mt-2 text-md md:text-lg text-gamepulse-blue font-semibold">
                            Your Sporting Journey Continues.
                        </h2>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="text-center text-gray-500 my-6">
                            <span className="relative inline-block px-3 before:absolute before:left-0 before:top-1/2 before:w-full before:h-px before:bg-gray-300 after:absolute after:left-0 after:top-1/2 after:w-full after:h-px after:bg-gray-300">
                                <span className="relative z-10 bg-white px-2">Or log in with your account</span>
                            </span>
                        </div>

                        {/* Login Form Inputs */}
                        <div>
                            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
                            <input
                                type="text"
                                id="emailOrUsername"
                                name="emailOrUsername"
                                value={formik.values.emailOrUsername}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your email or username"
                                className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.emailOrUsername && formik.errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'}`}
                                aria-invalid={formik.touched.emailOrUsername && formik.errors.emailOrUsername ? "true" : "false"}
                                aria-describedby={formik.touched.emailOrUsername && formik.errors.emailOrUsername ? "emailOrUsername-error" : undefined}
                                autoComplete="username"
                            />
                            {formik.touched.emailOrUsername && formik.errors.emailOrUsername && (
                                <p id="emailOrUsername-error" className="mt-1 text-sm text-red-600 flex items-center"><FaExclamationCircle className="mr-1" />{formik.errors.emailOrUsername}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your password"
                                    className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    aria-invalid={formik.touched.password && formik.errors.password ? "true" : "false"}
                                    aria-describedby={formik.touched.password && formik.errors.password ? "password-error" : undefined}
                                    autoComplete="current-password"
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
                            {formik.touched.password && formik.errors.password && (
                                <p id="password-error" className="mt-1 text-sm text-red-600 flex items-center"><FaExclamationCircle className="mr-1" />{formik.errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
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

                        <button
                            type="submit"
                            disabled={loading || !formik.isValid || formik.isSubmitting}
                            className={`w-full bg-gamepulse-blue-dark text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg flex items-center justify-center mt-6
                            ${(loading || !formik.isValid || formik.isSubmitting) ? 'opacity-70 cursor-not-allowed' : ''}`}
                            aria-label={loading ? 'Logging In...' : 'Log In'}
                        >
                            {loading || formik.isSubmitting ? (
                                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {loading || formik.isSubmitting ? 'Logging In...' : 'Log In'}
                        </button>

                        {networkError && (
                            <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
                                <FaExclamationCircle className="mr-2" /> {networkError}
                            </p>
                        )}

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">Don't have an account?</p>
                            <Link to="/signup" className="font-semibold text-gamepulse-blue hover:text-blue-700 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;