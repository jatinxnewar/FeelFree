import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './DiscussionCard.css'

function DiscussionCard({ discussion }) {
  const { actions } = useApp()
  const [showReplies, setShowReplies] = useState(false)
  const [newReply, setNewReply] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  const handleLike = () => {
    const updatedDiscussion = {
      ...discussion,
      likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
      isLiked: !discussion.isLiked
    }
    actions.updateDiscussion(updatedDiscussion)
  }

  const handleReply = () => {
    if (newReply.trim()) {
      const reply = {
        id: Date.now(),
        content: newReply,
        author: 'Anonymous User',
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false
      }

      const updatedDiscussion = {
        ...discussion,
        replies: [...(discussion.replies || []), reply]
      }

      actions.updateDiscussion(updatedDiscussion)
      setNewReply('')
      setIsReplying(false)
      setShowReplies(true)

      actions.addNotification({
        type: 'success',
        message: 'Your reply has been posted!'
      })
    }
  }

  const handleBookmark = () => {
    const updatedDiscussion = {
      ...discussion,
      isBookmarked: !discussion.isBookmarked
    }
    
    actions.updateDiscussion(updatedDiscussion)
    
    // Add to favorites if bookmarked
    if (!discussion.isBookmarked) {
      actions.addToFavorites({
        id: discussion.id,
        type: 'discussion',
        title: discussion.title,
        content: discussion.content.substring(0, 100) + '...',
        savedAt: new Date().toISOString()
      })
      
      actions.addNotification({
        type: 'success',
        message: 'Discussion bookmarked! Check your saved items.'
      })
    } else {
      actions.addNotification({
        type: 'info',
        message: 'Bookmark removed from saved items.'
      })
    }
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category) => {
    const colors = {
      'anxiety': '#ff6b6b',
      'depression': '#4ecdc4',
      'stress': '#45b7d1',
      'relationships': '#f093fb',
      'work': '#4facfe',
      'general': '#667eea',
      'support': '#96ceb4',
      'success': '#feca57'
    }
    return colors[category] || '#667eea'
  }

  return (
    <div className="discussion-card">
      <div className="discussion-header">
        <div className="author-info">
          <div className="author-avatar">👤</div>
          <div className="author-details">
            <span className="author-name">{discussion.author}</span>
            <span className="post-time">{formatTimeAgo(discussion.createdAt)}</span>
          </div>
        </div>
        <div 
          className="discussion-category"
          style={{ backgroundColor: getCategoryColor(discussion.category) }}
        >
          {discussion.category}
        </div>
      </div>

      <div className="discussion-content">
        <h3 className="discussion-title">{discussion.title}</h3>
        <p className="discussion-text">{discussion.content}</p>
        
        {discussion.tags && discussion.tags.length > 0 && (
          <div className="discussion-tags">
            {discussion.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="discussion-actions">
        <button 
          className={`action-btn like-btn ${discussion.isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="action-icon">{discussion.isLiked ? '❤️' : '🤍'}</span>
          <span className="action-count">{discussion.likes || 0}</span>
        </button>

        <button 
          className="action-btn reply-btn"
          onClick={() => setShowReplies(!showReplies)}
        >
          <span className="action-icon">💬</span>
          <span className="action-count">{discussion.replies?.length || 0}</span>
        </button>

        <button 
          className={`action-btn bookmark-btn ${discussion.isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmark}
          title={discussion.isBookmarked ? 'Remove bookmark' : 'Bookmark this discussion'}
        >
          <span className="action-icon">{discussion.isBookmarked ? '🔖' : '📝'}</span>
          <span className="action-text">{discussion.isBookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <button 
          className="action-btn share-btn"
          onClick={() => {
            navigator.clipboard.writeText(`Check out this discussion: ${discussion.title}`)
            actions.addNotification({
              type: 'info',
              message: 'Discussion link copied to clipboard!'
            })
          }}
        >
          <span className="action-icon">📤</span>
          <span className="action-text">Share</span>
        </button>
      </div>

      {/* Replies Section */}
      {showReplies && (
        <div className="replies-section">
          <div className="replies-header">
            <h4>Replies ({discussion.replies?.length || 0})</h4>
            <button 
              className="reply-toggle-btn"
              onClick={() => setIsReplying(!isReplying)}
            >
              {isReplying ? '❌' : '✏️'} {isReplying ? 'Cancel' : 'Reply'}
            </button>
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="reply-form">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your thoughts or support..."
                maxLength={500}
                rows={3}
              />
              <div className="reply-form-actions">
                <span className="char-count">{newReply.length}/500</span>
                <button 
                  onClick={handleReply}
                  disabled={!newReply.trim()}
                  className="submit-reply-btn"
                >
                  Post Reply
                </button>
              </div>
            </div>
          )}

          {/* Replies List */}
          <div className="replies-list">
            {discussion.replies?.map((reply) => (
              <div key={reply.id} className="reply-item">
                <div className="reply-header">
                  <div className="reply-author">
                    <span className="author-avatar">👤</span>
                    <span className="author-name">{reply.author}</span>
                    <span className="reply-time">{formatTimeAgo(reply.createdAt)}</span>
                  </div>
                </div>
                <p className="reply-content">{reply.content}</p>
                <div className="reply-actions">
                  <button className="reply-like-btn">
                    <span className="action-icon">🤍</span>
                    <span className="action-count">{reply.likes || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscussionCard
