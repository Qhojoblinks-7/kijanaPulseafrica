// src/pages/AthleteProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAthleteProfile } from '../data/allAthleteProfilesData';
import ProfileHeader from '../components/AthleteProfile/ProfileHeader';
import MyAboutMe from '../components/MyProfile/MyAboutMe';
import MediaGallery from '../components/MyProfile/MyHighlightsGallery';
import CareerHistory from '../components/AthleteProfile/CareerHistory';
import SocialMediaLinks from '../components/MyProfile/MyConnectionsAndContact'
import KeyAttributes from '../components/AthleteProfile/KeyAttributes';
import UpcomingEvents from '../components/AthleteProfile/UpcomingEvents'; // IMPORT THE NEW COMPONENT

const AthleteProfilePage = () => {
  const { id } = useParams();
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
        const data = getAthleteProfile(id);
        if (data) {
          // Ensure sportType is lowercase for consistent use in components if needed
          const transformedData = {
            ...data,
            sportType: data.sportType ? data.sportType.toLowerCase() : undefined,
          };
          setAthlete(transformedData);
        } else {
          setError('Athlete not found.');
        }
      } catch (err) {
        setError('Failed to load athlete data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthlete();
  }, [id]);

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
      <UpcomingEvents events={athlete.upcomingEvents} /> {/* ADD THE NEW UPCOMING EVENTS COMPONENT HERE */}
      <SocialMediaLinks
        icons={athlete.icons}
        socialMediaVisibility={athlete.contactSettings?.socialMediaVisibility}
      />
      {/* You can add more components below here */}
    </div>
  );
};

export default AthleteProfilePage;