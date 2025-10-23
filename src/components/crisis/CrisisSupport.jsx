import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import CrisisHotlines from './CrisisHotlines'
import EmergencyContacts from './EmergencyContacts'
import SafetyPlan from './SafetyPlan'
import './CrisisSupport.css'

function CrisisSupport() {
  const { actions } = useApp()
  const [currentSection, setCurrentSection] = useState('immediate')
  const [crisisLevel, setCrisisLevel] = useState('')
  const [showAssessment, setShowAssessment] = useState(false)

  const emergencyNumbers = [
    { country: 'US', number: '988', label: 'Suicide & Crisis Lifeline', available: '24/7' },
    { country: 'US', number: '911', label: 'Emergency Services', available: '24/7' },
    { country: 'UK', number: '116 123', label: 'Samaritans', available: '24/7' },
    { country: 'Canada', number: '1-833-456-4566', label: 'Talk Suicide Canada', available: '24/7' },
    { country: 'Australia', number: '13 11 14', label: 'Lifeline Australia', available: '24/7' }
  ]

  const immediateHelp = [
    {
      title: 'Call Emergency Services',
      action: 'tel:911',
      icon: '🚨',
      description: 'If you are in immediate danger',
      urgent: true
    },
    {
      title: 'Crisis Text Line',
      action: 'sms:741741',
      icon: '💬',
      description: 'Text HOME to 741741',
      urgent: true
    },
    {
      title: 'Online Crisis Chat',
      action: 'https://suicidepreventionlifeline.org/chat/',
      icon: '💻',
      description: 'Chat with a crisis counselor',
      urgent: false
    },
    {
      title: 'Find Nearest Hospital',
      action: 'maps',
      icon: '🏥',
      description: 'Emergency room locations',
      urgent: false
    }
  ]

  const copingStrategies = [
    {
      title: '5-4-3-2-1 Grounding',
      description: '5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste',
      icon: '🧠'
    },
    {
      title: 'Deep Breathing',
      description: 'Breathe in for 4, hold for 4, out for 6. Repeat 5 times.',
      icon: '🫁'
    },
    {
      title: 'Cold Water',
      description: 'Splash cold water on face or hold ice cubes',
      icon: '❄️'
    },
    {
      title: 'Call a Friend',
      description: 'Reach out to someone you trust',
      icon: '📞'
    },
    {
      title: 'Safe Space',
      description: 'Go to a place where you feel secure',
      icon: '🏠'
    },
    {
      title: 'Physical Activity',
      description: 'Walk, run, or do jumping jacks',
      icon: '🏃‍♀️'
    }
  ]

  const handleEmergencyCall = (number) => {
    if (window.confirm(`Do you want to call ${number}? This will dial the emergency number.`)) {
      window.location.href = `tel:${number}`
      
      actions.addNotification({
        type: 'info',
        message: 'Remember: You are not alone. Help is available.'
      })
    }
  }

  const handleCrisisAssessment = (level) => {
    setCrisisLevel(level)
    setShowAssessment(false)
    
    if (level === 'high') {
      actions.addNotification({
        type: 'error',
        message: 'Please reach out for immediate help. Your safety is the priority.'
      })
      setCurrentSection('immediate')
    }
  }

  useEffect(() => {
    // Auto-show assessment on component mount
    const timer = setTimeout(() => {
      setShowAssessment(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="crisis-support">
      {/* Emergency Banner */}
      <div className="emergency-banner">
        <div className="emergency-content">
          <h1>🆘 Crisis Support & Emergency Resources</h1>
          <p>If you're in immediate danger, don't wait. Get help now.</p>
          <div className="emergency-buttons">
            {emergencyNumbers.slice(0, 2).map((emergency, index) => (
              <button
                key={index}
                className="emergency-call-btn"
                onClick={() => handleEmergencyCall(emergency.number)}
              >
                <span className="call-icon">📞</span>
                <span className="call-number">{emergency.number}</span>
                <span className="call-label">{emergency.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Crisis Assessment Modal */}
      {showAssessment && (
        <div className="assessment-overlay">
          <div className="assessment-modal">
            <div className="assessment-header">
              <h2>Quick Safety Check</h2>
              <p>Help us understand how you're feeling right now</p>
            </div>
            <div className="assessment-options">
              <button
                className="assessment-btn high-risk"
                onClick={() => handleCrisisAssessment('high')}
              >
                <span className="risk-icon">🚨</span>
                <span className="risk-text">I'm in immediate danger or having thoughts of hurting myself</span>
              </button>
              <button
                className="assessment-btn medium-risk"
                onClick={() => handleCrisisAssessment('medium')}
              >
                <span className="risk-icon">⚠️</span>
                <span className="risk-text">I'm struggling but not in immediate danger</span>
              </button>
              <button
                className="assessment-btn low-risk"
                onClick={() => handleCrisisAssessment('low')}
              >
                <span className="risk-icon">💙</span>
                <span className="risk-text">I'm looking for resources for myself or someone else</span>
              </button>
            </div>
            <button 
              className="skip-assessment"
              onClick={() => setShowAssessment(false)}
            >
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="crisis-nav">
        <button
          className={`nav-btn ${currentSection === 'immediate' ? 'active' : ''}`}
          onClick={() => setCurrentSection('immediate')}
        >
          🚨 Immediate Help
        </button>
        <button
          className={`nav-btn ${currentSection === 'hotlines' ? 'active' : ''}`}
          onClick={() => setCurrentSection('hotlines')}
        >
          📞 Crisis Hotlines
        </button>
        <button
          className={`nav-btn ${currentSection === 'safety' ? 'active' : ''}`}
          onClick={() => setCurrentSection('safety')}
        >
          🛡️ Safety Planning
        </button>
        <button
          className={`nav-btn ${currentSection === 'contacts' ? 'active' : ''}`}
          onClick={() => setCurrentSection('contacts')}
        >
          👥 Emergency Contacts
        </button>
      </div>

      {/* Content Sections */}
      <div className="crisis-content">
        {currentSection === 'immediate' && (
          <div className="immediate-help">
            <div className="help-header">
              <h2>🚨 Get Help Right Now</h2>
              <p>Choose the option that feels right for you</p>
            </div>

            <div className="help-options">
              {immediateHelp.map((help, index) => (
                <div key={index} className={`help-card ${help.urgent ? 'urgent' : ''}`}>
                  <div className="help-icon">{help.icon}</div>
                  <h3>{help.title}</h3>
                  <p>{help.description}</p>
                  <button 
                    className="help-action-btn"
                    onClick={() => {
                      if (help.action.startsWith('tel:') || help.action.startsWith('sms:')) {
                        window.location.href = help.action
                      } else if (help.action.startsWith('http')) {
                        window.open(help.action, '_blank')
                      } else if (help.action === 'maps') {
                        window.open('https://www.google.com/maps/search/emergency+room+near+me', '_blank')
                      }
                    }}
                  >
                    {help.action.startsWith('tel:') ? 'Call Now' : 
                     help.action.startsWith('sms:') ? 'Text Now' : 
                     help.action === 'maps' ? 'Find Location' : 'Get Help'}
                  </button>
                </div>
              ))}
            </div>

            <div className="coping-section">
              <h3>🧘‍♀️ Quick Coping Strategies</h3>
              <p>Try these techniques while waiting for help or to manage intense feelings:</p>
              <div className="coping-grid">
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="coping-card">
                    <div className="coping-icon">{strategy.icon}</div>
                    <h4>{strategy.title}</h4>
                    <p>{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentSection === 'hotlines' && <CrisisHotlines />}
        {currentSection === 'safety' && <SafetyPlan />}
        {currentSection === 'contacts' && <EmergencyContacts />}
      </div>

      {/* Footer Message */}
      <div className="crisis-footer">
        <div className="footer-content">
          <h3>💙 Remember</h3>
          <p>
            You are not alone. These feelings will pass. Reaching out for help is a sign of strength, 
            not weakness. There are people who want to help you through this difficult time.
          </p>
          <div className="support-message">
            <span className="heart">❤️</span>
            <span>Your life has value and meaning</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrisisSupport