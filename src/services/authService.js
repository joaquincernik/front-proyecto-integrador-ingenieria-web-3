const MOCK_USER = {
  email: 'usuario@demo.com',
  password: 'secreto123',
  name: 'Usuario Demo',
}

const AUTH_DELAY_MS = 600

const delay = (ms = AUTH_DELAY_MS) => new Promise(resolve => setTimeout(resolve, ms))

export async function login ({ email, password }) {
  await delay()

  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '')

  if (
    normalizedEmail === MOCK_USER.email &&
    normalizedPassword === MOCK_USER.password
  ) {
    return {
      email: MOCK_USER.email,
      name: MOCK_USER.name,
    }
  }

  const error = new Error('Usuario o contraseña incorrectos')
  error.code = 'INVALID_CREDENTIALS'
  throw error
}
