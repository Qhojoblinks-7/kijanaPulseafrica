// src/components/AthleteProfile/ConnectOpportunities.jsx
import React from 'react';
import { FaHandshake, FaEnvelope, FaAt, FaShareAlt, FaTiktok, FaInstagram, FaTwitter } from 'react-icons/fa';

const ConnectOpportunities = ({ athlete }) => {
  // Icons from athlete.icons, or default fallback
  const HandshakeIcon = athlete.icons?.FaHandshake || FaHandshake;
  const EnvelopeIcon = athlete.icons?.FaEnvelope || FaEnvelope;
  const AtIcon = athlete.icons?.FaAt || FaAt;
  const ShareAltIcon = athlete.icons?.FaShareAlt || FaShareAlt;

  // Dynamically get social media icons
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'tiktok': return athlete.icons?.FaTiktok || FaTiktok;
      case 'instagram': return athlete.icons?.FaInstagram || FaInstagram;
      case 'twitter': return athlete.icons?.FaTwitter || FaTwitter;
      // Add more as needed
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
        <HandshakeIcon className="text-gamepulse-blue mr-3" /> Connect with {athlete.fullName.split(' ')[0]}
      </h2>

      {/* Contact Options */}
      <div className="space-y-4 mb-8">
        {athlete.contactOptions.inAppMessaging && (
          <button
            className="w-full md:w-auto px-6 py-3 bg-gamepulse-blue text-white font-bold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center text-lg"
            onClick={() => console.log('Initiate in-app message to', athlete.fullName)}
          >
            <EnvelopeIcon className="mr-3 text-white" /> Send a Message
          </button>
        )}
        {athlete.contactOptions.publicEmail && (
          <a
            href={`mailto:${athlete.contactOptions.publicEmail}`}
            className="block text-gamepulse-blue hover:underline font-semibold flex items-center text-base md:text-lg bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm"
          >
            <AtIcon className="mr-3 text-gamepulse-teal flex-shrink-0" /> {athlete.contactOptions.publicEmail}
          </a>
        )}
      </div>

      {/* Coach/Agent Contact */}
      {athlete.coachAgentContact && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Official Representative</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 shadow-sm mb-8">
            <p className="font-bold text-lg mb-1">{athlete.coachAgentContact.name}</p>
            <p className="text-sm md:text-base">Phone: <a href={`tel:${athlete.coachAgentContact.phone}`} className="text-gamepulse-blue hover:underline">{athlete.coachAgentContact.phone}</a></p>
            <p className="text-sm md:text-base">Email: <a href={`mailto:${athlete.coachAgentContact.email}`} className="text-gamepulse-blue hover:underline">{athlete.coachAgentContact.email}</a></p>
          </div>
        </>
      )}

      {/* Social Media Links */}
      {athlete.socialMediaLinks && athlete.socialMediaLinks.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-heading">Follow on Social Media</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
            {athlete.socialMediaLinks.map((link, index) => {
              const SocialIcon = getSocialIcon(link.platform);
              return SocialIcon ? (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.platform} Profile`}
                  className="text-gray-700 hover:text-gamepulse-dark transform hover:scale-110 transition-transform duration-200"
                >
                  <SocialIcon className="text-4xl" />
                </a>
              ) : null;
            })}
          </div>
        </>
      )}

      {/* Share Profile Button */}
      <div className="flex justify-center md:justify-start">
        <button
          onClick={handleShareProfile}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center text-base md:text-lg"
        >
          <ShareAltIcon className="mr-3 text-gamepulse-blue" /> Share Profile
        </button>
      </div>
    </section>
  );
};

export default ConnectOpportunities;