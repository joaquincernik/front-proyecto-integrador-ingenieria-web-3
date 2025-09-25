import { computed, reactive, readonly } from 'vue'
import { login as loginRequest } from '@/services/authService'

const state = reactive({
  user: loadUser(),
  loading: false,
  error: null,
})

function loadUser () {
  try {
    const raw = localStorage.getItem('auth:user')
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('No se pudo leer auth:user de localStorage', error)
    return null
  }
}

function persistUser (user) {
  if (!user) {
    localStorage.removeItem('auth:user')
    return
  }

  localStorage.setItem('auth:user', JSON.stringify(user))
}

export function useAuth () {
  const login = async credentials => {
    state.loading = true
    state.error = null
    try {
      const user = await loginRequest(credentials)
      state.user = user
      persistUser(user)
      return user
    } catch (error) {
      state.error = error
      throw error
    } finally {
      state.loading = false
    }
  }

  const logout = () => {
    state.user = null
    state.error = null
    persistUser(null)
  }

  const user = computed(() => state.user)
  const isAuthenticated = computed(() => !!state.user)
  const isLoading = computed(() => state.loading)
  const authError = computed(() => state.error)

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    authError: readonly(authError),
    login,
    logout,
  }
}
