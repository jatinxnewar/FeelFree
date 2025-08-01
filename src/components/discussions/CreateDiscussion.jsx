import { useState } from 'react'
import './CreateDiscussion.css'

function CreateDiscussion({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [],
    isAnonymous: true
  })
  const [tagInput, setTagInput] = useState('')

  const categories = [
    { value: 'general', label: 'General Discussion', icon: '💬' },
    { value: 'anxiety', label: 'Anxiety', icon: '😰' },
    { value: 'depression', label: 'Depression', icon: '💙' },
    { value: 'stress', label: 'Stress Management', icon: '😓' },
    { value: 'relationships', label: 'Relationships', icon: '💕' },
    { value: 'work', label: 'Work & Career', icon: '💼' },
    { value: 'support', label: 'Support & Encouragement', icon: '🤗' },
    { value: 'success', label: 'Success Stories', icon: '🌟' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && formData.tags.length < 5) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData)
    }
  }

  const isValid = formData.title.trim().length >= 5 && formData.content.trim().length >= 10

  return (
    <div className="create-discussion-overlay">
      <div className="create-discussion-modal">
        <div className="modal-header">
          <h2>Start a New Discussion</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="discussion-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Discussion Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What would you like to discuss?"
              maxLength={100}
              required
            />
            <div className="char-count">{formData.title.length}/100</div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Your Message *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your thoughts, experiences, or ask for support..."
              maxLength={2000}
              rows={6}
              required
            />
            <div className="char-count">{formData.content.length}/2000</div>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <div className="tags-input-container">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags (press Enter to add)"
                maxLength={20}
                disabled={formData.tags.length >= 5}
              />
              <div className="tags-info">
                Press Enter to add tags. Max 5 tags.
              </div>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="selected-tags">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                    <button 
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="remove-tag"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Settings */}
          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
              />
              <label htmlFor="isAnonymous" className="checkbox-label">
                <span className="checkbox-icon">🎭</span>
                Post anonymously (recommended for privacy)
              </label>
            </div>
          </div>

          {/* Guidelines Reminder */}
          <div className="guidelines-reminder">
            <h4>📋 Before you post:</h4>
            <ul>
              <li>Be respectful and supportive</li>
              <li>Avoid sharing personal information</li>
              <li>No medical advice - share experiences only</li>
              <li>Use trigger warnings if needed</li>
            </ul>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!isValid}
              className="submit-btn"
            >
              <span className="btn-icon">📝</span>
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDiscussion
