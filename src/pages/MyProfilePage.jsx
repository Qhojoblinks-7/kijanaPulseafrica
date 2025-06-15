// src/pages/MyProfilePage.jsx
import React, { useEffect } from 'react';
import MyProfileHeader from '../components/MyProfile/MyProfileHeader';
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    document.title = `My Profile | ${athlete.fullName} | GamePulse Africa`; // Set page title
  }, [athlete.fullName]);

  if (!athlete) {
    // Handle loading or error state
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading your profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Profile Header Section */}
      <MyProfileHeader athlete={athlete} />

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