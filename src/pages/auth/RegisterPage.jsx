import { useState } from 'react'
import { Link } from 'react-router'

// Password visibility toggle icon
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

// Reusable form field
function FormField({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#4A4A4A] tracking-wide"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-[#DC2626]">*</span>
            <span className="sr-only">(Bắt buộc)</span>
          </>
        )}
      </label>

      {children}

      <span
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={`text-xs text-[#B91C1C] min-h-[18px] ${error ? 'visible' : 'invisible'}`}
      >
        {error ?? ''}
      </span>
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Static placeholder state — no validation, no API yet
  const [fields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Placeholder errors — will be populated when validation is wired
  const errors = {
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire FE validation + API call
  }

  return (
    <main
      className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center px-4 py-12"
      aria-label="Trang đăng ký tài khoản"
    >
      {/* Card container */}
      <div className="w-full max-w-[480px]">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-block text-2xl font-bold text-[#0A0A0A] tracking-tight
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                       rounded-sm"
            aria-label="Trang chủ Website Bán Sách"
          >
            Bookstore
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0A0A0A] tracking-tight leading-tight">
            Tạo tài khoản
          </h1>
          <p className="mt-2 text-base text-[#4A4A4A]">
            Đăng ký để bắt đầu mua sách
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Form đăng ký tài khoản"
          className="flex flex-col gap-5"
        >

          {/* Full Name */}
          <FormField id="fullName" label="Họ tên" required error={errors.fullName}>
            <input
              id="fullName"
              type="text"
              name="fullName"
              autoComplete="name"
              defaultValue={fields.fullName}
              placeholder="Nguyễn Văn A"
              aria-required="true"
              aria-invalid={errors.fullName ? 'true' : 'false'}
              aria-describedby="fullName-error"
              className={`
                h-12 w-full rounded-lg border px-4 text-base text-[#0A0A0A]
                placeholder:text-[#9E9E9E] bg-white
                outline-none transition-all duration-150
                hover:border-[#C4C4C4]
                focus:border-[#0A0A0A] focus:ring-[3px] focus:ring-[rgba(37,99,235,0.25)]
                ${errors.fullName
                  ? 'border-[#DC2626] bg-[#FEF2F2]'
                  : 'border-[#E0E0E0]'
                }
              `}
            />
          </FormField>

          {/* Email */}
          <FormField id="email" label="Email" required error={errors.email}>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              defaultValue={fields.email}
              placeholder="ten@example.com"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby="email-error"
              className={`
                h-12 w-full rounded-lg border px-4 text-base text-[#0A0A0A]
                placeholder:text-[#9E9E9E] bg-white
                outline-none transition-all duration-150
                hover:border-[#C4C4C4]
                focus:border-[#0A0A0A] focus:ring-[3px] focus:ring-[rgba(37,99,235,0.25)]
                ${errors.email
                  ? 'border-[#DC2626] bg-[#FEF2F2]'
                  : 'border-[#E0E0E0]'
                }
              `}
            />
          </FormField>

          {/* Password */}
          <FormField id="password" label="Mật khẩu" required error={errors.password}>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                defaultValue={fields.password}
                placeholder="Tối thiểu 8 ký tự"
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby="password-error"
                className={`
                  h-12 w-full rounded-lg border px-4 pr-12 text-base text-[#0A0A0A]
                  placeholder:text-[#9E9E9E] bg-white
                  outline-none transition-all duration-150
                  hover:border-[#C4C4C4]
                  focus:border-[#0A0A0A] focus:ring-[3px] focus:ring-[rgba(37,99,235,0.25)]
                  ${errors.password
                    ? 'border-[#DC2626] bg-[#FEF2F2]'
                    : 'border-[#E0E0E0]'
                  }
                `}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-[#9E9E9E] hover:text-[#4A4A4A] transition-colors duration-150
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                           rounded-sm p-0.5"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </FormField>

          {/* Confirm Password */}
          <FormField id="confirmPassword" label="Xác nhận mật khẩu" required error={errors.confirmPassword}>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                defaultValue={fields.confirmPassword}
                placeholder="Nhập lại mật khẩu"
                aria-required="true"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby="confirmPassword-error"
                className={`
                  h-12 w-full rounded-lg border px-4 pr-12 text-base text-[#0A0A0A]
                  placeholder:text-[#9E9E9E] bg-white
                  outline-none transition-all duration-150
                  hover:border-[#C4C4C4]
                  focus:border-[#0A0A0A] focus:ring-[3px] focus:ring-[rgba(37,99,235,0.25)]
                  ${errors.confirmPassword
                    ? 'border-[#DC2626] bg-[#FEF2F2]'
                    : 'border-[#E0E0E0]'
                  }
                `}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-[#9E9E9E] hover:text-[#4A4A4A] transition-colors duration-150
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                           rounded-sm p-0.5"
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
          </FormField>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-1 h-12 w-full rounded-lg bg-[#0A0A0A] text-base font-semibold text-white
                       transition-all duration-150
                       hover:bg-[#1F1F1F] hover:-translate-y-px hover:shadow-sm
                       active:translate-y-0 active:opacity-95
                       focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(37,99,235,0.25)]
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            Đăng ký
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E0E0E0]" aria-hidden="true" />
          <span className="text-xs text-[#9E9E9E] font-medium">hoặc</span>
          <div className="h-px flex-1 bg-[#E0E0E0]" aria-hidden="true" />
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-[#4A4A4A]">
          Đã có tài khoản?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#0A0A0A] underline underline-offset-2
                       hover:text-[#4A4A4A] transition-colors duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                       rounded-sm"
          >
            Đăng nhập
          </Link>
        </p>

      </div>
    </main>
  )
}
