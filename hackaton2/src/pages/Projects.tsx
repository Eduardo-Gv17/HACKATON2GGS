// src/pages/Projects.tsx
import { ProjectList } from "../components/projects/ProjectList";

export const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">📁 Gestión de Proyectos</h1>
          <p className="text-indigo-100">
            Crea, edita y administra todos tus proyectos en un solo lugar
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto">
        <ProjectList />
      </div>
    </div>
  );
};
