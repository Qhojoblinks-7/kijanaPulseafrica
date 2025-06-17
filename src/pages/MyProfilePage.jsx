// src/pages/MyProfilePage.jsx
import React, { useState, useEffect } from 'react'; // Import useState
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import MyPerformanceMetrics from '../components/MyProfile/MyPerformanceMetrics';
import MyHighlightsGallery from '../components/MyProfile/MyHighlightsGallery';
import MyAboutMe from '../components/MyProfile/MyAboutMe';
import MyConnectionsAndContact from '../components/MyProfile/MyConnectionsAndContact';
import MyProfileFooterNav from '../components/MyProfile/MyProfileFooterNav';
import { allAthleteProfilesData } from '../data/allAthleteProfilesData'; // Import all athlete data

const MyProfilePage = () => {
  const [athlete, setAthlete] = useState(null); // Use state to manage athlete data

  useEffect(() => {
    // In a real application, you'd get the current user's ID from an auth context or API
    // For this example, we'll hardcode an ID that exists in allAthleteProfilesData
    const myAthleteId = 'ama_owusu'; // <-- CHANGE THIS ID to 'kwame_mensah', 'akua_ansah', etc., to test other profiles

    const foundAthlete = allAthleteProfilesData.find(a => a.id === myAthleteId);

    if (foundAthlete) {
      // Transform the found athlete data to ensure 'sportType' is lowercase
      const transformedAthlete = {
        ...foundAthlete,
        sportType: foundAthlete.sportType ? foundAthlete.sportType.toLowerCase() : undefined,
      };
      setAthlete(transformedAthlete);
    } else {
      console.warn(`MyProfilePage: Athlete with ID '${myAthleteId}' not found in data.`);
      setAthlete(null); // Or set an error state
    }

    window.scrollTo(0, 0); // Scroll to top on page load
  }, []); // Empty dependency array means this effect runs once on mount

  // Update document title when athlete data is available
  useEffect(() => {
    if (athlete && athlete.fullName) {
      document.title = `My Profile | ${athlete.fullName} | GamePulse Africa`;
    } else {
      document.title = `My Profile | GamePulse Africa`;
    }
  }, [athlete]); // Depend on athlete state

  if (!athlete) {
    // Handle loading or error state
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600 bg-gray-900 text-white">
        Loading your profile...
      </div>
    );
  }

  // Debugging line: Log the athlete object being used BEFORE passing to ProfileHeader
  console.log("MyProfilePage: athlete data before passing to ProfileHeader:", athlete);

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