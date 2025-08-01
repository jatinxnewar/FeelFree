import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Hero from '../components/common/Hero'
import FeatureCard from '../components/common/FeatureCard'
import QuickStats from '../components/common/QuickStats'
import './Home.css'

function Home() {
  const { state } = useApp()

  const features = [
    {
      icon: '💬',
      title: 'Anonymous Discussions',
      description: 'Share your thoughts and experiences in a safe, judgment-free environment.',
      link: '/discussions',
      color: '#667eea'
    },
    {
      icon: '📊',
      title: 'Mood Tracking',
      description: 'Monitor your emotional well-being with our intuitive mood tracking tools.',
      link: '/mood-tracker',
      color: '#f093fb'
    },
    {
      icon: '📚',
      title: 'Resource Library',
      description: 'Access curated mental health resources, articles, and self-help tools.',
      link: '/resources',
      color: '#4facfe'
    },
    {
      icon: '🆘',
      title: 'Crisis Support',
      description: 'Quick access to mental health hotlines and emergency resources.',
      link: '/crisis-support',
      color: '#ff6b6b'
    },
    {
      icon: '👨‍⚕️',
      title: 'Find Professionals',
      description: 'Connect with licensed mental health professionals in your area.',
      link: '/professionals',
      color: '#4ecdc4'
    },
    {
      icon: '🤝',
      title: 'Supportive Community',
      description: 'Join a community of people who understand your mental health journey.',
      link: '/discussions',
      color: '#45b7d1'
    }
  ]

  const testimonials = [
    {
      id: 1,
      text: "FeelFree gave me the courage to talk about my anxiety. The anonymous discussions helped me realize I'm not alone.",
      author: "Sarah M.",
      mood: "grateful"
    },
    {
      id: 2,
      text: "The mood tracker has been a game-changer for understanding my emotional patterns. Highly recommend!",
      author: "Alex R.",
      mood: "hopeful"
    },
    {
      id: 3,
      text: "Found amazing resources and connected with a therapist through the platform. Thank you FeelFree!",
      author: "Jordan L.",
      mood: "happy"
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Welcome Message */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome back, {state.user.username}! 👋</h2>
          <p>Your mental health journey matters. Take a moment to check in with yourself today.</p>
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/mood-tracker" className="quick-action mood">
              <span className="action-icon">📝</span>
              <span className="action-text">Log Your Mood</span>
            </Link>
            <Link to="/discussions" className="quick-action discuss">
              <span className="action-icon">💭</span>
              <span className="action-text">Share Thoughts</span>
            </Link>
            <Link to="/crisis-support" className="quick-action crisis">
              <span className="action-icon">🆘</span>
              <span className="action-text">Need Help?</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <QuickStats />

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <h2>How FeelFree Supports Your Mental Health</h2>
          <p>Discover tools and resources designed to help you on your mental wellness journey.</p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Mental Health Tips */}
      <section className="tips-section">
        <div className="section-content">
          <h2>Daily Mental Health Tips</h2>
          <div className="tips-carousel">
            <div className="tip-card">
              <div className="tip-icon">🧘‍♀️</div>
              <h3>Practice Mindfulness</h3>
              <p>Take 5 minutes today to focus on your breathing and be present in the moment.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🌅</div>
              <h3>Morning Routine</h3>
              <p>Start your day with intention. Set small, achievable goals for the day ahead.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚶‍♂️</div>
              <h3>Move Your Body</h3>
              <p>Physical activity can boost mood and reduce stress. Even a short walk helps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2>Stories from Our Community</h2>
          <p>Real experiences from people who found support through FeelFree.</p>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-footer">
                  <span className="testimonial-author">— {testimonial.author}</span>
                  <span className="testimonial-mood">{testimonial.mood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of people who are taking control of their mental health.</p>
          <div className="cta-buttons">
            <Link to="/discussions" className="cta-button primary">
              Join Discussions
            </Link>
            <Link to="/mood-tracker" className="cta-button secondary">
              Track Your Mood
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
