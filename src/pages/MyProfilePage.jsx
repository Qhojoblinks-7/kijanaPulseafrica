import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaUpload, FaEye, FaPlus, FaTrophy, FaStar, FaPlay, FaShareAlt, FaBell, FaUserCircle, FaSearch, FaChevronDown, FaChartLine, FaBookOpen, FaUsers, FaLink } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
// Import your athlete profiles data
import { allAthleteProfilesData } from '../data/allAthleteProfilesData'; // Adjust path if necessary

const MyProfilePage = () => {
    const navigate = useNavigate();
    const { userId: urlUserId } = useParams(); // 'userId' from the URL parameter (e.g., /my-profile/:userId)
    const { currentUser, isLoggedIn, userType, loading } = useAuth(); // AuthContext data

    // State to hold the specific athlete's detailed profile data
    const [athleteProfile, setAthleteProfile] = useState(null); // Initialize as null to indicate no profile loaded yet

    useEffect(() => {
        // Log current auth/route state for debugging purposes
        console.log('MyProfilePage useEffect:');
        console.log('  - loading (AuthContext):', loading);
        console.log('  - isLoggedIn (AuthContext):', isLoggedIn);
        console.log('  - currentUser (AuthContext):', currentUser);
        console.log('  - userType (AuthContext):', userType);
        console.log('  - urlUserId (from URL params):', urlUserId);

        // 1. Crucial: If AuthContext is still loading, do nothing and wait.
        // This prevents premature redirects or trying to access null currentUser.
        if (loading) {
            console.log('MyProfilePage: AuthContext is still loading. Waiting...');
            return;
        }

        // After AuthContext finishes loading:

        // 2. Check authentication status: If not logged in, redirect to login.
        if (!isLoggedIn) {
            console.log('MyProfilePage: User not logged in. Redirecting to /login.');
            navigate('/login', { replace: true });
            return;
        }

        // 3. Check user type: This page is specifically for 'athlete' users.
        // If logged in but not an athlete, redirect them to their appropriate dashboard.
        if (userType !== 'athlete') {
            console.warn(`MyProfilePage: User is a ${userType}, not an athlete. Redirecting to /dashboard.`);
            // A more specific redirect could be implemented here based on userType if needed (e.g., /coach-dashboard)
            navigate('/dashboard', { replace: true });
            return;
        }

        // 4. Ensure currentUser object is available after successful authentication.
        if (!currentUser) {
            console.error('MyProfilePage: Fatal error - isLoggedIn is true but currentUser is null. Logging out and redirecting.');
            // This is an unlikely but important fallback for state inconsistency.
            navigate('/login', { replace: true }); // Force re-login or clean up state
            return;
        }

        // 5. Ensure currentUser.slug exists, as it's used for URL consistency and profile lookup.
        if (!currentUser.slug) {
            console.warn('MyProfilePage: currentUser.slug is missing. Cannot enforce URL consistency or find detailed profile.');
            setAthleteProfile(null); // Clear profile if slug is missing, indicating an incomplete user state
            // Optionally, navigate to a profile setup page or show a message.
            return;
        }

        // 6. Enforce URL consistency for the athlete's own profile page:
        //    a. If a userId is present in the URL but it doesn't match the current user's slug,
        //       it means they're trying to view someone else's 'my-profile'. Redirect to their own.
        if (urlUserId && currentUser.slug !== urlUserId) {
            console.warn(`MyProfilePage: URL ID (${urlUserId}) does not match currentUser slug (${currentUser.slug}). Redirecting to correct profile URL.`);
            navigate(`/my-profile/${currentUser.slug}`, { replace: true });
            return;
        }

        //    b. If the current path is '/my-profile' (no ID in URL), but an athlete is logged in,
        //       redirect them to their ID-specific URL for consistency (SEO, deep linking).
        if (!urlUserId && window.location.pathname === '/my-profile') {
            console.log(`MyProfilePage: Redirecting from /my-profile to /my-profile/${currentUser.slug}`);
            navigate(`/my-profile/${currentUser.slug}`, { replace: true });
            return;
        }

        // --- Logic to find and set the Athlete Profile data for rendering ---
        // This logic runs only if all the above authentication and URL checks pass.

        // First, check if the `currentUser` object already contains comprehensive detailed profile info.
        // This is ideal if your AuthContext's `currentUser` is enriched upon login/signup.
        // The check `currentUser.careerStats && Object.keys(currentUser.careerStats).length > 0`
        // assumes that `careerStats` is a good indicator of a "full" profile.
        if (currentUser.slug === urlUserId && currentUser.userType === 'athlete' && currentUser.careerStats && Object.keys(currentUser.careerStats).length > 0) {
            setAthleteProfile(currentUser);
            console.log('MyProfilePage: Using currentUser data for detailed athlete profile display.');
            return; // Exit useEffect as profile is found
        }

        // If currentUser is not comprehensive or if we need to ensure we're using mock data consistently,
        // find the detailed athlete profile from `allAthleteProfilesData`.
        const foundProfile = allAthleteProfilesData.find(
            (profile) => profile.slug === currentUser.slug // Match the profile by the current user's slug
        );

        if (foundProfile) {
            setAthleteProfile(foundProfile);
            console.log('MyProfilePage: Found detailed athlete profile from allAthleteProfilesData:', foundProfile);
        } else {
            console.warn('MyProfilePage: Detailed athlete profile not found for current user slug in mock data:', currentUser.slug);
            setAthleteProfile(null); // Explicitly set to null if not found
            // In a real app, you might redirect to a profile creation page or show an error.
        }

    }, [loading, isLoggedIn, currentUser, userType, urlUserId, navigate]); // Dependencies for useEffect

    // Display loading/redirect messages while data is being fetched or checks are being performed.
    // This provides immediate feedback to the user.
    if (loading || !isLoggedIn || !currentUser || userType !== 'athlete' || !athleteProfile) {
        console.log('MyProfilePage: Rendering loading/redirect or missing profile data state...');
        return (
            <div className="min-h-screen bg-gamepulse-dark text-neutral-white flex items-center justify-center">
                <p className="text-lg animate-pulse">
                    {loading ? 'Loading profile...' :
                        !isLoggedIn ? 'Redirecting to login...' :
                            userType !== 'athlete' ? 'Access denied: Not an athlete...' :
                                !currentUser ? 'Error: User data missing. Please try again.' :
                                    !athleteProfile ? 'Fetching your detailed profile... (or profile not found)' : ''}
                </p>
            </div>
        );
    }

    // Placeholder handlers for button clicks and interactions.
    // These would typically trigger further navigation, modals, or API calls.
    const handleEditProfileClick = () => { console.log('Edit Profile clicked'); navigate('/edit-profile'); };
    const handleAddEditStatsClick = () => { console.log('Add/Edit Stats clicked'); navigate('/edit-stats'); };
    const handleAddAchievementClick = () => { console.log('Add Achievement clicked'); navigate('/add-achievement'); };
    const handleAllHighlightsDropdown = () => { console.log('All Highlights dropdown clicked'); /* Implement dropdown logic */ };
    const handleHighlightPlay = (title) => { console.log(`Playing highlight: ${title}`); /* Implement video player logic */ };
    const handleShareHighlight = (title) => { console.log(`Sharing highlight: ${title}`); /* Implement share functionality */ };
    const handleContinueLearningClick = () => { console.log('Continue Learning clicked'); navigate('/digital-classroom'); };
    const handleInAppMessagingToggle = () => { console.log('In-App Messaging toggle'); /* Implement state update and API call */ };
    const handleShowEmailToScoutsToggle = () => { console.log('Show Email to Scouts toggle'); /* Implement state update and API call */ };
    const handleSocialMediaLinkClick = (platform, url) => {
        console.log(`Opening ${platform} link: ${url}`);
        window.open(url, '_blank', 'noopener,noreferrer'); // Open in new tab securely
    };

    // Render the profile content once athleteProfile is available and valid
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
                                src={athleteProfile.profilePictureUrl || '/images/default-avatar.webp'} // Use profilePictureUrl from athleteProfile
                                alt={athleteProfile.fullName || 'Athlete'}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-3 md:border-4 border-gamepulse-yellow shadow-lg flex-shrink-0 mb-3 md:mb-0 md:mr-6"
                            />
                            <div className="flex-grow">
                                <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-neutral-white mb-1">{athleteProfile.fullName || 'Athlete Name'}</h1>
                                <p className="text-base md:text-lg text-gamepulse-yellow font-semibold mb-1 md:mb-2">
                                    {athleteProfile.position || 'Position N/A'} - {athleteProfile.team || 'Team N/A'}
                                </p>
                                <p className="text-xs md:text-sm text-neutral-light-gray mb-1">
                                    {athleteProfile.location || 'Location N/A'} <span className="font-bold ml-2 md:ml-4">XP Rank: {athleteProfile.xpRank || 'Beginner'}</span>
                                </p>
                                <p className="italic text-neutral-medium-gray text-xs md:text-sm mt-2">
                                    "{athleteProfile.motto || (athleteProfile.bio && athleteProfile.bio.length > 0 ? athleteProfile.bio[0] : 'New user on GamePulse Africa!')}" {/* Access motto first, then first element of bio array */}
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
                                    to={`/athlete/${athleteProfile.slug}`} // Link to public profile using the athlete's slug
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
                            {/* Check if careerStats exists and has keys */}
                            {athleteProfile.careerStats && Object.keys(athleteProfile.careerStats).length > 0 ? (
                                Object.entries(athleteProfile.careerStats).map(([key, value]) => (
                                    <div key={key} className="bg-gamepulse-blue-dark rounded-lg p-3 md:p-4 text-center">
                                        {/* Enhanced key display for readability */}
                                        <p className="text-neutral-medium-gray text-xs md:text-sm mb-1">
                                            {key.replace(/([A-Z])/g, ' $1').trim() // Add space before capital letters
                                                .replace('3p', '3-Point')
                                                .replace('fg', 'FG')
                                                .replace('ft', 'FT')
                                                .replace('saves', 'Saves')
                                                .replace('tackles', 'Tackles')
                                                .replace('goals', 'Goals')
                                                .replace('assists', 'Assists')
                                                .replace('gamesPlayed', 'Games Played')
                                                .replace('shotsOnTarget', 'Shots on Target')
                                                .replace('cleanSheets', 'Clean Sheets')
                                                .replace('points', 'Points')
                                                .replace('rebounds', 'Rebounds')
                                                .replace('steals', 'Steals')
                                                .replace('blocks', 'Blocks')
                                            }
                                        </p>
                                        <p className="text-2xl md:text-3xl font-bold text-success-green">
                                            {value}
                                            {/* Add '%' for percentage-based stats */}
                                            {['accuracy', 'fg', '3p', 'ft', 'passingCompletion'].some(stat => key.toLowerCase().includes(stat)) ? '%' : ''}
                                        </p>
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
                            {athleteProfile.achievements && athleteProfile.achievements.length > 0 ? (
                                athleteProfile.achievements.map((ach) => (
                                    <li key={ach.id} className="bg-neutral-blue-dark rounded-lg p-2.5 md:p-3 text-neutral-light-gray flex items-center text-sm">
                                        <FaStar className="text-gamepulse-yellow mr-2 md:mr-3" /> {ach.description}
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
                        {athleteProfile.media && athleteProfile.media.length > 0 ? (
                            <>
                                <div
                                    className="relative w-full rounded-lg overflow-hidden mb-4 md:mb-6 group cursor-pointer"
                                    onClick={() => handleHighlightPlay(athleteProfile.media[0].title)}
                                >
                                    {/* Placeholder for video thumbnail, or use actual video component */}
                                    <img src={athleteProfile.media[0].thumbnail || 'https://via.placeholder.com/400x225/1A202C/FFFFFF?text=No+Thumbnail'} alt={athleteProfile.media[0].title} className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaPlay className="text-gamepulse-yellow text-4xl md:text-5xl" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-base md:text-lg font-bold text-neutral-white">{athleteProfile.media[0].title}</h3>
                                        <p className="text-xxs md:text-xs text-neutral-medium-gray">{athleteProfile.media[0].description || 'No description'}</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleShareHighlight(athleteProfile.media[0].title); }}
                                        className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/50 p-1.5 md:p-2 rounded-full text-neutral-white text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                        <FaShareAlt />
                                    </button>
                                </div>

                                {/* Other Highlights (Horizontal Scroll) */}
                                {athleteProfile.media.length > 1 && (
                                    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                                        {athleteProfile.media.slice(1).map((highlight) => (
                                            <div
                                                key={highlight.id}
                                                className="flex-shrink-0 w-36 md:w-40 mr-3 md:mr-4 bg-neutral-blue-dark rounded-lg overflow-hidden cursor-pointer group hover:bg-neutral-blue-dark/80 transition-colors"
                                                onClick={() => handleHighlightPlay(highlight.title)}
                                            >
                                                <div className="relative w-full h-20 md:h-24 overflow-hidden">
                                                    <img src={highlight.thumbnail || 'https://via.placeholder.com/160x90/2D3748/FFFFFF?text=No+Thumbnail'} alt={highlight.title} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <FaPlay className="text-gamepulse-yellow text-2xl md:text-3xl" />
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-xs font-semibold text-neutral-white leading-tight mb-1">{highlight.title}</p>
                                                    <p className="text-xxs text-neutral-medium-gray">{highlight.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                            {athleteProfile.bio && athleteProfile.bio.length > 0 ? athleteProfile.bio.join('\n\n') : 'Tell us your story and aspirations! This section is where you can share your journey, motivations, and future goals in your sport.'}
                        </p>
                        <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Key Skills & Attributes</h3>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {athleteProfile.keyAttributes && athleteProfile.keyAttributes.length > 0 ? (
                                athleteProfile.keyAttributes.map((attribute) => (
                                    <span key={attribute.name} className="bg-gamepulse-blue-dark text-neutral-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                                        {attribute.name}
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
                        {athleteProfile.digitalClassroomProgress && athleteProfile.digitalClassroomProgress.length > 0 ? (
                            athleteProfile.digitalClassroomProgress.map((course) => (
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
                                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteProfile.network?.followers || 0}</p>
                                <p className="text-xs md:text-sm text-neutral-medium-gray">Followers</p>
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteProfile.network?.connections || 0}</p>
                                <p className="text-xs md:text-sm text-neutral-medium-gray">Connections</p>
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-bold text-gamepulse-yellow">{athleteProfile.network?.following || 0}</p>
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
                                        checked={athleteProfile.contactSettings?.inAppMessagingEnabled || false}
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
                                        checked={athleteProfile.contactSettings?.emailEnabled || false}
                                        onChange={handleShowEmailToScoutsToggle}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-neutral-medium-gray rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-neutral-white after:border-neutral-dark-gray after:border after:rounded-full after:h-4 md:h-5 after:w-4 md:w-5 after:transition-all peer-checked:bg-success-green"></div>
                                </label>
                            </div>
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-neutral-white mb-2 md:mb-3">Social Media</h3>
                        <div className="space-y-2 md:space-y-3">
                            {/* Conditionally render social media links based on existence in athleteProfile */}
                            {athleteProfile.icons?.instagram && (
                                <div
                                    className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                                    onClick={() => handleSocialMediaLinkClick('Instagram', `https://instagram.com/${athleteProfile.icons.instagram}`)}
                                >
                                    <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                                    <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`instagram.com/${athleteProfile.icons.instagram}`}</span>
                                </div>
                            )}
                            {athleteProfile.icons?.tiktok && (
                                <div
                                    className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                                    onClick={() => handleSocialMediaLinkClick('TikTok', `https://tiktok.com/@${athleteProfile.icons.tiktok}`)}
                                >
                                    <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                                    <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`tiktok.com/@${athleteProfile.icons.tiktok}`}</span>
                                </div>
                            )}
                            {athleteProfile.icons?.twitter && (
                                <div
                                    className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                                    onClick={() => handleSocialMediaLinkClick('Twitter', `https://twitter.com/${athleteProfile.icons.twitter}`)}
                                >
                                    <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                                    <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`twitter.com/${athleteProfile.icons.twitter}`}</span>
                                </div>
                            )}
                            {athleteProfile.icons?.facebook && (
                                <div
                                    className="flex items-center bg-gamepulse-dark rounded-lg p-2.5 md:p-3 cursor-pointer hover:bg-gamepulse-dark/80 transition-colors"
                                    onClick={() => handleSocialMediaLinkClick('Facebook', `https://facebook.com/${athleteProfile.icons.facebook}`)}
                                >
                                    <FaLink className="text-neutral-medium-gray mr-2 md:mr-3 text-sm md:text-base" />
                                    <span className="text-neutral-light-gray text-xs md:text-sm w-full">{`facebook.com/${athleteProfile.icons.facebook}`}</span>
                                </div>
                            )}
                            {/* Message if no social media links are present */}
                            {(!athleteProfile.icons?.instagram && !athleteProfile.icons?.tiktok && !athleteProfile.icons?.twitter && !athleteProfile.icons?.facebook) && (
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