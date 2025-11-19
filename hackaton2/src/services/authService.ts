// src/services/authService.ts

import { api } from './api'
import type { User, LoginResponse, RegisterResponse, AuthPayload, LoginPayload } from '../types'

export const authService = {
  /**
   * Registrar nuevo usuario.
   * Endpoint: POST /auth/register
   */
  register: async (payload: AuthPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', payload)
    return response.data
  },

  /**
   * Iniciar sesión.
   * Endpoint: POST /auth/login
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', payload)
    // Guardar token en localStorage
    if (response.data.token) {
      localStorage.setItem('jwt_token', response.data.token)
    }
    return response.data
  },

  /**
   * Obtener perfil del usuario actual.
   * Endpoint: GET /auth/profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile')
    return response.data
  },

  /**
   * Cerrar sesión (limpiar token del localStorage).
   */
  logout: (): void => {
    localStorage.removeItem('jwt_token')
  },

  /**
   * Obtener token del localStorage.
   */
  getToken: (): string | null => {
    return localStorage.getItem('jwt_token')
  },
}

