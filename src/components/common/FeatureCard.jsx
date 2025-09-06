import { Link } from 'react-router-dom'
import './FeatureCard.css'

function FeatureCard({ feature }) {
  const { icon, title, description, link, color = "#4f46e5" } = feature

  return (
    <div 
      className="feature-card"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="feature-icon" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <Link to={link} className="feature-link" style={{ color }}>
          Explore 
          <svg viewBox="0 0 20 20" fill="currentColor" className="arrow-icon">
            <path 
              fillRule="evenodd" 
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 
              010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 
              1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default FeatureCard
