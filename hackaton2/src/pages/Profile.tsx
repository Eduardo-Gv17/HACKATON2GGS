// src/pages/Profile.tsx
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import { projectService } from "../services/projectService";

export const Profile = () => {
  const { user, logout } = useAuth();
  const [userStats, setUserStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const [tasksData, projectsData] = await Promise.all([
          taskService.getTasks({ page: 1, limit: 100 }),
          projectService.getProjects(1, 100),
        ]);

        const completed = tasksData.tasks.filter(
          (t) => t.status === "COMPLETED"
        ).length;

        setUserStats({
          totalTasks: tasksData.tasks.length,
          completedTasks: completed,
          totalProjects: projectsData.projects.length,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">
        No se encontraron datos de usuario.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            👤 Mi Perfil
          </h1>
          <p className="text-lg text-gray-600">
            Información de tu cuenta y estadísticas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información del Usuario */}
          <Card className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.username}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    ✓ Cuenta Activa
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-500">
                    Nombre de usuario
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.username}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-500">
                    ID Usuario
                  </p>
                  <p className="text-sm font-mono text-gray-600">{user.id}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button variant="danger" onClick={logout} className="w-full">
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar Sesión
              </Button>
            </div>
          </Card>

          {/* Estadísticas del Usuario */}
          <div className="space-y-6">
            <Card className="border-l-4 border-indigo-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
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
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Tareas
                </p>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">...</div>
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900">
                    {userStats.totalTasks}
                  </h3>
                )}
              </div>
            </Card>

            <Card className="border-l-4 border-green-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
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
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Completadas
                </p>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">...</div>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {userStats.completedTasks}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {userStats.totalTasks > 0
                        ? Math.round(
                            (userStats.completedTasks / userStats.totalTasks) *
                              100
                          )
                        : 0}
                      % completado
                    </p>
                  </>
                )}
              </div>
            </Card>

            <Card className="border-l-4 border-purple-500">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Proyectos
                </p>
                {loading ? (
                  <div className="text-2xl font-bold text-gray-400">...</div>
                ) : (
                  <h3 className="text-3xl font-bold text-gray-900">
                    {userStats.totalProjects}
                  </h3>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
