// src/pages/UploadHighlightPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft, FaVideo, FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaTrophy,
  FaWhatsapp, FaTwitter, FaTiktok, FaInfoCircle, FaShareAlt
} from 'react-icons/fa';
// Assuming HighlightsNavbar already exists from previous tasks
// import HighlightsNavbar from '../components/Highlights/HighlightsNavbar';

// --- Mock Data for Dropdowns and Searchable Fields ---
const sportsOptions = [
  'Football', 'Basketball', 'Athletics', 'Rugby', 'Cricket',
  'Handball', 'Volleyball', 'Tennis', 'Martial Arts'
];

const highlightTypes = {
  Football: ['Goal', 'Assist', 'Save', 'Tackle', 'Dribble', 'Clearance'],
  Basketball: ['Dunk', 'Block', 'Assist', '3-Pointer', 'Steal', 'Layup'],
  Athletics: ['Sprint', 'Jump', 'Throw', 'Relay'],
  Rugby: ['Try', 'Tackle', 'Conversion', 'Lineout'],
  Cricket: ['Wicket', 'Boundary', 'Catch', 'Run Out'],
  Handball: ['Shot', 'Save', 'Pass', 'Steal'],
  Volleyball: ['Spike', 'Block', 'Serve', 'Dig'],
  Tennis: ['Ace', 'Winner', 'Volley', 'Drop Shot'],
  'Martial Arts': ['Takedown', 'Strike', 'Submission', 'Block']
};

const mockMatches = [
  { id: 'm1', name: 'Greenwood vs Riverside (2025-06-12)' },
  { id: 'm2', name: 'Accra United vs Tema City (2025-06-11)' },
  { id: 'm3', name: 'Lagos Giants vs Kano Kings (2025-06-10)' },
  { id: 'm4', name: 'Cape Town RFC vs Durban Kings (2025-06-09)' },
  { id: 'm5', name: 'National High School Athletics (2025-06-08)' },
];

const mockAthletes = [
  { id: 'a1', name: 'Jane Doe', sport: 'Basketball', team: 'Greenwood' },
  { id: 'a2', name: 'Kwame Nkrumah', sport: 'Football', team: 'Accra United' },
  { id: 'a3', name: 'Amara Okoro', sport: 'Football', team: 'Lagos Giants' },
  { id: 'a4', name: 'Themba Mkhize', sport: 'Rugby', team: 'Cape Town RFC' },
  { id: 'a5', name: 'Nia Amani', sport: 'Athletics', team: 'Self' },
  { id: 'a6', name: 'Chike Obi', sport: 'Football', team: 'St. Peter\'s' },
  { id: 'a7', name: 'Fatima Conteh', sport: 'Volleyball', team: 'Sunshine Girls' },
  { id: 'a8', name: 'Rahul Singh', sport: 'Cricket', team: 'Eagle XI' },
  { id: 'a9', name: 'Aisha Jallow', sport: 'Handball', team: 'Phoenix' },
  { id: 'a10', name: 'David Omondi', sport: 'Tennis', team: 'Self' },
];
// --- End Mock Data ---


