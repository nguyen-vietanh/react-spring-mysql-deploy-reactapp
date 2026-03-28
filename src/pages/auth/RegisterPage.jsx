import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { registerUser } from '../../features/auth/api'
import { ERROR_CODES } from '../../lib/constants/errors'

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

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
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

  // Field-level errors from the BE
  const [fieldErrors, setFieldErrors] = useState({})

  // Flag to hide form after successful registration
  const [isRegistered, setIsRegistered] = useState(false)

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

    setFieldErrors({})

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

      if (result.status === 201) {
        toast.success(t(`${ns}.success.title`) + ': ' + t(`${ns}.success.message`))
        setIsRegistered(true)
      }
      e.target.reset()
    } catch (err) {
      const code = err.code ?? ERROR_CODES.UNKNOWN_ERROR
      const fieldErrs = toFieldErrors(err.errors)
      const hasFieldErrors = Object.keys(fieldErrs).length > 0

      if (hasFieldErrors) {
        setFieldErrors(fieldErrs)
        const firstErrField = ['fullName', 'email', 'password', 'confirmPassword'].find((f) => fieldErrs[f])
        fieldRefs[firstErrField]?.current?.focus()
      }

      if (!hasFieldErrors || code !== ERROR_CODES.VALIDATION_FAILED) {
        const message = code === ERROR_CODES.NETWORK_ERROR
          ? t(`${ns}.errors.${code}`)
          : (err.message || t(`${ns}.errors.${ERROR_CODES.UNKNOWN_ERROR}`))
        toast.error(message)
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

        {/* Content */}
        {isRegistered ? (
          <div className="text-center p-8 bg-[#F0FDF4] dark:bg-[#0d2e1a] rounded-lg border border-[#BBF7D0] dark:border-[#166534]">
            <span className="inline-block p-3 rounded-full bg-[#16A34A] text-white mb-4">
              <CheckCircleIcon />
            </span>
            <h2 className="text-xl font-bold text-[#15803D] dark:text-[#4ade80] mb-2">{t(`${ns}.success.title`)}</h2>
            <p className="text-[#15803D] dark:text-[#86efac]">{t(`${ns}.success.message`)}</p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
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

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2E2E2E]" aria-hidden="true" />
              <span className="text-xs text-[#9E9E9E] dark:text-[#717171] font-medium uppercase tracking-wider">
                {t('common.or')}
              </span>
              <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2E2E2E]" aria-hidden="true" />
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                const backendUrl = import.meta.env.VITE_BE_BASE_URL
                window.location.href = `${backendUrl}/oauth2/authorization/google`
              }}
              className="flex items-center justify-center gap-2.5
                         h-12 w-full rounded-lg font-semibold text-base
                         bg-white text-[#0A0A0A] border border-[#E0E0E0]
                         dark:bg-[#111111] dark:text-[#F0F0F0] dark:border-[#2E2E2E]
                         transition-all duration-150
                         hover:bg-[#F8F8F8] hover:border-[#C4C4C4] hover:-translate-y-px hover:shadow-xs
                         dark:hover:bg-[#1F1F1F] dark:hover:border-[#4A4A4A]
                         active:translate-y-0 active:bg-white dark:active:bg-[#111111]
                         focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(37,99,235,0.25)]
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              <GoogleIcon />
              {t(`${ns}.signupWithGoogle`)}
            </button>
          </>
        )}

        <p className="mt-8 text-center text-sm text-[#4A4A4A] dark:text-[#9E9E9E]">
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
