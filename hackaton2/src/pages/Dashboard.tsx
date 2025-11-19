// src/pages/Dashboard.tsx

// Asumiendo que usarás useAuth para obtener el nombre del usuario
// import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  // const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">👋 Bienvenido al Dashboard</h1>
      <p className="text-lg text-gray-700">
        {/* Dashboard principal con estadísticas */}
        Estadísticas generales, tareas pendientes y feed de actividad (Requisito
        2).
      </p>
    </div>
  );
};
