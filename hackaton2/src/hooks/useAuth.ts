// src/hooks/useAuth.ts

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import type { User, LoginPayload, AuthPayload } from '../types'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  error: string | null
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Verificar si hay un token y obtener el perfil del usuario
  useEffect(() => {
    const token = authService.getToken()
    if (!token) {
      setLoading(false)
      return
    }

    authService
      .getProfile()
      .then((userData) => {
        setUser(userData)
      })
      .catch(() => {
        // Token inválido, limpiar
        authService.logout()
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null)
      setLoading(true)
      const payload: LoginPayload = { email, password }
      const response = await authService.login(payload)
      setUser(response.user)
      navigate('/dashboard')
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al iniciar sesión'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setError(null)
      setLoading(true)
      const payload: AuthPayload = { email, password, name }
      await authService.register(payload)
      // Después de registrar, hacer login automático
      await login(email, password)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al registrar usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error,
  }
}

