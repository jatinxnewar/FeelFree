// Application constants for FeelFree

// App metadata
export const APP_NAME = 'FeelFree'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Mental Health and Wellness Community Platform'

// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    RESET_PASSWORD: '/auth/reset-password'
  },
  DISCUSSIONS: {
    GET_ALL: '/discussions',
    CREATE: '/discussions',
    GET_BY_ID: '/discussions/:id',
    UPDATE: '/discussions/:id',
    DELETE: '/discussions/:id',
    LIKE: '/discussions/:id/like',
    REPLY: '/discussions/:id/replies'
  },
  MOOD: {
    GET_ENTRIES: '/mood/entries',
    CREATE_ENTRY: '/mood/entries',
    UPDATE_ENTRY: '/mood/entries/:id',
    DELETE_ENTRY: '/mood/entries/:id',
    GET_STATS: '/mood/stats'
  },
  RESOURCES: {
    GET_ALL: '/resources',
    GET_BY_CATEGORY: '/resources/category/:category',
    SEARCH: '/resources/search'
  },
  PROFESSIONALS: {
    GET_ALL: '/professionals',
    GET_BY_ID: '/professionals/:id',
    SEARCH: '/professionals/search',
    BOOK_APPOINTMENT: '/professionals/:id/book'
  },
  CRISIS: {
    GET_HOTLINES: '/crisis/hotlines',
    GET_RESOURCES: '/crisis/resources'
  }
}

// Mood tracking
export const MOODS = [
  { id: 'very_happy', label: 'Very Happy', emoji: '😄', value: 5, color: '#4fd1c7' },
  { id: 'happy', label: 'Happy', emoji: '😊', value: 4, color: '#68d391' },
  { id: 'okay', label: 'Okay', emoji: '😐', value: 3, color: '#fbd38d' },
  { id: 'sad', label: 'Sad', emoji: '😢', value: 2, color: '#f687b3' },
  { id: 'very_sad', label: 'Very Sad', emoji: '😭', value: 1, color: '#fc8181' },
  { id: 'angry', label: 'Angry', emoji: '😠', value: 2, color: '#ff6b6b' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', value: 2, color: '#a78bfa' },
  { id: 'excited', label: 'Excited', emoji: '🤗', value: 4, color: '#38d9a9' },
  { id: 'calm', label: 'Calm', emoji: '😌', value: 4, color: '#4facfe' },
  { id: 'tired', label: 'Tired', emoji: '😴', value: 2, color: '#9ca3af' }
]

export const MOOD_FACTORS = [
  'Work/School',
  'Relationships',
  'Health',
  'Family',
  'Finances',
  'Weather',
  'Sleep',
  'Exercise',
  'Social Media',
  'News',
  'Hobbies',
  'Food',
  'Medication',
  'Therapy',
  'Other'
]

export const MOOD_ACTIVITIES = [
  'Exercise',
  'Meditation',
  'Reading',
  'Music',
  'Socializing',
  'Work',
  'Hobbies',
  'Cooking',
  'Gaming',
  'Movies/TV',
  'Walking',
  'Breathing exercises',
  'Journaling',
  'Therapy',
  'Other'
]

// Discussion categories
export const DISCUSSION_CATEGORIES = [
  { id: 'general', label: 'General Support', color: '#667eea' },
  { id: 'anxiety', label: 'Anxiety', color: '#a78bfa' },
  { id: 'depression', label: 'Depression', color: '#f687b3' },
  { id: 'stress', label: 'Stress Management', color: '#fbd38d' },
  { id: 'relationships', label: 'Relationships', color: '#ff6b6b' },
  { id: 'work', label: 'Work/Career', color: '#4facfe' },
  { id: 'family', label: 'Family', color: '#68d391' },
  { id: 'self_care', label: 'Self Care', color: '#4fd1c7' },
  { id: 'therapy', label: 'Therapy', color: '#38d9a9' },
  { id: 'medication', label: 'Medication', color: '#9ca3af' },
  { id: 'coping', label: 'Coping Strategies', color: '#fc8181' },
  { id: 'success', label: 'Success Stories', color: '#68d391' }
]

export const DISCUSSION_TAGS = [
  'support',
  'advice',
  'question',
  'vent',
  'achievement',
  'trigger-warning',
  'crisis',
  'medication',
  'therapy',
  'coping',
  'relapse',
  'recovery',
  'first-time',
  'urgent'
]

// Resource categories
export const RESOURCE_CATEGORIES = [
  { id: 'articles', label: 'Articles & Guides', icon: '📚' },
  { id: 'videos', label: 'Videos', icon: '🎥' },
  { id: 'apps', label: 'Apps & Tools', icon: '📱' },
  { id: 'books', label: 'Books', icon: '📖' },
  { id: 'podcasts', label: 'Podcasts', icon: '🎧' },
  { id: 'websites', label: 'Websites', icon: '🌐' },
  { id: 'exercises', label: 'Exercises', icon: '🧘' },
  { id: 'worksheets', label: 'Worksheets', icon: '📝' }
]

export const RESOURCE_TOPICS = [
  'Anxiety',
  'Depression',
  'Stress',
  'PTSD',
  'Bipolar',
  'OCD',
  'ADHD',
  'Eating Disorders',
  'Addiction',
  'Grief',
  'Relationships',
  'Self-Esteem',
  'Sleep',
  'Mindfulness',
  'Meditation',
  'CBT',
  'DBT',
  'General Wellness'
]

// Professional types
export const PROFESSIONAL_TYPES = [
  { id: 'therapist', label: 'Therapist', icon: '👩‍⚕️' },
  { id: 'counselor', label: 'Counselor', icon: '👨‍💼' },
  { id: 'psychiatrist', label: 'Psychiatrist', icon: '👩‍⚕️' },
  { id: 'psychologist', label: 'Psychologist', icon: '👨‍🔬' },
  { id: 'social_worker', label: 'Social Worker', icon: '👩‍💼' },
  { id: 'life_coach', label: 'Life Coach', icon: '🎯' },
  { id: 'support_group', label: 'Support Group', icon: '👥' }
]

export const SPECIALIZATIONS = [
  'Anxiety Disorders',
  'Depression',
  'Trauma & PTSD',
  'Bipolar Disorder',
  'OCD',
  'ADHD',
  'Eating Disorders',
  'Substance Abuse',
  'Grief & Loss',
  'Relationship Issues',
  'Family Therapy',
  'Couples Therapy',
  'Child & Adolescent',
  'LGBTQ+ Issues',
  'Cultural Issues',
  'Career Counseling',
  'Stress Management',
  'Anger Management'
]

export const THERAPY_APPROACHES = [
  'Cognitive Behavioral Therapy (CBT)',
  'Dialectical Behavior Therapy (DBT)',
  'Acceptance and Commitment Therapy (ACT)',
  'Eye Movement Desensitization and Reprocessing (EMDR)',
  'Psychodynamic Therapy',
  'Humanistic Therapy',
  'Solution-Focused Brief Therapy',
  'Mindfulness-Based Therapy',
  'Trauma-Informed Therapy',
  'Family Systems Therapy'
]

// Crisis support
export const CRISIS_TYPES = [
  { id: 'suicide', label: 'Suicidal Thoughts', severity: 'high' },
  { id: 'self_harm', label: 'Self Harm', severity: 'high' },
  { id: 'panic', label: 'Panic Attack', severity: 'medium' },
  { id: 'breakdown', label: 'Mental Breakdown', severity: 'high' },
  { id: 'abuse', label: 'Abuse/Violence', severity: 'high' },
  { id: 'substance', label: 'Substance Crisis', severity: 'high' },
  { id: 'trauma', label: 'Acute Trauma', severity: 'high' },
  { id: 'severe_anxiety', label: 'Severe Anxiety', severity: 'medium' }
]

// Time periods
export const TIME_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  THREE_MONTHS: '3months',
  SIX_MONTHS: '6months',
  YEAR: 'year',
  ALL_TIME: 'all'
}

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'feelFree_userPreferences',
  MOOD_ENTRIES: 'feelFree_moodEntries',
  DISCUSSIONS: 'feelFree_discussions',
  THEME: 'feelFree_theme',
  NOTIFICATIONS: 'feelFree_notifications',
  ONBOARDING: 'feelFree_onboardingComplete',
  SAVED_RESOURCES: 'feelFree_savedResources',
  PRIVACY_SETTINGS: 'feelFree_privacySettings'
}

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Privacy levels
export const PRIVACY_LEVELS = {
  PUBLIC: 'public',
  COMMUNITY: 'community',
  PRIVATE: 'private'
}

