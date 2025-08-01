import './DiscussionFilters.css'

function DiscussionFilters({ currentFilter, onFilterChange, sortBy, onSortChange }) {
  const categories = [
    { value: 'all', label: 'All Discussions', icon: '💬', count: 'all' },
    { value: 'general', label: 'General', icon: '💭', count: 0 },
    { value: 'anxiety', label: 'Anxiety', icon: '😰', count: 0 },
    { value: 'depression', label: 'Depression', icon: '💙', count: 0 },
    { value: 'stress', label: 'Stress', icon: '😓', count: 0 },
    { value: 'relationships', label: 'Relationships', icon: '💕', count: 0 },
    { value: 'work', label: 'Work & Career', icon: '💼', count: 0 },
    { value: 'support', label: 'Support', icon: '🤗', count: 0 },
    { value: 'success', label: 'Success Stories', icon: '🌟', count: 0 }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🕐' },
    { value: 'oldest', label: 'Oldest First', icon: '🕑' },
    { value: 'most_replies', label: 'Most Replies', icon: '💬' },
    { value: 'most_liked', label: 'Most Liked', icon: '❤️' }
  ]

  return (
    <div className="discussion-filters">
      <div className="filters-container">
        {/* Category Filters */}
        <div className="filter-section">
          <h3 className="filter-title">Categories</h3>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onFilterChange(category.value)}
                className={`category-filter ${currentFilter === category.value ? 'active' : ''}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
                {category.count !== 'all' && (
                  <span className="category-count">{category.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="filter-section">
          <h3 className="filter-title">Sort By</h3>
          <div className="sort-options">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="filter-section">
          <h3 className="filter-title">Quick Actions</h3>
          <div className="quick-actions">
            <button className="quick-action-btn">
              <span className="action-icon">🔍</span>
              Search Discussions
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">📌</span>
              View Pinned
            </button>
            <button className="quick-action-btn">
              <span className="action-icon">⭐</span>
              My Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="filter-summary">
        <div className="summary-content">
          <span className="summary-text">
            Showing <strong>{currentFilter === 'all' ? 'all' : currentFilter}</strong> discussions
            sorted by <strong>{sortOptions.find(opt => opt.value === sortBy)?.label.toLowerCase()}</strong>
          </span>
          {currentFilter !== 'all' && (
            <button 
              onClick={() => onFilterChange('all')}
              className="clear-filter-btn"
            >
              <span className="clear-icon">✕</span>
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiscussionFilters
