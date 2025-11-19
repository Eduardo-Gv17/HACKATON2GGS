// src/services/api.ts
import axios from 'axios'

// URL Base
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    // [CORREGIDO] Usamos "token" para coincidir con AuthContext
    const token = localStorage.getItem('token') 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // [CORREGIDO] Usamos "token"
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// [CORREGIDO] Exportamos por defecto para que funcione el import en AuthContext
export default api;