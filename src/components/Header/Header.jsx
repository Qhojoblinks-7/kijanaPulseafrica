// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext'
import { FaPlus } from 'react-icons/fa';

// Import newly created sub-components
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import DesktopUserActions from './DesktopUserActions';
import MobileToggle from './MobileToggle';
import MobileMenuOverlay from './MobileMenuOverlay';

// NEW IMPORT: DarkModeContext
import { useDarkMode } from '../../context/DarkModeContext';

const Header = () => {
  const { isLoggedIn, userAvatarUrl, userType, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // NEW: Use DarkModeContext
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Ref for the desktop user actions container to handle outside clicks more robustly
  const desktopUserActionsRef = useRef(null);

  // Close mobile menu and dropdown when screen size changes
  useEffect(() => {
    const handleResize = () => {
      // If screen becomes desktop size, close mobile menu
      if (window.innerWidth >= 768) { // Using md breakpoint
        setIsMobileMenuOpen(false);
      }
      // If screen becomes mobile size, close dropdown
      if (window.innerWidth < 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check on mount
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
    closeMenus(); // This will close both mobile menu and dropdown on route change
  }, [location.pathname]); // Dependency array includes location.pathname

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); // Always close dropdown if mobile menu is toggled
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMobileMenuOpen(false); // Always close mobile menu if dropdown is toggled
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    // No need for navigate here, AuthContext handles it
  };

  // Central function to close all menus/dropdowns
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Helper function to get the user's specific dashboard path
  const getUserDashboardPath = (type) => {
    switch (type) {
      case 'athlete': return '/athlete-dashboard';
      case 'coach': return '/coach-dashboard';
      case 'scout': return '/scout-dashboard';
      case 'fan':
      case 'parent': return '/fan-dashboard';
      default: return '/dashboard';
    }
  };

  // --- Define Navigation Links based on User Type ---
  const getNavLinks = (type, currentPath) => {
    // Links that should always be in the dropdown, not main nav
    const dropdownOnlyPaths = [
      "/my-profile",
      "/settings",
      "/help-and-support",
      "/messages",
      "/reports"
    ];

    const dashboardPath = getUserDashboardPath(type);
    const isOnDashboard = currentPath === dashboardPath;

    let links = [];

    if (!isLoggedIn) {
      // Logged out: Prioritize core site info
      links = [
        { to: "/", label: "Home" },
        { to: "/about-us", label: "About Us" },
        { to: "/contact-us", label: "Contact Us" },
      ];
    } else {
      // Logged In: Dashboard first if not on it
      if (!isOnDashboard) {
        links.push({ to: dashboardPath, label: "Dashboard" });
      }

      switch (type) {
        case 'athlete':
          links.push(
            { to: "/highlights", label: "Highlights" },
            { to: "/live-matches", label: "Live Matches" },
            // Upload button for athletes, always on main nav if space allows
            {
              type: 'button',
              label: <><FaPlus className="mr-1" /> Upload</>,
              onClick: () => {
                navigate('/upload-highlight');
                closeMenus();
              },
              // Hardcoded colors for now as requested (ensure these are defined in your Tailwind config or replace with theme colors)
              className: `px-4 py-1.5 rounded-full bg-[#1282A2] text-[#FFFFFF] font-semibold text-sm flex items-center
                          hover:bg-[#034078] transition-colors duration-300
                          dark:bg-gamepulse-teal dark:text-dark-text-primary dark:hover:bg-[#006B6B]` // Dark mode specific styles
            }
          );
          break;
        case 'coach':
          links.push(
            { to: "/discover-talent", label: "Discover Talent" },
            { to: "/manage-team", label: "Manage Team" },
          );
          break;
        case 'scout':
          links.push(
            { to: "/discover-talent", label: "Discover Talent" },
          );
          break;
        case 'fan':
        case 'parent':
          links.push(
            { to: "/followed-athletes", label: "Followed Athletes" },
            { to: "/upcoming-matches", label: "Upcoming Matches" },
            { to: "/latest-highlights", label: "Highlights" }
          );
          break;
        default:
          // Default logged-in links if userType is unknown
          break;
      }
    }

    // Filter out links that are meant for the dropdown
    let filteredLinks = links.filter(link => !dropdownOnlyPaths.includes(link.to));

    // Special handling for the upload button if it's a 'button' type
    const uploadButton = filteredLinks.find(link => link.type === 'button');
    const regularLinks = filteredLinks.filter(link => link.type !== 'button');

    // Ensure no more than 3 regular links + 1 upload button (total 4) or 4 regular links
    if (uploadButton) {
      return [...regularLinks.slice(0, 3), uploadButton];
    } else {
      return regularLinks.slice(0, 4);
    }
  };

  const navLinks = getNavLinks(userType, location.pathname);
  // Mobile nav links might require additional items (like profile, settings)
  // that are usually in a desktop dropdown but need to be in the main mobile menu.
  // For now, we'll keep it the same as desktop nav for simplicity in this function,
  // but the MobileMenuOverlay explicitly adds those if isLoggedIn.
  const mobileNavLinks = getNavLinks(userType, location.pathname);


  // Determine the default dashboard link for logo click
  const dashboardHomeLink = isLoggedIn ? getUserDashboardPath(userType) : '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 md:px-8
                       bg-gradient-to-r from-[#1282A2] to-[#0A1128] shadow-lg
                       dark:from-dark-background-primary dark:to-dark-background-primary dark:shadow-xl-dark
                       transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center h-16">

        <Logo dashboardHomeLink={dashboardHomeLink} onCloseMenus={closeMenus} isDarkMode={isDarkMode} />

        <DesktopNav navLinks={navLinks} onCloseMenus={closeMenus} isDarkMode={isDarkMode} />

        {/* Passed ref to DesktopUserActions for robust outside click detection */}
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
        />

        <MobileToggle
          isLoggedIn={isLoggedIn}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          onCloseMenus={closeMenus}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
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
        />
      )}
    </header>
  );
};

export default Header;