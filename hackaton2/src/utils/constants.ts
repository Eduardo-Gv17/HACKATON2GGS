// src/utils/constants.ts

/**
 * URL base de la API
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1'

/**
 * Clave para almacenar el token JWT en localStorage
 */
export const TOKEN_KEY = 'jwt_token'

/**
 * Estados de proyecto
 */
export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
} as const

/**
 * Estados de tarea
 */
export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const

/**
 * Prioridades de tarea
 */
export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

/**
 * Opciones de estados de proyecto para formularios
 */
export const PROJECT_STATUS_OPTIONS = [
  { value: PROJECT_STATUS.ACTIVE, label: 'Activo' },
  { value: PROJECT_STATUS.COMPLETED, label: 'Completado' },
  { value: PROJECT_STATUS.ON_HOLD, label: 'En Pausa' },
] as const

/**
 * Opciones de estados de tarea para formularios
 */
export const TASK_STATUS_OPTIONS = [
  { value: TASK_STATUS.TODO, label: 'Por Hacer' },
  { value: TASK_STATUS.IN_PROGRESS, label: 'En Progreso' },
  { value: TASK_STATUS.COMPLETED, label: 'Completada' },
] as const

/**
 * Opciones de prioridades de tarea para formularios
 */
export const TASK_PRIORITY_OPTIONS = [
  { value: TASK_PRIORITY.LOW, label: 'Baja' },
  { value: TASK_PRIORITY.MEDIUM, label: 'Media' },
  { value: TASK_PRIORITY.HIGH, label: 'Alta' },
  { value: TASK_PRIORITY.URGENT, label: 'Urgente' },
] as const

/**
 * Configuración de paginación por defecto
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_TASK_LIMIT: 20,
} as const

/**
 * Colores para estados de proyecto (para usar con Tailwind)
 */
export const PROJECT_STATUS_COLORS = {
  [PROJECT_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
  [PROJECT_STATUS.COMPLETED]: 'bg-blue-100 text-blue-800',
  [PROJECT_STATUS.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
} as const

/**
 * Colores para estados de tarea (para usar con Tailwind)
 */
export const TASK_STATUS_COLORS = {
  [TASK_STATUS.TODO]: 'bg-gray-100 text-gray-800',
  [TASK_STATUS.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
  [TASK_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
} as const

/**
 * Colores para prioridades de tarea (para usar con Tailwind)
 */
export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: 'bg-gray-100 text-gray-800',
  [TASK_PRIORITY.MEDIUM]: 'bg-blue-100 text-blue-800',
  [TASK_PRIORITY.HIGH]: 'bg-orange-100 text-orange-800',
  [TASK_PRIORITY.URGENT]: 'bg-red-100 text-red-800',
} as const

