// src/components/MyProfile/MyAboutMe.jsx
import React from 'react';

const MyAboutMe = ({ athlete }) => {
  // Safely access properties, defaulting to empty arrays if undefined.
  // This is where line 37 was likely trying to call map().
  const bio = athlete?.bio || [];
  const interests = athlete?.interests || [];
  const achievements = athlete?.achievements || [];
  const education = athlete?.education || [];

  return (
    <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
        About Me
      </h3>

      {/* Bio Section */}
      {bio.length > 0 ? (
        <div className="mb-6">
          {bio.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-3 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        // Render nothing or a placeholder if bio is empty, but only if other sections are also empty
        null
      )}

      {/* Interests Section */}
      {interests.length > 0 ? (
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-3 border-b pb-1 border-gray-200 dark:border-gray-700">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                {interest}
              </span>
            ))}
          </div>
        </div>
      ) : (
        null
      )}

      {/* Achievements Section */}
      {achievements.length > 0 ? (
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-3 border-b pb-1 border-gray-200 dark:border-gray-700">Achievements</h4>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {achievements.map((achievement, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{achievement.year}:</span> {achievement.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        null
      )}

      {/* Education Section */}
      {education.length > 0 ? (
        <div>
          <h4 className="text-xl font-bold mb-3 border-b pb-1 border-gray-200 dark:border-gray-700">Education</h4>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {education.map((edu, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{edu.year}:</span> {edu.institution} - {edu.degree}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        null
      )}

      {/* Fallback if ALL 'about me' sections are empty */}
      {bio.length === 0 && interests.length === 0 && achievements.length === 0 && education.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          No detailed 'About Me' information available yet.
        </p>
      )}
    </section>
  );
};

export default MyAboutMe;