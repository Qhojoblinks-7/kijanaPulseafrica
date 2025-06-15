// src/components/Header/Header.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaPlus } from 'react-icons/fa';

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
  const navigate = useNavigate();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // You might need to add a ref to the dropdown container to precisely check outside clicks
      // For now, this just closes on any outside click if it's open, which might be too aggressive
      // if you have other interactive elements. A more robust solution involves `useRef` and `contains`.
      // Ensure DesktopUserActions has a className="user-actions-container" on its root div
      if (isDropdownOpen && !event.target.closest('.user-actions-container')) {
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
    setIsDropdownOpen(false); // Close dropdown when opening/closing mobile menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsMobileMenuOpen(false); // Close mobile menu when opening/closing dropdown
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
      "/help",
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
                navigate('/upload-highlight');
                closeMenus();
              },
              // *** HARDCODED COLORS FOR UPLOAD BUTTON ***
              className: "px-4 py-1.5 rounded-full bg-[#1282A2] text-[#FFFFFF] font-semibold text-sm flex items-center hover:bg-[#034078] transition-colors duration-300"
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
  const mobileNavLinks = getNavLinks(userType, location.pathname, true); // `true` for mobile differentiation if needed

  // Determine the default dashboard link for logo click
  const dashboardHomeLink = isLoggedIn ? getUserDashboardPath(userType) : '/';

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 md:px-8
                        bg-gradient-to-r from-[#1282A2] to-[#0A1128] shadow-lg"> {/* HARDCODED HEADER GRADIENT */}
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