import { useLocale } from '../../hooks/useLocale'

const LOCALE_LABELS = {
  vi: 'VI',
  en: 'EN',
}

export function LanguageSwitcher() {
  const { locale, supportedLocales, changeLocale } = useLocale()

  return (
    <div
      role="group"
      aria-label="Chọn ngôn ngữ / Select language"
      className="fixed top-4 right-16 z-50 flex items-center gap-1"
    >
      {supportedLocales.map((lang) => {
        const isActive = locale === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => changeLocale(lang)}
            aria-pressed={isActive}
            aria-label={lang === 'vi' ? 'Tiếng Việt' : 'English'}
            className={`
              h-8 w-10 rounded-md text-xs font-semibold tracking-wide
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(37,99,235,0.25)]
              ${isActive
                ? 'bg-[#0A0A0A] text-white dark:bg-[#F0F0F0] dark:text-[#0A0A0A]'
                : 'bg-[#F0F0F0] text-[#4A4A4A] hover:bg-[#E0E0E0] dark:bg-[#2E2E2E] dark:text-[#9E9E9E] dark:hover:bg-[#4A4A4A]'
              }
            `}
          >
            {LOCALE_LABELS[lang]}
          </button>
        )
      })}
    </div>
  )
}
