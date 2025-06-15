// src/components/MyProfile/MyAboutMe.jsx
import React from 'react';
import { FaUserGraduate, FaStar, FaGraduationCap, FaPen, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyAboutMe = ({ athlete }) => {
  // Icons from athlete.icons, or default fallback
  const UserGraduateIcon = athlete.icons?.FaUserGraduate || FaUserGraduate;
  const StarIcon = athlete.icons?.FaStar || FaStar;
  const GraduationCapIcon = athlete.icons?.FaGraduationCap || FaGraduationCap;
  const PenIcon = athlete.icons?.FaPen || FaPen;
  const PlusCircleIcon = athlete.icons?.FaPlusCircle || FaPlusCircle;
  const TrashIcon = athlete.icons?.FaTrashAlt || FaTrashAlt;


  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
        <UserGraduateIcon className="text-gamepulse-blue mr-3" /> My Story & Qualities
      </h2>

      {/* Personal Statement */}
      <div className="relative group mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 font-heading">Personal Statement</h3>
        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
          {athlete.personalStatement}
        </p>
        <button className="absolute top-0 right-0 -mr-6 -mt-2 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm opacity-0 group-hover:opacity-100 md:opacity-100 md:static md:ml-2">
          <PenIcon />
          <span className="sr-only">Edit Personal Statement</span>
        </button>
      </div>

      {/* Key Skills/Attributes */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Key Skills & Attributes</h3>
      <div className="flex flex-wrap gap-3 mb-8">
        {athlete.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gamepulse-blue/10 text-gamepulse-blue px-4 py-2 rounded-full text-sm md:text-base font-semibold flex items-center shadow-sm relative group"
          >
            <StarIcon className="mr-2 text-gamepulse-orange" /> {skill}
            <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
              <TrashIcon />
              <span className="sr-only">Remove Skill</span>
            </button>
          </span>
        ))}
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center hover:bg-gray-200 transition-colors">
          <PlusCircleIcon className="mr-2" /> Add Skill
        </button>
      </div>

      {/* Digital Classroom Progress */}
      {athlete.digitalClassroomProgress && athlete.digitalClassroomProgress.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 font-heading">Digital Classroom Progress</h3>
          <div className="space-y-3">
            {athlete.digitalClassroomProgress.map((module, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 shadow-sm flex items-center relative group
                  ${module.completed
                    ? 'bg-gamepulse-teal/10 border-gamepulse-teal text-gray-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
              >
                <GraduationCapIcon className="text-2xl mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-base md:text-lg">{module.name}</p>
                  <p className="text-sm md:text-base">Status: {module.completed ? 'Completed' : 'In Progress'}</p>
                </div>
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-gamepulse-blue text-sm">
                    <PenIcon />
                    <span className="sr-only">Edit Module Status</span>
                  </button>
                </div>
              </div>
            ))}
            <Link to="/digital-classroom" className="mt-4 block px-4 py-2 bg-gray-100 text-gamepulse-blue rounded-full text-sm font-semibold flex items-center justify-center hover:bg-gray-200 transition-colors">
              <PlusCircleIcon className="mr-2" /> Explore Digital Classroom
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default MyAboutMe;