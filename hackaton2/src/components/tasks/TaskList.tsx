// src/components/tasks/TaskList.tsx

import { useState, useEffect, useCallback } from "react";
import type {
  Task,
  TaskPriority,
  TaskStatus,
  Project,
  TaskPayload,
  // 🚨 CORRECCIÓN: Importamos TeamMember
  TeamMember,
} from "../../types";
import { taskService } from "../../services/taskService";
import { projectService } from "../../services/projectService";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";
import { Button } from "../common/Button";
import { Modal } from "../common/Modal";

// Simulacro de miembros para el formulario
// 🚨 CORRECCIÓN: Tipamos el mock como TeamMember[]
const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: "user-1", email: "a@a.com", name: "Alice" },
  { id: "user-2", email: "b@b.com", name: "Bob" },
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
  );

  useEffect(() => {
    fetchTasks(1);
  }, [filterProject, filterStatus, filterPriority, fetchTasks]);

  const handleCreateOrUpdateTask = async (payload: TaskPayload) => {
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

  // Filtrado local por usuario asignado
  const filteredTasks = tasks.filter(
    (task) => !filterAssignedTo || task.assignedTo === filterAssignedTo
  );

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
        <div>
          <label
            htmlFor="filterStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">EN PROGRESO</option>
            <option value="COMPLETED">COMPLETADA</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterPriority"
            className="block text-sm font-medium text-gray-700"
          >
            Prioridad
          </label>
          <select
            id="filterPriority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="LOW">BAJA</option>
            <option value="MEDIUM">MEDIA</option>
            <option value="HIGH">ALTA</option>
            <option value="URGENT">URGENTE</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filterProject"
            className="block text-sm font-medium text-gray-700"
          >
            Proyecto
          </label>
          <select
            id="filterProject"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
          >
            <option value="">Todos los Proyectos</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filterAssignedTo"
            className="block text-sm font-medium text-gray-700"
          >
            Asignado a
          </label>
          <select
            id="filterAssignedTo"
            value={filterAssignedTo}
            onChange={(e) => setFilterAssignedTo(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
          >
            <option value="">Cualquier Miembro</option>
            {MOCK_TEAM_MEMBERS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
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

      {filteredTasks.length === 0 && !loading && (
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
