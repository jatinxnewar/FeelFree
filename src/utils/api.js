// API utility functions for FeelFree application
import { API_BASE_URL, ERROR_MESSAGES } from './constants'

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Add auth header if token exists
const getHeaders = (customHeaders = {}) => {
  const token = getAuthToken()
  const headers = { ...defaultHeaders, ...customHeaders }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  return headers
}

// Handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = ERROR_MESSAGES.SERVER_ERROR
    
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (e) {
      // If response is not JSON, use status-based error message
      switch (response.status) {
        case 401:
          errorMessage = ERROR_MESSAGES.UNAUTHORIZED
          // Clear invalid token
          localStorage.removeItem('authToken')
          break
        case 404:
          errorMessage = ERROR_MESSAGES.NOT_FOUND
          break
        case 429:
          errorMessage = ERROR_MESSAGES.RATE_LIMIT
          break
        case 503:
          errorMessage = ERROR_MESSAGES.MAINTENANCE
          break
        default:
          errorMessage = ERROR_MESSAGES.SERVER_ERROR
      }
    }
    
    throw new Error(errorMessage)
  }
  
  return response.json()
}

// Base API function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: getHeaders(options.headers),
    ...options
  }
  
  try {
    const response = await fetch(url, config)
    return await handleResponse(response)
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
    }
    throw error
  }
}

// HTTP method helpers
export const api = {
  // GET request
  get: (endpoint, options = {}) => {
    return apiRequest(endpoint, {
      method: 'GET',
      ...options
    })
  },

  // POST request
  post: (endpoint, data = null, options = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...options
    })
  },

  // PUT request
  put: (endpoint, data = null, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      ...options
    })
  },

  // PATCH request
  patch: (endpoint, data = null, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
      ...options
    })
  },

  // DELETE request
  delete: (endpoint, options = {}) => {
    return apiRequest(endpoint, {
      method: 'DELETE',
      ...options
    })
  },

  // File upload
  upload: (endpoint, file, data = {}, options = {}) => {
    const formData = new FormData()
    formData.append('file', file)
    
    // Append additional data
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    
    return apiRequest(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with boundary
        ...getHeaders(options.headers),
        'Content-Type': undefined
      },
      ...options
    })
  }
}

// Authentication API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.patch('/auth/profile', data),
  changePassword: (passwords) => api.patch('/auth/password', passwords),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token })
}

// Discussions API calls
export const discussionsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/discussions${queryString ? `?${queryString}` : ''}`)
  },
  getById: (id) => api.get(`/discussions/${id}`),
  create: (data) => api.post('/discussions', data),
  update: (id, data) => api.put(`/discussions/${id}`, data),
  delete: (id) => api.delete(`/discussions/${id}`),
  like: (id) => api.post(`/discussions/${id}/like`),
  unlike: (id) => api.delete(`/discussions/${id}/like`),
  getReplies: (id) => api.get(`/discussions/${id}/replies`),
  createReply: (id, data) => api.post(`/discussions/${id}/replies`, data),
  updateReply: (discussionId, replyId, data) => 
    api.put(`/discussions/${discussionId}/replies/${replyId}`, data),
  deleteReply: (discussionId, replyId) => 
    api.delete(`/discussions/${discussionId}/replies/${replyId}`)
}

// Mood tracking API calls
export const moodAPI = {
  getEntries: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/mood/entries${queryString ? `?${queryString}` : ''}`)
  },
  createEntry: (data) => api.post('/mood/entries', data),
  updateEntry: (id, data) => api.put(`/mood/entries/${id}`, data),
  deleteEntry: (id) => api.delete(`/mood/entries/${id}`),
  getStats: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/mood/stats${queryString ? `?${queryString}` : ''}`)
  },
  getInsights: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/mood/insights${queryString ? `?${queryString}` : ''}`)
  }
}

// Resources API calls
export const resourcesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/resources${queryString ? `?${queryString}` : ''}`)
  },
  getById: (id) => api.get(`/resources/${id}`),
  getByCategory: (category, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/resources/category/${category}${queryString ? `?${queryString}` : ''}`)
  },
  search: (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params }).toString()
    return api.get(`/resources/search?${searchParams}`)
  },
  save: (id) => api.post(`/resources/${id}/save`),
  unsave: (id) => api.delete(`/resources/${id}/save`),
  getSaved: () => api.get('/resources/saved'),
  rate: (id, rating) => api.post(`/resources/${id}/rate`, { rating })
}

// Professionals API calls
export const professionalsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/professionals${queryString ? `?${queryString}` : ''}`)
  },
  getById: (id) => api.get(`/professionals/${id}`),
  search: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/professionals/search?${queryString}`)
  },
  getAvailability: (id, date) => 
    api.get(`/professionals/${id}/availability?date=${date}`),
  bookAppointment: (id, data) => 
    api.post(`/professionals/${id}/appointments`, data),
  getAppointments: () => api.get('/appointments'),
  cancelAppointment: (id) => api.delete(`/appointments/${id}`),
  rescheduleAppointment: (id, data) => 
    api.patch(`/appointments/${id}`, data)
}

// Crisis support API calls
export const crisisAPI = {
  getHotlines: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/crisis/hotlines${queryString ? `?${queryString}` : ''}`)
  },
  getResources: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/crisis/resources${queryString ? `?${queryString}` : ''}`)
  },
  reportCrisis: (data) => api.post('/crisis/report', data),
  getSafetyPlan: () => api.get('/crisis/safety-plan'),
  updateSafetyPlan: (data) => api.put('/crisis/safety-plan', data)
}

// Notifications API calls
export const notificationsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/notifications${queryString ? `?${queryString}` : ''}`)
  },
  markAsRead: (id) => api.patch(`/notifications/${id}`, { read: true }),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
  delete: (id) => api.delete(`/notifications/${id}`),
  getSettings: () => api.get('/notifications/settings'),
  updateSettings: (settings) => api.put('/notifications/settings', settings)
}

// Utility functions for offline support
export const cacheAPI = {
  // Cache response data
  setCache: (key, data, expiration = 3600000) => { // 1 hour default
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiration
    }
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData))
  },

  // Get cached data if not expired
  getCache: (key) => {
    try {
      const cached = localStorage.getItem(`cache_${key}`)
      if (!cached) return null

      const { data, timestamp, expiration } = JSON.parse(cached)
      
      if (Date.now() - timestamp > expiration) {
        localStorage.removeItem(`cache_${key}`)
        return null
      }

      return data
    } catch (error) {
      console.error('Error retrieving cache:', error)
      return null
    }
  },

  // Clear specific cache
  clearCache: (key) => {
    localStorage.removeItem(`cache_${key}`)
  },

  // Clear all cache
  clearAllCache: () => {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

// Create API function with caching
export const createCachedAPI = (apiFunction, cacheKey, expiration) => {
  return async (...args) => {
    // Try to get from cache first
    const cached = cacheAPI.getCache(cacheKey)
    if (cached) {
      return cached
    }

    // If not in cache, make API call
    try {
      const result = await apiFunction(...args)
      cacheAPI.setCache(cacheKey, result, expiration)
      return result
    } catch (error) {
      // If API fails, try to return stale cache if available
      const staleCache = localStorage.getItem(`cache_${cacheKey}`)
      if (staleCache) {
        console.warn('API failed, returning stale cache')
        return JSON.parse(staleCache).data
      }
      throw error
    }
  }
}

export default api
