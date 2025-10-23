import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './SafetyPlan.css'

function SafetyPlan() {
  const { actions } = useApp()
  const [safetyPlan, setSafetyPlan] = useState({
    warningSignals: [],
    copingStrategies: [],
    supportPeople: [],
    professionalContacts: [],
    safeEnvironment: [],
    emergencyContacts: [],
    personalMotivation: '',
    lastUpdated: null
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isEditing, setIsEditing] = useState(false)

  const steps = [
    {
      id: 1,
      title: 'Warning Signals',
      icon: '⚠️',
      description: 'Identify thoughts, feelings, behaviors, or situations that might indicate a crisis is developing'
    },
    {
      id: 2,
      title: 'Coping Strategies',
      icon: '🧘‍♀️',
      description: 'List activities you can do on your own to help manage difficult feelings'
    },
    {
      id: 3,
      title: 'Support People',
      icon: '👥',
      description: 'People who can provide distraction and emotional support'
    },
    {
      id: 4,
      title: 'Professional Contacts',
      icon: '🏥',
      description: 'Mental health professionals and agencies that can help'
    },
    {
      id: 5,
      title: 'Safe Environment',
      icon: '🛡️',
      description: 'Making your environment safer by removing or limiting access to means of harm'
    },
    {
      id: 6,
      title: 'Emergency Contacts',
      icon: '🚨',
      description: 'Emergency contacts and crisis services for immediate help'
    },
    {
      id: 7,
      title: 'Personal Motivation',
      icon: '💪',
      description: 'Reasons for living and personal motivation to stay safe'
    }
  ]

  // Load safety plan from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('safetyPlan')
    if (savedPlan) {
      setSafetyPlan(JSON.parse(savedPlan))
    }
  }, [])

  // Save safety plan to localStorage
  useEffect(() => {
    localStorage.setItem('safetyPlan', JSON.stringify(safetyPlan))
  }, [safetyPlan])

  const addItem = (section, item) => {
    if (item.trim()) {
      setSafetyPlan(prev => ({
        ...prev,
        [section]: [...prev[section], item.trim()],
        lastUpdated: new Date().toISOString()
      }))
      return true
    }
    return false
  }

  const removeItem = (section, index) => {
    setSafetyPlan(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
      lastUpdated: new Date().toISOString()
    }))
  }

  const updatePersonalMotivation = (text) => {
    setSafetyPlan(prev => ({
      ...prev,
      personalMotivation: text,
      lastUpdated: new Date().toISOString()
    }))
  }

  const exportPlan = () => {
    const planText = `
PERSONAL SAFETY PLAN
Created: ${new Date().toLocaleDateString()}
Last Updated: ${safetyPlan.lastUpdated ? new Date(safetyPlan.lastUpdated).toLocaleDateString() : 'Never'}

1. WARNING SIGNALS
${safetyPlan.warningSignals.map(signal => `• ${signal}`).join('\n') || '• No warning signals listed'}

2. COPING STRATEGIES
${safetyPlan.copingStrategies.map(strategy => `• ${strategy}`).join('\n') || '• No coping strategies listed'}

3. SUPPORT PEOPLE
${safetyPlan.supportPeople.map(person => `• ${person}`).join('\n') || '• No support people listed'}

4. PROFESSIONAL CONTACTS
${safetyPlan.professionalContacts.map(contact => `• ${contact}`).join('\n') || '• No professional contacts listed'}

5. SAFE ENVIRONMENT
${safetyPlan.safeEnvironment.map(action => `• ${action}`).join('\n') || '• No safety actions listed'}

6. EMERGENCY CONTACTS
${safetyPlan.emergencyContacts.map(contact => `• ${contact}`).join('\n') || '• No emergency contacts listed'}

7. PERSONAL MOTIVATION
${safetyPlan.personalMotivation || 'No personal motivation written'}

---
If you are in immediate danger, call emergency services (911) or go to your nearest emergency room.
`

    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'safety-plan.txt'
    a.click()
    URL.revokeObjectURL(url)

    actions.addNotification({
      type: 'success',
      message: 'Safety plan exported successfully!'
    })
  }

  const printPlan = () => {
    window.print()
    actions.addNotification({
      type: 'info',
      message: 'Opening print dialog...'
    })
  }

  return (
    <div className="safety-plan">
      <div className="plan-header">
        <h2>🛡️ Personal Safety Plan</h2>
        <p>A safety plan is a written plan that helps you stay safe when experiencing thoughts of suicide or self-harm.</p>
        <div className="plan-actions">
          <button className="action-btn export" onClick={exportPlan}>
            📄 Export Plan
          </button>
          <button className="action-btn print" onClick={printPlan}>
            🖨️ Print Plan
          </button>
          <button 
            className={`action-btn edit ${isEditing ? 'active' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            ✏️ {isEditing ? 'Finish Editing' : 'Edit Plan'}
          </button>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        {steps.map(step => (
          <button
            key={step.id}
            className={`step-btn ${currentStep === step.id ? 'active' : ''} ${
              getSectionItemCount(step.id) > 0 ? 'completed' : ''
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-title">{step.title}</span>
            <span className="step-count">({getSectionItemCount(step.id)})</span>
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        {currentStep === 1 && (
          <StepSection
            title="⚠️ Warning Signals"
            description="These are thoughts, feelings, behaviors, or situations that might indicate a crisis is developing."
            items={safetyPlan.warningSignals}
            onAdd={(item) => addItem('warningSignals', item)}
            onRemove={(index) => removeItem('warningSignals', index)}
            isEditing={isEditing}
            placeholder="e.g., Feeling hopeless, Isolation, Increased anxiety..."
            suggestions={[
              'Feeling hopeless or trapped',
              'Isolating from others',
              'Increased anxiety or panic',
              'Sleep problems',
              'Substance use',
              'Overwhelming emotions',
              'Thoughts of self-harm',
              'Loss of interest in activities'
            ]}
          />
        )}

        {currentStep === 2 && (
          <StepSection
            title="🧘‍♀️ Coping Strategies"
            description="Activities you can do on your own to help manage difficult feelings without contacting others."
            items={safetyPlan.copingStrategies}
            onAdd={(item) => addItem('copingStrategies', item)}
            onRemove={(index) => removeItem('copingStrategies', index)}
            isEditing={isEditing}
            placeholder="e.g., Deep breathing, Listen to music, Take a walk..."
            suggestions={[
              'Deep breathing exercises',
              'Listen to calming music',
              'Take a warm shower or bath',
              'Go for a walk',
              'Practice mindfulness',
              'Write in a journal',
              'Watch a favorite movie',
              'Exercise or stretch',
              'Call a pet or comfort object',
              'Use grounding techniques'
            ]}
          />
        )}

        {currentStep === 3 && (
          <StepSection
            title="👥 Support People"
            description="People who can provide distraction and emotional support (include name and phone number)."
            items={safetyPlan.supportPeople}
            onAdd={(item) => addItem('supportPeople', item)}
            onRemove={(index) => removeItem('supportPeople', index)}
            isEditing={isEditing}
            placeholder="e.g., Mom - (555) 123-4567, Best friend Sarah - (555) 987-6543..."
            suggestions={[
              'Family members',
              'Close friends',
              'Partner or spouse',
              'Trusted coworkers',
              'Neighbors',
              'Religious/spiritual leaders',
              'Support group members',
              'Mentors or coaches'
            ]}
          />
        )}

        {currentStep === 4 && (
          <StepSection
            title="🏥 Professional Contacts"
            description="Mental health professionals, agencies, and services that can help during a crisis."
            items={safetyPlan.professionalContacts}
            onAdd={(item) => addItem('professionalContacts', item)}
            onRemove={(index) => removeItem('professionalContacts', index)}
            isEditing={isEditing}
            placeholder="e.g., Dr. Smith (therapist) - (555) 234-5678, Local crisis center..."
            suggestions={[
              'Therapist or counselor',
              'Psychiatrist',
              'Primary care doctor',
              'Local crisis center',
              'Hospital emergency room',
              'Crisis hotline: 988',
              'Crisis text line: 741741',
              'Mobile crisis team',
              'Community mental health center'
            ]}
          />
        )}

        {currentStep === 5 && (
          <StepSection
            title="🛡️ Safe Environment"
            description="Ways to make your environment safer by removing or limiting access to means of harm."
            items={safetyPlan.safeEnvironment}
            onAdd={(item) => addItem('safeEnvironment', item)}
            onRemove={(index) => removeItem('safeEnvironment', index)}
            isEditing={isEditing}
            placeholder="e.g., Remove sharp objects, Give medications to trusted person..."
            suggestions={[
              'Remove or secure sharp objects',
              'Give medications to trusted person',
              'Remove firearms from home',
              'Avoid alcohol and drugs',
              'Stay away from triggering locations',
              'Remove harmful items from easy access',
              'Ask someone to stay with you',
              'Go to a safe location'
            ]}
          />
        )}

        {currentStep === 6 && (
          <StepSection
            title="🚨 Emergency Contacts"
            description="Emergency contacts and crisis services for immediate help when you can't keep yourself safe."
            items={safetyPlan.emergencyContacts}
            onAdd={(item) => addItem('emergencyContacts', item)}
            onRemove={(index) => removeItem('emergencyContacts', index)}
            isEditing={isEditing}
            placeholder="e.g., 911 - Emergency Services, 988 - Crisis Lifeline..."
            suggestions={[
              '911 - Emergency Services',
              '988 - Suicide & Crisis Lifeline',
              'Crisis Text Line - 741741',
              'Local emergency room',
              'Mobile crisis team',
              'Police department non-emergency',
              'Trusted friend/family for emergency',
              'Crisis intervention team'
            ]}
          />
        )}

        {currentStep === 7 && (
          <PersonalMotivationSection
            motivation={safetyPlan.personalMotivation}
            onUpdate={updatePersonalMotivation}
            isEditing={isEditing}
          />
        )}
      </div>

      {/* Navigation Controls */}
      <div className="navigation-controls">
        <button 
          className="nav-btn prev"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          ← Previous
        </button>
        <span className="step-indicator">
          Step {currentStep} of {steps.length}
        </span>
        <button 
          className="nav-btn next"
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
        >
          Next →
        </button>
      </div>

      {/* Plan Summary */}
      {!isEditing && (
        <div className="plan-summary">
          <h3>📋 Plan Summary</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-number">{safetyPlan.warningSignals.length}</span>
              <span className="stat-label">Warning Signals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{safetyPlan.copingStrategies.length}</span>
              <span className="stat-label">Coping Strategies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{safetyPlan.supportPeople.length}</span>
              <span className="stat-label">Support People</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{safetyPlan.professionalContacts.length}</span>
              <span className="stat-label">Professional Contacts</span>
            </div>
          </div>
          {safetyPlan.lastUpdated && (
            <p className="last-updated">
              Last updated: {new Date(safetyPlan.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Important Reminders */}
      <div className="important-reminders">
        <h3>💡 Important Reminders</h3>
        <ul className="reminder-list">
          <li>🔄 Review and update your safety plan regularly</li>
          <li>📱 Keep important phone numbers easily accessible</li>
          <li>👥 Share your plan with trusted people in your support network</li>
          <li>🚨 If you're in immediate danger, call emergency services (911) right away</li>
          <li>💙 Remember: seeking help is a sign of strength, not weakness</li>
        </ul>
      </div>
    </div>
  )

  function getSectionItemCount(stepId) {
    const sectionMap = {
      1: 'warningSignals',
      2: 'copingStrategies', 
      3: 'supportPeople',
      4: 'professionalContacts',
      5: 'safeEnvironment',
      6: 'emergencyContacts',
      7: 'personalMotivation'
    }
    
    const section = sectionMap[stepId]
    if (section === 'personalMotivation') {
      return safetyPlan.personalMotivation ? 1 : 0
    }
    return safetyPlan[section]?.length || 0
  }
}

// Step Section Component
function StepSection({ title, description, items, onAdd, onRemove, isEditing, placeholder, suggestions }) {
  const [newItem, setNewItem] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAdd = () => {
    if (onAdd(newItem)) {
      setNewItem('')
    }
  }

  const handleSuggestionClick = (suggestion) => {
    if (onAdd(suggestion)) {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="step-section">
      <div className="section-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="section-content">
        <div className="items-list">
          {items.length === 0 ? (
            <div className="empty-list">
              <p>No items added yet. {isEditing ? 'Add your first item below.' : 'Click "Edit Plan" to get started.'}</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="list-item">
                <span className="item-text">{item}</span>
                {isEditing && (
                  <button 
                    className="remove-btn"
                    onClick={() => onRemove(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {isEditing && (
          <div className="add-item-form">
            <div className="input-group">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={placeholder}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              />
              <button className="add-btn" onClick={handleAdd}>
                Add
              </button>
            </div>

            <div className="suggestions-section">
              <button 
                className="suggestions-toggle"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                💡 {showSuggestions ? 'Hide' : 'Show'} Suggestions
              </button>
              
              {showSuggestions && (
                <div className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Personal Motivation Section Component
function PersonalMotivationSection({ motivation, onUpdate, isEditing }) {
  const [text, setText] = useState(motivation || '')

  const handleSave = () => {
    onUpdate(text)
  }

  const motivationPrompts = [
    "My children/family members who depend on me",
    "My pets who need my care",
    "Goals I want to achieve",
    "Places I want to visit",
    "People I want to help",
    "Dreams I want to fulfill",
    "Experiences I haven't had yet",
    "The impact I want to make on the world"
  ]

  return (
    <div className="motivation-section">
      <div className="section-header">
        <h3>💪 Personal Motivation</h3>
        <p>Write about your reasons for living, things that bring you joy, and what motivates you to stay safe.</p>
      </div>

      <div className="motivation-content">
        {isEditing ? (
          <div className="motivation-editor">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write about what motivates you to keep going, what brings you joy, your hopes and dreams, people you care about..."
              rows={8}
              className="motivation-textarea"
            />
            <button className="save-motivation-btn" onClick={handleSave}>
              Save Motivation
            </button>

            <div className="motivation-prompts">
              <h4>💡 Ideas to get you started:</h4>
              <div className="prompts-list">
                {motivationPrompts.map((prompt, index) => (
                  <div key={index} className="prompt-item">
                    • {prompt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="motivation-display">
            {motivation ? (
              <div className="motivation-text">
                {motivation.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="empty-motivation">
                <p>No personal motivation written yet. Click "Edit Plan" to add your reasons for living and staying safe.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SafetyPlan