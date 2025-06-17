// src/components/MyProfile/MyHighlightsGallery.jsx
import React from 'react';

const MyHighlightsGallery = ({ athlete }) => {
  // Line 6 will be here. Safely access the highlights array.
  // If athlete or athlete.highlights is undefined, default to an empty array.
  const highlights = athlete?.highlights || []; // This line should fix the error.

  // If there are no highlights, display a message
  if (highlights.length === 0) {
    return (
      <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
          My Highlights Gallery
        </h3>
        <p className="text-gray-600 dark:text-gray-400">No highlights available yet. Check back soon!</p>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
        My Highlights Gallery
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm dark:bg-gray-700">
            {item.type === 'video' && item.url && (
              <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <iframe
                  src={item.url}
                  title={item.title || "Highlight Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            )}
            {item.type === 'image' && item.url && (
              <img src={item.url} alt={item.title || "Highlight Image"} className="w-full h-48 object-cover" />
            )}
            {item.title && (
              <div className="p-3">
                <p className="text-md font-semibold text-gray-800 dark:text-white">{item.title}</p>
                {item.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyHighlightsGallery;