// src/components/projects/ProjectCard.tsx (ACTUALIZADO - Uso de Card)

import type { Project, ProjectStatus } from "../../types";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onView: (projectId: string) => void;
}

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "ON_HOLD":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) => {
  const statusClasses = getStatusColor(project.status);

  return (
    <Card className="border border-gray-200 hover:border-indigo-500">
      <div className="flex justify-between items-start">
        <h3
          className="text-xl font-bold text-gray-900 truncate"
          onClick={() => onView(project.id)}
          role="button"
        >
          {project.name}
        </h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses}`}
        >
          {project.status.replace("_", " ")}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 justify-end">
        <Button variant="secondary" onClick={() => onView(project.id)}>
          Ver Detalles
        </Button>
        <Button onClick={() => onEdit(project)}>Editar</Button>
        <Button variant="danger" onClick={() => onDelete(project.id)}>
          Eliminar
        </Button>
      </div>
    </Card>
  );
};
