// src/pages/HomePage.jsx

import React from 'react';
import {
  FaPlayCircle, FaDownload, FaGlobeAfrica, // Hero Section icons
  FaChartBar, FaCalendarAlt, FaVideo, FaSearch, // Feature Section icons
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube, // Social Media icons
  // FaChevronRight, FaPlusCircle // Removed unused icons for cleaner import
} from 'react-icons/fa';

import athlete1 from './../assets/Young-female-athlete with-determined-expression.jpeg'
import athlete2 from './../assets/playing-football-on-a-dusty-field.jpeg';
import athlete3 from './../assets/freepik__the-style-is-candid-image-photography-with-natural__69796.jpeg';
import athlete4 from './../assets/freepik__the-style-is-candid-image-photography-with-natural__69797.jpeg';
import profileMockup from './../assets/Gemini_Generated_Image_luire7luire7luir.png';
import scoresAndMalendarMockup  from './../assets/Gemini_Generated_Image_js2nr3js2nr3js2n.png';

import scoutingMockup from './../assets/Gemini_Generated_Image_r4sxdzr4sxdzr4sx.png'

import LivestreamMockup  from './../assets/Gemini_Generated_Image_z8lrs0z8lrs0z8lr.png'

import Hero from './../assets/freepik__the-style-is-candid-image-photography-with-natural__69798.jpeg'

