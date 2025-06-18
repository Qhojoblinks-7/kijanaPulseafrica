import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaUpload, FaEye, FaPlus, FaTrophy, FaStar, FaPlay, FaShareAlt, FaBell, FaUserCircle, FaSearch, FaChevronDown, FaChartLine, FaBookOpen, FaUsers, FaLink } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is one level up

const MyProfilePage = () => {
  const navigate = useNavigate();
  // Renaming 'userId' from useParams to 'urlUserId' to avoid confusion with currentUser.id
  const { userId: urlUserId } = useParams();
  // Destructure relevant data from AuthContext
  const { currentUser, isLoggedIn, userType } = useAuth();

  // The athleteData for this page *must* be the currently logged-in user.
  // We'll use this variable consistently throughout the component.
  const athleteData = currentUser;

  // --- Effect Hook for Authentication, Authorization, and Redirection ---
  useEffect(() => {
    // 1. If not logged in at all, redirect to login page
    if (!isLoggedIn) {
      console.log('MyProfilePage: User not logged in. Redirecting to /login.');
      navigate('/login');
      return; // Stop further execution of this effect
    }

    // 2. If currentUser object is still null (e.g., initial render, or async loading)
    if (!currentUser) {
      console.log('MyProfilePage: currentUser is null, waiting for AuthContext to load.');
      return; // Wait for currentUser to be set
    }

    // 3. If logged-in user is not an athlete, redirect them away from this page
    if (userType !== 'athlete') {
      console.warn(`MyProfilePage: User is a ${userType}, not an athlete. Redirecting to /dashboard.`);
      // Redirect to a generic dashboard or a page appropriate for their user type
      navigate('/dashboard');
      return;
    }

    // At this point, we know an athlete is logged in, and currentUser object is available.
    // Now handle URL consistency for the athlete's own profile.

    // 4. If a userId is present in the URL but it doesn't match the current user's ID,
    //    it means they're trying to view someone else's 'my-profile'. Redirect to their own.
    if (urlUserId && athleteData.id !== urlUserId) {
      console.warn(`MyProfilePage: URL ID (${urlUserId}) does not match currentUser ID (${athleteData.id}). Redirecting to correct profile URL.`);
      navigate(`/my-profile/${athleteData.id}`, { replace: true }); // Use replace to avoid back button issues
      return;
    }

    // 5. If the current path is '/my-profile' (no ID in URL), but an athlete is logged in,
    //    redirect them to their ID-specific URL for consistency.
    if (!urlUserId && window.location.pathname === '/my-profile' && athleteData.id) {
      console.log(`MyProfilePage: Redirecting from /my-profile to /my-profile/${athleteData.id}`);
      navigate(`/my-profile/${athleteData.id}`, { replace: true });
      return;
    }

  }, [isLoggedIn, currentUser, userType, urlUserId, navigate]); // Dependencies for useEffect

  // --- Render Loading/Unauthorized State ---
  // Display a loading message or nothing until the `useEffect` above has finished
  // its checks and potential redirects. This prevents flickering or errors from
  // trying to render with an invalid or incomplete `athleteData` object.
  if (!isLoggedIn || !currentUser || userType !== 'athlete') {
    return (
      <div className="min-h-screen bg-gamepulse-dark text-neutral-white flex items-center justify-center">
        <p>Loading profile or verifying access...</p>
        {/* You can add a spinner or more sophisticated loading UI here */}
      </div>
    );
  }

  // --- Handlers (remain mostly the same, use `athleteData` for links) ---

  const handleSearchClick = () => { /* ... */ alert('Simulating: Open search functionality!'); };
  const handleNotificationsClick = () => { /* ... */ alert('Simulating: Show notifications!'); };
  const handleUserProfileClick = () => { /* ... */ alert('Simulating: Open user account menu!'); };

  const handleEditProfileClick = () => {
    console.log('Edit Profile button clicked!');
    alert('Simulating: Navigate to Edit Profile form!');
    // In a real app, this might navigate to a specific edit form:
    // navigate('/edit-profile');
  };

  const handleAddEditStatsClick = () => { /* ... */ alert('Simulating: Open Stats Editor!'); };
  const handleAddAchievementClick = () => { /* ... */ alert('Simulating: Open Add Achievement modal!'); };
  const handleAllHighlightsDropdown = () => { /* ... */ alert('Simulating: Open Highlights filter dropdown!'); };

  const handleHighlightPlay = (highlightTitle) => {
    console.log(`Playing highlight: "${highlightTitle}"`);
    alert(`Simulating: Playing video for "${highlightTitle}"`);
  };

  const handleShareHighlight = (highlightTitle) => {
    console.log(`Sharing highlight: "${highlightTitle}"`);
    alert(`Simulating: Share option for "${highlightTitle}"`);
  };

  const handleContinueLearningClick = () => {
    console.log('Continue Learning button clicked!');
    navigate('/digital-classroom'); // Actual navigation
  };

  const handleInAppMessagingToggle = () => {
    console.log('Toggle In-app messaging preference');
    alert('Simulating: Toggling In-app Messaging Preference! (Requires AuthContext update function)');
    // To make this functional, your AuthContext would need an update function:
    // updateProfile({ contactPreferences: { ...athleteData.contactPreferences, inAppMessaging: !athleteData.contactPreferences?.inAppMessaging } });
  };

  const handleShowEmailToScoutsToggle = () => {
    console.log('Toggle Show email to scouts preference');
    alert('Simulating: Toggling Email Visibility to Scouts Preference! (Requires AuthContext update function)');
    // updateProfile({ contactPreferences: { ...athleteData.contactPreferences, showEmailToScouts: !athleteData.contactPreferences?.showEmailToScouts } });
  };

  const handleSocialMediaLinkClick = (platform, username) => {
    const url = platform === 'instagram'
      ? `https://www.instagram.com/${username}`
      : `https://www.tiktok.com/@${username}`;
    console.log(`Opening social media link: ${url}`);
    window.open(url, '_blank');
  };

  // --- Render MyProfilePage Content (now guaranteed to have a valid athleteData) ---
  return (
    <div className="min-h-screen bg-gamepulse-dark text-neutral-white font-sans">

      {/* Main Content Area */}
      <div className="pt-16 md:pt-20 container mx-auto px-2 py-4 md:px-4 md:py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">

          {/* Athlete Header/Hero Section */}
          <section className="bg-success-green/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center relative overflow-hidden text-center md:text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-gamepulse-blue-dark via-gamepulse-dark to-success-green/20 opacity-80 rounded-xl z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center w-full">
              <img
                // Use avatarUrl from AuthContext, fallback to profilePictureUrl, then a default image
                src={athleteData.avatarUrl || athleteData.profilePictureUrl || '/images/default-avatar.webp'}
                alt={athleteData.fullName || 'Athlete'}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-3 md:border-4 border-gamepulse-yellow shadow-lg flex-shrink-0 mb-3 md:mb-0 md:mr-6"
              />
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-neutral-white mb-1">{athleteData.fullName || 'Athlete Name'}</h1>
                <p className="text-base md:text-lg text-gamepulse-yellow font-semibold mb-1 md:mb-2">
                  {athleteData.position || 'Position N/A'} - {athleteData.team || 'Team N/A'}
                </p>
                <p className="text-xs md:text-sm text-neutral-light-gray mb-1">
                  {athleteData.location || 'Location N/A'} <span className="font-bold ml-2 md:ml-4">XP Rank: {athleteData.xpRank || 'N/A'}</span>
                </p>
                <p className="italic text-neutral-medium-gray text-xs md:text-sm mt-2">
                  "{athleteData.bio || athleteData.motto || 'No motto or story provided.'}"
                </p>
              </div>
              <div className="relative z-10 flex flex-col space-y-2 md:space-y-3 mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={handleEditProfileClick}
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <Link
                  to="/upload-highlight"
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaUpload className="mr-2" /> Upload Highlight
                </Link>
                <Link
                  to={`/athlete/${athleteData.id}`} 
                  className="bg-neutral-dark-gray hover:bg-neutral-black text-neutral-white px-4 py-2 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors"
                >
                  <FaEye className="mr-2" /> View Public Profile
                </Link>
              </div>
            </div>
          </section>

          {/* My Game: Stats & Progress */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaChartLine className="mr-2 text-gamepulse-yellow" /> My Game: Stats & Progress
              </h2>
              <button
                onClick={handleAddEditStatsClick}
                className="bg-gamepulse-blue-dark hover:bg-gamepulse-blue text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center font-semibold transition-colors"
              >
                <FaPlus className="mr-2" /> Add/Edit Stats
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              {athleteData.stats && Object.keys(athleteData.stats).length > 0 ? (
                Object.entries(athleteData.stats).map(([key, value]) => (
                  <div key={key} className="bg-gamepulse-blue-dark rounded-lg p-3 md:p-4 text-center">
                    <p className="text-neutral-medium-gray text-xs md:text-sm mb-1">{key.replace(/([A-Z])/g, ' $1').trim().replace('Accuracy', ' Accuracy')}</p>
                    <p className="text-2xl md:text-3xl font-bold text-success-green">{value}{key === 'passAccuracy' ? '%' : ''}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-4 text-center text-neutral-medium-gray italic">No stats available. Add some!</p>
              )}
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Performance Over Time (Coming Soon)</h3>
            <div className="bg-neutral-black/50 h-32 md:h-48 rounded-lg flex items-center justify-center text-neutral-medium-gray italic mb-4 md:mb-6 text-sm">
              [Placeholder for Performance Over Time Graph]
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 md:mb-3">
              <h3 className="text-base md:text-lg font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaTrophy className="mr-2 text-gamepulse-yellow" /> Recent Achievements
              </h3>
              <button
                onClick={handleAddAchievementClick}
                className="bg-gamepulse-blue-dark hover:bg-gamepulse-blue text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center font-semibold transition-colors"
              >
                <FaPlus className="mr-2" /> Add Achievement
              </button>
            </div>
            <ul className="space-y-2">
              {athleteData.achievements && athleteData.achievements.length > 0 ? (
                athleteData.achievements.map((ach) => (
                  <li key={ach.id} className="bg-neutral-blue-dark rounded-lg p-2.5 md:p-3 text-neutral-light-gray flex items-center text-sm">
                    <FaStar className="text-gamepulse-yellow mr-2 md:mr-3" /> {ach.text}
                  </li>
                ))
              ) : (
                <li className="text-neutral-medium-gray italic text-sm">No achievements yet. Add your first!</li>
              )}
            </ul>
          </section>

          {/* My Highlights */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-neutral-white flex items-center mb-2 sm:mb-0">
                <FaPlay className="mr-2 text-gamepulse-yellow" /> My Highlights
              </h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleAllHighlightsDropdown}
                  className="bg-neutral-black/30 hover:bg-neutral-black text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors flex items-center justify-center"
                >
                  All Highlights <FaChevronDown className="ml-2 inline-block" />
                </button>
                <Link
                  to="/upload-highlight"
                  className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm flex items-center justify-center font-semibold transition-colors"
                >
                  <FaUpload className="mr-2" /> Upload Now
                </Link>
              </div>
            </div>

            {/* Featured Highlight */}
            {athleteData.highlights && athleteData.highlights.length > 0 ? (
              <>
                <div
                  className="relative w-full rounded-lg overflow-hidden mb-4 md:mb-6 group cursor-pointer"
                  onClick={() => handleHighlightPlay(athleteData.highlights[0].title)}
                >
                  <img src={athleteData.highlights[0].thumbnailUrl || 'https://via.placeholder.com/400x225/1A202C/FFFFFF?text=No+Thumbnail'} alt={athleteData.highlights[0].title} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-gamepulse-yellow text-4xl md:text-5xl" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-base md:text-lg font-bold text-neutral-white">{athleteData.highlights[0].title}</h3>
                    <p className="text-xxs md:text-xs text-neutral-medium-gray">{athleteData.highlights[0].views || '0'} views</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleShareHighlight(athleteData.highlights[0].title); }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/50 p-1.5 md:p-2 rounded-full text-neutral-white text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <FaShareAlt />
                  </button>
                </div>

                {/* Other Highlights (Horizontal Scroll) */}
                <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                  {athleteData.highlights.slice(1).map((highlight) => (
                    <div
                      key={highlight.id}
                      className="flex-shrink-0 w-36 md:w-40 mr-3 md:mr-4 bg-neutral-blue-dark rounded-lg overflow-hidden cursor-pointer group hover:bg-neutral-blue-dark/80 transition-colors"
                      onClick={() => handleHighlightPlay(highlight.title)}
                    >
                      <div className="relative w-full h-20 md:h-24 overflow-hidden">
                        <img src={highlight.thumbnailUrl || 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=No+Thumbnail'} alt={highlight.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaPlay className="text-gamepulse-yellow text-2xl md:text-3xl" />
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-semibold text-neutral-white leading-tight mb-1">{highlight.title}</p>
                        <p className="text-xxs text-neutral-medium-gray">{highlight.views || '0'} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-neutral-medium-gray italic">No highlights uploaded yet. Be the first!</p>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">

          {/* My Story & Aspirations */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6 h-fit sticky top-16 md:top-20">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaBookOpen className="mr-2 text-gamepulse-yellow" /> My Story & Aspirations
            </h2>
            <p className="text-neutral-light-gray text-sm mb-3 md:mb-4">
              {athleteData.bio || athleteData.story || 'Tell us your story and aspirations! This section is where you can share your journey, motivations, and future goals in your sport.'}
            </p>
            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Key Skills & Attributes</h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {athleteData.skills && athleteData.skills.length > 0 ? (
                athleteData.skills.map((skill) => (
                  <span key={skill} className="bg-gamepulse-blue-dark text-neutral-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-neutral-medium-gray italic text-xs">No skills listed.</span>
              )}
            </div>
          </section>

          {/* Digital Classroom Progress */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaBookOpen className="mr-2 text-gamepulse-yellow" /> Digital Classroom Progress
            </h2>
            {athleteData.digitalClassroomProgress && athleteData.digitalClassroomProgress.length > 0 ? (
              athleteData.digitalClassroomProgress.map((course) => (
                <div key={course.name} className="mb-3 md:mb-4 last:mb-0">
                  <div className="flex justify-between text-xs md:text-sm text-neutral-light-gray mb-1">
                    <span>{course.name}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-blue-dark rounded-full h-2 md:h-2.5">
                    <div
                      className="bg-success-green h-2 md:h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-medium-gray italic text-sm">No classroom progress to display. Start a course today!</p>
            )}
            <button
              onClick={handleContinueLearningClick}
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-neutral-white px-4 py-2 mt-3 md:mt-4 w-full rounded-full font-bold text-sm transition-colors"
            >
              Continue Learning
            </button>
          </section>

          {/* My Network & Contact */}
          <section className="bg-neutral-dark-gray rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-neutral-white mb-3 md:mb-4 flex items-center">
              <FaUsers className="mr-2 text-gamepulse-yellow" /> My Network & Contact
            </h2>
            <div className="grid grid-cols-3 text-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network?.followers || 0}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Followers</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network?.connections || 0}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Connections</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteData.network?.following || 0}</p>
                <p className="text-xs md:text-sm text-neutral-medium-gray">Following</p>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Contact Preferences</h3>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between items-center text-neutral-light-gray text-sm">
                <span>Allow in-app messaging</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={athleteData.contactPreferences?.inAppMessaging || false}
                    onChange={handleInAppMessagingToggle}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-neutral-medium-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-dark-gray after:border after:rounded-full after:h-4 md:h-5 after:w-4 md:w-5 after:transition-all peer-checked:bg-success-green"></div>
                </label>
              </div>
              <div className="flex justify-between items-center text-neutral-light-gray text-sm">
                <span>Show email to scouts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={athleteData.contactPreferences?.showEmailToScouts || false}
                    onChange={handleShowEmailToScoutsToggle}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-neutral-medium-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-dark-gray after:border after:rounded-full after:h-4 md:h-5 after:w-4 md:w-5 after:transition-all peer-checked:bg-success-green"></div>
                </label>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Social Media</h3>
            <div className="space-y-2 md:space-y-3">
              {athleteData.socialMedia?.instagram && (
                <div
                  className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                  onClick={() => handleSocialMediaLinkClick('instagram', athleteData.socialMedia.instagram)}
                >
                  <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                  <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`instagram.com/${athleteData.socialMedia.instagram}`}</span>
                </div>
              )}
              {athleteData.socialMedia?.tiktok && (
                <div
                  className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                  onClick={() => handleSocialMediaLinkClick('tiktok', athleteData.socialMedia.tiktok)}
                >
                  <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                  <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`tiktok.com/@${athleteData.socialMedia.tiktok}`}</span>
                </div>
              )}
              {(!athleteData.socialMedia?.instagram && !athleteData.socialMedia?.tiktok) && (
                <p className="text-neutral-medium-gray italic text-xs">No social media links added.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;