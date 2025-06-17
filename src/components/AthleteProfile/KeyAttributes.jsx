// src/components/AthleteProfile/KeyAttributes.jsx
import React from 'react';

const KeyAttributes = ({ attributes }) => {
  if (!attributes || attributes.length === 0) {
    return (
      <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-8">
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-gamepulse-yellow">
            Key Attributes
          </h3>
          <p className="text-gray-400">
            No key attributes listed for this athlete.
          </p>
        </div>
      </section>
    );
  }

  // Max rating for visual representation (e.g., if ratings are 1-5, set maxRating to 5)
  const maxRating = 5;

  return (
    <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-8">
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700">
        <h3 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700 text-gamepulse-yellow">
          Key Attributes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attributes.map((attr, index) => (
            <div key={index} className="bg-gray-700/50 p-4 rounded-md shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-white">{attr.name}</p>
                <span className="text-gamepulse-yellow font-bold text-sm">
                  {attr.rating} / {maxRating}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-gamepulse-blue h-2.5 rounded-full"
                  style={{ width: `${(attr.rating / maxRating) * 100}%` }}
                ></div>
              </div>
              {attr.description && (
                <p className="text-sm text-gray-300 mt-2 italic">
                  {attr.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyAttributes;