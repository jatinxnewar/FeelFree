import { useApp } from '../../context/AppContext'
import { useState, useEffect } from 'react'
import './QuickStats.css'

function QuickStats() {
  const { state } = useApp()
  const [animatedValues, setAnimatedValues] = useState({})

  // Calculate streak days (mock calculation for demo)
  const calculateStreak = () => {
    return Math.min(state.moodEntries.length, 14) // Cap at 14 days
  }

  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const thisWeekEntries = state.moodEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return entryDate >= weekAgo
    }).length
    return thisWeekEntries
  }

  const stats = [
    {
      icon: '💬',
      label: 'Active Discussions',
      value: state.discussions.length,
      description: 'conversations',
      trend: '+2 this week',
      color: 'blue'
    },
    {
      icon: '📊',
      label: 'Mood Tracking',
      value: getWeeklyProgress(),
      description: 'entries this week',
      trend: 'Goal: 7 days',
      color: 'purple'
    },
    {
      icon: '❤️',
      label: 'Saved Resources',
      value: state.favorites.length,
      description: 'helpful resources',
      trend: '+1 recent',
      color: 'red'
    },
    {
      icon: '🌟',
      label: 'Current Streak',
      value: calculateStreak(),
      description: 'days active',
      trend: 'Keep it up!',
      color: 'green'
    }
  ]

  // Animate number values on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        let current = 0
        const target = stat.value
        const increment = Math.ceil(target / 20)
        
        const animate = () => {
          current += increment
          if (current >= target) {
            setAnimatedValues(prev => ({ ...prev, [index]: target }))
          } else {
            setAnimatedValues(prev => ({ ...prev, [index]: current }))
            requestAnimationFrame(animate)
          }
        }
        
        setTimeout(() => animate(), index * 100)
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [state])

  return (
    <section className="quick-stats">
      <div className="container">
        <div className="stats-header">
          <h2 className="stats-title">Your Wellness Journey</h2>
          <p className="stats-subtitle">Track your progress and celebrate your achievements</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon-wrapper">
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {animatedValues[index] !== undefined ? animatedValues[index] : 0}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
                {stat.trend && (
                  <div className="stat-trend">
                    <span className="trend-indicator">📈</span>
                    {stat.trend}
                  </div>
                )}
              </div>
              <div className="stat-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${Math.min((stat.value / 10) * 100, 100)}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="motivation-section">
          <div className="motivation-content">
            <h3>🎯 Today's Focus</h3>
            <p>
              {getWeeklyProgress() >= 5 
                ? "Amazing consistency! You're building great habits." 
                : "Every small step counts. Keep going, you're doing great!"
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickStats
