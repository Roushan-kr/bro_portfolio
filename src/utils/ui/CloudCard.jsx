import React from 'react';

function CloudCard({ url, type, public_id, format, width, height, created_at, original_filename }) {
  const isImage = type === 'image';
  const fallbackImg = "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Foi03cmuyeesegovxmnrq.jpeg";

  return (
    <div className="project-card rounded-xl shadow-lg overflow-hidden group transition-transform duration-200 hover:scale-105 hover:shadow-2xl bg-gray-800 border border-gray-700 flex flex-col">
      {/* Media Container */}
      <div className={`relative w-full ${isImage ? 'aspect-[4/5]' : 'aspect-video'} bg-gray-900 flex items-center justify-center overflow-hidden`}>
        {isImage ? (
          <img
            src={url || fallbackImg}
            alt={original_filename || public_id}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
            loading="lazy"
          />
        ) : (
          <video
            src={url}
            controls
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
          />
        )}
        {/* Type Badge */}
        <span className={`absolute top-2 right-2 px-2 md:px-3 py-1 text-xs md:text-sm font-semibold rounded-full shadow text-white ${isImage ? 'bg-sky-500' : 'bg-purple-500'}`}>
          {isImage ? 'Image' : 'Video'}
        </span>
        {/* Hover Overlay */}
        <div className="absolute inset-0 pointer-events-none group-hover:bg-black/10 transition duration-200"></div>
      </div>

      {/* Details */}
      <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
        {/* Filename */}
        <h3 className="text-base md:text-lg font-bold text-white mb-2 truncate" title={original_filename || public_id}>
          {original_filename || public_id}
        </h3>

        {/* Format & Dimensions */}
        <div className="flex flex-wrap items-center text-gray-400 text-xs md:text-sm mb-2 gap-2">
          <span className="inline-block px-2 py-0.5 bg-gray-700 rounded font-medium">
            {format?.toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-sky-400">
              <rect width="24" height="24" fill="none" />
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {width}x{height}
          </span>
        </div>

        {/* Created At */}
        <div className="flex items-center text-xs text-gray-500 gap-1">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-sky-400">
            <rect width="24" height="24" fill="none"/>
            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {created_at ? new Date(created_at).toLocaleString() : 'N/A'}
        </div>
      </div>
    </div>
  );
}

export default CloudCard;
