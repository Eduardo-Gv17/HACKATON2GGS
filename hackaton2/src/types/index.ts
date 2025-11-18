
export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  // La API de detalles de proyecto puede incluir tareas
  tasks?: Task[]
}

export interface ProjectListResponse {
  projects: Project[]
  totalPages: number
  currentPage: number
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string // Formato: "2025-12-01"
  assignedTo: string // userId
  createdAt: string
  updatedAt: string
}

export interface TaskListResponse {
  tasks: Task[]
  totalPages: number
}

// Interfaces para Payloads
export interface ProjectPayload {
  name: string
  description: string
  status: ProjectStatus
}

export interface TaskPayload {
  title: string
  description: string
  projectId: string
  priority: TaskPriority
  dueDate: string
  assignedTo?: string
}