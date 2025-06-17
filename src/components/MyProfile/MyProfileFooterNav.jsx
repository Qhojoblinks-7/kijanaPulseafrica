// src/components/MyProfile/MyProfileFooterNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaVideo, FaGraduationCap, FaCog, FaCalendar } from 'react-icons/fa';

// Accept athleteId as a prop
const MyProfileFooterNav = ({ athleteIcons, athleteId }) => {
  // Use icons from athleteIcons or default to react-icons
  const UsersIcon = athleteIcons?.FaUsers || FaUsers;
  const CalendarIcon = athleteIcons?.FaCalendarAlt || FaCalendarAlt;
  const VideoIcon = athleteIcons?.FaVideo || FaVideo;
  const GraduationCapIcon = athleteIcons?.FaGraduationCap || FaGraduationCap;
  const CogIcon = athleteIcons?.FaCog || FaCog;

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading">Quick Actions</h2>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        <Link to="/my-teams" className="text-gamepulse-blue hover:text-gamepulse-dark font-semibold text-sm md:text-base flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <UsersIcon className="text-3xl mb-1" />
          My Teams
        </Link>
        {/* Update the 'to' prop for My Calendar Link */}
        {athleteId && ( // Only render if athleteId is available
          <Link to={`/my-calendar/${athleteId}`} className="text-gamepulse-blue hover:text-gamepulse-dark font-semibold text-sm md:text-base flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FaCalendar className="text-3xl mb-1" />
            My Calendar
          </Link>
        )}
        <Link to="/my-highlights" className="text-gamepulse-blue hover:text-gamepulse-dark font-semibold text-sm md:text-base flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <VideoIcon className="text-3xl mb-1" />
          My Highlights
        </Link>
        <Link to="/digital-classroom" className="text-gamepulse-blue hover:text-gamepulse-dark font-semibold text-sm md:text-base flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <GraduationCapIcon className="text-3xl mb-1" />
          Digital Classroom
        </Link>
        <Link to="/settings" className="text-gamepulse-blue hover:text-gamepulse-dark font-semibold text-sm md:text-base flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <CogIcon className="text-3xl mb-1" />
          Settings
        </Link>
      </div>
    </section>
  );
};

export default MyProfileFooterNav;