const HomePage = () => {
  // Enhanced download handler for better user experience
  const handleDownloadClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iOSAppStoreLink = 'https://apps.apple.com/us/app/your-gamepulse-ios-app-id'; // REPLACE with actual iOS App Store link
    const androidPlayStoreLink = 'https://play.google.com/store/apps/details?id=com.yourcompany.gamepulse'; // REPLACE with actual Android Play Store link

    if (/android/i.test(userAgent)) {
      window.location.href = androidPlayStoreLink;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = iOSAppStoreLink;
    } else {
      // Fallback for desktop or unrecognized devices
      alert('To get the full experience, download the GamePulse Africa app! Available on the App Store and Google Play.');
      // Optionally, you could open a modal here with links to both stores
    }
  };

  return (
    <div className="min-h-screen mt-5 bg-gradient-to-br from-gamepulse-blue to-gray-200 font-sans text-gray-900 overflow-hidden">

    {/* Hero Section */}
    <section
        className="relative h-screen flex items-center justify-center text-white p-4 overflow-hidden"
        style={{
            backgroundImage: `url(${Hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Parallax effect
        }}
    >
        {/* Transparent blur overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

        <div className="text-center max-w-4xl mx-auto z-10 animate-fade-in-down-slow">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 font-heading drop-shadow-lg">
            Unleash Africa's Next Sporting Stars.
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 drop-shadow-md">
            Your talent, visible. Your journey, tracked. Your opportunities, limitless. GamePulse Africa connects high school athletes with the world.
          </h2>
          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center bg-gamepulse-orange hover:bg-gamepulse-dark text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl shadow-xl transform hover:scale-105 transition-all duration-300 ring-2 ring-gamepulse-orange hover:ring-gamepulse-dark animate-fade-in-up-slow delay-500"
            aria-label="Download GamePulse Africa App"
          >
            <FaDownload className="mr-3" /> Download GamePulse Africa
          </button>
        </div>
    </section>

    {/* Feature Highlights Section */}
      <section className="py-16 md:py-24 bg-white shadow-inner-lg">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center font-heading">
            Your Game. Your Data. Your Future.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Feature 1: Personalized Athlete Profiles */}
            <div className="group bg-gradient-to-br from-gamepulse-blue/5 to-gamepulse-blue/10 p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-gamepulse-blue flex flex-col lg:flex-row items-center transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
              <div className="mb-6 lg:mb-0 lg:mr-8 w-full lg:w-1/2">
                <img
                  src={profileMockup}
                  alt="Athlete profile mockup on phone screen"
                  className="rounded-lg shadow-md border border-gray-200 object-cover w-full h-auto max-h-64 lg:max-h-80 transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <FaChartBar className="text-gamepulse-orange mr-3" /> Build Your Digital Sporting Legacy.
                </h3>
                <p className="text-gamepulse-medium-gray leading-relaxed text-base">
                  Create a dynamic profile showcasing your stats, achievements, and highlights. Track your progress over time, making it easy for scouts and coaches to spot your potential – providing **early exposure** and addressing **talent drain**.
                </p>
              </div>
            </div>

            {/* Feature 2: Digital Sports Calendar & Live Scores */}
            <div className="group bg-gradient-to-br from-gamepulse-teal/5 to-gamepulse-teal/10 p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-gamepulse-teal flex flex-col lg:flex-row items-center transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
              <div className="mb-6 lg:mb-0 lg:mr-8 w-full lg:w-1/2">
                <img
                  src={scoresAndMalendarMockup}
                  alt="Live scores and calendar mockup on phone screen"
                  className="rounded-lg shadow-md border border-gray-200 object-cover w-full h-auto max-h-64 lg:max-h-80 transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <FaCalendarAlt className="text-gamepulse-orange mr-3" /> Never Miss a Moment, Live.
                </h3>
                <p className="text-gamepulse-medium-gray leading-relaxed text-base">
                  Stay updated with real-time scores and upcoming high school games across Africa. Get instant notifications for your favorite teams, combating the **lack of formal structure** and **limited media attention** for local tournaments.
                </p>
              </div>
            </div>

            {/* Feature 3: Live Streaming & On-Demand Highlights */}
            <div className="group bg-gradient-to-br from-gamepulse-blue/5 to-gamepulse-blue/10 p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-gamepulse-blue flex flex-col lg:flex-row items-center transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
              <div className="mb-6 lg:mb-0 lg:mr-8 w-full lg:w-1/2">
                <img
                  src={LivestreamMockup}
                  alt="Live stream mockup on phone screen"
                  className="rounded-lg shadow-md border border-gray-200 object-cover w-full h-auto max-h-64 lg:max-h-80 transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <FaVideo className="text-gamepulse-orange mr-3" /> Experience the Game, Anywhere.
                </h3>
                <p className="text-gamepulse-medium-gray leading-relaxed text-base">
                  Stream high school games live and watch on-demand video highlights of key plays. This provides **unprecedented access** and leverages Africa's **high social media and live streaming penetration**, ensuring content is accessible even in **low bandwidth environments**.
                </p>
              </div>
            </div>

            {/* Feature 4: Simple Talent Spotting / Searchable Profiles */}
            <div className="group bg-gradient-to-br from-gamepulse-teal/5 to-gamepulse-teal/10 p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-gamepulse-teal flex flex-col lg:flex-row items-center transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
              <div className="mb-6 lg:mb-0 lg:mr-8 w-full lg:w-1/2">
                <img
                  src={scoutingMockup}
                  alt="Scouting interface mockup on phone screen"
                  className="rounded-lg shadow-md border border-gray-200 object-cover w-full h-auto max-h-64 lg:max-h-80 transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                  <FaSearch className="text-gamepulse-orange mr-3" /> Discover Tomorrow's Stars Today.
                </h3>
                <p className="text-gamepulse-medium-gray leading-relaxed text-base">
                  For scouts and coaches, easily search and filter athlete profiles by sport, location, and key statistics. This foundational **talent directory** is the first step in creating a direct **digital bridge** to opportunities.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof & Credibility Section */}
      <section className="py-16 md:py-24 bg-gamepulse-dark text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center font-heading">
            Built for Africa, Empowering African Talent.
          </h2>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                GamePulse Africa is proudly developed by Africans, for African conditions, understanding the unique challenges and vast potential of our continent's youth. We deeply understand the nuances of local high school sports, from the vibrant energy of a local football match in Accra to the fierce competition on the basketball courts in Nairobi.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Join the movement transforming African sports – from addressing fragmented systems and inadequate infrastructure to unlocking the continent's **raw, untapped sporting talent**. Our investment in sports goes beyond commercial gain; it's about driving **wealth and job creation, societal cohesion, and community upliftment**, fostering **local content development**, and **enhancing the visibility of African athletes**. We are building a legacy, one athlete at a time.
              </p>
              {/* Optional Testimonial */}
              <div className="mt-8 p-4 bg-gamepulse-blue/20 rounded-lg border border-gamepulse-blue/30 italic text-gamepulse-teal">
                <p>"GamePulse Africa is a game-changer. It's exactly what our young athletes needed to get noticed and pursue their dreams. Truly built for our context!"</p>
                <p className="mt-2 text-right font-semibold">- Coach Mensah, Accra High School Football Team</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {/* Authentic images representing diverse African talent/regions */}
                <img src={athlete2} alt="African youth playing football on a dusty field" className="rounded-xl shadow-lg object-cover h-48 md:h-64 w-full transform hover:scale-[1.03] transition-transform duration-300" />

                <img src={athlete1} alt="Young female athlete with determined expression" className="rounded-xl shadow-lg object-cover h-48 md:h-64 w-full transform hover:scale-[1.03] transition-transform duration-300" />

                <img src={athlete3} alt="Group of diverse young African high school athletes smiling" className="rounded-xl shadow-lg object-cover h-48 md:h-64 w-full transform hover:scale-[1.03] transition-transform duration-300" />

                <img src={athlete4} alt="Rugby players in action on a field" className="rounded-xl shadow-lg object-cover h-48 md:h-64 w-full transform hover:scale-[1.03] transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (Secondary) */}
      <section className="py-16 md:py-24 bg-gamepulse-yellow text-gray text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 font-heading">
            Ready to Transform African High School Sports?
          </h2>
          <p className="text-xl leading-relaxed mb-10">
            Start your journey with GamePulse Africa. Download the app now and be part of the change that's building a stronger future for sports across the continent.
          </p>
          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center bg-white text-gamepulse-orange hover:bg-gray-200 font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl shadow-xl transform hover:scale-105 transition-all duration-300 ring-2 ring-white hover:ring-gray-200"
            aria-label="Download GamePulse Africa App"
          >
            <FaDownload className="mr-3" /> Download GamePulse Africa
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gamepulse-dark text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
            <div className="text-left md:text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">GamePulse Africa</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering Africa's sporting future by connecting talent with opportunity.
              </p>
            </div>
            <div className="text-left md:text-center">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about-us" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Contact</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div className="text-left md:text-center">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">Follow Us</h3>
              <div className="flex justify-start md:justify-center space-x-4">
                <a href="https://facebook.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaFacebook className="text-3xl" /></a>
                <a href="https://twitter.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaTwitter className="text-3xl" /></a>
                <a href="https://instagram.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaInstagram className="text-3xl" /></a>
                <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaWhatsapp className="text-3xl" /></a>
                <a href="https://tiktok.com/@gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaTiktok className="text-3xl" /></a>
                <a href="https://youtube.com/@gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-gray-300 hover:text-gamepulse-blue transition-colors duration-200"><FaYoutube className="text-3xl" /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-sm text-gray-400">
            © {new Date().getFullYear()} GamePulse Africa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;