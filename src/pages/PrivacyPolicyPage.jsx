// src/pages/PrivacyPolicyPage.jsx

import React, { useEffect } from 'react';
import {
  FaLock, FaInfoCircle, FaUserPlus, FaChartBar, FaVideo, FaComments, FaMobileAlt,
  FaMapMarkerAlt, FaShareAlt, FaCogs, FaTrashAlt, FaWhatsapp, FaEnvelope, FaQuestionCircle, FaArrowUp
} from 'react-icons/fa'; // Importing relevant icons for visual cues

const PrivacyPolicyPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 leading-relaxed">

      {/* Hero Section */}
      <section className="bg-gamepulse-dark text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <FaLock className="text-gamepulse-orange text-5xl md:text-7xl mb-6 mx-auto drop-shadow-lg" />
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 font-heading">
            GamePulse Africa Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Last Updated: December 10, 2024
          </p>
          <p className="mt-6 text-md md:text-lg text-gray-200 max-w-2xl mx-auto">
            At GamePulse Africa, we are committed to **unleashing Africa's sporting potential**. This policy explains how we collect, use, disclose, and protect your information to provide a foundational digital platform for high school sports showcasing and reporting in Africa.
          </p>
        </div>
      </section>

      {/* Table of Contents (for quick navigation) */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-2xl font-bold mb-4 text-center font-heading">Jump to Section</h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            <button onClick={() => scrollToSection('info-collection')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              1. Information We Collect
            </button>
            <button onClick={() => scrollToSection('info-use')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              2. How We Use Your Info
            </button>
            <button onClick={() => scrollToSection('info-sharing')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              3. How We Share Info
            </button>
            <button onClick={() => scrollToSection('choices-rights')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              4. Your Choices & Rights
            </button>
            <button onClick={() => scrollToSection('data-security')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              5. Data Security
            </button>
            <button onClick={() => scrollToSection('data-retention')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              6. Data Retention
            </button>
            <button onClick={() => scrollToSection('children-privacy')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              7. Children's Privacy
            </button>
            <button onClick={() => scrollToSection('policy-changes')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              8. Policy Changes
            </button>
            <button onClick={() => scrollToSection('contact-us')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              9. Contact Us
            </button>
          </nav>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">

        {/* 1. Information We Collect */}
        <section id="info-collection" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaInfoCircle className="text-gamepulse-blue mr-4" /> 1. Information We Collect
          </h2>
          <p className="mb-6 text-gray-700">
            We collect information to provide and improve our services, ensuring a dynamic and personalized experience for athletes, coaches, scouts, and sports enthusiasts.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUserPlus className="text-gamepulse-teal mr-3" /> a. Information You Provide Directly:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Registration and Profile Data:</span> Full name, email, password, user type (Athlete, Coach, Scout, Fan/Parent). Optional sign-up via phone (SMS OTP) or social accounts (Google, Facebook, Apple).
            </li>
            <li>
              <span className="font-semibold">Athlete Profiles:</span> For athletes, this includes primary sport/position (e.g., "Football - Striker"), school/team, location (e.g., "Nairobi, Kenya"), aspirational bio/tagline, personal statement, key skills/attributes (e.g., "Leadership," "Vision"), and progress in "Digital Classroom" modules.
            </li>
            <li>
              <span className="font-semibold">Performance and Media Content:</span>
              <ul className="list-circle pl-6 mt-2 space-y-2">
                <li><span className="font-semibold">Statistical Data:</span> Core stats by sport (e.g., Football: Goals, Assists; Basketball: Points Per Game; Athletics: Personal Bests) and key achievements/awards.</li>
                <li><span className="font-semibold">Highlights and Media:</span> Uploaded video highlights and photos with title, description, sport, highlight type, associated match, featured athlete(s), and location. You can set privacy (Public, Private, Unlisted).</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Communications:</span> Content of your messages when using in-app messaging or contact features.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
            <FaMobileAlt className="text-gamepulse-teal mr-3" /> b. Information Collected Automatically:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Usage Data:</span> Interactions with the app (pages visited, features used like "Athlete Search," "Live Matches Dashboard," "Upcoming Games" calendar), content viewed, time, frequency, and duration of activities.
            </li>
            <li>
              <span className="font-semibold">Device Information:</span> Device type, operating system, unique device identifiers, and mobile network information, crucial for **low bandwidth environments**.
            </li>
            <li>
              <span className="font-semibold">Location Information:</span> Approximate location based on IP address or device sensors for content filtering (city, country, region).
            </li>
            <li>
              <span className="font-semibold">Engagement Metrics:</span> Followers on profiles, views/likes on highlights.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section id="info-use" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaCogs className="text-gamepulse-orange mr-4" /> 2. How We Use Your Information
          </h2>
          <p className="mb-6 text-gray-700">
            We use the collected information to:
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaChartBar className="text-gamepulse-teal mr-3" /> Provide and Personalize Services:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Create and manage your GamePulse Africa account and profiles.</li>
            <li>Display your public profile and highlight your abilities to coaches, scouts, and sports enthusiasts.</li>
            <li>Showcase real-time match details and live scores.</li>
            <li>Provide access to live streaming and on-demand video highlights.</li>
            <li>Enable searching and filtering of athlete profiles by criteria like sport, position, location, performance metrics, and "XP Ranking" for talent identification.</li>
            <li>Deliver personalized alerts and notifications about your favorite teams, players, and upcoming events.</li>
            <li>Offer personalized content and suggestions (e.g., "Similar Athletes," "Trending Highlights," "Top Live Matches," "Key Matches This Week").</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
            <FaVideo className="text-gamepulse-teal mr-3" /> Improve Visibility and Talent Identification:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Facilitate "early talent identification" by presenting comprehensive performance data and highlights.</li>
            <li>Support the "XP Ranking" system for talent spotting.</li>
            <li>Integrate data analytics into grassroots sports development to inform public policy and enhance youth engagement.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
            <FaComments className="text-gamepulse-teal mr-3" /> Facilitate Communication and Engagement:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Enable secure in-app messaging between users.</li>
            <li>Allow social sharing of profiles and highlights on other platforms (e.g., WhatsApp, Twitter/X, Instagram, TikTok).</li>
            <li>Foster community engagement and support networks.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center">
            <FaCogs className="text-gamepulse-teal mr-3" /> Operations and Development:
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Ensure the app operates efficiently across various devices and network conditions, particularly in **low bandwidth environments**.</li>
            <li>Troubleshoot and improve app functionality.</li>
            <li>Conduct research and analysis to understand usage patterns and enhance user experience. Our internal knowledge graph helps us understand entities and train machine learning models for insights.</li>
            <li>Develop AI-powered talent identification tools and other features.</li>
          </ul>
        </section>

        {/* 3. How We Share Your Information */}
        <section id="info-sharing" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaShareAlt className="text-gamepulse-orange mr-4" /> 3. How We Share Your Information
          </h2>
          <p className="mb-6 text-gray-700">
            We share your information in the following ways:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Publicly Available Information:</span> Information you make public on your profile (e.g., name, sport, position, school, stats, highlights, bio) and shared content (e.g., public highlights) is visible to other GamePulse Africa users, including coaches, scouts, and sports enthusiasts.
            </li>
            <li>
              <span className="font-semibold">With Your Consent:</span> We will share your information with third parties when you explicitly consent to such sharing (e.g., linking social media profiles or opting to make your contact email public).
            </li>
            <li>
              <span className="font-semibold">With Associated Parties:</span> If you are an athlete, and you list a coach or agent, their contact information may be displayed on your profile for official inquiries.
            </li>
            <li>
              <span className="font-semibold">For External Sharing:</span> When you use the "Share Profile" or "Share Highlight" buttons, a link to the content is generated, which can then be shared on external platforms.
            </li>
            <li>
              <span className="font-semibold">For Legal Reasons:</span> We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with legal obligations, protect our rights or property, prevent fraud or abuse, or ensure the safety of our users.
            </li>
            <li>
              <span className="font-semibold">Aggregated or Anonymized Data:</span> We may share aggregated or anonymized data that cannot be used to identify you personally for research, market analysis, or to inform public policy related to sports development.
            </li>
          </ul>
        </section>

        {/* 4. Your Choices and Rights */}
        <section id="choices-rights" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaUserPlus className="text-gamepulse-blue mr-4" /> 4. Your Choices and Rights
          </h2>
          <p className="mb-6 text-gray-700">
            You have control over your information:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Profile Management:</span> You can access, review, update, and correct the information in your "My Profile" at any time.
            </li>
            <li>
              <span className="font-semibold">Highlight Visibility:</span> You can set the privacy status of your uploaded highlights as Public, Private, or Unlisted.
            </li>
            <li>
              <span className="font-semibold">Communication Preferences:</span> You can manage your notification and alert settings for game updates, top stories, and other events.
            </li>
            <li>
              <span className="font-semibold">Social Sharing:</span> You have the option to enable or disable social sharing for your highlights.
            </li>
            <li>
              <span className="font-semibold">Account Deletion:</span> You may request the deletion of your account by contacting us.
            </li>
          </ul>
        </section>

        {/* 5. Data Security */}
        <section id="data-security" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaLock className="text-gamepulse-orange mr-4" /> 5. Data Security
          </h2>
          <p className="text-gray-700">
            We implement a range of technical and organizational measures to **protect your information from unauthorized access, alteration, disclosure, or destruction**. Our app's design with React.js, Tailwind CSS, and Vite implies a modern, clean, and highly performant web/app experience, contributing to secure data handling. We use **secure messaging protocols** for in-app communications. We also implement clear error handling for network issues, which is crucial for **low bandwidth environments**.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section id="data-retention" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaTrashAlt className="text-gamepulse-orange mr-4" /> 6. Data Retention
          </h2>
          <p className="text-gray-700">
            We retain your personal information for as long as necessary to provide our services, comply with our legal obligations, resolve disputes, and enforce our agreements. If you close your account, we will delete your personal information, though some aggregated or anonymized data may persist for analytical purposes.
          </p>
        </section>

        {/* 7. Children's Privacy */}
        <section id="children-privacy" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaInfoCircle className="text-gamepulse-blue mr-4" /> 7. Children's Privacy
          </h2>
          <p className="text-gray-700">
            GamePulse Africa is designed for high school athletes and related stakeholders. Users under the age of 18 are required to have parental or guardian consent to use our services in accordance with applicable laws. We encourage parents and guardians to monitor their children's online activities and to help enforce this policy by instructing their children never to provide personal information through the Service without their permission.
          </p>
        </section>

        {/* 8. Changes to This Privacy Policy */}
        <section id="policy-changes" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaCogs className="text-gamepulse-orange mr-4" /> 8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        {/* 9. Contact Us */}
        <section id="contact-us" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaQuestionCircle className="text-gamepulse-orange mr-4" /> 9. Contact Us
          </h2>
          <p className="mb-6 text-gray-700">
            If you have any questions, feedback, or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/contact-us" // Link to your main contact page
              className="inline-flex items-center bg-gamepulse-blue hover:bg-gamepulse-dark text-white font-bold py-3 px-6 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope className="mr-3" /> Visit Our Contact Page
            </a>
            <a
              href="mailto:info@gamepulse.africa"
              className="inline-flex items-center text-gamepulse-blue hover:text-gamepulse-orange font-bold text-lg"
            >
              <FaEnvelope className="mr-2" /> info@gamepulse.africa
            </a>
            <a
              href="mailto:support@gamepulse.africa"
              className="inline-flex items-center text-gamepulse-blue hover:text-gamepulse-orange font-bold text-lg"
            >
              <FaEnvelope className="mr-2" /> support@gamepulse.africa
            </a>
            <a
              href="https://wa.me/yourwhatsappnumber" // Replace with your actual WhatsApp business number
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gamepulse-blue hover:text-gamepulse-orange font-bold text-lg"
            >
              <FaWhatsapp className="mr-2" /> Message us on WhatsApp
            </a>
          </div>
        </section>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => scrollToSection('top')} // Using a dummy ID 'top' for the very top of the page
            className="bg-gamepulse-orange text-white p-4 rounded-full shadow-lg hover:bg-gamepulse-dark transition-colors duration-300 transform hover:scale-110"
            aria-label="Back to Top"
          >
            <FaArrowUp className="text-xl" />
          </button>
        </div>

      </div>

      {/* Footer (assuming global footer, but included here for completeness) */}
      <footer className="bg-gray-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="text-left md:text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">GamePulse Africa</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering Africa's sporting future by connecting talent with opportunity.
              </p>
            </div>
            <div className="text-left md:text-center">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">Legal & Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Terms of Service</a></li>
                <li><a href="/help-center" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Help & Support</a></li>
              </ul>
            </div>
            <div className="text-left md:text-center lg:text-right">
              <h3 className="text-xl font-bold mb-4 text-gamepulse-orange font-heading">Visit Us</h3>
              <p className="text-gray-300 text-sm">
                Accra, Greater Accra Region, Ghana <br/>
                (Headquarters)
              </p>
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

export default PrivacyPolicyPage;