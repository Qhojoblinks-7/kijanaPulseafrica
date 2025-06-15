// src/pages/AthleteSearchPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // NEW: Import Link for navigation
import {
  FaSearch, FaChevronDown, FaFilter, FaSort, FaTrophy, FaFire, FaUserPlus,
  FaMapMarkerAlt, FaSchool, FaBirthdayCake,
  FaChartLine,
  FaPuzzlePiece,
  FaAward
} from 'react-icons/fa';

// --- Mock Data ---
// This data simulates what you might fetch from a backend API.
// In a real application, you would replace this with actual API calls.
const mockAthletes = [
  {
    id: 'a1',
    name: 'Aisha Jallow',
    sport: 'Football',
    position: 'Striker',
    school: 'Accra Academy',
    location: 'Accra, Ghana',
    ageGroup: 'U16',
    xpRanking: 85,
    keyStat: '12 Goals in Last 7 Games',
    profilePic: '/images/athlete_aisha.jpg', // Placeholder for actual image path
    skills: ['Leadership', 'Agility', 'Finishing'],
    certifications: ['Nutrition Module']
  },
  {
    id: 'a2',
    name: 'Kwame Nkrumah',
    sport: 'Basketball',
    position: 'Point Guard',
    school: 'Presec Legon',
    location: 'Accra, Ghana',
    ageGroup: 'Senior Year',
    xpRanking: 92,
    keyStat: '25.3 PPG',
    profilePic: '/images/athlete_kwame.jpg',
    skills: ['Vision', 'Ball Handling', 'Court Awareness'],
    certifications: ['Mental Toughness Certified']
  },
  {
    id: 'a3',
    name: 'Nia Amani',
    sport: 'Athletics',
    position: 'Sprinter',
    school: 'St. Mary\'s School',
    location: 'Nairobi, Kenya',
    ageGroup: 'U18',
    xpRanking: 78,
    keyStat: 'PB: 11.2s (100m)',
    profilePic: '/images/athlete_nia.jpg',
    skills: ['Speed', 'Discipline', 'Explosiveness'],
    certifications: []
  },
  {
    id: 'a4',
    name: 'Themba Mkhize',
    sport: 'Rugby',
    position: 'Fly-half',
    school: 'King Edward VII School',
    location: 'Johannesburg, South Africa',
    ageGroup: 'Senior Year',
    xpRanking: 88,
    keyStat: '5 Tries in Season',
    profilePic: '/images/athlete_themba.jpg',
    skills: ['Tactical Acumen', 'Kicking', 'Teamwork'],
    certifications: ['Nutrition Module']
  },
  {
    id: 'a5',
    name: 'Fatima Conteh',
    sport: 'Volleyball',
    position: 'Setter',
    school: 'Freetown Secondary School',
    location: 'Freetown, Sierra Leone',
    ageGroup: 'U16',
    xpRanking: 75,
    keyStat: 'Avg 9.5 Assists per Set',
    profilePic: '/images/athlete_fatima.jpg',
    skills: ['Precision', 'Communication', 'Agility'],
    certifications: []
  },
  {
    id: 'a6',
    name: 'David Omondi',
    sport: 'Tennis',
    position: 'Singles Player',
    school: 'Kampala High School',
    location: 'Kampala, Uganda',
    ageGroup: 'Senior Year',
    xpRanking: 80,
    keyStat: 'Ranked #1 in Regional U18',
    profilePic: '/images/athlete_david.jpg',
    skills: ['Forehand', 'Mental Toughness', 'Endurance'],
    certifications: ['Mental Toughness Certified']
  },
  {
    id: 'a7',
    name: 'Chike Obi',
    sport: 'Football',
    position: 'Midfielder',
    school: 'Deeper Life High School',
    location: 'Lagos, Nigeria',
    ageGroup: 'U18',
    xpRanking: 89,
    keyStat: '7 Assists this season',
    profilePic: '/images/athlete_chike.jpg',
    skills: ['Vision', 'Passing', 'Work Rate'],
    certifications: ['Nutrition Module']
  },
  {
    id: 'a8',
    name: 'Zola Dlamini',
    sport: 'Basketball',
    position: 'Center',
    school: 'Gauteng Sports Academy',
    location: 'Pretoria, South Africa',
    ageGroup: 'U16',
    xpRanking: 95,
    keyStat: '15 Rebounds per game',
    profilePic: '/images/athlete_zola.jpg',
    skills: ['Rebounding', 'Blocking', 'Post Moves'],
    certifications: ['Mental Toughness Certified']
  }
];

// --- Filter and Option Data (for dropdowns and checkboxes) ---
const sportsOptions = [
  'Football', 'Basketball', 'Athletics', 'Rugby', 'Cricket',
  'Handball', 'Volleyball', 'Tennis', 'Martial Arts'
];

const positionOptions = {
  Football: ['Striker', 'Midfielder', 'Defender', 'Goalkeeper'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Athletics: ['Sprinter', 'Jumper', 'Thrower', 'Middle Distance Runner', 'Long Distance Runner'],
  Rugby: ['Fly-half', 'Scrum-half', 'Prop', 'Hooker', 'Flanker', 'Lock', 'Number 8', 'Wing', 'Centre', 'Fullback'],
  Cricket: ['Batter', 'Bowler', 'Wicket-keeper', 'All-rounder'],
  Handball: ['Goalkeeper', 'Pivot', 'Wing', 'Back'],
  Volleyball: ['Setter', 'Outside Hitter', 'Opposite Hitter', 'Middle Blocker', 'Libero'],
  Tennis: ['Singles Player', 'Doubles Player'],
  'Martial Arts': ['Striker', 'Grappler', 'All-Rounder']
};

const ageGroupOptions = ['U14', 'U16', 'U18', 'Senior Year'];

const skillsOptions = ['Leadership', 'Vision', 'Teamwork', 'Dedication', 'Agility', 'Speed', 'Precision', 'Communication', 'Endurance', 'Finishing', 'Ball Handling', 'Court Awareness', 'Tactical Acumen', 'Kicking', 'Rebounding', 'Blocking', 'Post Moves'];

const certificationOptions = ['Completed Nutrition Module', 'Mental Toughness Certified'];

const trendingAthletes = [
  mockAthletes[1], // Kwame Nkrumah
  mockAthletes[0], // Aisha Jallow
  mockAthletes[7]  // Zola Dlamini
];

// --- AthleteSearchPage Component ---
const AthleteSearchPage = () => {
  // State for search input and filtered results
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAthletes, setFilteredAthletes] = useState(mockAthletes);

  // State for filter criteria
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [xpMin, setXpMin] = useState('');
  const [xpMax, setXpMax] = useState('');
  const [minGoals, setMinGoals] = useState('');
  const [maxGoals, setMaxGoals] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [sortBy, setSortBy] = useState('Most Relevant');

  // State for controlling collapsible filter sections visibility
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Controls the main filter section visibility
  const [isSportOpen, setIsSportOpen] = useState(false);
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);


  // useEffect hook to apply filters and sorting whenever criteria change
  useEffect(() => {
    let results = mockAthletes.filter(athlete => {
      // Check if athlete matches the main search term
      const matchesSearchTerm = searchTerm ?
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())
        : true; // If no search term, all athletes match

      // Check if athlete matches selected filters
      const matchesSport = selectedSport ? athlete.sport === selectedSport : true;
      const matchesPosition = selectedPosition ? athlete.position === selectedPosition : true;
      const matchesLocation = selectedLocation ? athlete.location.toLowerCase().includes(selectedLocation.toLowerCase()) : true;
      const matchesAgeGroup = selectedAgeGroup ? athlete.ageGroup === selectedAgeGroup : true;

      // Check if athlete's XP ranking falls within the specified range
      const matchesXP = (xpMin === '' || athlete.xpRanking >= parseInt(xpMin)) &&
                        (xpMax === '' || athlete.xpRanking <= parseInt(xpMax));

      // Simplified sport-specific stats for demonstration (e.g., only "Goals" for Football)
      // This part would need more robust logic for different sports in a real app.
      const matchesGoals = (minGoals === '' || (athlete.keyStat && athlete.keyStat.includes('Goals') && parseInt(athlete.keyStat.match(/\d+/)[0]) >= parseInt(minGoals))) &&
                           (maxGoals === '' || (athlete.keyStat && athlete.keyStat.includes('Goals') && parseInt(athlete.keyStat.match(/\d+/)[0]) <= parseInt(maxGoals)));

      // Check if athlete possesses all selected skills
      const matchesSkills = selectedSkills.length > 0 ?
        selectedSkills.every(skill => athlete.skills.includes(skill)) : true; // If no skills selected, all athletes match

      // Check if athlete has all selected certifications
      const matchesCertifications = selectedCertifications.length > 0 ?
        selectedCertifications.every(cert => athlete.certifications.includes(cert)) : true; // If no certifications selected, all athletes match

      // Return true only if all filter conditions are met
      return matchesSearchTerm && matchesSport && matchesPosition && matchesLocation &&
             matchesAgeGroup && matchesXP && matchesGoals && matchesSkills && matchesCertifications;
    });

    // Apply sorting based on the selected sortBy option
    results.sort((a, b) => {
      if (sortBy === 'Highest XP') {
        return b.xpRanking - a.xpRanking; // Sort descending by XP
      }
      if (sortBy === 'Newest Profile') {
        // Mocking newest profile based on ID for demo purposes.
        // In a real app, you'd sort by a 'createdAt' timestamp.
        return b.id.localeCompare(a.id);
      }
      // 'Most Relevant' or 'Closest Location' would require more complex (and real) data/logic
      return 0; // No change for 'Most Relevant' or if no specific sort is applied
    });

    setFilteredAthletes(results); // Update the state with the filtered and sorted results
  }, [searchTerm, selectedSport, selectedPosition, selectedLocation, selectedAgeGroup,
      xpMin, xpMax, minGoals, maxGoals, selectedSkills, selectedCertifications, sortBy]); // Dependencies for useEffect

  // Function to reset all filters to their default state
  const resetFilters = () => {
    setSelectedSport('');
    setSelectedPosition('');
    setSelectedLocation('');
    setSelectedAgeGroup('');
    setXpMin('');
    setXpMax('');
    setMinGoals('');
    setMaxGoals('');
    setSelectedSkills([]);
    setSelectedCertifications([]);
    setSortBy('Most Relevant');
    setSearchTerm(''); // Also clear the main search bar
  };

  // Function to toggle a skill in the selected skills array
  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Function to toggle a certification in the selected certifications array
  const toggleCertification = (cert) => {
    setSelectedCertifications(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  // Helper component for collapsible filter sections (reused for cleaner JSX)
  const CollapsibleSection = ({ title, icon: Icon, isOpen, toggleOpen, children }) => (
    <div className="bg-gray-800 rounded-lg mb-4 p-4 shadow-md">
      <button
        className="w-full flex justify-between items-center text-left py-2"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-white flex items-center">
          {Icon && <Icon className="mr-3 text-gamepulse-blue" />} {title}
        </h3>
        <FaChevronDown className={`text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} pt-4 border-t border-gray-700 mt-2`}>
        {children}
      </div>
    </div>
  );


  return (
    // The main container now has padding-top (pt-20) to ensure content starts below the main application's fixed header.
    // The main app header from Header.jsx is fixed with z-50. This padding accounts for its height.
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col pt-20">

      {/* AthleteSearchPage's own Header (Title & Main Search Bar) */}
      {/* IMPORTANT: This header is NO LONGER FIXED. It flows naturally below the main app header. */}
      <div className="bg-gamepulse-dark-gradient from-gamepulse-blue-dark to-gamepulse-dark p-4 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Discover African Sporting Talent</h1>
        <div className="relative mx-auto max-w-xl">
          <input
            type="text"
            placeholder="Search by Name, School, City, or Sport..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-gamepulse-blue transition-colors duration-200 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Content Area: Contains Filters and Search Results */}
      {/* No longer needs its own padding-top as the outer div handles clearing the main app header */}
      <div className="flex-grow pb-8 overflow-y-auto custom-scrollbar">

        {/* Advanced Filtering & Sorting Options Section */}
        <section className="px-4 md:px-8 mt-6 mb-8"> {/* Added mt-6 for spacing below the page's own header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Refine Your Search</h2>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center"
            >
              <FaFilter className="mr-2" /> {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Conditional rendering for the filter options based on isFiltersOpen state */}
          <div className={`${isFiltersOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
            {/* Sort By Dropdown - Always visible when filters are shown */}
            <div className="bg-gray-800 rounded-lg mb-4 p-4 shadow-md">
              <label htmlFor="sortBy" className="block text-gray-300 text-sm font-semibold mb-2 flex items-center">
                <FaSort className="mr-3 text-gamepulse-blue" /> Sort By:
              </label>
              <div className="relative">
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                >
                  <option>Most Relevant</option>
                  <option>Highest XP</option>
                  <option>Newest Profile</option>
                  <option>Closest Location</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FaChevronDown className="fill-current h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Collapsible Filter Sections */}
            <CollapsibleSection title="Sport" icon={FaTrophy} isOpen={isSportOpen} toggleOpen={() => setIsSportOpen(!isSportOpen)}>
              <div className="relative">
                <select
                  value={selectedSport}
                  onChange={(e) => { setSelectedSport(e.target.value); setSelectedPosition(''); }}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                >
                  <option value="">All Sports</option>
                  {sportsOptions.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FaChevronDown className="fill-current h-4 w-4" />
                </div>
              </div>
            </CollapsibleSection>

            {/* Position filter only shows if a Sport is selected */}
            {selectedSport && (
              <CollapsibleSection title="Position" icon={FaUserPlus} isOpen={isPositionOpen} toggleOpen={() => setIsPositionOpen(!isPositionOpen)}>
                <div className="relative">
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                  >
                    <option value="">Any Position</option>
                    {positionOptions[selectedSport]?.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <FaChevronDown className="fill-current h-4 w-4" />
                  </div>
                </div>
              </CollapsibleSection>
            )}

            <CollapsibleSection title="Location" icon={FaMapMarkerAlt} isOpen={isLocationOpen} toggleOpen={() => setIsLocationOpen(!isLocationOpen)}>
              <input
                type="text"
                placeholder="e.g., Accra, Kenya"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue"
              />
            </CollapsibleSection>

            <CollapsibleSection title="Age/Year Group" icon={FaBirthdayCake} isOpen={isAgeOpen} toggleOpen={() => setIsAgeOpen(!isAgeOpen)}>
              <div className="grid grid-cols-2 gap-3">
                {ageGroupOptions.map(group => (
                  <label key={group} className="inline-flex items-center cursor-pointer text-white">
                    <input
                      type="radio"
                      name="ageGroup"
                      value={group}
                      checked={selectedAgeGroup === group}
                      onChange={(e) => setSelectedAgeGroup(e.target.value)}
                      className="form-radio h-4 w-4 text-gamepulse-orange border-gray-600 bg-gray-700 focus:ring-gamepulse-orange"
                    />
                    <span className="ml-2 text-sm">{group}</span>
                  </label>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Performance Metrics" icon={FaChartLine} isOpen={isPerformanceOpen} toggleOpen={() => setIsPerformanceOpen(!isPerformanceOpen)}>
              <h4 className="text-gray-300 text-sm font-semibold mb-2">XP Ranking:</h4>
              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Min XP"
                  value={xpMin}
                  onChange={(e) => setXpMin(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue"
                />
                <input
                  type="number"
                  placeholder="Max XP"
                  value={xpMax}
                  onChange={(e) => setXpMax(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue"
                />
              </div>

              <h4 className="text-gray-300 text-sm font-semibold mb-2">Goals (for Football):</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Goals"
                  value={minGoals}
                  onChange={(e) => setMinGoals(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue"
                />
                <input
                  type="number"
                  placeholder="Max Goals"
                  value={maxGoals}
                  onChange={(e) => setMaxGoals(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-gamepulse-blue"
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">
                (Note: More sport-specific stats would be here, e.g., Points Per Game for Basketball)
              </p>
            </CollapsibleSection>

            <CollapsibleSection title="Key Skills/Attributes" icon={FaPuzzlePiece} isOpen={isSkillsOpen} toggleOpen={() => setIsSkillsOpen(!isSkillsOpen)}>
              <div className="flex flex-wrap gap-2">
                {skillsOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-gamepulse-orange-light text-gamepulse-dark'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Certifications" icon={FaAward} isOpen={isCertificationsOpen} toggleOpen={() => setIsCertificationsOpen(!isCertificationsOpen)}>
              <div className="flex flex-col space-y-2">
                {certificationOptions.map(cert => (
                  <label key={cert} className="inline-flex items-center cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert)}
                      onChange={() => toggleCertification(cert)}
                      className="form-checkbox h-4 w-4 text-gamepulse-green border-gray-600 bg-gray-700 rounded focus:ring-gamepulse-green"
                    />
                    <span className="ml-2 text-sm">{cert}</span>
                  </label>
                ))}
              </div>
            </CollapsibleSection>

            {/* Action Buttons: Reset Filters and Apply Filters */}
            <div className="flex flex-col md:flex-row justify-center md:justify-end gap-3 mt-6">
              <button
                onClick={resetFilters}
                className="text-gray-400 hover:text-white font-semibold py-2 px-6 rounded-full border border-gray-700 hover:border-gray-600 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsFiltersOpen(false)} // Typically, Apply filters just closes the filter section
                className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </section>

        {/* Athlete Search Results Display Section */}
        <section className="px-4 md:px-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Matching Athletes ({filteredAthletes.length} results)
          </h2>

          {filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAthletes.map(athlete => (
                // NEW: Wrap the entire card with Link component
                <Link
                  key={athlete.id}
                  to={`/athlete-profile/${athlete.id}`} // This is the dynamic path to the athlete's profile
                  className="block" // Ensures the Link takes up the full card area for styling
                >
                  <div
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4
                               transition-transform duration-200 hover:scale-[1.02] cursor-pointer
                               border-t-4 border-gamepulse-blue hover:border-gamepulse-orange h-full" // Added h-full for consistent card heights
                  >
                    <img
                      src={athlete.profilePic}
                      alt={athlete.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-gamepulse-blue mb-3"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_avatar.jpg'; }} // Fallback for image errors
                    />
                    <h3 className="text-lg font-bold text-white text-center truncate w-full px-2">{athlete.name}</h3>
                    <p className="text-gamepulse-orange text-sm font-medium mb-1">{athlete.sport} - {athlete.position}</p>
                    <p className="text-gray-400 text-xs mb-1 flex items-center"><FaSchool className="mr-1 text-gray-500" /> {athlete.school}</p>
                    <p className="text-gray-400 text-xs mb-3 flex items-center"><FaMapMarkerAlt className="mr-1 text-gray-500" /> {athlete.location}</p>

                    <div className="flex items-center justify-center mb-3">
                      <FaTrophy className="text-gamepulse-orange-light mr-1" />
                      <span className="text-white text-sm font-semibold">XP Level {Math.floor(athlete.xpRanking / 10)}</span>
                    </div>
                    <p className="text-gamepulse-green text-sm text-center font-bold px-2 mb-3 leading-tight">{athlete.keyStat}</p>

                    {/* The Follow button is still present. If you want it to ONLY trigger follow
                        and NOT navigate, you would add onClick={(e) => e.stopPropagation()} to it.
                        For now, clicking the button will also navigate the whole card. */}
                    <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center mt-auto"> {/* Added mt-auto to push button to bottom */}
                      <FaUserPlus className="mr-2" /> Follow
                    </button>
                  </div>
                </Link> 
              ))}
            </div>
          ) : (
            // "No Results Found" State
            <div className="text-center py-12 px-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg text-white mb-4">No athletes match your current search.</h3>
              <p className="text-gray-300 mb-6">Try broadening your filters or searching for different criteria.</p>
              <p className="text-gamepulse-orange font-semibold text-md mb-4">You might also be interested in:</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-bold py-2 px-5 rounded-full">
                  Trending Athletes
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-full">
                  Top Footballers in Kenya
                </button>
              </div>
              <a href="#" className="text-gamepulse-blue hover:text-gamepulse-blue-dark underline mt-6 block text-sm">
                Learn more about how to use GamePulse Africa for Scouting
              </a>
            </div>
          )}
        </section>

        {/* Trending & Featured Athletes (Supplemental Discovery) Section */}
        <section className="px-4 md:px-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Featured Talent</h2>
          <div className="overflow-x-auto custom-scrollbar-hidden pb-4">
            <div className="flex space-x-4">
              {trendingAthletes.map(athlete => (
                <div
                  key={`trending-${athlete.id}`}
                  className="flex-shrink-0 w-64 bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4
                             transition-transform duration-200 hover:scale-[1.02] cursor-pointer
                             border-t-4 border-gamepulse-orange"
                >
                  <img
                    src={athlete.profilePic}
                    alt={athlete.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gamepulse-orange mb-2"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/default_avatar.jpg'; }}
                  />
                  <h4 className="text-md font-bold text-white text-center truncate w-full px-2">{athlete.name}</h4>
                  <p className="text-gamepulse-green text-sm font-medium">{athlete.sport} - {athlete.position}</p>
                  <div className="flex items-center mt-2">
                    <FaFire className="text-gamepulse-orange mr-1" />
                    <span className="text-white text-xs">Hot Pick!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AthleteSearchPage;