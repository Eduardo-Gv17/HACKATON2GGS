// src/components/tasks/TaskList.tsx

import { useState, useEffect, useCallback } from "react";
import type {
  Task,
  TaskPriority,
  TaskStatus,
  Project,
  TaskPayload,
} from "../../types";
import { taskService } from "../../services/taskService";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
// 🚨 Importar componentes comunes
import { Button } from "../common/Button";
import { Modal } from "../common/Modal"; // 👈 Importar el Modal

// Simulacro de miembros para el formulario
const MOCK_TEAM_MEMBERS = [
  { id: "user-1", email: "a@a.com", name: "Alice", createdAt: "" },
  { id: "user-2", email: "b@b.com", name: "Bob", createdAt: "" },
];

const ITEMS_PER_PAGE = 20;

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estados de Filtro
  const [filterProject, setFilterProject] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterAssignedTo, setFilterAssignedTo] = useState<string>("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Obtener la lista de Proyectos para el filtro de tareas (usando el servicio)
  useEffect(() => {
    const fetchProjectsForFilter = async () => {
      try {
        // Asume que la paginación a 100 es suficiente para obtener todos los proyectos para los filtros
        const data = await projectService.getProjects(1, 100);
        setProjects(data.projects);
      } catch (e) {
        console.error("Error al cargar proyectos para el filtro:", e);
      }
    };
    fetchProjectsForFilter();
  }, []);

  const fetchTasks = useCallback(
    async (page: number) => {
      // ... (lógica de fetchTasks)
      setLoading(true);
      setError(null);
      try {
        const data = await taskService.getTasks({
          page,
          limit: ITEMS_PER_PAGE,
          projectId: filterProject || undefined,
          status: (filterStatus as TaskStatus) || undefined,
          priority: (filterPriority as TaskPriority) || undefined,
        });
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
        setCurrentPage(page);
      } catch (err) {
        setError("Error al cargar la lista de tareas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [filterProject, filterStatus, filterPriority]
  ); // Aquí no incluyo filterAssignedTo porque la API no lo soporta en el README

  useEffect(() => {
    fetchTasks(1); // Recargar lista al cambiar filtros
  }, [filterProject, filterStatus, filterPriority, fetchTasks]); // filterAssignedTo se queda solo en el cliente

  const handleCreateOrUpdateTask = async (payload: TaskPayload) => {
    // ... (lógica de creación/actualización)
    if (editingTask) {
      await taskService.updateTask(editingTask.id, payload);
    } else {
      await taskService.createTask(payload);
    }
    fetchTasks(currentPage);
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = async (taskId: string) => {
    // ... (lógica de eliminación)
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      try {
        await taskService.deleteTask(taskId);
        fetchTasks(currentPage);
      } catch (err) {
        setError("Error al eliminar la tarea.");
        console.error(err);
      }
    }
  };

  const handleToggleStatus = async (
    taskId: string,
    currentStatus: TaskStatus
  ) => {
    // ... (lógica de actualización de estado)
    setLoading(true);
    try {
      const newStatus: TaskStatus =
        currentStatus === "COMPLETED" ? "TODO" : "COMPLETED";
      await taskService.updateTaskStatus(taskId, newStatus);
      fetchTasks(currentPage);
    } catch (err) {
      setError("Error al actualizar el estado de la tarea.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleNewTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleViewDetails = (taskId: string) => {
    console.log(`Ver detalles de tarea: ${taskId}`);
  };

  if (loading && tasks.length === 0)
    return <div className="text-center py-8">Cargando tareas...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Tareas</h1>
        <Button onClick={handleNewTask}>+ Crear Tarea</Button>
      </div>

      {/* Filtros Avanzados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* ... (lógica de select para filtros, usando componentes de selección normales) */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
            onView={handleViewDetails}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {tasks.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron tareas con estos filtros.
        </div>
      )}

      {/* Paginación de tareas */}
      <div className="flex justify-center mt-8 space-x-2">
        <Button
          onClick={() => fetchTasks(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          variant="secondary"
        >
          Anterior
        </Button>
        <span className="self-center text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() => fetchTasks(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          Siguiente
        </Button>
      </div>

      {/* Uso del componente Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}
      >
        <TaskForm
          task={editingTask}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateOrUpdateTask}
          projectOptions={projects}
          memberOptions={MOCK_TEAM_MEMBERS}
        />
      </Modal>
    </div>
  );
};
