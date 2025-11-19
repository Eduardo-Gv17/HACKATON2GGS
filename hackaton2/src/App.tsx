// src/App.tsx (Implementación Final)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Componentes de la aplicación
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Navbar } from "./components/layout/Navbar"; // 🚨 Asumimos un componente de navegación

// Páginas de la aplicación (asumiendo que las creaste en src/pages)
import { Login } from "./pages/Login";
import { Register } from "./pages/Register"; // Nueva página
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Tasks } from "./pages/Tasks";
import { Profile } from "./pages/Profile"; // Nueva página

function App() {
  return (
    <BrowserRouter>
      {/* El AuthProvider envuelve toda la lógica de rutas */}
      <AuthProvider>
        {/* Opcional: Una barra de navegación en la parte superior para enlaces */}
        <Navbar />

        <main className="pt-16">
          {" "}
          {/* Añadir padding si la Navbar es fija */}
          <Routes>
            {/* Rutas Públicas (accesibles sin login) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Redirección de la raíz */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Rutas Protegidas (Requieren autenticación) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />{" "}
              {/* Ruta de perfil */}
              {/* Rutas para detalles (ejemplo) */}
              <Route
                path="/projects/:id"
                element={<div>Detalle del Proyecto</div>}
              />
              <Route
                path="/tasks/:id"
                element={<div>Detalle de la Tarea</div>}
              />
            </Route>

            {/* Ruta de 404 (No encontrada) */}
            <Route
              path="*"
              element={
                <div className="text-center py-20 text-2xl">
                  404 | Página No Encontrada
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
