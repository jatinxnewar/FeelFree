import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

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
