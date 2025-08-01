import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import DiscussionCard from '../components/discussions/DiscussionCard'
import CreateDiscussion from '../components/discussions/CreateDiscussion'
import DiscussionFilters from '../components/discussions/DiscussionFilters'
import './Discussions.css'

function Discussions() {
  const { state, actions } = useApp()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filteredDiscussions, setFilteredDiscussions] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    let filtered = [...state.discussions]

    // Apply category filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(discussion => discussion.category === currentFilter)
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'most_replies':
        filtered.sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0))
        break
      case 'most_liked':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        break
      default:
        break
    }

    setFilteredDiscussions(filtered)
  }, [state.discussions, currentFilter, sortBy])

  const handleCreateDiscussion = (newDiscussion) => {
    const discussion = {
      id: Date.now(),
      ...newDiscussion,
      author: state.user.username,
      createdAt: new Date().toISOString(),
      replies: [],
      likes: 0,
      isLiked: false,
    }
    
    actions.addDiscussion(discussion)
    setShowCreateForm(false)
    
    actions.addNotification({
      type: 'success',
      message: 'Your discussion has been posted successfully!'
    })
  }

  return (
    <div className="discussions-page">
      <div className="discussions-container">
        {/* Header */}
        <div className="discussions-header">
          <div className="header-content">
            <h1>Community Discussions</h1>
            <p>Share your thoughts, experiences, and support others in their mental health journey.</p>
          </div>
          <button 
            className="create-btn"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="btn-icon">✏️</span>
            Start Discussion
          </button>
        </div>

        {/* Filters and Sort */}
        <DiscussionFilters 
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Create Discussion Modal */}
        {showCreateForm && (
          <CreateDiscussion 
            onSubmit={handleCreateDiscussion}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* Discussions List */}
        <div className="discussions-content">
          {filteredDiscussions.length > 0 ? (
            <div className="discussions-list">
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard 
                  key={discussion.id} 
                  discussion={discussion}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>No discussions yet</h3>
              <p>
                {currentFilter === 'all' 
                  ? "Be the first to start a conversation! Share your thoughts or ask a question."
                  : `No discussions found in the "${currentFilter}" category. Try a different filter or start a new discussion.`
                }
              </p>
              <button 
                className="empty-action-btn"
                onClick={() => setShowCreateForm(true)}
              >
                Start First Discussion
              </button>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="community-guidelines">
          <h3>💙 Community Guidelines</h3>
          <ul>
            <li><strong>Be Kind:</strong> Treat everyone with respect and empathy</li>
            <li><strong>Stay Anonymous:</strong> Protect your privacy and others'</li>
            <li><strong>No Medical Advice:</strong> Share experiences, not professional medical advice</li>
            <li><strong>Support Each Other:</strong> Offer encouragement and understanding</li>
            <li><strong>Report Issues:</strong> Help us maintain a safe space for everyone</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Discussions
