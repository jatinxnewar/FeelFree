import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find peace and support for your mental wellness
            </h1>
            <p className="hero-description">
              A safe space to track your mood, connect with others, and access resources for your mental health journey.
            </p>
            <div className="hero-actions">
              <Link to="/mood-tracker" className="btn btn-primary btn-lg">
                Start Your Journey
              </Link>
              <Link to="/discussions" className="btn btn-secondary btn-lg">
                Join Community
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="mood-preview">
                <div className="mood-icon">😊</div>
                <span className="mood-text">Today I'm feeling good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
