import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAthleteProfile } from '../data/allAthleteProfilesData'; // ONLY import getAthleteProfile
import EventFormModal from '../components/common/EventFormModal';

const MyCalendarPage = () => {
  const { id } = useParams(); // Get athlete ID from URL
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEventData, setEditingEventData] = useState(null); // Data for the event being edited

  useEffect(() => {
    const fetchAthleteData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log("ID received in MyCalendarPage:", id);
        const data = getAthleteProfile(id); // This uses the function from the imported module

        console.log("Athlete data fetched:", data);

        if (data) {
          // Deep copy the data to avoid direct mutation issues
          const copiedData = JSON.parse(JSON.stringify(data));
          setAthlete(copiedData);
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

    fetchAthleteData();
  }, [id]); // Re-run effect if ID changes

  const handleAddEvent = (newEventData) => {
    if (athlete) {
      const newEvent = {
        ...newEventData,
        // Use 'id' for the unique identifier, matching your data structure
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Simple unique ID
      };
      setAthlete((prevAthlete) => ({
        ...prevAthlete,
        // Ensure upcomingEvents is an array before spreading
        upcomingEvents: prevAthlete.upcomingEvents ? [...prevAthlete.upcomingEvents, newEvent] : [newEvent],
      }));
      console.log('Added new event:', newEvent);
    }
  };

  const handleEditClick = (event) => {
    setEditingEventData(event);
    setShowModal(true);
  };

  const handleUpdateEvent = (updatedEventData) => {
    // Ensure 'id' is used for checking and updating
    if (athlete && updatedEventData.id) { 
      setAthlete((prevAthlete) => ({
        ...prevAthlete,
        upcomingEvents: prevAthlete.upcomingEvents.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event // Use 'id' here
        ),
      }));
      console.log('Updated event:', updatedEventData);
    }
    setEditingEventData(null); // Clear editing state
  };

  const handleDeleteEvent = (eventId) => { // Keep parameter name as eventId for clarity within this function
    if (athlete && window.confirm('Are you sure you want to delete this event?')) {
      setAthlete((prevAthlete) => ({
        ...prevAthlete,
        upcomingEvents: prevAthlete.upcomingEvents.filter((event) => event.id !== eventId), // Use 'id' here
      }));
      console.log('Deleted event with ID:', eventId);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEventData(null); // Clear editing data when modal closes
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400 bg-gray-900 min-h-screen">
        Loading calendar...
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
        No athlete data available for calendar management.
      </div>
    );
  }

  // Ensure upcomingEvents exists before sorting
  const sortedEvents = athlete.upcomingEvents
    ? [...athlete.upcomingEvents].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      })
    : []; // If no events, return an empty array

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString; // Return original if invalid
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-20 pt-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gamepulse-yellow mb-8 text-center">
          My Calendar: {athlete.fullName}'s Schedule
        </h1>

        <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6 border-b pb-2 border-gray-700">
            <h2 className="text-2xl font-bold text-white">Manage Events</h2>
            <button
              onClick={() => { setEditingEventData(null); setShowModal(true); }}
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-darker text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              + Add New Event
            </button>
          </div>

          {/* Conditional rendering based on sortedEvents length */}
          {sortedEvents.length > 0 ? (
            <div className="space-y-4">
              {sortedEvents.map((event) => (
                // CHANGED key={event.eventId} to key={event.id}
                <div key={event.id} className="bg-gray-700/50 p-4 rounded-md shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <p className="text-md font-semibold text-white">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-300">{event.time}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-bold text-gamepulse-blue">{event.title}</p>
                    <p className="text-sm text-gray-300">{event.location}</p>
                    {event.description && (
                      <p className="text-xs text-gray-400 italic mt-1">{event.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-3 sm:mt-0 justify-center sm:justify-end">
                    <button
                      onClick={() => handleEditClick(event)}
                      className="bg-gamepulse-yellow text-gray-900 hover:bg-yellow-500 font-bold py-1 px-3 rounded text-sm transition duration-200"
                    >
                      Edit
                    </button>
                    {/* Ensure handleDeleteEvent correctly passes event.id */}
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No events scheduled. Add your first event!</p>
          )}
        </div>

        {/* Modal for adding/editing events */}
        <EventFormModal
          isOpen={showModal}
          onClose={handleCloseModal}
          // Pass 'id' when editing, 'id' when adding
          onSubmit={editingEventData ? handleUpdateEvent : handleAddEvent}
          initialData={editingEventData}
        />
      </div>
    </div>
  );
};

export default MyCalendarPage;