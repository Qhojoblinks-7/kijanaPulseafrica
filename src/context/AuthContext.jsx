import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure these paths are correct relative to AuthContext.js
import { allAthleteProfilesData } from '../data/allAthleteProfilesData'; 
import { mockUsers } from '../data/mockUsers'; // <--- NEW IMPORT

const AuthContext = createContext();

// --- NO MORE MOCK USER DATA DIRECTLY HERE ---
// It's now imported from src/data/mockAuthUsers.js

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // This useEffect runs once on component mount to check localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('currentUser'));
                const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                const storedUserType = localStorage.getItem('userType');

                if (storedIsLoggedIn && storedUser && storedUserType) {
                    setIsLoggedIn(true);
                    setCurrentUser(storedUser);
                    setUserType(storedUserType);
                    console.log('AuthContext: Initialized from localStorage - Logged in.');
                } else {
                    console.log('AuthContext: Initialized - Not logged in or data missing.');
                }
            } catch (error) {
                console.error("AuthContext: Error initializing from localStorage", error);
                // Clear potentially corrupted storage
                localStorage.removeItem('currentUser');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userType');
                setIsLoggedIn(false);
                setCurrentUser(null);
                setUserType(null);
            } finally {
                setLoading(false);
                console.log('AuthContext: Initial loading finished.');
            }
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (credentials) => {
        setLoading(true);
        console.log('AuthContext: Login function called with credentials:', credentials);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

            // Authenticate against our mockUsers array
            const foundUser = mockUsers.find(
                user => (user.email === credentials.emailOrUsername || user.username === credentials.emailOrUsername) && (user.password === credentials.password)
            );

            if (!foundUser) {
                throw new Error('Invalid email/username or password.');
            }

            // --- Construct the comprehensive user object to store ---
            let userToStore = {
                id: foundUser.id,
                email: foundUser.email,
                fullName: foundUser.fullName,
                userType: foundUser.userType,
                slug: foundUser.slug,
                // Do NOT store sensitive data like 'password' here or in localStorage
            };

            // If the logged-in user is an athlete, try to enrich their profile
            // from the detailed allAthleteProfilesData
            if (foundUser.userType === 'athlete' && foundUser.slug) {
                const detailedAthleteProfile = allAthleteProfilesData.find(
                    athlete => athlete.id === foundUser.slug // Assuming athlete.id is the slug used for linking
                );

                if (detailedAthleteProfile) {
                    // Merge detailed athlete profile data into userToStore
                    userToStore = {
                        ...userToStore, 
                        ...detailedAthleteProfile, 
                        id: foundUser.id, 
                        email: foundUser.email, 
                    };
                    console.log("AuthContext: Athlete profile enriched with detailed data.");
                } else {
                    console.warn(`AuthContext: Athlete user found but no detailed profile for slug: ${foundUser.slug}`);
                    // If no detailed profile found, ensure it still has basic expected fields for MyProfilePage
                    userToStore = {
                        ...userToStore,
                        profilePictureUrl: foundUser.profilePictureUrl || '/images/default-avatar.webp',
                        location: foundUser.location || 'Accra, Ghana',
                        bio: foundUser.bio || ['Welcome to GamePulse Africa!'],
                        motto: foundUser.motto || 'Unleashing potential.',
                        careerStats: foundUser.careerStats || {},
                        achievements: foundUser.achievements || [],
                        media: foundUser.media || [],
                        keyAttributes: foundUser.keyAttributes || [],
                        digitalClassroomProgress: foundUser.digitalClassroomProgress || [],
                        network: foundUser.network || { followers: 0, connections: 0, following: 0 },
                        contactSettings: foundUser.contactSettings || { inAppMessagingEnabled: true, emailEnabled: false },
                        icons: foundUser.icons || {},
                        position: foundUser.position || 'Not specified',
                        team: foundUser.team || 'No team yet',
                        sportType: foundUser.sportType || 'Not specified',
                        xpRank: foundUser.xpRank || 'Beginner',
                    };
                }
            } else {
                // For non-athlete users (coach, scout, fan) or athletes without a matching detailed profile,
                // ensure their currentUser object still has necessary profile fields from mockUsers.
                userToStore = {
                    ...userToStore,
                    profilePictureUrl: foundUser.profilePictureUrl || '/images/default-avatar.webp',
                    location: foundUser.location || 'Accra, Ghana',
                    bio: foundUser.bio || ['Welcome to GamePulse Africa!'],
                    motto: foundUser.motto || 'Unleashing potential.',
                    careerStats: foundUser.careerStats || {}, 
                    achievements: foundUser.achievements || [],
                    media: foundUser.media || [],
                    keyAttributes: foundUser.keyAttributes || [],
                    digitalClassroomProgress: foundUser.digitalClassroomProgress || [],
                    network: foundUser.network || { followers: 0, connections: 0, following: 0 },
                    contactSettings: foundUser.contactSettings || { inAppMessagingEnabled: true, emailEnabled: false },
                    icons: foundUser.icons || {},
                    position: foundUser.position || 'Not specified',
                    team: foundUser.team || 'No team yet',
                    sportType: foundUser.sportType || 'Not specified', 
                    xpRank: foundUser.xpRank || 'Beginner',
                };
            }

            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', userToStore.userType);

            setIsLoggedIn(true);
            setCurrentUser(userToStore);
            setUserType(userToStore.userType);
            console.log('AuthContext: Login successful. Current User (after enrichment):', userToStore);

            return userToStore; 
        } catch (error) {
            console.error("AuthContext: Login failed:", error);
            setIsLoggedIn(false);
            setCurrentUser(null);
            setUserType(null);
            throw error; 
        } finally {
            setLoading(false);
            console.log('AuthContext: Login function finished, setting loading to false.');
        }
    }, []);

    const signup = useCallback(async (newUserData, redirectToPath = '/') => {
        setLoading(true);
        console.log('AuthContext: Signup function called with data:', newUserData);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const existingUser = mockUsers.find(user => user.email === newUserData.email);
            if (existingUser) {
                throw new Error('This email is already registered.');
            }

            const newUserId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
            const newSlugBase = newUserData.fullName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const newSlug = `${newSlugBase}-${newUserId.substring(5, 9)}`; 
            
            const userForMockDB = {
                id: newUserId,
                email: newUserData.email,
                password: newUserData.password, 
                fullName: newUserData.fullName,
                userType: newUserData.userType,
                slug: newSlug, 
                profilePictureUrl: '/images/default-avatar.webp', 
                location: 'Accra, Ghana', 
                bio: ['New user on GamePulse Africa! Ready to connect and grow.'], 
                motto: 'Unleashing potential.',
                careerStats: {}, 
                achievements: [], 
                media: [], 
                keyAttributes: [], 
                digitalClassroomProgress: [], 
                network: { followers: 0, connections: 0, following: 0 },
                contactSettings: { inAppMessagingEnabled: true, emailEnabled: false },
                icons: { instagram: '', tiktok: '', twitter: '', facebook: '' },
                position: 'Not specified', 
                team: 'No team yet', 
                sportType: 'Football', 
                xpRank: 'Beginner', 
            };
            mockUsers.push(userForMockDB); 
            console.log('AuthContext: New user added to mockUsers:', mockUsers); 

            const loggedInUserData = { ...userForMockDB }; 
            delete loggedInUserData.password; 

            localStorage.setItem('currentUser', JSON.stringify(loggedInUserData));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', loggedInUserData.userType);

            setIsLoggedIn(true);
            setCurrentUser(loggedInUserData); 
            setUserType(loggedInUserData.userType);
            console.log('AuthContext: Signup successful. Current User:', loggedInUserData);

            navigate(redirectToPath, { replace: true });

            return loggedInUserData; 
        } catch (error) {
            console.error("AuthContext: Signup failed:", error);
            setIsLoggedIn(false);
            setCurrentUser(null);
            setUserType(null);
            throw error; 
        } finally {
            setLoading(false);
            console.log('AuthContext: Signup function finished, setting loading to false.');
        }
    }, [navigate]);

    const logout = useCallback(() => {
        setLoading(true);
        console.log('AuthContext: Logout function called, setting loading to true.');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');

        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserType(null);
        console.log('AuthContext: State cleared for logout.');

        setLoading(false);
        console.log('AuthContext: Logout function finished, setting loading to false.');
        navigate('/login', { replace: true });
    }, [navigate]);

    const authValue = {
        isLoggedIn,
        currentUser,
        userType,
        loading,
        login,
        logout,
        signup, 
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};