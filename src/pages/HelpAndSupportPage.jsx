// src/pages/HelpAndSupportPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaEnvelope, FaPhone, FaSearch, FaInfoCircle } from 'react-icons/fa';

const HelpAndSupportPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null); // State to manage which FAQ item is open

  useEffect(() => {
    document.title = "Help & Support | GamePulse Africa";
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);

  const faqs = [
    {
      question: "How do I create an athlete profile?",
      answer: "After logging in, navigate to the 'My Profile' or 'Athlete Profile' section from your dashboard. You'll find options to upload your photo, add personal details, sporting statistics, achievements, and highlight videos. Make sure to fill out all sections for a comprehensive profile."
    },
    {
      question: "What kind of highlight videos can I upload?",
      answer: "You can upload videos showcasing your best plays, skills, and match performances. We recommend short, high-quality clips focusing on your key strengths. Ensure the videos are well-lit and clearly show your actions."
    },
    {
      question: "How can coaches/scouts find my profile?",
      answer: "Coaches and scouts can use the 'Discover Talent' feature to search for athletes based on sport, position, age, location, and key performance indicators. The more complete and updated your profile is, the easier it will be for them to find you."
    },
    {
      question: "Is GamePulse Africa available outside Ghana?",
      answer: "GamePulse Africa is designed for the entire African continent, aiming to connect high school athletes across various regions. While our initial focus may be on specific countries, we are continuously expanding our reach. Stay tuned for updates on new regions!"
    },
    {
      question: "How do I report an issue or bug?",
      answer: "If you encounter any issues, please contact our support team using the email or phone number provided on this page. Describe the issue in detail, including screenshots or video if possible, to help us assist you faster."
    },
    {
      question: "What is the 'Upcoming Matches' feature?",
      answer: "The 'Upcoming Matches' feature provides a centralized calendar for high school sports events across Africa. You can view schedules, match details, and even get notifications for games involving your favorite teams or athletes."
    },
    {
      question: "Can I use GamePulse Africa on my mobile device?",
      answer: "Yes, GamePulse Africa is designed to be fully responsive and accessible on all mobile devices through your web browser. We are also working on dedicated mobile applications for an even smoother experience."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Hero Section */}
      <section className="bg-gamepulse-blue text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <FaQuestionCircle className="text-6xl mx-auto mb-6 text-gamepulse-orange" />
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-heading drop-shadow-md">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-8 opacity-90">
            Find answers to common questions or reach out to our support team.
          </p>
          {/* Mock Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full py-3 pl-12 pr-4 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-gamepulse-orange"
              disabled // Disable for now as it's a mock
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 italic">
                (Coming Soon!)
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center font-heading">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center text-left p-5 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  {openFAQ === index ? (
                    <FaChevronUp className="text-gamepulse-blue" />
                  ) : (
                    <FaChevronDown className="text-gamepulse-blue" />
                  )}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`px-5 pt-0 text-gray-700 transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 py-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ transitionProperty: 'max-height, opacity, padding' }}
                >
                  <p className="border-t border-gray-200 pt-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 md:py-20 bg-gamepulse-yellow text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 font-heading drop-shadow-sm">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg leading-relaxed mb-10 opacity-90">
            Our support team is here to help. Reach out to us directly and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              to="/contact-us"
              className="inline-flex items-center bg-gamepulse-orange hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 ring-2 ring-gamepulse-orange hover:ring-orange-700"
              aria-label="Go to Contact Us Page"
            >
              <FaEnvelope className="mr-3" /> Contact Form
            </Link>
            <a
              href="mailto:support@gamepulseafrica.com"
              className="inline-flex items-center bg-white text-gamepulse-blue hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 ring-2 ring-white hover:ring-gray-100"
              aria-label="Email our support team"
            >
              <FaEnvelope className="mr-3" /> support@gamepulseafrica.com
            </a>
            <a
              href="tel:+233201234567" // Example Ghana number
              className="inline-flex items-center bg-white text-gamepulse-blue hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 ring-2 ring-white hover:ring-gray-100"
              aria-label="Call our support line"
            >
              <FaPhone className="mr-3" /> +233 20 123 4567
            </a>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-12 md:py-16 bg-gamepulse-blue-dark">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h3 className="text-2xl font-bold text-white mb-6 font-heading">
            Important Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy-policy" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition-colors text-md font-medium">
              <FaInfoCircle className="mr-2" /> Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition-colors text-md font-medium">
              <FaInfoCircle className="mr-2" /> Terms of Service
            </Link>
            <Link to="/about-us" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-full shadow-sm hover:bg-gray-300 transition-colors text-md font-medium">
              <FaInfoCircle className="mr-2" /> About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpAndSupportPage;