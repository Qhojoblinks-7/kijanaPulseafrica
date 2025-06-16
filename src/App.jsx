// src/App.jsx

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
// Import AuthProvider
import { AuthProvider } from './context/AuthContext';

// Import the Highlights components
import ViewHighlightsPage from './components/highlights/ViewHighlightsPage';
// Import the new UploadHighlightPage
import UploadHighlightPage from './pages/UploadHighlightPage';
import AthleteSearchPage from './pages/AthleteSearchPage';
import LiveMatchesDashboard from './components/Dashboard/LiveMatchesDashboard';
import MatchDetailsPage from './pages/MatchDetailsPage';

// NEW IMPORT: UpcomingGamesPage
import UpcomingGamesPage from './pages/UpcomingGamesPage';


function App() {
  const location = useLocation();

  // Determine if the current path is a highlights-related page that should NOT have the global Header
  // This now includes '/upload-highlight'
  const isHighlightsOrUploadPage = location.pathname.startsWith('/highlights') || location.pathname === '/upload-highlight';

  return (
    <AuthProvider>
      {/* Conditionally render the global Header */}
      {!isHighlightsOrUploadPage && <Header />}

      <div className={`min-h-screen flex flex-col ${!isHighlightsOrUploadPage ? 'pt-16 md:pt-6' : ''}`}>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<div>About Us Page (Implement Me)</div>} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

            <Route path="/athlete-profile" element={<AthleteProfilePage />} />
            <Route path="/my-profile" element={<MyProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<div>Forgot Password Page (Implement Me)</div>} />

            {/* --- User-specific Dashboard Routes --- */}
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/athlete-dashboard" element={<UserDashboardPage />} />
            <Route path="/coach-dashboard" element={<UserDashboardPage />} />
            <Route path="/scout-dashboard" element={<UserDashboardPage />} />
            <Route path="/fan-dashboard" element={<UserDashboardPage />} />

            {/* --- Highlights Hub Routes --- */}
            <Route path="/highlights" element={<ViewHighlightsPage />} />


            {/* --- Quick Links & Feature Pages --- */}
            <Route path="/live-matches" element={<LiveMatchesDashboard />} />
            <Route path="/discover-talent" element={<AthleteSearchPage />} />
            <Route path="/settings" element={<div>Settings (Implement Me)</div>} />
            <Route path="/help" element={<div>Help Center (Implement Me)</div>} />
            <Route path="/features" element={<div>Features Page (Implement Me)</div>} />
            <Route path="/digital-classroom" element={<div>Digital Classroom (Implement Me)</div>} />
            <Route path="/download-app" element={<div>Download App Page (Implement Me)</div>} />
            <Route path="/notifications" element={<div>Notifications Page (Implement Me)</div>} />
            <Route path="/search" element={<div>Mobile Search Page (Implement Me)</div>} />
            <Route path="/upload-highlight" element={<UploadHighlightPage />} />
            <Route path="/messages" element={<div>Messages Page (Implement Me)</div>} />
            <Route path="/reports" element={<div>Scouting Reports Page (Implement Me)</div>} />
            {/* UPDATED ROUTE: Pointing to the new UpcomingGamesPage component */}
            <Route path="/upcoming-matches" element={<UpcomingGamesPage />} />
            <Route path="/latest-highlights" element={<div>Latest Highlights Page (Implement Me)</div>} />


            {/* --- Coach Specific Pages --- */}
            <Route path="/my-teams" element={<div>My Teams (Implement Me)</div>} />
            <Route path="/my-teams/add-athlete" element={<div>Add Athlete to Team Page (Implement Me)</div>} />
            <Route path="/my-teams/analytics" element={<div>Team Analytics Page (Implement Me)</div>} />
            <Route path="/match-reporting/new" element={<div>New Match Report Page (Implement Me)</div>} />
            <Route path="/my-calendar" element={<div>My Calendar (Implement Me)</div>} />
            <Route path="/my-calendar/add-event" element={<div>Add Calendar Event Page (Implement Me)</div>} />
            <Route path="/match-details/:matchId" element={<MatchDetailsPage />} />


            {/* --- Scout Specific Pages --- */}
            <Route path="/analytics/regions" element={<div>Regional Analytics Page (Implement Me)</div>} />
            <Route path="/athlete-profile/:id" element={<AthleteProfilePage />} />


            {/* --- Catch-all for 404 Not Found --- */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
                <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
                <p className="mt-2">The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;