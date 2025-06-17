// src/components/AthleteProfile/CareerHistory.jsx
import React from 'react';

const CareerHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-8 mb-12">
        <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-gamepulse-yellow">
            Career History
          </h3>
          <p className="text-gray-400">
            No detailed career history available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-8 mb-12">
      <div className="bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-gray-700">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-gamepulse-yellow">
          Career History
        </h3>
        <div className="relative pl-6 sm:pl-8 md:pl-10"> {/* Padding for the timeline line */}
          {/* Vertical line for the timeline */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gamepulse-orange-dark rounded-full"></div>

          {/* Iterate through history items */}
          {history.map((item, index) => (
            <div key={index} className="mb-8 last:mb-0 relative pl-8"> {/* Adjusted padding-left for content */}
              {/* Circle for the timeline point */}
              <div className="absolute left-[-22px] md:left-[-24px] top-0 transform -translate-x-1/2 mt-1 w-5 h-5 md:w-6 md:h-6 bg-gamepulse-yellow rounded-full border-2 border-gamepulse-orange-dark shadow-md flex items-center justify-center">
                {item.logo && (
                  <img src={item.logo} alt={item.team} className="w-full h-full object-contain rounded-full p-0.5" />
                )}
                {!item.logo && (
                  <span className="text-xs text-black font-bold">{index + 1}</span>
                )}
              </div>

              <p className="text-gray-400 text-sm md:text-base mb-1">{item.year}</p>
              <h4 className="text-lg md:text-xl font-semibold text-white mb-1">{item.team}</h4>
              {item.description && (
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerHistory;