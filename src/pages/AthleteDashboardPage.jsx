import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { myAthleteProfileData } from '../data/myProfileData'; // For the logged-in athlete's dashboard data
import { dummyAthleteData } from '../data/athleteData'; // For the public profile data (e.g., AthleteProfileHero)

// Import existing components
import MyProfileHeader from '../components/MyProfile/MyProfileHeader'; // Your personal dashboard header
import StatsSection from '../components/AthleteProfile/StatsSection'; // Your stats section
import AthleteProfileHero from '../components/AthleteProfile/AthleteProfileHero'; // The Stephen Curry-style hero section

// Import icons for all sections (ensure you have react-icons installed: npm install react-icons)
import {
    FaTrophy, FaVideo, FaLink, FaBookOpen, FaConnectdevelop,
    FaUserGraduate, FaCheckCircle, FaTimesCircle, FaEye, FaPlayCircle, FaEnvelope, FaHandshake,
    FaFutbol, FaHandsHelping, FaCalendarAlt, FaShieldAlt, // Icons potentially used in StatsSection
    FaBasketballBall, FaRetweet, FaLifeRing, FaBullseye,
    FaRunning, FaRulerHorizontal,
    FaUserPlus, FaAt, FaShareAlt, FaUsers, FaTiktok, FaInstagram, FaTwitter, FaChartLine
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router for navigation

// --- SECTION COMPONENTS (DEFINED FIRST TO ENSURE THEY ARE AVAILABLE) ---

const AchievementsSection = ({ achievements, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaTrophy className={`mr-3 ${iconColorClass}`} /> My Achievements
            </h2>
            <ul className="space-y-3">
                {achievements && achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                        <li key={index} className={`flex items-start ${textColorClass}`}>
                            <FaTrophy className={`mr-3 mt-1 text-lg ${iconColorClass}`} />
                            <p>{achievement.text}</p>
                        </li>
                    ))
                ) : (
                    <p className={`${textColorClass}`}>No achievements listed yet. Add some to showcase your success!</p>
                )}
            </ul>
            <div className="mt-6 text-right">
                <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}>
                    Add New Achievement
                </button>
            </div>
        </section>
    );
};

