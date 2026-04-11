import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLang } from '../context/LangContext'

export default function CTA() {
  const [ref, inView] = useScrollReveal()
  const { t } = useLang()

  return (
    <div className="cta-section" id="contato">
      <div ref={ref} className={`cta-inner${inView ? ' in-view' : ''}`}>
        <h2>
          {t.cta.h2}<br />
          <em style={{ color: 'var(--acento)', fontStyle: 'italic' }}>{t.cta.h2Em}</em>
        </h2>
        <p>{t.cta.p}</p>
        <a
          href={`https://wa.me/${t.waNumber}?text=${t.cta.waMsg}`}
          className="btn-primary"
          style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.cta.btn}
        </a>
      </div>
    </div>
  )
}
