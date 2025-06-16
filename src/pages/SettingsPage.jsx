import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary
import { useDarkMode } from '../context/DarkModeContext'; // Import DarkModeContext
import {
  FaUserCircle, FaLock, FaBell, FaShieldAlt, FaLanguage, FaPalette,
  FaSave, FaTimes, FaCheckCircle, FaExclamationCircle, FaShareAlt,
  FaEnvelope, FaUserTie, FaLinkedin, FaInstagram, FaFacebook, FaCog
} from 'react-icons/fa'; // Import relevant icons

const SettingsPage = () => {
  const { user, updateUserProfile } = useAuth(); // Assuming useAuth provides 'user' object and 'updateUserProfile' function
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Get dark mode state and toggle function

  // State for Profile Information
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState(''); // Added full name
  const [location, setLocation] = useState(''); // Added location

  // State for Account Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // State for Preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [language, setLanguage] = useState('en');

  // State for Connect with Me
  const [allowInAppMessages, setAllowInAppMessages] = useState(true);
  const [publicContactEmail, setPublicContactEmail] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativePhone, setRepresentativePhone] = useState('');
  const [representativeEmail, setRepresentativeEmail] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    instagram: '',
    facebook: '',
    // Add more as needed
  });

  const [message, setMessage] = useState({ type: '', text: '' }); // For success/error messages

  // Populate form fields when user data is available
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setFullName(user.fullName || '');
      setLocation(user.location || '');
      setNotificationsEnabled(user.notificationsEnabled ?? true);
      setProfilePrivate(user.profilePrivate ?? false);
      setLanguage(user.language ?? 'en');
      setAllowInAppMessages(user.allowInAppMessages ?? true);
      setPublicContactEmail(user.publicContactEmail || user.email || ''); // Default to user's main email
      setRepresentativeName(user.representative?.name || '');
      setRepresentativePhone(user.representative?.phone || '');
      setRepresentativeEmail(user.representative?.email || '');
      setSocialLinks(user.socialLinks || { linkedin: '', instagram: '', facebook: '' });
    }
  }, [user]);

  // Handle form submissions
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      // Simulate API call and update user profile in context/backend
      await new Promise(resolve => setTimeout(resolve, 800));
      // Replace with actual API call: await updateUserProfile({ username, email, fullName, location });
      console.log('Profile updated:', { username, email, fullName, location });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      console.error('Profile update error:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (newPassword !== confirmNewPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
        setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
        return;
    }
    try {
      // Simulate API call for password change
      await new Promise(resolve => setTimeout(resolve, 800));
      // Replace with actual API call: await changeUserPassword(currentPassword, newPassword);
      console.log('Password changed.');
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please check your current password.' });
      console.error('Password change error:', error);
    }
  };

  const handlePreferencesSave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      // Simulate API call to save preferences
      await new Promise(resolve => setTimeout(resolve, 800));
      // Replace with actual API call: await saveUserPreferences({ notificationsEnabled, profilePrivate, language });
      console.log('Preferences saved:', { notificationsEnabled, profilePrivate, language });
      setMessage({ type: 'success', text: 'Preferences saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save preferences. Please try again.' });
      console.error('Preferences save error:', error);
    }
  };

  const handleConnectSettingsSave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      // Simulate API call to save connect settings
      await new Promise(resolve => setTimeout(resolve, 800));
      // Replace with actual API call: await saveConnectSettings({ allowInAppMessages, publicContactEmail, representative: { name: representativeName, phone: representativePhone, email: representativeEmail }, socialLinks });
      console.log('Connect settings saved:', { allowInAppMessages, publicContactEmail, representativeName, socialLinks });
      setMessage({ type: 'success', text: 'Connect settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save connect settings. Please try again.' });
      console.error('Connect settings save error:', error);
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-background-primary text-dark-text-primary' : 'bg-gray-100 text-gray-900'} transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-extrabold text-center mb-12 ${isDarkMode ? 'text-gamepulse-orange' : 'text-gamepulse-blue'}`}>
          Account Settings
        </h1>

        {/* Message Display */}
        {message.text && (
          <div className={`p-4 rounded-md mb-6 flex items-center ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {message.type === 'success' ? <FaCheckCircle className="mr-3 text-xl" /> : <FaExclamationCircle className="mr-3 text-xl" />}
            {message.text}
          </div>
        )}

        {/* Profile Information Section */}
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-dark-background-secondary' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
            <FaUserCircle className="mr-3 text-gamepulse-blue dark:text-gamepulse-orange" /> Profile Information
          </h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div>
              <label htmlFor="fullName" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Full Name</label>
              <input
                type="text"
                id="fullName"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Username</label>
              <input
                type="text"
                id="username"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Email Address</label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Location</label>
              <input
                type="text"
                id="location"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gamepulse-blue hover:bg-gamepulse-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gamepulse-blue
                         dark:bg-gamepulse-teal dark:hover:bg-[#006B6B] dark:focus:ring-gamepulse-teal"
            >
              <FaSave className="mr-2" /> Save Profile
            </button>
          </form>
        </div>

        {/* Account Security Section */}
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-dark-background-secondary' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
            <FaLock className="mr-3 text-gamepulse-blue dark:text-gamepulse-orange" /> Account Security
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label htmlFor="current-password" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Current Password</label>
              <input
                type="password"
                id="current-password"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="new-password" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>New Password</label>
              <input
                type="password"
                id="new-password"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Confirm New Password</label>
              <input
                type="password"
                id="confirm-new-password"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gamepulse-blue hover:bg-gamepulse-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gamepulse-blue
                         dark:bg-gamepulse-teal dark:hover:bg-[#006B6B] dark:focus:ring-gamepulse-teal"
            >
              <FaSave className="mr-2" /> Change Password
            </button>
          </form>
        </div>

        {/* Preferences Section */}
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-dark-background-secondary' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
            <FaCog className="mr-3 text-gamepulse-blue dark:text-gamepulse-orange" /> Preferences
          </h2>
          <form onSubmit={handlePreferencesSave} className="space-y-6">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="notifications" className={`flex items-center text-lg font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                <FaBell className="mr-3 text-gamepulse-yellow" /> Enable Notifications
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notifications"
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <div className={`w-11 h-6 ${notificationsEnabled ? 'bg-gamepulse-blue' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gamepulse-blue/50 rounded-full peer
                                   dark:${notificationsEnabled ? 'bg-gamepulse-teal' : 'bg-gray-700'} dark:peer-focus:ring-gamepulse-teal/50
                                   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
              </label>
            </div>

            {/* Profile Privacy Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="profile-privacy" className={`flex items-center text-lg font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                <FaShieldAlt className="mr-3 text-gamepulse-yellow" /> Make Profile Private
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="profile-privacy"
                  className="sr-only peer"
                  checked={profilePrivate}
                  onChange={(e) => setProfilePrivate(e.target.checked)}
                />
                <div className={`w-11 h-6 ${profilePrivate ? 'bg-gamepulse-blue' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gamepulse-blue/50 rounded-full peer
                                   dark:${profilePrivate ? 'bg-gamepulse-teal' : 'bg-gray-700'} dark:peer-focus:ring-gamepulse-teal/50
                                   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
              </label>
            </div>

            {/* Language Selection */}
            <div>
              <label htmlFor="language" className={`block text-lg font-medium mb-2 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                <FaLanguage className="mr-3 text-gamepulse-yellow inline-block" /> Language
              </label>
              <select
                id="language"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                {/* Add more languages as needed */}
              </select>
            </div>

            {/* Theme/Appearance (Dark Mode Toggle) */}
            <div className="flex items-center justify-between">
              <label htmlFor="theme-toggle" className={`flex items-center text-lg font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                <FaPalette className="mr-3 text-gamepulse-yellow" /> Dark Mode
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="theme-toggle"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={toggleDarkMode} // Call toggleDarkMode directly
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gamepulse-blue' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gamepulse-blue/50 rounded-full peer
                                   dark:${isDarkMode ? 'bg-gamepulse-teal' : 'bg-gray-700'} dark:peer-focus:ring-gamepulse-teal/50
                                   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gamepulse-blue hover:bg-gamepulse-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gamepulse-blue
                         dark:bg-gamepulse-teal dark:hover:bg-[#006B6B] dark:focus:ring-gamepulse-teal"
            >
              <FaSave className="mr-2" /> Save Preferences
            </button>
          </form>
        </div>

        {/* Connect with Me Section */}
        <div className={`p-6 rounded-lg shadow-lg mb-8 ${isDarkMode ? 'bg-dark-background-secondary' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
            <FaShareAlt className="mr-3 text-gamepulse-blue dark:text-gamepulse-orange" /> Connect with Me
          </h2>
          <form onSubmit={handleConnectSettingsSave} className="space-y-6">
            {/* Allow In-App Messages Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="allow-in-app-messages" className={`flex items-center text-lg font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                <FaEnvelope className="mr-3 text-gamepulse-yellow" /> Allow Secure In-App Messages
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="allow-in-app-messages"
                  className="sr-only peer"
                  checked={allowInAppMessages}
                  onChange={(e) => setAllowInAppMessages(e.target.checked)}
                />
                <div className={`w-11 h-6 ${allowInAppMessages ? 'bg-gamepulse-blue' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gamepulse-blue/50 rounded-full peer
                                   dark:${allowInAppMessages ? 'bg-gamepulse-teal' : 'bg-gray-700'} dark:peer-focus:ring-gamepulse-teal/50
                                   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
              </label>
            </div>

            {/* Public Contact Email */}
            <div>
              <label htmlFor="publicContactEmail" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Public Contact Email</label>
              <input
                type="email"
                id="publicContactEmail"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                            ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={publicContactEmail}
                onChange={(e) => setPublicContactEmail(e.target.value)}
                placeholder="amaani.okoro.athlete@gamepulse.africa"
              />
            </div>

            {/* Official Representative */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className={`text-xl font-medium mb-3 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                <FaUserTie className="mr-2 text-gamepulse-blue dark:text-gamepulse-orange" /> Official Representative
              </h3>
              <div>
                <label htmlFor="repName" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  id="repName"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                              ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                  value={representativeName}
                  onChange={(e) => setRepresentativeName(e.target.value)}
                  placeholder="Coach Kwame Nkrumah"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="repPhone" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Phone</label>
                <input
                  type="tel"
                  id="repPhone"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                              ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                  value={representativePhone}
                  onChange={(e) => setRepresentativePhone(e.target.value)}
                  placeholder="+233 55 123 4567"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="repEmail" className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  id="repEmail"
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm
                              ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
                  value={representativeEmail}
                  onChange={(e) => setRepresentativeEmail(e.target.value)}
                  placeholder="coach.kwame@school.com"
                />
              </div>
            </div>

            {/* My Social Media */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className={`text-xl font-medium mb-3 flex items-center ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-800'}`}>
                <FaShareAlt className="mr-2 text-gamepulse-blue dark:text-gamepulse-orange" /> My Social Media
              </h3>
              <div className="space-y-4">
                {['linkedin', 'instagram', 'facebook'].map(platform => (
                  <div key={platform}>
                    <label htmlFor={platform} className={`block text-sm font-medium ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-700'}`}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className={`inline-flex items-center px-3 rounded-l-md border border-r-0
                                        ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary' : 'bg-gray-50 text-gray-500 border-gray-300'}
                                        sm:text-sm`}>
                        {platform === 'linkedin' && <FaLinkedin />}
                        {platform === 'instagram' && <FaInstagram />}
                        {platform === 'facebook' && <FaFacebook />}
                      </span>
                      <input
                        type="url"
                        id={platform}
                        className={`flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border
                                    ${isDarkMode ? 'bg-dark-background-tertiary border-gray-700 text-dark-text-primary placeholder-dark-text-disabled' : 'border-gray-300 text-gray-900 placeholder-gray-500'}
                                    focus:ring-gamepulse-blue focus:border-gamepulse-blue sm:text-sm`}
                        value={socialLinks[platform]}
                        onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                        placeholder={`https://www.${platform}.com/yourprofile`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gamepulse-blue hover:bg-gamepulse-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gamepulse-blue
                         dark:bg-gamepulse-teal dark:hover:bg-[#006B6B] dark:focus:ring-gamepulse-teal"
            >
              <FaSave className="mr-2" /> Save Connect Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;