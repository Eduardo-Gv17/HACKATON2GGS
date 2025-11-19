// src/components/tasks/TaskForm.tsx

import { useState, useEffect, type FormEvent } from "react";
import type {
  Task,
  TaskPayload,
  TaskPriority,
  TaskStatus,
  // 🚨 CORRECCIÓN: Importamos TeamMember en lugar de User
  TeamMember,
  Project,
} from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface TaskFormProps {
  task?: Task; // Opcional para editar
  onClose: () => void;
  onSubmit: (payload: TaskPayload) => Promise<void>;
  // 🚨 CORRECCIÓN: memberOptions ahora espera TeamMember[]
  projectOptions: Project[];
  memberOptions: TeamMember[];
}

const initialPayload: TaskPayload = {
  title: "",
  description: "",
  projectId: "",
  priority: "MEDIUM",
  dueDate: new Date().toISOString().split("T")[0], // Hoy en formato YYYY-MM-DD
  assignedTo: "",
};

export const TaskForm = ({
  task,
  onClose,
  onSubmit,
  projectOptions,
  memberOptions,
}: TaskFormProps) => {
  const [payload, setPayload] = useState<TaskPayload>(initialPayload);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>("TODO");
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setPayload({
        title: task.title,
        description: task.description,
        projectId: task.projectId,
        priority: task.priority,
        dueDate: task.dueDate,
        assignedTo: task.assignedTo,
      });
      setCurrentStatus(task.status);
    } else {
      setPayload(initialPayload);
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "status") {
      setCurrentStatus(e.target.value as TaskStatus);
    } else {
      setPayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const finalPayload: TaskPayload & { status?: TaskStatus } = { ...payload };
    if (isEditing) {
      finalPayload.status = currentStatus;
    }

    try {
      await onSubmit(finalPayload as TaskPayload);
      onClose();
    } catch (error) {
      console.error("Error al guardar tarea:", error);
      // TODO: Manejar errores de validación de la API
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Se elimina el div de fondo y el título, que ahora son responsabilidad del Modal
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Título"
          name="title"
          value={payload.title}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            value={payload.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Proyecto */}
        <div className="mb-4">
          <label
            htmlFor="projectId"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Proyecto
          </label>
          <select
            id="projectId"
            name="projectId"
            value={payload.projectId}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Seleccionar Proyecto</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prioridad */}
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Prioridad
          </label>
          <select
            id="priority"
            name="priority"
            value={payload.priority}
            onChange={handleChange}
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="LOW">BAJA</option>
            <option value="MEDIUM">MEDIA</option>
            <option value="HIGH">ALTA</option>
            <option value="URGENT">URGENTE</option>
          </select>
        </div>

        {/* Fecha Límite */}
        <Input
          label="Fecha Límite"
          name="dueDate"
          type="date"
          value={payload.dueDate}
          onChange={handleChange}
          required
        />

        {/* Asignar a miembro */}
        <div className="mb-4">
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Asignar a
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={payload.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Sin Asignar</option>
            {memberOptions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Estado (solo se muestra al editar) */}
        {isEditing && (
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={currentStatus}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="TODO">POR HACER</option>
              <option value="IN_PROGRESS">EN PROGRESO</option>
              <option value="COMPLETED">COMPLETADA</option>
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Guardando..."
              : isEditing
              ? "Guardar Cambios"
              : "Crear Tarea"}
          </Button>
        </div>
      </form>
    </div>
  );
};
