import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShareAlt, FaInstagram, FaTiktok } from 'react-icons/fa';

// Mock data for the coach and other talent
const mockCoachData = {
  name: 'Kwame', // Used for "Connect with Kwame"
  contactEmail: 'coach.osel@accrasports.gh', // Direct contact email
  coachName: 'Samuel Osei', // Coach's full name for direct contact
  academy: 'Accra Sports Academy', // Coach's academy for direct contact
  socialMedia: {
    instagram: '@kwame_goals',
    tiktok: '@kwameasante_football',
  },
};

const mockOtherTalent = [
  { id: 't1', name: 'Amara Diallo', role: 'Basketball - Point Guard', academy: 'Lagos Basketball Academy', profilePic: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 't2', name: 'Tendai Mwangi', role: 'Football - Midfielder', academy: 'Nairobi United Academy', profilePic: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { id: 't3', name: 'Zara Okafor', role: 'Athletics - Sprinter', academy: 'Abuja Sports Institute', profilePic: 'https://randomuser.me/api/portraits/women/70.jpg' },
];

const MyProfileFooterNav = ({ coachName = mockCoachData.name }) => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Connect with Coach Section */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Connect with {coachName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Contact */}
          <div className="bg-neutral-light-gray-bg rounded-lg p-4">
            <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Direct Contact</h3>
            <button className="w-full bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-5 py-2 rounded-full flex items-center justify-center font-bold transition-colors mb-3">
              <FaEnvelope className="mr-2" /> Send Message
            </button>
            <p className="text-sm text-neutral-medium-gray mb-1">Coach Contact:</p>
            <p className="text-sm font-semibold text-neutral-dark-gray">
              {mockCoachData.coachName} - {mockCoachData.academy}
            </p>
            <a href={`mailto:${mockCoachData.contactEmail}`} className="text-gamepulse-blue text-sm hover:underline">
              {mockCoachData.contactEmail}
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-neutral-light-gray-bg rounded-lg p-4">
            <h3 className="text-lg font-semibold text-neutral-dark-gray mb-3">Social Media</h3>
            <div className="space-y-2 mb-4">
              <p className="text-neutral-dark-gray flex items-center">
                <FaInstagram className="mr-2 text-xl text-neutral-medium-gray" /> {mockCoachData.socialMedia.instagram}
              </p>
              <p className="text-neutral-dark-gray flex items-center">
                <FaTiktok className="mr-2 text-xl text-neutral-medium-gray" /> {mockCoachData.socialMedia.tiktok}
              </p>
            </div>
            <button className="w-full bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray px-5 py-2 rounded-full flex items-center justify-center font-bold transition-colors">
              <FaShareAlt className="mr-2" /> Share Profile
            </button>
          </div>
        </div>
      </section>

      {/* Discover More Talent Section */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-neutral-dark-gray mb-4">Discover More Talent</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockOtherTalent.map(talent => (
            <div key={talent.id} className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-neutral-light-gray-bg transition-colors cursor-pointer border border-neutral-light-gray">
              <img src={talent.profilePic} alt={talent.name} className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gamepulse-blue" />
              <p className="font-semibold text-neutral-dark-gray">{talent.name}</p>
              <p className="text-sm text-neutral-medium-gray">{talent.role}</p>
              <p className="text-xs text-neutral-medium-gray">{talent.academy}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/explore-athletes" className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-6 py-2 rounded-full font-bold transition-colors inline-block">
            Explore All Athletes
          </Link>
        </div>
      </section>
    </div>
  );
};


export default MyProfileFooterNav;