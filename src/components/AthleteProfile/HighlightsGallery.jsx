// src/components/AthleteProfile/HighlightsGallery.jsx
import React, { useState } from 'react';
import { FaVideo, FaPlayCircle, FaLink } from 'react-icons/fa';

const HighlightsGallery = ({ athlete }) => {
  const [selectedVideo, setSelectedVideo] = useState(athlete.featuredVideo || (athlete.videoThumbnails[0]?.videoUrl || ''));

  // Icons from athlete.icons, or default fallback
  const VideoIcon = athlete.icons?.FaVideo || FaVideo;
  const PlayCircleIcon = athlete.icons?.FaPlayCircle || FaPlayCircle;
  const LinkIcon = athlete.icons?.FaLink || FaLink;

  const allMedia = [...athlete.videoThumbnails, ...athlete.photoThumbnails];

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
        <VideoIcon className="text-gamepulse-blue mr-3" /> Highlights & Action
      </h2>

      {/* Featured Video Reel */}
      {selectedVideo && (
        <div className="w-full aspect-video bg-gray-900 rounded-lg shadow-xl overflow-hidden mb-8 relative">
          {/* Using iframe for YouTube embed - optimize for performance */}
          <iframe
            src={selectedVideo}
            title="Featured Athlete Highlight"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy" // Lazy load iframe
          ></iframe>
        </div>
      )}

      {/* Video & Photo Gallery Grid */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Media Gallery</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allMedia.map((media) => (
          <div
            key={media.id}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
            onClick={() => media.type === 'video' && setSelectedVideo(media.videoUrl)}
          >
            <img
              src={media.src}
              alt={media.alt}
              className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
              loading="lazy" // Optimize image loading
            />
            {media.type === 'video' && (
              <PlayCircleIcon className="absolute inset-0 m-auto text-white text-4xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm font-medium">
              {media.alt}
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream/Match Links */}
      {athlete.liveStreamLinks && athlete.liveStreamLinks.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 font-heading">Past Matches & Streams</h3>
          <div className="space-y-3">
            {athlete.liveStreamLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gamepulse-blue hover:underline font-semibold flex items-center text-base md:text-lg bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm"
              >
                <LinkIcon className="mr-3 text-gamepulse-teal flex-shrink-0" /> {link.label}
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HighlightsGallery;