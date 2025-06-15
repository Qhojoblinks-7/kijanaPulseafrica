// src/components/MyProfile/MyHighlightsGallery.jsx
import React, { useState } from 'react';
import { FaVideo, FaPlayCircle, FaLink, FaCloudUploadAlt, FaPen, FaTrashAlt,FaPlusCircle } from 'react-icons/fa';

const MyHighlightsGallery = ({ athlete }) => {
  const [selectedVideo, setSelectedVideo] = useState(athlete.featuredVideo || (athlete.videoThumbnails[0]?.videoUrl || ''));

  // Icons from athlete.icons, or default fallback
  const VideoIcon = athlete.icons?.FaVideo || FaVideo;
  const PlayCircleIcon = athlete.icons?.FaPlayCircle || FaPlayCircle;
  const LinkIcon = athlete.icons?.FaLink || FaLink;
  const CloudUploadIcon = athlete.icons?.FaCloudUploadAlt || FaCloudUploadAlt;
  const PenIcon = athlete.icons?.FaPen || FaPen;
  const TrashIcon = athlete.icons?.FaTrashAlt || FaTrashAlt;

  const allMedia = [...athlete.videoThumbnails, ...athlete.photoThumbnails];

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading flex items-center">
          <VideoIcon className="text-gamepulse-blue mr-3" /> My Highlights
        </h2>
        <button className="px-4 py-2 bg-gamepulse-blue text-white rounded-full text-sm font-semibold flex items-center hover:bg-blue-700 transition-colors">
          <CloudUploadIcon className="mr-2" /> Upload New Highlight
        </button>
      </div>

      {/* Featured Video Reel */}
      {selectedVideo && (
        <div className="w-full aspect-video bg-gray-900 rounded-lg shadow-xl overflow-hidden mb-8 relative">
          <iframe
            src={selectedVideo}
            title="My Featured Highlight"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          ></iframe>
          <button className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full text-sm hover:scale-110 transition-transform flex items-center">
            <PenIcon className="mr-1" /> Change Featured
          </button>
        </div>
      )}

      {/* Video & Photo Gallery Grid */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">My Media Gallery</h3>
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
              loading="lazy"
            />
            {media.type === 'video' && (
              <PlayCircleIcon className="absolute inset-0 m-auto text-white text-4xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm font-medium">
              {media.alt}
            </div>
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-black/60 text-white p-1 rounded-full text-xs hover:scale-110 transition-transform">
                <PenIcon />
                <span className="sr-only">Edit Media</span>
              </button>
              <button className="bg-black/60 text-white p-1 rounded-full text-xs hover:scale-110 transition-transform">
                <TrashIcon />
                <span className="sr-only">Delete Media</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream/Match Links */}
      {athlete.liveStreamLinks && athlete.liveStreamLinks.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 font-heading">My Match Links</h3>
          <div className="space-y-3">
            {athlete.liveStreamLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between text-gray-700 text-base md:text-lg bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm group">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center flex-grow hover:underline">
                  <LinkIcon className="mr-3 text-gamepulse-teal flex-shrink-0" />
                  <span>{link.label}</span>
                </a>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-gamepulse-blue text-sm">
                    <PenIcon />
                    <span className="sr-only">Edit Link</span>
                  </button>
                  <button className="text-gray-400 hover:text-red-500 text-sm">
                    <TrashIcon />
                    <span className="sr-only">Delete Link</span>
                  </button>
                </div>
              </div>
            ))}
            <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold flex items-center hover:bg-gray-200 transition-colors">
              <FaPlusCircle className="mr-2" /> Add New Match Link
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyHighlightsGallery;