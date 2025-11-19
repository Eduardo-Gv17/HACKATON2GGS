// src/pages/Projects.tsx

import { ProjectList } from "../components/projects/ProjectList";

export const Projects = () => {
  return (
    <div className="p-4">
      {/* Este componente ya incluye la lógica de fetch, paginación y modales */}
      <ProjectList />
    </div>
  );
};
