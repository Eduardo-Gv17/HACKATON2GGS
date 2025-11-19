// src/components/projects/ProjectList.tsx

import { useState, useEffect, useCallback } from "react";
import type { Project, ProjectPayload } from "../../types";
import { projectService } from "../../services/projectService";
import { ProjectCard } from "./ProjectCard";
import { ProjectForm } from "./ProjectForm";
// 🚨 Importar componentes comunes
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Modal } from "../common/Modal"; // 👈 Importar el Modal

const ITEMS_PER_PAGE = 10;

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined
  );

  const fetchProjects = useCallback(async (page: number, search: string) => {
    // ... (lógica de fetchProjects)
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjects(
        page,
        ITEMS_PER_PAGE,
        search
      );
      setProjects(data.projects);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError("Error al cargar la lista de proyectos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects(1, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchProjects]);

  const handleCreateOrUpdateProject = async (payload: ProjectPayload) => {
    // ... (lógica de creación/actualización)
    if (editingProject) {
      await projectService.updateProject(editingProject.id, payload);
    } else {
      await projectService.createProject(payload);
    }
    fetchProjects(currentPage, searchTerm);
    setIsFormOpen(false);
    setEditingProject(undefined);
  };

  const handleDeleteProject = async (projectId: string) => {
    // ... (lógica de eliminación)
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")
    ) {
      try {
        await projectService.deleteProject(projectId);
        fetchProjects(currentPage, searchTerm);
      } catch (err) {
        setError("Error al eliminar el proyecto.");
        console.error(err);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleNewProject = () => {
    setEditingProject(undefined);
    setIsFormOpen(true);
  };

  const handleViewDetails = (projectId: string) => {
    console.log(`Navegar a detalles del proyecto: ${projectId}`);
  };

  if (loading && projects.length === 0)
    return <div className="text-center py-8">Cargando proyectos...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Proyectos</h1>
        <Button onClick={handleNewProject}>+ Crear Proyecto</Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar proyectos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDeleteProject}
            onView={handleViewDetails}
          />
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron proyectos.
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-2">
        <Button
          onClick={() => fetchProjects(currentPage - 1, searchTerm)}
          disabled={currentPage === 1 || loading}
          variant="secondary"
        >
          Anterior
        </Button>
        <span className="self-center text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() => fetchProjects(currentPage + 1, searchTerm)}
          disabled={currentPage >= totalPages || loading}
        >
          Siguiente
        </Button>
      </div>

      {/* Uso del componente Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProject ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
      >
        <ProjectForm
          project={editingProject}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateOrUpdateProject}
        />
      </Modal>
    </div>
  );
};
