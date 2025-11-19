// src/pages/Login.tsx
import LoginForm from "../components/auth/LoginForm"; // [Corregido: Importación por defecto sin llaves]

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        {/* El componente ya maneja la lógica con useAuth internamente */}
        <LoginForm />
      </div>
    </div>
  );
};
