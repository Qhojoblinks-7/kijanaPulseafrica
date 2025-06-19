// src/pages/AthleteProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAthleteProfile } from '../data/allAthleteProfilesData'; // This function needs to search by slug
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import MyAboutMe from '../components/AthleteProfile/MyAboutMe';
import MediaGallery from '../components/AthleteProfile/MediaGallery';
import CareerHistory from '../components/AthleteProfile/CareerHistory';
// import SocialMediaLinks from '../components/AthleteProfile/SocialMediaLinks';
import KeyAttributes from '../components/AthleteProfile/KeyAttributes';

const AthleteProfilePage = () => {
  const { slug } = useParams(); // <--- CHANGE THIS LINE to use 'slug'
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate an API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // Pass the slug to getAthleteProfile
        const data = getAthleteProfile(slug); // <--- CHANGE THIS LINE to pass 'slug'

        if (data) {
          const transformedData = {
            ...data,
            sportType: data.sportType ? data.sportType.toLowerCase() : undefined,
          };
          setAthlete(transformedData);
        } else {
          // The error message should now reflect 'slug'
          setError(`Athlete with slug '${slug}' not found.`);
        }
      } catch (err) {
        setError('Failed to load athlete data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthlete();
  }, [slug]); // <--- Re-run effect when 'slug' changes

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
      <MyAboutMe athlete={athlete} />
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