import { useEffect, useState, useCallback } from 'react'
import ultrashipLogo from '../../assets/ultraship-logo.svg'
import './LogoTransitionOverlay.css'

const STORAGE_KEY = 'ultraship_play_landing_animation'

export function queueLogoTransition() {
  sessionStorage.setItem(STORAGE_KEY, 'true')
}

/**
 * Speedy broom WHOOSH - fast swooshing sound synced with logo animation
 * Two quick whooshes: one for fly-in, one for fly-out
 */
function playWhoosh() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = ctx.currentTime

    // Helper to create one swoosh
    const createSwoosh = (startTime: number, reverse = false) => {
      // Short burst of filtered noise
      const duration = 0.25
      const bufferSize = Math.floor(ctx.sampleRate * duration)
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      
      // Shaped noise - not pure random, more "whooshy"
      let lastVal = 0
      for (let i = 0; i < bufferSize; i++) {
        const noise = Math.random() * 2 - 1
        lastVal = lastVal * 0.7 + noise * 0.3  // Smoothed noise
        data[i] = lastVal
      }

      const noise = ctx.createBufferSource()
      noise.buffer = noiseBuffer

      // Tight bandpass for focused swoosh
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.Q.value = 2
      
      // Fast frequency sweep for speed effect
      if (reverse) {
        filter.frequency.setValueAtTime(400, startTime)
        filter.frequency.exponentialRampToValueAtTime(2500, startTime + duration)
      } else {
        filter.frequency.setValueAtTime(2500, startTime)
        filter.frequency.exponentialRampToValueAtTime(400, startTime + duration)
      }

      // Punchy envelope
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.5, startTime + 0.03)  // Fast attack
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration)  // Quick decay

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start(startTime)
      noise.stop(startTime + duration)
    }

    // First swoosh - logo flies IN (0% to 25% = 0 to 0.375s)
    createSwoosh(now, true)
    
    // Second swoosh - logo flies OUT (55% to 100% = 0.825s to 1.5s)
    createSwoosh(now + 0.85, false)

    // Cleanup
    setTimeout(() => ctx.close(), 2000)
  } catch {
    // Ignore audio errors
  }
}

export function LogoTransitionOverlay() {
  const [active, setActive] = useState(false)

  const handleAnimationStart = useCallback(() => {
    playWhoosh()
  }, [])

  useEffect(() => {
    const shouldPlay = sessionStorage.getItem(STORAGE_KEY) === 'true'
    if (!shouldPlay) return
    sessionStorage.removeItem(STORAGE_KEY)
    setActive(true)
  }, [])

  if (!active) return null

  return (
    <div className="logo-transition-overlay">
      <img
        src={ultrashipLogo}
        alt="Ultraship TMS"
        className="logo-transition-image"
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={() => setActive(false)}
      />
    </div>
  )
}


