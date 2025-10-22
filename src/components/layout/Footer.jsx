import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './Footer.css'

function Footer() {
  const { actions } = useApp()
  const [quickMood, setQuickMood] = useState('')
  const [showQuickMood, setShowQuickMood] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const currentYear = new Date().getFullYear()

  const quickMoodOptions = [
    { value: 'great', emoji: '😄', label: 'Great' },
    { value: 'good', emoji: '😊', label: 'Good' },
    { value: 'okay', emoji: '😐', label: 'Okay' },
    { value: 'sad', emoji: '😔', label: 'Sad' },
    { value: 'stressed', emoji: '😰', label: 'Stressed' }
  ]

  const handleQuickMoodSubmit = () => {
    if (quickMood) {
      const moodEntry = {
        id: Date.now(),
        mood: quickMood,
        date: new Date().toISOString(),
        source: 'quick-checkin',
        timestamp: new Date().toLocaleTimeString()
      }
      
      actions.addMoodEntry(moodEntry)
      actions.addNotification({
        type: 'success',
        message: '✅ Quick mood check-in saved! Thank you for sharing.'
      })
      
      setSubmitted(true)
      setTimeout(() => {
        setShowQuickMood(false)
        setSubmitted(false)
        setQuickMood('')
      }, 2000)
    }
  }

  const footerLinks = {
    support: [
      { label: 'Crisis Hotlines', path: '/crisis-support' },
      { label: 'Mental Health Resources', path: '/resources' },
      { label: 'Find a Professional', path: '/professionals' },
      { label: 'Community Guidelines', path: '/guidelines' },
    ],
    platform: [
      { label: 'About FeelFree', path: '/about' },
      { label: 'How It Works', path: '/how-it-works' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
    community: [
      { label: 'Discussions', path: '/discussions' },
      { label: 'Mood Tracker', path: '/mood-tracker' },
      { label: 'Success Stories', path: '/stories' },
      { label: 'Blog', path: '/blog' },
    ],
  }

  const emergencyNumbers = [
    { country: 'US', number: '988', label: 'Suicide & Crisis Lifeline' },
    { country: 'UK', number: '116 123', label: 'Samaritans' },
    { country: 'Emergency', number: '911/999/112', label: 'Local Emergency Services' },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Quick Mood Check-in Widget */}
        <div className="quick-mood-widget">
          {!showQuickMood ? (
            <button 
              className="quick-mood-trigger"
              onClick={() => setShowQuickMood(true)}
              aria-label="Quick mood check-in"
            >
              <span className="mood-icon">💭</span>
              <span className="mood-text">How are you feeling?</span>
              <span className="mood-arrow">→</span>
            </button>
          ) : (
            <div className="quick-mood-form">
              {!submitted ? (
                <>
                  <div className="quick-mood-header">
                    <span>Quick check-in: How do you feel right now?</span>
                    <button 
                      className="close-quick-mood"
                      onClick={() => setShowQuickMood(false)}
                      aria-label="Close quick mood check-in"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="quick-mood-options">
                    {quickMoodOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`quick-mood-btn ${quickMood === option.value ? 'selected' : ''}`}
                        onClick={() => setQuickMood(option.value)}
                      >
                        <span className="mood-emoji">{option.emoji}</span>
                        <span className="mood-label">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    className="submit-quick-mood"
                    onClick={handleQuickMoodSubmit}
                    disabled={!quickMood}
                  >
                    Save Check-in
                  </button>
                </>
              ) : (
                <div className="quick-mood-success">
                  <span className="success-icon">✅</span>
                  <span>Thank you for checking in!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Emergency Banner */}
        <div className="emergency-banner">
          <div className="emergency-icon">🆘</div>
          <div className="emergency-text">
            <h3>In Crisis? Get Help Now</h3>
            <div className="emergency-numbers">
              {emergencyNumbers.map((emergency, index) => (
                <div key={index} className="emergency-number">
                  <strong>{emergency.number}</strong> - {emergency.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-section">
            <h4>Support & Resources</h4>
            <ul>
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Community</h4>
            <ul>
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#" aria-label="Follow us on Twitter" className="social-link">
                🐦
              </a>
              <a href="#" aria-label="Like us on Facebook" className="social-link">
                📘
              </a>
              <a href="#" aria-label="Follow us on Instagram" className="social-link">
                📷
              </a>
              <a href="#" aria-label="Subscribe to our YouTube" className="social-link">
                📺
              </a>
            </div>
            <div className="newsletter">
              <h5>Stay Updated</h5>
              <p>Get mental health tips and updates</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-icon">🌱</span>
            <span className="brand-text">FeelFree</span>
          </div>
          <div className="footer-info">
            <p>
              © {currentYear} FeelFree. Made with ❤️ for mental health awareness.
              <br />
              <small>
                FeelFree is not a substitute for professional mental health care. 
                Always seek the advice of qualified health providers.
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
