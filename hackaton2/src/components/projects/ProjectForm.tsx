// src/components/projects/ProjectForm.tsx

import { useState, useEffect, type FormEvent } from "react";
import type { Project, ProjectPayload, ProjectStatus } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface ProjectFormProps {
  project?: Project; // Opcional para editar
  onClose: () => void;
  onSubmit: (payload: ProjectPayload) => Promise<void>;
}

const initialPayload: ProjectPayload = {
  name: "",
  description: "",
  status: "ACTIVE", // Estado por defecto
};

export const ProjectForm = ({
  project,
  onClose,
  onSubmit,
}: ProjectFormProps) => {
  const [payload, setPayload] = useState<ProjectPayload>(initialPayload);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setPayload({
        name: project.name,
        description: project.description,
        status: project.status,
      });
    } else {
      setPayload(initialPayload);
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      // TODO: Manejar errores de validación de la API
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre del Proyecto"
          name="name"
          value={payload.name}
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
            rows={3}
            value={payload.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

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
              value={payload.status}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="ACTIVE">ACTIVO</option>
              <option value="COMPLETED">COMPLETADO</option>
              <option value="ON_HOLD">EN ESPERA</option>
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
              : "Crear Proyecto"}
          </Button>
        </div>
      </form>
    </div>
  );
};
