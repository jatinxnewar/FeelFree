import { useState, useRef, useEffect } from 'react'
import './MusicButton.css'

const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef(null)

  // Ambient/Relaxing music URLs (you can replace with your own)
  const musicTracks = [
    {
      name: 'Peaceful Nature',
      url: 'https://www.soundjay.com/misc/sounds/rain-01.wav', // Example - replace with actual ambient music
      type: 'rain'
    },
    {
      name: 'Calm Meditation',
      url: 'https://www.soundjay.com/misc/sounds/ocean-01.wav', // Example - replace with actual ambient music
      type: 'ocean'
    }
  ]

  const [currentTrack, setCurrentTrack] = useState(0)

  useEffect(() => {
    // Create audio element for background music
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = volume
    
    // Set initial track
    audioRef.current.src = musicTracks[currentTrack]?.url || ''

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // For browsers that require user interaction
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('Audio playback failed:', error)
      // Fallback: just toggle visual state
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    const newIndex = (currentTrack + 1) % musicTracks.length
    setCurrentTrack(newIndex)
    
    if (audioRef.current) {
      audioRef.current.src = musicTracks[newIndex]?.url || ''
      if (isPlaying) {
        audioRef.current.play().catch(console.log)
      }
    }
  }

  return (
    <div className="music-widget">
      <button
        className={`music-button ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Music Controls Panel - Hidden by default, shown on hover */}
      <div className="music-controls">
        <div className="music-info">
          <span className="track-name">
            {musicTracks[currentTrack]?.name || 'Ambient Music'}
          </span>
        </div>
        
        <div className="volume-control">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.22-1.21.22-1.21.85z"/>
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            aria-label="Volume"
          />
        </div>

        <button
          className="track-button"
          onClick={nextTrack}
          title="Next track"
          aria-label="Next track"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MusicButton
