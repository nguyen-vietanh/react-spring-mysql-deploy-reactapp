/**
 * Application-level error codes used for identifying specific failure scenarios
 * without relying on brittle message strings.
 */
export const ERROR_CODES = {
  /** Generic fallback when no specific code is provided by the server */
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',

  /** Request failed due to connectivity or timeout issues before reaching the server */
  NETWORK_ERROR: 'NETWORK_ERROR',

  /** Server rejected the payload due to validation rules (e.g. invalid format) */
  VALIDATION_FAILED: 'VALIDATION_FAILED',

  /** Registration failed because the email address is already in use */
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
}
