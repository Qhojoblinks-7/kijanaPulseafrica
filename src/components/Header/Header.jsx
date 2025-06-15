// src/components/Header/Header.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // <--- Added useNavigate
import { useAuth } from '../../context/AuthContext';
import {FaPlus} from 'react-icons/fa'
// Import newly created sub-components
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import DesktopUserActions from './DesktopUserActions';
import MobileToggle from './MobileToggle';
import MobileMenuOverlay from './MobileMenuOverlay';

const Header = () => {
  const { isLoggedIn, userAvatarUrl, userType, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // <--- Initialized useNavigate

  // Close mobile menu when screen size changes (e.g., from mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
  const getNavLinks = (type, currentPath, isMobile = false) => {
    // Links that should always be in the dropdown, not main nav
    const dropdownOnlyPaths = [
      "/my-profile",
      "/settings",
      "/help", // Help & Support
      "/help-and-support", // Alternative common help link
      "/messages", // Messages are often also accessible from the dropdown or a dedicated page
      "/reports" // Scouting Reports might also be a secondary link
    ];

    const dashboardPath = getUserDashboardPath(type);
    const isOnDashboard = currentPath === dashboardPath;

    let links = [];

    if (!isLoggedIn) {
      // Logged out: Prioritize core site info
      links = [
        { to: "/", label: "Home" },
        { to: "/about-us", label: "About Us" },
        { to: "/features", label: "Features" },
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
                navigate('/upload-highlight'); // <--- Navigates to upload page
                closeMenus();
              },
              className: "px-4 py-1.5 rounded-full bg-gamepulse-teal text-white font-semibold text-sm flex items-center hover:bg-teal-600 transition-colors duration-300"
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
    // We want the upload button to potentially be the 4th link, not count towards the first 3
    const uploadButton = filteredLinks.find(link => link.type === 'button');
    const regularLinks = filteredLinks.filter(link => link.type !== 'button');

    // Ensure no more than 3 regular links + 1 upload button (total 4) or 4 regular links
    if (uploadButton) {
      // If upload button is present, take up to 3 regular links and then add the upload button
      return [...regularLinks.slice(0, 3), uploadButton];
    } else {
      // Otherwise, just take the first 4 regular links
      return regularLinks.slice(0, 4);
    }
  };

  const navLinks = getNavLinks(userType, location.pathname);
  // For mobile, we might allow more links in the overlay as it's not limited by horizontal space
  // Here, I'm passing true to `isMobile` for mobile, which the current `getNavLinks` doesn't differentiate heavily on number,
  // but it *could* if you wanted more links there.
  const mobileNavLinks = getNavLinks(userType, location.pathname, true);

  // Determine the default dashboard link for logo click
  const dashboardHomeLink = isLoggedIn ? getUserDashboardPath(userType) : '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 md:px-8
                       bg-gradient-to-r from-gamepulse-blue to-gamepulse-dark shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-12">

        <Logo dashboardHomeLink={dashboardHomeLink} onCloseMenus={closeMenus} />

        <DesktopNav navLinks={navLinks} onCloseMenus={closeMenus} />

        <DesktopUserActions
          isLoggedIn={isLoggedIn}
          userAvatarUrl={userAvatarUrl}
          userType={userType}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          handleLogout={handleLogout}
          onCloseMenus={closeMenus}
        />

        <MobileToggle
          isLoggedIn={isLoggedIn}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          onCloseMenus={closeMenus}
        />
      </div>

      {isMobileMenuOpen && (
        <MobileMenuOverlay
          mobileNavLinks={mobileNavLinks}
          isLoggedIn={isLoggedIn}
          userType={userType}
          handleLogout={handleLogout}
          onCloseMenus={closeMenus}
        />
      )}
    </header>
  );
};

export default Header;