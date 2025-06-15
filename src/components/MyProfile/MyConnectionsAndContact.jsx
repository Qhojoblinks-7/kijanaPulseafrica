// src/components/MyProfile/MyConnectionsAndContact.jsx
import React, { useState } from 'react';
import { FaHandshake, FaEnvelope, FaAt, FaShareAlt, FaPen, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

const MyConnectionsAndContact = ({ athlete }) => {
  const [inAppMessagingEnabled, setInAppMessagingEnabled] = useState(athlete.contactOptions.inAppMessagingEnabled);
  const [publicEmailEnabled, setPublicEmailEnabled] = useState(athlete.contactOptions.publicEmailEnabled);

  // Icons from athlete.icons, or default fallback
  const HandshakeIcon = athlete.icons?.FaHandshake || FaHandshake;
  const EnvelopeIcon = athlete.icons?.FaEnvelope || FaEnvelope;
  const AtIcon = athlete.icons?.FaAt || FaAt;
  const ShareAltIcon = athlete.icons?.FaShareAlt || FaShareAlt;
  const PenIcon = athlete.icons?.FaPen || FaPen;
  const PlusCircleIcon = athlete.icons?.FaPlusCircle || FaPlusCircle;
  const TrashIcon = athlete.icons?.FaTrashAlt || FaTrashAlt;


  // Dynamically get social media icons
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'tiktok': return athlete.icons?.FaTiktok || FaTiktok;
      case 'instagram': return athlete.icons?.FaInstagram || FaInstagram;
      case 'twitter': return athlete.icons?.FaTwitter || FaTwitter;
      default: return null;
    }
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${athlete.fullName}'s GamePulse Africa Profile`,
        text: `Check out ${athlete.fullName}'s impressive sports profile on GamePulse Africa!`,
        url: window.location.href, // Current URL of the profile
      }).then(() => {
        console.log('Profile shared successfully');
      }).catch((error) => {
        console.error('Error sharing profile:', error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Profile link copied to clipboard!'))
        .catch((error) => console.error('Failed to copy link: ', error));
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-8 md:py-12 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center">
        <HandshakeIcon className="text-gamepulse-blue mr-3" /> Connect with Me
      </h2>

      {/* Contact Options */}
      <div className="space-y-4 mb-8">
        {/* In-App Messaging Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center">
            <EnvelopeIcon className="mr-3 text-gamepulse-teal text-xl" />
            <p className="font-semibold text-gray-800">Allow secure in-app messages</p>
          </div>
          <label htmlFor="inAppMessagingToggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="inAppMessagingToggle"
                className="sr-only"
                checked={inAppMessagingEnabled}
                onChange={() => setInAppMessagingEnabled(!inAppMessagingEnabled)}
              />
              <div className={`block ${inAppMessagingEnabled ? 'bg-gamepulse-blue' : 'bg-gray-300'} w-14 h-8 rounded-full`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${inAppMessagingEnabled ? 'translate-x-full' : ''}`}></div>
            </div>
          </label>
        </div>

        {/* Public Contact Email */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 shadow-sm relative group">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AtIcon className="mr-3 text-gamepulse-teal text-xl" />
              <div>
                <p className="font-semibold text-lg">Public Contact Email</p>
                <p className="text-sm md:text-base">{athlete.contactOptions.publicEmail || 'Not set'}</p>
              </div>
            </div>
            <label htmlFor="publicEmailToggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="publicEmailToggle"
                  className="sr-only"
                  checked={publicEmailEnabled}
                  onChange={() => setPublicEmailEnabled(!publicEmailEnabled)}
                />
                <div className={`block ${publicEmailEnabled ? 'bg-gamepulse-blue' : 'bg-gray-300'} w-14 h-8 rounded-full`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${publicEmailEnabled ? 'translate-x-full' : ''}`}></div>
              </div>
            </label>
          </div>
          <button className="absolute top-2 right-2 md:right-auto md:left-2/3 lg:left-3/4 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm opacity-0 group-hover:opacity-100 md:opacity-100 md:static md:ml-2">
            <PenIcon />
            <span className="sr-only">Edit Public Email</span>
          </button>
        </div>
      </div>


      {/* Coach/Agent Contact */}
      {athlete.coachAgentContact && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Official Representative</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 shadow-sm mb-8 relative group">
            <p className="font-bold text-lg mb-1">{athlete.coachAgentContact.name}</p>
            <p className="text-sm md:text-base">Phone: <a href={`tel:${athlete.coachAgentContact.phone}`} className="text-gamepulse-blue hover:underline">{athlete.coachAgentContact.phone}</a></p>
            <p className="text-sm md:text-base">Email: <a href={`mailto:${athlete.coachAgentContact.email}`} className="text-gamepulse-blue hover:underline">{athlete.coachAgentContact.email}</a></p>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gamepulse-blue transition-colors text-sm opacity-0 group-hover:opacity-100">
              <PenIcon />
              <span className="sr-only">Edit Representative</span>
            </button>
          </div>
        </>
      )}

      {/* Social Media Links */}
      {athlete.socialMediaLinks && athlete.socialMediaLinks.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">My Social Media</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
            {athlete.socialMediaLinks.map((link, index) => {
              const SocialIcon = getSocialIcon(link.platform);
              return SocialIcon ? (
                <div key={index} className="relative group">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.platform} Profile`}
                    className="text-gray-700 hover:text-gamepulse-dark transform hover:scale-110 transition-transform duration-200"
                  >
                    <SocialIcon className="text-4xl" />
                  </a>
                  <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                    <TrashIcon />
                    <span className="sr-only">Remove Social Link</span>
                  </button>
                </div>
              ) : null;
            })}
            <button className="text-gamepulse-blue hover:text-gamepulse-dark transform hover:scale-110 transition-transform duration-200 text-4xl">
              <PlusCircleIcon />
              <span className="sr-only">Add Social Link</span>
            </button>
          </div>
        </>
      )}

      {/* Share Profile Button */}
      <div className="flex justify-center md:justify-start">
        <button
          onClick={handleShareProfile}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center text-base md:text-lg"
        >
          <ShareAltIcon className="mr-3 text-gamepulse-blue" /> Share My Profile
        </button>
      </div>
    </section>
  );
};

export default MyConnectionsAndContact;