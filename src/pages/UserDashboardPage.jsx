// src/pages/UserDashboardPage.jsx
import React, { useEffect } from 'react'; // Removed useState as it's no longer directly used for user
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

// Import specific dashboard components
import AthleteDashboard from '../components/Dashboard/AthleteDashboard';
import CoachDashboard from '../components/Dashboard/CoachDashboard';
import ScoutDashboard from '../components/Dashboard/ScoutDashboard';
import FanParentDashboard from '../components/Dashboard/FanParentDashboard';

import { FaVideo, FaPlayCircle, FaSearch, FaGraduationCap, FaCog } from 'react-icons/fa';

const UserDashboardPage = () => {
  // Correctly destructure currentUser from useAuth
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Effect to handle redirection if not logged in or update document title
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load

    if (!isLoggedIn) {
      // If not logged in (according to AuthContext), redirect to login page
      navigate('/login');
    } else if (currentUser) {
      // If logged in and user data is available, set the document title
      // Ensure currentUser.fullName exists before splitting
      const userName = currentUser.fullName ? currentUser.fullName.split(' ')[0] : 'User';
      document.title = `Dashboard | ${userName} | GamePulse Africa`;
    }
  }, [isLoggedIn, currentUser, navigate]); // Depend on isLoggedIn and currentUser to re-run

  // Render loading state while authentication state is being determined or user data fetched
  // Use currentUser instead of user
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  // Render dashboard content based on user type from AuthContext
  const renderDashboardContent = () => {
    switch (currentUser.userType) { // Use currentUser.userType
      case 'coach':
        return <CoachDashboard user={currentUser} />;   // Pass currentUser as 'user' prop
      case 'scout':
        return <ScoutDashboard user={currentUser} />;   // Pass currentUser as 'user' prop
      case 'fan':
      case 'parent': // Also handle 'parent' as a fan type for dashboard purposes
        return <FanParentDashboard user={currentUser} />; // Pass currentUser as 'user' prop
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Unsupported User Type</h2>
            <p className="mt-4 text-gray-600">
              Your account type is not recognized. Please contact support.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-8 pb-16"> {/* Increased padding for overall page */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 font-heading text-center">
          Hello, {currentUser.fullName ? currentUser.fullName.split(' ')[0] : 'User'}! {/* Use currentUser.fullName */}
        </h1>

        {renderDashboardContent()}

        {/* Global Quick Actions / Navigation (Optional, could be in a sidebar/footer nav too) */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Link to="/highlights" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-center">
              <FaVideo className="text-gamepulse-blue text-3xl mb-2" />
              <span className="text-sm font-semibold text-gray-700">All Highlights</span>
            </Link>
            <Link to="/live-matches" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-center">
              <FaPlayCircle className="text-gamepulse-orange text-3xl mb-2" />
              <span className="text-sm font-semibold text-gray-700">Live Matches</span>
            </Link>
            <Link to="/discover-talent" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-center">
              <FaSearch className="text-gamepulse-teal text-3xl mb-2" />
              <span className="text-sm font-semibold text-gray-700">Discover Talent</span>
            </Link>
            <Link to="/digital-classroom" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-center">
              <FaGraduationCap className="text-gamepulse-blue text-3xl mb-2" />
              <span className="text-sm font-semibold text-gray-700">Digital Classroom</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-center">
              <FaCog className="text-gray-500 text-3xl mb-2" />
              <span className="text-sm font-semibold text-gray-700">Settings</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboardPage;