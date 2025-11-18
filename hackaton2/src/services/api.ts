// src/services/api.ts

import axios from 'axios'

// URL Base: https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Simulacro de función para obtener el token JWT.
 * En una implementación real, esto vendría de un AuthContext o de localStorage.
 * La implementación real en fase 1 requiere: Implementar almacenamiento de JWT (localStorage/context).
 */
const getAuthToken = (): string | null => {
  // Implementación simulada: Obtener de localStorage
  return localStorage.getItem('jwt_token')
}

// Interceptor para agregar el token a cada solicitud autenticada
api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})