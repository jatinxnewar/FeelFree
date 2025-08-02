import { useApp } from '../../context/AppContext'
import './QuickStats.css'

function QuickStats() {
  const { state } = useApp()

  const stats = [
    {
      icon: '💬',
      label: 'Discussions',
      value: state.discussions.length,
      description: 'conversations'
    },
    {
      icon: '📊',
      label: 'Mood Entries',
      value: state.moodEntries.length,
      description: 'tracked moods'
    },
    {
      icon: '❤️',
      label: 'Saved',
      value: state.favorites.length,
      description: 'resources'
    },
    {
      icon: '🌟',
      label: 'Streak',
      value: '7',
      description: 'days active'
    }
  ]

  return (
    <section className="quick-stats">
      <div className="container">
        <h2 className="stats-title">Your Progress</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickStats
