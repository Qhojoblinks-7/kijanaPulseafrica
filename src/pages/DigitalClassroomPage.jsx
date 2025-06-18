import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaChevronDown, FaCheckCircle, FaBookOpen, FaInfoCircle } from 'react-icons/fa';

// Mock Data for courses
const recommendedCourses = [
  {
    id: 'rec1',
    title: 'Nutrition for Peak Performance',
    description: 'Master the fundamentals of sports nutrition to fuel your body and optimize recovery.',
    instructor: 'Dr. Anya Singh',
    progress: 70, // 0-100 for percentage
    status: 'in-progress',
    imageUrl: 'https://via.placeholder.com/300x180/FF6B35/FFFFFF?text=Nutrition+Course',
    duration: '10 Modules',
  },
  {
    id: 'rec2',
    title: 'Tactical Masterclass: Midfield',
    description: 'Advanced tactical concepts for dominating the center of the park.',
    instructor: 'By Coach Jamal Diallo',
    status: 'not-started',
    imageUrl: 'https://via.placeholder.com/300x180/FCCA46/0A1128?text=Tactical+Course',
    duration: '8 Hours',
  },
  {
    id: 'rec3',
    title: 'Mental Toughness Training',
    description: 'Build unshakeable mental resilience for peak performance in any game.',
    instructor: 'By Dr. Fatima Hassan',
    status: 'not-started',
    imageUrl: 'https://via.placeholder.com/300x180/034078/B4CED9?text=Mental+Toughness',
    duration: '5 Modules',
  },
];

const allCourses = [
  {
    id: 'c1',
    subject: 'Strength & Conditioning',
    title: 'Strength & Conditioning',
    description: 'Build explosive power and endurance.',
    instructor: 'Coach Mike Adebayo',
    duration: '3.5 Hours',
    imageUrl: 'https://via.placeholder.com/200x120/1282A2/FFFFFF?text=Strength',
    level: 'All Levels',
    targetAudience: 'Athletes',
  },
  {
    id: 'c2',
    subject: 'Sports Psychology',
    title: 'Sports Psychology',
    description: 'Unlocking the mental game for peak performance.',
    instructor: 'Dr. Amina Keita',
    duration: '6 Modules',
    imageUrl: 'https://via.placeholder.com/200x120/556B2F/FFFFFF?text=Psychology',
    level: 'Intermediate',
    targetAudience: 'Athletes',
  },
  {
    id: 'c3',
    subject: 'Recovery & Regeneration',
    title: 'Recovery & Regeneration',
    description: 'Optimize recovery for consistent performance.',
    instructor: 'Dr. James Okoro',
    duration: '2.5 Hours',
    imageUrl: 'https://via.placeholder.com/200x120/8B0000/FFFFFF?text=Recovery',
    level: 'All Levels',
    targetAudience: 'Athletes',
  },
  {
    id: 'c4',
    subject: 'Leadership',
    title: 'Leadership on the Field',
    description: 'Develop communication and team dynamics.',
    instructor: 'Coach David Mensah',
    duration: '6 Modules',
    imageUrl: 'https://via.placeholder.com/200x120/4B0082/FFFFFF?text=Leadership',
    level: 'All Levels',
    targetAudience: 'Athletes',
  },
  {
    id: 'c5',
    subject: 'Game Analysis',
    title: 'Game Analysis & Video Study',
    description: 'Learn to analyze matches like a pro.',
    instructor: 'Coach Gantt Mensah',
    duration: '7 Modules',
    imageUrl: 'https://via.placeholder.com/200x120/2F4F4F/FFFFFF?text=Analysis',
    level: 'Advanced',
    targetAudience: 'Coaches',
  },
  {
    id: 'c6',
    subject: 'Communication',
    title: 'Effective Communication',
    description: 'Master communication for better teamwork.',
    instructor: 'Prof. Grace Ndlovu',
    duration: '2 Modules',
    imageUrl: 'https://via.placeholder.com/200x120/A9A9A9/FFFFFF?text=Communication',
    level: 'Beginner',
    targetAudience: 'Athletes',
  },
];

const DigitalClassroomPage = () => {
  const [filters, setFilters] = useState({
    subjectArea: [],
    targetAudience: 'All',
    levels: 'All Levels',
    format: 'All Formats',
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleCheckboxChange = (subject) => {
    setFilters(prev => ({
      ...prev,
      subjectArea: prev.subjectArea.includes(subject)
        ? prev.subjectArea.filter(item => item !== subject)
        : [...prev.subjectArea, subject]
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    // In a real app, this would trigger data fetching/filtering
  };

  const resetFilters = () => {
    setFilters({
      subjectArea: [],
      targetAudience: 'All',
      levels: 'All Levels',
      format: 'All Formats',
    });
  };

  // Filter logic (simplified for demonstration)
  const filteredCourses = allCourses.filter(course => {
    const matchesSubject = filters.subjectArea.length === 0 || filters.subjectArea.includes(course.subject);
    const matchesAudience = filters.targetAudience === 'All' || course.targetAudience === filters.targetAudience;
    const matchesLevel = filters.levels === 'All Levels' || course.level === filters.levels;
    // Format filtering is not implemented in mock data but would go here
    return matchesSubject && matchesAudience && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gamepulse-dark text-neutral-white font-sans">
      {/* Header */}
      <header className="bg-neutral-dark-gray py-3 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-heading font-extrabold text-gamepulse-blue-light hover:text-gamepulse-yellow transition-colors">
            GamePulse Africa
          </Link>
          <nav className="hidden lg:flex space-x-6">
            {['Dashboard', 'My Profile', 'Events', 'Highlights', 'Digital Classroom'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                className={`text-neutral-medium-gray hover:text-neutral-white transition-colors text-sm font-semibold px-2 py-1 ${item === 'Digital Classroom' ? 'text-gamepulse-yellow' : ''}`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-neutral-medium-gray hover:text-neutral-white transition-colors"><FaSearch className="text-xl" /></button>
          <button className="text-neutral-medium-gray hover:text-neutral-white transition-colors"><FaBell className="text-xl" /></button>
          <div className="flex items-center text-neutral-white text-sm font-semibold cursor-pointer">
            <FaUserCircle className="text-2xl mr-2 text-gamepulse-yellow" /> George Chichua
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="pt-20">
        {/* Recommended for You Section */}
        <section className="bg-gradient-to-br from-gamepulse-orange-dark to-gamepulse-orange-light py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-neutral-white mb-2">Recommended for You</h1>
          <p className="text-neutral-light-gray text-lg mb-8">Top learning journeys to elevate your game</p>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map(course => (
              <div key={course.id} className="bg-neutral-white rounded-xl shadow-lg overflow-hidden text-gamepulse-dark flex flex-col">
                <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-neutral-medium-gray mb-3 flex-grow">{course.description}</p>
                  <p className="text-xs text-neutral-dark-gray mb-2">By {course.instructor}</p>
                  {course.status === 'in-progress' && (
                    <div className="w-full bg-neutral-light-gray rounded-full h-2 mb-2">
                      <div className="bg-success-green h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs text-neutral-medium-gray mb-4">
                    <span>{course.duration}</span>
                    {course.status === 'in-progress' && <span>{course.progress}% Complete</span>}
                  </div>
                  <button className={`w-full py-2 rounded-full font-bold transition-colors ${
                    course.status === 'in-progress'
                      ? 'bg-success-green text-neutral-white hover:bg-success-green/80'
                      : 'bg-gamepulse-orange-dark text-neutral-white hover:bg-gamepulse-orange-light'
                  }`}>
                    {course.status === 'in-progress' ? 'Continue Course' : 'Start Learning'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Courses Section */}
        <section className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Explore Topics */}
          <aside className="lg:col-span-1 bg-neutral-dark-gray rounded-xl p-6 h-fit sticky top-20">
            <h2 className="text-xl font-bold text-neutral-white mb-4">Explore Topics</h2>

            {/* Subject Area */}
            <div className="mb-4">
              <label className="block text-neutral-medium-gray text-sm font-semibold mb-2">Subject Area</label>
              <div className="space-y-2">
                {['Nutrition', 'Mental Toughness', 'Injury Prevention', 'Leadership', 'Game Analysis', 'Communication', 'Strength & Conditioning', 'Sports Psychology', 'Recovery & Regeneration'].map(subject => (
                  <label key={subject} className="flex items-center text-neutral-light-gray text-sm">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-gamepulse-blue rounded-sm border-neutral-black bg-gamepulse-blue-dark focus:ring-gamepulse-blue"
                      checked={filters.subjectArea.includes(subject)}
                      onChange={() => handleCheckboxChange(subject)}
                    />
                    <span className="ml-2">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="mb-4">
              <label htmlFor="audience-filter" className="block text-neutral-medium-gray text-sm font-semibold mb-2">Target Audience</label>
              <select
                id="audience-filter"
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-2 text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.targetAudience}
                onChange={(e) => handleFilterChange('targetAudience', e.target.value)}
              >
                <option>All</option>
                <option>Athletes</option>
                <option>Coaches</option>
                <option>Scouts</option>
              </select>
            </div>

            {/* Levels */}
            <div className="mb-4">
              <label htmlFor="levels-filter" className="block text-neutral-medium-gray text-sm font-semibold mb-2">Levels</label>
              <select
                id="levels-filter"
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-2 text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.levels}
                onChange={(e) => handleFilterChange('levels', e.target.value)}
              >
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Format (Placeholder as no mock data yet) */}
            <div className="mb-6">
              <label htmlFor="format-filter" className="block text-neutral-medium-gray text-sm font-semibold mb-2">Format</label>
              <select
                id="format-filter"
                className="w-full bg-gamepulse-blue-dark border border-neutral-black rounded-lg px-3 py-2 text-sm text-neutral-white focus:outline-none focus:ring-1 focus:ring-gamepulse-blue"
                value={filters.format}
                onChange={(e) => handleFilterChange('format', e.target.value)}
              >
                <option>All Formats</option>
                <option>Video Course</option>
                <option>Text Module</option>
                <option>Interactive</option>
              </select>
            </div>

            {/* Apply/Reset Buttons */}
            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-neutral-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="flex-1 bg-neutral-black/30 hover:bg-neutral-black text-neutral-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* All Courses Grid */}
          <main className="lg:col-span-3">
            <h2 className="text-xl font-bold text-neutral-white mb-2">All Courses</h2>
            <p className="text-neutral-medium-gray text-sm mb-6">Comprehensive learning modules designed for African athletes</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-neutral-dark-gray rounded-xl shadow-lg overflow-hidden text-neutral-white flex flex-col hover:bg-neutral-blue-dark transition-colors cursor-pointer">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-sm text-neutral-medium-gray mb-3 flex-grow">{course.description}</p>
                    <p className="text-xs text-neutral-light-gray mb-2">By {course.instructor}</p>
                    <div className="flex justify-between items-center text-xs text-neutral-medium-gray">
                      <span>{course.duration}</span>
                      <Link to={`/digital-classroom/course/${course.id}`} className="flex items-center text-gamepulse-blue hover:underline">
                        View Details <FaInfoCircle className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-gamepulse-orange-dark hover:bg-gamepulse-orange-light text-neutral-white px-8 py-3 rounded-full font-bold transition-colors">
                Load More Courses
              </button>
            </div>
          </main>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-dark-gray py-8 px-4 mt-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-neutral-medium-gray text-sm">
            <div>
              <h4 className="text-lg font-bold text-neutral-white mb-4">GamePulse Africa</h4>
              <p>Unleashing Africa's sporting potential through digital innovation and education.</p>
            </div>
            <div>
              <h4 className="text-md font-bold text-neutral-white mb-4">Learning</h4>
              <ul>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">All Courses</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Nutrition</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Mental Training</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Tactics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold text-neutral-white mb-4">Platform</h4>
              <ul>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Live Matches</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Athletes</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Highlights</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold text-neutral-white mb-4">Support</h4>
              <ul>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Help Center</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Contact Us</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Privacy Policy</Link></li>
                <li className="mb-2"><Link to="#" className="hover:text-neutral-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-black mt-8 pt-6 text-center text-neutral-medium-gray text-xs">
            © 2024 GamePulse Africa. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DigitalClassroomPage;