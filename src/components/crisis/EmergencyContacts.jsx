import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './EmergencyContacts.css'

function EmergencyContacts() {
  const { state, actions } = useApp()
  const [contacts, setContacts] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    isPrimary: false,
    isEmergency: false
  })

  const relationships = [
    'Family Member', 'Friend', 'Partner/Spouse', 'Healthcare Provider',
    'Therapist/Counselor', 'Doctor', 'Neighbor', 'Coworker', 'Other'
  ]

  // Load contacts from localStorage or state
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts')
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts))
  }, [contacts])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone) {
      actions.addNotification({
        type: 'error',
        message: 'Name and phone number are required'
      })
      return
    }

    const contactData = {
      ...formData,
      id: editingId || Date.now(),
      createdAt: editingId ? contacts.find(c => c.id === editingId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (editingId) {
      setContacts(contacts.map(contact => 
        contact.id === editingId ? contactData : contact
      ))
      actions.addNotification({
        type: 'success',
        message: 'Emergency contact updated successfully'
      })
      setEditingId(null)
    } else {
      setContacts([...contacts, contactData])
      actions.addNotification({
        type: 'success',
        message: 'Emergency contact added successfully'
      })
    }

    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      isPrimary: false,
      isEmergency: false
    })
    setIsAdding(false)
  }

  const handleEdit = (contact) => {
    setFormData(contact)
    setEditingId(contact.id)
    setIsAdding(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id))
      actions.addNotification({
        type: 'info',
        message: 'Emergency contact deleted'
      })
    }
  }

  const handleQuickCall = (contact) => {
    if (window.confirm(`Call ${contact.name} at ${contact.phone}?`)) {
      window.location.href = `tel:${contact.phone}`
      actions.addNotification({
        type: 'info',
        message: `Calling ${contact.name}...`
      })
    }
  }

  const handleQuickText = (contact) => {
    if (window.confirm(`Send a text message to ${contact.name}?`)) {
      window.location.href = `sms:${contact.phone}`
      actions.addNotification({
        type: 'info',
        message: `Opening text message to ${contact.name}...`
      })
    }
  }

  const cancelForm = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      isPrimary: false,
      isEmergency: false
    })
  }

  const primaryContacts = contacts.filter(contact => contact.isPrimary)
  const emergencyContacts = contacts.filter(contact => contact.isEmergency)
  const otherContacts = contacts.filter(contact => !contact.isPrimary && !contact.isEmergency)

  return (
    <div className="emergency-contacts">
      <div className="contacts-header">
        <h2>👥 Emergency Contacts</h2>
        <p>Keep important contacts readily available for crisis situations</p>
        <button 
          className="add-contact-btn"
          onClick={() => setIsAdding(true)}
        >
          <span className="btn-icon">➕</span>
          Add Contact
        </button>
      </div>

      {/* Quick Access Emergency Numbers */}
      <div className="quick-emergency">
        <h3>🚨 Quick Emergency Numbers</h3>
        <div className="emergency-buttons">
          <button 
            className="quick-emergency-btn"
            onClick={() => window.location.href = 'tel:911'}
          >
            <span className="emergency-icon">🚨</span>
            <span className="emergency-text">911 - Emergency</span>
          </button>
          <button 
            className="quick-emergency-btn"
            onClick={() => window.location.href = 'tel:988'}
          >
            <span className="emergency-icon">🆘</span>
            <span className="emergency-text">988 - Crisis Line</span>
          </button>
          <button 
            className="quick-emergency-btn"
            onClick={() => window.location.href = 'sms:741741'}
          >
            <span className="emergency-icon">💬</span>
            <span className="emergency-text">Text: 741741</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Contact Form */}
      {isAdding && (
        <div className="contact-form-overlay">
          <div className="contact-form-modal">
            <div className="form-header">
              <h3>{editingId ? 'Edit Contact' : 'Add Emergency Contact'}</h3>
              <button className="close-form" onClick={cancelForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Relationship</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                  >
                    <option value="">Select relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Street address (optional)"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional information (e.g., best time to call, special instructions)"
                  rows={3}
                />
              </div>

              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isPrimary}
                    onChange={(e) => setFormData({...formData, isPrimary: e.target.checked})}
                  />
                  <span className="checkbox-text">Primary Contact (first to call)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isEmergency}
                    onChange={(e) => setFormData({...formData, isEmergency: e.target.checked})}
                  />
                  <span className="checkbox-text">Emergency Contact (critical situations)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={cancelForm}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? 'Update Contact' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contacts Lists */}
      <div className="contacts-sections">
        {/* Primary Contacts */}
        {primaryContacts.length > 0 && (
          <div className="contact-section primary">
            <h3>⭐ Primary Contacts</h3>
            <div className="contacts-grid">
              {primaryContacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCall={handleQuickCall}
                  onText={handleQuickText}
                />
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {emergencyContacts.length > 0 && (
          <div className="contact-section emergency">
            <h3>🚨 Emergency Contacts</h3>
            <div className="contacts-grid">
              {emergencyContacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCall={handleQuickCall}
                  onText={handleQuickText}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Contacts */}
        {otherContacts.length > 0 && (
          <div className="contact-section other">
            <h3>📞 Other Contacts</h3>
            <div className="contacts-grid">
              {otherContacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onCall={handleQuickCall}
                  onText={handleQuickText}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No Emergency Contacts Yet</h3>
            <p>Add trusted friends, family members, or healthcare providers who can help during a crisis.</p>
            <button className="add-first-contact" onClick={() => setIsAdding(true)}>
              Add Your First Contact
            </button>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="contacts-tips">
        <h3>💡 Tips for Emergency Contacts</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">👨‍👩‍👧‍👦</div>
            <h4>Choose Wisely</h4>
            <p>Select people who are understanding, reliable, and available when you need them most.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💬</div>
            <h4>Communicate</h4>
            <p>Let your contacts know they're on your emergency list and what kind of support you might need.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <h4>Keep Updated</h4>
            <p>Regularly review and update contact information to ensure it stays current.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🌍</div>
            <h4>Multiple Options</h4>
            <p>Include both local and distant contacts, and people in different life areas (family, friends, professional).</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Card Component
function ContactCard({ contact, onEdit, onDelete, onCall, onText }) {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <div className="contact-info">
          <h4 className="contact-name">{contact.name}</h4>
          {contact.relationship && (
            <span className="contact-relationship">{contact.relationship}</span>
          )}
        </div>
        <div className="contact-badges">
          {contact.isPrimary && <span className="badge primary">Primary</span>}
          {contact.isEmergency && <span className="badge emergency">Emergency</span>}
        </div>
      </div>

      <div className="contact-details">
        <div className="contact-detail">
          <span className="detail-icon">📞</span>
          <span className="detail-text">{contact.phone}</span>
        </div>
        {contact.email && (
          <div className="contact-detail">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{contact.email}</span>
          </div>
        )}
        {contact.address && (
          <div className="contact-detail">
            <span className="detail-icon">🏠</span>
            <span className="detail-text">{contact.address}</span>
          </div>
        )}
        {contact.notes && (
          <div className="contact-notes">
            <span className="notes-icon">📝</span>
            <span className="notes-text">{contact.notes}</span>
          </div>
        )}
      </div>

      <div className="contact-actions">
        <button className="action-btn call" onClick={() => onCall(contact)}>
          📞 Call
        </button>
        <button className="action-btn text" onClick={() => onText(contact)}>
          💬 Text
        </button>
        <button className="action-btn edit" onClick={() => onEdit(contact)}>
          ✏️ Edit
        </button>
        <button className="action-btn delete" onClick={() => onDelete(contact.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default EmergencyContacts