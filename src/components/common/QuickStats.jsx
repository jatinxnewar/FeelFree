import { useApp } from '../../context/AppContext'
import './QuickStats.css'

function QuickStats() {
  const { state } = useApp()

  const stats = [
    {
      icon: '💬',
      label: 'Your Discussions',
      value: state.discussions.length,
      color: '#667eea',
      description: 'conversations started'
    },
    {
      icon: '📊',
      label: 'Mood Entries',
      value: state.moodEntries.length,
      color: '#f093fb',
      description: 'moods tracked'
    },
    {
      icon: '❤️',
      label: 'Favorites',
      value: state.favorites.length,
      color: '#ff6b6b',
      description: 'resources saved'
    },
    {
      icon: '📅',
      label: 'Days Active',
      value: Math.floor((new Date() - new Date(state.user.joinDate)) / (1000 * 60 * 60 * 24)) || 1,
      color: '#4ecdc4',
      description: 'on your journey'
    }
  ]

  const getLastMoodEmoji = () => {
    if (state.moodEntries.length === 0) return '😊'
    const lastMood = state.moodEntries[0]?.mood
    const moodEmojis = {
      'very_happy': '😄',
      'happy': '😊',
      'okay': '😐',
      'sad': '😢',
      'very_sad': '😭',
      'angry': '😠',
      'anxious': '😰',
      'excited': '🤩',
      'calm': '😌',
      'tired': '😴'
    }
    return moodEmojis[lastMood] || '😊'
  }

  return (
    <section className="quick-stats">
      <div className="stats-container">
        <div className="stats-header">
          <h2>Your Progress Dashboard</h2>
          <div className="current-mood">
            <span className="mood-label">Current Mood:</span>
            <span className="mood-emoji">{getLastMoodEmoji()}</span>
          </div>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    '--progress': `${Math.min((stat.value / 10) * 100, 100)}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="motivation-section">
          <div className="motivation-content">
            <h3>Keep Going! 🌟</h3>
            <p>
              {state.moodEntries.length === 0 
                ? "Start your journey by tracking your first mood!" 
                : state.discussions.length === 0 
                ? "Consider sharing your thoughts with the community."
                : "You're doing great! Every step counts in your mental health journey."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickStats
