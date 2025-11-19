// src/pages/Tasks.tsx

import { TaskList } from "../components/tasks/TaskList";

export const Tasks = () => {
  return (
    <div className="p-4">
      {/* Este componente ya incluye la lógica de fetch, filtros y modales */}
      <TaskList />
    </div>
  );
};
