// src/components/MyProfile/MyConnectionsAndContact.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faPhone, faCommentDots, faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook, faTwitter, faInstagram, faLinkedinIn, faTiktok, faWhatsapp, faYoutube
} from '@fortawesome/free-brands-svg-icons';

const MyConnectionsAndContact = ({ athlete }) => {
  // Line 6 will be here. Safely access contactSettings and its properties.
  // If athlete or athlete.contactSettings is undefined, default to an empty object.
  const contactSettings = athlete?.contactSettings || {};

  // Safely access individual flags using nullish coalescing (??) which defaults to false
  // if the property is null or undefined.
  const inAppMessagingEnabled = contactSettings.inAppMessagingEnabled ?? false;
  const emailEnabled = contactSettings.emailEnabled ?? false;
  const phoneEnabled = contactSettings.phoneEnabled ?? false;
  // Safely get socialMediaVisibility, defaulting to an empty object if undefined
  const socialMediaVisibility = contactSettings.socialMediaVisibility || {};

  const icons = athlete?.icons || {}; // Safely get the icons object

  // Helper to render social link if enabled and available
  const renderSocialLink = (platform, icon, url) => {
    // Check if the platform is explicitly enabled in socialMediaVisibility AND the URL exists
    if (socialMediaVisibility[platform] && url) {
      // Special handling for WhatsApp URL if it's a phone number
      const finalUrl = (platform === 'whatsapp' && !url.startsWith('http')) ? `https://wa.me/${url}` : url;
      return (
        <a
          key={platform} // Added key for list rendering
          href={finalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label={`${platform} profile`}
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </a>
      );
    }
    return null;
  };

  const hasAnySocialMediaLink = Object.keys(socialMediaVisibility).some(platform => socialMediaVisibility[platform] && icons[platform]);
  const hasAnyDirectContact = inAppMessagingEnabled || emailEnabled || phoneEnabled;


  return (
    <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-white">
      <h3 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
        Connect & Contact
      </h3>

      <div className="space-y-4">
        {/* Direct Contact Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 border-gray-200 dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">Direct Contact:</p>
          <div className="flex flex-wrap gap-4">
            {inAppMessagingEnabled && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                aria-label="Send in-app message"
              >
                <FontAwesomeIcon icon={faCommentDots} /> In-App Message
              </button>
            )}
            {emailEnabled && icons.email && (
              <a
                href={`mailto:${icons.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                aria-label="Send email"
              >
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </a>
            )}
            {phoneEnabled && icons.phone && (
              <a
                href={`tel:${icons.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
                aria-label="Call athlete"
              >
                <FontAwesomeIcon icon={faPhone} /> Call
              </a>
            )}
            {!hasAnyDirectContact && (
              <p className="text-gray-600 dark:text-gray-400">No direct contact options enabled.</p>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 border-gray-200 dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">Social Media:</p>
          <div className="flex flex-wrap gap-4">
            {renderSocialLink('facebook', faFacebook, icons.facebook)}
            {renderSocialLink('twitter', faTwitter, icons.twitter)}
            {renderSocialLink('instagram', faInstagram, icons.instagram)}
            {renderSocialLink('linkedin', faLinkedinIn, icons.linkedin)}
            {renderSocialLink('tiktok', faTiktok, icons.tiktok)}
            {renderSocialLink('whatsapp', faWhatsapp, icons.whatsapp)} {/* WhatsApp URL handled in renderSocialLink */}
            {renderSocialLink('youtube', faYoutube, icons.youtube)}
            {!hasAnySocialMediaLink && (
              <p className="text-gray-600 dark:text-gray-400">No social media links enabled or available.</p>
            )}
          </div>
        </div>

        {/* Share Profile */}
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">Share Profile:</p>
          <button
            onClick={() => {
              if (navigator.clipboard && window.location.href) {
                navigator.clipboard.writeText(window.location.href)
                  .then(() => alert('Profile link copied to clipboard!'))
                  .catch(err => console.error('Failed to copy: ', err));
              } else {
                // Fallback for older browsers
                const el = document.createElement('textarea');
                el.value = window.location.href;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                alert('Profile link copied to clipboard!');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-label="Copy profile link"
          >
            <FontAwesomeIcon icon={faShareAlt} /> Copy Link
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyConnectionsAndContact;