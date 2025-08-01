import { useState } from 'react'
import './MoodEntry.css'

function MoodEntry({ onSubmit, onCancel, isModal = false, existingEntry = null }) {
  const [moodData, setMoodData] = useState({
    mood: existingEntry?.mood || '',
    intensity: existingEntry?.intensity || 5,
    notes: existingEntry?.notes || '',
    activities: existingEntry?.activities || [],
    triggers: existingEntry?.triggers || []
  })

  const moods = [
    { value: 'very_happy', emoji: '😄', label: 'Very Happy', color: '#4fd1c7' },
    { value: 'happy', emoji: '😊', label: 'Happy', color: '#68d391' },
    { value: 'okay', emoji: '😐', label: 'Okay', color: '#fbd38d' },
    { value: 'sad', emoji: '😢', label: 'Sad', color: '#f687b3' },
    { value: 'very_sad', emoji: '😭', label: 'Very Sad', color: '#fc8181' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: '#ff6b6b' },
    { value: 'anxious', emoji: '😰', label: 'Anxious', color: '#a78bfa' },
    { value: 'excited', emoji: '🤩', label: 'Excited', color: '#38d9a9' },
    { value: 'calm', emoji: '😌', label: 'Calm', color: '#4facfe' },
    { value: 'tired', emoji: '😴', label: 'Tired', color: '#9ca3af' }
  ]

  const activities = [
    'Exercise', 'Work', 'Social', 'Family', 'Sleep', 'Meditation',
    'Reading', 'Music', 'Nature', 'Food', 'Learning', 'Creativity'
  ]

  const commonTriggers = [
    'Stress', 'Work pressure', 'Relationships', 'Health', 'Money',
    'Weather', 'Sleep quality', 'Social media', 'News', 'Traffic'
  ]

  const handleMoodSelect = (moodValue) => {
    const selectedMood = moods.find(m => m.value === moodValue)
    setMoodData(prev => ({
      ...prev,
      mood: moodValue,
      moodEmoji: selectedMood.emoji,
      moodLabel: selectedMood.label,
      moodColor: selectedMood.color
    }))
  }

  const handleActivityToggle = (activity) => {
    setMoodData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }))
  }

  const handleTriggerToggle = (trigger) => {
    setMoodData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (moodData.mood) {
      onSubmit(moodData)
    }
  }

  const MoodEntryContent = () => (
    <div className="mood-entry-content">
      <h2>How are you feeling right now?</h2>
      
      {/* Mood Selection */}
      <div className="mood-selection">
        <h3>Select your mood:</h3>
        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => handleMoodSelect(mood.value)}
              className={`mood-option ${moodData.mood === mood.value ? 'selected' : ''}`}
              style={{ '--mood-color': mood.color }}
            >
              <div className="mood-emoji">{mood.emoji}</div>
              <div className="mood-label">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {moodData.mood && (
        <>
          {/* Intensity Scale */}
          <div className="intensity-section">
            <h3>Intensity (1-10):</h3>
            <div className="intensity-slider">
              <input
                type="range"
                min="1"
                max="10"
                value={moodData.intensity}
                onChange={(e) => setMoodData(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                className="slider"
              />
              <div className="intensity-value">{moodData.intensity}</div>
            </div>
          </div>

          {/* Activities */}
          <div className="activities-section">
            <h3>What activities are you doing? (optional)</h3>
            <div className="options-grid">
              {activities.map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => handleActivityToggle(activity)}
                  className={`option-btn ${moodData.activities.includes(activity) ? 'selected' : ''}`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Triggers */}
          <div className="triggers-section">
            <h3>Any triggers affecting your mood? (optional)</h3>
            <div className="options-grid">
              {commonTriggers.map((trigger) => (
                <button
                  key={trigger}
                  type="button"
                  onClick={() => handleTriggerToggle(trigger)}
                  className={`option-btn ${moodData.triggers.includes(trigger) ? 'selected' : ''}`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="notes-section">
            <h3>Additional notes (optional):</h3>
            <textarea
              value={moodData.notes}
              onChange={(e) => setMoodData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="How was your day? What's on your mind?"
              maxLength={500}
              rows={4}
            />
            <div className="char-count">{moodData.notes.length}/500</div>
          </div>

          {/* Submit Section */}
          <div className="submit-section">
            <button type="submit" className="submit-btn">
              <span className="btn-icon">💾</span>
              {existingEntry ? 'Update Mood' : 'Save Mood Entry'}
            </button>
            {isModal && (
              <button type="button" onClick={onCancel} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )

  if (isModal) {
    return (
      <div className="mood-entry-overlay">
        <div className="mood-entry-modal">
          <div className="modal-header">
            <h2>Log Your Mood</h2>
            <button className="close-btn" onClick={onCancel}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="mood-entry-form">
            <MoodEntryContent />
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="mood-entry-container">
      <form onSubmit={handleSubmit} className="mood-entry-form">
        <MoodEntryContent />
      </form>
    </div>
  )
}

export default MoodEntry
