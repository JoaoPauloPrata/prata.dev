import { useLang } from '../context/LangContext'

export default function Nav() {
  const { t } = useLang()

  return (
    <nav>
      <a href="#" className="logo">Prata<span>.</span></a>
      <div className="nav-links">
        <a href="#servicos">{t.nav.services}</a>
        <a href="#como-funciona">{t.nav.howItWorks}</a>
        <a
          href={`https://wa.me/${t.waNumber}?text=${t.nav.waMsg}`}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.nav.cta}
        </a>
      </div>
    </nav>
  )
}
