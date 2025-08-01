import { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  user: {
    isAnonymous: true,
    username: 'Anonymous User',
    mood: null,
    joinDate: new Date().toISOString(),
  },
  discussions: [],
  moodEntries: [],
  favorites: [],
  theme: 'light',
  notifications: [],
}

// Action types
export const actionTypes = {
  SET_USER: 'SET_USER',
  ADD_DISCUSSION: 'ADD_DISCUSSION',
  UPDATE_DISCUSSION: 'UPDATE_DISCUSSION',
  DELETE_DISCUSSION: 'DELETE_DISCUSSION',
  ADD_MOOD_ENTRY: 'ADD_MOOD_ENTRY',
  UPDATE_MOOD_ENTRY: 'UPDATE_MOOD_ENTRY',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  LOAD_DATA: 'LOAD_DATA',
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    
    case actionTypes.ADD_DISCUSSION:
      return {
        ...state,
        discussions: [action.payload, ...state.discussions]
      }
    
    case actionTypes.UPDATE_DISCUSSION:
      return {
        ...state,
        discussions: state.discussions.map(discussion =>
          discussion.id === action.payload.id ? action.payload : discussion
        )
      }
    
    case actionTypes.DELETE_DISCUSSION:
      return {
        ...state,
        discussions: state.discussions.filter(discussion => discussion.id !== action.payload)
      }
    
    case actionTypes.ADD_MOOD_ENTRY:
      return {
        ...state,
        moodEntries: [action.payload, ...state.moodEntries]
      }
    
    case actionTypes.UPDATE_MOOD_ENTRY:
      return {
        ...state,
        moodEntries: state.moodEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        )
      }
    
    case actionTypes.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    
    case actionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload)
      }
    
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      }
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      }
    
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
    
    case actionTypes.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    
    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('feelfree-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: actionTypes.LOAD_DATA, payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('feelfree-data', JSON.stringify(state))
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }, [state])

  // Action creators
  const actions = {
    setUser: (userData) => dispatch({ type: actionTypes.SET_USER, payload: userData }),
    
    addDiscussion: (discussion) => dispatch({ type: actionTypes.ADD_DISCUSSION, payload: discussion }),
    
    updateDiscussion: (discussion) => dispatch({ type: actionTypes.UPDATE_DISCUSSION, payload: discussion }),
    
    deleteDiscussion: (discussionId) => dispatch({ type: actionTypes.DELETE_DISCUSSION, payload: discussionId }),
    
    addMoodEntry: (entry) => dispatch({ type: actionTypes.ADD_MOOD_ENTRY, payload: entry }),
    
    updateMoodEntry: (entry) => dispatch({ type: actionTypes.UPDATE_MOOD_ENTRY, payload: entry }),
    
    addToFavorites: (item) => dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: item }),
    
    removeFromFavorites: (itemId) => dispatch({ type: actionTypes.REMOVE_FROM_FAVORITES, payload: itemId }),
    
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
    
    addNotification: (notification) => dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { 
        id: Date.now(), 
        timestamp: new Date().toISOString(), 
        ...notification 
      } 
    }),
    
    removeNotification: (notificationId) => dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: notificationId }),
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext
