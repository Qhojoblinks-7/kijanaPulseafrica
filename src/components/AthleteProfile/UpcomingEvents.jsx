// src/components/AthleteProfile/UpcomingEvents.jsx
import React from 'react';

const UpcomingEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return null; // Don't render the section if there are no upcoming events
  }

  // Sort events by date and then by time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-8">
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700">
        <h3 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700 text-gamepulse-yellow">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <div key={index} className="bg-gray-700/50 p-4 rounded-md shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;