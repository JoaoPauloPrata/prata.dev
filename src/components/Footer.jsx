import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="logo">Prata<span>.</span></div>
      <p>{t.footer.copy}</p>
    </footer>
  )
}
