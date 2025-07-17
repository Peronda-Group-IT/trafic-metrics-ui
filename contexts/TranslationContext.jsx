'use client'

import { createContext, useContext } from 'react'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

const translations = { en, es }
const defaultLang = 'es'

const TranslationContext = createContext({
  t: (key) => key,
  lang: defaultLang
})

export function useT() {
  return useContext(TranslationContext)
}

export function TranslationProvider({ children, lang = 'es' }) {

    const t = (key) => {

      return translations[lang]?.[`${key}`] || translations[defaultLang]?.[key] || key
    }

    return (
      <TranslationContext.Provider value={{ t, lang }}>
        {children}
      </TranslationContext.Provider>
    )
}
