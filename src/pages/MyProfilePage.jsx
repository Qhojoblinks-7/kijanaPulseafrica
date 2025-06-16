// src/pages/MyProfilePage.jsx
import React, { useEffect } from 'react';
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import MyPerformanceMetrics from '../components/MyProfile/MyPerformanceMetrics';
import MyHighlightsGallery from '../components/MyProfile/MyHighlightsGallery';
import MyAboutMe from '../components/MyProfile/MyAboutMe';
import MyConnectionsAndContact from '../components/MyProfile/MyConnectionsAndContact';
import MyProfileFooterNav from '../components/MyProfile/MyProfileFooterNav';
import { myAthleteProfileData } from '../data/myProfileData';

const MyProfilePage = () => {
  // In a real application, you would fetch the athlete's own data
  // For this example, we'll use dummy data directly.
  const athlete = myAthleteProfileData;

  // Debugging line: Log the athlete object being used
  console.log("MyProfilePage: athlete data before passing to ProfileHeader:", athlete);


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    // Ensure athlete.fullName exists before trying to use it
    if (athlete && athlete.fullName) {
        document.title = `My Profile | ${athlete.fullName} | GamePulse Africa`; // Set page title
    } else {
        document.title = `My Profile | GamePulse Africa`; // Fallback title
    }
  }, [athlete]); // Depend on the entire athlete object, not just fullName, in case it changes or is initially null

  if (!athlete) {
    // Handle loading or error state - though with direct import, this might not be hit if data is always present
    console.log("MyProfilePage: Athlete data is null or undefined.");
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading your profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Profile Header Section */}
      <ProfileHeader athlete={athlete} />

      {/* Main content sections, nested within a consistent container for spacing */}
      <div className="relative z-0">
        <MyPerformanceMetrics athlete={athlete} />
        <MyHighlightsGallery athlete={athlete} />
        <MyAboutMe athlete={athlete} />
        <MyConnectionsAndContact athlete={athlete} />
        <MyProfileFooterNav athleteIcons={athlete.icons} />
      </div>

      {/* A global footer component would typically be here */}
    </div>
  );
};

export default MyProfilePage;