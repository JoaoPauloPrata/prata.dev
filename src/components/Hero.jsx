import { useRef, useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import buraconegro from '../assets/buraconegro.png'

const WORMHOLE_VIDEO_URL = 'https://pub-ab3bdd2e745d4c9ba331761d40922a00.r2.dev/wormhole.mp4'

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const emRef = useRef(null)
  const { t } = useLang()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [emWidth, setEmWidth] = useState('auto')

  // Calculate width of longest phrase to prevent text jumping
  useEffect(() => {
    if (!t.hero.h1Phrases || !emRef.current) return

    const longestPhrase = t.hero.h1Phrases.reduce((max, p) =>
      p.length > max.length ? p : max
    )

    const temp = emRef.current.textContent
    emRef.current.textContent = longestPhrase
    const width = emRef.current.offsetWidth
    setEmWidth(width)
    emRef.current.textContent = temp || ''
  }, [t.hero.h1Phrases])

  // Rotate phrases with crossfade every 4 seconds
  useEffect(() => {
    if (!t.hero.h1Phrases || t.hero.h1Phrases.length === 0) return
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % t.hero.h1Phrases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [t.hero.h1Phrases])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let rafId
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0

    const onMouseMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      targetX = (e.clientX - left - width  / 2) / width
      targetY = (e.clientY - top  - height / 2) / height
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      hero.style.setProperty('--mx', currentX.toFixed(4))
      hero.style.setProperty('--my', currentY.toFixed(4))

      rafId = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Lazy-load the video after first paint, then fade it in on canplay
  // Pause when scrolled out of view via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onCanPlay = () => {
      video.playbackRate = 0.3
      video.play().catch(() => {})
      video.classList.add('hero-video-bg--ready')
    }

    video.addEventListener('canplay', onCanPlay, { once: true })
    video.src = WORMHOLE_VIDEO_URL

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="hero" ref={heroRef}>
      <img
        className="hero-video-bg hero-video-bg--fallback"
        src={buraconegro}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
      />
      <video
        ref={videoRef}
        className="hero-video-bg"
        muted
        loop
        playsInline
      />
      <p className="hero-eyebrow">{t.hero.eyebrow}</p>
      <h1>
        {t.hero.h1}
        <em
          ref={emRef}
          key={phraseIndex}
          className="h1-em-fade"
          style={{ width: typeof emWidth === 'number' ? `${emWidth}px` : emWidth }}
        >
          {t.hero.h1Phrases?.[phraseIndex] || t.hero.h1Em}
        </em>
      </h1>
      <p>{t.hero.p}</p>
      <div className="hero-btns">
        <div className="btn-star-wrap">
          <a
            href={`https://wa.me/${t.waNumber}?text=${t.hero.waMsg}`}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.btnPrimary}
          </a>
        </div>
        <a href="#como-funciona" className="btn-ghost">{t.hero.btnGhost}</a>
      </div>
    </div>
  )
}
