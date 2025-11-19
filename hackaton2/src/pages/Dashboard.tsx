// Dashboard.tsx - Dashboard completo con estadísticas reales

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { taskService } from "../services/taskService";
import { projectService } from "../services/projectService";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import type { Task, Project, TaskStatus } from "../types";

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalProjects: number;
  activeProjects: number;
}

interface RecentActivity {
  id: string;
  type: "task" | "project";
  action: string;
  name: string;
  time: string;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Obtener todas las tareas
      const tasksData = await taskService.getTasks({ page: 1, limit: 100 });
      const allTasks = tasksData.tasks;

      // Obtener proyectos
      const projectsData = await projectService.getProjects(1, 20);
      const allProjects = projectsData.projects;

      // Calcular estadísticas de tareas
      const now = new Date();
      const completed = allTasks.filter((t) => t.status === "COMPLETED").length;
      const pending = allTasks.filter(
        (t) => t.status === "TODO" || t.status === "IN_PROGRESS"
      ).length;
      const overdue = allTasks.filter((t) => {
        const dueDate = new Date(t.dueDate);
        return dueDate < now && t.status !== "COMPLETED";
      }).length;

      // Calcular estadísticas de proyectos
      const activeProjects = allProjects.filter(
        (p) => p.status === "ACTIVE"
      ).length;

      setStats({
        totalTasks: allTasks.length,
        completedTasks: completed,
        pendingTasks: pending,
        overdueTasks: overdue,
        totalProjects: allProjects.length,
        activeProjects,
      });

      // Tareas recientes (últimas 5)
      setRecentTasks(allTasks.slice(0, 5));

      // Proyectos recientes (últimos 3)
      setRecentProjects(allProjects.slice(0, 3));
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "TODO":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompletionPercentage = () => {
    if (stats.totalTasks === 0) return 0;
    return Math.round((stats.completedTasks / stats.totalTasks) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          👋 Bienvenido al Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Aquí tienes un resumen de tus proyectos y tareas
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Tareas */}
        <Card className="border-l-4 border-indigo-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total de Tareas
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.totalTasks}
              </h3>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Tareas Completadas */}
        <Card className="border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Completadas
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.completedTasks}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {getCompletionPercentage()}% del total
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Tareas Pendientes */}
        <Card className="border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Pendientes
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.pendingTasks}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </Card>

        {/* Tareas Vencidas */}
        <Card className="border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Vencidas</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {stats.overdueTasks}
              </h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas y Proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Acciones Rápidas */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ⚡ Acciones Rápidas
          </h2>
          <div className="space-y-3">
            <Link to="/tasks">
              <Button className="w-full justify-start">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Crear Nueva Tarea
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary" className="w-full justify-start">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Ver Todos los Proyectos
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="secondary" className="w-full justify-start">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Ver Todas las Tareas
              </Button>
            </Link>
          </div>
        </Card>

        {/* Resumen de Proyectos */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              📁 Proyectos Activos
            </h2>
            <Link to="/projects">
              <Button variant="secondary" className="text-sm">
                Ver Todos
              </Button>
            </Link>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Total: {stats.totalProjects}</span>
              <span>Activos: {stats.activeProjects}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    stats.totalProjects > 0
                      ? (stats.activeProjects / stats.totalProjects) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="space-y-3">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {project.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : project.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No hay proyectos recientes
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Tareas Recientes */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            📋 Actividad Reciente - Tareas
          </h2>
          <Link to="/tasks">
            <Button variant="secondary" className="text-sm">
              Ver Todas
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarea
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Límite
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {task.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getTaskStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          task.priority === "URGENT"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "HIGH"
                            ? "bg-orange-100 text-orange-800"
                            : task.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No hay tareas recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
