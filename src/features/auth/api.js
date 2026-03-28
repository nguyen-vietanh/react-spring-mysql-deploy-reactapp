import api from '../../lib/api'

/**
 * POST /api/v1/auth/register
 *
 * @param {{ fullName: string, email: string, password: string, confirmPassword: string }} payload
 * @returns {Promise<import('axios').AxiosResponse>}
 * @throws Normalised error with { code, message, status, errors[] }
 */
export function registerUser(payload) {
  return api.post('/auth/register', payload)
}
