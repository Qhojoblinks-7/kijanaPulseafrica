import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaPhoneAlt, FaExclamationCircle } from 'react-icons/fa'; // Removed FaCheckCircle as it's no longer directly used for success message
import { FaFootballBall, FaUserTie, FaSearch, FaUsers } from 'react-icons/fa';
import Backdrop from './../assets/backdrop.png';
import { useAuth } from '../context/AuthContext'; // Import useAuth

// Define ABSOLUTE paths for dashboards
const DASHBOARD_ROUTES = {
    athlete: '/my-profile',
    coach: '/coach-dashboard', // Ensure these routes exist in your App.jsx router
    scout: '/scout-dashboard',
    fan: '/fan-dashboard',
};

const SignUpPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    // const [submitSuccess, setSubmitSuccess] = useState(false); // Removed: AuthContext handles navigation on success
    const [networkError, setNetworkError] = useState('');
    const { signup } = useAuth(); // Destructure signup from useAuth
    // const navigate = useNavigate(); // No longer needed directly for navigation from here, as signup handles it

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on page load
        document.title = "Sign Up | GamePulse Africa"; // Set page title
    }, []);

    // Define Yup validation schema
    const SignUpSchema = Yup.object().shape({
        fullName: Yup.string()
            .trim()
            .required('Full Name is required.')
            .min(2, 'Full Name must be at least 2 characters.')
            .max(100, 'Full Name cannot exceed 100 characters.'),
        email: Yup.string()
            .trim()
            .email('Invalid email format. E.g., user@example.com')
            .required('Email is required.')
            .max(255, 'Email cannot exceed 255 characters.'),
        password: Yup.string()
            .required('Password is required.')
            .min(8, 'Password must be at least 8 characters long.')
            .max(50, 'Password cannot exceed 50 characters.')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
            .matches(/[0-9]/, 'Password must contain at least one number.')
            .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character (e.g., !@#$%^&*).'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required.')
            .oneOf([Yup.ref('password'), null], 'Passwords do not match.'),
        userType: Yup.string()
            .oneOf(['athlete', 'coach', 'scout', 'fan'], 'Please select a valid user type.')
            .required('Please select your user type.'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: '',
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values) => {
            setNetworkError(''); // Clear any previous network errors
            // setSubmitSuccess(false); // No longer needed

            try {
                // Determine the redirection path based on userType (now using absolute paths)
                const redirectToPath = DASHBOARD_ROUTES[values.userType] || '/dashboard';

                // Call the signup function from AuthContext.
                // AuthContext's signup handles saving to localStorage, updating AuthContext state,
                // and performing the navigation after successful "registration".
                await signup(values, redirectToPath); 
                
                // If signup function resolves successfully, it means navigation has been handled
                // by the AuthContext, so no local 'submitSuccess' state or navigation is needed here.
                console.log('Signup initiated, AuthContext is handling redirection.');

            } catch (err) {
                // If signup function rejects (throws an error), catch it here and display.
                setNetworkError(err.message || 'Registration failed. Please try again.');
                console.error('Sign up error:', err);
                // setSubmitSuccess(false); // Ensure success message is not shown on error
            }
        },
    });

    // Helper for user type selection to update Formik's state
    const handleUserTypeSelect = (type) => {
        formik.setFieldValue('userType', type);
        formik.setFieldTouched('userType', true, false); // Mark as touched to show errors immediately if invalid
    };

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

                    <div className="mt-10 text-center text-white text-lg font-semibold italic max-w-xs mx-auto">
                        "Connecting African high school talent to unprecedented opportunities."
                    </div>

                    <div className="space-y-3 max-w-xs mx-auto mt-8">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-white/50 rounded-md shadow-sm text-white bg-transparent hover:bg-white/10 transition-colors"
                            aria-label="Continue with Google"
                        >
                            <FaGoogle className="mr-3 text-lg" /> Continue with Google
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center px-4 py-2 border border-white/50 rounded-md shadow-sm text-white bg-transparent hover:bg-white/10 transition-colors"
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
                    <div className="mt-8 text-center text-white">
                        <span className="relative inline-block text-white px-3 mb-4 text-lg font-semibold block">
                            Or Fill in the form below
                        </span>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-yellow-300 ">Already have an account?</p>
                        <Link to="/login" className="font-semibold text-gamepulse-yellow hover:text-amber-500 transition-colors">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column (Sign Up Form) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200">
                    <div className="text-center mb-8">
                        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 font-heading">
                            Join Us
                        </h1>
                        <h2 className="mt-2 text-md md:text-lg text-gamepulse-blue font-semibold">
                            Your Digital Bridge to Opportunity.
                        </h2>
                    </div>

                    {/* Form will always be rendered, errors are handled within */}
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Core Registration Form */}
                        <div>
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your full name"
                                    className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                    aria-invalid={formik.touched.fullName && formik.errors.fullName ? "true" : "false"}
                                    aria-describedby={formik.touched.fullName && formik.errors.fullName ? "fullName-error" : undefined}
                                />
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <p id="fullName-error" className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter your email address"
                                    className={`block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
                                    aria-describedby={formik.touched.email && formik.errors.email ? "email-error" : undefined}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p id="email-error" className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
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
                                        placeholder="Create a password"
                                        className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        aria-invalid={formik.touched.password && formik.errors.password ? "true" : "false"}
                                        aria-describedby={formik.touched.password && formik.errors.password ? "password-error" : undefined}
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
                                    <p id="password-error" className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Re-enter your password"
                                        className={`block w-full px-4 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                        aria-invalid={formik.touched.confirmPassword && formik.errors.confirmPassword ? "true" : "false"}
                                        aria-describedby={formik.touched.confirmPassword && formik.errors.confirmPassword ? "confirmPassword-error" : undefined}
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
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        {/* User Type Selection */}
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
                                            ${formik.values.userType === userTypeOption.type
                                                ? 'border-gamepulse-blue ring-2 ring-gamepulse-blue bg-gamepulse-blue/5 shadow-md'
                                                : 'border-gray-300 hover:border-gamepulse-blue/50 hover:shadow-sm'
                                            }`}
                                    >
                                        <userTypeOption.icon className={`text-3xl mb-2 ${formik.values.userType === userTypeOption.type ? 'text-gamepulse-blue' : 'text-gray-500'}`} />
                                        <p className="font-semibold text-gray-800 mb-1">{userTypeOption.label}</p>
                                        <p className="text-xs text-gray-600">{userTypeOption.description}</p>
                                    </button>
                                ))}
                            </div>
                            {formik.touched.userType && formik.errors.userType && (
                                <p className="mt-2 text-sm text-red-600 text-center">{formik.errors.userType}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gamepulse-blue text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        {/* Error Handling */}
                        {networkError && (
                            <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center">
                                <FaExclamationCircle className="mr-2" /> {networkError}
                            </p>
                        )}

                        {/* Footer */}
                        <div className="mt-10 text-center text-sm text-gray-500 space-x-4">
                            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
                            <Link to="/help-center" className="hover:underline">Help & Support</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;