const MediaGallerySection = ({ featuredVideo, videoThumbnails, photoThumbnails, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';
    const subTextColorClass = isDarkMode ? 'text-dark-text-secondary' : 'text-gray-600';

    const allMedia = [...(videoThumbnails || []), ...(photoThumbnails || [])];

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaVideo className={`mr-3 ${iconColorClass}`} /> My Highlights & Media Gallery
            </h2>

            {featuredVideo && (
                <div className="mb-8">
                    <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>Featured Highlight</h3>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                        {/* Basic YouTube embed transformation. In a real app, you'd parse video IDs more robustly. */}
                        {/* Note: The URL here should be a valid YouTube embed URL. */}
                        <iframe
                            src={featuredVideo} // Use featuredVideo directly if it's already an embed URL
                            title="Featured Highlight"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
            {!featuredVideo && (
                <div className={`w-full aspect-video rounded-lg overflow-hidden shadow-md mb-8 flex items-center justify-center ${isDarkMode ? 'bg-dark-background-tertiary' : 'bg-gray-200'}`}>
                    <p className={`${subTextColorClass}`}>No featured video yet.</p>
                </div>
            )}

            <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>All Media</h3>
            {allMedia.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allMedia.map((media) => (
                        <div key={media.id} className="relative group aspect-video rounded-md overflow-hidden shadow-sm cursor-pointer">
                            <img
                                src={media.src}
                                alt={media.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {media.type === 'video' ? (
                                    <FaPlayCircle className="text-white text-4xl" />
                                ) : (
                                    <FaEye className="text-white text-4xl" />
                                )}
                            </div>
                            <p className={`absolute bottom-0 left-0 right-0 p-2 text-xs font-semibold text-white bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                {media.alt}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={`${textColorClass}`}>No media uploaded yet. Share your best moments!</p>
            )}
            <div className="mt-6 text-right space-x-2">
                <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-dark-background-tertiary text-dark-text-primary hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors duration-200`}>
                    Manage Media
                </button>
                <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}>
                    Upload New Media
                </button>
            </div>
        </section>
    );
};

const MatchLinksSection = ({ liveStreamLinks, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaLink className={`mr-3 ${iconColorClass}`} /> My Match & Stream Links
            </h2>
            <ul className="space-y-3">
                {liveStreamLinks && liveStreamLinks.length > 0 ? (
                    liveStreamLinks.map((link, index) => (
                        <li key={index} className="flex items-start">
                            <FaPlayCircle className={`mr-3 mt-1 text-lg ${iconColorClass}`} />
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className={`${textColorClass} hover:underline`}>
                                {link.label}
                            </a>
                        </li>
                    ))
                ) : (
                    <p className={`${textColorClass}`}>No match links added yet. Share your upcoming games or replays!</p>
                )}
            </ul>
            <div className="mt-6 text-right">
                <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}>
                    Add New Link
                </button>
            </div>
        </section>
    );
};

const StoryQualitiesSection = ({ personalStatement, skills, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';
    const skillTagBgClass = isDarkMode ? 'bg-dark-background-tertiary' : 'bg-gray-100';
    const skillTagTextColorClass = isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700';

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaBookOpen className={`mr-3 ${iconColorClass}`} /> My Story & Qualities
            </h2>
            <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>Personal Statement</h3>
                <p className={`${textColorClass} leading-relaxed italic`}>"{personalStatement}"</p>
                <div className="mt-4 text-right">
                    <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}>
                        Edit Statement
                    </button>
                </div>
            </div>

            <div>
                <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>My Qualities / Skills</h3>
                {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className={`px-4 py-2 rounded-full ${skillTagBgClass} ${skillTagTextColorClass} font-medium text-sm`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className={`${textColorClass}`}>No skills listed yet. Showcase what makes you unique!</p>
                )}
                <div className="mt-6 text-right">
                    <button className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}>
                        Add/Edit Skills
                    </button>
                </div>
            </div>
        </section>
    );
};

const DigitalClassroomProgressSection = ({ progress, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';
    const completedClass = isDarkMode ? 'text-green-400' : 'text-green-600';
    const incompleteClass = isDarkMode ? 'text-red-400' : 'text-red-600';

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaUserGraduate className={`mr-3 ${iconColorClass}`} /> Digital Classroom Progress
            </h2>
            <ul className="space-y-3">
                {progress && progress.length > 0 ? (
                    progress.map((module, index) => (
                        <li key={index} className={`flex items-center ${textColorClass}`}>
                            {module.completed ? (
                                <FaCheckCircle className={`mr-3 ${completedClass}`} />
                            ) : (
                                <FaTimesCircle className={`mr-3 ${incompleteClass}`} />
                            )}
                            {module.name} - <span className={`font-semibold ml-2 ${module.completed ? completedClass : incompleteClass}`}>
                                {module.completed ? 'Completed' : 'In Progress'}
                            </span>
                        </li>
                    ))
                ) : (
                    <p className={`${textColorClass}`}>No classroom modules started yet. Enhance your knowledge!</p>
                )}
            </ul>
            <div className="mt-6 text-right">
                <Link
                    to="/digital-classroom"
                    className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}
                >
                    Go to Classroom
                </Link>
            </div>
        </section>
    );
};

const ConnectWithMeDashboardSection = ({ contactOptions, coachAgentContact, socialMediaLinks, isDarkMode }) => {
    const bgColorClass = isDarkMode ? 'bg-dark-background-secondary' : 'bg-white';
    const textColorClass = isDarkMode ? 'text-dark-text-primary' : 'text-gray-900';
    const iconColorClass = isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue';
    const linkColorClass = isDarkMode ? 'text-gamepulse-teal hover:text-[#006B6B]' : 'text-gamepulse-blue hover:text-gamepulse-blue-dark';

    return (
        <section className={`rounded-lg shadow-lg ${bgColorClass} p-6 mb-8 transition-colors duration-300`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center ${textColorClass}`}>
                <FaConnectdevelop className={`mr-3 ${iconColorClass}`} /> Connect With Me
            </h2>

            {/* Contact Options */}
            <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>Contact Options</h3>
                <p className={`${textColorClass} flex items-center mb-2`}>
                    <FaEnvelope className={`mr-3 ${iconColorClass}`} /> Public Email:
                    <span className="ml-2 font-medium">
                        {contactOptions?.publicEmail ? contactOptions.publicEmail : 'Not set'}
                    </span>
                </p>
                <p className={`${textColorClass} flex items-center`}>
                    <FaHandshake className={`mr-3 ${iconColorClass}`} /> In-App Messaging:
                    <span className="ml-2 font-medium">{contactOptions?.inAppMessaging ? 'Enabled' : 'Disabled'}</span>
                </p>
            </div>

            {/* Official Representative */}
            {coachAgentContact && (
                <div className="mb-6">
                    <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>Official Representative</h3>
                    <p className={`${textColorClass}`}>Name: <span className="font-medium">{coachAgentContact.name}</span></p>
                    <p className={`${textColorClass}`}>Phone: <span className="font-medium">{coachAgentContact.phone}</span></p>
                    <p className={`${textColorClass}`}>Email: <span className="font-medium">{coachAgentContact.email}</span></p>
                </div>
            )}

            {/* Social Media Links */}
            <div>
                <h3 className={`text-xl font-semibold mb-3 ${textColorClass}`}>Social Media</h3>
                <div className="flex flex-wrap gap-4">
                    {socialMediaLinks && socialMediaLinks.length > 0 ? (
                        socialMediaLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center ${linkColorClass}`}>
                                {link.icon && <link.icon className="mr-2 text-xl" />} {link.platform}
                            </a>
                        ))
                    ) : (
                        <p className={`${textColorClass}`}>No social media links added yet.</p>
                    )}
                </div>
            </div>
            <div className="mt-6 text-right">
                <Link
                    to="/settings"
                    className={`px-4 py-2 rounded-md font-semibold text-sm ${isDarkMode ? 'bg-gamepulse-teal text-white hover:bg-[#006B6B]' : 'bg-gamepulse-blue text-white hover:bg-gamepulse-blue-dark'} transition-colors duration-200`}
                >
                    Manage Contact & Socials
                </Link>
            </div>
        </section>
    );
};