// User roles
export const USER_ROLES = {
  MEMBER: 'member',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  PROFESSIONAL: 'professional'
}

// Features flags
export const FEATURES = {
  MOOD_TRACKING: true,
  DISCUSSIONS: true,
  PROFESSIONAL_DIRECTORY: true,
  CRISIS_SUPPORT: true,
  RESOURCES: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  OFFLINE_MODE: false,
  CHAT_SUPPORT: false,
  VIDEO_CALLS: false
}

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  POST_TITLE_MAX_LENGTH: 200,
  POST_CONTENT_MAX_LENGTH: 5000,
  COMMENT_MAX_LENGTH: 1000,
  BIO_MAX_LENGTH: 500
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please wait before trying again.',
  MAINTENANCE: 'The service is currently under maintenance.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  MOOD_LOGGED: 'Mood entry saved successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
  ACCOUNT_CREATED: 'Account created successfully!'
}

// Default settings
export const DEFAULT_SETTINGS = {
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    digest: 'weekly'
  },
  privacy: {
    profile: 'community',
    mood: 'private',
    posts: 'community'
  },
  preferences: {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'MM/DD/YYYY'
  }
}

export default {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_BASE_URL,
  ENDPOINTS,
  MOODS,
  MOOD_FACTORS,
  MOOD_ACTIVITIES,
  DISCUSSION_CATEGORIES,
  DISCUSSION_TAGS,
  RESOURCE_CATEGORIES,
  RESOURCE_TOPICS,
  PROFESSIONAL_TYPES,
  SPECIALIZATIONS,
  THERAPY_APPROACHES,
  CRISIS_TYPES,
  TIME_PERIODS,
  STORAGE_KEYS,
  NOTIFICATION_TYPES,
  PRIVACY_LEVELS,
  USER_ROLES,
  FEATURES,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_SETTINGS
}
