// src/services/projectService.ts

import { type Project, type ProjectListResponse, type ProjectPayload } from '../types'
import { api } from './api'

export const projectService = {
  /**
   * Listar todos los proyectos con paginación y búsqueda.
   * Endpoint: GET /projects?page=1&limit=10&search=
   */
  getProjects: async (page: number = 1, limit: number = 10, search: string = ''): Promise<ProjectListResponse> => {
    const response = await api.get('/projects', {
      params: { page, limit, search },
    })
    return response.data as ProjectListResponse
  },

  /**
   * Obtener detalles de proyecto.
   * Endpoint: GET /projects/:id
   */
  getProjectDetails: async (projectId: string): Promise<Project> => {
    const response = await api.get(`/projects/${projectId}`)
    return response.data as Project
  },

  /**
   * Crear nuevo proyecto.
   * Endpoint: POST /projects
   */
  createProject: async (payload: ProjectPayload): Promise<Project> => {
    const response = await api.post('/projects', payload)
    return response.data as Project
  },

  /**
   * Actualizar información del proyecto.
   * Endpoint: PUT /projects/:id
   */
  updateProject: async (projectId: string, payload: Partial<ProjectPayload>): Promise<Project> => {
    const response = await api.put(`/projects/${projectId}`, payload)
    return response.data as Project
  },

  /**
   * Eliminar proyecto.
   * Endpoint: DELETE /projects/:id
   */
  deleteProject: async (projectId: string): Promise<void> => {
    await api.delete(`/projects/${projectId}`)
  },
}