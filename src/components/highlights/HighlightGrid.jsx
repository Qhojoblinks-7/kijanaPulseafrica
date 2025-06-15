// src/components/Highlights/HighlightGrid.jsx
import React from 'react';
import HighlightCard from './HighlightCard';

const HighlightGrid = ({ highlights, headline }) => {
  if (!highlights || highlights.length === 0) {
    return null; // Or a message indicating no highlights, depending on parent component's handling
  }

  return (
    <section className="py-4">
      {headline && <h2 className="text-2xl font-bold text-white mb-6">{headline}</h2>}
      <div className="
        grid
        grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 /* FORCE ONE COLUMN */
        gap-y-4 md:gap-y-6 /* Adjusted gap for vertical stacking */
        md:gap-x-0 lg:gap-x-0 /* Ensure no horizontal gap in single column */
      ">
        {highlights.map((highlight) => (
          <HighlightCard key={highlight.id} highlight={highlight} />
        ))}
      </div>
    </section>
  );
};

export default HighlightGrid;