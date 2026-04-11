import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LangContext = createContext()

function getInitialLang() {
  const param = new URLSearchParams(window.location.search).get('lang')
  return param === 'en' ? 'en' : 'pt'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
