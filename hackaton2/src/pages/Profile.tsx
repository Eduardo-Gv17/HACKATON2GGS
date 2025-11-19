// src/pages/Profile.tsx

import { useAuth } from "../context/AuthContext";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

export const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">
        No se encontraron datos de usuario.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Mi Perfil 👤</h1>

      <Card className="space-y-4">
        <div className="text-left">
          <p className="text-sm font-medium text-gray-500">
            Nombre de usuario:
          </p>
          {/* [Corregido: user.name por user.username según tu AuthContext] */}
          <p className="text-lg font-semibold text-gray-800">{user.username}</p>
        </div>

        <div className="text-left">
          <p className="text-sm font-medium text-gray-500">Email:</p>
          <p className="text-lg font-semibold text-gray-800">{user.email}</p>
        </div>

        <div className="pt-4">
          <Button variant="danger" onClick={logout}>
            Cerrar Sesión (Logout)
          </Button>
        </div>
      </Card>
    </div>
  );
};
