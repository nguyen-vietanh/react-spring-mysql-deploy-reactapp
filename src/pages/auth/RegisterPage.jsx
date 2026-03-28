import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { registerUser } from '../../features/auth/api'

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function FormField({ id, label, required, error, children }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#4A4A4A] dark:text-[#9E9E9E] tracking-wide"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">*</span>
            <span className="sr-only">({t('common.required')})</span>
          </>
        )}
      </label>

      {children}

      {/* Reserve height so layout doesn't shift when error appears */}
      <span
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={`text-xs text-[#B91C1C] dark:text-[#F87171] min-h-4.5 ${error ? 'visible' : 'invisible'}`}
      >
        {error ?? ''}
      </span>
    </div>
  )
}

function inputClass(hasError) {
  return `
    h-12 w-full rounded-lg border px-4 text-base
    text-[#0A0A0A] dark:text-[#F0F0F0]
    placeholder:text-[#9E9E9E] dark:placeholder:text-[#717171]
    outline-none transition-all duration-150
    hover:border-[#C4C4C4] dark:hover:border-[#4A4A4A]
    focus:ring-[3px] focus:ring-[rgba(37,99,235,0.25)]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${hasError
      ? 'border-[#DC2626] bg-[#FEF2F2] focus:border-[#DC2626] dark:bg-[#2D1515] dark:border-[#DC2626]'
      : 'border-[#E0E0E0] bg-white focus:border-[#0A0A0A] dark:border-[#2E2E2E] dark:bg-[#1F1F1F] dark:focus:border-[#F0F0F0]'
    }
  `
}