// --- MAIN ATHLETE DASHBOARD PAGE COMPONENT ---

const AthleteDashboardPage = () => {
    const { isDarkMode } = useDarkMode();

    // Use myAthleteProfileData for the logged-in athlete's personal dashboard sections
    const athlete = myAthleteProfileData; 

    // State to manage the active sport tab in StatsSection
    const [activeSport, setActiveSport] = useState(athlete.sports && athlete.sports.length > 0 ? athlete.sports[0].id : 'football');

    // Handler for editing stats (placeholder)
    const handleEditStat = (stat) => {
        alert(`Editing stat: ${stat.label} (Value: ${stat.value})`);
        // In a real app, this would open a modal or form to edit the stat
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-dark-background-primary' : 'bg-gray-100'} transition-colors duration-300`}>
            {/* This is the HEADER for the logged-in athlete's dashboard (Amaani Okoro's personal info).
              It uses `myAthleteProfileData`.
            */}
            <MyProfileHeader athlete={athlete} />

            {/* If you ALSO want to show the "Public Profile Hero" (Stephen Curry style) on this page,
              uncomment the line below. This would typically be used on a separate page for viewing
              *other* athletes' profiles, and it uses `dummyAthleteData` for its specific structure.
              Make sure `dummyAthleteData` is structured as required by AthleteProfileHero.
            */}
            {/* <AthleteProfileHero athlete={dummyAthleteData} /> */}

            <div className="container mx-auto px-4 md:px-8 max-w-4xl py-8">
                {/* My Game: Stats & Progress */}
                <StatsSection
                    sports={athlete.sports} // Ensure myAthleteProfileData has a 'sports' array
                    stats={athlete.detailedStats} // <--- CORRECTED: Use detailedStats for StatsSection
                    progressData={athlete.progressData}
                    onEditStat={handleEditStat}
                    isEditingMode={true}
                    activeSport={activeSport}
                    setActiveSport={setActiveSport}
                />

                {/* My Achievements */}
                <AchievementsSection achievements={athlete.achievements} isDarkMode={isDarkMode} />

                {/* My Highlights & Media Gallery */}
                <MediaGallerySection
                    featuredVideo={athlete.featuredVideo}
                    videoThumbnails={athlete.videoThumbnails}
                    photoThumbnails={athlete.photoThumbnails}
                    isDarkMode={isDarkMode}
                />

                {/* My Match & Stream Links */}
                <MatchLinksSection liveStreamLinks={athlete.liveStreamLinks} isDarkMode={isDarkMode} />

                {/* My Story & Qualities */}
                <StoryQualitiesSection
                    personalStatement={athlete.personalStatement}
                    skills={athlete.skills}
                    isDarkMode={isDarkMode}
                />

                {/* Digital Classroom Progress */}
                <DigitalClassroomProgressSection
                    progress={athlete.digitalClassroomProgress}
                    isDarkMode={isDarkMode}
                />

                {/* Connect With Me */}
                <ConnectWithMeDashboardSection
                    contactOptions={athlete.contactOptions}
                    coachAgentContact={athlete.coachAgentContact}
                    socialMediaLinks={athlete.socialMediaLinks}
                    isDarkMode={isDarkMode}
                />

                {/* Add more sections as needed */}
            </div>
        </div>
    );
};

export default AthleteDashboardPage;