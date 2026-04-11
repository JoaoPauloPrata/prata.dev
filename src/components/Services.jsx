import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLang } from '../context/LangContext'

export default function Services() {
  const [ref, inView] = useScrollReveal()
  const { t } = useLang()

  return (
    <section id="servicos" ref={ref} className={`section-reveal${inView ? ' in-view' : ''}`}>
      <p className="hero-eyebrow" style={{ marginBottom: '0.75rem' }}>{t.services.eyebrow}</p>
      <h2 className="section-title">{t.services.title}</h2>
      <p className="section-sub">{t.services.sub}</p>
      <div className="services-grid">
        {t.services.items.map(({ icon, title, desc }) => (
          <div className="service-card" key={title}>
            <div className="service-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