// ---------------------------------------------------------------------------
// Alert banner — used for success and global (non-field) errors
// ---------------------------------------------------------------------------
function AlertBanner({ variant, title, message }) {
  const isSuccess = variant === 'success'

  // Map variant to styling classes to avoid nested ternaries
  const styles = {
    success: {
      container: 'bg-[#F0FDF4] border-[#BBF7D0] dark:bg-[#0d2e1a] dark:border-[#166534]',
      icon: 'text-[#16A34A] dark:text-[#4ade80]',
      title: 'text-[#15803D] dark:text-[#4ade80]',
      message: 'text-[#15803D] dark:text-[#86efac]',
    },
    warning: {
      container: 'bg-[#FFFBEB] border-[#FDE68A] dark:bg-[#2a1e00] dark:border-[#92400e]',
      icon: 'text-[#D97706] dark:text-[#fbbf24]',
      title: 'text-[#B45309] dark:text-[#fbbf24]',
      message: 'text-[#B45309] dark:text-[#fde68a]',
    },
    error: {
      container: 'bg-[#FEF2F2] border-[#FECACA] dark:bg-[#2D1515] dark:border-[#991b1b]',
      icon: 'text-[#DC2626] dark:text-[#f87171]',
      title: 'text-[#B91C1C] dark:text-[#f87171]',
      message: 'text-[#B91C1C] dark:text-[#fca5a5]',
    },
  }

  const currentStyle = styles[variant] || styles.error

  return (
    <output
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      className={`flex gap-3 rounded-lg border p-4 ${currentStyle.container}`}
    >
      <span className={`shrink-0 mt-0.5 ${currentStyle.icon}`}>
        {isSuccess ? <CheckCircleIcon /> : <AlertIcon />}
      </span>
      <div className="flex flex-col gap-0.5">
        {title && (
          <p className={`text-sm font-semibold ${currentStyle.title}`}>{title}</p>
        )}
        <p className={`text-sm ${currentStyle.message}`}>{message}</p>
      </div>
    </output>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

/** Turns a `errors[]` array from the API into a field-keyed object */
function toFieldErrors(apiErrors) {
  return (apiErrors ?? []).reduce((acc, { field, message }) => {
    if (field) acc[field] = message
    return acc
  }, {})
}

export default function RegisterPage() {
  const { t } = useTranslation()
  const ns = 'auth.register'

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Field-level errors from the BE (VALIDATION_FAILED / EMAIL_ALREADY_EXISTS)
  const [fieldErrors, setFieldErrors] = useState({})

  // Banner state: { variant: 'success'|'warning'|'error', title?, message }
  const [banner, setBanner] = useState(null)

  // Focus the first field with an error after a failed submission
  const fieldRefs = {
    fullName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    // Clear previous state
    setFieldErrors({})
    setBanner(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    setIsSubmitting(true)
    try {
      const result = await registerUser(payload)

      // Distinguish happy-path from partial-success (email send failed — flow 7a)
      if (result.data?.emailSent === false) {
        setBanner({
          variant: 'warning',
          message: t(`${ns}.success.emailFailed`),
        })
      } else {
        setBanner({
          variant: 'success',
          title: t(`${ns}.success.title`),
          message: t(`${ns}.success.message`),
        })
      }

      // Reset form on success so user can't accidentally resubmit
      e.target.reset()
    } catch (err) {
      const code = err.code ?? 'UNKNOWN_ERROR'
      const fieldErrs = toFieldErrors(err.errors)
      const hasFieldErrors = Object.keys(fieldErrs).length > 0

      if (hasFieldErrors) {
        setFieldErrors(fieldErrs)
        // Focus the first field that has an error
        const firstErrField = ['fullName', 'email', 'password', 'confirmPassword']
          .find((f) => fieldErrs[f])
        fieldRefs[firstErrField]?.current?.focus()
      }

      // Always show a banner for global errors; skip if field errors are already
      // self-explanatory (VALIDATION_FAILED with inline messages covers it)
      if (!hasFieldErrors || code !== 'VALIDATION_FAILED') {
        // Use the localized message from BE (it's already handled i18n).
        // For FE errors like NETWORK_ERROR, we still use local translation.
        const message = code === 'NETWORK_ERROR'
          ? t(`${ns}.errors.${code}`)
          : (err.message || t(`${ns}.errors.UNKNOWN_ERROR`))

        setBanner({ variant: 'error', message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className="min-h-screen
                 bg-[#FFFFFF] dark:bg-[#111111]
                 flex flex-col items-center justify-center px-4 py-12
                 transition-colors duration-200"
      aria-label={t(`${ns}.pageTitle`)}
    >
      <div className="w-full max-w-120">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-block text-2xl font-bold
                       text-[#0A0A0A] dark:text-[#F0F0F0]
                       tracking-tight rounded-sm transition-colors duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            aria-label={t(`${ns}.brandHome`)}
          >
            Bookstore
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] tracking-tight leading-tight">
            {t(`${ns}.heading`)}
          </h1>
          <p className="mt-2 text-base text-[#4A4A4A] dark:text-[#9E9E9E]">
            {t(`${ns}.subheading`)}
          </p>
        </div>

        {/* Global banner (success / warning / error) */}
        {banner && (
          <div className="mb-6">
            <AlertBanner
              variant={banner.variant}
              title={banner.title}
              message={banner.message}
            />
          </div>
        )}

        {/* Form — hide after a clean success (emailSent not false) */}
        {banner?.variant !== 'success' && (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label={t(`${ns}.pageTitle`)}
            className="flex flex-col gap-5"
          >
            {/* Full Name */}
            <FormField
              id="fullName"
              label={t(`${ns}.fields.fullName.label`)}
              required
              error={fieldErrors.fullName}
            >
              <input
                ref={fieldRefs.fullName}
                id="fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                disabled={isSubmitting}
                placeholder={t(`${ns}.fields.fullName.placeholder`)}
                aria-required="true"
                aria-invalid={fieldErrors.fullName ? 'true' : 'false'}
                aria-describedby="fullName-error"
                className={inputClass(fieldErrors.fullName)}
              />
            </FormField>

            {/* Email */}
            <FormField
              id="email"
              label={t(`${ns}.fields.email.label`)}
              required
              error={fieldErrors.email}
            >
              <input
                ref={fieldRefs.email}
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                disabled={isSubmitting}
                placeholder={t(`${ns}.fields.email.placeholder`)}
                aria-required="true"
                aria-invalid={fieldErrors.email ? 'true' : 'false'}
                aria-describedby="email-error"
                className={inputClass(fieldErrors.email)}
              />
            </FormField>

            {/* Password */}
            <FormField
              id="password"
              label={t(`${ns}.fields.password.label`)}
              required
              error={fieldErrors.password}
            >
              <div className="relative">
                <input
                  ref={fieldRefs.password}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  placeholder={t(`${ns}.fields.password.placeholder`)}
                  aria-required="true"
                  aria-invalid={fieldErrors.password ? 'true' : 'false'}
                  aria-describedby="password-error"
                  className={inputClass(fieldErrors.password) + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={t(`${ns}.fields.password.${showPassword ? 'hide' : 'show'}`)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-[#9E9E9E] hover:text-[#4A4A4A]
                             dark:text-[#717171] dark:hover:text-[#C4C4C4]
                             transition-colors duration-150
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                             rounded-sm p-0.5"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </FormField>

            {/* Confirm Password */}
            <FormField
              id="confirmPassword"
              label={t(`${ns}.fields.confirmPassword.label`)}
              required
              error={fieldErrors.confirmPassword}
            >
              <div className="relative">
                <input
                  ref={fieldRefs.confirmPassword}
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  placeholder={t(`${ns}.fields.confirmPassword.placeholder`)}
                  aria-required="true"
                  aria-invalid={fieldErrors.confirmPassword ? 'true' : 'false'}
                  aria-describedby="confirmPassword-error"
                  className={inputClass(fieldErrors.confirmPassword) + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={t(`${ns}.fields.confirmPassword.${showConfirmPassword ? 'hide' : 'show'}`)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-[#9E9E9E] hover:text-[#4A4A4A]
                             dark:text-[#717171] dark:hover:text-[#C4C4C4]
                             transition-colors duration-150
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                             rounded-sm p-0.5"
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
            </FormField>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-1 h-12 w-full rounded-lg font-semibold text-base
                         bg-[#0A0A0A] text-white
                         dark:bg-[#F0F0F0] dark:text-[#0A0A0A]
                         transition-all duration-150
                         hover:bg-[#1F1F1F] hover:-translate-y-px hover:shadow-sm
                         dark:hover:bg-[#E0E0E0]
                         active:translate-y-0 active:opacity-95
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(37,99,235,0.25)]
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? t(`${ns}.submitting`) : t(`${ns}.submit`)}
            </button>
          </form>
        )}

        {/* Divider + login link — always visible */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2E2E2E]" aria-hidden="true" />
          <span className="text-xs text-[#9E9E9E] dark:text-[#717171] font-medium">
            {t('common.or')}
          </span>
          <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2E2E2E]" aria-hidden="true" />
        </div>

        <p className="text-center text-sm text-[#4A4A4A] dark:text-[#9E9E9E]">
          {t(`${ns}.haveAccount`)}{' '}
          <Link
            to="/login"
            className="font-semibold
                       text-[#0A0A0A] dark:text-[#F0F0F0]
                       underline underline-offset-2
                       hover:text-[#4A4A4A] dark:hover:text-[#C4C4C4]
                       transition-colors duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                       rounded-sm"
          >
            {t(`${ns}.login`)}
          </Link>
        </p>

      </div>
    </main>
  )
}
