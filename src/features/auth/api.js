import api from '../../lib/api'

/**
 * POST /api/v1/auth/register
 *
 * @param {{ fullName: string, email: string, password: string, confirmPassword: string }} payload
 * @returns {Promise<{ message: string, data: { userId: number, email: string, fullName: string, status: string, createdAt: string, emailSent?: boolean } }>}
 * @throws Normalised error with { code, message, status, errors[] }
 */
export function registerUser(payload) {
  return api.post('/auth/register', payload).then((res) => res.data)
}
