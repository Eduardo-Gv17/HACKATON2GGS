// src/pages/Tasks.tsx
import { TaskList } from "../components/tasks/TaskList";

export const Tasks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">✅ Gestión de Tareas</h1>
          <p className="text-purple-100">
            Organiza y completa tus tareas con filtros avanzados y prioridades
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto">
        <TaskList />
      </div>
    </div>
  );
};
