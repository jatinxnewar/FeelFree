// Utility functions for FeelFree application

// Date and time utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const timeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2629746) return `${Math.floor(diffInSeconds / 604800)}w ago`
  if (diffInSeconds < 31556952) return `${Math.floor(diffInSeconds / 2629746)}mo ago`
  return `${Math.floor(diffInSeconds / 31556952)}y ago`
}

export const isToday = (dateString) => {
  const today = new Date()
  const date = new Date(dateString)
  return today.toDateString() === date.toDateString()
}

export const isThisWeek = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  
  return date >= startOfWeek
}

// String utilities
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// Array utilities
export const unique = (array) => {
  return [...new Set(array)]
}

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = typeof key === 'function' ? key(a) : a[key]
    const bVal = typeof key === 'function' ? key(b) : b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Mood utilities
export const getMoodColor = (mood) => {
  const moodColors = {
    'very_happy': '#4fd1c7',
    'happy': '#68d391',
    'okay': '#fbd38d',
    'sad': '#f687b3',
    'very_sad': '#fc8181',
    'angry': '#ff6b6b',
    'anxious': '#a78bfa',
    'excited': '#38d9a9',
    'calm': '#4facfe',
    'tired': '#9ca3af'
  }
  return moodColors[mood] || '#667eea'
}

export const getMoodValue = (mood) => {
  const moodValues = {
    'very_sad': 1,
    'sad': 2,
    'okay': 3,
    'happy': 4,
    'very_happy': 5,
    'angry': 2,
    'anxious': 2,
    'excited': 4,
    'calm': 4,
    'tired': 2
  }
  return moodValues[mood] || 3
}

export const calculateMoodAverage = (entries) => {
  if (entries.length === 0) return 0
  
  const total = entries.reduce((sum, entry) => {
    return sum + getMoodValue(entry.mood)
  }, 0)
  
  return Math.round((total / entries.length) * 10) / 10
}

export const getMoodTrend = (entries) => {
  if (entries.length < 2) return 'stable'
  
  const recent = entries.slice(0, 7) // Last 7 entries
  const older = entries.slice(7, 14) // Previous 7 entries
  
  if (older.length === 0) return 'stable'
  
  const recentAvg = calculateMoodAverage(recent)
  const olderAvg = calculateMoodAverage(older)
  
  const difference = recentAvg - olderAvg
  
  if (difference > 0.3) return 'improving'
  if (difference < -0.3) return 'declining'
  return 'stable'
}

// Local storage utilities
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

// Performance utilities
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Random utilities
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Color utilities
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const adjustBrightness = (hex, percent) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const adjust = (color) => {
    const adjusted = Math.round(color * (100 + percent) / 100)
    return Math.max(0, Math.min(255, adjusted))
  }
  
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b))
}

export default {
  formatDate,
  formatTime,
  formatDateTime,
  timeAgo,
  isToday,
  isThisWeek,
  truncateText,
  capitalizeFirst,
  slugify,
  unique,
  groupBy,
  sortBy,
  isValidEmail,
  isValidUrl,
  isValidPhoneNumber,
  getMoodColor,
  getMoodValue,
  calculateMoodAverage,
  getMoodTrend,
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  debounce,
  throttle,
  generateId,
  getRandomElement,
  shuffleArray,
  hexToRgb,
  rgbToHex,
  adjustBrightness
}
