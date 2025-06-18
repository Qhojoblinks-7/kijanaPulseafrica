// src/pages/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchAllNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

        const simulatedData = [
          { id: 1, type: 'match_update', text: 'Your match vs. Achimota School is confirmed for June 25th!', read: false, timestamp: '2025-06-17T10:00:00Z', link: '/match-details/abc123' },
          { id: 2, type: 'new_follower', text: 'Coach Kwame started following your profile.', read: false, timestamp: '2025-06-17T09:30:00Z', link: '/coach-profile/kwame' },
          { id: 3, type: 'message', text: 'You have a new message from a scout. Check your inbox!', read: false, timestamp: '2025-06-17T08:00:00Z', link: '/messages' },
          { id: 4, type: 'event_reminder', text: 'Reminder: Training session today at 4 PM at Accra Sports Stadium.', read: true, timestamp: '2025-06-16T15:00:00Z', link: '/my-calendar' },
          { id: 5, type: 'system_alert', text: 'Our privacy policy has been updated. Please review.', read: true, timestamp: '2025-06-15T11:00:00Z', link: '/privacy-policy' },
          { id: 6, type: 'message', text: 'You replied to Prince Adom. Conversation updated.', read: true, timestamp: '2025-06-14T14:00:00Z', link: '/messages' },
        ];
        setNotifications(simulatedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(prevNotifs =>
      prevNotifs.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    // In a real app, you'd send an API request to mark as read
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match_update': return <FaCheckCircle className="text-green-500" />;
      case 'new_follower': return <FaUserCircle className="text-blue-500" />;
      case 'message': return <FaEnvelope className="text-purple-500" />;
      case 'event_reminder': return <FaBell className="text-yellow-500" />;
      case 'system_alert': return <FaExclamationCircle className="text-red-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 md:mt-24"> {/* Adjust mt to account for fixed header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Notifications</h1>

      {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading notifications...</p>}
      {error && <p className="text-center text-red-600 flex items-center justify-center"><FaExclamationCircle className="mr-2" /> {error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <div className="text-center p-8 text-gray-600 dark:text-gray-400">
          <FaBell className="text-6xl mx-auto mb-4 text-gray-400" />
          <p className="text-xl">You have no new notifications.</p>
        </div>
      )}

      <ul className="space-y-4">
        {notifications.map(notif => (
          <li
            key={notif.id}
            className={`flex items-start p-4 rounded-lg shadow-sm
                        ${notif.read ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'}
                        transition-colors duration-200`}
          >
            <div className="flex-shrink-0 mr-4 text-2xl">
              {getNotificationIcon(notif.type)}
            </div>
            <div className="flex-grow">
              <p className={`font-semibold ${notif.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                {notif.text}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(notif.timestamp).toLocaleString()}
              </p>
              {notif.link && (
                <Link
                  to={notif.link}
                  onClick={() => markAsRead(notif.id)}
                  className="text-gamepulse-blue dark:text-gamepulse-teal hover:underline text-sm mt-2 inline-block"
                >
                  View Details
                </Link>
              )}
            </div>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="flex-shrink-0 ml-4 px-3 py-1 text-sm bg-gamepulse-orange text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;