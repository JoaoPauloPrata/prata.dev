import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLang } from '../context/LangContext'

export default function Testimonials() {
  const [ref, inView] = useScrollReveal()
  const { t } = useLang()
  const items = t.testimonials.items

  return (
    <section ref={ref} className={`section-reveal${inView ? ' in-view' : ''}`}>
      <p className="hero-eyebrow" style={{ marginBottom: '0.75rem' }}>{t.testimonials.eyebrow}</p>
      <h2 className="section-title">{t.testimonials.title}</h2>
      <p className="section-sub">{t.testimonials.sub}</p>

      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...items, ...items].map(({ text, author, role }, i) => (
            <div className="testimonial" key={i}>
              <p>{text}</p>
              <div className="testimonial-author">{author}</div>
              <div className="testimonial-role">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
