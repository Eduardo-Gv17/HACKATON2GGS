// src/components/tasks/TaskCard.tsx (ACTUALIZADO - Uso de Card)

import type { Task, TaskPriority, TaskStatus } from "../../types";
import { Button } from "../common/Button";
import { Card } from "../common/Card"; // 👈 Importar Card

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onView: (taskId: string) => void;
  onToggleStatus: (taskId: string, currentStatus: TaskStatus) => void;
}

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case "URGENT":
      return "bg-red-500 text-white";
    case "HIGH":
      return "bg-orange-400 text-white";
    case "MEDIUM":
      return "bg-yellow-300 text-gray-800";
    case "LOW":
      return "bg-green-300 text-gray-800";
    default:
      return "bg-gray-300 text-gray-800";
  }
};

const getStatusIndicator = (status: TaskStatus) => {
  switch (status) {
    case "TODO":
      return "border-l-4 border-red-500";
    case "IN_PROGRESS":
      return "border-l-4 border-yellow-500";
    case "COMPLETED":
      return "border-l-4 border-green-500";
    default:
      return "border-l-4 border-gray-500";
  }
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
}: TaskCardProps) => {
  const priorityClasses = getPriorityColor(task.priority);
  const statusIndicator = getStatusIndicator(task.status); // Cambio de nombre para claridad
  const isCompleted = task.status === "COMPLETED";

  const handleToggleStatus = () => {
    const newStatus: TaskStatus = isCompleted ? "TODO" : "COMPLETED";
    onToggleStatus(task.id, newStatus);
  };

  const dueDate = new Date(task.dueDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className={`${statusIndicator} p-4`}>
      <div className="flex justify-between items-start">
        <h3
          className={`text-lg font-semibold text-gray-900 ${
            isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${priorityClasses}`}
        >
          {task.priority}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-600">Vencimiento: {dueDate}</p>
      <p className="text-xs text-gray-500">Asignado a: {task.assignedTo}</p>

      <div className="mt-4 flex flex-wrap gap-2 justify-end">
        <Button variant="secondary" onClick={() => onView(task.id)}>
          Ver Detalles
        </Button>
        <Button onClick={() => onEdit(task)}>Editar</Button>
        <Button
          variant={isCompleted ? "secondary" : "primary"}
          onClick={handleToggleStatus}
        >
          {isCompleted ? "Reabrir" : "Completar"}
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </Button>
      </div>
    </Card>
  );
};
