// src/App.jsx

import React, { useEffect } from 'react'; // Import useEffect
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
import HelpAndSupportPage from './pages/HelpAndSupportPage';

// NEW IMPORT: DarkModeProvider
import { DarkModeProvider } from './context/DarkModeContext';
import SettingsPage from './pages/SettingsPage';
import MyCalendarPage from './pages/MyCalendarPage';
import UpcomingEvents from './components/AthleteProfile/UpcomingEvents';
import DigitalClassroomPage from './pages/DigitalClassroomPage';


function App() {
  const location = useLocation();

  // Add console.log to see the current path
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
  const isHighlightsPage = location.pathname.startsWith('/highlights');
  const hideGlobalHeader = shouldHideHeader || isHighlightsPage;

  return (
    // Wrap with DarkModeProvider
    <DarkModeProvider>
      <AuthProvider>
        {/* Conditionally render the global Header */}
        {!hideGlobalHeader && <Header />}

        <div className={`min-h-screen flex flex-col ${!hideGlobalHeader ? 'pt-16 md:pt-6' : ''}`}>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />

              <Route path="/athlete/:id" element={<AthleteProfilePage />} />

              <Route path="/my-profile/:id" element={<MyProfilePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/profile" element={<AthleteProfilePage />} />
              <Route path="/coach-dashboard" element={<UserDashboardPage />} />
              <Route path="/scout-dashboard" element={<UserDashboardPage />} />
              <Route path="/fan-dashboard" element={<UserDashboardPage />} />

              <Route path="/highlights" element={<ViewHighlightsPage />} />
              <Route path="/upload-highlight" element={<UploadHighlightPage />} />

              <Route path="/live-matches" element={<LiveMatchesDashboard />} />
              <Route path="/discover-talent" element={<AthleteSearchPage />} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/help" element={<HelpAndSupportPage />} />
              <Route path="/features" element={<div>Features Page (Implement Me)</div>} />
              <Route path="/digital-classroom" element={<DigitalClassroomPage />}/>
              <Route path="/download-app" element={<div>Download App Page (Implement Me)</div>} />
              <Route path="/notifications" element={<div>Notifications Page (Implement Me)</div>} />
              <Route path="/search" element={<div>Mobile Search Page (Implement Me)</div>} />
              <Route path="/messages" element={<div>Messages Page (Implement Me)</div>} />
              <Route path="/reports" element={<div>Scouting Reports Page (Implement Me)</div>} />
              <Route path="/upcoming-matches" element={<UpcomingGamesPage />} />
              <Route path="/latest-highlights" element={<div>Latest Highlights Page (Implement Me)</div>} />

              <Route path="/my-teams" element={<div>My Teams (Implement Me)</div>} />
              <Route path="/my-teams/add-athlete" element={<div>Add Athlete to Team Page (Implement Me)</div>} />
              <Route path="/my-teams/analytics" element={<div>Team Analytics Page (Implement Me)</div>} />
              <Route path="/match-reporting/new" element={<div>New Match Report Page (Implement Me)</div>} />
              <Route path="/my-calendar/:id" element={<MyCalendarPage />} />
              <Route path="/my-calendar/add-event" element={<UpcomingEvents />} />
              <Route path="/match-details/:matchId" element={<MatchDetailsPage />} />
              <Route path="/analytics/regions" element={<div>Regional Analytics Page (Implement Me)</div>} />

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


// // src/App.jsx
// import React, { useState } from 'react';
// import ProfileHeader from './components/AthleteProfile/ProfileHeader'; // Adjust path if needed
// import { allAthleteProfilesData } from './data/allAthleteProfilesData'; // Import the new data

// function App() {
//   const [currentAthleteIndex, setCurrentAthleteIndex] = useState(0); // Start with the first athlete

//   const currentAthlete = allAthleteProfilesData[currentAthleteIndex];

//   const goToPreviousAthlete = () => {
//     setCurrentAthleteIndex((prevIndex) =>
//       prevIndex === 0 ? allAthleteProfilesData.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextAthlete = () => {
//     setCurrentAthleteIndex((prevIndex) =>
//       prevIndex === allAthleteProfilesData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 font-sans">
//       {/* Navigation Buttons */}
//       <div className="sticky top-0 z-50 p-4 bg-gray-900 shadow-lg flex justify-center space-x-4">
//         <button
//           onClick={goToPreviousAthlete}
//           className="px-6 py-2 bg-gamepulse-orange text-white font-bold rounded-lg hover:bg-gamepulse-yellow transition duration-300 ease-in-out"
//         >
//           &larr; Previous Athlete
//         </button>
//         <button
//           onClick={goToNextAthlete}
//           className="px-6 py-2 bg-gamepulse-orange text-white font-bold rounded-lg hover:bg-gamepulse-yellow transition duration-300 ease-in-out"
//         >
//           Next Athlete &rarr;
//         </button>
//       </div>

//       {/* Athlete Profile Header */}
//       {currentAthlete ? (
//         <ProfileHeader athlete={currentAthlete} />
//       ) : (
//         <div className="text-center py-16 text-gray-400">No athlete data available.</div>
//       )}

//       {/* You can add more sections of your page here */}
//       <div className="p-8 text-white text-center">
//         <h2 className="text-2xl font-bold mb-4">More Athlete Details Go Here</h2>
//         <p className="text-gray-400">
//           This is where other components like stats charts, career highlights, news, etc., would be placed.
//         </p>
//         <div className="h-64 bg-gray-700 mt-8 rounded-lg flex items-center justify-center">
//             <p>Additional Content Area</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
