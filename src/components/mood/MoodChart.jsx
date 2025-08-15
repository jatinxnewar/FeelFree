import { useState, useEffect } from 'react'
import './MoodChart.css'

function MoodChart({ entries }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [animatedData, setAnimatedData] = useState([])

  const moodTypes = {
    1: { label: 'Very Sad', emoji: '😢', color: '#ef4444' },
    2: { label: 'Sad', emoji: '😟', color: '#f97316' },
    3: { label: 'Okay', emoji: '😐', color: '#eab308' },
    4: { label: 'Good', emoji: '😊', color: '#22c55e' },
    5: { label: 'Great', emoji: '😄', color: '#10b981' }
  }

  const getFilteredEntries = () => {
    const now = new Date()
    let filterDate = new Date()
    
    switch (selectedPeriod) {
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        filterDate.setDate(now.getDate() - 7)
    }

    return entries.filter(entry => new Date(entry.date) >= filterDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  const getChartData = () => {
    const filteredEntries = getFilteredEntries()
    if (filteredEntries.length === 0) return []

    return filteredEntries.map((entry, index) => ({
      ...entry,
      x: (index / Math.max(filteredEntries.length - 1, 1)) * 100,
      y: ((5 - entry.mood) / 4) * 100
    }))
  }

  const getMoodStats = () => {
    const filteredEntries = getFilteredEntries()
    if (filteredEntries.length === 0) return null

    const average = filteredEntries.reduce((sum, entry) => sum + entry.mood, 0) / filteredEntries.length
    const moodCounts = filteredEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    }, {})

    const mostCommon = Object.entries(moodCounts)
      .sort(([,a], [,b]) => b - a)[0]

    return {
      average: average.toFixed(1),
      mostCommon: mostCommon ? parseInt(mostCommon[0]) : 3,
      totalEntries: filteredEntries.length,
      trend: filteredEntries.length > 1 ? 
        filteredEntries[filteredEntries.length - 1].mood - filteredEntries[0].mood : 0
    }
  }

  useEffect(() => {
    const data = getChartData()
    setAnimatedData([])
    
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 100)

    return () => clearTimeout(timer)
  }, [entries, selectedPeriod])

  const chartData = getChartData()
  const stats = getMoodStats()

  return (
    <div className="mood-chart">
      <div className="chart-header">
        <h3>📊 Mood Trends</h3>
        <div className="period-selector">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="no-data">
          <div className="no-data-icon">📈</div>
          <h4>No mood data yet</h4>
          <p>Start tracking your mood to see your progress here!</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          {stats && (
            <div className="mood-stats">
              <div className="stat-card">
                <div className="stat-icon">{moodTypes[Math.round(stats.average)].emoji}</div>
                <div className="stat-value">{stats.average}</div>
                <div className="stat-label">Average Mood</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">{moodTypes[stats.mostCommon].emoji}</div>
                <div className="stat-value">{moodTypes[stats.mostCommon].label}</div>
                <div className="stat-label">Most Common</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">{stats.trend > 0 ? '📈' : stats.trend < 0 ? '📉' : '➖'}</div>
                <div className="stat-value">{stats.totalEntries}</div>
                <div className="stat-label">Total Entries</div>
              </div>
            </div>
          )}

          {/* Chart Visualization */}
          <div className="chart-container">
            <div className="chart-y-axis">
              {[5, 4, 3, 2, 1].map(level => (
                <div key={level} className="y-axis-label">
                  <span className="mood-emoji">{moodTypes[level].emoji}</span>
                  <span className="mood-text">{moodTypes[level].label}</span>
                </div>
              ))}
            </div>
            
            <div className="chart-area">
              <svg viewBox="0 0 100 100" className="mood-chart-svg">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map(y => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="var(--gray-200)"
                    strokeWidth="0.2"
                  />
                ))}
                
                {/* Mood line */}
                {animatedData.length > 1 && (
                  <polyline
                    points={animatedData.map(point => `${point.x},${point.y}`).join(' ')}
                    fill="none"
                    stroke="var(--primary-500)"
                    strokeWidth="1"
                    className="mood-line"
                  />
                )}
                
                {/* Data points */}
                {animatedData.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="1.5"
                      fill={moodTypes[point.mood].color}
                      className="mood-point"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill="transparent"
                      className="mood-point-hover"
                      data-mood={moodTypes[point.mood].label}
                      data-date={new Date(point.date).toLocaleDateString()}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="chart-legend">
            <h4>Mood Scale</h4>
            <div className="legend-items">
              {Object.entries(moodTypes).map(([value, mood]) => (
                <div key={value} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: mood.color }}
                  ></div>
                  <span className="legend-emoji">{mood.emoji}</span>
                  <span className="legend-text">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MoodChart
