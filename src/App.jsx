// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ContactUsPage from './pages/ContactUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AthleteProfilePage from './pages/AthleteProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserDashboardPage from './pages/UserDashboardPage';
import { AuthProvider } from './context/AuthContext';

import ViewHighlightsPage from './components/highlights/ViewHighlightsPage';
import UploadHighlightPage from './pages/UploadHighlightPage';
import AthleteSearchPage from './pages/AthleteSearchPage';
import LiveMatchesDashboard from './components/Dashboard/LiveMatchesDashboard';
import MatchDetailsPage from './pages/MatchDetailsPage';

import UpcomingGamesPage from './pages/UpcomingGamesPage';
import AboutUsPage from './pages/AboutUsPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HelpAndSupportPage from './pages/HelpAndSupportPage'; // Check this path consistency

import { DarkModeProvider } from './context/DarkModeContext';
import SettingsPage from './pages/SettingsPage';
import MyCalendarPage from './pages/MyCalendarPage';
import UpcomingEvents from './components/AthleteProfile/UpcomingEvents';
import DigitalClassroomPage from './pages/DigitalClassroomPage';

// NEW IMPORT: NotificationsPage and MessagesPage
import NotificationsPage from './pages/NotificationsPage';
import MessagingPage from './pages/MessagingPage'; // You will need to create this page


function App() {
  const location = useLocation();

  useEffect(() => {
    console.log('App.jsx - Current path:', location.pathname);
    console.log('App.jsx - Location object:', location);
  }, [location]);

  const noHeaderPaths = [
    '/upload-highlight',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password'
  ];

  const shouldHideHeader = noHeaderPaths.some(path => location.pathname.startsWith(path));
  const isHighlightsPage = location.pathname.startsWith('/highlights'); // Assuming /highlights itself has no header
  const hideGlobalHeader = shouldHideHeader || isHighlightsPage;

  return (
    <DarkModeProvider>
      <AuthProvider>
        {!hideGlobalHeader && <Header />}

        <div className={`min-h-screen flex flex-col ${!hideGlobalHeader ? 'pt-16 md:pt-6' : ''}`}>
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />

              {/* Authentication Routes */}
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/help" element={<HelpAndSupportPage />} /> {/* Consistent path */}


              {/* Dashboard & Profile Routes */}
              <Route path="/my-profile/:slug" element={<MyProfilePage />} />
              <Route path="/my-profile" element={<MyProfilePage />} /> {/* For generic /my-profile access */}
              <Route path="/athlete/:id" element={<AthleteProfilePage />} /> {/* For viewing other athletes by ID */}

              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/coach-dashboard" element={<UserDashboardPage />} />
              <Route path="/scout-dashboard" element={<UserDashboardPage />} />
              <Route path="/fan-dashboard" element={<UserDashboardPage />} />


              {/* Highlights */}
              <Route path="/highlights" element={<ViewHighlightsPage />} />
              <Route path="/upload-highlight" element={<UploadHighlightPage />} />

              {/* NEW: Notifications and Messages Pages */}
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<MessagingPage />} /> {/* Create this page */}


              {/* Other Features */}
              <Route path="/live-matches" element={<LiveMatchesDashboard />} />
              <Route path="/discover-talent" element={<AthleteSearchPage />} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/features" element={<div>Features Page (Implement Me)</div>} />
              <Route path="/digital-classroom" element={<DigitalClassroomPage />}/>
              <Route path="/download-app" element={<div>Download App Page (Implement Me)</div>} />
              <Route path="/notifications" element={<div>Notifications Page (Implement Me)</div>} /> {/* Already defined above */}
              <Route path="/search" element={<div>Mobile Search Page (Implement Me)</div>} />
              <Route path="/messages" element={<div>Messages Page (Implement Me)</div>} /> {/* Already defined above */}
              <Route path="/reports" element={<div>Scouting Reports Page (Implement Me)</div>} />
              <Route path="/upcoming-matches" element={<UpcomingGamesPage />} />
              <Route path="/latest-highlights" element={<div>Latest Highlights Page (Implement Me)</div>} />

              {/* Coach/Team Specific Routes */}
              <Route path="/my-teams" element={<div>My Teams (Implement Me)</div>} />
              <Route path="/my-teams/add-athlete" element={<div>Add Athlete to Team Page (Implement Me)</div>} />
              <Route path="/my-teams/analytics" element={<div>Team Analytics Page (Implement Me)</div>} />
              <Route path="/match-reporting/new" element={<div>New Match Report Page (Implement Me)</div>} />

              {/* Calendar & Events */}
              <Route path="/my-calendar/:id" element={<MyCalendarPage />} /> {/* This implies a specific calendar by ID */}
              <Route path="/my-calendar" element={<MyCalendarPage />} /> {/* Generic calendar for logged in user if /my-calendar/:id is not always needed */}
              <Route path="/my-calendar/add-event" element={<UpcomingEvents />} />

              {/* Match Details & Analytics */}
              <Route path="/match-details/:matchId" element={<MatchDetailsPage />} />
              <Route path="/analytics/regions" element={<div>Regional Analytics Page (Implement Me)</div>} />

              {/* Catch-all for 404 - This route should always be last */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700 p-4">
                  <h2 className="text-4xl font-extrabold text-red-600 mb-4">404</h2>
                  <p className="text-xl font-semibold mb-2">Page Not Found</p>
                  <p className="text-lg text-center">The page you're looking for doesn't exist or has been moved.</p>
                  <Link to="/" className="mt-6 px-6 py-3 bg-gamepulse-orange text-white rounded-md font-semibold hover:bg-orange-700 transition-colors">
                    Go to Homepage
                  </Link>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;