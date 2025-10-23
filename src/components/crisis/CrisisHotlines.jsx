import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './CrisisHotlines.css'

function CrisisHotlines() {
  const { actions } = useApp()
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [searchTerm, setSearchTerm] = useState('')

  const hotlinesByCountry = {
    US: [
      {
        name: '988 Suicide & Crisis Lifeline',
        number: '988',
        description: 'Free and confidential emotional support for people in suicidal crisis or emotional distress',
        availability: '24/7',
        languages: ['English', 'Spanish'],
        website: 'https://988lifeline.org/',
        specialties: ['Suicide Prevention', 'Crisis Counseling']
      },
      {
        name: 'Crisis Text Line',
        number: '741741',
        description: 'Text HOME for crisis support via text message',
        availability: '24/7',
        languages: ['English', 'Spanish'],
        website: 'https://www.crisistextline.org/',
        specialties: ['Text Support', 'Youth Crisis'],
        isText: true
      },
      {
        name: 'SAMHSA National Helpline',
        number: '1-800-662-4357',
        description: 'Treatment referral and information service for mental health and substance abuse',
        availability: '24/7',
        languages: ['English', 'Spanish'],
        website: 'https://www.samhsa.gov/',
        specialties: ['Treatment Referral', 'Substance Abuse']
      },
      {
        name: 'National Domestic Violence Hotline',
        number: '1-800-799-7233',
        description: 'Support for victims of domestic violence and their families',
        availability: '24/7',
        languages: ['English', 'Spanish', '200+ languages via interpreter'],
        website: 'https://www.thehotline.org/',
        specialties: ['Domestic Violence', 'Safety Planning']
      },
      {
        name: 'National Sexual Assault Hotline',
        number: '1-800-656-4673',
        description: 'Support for survivors of sexual assault',
        availability: '24/7',
        languages: ['English', 'Spanish'],
        website: 'https://www.rainn.org/',
        specialties: ['Sexual Assault', 'Trauma Support']
      },
      {
        name: 'Trans Lifeline',
        number: '877-565-8860',
        description: 'Crisis support for transgender individuals',
        availability: 'Daily 10am-4am',
        languages: ['English'],
        website: 'https://translifeline.org/',
        specialties: ['Transgender Support', 'LGBTQ+ Crisis']
      }
    ],
    UK: [
      {
        name: 'Samaritans',
        number: '116 123',
        description: 'Free emotional support for anyone in emotional distress',
        availability: '24/7',
        languages: ['English', 'Welsh'],
        website: 'https://www.samaritans.org/',
        specialties: ['Emotional Support', 'Suicide Prevention']
      },
      {
        name: 'SHOUT Crisis Text Line',
        number: '85258',
        description: 'Text SHOUT for 24/7 crisis support',
        availability: '24/7',
        languages: ['English'],
        website: 'https://giveusashout.org/',
        specialties: ['Text Support', 'Crisis Intervention'],
        isText: true
      },
      {
        name: 'Mind InfoLine',
        number: '0300 123 3393',
        description: 'Information and support for mental health problems',
        availability: 'Mon-Fri 9am-6pm',
        languages: ['English'],
        website: 'https://www.mind.org.uk/',
        specialties: ['Mental Health Info', 'Local Services']
      },
      {
        name: 'National Domestic Abuse Helpline',
        number: '0808 2000 247',
        description: 'Support for victims of domestic abuse',
        availability: '24/7',
        languages: ['English', 'Multiple languages available'],
        website: 'https://www.nationaldahelpline.org.uk/',
        specialties: ['Domestic Abuse', 'Safety Planning']
      }
    ],
    Canada: [
      {
        name: 'Talk Suicide Canada',
        number: '1-833-456-4566',
        description: 'National suicide prevention service',
        availability: '24/7',
        languages: ['English', 'French'],
        website: 'https://talksuicide.ca/',
        specialties: ['Suicide Prevention', 'Crisis Support']
      },
      {
        name: 'Kids Help Phone',
        number: '1-800-668-6868',
        description: 'Support for young people up to age 29',
        availability: '24/7',
        languages: ['English', 'French'],
        website: 'https://kidshelpphone.ca/',
        specialties: ['Youth Support', 'Online Counseling']
      },
      {
        name: 'Crisis Services Canada',
        number: '1-833-456-4566',
        description: 'National network of crisis centers',
        availability: '24/7',
        languages: ['English', 'French'],
        website: 'https://www.crisisservicescanada.ca/',
        specialties: ['Crisis Intervention', 'Suicide Prevention']
      }
    ],
    Australia: [
      {
        name: 'Lifeline Australia',
        number: '13 11 14',
        description: 'Crisis support and suicide prevention',
        availability: '24/7',
        languages: ['English', 'Multiple languages'],
        website: 'https://www.lifeline.org.au/',
        specialties: ['Crisis Support', 'Suicide Prevention']
      },
      {
        name: 'Beyond Blue',
        number: '1300 22 4636',
        description: 'Support for depression, anxiety and suicide',
        availability: '24/7',
        languages: ['English'],
        website: 'https://www.beyondblue.org.au/',
        specialties: ['Depression', 'Anxiety', 'Mental Health']
      },
      {
        name: 'Kids Helpline',
        number: '1800 55 1800',
        description: 'Support for young people 5-25 years',
        availability: '24/7',
        languages: ['English'],
        website: 'https://kidshelpline.com.au/',
        specialties: ['Youth Support', 'Online Counseling']
      }
    ]
  }

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'Canada', name: 'Canada', flag: '🇨🇦' },
    { code: 'Australia', name: 'Australia', flag: '🇦🇺' }
  ]

  const handleCall = (hotline) => {
    const confirmMessage = hotline.isText 
      ? `Send a text message to ${hotline.number}?`
      : `Call ${hotline.name} at ${hotline.number}?`
    
    if (window.confirm(confirmMessage)) {
      if (hotline.isText) {
        window.location.href = `sms:${hotline.number}`
      } else {
        window.location.href = `tel:${hotline.number}`
      }
      
      actions.addNotification({
        type: 'success',
        message: `Connecting you to ${hotline.name}. Help is on the way.`
      })
    }
  }

  const filteredHotlines = hotlinesByCountry[selectedCountry]?.filter(hotline =>
    hotline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotline.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || []

  return (
    <div className="crisis-hotlines">
      <div className="hotlines-header">
        <h2>📞 Crisis Hotlines & Support Numbers</h2>
        <p>Professional help is just a phone call away. These services are free and confidential.</p>
      </div>

      {/* Country Selector */}
      <div className="country-selector">
        <h3>Select Your Country/Region:</h3>
        <div className="country-buttons">
          {countries.map(country => (
            <button
              key={country.code}
              className={`country-btn ${selectedCountry === country.code ? 'active' : ''}`}
              onClick={() => setSelectedCountry(country.code)}
            >
              <span className="country-flag">{country.flag}</span>
              <span className="country-name">{country.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Filter */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search hotlines by name, description, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Hotlines List */}
      <div className="hotlines-list">
        {filteredHotlines.length === 0 ? (
          <div className="no-results">
            <p>No hotlines found for your search. Try different keywords or select another country.</p>
          </div>
        ) : (
          filteredHotlines.map((hotline, index) => (
            <div key={index} className={`hotline-card ${hotline.isText ? 'text-service' : ''}`}>
              <div className="hotline-header">
                <div className="hotline-title">
                  <h3>{hotline.name}</h3>
                  <div className="hotline-badges">
                    {hotline.isText && <span className="badge text-badge">TEXT</span>}
                    {hotline.availability === '24/7' && <span className="badge available-badge">24/7</span>}
                  </div>
                </div>
                <div className="hotline-number">
                  <span className="number-display">{hotline.number}</span>
                </div>
              </div>

              <div className="hotline-body">
                <p className="hotline-description">{hotline.description}</p>
                
                <div className="hotline-details">
                  <div className="detail-item">
                    <span className="detail-label">🕒 Hours:</span>
                    <span className="detail-value">{hotline.availability}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🌐 Languages:</span>
                    <span className="detail-value">{hotline.languages.join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🎯 Specialties:</span>
                    <span className="detail-value">
                      {hotline.specialties.map((specialty, i) => (
                        <span key={i} className="specialty-tag">{specialty}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hotline-actions">
                <button
                  className="call-btn primary"
                  onClick={() => handleCall(hotline)}
                >
                  <span className="call-icon">{hotline.isText ? '💬' : '📞'}</span>
                  <span>{hotline.isText ? 'Send Text' : 'Call Now'}</span>
                </button>
                {hotline.website && (
                  <button
                    className="website-btn secondary"
                    onClick={() => window.open(hotline.website, '_blank')}
                  >
                    <span className="web-icon">🌐</span>
                    <span>Visit Website</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Important Notice */}
      <div className="important-notice">
        <div className="notice-header">
          <span className="notice-icon">⚠️</span>
          <h3>Important Information</h3>
        </div>
        <ul className="notice-list">
          <li>🔒 <strong>Confidential:</strong> All crisis hotlines maintain strict confidentiality</li>
          <li>🆓 <strong>Free:</strong> These services are completely free of charge</li>
          <li>👥 <strong>Trained Staff:</strong> Counselors are specially trained for crisis intervention</li>
          <li>🌍 <strong>No Judgment:</strong> You will be listened to with compassion and understanding</li>
          <li>📱 <strong>Multiple Options:</strong> Choose between calling, texting, or online chat</li>
        </ul>
      </div>

      {/* Emergency Reminder */}
      <div className="emergency-reminder">
        <h3>🚨 Life-Threatening Emergency?</h3>
        <p>If you or someone else is in immediate physical danger, call emergency services:</p>
        <div className="emergency-numbers">
          <button className="emergency-btn" onClick={() => handleCall({name: 'Emergency Services', number: '911', isText: false})}>
            🚨 Call 911 (US)
          </button>
          <button className="emergency-btn" onClick={() => handleCall({name: 'Emergency Services', number: '999', isText: false})}>
            🚨 Call 999 (UK)
          </button>
          <button className="emergency-btn" onClick={() => handleCall({name: 'Emergency Services', number: '000', isText: false})}>
            🚨 Call 000 (AU)
          </button>
        </div>
      </div>
    </div>
  )
}

export default CrisisHotlines