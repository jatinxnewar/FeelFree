import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find peace and support for your mental wellness journey
            </h1>
            <p className="hero-description">
              FeelFree is a safe space where you can track your mood, connect with others, 
              and access resources to support your mental health.
            </p>
            <div className="hero-actions">
              <Link to="/mood-tracker" className="btn btn-primary btn-lg">
                Start Tracking
              </Link>
              <Link to="/discussions" className="btn btn-outline btn-lg">
                Join Community
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-illustration">
              <svg viewBox="0 0 400 300" className="illustration-svg">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--accent-500)" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="150" r="80" fill="url(#gradient1)" opacity="0.1" />
                <circle cx="200" cy="150" r="60" fill="url(#gradient1)" opacity="0.2" />
                <circle cx="200" cy="150" r="40" fill="url(#gradient1)" opacity="0.3" />
                <circle cx="200" cy="150" r="20" fill="var(--accent-500)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
