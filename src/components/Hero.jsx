import { useRef, useEffect } from 'react'
import { useLang } from '../context/LangContext'

export default function Hero() {
  const heroRef = useRef(null)
  const { t } = useLang()

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
      // Lerp toward target — 0.06 = smooth lag
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

  return (
    <div className="hero" ref={heroRef}>
      <p className="hero-eyebrow">{t.hero.eyebrow}</p>
      <h1>{t.hero.h1} <em>{t.hero.h1Em}</em></h1>
      <p>{t.hero.p}</p>
      <div className="hero-btns">
        <a
          href={`https://wa.me/${t.waNumber}?text=${t.hero.waMsg}`}
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.hero.btnPrimary}
        </a>
        <a href="#como-funciona" className="btn-ghost">{t.hero.btnGhost}</a>
      </div>
    </div>
  )
}
