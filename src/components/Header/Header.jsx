// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import { FaPlus, FaBell, FaEnvelope } from 'react-icons/fa'; // Import bell and envelope icons

// Import newly created sub-components
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import DesktopUserActions from './DesktopUserActions';
import MobileToggle from './MobileToggle';
import MobileMenuOverlay from './MobileMenuOverlay';

// NEW IMPORT: DarkModeContext
import { useDarkMode } from '../../context/DarkModeContext';

const Header = () => {
  const { isLoggedIn, user, userAvatarUrl, userType, logout } = useAuth(); // Destructure 'user'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // NEW: State for notifications
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]); // For a small preview dropdown
  const [hasNewMessages, setHasNewMessages] = useState(false); // To indicate new messages

  const location = useLocation();
  const navigate = useNavigate();

  // NEW: Use DarkModeContext
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Ref for the desktop user actions container to handle outside clicks more robustly
  const desktopUserActionsRef = useRef(null);

  // Function to simulate fetching notifications
  const fetchNotifications = async () => {
    if (!isLoggedIn || !user) {
      setUnreadNotificationsCount(0);
      setRecentNotifications([]);
      setHasNewMessages(false);
      return;
    }

    // Simulate API call to fetch notifications and messages
    try {
      // In a real app, you'd fetch from your backend
      // const notificationsResponse = await fetch('/api/notifications');
      // const messagesResponse = await fetch('/api/messages/unread');
      // const notificationData = await notificationsResponse.json();
      // const messageData = await messagesResponse.json();

      // Simulate data for demo purposes
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      const simulatedNotifications = [
        { id: 1, type: 'match_update', text: 'Your match vs. Achimota School is confirmed!', read: false, timestamp: '2025-06-17T10:00:00Z', link: '/match-details/abc123' },
        { id: 2, type: 'new_follower', text: 'Coach Kwame started following you.', read: false, timestamp: '2025-06-17T09:30:00Z', link: '/coach-profile/kwame' },
        { id: 3, type: 'message', text: 'You have a new message from a scout!', read: false, timestamp: '2025-06-17T08:00:00Z', link: '/messages' },
        { id: 4, type: 'event_reminder', text: 'Reminder: Training session today at 4 PM.', read: true, timestamp: '2025-06-16T15:00:00Z', link: '/my-calendar' },
      ];

      const simulatedUnreadMessagesCount = 1; // Simulate 1 unread message

      const unreadNotifs = simulatedNotifications.filter(n => !n.read);
      setUnreadNotificationsCount(unreadNotifs.length + simulatedUnreadMessagesCount); // Add unread messages to count
      setRecentNotifications(unreadNotifs.slice(0, 3)); // Show up to 3 most recent unread
      setHasNewMessages(simulatedUnreadMessagesCount > 0);

    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      // Handle error gracefully, maybe clear notifications
      setUnreadNotificationsCount(0);
      setRecentNotifications([]);
      setHasNewMessages(false);
    }
  };


  // Fetch notifications on mount and when user logs in/out
  useEffect(() => {
    fetchNotifications();
    // Potentially set up an interval for polling new notifications
    const interval = setInterval(fetchNotifications, 60000); // Poll every 60 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isLoggedIn, user]); // Refetch when login status or user data changes


  // Close mobile menu and dropdown when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Using md breakpoint
        setIsMobileMenuOpen(false);
      }
      if (window.innerWidth < 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && desktopUserActionsRef.current && !desktopUserActionsRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen]);

  // Close all menus/dropdowns if route changes
  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Helper function to get the user's specific dashboard path
  const getUserDashboardPath = (type) => {
    switch (type) {
      case 'athlete': return `/my-profile/${user?.slug || user?.id || ''}`; // Use user.slug or user.id for specific profile link
      case 'coach': return '/coach-dashboard';
      case 'scout': return '/scout-dashboard';
      case 'fan':
      case 'parent': return '/fan-dashboard';
      default: return '/dashboard';
    }
  };

  // --- Define Navigation Links based on User Type ---
  const getNavLinks = (type, currentPath) => {
    const dropdownOnlyPaths = [
      "/my-profile", // Generic for self profile
      "/settings",
      "/help", // Changed from help-and-support to help based on App.jsx
      "/messages",
      "/reports",
      "/notifications", // Added notifications page link
    ];

    const dashboardPath = getUserDashboardPath(type);
    const isOnDashboard = currentPath === dashboardPath;

    let links = [];

    if (!isLoggedIn) {
      links = [
        { to: "/", label: "Home" },
        { to: "/about-us", label: "About Us" },
        { to: "/contact-us", label: "Contact Us" },
      ];
    } else {
      if (!isOnDashboard && type !== 'athlete') { // Don't show "Dashboard" if it's the athlete's profile as the main link
        links.push({ to: dashboardPath, label: "Dashboard" });
      }

      switch (type) {
        case 'athlete':
          links.push(
            { to: `/my-profile/${user?.slug || user?.id}`, label: "My Profile" }, // Direct link to specific profile, if not handled by MyCalendar
            { to: "/highlights", label: "Highlights" },
            { to: "/live-matches", label: "Live Matches" },
            { to: "/my-calendar", label: "My Calendar" }, // Use a generic calendar link if it's for the current user
            {
              type: 'button',
              label: <><FaPlus className="mr-1" /> Upload</>,
              onClick: () => {
                navigate('/upload-highlight');
                closeMenus();
              },
              className: `px-4 py-1.5 rounded-full bg-[#1282A2] text-[#FFFFFF] font-semibold text-sm flex items-center
                          hover:bg-[#034078] transition-colors duration-300
                          dark:bg-gamepulse-teal dark:text-dark-text-primary dark:hover:bg-[#006B6B]`
            }
          );
          break;
        case 'coach':
          links.push(
            { to: "/discover-talent", label: "Discover Talent" },
            { to: "/my-teams", label: "Manage Team" }, // Changed from manage-team to my-teams based on App.jsx
            { to: "/match-reporting/new", label: "New Report" },
            { to: "/my-calendar", label: "Calendar" }
          );
          break;
        case 'scout':
          links.push(
            { to: "/discover-talent", label: "Discover Talent" },
            { to: "/reports", label: "Reports" }, // Reports for scouts
            { to: "/digital-classroom", label: "Classroom" }
          );
          break;
        case 'fan':
        case 'parent':
          links.push(
            { to: "/discover-talent", label: "Discover Talent" }, // Fans can discover
            { to: "/upcoming-matches", label: "Upcoming Matches" },
            { to: "/latest-highlights", label: "Highlights" }, // Should link to general highlights
            { to: "/digital-classroom", label: "Classroom" }
          );
          break;
        default:
          break;
      }
    }

    let filteredLinks = links.filter(link => !dropdownOnlyPaths.includes(link.to));

    const uploadButton = filteredLinks.find(link => link.type === 'button');
    const regularLinks = filteredLinks.filter(link => link.type !== 'button');

    if (uploadButton) {
      return [...regularLinks.slice(0, 3), uploadButton];
    } else {
      return regularLinks.slice(0, 4);
    }
  };

  const navLinks = getNavLinks(userType, location.pathname);
  const mobileNavLinks = getNavLinks(userType, location.pathname); // Still passes through, MobileMenuOverlay will add more

  const dashboardHomeLink = isLoggedIn ? getUserDashboardPath(userType) : '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 md:px-8
                        bg-gradient-to-r from-[#1282A2] to-[#0A1128] shadow-lg
                        dark:from-dark-background-primary dark:to-dark-background-primary dark:shadow-xl-dark
                        transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center h-16">

        <Logo dashboardHomeLink={dashboardHomeLink} onCloseMenus={closeMenus} isDarkMode={isDarkMode} />

        <DesktopNav navLinks={navLinks} onCloseMenus={closeMenus} isDarkMode={isDarkMode} />

        <DesktopUserActions
          isLoggedIn={isLoggedIn}
          userAvatarUrl={userAvatarUrl}
          userType={userType}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          handleLogout={handleLogout}
          onCloseMenus={closeMenus}
          ref={desktopUserActionsRef}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          // NEW PROPS: Notifications and messages
          unreadNotificationsCount={unreadNotificationsCount}
          recentNotifications={recentNotifications}
          hasNewMessages={hasNewMessages}
          user={user} // Pass user object to DesktopUserActions for profile link
        />

        <MobileToggle
          isLoggedIn={isLoggedIn}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          onCloseMenus={closeMenus}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          // NEW PROPS for mobile bell/message icon
          unreadNotificationsCount={unreadNotificationsCount}
          hasNewMessages={hasNewMessages}
        />
      </div>

      {isMobileMenuOpen && (
        <MobileMenuOverlay
          mobileNavLinks={mobileNavLinks}
          isLoggedIn={isLoggedIn}
          userType={userType}
          handleLogout={handleLogout}
          onCloseMenus={closeMenus}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          // NEW PROPS for mobile overlay
          unreadNotificationsCount={unreadNotificationsCount}
          recentNotifications={recentNotifications} // Though typically not shown in full mobile overlay
          hasNewMessages={hasNewMessages}
          user={user} // Pass user object for profile link
        />
      )}
    </header>
  );
};

export default Header;