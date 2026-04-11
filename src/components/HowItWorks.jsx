import { useRef, useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLang } from '../context/LangContext'

export default function HowItWorks() {
  const [sectionRef, sectionInView] = useScrollReveal(0.05)
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(-1)
  const roadmapRef = useRef(null)
  const stepRefs = useRef([])
  const { t } = useLang()

  useEffect(() => {
    // Fill the track line based on scroll progress through the roadmap
    const updateProgress = () => {
      const el = roadmapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const scrolledIn = vh * 0.75 - rect.top
      const prog = Math.max(0, Math.min(1, scrolledIn / (rect.height + vh * 0.2)))
      setProgress(prog)
    }

    // Activate each step node as it enters the viewport
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(prev => Math.max(prev, i))
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      return obs
    })

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      observers.forEach(obs => obs?.disconnect())
    }
  }, [])

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className={`how-it-works section-reveal${sectionInView ? ' in-view' : ''}`}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <p className="hero-eyebrow" style={{ marginBottom: '0.75rem' }}>{t.howItWorks.eyebrow}</p>
        <h2 className="section-title">{t.howItWorks.title}</h2>
        <p className="section-sub">{t.howItWorks.sub}</p>

        <div className="steps-roadmap" ref={roadmapRef}>
          {/* Vertical track */}
          <div className="roadmap-track">
            <div className="roadmap-fill" style={{ height: `${progress * 100}%` }} />
          </div>

          {t.howItWorks.steps.map(({ num, title, desc }, i) => (
            <div
              key={num}
              ref={el => { stepRefs.current[i] = el }}
              className={`step-road${i <= activeStep ? ' step-active' : ''}`}
            >
              <div className="roadmap-node" />
              <span className="step-num">{num}</span>
              <div className="step-content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
