import { Link } from 'react-router-dom'
import './FeatureCard.css'

function FeatureCard({ feature }) {
  const { icon, title, description, link, color } = feature

  return (
    <div className="feature-card" style={{ '--accent-color': color }}>
      <div className="feature-icon">
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <Link to={link} className="feature-link">
          Explore <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

export default FeatureCard
