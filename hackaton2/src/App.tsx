// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Páginas existentes
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Tasks } from "./pages/Tasks";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Se ha eliminado el Navbar porque no está en los archivos subidos */}
        <main className="min-h-screen bg-gray-50">
          <Routes>
            {/* Rutas de Autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Redirección por defecto */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Rutas Principales (Anteriormente Protegidas)
               Al no tener ProtectedRoute, estas rutas son accesibles directamente.
               La validación de sesión dependerá de cada página o de la API.
            */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />

            {/* Ruta 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-xl">Página no encontrada</p>
                </div>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
