// src/pages/AthleteProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAthleteProfile } from '../data/allAthleteProfilesData';
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import MyAboutMe from '../components/MyProfile/MyAboutMe'; // Renamed from AboutMe to MyAboutMe to match new component structure
import MediaGallery from '../components/MyProfile/MyHighlightsGallery';
import CareerHistory from '../components/AthleteProfile/CareerHistory';
// import SocialMediaLinks from '../components/AthleteProfile/SocialMediaLinks';
import KeyAttributes from '../components/AthleteProfile/KeyAttributes';

const AthleteProfilePage = () => {
  // useParams() extracts the 'slug' from the URL, e.g., 'chisom-ugo' from /athlete/chisom-ugo
  const { slug } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate an API call delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use the getAthleteProfile function to find the athlete by slug
        const data = getAthleteProfile(slug);

        if (data) {
          // Ensure sportType is lowercase for consistency in rendering/styling
          const transformedData = {
            ...data,
            sportType: data.sportType ? data.sportType.toLowerCase() : undefined,
          };
          setAthlete(transformedData);
        } else {
          // Set error if no athlete found for the given slug
          setError(`Athlete with slug '${slug}' not found.`);
        }
      } catch (err) {
        // Catch any potential errors during fetching
        setError('Failed to load athlete data.');
        console.error("Error fetching athlete profile:", err);
      } finally {
        // Always set loading to false once fetching is complete
        setLoading(false);
      }
    };

    // Call the fetch function when the component mounts or the slug changes
    fetchAthlete();
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [slug]); // Dependency array: re-run this effect if the slug in the URL changes

  // Update document title based on athlete data
  useEffect(() => {
    if (athlete && athlete.fullName) {
      document.title = `${athlete.fullName} | Athlete Profile | GamePulse Africa`;
    } else {
      document.title = `Athlete Profile | GamePulse Africa`;
    }
  }, [athlete]);


  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400 bg-gray-900 min-h-screen">
        Loading athlete profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500 bg-gray-900 min-h-screen">
        Error: {error}
      </div>
    );
  }

  // Fallback if athlete data is somehow null after loading (should be covered by error state)
  if (!athlete) {
    return (
      <div className="text-center py-16 text-gray-500 bg-gray-900 min-h-screen">
        No athlete data available.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-20">
      <ProfileHeader athlete={athlete} />
      <MyAboutMe athlete={athlete} /> {/* Using MyAboutMe */}
      <MediaGallery media={athlete.media} />
      <CareerHistory history={athlete.careerHistory} />
      <KeyAttributes attributes={athlete.keyAttributes} />
      {/* <SocialMediaLinks
        icons={athlete.icons}
        socialMediaVisibility={athlete.contactSettings?.socialMediaVisibility}
      /> */}
    </div>
  );
};

export default AthleteProfilePage;