import { useLang } from '../context/LangContext'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      aria-label="Switch language"
    >
      <span className={lang === 'pt' ? 'lang-active' : ''}>PT</span>
      <span className="lang-divider">·</span>
      <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
    </button>
  )
}