const UploadHighlightPage = () => {
  const navigate = useNavigate();
  const videoInputRef = useRef(null); // Ref for the hidden file input

  // --- Form State ---
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [highlightTitle, setHighlightTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [highlightType, setHighlightType] = useState('');
  const [associatedMatch, setAssociatedMatch] = useState(''); // Stores selected match name or manual input
  const [matchManualTeams, setMatchManualTeams] = useState('');
  const [matchManualDate, setMatchManualDate] = useState('');
  const [featuredAthletes, setFeaturedAthletes] = useState([]); // Array of {id, name} objects
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState('public'); // 'public', 'private', 'unlisted'
  const [allowSocialSharing, setAllowSocialSharing] = useState(true);
  const [featureOnProfile, setFeatureOnProfile] = useState(false); // Only applicable if athletes tagged

  // --- UI State for Upload Progress/Success ---
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentStatusMessage, setCurrentStatusMessage] = useState('');

  // --- Search/Dropdown States ---
  const [matchSearchTerm, setMatchSearchTerm] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [showMatchDropdown, setShowMatchDropdown] = useState(false);

  const [athleteSearchTerm, setAthleteSearchTerm] = useState('');
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [showAthleteDropdown, setShowAthleteDropdown] = useState(false);


  // --- Effects ---
  // Effect to clean up video preview URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  // Handle match search filtering
  useEffect(() => {
    if (matchSearchTerm.length > 1) {
      setFilteredMatches(
        mockMatches.filter(match =>
          match.name.toLowerCase().includes(matchSearchTerm.toLowerCase())
        )
      );
      setShowMatchDropdown(true);
    } else {
      setFilteredMatches([]);
      setShowMatchDropdown(false);
    }
  }, [matchSearchTerm]);

  // Handle athlete search filtering
  useEffect(() => {
    if (athleteSearchTerm.length > 1) {
      setFilteredAthletes(
        mockAthletes.filter(athlete =>
          athlete.name.toLowerCase().includes(athleteSearchTerm.toLowerCase()) &&
          !featuredAthletes.some(fa => fa.id === athlete.id) // Prevent adding duplicates
        )
      );
      setShowAthleteDropdown(true);
    } else {
      setFilteredAthletes([]);
      setShowAthleteDropdown(false);
    }
  }, [athleteSearchTerm]);


  // --- Event Handlers ---
  const handleVideoSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic validation for optimal upload in low bandwidth
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert('Video file is too large. Max 50MB for optimal upload.');
        setVideoFile(null);
        setVideoPreviewUrl('');
        if (videoInputRef.current) videoInputRef.current.value = ''; // Clear file input
        return;
      }
      // Check duration if possible (requires loading metadata, more complex for initial MVP)
      // For now, rely on file size and user guidance.

      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('border-gamepulse-blue');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-gamepulse-blue');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-gamepulse-blue');
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleVideoSelection({ target: { files: [files[0]] } });
    }
  };

  const handleSelectMatch = (match) => {
    setAssociatedMatch(match.name);
    setMatchSearchTerm(match.name); // Set search term to selected value
    setShowMatchDropdown(false);
  };

  const handleAddAthlete = (athlete) => {
    setFeaturedAthletes(prev => [...prev, athlete]);
    setAthleteSearchTerm('');
    setShowAthleteDropdown(false);
  };

  const handleRemoveAthlete = (athleteId) => {
    setFeaturedAthletes(prev => prev.filter(a => a.id !== athleteId));
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoPreviewUrl('');
    setHighlightTitle('');
    setDescription('');
    setSport('');
    setHighlightType('');
    setAssociatedMatch('');
    setMatchManualTeams('');
    setMatchManualDate('');
    setFeaturedAthletes([]);
    setLocation('');
    setVisibility('public');
    setAllowSocialSharing(true);
    setFeatureOnProfile(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadSuccess(false);
    setCurrentStatusMessage('');
    setMatchSearchTerm('');
    setAthleteSearchTerm('');
    if (videoInputRef.current) videoInputRef.current.value = ''; // Clear file input
  };

  const handleSubmit = async () => {
    // Simple validation
    if (!videoFile || !highlightTitle || !sport || !highlightType) {
      alert('Please fill in all required fields (Video, Title, Sport, Highlight Type).');
      return;
    }

    // Prepare data for submission (in a real app, this would be an API call)
    const highlightData = {
      videoFile: videoFile.name, // In real app, send actual file or reference
      title: highlightTitle,
      description: description,
      sport: sport,
      highlightType: highlightType,
      associatedMatch: associatedMatch || (matchManualTeams ? { teams: matchManualTeams, date: matchManualDate } : null),
      featuredAthletes: featuredAthletes.map(a => a.id),
      location: location,
      visibility: visibility,
      allowSocialSharing: allowSocialSharing,
      featureOnProfile: featureOnProfile,
      // Add date, uploader ID, etc.
    };

    console.log("Submitting Highlight:", highlightData); // Log data for review

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);
    setCurrentStatusMessage('Preparing upload...');

    // Simulate upload progress with staggered messages
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress <= 30) {
        setCurrentStatusMessage('Uploading video...');
      } else if (progress <= 70) {
        setCurrentStatusMessage('Processing video for optimal playback...');
      } else if (progress < 100) {
        setCurrentStatusMessage('Finishing up...');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setCurrentStatusMessage('Highlight uploaded successfully!');
        setUploadSuccess(true);
        setIsUploading(false);
        // In a real app, handle actual API response here
      }
    }, 250); // Simulate network latency/processing
  };

  // --- Conditional Render for Upload Progress/Success Overlay ---
  if (isUploading || uploadSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-gamepulse-dark bg-opacity-95 flex flex-col items-center justify-center animate-fade-in text-white p-4">
        {isUploading && (
          <>
            <FaSpinner className="animate-spin text-gamepulse-blue text-5xl mb-6" />
            <div className="w-2/3 md:w-1/2 h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
              <div
                className="bg-gamepulse-orange h-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-lg mt-4 text-center">{currentStatusMessage}</p>
            <button
              onClick={() => { setIsUploading(false); resetForm(); }}
              className="text-gray-500 hover:text-white text-sm mt-8"
            >
              Cancel Upload
            </button>
          </>
        )}
        {uploadSuccess && (
          <>
            <FaCheckCircle className="text-gamepulse-green text-6xl mb-6" />
            <h2 className="text-3xl font-bold mb-8 text-center leading-tight">Highlight Uploaded Successfully!<br/>Your Action Reel is Live!</h2>
            <div className="flex flex-col space-y-4 w-full md:w-1/2">
              <button
                onClick={() => {
                  // Mock ID for navigation to the new highlight
                  const newHighlightId = `uploaded_${Date.now()}`;
                  navigate(`/highlights?id=${newHighlightId}`);
                  resetForm();
                }}
                className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                View Highlight
              </button>
              <button
                onClick={() => {
                  // Placeholder for actual social share logic
                  alert('Share this highlight with your friends!');
                  // In a real app, this would open a native share sheet or a custom share modal
                  // navigator.share({ url: window.location.href, title: highlightTitle });
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center transition-colors"
              >
                <FaShareAlt className="mr-2" /> Share Your Highlight
              </button>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white mt-2"
              >
                Upload Another Highlight
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // --- Main Page Render ---
  return (
    <div className="bg-gamepulse-dark text-white min-h-screen flex flex-col">
      {/* Page Header & Navigation */}
      <div className="fixed top-0 left-0 w-full bg-gamepulse-dark p-4 flex items-center justify-between z-40 shadow-lg">
        <button onClick={() => navigate(-1)} className="text-white text-2xl p-2 rounded-full hover:bg-gray-700">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-white">Upload Highlight</h1>
        <div className="w-8"></div> {/* Placeholder for right alignment / balanced spacing */}
      </div>

      <div className="flex-grow pt-24 pb-8 overflow-y-auto custom-scrollbar"> {/* pt-24 to offset fixed header */}

        {/* II. Video Upload Area */}
        <section className="mb-8 px-4">
          <h2 className="text-xl font-semibold text-white mb-4">Select Your Video</h2>
          {videoFile ? (
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative mb-4">
              <video
                src={videoPreviewUrl}
                controls={true}
                className="w-full h-full object-contain" // object-contain to prevent stretching
                playsInline
                preload="metadata" // Load enough data to show first frame
              />
              <button
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreviewUrl('');
                  if (videoInputRef.current) videoInputRef.current.value = ''; // Clear file input
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
              >
                Change Video
              </button>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            </div>
          ) : (
            <label
              htmlFor="video-upload"
              className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gamepulse-blue transition-colors duration-200"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FaCloudUploadAlt className="text-gray-400 text-5xl mb-3" />
              <p className="text-gray-400 text-sm md:text-base">Drag & Drop Your Video Here</p>
              <p className="text-gray-400 text-sm md:text-base my-1">or</p>
              <button
                type="button" // Important to prevent form submission
                className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-semibold py-2 px-6 rounded-full mt-3"
                onClick={() => videoInputRef.current?.click()} // Trigger hidden input click
              >
                Browse Files
              </button>
              <input
                type="file"
                id="video-upload"
                ref={videoInputRef}
                accept="video/mp4,video/mov,video/quicktime" // Restrict file types
                className="hidden" // Hide the default input
                onChange={handleVideoSelection}
              />
              <p className="text-xs text-gray-500 mt-3">
                Supported Formats: MP4, MOV. Max: 60 seconds, 50MB for optimal upload.
              </p>
            </label>
          )}
        </section>

        {/* III. Highlight Details & Metadata Form */}
        <section className="mb-8 px-4">
          <h2 className="text-xl font-semibold text-white mb-4">Tell Us About This Highlight</h2>
          <div className="space-y-6">

            {/* Highlight Title and Sport - Side by Side */}
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="flex-1 mb-6 md:mb-0">
                <label htmlFor="highlightTitle" className="block text-gray-300 text-sm font-semibold mb-2">Highlight Title</label>
                <input
                  type="text"
                  id="highlightTitle"
                  value={highlightTitle}
                  onChange={(e) => setHighlightTitle(e.target.value)}
                  placeholder="e.g., Jane Doe's Game-Winning Dunk"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
                  required
                />
              </div>
              <div className="flex-1"> {/* Sport field */}
                <label htmlFor="sport" className="block text-gray-300 text-sm font-semibold mb-2">Sport</label>
                <div className="relative">
                  <select
                    id="sport"
                    value={sport}
                    onChange={(e) => { setSport(e.target.value); setHighlightType(''); }} // Reset highlight type on sport change
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                    required
                  >
                    <option value="" disabled>Select a sport</option>
                    {sportsOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow for better styling */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div> {/* End Highlight Title and Sport group */}

            <div>
              <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the moment (e.g., Jane Doe's incredible solo effort in the dying minutes of the match)."
                rows="3"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white resize-y"
              ></textarea>
            </div>

            {sport && highlightTypes[sport] && ( // Conditionally render highlight type based on selected sport
              <div> {/* Highlight Type - Now a separate full-width field if sport is selected */}
                <label htmlFor="highlightType" className="block text-gray-300 text-sm font-semibold mb-2">Highlight Type</label>
                <div className="relative">
                  <select
                    id="highlightType"
                    value={highlightType}
                    onChange={(e) => setHighlightType(e.target.value)}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white appearance-none cursor-pointer pr-10"
                    required
                  >
                    <option value="" disabled>Select highlight type</option>
                    {highlightTypes[sport].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <label htmlFor="associatedMatch" className="block text-gray-300 text-sm font-semibold mb-2">Associated Match/Event (Optional)</label>
              <input
                type="text"
                id="associatedMatch"
                value={associatedMatch}
                onChange={(e) => {
                  setAssociatedMatch(e.target.value);
                  setMatchSearchTerm(e.target.value);
                }}
                onFocus={() => setShowMatchDropdown(true)}
                onBlur={() => setTimeout(() => setShowMatchDropdown(false), 100)} // Delay to allow click on dropdown item
                placeholder="Search for existing match or type manually"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
              />
              {showMatchDropdown && filteredMatches.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto custom-scrollbar shadow-lg">
                  {filteredMatches.map(match => (
                    <li
                      key={match.id}
                      onMouseDown={() => handleSelectMatch(match)} // Use onMouseDown to trigger before onBlur
                      className="p-3 text-gray-300 hover:bg-gray-700 cursor-pointer"
                    >
                      {match.name}
                    </li>
                  ))}
                </ul>
              )}
              {/* Manual match input section - Side by Side on larger screens */}
              {(!associatedMatch || associatedMatch === matchSearchTerm) && ( // Show manual fields if nothing selected OR user is typing and no match found yet
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-gamepulse-blue" /> If match not found, enter details manually:
                  </p>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <div className="flex-1 mb-4 md:mb-0">
                      <label htmlFor="matchManualTeams" className="block text-gray-300 text-sm font-semibold mb-2">Teams/Schools</label>
                      <input
                        type="text"
                        id="matchManualTeams"
                        value={matchManualTeams}
                        onChange={(e) => setMatchManualTeams(e.target.value)}
                        placeholder="e.g., Greenwood Academy vs. Riverside College"
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="matchManualDate" className="block text-gray-300 text-sm font-semibold mb-2">Date of Highlight</label>
                      <input
                        type="date"
                        id="matchManualDate"
                        value={matchManualDate}
                        onChange={(e) => setMatchManualDate(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div> {/* End Associated Match/Event group */}

            {/* Featured Athlete(s) and Location - Side by Side */}
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="flex-1 relative mb-6 md:mb-0">
                <label htmlFor="athleteSearch" className="block text-gray-300 text-sm font-semibold mb-2">Featured Athlete(s) (Optional)</label>
                <input
                  type="text"
                  id="athleteSearch"
                  value={athleteSearchTerm}
                  onChange={(e) => setAthleteSearchTerm(e.target.value)}
                  onFocus={() => setShowAthleteDropdown(true)}
                  onBlur={() => setTimeout(() => setShowAthleteDropdown(false), 100)}
                  placeholder="Search for athlete (e.g., Jane Doe)"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
                />
                {showAthleteDropdown && filteredAthletes.length > 0 && (
                  <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto custom-scrollbar shadow-lg">
                    {filteredAthletes.map(athlete => (
                      <li
                        key={athlete.id}
                        onMouseDown={() => handleAddAthlete(athlete)}
                        className="p-3 text-gray-300 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      >
                        <span>
                          {athlete.name} <span className="text-gray-400 text-xs">({athlete.sport}, {athlete.team})</span>
                        </span>
                        <FaInfoCircle className="text-gamepulse-blue text-sm ml-2" title="View Profile" />
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  {featuredAthletes.map(athlete => (
                    <span
                      key={athlete.id}
                      className="bg-gamepulse-orange-light text-gamepulse-dark rounded-full px-3 py-1 text-sm flex items-center"
                    >
                      {athlete.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveAthlete(athlete.id)}
                        className="ml-2 text-gamepulse-dark hover:text-red-700 font-bold"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="location" className="block text-gray-300 text-sm font-semibold mb-2">Location (City, Country - Optional)</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Accra, Ghana"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gamepulse-blue text-white text-base"
                />
              </div>
            </div> {/* End Featured Athlete(s) and Location group */}

          </div>
        </section>

        {/* IV. Privacy & Sharing Options */}
        <section className="mb-8 px-4">
          <h2 className="text-xl font-semibold text-white mb-4">Visibility & Sharing</h2>
          <div className="space-y-4">
            <div>
              <p className="block text-gray-300 text-sm font-semibold mb-2">Visibility Options</p>
              {/* Visibility Options - Side by Side on larger screens */}
              <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 md:flex-wrap">
                <label className="inline-flex items-center cursor-pointer mb-3 md:mb-0">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="form-radio h-4 w-4 text-gamepulse-blue border-gray-600 bg-gray-800 focus:ring-gamepulse-blue"
                  />
                  <span className="ml-2 text-white">Public</span>
                  <span className="ml-2 text-gray-400 text-xs">(Visible to all users)</span>
                </label>
                <label className="inline-flex items-center cursor-pointer mb-3 md:mb-0">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="form-radio h-4 w-4 text-gamepulse-blue border-gray-600 bg-gray-800 focus:ring-gamepulse-blue"
                  />
                  <span className="ml-2 text-white">Private</span>
                  <span className="ml-2 text-gray-400 text-xs">(Visible only to my connections/teams)</span>
                </label>
                <label className="inline-flex items-center cursor-pointer mb-3 md:mb-0">
                  <input
                    type="radio"
                    name="visibility"
                    value="unlisted"
                    checked={visibility === 'unlisted'}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="form-radio h-4 w-4 text-gamepulse-blue border-gray-600 bg-gray-800 focus:ring-gamepulse-blue"
                  />
                  <span className="ml-2 text-white">Unlisted</span>
                  <span className="ml-2 text-gray-400 text-xs">(Shareable via link only)</span>
                </label>
              </div>
            </div>

            {/* Allow Social Sharing and Feature on Profile - Side by Side on larger screens */}
            <div className="flex flex-col md:flex-row md:gap-8 mt-6">
              <div className="flex-1 flex items-center justify-between mb-4 md:mb-0">
                <label htmlFor="allowSocialSharing" className="block text-gray-300 text-sm font-semibold cursor-pointer">Allow Social Sharing</label>
                <input
                  type="checkbox"
                  id="allowSocialSharing"
                  checked={allowSocialSharing}
                  onChange={(e) => setAllowSocialSharing(e.target.checked)}
                  className="relative w-10 h-5 transition duration-200 ease-linear rounded-full appearance-none bg-gray-700 checked:bg-gamepulse-blue cursor-pointer"
                  role="switch"
                />
                {/* Inline style for the custom toggle thumb */}
                <style jsx>{`
                  input[type="checkbox"][role="switch"]::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 2px;
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    border-radius: 9999px;
                    background-color: #fff;
                    transition: transform 0.2s ease-in-out;
                  }
                  input[type="checkbox"][role="switch"]:checked::before {
                    transform: translate(20px, -50%);
                  }
                `}</style>
              </div>

              {featuredAthletes.length > 0 && ( // Only show if at least one athlete is tagged
                <div className="flex-1 flex items-center justify-between">
                  <label htmlFor="featureOnProfile" className="block text-gray-300 text-sm font-semibold cursor-pointer">Feature on Athlete Profile</label>
                  <input
                    type="checkbox"
                    id="featureOnProfile"
                    checked={featureOnProfile}
                    onChange={(e) => setFeatureOnProfile(e.target.checked)}
                    className="relative w-10 h-5 transition duration-200 ease-linear rounded-full appearance-none bg-gray-700 checked:bg-gamepulse-blue cursor-pointer"
                    role="switch"
                  />
                  {/* Reuse toggle thumb style - the <style jsx> block covers both */}
                </div>
              )}
            </div> {/* End toggle group */}

            <p className="text-gray-400 text-xs mt-1 px-1">Enables the share button on your highlight page for easy sharing to social media.</p>
            {featuredAthletes.length > 0 && (
                <p className="text-gray-400 text-xs mt-1 px-1">Showcase this highlight prominently on the tagged athlete's public profile.</p>
            )}
          </div>
        </section>

        {/* V. Review & Submit */}
        <section className="mb-8 px-4">
          <h2 className="text-xl font-semibold text-white mb-4">Review & Upload</h2>
          <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300 space-y-2">
            <p><strong className="text-white">Highlight Title:</strong> {highlightTitle || 'N/A'}</p>
            <p><strong className="text-white">Sport:</strong> {sport || 'N/A'}</p>
            <p><strong className="text-white">Highlight Type:</strong> {highlightType || 'N/A'}</p>
            <p><strong className="text-white">Athlete(s):</strong> {featuredAthletes.map(a => a.name).join(', ') || 'N/A'}</p>
            <p>
                <strong className="text-white">Match/Event:</strong>{' '}
                {associatedMatch || (matchManualTeams && `${matchManualTeams} (${matchManualDate || 'Date N/A'})`) || 'N/A'}
            </p>
            <p><strong className="text-white">Location:</strong> {location || 'N/A'}</p>
            <p><strong className="text-white">Visibility:</strong> {visibility.charAt(0).toUpperCase() + visibility.slice(1)}</p>
            <p><strong className="text-white">Social Sharing:</strong> {allowSocialSharing ? 'Enabled' : 'Disabled'}</p>
            {featuredAthletes.length > 0 && <p><strong className="text-white">Feature on Profile:</strong> {featureOnProfile ? 'Yes' : 'No'}</p>}
            <p>
              <strong className="text-white">Description:</strong>{' '}
              {description.length > 100 ? `${description.substring(0, 100)}...` : description || 'N/A'}
            </p>
          </div>

          <div className="flex flex-col items-center mt-8">
            <button
              onClick={handleSubmit}
              // Disable button if essential fields are not filled
              disabled={!videoFile || !highlightTitle || !sport || !highlightType}
              className="bg-gamepulse-orange hover:bg-gamepulse-orange-dark text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Highlight
            </button>
            <button
              onClick={() => navigate(-1)} // Go back to the previous page
              className="text-gray-400 hover:text-white mt-4"
            >
              Cancel / Go Back
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadHighlightPage;