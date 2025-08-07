// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import { FaPlus, FaBell, FaEnvelope } from 'react-icons/fa';
import { mockNotifications } from '../../data/staticData'; // Import static data

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

      // Use static data instead of hardcoded notifications
      const unreadNotifs = mockNotifications.filter(n => !n.read);
      const simulatedUnreadMessagesCount = 1; // You can make this dynamic based on mockMessages

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
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const getUserDashboardPath = (type) => {
    switch (type) {
      case 'athlete':
        return '/dashboard';
      case 'coach':
        return '/coach-dashboard';
      case 'scout':
        return '/scout-dashboard';
      case 'fan':
        return '/fan-dashboard';
      default:
        return '/dashboard';
    }
  };

  const getNavLinks = (type, currentPath) => {
    const baseLinks = [
      { to: '/', label: 'Home' },
      { to: '/discover-talent', label: 'Discover Talent' },
      { to: '/live-matches', label: 'Live Matches' },
      { to: '/upcoming-games', label: 'Upcoming Games' },
      { to: '/highlights', label: 'Highlights' },
    ];

    const userSpecificLinks = {
      athlete: [
        { to: '/my-profile', label: 'My Profile' },
        { to: '/upload-highlight', label: 'Upload Highlight' },
        { to: '/digital-classroom', label: 'Digital Classroom' },
        { to: '/my-calendar', label: 'My Calendar' },
      ],
      coach: [
        { to: '/my-teams', label: 'My Teams' },
        { to: '/match-reporting/new', label: 'Report Match' },
        { to: '/analytics/regions', label: 'Analytics' },
      ],
      scout: [
        { to: '/reports', label: 'Scouting Reports' },
        { to: '/analytics/regions', label: 'Regional Analytics' },
      ],
      fan: [
        { to: '/my-profile', label: 'My Profile' },
        { to: '/favorites', label: 'Favorites' },
      ],
    };

    return [...baseLinks, ...(userSpecificLinks[type] || [])];
  };

  const navLinks = getNavLinks(userType, location.pathname);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-dark-gray shadow-md transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav 
            navLinks={navLinks} 
            currentPath={location.pathname}
            isLoggedIn={isLoggedIn}
          />

          {/* Desktop User Actions */}
          <DesktopUserActions
            ref={desktopUserActionsRef}
            isLoggedIn={isLoggedIn}
            user={user}
            userType={userType}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            handleLogout={handleLogout}
            unreadNotificationsCount={unreadNotificationsCount}
            recentNotifications={recentNotifications}
            hasNewMessages={hasNewMessages}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            getUserDashboardPath={getUserDashboardPath}
          />

          {/* Mobile Toggle */}
          <MobileToggle 
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            unreadNotificationsCount={unreadNotificationsCount}
            hasNewMessages={hasNewMessages}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={closeMenus}
        navLinks={navLinks}
        currentPath={location.pathname}
        isLoggedIn={isLoggedIn}
        user={user}
        userType={userType}
        handleLogout={handleLogout}
        getUserDashboardPath={getUserDashboardPath}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </header>
  );
};

export default Header;