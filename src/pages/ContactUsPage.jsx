// src/pages/ContactUsPage.jsx

import React, { useEffect, useState } from 'react';
import {
  FaEnvelope, FaPhone, FaWhatsapp, FaTwitter, FaInstagram, FaTiktok, FaLinkedin,
  FaMapMarkerAlt, FaQuestionCircle, FaNewspaper, FaHandshake, FaBriefcase, FaGraduationCap
} from 'react-icons/fa'; // Importing relevant icons
import { useNavigate } from 'react-router-dom'; // For programmatic navigation (e.g., to Contact Us page)

const ContactUsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(''); // For success/error messages

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for the field as user types
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.subject) {
      errors.subject = 'Please select a subject';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 500) {
      errors.message = 'Message cannot exceed 500 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitMessage(''); // Clear previous messages
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Sending your message...'); // Provide immediate feedback

    // Simulate API call (replace with your actual backend endpoint)
    try {
      // In a real application, you would send formData to your backend here
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const result = await response.json(); // If your API returns a success message

      // For demonstration, simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitMessage('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ fullName: '', email: '', subject: '', message: '' }); // Clear form
      setFormErrors({}); // Clear any lingering errors

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Failed to send message. Please try again or use alternative methods.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    setFormErrors({});
    setSubmitMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 leading-relaxed">

      {/* Page Header & Branding */}
      <section className="bg-gamepulse-dark text-white py-16 md:py-24 text-center relative overflow-hidden">
        {/* Subtle background graphic for visual interest */}
        <div className="absolute inset-0 z-0 opacity-10"
             style={{ backgroundImage: 'url("/images/african_sports_bg.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
          {/* Ensure logo path is correct relative to public folder */}
          <img src="/gamepulse-logo-white.svg" alt="GamePulse Africa Logo" className="h-16 md:h-20 mb-6 mx-auto drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-heading drop-shadow-lg">
            Get in Touch with GamePulse Africa
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Your feedback helps us build a stronger **digital bridge** for African talent.
            We're here to connect and support the future of African sports.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">

        {/* Primary Contact Form */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-xl border-l-4 border-gamepulse-orange max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-heading text-center">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className={`w-full p-3 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gamepulse-blue transition-colors duration-200`}
                disabled={isSubmitting}
              />
              {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email Address"
                className={`w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gamepulse-blue transition-colors duration-200`}
                disabled={isSubmitting}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full p-3 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gamepulse-blue transition-colors duration-200`}
                disabled={isSubmitting}
              >
                <option value="">Select a Subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support / Bug Report">Technical Support / Bug Report</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
                <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                <option value="Careers">Careers</option>
                <option value="Investment Inquiry">Investment Inquiry</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message (max 500 characters)"
                rows="6"
                maxLength="500"
                className={`w-full p-3 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gamepulse-blue resize-y transition-colors duration-200`}
                disabled={isSubmitting}
              ></textarea>
              <p className="text-right text-sm text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="bg-gamepulse-orange hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full w-full sm:w-auto transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full w-full sm:w-auto transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Clear Form
              </button>
            </div>
            {submitMessage && (
              <p className={`mt-4 text-center ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </section>

        {/* Alternative Contact Methods */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">Other Ways to Connect</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:info@gamepulse.africa"
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaEnvelope className="text-4xl mb-2" />
              <span className="font-semibold text-lg">info@gamepulse.africa</span>
              <span className="text-sm text-gray-600 mt-1">General Inquiries</span>
            </a>
            <a
              href="mailto:support@gamepulse.africa"
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaEnvelope className="text-4xl mb-2" />
              <span className="font-semibold text-lg">support@gamepulse.africa</span>
              <span className="text-sm text-gray-600 mt-1">Technical Support</span>
            </a>
            <a
              href="https://wa.me/+233543210987" // Replace with your actual WhatsApp number for Ghana
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 text-green-600 hover:text-green-700"
            >
              <FaWhatsapp className="text-4xl mb-2" />
              <span className="font-semibold text-lg">Chat on WhatsApp</span>
              <span className="text-sm text-gray-600 mt-1">+233 54 321 0987</span> {/* Example Ghana number */}
            </a>
            {/* Optional: Add a physical address if relevant */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow text-gray-700">
              <FaMapMarkerAlt className="text-4xl mb-2 text-gamepulse-teal" />
              <span className="font-semibold text-lg">Our Headquarters</span>
              <span className="text-sm text-gray-600 mt-1 text-center">Accra, Greater Accra Region, Ghana</span>
            </div>
          </div>
        </section>

        {/* Quick Links & Resources */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">Explore Our Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/help-center')} // Replace with your actual help center route
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaQuestionCircle className="text-5xl mb-3" />
              <span className="text-xl font-semibold font-heading">Help Center & FAQ</span>
              <p className="text-gray-600 text-sm mt-1">Find answers to common questions quickly.</p>
            </button>
            <button
              onClick={() => navigate('/blog')} // Replace with your actual blog route
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaNewspaper className="text-5xl mb-3" />
              <span className="text-xl font-semibold font-heading">Latest Insights</span>
              <p className="text-gray-600 text-sm mt-1">Discover articles and news about African sports.</p>
            </button>
            <button
              onClick={() => navigate('/partnerships')} // Replace with your actual partnerships route
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaHandshake className="text-5xl mb-3" />
              <span className="text-xl font-semibold font-heading">Partnership Opportunities</span>
              <p className="text-gray-600 text-sm mt-1">Collaborate to empower African talent.</p>
            </button>
            <button
              onClick={() => navigate('/careers')} // Replace with your actual careers route
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaBriefcase className="text-5xl mb-3" />
              <span className="text-xl font-semibold font-heading">Join Our Team</span>
              <p className="text-gray-600 text-sm mt-1">Explore career opportunities at GamePulse Africa.</p>
            </button>
            <button
              onClick={() => navigate('/digital-classroom')} // Replace with your actual digital classroom route
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-gamepulse-blue hover:text-gamepulse-orange"
            >
              <FaGraduationCap className="text-5xl mb-3" />
              <span className="text-xl font-semibold font-heading">Digital Classroom</span>
              <p className="text-gray-600 text-sm mt-1">Access modules for athlete development.</p>
            </button>
          </div>
        </section>

        {/* Social Media Presence */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">Follow Us on Social Media</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Stay updated on the latest games, athlete stories, and GamePulse Africa news across our platforms!
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://wa.me/+233543210987" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-5xl text-green-500 hover:text-green-600 transform hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://twitter.com/gamepulseafr" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-5xl text-blue-400 hover:text-blue-500 transform hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://instagram.com/gamepulseafr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-5xl text-pink-500 hover:text-pink-600 transform hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://tiktok.com/@gamepulseafr" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok className="text-5xl text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://linkedin.com/company/gamepulse-africa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-5xl text-blue-700 hover:text-blue-800 transform hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer (Can be a separate component imported globally) */}
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

export default ContactUsPage;