// src/pages/AthleteProfilePage.jsx
import React, { useEffect, useState } from 'react'; // Import useState for managing component state
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';

// You'll need to define dummyAthleteData with the new structure or import it
// We'll import it dynamically inside useEffect for a more realistic "fetch" simulation
// import { dummyAthleteData, dummySimilarAthletes, dummySchoolAthletes } from '../data/athleteData';


const AthleteProfilePage = () => {
  // 1. STATE VARIABLES:
  //    - `athlete`: Holds the profile data once loaded. Starts as null.
  //    - `loading`: True when data is being fetched, false otherwise.
  //    - `error`: Stores any error message if fetching fails.
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect HOOK:
  //    - This runs side effects (like data fetching) after rendering.
  //    - The empty dependency array `[]` means it runs only once after the initial render (like componentDidMount).
  useEffect(() => {
    console.log("useEffect started: Initializing data fetch process.");
    window.scrollTo(0, 0); // Scroll to top on component mount

    // Asynchronous function to simulate fetching athlete data
    const fetchAthleteProfile = async () => {
      setLoading(true); // Indicate that data loading has started
      setError(null);   // Clear any previous errors

      try {
        console.log("Attempting to dynamically import dummyAthleteData...");
        // Simulate API call or dynamic import of dummy data
        // In a real application, you would replace this with an actual API call, e.g.:
        // const response = await fetch(`/api/athletes/${athleteId}`);
        // if (!response.ok) throw new Error('Network response was not ok.');
        // const data = await response.json();

        // For now, we'll simulate a network request delay and then load the dummy data
        const { dummyAthleteData, dummySimilarAthletes, dummySchoolAthletes } = await import('../data/athleteData');
        console.log("Dummy data imported successfully. Simulating network delay...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second network delay

        // Check if the imported data is valid before setting state
        if (dummyAthleteData && dummyAthleteData.id) { // Basic check for data validity
          setAthlete(dummyAthleteData);
          document.title = `${dummyAthleteData.fullName}'s Profile | GamePulse Africa`;
          console.log("Athlete data SET in state:", dummyAthleteData);
        } else {
          // Handle case where dummy data might be empty or invalid
          const msg = "Athlete data not found or invalid in dummyAthleteData.js.";
          setError(msg);
          console.error("Data validation failed:", msg);
        }
      } catch (err) {
        // Catch any errors during import or processing
        const errMsg = `Failed to load athlete profile: ${err.message}`;
        console.error("Error during data fetch:", err);
        setError(errMsg);
      } finally {
        setLoading(false); // Always set loading to false once fetching is complete, regardless of success or failure
        console.log("Data fetch process finished. Loading state set to false.");
      }
    };

    fetchAthleteProfile(); // Call the async function
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // 3. CONDITIONAL RENDERING:
  //    - Based on the `loading` and `error` states, show different UI feedback.
  if (loading) {
    console.log("Rendering: Loading state active.");
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gamepulse-blue">
        <p>Loading athlete profile...</p>
        {/* You could add a simple spinner here */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gamepulse-blue ml-3"></div>
      </div>
    );
  }

  if (error) {
    console.log("Rendering: Error state active.", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        <p>Error: {error}</p>
        <p className="text-sm text-gray-500 mt-2">Check console for more details.</p>
      </div>
    );
  }

  // If not loading and no error, but athlete data is still null (shouldn't happen if error handling is robust)
  if (!athlete) {
    console.log("Rendering: No athlete data available after loading.");
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        <p>No athlete profile to display. (Data was not set successfully)</p>
      </div>
    );
  }

  // 4. MAIN RENDER:
  //    - If `athlete` data is available, render the main profile page.
  console.log("Rendering: Athlete data available. Passing to ProfileHeader.", athlete);
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Profile Header Section - Passes the loaded athlete data */}
      <ProfileHeader athlete={athlete} />

      {/* Main content sections - These will be implemented in future steps */}
      <div className="relative z-0">
        {/* Placeholder for other sections */}
        {/*
        <PerformanceMetrics athlete={athlete} />
        <HighlightsGallery athlete={athlete} />
        <AboutMe athlete={athlete} />
        <ConnectOpportunities athlete={athlete} />
        <ExploreMoreTalent
          similarAthletes={dummySimilarAthletes} // These would also need to be managed by state if dynamically fetched
          schoolAthletes={dummySchoolAthletes}
          athleteName={athlete.fullName}
          athleteIcons={athlete.icons}
        />
        */}
      </div>
    </div>
  );
};

export default AthleteProfilePage;