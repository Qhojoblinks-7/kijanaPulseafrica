// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import { FaPlus, FaBell, FaEnvelope } from 'react-icons/fa';

// Import newly created sub-components
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import DesktopUserActions from './DesktopUserActions';
import MobileToggle from './MobileToggle';
import MobileMenuOverlay from './MobileMenuOverlay';

// NEW IMPORT: DarkModeContext
import { useDarkMode } from '../../context/DarkModeContext';

const Header = () => {
  const { isLoggedIn, user, userAvatarUrl, userType, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const desktopUserActionsRef = useRef(null);

  const fetchNotifications = async () => {
    if (!isLoggedIn || !user) {
      setUnreadNotificationsCount(0);
      setRecentNotifications([]);
      setHasNewMessages(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const simulatedNotifications = [
        { id: 1, type: 'match_update', text: 'Your match vs. Achimota School is confirmed!', read: false, timestamp: '2025-06-17T10:00:00Z', link: '/match-details/abc123' },
        { id: 2, type: 'new_follower', text: 'Coach Kwame started following you.', read: false, timestamp: '2025-06-17T09:30:00Z', link: '/coach-profile/kwame' },
        { id: 3, type: 'message', text: 'You have a new message from a scout!', read: false, timestamp: '2025-06-17T08:00:00Z', link: '/messages' },
        { id: 4, type: 'event_reminder', text: 'Reminder: Training session today at 4 PM.', read: true, timestamp: '2025-06-16T15:00:00Z', link: '/my-calendar' },
      ];

      const simulatedUnreadMessagesCount = 1;

      const unreadNotifs = simulatedNotifications.filter(n => !n.read);
      setUnreadNotificationsCount(unreadNotifs.length + simulatedUnreadMessagesCount);
      setRecentNotifications(unreadNotifs.slice(0, 3));
      setHasNewMessages(simulatedUnreadMessagesCount > 0);

    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setUnreadNotificationsCount(0);
      setRecentNotifications([]);
      setHasNewMessages(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [isLoggedIn, user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && desktopUserActionsRef.current && !desktopUserActionsRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen]);

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

  const getUserDashboardPath = (type) => {
    switch (type) {
      case 'athlete': return `/my-profile/${user?.slug || user?.id || ''}`;
      case 'coach': return '/coach-dashboard';
      case 'scout': return '/scout-dashboard';
      case 'fan':
      case 'parent': return '/fan-dashboard';
      default: return '/dashboard';
    }
  };

  // --- Define Navigation Links based on User Type ---
  const getNavLinks = (type, currentPath) => {
    const commonPublicLinks = [
      { to: "/live-matches", label: "Live Matches" },
      { to: "/upcoming-talents", label: "Upcoming Talents" },
      { to: "/discover-talent", label: "Discover Talent" },
      { to: "/highlights", label: "Highlights" },
      { to: "/statistics", label: "Statistics" },
      { to: "/news", label: "News" },
    ];

    const dropdownOnlyPaths = [
      "/my-profile",
      "/settings",
      "/help",
      "/messages",
      "/reports",
      "/notifications",
    ];

    let links = [];

    if (!isLoggedIn) {
      links = [
        { to: "/", label: "Home" },
        ...commonPublicLinks
      ];
    } else {
      const dashboardPath = getUserDashboardPath(type);
      const isOnDashboard = currentPath === dashboardPath;

      if (!isOnDashboard && type !== 'athlete') {
        links.push({ to: dashboardPath, label: "Dashboard" });
      }

      links.push(...commonPublicLinks);

      switch (type) {
        case 'athlete':
          links.push(
            { to: `/my-profile/${user?.slug || user?.id}`, label: "My Profile" },
            { to: "/my-calendar", label: "My Calendar" }
          );

          // CONDITIONAL UPLOAD BUTTON LOGIC:
          // Only add the upload button if the user is an athlete AND
          // they are on the Highlights page OR any My Profile page.
          const isUploadPage = currentPath === "/highlights" || currentPath.startsWith("/my-profile");

          if (isUploadPage) {
            links.push(
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
          }
          break;
        case 'coach':
          links.push(
            { to: "/my-teams", label: "Manage Team" },
            { to: "/match-reporting/new", label: "New Report" },
            { to: "/my-calendar", label: "Calendar" }
          );
          break;
        case 'scout':
          links.push(
            { to: "/reports", label: "Reports" },
            { to: "/digital-classroom", label: "Classroom" }
          );
          break;
        case 'fan':
        case 'parent':
          links.push(
            { to: "/upcoming-matches", label: "Upcoming Matches" },
            { to: "/latest-highlights", label: "Highlights" },
            { to: "/digital-classroom", label: "Classroom" }
          );
          break;
        default:
          break;
      }
    }

    // Filter out links that should only appear in dropdowns
    let finalLinks = links.filter(link => !dropdownOnlyPaths.includes(link.to));

    // Remove potential duplicates
    const seenPaths = new Set();
    finalLinks = finalLinks.filter(link => {
      if (seenPaths.has(link.to)) {
        return false;
      }
      seenPaths.add(link.to);
      return true;
    });

    // Separate the upload button (it will only exist here if the conditions above were met)
    const uploadButton = finalLinks.find(link => link.type === 'button');
    let regularLinks = finalLinks.filter(link => link.type !== 'button');

    // Filter out the link to the current page
    const normalizedCurrentPath = currentPath.endsWith('/') && currentPath.length > 1
      ? currentPath.slice(0, -1)
      : currentPath;

    regularLinks = regularLinks.filter(link => {
        const normalizedLinkTo = link.to.endsWith('/') && link.to.length > 1
            ? link.to.slice(0, -1)
            : link.to;

        // Special handling for /my-profile: if currentPath is /my-profile/abc, then
        // hide the My Profile link in the main navigation.
        if (link.to.startsWith("/my-profile") && normalizedCurrentPath.startsWith("/my-profile")) {
            return false;
        }

        return normalizedLinkTo !== normalizedCurrentPath;
    });

    // Apply the 6-link limit for regular links
    const slicedRegularLinks = regularLinks.slice(0, 6); // <-- CHANGED FROM 4 TO 6

    // Combine the sliced regular links with the upload button (if present),
    // ensuring the upload button appears *after* the 6 links.
    return uploadButton ? [...slicedRegularLinks, uploadButton] : slicedRegularLinks;
  };

  const navLinks = getNavLinks(userType, location.pathname);
  const mobileNavLinks = getNavLinks(userType, location.pathname);

  const dashboardHomeLink = isLoggedIn ? getUserDashboardPath(userType) : '/';

  return (
    <header className="fixed top-0 left-0 w-full z-51 py-3 px-4 md:px-8
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
          unreadNotificationsCount={unreadNotificationsCount}
          recentNotifications={recentNotifications}
          hasNewMessages={hasNewMessages}
          user={user}
        />

        <MobileToggle
          isLoggedIn={isLoggedIn}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          onCloseMenus={closeMenus}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
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
          unreadNotificationsCount={unreadNotificationsCount}
          recentNotifications={recentNotifications}
          hasNewMessages={hasNewMessages}
          user={user}
        />
      )}
    </header>
  );
};

export default Header;