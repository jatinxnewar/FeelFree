import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import MoodEntry from '../components/mood/MoodEntry'
import MoodChart from '../components/mood/MoodChart'
import MoodHistory from '../components/mood/MoodHistory'
import MoodInsights from '../components/mood/MoodInsights'
import './MoodTracker.css'

function MoodTracker() {
  const { state, actions } = useApp()
  const [activeTab, setActiveTab] = useState('entry')
  const [showMoodEntry, setShowMoodEntry] = useState(false)

  const tabs = [
    { id: 'entry', label: 'Log Mood', icon: '📝' },
    { id: 'chart', label: 'Chart View', icon: '📊' },
    { id: 'history', label: 'History', icon: '📅' },
    { id: 'insights', label: 'Insights', icon: '💡' }
  ]

  const handleMoodSubmit = (moodData) => {
    const entry = {
      id: Date.now(),
      ...moodData,
      timestamp: new Date().toISOString(),
    }
    
    actions.addMoodEntry(entry)
    setShowMoodEntry(false)
    
    actions.addNotification({
      type: 'success',
      message: 'Mood entry saved successfully!'
    })
  }

  const getTodayMoodEntry = () => {
    const today = new Date().toDateString()
    return state.moodEntries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    )
  }

  const getWeeklyAverage = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const weekEntries = state.moodEntries.filter(entry => 
      new Date(entry.timestamp) >= oneWeekAgo
    )
    
    if (weekEntries.length === 0) return null
    
    const moodValues = {
      'very_sad': 1,
      'sad': 2,
      'okay': 3,
      'happy': 4,
      'very_happy': 5
    }
    
    const average = weekEntries.reduce((sum, entry) => 
      sum + (moodValues[entry.mood] || 3), 0
    ) / weekEntries.length
    
    return Math.round(average * 10) / 10
  }

  const getMoodStreak = () => {
    if (state.moodEntries.length === 0) return 0
    
    const sortedEntries = [...state.moodEntries].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
    
    let streak = 0
    let currentDate = new Date()
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.timestamp)
      const daysDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff === streak) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  const todayEntry = getTodayMoodEntry()
  const weeklyAverage = getWeeklyAverage()
  const moodStreak = getMoodStreak()

  return (
    <div className="mood-tracker-page">
      <div className="mood-tracker-container">
        {/* Header */}
        <div className="mood-tracker-header">
          <div className="header-content">
            <h1>Mood Tracker</h1>
            <p>Track your emotional well-being and discover patterns in your mental health journey.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <div className="stat-value">{moodStreak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">
                  {weeklyAverage ? `${weeklyAverage}/5` : 'N/A'}
                </div>
                <div className="stat-label">Weekly Avg</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <div className="stat-value">{state.moodEntries.length}</div>
                <div className="stat-label">Total Entries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Mood Status */}
        <div className="today-mood-status">
          {todayEntry ? (
            <div className="mood-logged">
              <div className="mood-info">
                <h3>Today's Mood: {todayEntry.moodEmoji} {todayEntry.moodLabel}</h3>
                <p>Logged at {new Date(todayEntry.timestamp).toLocaleTimeString()}</p>
                {todayEntry.notes && (
                  <p className="mood-notes">"{todayEntry.notes}"</p>
                )}
              </div>
              <button 
                className="update-mood-btn"
                onClick={() => setShowMoodEntry(true)}
              >
                Update Mood
              </button>
            </div>
          ) : (
            <div className="mood-not-logged">
              <h3>How are you feeling today?</h3>
              <p>Take a moment to check in with yourself and log your mood.</p>
              <button 
                className="log-mood-btn"
                onClick={() => setShowMoodEntry(true)}
              >
                <span className="btn-icon">😊</span>
                Log Your Mood
              </button>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="mood-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'entry' && (
            <div className="entry-tab">
              <MoodEntry onSubmit={handleMoodSubmit} />
            </div>
          )}
          
          {activeTab === 'chart' && (
            <div className="chart-tab">
              <MoodChart entries={state.moodEntries} />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="history-tab">
              <MoodHistory entries={state.moodEntries} />
            </div>
          )}
          
          {activeTab === 'insights' && (
            <div className="insights-tab">
              <MoodInsights entries={state.moodEntries} />
            </div>
          )}
        </div>

        {/* Mood Entry Modal */}
        {showMoodEntry && (
          <MoodEntry 
            onSubmit={handleMoodSubmit}
            onCancel={() => setShowMoodEntry(false)}
            isModal={true}
            existingEntry={todayEntry}
          />
        )}

        {/* Tips Section */}
        <div className="mood-tips">
          <h3>💡 Mood Tracking Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>🕐 Be Consistent</h4>
              <p>Try to log your mood at the same time each day for better patterns.</p>
            </div>
            <div className="tip-card">
              <h4>📝 Add Context</h4>
              <p>Include notes about what influenced your mood to identify triggers.</p>
            </div>
            <div className="tip-card">
              <h4>🎯 Be Honest</h4>
              <p>Record how you truly feel, not how you think you should feel.</p>
            </div>
            <div className="tip-card">
              <h4>📊 Review Patterns</h4>
              <p>Look for trends and patterns to understand your emotional cycles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodTracker
