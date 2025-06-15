// src/pages/AboutUsPage.jsx

import React from 'react';
import {
  FaGlobeAfrica, FaChartLine, FaLightbulb, FaUsers, FaHandshake, FaBullhorn, FaBriefcase,
  FaMapMarkedAlt, FaMobileAlt, FaBolt, FaDownload, FaConnectdevelop, FaBrain, FaRegCommentDots,
  FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube, FaEnvelope, FaChevronRight, FaPlusCircle
} from 'react-icons/fa'; // Importing a comprehensive set of relevant icons

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans text-gray-900 overflow-hidden">

      {/* Hero Section: Our Mission */}
      <section
        className="relative h-[65vh] md:h-[75vh] flex items-center justify-center text-white p-4"
        style={{
          // Authentic, aspirational image of diverse African high school athletes
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1627962635203-d716ed5d2466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="text-center max-w-4xl mx-auto z-10 animate-fade-in-down">
          <FaGlobeAfrica className="text-gamepulse-orange text-5xl md:text-7xl mb-4 mx-auto drop-shadow-lg" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 font-heading drop-shadow-lg">
            Unleashing Africa's Sporting Potential.
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 drop-shadow-md">
            We provide a foundational digital platform for high school sports showcasing and reporting in Africa, improving visibility, structure, and early talent identification. Built by Africans, for African conditions, GamePulse Africa connects underrepresented talent with professional opportunities.
          </h2>
          <button
            onClick={() => alert('Simulating: Redirect to App Store (iOS/Android smart detection).')}
            className="inline-flex items-center bg-gamepulse-orange hover:bg-gamepulse-dark text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl shadow-xl transform hover:scale-105 transition-all duration-300 ring-2 ring-gamepulse-orange hover:ring-gamepulse-dark"
          >
            <FaDownload className="mr-3" /> Download the App
          </button>
        </div>
      </section>

      {/* Our Story & Inspiration */}
      <section className="py-16 md:py-24 bg-white shadow-lg">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center font-heading">
            From the Ground Up: Our Journey.
          </h2>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                GamePulse Africa was born from a deep understanding of the unique challenges facing African youth sports. We saw fragmented or nonexistent systems to track, nurture, and promote talent. Young athletes grappled with **poor visibility, outdated systems, and inaccessible opportunities**, compounded by **limited media attention** for local tournaments.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The spark for GamePulse Africa ignited from **real conversations with Kenyan coaches, players, and clubs**. We recognized the immense raw talent and the urgent need for a structured pathway. This led us to conceive an **AI-powered digital sports intelligence platform** that integrates **data analytics into grassroots sports development**.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our unwavering goal: to **level the playing field for African athletes**. We've built this platform with a commitment to **low bandwidth environments, offline compatibility, and mobile-first use**, ensuring accessibility across the continent.
              </p>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              {/* Collage or map highlighting initial focus/grassroots */}
              <img
                src="https://images.unsplash.com/photo-1547849843-059904ee23d0?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Grassroots sports and community engagement"
                className="rounded-xl shadow-2xl object-cover w-full h-80 md:h-96 transform hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart: Our Values & Approach */}
      <section className="py-16 md:py-24 bg-gamepulse-blue/10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center font-heading">
            More Than Just an App: Our Guiding Principles.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaPlusCircle className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Empowerment</h3>
              <p className="text-gray-700 text-sm">
                We empower athletes to **build a comprehensive profile, track their progress, and connect directly with life-changing opportunities**. Your journey, your control.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaMobileAlt className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusivity & Accessibility</h3>
              <p className="text-gray-700 text-sm">
                Designed for **low bandwidth environments** and **mobile-first use**, we ensure access for **underrepresented talent** and **young players in underserved regions** across Africa.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaBrain className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-700 text-sm">
                We leverage cutting-edge **AI-powered talent identification** and **data-driven scouting** to bring objective, fair assessment to grassroots sports.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaRegCommentDots className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-700 text-sm">
                This isn't a copy-paste of Western apps. GamePulse Africa came from **real conversations** and deep insights into the unique African sporting landscape.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaUsers className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-700 text-sm">
                We foster a vibrant **community hub** where athletes, coaches, and fans can build support networks and celebrate African sporting excellence together.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gamepulse-orange transform hover:-translate-y-2 transition-transform duration-300">
              <FaChartLine className="text-gamepulse-blue text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Mindset</h3>
              <p className="text-gray-700 text-sm">
                We are committed to continuous improvement, adapting to the needs of the African sports ecosystem to drive sustainable growth and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 md:py-24 bg-gamepulse-dark text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center font-heading">
            The Visionaries Behind GamePulse Africa.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Example Team Member 1 */}
            <div className="flex flex-col items-center text-center bg-gray-700/50 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://via.placeholder.com/150/FF7F00/FFFFFF?text=Team+Member" // Replace with actual headshot
                alt="Gordon Gogo - Advocate"
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gamepulse-orange"
              />
              <h3 className="text-2xl font-bold text-white mb-2">Gordon Gogo</h3>
              <p className="text-gamepulse-orange text-sm font-semibold mb-3">Co-Founder & Lead Advocate</p>
              <p className="text-gray-300 text-base leading-relaxed">
                A passionate advocate for youth development in Africa and a member of Young African Leaders in Sports (YALS). Gordon's research on data analytics in grassroots sports fuels our mission.
              </p>
            </div>
            {/* Example Team Member 2 */}
            <div className="flex flex-col items-center text-center bg-gray-700/50 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://via.placeholder.com/150/007FFF/FFFFFF?text=Team+Member" // Replace with actual headshot
                alt="AI Advisor"
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gamepulse-blue"
              />
              <h3 className="text-2xl font-bold text-white mb-2">Dr. Amina Diallo</h3>
              <p className="text-gamepulse-blue text-sm font-semibold mb-3">Chief AI Advisor</p>
              <p className="text-gray-300 text-base leading-relaxed">
                With expertise in machine learning and sports analytics, Amina drives our innovative approach to talent identification and performance tracking.
              </p>
            </div>
            {/* Example Team Member 3 */}
            <div className="flex flex-col items-center text-center bg-gray-700/50 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://via.placeholder.com/150/00A88F/FFFFFF?text=Team+Member" // Replace with actual headshot
                alt="Lead Designer"
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gamepulse-teal"
              />
              <h3 className="text-2xl font-bold text-white mb-2">Kwame Nkrumah Jr.</h3>
              <p className="text-gamepulse-teal text-sm font-semibold mb-3">Lead UI/UX Designer</p>
              <p className="text-gray-300 text-base leading-relaxed">
                Kwame ensures our app is intuitive, engaging, and perfectly suited for a mobile-first experience across diverse African users.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="/careers" // Link to a dedicated careers page
              onClick={() => alert('Simulating: Redirect to Careers page.')}
              className="inline-flex items-center bg-gamepulse-blue hover:bg-gamepulse-teal text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 group"
            >
              Join Our Team <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Impact & Future Vision */}
      <section className="py-16 md:py-24 bg-gamepulse-blue/20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center font-heading">
            Driving Growth, Shaping Futures.
          </h2>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1628108493132-15f5d3b66d3a?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Infographic for market growth"
                className="rounded-xl shadow-2xl object-cover w-full h-80 md:h-96 transform hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Africa is on the cusp of a significant **sporting boom**, projected to grow from a $12 billion industry to over $20 billion by 2035. With the global sports tech market set to hit $68.7 billion by 2030, GamePulse Africa is uniquely positioned to **own a significant piece of that future** by formalizing grassroots talent identification.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We believe sport is a powerful **driver of economic growth and social change** on the continent. By democratizing access to **elite-level performance tracking tools** and creating direct pathways, GamePulse Africa is contributing to job creation, societal cohesion, and community upliftment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our journey begins with **pilot programmes across Kenya, with ambitious plans to expand regionally** across Africa. We are actively seeking to **partner with forward-thinking sporting federations, clubs, educational institutions, and investors** who share our vision for a thriving African sports ecosystem.
              </p>
              <div className="mt-8 text-center lg:text-left">
                <button
                  onClick={() => alert('Simulating: Redirect to Partnership Inquiry Form.')}
                  className="inline-flex items-center bg-gamepulse-orange hover:bg-gamepulse-dark text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 mr-4 mb-4 md:mb-0"
                >
                  <FaHandshake className="mr-3" /> Partner With Us
                </button>
                <button
                  onClick={() => alert('Simulating: Redirect to Investor Relations Info.')}
                  className="inline-flex items-center bg-gamepulse-teal hover:bg-gamepulse-blue text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <FaBriefcase className="mr-3" /> Invest in African Talent
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect With Us */}
      <section className="py-16 md:py-24 bg-white shadow-inner-lg">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 font-heading">
            Stay Connected.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
            Have questions, partnership inquiries, or just want to learn more about how GamePulse Africa is making an impact? Reach out to us!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <FaEnvelope className="text-gamepulse-orange text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">General Inquiries</h3>
              <a href="mailto:info@gamepulseafrica.com" className="text-gamepulse-blue hover:underline font-semibold">info@gamepulseafrica.com</a>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <FaBullhorn className="text-gamepulse-orange text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Media & Press</h3>
              <a href="mailto:media@gamepulseafrica.com" className="text-gamepulse-blue hover:underline font-semibold">media@gamepulseafrica.com</a>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
              <FaConnectdevelop className="text-gamepulse-orange text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Partnerships</h3>
              <a href="mailto:partnerships@gamepulseafrica.com" className="text-gamepulse-blue hover:underline font-semibold">partnerships@gamepulseafrica.com</a>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Follow Our Journey</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaFacebook className="text-4xl" /></a>
              <a href="https://twitter.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaTwitter className="text-4xl" /></a>
              <a href="https://instagram.com/gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaInstagram className="text-4xl" /></a>
              <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaWhatsapp className="text-4xl" /></a>
              <a href="https://tiktok.com/@gamepulseafrica" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaTiktok className="text-4xl" /></a>
              <a href="https://www.youtube.com/embed/dQw4w9WgXcQ?si=b_r_lK6X6Z_lM9dO1" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-gray-700 hover:text-gamepulse-blue transition-colors duration-200 transform hover:scale-110"><FaYoutube className="text-4xl" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="/help-support" className="text-gray-300 hover:text-gamepulse-orange transition-colors duration-200">Help & Support</a></li>
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

export default AboutUsPage;