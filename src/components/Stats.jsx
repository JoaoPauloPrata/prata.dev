import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLang } from '../context/LangContext'

export default function Stats() {
  const [ref, inView] = useScrollReveal()
  const { t } = useLang()

  return (
    <div ref={ref} className={`stats stats-reveal${inView ? ' in-view' : ''}`}>
      {t.stats.map(({ num, label }) => (
        <div className="stat" key={label}>
          <span className="stat-num">{num}</span>
          <span className="stat-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
