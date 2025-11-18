// src/services/taskService.ts

import type{ Task, TaskListResponse, TaskPayload, TaskStatus, TaskPriority } from '../types'
import { api } from './api'

interface GetTasksParams {
  projectId?: string
  status?: TaskStatus
  priority?: TaskPriority
  page?: number
  limit?: number
}

export const taskService = {
  /**
   * Listar todas las tareas con filtros y paginación.
   * Endpoint: GET /tasks?projectId=uuid&status=TODO&priority=HIGH&page=1&limit=20
   */
  getTasks: async (params: GetTasksParams): Promise<TaskListResponse> => {
    const response = await api.get('/tasks', { params })
    return response.data as TaskListResponse
  },

  /**
   * Obtener detalles de tarea.
   * Endpoint: GET /tasks/:id
   */
  getTaskDetails: async (taskId: string): Promise<Task> => {
    const response = await api.get(`/tasks/${taskId}`)
    return response.data as Task
  },

  /**
   * Crear tarea.
   * Endpoint: POST /tasks
   */
  createTask: async (payload: TaskPayload): Promise<Task> => {
    const response = await api.post('/tasks', payload)
    return response.data as Task
  },

  /**
   * Actualizar tarea.
   * Endpoint: PUT /tasks/:id
   */
  updateTask: async (taskId: string, payload: Partial<TaskPayload>): Promise<Task> => {
    const response = await api.put(`/tasks/${taskId}`, payload)
    return response.data as Task
  },

  /**
   * Actualizar solo el estado de la tarea.
   * Endpoint: PATCH /tasks/:id/status
   */
  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<Task> => {
    const response = await api.patch(`/tasks/${taskId}/status`, { status })
    return response.data as Task
  },

  /**
   * Eliminar tarea.
   * Endpoint: DELETE /tasks/:id
   */
  deleteTask: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`)
  },
}