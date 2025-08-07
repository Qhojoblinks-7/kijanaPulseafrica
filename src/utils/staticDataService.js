// src/utils/staticDataService.js
// Static data service to replace API calls for testing

import {
  mockUsers,
  mockNotifications,
  mockMessages,
  mockLiveMatches,
  mockUpcomingGames,
  mockHighlights,
  mockSearchResults,
  mockAnalytics,
  mockSettings,
  mockDigitalClassroom,
  mockNetwork,
  mockCalendarEvents,
  PROFILE_PICTURES,
} from '../data/staticData';

// Simulate API delay
const simulateApiDelay = (delay = 500) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Authentication Services
export const authService = {
  async login(credentials) {
    await simulateApiDelay(800);
    const user = mockUsers.find(
      u => (u.email === credentials.emailOrUsername || u.username === credentials.emailOrUsername) && 
           u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async signup(userData) {
    await simulateApiDelay(1000);
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  async logout() {
    await simulateApiDelay(300);
    return { success: true };
  },
};

// Notification Services
export const notificationService = {
  async getNotifications(userId) {
    await simulateApiDelay(600);
    return mockNotifications;
  },

  async markAsRead(notificationId) {
    await simulateApiDelay(300);
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    return { success: true };
  },

  async markAllAsRead() {
    await simulateApiDelay(500);
    mockNotifications.forEach(n => n.read = true);
    return { success: true };
  },

  async getUnreadCount() {
    await simulateApiDelay(200);
    return mockNotifications.filter(n => !n.read).length;
  },
};

// Message Services
export const messageService = {
  async getMessages(userId) {
    await simulateApiDelay(700);
    return mockMessages;
  },

  async sendMessage(messageData) {
    await simulateApiDelay(800);
    const newMessage = {
      id: Date.now(),
      ...messageData,
      timestamp: new Date().toISOString(),
      read: false,
    };
    mockMessages.push(newMessage);
    return newMessage;
  },

  async markMessageAsRead(messageId) {
    await simulateApiDelay(300);
    const message = mockMessages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
    }
    return { success: true };
  },

  async getUnreadMessageCount() {
    await simulateApiDelay(200);
    return mockMessages.filter(m => !m.read).length;
  },
};

// Match Services
export const matchService = {
  async getLiveMatches() {
    await simulateApiDelay(500);
    return mockLiveMatches;
  },

  async getUpcomingGames() {
    await simulateApiDelay(600);
    return mockUpcomingGames;
  },

  async getMatchDetails(matchId) {
    await simulateApiDelay(400);
    const match = mockLiveMatches.find(m => m.id === matchId) || 
                  mockUpcomingGames.find(g => g.id === matchId);
    return match || null;
  },
};

// Highlight Services
export const highlightService = {
  async getHighlights(filters = {}) {
    await simulateApiDelay(700);
    let highlights = [...mockHighlights];
    
    if (filters.sport) {
      highlights = highlights.filter(h => h.sport === filters.sport);
    }
    
    if (filters.athlete) {
      highlights = highlights.filter(h => h.athlete === filters.athlete);
    }
    
    return highlights;
  },

  async getHighlightById(highlightId) {
    await simulateApiDelay(400);
    return mockHighlights.find(h => h.id === highlightId) || null;
  },

  async uploadHighlight(highlightData) {
    await simulateApiDelay(1500);
    const newHighlight = {
      id: `highlight-${Date.now()}`,
      ...highlightData,
      views: 0,
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    mockHighlights.push(newHighlight);
    return newHighlight;
  },
};

// Search Services
export const searchService = {
  async searchAthletes(query, filters = {}) {
    await simulateApiDelay(800);
    let results = [...mockSearchResults];
    
    if (query) {
      results = results.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.sport.toLowerCase().includes(query.toLowerCase()) ||
        r.position.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.sport) {
      results = results.filter(r => r.sport === filters.sport);
    }
    
    if (filters.type) {
      results = results.filter(r => r.type === filters.type);
    }
    
    return results;
  },

  async searchCoaches(query) {
    await simulateApiDelay(600);
    return mockSearchResults.filter(r => r.type === 'coach' && 
      r.name.toLowerCase().includes(query.toLowerCase()));
  },

  async searchScouts(query) {
    await simulateApiDelay(600);
    return mockSearchResults.filter(r => r.type === 'scout' && 
      r.name.toLowerCase().includes(query.toLowerCase()));
  },
};

// Analytics Services
export const analyticsService = {
  async getDashboardStats() {
    await simulateApiDelay(900);
    return mockAnalytics;
  },

  async getUserStats() {
    await simulateApiDelay(600);
    return mockAnalytics.userStats;
  },

  async getEngagementStats() {
    await simulateApiDelay(500);
    return mockAnalytics.engagement;
  },

  async getSportsDistribution() {
    await simulateApiDelay(400);
    return mockAnalytics.sports;
  },
};

// Settings Services
export const settingsService = {
  async getUserSettings(userId) {
    await simulateApiDelay(500);
    return mockSettings;
  },

  async updateUserSettings(userId, settings) {
    await simulateApiDelay(800);
    Object.assign(mockSettings, settings);
    return { success: true, settings: mockSettings };
  },

  async updateNotificationSettings(userId, notifications) {
    await simulateApiDelay(600);
    Object.assign(mockSettings.notifications, notifications);
    return { success: true };
  },

  async updatePrivacySettings(userId, privacy) {
    await simulateApiDelay(600);
    Object.assign(mockSettings.privacy, privacy);
    return { success: true };
  },
};

// Digital Classroom Services
export const classroomService = {
  async getCourses(userId) {
    await simulateApiDelay(700);
    return mockDigitalClassroom;
  },

  async getCourseById(courseId) {
    await simulateApiDelay(400);
    return mockDigitalClassroom.find(c => c.id === courseId) || null;
  },

  async updateProgress(courseId, moduleId, completed) {
    await simulateApiDelay(500);
    const course = mockDigitalClassroom.find(c => c.id === courseId);
    if (course) {
      const module = course.modules.find(m => m.id === moduleId);
      if (module) {
        module.completed = completed;
      }
    }
    return { success: true };
  },
};

// Network Services
export const networkService = {
  async getNetwork(userId) {
    await simulateApiDelay(600);
    return mockNetwork;
  },

  async getFollowers(userId) {
    await simulateApiDelay(400);
    return mockNetwork.followers;
  },

  async getFollowing(userId) {
    await simulateApiDelay(400);
    return mockNetwork.following;
  },

  async getConnections(userId) {
    await simulateApiDelay(400);
    return mockNetwork.connections;
  },

  async followUser(userId, targetUserId) {
    await simulateApiDelay(800);
    // Simulate adding to following list
    return { success: true };
  },

  async unfollowUser(userId, targetUserId) {
    await simulateApiDelay(600);
    // Simulate removing from following list
    return { success: true };
  },
};

// Calendar Services
export const calendarService = {
  async getEvents(userId, dateRange = {}) {
    await simulateApiDelay(600);
    return mockCalendarEvents;
  },

  async createEvent(eventData) {
    await simulateApiDelay(800);
    const newEvent = {
      id: `event-${Date.now()}`,
      ...eventData,
      createdAt: new Date().toISOString(),
    };
    mockCalendarEvents.push(newEvent);
    return newEvent;
  },

  async updateEvent(eventId, eventData) {
    await simulateApiDelay(700);
    const event = mockCalendarEvents.find(e => e.id === eventId);
    if (event) {
      Object.assign(event, eventData);
    }
    return event;
  },

  async deleteEvent(eventId) {
    await simulateApiDelay(500);
    const index = mockCalendarEvents.findIndex(e => e.id === eventId);
    if (index !== -1) {
      mockCalendarEvents.splice(index, 1);
    }
    return { success: true };
  },
};

// Profile Services
export const profileService = {
  async getUserProfile(userId) {
    await simulateApiDelay(600);
    return mockUsers.find(u => u.id === userId) || null;
  },

  async updateUserProfile(userId, profileData) {
    await simulateApiDelay(1000);
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      Object.assign(user, profileData);
    }
    return user;
  },

  async uploadProfilePicture(userId, file) {
    await simulateApiDelay(1500);
    // Simulate file upload
    const pictureUrl = PROFILE_PICTURES.default;
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.profilePictureUrl = pictureUrl;
    }
    return { pictureUrl };
  },
};

// Export all services
export default {
  authService,
  notificationService,
  messageService,
  matchService,
  highlightService,
  searchService,
  analyticsService,
  settingsService,
  classroomService,
  networkService,
  calendarService,
  profileService,
};