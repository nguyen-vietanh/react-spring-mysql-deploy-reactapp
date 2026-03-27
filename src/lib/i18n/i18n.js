import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import vi from './locales/vi.json'
import en from './locales/en.json'

const STORAGE_KEY = 'locale'
const SUPPORTED_LOCALES = ['vi', 'en']
const DEFAULT_LOCALE = 'vi'

function getInitialLocale() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored

  // Match browser language to supported locales (e.g. 'en-US' → 'en')
  const browserLang = navigator.language?.split('-')[0]
  return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : DEFAULT_LOCALE
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
    },
    lng: getInitialLocale(),
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      // React already escapes values — no need for i18next to double-escape
      escapeValue: false,
    },
  })

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, STORAGE_KEY }
export default i18n
