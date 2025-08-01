function MoodHistory({ entries }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="mood-history">
      <h3>Mood History</h3>
      {entries.length > 0 ? (
        <div className="history-list">
          {entries.slice(0, 10).map((entry) => (
            <div key={entry.id} className="history-item">
              <div className="entry-date">{formatDate(entry.timestamp)}</div>
              <div className="entry-mood">
                {entry.moodEmoji} {entry.moodLabel}
              </div>
              <div className="entry-intensity">Intensity: {entry.intensity}/10</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No mood entries yet. Start tracking your mood!</p>
      )}
    </div>
  )
}

export default MoodHistory
