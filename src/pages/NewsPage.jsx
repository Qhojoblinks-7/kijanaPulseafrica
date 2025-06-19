import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars, FaSearch, FaRegCommentDots, FaRegEye, FaTimes,
  FaChevronLeft, FaShareAlt // Added FaChevronLeft for back button, FaShareAlt for share button
} from 'react-icons/fa';

// Mock Data for the News Page
const topStories = [
  {
    id: 'ts1',
    category: 'WORLD',
    date: '28 May, 2024',
    imageUrl: 'https://placehold.co/400x250/6a0dad/ffffff?text=Top+Story+1',
    title: 'Teen Sensation Scores Hat-trick in National Finals',
    excerpt: 'Local football prodigy delivers a stunning performance, securing victory for their school in the highly anticipated national championship match.',
    views: '1.2K',
    comments: '45',
    isMainFeatured: true, // For the large featured article
  },
  {
    id: 'ts2',
    category: 'BASKETBALL',
    date: '27 May, 2024',
    imageUrl: 'https://placehold.co/200x150/007bff/ffffff?text=Top+Story+2',
    title: 'Rising Basketball Star Earns Scholarship Trial in USA',
    excerpt: 'A promising young athlete from Nairobi receives an opportunity to showcase her talent at an international basketball academy.',
  },
  {
    id: 'ts3',
    category: 'ATHLETICS',
    date: '26 May, 2024',
    imageUrl: 'https://placehold.co/200x150/28a745/ffffff?text=Top+Story+3',
    title: 'Athletics Meet Breaks Records Across East Africa',
    excerpt: 'The recent regional athletics championship saw new personal bests and national records shattered by aspiring young sprinters and long-distance runners.',
  },
  {
    id: 'ts4',
    category: 'RUGBY',
    date: '25 May, 2024',
    imageUrl: 'https://placehold.co/200x150/dc3545/ffffff?text=Top+Story+4',
    title: 'Youth Rugby League Concludes with Thrilling Final',
    excerpt: 'The season finale of the high school rugby league provided an exciting clash, highlighting the growing talent in the sport.',
  },
];

const globalNews = [
  {
    id: 'gn1',
    category: 'FOOTBALL',
    date: '28 May, 2024',
    imageUrl: 'https://placehold.co/300x200/ffc107/333333?text=Global+News+1',
    title: 'Grassroots Football Initiatives Launched in West Africa',
    source: 'GamePulse Africa Staff',
    excerpt: 'New programs aim to identify and nurture young football talent in underserved communities, providing essential training and equipment.',
    views: '890',
    shares: '50',
  },
  {
    id: 'gn2',
    category: 'COACHING INSIGHTS',
    date: '27 May, 2024',
    imageUrl: 'https://placehold.co/300x200/17a2b8/ffffff?text=Global+News+2',
    title: 'The Importance of Mental Toughness in Young Athletes',
    source: 'Dr. Amina Keita',
    excerpt: 'Expert advice on developing resilience and psychological strength for peak performance in competitive environments.',
    views: '720',
    shares: '35',
  },
  {
    id: 'gn3',
    category: 'LEAGUE UPDATES',
    date: '26 May, 2024',
    imageUrl: 'https://placehold.co/300x200/6610f2/ffffff?text=Global+News+3',
    source: 'Regional Sports Board',
    title: 'New Inter-School Tournament Announced for Southern Region',
    excerpt: 'Details revealed for an upcoming multi-sport tournament designed to foster regional rivalry and talent discovery.',
    views: '1.1K',
    shares: '80',
  },
  {
    id: 'gn4',
    category: 'COMMUNITY STORIES',
    date: '25 May, 2024',
    imageUrl: 'https://placehold.co/300x200/fd7e14/ffffff?text=Global+News+4',
    title: 'Local Community Rallies to Fund New Sports Facilities',
    source: 'Accra Daily',
    excerpt: 'A heartwarming story of community effort transforming local sporting infrastructure for aspiring young athletes.',
    views: '950',
    shares: '60',
  },
];

const recommendedNews = [
  {
    id: 'rn1',
    category: 'PLAYER FEATURES',
    date: '28 May, 2024',
    imageUrl: 'https://placehold.co/120x90/20c997/ffffff?text=Rec1',
    title: 'Spotlight on Nigeria\'s Next Volleyball Sensation',
    source: 'GamePulse Africa',
  },
  {
    id: 'rn2',
    category: 'COACHING INSIGHTS',
    date: '27 May, 2024',
    imageUrl: 'https://placehold.co/120x90/6f42c1/ffffff?text=Rec2',
    title: 'Tactical Masterclass: Defending in High School Football',
    source: 'Coach Adebayo',
  },
  {
    id: 'rn3',
    category: 'COMMUNITY STORIES',
    date: '26 May, 2024',
    imageUrl: 'https://placehold.co/120x90/e83e8c/ffffff?text=Rec3',
    title: 'The Unsung Heroes: Volunteer Coaches in Rural Areas',
    source: 'Local Reporter',
  },
];

const NewsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentLocaleDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: '2-digit' });

  // Find the main featured article (assuming one is marked as true for isMainFeatured)
  const mainFeaturedArticle = topStories.find(article => article.isMainFeatured);
  const otherFeaturedArticles = topStories.filter(article => !article.isMainFeatured);

  const handleShare = (articleTitle) => {
    // Placeholder for actual sharing logic (e.g., using navigator.share or a modal)
    alert(`Sharing "${articleTitle}"`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Top Header/Navigation Bar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Back Button (leftmost as per image, but functionally for navigation) */}
          <button
            onClick={() => window.history.back()} // Simple browser back
            className="text-gray-800 text-xl md:text-2xl"
            aria-label="Go Back"
          >
            <FaChevronLeft />
          </button>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden lg:flex space-x-6 flex-grow justify-center">
            {['HOME', 'LIFESTYLE', 'TECHNOLOGY', 'PAGES', 'BLOG', 'CONTACT'].map(item => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-700 hover:text-blue-600 font-semibold text-sm uppercase">
                {item}
              </Link>
            ))}
          </nav>

          {/* Right Section: Date, Language, Search, Hamburger for mobile nav */}
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-600 hidden sm:block">
              {currentLocaleDate}
            </span>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-700 focus:outline-none hidden sm:block">
              <option>English</option>
              <option>French</option>
            </select>
            <button className="text-gray-700 hover:text-blue-600 text-lg" aria-label="Search">
              <FaSearch />
            </button>
            {/* Hamburger Menu (Mobile) */}
            <button
              className="lg:hidden text-gray-800 text-2xl ml-2" // Margin for separation
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-30 flex flex-col items-center justify-start pt-20 pb-4 overflow-y-auto lg:hidden">
          <button
            className="absolute top-4 right-4 text-gray-800 text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Navigation"
          >
            <FaTimes />
          </button>
          <nav className="flex flex-col space-y-4 w-full px-6 mt-4">
            {['HOME', 'LIFESTYLE', 'TECHNOLOGY', 'PAGES', 'BLOG', 'CONTACT'].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block text-gray-800 hover:bg-gray-100 py-3 px-4 rounded-md font-semibold text-lg uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}


      {/* Main Content Area */}
      <div className="pt-20 lg:pt-24 container mx-auto px-4 py-8"> {/* Adjusted padding-top for fixed header */}

        {/* Categories below header - (WORLD, UNCATEGORIZED) as seen in image */}
        <div className="flex justify-start space-x-4 text-sm font-semibold text-gray-600 mb-6 border-b border-gray-200 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/news/category/world" className="hover:text-blue-600 px-2 py-1 rounded-md">WORLD</Link>
          <Link to="/news/category/uncategorized" className="hover:text-blue-600 px-2 py-1 rounded-md">UNCATEGORIZED</Link>
          {/* Add more categories as needed */}
        </div>

        {/* Main Featured News Section */}
        <section className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mainFeaturedArticle && (
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
              <img src={mainFeaturedArticle.imageUrl} alt={mainFeaturedArticle.title} className="w-full h-48 md:h-72 object-cover" />
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase mb-2 block">{mainFeaturedArticle.category}</span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{mainFeaturedArticle.title}</h2>
                <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">{mainFeaturedArticle.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{mainFeaturedArticle.date}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center"><FaRegCommentDots className="mr-1" /> {mainFeaturedArticle.comments}</span>
                    <span className="flex items-center"><FaRegEye className="mr-1" /> {mainFeaturedArticle.views}</span>
                  </div>
                </div>
                <Link to={`/news/${mainFeaturedArticle.id}`} className="mt-4 inline-block text-blue-600 hover:underline text-sm font-semibold">Read More</Link>
              </div>
            </div>
          )}

          <div className="lg:col-span-1 space-y-4">
            {otherFeaturedArticles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-row">
                <img src={article.imageUrl} alt={article.title} className="w-24 h-24 object-cover flex-shrink-0" />
                <div className="p-3 flex-grow">
                  <span className="text-xxs font-semibold text-gray-500 uppercase mb-1 block">{article.category} {article.date}</span>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{article.title}</h3>
                  <Link to={`/news/${article.id}`} className="text-blue-600 hover:underline text-xs">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Popular</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {/* The image shows categories as clickable image blocks under 'Popular' */}
            {['Fonts', 'Icons', 'Mockups', 'Presentation', 'Web Elements'].map((catName, index) => (
              <div key={index} className="flex-shrink-0 text-center w-24">
                <img src={`https://placehold.co/120x80/6c757d/ffffff?text=${catName}`} alt={catName} className="w-full h-16 object-cover rounded-md mb-2" />
                <span className="text-sm font-semibold text-gray-700">{catName}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Global News & Recommended Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Global News */}
          <section className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Global News</h2>
            <div className="space-y-6">
              {globalNews.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-48 md:h-auto md:w-1/3 object-cover flex-shrink-0" />
                  <div className="p-4 flex-grow">
                    <span className="text-xs font-semibold text-blue-600 uppercase mb-2 block">{article.category} <span className="text-gray-500">{article.date}</span></span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>By {article.source}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center"><FaRegEye className="mr-1" /> {article.views}</span>
                        <button onClick={() => handleShare(article.title)} className="text-gray-500 hover:text-blue-600" aria-label="Share Article">
                          <FaShareAlt className="ml-1" />
                        </button>
                      </div>
                    </div>
                    <Link to={`/news/${article.id}`} className="mt-4 inline-block text-blue-600 hover:underline text-sm font-semibold">Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended News */}
          <section className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended</h2>
            <div className="space-y-4">
              {recommendedNews.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                  <img src={article.imageUrl} alt={article.title} className="w-20 h-16 object-cover flex-shrink-0" />
                  <div className="p-3 flex-grow">
                    <span className="text-xxs font-semibold text-gray-500 uppercase mb-1 block">{article.category} {article.date}</span>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{article.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
