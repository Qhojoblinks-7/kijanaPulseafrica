// src/pages/AthleteProfilePage.jsx
import React, { useEffect } from 'react';
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import PerformanceMetrics from '../components/AthleteProfile/PerformanceMetrics';
import HighlightsGallery from '../components/AthleteProfile/HighlightsGallery';
import AboutMe from '../components/AthleteProfile/AboutMe';
import ConnectOpportunities from '../components/AthleteProfile/ConnectOpportunities';
import ExploreMoreTalent from '../components/AthleteProfile/ExploreMoreTalent';
import { dummyAthleteData, dummySimilarAthletes, dummySchoolAthletes } from '../data/athleteData';

const AthleteProfilePage = () => {
  // In a real application, you would fetch athlete data based on a URL parameter (e.g., athlete ID)
  // For this example, we'll use dummy data directly.
  const athlete = dummyAthleteData;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    document.title = `${athlete.fullName}'s Profile | GamePulse Africa`; // Set page title
  }, [athlete.fullName]);

  if (!athlete) {
    // Handle loading or error state
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading athlete profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Profile Header Section */}
      <ProfileHeader athlete={athlete} />

      {/* Main content sections, nested within a consistent container for spacing */}
      <div className="relative z-0"> {/* Ensure content is above the header's -mt values */}
        <PerformanceMetrics athlete={athlete} />
        <HighlightsGallery athlete={athlete} />
        <AboutMe athlete={athlete} />
        <ConnectOpportunities athlete={athlete} />
        <ExploreMoreTalent
          similarAthletes={dummySimilarAthletes}
          schoolAthletes={dummySchoolAthletes}
          athleteName={athlete.fullName}
          athleteIcons={athlete.icons} // Pass icons if needed by children of ExploreMoreTalent
        />
      </div>

      {/* A global footer component would typically be here */}
    </div>
  );
};

export default AthleteProfilePage;