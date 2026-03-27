import { useTranslation } from 'react-i18next'
import { STORAGE_KEY, SUPPORTED_LOCALES } from '../lib/i18n/i18n'

export function useLocale() {
  const { i18n } = useTranslation()

  const changeLocale = (locale) => {
    if (!SUPPORTED_LOCALES.includes(locale)) return
    i18n.changeLanguage(locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }

  return {
    locale: i18n.language,
    supportedLocales: SUPPORTED_LOCALES,
    changeLocale,
  }
}
