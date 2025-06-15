// src/pages/TermsOfServicePage.jsx

import React, { useEffect } from 'react';
import {
  FaFileContract, FaCheckCircle, FaUser, FaCloudUploadAlt, FaHandshake,
  FaShieldAlt, FaExclamationTriangle, FaClock, FaGavel, FaEnvelope, FaArrowUp
} from 'react-icons/fa'; // Importing relevant icons for visual cues

const TermsOfServicePage = () => {
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
          <FaFileContract className="text-gamepulse-orange text-5xl md:text-7xl mb-6 mx-auto drop-shadow-lg" />
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 font-heading">
            GamePulse Africa: Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Last Updated: December 10, 2024
          </p>
          <p className="mt-6 text-md md:text-lg text-gray-200 max-w-2xl mx-auto">
            Welcome to GamePulse Africa! These Terms of Service govern your access to and use of our mobile application and website, serving as a **"digital bridge between underrepresented talent and professional opportunities."**
          </p>
        </div>
      </section>

      {/* Table of Contents (for quick navigation) */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-2xl font-bold mb-4 text-center font-heading">Sections</h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            <button onClick={() => scrollToSection('acceptance')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              1. Acceptance
            </button>
            <button onClick={() => scrollToSection('accounts')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              2. User Accounts
            </button>
            <button onClick={() => scrollToSection('user-content')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              3. User Content & Conduct
            </button>
            <button onClick={() => scrollToSection('intellectual-property')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              4. Intellectual Property
            </button>
            <button onClick={() => scrollToSection('data-privacy')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              5. Data Privacy
            </button>
            <button onClick={() => scrollToSection('disclaimers')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              6. Disclaimers
            </button>
            <button onClick={() => scrollToSection('termination')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              7. Termination
            </button>
            <button onClick={() => scrollToSection('changes-to-terms')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              8. Changes to Terms
            </button>
            <button onClick={() => scrollToSection('governing-law')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              9. Governing Law
            </button>
            <button onClick={() => scrollToSection('contact-us')} className="text-gamepulse-blue hover:text-gamepulse-orange font-semibold py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow transition-all text-sm md:text-base">
              10. Contact Us
            </button>
          </nav>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">

        {/* 1. Acceptance of Terms */}
        <section id="acceptance" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaCheckCircle className="text-gamepulse-blue mr-4" /> 1. Acceptance of Terms
          </h2>
          <p className="mb-4 text-gray-700">
            By creating an account, accessing, or using the GamePulse Africa Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our <a href="/privacy-policy" className="text-gamepulse-blue hover:underline">Privacy Policy</a>. These Terms constitute a legally binding agreement between you and GamePulse Africa.
          </p>
        </section>

        {/* 2. User Accounts and Eligibility */}
        <section id="accounts" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaUser className="text-gamepulse-orange mr-4" /> 2. User Accounts and Eligibility
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Eligibility:</span> The Service is designed for high school athletes, coaches/team managers, scouts/recruiters, and fans/parents. By using the Service, you represent and warrant that you are at least 13 years of age. If you are under the age of 18, you must obtain parental or guardian consent to use our services in accordance with applicable laws.
            </li>
            <li>
              <span className="font-semibold">Account Creation:</span> When you sign up for GamePulse Africa, we collect your full name, email address, password, and chosen user type. You may also have the option to sign up with your phone number (via SMS OTP) or social accounts like Google, Facebook, or Apple. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated.
            </li>
            <li>
              <span className="font-semibold">Account Security:</span> You are responsible for safeguarding your password and for any activities or actions under your account. GamePulse Africa implements measures to protect your information from unauthorized access, alteration, disclosure, or destruction, including secure messaging protocols. However, you are solely responsible for maintaining the confidentiality of your account credentials.
            </li>
          </ul>
        </section>

        {/* 3. User Content and Conduct */}
        <section id="user-content" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaCloudUploadAlt className="text-gamepulse-orange mr-4" /> 3. User Content and Conduct
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Your Content:</span> Users can upload video highlights and photos, provide statistical data, and create a detailed "My Profile". You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). By posting User Content on GamePulse Africa, you grant GamePulse Africa a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such User Content in any and all media or distribution methods (now known or later developed) in connection with the Service. This includes promoting your profile and highlights for talent identification.
            </li>
            <li>
              <span className="font-semibold">Content Guidelines:</span> You agree not to post, upload, or transmit any User Content that:
              <ul className="list-circle pl-6 mt-2 space-y-2">
                <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
                <li>Contains false or misleading information.</li>
                <li>Infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
                <li>Constitutes unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation.</li>
                <li>Contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment.</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Prohibited Conduct:</span> You agree not to:
              <ul className="list-circle pl-6 mt-2 space-y-2">
                <li>Scrape or attempt to scrape data from the Service without express written permission.</li>
                <li>Access, tamper with, or use non-public areas of the Service, GamePulse Africa's computer systems, or the technical delivery systems of GamePulse Africa's providers.</li>
                <li>Probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measures.</li>
                <li>Interfere with, or disrupt, the access of any user, host, or network, including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the Service.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 4. Intellectual Property */}
        <section id="intellectual-property" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaHandshake className="text-gamepulse-blue mr-4" /> 4. Intellectual Property
          </h2>
          <p className="mb-4 text-gray-700">
            All intellectual property rights in the Service and its content (excluding User Content) are owned by GamePulse Africa or its licensors. This includes all software, designs, data structures, algorithms (including for AI-powered talent identification and XP Ranking), and visual elements. You are granted a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial use, subject to these Terms.
          </p>
        </section>

        {/* 5. Data Privacy */}
        <section id="data-privacy" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaShieldAlt className="text-gamepulse-orange mr-4" /> 5. Data Privacy
          </h2>
          <p className="mb-4 text-gray-700">
            Your privacy is paramount to us. Our <a href="/privacy-policy" className="text-gamepulse-blue hover:underline">Privacy Policy</a> explains how we collect, use, disclose, and protect your information, including usage data, device information, and location information. By using the Service, you consent to our data practices as described in the Privacy Policy. We also make efforts to support privacy by design, particularly for low bandwidth environments.
          </p>
        </section>

        {/* 6. Disclaimers and Limitation of Liability */}
        <section id="disclaimers" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaExclamationTriangle className="text-gamepulse-orange mr-4" /> 6. Disclaimers and Limitation of Liability
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-semibold">"As Is" Basis:</span> The Service is provided "AS IS" and "AS AVAILABLE" without warranty of any kind, express or implied. GamePulse Africa makes no warranty that the Service will meet your requirements or be available on an uninterrupted, secure, or error-free basis.
            </li>
            <li>
              <span className="font-semibold">No Guarantee of Opportunities:</span> While GamePulse Africa strives to be a "digital bridge" connecting talent with opportunities, we do not guarantee that using the Service will result in professional contracts, scholarships, or any specific opportunities for athletes. Talent identification and scouting features are tools to improve visibility, not promises of success.
            </li>
            <li>
              <span className="font-semibold">Third-Party Content and Links:</span> The Service may contain links to third-party websites or resources. You acknowledge and agree that GamePulse Africa is not responsible or liable for the availability or accuracy of such websites or resources. Links to such websites or resources do not imply any endorsement by GamePulse Africa.
            </li>
          </ul>
        </section>

        {/* 7. Termination */}
        <section id="termination" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaClock className="text-gamepulse-blue mr-4" /> 7. Termination
          </h2>
          <p className="mb-4 text-gray-700">
            We may suspend or terminate your access to and use of the Service, at our sole discretion, at any time and without notice, including if you violate these Terms. Upon termination, your right to access or use the Service will immediately cease. You may also request the deletion of your account by contacting us.
          </p>
        </section>

        {/* 8. Changes to Terms */}
        <section id="changes-to-terms" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-blue">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaClock className="text-gamepulse-orange mr-4" /> 8. Changes to Terms
          </h2>
          <p className="mb-4 text-gray-700">
            GamePulse Africa reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        {/* 9. Governing Law and Dispute Resolution */}
        <section id="governing-law" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-teal">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaGavel className="text-gamepulse-orange mr-4" /> 9. Governing Law and Dispute Resolution
          </h2>
          <p className="mb-4 text-gray-700">
            These Terms shall be governed and construed in accordance with the laws of Kenya, where our pilot programs are set to roll out. Any disputes arising under or in connection with these Terms shall be resolved in the courts of Kenya.
          </p>
        </section>

        {/* 10. Contact Us */}
        <section id="contact-us" className="mb-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-gamepulse-orange">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading flex items-center">
            <FaEnvelope className="text-gamepulse-blue mr-4" /> 10. Contact Us
          </h2>
          <p className="mb-6 text-gray-700">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">General Inquiries:</span> <a href="mailto:info@gamepulse.africa" className="text-gamepulse-blue hover:underline">info@gamepulse.africa</a>
            </li>
            <li>
              <span className="font-semibold">Support:</span> <a href="mailto:support@gamepulse.africa" className="text-gamepulse-blue hover:underline">support@gamepulse.africa</a>
            </li>
            <li>
              <span className="font-semibold">Chat with us on WhatsApp:</span> <a href="https://wa.me/+233543210987" target="_blank" rel="noopener noreferrer" className="text-gamepulse-blue hover:underline">Click here to chat</a> (Replace with actual WhatsApp number)
            </li>
            <li>
              <span className="font-semibold">Visit our Help Center:</span> <a href="/help-center" className="text-gamepulse-blue hover:underline">Visit our Help Center</a> (Replace with actual Help Center route)
            </li>
          </ul>
        </section>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

export default TermsOfServicePage;