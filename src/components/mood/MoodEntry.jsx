import { useState, useEffect } from 'react'
import './MoodEntry.css'

function MoodEntry({ onSubmit, onCancel, isModal = false, existingEntry = null }) {
  const [moodData, setMoodData] = useState({
    mood: existingEntry?.mood || '',
    intensity: existingEntry?.intensity || 5,
    notes: existingEntry?.notes || '',
    activities: existingEntry?.activities || [],
    triggers: existingEntry?.triggers || []
  })
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

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

  // Mood suggestions based on current mood and triggers
  const getMoodSuggestions = (mood, triggers, intensity) => {
    const suggestionDatabase = {
      'very_sad': [
        { icon: '🤗', text: 'Reach out to a trusted friend or family member', type: 'social' },
        { icon: '🎵', text: 'Listen to uplifting music or your favorite songs', type: 'activity' },
        { icon: '🌸', text: 'Practice gentle self-care like a warm bath', type: 'selfcare' },
        { icon: '📝', text: 'Write down three things you\'re grateful for', type: 'mindfulness' }
      ],
      'sad': [
        { icon: '🚶‍♀️', text: 'Take a short walk outside or get some fresh air', type: 'activity' },
        { icon: '☕', text: 'Make yourself a warm drink and sit quietly', type: 'selfcare' },
        { icon: '🎨', text: 'Try a creative activity like drawing or crafting', type: 'activity' },
        { icon: '📞', text: 'Call someone who makes you smile', type: 'social' }
      ],
      'okay': [
        { icon: '💪', text: 'Do some light exercise or stretching', type: 'activity' },
        { icon: '📚', text: 'Read something inspiring or educational', type: 'activity' },
        { icon: '🧘‍♀️', text: 'Try a 5-minute meditation or breathing exercise', type: 'mindfulness' },
        { icon: '🌱', text: 'Set a small, achievable goal for today', type: 'productivity' }
      ],
      'anxious': [
        { icon: '🫁', text: 'Practice deep breathing: 4 counts in, 6 counts out', type: 'mindfulness' },
        { icon: '📱', text: 'Limit social media and news consumption', type: 'digital' },
        { icon: '🎧', text: 'Listen to calming music or nature sounds', type: 'activity' },
        { icon: '✅', text: 'Write down your worries to externalize them', type: 'mindfulness' }
      ],
      'angry': [
        { icon: '🥊', text: 'Do some physical exercise to release tension', type: 'activity' },
        { icon: '🧊', text: 'Take 10 deep breaths or splash cold water on face', type: 'mindfulness' },
        { icon: '🚪', text: 'Step away from the situation if possible', type: 'space' },
        { icon: '🗣️', text: 'Talk it out with someone you trust', type: 'social' }
      ],
      'tired': [
        { icon: '💤', text: 'Consider taking a 20-minute power nap', type: 'rest' },
        { icon: '💧', text: 'Drink some water - you might be dehydrated', type: 'health' },
        { icon: '🌞', text: 'Get some natural light or step outside', type: 'activity' },
        { icon: '🍎', text: 'Have a healthy snack for energy', type: 'health' }
      ],
      'happy': [
        { icon: '📝', text: 'Write down what made you happy today', type: 'mindfulness' },
        { icon: '🤝', text: 'Share your positive energy with others', type: 'social' },
        { icon: '📸', text: 'Capture this moment with a photo or note', type: 'memory' },
        { icon: '🎯', text: 'Use this energy to tackle a challenging task', type: 'productivity' }
      ],
      'very_happy': [
        { icon: '🎉', text: 'Celebrate your achievements, big or small!', type: 'celebration' },
        { icon: '💌', text: 'Send a kind message to someone you care about', type: 'social' },
        { icon: '🎁', text: 'Do something nice for yourself as a reward', type: 'selfcare' },
        { icon: '📅', text: 'Plan something fun for the future', type: 'planning' }
      ],
      'excited': [
        { icon: '📋', text: 'Channel this energy into a productive task', type: 'productivity' },
        { icon: '🏃‍♀️', text: 'Use this energy for physical activity', type: 'activity' },
        { icon: '📞', text: 'Share your excitement with friends or family', type: 'social' },
        { icon: '🎯', text: 'Set new goals while motivation is high', type: 'planning' }
      ],
      'calm': [
        { icon: '🧘‍♀️', text: 'Enjoy this peaceful moment with mindfulness', type: 'mindfulness' },
        { icon: '📖', text: 'Read something enjoyable while you\'re relaxed', type: 'activity' },
        { icon: '🌿', text: 'Spend time in nature or with plants', type: 'nature' },
        { icon: '💭', text: 'Reflect on what brought you this calmness', type: 'reflection' }
      ]
    }

    let suggestions = suggestionDatabase[mood] || []
    
    // Add trigger-specific suggestions
    if (triggers.includes('Stress') || triggers.includes('Work pressure')) {
      suggestions.push({ icon: '⏰', text: 'Take a 5-minute break every hour', type: 'break' })
    }
    if (triggers.includes('Sleep quality')) {
      suggestions.push({ icon: '😴', text: 'Plan an earlier bedtime tonight', type: 'sleep' })
    }
    if (triggers.includes('Social media')) {
      suggestions.push({ icon: '📱', text: 'Consider a digital detox break', type: 'digital' })
    }

    // Adjust suggestions based on intensity
    if (intensity <= 3) {
      suggestions.unshift({ icon: '🆘', text: 'Consider reaching out for professional support', type: 'support' })
    }

    return suggestions.slice(0, 4) // Limit to 4 suggestions
  }

  // Update suggestions when mood, triggers, or intensity changes
  useEffect(() => {
    if (moodData.mood) {
      const newSuggestions = getMoodSuggestions(moodData.mood, moodData.triggers, moodData.intensity)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [moodData.mood, moodData.triggers, moodData.intensity])

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

          {/* Mood Suggestions */}
          {showSuggestions && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <h3>💡 Suggestions for you</h3>
                <p>Based on your current mood, here are some gentle suggestions:</p>
              </div>
              <div className="suggestions-grid">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className={`suggestion-card suggestion-${suggestion.type}`}>
                    <div className="suggestion-icon">{suggestion.icon}</div>
                    <div className="suggestion-text">{suggestion.text}</div>
                    <button 
                      type="button"
                      className="suggestion-try-btn"
                      onClick={() => {
                        // Add suggestion to notes if user finds it helpful
                        setMoodData(prev => ({
                          ...prev,
                          notes: prev.notes + (prev.notes ? '\n\n' : '') + `💡 Tried: ${suggestion.text}`
                        }))
                      }}
                      title="Add this suggestion to your notes"
                    >
                      ✓ Tried it
                    </button>
                  </div>
                ))}
              </div>
              <div className="suggestions-footer">
                <p>💝 Remember: These are gentle suggestions. Choose what feels right for you.</p>
              </div>
            </div>
          )}

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
